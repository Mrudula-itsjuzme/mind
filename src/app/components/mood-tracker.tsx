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
      {/* Mood Logging - Opulent Journaling */}
      <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] relative">
        <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

        <CardHeader className="p-12 border-b border-[#E5C07B]/5 bg-[#1A1112]/40 backdrop-blur-md relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold italic serif text-[#FDF5E6] tracking-tight">Emotional Calibration</CardTitle>
              <p className="text-[9px] font-black text-[#E5C07B]/40 uppercase tracking-[0.4em]">Daily Sequence Initiation</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-6 py-3 bg-[#1A1112] rounded-2xl ring-1 ring-[#E5C07B]/20 shadow-2xl">
                <TrendingUp className="h-4 w-4 text-[#E5C07B] drop-shadow-[0_0_8px_#E5C07B]" />
                <span className="text-sm font-extrabold text-[#E5C07B] italic serif tracking-tight">{streak} Day Momentum</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-12 space-y-12 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8">
            {MOODS.map((mood) => (
              <button
                key={mood.name}
                onClick={() => setSelectedMood(mood.name)}
                className={`group flex flex-col items-center gap-6 p-8 rounded-[2rem] transition-all duration-700 relative overflow-hidden ${selectedMood === mood.name
                  ? "bg-[#E5C07B] text-[#120A0B] shadow-[0_0_40px_rgba(229,192,123,0.2)] scale-105"
                  : "bg-[#1A1112]/40 ring-1 ring-white/5 text-[#FDF5E6]/40 hover:ring-[#E5C07B]/30 hover:bg-[#E5C07B]/5"
                  }`}
              >
                {selectedMood === mood.name && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-100 pointer-events-none" />
                )}
                <span className="text-4xl transition-transform duration-700 group-hover:scale-125 group-active:scale-90">{mood.emoji}</span>
                <span className={`text-[9px] font-black uppercase tracking-[0.3em] text-center transition-colors ${selectedMood === mood.name ? "text-[#120A0B]" : "text-[#FDF5E6]/20 group-hover:text-[#FDF5E6]/50"
                  }`}>
                  {mood.name}
                </span>
                {selectedMood === mood.name && (
                  <motion.div
                    layoutId="mood-active-glow"
                    className="absolute -inset-2 ring-2 ring-[#E5C07B] rounded-[2.25rem] opacity-30"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between px-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E5C07B]/30">Node Transcription</label>
                <span className="text-[8px] font-medium text-[#FDF5E6]/10 uppercase tracking-widest mt-1 italic">Vocal or Textual Input</span>
              </div>
              <div className="flex gap-4">
                <AnimatePresence>
                  {isRecording ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-4 bg-[#2D1417]/20 border border-red-500/20 px-6 py-2.5 rounded-2xl backdrop-blur-md"
                    >
                      <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] font-mono">
                        {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => {
                          setIsRecording(false);
                          setRecordedAudio("mock_audio");
                        }}
                        className="text-red-500/60 hover:text-red-500 transition-colors"
                      >
                        <StopCircle className="h-5 w-5" />
                      </button>
                    </motion.div>
                  ) : (
                    <Button
                      variant="ghost"
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
                      className="h-12 rounded-2xl gap-3 border border-[#E5C07B]/10 bg-[#1A1112]/60 hover:bg-[#E5C07B]/5 text-[#E5C07B] px-6 font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl backdrop-blur-md ring-1 ring-white/5 transition-all"
                    >
                      <Mic className="h-4 w-4" />
                      Auditory Journal
                    </Button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {recordedAudio ? (
              <div className="bg-[#120A0B] rounded-[2rem] p-10 flex items-center gap-10 text-white ring-1 ring-[#E5C07B]/10 shadow-3xl group transition-all hover:ring-[#E5C07B]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <Button variant="ghost" size="icon" className="h-16 w-16 text-[#E5C07B] bg-[#E5C07B]/5 hover:bg-[#E5C07B]/10 rounded-2xl ring-1 ring-[#E5C07B]/20 group-hover:scale-110 transition-transform relative z-10">
                  <Play className="h-6 w-6 fill-current" />
                </Button>
                <div className="flex-1 h-12 flex items-center gap-2 px-4 relative z-10">
                  {[...Array(40)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-[#E5C07B]/10 rounded-full transition-all group-hover:bg-[#E5C07B]/30"
                      style={{ height: `${20 + Math.random() * 80}%` }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-6 relative z-10">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsAnalyzing(true);
                      setTimeout(() => {
                        setIsAnalyzing(false);
                        setNote("A calibrated resonance of clarity mixed with low energy oscillation.");
                      }, 2000);
                    }}
                    className="text-[#E5C07B] font-black uppercase tracking-[0.3em] text-[9px] bg-white/5 h-12 px-6 rounded-xl border border-[#E5C07B]/10 hover:bg-[#E5C07B]/5 transition-all"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-3 drop-shadow-[0_0_8px_#E5C07B]" />
                    Synthesize Resonance
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setRecordedAudio(null)}
                    className="h-12 w-12 text-red-500/20 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all ring-1 ring-white/5"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </Button>
                </div>
              </div>
            ) : (
              <Textarea
                placeholder="Transcribe the deep resonances of your internal sequence..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[220px] rounded-[2rem] border border-white/5 bg-[#120A0B]/80 text-[#FDF5E6] focus:ring-[#E5C07B]/20 p-10 italic shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] placeholder:text-[#FDF5E6]/5 text-lg leading-relaxed backdrop-blur-md"
              />
            )}

            {isAnalyzing && (
              <div className="flex items-center justify-center py-8 text-[11px] font-black uppercase tracking-[0.4em] text-[#E5C07B]/60 gap-4 border border-[#E5C07B]/20 rounded-[2rem] bg-[#E5C07B]/5 animate-pulse shadow-2xl">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing Neural Sequence Patterns...
              </div>
            )}

            <Button
              className="w-full bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-700 hover:tracking-[0.5em] relative overflow-hidden group"
              onClick={handleLogMood}
              disabled={!selectedMood || isSaving}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="relative z-10">{isSaving ? "Synthesizing Archive..." : "Finalize Internal Calibration"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Insights - Ebony Block */}
        <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl flex flex-col relative">
          <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
          <CardHeader className="p-10 pb-6 border-b border-white/5 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <Badge className="bg-[#E5C07B] text-[#120A0B] border-none font-black px-3 py-1 text-[9px] tracking-widest uppercase shadow-[0_0_15px_rgba(229,192,123,0.3)]">7 Day Cycle</Badge>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl serif italic text-[#FDF5E6] tracking-tight">Periodic Insight</CardTitle>
              <p className="text-[9px] font-black text-[#E5C07B]/20 uppercase tracking-[0.4em]">Resonance Analysis</p>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-8 space-y-10 flex-1 relative z-10">
            <div className="bg-[#1A1112]/60 rounded-[2rem] p-8 ring-1 ring-white/5 shadow-inner">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.3em]">Dominant Resonance</span>
                <TrendingUp className="h-4 w-4 text-[#E5C07B]/40" />
              </div>
              <div className="text-4xl font-black text-[#E5C07B] serif italic tracking-tighter drop-shadow-[0_0_10px_rgba(229,192,123,0.1)]">
                {mostCommonMoodData ? `${mostCommonMoodData.emoji} ${mostCommonMoodData.name}` : "Pending Data"}
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-[10px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.4em] mb-6">Sentiment Distribution</div>
              <div className="space-y-8">
                {moodStats?.distribution?.slice(0, 3).map((item: any) => (
                  <div key={item.mood} className="space-y-3 group">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-[#FDF5E6]/30 group-hover:text-[#E5C07B] transition-colors">
                      <span>{item.mood}</span>
                      <span className="font-mono">{item.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1A1112] rounded-full overflow-hidden ring-1 ring-white/5">
                      <div className="h-full bg-[#E5C07B] rounded-full transition-all duration-1000 group-hover:shadow-[0_0_15px_#E5C07B]" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar - Large Ebony Block */}
        <Card className="lg:col-span-2 border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl relative">
          <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
          <CardHeader className="p-10 border-b border-white/5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <CalendarIcon className="h-5 w-5 text-[#E5C07B]/40" />
                  <CardTitle className="text-2xl serif italic text-[#FDF5E6] tracking-tight">Emotional Chronology</CardTitle>
                </div>
                <p className="text-[9px] font-black text-[#E5C07B]/20 uppercase tracking-[0.4em]">Temporal internal state grid</p>
              </div>
              <div className="flex items-center gap-6 bg-[#1A1112] p-2 rounded-2xl ring-1 ring-[#E5C07B]/10 shadow-inner">
                <Button variant="ghost" size="icon" onClick={handlePreviousMonth} className="h-11 w-11 text-[#FDF5E6]/20 hover:text-[#E5C07B] hover:bg-white/5 rounded-xl transition-all">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="text-[11px] font-black text-[#FDF5E6] min-w-[120px] text-center uppercase tracking-[0.4em] font-mono italic">
                  {currentMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
                <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-11 w-11 text-[#FDF5E6]/20 hover:text-[#E5C07B] hover:bg-white/5 rounded-xl transition-all" disabled={currentMonth.getMonth() === new Date().getMonth()}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-12 relative z-10">
            <div className="grid grid-cols-7 gap-6">
              {["S", "M", "T", "W", "T", "F", "S"].map(d => (
                <div key={d} className="text-center text-[10px] font-black text-[#E5C07B]/20 uppercase tracking-[0.5em] pb-6">{d}</div>
              ))}
              {calendarData.map((data, idx) => (
                <div
                  key={idx}
                  className={`aspect-square flex flex-col items-center justify-center rounded-2xl transition-all duration-500 group relative ${data
                    ? data.isToday
                      ? "bg-[#E5C07B] text-[#120A0B] shadow-[0_0_30px_rgba(229,192,123,0.3)] scale-105 z-20"
                      : "bg-[#1A1112]/60 ring-1 ring-white/5 hover:ring-[#E5C07B]/40 hover:bg-[#1A1112] cursor-pointer"
                    : "opacity-0 invisible"
                    }`}
                >
                  {data && (
                    <>
                      <span className={`text-[10px] font-black absolute top-2 right-3 ${data.isToday ? "" : "text-[#FDF5E6]/10"}`}>{data.day}</span>
                      {data.mood && <span className="text-2xl group-hover:scale-125 transition-transform duration-500">{data.mood}</span>}
                      {data.isToday && !data.mood && <div className="h-1.5 w-1.5 bg-[#120A0B] rounded-full animate-pulse" />}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center gap-10 flex-wrap border-t border-[#E5C07B]/5 pt-12">
              {MOODS.slice(0, 6).map(m => (
                <div key={m.name} className="flex items-center gap-4 group">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{m.emoji}</span>
                  <span className="text-[10px] font-black text-[#FDF5E6]/10 uppercase tracking-[0.3em] group-hover:text-[#FDF5E6]/30 transition-colors">{m.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
