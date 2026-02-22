import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
    Mail,
    Calendar,
    TrendingUp,
    Heart,
    MessageCircle,
    Award,
    Target,
    Flame,
    Settings,
    LogOut,
    Sparkles
} from "lucide-react";
import { statsService } from "@/lib/services";
import { db } from "@/lib/database/db";
import type { UserStats } from "@/lib/database/schema";

export function ProfilePage() {
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [dashboardStats, setDashboardStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("User");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const loadStats = async () => {
            try {
                // Get user session from database
                const session = db.getUserSession();
                if (session) {
                    setUserEmail(session.email || "user@mindcare.com");
                    setUserName(session.email?.split("@")[0] || "User");
                }

                const stats = statsService.getUserStats();
                const dashStats = db.getDashboardStats("demo-user");
                setUserStats(stats);
                setDashboardStats(dashStats);
            } catch (error) {
                console.error("Failed to load user stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-6">
                    <div className="h-16 w-16 items-center justify-center rounded-2xl bg-[#E5C07B]/5 mx-auto border border-[#E5C07B]/10 flex animate-pulse">
                        <span className="text-2xl">🐧</span>
                    </div>
                    <p className="text-[#E5C07B] font-bold uppercase tracking-[0.3em] text-[10px]">Retrieving Identity...</p>
                </div>
            </div>
        );
    }

    const wellnessScore = userStats?.wellness_score || 0;
    const currentStreak = dashboardStats?.currentStreak || 0;
    const totalMoods = dashboardStats?.totalMoods || 0;
    const totalChats = dashboardStats?.totalChats || 0;

    return (
        <div className="mx-auto space-y-16 pb-16 animate-in fade-in duration-1000">
            {/* Header Section - Refined Sequence */}
            <div className="bg-[#120A0B] rounded-[3rem] p-16 ring-1 ring-[#E5C07B]/10 relative overflow-hidden group shadow-4xl">
                <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                <div className="absolute top-0 right-0 p-24 opacity-[0.03] scale-150 rotate-12 select-none pointer-events-none transition-all duration-1000 group-hover:opacity-[0.06] group-hover:rotate-45">
                    <Sparkles className="h-96 w-96 text-[#E5C07B]" />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <Avatar className="h-44 w-44 ring-8 ring-[#E5C07B]/10 shadow-4xl transition-all duration-1000 group-hover:ring-[#E5C07B]/20 group-hover:scale-105">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                        <AvatarFallback className="text-4xl bg-[#1A1112] text-[#E5C07B] serif italic font-black">
                            {userName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left space-y-6">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <Badge className="bg-[#E5C07B] text-[#120A0B] border-none font-black px-4 py-1 text-[10px] tracking-[0.3em] uppercase shadow-[0_5px_20px_rgba(229,192,123,0.3)]">Premium Resonance</Badge>
                        </div>
                        <h1 className="text-6xl font-black text-[#FDF5E6] serif italic tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">{userName}</h1>
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                            <p className="text-[#FDF5E6]/60 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] italic">
                                <Mail className="h-4 w-4 text-[#E5C07B]" />
                                {userEmail}
                            </p>
                            <p className="text-[#FDF5E6]/60 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] italic">
                                <Calendar className="h-4 w-4 text-[#E5C07B]" />
                                Initiated Jan 2026
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button variant="outline" className="bg-white/5 border-[#E5C07B]/20 text-[#FDF5E6] hover:bg-[#E5C07B]/10 hover:border-[#E5C07B]/40 rounded-2xl px-8 h-14 font-black uppercase tracking-[0.2em] text-[10px] backdrop-blur-xl transition-all shadow-2xl">
                            <Settings className="h-4 w-4 mr-3 text-[#E5C07B]" />
                            Configuration
                        </Button>
                        <Button variant="outline" className="bg-white/5 border-white/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/5 rounded-2xl px-8 h-14 font-black uppercase tracking-[0.2em] text-[10px] backdrop-blur-xl transition-all">
                            <LogOut className="h-4 w-4 mr-3" />
                            Disconnect
                        </Button>
                    </div>
                </div>
            </div>

            {statsService ? (
                /* Stats Grid */
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Wellness Score */}
                    <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 hover:ring-[#E5C07B]/40 transition-all duration-700 cursor-pointer rounded-[2.5rem] shadow-3xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <CardHeader className="p-10 pb-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E5C07B]/30">Wellness Index</CardTitle>
                                <TrendingUp className="h-5 w-5 text-[#E5C07B]/40 group-hover:text-[#E5C07B] transition-colors" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 relative z-10">
                            <div className="text-6xl font-black text-[#FDF5E6] serif italic tracking-tighter drop-shadow-2xl">{wellnessScore.toFixed(0)}</div>
                            <div className="mt-8 h-1.5 w-full bg-[#1A1112] rounded-full overflow-hidden shadow-inner border border-white/5">
                                <div className="h-full bg-gradient-to-r from-[#E5C07B]/40 to-[#E5C07B] shadow-[0_0_15px_#E5C07B]" style={{ width: `${wellnessScore}%` }} />
                            </div>
                            <p className="text-[9px] font-black text-[#FDF5E6]/20 mt-6 uppercase tracking-[0.3em] italic">Physiological Potency</p>
                        </CardContent>
                    </Card>

                    {/* Current Streak */}
                    <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 hover:ring-[#E5C07B]/40 transition-all duration-700 cursor-pointer rounded-[2.5rem] shadow-3xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <CardHeader className="p-10 pb-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E5C07B]/30">Presence Ritual</CardTitle>
                                <Flame className="h-5 w-5 text-[#E5C07B]/40 group-hover:text-[#E5C07B] transition-colors" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 relative z-10">
                            <div className="text-6xl font-black text-[#FDF5E6] serif italic tracking-tighter drop-shadow-2xl">{currentStreak}</div>
                            <p className="text-[9px] font-black text-[#FDF5E6]/20 mt-6 uppercase tracking-[0.3em] italic">Consecutive Cycles</p>
                            <Badge className="mt-8 bg-[#E5C07B] text-[#120A0B] hover:bg-[#E5C07B] border-none font-black px-4 py-1.5 text-[9px] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(229,192,123,0.3)] group-hover:scale-110 transition-transform">
                                Vitality Peak 🔥
                            </Badge>
                        </CardContent>
                    </Card>

                    {/* Total Moods Logged */}
                    <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 hover:ring-[#E5C07B]/40 transition-all duration-700 cursor-pointer rounded-[2.5rem] shadow-3xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <CardHeader className="p-10 pb-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E5C07B]/30">Sentimental Map</CardTitle>
                                <Heart className="h-5 w-5 text-[#E5C07B]/40 group-hover:text-[#E5C07B] transition-colors" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 relative z-10">
                            <div className="text-6xl font-black text-[#FDF5E6] serif italic tracking-tighter drop-shadow-2xl">{totalMoods}</div>
                            <p className="text-[9px] font-black text-[#FDF5E6]/20 mt-6 uppercase tracking-[0.3em] italic">Logged Observations</p>
                        </CardContent>
                    </Card>

                    {/* Total Chat Sessions */}
                    <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 hover:ring-[#E5C07B]/40 transition-all duration-700 cursor-pointer rounded-[2.5rem] shadow-3xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <CardHeader className="p-10 pb-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E5C07B]/30">Dialogic Depth</CardTitle>
                                <MessageCircle className="h-5 w-5 text-[#E5C07B]/40 group-hover:text-[#E5C07B] transition-colors" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 relative z-10">
                            <div className="text-6xl font-black text-[#FDF5E6] serif italic tracking-tighter drop-shadow-2xl">{totalChats}</div>
                            <p className="text-[9px] font-black text-[#FDF5E6]/20 mt-6 uppercase tracking-[0.3em] italic">Curated Enquiries</p>
                        </CardContent>
                    </Card>
                </div>
            ) : null}

            {/* Achievements & Goals */}
            <div className="grid lg:grid-cols-2 gap-10">
                {/* Achievements */}
                <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[3rem] overflow-hidden shadow-4xl relative">
                    <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                    <CardHeader className="p-12 pb-8 border-b border-white/5 bg-[#1A1112]/40 backdrop-blur-md relative z-10">
                        <CardTitle className="flex items-center gap-6 serif italic text-3xl text-[#FDF5E6]">
                            <Award className="h-8 w-8 text-[#E5C07B] drop-shadow-[0_0_10px_rgba(229,192,123,0.3)]" />
                            Honorary Milestones
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-12 space-y-8 relative z-10">
                        {[
                            { icon: "🏆", title: "First Week Ascendance", desc: "Logged moods for 7 consecutive cycles", status: "Unlocked" },
                            { icon: "🌱", title: "Eloquence in Dialogue", desc: "Completed 5 therapeutic AI sessions", status: "Unlocked" },
                        ].map((milestone, idx) => (
                            <div key={idx} className="flex items-center gap-8 p-8 bg-[#1A1112]/40 rounded-[2rem] border border-white/5 hover:border-[#E5C07B]/20 hover:bg-[#120A0B] transition-all duration-700 cursor-pointer group shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="text-5xl filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 relative z-10">{milestone.icon}</div>
                                <div className="flex-1 space-y-2 relative z-10">
                                    <h4 className="text-xl font-black text-[#FDF5E6] serif italic group-hover:text-[#E5C07B] transition-colors">{milestone.title}</h4>
                                    <p className="text-[10px] text-[#FDF5E6]/40 font-black uppercase tracking-[0.2em] italic">{milestone.desc}</p>
                                </div>
                                <Badge className="bg-[#E5C07B] text-[#120A0B] hover:bg-[#E5C07B] border-none font-black text-[9px] uppercase tracking-[0.3em] px-4 py-1 shadow-lg relative z-10">{milestone.status}</Badge>
                            </div>
                        ))}

                        <div className="flex items-center gap-8 p-8 bg-[#1A1112]/20 rounded-[2rem] border border-white/5 opacity-40 grayscale scale-95 transition-all relative overflow-hidden">
                            <div className="text-5xl relative z-10">💎</div>
                            <div className="flex-1 space-y-2 relative z-10">
                                <h4 className="text-xl font-black text-[#FDF5E6]/40 serif italic">Lunar Guardian</h4>
                                <p className="text-[10px] text-[#FDF5E6]/20 font-black uppercase tracking-[0.2em] italic">Maintain a 30-day streak of presence</p>
                            </div>
                            <Badge variant="outline" className="border-white/10 text-[#FDF5E6]/20 font-black text-[9px] uppercase tracking-[0.3em] px-4 py-1 relative z-10">Locked</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Goals */}
                <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[3rem] overflow-hidden shadow-4xl relative">
                    <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                    <CardHeader className="p-12 pb-8 border-b border-white/5 bg-[#1A1112]/40 backdrop-blur-md relative z-10">
                        <CardTitle className="flex items-center gap-6 serif italic text-3xl text-[#FDF5E6]">
                            <Target className="h-8 w-8 text-[#E5C07B] drop-shadow-[0_0_10px_rgba(229,192,123,0.3)]" />
                            Aspiration Targets
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-12 space-y-12 relative z-10">
                        {[
                            { label: "Daily Presence Ritual", val: 85 },
                            { label: "Weekly Introspective Check-in", val: 60 },
                            { label: "Mindfulness Integration", val: 40 },
                        ].map((goal, idx) => (
                            <div key={idx} className="space-y-4 group">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E5C07B]/30 group-hover:text-[#E5C07B]/60 transition-colors uppercase">{goal.label}</span>
                                    <span className="text-xl font-black text-[#E5C07B] serif italic drop-shadow-[0_0_10px_rgba(229,192,123,0.3)]">{goal.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#1A1112] rounded-full overflow-hidden shadow-inner border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#E5C07B]/40 to-[#E5C07B] shadow-[0_0_15px_#E5C07B] transition-all duration-1000"
                                        style={{ width: `${goal.val}%` }}
                                    />
                                </div>
                            </div>
                        ))}

                        <Button className="w-full mt-6 bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] rounded-[1.5rem] h-16 font-black uppercase tracking-[0.3em] text-[11px] shadow-[0_15px_40px_rgba(229,192,123,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/20">
                            Define New Aspiration
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Summary */}
            <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[3rem] overflow-hidden shadow-4xl relative group">
                <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                <CardHeader className="p-16 border-b border-white/5 bg-gradient-to-r from-[#1A1112] to-transparent relative z-10">
                    <CardTitle className="serif italic text-5xl text-[#FDF5E6] tracking-tighter drop-shadow-2xl">Historical Footprints</CardTitle>
                    <p className="text-[10px] font-black text-[#E5C07B]/30 uppercase tracking-[0.5em] mt-4">Trace the sequence of your evolution</p>
                </CardHeader>
                <CardContent className="p-16 relative z-10">
                    <div className="space-y-12">
                        {[
                            { icon: Heart, title: "Logged Sentiment: Pristine 😊", time: "Today at 9:30 AM" },
                            { icon: MessageCircle, title: "Completed Curated Dialogue", time: "Yesterday at 6:45 PM" },
                            { icon: Flame, title: "Attained 7-Day Vitality Streak! 🎉", time: "2 cycles ago" },
                        ].map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-12 group/item cursor-pointer">
                                <div className="h-20 w-20 rounded-[1.5rem] bg-[#1A1112] flex items-center justify-center group-hover/item:scale-110 group-hover/item:bg-[#120A0B] transition-all duration-700 shadow-2xl ring-1 ring-white/5 group-hover/item:ring-[#E5C07B]/40">
                                    <activity.icon className="h-8 w-8 text-[#E5C07B] group-hover/item:drop-shadow-[0_0_15px_#E5C07B] transition-all" />
                                </div>
                                <div className="flex-1 border-b border-white/5 pb-10 group-last:border-0">
                                    <p className="font-black text-[#FDF5E6] serif text-2xl italic tracking-tight group-hover/item:text-[#E5C07B] transition-colors">{activity.title}</p>
                                    <p className="text-[11px] font-black text-[#FDF5E6]/30 uppercase tracking-[0.3em] mt-4 flex items-center gap-3">
                                        <Calendar className="h-3.5 w-3.5 text-[#E5C07B]/40" />
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
