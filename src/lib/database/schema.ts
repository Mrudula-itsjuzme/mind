// Database Schema for MindCare
// This defines the SQLite database structure for local storage

export const DATABASE_SCHEMA = `
  -- User Session Table (stores Supabase auth data)
  CREATE TABLE IF NOT EXISTS user_session (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT UNIQUE NOT NULL,
    email TEXT,
    access_token TEXT,
    refresh_token TEXT,
    session_data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Mood Records Table
  CREATE TABLE IF NOT EXISTS mood_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    mood_type TEXT NOT NULL,
    mood_intensity INTEGER CHECK(mood_intensity >= 1 AND mood_intensity <= 10),
    note TEXT,
    voice_note_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_session(user_id)
  );
  
  -- Create index for faster mood queries
  CREATE INDEX IF NOT EXISTS idx_mood_user_date ON mood_records(user_id, created_at);

  -- AI Chat Sessions Table
  CREATE TABLE IF NOT EXISTS chat_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    session_title TEXT,
    personality_type TEXT DEFAULT 'calm',
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ended_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES user_session(user_id)
  );

  -- Chat Messages Table
  CREATE TABLE IF NOT EXISTS chat_messages_old (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,
    role TEXT CHECK(role IN ('user', 'assistant')) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
  );

  -- Therapist Directory Table
  CREATE TABLE IF NOT EXISTS therapists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialization TEXT,
    rating REAL CHECK(rating >= 0 AND rating <= 5),
    bio TEXT,
    avatar_url TEXT,
    available BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Community Forum Posts
  CREATE TABLE IF NOT EXISTS forum_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
   user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_session(user_id)
  );

  -- Support Groups Table
  CREATE TABLE IF NOT EXISTS support_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    member_count INTEGER DEFAULT 0,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Journal Entries Table
  CREATE TABLE IF NOT EXISTS journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    title TEXT,
    content TEXT NOT NULL,
    mood TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_session(user_id)
  );

  -- Goals Table
  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    target_date DATE,
    completed BOOLEAN DEFAULT 0,
    progress INTEGER DEFAULT 0 CHECK(progress >= 0 AND progress <= 100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_session(user_id)
  );

  -- User Statistics Table
  CREATE TABLE IF NOT EXISTS user_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT UNIQUE NOT NULL,
    current_streak INTEGER DEFAULT 0,
    total_sessions INTEGER DEFAULT 0,
    total_moods_logged INTEGER DEFAULT 0,
    wellness_score REAL DEFAULT 0.0,
    mood_consistency REAL DEFAULT 0.0,
    session_engagement REAL DEFAULT 0.0,
    community_activity REAL DEFAULT 0.0,
    last_activity_date TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_session(user_id)
  );
  
  -- Therapy sessions tracking
  CREATE TABLE IF NOT EXISTS therapy_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    conversation_id TEXT,
    session_type TEXT NOT NULL,
    duration_minutes INTEGER,
    summary TEXT,
    key_topics TEXT,
    mood_before TEXT,
    mood_after TEXT,
    started_at TEXT NOT NULL,
    ended_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Chat conversations
  CREATE TABLE IF NOT EXISTS chat_conversations (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    category TEXT NOT NULL,
    personality TEXT NOT NULL,
    title TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Chat messages
  CREATE TABLE IF NOT EXISTS chat_messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    detected_emotion TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (conversation_id) REFERENCES chat_conversations(id)
  );
`;

export interface UserSession {
  id?: number;
  user_id: string;
  email?: string;
  access_token?: string;
  refresh_token?: string;
  session_data?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MoodRecord {
  id?: number;
  user_id: string;
  mood_type: string;
  mood_intensity: number;
  note?: string;
  voice_note_path?: string;
  created_at?: string;
}

export interface ChatSession {
  id?: number;
  user_id: string;
  session_title?: string;
  personality_type?: string;
  started_at?: string;
  ended_at?: string;
}

export interface ChatMessageOld {
  id?: number;
  session_id: number;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

export interface Therapist {
  id?: number;
  name: string;
  specialization?: string;
  rating?: number;
  bio?: string;
  avatar_url?: string;
  available?: boolean;
  created_at?: string;
}

export interface ForumPost {
  id?: number;
  user_id: string;
  title: string;
  content: string;
  category?: string;
  likes?: number;
  created_at?: string;
}

export interface SupportGroup {
  id?: number;
  name: string;
  description?: string;
  member_count?: number;
  category?: string;
  created_at?: string;
}

export interface JournalEntry {
  id?: number;
  user_id: string;
  title?: string;
  content: string;
  mood?: string;
  created_at?: string;
}

export interface Goal {
  id?: number;
  user_id: string;
  title: string;
  description?: string;
  target_date?: string;
  completed?: boolean;
  progress?: number;
  created_at?: string;
}

export interface VoiceNote {
  id?: number;
  user_id: string;
  file_path: string;
  transcription?: string;
  duration?: number;
  file_type?: string;
  file_size?: number;
  created_at?: string;
}

export interface UserStats {
  id?: number;
  user_id: string;
  current_streak?: number;
  total_sessions?: number;
  total_moods_logged?: number;
  wellness_score?: number;
  mood_consistency?: number;
  session_engagement?: number;
  community_activity?: number;
  last_activity_date?: string;
  updated_at?: string;
}

export interface SessionSummary {
  id: string;
  user_id: string;
  session_date: string;
  emotions: string; // JSON array
  key_insights: string;
  mood_improvement: number;
  session_duration: number;
}

// New interfaces for chat and session tracking
export interface ChatConversation {
  id: string;
  user_id: string;
  category: string;
  personality: string;
  title?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  detected_emotion?: string;
  created_at: string;
}

export interface TherapySession {
  id: string;
  user_id: string;
  conversation_id?: string;
  session_type: 'chat' | 'mood' | 'assessment';
  duration_minutes?: number;
  summary?: string;
  key_topics?: string; // JSON array
  mood_before?: string;
  mood_after?: string;
  started_at: string;
  ended_at?: string;
}
