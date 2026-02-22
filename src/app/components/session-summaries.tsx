import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import {
  FileText,
  Download,
  AlertCircle,
  CheckCircle,
  Target,
  Heart,
  TrendingUp,
  Calendar,
  Clock,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
  ArrowRight
} from "lucide-react";

const sessionSummaries = [
  {
    id: 1,
    date: "February 3, 2026",
    duration: "45 minutes",
    type: "AI Therapist - Calm Presence",
    hasRedFlag: false,
    summary: {
      keyIssues: [
        "Work-related stress and deadline anxiety",
        "Difficulty setting boundaries with colleagues",
        "Sleep disruption due to overthinking"
      ],
      patterns: [
        "Anxiety peaks during Sunday evenings",
        "Improvement noted when maintaining exercise routine"
      ],
      triggers: [
        "Last-minute project requests",
        "Lack of clear communication from supervisor"
      ],
      actionPlan: [
        "Practice saying 'no' to non-essential requests",
        "Establish a wind-down routine"
      ],
      selfCare: [
        "Continue morning walks",
        "Try progressive muscle relaxation"
      ]
    },
    mood: "Anxious",
    progress: 72
  },
  {
    id: 2,
    date: "February 1, 2026",
    duration: "38 minutes",
    type: "Life Coach - Best Friend",
    hasRedFlag: false,
    summary: {
      keyIssues: [
        "Career transition uncertainty",
        "Financial concerns about career change"
      ],
      patterns: [
        "More confident when discussing passion projects",
        "Energy levels higher when working on personal goals"
      ],
      triggers: [
        "Family gatherings and career questions",
        "Social media comparison"
      ],
      actionPlan: [
        "Research 3 companies this week",
        "Update resume highlights"
      ],
      selfCare: [
        "Journal about ideal work day",
        "Limit social media"
      ]
    },
    mood: "Hopeful",
    progress: 68
  }
];

export function SessionSummaries() {
  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-700">
      <div className="px-2">
        <h2 className="text-3xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-2">Session <span className="text-[#E5C07B]">Archives</span></h2>
        <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.3em]">Historical synthesis of therapeutic sequences</p>
      </div>

      {/* Overview Stats - Structural Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-5 w-5 text-[#E5C07B]/40" />
              <Badge className="bg-[#E5C07B]/5 text-[#E5C07B] border border-[#E5C07B]/10 text-[8px] font-black tracking-widest px-2">LIFETIME</Badge>
            </div>
            <div className="text-3xl font-bold text-[#FDF5E6] serif italic mb-1">12</div>
            <div className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-widest font-mono">Total Sequences</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-5 w-5 text-[#E5C07B]/40" />
              <TrendingUp className="h-4 w-4 text-[#E5C07B]/20" />
            </div>
            <div className="text-3xl font-bold text-[#FDF5E6] serif italic mb-1">23</div>
            <div className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-widest font-mono">Resolutions Active</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-5 w-5 text-[#E5C07B]/40" />
            </div>
            <div className="text-3xl font-bold text-[#FDF5E6] serif italic mb-1">8.5h</div>
            <div className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-widest font-mono">Interaction Time</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Heart className="h-5 w-5 text-[#E5C07B]/40" />
            </div>
            <div className="text-3xl font-bold text-[#FDF5E6] serif italic mb-1">68%</div>
            <div className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-widest font-mono">Mean Progression</div>
          </CardContent>
        </Card>
      </div>

      {/* Archives List */}
      <div className="space-y-8">
        {sessionSummaries.map((session) => (
          <Card
            key={session.id}
            className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none group hover:ring-[#E5C07B]/30 transition-all"
          >
            <CardHeader className="p-10 border-b border-[#E5C07B]/5 bg-[#2D1417]/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <CardTitle className="text-2xl font-bold text-[#FDF5E6] serif italic tracking-tight">{session.date}</CardTitle>
                    <Badge className="bg-[#E5C07B]/20 text-[#E5C07B] border-none text-[9px] font-bold tracking-widest px-3 py-1 uppercase">{session.mood}</Badge>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      {session.duration} Sequence
                    </span>
                    <span>•</span>
                    <span className="italic">{session.type}</span>
                  </div>
                </div>
                <Button variant="outline" className="border-[#E5C07B]/10 bg-[#2D1417]/40 text-[#FDF5E6]/60 hover:bg-[#E5C07B]/5 h-12 rounded-xl font-bold uppercase tracking-widest text-[9px] px-6">
                  <Download className="h-4 w-4 mr-3 text-[#E5C07B]" />
                  Internal Port
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-10 space-y-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Section 1 */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-[#E5C07B] uppercase tracking-[0.3em] flex items-center gap-3 mb-6">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Core Resonances
                  </h4>
                  <ul className="space-y-4">
                    {session.summary.keyIssues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-4 text-sm text-[#FDF5E6]/60 italic font-medium leading-relaxed">
                        <span className="text-[#E5C07B]/20 mt-1.5">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-[#E5C07B] uppercase tracking-[0.3em] flex items-center gap-3 mb-6">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Behavioral Cycles
                  </h4>
                  <ul className="space-y-4">
                    {session.summary.patterns.map((pattern, index) => (
                      <li key={index} className="flex items-start gap-4 text-sm text-[#FDF5E6]/60 italic font-medium leading-relaxed">
                        <span className="text-[#E5C07B]/20 mt-1.5">•</span>
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-[#E5C07B] uppercase tracking-[0.3em] flex items-center gap-3 mb-6">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    External Stimuli
                  </h4>
                  <ul className="space-y-4">
                    {session.summary.triggers.map((trigger, index) => (
                      <li key={index} className="flex items-start gap-4 text-sm text-[#FDF5E6]/60 italic font-medium leading-relaxed">
                        <span className="text-[#E5C07B]/20 mt-1.5">•</span>
                        <span>{trigger}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 4 */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-[#E5C07B] uppercase tracking-[0.3em] flex items-center gap-3 mb-6">
                    <Target className="h-3.5 w-3.5" />
                    Protocol Adjustments
                  </h4>
                  <ul className="space-y-4">
                    {session.summary.actionPlan.map((action, index) => (
                      <li key={index} className="flex items-start gap-4 text-sm text-[#FDF5E6]/60 italic font-medium leading-relaxed">
                        <CheckCircle className="h-3.5 w-3.5 text-[#E5C07B]/40 mt-1" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Progress Analysis */}
              <div className="pt-10 border-t border-[#E5C07B]/5">
                <div className="flex items-center justify-between mb-4 px-2">
                  <span className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.3em]">Sequence Maturity Analysis</span>
                  <span className="text-xl font-bold text-[#E5C07B] serif italic">{session.progress}%</span>
                </div>
                <div className="h-1.5 bg-[#2D1417] rounded-full overflow-hidden ring-1 ring-white/5">
                  <Progress value={session.progress} className="h-full bg-[#E5C07B]/40 shadow-none" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Persistence Call */}
      <div className="bg-[#E5C07B] rounded-2xl p-12 text-[#1A1112] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 select-none pointer-events-none transition-transform group-hover:rotate-0 duration-1000">
          <Download className="h-64 w-64" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="text-3xl font-bold serif italic mb-2">Persistence Synthesis</h3>
            <p className="text-sm font-bold opacity-60 uppercase tracking-[0.2em]">Generate comprehensive historical port of all sequences</p>
          </div>
          <Button className="h-16 px-10 bg-[#1A1112] hover:bg-[#2D1417] text-[#E5C07B] rounded-xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-transform hover:scale-105">
            Download Total Archive
          </Button>
        </div>
      </div>
    </div>
  );
}
