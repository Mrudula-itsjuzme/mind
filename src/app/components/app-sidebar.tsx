import {
    LogOut,
} from "lucide-react";
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
        <Sidebar className="border-r border-[#E5C07B]/10 bg-[#2D1417]">
            <SidebarHeader className="h-16 flex items-center px-6 border-b border-[#E5C07B]/5">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E5C07B] text-[#2D1417] shadow-lg">
                        <span className="text-xl">🐧</span>
                    </div>
                    <h1 className="text-lg font-extrabold text-[#FDF5E6] tracking-tight">
                        Penguin<span className="text-[#E5C07B] italic font-medium">.AI</span>
                    </h1>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3 py-6">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C07B]/40">
                        Wellness Suite
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {NAV_ITEMS.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        isActive={activeSection === item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`h-11 px-3 rounded-xl transition-all duration-300 ${activeSection === item.id
                                                ? "bg-[#E5C07B] text-[#2D1417] shadow-xl shadow-[#E5C07B]/10"
                                                : "text-[#FDF5E6]/60 hover:bg-[#3D181C] hover:text-[#E5C07B]"
                                            }`}
                                    >
                                        <item.icon className={`h-4 w-4 ${activeSection === item.id ? "text-[#2D1417]" : ""}`} />
                                        <span className="font-bold tracking-tight">{item.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-[#E5C07B]/5">
                <div className="space-y-1">
                    <button
                        onClick={() => setActiveSection("profile")}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-[#FDF5E6]/60 hover:bg-[#3D181C] hover:text-[#E5C07B] transition-all group"
                    >
                        <Avatar className="h-8 w-8 ring-2 ring-[#E5C07B]/20 group-hover:ring-[#E5C07B]/40 transition-all">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <p className="text-xs font-bold text-[#FDF5E6]">Mrudula</p>
                            <p className="text-[10px] text-[#FDF5E6]/40">Premium Member</p>
                        </div>
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#FDF5E6]/40 hover:text-red-400 transition-all text-[10px] font-bold uppercase tracking-[0.2em]">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
