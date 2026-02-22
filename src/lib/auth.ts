import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { db } from './database/db';
import { UserSession } from './database/schema';

/**
 * Supabase Configuration
 * Add your Supabase credentials in .env.local:
 * VITE_SUPABASE_URL=your-project-url
 * VITE_SUPABASE_ANON_KEY=your-anon-key
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export class AuthService {
    private supabase: SupabaseClient | null = null;
    private currentUser: User | null = null;
    private isConfigured: boolean = false;

    constructor() {
        // Only initialize Supabase if credentials are provided
        if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
            try {
                this.supabase = createClient(supabaseUrl, supabaseAnonKey);
                this.isConfigured = true;
                this.initializeAuth();
                console.log('✅ Supabase configured successfully');
            } catch (error) {
                console.warn('⚠️ Failed to initialize Supabase:', error);
                this.isConfigured = false;
            }
        } else {
            console.warn('⚠️ Supabase credentials not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local');
            console.warn('Authentication features will be disabled until configured.');
            this.isConfigured = false;
        }
    }

    /**
     * Initialize authentication state
     */
    private async initializeAuth() {
        if (!this.supabase) return;

        try {
            // Check for existing session
            const { data: { session } } = await this.supabase.auth.getSession();

            if (session) {
                this.currentUser = session.user;
                await this.saveSessionToDatabase(session);
            }

            // Listen for auth state changes
            this.supabase.auth.onAuthStateChange(async (event, session) => {
                console.log('🔐 Auth state changed:', event);

                if (session) {
                    this.currentUser = session.user;
                    await this.saveSessionToDatabase(session);
                } else {
                    this.currentUser = null;
                    // Clear local database on signout
                    db.run('DELETE FROM user_session');
                }
            });
        } catch (error) {
            console.error('❌ Auth initialization failed:', error);
        }
    }

    /**
     * Save Supabase session to SQLite database
     */
    private async saveSessionToDatabase(session: Session): Promise<void> {
        try {
            await db.init(); // Ensure database is initialized

            const userSession: UserSession = {
                user_id: session.user.id,
                email: session.user.email,
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                session_data: JSON.stringify(session),
            };

            // Check if session exists
            const existing = db.getOne<UserSession>(
                'SELECT * FROM user_session WHERE user_id = ?',
                [session.user.id]
            );

            if (existing) {
                // Update existing session
                db.run(
                    `UPDATE user_session 
           SET email = ?, access_token = ?, refresh_token = ?, 
               session_data = ?, updated_at = CURRENT_TIMESTAMP 
           WHERE user_id = ?`,
                    [
                        userSession.email,
                        userSession.access_token,
                        userSession.refresh_token,
                        userSession.session_data,
                        userSession.user_id
                    ]
                );
            } else {
                // Insert new session
                db.run(
                    `INSERT INTO user_session (user_id, email, access_token, refresh_token, session_data) 
           VALUES (?, ?, ?, ?, ?)`,
                    [
                        userSession.user_id,
                        userSession.email,
                        userSession.access_token,
                        userSession.refresh_token,
                        userSession.session_data
                    ]
                );

                // Initialize user stats
                db.run(
                    `INSERT INTO user_stats (user_id) VALUES (?)`,
                    [userSession.user_id]
                );
            }

            console.log('✅ Session saved to database');
        } catch (error) {
            console.error('❌ Failed to save session:', error);
        }
    }

    /**
     * Sign up with email and password
     */
    async signUp(email: string, password: string): Promise<{ success: boolean; error?: string }> {
        if (!this.isConfigured || !this.supabase) {
            return {
                success: false,
                error: 'Authentication not configured. Please add Supabase credentials to .env.local'
            };
        }

        try {
            const { error } = await this.supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Sign in with email and password
     */
    async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
        if (!this.isConfigured || !this.supabase) {
            return {
                success: false,
                error: 'Authentication not configured. Please add Supabase credentials to .env.local'
            };
        }

        try {
            const { error } = await this.supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Sign out
     */
    async signOut(): Promise<void> {
        if (!this.supabase) {
            console.warn('Cannot sign out: Supabase not configured');
            return;
        }

        try {
            await this.supabase.auth.signOut();

            // Clear all local data
            db.clearAllData();

            console.log('✅ Signed out successfully');
        } catch (error) {
            console.error('❌ Sign out failed:', error);
        }
    }

    /**
     * Get current user
     */
    getCurrentUser(): User | null {
        return this.currentUser;
    }

    /**
     * Get user ID
     */
    getUserId(): string | null {
        return this.currentUser?.id || null;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.currentUser !== null;
    }

    /**
     * Check if Supabase is configured
     */
    isAuthConfigured(): boolean {
        return this.isConfigured;
    }

    /**
     * Get session from database
     */
    getSessionFromDatabase(): UserSession | null {
        try {
            return db.getOne<UserSession>('SELECT * FROM user_session LIMIT 1');
        } catch (error) {
            console.error('Failed to get session from database:', error);
            return null;
        }
    }

    /**
     * Reset password
     */
    async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
        if (!this.isConfigured || !this.supabase) {
            return {
                success: false,
                error: 'Authentication not configured. Please add Supabase credentials to .env.local'
            };
        }

        try {
            const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Update password
     */
    async updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
        if (!this.isConfigured || !this.supabase) {
            return {
                success: false,
                error: 'Authentication not configured. Please add Supabase credentials to .env.local'
            };
        }

        try {
            const { error } = await this.supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
}

// Singleton instance
export const authService = new AuthService();
