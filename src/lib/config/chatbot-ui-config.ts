import {
    Brain,
    Sparkles,
    Heart,
    UtensilsCrossed,
    Dumbbell,
    Smile,
    Stethoscope,
    LucideIcon
} from "lucide-react";

/**
 * Chatbot UI Configuration
 * All UI-related constants for the chatbot component
 */

export interface TherapyCategory {
    name: string;
    icon: LucideIcon;
    color: string;
    description: string;
}

export interface PersonalityOption {
    name: string;
    emoji: string;
    type: "professional" | "casual" | "supportive" | "motivational" | "minimal";
    image: string;
}

/**
 * Therapy category options for chatbot
 */
export const THERAPY_CATEGORIES: TherapyCategory[] = [
    {
        name: "Therapist",
        icon: Brain,
        color: "#5A242B",
        description: "General mental health support"
    },
    {
        name: "Life Coach",
        icon: Sparkles,
        color: "#722F37",
        description: "Goal setting and motivation"
    },
    {
        name: "Grief Support",
        icon: Heart,
        color: "#3D181C",
        description: "Loss and bereavement"
    },
    {
        name: "Psychology Assessment",
        icon: Stethoscope,
        color: "#1A1112",
        description: "Disorder screening & recommendations"
    },
    {
        name: "Dietitian",
        icon: UtensilsCrossed,
        color: "#2D1417",
        description: "Nutrition and eating habits"
    },
    {
        name: "Workout Planner",
        icon: Dumbbell,
        color: "#5A242B",
        description: "Fitness and exercise"
    },
    {
        name: "Mood Planner",
        icon: Smile,
        color: "#722F37",
        description: "Daily mood management"
    },
];

/**
 * Personality options for chatbot
 */
export const PERSONALITY_OPTIONS: PersonalityOption[] = [
    { name: "Dr. Elena (Gf/Waifu Mode)", emoji: "👩‍⚕️", type: "professional", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
    { name: "Dr. Marcus (Calm & Stoic)", emoji: "👨‍⚕️", type: "professional", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400" },
    { name: "Alex (Best Friend)", emoji: "🤗", type: "casual", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
    { name: "Arthur (Father Figure)", emoji: "👨", type: "supportive", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    { name: "Coach Rex (High Energy)", emoji: "💪", type: "motivational", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400" },
    { name: "Luna (The Listener)", emoji: "🎧", type: "minimal", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
];

/**
 * Initial welcome message from AI
 */
export const INITIAL_AI_MESSAGE = "Hello! I'm here to support you on your mental wellness journey. How are you feeling today?";

/**
 * Placeholder messages
 */
export const CHATBOT_PLACEHOLDERS = {
    selectCategory: "Select a category to start chatting...",
    selectPersonality: "Select a personality to begin...",
    typeMessage: "Type your message...",
    thinking: "Thinking...",
};

/**
 * Helper functions
 */
export function getCategoryByName(name: string): TherapyCategory | undefined {
    return THERAPY_CATEGORIES.find(c => c.name === name);
}

export function getPersonalityByName(name: string): PersonalityOption | undefined {
    return PERSONALITY_OPTIONS.find(p => p.name === name);
}
