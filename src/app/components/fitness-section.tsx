import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Plus, Flame, Timer, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";

export function FitnessSection() {
    const [activePlan, setActivePlan] = useState<string | null>(null);

    const workouts = [
        { id: "push", name: "High-Performance Push", cals: "420", time: "45m", intensity: "Premium", color: "#E5C07B" },
        { id: "pull", name: "Back & Bicep Architecture", cals: "380", time: "40m", intensity: "Luxury", color: "#722F37" },
        { id: "legs", name: "Lower Body Foundation", cals: "550", time: "55m", intensity: "Elite", color: "#E5C07B" }
    ];

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <Badge className="mb-4 bg-[#E5C07B] text-[#2D1417] font-bold px-3 py-1 uppercase tracking-widest text-[9px]">Fitness AI Engine</Badge>
                    <h2 className="text-4xl font-bold text-[#FDF5E6] serif">Workout Architecture</h2>
                    <p className="text-[#FDF5E6]/60 font-medium tracking-tight uppercase text-xs mt-1">Bespoke physical optimization routines</p>
                </div>
                <div className="flex gap-4">
                    <Card className="bg-[#3D181C] border-[#E5C07B]/10 px-6 py-4 rounded-2xl flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-[#E5C07B]/10 flex items-center justify-center">
                            <Flame className="h-5 w-5 text-[#E5C07B]" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-[#FDF5E6]/40 uppercase tracking-widest">Active Streak</p>
                            <p className="text-xl font-bold text-[#FDF5E6] serif">14 Days</p>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Workouts */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-[#E5C07B] text-xs font-bold uppercase tracking-[0.3em] mb-4">Select Routine</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {workouts.map((w) => (
                            <Card
                                key={w.id}
                                className={`border-0 bg-[#3D181C] hover:bg-[#4D1F24] transition-all cursor-pointer rounded-[2rem] overflow-hidden group ring-1 ${activePlan === w.id ? 'ring-[#E5C07B]' : 'ring-white/5'}`}
                                onClick={() => setActivePlan(w.id)}
                            >
                                <CardContent className="p-8">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg`} style={{ backgroundColor: `${w.color}20`, color: w.color }}>
                                            <Dumbbell className="h-6 w-6" />
                                        </div>
                                        <Badge variant="outline" className="text-[9px] border-white/10 text-white/40">{w.intensity}</Badge>
                                    </div>
                                    <h3 className="text-xl font-bold text-white serif mb-1">{w.name}</h3>
                                    <div className="flex items-center gap-4 text-xs font-medium text-[#FDF5E6]/40">
                                        <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {w.time}</span>
                                        <span className="flex items-center gap-1"><Flame className="h-3 w-3" /> {w.cals} kcal</span>
                                    </div>
                                    <Button className="w-full mt-8 bg-white/5 group-hover:bg-[#E5C07B] group-hover:text-[#2D1417] transition-all rounded-xl h-10 border-none font-bold text-[10px] uppercase tracking-widest">
                                        Deploy AI Guide
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        <Card className="border-2 border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center p-8 rounded-[2rem] hover:border-[#E5C07B]/30 transition-all cursor-pointer group">
                            <div className="h-14 w-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#E5C07B]/10 transition-colors">
                                <Plus className="h-6 w-6 text-white/40 group-hover:text-[#E5C07B]" />
                            </div>
                            <p className="text-[#FDF5E6]/40 font-bold uppercase tracking-widest text-[10px]">Custom Architecture</p>
                        </Card>
                    </div>
                </div>

                {/* Right: Progress Tracker */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-2xl bg-gradient-to-br from-[#E5C07B] to-[#722F37] rounded-[2.5rem] p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <TrendingUp className="h-32 w-32 text-white" />
                        </div>
                        <div className="relative z-10 text-[#2D1417]">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8">Vitality Index</h4>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-6xl font-bold serif">88</span>
                                <span className="text-xl font-bold serif">/100</span>
                            </div>
                            <p className="text-sm font-bold italic mb-8">"You're in the top 5% of elite wellness today."</p>
                            <Button className="w-full bg-[#2D1417] text-white hover:bg-[#1A1112] rounded-2xl h-12 shadow-xl font-bold text-xs uppercase tracking-widest">Deep Analytics</Button>
                        </div>
                    </Card>

                    <Card className="border-0 bg-[#3D181C] ring-1 ring-white/5 rounded-[2rem] p-8 space-y-6">
                        <h4 className="text-[#E5C07B] text-xs font-bold uppercase tracking-[0.2em]">Live Metabolic Data</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                <span>Heart Rate Variance</span>
                                <span className="text-white">65ms</span>
                            </div>
                            <Progress value={65} className="h-1 bg-white/5" />
                            <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest pt-2">
                                <span>Resting Metabolic Rate</span>
                                <span className="text-white">1,850 kcal</span>
                            </div>
                            <Progress value={80} className="h-1 bg-white/5" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
