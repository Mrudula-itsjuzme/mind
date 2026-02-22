import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
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
        <div className="mx-auto space-y-12 pb-12">
            {/* Header Section - Refined Sequence */}
            <div className="bg-[#1A1112] rounded-2xl p-12 ring-1 ring-[#E5C07B]/10 relative overflow-hidden group shadow-none">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12 select-none pointer-events-none transition-opacity group-hover:opacity-[0.05]">
                    <Sparkles className="h-64 w-64 text-[#E5C07B]" />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <Avatar className="h-32 w-32 ring-4 ring-[#E5C07B]/5 shadow-2xl transition-all duration-700 group-hover:ring-[#E5C07B]/20">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                        <AvatarFallback className="text-3xl bg-[#2D1417] text-[#E5C07B] serif font-bold">
                            {userName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <Badge className="bg-[#E5C07B] text-[#1A1112] border-none font-bold px-3 py-0.5 text-[9px] tracking-[0.2em] uppercase">Premium Member</Badge>
                        </div>
                        <h1 className="text-4xl font-bold text-[#FDF5E6] serif tracking-tight mb-4">{userName}</h1>
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start opacity-40">
                            <p className="text-[#FDF5E6] flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <Mail className="h-3.5 w-3.5 text-[#E5C07B]" />
                                {userEmail}
                            </p>
                            <p className="text-[#FDF5E6] flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                                <Calendar className="h-3.5 w-3.5 text-[#E5C07B]" />
                                Initiated Jan 2026
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="bg-white/10 border-[#E5C07B]/30 text-white hover:bg-white/20 rounded-xl px-6 h-12 font-bold backdrop-blur-md">
                            <Settings className="h-4 w-4 mr-2 text-[#E5C07B]" />
                            Settings
                        </Button>
                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl px-6 h-12 font-bold backdrop-blur-md">
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Wellness Score */}
                <Card className="border-0 shadow-xl bg-[#3D181C] ring-1 ring-[#E5C07B]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer rounded-[2rem]">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]/40">Wellness Index</CardTitle>
                            <TrendingUp className="h-4 w-4 text-[#E5C07B]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-[#FDF5E6] serif italic tracking-tighter">{wellnessScore.toFixed(0)}</div>
                        <Progress value={wellnessScore} className="mt-4 h-1 bg-[#2D1417] shadow-inner" />
                        <p className="text-[9px] font-bold text-[#FDF5E6]/20 mt-3 uppercase tracking-widest">Physiological Potency</p>
                    </CardContent>
                </Card>

                {/* Current Streak */}
                <Card className="border-0 shadow-xl bg-[#3D181C] ring-1 ring-[#E5C07B]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer rounded-[2rem]">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]/40">Presence Ritual</CardTitle>
                            <Flame className="h-4 w-4 text-[#E5C07B]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-[#FDF5E6] serif italic tracking-tighter">{currentStreak}</div>
                        <p className="text-[9px] font-bold text-[#FDF5E6]/20 mt-3 uppercase tracking-widest">Consecutive Cycles</p>
                        <Badge className="mt-4 bg-[#E5C07B] text-[#2D1417] hover:bg-[#E5C07B] border-0 font-bold px-3 py-1 text-[9px] uppercase tracking-widest shadow-lg">
                            Vitality Peak 🔥
                        </Badge>
                    </CardContent>
                </Card>

                {/* Total Moods Logged */}
                <Card className="border-0 shadow-xl bg-[#3D181C] ring-1 ring-[#E5C07B]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer rounded-[2rem]">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]/40">Sentimental Map</CardTitle>
                            <Heart className="h-4 w-4 text-[#E5C07B]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-[#FDF5E6] serif italic tracking-tighter">{totalMoods}</div>
                        <p className="text-[9px] font-bold text-[#FDF5E6]/20 mt-3 uppercase tracking-widest">Logged Observations</p>
                    </CardContent>
                </Card>

                {/* Total Chat Sessions */}
                <Card className="border-0 shadow-xl bg-[#3D181C] ring-1 ring-[#E5C07B]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer rounded-[2rem]">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]/40">Dialogic Depth</CardTitle>
                            <MessageCircle className="h-4 w-4 text-[#E5C07B]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-[#FDF5E6] serif italic tracking-tighter">{totalChats}</div>
                        <p className="text-[9px] font-bold text-[#FDF5E6]/20 mt-3 uppercase tracking-widest">Curated Enquiries</p>
                    </CardContent>
                </Card>
            </div>

            {/* Achievements & Goals */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Achievements */}
                <Card className="border-0 shadow-xl bg-[#3D181C] rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 ring-1 ring-[#E5C07B]/10">
                    <CardHeader className="bg-[#2D1417]/40 pb-6 border-b border-white/5">
                        <CardTitle className="flex items-center gap-3 serif text-xl text-[#FDF5E6]">
                            <Award className="h-6 w-6 text-[#E5C07B]" />
                            Honorary Milestones
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div className="flex items-center gap-5 p-5 bg-[#2D1417]/60 rounded-2xl border border-white/5 hover:border-[#E5C07B]/20 transition-all cursor-pointer group shadow-sm">
                            <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-500">🏆</div>
                            <div className="flex-1">
                                <h4 className="font-bold text-[#FDF5E6] serif">First Week Ascendance</h4>
                                <p className="text-[11px] text-[#FDF5E6]/40 font-bold uppercase tracking-widest">Logged moods for 7 consecutive cycles</p>
                            </div>
                            <Badge className="bg-[#E5C07B] text-[#2D1417] hover:bg-[#E5C07B] border-0 font-bold text-[9px] uppercase tracking-widest px-3">Unlocked</Badge>
                        </div>

                        <div className="flex items-center gap-5 p-5 bg-[#2D1417]/60 rounded-2xl border border-white/5 hover:border-[#E5C07B]/20 transition-all cursor-pointer group shadow-sm">
                            <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-500">🌱</div>
                            <div className="flex-1">
                                <h4 className="font-bold text-[#FDF5E6] serif">Eloquence in Dialogue</h4>
                                <p className="text-[11px] text-[#FDF5E6]/40 font-bold uppercase tracking-widest">Completed 5 therapeutic AI sessions</p>
                            </div>
                            <Badge className="bg-[#E5C07B] text-[#2D1417] hover:bg-[#E5C07B] border-0 font-bold text-[9px] uppercase tracking-widest px-3">Unlocked</Badge>
                        </div>

                        <div className="flex items-center gap-5 p-5 bg-[#2D1417]/20 rounded-2xl opacity-40 grayscale scale-95 transition-all">
                            <div className="text-3xl">💎</div>
                            <div className="flex-1">
                                <h4 className="font-bold text-[#FDF5E6] serif opacity-50">Lunar Guardian</h4>
                                <p className="text-[11px] text-[#FDF5E6]/20 font-bold uppercase tracking-widest">Maintain a 30-day streak of presence</p>
                            </div>
                            <Badge variant="outline" className="border-white/10 text-white/20 font-bold text-[9px] uppercase tracking-widest">Locked</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Goals */}
                <Card className="border-0 shadow-xl bg-[#3D181C] rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 ring-1 ring-[#E5C07B]/10">
                    <CardHeader className="bg-[#2D1417]/40 pb-6 border-b border-white/5">
                        <CardTitle className="flex items-center gap-3 serif text-xl text-[#FDF5E6]">
                            <Target className="h-6 w-6 text-[#E5C07B]" />
                            Aspirational Targets
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-8">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]/40">Daily Presence Ritual</span>
                                <span className="text-sm font-bold text-[#E5C07B] serif italic">85%</span>
                            </div>
                            <Progress value={85} className="h-1 bg-[#2D1417] shadow-inner" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]/40">Weekly Introspective Check-in</span>
                                <span className="text-sm font-bold text-[#E5C07B] serif italic">60%</span>
                            </div>
                            <Progress value={60} className="h-1 bg-[#2D1417] shadow-inner" />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]/40">Mindfulness Integration</span>
                                <span className="text-sm font-bold text-[#E5C07B] serif italic">40%</span>
                            </div>
                            <Progress value={40} className="h-1 bg-[#2D1417] shadow-inner" />
                        </div>

                        <Button className="w-full mt-4 bg-[#E5C07B] hover:bg-[#d4b16a] text-[#2D1417] rounded-2xl h-12 font-bold shadow-lg ring-2 ring-white/10 uppercase tracking-widest text-[10px]">
                            Define New Aspiration
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Summary */}
            <Card className="border-0 shadow-xl bg-[#3D181C] rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 ring-1 ring-[#E5C07B]/10">
                <CardHeader className="bg-gradient-to-r from-[#E5C07B]/5 to-transparent border-b border-white/5 pb-8 pt-10 px-12">
                    <CardTitle className="serif text-3xl text-[#FDF5E6]">Historical Footprints</CardTitle>
                </CardHeader>
                <CardContent className="p-12">
                    <div className="space-y-8">
                        <div className="flex items-start gap-8 group cursor-pointer">
                            <div className="h-14 w-14 rounded-2xl bg-[#E5C07B]/10 flex items-center justify-center group-hover:bg-[#E5C07B]/20 transition-colors shadow-sm ring-1 ring-[#E5C07B]/10">
                                <Heart className="h-6 w-6 text-[#E5C07B]" />
                            </div>
                            <div className="flex-1 border-b border-white/5 pb-8 group-last:border-0">
                                <p className="font-bold text-[#FDF5E6] serif text-xl italic tracking-tight">Logged Sentiment: Pristine 😊</p>
                                <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.2em] mt-2">Today at 9:30 AM</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-8 group cursor-pointer">
                            <div className="h-14 w-14 rounded-2xl bg-[#E5C07B]/10 flex items-center justify-center group-hover:bg-[#E5C07B]/20 transition-colors shadow-sm ring-1 ring-[#E5C07B]/10">
                                <MessageCircle className="h-6 w-6 text-[#E5C07B]" />
                            </div>
                            <div className="flex-1 border-b border-white/5 pb-8 group-last:border-0">
                                <p className="font-bold text-[#FDF5E6] serif text-xl italic tracking-tight">Completed Curated Dialogue</p>
                                <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.2em] mt-2">Yesterday at 6:45 PM</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-8 group cursor-pointer">
                            <div className="h-14 w-14 rounded-2xl bg-[#E5C07B]/10 flex items-center justify-center group-hover:bg-[#E5C07B]/20 transition-colors shadow-sm ring-1 ring-[#E5C07B]/10">
                                <Flame className="h-6 w-6 text-[#E5C07B]" />
                            </div>
                            <div className="flex-1 pb-2">
                                <p className="font-bold text-[#FDF5E6] serif text-xl italic tracking-tight">Attained 7-Day Vitality Streak! 🎉</p>
                                <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.2em] mt-2">2 cycles ago</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
