import { useState } from "react";
import { Dumbbell, Plus, Flame, Timer, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

export function FitnessSection() {
    const [activePlan, setActivePlan] = useState<string | null>(null);

    const workouts = [
        { id: "push", name: "High-Performance Push", cals: "420", time: "45m", intensity: "Premium", color: "#E5C07B" },
        { id: "pull", name: "Back & Bicep Architecture", cals: "380", time: "40m", intensity: "Luxury", color: "#722F37" },
        { id: "legs", name: "Lower Body Foundation", cals: "550", time: "55m", intensity: "Elite", color: "#E5C07B" }
    ];

    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
                <div className="space-y-2">
                    <Badge className="mb-6 bg-[#E5C07B] text-[#120A0B] font-black px-4 py-1 uppercase tracking-[0.3em] text-[10px] shadow-[0_5px_20px_rgba(229,192,123,0.3)]">Fitness AI Sequence</Badge>
                    <h2 className="text-5xl font-black text-[#FDF5E6] serif italic tracking-tighter">Workout <span className="text-[#E5C07B] drop-shadow-[0_0_15px_rgba(229,192,123,0.1)]">Architecture</span></h2>
                    <p className="text-[10px] font-black tracking-[0.5em] text-[#E5C07B]/30 uppercase mt-4">Bespoke physical optimization routines</p>
                </div>
                <div className="flex gap-4">
                    <Card className="bg-[#120A0B] border-0 ring-1 ring-[#E5C07B]/10 px-8 py-6 rounded-[2rem] flex items-center gap-6 shadow-3xl group hover:ring-[#E5C07B]/40 transition-all duration-700">
                        <div className="h-14 w-14 rounded-2xl bg-[#1A1112] flex items-center justify-center ring-1 ring-white/5 group-hover:scale-110 transition-all duration-700 shadow-2xl">
                            <Flame className="h-6 w-6 text-[#E5C07B]" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.4em] mb-1">Active Streak</p>
                            <p className="text-2xl font-black text-[#FDF5E6] serif italic">14 <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]/40">Cycles</span></p>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Left: Workouts */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-4 px-2">
                        <div className="h-px flex-1 bg-gradient-to-r from-[#E5C07B]/20 to-transparent" />
                        <span className="text-[#E5C07B]/40 text-[10px] font-black uppercase tracking-[0.5em]">Select Routine</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                        {workouts.map((w) => (
                            <Card
                                key={w.id}
                                className={`border-0 bg-[#120A0B] ring-1 transition-all duration-700 cursor-pointer rounded-[2.5rem] overflow-hidden group shadow-4xl relative ${activePlan === w.id ? 'ring-[#E5C07B]' : 'ring-white/5 hover:ring-[#E5C07B]/30'}`}
                                onClick={() => setActivePlan(w.id)}
                            >
                                <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <CardContent className="p-10 relative z-10">
                                    <div className="flex justify-between items-start mb-16">
                                        <div className="h-16 w-16 rounded-[1.25rem] bg-[#1A1112] flex items-center justify-center shadow-2xl ring-1 ring-white/5 group-hover:scale-110 transition-all duration-700" style={{ color: w.color }}>
                                            <Dumbbell className="h-8 w-8" />
                                        </div>
                                        <Badge className="text-[9px] bg-[#1A1112] text-[#E5C07B] border border-[#E5C07B]/20 px-3 py-1 font-black uppercase tracking-[0.2em]">{w.intensity}</Badge>
                                    </div>
                                    <h3 className="text-2xl font-black text-[#FDF5E6] serif italic mb-3 group-hover:text-[#E5C07B] transition-colors">{w.name}</h3>
                                    <div className="flex items-center gap-6 text-[11px] font-black text-[#FDF5E6]/30 uppercase tracking-[0.2em] italic">
                                        <span className="flex items-center gap-2"><Timer className="h-4 w-4 text-[#E5C07B]/40" /> {w.time}</span>
                                        <span className="flex items-center gap-2"><Flame className="h-4 w-4 text-[#E5C07B]/40" /> {w.cals} kcal</span>
                                    </div>
                                    <Button className={`w-full mt-10 rounded-[1rem] h-14 font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 overflow-hidden relative shadow-2xl ${activePlan === w.id ? 'bg-[#E5C07B] text-[#120A0B]' : 'bg-[#1A1112] text-[#FDF5E6]/40 hover:bg-[#E5C07B] hover:text-[#120A0B]'}`}>
                                        <span className="relative z-10">Deploy AI Guide</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        <Card className="border-2 border-dashed border-white/5 bg-transparent flex flex-col items-center justify-center p-12 rounded-[2.5rem] hover:border-[#E5C07B]/20 transition-all duration-700 cursor-pointer group hover:bg-[#120A0B]/40">
                            <div className="h-20 w-20 rounded-full bg-[#1A1112]/50 flex items-center justify-center mb-8 group-hover:bg-[#E5C07B]/10 transition-all duration-700 group-hover:scale-110 shadow-inner ring-1 ring-white/5">
                                <Plus className="h-8 w-8 text-[#FDF5E6]/20 group-hover:text-[#E5C07B]" />
                            </div>
                            <p className="text-[#FDF5E6]/20 font-black uppercase tracking-[0.4em] text-[10px] group-hover:text-[#E5C07B]/40 transition-colors">Custom Architecture</p>
                        </Card>
                    </div>
                </div>

                {/* Right: Progress Tracker */}
                <div className="space-y-10">
                    <Card className="border-0 shadow-5xl bg-gradient-to-br from-[#120A0B] via-[#2D1417] to-[#120A0B] ring-1 ring-[#E5C07B]/20 rounded-[3rem] p-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                        <div className="absolute -top-10 -right-10 p-10 opacity-[0.03] rotate-12 transition-all duration-1000 group-hover:scale-150 group-hover:rotate-45">
                            <TrendingUp className="h-64 w-64 text-[#E5C07B]" />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E5C07B]/40">Vitality Index</h4>
                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-8xl font-black serif italic text-[#FDF5E6] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">88</span>
                                <span className="text-2xl font-black serif italic text-[#E5C07B]/40">/100</span>
                            </div>
                            <p className="text-base text-[#FDF5E6] font-medium italic serif leading-relaxed">"You're in the top 5% of elite wellness today. Your metabolic resonance is <span className="text-[#E5C07B] font-black">Pristine</span>."</p>
                            <Button className="w-full bg-[#E5C07B] text-[#120A0B] hover:bg-[#d4b16a] rounded-[1.25rem] h-16 shadow-[0_15px_40px_rgba(229,192,123,0.2)] font-black text-xs uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 border border-white/20">Deep Analytics</Button>
                        </div>
                    </Card>

                    <Card className="border-0 bg-[#120A0B] ring-1 ring-white/5 rounded-[2.5rem] p-10 space-y-8 shadow-4xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                        <h4 className="text-[#E5C07B]/40 text-[10px] font-black uppercase tracking-[0.4em] italic mb-10 pl-2">Live Metabolic Data</h4>
                        <div className="space-y-10">
                            <div className="space-y-4 group/item">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[10px] font-black text-[#FDF5E6]/30 uppercase tracking-[0.3em] group-hover/item:text-[#FDF5E6]/60 transition-colors uppercase">Heart Rate Variance</span>
                                    <span className="text-xl font-black text-[#E5C07B] serif italic drop-shadow-[0_0_10px_#E5C07B]/20">65<span className="text-[10px] uppercase font-black tracking-widest ml-1">ms</span></span>
                                </div>
                                <div className="h-2 w-full bg-[#1A1112] rounded-full overflow-hidden shadow-inner border border-white/5">
                                    <div className="h-full bg-gradient-to-r from-[#E5C07B]/40 to-[#E5C07B] shadow-[0_0_15px_#E5C07B] transition-all duration-1000" style={{ width: '65%' }} />
                                </div>
                            </div>

                            <div className="space-y-4 group/item">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[10px] font-black text-[#FDF5E6]/30 uppercase tracking-[0.3em] group-hover/item:text-[#FDF5E6]/60 transition-colors uppercase">Resting Metabolic Rate</span>
                                    <span className="text-xl font-black text-[#E5C07B] serif italic drop-shadow-[0_0_10px_#E5C07B]/20">1,850<span className="text-[10px] uppercase font-black tracking-widest ml-1">kcal</span></span>
                                </div>
                                <div className="h-2 w-full bg-[#1A1112] rounded-full overflow-hidden shadow-inner border border-white/5">
                                    <div className="h-full bg-gradient-to-r from-[#E5C07B]/40 to-[#E5C07B] shadow-[0_0_15px_#E5C07B] transition-all duration-1000" style={{ width: '80%' }} />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
