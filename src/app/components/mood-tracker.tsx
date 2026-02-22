import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { Badge } from "@/app/components/ui/badge";
import {
  Mic,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Calendar as CalendarIcon,
  StopCircle,
  Play,
  Trash2,
  Loader2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { db } from "@/lib/database/db";
import { authService } from "@/lib/auth";
import { MOODS, getMoodByName } from "@/lib/config/mood-config";
import { motion, AnimatePresence } from "framer-motion";

interface CalendarDay {
  day: number;
  mood: string | null;
  isToday: boolean;
}

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarData, setCalendarData] = useState<(CalendarDay | null)[]>([]);
  const [moodStats, setMoodStats] = useState<any>(null);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadMoodData();
  }, [currentMonth]);

  const loadMoodData = async () => {
    setIsLoading(true);
    try {
      const user = await authService.getCurrentUser();
      const userId = user?.id || 'demo-user';

      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const moodRecords = db.getMoodRecordsForMonth(userId, year, month);

      const calendar = generateCalendarWithMoods(year, month, moodRecords);
      setCalendarData(calendar);

      const stats = db.getMoodStatistics(userId, 7);
      setMoodStats(stats);

      const currentStreak = db.getCurrentStreak(userId);
      setStreak(currentStreak);
    } catch (error) {
      console.error("Failed to load mood data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCalendarWithMoods = (year: number, month: number, moodRecords: any[]): (CalendarDay | null)[] => {
    const today = new Date();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const moodMap = new Map();
    moodRecords.forEach((record: any) => {
      const date = new Date(record.created_at);
      const day = date.getDate();
      const moodData = getMoodByName(record.mood_type);
      moodMap.set(day, moodData?.emoji || null);
    });

    const data: (CalendarDay | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      data.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      data.push({
        day,
        mood: moodMap.get(day) || null,
        isToday
      });
    }
    return data;
  };

  const handleLogMood = async () => {
    if (!selectedMood) return;

    setIsSaving(true);
    try {
      const user = await authService.getCurrentUser();
      const userId = user?.id || 'demo-user';

      const moodData = getMoodByName(selectedMood);
      if (!moodData) return;

      db.saveMoodRecord({
        user_id: userId,
        mood_type: selectedMood,
        mood_intensity: moodData.intensity,
        note: note || undefined,
      });

      setSelectedMood(null);
      setNote("");
      setRecordedAudio(null);
      loadMoodData();
    } catch (error) {
      console.error("Failed to log mood:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    const today = new Date();
    if (nextMonth <= today) {
      setCurrentMonth(nextMonth);
    }
  };

  const mostCommonMoodData = moodStats?.mostCommon
    ? getMoodByName(moodStats.mostCommon)
    : null;

  return (
    <div className="space-y-12 pb-12">
      {/* Mood Logging - Structural Design */}
      <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
        <CardHeader className="p-8 border-b border-[#E5C07B]/5 bg-[#2D1417]/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl italic serif text-[#FDF5E6] tracking-tight">Emotional Calibration</CardTitle>
              <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.3em] mt-1">Daily Sequence Initiation</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#2D1417]/40 rounded-xl ring-1 ring-white/5">
                <TrendingUp className="h-3.5 w-3.5 text-[#E5C07B]" />
                <span className="text-[11px] font-extrabold text-[#E5C07B] italic serif">{streak} Day Momentum</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {MOODS.map((mood) => (
              <button
                key={mood.name}
                onClick={() => setSelectedMood(mood.name)}
                className={`group flex flex-col items-center gap-4 p-6 rounded-2xl transition-all duration-500 relative ${selectedMood === mood.name
                    ? "bg-[#E5C07B] text-[#2D1417] shadow-2xl scale-105"
                    : "bg-[#2D1417]/20 border border-white/5 text-[#FDF5E6]/60 hover:border-[#E5C07B]/30 hover:bg-[#E5C07B]/5"
                  }`}
              >
                <span className="text-3xl transition-transform duration-500 group-hover:scale-125">{mood.emoji}</span>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-center transition-colors ${selectedMood === mood.name ? "text-[#2D1417]" : "text-[#FDF5E6]/30 group-hover:text-[#FDF5E6]/60"
                  }`}>
                  {mood.name}
                </span>
                {selectedMood === mood.name && (
                  <motion.div
                    layoutId="mood-active"
                    className="absolute -inset-1 ring-2 ring-[#E5C07B] rounded-[1.25rem] opacity-20"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDF5E6]/40 ml-2">Note of Reflection</label>
              <div className="flex gap-2">
                <AnimatePresence>
                  {isRecording ? (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-3 bg-[#E5C07B]/5 px-4 py-2 rounded-xl ring-1 ring-red-500/40"
                    >
                      <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none">
                        {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => {
                          setIsRecording(false);
                          setRecordedAudio("mock_audio");
                        }}
                        className="text-red-500 hover:scale-110 transition-transform"
                      >
                        <StopCircle className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsRecording(true);
                        setRecordingTime(0);
                        const interval = setInterval(() => setRecordingTime(t => t + 1), 1000);
                        setTimeout(() => {
                          clearInterval(interval);
                          setIsRecording(false);
                          setRecordedAudio("mock_audio");
                        }, 5000);
                      }}
                      className="h-10 rounded-xl gap-2 border border-[#E5C07B]/10 bg-[#2D1417]/40 hover:bg-[#E5C07B]/5 text-[#E5C07B] px-4 font-bold uppercase tracking-[0.2em] text-[9px]"
                    >
                      <Mic className="h-3.5 w-3.5" />
                      Auditory Journal
                    </Button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {recordedAudio ? (
              <div className="bg-[#1A1112] rounded-2xl p-6 flex items-center gap-6 text-white ring-1 ring-[#E5C07B]/10 shadow-none mb-4 group transition-all hover:ring-[#E5C07B]/30">
                <Button variant="ghost" size="icon" className="h-12 w-12 text-[#E5C07B] bg-[#E5C07B]/5 hover:bg-[#E5C07B]/10 rounded-xl ring-1 ring-[#E5C07B]/10">
                  <Play className="h-5 w-5 fill-current" />
                </Button>
                <div className="flex-1 h-8 flex items-center gap-1.5 px-2">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#E5C07B]/20 rounded-full transition-all group-hover:bg-[#E5C07B]/40"
                      style={{ height: `${20 + Math.random() * 80}%` }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsAnalyzing(true);
                      setTimeout(() => {
                        setIsAnalyzing(false);
                        setNote("I feel a sense of clarity today, though my physical energy is low.");
                      }, 2000);
                    }}
                    className="text-[#E5C07B] font-bold uppercase tracking-[0.2em] text-[9px] hover:bg-white/5 h-10 px-4 rounded-xl border border-[#E5C07B]/10"
                  >
                    <Sparkles className="h-3 w-3 mr-2" />
                    Synthesize Text
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setRecordedAudio(null)}
                    className="h-10 w-10 text-red-500/40 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Textarea
                placeholder="Transcribe the whispers of your subconcious..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[160px] rounded-2xl border border-white/5 bg-[#2D1417]/60 text-[#FDF5E6] focus:ring-[#E5C07B]/20 p-8 italic shadow-inner placeholder:text-[#FDF5E6]/10 text-base leading-relaxed"
              />
            )}

            {isAnalyzing && (
              <div className="flex items-center justify-center py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E5C07B]/40 gap-3 border border-dashed border-[#E5C07B]/20 rounded-2xl bg-[#E5C07B]/5 animate-pulse">
                <Loader2 className="h-3 w-3 animate-spin" />
                Analyzing Neural Patterns...
              </div>
            )}

            <Button
              className="w-full bg-[#E5C07B] hover:bg-[#d4b16a] text-[#2D1417] h-16 rounded-2xl shadow-none font-extrabold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 hover:tracking-[0.4em]"
              onClick={handleLogMood}
              disabled={!selectedMood || isSaving}
            >
              {isSaving ? "Synthesizing Archive..." : "Finalize Calibration"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Insights - Structural Block */}
        <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none flex flex-col">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-[#E5C07B] text-[#1A1112] border-none font-bold px-2 py-0.5 text-[8px] tracking-widest uppercase">7 Day Cycle</Badge>
            </div>
            <CardTitle className="text-xl serif italic text-[#FDF5E6]">Periodic Insight</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-6 flex-1">
            <div className="bg-[#2D1417]/20 rounded-2xl p-6 ring-1 ring-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em]">Dominant Resonance</span>
                <TrendingUp className="h-4 w-4 text-[#E5C07B]/40" />
              </div>
              <div className="text-3xl font-bold text-[#E5C07B] serif italic tracking-tight">
                {mostCommonMoodData ? `${mostCommonMoodData.emoji} ${mostCommonMoodData.name}` : "Pending Data"}
              </div>
            </div>

            <div className="bg-[#2D1417]/20 rounded-2xl p-6 ring-1 ring-white/5">
              <div className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em] mb-4">Sentiment Distribution</div>
              <div className="space-y-4">
                {moodStats?.distribution?.slice(0, 3).map((item: any) => (
                  <div key={item.mood} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#FDF5E6]/40">
                      <span>{item.mood}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-1 bg-[#2D1417] shadow-none" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar - Large Functional Block */}
        <Card className="lg:col-span-2 border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
          <CardHeader className="p-8 border-b border-[#E5C07B]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-[#E5C07B]/40" />
                <CardTitle className="text-xl serif italic text-[#FDF5E6]">Emotional Chronology</CardTitle>
              </div>
              <div className="flex items-center gap-4 bg-[#2D1417]/40 p-1 rounded-xl ring-1 ring-white/5">
                <Button variant="ghost" size="icon" onClick={handlePreviousMonth} className="h-8 w-8 text-[#FDF5E6]/40 hover:text-[#E5C07B] rounded-lg">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-[10px] font-bold text-[#FDF5E6] min-w-[100px] text-center uppercase tracking-widest font-mono">
                  {currentMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
                <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-8 w-8 text-[#FDF5E6]/40 hover:text-[#E5C07B] rounded-lg" disabled={currentMonth.getMonth() === new Date().getMonth()}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-7 gap-4">
              {["S", "M", "T", "W", "T", "F", "S"].map(d => (
                <div key={d} className="text-center text-[10px] font-black text-[#FDF5E6]/20 uppercase tracking-widest pb-4">{d}</div>
              ))}
              {calendarData.map((data, idx) => (
                <div
                  key={idx}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all ${data
                      ? data.isToday
                        ? "bg-[#E5C07B] text-[#2D1417] ring-4 ring-[#E5C07B]/10 shadow-lg"
                        : "bg-[#2D1417]/40 ring-1 ring-white/5 hover:ring-[#E5C07B]/20 cursor-pointer"
                      : "opacity-0"
                    }`}
                >
                  {data && (
                    <>
                      <span className={`text-[10px] font-bold ${data.isToday ? "" : "text-[#FDF5E6]/20"}`}>{data.day}</span>
                      {data.mood && <span className="text-lg mt-0.5">{data.mood}</span>}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center gap-8 flex-wrap border-t border-[#E5C07B]/5 pt-8">
              {MOODS.slice(0, 6).map(m => (
                <div key={m.name} className="flex items-center gap-3">
                  <span className="text-xl">{m.emoji}</span>
                  <span className="text-[9px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em]">{m.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
