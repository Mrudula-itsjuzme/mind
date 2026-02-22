import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Utensils, Camera, Plus, Droplets, Activity, Loader2, Flame, Info } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { Progress } from "@/app/components/ui/progress";

export function DietitianSection() {
    const [view, setView] = useState<"menu" | "scanner" | "scanned" | "mealplan" | "planned">("menu");
    const [scanning, setScanning] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [waterCount, setWaterCount] = useState(4);
    const [exerciseMinutes, setExerciseMinutes] = useState(15);

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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-[#FDF5E6] mb-2 serif">Nutritional Concierge</h2>
                            <p className="text-[#FDF5E6]/60 font-medium tracking-tight uppercase text-xs">Exquisite meal architecture and metabolic insights</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-xl overflow-hidden rounded-3xl group hover:shadow-2xl transition-all ring-1 ring-[#E5C07B]/10">
                                <div className="h-44 bg-gradient-to-br from-[#722F37] to-[#5A242B] flex items-center justify-center relative overflow-hidden">
                                    <Camera className="h-20 w-20 text-[#E5C07B] group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="serif text-xl text-primary">Food Scanner</CardTitle>
                                    <CardDescription className="italic">Instant calorie & nutrition analysis</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">Scan your gourmet selections using AI vision to reveal precise metabolic impacts and nutritional depths.</p>
                                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-2xl h-11 shadow-lg font-bold" onClick={() => setView("scanner")}>Begin Analysis</Button>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-xl overflow-hidden rounded-3xl group hover:shadow-2xl transition-all ring-1 ring-[#E5C07B]/10">
                                <div className="h-44 bg-gradient-to-br from-[#E5C07B]/40 to-[#E5C07B]/10 flex items-center justify-center relative overflow-hidden">
                                    <Utensils className="h-20 w-20 text-primary group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="serif text-xl text-primary">Meal Architect</CardTitle>
                                    <CardDescription className="italic">Hyper-personalized culinary paths</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">Generate bespoke AI meal plans aligned with your physiological aspirations and epicurean preferences.</p>
                                    <Button className="w-full bg-[#722F37] hover:bg-[#5A242B] rounded-2xl h-11 shadow-lg font-bold" onClick={() => setView("mealplan")}>Craft New Plan</Button>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-xl bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="serif italic text-primary">Vitals Trackers</CardTitle>
                                    <CardDescription className="uppercase tracking-widest text-[10px] font-bold">Daily Essentials</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-sm font-bold text-[#FDF5E6]"><Droplets className="h-4 w-4 text-[#E5C07B]" /> Hydration Aura</span>
                                            <span className="text-sm font-bold text-[#E5C07B] serif italic">{waterCount}/8 Cups</span>
                                        </div>
                                        <div className="flex gap-1.5 h-6 items-end">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.button
                                                    key={i}
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.8 }}
                                                    className={`w-full rounded-t-lg transition-all ${i < waterCount ? "bg-[#E5C07B] shadow-[0_0_15px_rgba(229,192,123,0.3)]" : "bg-white/5"}`}
                                                    style={{ height: `${(i + 1) * 12.5}%` }}
                                                    onClick={() => setWaterCount(i + 1)}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-center font-bold text-[#FDF5E6]/40 uppercase tracking-widest mt-2">Daily Fluid Equilibrium</p>
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-[#FDF5E6] uppercase tracking-widest">Dietary Calendar</span>
                                            <Badge variant="outline" className="text-[9px] border-[#E5C07B]/30 text-[#E5C07B]">Streak: 12 Days</Badge>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            {[...Array(14)].map((_, i) => (
                                                <div key={i} className={`aspect-square rounded-md border border-white/5 flex items-center justify-center text-[10px] font-bold ${i === 11 ? 'bg-[#E5C07B] text-[#2D1417]' : 'text-white/40'}`}>
                                                    {i + 1}
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
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="max-w-md mx-auto"
                    >
                        <Card className="border-0 shadow-2xl bg-[#1A1112] text-white overflow-hidden aspect-[3/4] relative rounded-[3rem] ring-4 ring-[#E5C07B]/20">
                            {scanning ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#1A1112]/60 backdrop-blur-md">
                                    <div className="relative h-56 w-56 mb-8">
                                        <div className="absolute inset-0 border-[6px] border-[#E5C07B] border-t-transparent rounded-full animate-spin" />
                                        <div className="absolute inset-6 border-[3px] border-[#E5C07B]/40 border-b-transparent rounded-full animate-spin-slow" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Camera className="h-14 w-14 text-[#E5C07B]" />
                                        </div>
                                    </div>
                                    <p className="text-[#E5C07B] font-bold tracking-[0.3em] animate-pulse serif italic uppercase text-xs">Decoding Molecular Structure...</p>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <div className="w-72 h-72 border-2 border-[#E5C07B] rounded-[4rem] dashed shadow-[0_0_50px_rgba(229,192,123,0.2)]" />
                                    <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#E5C07B] to-transparent" />
                                    <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-[#E5C07B] to-transparent" />
                                </div>
                            )}

                            <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-6 px-10">
                                {!scanning && (
                                    <>
                                        <button className="h-20 w-20 bg-[#E5C07B] rounded-full flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_rgba(229,192,123,0.5)] group" onClick={handleScan}>
                                            <div className="h-full w-full border-[3px] border-primary rounded-full group-hover:bg-primary/10 transition-colors" />
                                        </button>
                                        <p className="text-xs font-bold text-[#E5C07B]/60 uppercase tracking-widest">Center selection within the focus aura</p>
                                    </>
                                )}
                            </div>
                            <Button variant="ghost" className="absolute top-6 left-6 text-white/60 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]" onClick={() => setView("menu")}>Dismiss</Button>
                        </Card>
                    </motion.div>
                )}

                {view === "scanned" && (
                    <motion.div
                        key="scanned"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto space-y-6"
                    >
                        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden ring-1 ring-[#E5C07B]/20">
                            <CardHeader className="flex flex-row items-center justify-between pb-4 bg-gradient-to-r from-primary/5 to-transparent">
                                <div>
                                    <CardTitle className="text-3xl serif font-bold text-gray-900">Grilled Salmon Salad</CardTitle>
                                    <CardDescription className="italic font-medium">Nutritional Signature Decoded</CardDescription>
                                </div>
                                <Badge className="bg-[#E5C07B] text-primary hover:bg-[#E5C07B] border-0 px-4 py-1.5 font-bold uppercase tracking-widest text-[10px] shadow-sm">Healthy Aura</Badge>
                            </CardHeader>
                            <CardContent className="space-y-8 pt-6">
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        { label: "Calories", val: "420", unit: "kcal", icon: Flame, color: "#722F37" },
                                        { label: "Protein", val: "32", unit: "g", icon: Activity, color: "#E5C07B" },
                                        { label: "Carbs", val: "12", unit: "g", icon: Utensils, color: "#722F37" },
                                        { label: "Fat", val: "24", unit: "g", icon: Droplets, color: "#E5C07B" },
                                    ].map((stat) => (
                                        <div key={stat.label} className="flex flex-col items-center p-4 bg-white/50 rounded-2xl ring-1 ring-gray-100 shadow-sm border-b-2" style={{ borderBottomColor: stat.color }}>
                                            <stat.icon className={`h-4 w-4 mb-2`} style={{ color: stat.color }} />
                                            <span className="text-xl font-bold text-gray-900 serif">{stat.val}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{stat.unit}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.2em]"><Info className="h-4 w-4 text-[#E5C07B]" /> Concierge Insight</h4>
                                    <div className="text-sm text-gray-700 leading-relaxed bg-[#E5C07B]/5 p-6 rounded-2xl border border-[#E5C07B]/20 italic shadow-inner">
                                        This selection perfectly aligns with your <strong>Physiological Equilibrium</strong>. The omegas and proteins are balanced for optimal recovery. <span className="text-primary font-bold">Recommendation:</span> Incorporate a touch of dark greens for enhanced micronutrient density.
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button className="flex-1 bg-primary hover:bg-primary/90 h-12 rounded-2xl font-bold shadow-lg" onClick={() => setView("menu")}>
                                        Archive to Registry
                                    </Button>
                                    <Button variant="outline" className="flex-1 h-12 rounded-2xl border-[#E5C07B]/40 text-primary font-bold hover:bg-primary/5" onClick={() => setView("scanner")}>
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
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-xl mx-auto"
                    >
                        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden ring-1 ring-[#E5C07B]/20">
                            <CardHeader className="bg-primary/5 text-center pb-8 pt-10">
                                <CardTitle className="serif text-3xl text-gray-900">Curation Preferences</CardTitle>
                                <CardDescription className="uppercase tracking-[0.2em] text-[10px] font-bold text-primary/60 mt-2">Design your 24-hour culinary architecture</CardDescription>
                            </CardHeader>
                            <CardContent className="p-10 space-y-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Therapeutic Goal</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["Metabolic Lift", "Equilibrium", "Vitality Plus"].map(g => (
                                            <Button key={g} variant="outline" size="sm" className="text-[10px] h-12 rounded-xl border-gray-100 bg-white font-bold hover:border-[#E5C07B] hover:text-primary transition-all uppercase tracking-tighter">{g}</Button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Physiological Nuances</label>
                                    <Input placeholder="e.g. Plant-based, No nuts, Minimalist sodium..." className="h-12 rounded-xl bg-gray-50 border-transparent focus:ring-[#E5C07B]/30 italic" />
                                </div>
                                <Button className="w-full bg-primary hover:bg-primary/90 h-14 text-lg font-bold rounded-2xl shadow-xl ring-2 ring-white/20" disabled={generating} onClick={handleGenerate}>
                                    {generating ? <Loader2 className="h-6 w-6 animate-spin text-[#E5C07B]" /> : "Craft 24h Architecture"}
                                </Button>
                                <Button variant="ghost" className="w-full font-bold uppercase tracking-widest text-xs text-gray-400" onClick={() => setView("menu")}>Return to Sanctuary</Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {view === "planned" && (
                    <motion.div
                        key="planned"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto space-y-6"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 serif">Culinary Architecture</h3>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E5C07B] mt-1">24 Hour Personalized Cycle</p>
                            </div>
                            <Badge className="bg-primary text-white font-bold h-8 px-4 border-none shadow-md">Vitality Focused</Badge>
                        </div>
                        <div className="space-y-6">
                            {[
                                { time: "Breakfast", meal: "Artisanal Overnight Oats", info: "Complex carb-loading for synaptic clarity", cals: "350", color: "#E5C07B" },
                                { time: "Lunch", meal: "Ancient Grain Medley Bowl", info: "Plant-derived amino acid optimization", cals: "520", color: "#722F37" },
                                { time: "Dinner", meal: "Pacific Wild Salmon Fillet", info: "Omega-3 dense neural support", cals: "450", color: "#E5C07B" },
                                { time: "Essence", meal: "Antioxidant Berry Nectar", info: "Polyphenol recovery boost", cals: "180", color: "#722F37" },
                            ].map((item, i) => (
                                <Card key={i} className="border-0 shadow-lg bg-white/80 backdrop-blur-md hover:shadow-xl transition-all rounded-[1.5rem] group overflow-hidden ring-1 ring-gray-100">
                                    <CardContent className="p-0 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="h-20 w-16 flex items-center justify-center font-bold serif text-white text-xl shadow-inner transition-colors" style={{ backgroundColor: item.color }}>
                                                {item.time[0]}
                                            </div>
                                            <div className="py-2">
                                                <h4 className="font-bold text-gray-900 serif group-hover:text-primary transition-colors text-lg">{item.meal}</h4>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#E5C07B]">{item.info}</p>
                                            </div>
                                        </div>
                                        <div className="text-right pr-6">
                                            <div className="text-2xl font-bold text-gray-900 serif">{item.cals}</div>
                                            <div className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">Energy Units</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="flex gap-4 pt-4">
                            <Button className="flex-1 bg-primary hover:bg-primary/90 h-14 rounded-2xl font-bold shadow-xl ring-2 ring-white/20" onClick={() => setView("menu")}>Commit to Sanctuary</Button>
                            <Button variant="outline" className="flex-1 h-14 rounded-2xl border-[#E5C07B]/40 text-primary font-bold hover:bg-primary/5" onClick={() => window.print()}>Export Dossier</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
