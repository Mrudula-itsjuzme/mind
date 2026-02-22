import {
    LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/app/components/ui/utils";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import { NAV_ITEMS } from "@/lib/config/navigation-config";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

interface AppSidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
    return (
        <Sidebar className="border-r border-[#E5C07B]/10 bg-[#120A0B]/95 backdrop-blur-2xl">
            <SidebarHeader className="h-20 flex items-center px-8 border-b border-[#E5C07B]/5">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5C07B] text-[#120A0B] shadow-[0_0_20px_rgba(229,192,123,0.3)] transition-transform duration-500 group-hover:scale-110">
                        <span className="text-2xl">🐧</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-extrabold text-[#FDF5E6] tracking-tighter leading-none">
                            Penguin<span className="text-[#E5C07B] italic font-medium">.AI</span>
                        </h1>
                        <span className="text-[8px] font-black text-[#E5C07B]/40 uppercase tracking-[0.4em] mt-1">Luxury Wellness</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-4 py-8">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 pb-4 text-[9px] font-black uppercase tracking-[0.3em] text-[#E5C07B]/30">
                        The Wellness Suite
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2">
                            {NAV_ITEMS.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        isActive={activeSection === item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`h-12 px-4 rounded-2xl transition-all duration-500 overflow-hidden relative group ${activeSection === item.id
                                            ? "bg-[#E5C07B] text-[#120A0B] shadow-[0_0_30px_rgba(229,192,123,0.15)]"
                                            : "text-[#FDF5E6]/40 hover:bg-[#1A1112] hover:text-[#E5C07B]"
                                            }`}
                                    >
                                        <div className={cn(
                                            "absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-500",
                                            activeSection === item.id && "opacity-100"
                                        )} />
                                        <item.icon className={`h-4.5 w-4.5 z-10 ${activeSection === item.id ? "text-[#120A0B]" : "group-hover:scale-110 transition-transform"}`} />
                                        <span className="font-bold tracking-tight z-10 text-sm">{item.label}</span>
                                        {activeSection === item.id && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="absolute right-2 h-1.5 w-1.5 bg-[#120A0B] rounded-full"
                                            />
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-6 border-t border-[#E5C07B]/5">
                <div className="space-y-4">
                    <button
                        onClick={() => setActiveSection("profile")}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#1A1112]/40 ring-1 ring-white/5 hover:ring-[#E5C07B]/20 transition-all group"
                    >
                        <Avatar className="h-10 w-10 ring-2 ring-[#E5C07B]/10 group-hover:ring-[#E5C07B]/30 transition-all shadow-2xl">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                            <AvatarFallback className="bg-[#120A0B] text-[#E5C07B]">M</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <p className="text-sm font-bold text-[#FDF5E6] tracking-tight">Mrudula</p>
                            <p className="text-[9px] font-black text-[#E5C07B]/40 uppercase tracking-widest">Premium Entity</p>
                        </div>
                    </button>

                    <button className="w-full flex items-center justify-center gap-2 h-10 rounded-xl text-[#FDF5E6]/20 hover:text-red-500/60 hover:bg-red-500/5 transition-all text-[9px] font-black uppercase tracking-[0.3em]">
                        <LogOut className="h-3.5 w-3.5" />
                        Sequence Exit
                    </button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
