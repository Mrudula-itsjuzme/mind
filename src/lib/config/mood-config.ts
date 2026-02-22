import {
    Smile,
    Meh,
    Frown,
    Angry,
    LucideIcon
} from "lucide-react";

/**
 * Mood Configuration
 * All mood types, colors, emojis, and intensity levels
 */

export interface MoodConfig {
    name: string;
    icon: LucideIcon;
    color: string;
    emoji: string;
    intensity: number; // 1-10 scale
}

export const MOODS: MoodConfig[] = [
    { name: "Great", icon: Smile, color: "#D7F0DD", emoji: "😊", intensity: 9 },
    { name: "Good", icon: Smile, color: "#c5e8cd", emoji: "🙂", intensity: 7 },
    { name: "Okay", icon: Meh, color: "#FFF7EC", emoji: "😐", intensity: 5 },
    { name: "Anxious", icon: Frown, color: "#FDE5D6", emoji: "😰", intensity: 4 },
    { name: "Sad", icon: Frown, color: "#fcd4c4", emoji: "😢", intensity: 3 },
    { name: "Angry", icon: Angry, color: "#ffb3ba", emoji: "😠", intensity: 2 },
];

/**
 * Get mood configuration by name
 */
export function getMoodByName(name: string): MoodConfig | undefined {
    return MOODS.find(m => m.name === name);
}

/**
 * Get mood emoji by name
 */
export function getMoodEmoji(name: string): string {
    return getMoodByName(name)?.emoji || "😐";
}

/**
 * Get mood color by name
 */
export function getMoodColor(name: string): string {
    return getMoodByName(name)?.color || "#FFF7EC";
}
