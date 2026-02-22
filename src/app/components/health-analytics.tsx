import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";

export function HealthAnalytics() {
    const score = 84;

    return (
        <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
            <div className="grid md:grid-cols-3 divide-x divide-[#E5C07B]/5">
                <div className="p-8 flex flex-col items-center justify-center bg-[#2D1417]/20">
                    <div className="relative h-32 w-32 mb-4">
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                            <circle
                                className="text-[#2D1417] stroke-current"
                                strokeWidth="8"
                                fill="transparent"
                                r="42"
                                cx="50"
                                cy="50"
                            />
                            <circle
                                className="text-[#E5C07B] stroke-current transition-all duration-1000 ease-out"
                                strokeWidth="8"
                                strokeDasharray={264}
                                strokeDashoffset={264 - (264 * score) / 100}
                                strokeLinecap="round"
                                fill="transparent"
                                r="42"
                                cx="50"
                                cy="50"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-extrabold text-[#FDF5E6] serif italic tracking-tighter">{score}</span>
                            <span className="text-[8px] font-bold text-[#FDF5E6]/30 uppercase tracking-[0.2em] -mt-1">Sanctity</span>
                        </div>
                    </div>
                    <h4 className="text-sm font-bold text-[#E5C07B] uppercase tracking-[0.2em]">Wellness Index</h4>
                </div>

                <div className="md:col-span-2 p-8 space-y-8">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-bold text-[#FDF5E6]/40 uppercase tracking-[0.2em]">Energy Resonance</h4>
                            <span className="text-xs font-extrabold text-[#E5C07B] italic serif">88%</span>
                        </div>
                        <Progress value={88} className="h-1 bg-[#2D1417] shadow-inner" />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-bold text-[#FDF5E6]/40 uppercase tracking-[0.2em]">Sleep Architecture</h4>
                            <span className="text-xs font-extrabold text-[#E5C07B] italic serif">72%</span>
                        </div>
                        <Progress value={72} className="h-1 bg-[#2D1417] shadow-inner" />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-bold text-[#FDF5E6]/40 uppercase tracking-[0.2em]">Cognitive Flow</h4>
                            <span className="text-xs font-extrabold text-[#E5C07B] italic serif">94%</span>
                        </div>
                        <Progress value={94} className="h-1 bg-[#2D1417] shadow-inner" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
