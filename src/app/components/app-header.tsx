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
    <header className="h-16 flex items-center justify-between px-6 border-b border-[#E5C07B]/10 bg-[#2D1417]/40 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-[#FDF5E6]/60 hover:text-[#E5C07B]" />

        <div className="h-4 w-[1px] bg-[#E5C07B]/10 mx-2 hidden sm:block" />

        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#FDF5E6]/40 hover:text-[#E5C07B] transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">
                Mind
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#E5C07B]/20">
              <ChevronRight className="h-3 w-3" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#E5C07B] uppercase tracking-[0.2em] text-[10px] font-extrabold italic">
                {getSectionLabel(activeSection)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-3.5 w-3.5 text-[#FDF5E6]/30" />
          <input
            type="text"
            placeholder="Search sanctuary..."
            className="h-9 w-64 bg-[#3D181C]/40 border border-[#E5C07B]/10 rounded-xl pl-9 pr-4 text-xs text-[#FDF5E6] focus:outline-none focus:ring-1 focus:ring-[#E5C07B]/30 placeholder:text-[#FDF5E6]/20 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-[#FDF5E6]/60 hover:text-[#E5C07B] hover:bg-white/5 relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#E5C07B] border border-[#2D1417] p-0 shadow-lg" />
          </Button>

          <Avatar className="h-8 w-8 ring-1 ring-[#E5C07B]/20 hover:ring-[#E5C07B]/50 transition-all cursor-pointer">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
