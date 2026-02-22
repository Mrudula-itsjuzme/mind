import {
    MessageCircle,
    Heart,
    Users,
    Target,
    LucideIcon
} from "lucide-react";

/**
 * Dashboard Configuration
 * Quick actions displayed on the dashboard
 */

export interface QuickAction {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    action: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
    {
        title: "Start AI Session",
        description: "Talk to your AI therapist",
        icon: MessageCircle,
        color: "#FDE5D6",
        action: "chat"
    },
    {
        title: "Log Your Mood",
        description: "How are you feeling today?",
        icon: Heart,
        color: "#D7F0DD",
        action: "mood"
    },
    {
        title: "Find a Therapist",
        description: "Connect with professionals",
        icon: Users,
        color: "#f0f8ff",
        action: "therapists"
    },
    {
        title: "Join Community",
        description: "Connect with others",
        icon: Users,
        color: "#FFF7EC",
        action: "community"
    }
];
