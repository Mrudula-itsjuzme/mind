import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  Send,
  Volume2,
  Mic,
  Sparkles,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { chatbotService } from "@/lib/services/chatbot-api";
import {
  THERAPY_CATEGORIES,
  PERSONALITY_OPTIONS,
  INITIAL_AI_MESSAGE
} from "@/lib/config/chatbot-ui-config";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export function AIChatbot() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: INITIAL_AI_MESSAGE, timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedCategory || !selectedPersonality) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const aiResponseText = await chatbotService.generateResponse(
        inputMessage,
        {
          category: selectedCategory,
          personality: selectedPersonality,
          conversationHistory: messages.map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text
          }))
        }
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
    } finally {
      setIsTyping(false);
    }
  };

  if (!selectedCategory) {
    return (
      <div className="space-y-12 animate-in fade-in duration-1000">
        <div className="px-4 space-y-2">
          <h2 className="text-4xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-2">Initiate <span className="text-[#E5C07B] drop-shadow-[0_0_10px_rgba(229,192,123,0.2)]">Sanctuary</span></h2>
          <p className="text-[10px] font-black text-[#E5C07B]/30 uppercase tracking-[0.5em]">Select your therapeutic resonance</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 px-2">
          {THERAPY_CATEGORIES.map((category) => (
            <Card
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl group hover:ring-[#E5C07B]/40 hover:bg-[#1A1112] transition-all duration-700 cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
              <CardContent className="p-10 relative z-10">
                <div className="h-20 w-20 rounded-[1.5rem] bg-[#1A1112] mb-10 flex items-center justify-center ring-1 ring-[#E5C07B]/20 group-hover:ring-[#E5C07B]/40 group-hover:scale-110 transition-all duration-700 shadow-2xl">
                  <category.icon className="h-8 w-8 text-[#E5C07B] drop-shadow-[0_0_15px_rgba(229,192,123,0.3)]" />
                </div>
                <h3 className="text-2xl font-bold text-[#FDF5E6] serif italic mb-4 group-hover:text-[#E5C07B] transition-all duration-700">{category.name}</h3>
                <p className="text-sm text-[#FDF5E6]/40 leading-relaxed font-medium mb-10 italic serif group-hover:text-[#FDF5E6]/60 transition-colors">{category.description}</p>
                <div className="flex items-center gap-4 text-[10px] font-black text-[#E5C07B] uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all duration-700 hover:tracking-[0.5em]">
                  Resonate Now <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedPersonality) {
    return (
      <div className="space-y-12 animate-in fade-in duration-1000">
        <div className="px-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedCategory(null)}
            className="text-[#E5C07B] hover:bg-[#E5C07B]/5 mb-10 pl-0 font-black uppercase tracking-[0.4em] text-[10px] transition-all hover:pl-2"
          >
            <ChevronRight className="h-4 w-4 mr-3 rotate-180" /> Adjust Resonance
          </Button>
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-2">Architect of <span className="text-[#E5C07B] drop-shadow-[0_0_10px_rgba(229,192,123,0.2)]">Presence</span></h2>
            <p className="text-[10px] font-black text-[#E5C07B]/30 uppercase tracking-[0.5em]">Choose the guide for your sequence</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 px-2">
          {PERSONALITY_OPTIONS.map((personality) => (
            <Card
              key={personality.name}
              onClick={() => setSelectedPersonality(personality.name)}
              className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl group hover:ring-[#E5C07B]/40 hover:bg-[#1A1112] transition-all duration-700 cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
              <CardHeader className="p-10 pb-6 relative z-10">
                <Avatar className="h-24 w-24 mb-6 ring-4 ring-[#E5C07B]/10 group-hover:ring-[#E5C07B]/40 transition-all duration-700 shadow-4xl scale-110 group-hover:scale-100">
                  <AvatarFallback className="bg-[#1A1112] text-[#E5C07B] font-black serif italic text-3xl">{personality.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-bold text-[#FDF5E6] serif italic group-hover:text-[#E5C07B] transition-all duration-700">{personality.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-10 pt-0 relative z-10">
                <p className="text-sm text-[#FDF5E6]/40 leading-relaxed font-medium italic serif mb-10 group-hover:text-[#FDF5E6]/60 transition-colors">"{personality.emoji} Guide"</p>
                <div className="bg-[#E5C07B]/5 rounded-2xl p-5 ring-1 ring-[#E5C07B]/10 opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-inner">
                  <span className="text-[9px] font-black text-[#E5C07B] uppercase tracking-[0.4em]">Select Presence</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-14rem)] flex flex-col animate-in fade-in duration-1000 px-2">
      <Card className="flex-1 flex flex-col border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[3rem] overflow-hidden shadow-4xl relative">
        <div className="absolute top-0 right-0 p-24 opacity-[0.03] rotate-12 select-none pointer-events-none">
          <Sparkles className="h-[500px] w-[500px] text-[#E5C07B]" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

        <CardHeader className="p-10 border-b border-white/5 bg-[#1A1112]/40 backdrop-blur-md flex flex-row items-center justify-between z-20">
          <div className="flex items-center gap-6">
            <Avatar className="h-16 w-16 ring-4 ring-[#E5C07B]/10 shadow-4xl group-hover:scale-110 transition-transform duration-700">
              <AvatarFallback className="bg-[#E5C07B] text-[#120A0B] font-black serif italic text-2xl">{selectedPersonality[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-bold text-[#FDF5E6] serif italic tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">{selectedPersonality}</CardTitle>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 bg-[#E5C07B] rounded-full animate-pulse shadow-[0_0_10px_#E5C07B]" />
                <p className="text-[10px] font-black text-[#E5C07B]/60 uppercase tracking-[0.4em] italic">{selectedCategory} Resonance Activated</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl bg-white/5 text-[#E5C07B] hover:bg-[#E5C07B]/10 border border-white/5 transition-all">
              <Volume2 className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedPersonality(null);
              }}
              className="h-14 w-14 rounded-2xl bg-white/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 border border-white/5 transition-all"
            >
              <XCircle className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-12 space-y-12 z-10 custom-scrollbar relative">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                layout
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-6 max-w-[75%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className={`h-12 w-12 ring-2 ring-[#E5C07B]/10 shadow-2xl transition-all duration-700 ${message.sender === "user" ? "opacity-0 scale-0" : "scale-100"}`}>
                    <AvatarFallback className="bg-[#1A1112] text-[#E5C07B] text-sm font-black italic serif">AI</AvatarFallback>
                  </Avatar>
                  <div className={`p-8 rounded-[2rem] leading-relaxed text-base shadow-4xl transition-all duration-700 backdrop-blur-sm ${message.sender === "user"
                    ? "bg-gradient-to-br from-[#E5C07B] to-[#d4b16a] text-[#120A0B] rounded-tr-none font-black shadow-[0_20px_40px_rgba(229,192,123,0.2)]"
                    : "bg-[#1A1112]/80 text-[#FDF5E6]/80 rounded-tl-none ring-1 ring-white/10 italic font-medium serif"
                    }`}>
                    {message.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-[#1A1112]/60 rounded-3xl rounded-tl-none p-6 ring-1 ring-[#E5C07B]/10 shadow-2xl backdrop-blur-md">
                <div className="flex gap-3">
                  <span className="h-2 w-2 bg-[#E5C07B] rounded-full animate-bounce shadow-[0_0_8px_#E5C07B] [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 bg-[#E5C07B] rounded-full animate-bounce shadow-[0_0_8px_#E5C07B] [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 bg-[#E5C07B] rounded-full animate-bounce shadow-[0_0_8px_#E5C07B]" />
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>

        <div className="p-10 bg-[#1A1112]/60 backdrop-blur-xl border-t border-white/5 flex gap-6 z-20">
          <div className="flex-1 relative group">
            <Input
              placeholder="Transpose your thoughts into the void..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="h-20 bg-[#120A0B] border-white/5 text-[#FDF5E6] focus:ring-[#E5C07B]/30 rounded-[1.5rem] px-10 text-base italic serif shadow-inner placeholder:text-[#FDF5E6]/5 transition-all group-hover:border-[#E5C07B]/10"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="absolute right-3 top-3 h-14 px-8 bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] rounded-xl shadow-2xl transition-all duration-700 font-black uppercase tracking-[0.3em] text-[11px] disabled:opacity-20 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 relative z-10">
                <span>Transmit</span>
                <Send className="h-5 w-5" />
              </div>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-20 w-20 bg-[#120A0B] text-[#E5C07B] hover:bg-[#E5C07B]/5 rounded-[1.5rem] ring-1 ring-white/5 shadow-2xl transition-all group">
            <Mic className="h-7 w-7 group-hover:scale-110 transition-transform duration-700" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
