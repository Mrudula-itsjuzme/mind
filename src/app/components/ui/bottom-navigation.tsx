import { LayoutDashboard, Calendar, MessageCircle, Users } from "lucide-react";
import { cn } from "@/app/components/ui/utils";

interface BottomNavigationProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const BOTTOM_NAV_ITEMS = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "mood", label: "Mood", icon: Calendar },
    { id: "therapist", label: "Sanctuary", icon: MessageCircle },
    { id: "community", label: "Collective", icon: Users },
];

export function BottomNavigation({ activeSection, setActiveSection }: BottomNavigationProps) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#2D1417]/80 backdrop-blur-xl border-t border-[#E5C07B]/10 lg:hidden px-6 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-around max-w-md mx-auto">
                {BOTTOM_NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={cn(
                                "flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all relative group",
                                isActive ? "text-[#E5C07B]" : "text-[#FDF5E6]/30 hover:text-[#E5C07B]/60"
                            )}
                        >
                            <div className={cn(
                                "absolute inset-0 bg-[#E5C07B]/5 rounded-xl -z-10 transition-all duration-500 scale-75 opacity-0",
                                isActive && "scale-100 opacity-100 ring-1 ring-[#E5C07B]/10"
                            )} />
                            <Icon className={cn("h-5 w-5 transition-transform duration-500", isActive && "scale-110")} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
