import initSqlJs, { Database } from 'sql.js';
import { DATABASE_SCHEMA } from './schema';

/**
 * DatabaseService - Manages SQLite database for local storage
 * Uses sql.js for browser-based SQLite functionality
 */
class DatabaseService {
    private db: Database | null = null;
    private isInitialized = false;

    /**
     * Initialize the database
     */
    async init(): Promise<void> {
        if (this.isInitialized) return;

        try {
            // Initialize SQL.js
            const SQL = await initSqlJs({
                locateFile: (file) => `https://sql.js.org/dist/${file}`
            });

            // Try to load existing database from localStorage
            const savedData = localStorage.getItem('mindcare_db');

            if (savedData) {
                // Load existing database
                const uint8Array = new Uint8Array(JSON.parse(savedData));
                this.db = new SQL.Database(uint8Array);
                console.log('💾 Database loaded from localStorage');
            } else {
                // Create new database
                this.db = new SQL.Database();
                console.log('🆕 New database created');
            }

            // Run schema to create tables
            this.db.run(DATABASE_SCHEMA);

            this.isInitialized = true;
            console.log('✅ Database initialized successfully');

            // Save database after initialization
            this.save();
        } catch (error) {
            console.error('❌ Database initialization failed:', error);
            throw error;
        }
    }

    /**
     * Save database to localStorage
     */
    save(): void {
        if (!this.db) {
            console.error('Cannot save: Database not initialized');
            return;
        }

        try {
            const data = this.db.export();
            const dataString = JSON.stringify(Array.from(data));
            localStorage.setItem('mindcare_db', dataString);
            console.log('💾 Database saved to localStorage');
        } catch (error) {
            console.error('❌ Failed to save database:', error);
        }
    }

    /**
     * Get the current user session
     */
    getUserSession(): { email: string | null } | null {
        try {
            const results = this.exec('SELECT email FROM user_session LIMIT 1');
            if (results.length > 0 && results[0].values.length > 0) {
                return { email: results[0].values[0][0] as string };
            }
        } catch (error) {
            console.error('Failed to get user session:', error);
        }
        return null;
    }

    /**
     * Execute a SQL query
     */
    exec(sql: string, params?: any[]): any[] {
        if (!this.db) {
            throw new Error('Database not initialized. Call init() first.');
        }

        try {
            const results = this.db.exec(sql, params);
            this.save(); // Auto-save after every operation
            return results;
        } catch (error) {
            console.error('❌ Query execution failed:', error);
            throw error;
        }
    }

    /**
     * Run a SQL statement (for INSERT, UPDATE, DELETE)
     */
    run(sql: string, params?: any[]): void {
        if (!this.db) {
            throw new Error('Database not initialized. Call init() first.');
        }

        try {
            this.db.run(sql, params);
            this.save();
        } catch (error) {
            console.error('❌ Statement execution failed:', error);
            throw error;
        }
    }

    /**
     * Get a single row
     */
    getOne<T>(sql: string, params?: any[]): T | null {
        const results = this.exec(sql, params);

        if (results.length === 0 || results[0].values.length === 0) {
            return null;
        }

        const columns = results[0].columns;
        const values = results[0].values[0];

        const row: any = {};
        columns.forEach((col: string, index: number) => {
            row[col] = values[index] ?? null;
        });


        return row as T;
    }

    /**
     * Get all rows
     */
    getAll<T>(sql: string, params?: any[]): T[] {
        const results = this.exec(sql, params);

        if (results.length === 0) {
            return [];
        }

        const columns = results[0].columns;
        const values = results[0].values;

        return values.map((row: any[]) => {
            const obj: any = {};
            columns.forEach((col: string, index: number) => {
                obj[col] = row[index];
            });
            return obj as T;
        });
    }

    // ============================================================
    // MOOD TRACKING METHODS
    // ============================================================

    /**
     * Save a mood record
     */
    saveMoodRecord(moodData: {
        user_id: string;
        mood_type: string;
        mood_intensity: number;
        note?: string;
        voice_note_path?: string;
    }): number {
        const { user_id, mood_type, mood_intensity, note, voice_note_path } = moodData;

        this.run(
            `INSERT INTO mood_records (user_id, mood_type, mood_intensity, note, voice_note_path)
             VALUES (?, ?, ?, ?, ?)`,
            [user_id, mood_type, mood_intensity, note || null, voice_note_path || null]
        );

        // Update user stats
        this.run(
            `INSERT INTO user_stats (user_id, total_moods_logged, last_activity_date)
             VALUES (?, 1, datetime('now'))
             ON CONFLICT(user_id) DO UPDATE SET
                 total_moods_logged = total_moods_logged + 1,
                 last_activity_date = datetime('now')`,
            [user_id]
        );

        // Update streak
        this.updateStreak(user_id);

        // Get the inserted ID
        const result = this.getOne<{ id: number }>(
            'SELECT last_insert_rowid() as id'
        );

        return result?.id || 0;
    }

    /**
     * Get mood records for a specific month
     */
    getMoodRecordsForMonth(user_id: string, year: number, month: number): any[] {
        // Month is 0-indexed in JS, but 1-indexed in SQL
        const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
        const nextMonth = month === 11 ? 1 : month + 2;
        const nextYear = month === 11 ? year + 1 : year;
        const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

        return this.getAll(
            `SELECT * FROM mood_records
             WHERE user_id = ?
             AND date(created_at) >= date(?)
             AND date(created_at) < date(?)
             ORDER BY created_at ASC`,
            [user_id, startDate, endDate]
        );
    }

    /**
     * Get mood records within a date range
     */
    getMoodRecordsByDateRange(user_id: string, startDate: string, endDate: string): any[] {
        return this.getAll(
            `SELECT * FROM mood_records
             WHERE user_id = ?
             AND date(created_at) >= date(?)
             AND date(created_at) <= date(?)
             ORDER BY created_at DESC`,
            [user_id, startDate, endDate]
        );
    }

    /**
     * Get mood statistics for the last N days
     */
    getMoodStatistics(user_id: string, days: number = 7): any {
        const records = this.getAll<{ mood_type: string; count: number }>(
            `SELECT mood_type, COUNT(*) as count
             FROM mood_records
             WHERE user_id = ?
             AND date(created_at) >= date('now', '-' || ? || ' days')
             GROUP BY mood_type
             ORDER BY count DESC`,
            [user_id, days]
        );

        const totalRecords = records.reduce((sum: number, r: { count: number }) => sum + r.count, 0);

        return {
            distribution: records.map((r: { mood_type: string; count: number }) => ({
                mood: r.mood_type,
                count: r.count,
                percentage: totalRecords > 0 ? Math.round((r.count / totalRecords) * 100) : 0
            })),
            mostCommon: records.length > 0 ? records[0].mood_type : null,
            totalLogs: totalRecords
        };
    }

    /**
     * Get the most common mood from recent days
     */
    getMostCommonMood(user_id: string, days: number = 7): { mood: string; count: number } | null {
        const result = this.getOne<{ mood_type: string; count: number }>(
            `SELECT mood_type, COUNT(*) as count
             FROM mood_records
             WHERE user_id = ?
             AND date(created_at) >= date('now', '-' || ? || ' days')
             GROUP BY mood_type
             ORDER BY count DESC
             LIMIT 1`,
            [user_id, days]
        );

        if (!result) return null;

        return {
            mood: result.mood_type,
            count: result.count
        };
    }

    /**
     * Calculate and update the current streak
     */
    updateStreak(user_id: string): number {
        // Get all dates with mood records, ordered by date descending
        const dates = this.getAll<{ date: string }>(
            `SELECT DISTINCT date(created_at) as date
             FROM mood_records
             WHERE user_id = ?
             ORDER BY date DESC`,
            [user_id]
        );

        if (dates.length === 0) {
            this.run(
                `UPDATE user_stats SET current_streak = 0 WHERE user_id = ?`,
                [user_id]
            );
            return 0;
        }

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < dates.length; i++) {
            const recordDate = new Date(dates[i].date);
            recordDate.setHours(0, 0, 0, 0);

            const expectedDate = new Date(today);
            expectedDate.setDate(today.getDate() - i);

            if (recordDate.getTime() === expectedDate.getTime()) {
                streak++;
            } else {
                break;
            }
        }

        // Update streak in database
        this.run(
            `UPDATE user_stats SET current_streak = ? WHERE user_id = ?`,
            [streak, user_id]
        );

        return streak;
    }

    /**
     * Get current streak for user
     */
    getCurrentStreak(user_id: string): number {
        const result = this.getOne<{ current_streak: number }>(
            `SELECT current_streak FROM user_stats WHERE user_id = ?`,
            [user_id]
        );

        return result?.current_streak || 0;
    }

    /**
     * Clear all data (for logout)
     */
    clearAllData(): void {
        if (!this.db) return;

        const tables = [
            'user_session',
            'mood_records',
            'chat_sessions',
            'chat_messages',
            'session_summaries',
            'journal_entries',
            'file_attachments',
            'user_stats'
        ];

        tables.forEach(table => {
            try {
                this.run(`DELETE FROM ${table}`);
            } catch (error) {
                console.error(`Failed to clear ${table}:`, error);
            }
        });

        localStorage.removeItem('mindcare_db');
        console.log('🗑️ All data cleared');
    }

    /**
     * Export database as downloadable file
     */
    exportDatabase(): Blob {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const data = this.db.export();
        return new Blob([data as BlobPart], { type: 'application/x-sqlite3' });
    }

    // ============================================================
    // CHAT CONVERSATION MANAGEMENT
    // ============================================================

    /**
     * Create a new chat conversation
     */
    createConversation(userId: string, category: string, personality: string): string {
        const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        this.run(
            'INSERT INTO chat_conversations (id, user_id, category, personality, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
            [conversationId, userId, category, personality, now, now]
        );

        console.log(`✅ Created conversation: ${conversationId}`);
        return conversationId;
    }

    /**
     * Save a chat message
     */
    saveMessage(conversationId: string, role: 'user' | 'assistant', content: string, emotion?: string): string {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        this.run(
            'INSERT INTO chat_messages (id, conversation_id, role, content, detected_emotion, created_at) VALUES (?, ?, ?, ?, ?, ?)',
            [messageId, conversationId, role, content, emotion || null, now]
        );

        // Update conversation timestamp
        this.run(
            'UPDATE chat_conversations SET updated_at = ? WHERE id = ?',
            [now, conversationId]
        );

        return messageId;
    }

    /**
     * Get all conversations for a user
     */
    getConversations(userId: string): any[] {
        const results = this.exec('SELECT * FROM chat_conversations WHERE user_id = ? ORDER BY updated_at DESC', [userId]);
        return results.length > 0 ? results[0].values.map((row: any[]) => ({
            id: row[0],
            user_id: row[1],
            category: row[2],
            personality: row[3],
            title: row[4],
            created_at: row[5],
            updated_at: row[6]
        })) : [];
    }

    /**
     * Get messages for a conversation
     */
    getMessages(conversationId: string): any[] {
        const results = this.exec('SELECT * FROM chat_messages WHERE conversation_id = ? ORDER BY created_at ASC', [conversationId]);
        return results.length > 0 ? results[0].values.map((row: any[]) => ({
            id: row[0],
            conversation_id: row[1],
            role: row[2],
            content: row[3],
            detected_emotion: row[4],
            created_at: row[5]
        })) : [];
    }

    /**
     * Delete a conversation and its messages
     */
    deleteConversation(conversationId: string): void {
        this.run('DELETE FROM chat_messages WHERE conversation_id = ?', [conversationId]);
        this.run('DELETE FROM chat_conversations WHERE id = ?', [conversationId]);
        console.log(`✅ Deleted conversation: ${conversationId}`);
    }

    /**
     * Update conversation title
     */
    updateConversationTitle(conversationId: string, title: string): void {
        const now = new Date().toISOString();
        this.run(
            'UPDATE chat_conversations SET title = ?, updated_at = ? WHERE id = ?',
            [title, now, conversationId]
        );
    }

    // ============================================================
    // SESSION TRACKING
    // ============================================================

    /**
     * Start a new therapy session
     */
    startSession(userId: string, sessionType: 'chat' | 'mood' | 'assessment', conversationId?: string): string {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        this.run(
            'INSERT INTO therapy_sessions (id, user_id, conversation_id, session_type, started_at) VALUES (?, ?, ?, ?, ?)',
            [sessionId, userId, conversationId || null, sessionType, now]
        );

        console.log(`✅ Started session: ${sessionId}`);
        return sessionId;
    }

    /**
     * End a session with summary
     */
    endSession(sessionId: string, summary?: string, topics?: string[]): void {
        const now = new Date().toISOString();
        const topicsJson = topics ? JSON.stringify(topics) : null;

        this.run(
            'UPDATE therapy_sessions SET ended_at = ?, summary = ?, key_topics = ? WHERE id = ?',
            [now, summary || null, topicsJson, sessionId]
        );

        // Calculate duration
        const results = this.exec('SELECT started_at, ended_at FROM therapy_sessions WHERE id = ?', [sessionId]);
        if (results.length > 0 && results[0].values.length > 0) {
            const [startedAt, endedAt] = results[0].values[0];
            const duration = Math.round((new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 60000);
            this.run('UPDATE therapy_sessions SET duration_minutes = ? WHERE id = ?', [duration, sessionId]);
        }

        console.log(`✅ Ended session: ${sessionId}`);
    }

    /**
     * Get recent sessions for a user
     */
    getRecentSessions(userId: string, limit: number = 10): any[] {
        const results = this.exec(
            'SELECT * FROM therapy_sessions WHERE user_id = ? ORDER BY started_at DESC LIMIT ?',
            [userId, limit]
        );
        return results.length > 0 ? results[0].values.map((row: any[]) => ({
            id: row[0],
            user_id: row[1],
            conversation_id: row[2],
            session_type: row[3],
            duration_minutes: row[4],
            summary: row[5],
            key_topics: row[6] ? JSON.parse(row[6]) : null,
            mood_before: row[7],
            mood_after: row[8],
            started_at: row[9],
            ended_at: row[10]
        })) : [];
    }

    /**
     * Get session statistics
     */
    getSessionStats(userId: string): any {
        const results = this.exec(
            'SELECT COUNT(*) as total, AVG(duration_minutes) as avg_duration FROM therapy_sessions WHERE user_id = ? AND ended_at IS NOT NULL',
            [userId]
        );

        if (results.length > 0 && results[0].values.length > 0) {
            const [total, avgDuration] = results[0].values[0];
            return {
                totalSessions: total || 0,
                avgDuration: avgDuration ? Math.round(avgDuration) : 0
            };
        }

        return { totalSessions: 0, avgDuration: 0 };
    }

    /**
     * Get dashboard statistics
     */
    getDashboardStats(userId: string): any {
        // Get mood count
        const moodResults = this.exec('SELECT COUNT(*) as count FROM mood_records WHERE user_id = ?', [userId]);
        const totalMoods = moodResults.length > 0 && moodResults[0].values.length > 0 ? moodResults[0].values[0][0] : 0;

        // Get chat count
        const chatResults = this.exec('SELECT COUNT(*) as count FROM chat_conversations WHERE user_id = ?', [userId]);
        const totalChats = chatResults.length > 0 && chatResults[0].values.length > 0 ? chatResults[0].values[0][0] : 0;

        // Get current streak
        const streakResults = this.exec('SELECT current_streak FROM user_stats WHERE user_id = ?', [userId]);
        const currentStreak = streakResults.length > 0 && streakResults[0].values.length > 0 ? streakResults[0].values[0][0] : 0;

        return {
            totalMoods,
            totalChats,
            currentStreak
        };
    }

    /**
     * Get database instance (use with caution)
     */
    getDatabase(): Database | null {
        return this.db;
    }
}

// Singleton instance
export const db = new DatabaseService();
