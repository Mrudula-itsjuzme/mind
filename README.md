# 🌱 MindCare - Mental Health & Wellness Platform

A comprehensive mental health support platform with AI-powered features and professional therapist connections.

## ✨ Features

- **📊 Dashboard Overview** - View your mental health analytics and progress
- **😊 Mood Tracker** - Track your daily moods with calendar visualization
- **💬 AI Chatbot** - 24/7 AI therapy support with multiple personality types
- **👨‍⚕️ Therapist Directory** - Browse and connect with licensed therapists
- **👥 Community Section** - Connect with support groups and forums
- **📝 Session Summaries** - Review automated therapy session summaries

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Database Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Copy `.env.example` to `.env.local`**
3. **Add your Supabase credentials** to `.env.local`:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Note:** The app uses SQLite (via sql.js) for local storage. All data is stored in your browser's localStorage.

### Build for Production

```bash
npm run build
```

## 🛠️ Tech Stack

- **React** 18.3.1 + TypeScript
- **Vite** 6.3.5
- **Tailwind CSS** 4.1.12
- **Radix UI** + Material-UI components
- **Lucide React** icons
- **Framer Motion** animations

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Main app with navigation
│   └── components/                # All app components
│       ├── dashboard-overview.tsx
│       ├── mood-tracker.tsx
│       ├── ai-chatbot.tsx
│       ├── therapist-directory.tsx
│       ├── community-section.tsx
│       ├── session-summaries.tsx
│       ├── app-header.tsx
│       └── ui/                    # UI components
├── main.tsx                       # Entry point
└── styles/                        # Global styles
```

## 🎯 Usage

The app has a tabbed navigation to switch between different sections:
- **Dashboard** - Default view with overview
- **Mood Tracking** - Log and view your moods
- **AI Chat** - Talk to the AI therapist
- **Therapists** - Find professional help
- **Community** - Join support groups
- **Summaries** - View session history

## 📱 Future Plans

- Flutter mobile app for iOS and Android
- Real backend integration
- User authentication
- Data persistence
- Push notifications

## 🆘 Crisis Support

**If you're experiencing a mental health emergency:**
- Call **988** (Suicide & Crisis Lifeline)
- Text **HELLO to 741741** (Crisis Text Line)
- Visit your nearest emergency room

---

**Made with ❤️ for better mental health**