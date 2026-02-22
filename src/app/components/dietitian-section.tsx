import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Utensils, Camera, Droplets, Activity, Loader2, Flame, Info } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";


export function DietitianSection() {
    const [view, setView] = useState<"menu" | "scanner" | "scanned" | "mealplan" | "planned">("menu");
    const [scanning, setScanning] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [waterCount, setWaterCount] = useState(4);


    const handleScan = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            setView("scanned");
        }, 3000);
    };

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setGenerating(false);
            setView("planned");
        }, 2500);
    };

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {view === "menu" && (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="space-y-12"
                    >
                        <div className="px-2 space-y-2">
                            <h2 className="text-4xl font-black text-[#FDF5E6] serif italic tracking-tight mb-2">Nutritional <span className="text-[#E5C07B] drop-shadow-[0_0_10px_rgba(229,192,123,0.2)]">Concierge</span></h2>
                            <p className="text-[10px] font-black text-[#E5C07B]/30 uppercase tracking-[0.5em]">Exquisite meal architecture and metabolic insights</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl group hover:ring-[#E5C07B]/40 transition-all duration-700 cursor-pointer relative">
                                <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                                <div className="h-56 bg-[#1A1112] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-1000">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#120A0B]" />
                                    <Camera className="h-24 w-24 text-[#E5C07B]/40 group-hover:text-[#E5C07B] transition-all duration-1000 group-hover:scale-110 drop-shadow-[0_0_20px_#E5C07B]/20" />
                                </div>
                                <CardHeader className="p-10 pb-4 relative z-10">
                                    <CardTitle className="serif italic text-3xl text-[#FDF5E6]">Food Scanner</CardTitle>
                                    <CardDescription className="italic text-[#E5C07B]/40 uppercase tracking-[0.3em] text-[9px] font-black mt-2">Instant Metabolic Decoding</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10 pt-0 relative z-10">
                                    <p className="text-sm text-[#FDF5E6]/40 mb-10 leading-relaxed italic serif group-hover:text-[#FDF5E6]/60 transition-colors">Scan your gourmet selections using AI vision to reveal precise metabolic impacts and nutritional depths.</p>
                                    <Button className="w-full bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] rounded-[1.25rem] h-14 shadow-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:scale-105 active:scale-95" onClick={() => setView("scanner")}>Begin Analysis</Button>
                                </CardContent>
                            </Card>

                            <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl group hover:ring-[#E5C07B]/40 transition-all duration-700 cursor-pointer relative">
                                <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                                <div className="h-56 bg-[#1A1112] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-1000">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#120A0B]" />
                                    <Utensils className="h-24 w-24 text-[#E5C07B]/40 group-hover:text-[#E5C07B] transition-all duration-1000 group-hover:scale-110 drop-shadow-[0_0_20px_#E5C07B]/20" />
                                </div>
                                <CardHeader className="p-10 pb-4 relative z-10">
                                    <CardTitle className="serif italic text-3xl text-[#FDF5E6]">Meal Architect</CardTitle>
                                    <CardDescription className="italic text-[#E5C07B]/40 uppercase tracking-[0.3em] text-[9px] font-black mt-2">Bespoke Culinary Sequences</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10 pt-0 relative z-10">
                                    <p className="text-sm text-[#FDF5E6]/40 mb-10 leading-relaxed italic serif group-hover:text-[#FDF5E6]/60 transition-colors">Generate bespoke AI meal plans aligned with your physiological aspirations and epicurean preferences.</p>
                                    <Button className="w-full bg-[#1A1112] hover:bg-[#120A0B] text-[#E5C07B] rounded-[1.25rem] h-14 shadow-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all border border-[#E5C07B]/10 hover:border-[#E5C07B]/30" onClick={() => setView("mealplan")}>Craft New Plan</Button>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-4xl bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[3rem] overflow-hidden relative group">
                                <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                                <CardHeader className="p-10 pb-4 relative z-10">
                                    <CardTitle className="serif italic text-3xl text-[#FDF5E6]">Vitals Trackers</CardTitle>
                                    <CardDescription className="uppercase tracking-[0.4em] text-[9px] font-black text-[#E5C07B]/30 mt-2">Daily Life Essentials</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10 space-y-10 relative z-10">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-4 text-sm font-black text-[#FDF5E6] italic tracking-tight"><Droplets className="h-5 w-5 text-[#E5C07B] animate-pulse" /> Hydration Aura</span>
                                            <span className="text-xl font-bold text-[#E5C07B] serif italic drop-shadow-[0_0_10px_#E5C07B]/20">{waterCount}/8 <span className="text-[10px] font-black uppercase tracking-widest text-[#E5C07B]/40">Units</span></span>
                                        </div>
                                        <div className="flex gap-3 h-10 items-end px-2">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.button
                                                    key={i}
                                                    whileHover={{ scale: 1.2, y: -5 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`w-full rounded-full transition-all duration-500 ${i < waterCount ? "bg-[#E5C07B] shadow-[0_0_20px_#E5C07B]/40" : "bg-[#1A1112] border border-white/5"}`}
                                                    style={{ height: `${(i + 1) * 12.5}%` }}
                                                    onClick={() => setWaterCount(i + 1)}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-[9px] text-center font-black text-[#FDF5E6]/20 uppercase tracking-[0.3em] mt-4">Molecular Equilibrium</p>
                                    </div>

                                    <div className="space-y-6 pt-10 border-t border-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-black text-[#FDF5E6]/40 uppercase tracking-[0.4em]">Dietary Calendar</span>
                                            <Badge className="text-[9px] bg-[#E5C07B]/10 text-[#E5C07B] border-[#E5C07B]/20 px-3 uppercase tracking-widest font-black">Streak: 12 Cycles</Badge>
                                        </div>
                                        <div className="grid grid-cols-7 gap-3">
                                            {[...Array(14)].map((_, i) => (
                                                <div key={i} className={`aspect-square rounded-xl border transition-all duration-700 flex items-center justify-center text-[10px] font-black shadow-inner ${i === 11 ? 'bg-[#E5C07B] text-[#120A0B] border-transparent scale-110 shadow-[0_0_15px_#E5C07B]/40' : 'bg-[#1A1112] border-white/5 text-[#FDF5E6]/20 hover:border-[#E5C07B]/20'}`}>
                                                    {String(i + 1).padStart(2, '0')}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                )}

                {view === "scanner" && (
                    <motion.div
                        key="scanner"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="max-w-xl mx-auto"
                    >
                        <Card className="border-0 shadow-5xl bg-[#120A0B] text-[#FDF5E6] overflow-hidden aspect-[3/4] relative rounded-[4rem] ring-1 ring-[#E5C07B]/20">
                            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
                            {scanning ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#120A0B]/80 backdrop-blur-xl">
                                    <div className="relative h-72 w-72 mb-12">
                                        <div className="absolute inset-0 border-[4px] border-[#E5C07B] border-t-transparent rounded-[3rem] animate-spin" />
                                        <div className="absolute inset-8 border-[2px] border-[#E5C07B]/20 border-b-transparent rounded-[2.5rem] animate-spin-reverse" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Camera className="h-20 w-20 text-[#E5C07B] drop-shadow-[0_0_20px_#E5C07B]" />
                                        </div>
                                    </div>
                                    <p className="text-[#E5C07B] font-black tracking-[0.5em] animate-pulse serif italic uppercase text-xs">Decoding Molecular Structure...</p>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <div className="w-[85%] h-[85%] border-[1px] border-[#E5C07B]/40 rounded-[5rem] dashed group shadow-[0_0_100px_rgba(229,192,123,0.1)] transition-all duration-1000" />
                                    <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-[#E5C07B]/60 to-transparent" />
                                    <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#E5C07B]/60 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#E5C07B]/5 to-transparent pointer-events-none" />
                                </div>
                            )}

                            <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-10 px-12 z-30">
                                {!scanning && (
                                    <>
                                        <button className="h-24 w-24 bg-[#E5C07B] rounded-full flex items-center justify-center p-2 cursor-pointer hover:scale-110 transition-all duration-500 shadow-[0_0_50px_#E5C07B]/40 active:scale-95 group" onClick={handleScan}>
                                            <div className="h-full w-full border-[4px] border-[#120A0B]/20 rounded-full group-hover:bg-[#120A0B]/10 transition-all" />
                                        </button>
                                        <p className="text-[10px] font-black text-[#E5C07B]/40 uppercase tracking-[0.5em] text-center max-w-[200px]">Center selection within the focus aura</p>
                                    </>
                                )}
                            </div>
                            <Button variant="ghost" className="absolute top-10 left-10 text-[#FDF5E6]/40 hover:text-[#FDF5E6] hover:bg-white/5 font-black uppercase tracking-[0.3em] text-[10px] transition-all" onClick={() => setView("menu")}>Dismiss</Button>
                        </Card>
                    </motion.div>
                )}

                {view === "scanned" && (
                    <motion.div
                        key="scanned"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto space-y-10"
                    >
                        <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/20 rounded-[3.5rem] overflow-hidden shadow-5xl relative">
                            <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                            <CardHeader className="p-16 pb-8 bg-gradient-to-b from-[#1A1112] to-transparent relative z-10 flex flex-row items-center justify-between">
                                <div className="space-y-4">
                                    <CardTitle className="text-5xl serif font-black text-[#FDF5E6] italic tracking-tight drop-shadow-2xl">Grilled Salmon Salad</CardTitle>
                                    <CardDescription className="italic font-black text-[#E5C07B]/40 uppercase tracking-[0.4em] text-[10px]">Nutritional Signature Decoded</CardDescription>
                                </div>
                                <Badge className="bg-[#E5C07B] text-[#120A0B] hover:bg-[#E5C07B] border-none px-6 py-2 font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_10px_30px_#E5C07B]/30 scale-110">Healthy Aura</Badge>
                            </CardHeader>
                            <CardContent className="p-16 pt-0 space-y-12 relative z-10">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        { label: "Energy", val: "420", unit: "kcal", icon: Flame },
                                        { label: "Protein", val: "32", unit: "g", icon: Activity },
                                        { label: "Carbs", val: "12", unit: "g", icon: Utensils },
                                        { label: "Lipids", val: "24", unit: "g", icon: Droplets },
                                    ].map((stat) => (
                                        <div key={stat.label} className="flex flex-col items-center p-8 bg-[#1A1112]/50 rounded-[2.5rem] border border-white/5 hover:border-[#E5C07B]/20 transition-all duration-700 shadow-2xl group cursor-default">
                                            <stat.icon className="h-6 w-6 mb-6 text-[#E5C07B]/20 group-hover:text-[#E5C07B] transition-all duration-700 group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_#E5C07B]/40" />
                                            <span className="text-3xl font-black text-[#FDF5E6] serif italic group-hover:scale-110 transition-transform">{stat.val}</span>
                                            <span className="text-[10px] text-[#FDF5E6]/20 font-black uppercase tracking-[0.3em] mt-3">{stat.unit}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 pt-12 border-t border-white/5">
                                    <h4 className="flex items-center gap-4 text-[11px] font-black text-[#E5C07B] uppercase tracking-[0.4em] italic"><Info className="h-5 w-5 opacity-50" /> Concierge Insight</h4>
                                    <div className="text-base text-[#FDF5E6]/60 leading-relaxed bg-[#1A1112]/40 p-10 rounded-[2rem] border border-white/5 italic serif shadow-inner relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                        <p className="relative z-10">This selection perfectly aligns with your <strong>Physiological Equilibrium</strong>. The omegas and proteins are balanced for optimal recovery. <span className="text-[#E5C07B] font-black">Recommendation:</span> Incorporate a touch of dark greens for enhanced micronutrient density.</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 pt-6">
                                    <Button className="flex-1 bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-16 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] shadow-[0_15px_40px_#E5C07B]/20 transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={() => setView("menu")}>
                                        Archive to Registry
                                    </Button>
                                    <Button variant="outline" className="flex-1 h-16 rounded-[1.5rem] border-white/5 bg-white/5 text-[#FDF5E6]/40 font-black hover:text-[#FDF5E6] hover:bg-white/10 uppercase tracking-[0.3em] text-[10px] transition-all" onClick={() => setView("scanner")}>
                                        New Scan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {view === "mealplan" && (
                    <motion.div
                        key="mealplan"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl mx-auto"
                    >
                        <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/20 rounded-[4rem] overflow-hidden shadow-5xl relative">
                            <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                            <CardHeader className="p-16 border-b border-white/5 bg-gradient-to-b from-[#1A1112] to-transparent text-center">
                                <CardTitle className="serif italic text-5xl text-[#FDF5E6] tracking-tight drop-shadow-2xl">Curation Preferences</CardTitle>
                                <CardDescription className="uppercase tracking-[0.5em] text-[9px] font-black text-[#E5C07B]/30 mt-6">Design your 24-hour culinary architecture</CardDescription>
                            </CardHeader>
                            <CardContent className="p-16 space-y-12 relative z-10">
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FDF5E6]/40 pl-2">Therapeutic Goal</label>
                                    <div className="grid grid-cols-3 gap-6">
                                        {["Metabolic Lift", "Equilibrium", "Vitality Plus"].map(g => (
                                            <Button key={g} variant="outline" className="text-[9px] h-14 rounded-2xl border-white/5 bg-[#1A1112] font-black text-[#FDF5E6]/40 hover:border-[#E5C07B]/40 hover:text-[#E5C07B] hover:bg-[#120A0B] transition-all duration-500 uppercase tracking-widest shadow-2xl">{g}</Button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FDF5E6]/40 pl-2">Physiological Nuances</label>
                                    <Input placeholder="e.g. Plant-based, No nuts, Minimalist sodium..." className="h-16 rounded-2xl bg-[#1A1112] border-white/5 text-[#FDF5E6] focus:ring-[#E5C07B]/20 px-8 text-sm italic serif shadow-inner placeholder:text-[#FDF5E6]/5 transition-all" />
                                </div>
                                <Button className="w-full bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-16 text-xs font-black rounded-3xl shadow-[0_20px_50px_#E5C07B]/20 uppercase tracking-[0.5em] transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/20" disabled={generating} onClick={handleGenerate}>
                                    {generating ? <Loader2 className="h-8 w-8 animate-spin text-[#120A0B]/60" /> : "Craft 24h Architecture"}
                                </Button>
                                <Button variant="ghost" className="w-full font-black uppercase tracking-[0.3em] text-[9px] text-[#FDF5E6]/20 hover:text-[#FDF5E6] transition-all" onClick={() => setView("menu")}>Return to Sanctuary</Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {view === "planned" && (
                    <motion.div
                        key="planned"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto space-y-12"
                    >
                        <div className="flex items-center justify-between mb-12 px-8">
                            <div className="space-y-2">
                                <h3 className="text-5xl font-black text-[#FDF5E6] serif italic tracking-tight drop-shadow-2xl">Culinary Architecture</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E5C07B]/40">24 Hour Personalized Cycle</p>
                            </div>
                            <Badge className="bg-[#E5C07B] text-[#120A0B] font-black h-12 px-8 rounded-2xl border-none shadow-[0_10px_30px_#E5C07B]/30 uppercase tracking-widest text-[10px] scale-110">Vitality Focused</Badge>
                        </div>
                        <div className="grid gap-10">
                            {[
                                { time: "Breakfast", meal: "Artisanal Overnight Oats", info: "Complex carb-loading for synaptic clarity", cals: "350", color: "#E5C07B" },
                                { time: "Lunch", meal: "Ancient Grain Medley Bowl", info: "Plant-derived amino acid optimization", cals: "520", color: "#1A1112" },
                                { time: "Dinner", meal: "Pacific Wild Salmon Fillet", info: "Omega-3 dense neural support", cals: "450", color: "#E5C07B" },
                                { time: "Essence", meal: "Antioxidant Berry Nectar", info: "Polyphenol recovery boost", cals: "180", color: "#1A1112" },
                            ].map((item, i) => (
                                <Card key={i} className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[3rem] overflow-hidden shadow-4xl hover:ring-[#E5C07B]/30 transition-all duration-700 group relative">
                                    <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                                    <CardContent className="p-0 flex items-center justify-between">
                                        <div className="flex items-center gap-10">
                                            <div className="h-32 w-28 flex items-center justify-center font-black serif italic text-5xl shadow-2xl transition-all duration-700 group-hover:scale-105" style={{
                                                backgroundColor: item.color,
                                                color: item.color === "#E5C07B" ? "#120A0B" : "#E5C07B"
                                            }}>
                                                {item.time[0]}
                                            </div>
                                            <div className="py-6 space-y-3">
                                                <h4 className="text-3xl font-black text-[#FDF5E6] serif italic group-hover:text-[#E5C07B] transition-colors">{item.meal}</h4>
                                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E5C07B]/40 italic">{item.info}</p>
                                            </div>
                                        </div>
                                        <div className="text-right pr-12 group-hover:translate-x-[-10px] transition-transform duration-700">
                                            <div className="text-5xl font-black text-[#FDF5E6] serif italic tracking-tighter drop-shadow-2xl">{item.cals}</div>
                                            <div className="text-[9px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.4em] mt-3">Energy Units</div>
                                        </div>
                                    </CardContent>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                </Card>
                            ))}
                        </div>
                        <div className="flex gap-8 pt-10 px-6">
                            <Button className="flex-1 bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-20 rounded-[2rem] font-black uppercase tracking-[0.5em] text-[12px] shadow-[0_20px_60px_#E5C07B]/20 transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/20" onClick={() => setView("menu")}>Commit to Sanctuary</Button>
                            <Button variant="outline" className="flex-1 h-20 rounded-[2rem] border-white/5 bg-white/5 text-[#FDF5E6]/40 font-black hover:text-[#FDF5E6] hover:bg-white/10 uppercase tracking-[0.3em] text-[11px] transition-all" onClick={() => window.print()}>Export Dossier</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
