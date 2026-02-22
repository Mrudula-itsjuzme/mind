import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import {
  Send,
  Volume2,
  Mic,
  Sparkles,
  Phone,
  MessageSquare,
  XCircle,
  ChevronRight,
  ArrowRight,
  Loader2
} from "lucide-react";
import { chatbotService } from "@/lib/services/chatbot-api";
import { db } from "@/lib/database/db";
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
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

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
      <div className="space-y-12 animate-in fade-in duration-700">
        <div className="px-2">
          <h2 className="text-3xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-2">Initiate <span className="text-[#E5C07B]">Sanctuary</span></h2>
          <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.3em]">Select your therapeutic resonance</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {THERAPY_CATEGORIES.map((category) => (
            <Card
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none group hover:ring-[#E5C07B]/30 hover:bg-[#E5C07B]/5 transition-all cursor-pointer"
            >
              <CardContent className="p-8">
                <div className="h-14 w-14 rounded-2xl bg-[#E5C07B]/5 mb-6 flex items-center justify-center ring-1 ring-[#E5C07B]/10 group-hover:ring-[#E5C07B]/30 transition-all">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[#FDF5E6] serif italic mb-3 group-hover:text-[#E5C07B] transition-colors">{category.label}</h3>
                <p className="text-[11px] text-[#FDF5E6]/40 leading-relaxed font-medium mb-6 italic">{category.description}</p>
                <div className="flex items-center gap-2 text-[9px] font-black text-[#E5C07B] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
                  Resonate Now <ChevronRight className="h-3 w-3" />
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
      <div className="space-y-12 animate-in fade-in duration-700">
        <div className="px-2">
          <Button
            variant="ghost"
            onClick={() => setSelectedCategory(null)}
            className="text-[#E5C07B] hover:bg-white/5 mb-6 pl-0 font-bold uppercase tracking-[0.2em] text-[10px]"
          >
            ← Adjust Resonance
          </Button>
          <h2 className="text-3xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-2">Architect of <span className="text-[#E5C07B]">Presence</span></h2>
          <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.3em]">Choose the guide for your sequence</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PERSONALITY_OPTIONS.map((personality) => (
            <Card
              key={personality.id}
              onClick={() => setSelectedPersonality(personality.id)}
              className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none group hover:ring-[#E5C07B]/30 hover:bg-[#E5C07B]/5 transition-all cursor-pointer"
            >
              <CardHeader className="p-8 pb-4">
                <Avatar className="h-16 w-16 mb-2 ring-2 ring-[#E5C07B]/10 group-hover:ring-[#E5C07B]/30 transition-all shadow-xl">
                  <AvatarFallback className="bg-[#1A1112] text-[#E5C07B] font-bold serif text-xl">{personality.label[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-bold text-[#FDF5E6] serif italic group-hover:text-[#E5C07B] transition-colors">{personality.label}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-[10px] text-[#FDF5E6]/40 leading-relaxed font-medium italic mb-6">"{personality.description}"</p>
                <div className="bg-[#2D1417]/40 rounded-xl p-3 ring-1 ring-white/5 opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-[8px] font-black text-[#E5C07B] uppercase tracking-widest">Select Presence</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col animate-in fade-in duration-700">
      <Card className="flex-1 flex flex-col border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none relative">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] rotate-12 select-none pointer-events-none">
          <Sparkles className="h-64 w-64 text-[#E5C07B]" />
        </div>

        <CardHeader className="p-8 border-b border-[#E5C07B]/5 bg-[#2D1417]/20 flex flex-row items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-[#E5C07B]/20 shadow-xl">
              <AvatarFallback className="bg-[#E5C07B] text-[#1A1112] font-bold serif text-lg">{selectedPersonality[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-bold text-[#FDF5E6] serif italic">{selectedPersonality}</CardTitle>
              <p className="text-[9px] font-bold text-[#E5C07B]/60 uppercase tracking-[0.2em] mt-1">{selectedCategory} Resonance</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-white/5 text-[#E5C07B] hover:bg-[#E5C07B]/10">
              <Volume2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedPersonality(null);
              }}
              className="h-11 w-11 rounded-xl bg-white/5 text-red-500/60 hover:text-red-500 hover:bg-red-500/5"
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-10 space-y-10 z-10 scrollbar-thin scrollbar-thumb-[#E5C07B]/10">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-4 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={`h-10 w-10 ring-1 ring-[#E5C07B]/10 shadow-lg ${message.sender === "user" ? "opacity-0" : ""}`}>
                  <AvatarFallback className="bg-[#1A1112] text-[#E5C07B] text-xs font-bold serif">AI</AvatarFallback>
                </Avatar>
                <div className={`p-6 rounded-2xl leading-relaxed text-sm shadow-inner transition-all duration-500 ${message.sender === "user"
                    ? "bg-[#E5C07B] text-[#1A1112] rounded-tr-none font-bold"
                    : "bg-[#1A1112] text-[#FDF5E6]/80 rounded-tl-none ring-1 ring-white/5 italic font-medium"
                  }`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#1A1112]/40 rounded-2xl rounded-tl-none p-5 ring-1 ring-[#E5C07B]/5">
                <div className="flex gap-2">
                  <span className="h-1.5 w-1.5 bg-[#E5C07B]/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 bg-[#E5C07B]/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 bg-[#E5C07B]/40 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <div className="p-8 bg-[#2D1417]/40 border-t border-[#E5C07B]/5 flex gap-4 z-10">
          <div className="flex-1 relative">
            <Input
              placeholder="Transpose your thoughts..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="h-16 bg-[#1A1112] border-white/5 text-[#FDF5E6] focus:ring-[#E5C07B]/20 rounded-2xl px-8 text-sm italic pr-16"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="absolute right-2 top-2 h-12 w-12 bg-[#E5C07B] hover:bg-[#d4b16a] text-[#2D1417] rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-16 w-16 bg-white/5 text-[#E5C07B] hover:bg-[#E5C07B]/10 rounded-2xl ring-1 ring-[#E5C07B]/10">
            <Mic className="h-6 w-6" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
