import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";

export function HealthAnalytics() {
    const score = 84;

    return (
        <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] relative">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

            <div className="grid md:grid-cols-3 divide-x divide-[#E5C07B]/5 relative z-10">
                <div className="p-12 flex flex-col items-center justify-center bg-[#1A1112]/40 backdrop-blur-md">
                    <div className="relative h-40 w-40 mb-8">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                            {/* Background Circle */}
                            <circle
                                className="text-[#120A0B] stroke-current"
                                strokeWidth="6"
                                fill="transparent"
                                r="44"
                                cx="50"
                                cy="50"
                            />
                            {/* Inner Glow Shadow (Simulated with second circle) */}
                            <circle
                                className="text-[#E5C07B]/5 stroke-current"
                                strokeWidth="8"
                                fill="transparent"
                                r="44"
                                cx="50"
                                cy="50"
                            />
                            {/* Progress Circle */}
                            <circle
                                className="text-[#E5C07B] stroke-current transition-all duration-[1500ms] ease-out shadow-[0_0_20px_#E5C07B]"
                                strokeWidth="6"
                                strokeDasharray={276}
                                strokeDashoffset={276 - (276 * score) / 100}
                                strokeLinecap="round"
                                fill="transparent"
                                r="44"
                                cx="50"
                                cy="50"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-extrabold text-[#FDF5E6] serif italic tracking-tighter drop-shadow-[0_0_15px_rgba(229,192,123,0.2)]">{score}</span>
                            <span className="text-[9px] font-black text-[#E5C07B]/40 uppercase tracking-[0.4em] mt-1">Sanctity</span>
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h4 className="text-[10px] font-black text-[#E5C07B] uppercase tracking-[0.4em]">Wellness Index</h4>
                        <p className="text-[9px] font-medium text-[#FDF5E6]/20 italic">Calibrated Optimization</p>
                    </div>
                </div>

                <div className="md:col-span-2 p-12 space-y-12 bg-[#1A1112]/20">
                    <div className="group cursor-default">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex flex-col">
                                <h4 className="text-[10px] font-black text-[#FDF5E6]/30 uppercase tracking-[0.3em] group-hover:text-[#E5C07B]/60 transition-colors">Energy Resonance</h4>
                                <span className="text-[8px] font-medium text-[#FDF5E6]/10 uppercase tracking-widest mt-1">Oscillation Variance: Low</span>
                            </div>
                            <span className="text-xl font-black text-[#E5C07B] italic serif">88%</span>
                        </div>
                        <div className="h-2 w-full bg-[#120A0B] rounded-full overflow-hidden ring-1 ring-white/5">
                            <div className="h-full bg-gradient-to-r from-[#2D1417] to-[#E5C07B] rounded-full transition-all duration-1000" style={{ width: '88%' }} />
                        </div>
                    </div>

                    <div className="group cursor-default">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex flex-col">
                                <h4 className="text-[10px] font-black text-[#FDF5E6]/30 uppercase tracking-[0.3em] group-hover:text-[#E5C07B]/60 transition-colors">Sleep Architecture</h4>
                                <span className="text-[8px] font-medium text-[#FDF5E6]/10 uppercase tracking-widest mt-1">REM Synchronization: High</span>
                            </div>
                            <span className="text-xl font-black text-[#E5C07B] italic serif">72%</span>
                        </div>
                        <div className="h-2 w-full bg-[#120A0B] rounded-full overflow-hidden ring-1 ring-white/5">
                            <div className="h-full bg-gradient-to-r from-[#2D1417] to-[#E5C07B] rounded-full transition-all duration-1000" style={{ width: '72%' }} />
                        </div>
                    </div>

                    <div className="group cursor-default">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex flex-col">
                                <h4 className="text-[10px] font-black text-[#FDF5E6]/30 uppercase tracking-[0.3em] group-hover:text-[#E5C07B]/60 transition-colors">Cognitive Flow</h4>
                                <span className="text-[8px] font-medium text-[#FDF5E6]/10 uppercase tracking-widest mt-1">Synthesis Capacity: Optimal</span>
                            </div>
                            <span className="text-xl font-black text-[#E5C07B] italic serif">94%</span>
                        </div>
                        <div className="h-2 w-full bg-[#120A0B] rounded-full overflow-hidden ring-1 ring-white/5">
                            <div className="h-full bg-gradient-to-r from-[#2D1417] to-[#E5C07B] rounded-full transition-all duration-1000" style={{ width: '94%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
