import { useState, useEffect, lazy, Suspense } from "react";
import { AppHeader } from "@/app/components/app-header";
import { MentalHealthLoader } from "@/app/components/common/MentalHealthLoader";
import { db } from "@/lib/database/db";
import { BottomNavigation } from "@/app/components/ui/bottom-navigation";
import { SidebarProvider, SidebarInset } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import { FloatingAI } from "./components/ui/floating-ai";

// Lazy load components
const DashboardOverview = lazy(() => import("@/app/components/dashboard-overview").then(module => ({ default: module.DashboardOverview })));
const MoodTracker = lazy(() => import("@/app/components/mood-tracker").then(module => ({ default: module.MoodTracker })));
const AIChatbot = lazy(() => import("@/app/components/ai-chatbot").then(module => ({ default: module.AIChatbot })));
const TherapistDirectory = lazy(() => import("@/app/components/therapist-directory").then(module => ({ default: module.TherapistDirectory })));
const CommunitySection = lazy(() => import("@/app/components/community-section").then(module => ({ default: module.CommunitySection })));
const SessionSummaries = lazy(() => import("@/app/components/session-summaries").then(module => ({ default: module.SessionSummaries })));
const ProfilePage = lazy(() => import("@/app/components/profile-page").then(module => ({ default: module.ProfilePage })));
const DietitianSection = lazy(() => import("./components/dietitian-section").then(module => ({ default: module.DietitianSection })));
const FitnessSection = lazy(() => import("./components/fitness-section").then(module => ({ default: module.FitnessSection })));

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        await db.init();
      } catch (error) {
        console.error("App initialization failed:", error);
      } finally {
        setTimeout(() => setIsAppLoading(false), 4000);
      }
    };

    initApp();
  }, []);

  if (isAppLoading) {
    return <MentalHealthLoader />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#2D1417]">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <SidebarInset className="flex flex-col bg-transparent overflow-hidden">
          <AppHeader activeSection={activeSection} />

          <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
            <div className="mx-auto max-w-6xl">
              <Suspense fallback={<div className="flex items-center justify-center p-12 text-[#E5C07B] font-bold uppercase tracking-widest text-xs">Synthesizing Experience...</div>}>
                {activeSection === "dashboard" && <DashboardOverview setActiveSection={setActiveSection} />}
                {activeSection === "mood" && <MoodTracker />}
                {activeSection === "therapist" && <AIChatbot />}
                {activeSection === "therapists" && <TherapistDirectory />}
                {activeSection === "community" && <CommunitySection />}
                {activeSection === "summaries" && <SessionSummaries />}
                {activeSection === "profile" && <ProfilePage />}
                {activeSection === "dietitian" && <DietitianSection />}
                {activeSection === "fitness" && <FitnessSection />}
              </Suspense>
            </div>
          </main>

          <div className="lg:hidden">
            <BottomNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>

          <FloatingAI />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
