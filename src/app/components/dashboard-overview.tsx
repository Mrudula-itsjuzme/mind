import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/app/components/ui/utils";
import {
  MessageCircle,
  Smile,
  Meh,
  Frown,
  ArrowRight,
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
      {/* Hero Header - Deepened Richness */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#120A0B] p-16 ring-1 ring-[#E5C07B]/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        {/* Deep Wine Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E5C07B]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2D1417]/40 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <Badge className="bg-[#E5C07B] text-[#120A0B] font-black px-4 py-1.5 border-none shadow-[0_0_20px_rgba(229,192,123,0.3)] uppercase tracking-[0.3em] text-[10px]">Premium Entity</Badge>
            <span className="h-[1px] w-12 bg-[#E5C07B]/20" />
            <span className="text-[10px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.4em]">Sequence Alpha-2026</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-6xl font-extrabold text-[#FDF5E6] serif leading-tight tracking-tighter">
              The <span className="text-[#E5C07B] italic">Sanctuary</span> <br />
              <span className="text-4xl opacity-80">of Presence</span>
            </h2>
            <p className="text-[#FDF5E6]/40 text-lg max-w-2xl font-medium leading-relaxed italic border-l-2 border-[#E5C07B]/20 pl-8">
              "True luxury is found in the calibrated silence of the mind, where every resonance is curated and every sequence is precise."
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-14 px-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-transform hover:scale-105 active:scale-95">
              Initiate Sequence
            </Button>
            <Button variant="outline" className="border-[#E5C07B]/10 bg-white/5 text-[#E5C07B] hover:bg-[#E5C07B]/5 h-14 px-8 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] backdrop-blur-md">
              View Diagnostics
            </Button>
          </div>
        </div>

        <div className="absolute top-0 right-0 p-16 opacity-[0.05] scale-125 rotate-6 select-none pointer-events-none transition-all duration-1000">
          <LayoutDashboard className="h-96 w-96 text-[#E5C07B]" />
        </div>

        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      </div>

      {/* Global Health Index */}
      <HealthAnalytics />

      {/* Therapy Summaries - Opulent Archives */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-6">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-[#FDF5E6] serif tracking-tight">Archives of Repose</h3>
            <span className="text-[9px] font-black text-[#E5C07B]/40 uppercase tracking-[0.4em] mt-1">Historical Sequence Synthesis</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setActiveSection('summaries')} className="text-[#E5C07B]/60 hover:text-[#E5C07B] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 px-6 h-11 rounded-xl ring-1 ring-[#E5C07B]/5">
            Examine archives <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {recentSessions.length > 0 ? (
            recentSessions.map((session) => (
              <Card key={session.id} className="border-0 bg-[#1A1112] overflow-hidden group hover:ring-[#E5C07B]/30 transition-all rounded-[2rem] ring-1 ring-[#E5C07B]/10 shadow-2xl relative">
                {/* Subtle Card Glow */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <CardHeader className="bg-[#2D1417]/10 pb-6 px-8 pt-8 border-b border-white/5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#E5C07B]/5 flex items-center justify-center ring-1 ring-[#E5C07B]/20">
                        <FileText className="h-4 w-4 text-[#E5C07B]" />
                      </div>
                      <span className="text-[10px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.3em]">
                        {formatDate(session.started_at)}
                      </span>
                    </div>
                    <Badge className="bg-[#120A0B]/60 text-[#E5C07B] border border-[#E5C07B]/20 text-[9px] font-black tracking-widest px-3 py-1">
                      {session.duration_minutes} MINS
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pb-10 relative z-10">
                  <p className="text-base text-[#FDF5E6]/50 line-clamp-3 mb-10 font-medium leading-relaxed italic">
                    "{session.summary || "The summary for this energetic transition remains unsequenced."}"
                  </p>
                  <Button variant="ghost" className="w-full justify-between text-[#E5C07B] hover:text-[#E5C07B] hover:bg-[#E5C07B]/5 font-black uppercase tracking-[0.2em] text-[10px] p-0 h-auto group/btn">
                    Examine Sequence Detail
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="lg:col-span-3 py-32 text-center bg-[#1A1112]/40 rounded-[2.5rem] ring-1 ring-[#E5C07B]/10 border-none relative overflow-hidden group hover:ring-[#E5C07B]/20 transition-all">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E5C07B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E5C07B]/5 mx-auto mb-10 ring-1 ring-[#E5C07B]/20 shadow-2xl">
                  <FileText className="h-8 w-8 text-[#E5C07B]/40" />
                </div>
                <h4 className="text-[#FDF5E6]/40 font-black uppercase tracking-[0.4em] text-xs mb-12">The Archives are Void</h4>
                <Button
                  variant="outline"
                  className="mt-10 border-[#E5C07B]/20 text-[#E5C07B] hover:bg-[#E5C07B]/10 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] h-16 px-12 shadow-none ring-1 ring-[#E5C07B]/10 hover:ring-[#E5C07B]/40 transition-all bg-[#120A0B]/60 backdrop-blur-lg"
                  onClick={() => setActiveSection('therapist')}
                >
                  Initiate Primordial Link
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Refined Luxury Hero Stats */}
      <section aria-label="Welcome and statistics" className="bg-[#120A0B] rounded-[2.5rem] p-16 text-white relative overflow-hidden ring-1 ring-[#E5C07B]/10 shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
        {/* Subtle Glows */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#E5C07B]/5 blur-[80px] rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#2D1417]/30 blur-[60px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-16">
          <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-4">
              <Badge className="bg-[#E5C07B] text-[#120A0B] border-none font-black px-4 py-1.5 text-[10px] tracking-widest uppercase shadow-[0_0_20px_rgba(229,192,123,0.3)]">Member</Badge>
              <span className="h-[1px] w-12 bg-[#E5C07B]/20" />
              <span className="text-[10px] font-black text-[#FDF5E6]/20 tracking-[0.4em] uppercase">Alex Sequence 2024</span>
            </div>
            <h2 className="text-4xl font-extrabold serif tracking-tight leading-tight">The Path to <span className="text-[#E5C07B] italic">Equilibrium</span></h2>
            <p className="text-[#FDF5E6]/50 text-lg leading-relaxed font-medium italic border-l-2 border-[#E5C07B]/20 pl-8">
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

      {/* Quick Actions - Opulent Grid */}
      <section aria-label="Quick actions" className="space-y-10">
        <div className="flex flex-col px-6">
          <h3 className="text-2xl font-bold text-[#FDF5E6] serif tracking-tight">Premium Services</h3>
          <span className="text-[9px] font-black text-[#E5C07B]/40 uppercase tracking-[0.4em] mt-1">Direct Sequence Access</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {QUICK_ACTIONS.map((action, index) => (
            <Card
              key={index}
              onClick={() => setActiveSection(action.action)}
              className="cursor-pointer bg-[#1A1112] hover:bg-[#120A0B] transition-all duration-500 border-0 ring-1 ring-[#E5C07B]/10 rounded-[2rem] group overflow-hidden shadow-2xl relative"
            >
              {/* Luxury Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <CardContent className="p-10 relative z-10">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-10 shadow-2xl transition-all bg-[#120A0B] ring-1 ring-white/5 group-hover:ring-[#E5C07B]/40 group-hover:scale-110 duration-500"
                  style={{ color: action.color }}
                >
                  <action.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-[#FDF5E6] mb-4 serif tracking-tight">{action.title}</h4>
                <p className="text-[10px] text-[#FDF5E6]/30 leading-relaxed font-black uppercase tracking-[0.2em]">{action.description}</p>
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
