import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MessageCircle, Sparkles, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function FloatingAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-[#3D181C] border border-[#E5C07B]/30 rounded-[2.5rem] p-6 shadow-2xl w-72 backdrop-blur-3xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[#E5C07B]" />
                                <span className="text-xs font-bold text-[#E5C07B] uppercase tracking-widest">Mind Assistant</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6 text-white/40 hover:text-white">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <p className="text-sm text-[#FDF5E6]/80 leading-relaxed mb-6 italic">
                            "I'm here to listen. Would you like to record a quick thought or ask for a wellness tip?"
                        </p>

                        <div className="flex gap-2">
                            <Button
                                onClick={() => setIsListening(!isListening)}
                                className={`flex-1 h-12 rounded-2xl font-bold transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-[#E5C07B] text-[#722F37]'}`}
                            >
                                <Mic className="h-4 w-4 mr-2" />
                                {isListening ? "Listening..." : "Voice Note"}
                            </Button>
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-[#E5C07B]/20 text-[#E5C07B]">
                                <MessageCircle className="h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative h-20 w-20 rounded-full bg-gradient-to-br from-[#E5C07B] to-[#722F37] shadow-[0_0_40px_rgba(229,192,123,0.3)] flex items-center justify-center group overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity animate-glow"></div>
                <div className="relative z-10">
                    {isOpen ? <X className="h-8 w-8 text-white" /> : <Sparkles className="h-10 w-10 text-white animate-pulse" />}
                </div>

                {/* The "Glowing Ball" essence */}
                <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-md opacity-50 animate-pulse"></div>
            </motion.button>
        </div>
    );
}
