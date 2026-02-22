import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
  Bell,
  ChevronRight,
  Search,
} from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { SidebarTrigger } from "@/app/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

interface AppHeaderProps {
  activeSection: string;
}

export function AppHeader({ activeSection }: AppHeaderProps) {
  const getSectionLabel = (id: string) => {
    switch (id) {
      case "dashboard": return "Overview";
      case "mood": return "Mood Tracker";
      case "therapist": return "AI Sanctuary";
      case "therapists": return "Directory";
      case "dietitian": return "Nutrition";
      case "fitness": return "Performance";
      case "profile": return "Account";
      case "summaries": return "Archives";
      default: return id;
    }
  };

  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-[#E5C07B]/10 bg-[#120A0B]/80 backdrop-blur-2xl sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <SidebarTrigger className="text-[#FDF5E6]/40 hover:text-[#E5C07B] transition-colors" />

        <div className="h-6 w-[1px] bg-[#E5C07B]/10 hidden sm:block" />

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#FDF5E6]/20 hover:text-[#E5C07B] transition-colors uppercase tracking-[0.3em] text-[9px] font-black">
                Sanctuary
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#E5C07B]/10">
              <ChevronRight className="h-3 w-3" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#E5C07B] uppercase tracking-[0.3em] text-[9px] font-black italic">
                {getSectionLabel(activeSection)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-4 h-3.5 w-3.5 text-[#E5C07B]/40" />
          <input
            type="text"
            placeholder="Search resonance..."
            className="h-11 w-72 bg-[#1A1112]/60 border border-[#E5C07B]/10 rounded-xl pl-11 pr-4 text-[11px] text-[#FDF5E6] focus:outline-none focus:ring-1 focus:ring-[#E5C07B]/30 placeholder:text-[#FDF5E6]/10 transition-all font-bold italic"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-white/5 text-[#E5C07B]/60 hover:text-[#E5C07B] hover:bg-[#E5C07B]/5 relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-[#E5C07B] p-0 shadow-[0_0_10px_#E5C07B]" />
          </Button>

          <Avatar className="h-10 w-10 ring-2 ring-[#E5C07B]/10 hover:ring-[#E5C07B]/30 transition-all cursor-pointer shadow-2xl">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback className="bg-[#120A0B] text-[#E5C07B]">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
