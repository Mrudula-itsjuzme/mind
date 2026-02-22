import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import {
  MessageCircle,
  Heart,
  Smile,
  Meh,
  Frown,
  ArrowRight,
  Users,
  Target,
  FileText,
  LayoutDashboard
} from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { moodService, statsService } from "@/lib/services";
import type { MoodRecord, UserStats } from "@/lib/database/schema";
import { QUICK_ACTIONS } from "@/lib/config/dashboard-config";
import { db } from "@/lib/database/db";
import { HealthAnalytics } from "./health-analytics";

interface DashboardOverviewProps {
  setActiveSection: (section: string) => void;
}

interface MoodEntry {
  date: string;
  mood: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const getMoodIcon = (moodType: string) => {
  const lowerCase = moodType.toLowerCase();
  if (lowerCase.includes('happy') || lowerCase.includes('joyful') || lowerCase.includes('excited')) {
    return Smile;
  } else if (lowerCase.includes('neutral') || lowerCase.includes('calm') || lowerCase.includes('okay')) {
    return Meh;
  } else {
    return Frown;
  }
};

const getMoodColor = (moodType: string) => {
  const lowerCase = moodType.toLowerCase();
  if (lowerCase.includes('happy') || lowerCase.includes('joyful')) {
    return "#FDF5E6";
  } else if (lowerCase.includes('neutral') || lowerCase.includes('calm')) {
    return "#E9DDE0";
  } else {
    return "#D7C2C6";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return `${diffDays} days ago`;

  return date.toLocaleDateString();
};

export function DashboardOverview({ setActiveSection }: DashboardOverviewProps) {
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const moods = moodService.getRecentMoods(3);
        const formattedMoods: MoodEntry[] = moods.map((mood: MoodRecord) => ({
          date: formatDate(mood.created_at || ''),
          mood: mood.mood_type,
          icon: getMoodIcon(mood.mood_type),
          color: getMoodColor(mood.mood_type)
        }));
        setRecentMoods(formattedMoods);

        const stats = statsService.getUserStats();
        setUserStats(stats);

        const sessions = await db.therapySessions.orderBy('started_at').reverse().limit(3).toArray();
        setRecentSessions(sessions);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center p-24 text-[#E5C07B] font-bold uppercase tracking-[0.2em] text-xs">Synthesizing Sanctuary...</div>;
  }

  const streak = userStats?.current_streak || 0;
  const totalSessions = userStats?.total_sessions || 0;

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Header - Refined structural design */}
      <div className="relative overflow-hidden rounded-2xl bg-[#3D181C] p-12 ring-1 ring-[#E5C07B]/10 shadow-none">
        <div className="relative z-10">
          <Badge className="bg-[#E5C07B] text-[#2D1417] font-bold px-3 py-1 mb-8 border-none shadow-sm uppercase tracking-[0.2em] text-[10px]">Premium Sequence</Badge>
          <h2 className="text-4xl font-bold text-[#FDF5E6] mb-4 serif leading-tight tracking-tight">Personal <span className="text-[#E5C07B] italic">Sanctuary</span></h2>
          <p className="text-[#FDF5E6]/40 text-base max-w-xl font-medium leading-relaxed italic">
            "The architecture of the mind is best refined in moments of absolute stillness and premium care."
          </p>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12 select-none pointer-events-none">
          <LayoutDashboard className="h-64 w-64 text-[#E5C07B]" />
        </div>
      </div>

      {/* Global Health Index */}
      <HealthAnalytics />

      {/* Therapy Summaries - Functional Block */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-[#FDF5E6] serif tracking-tight">Archives of Repose</h3>
          <Button variant="ghost" size="sm" onClick={() => setActiveSection('summaries')} className="text-[#E5C07B] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#E5C07B]/5 px-4 h-9">
            Examine All <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {recentSessions.length > 0 ? (
            recentSessions.map((session) => (
              <Card key={session.id} className="border-0 bg-[#3D181C] overflow-hidden group hover:ring-[#E5C07B]/20 transition-all rounded-2xl ring-1 ring-[#E5C07B]/10">
                <CardHeader className="bg-[#2D1417]/20 pb-4 px-6 pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#E5C07B]/40" />
                      <span className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.2em]">
                        {formatDate(session.started_at)}
                      </span>
                    </div>
                    <Badge variant="outline" className="border-[#E5C07B]/20 text-[#E5C07B] text-[10px] uppercase font-bold tracking-widest px-2">
                      {session.duration_minutes}m
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pb-8">
                  <p className="text-sm text-[#FDF5E6]/60 line-clamp-2 mb-8 font-medium leading-relaxed italic">
                    "{session.summary || "No summary available for this session."}"
                  </p>
                  <Button variant="ghost" size="sm" className="w-full justify-between text-[#E5C07B] hover:text-[#E5C07B] hover:bg-[#E5C07B]/5 font-bold uppercase tracking-[0.2em] text-[10px] p-0 h-auto">
                    View Archival Records
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="lg:col-span-3 py-24 text-center bg-[#3D181C]/20 rounded-2xl ring-1 ring-[#E5C07B]/5 border-none">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5C07B]/5 mx-auto mb-8">
                <FileText className="h-8 w-8 text-[#E5C07B]/20" />
              </div>
              <p className="text-[#FDF5E6]/40 font-bold uppercase tracking-[0.2em] text-xs">No records found</p>
              <Button
                variant="outline"
                className="mt-10 border-[#E5C07B]/20 text-[#E5C07B] hover:bg-[#E5C07B]/5 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] h-12 px-10 shadow-none ring-1 ring-[#E5C07B]/10 hover:ring-[#E5C07B]/30 transition-all"
                onClick={() => setActiveSection('therapist')}
              >
                Initiate First Session
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Refined Luxury Hero Stats */}
      <section aria-label="Welcome and statistics" className="bg-[#1A1112] rounded-2xl p-12 text-white relative overflow-hidden ring-1 ring-[#E5C07B]/10 shadow-none">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <Badge className="bg-[#E5C07B] text-[#1A1112] border-none font-bold px-3 py-0.5 text-[9px] tracking-widest uppercase">Member</Badge>
              <span className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase">Alex Sequence 2024</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 serif tracking-tight">The Path to <span className="text-[#E5C07B] italic">Equilibrium</span></h2>
            <p className="text-[#FDF5E6]/40 text-base leading-relaxed font-medium italic">
              {streak > 0
                ? `Your dedicated focus has sustained a ${streak}-day sanctuary. Every moment defines your path to mastery.`
                : 'The first step is often the most profound. Begin your premium wellness sequence today.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-12">
            <div className="flex items-center gap-6 group">
              <div className="h-12 w-12 rounded-xl bg-[#E5C07B]/5 flex items-center justify-center ring-1 ring-[#E5C07B]/20 transition-all">
                <Target className="h-6 w-6 text-[#E5C07B]" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em] mb-1">Momentum</div>
                <div className="text-2xl font-bold serif text-[#E5C07B]">{streak} Days</div>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center ring-1 ring-white/10 transition-all">
                <MessageCircle className="h-6 w-6 text-white/40" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em] mb-1">Engagements</div>
                <div className="text-2xl font-bold serif text-white">{totalSessions} Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions - Structural Grid */}
      <section aria-label="Quick actions" className="space-y-8">
        <h3 className="text-xl font-bold text-[#FDF5E6] px-2 serif tracking-tight">Premium Services</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_ACTIONS.map((action, index) => (
            <Card
              key={index}
              onClick={() => setActiveSection(action.action)}
              className="cursor-pointer hover:bg-[#E5C07B]/5 transition-all border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl group focus:outline-none focus:ring-2 focus:ring-[#E5C07B]/20 shadow-none hover:shadow-2xl hover:shadow-black/40 overflow-hidden"
            >
              <CardContent className="p-8">
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-8 shadow-sm transition-all bg-[#2D1417]/40 ring-1 ring-white/5 group-hover:ring-[#E5C07B]/30"
                  style={{ color: action.color }}
                >
                  <action.icon className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-bold text-[#FDF5E6] mb-3 serif tracking-tight">{action.title}</h4>
                <p className="text-xs text-[#FDF5E6]/40 leading-relaxed font-medium uppercase tracking-widest">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Emotional Trajectory - Main Content Block */}
      <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
        <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-[#E5C07B]/5 bg-[#2D1417]/10">
          <CardTitle className="text-2xl italic serif text-[#FDF5E6] tracking-tight text-shadow-sm">Emotional Trajectory</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection("mood")}
            className="text-[#E5C07B] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#E5C07B]/5"
          >
            Examine History <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        <CardContent className="p-8 space-y-4">
          {recentMoods.length > 0 ? (
            recentMoods.map((entry, index) => {
              const Icon = entry.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 rounded-2xl bg-[#2D1417]/20 ring-1 ring-white/5 group hover:ring-[#E5C07B]/20 transition-all cursor-default"
                >
                  <div className="flex items-center gap-6">
                    <div
                      className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform bg-[#3D181C] ring-1 ring-white/10"
                      style={{ color: entry.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#FDF5E6] serif italic tracking-tight capitalize">{entry.mood}</p>
                      <p className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.3em] mt-1">{entry.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E5C07B] font-bold uppercase tracking-[0.2em] text-[9px]">
                    Analysis
                  </Button>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-[#FDF5E6]/20 font-bold uppercase tracking-[0.2em] text-xs">
              No recent emotional records found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
