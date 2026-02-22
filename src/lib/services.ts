import { db } from './database/db';
import { MoodRecord, UserStats } from './database/schema';
import { authService } from './auth';

/**
 * MoodService - Manages mood records in the database
 */
export class MoodService {
    /**
     * Log a new mood
     */
    async logMood(
        moodType: string,
        moodIntensity: number,
        note?: string,
        voiceNotePath?: string
    ): Promise<{ success: boolean; id?: number; error?: string }> {
        try {
            const userId = authService.getUserId();

            if (!userId) {
                return { success: false, error: 'User not authenticated' };
            }

            // Insert mood record
            db.run(
                `INSERT INTO mood_records (user_id, mood_type, mood_intensity, note, voice_note_path) 
         VALUES (?, ?, ?, ?, ?)`,
                [userId, moodType, moodIntensity, note || null, voiceNotePath || null]
            );

            // Update user stats
            db.run(
                `UPDATE user_stats 
         SET total_moods_logged = total_moods_logged + 1,
             last_activity_date = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ?`,
                [userId]
            );

            // Get the inserted ID
            const lastRow = db.getOne<{ id: number }>(
                'SELECT last_insert_rowid() as id'
            );

            return { success: true, id: lastRow?.id };
        } catch (error: any) {
            console.error('Failed to log mood:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get recent moods
     */
    getRecentMoods(limit: number = 10): MoodRecord[] {
        try {
            const userId = authService.getUserId();

            if (!userId) {
                return [];
            }

            return db.getAll<MoodRecord>(
                `SELECT * FROM mood_records 
         WHERE user_id = ? 
         ORDER BY created_at DESC 
         LIMIT ?`,
                [userId, limit]
            );
        } catch (error) {
            console.error('Failed to get recent moods:', error);
            return [];
        }
    }

    /**
     * Get moods by date range
     */
    getMoodsByDateRange(startDate: string, endDate: string): MoodRecord[] {
        try {
            const userId = authService.getUserId();

            if (!userId) {
                return [];
            }

            return db.getAll<MoodRecord>(
                `SELECT * FROM mood_records 
         WHERE user_id = ? 
         AND DATE(created_at) BETWEEN DATE(?) AND DATE(?)
         ORDER BY created_at ASC`,
                [userId, startDate, endDate]
            );
        } catch (error) {
            console.error('Failed to get moods by date range:', error);
            return [];
        }
    }

    /**
     * Get mood statistics
     */
    getMoodStats(): {
        totalMoods: number;
        averageIntensity: number;
        mostCommonMood: string;
        moodCounts: Record<string, number>;
    } {
        try {
            const userId = authService.getUserId();

            if (!userId) {
                return {
                    totalMoods: 0,
                    averageIntensity: 0,
                    mostCommonMood: '',
                    moodCounts: {}
                };
            }

            // Get total and average
            const stats = db.getOne<{ total: number; avg: number }>(
                `SELECT COUNT(*) as total, AVG(mood_intensity) as avg 
         FROM mood_records 
         WHERE user_id = ?`,
                [userId]
            );

            // Get mood counts
            const moodCounts = db.getAll<{ mood_type: string; count: number }>(
                `SELECT mood_type, COUNT(*) as count 
         FROM mood_records 
         WHERE user_id = ? 
         GROUP BY mood_type 
         ORDER BY count DESC`,
                [userId]
            );

            const counts: Record<string, number> = {};
            moodCounts.forEach(m => {
                counts[m.mood_type] = m.count;
            });

            return {
                totalMoods: stats?.total || 0,
                averageIntensity: stats?.avg || 0,
                mostCommonMood: moodCounts[0]?.mood_type || '',
                moodCounts: counts
            };
        } catch (error) {
            console.error('Failed to get mood stats:', error);
            return {
                totalMoods: 0,
                averageIntensity: 0,
                mostCommonMood: '',
                moodCounts: {}
            };
        }
    }

    /**
     * Delete a mood record
     */
    deleteMood(id: number): { success: boolean; error?: string } {
        try {
            const userId = authService.getUserId();

            if (!userId) {
                return { success: false, error: 'User not authenticated' };
            }

            db.run(
                'DELETE FROM mood_records WHERE id = ? AND user_id = ?',
                [id, userId]
            );

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
}

/**
 * StatsService - Manages user statistics
 */
export class StatsService {
    /**
     * Get user statistics
     */
    getUserStats(): UserStats | null {
        try {
            const userId = authService.getUserId();

            if (!userId) {
                return null;
            }

            return db.getOne<UserStats>(
                'SELECT * FROM user_stats WHERE user_id = ?',
                [userId]
            );
        } catch (error) {
            console.error('Failed to get user stats:', error);
            return null;
        }
    }

    /**
     * Update wellness score
     */
    updateWellnessScore(score: number): void {
        try {
            const userId = authService.getUserId();

            if (!userId) return;

            db.run(
                `UPDATE user_stats 
         SET wellness_score = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ?`,
                [score, userId]
            );
        } catch (error) {
            console.error('Failed to update wellness score:', error);
        }
    }

    /**
     * Update streak
     */
    updateStreak(streak: number): void {
        try {
            const userId = authService.getUserId();

            if (!userId) return;

            db.run(
                `UPDATE user_stats 
         SET current_streak = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ?`,
                [streak, userId]
            );
        } catch (error) {
            console.error('Failed to update streak:', error);
        }
    }

    /**
     * Increment total sessions
     */
    incrementSessions(): void {
        try {
            const userId = authService.getUserId();

            if (!userId) return;

            db.run(
                `UPDATE user_stats 
         SET total_sessions = total_sessions + 1,
             last_activity_date = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ?`,
                [userId]
            );
        } catch (error) {
            console.error('Failed to increment sessions:', error);
        }
    }

    /**
     * Update engagement metrics
     */
    updateMetrics(
        moodConsistency?: number,
        sessionEngagement?: number,
        communityActivity?: number
    ): void {
        try {
            const userId = authService.getUserId();

            if (!userId) return;

            db.run(
                `UPDATE user_stats 
         SET mood_consistency = COALESCE(?, mood_consistency),
             session_engagement = COALESCE(?, session_engagement),
             community_activity = COALESCE(?, community_activity),
             updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ?`,
                [moodConsistency, sessionEngagement, communityActivity, userId]
            );
        } catch (error) {
            console.error('Failed to update metrics:', error);
        }
    }
}

// Export service instances
export const moodService = new MoodService();
export const statsService = new StatsService();
