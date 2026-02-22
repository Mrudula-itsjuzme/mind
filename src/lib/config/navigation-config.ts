import {
    LayoutDashboard,
    Dumbbell,
    Calendar,
    Search,
    Users,
    FileText,
    Utensils,
    Brain,
    LucideIcon
} from "lucide-react";

/**
 * Navigation Configuration
 * App navigation menu items
 */

export interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "mood", label: "Mood Tracker", icon: Calendar },
    { id: "therapist", label: "Therapist", icon: Brain }, // Renamed and updated icon
    { id: "community", label: "Community", icon: Users },
    { id: "dietitian", label: "Dietitian", icon: Utensils },
    { id: "fitness", label: "Fitness", icon: Dumbbell },
    { id: "therapists", label: "Find Therapist", icon: Search },
    { id: "summaries", label: "Summaries", icon: FileText },
];
