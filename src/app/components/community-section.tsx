import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Users,
  Search,
  Heart,
  MessageSquare,
  Calendar,
  Shield,
  TrendingUp,
  Globe,
  Lock,
  Send,
  Sparkles
} from "lucide-react";

const forumPosts = [
  {
    id: 1,
    author: "Anonymous User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
    title: "Managing anxiety in social situations",
    preview: "I've been struggling with social anxiety for years. Recently started trying new techniques...",
    category: "Anxiety",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    tags: ["Anxiety", "Social", "Support"]
  },
  {
    id: 2,
    author: "Hope Seeker",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
    title: "Celebrating 6 months of therapy",
    preview: "Just wanted to share that I've completed 6 months of regular therapy sessions and...",
    category: "Success Stories",
    replies: 67,
    likes: 234,
    timeAgo: "5 hours ago",
    tags: ["Success", "Milestone", "Therapy"]
  }
];

const supportGroups = [
  {
    id: 1,
    name: "Anxiety Support Circle",
    members: 1243,
    description: "A safe space to discuss anxiety, share coping strategies, and support each other.",
    nextMeeting: "Tomorrow at 7:00 PM",
    category: "Anxiety",
    isPrivate: false
  },
  {
    id: 2,
    name: "Depression Warriors",
    members: 892,
    description: "Weekly meetups for people managing depression. We share our struggles and victories.",
    nextMeeting: "Friday at 6:30 PM",
    category: "Depression",
    isPrivate: false
  }
];

export function CommunitySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState(false);

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h2 className="text-3xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-2">The <span className="text-[#E5C07B]">Collective</span></h2>
          <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.3em]">Shared resonance and mutual growth</p>
        </div>
      </div>

      {/* Safety Notice - Opulent Protocols */}
      <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group">
        <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
        <CardContent className="p-10 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
            <div className="h-16 w-16 rounded-[1.5rem] bg-[#1A1112] flex items-center justify-center flex-shrink-0 ring-1 ring-[#E5C07B]/20 shadow-2xl group-hover:scale-110 transition-transform duration-700">
              <Shield className="h-7 w-7 text-[#E5C07B] drop-shadow-[0_0_10px_#E5C07B]" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-[10px] font-black text-[#E5C07B] uppercase tracking-[0.5em] opacity-40">Sanctuary Protocols</h3>
              <div className="flex flex-wrap gap-8 text-[11px] font-black text-[#FDF5E6]/30 uppercase tracking-[0.3em]">
                <span className="flex items-center gap-3 transition-colors hover:text-[#E5C07B]"><Sparkles className="h-4 w-4 text-[#E5C07B]/40" /> Moderated Flow</span>
                <span className="flex items-center gap-3 transition-colors hover:text-[#E5C07B]"><Lock className="h-4 w-4 text-[#E5C07B]/40" /> Absolute Privacy</span>
                <span className="flex items-center gap-3 transition-colors hover:text-[#E5C07B]"><Heart className="h-4 w-4 text-[#E5C07B]/40" /> Mutual Resonance</span>
              </div>
            </div>
            <Button variant="outline" className="h-12 border-[#E5C07B]/10 bg-[#1A1112]/60 text-[#E5C07B] rounded-xl font-black uppercase tracking-[0.3em] text-[10px] px-8 hover:bg-[#E5C07B]/5 transition-all">Review Manifesto</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="forums" className="w-full relative z-10">
        <TabsList className="bg-[#120A0B]/80 p-2 rounded-[2rem] ring-1 ring-[#E5C07B]/10 h-auto mb-12 w-fit mx-auto md:mx-0 backdrop-blur-md shadow-2xl">
          <TabsTrigger value="forums" className="rounded-2xl px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] data-[state=active]:bg-[#E5C07B] data-[state=active]:text-[#120A0B] data-[state=active]:shadow-[0_0_20px_rgba(229,192,123,0.3)] transition-all">Discussions</TabsTrigger>
          <TabsTrigger value="groups" className="rounded-2xl px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] data-[state=active]:bg-[#E5C07B] data-[state=active]:text-[#120A0B] data-[state=active]:shadow-[0_0_20px_rgba(229,192,123,0.3)] transition-all">Circles</TabsTrigger>
          <TabsTrigger value="chat" className="rounded-2xl px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] data-[state=active]:bg-[#E5C07B] data-[state=active]:text-[#120A0B] data-[state=active]:shadow-[0_0_20px_rgba(229,192,123,0.3)] transition-all">Instant Link</TabsTrigger>
        </TabsList>

        <TabsContent value="forums" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#E5C07B]/30 group-hover:text-[#E5C07B] transition-colors" />
              <Input
                placeholder="Search resonance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-16 bg-[#120A0B]/80 border-[#E5C07B]/10 text-[#FDF5E6] focus:ring-[#E5C07B]/30 rounded-[1.5rem] placeholder:text-[#FDF5E6]/10 text-sm italic shadow-2xl backdrop-blur-md"
              />
            </div>
            <Button className="bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-16 rounded-[1.5rem] px-10 font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl transition-all duration-700 hover:tracking-[0.5em] relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="relative z-10">Initiate Thread</span>
            </Button>
          </div>

          <div className="grid gap-8">
            {forumPosts.map((post) => (
              <Card key={post.id} className="border-0 bg-[#120A0B]/80 ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl group hover:ring-[#E5C07B]/40 hover:bg-[#1A1112] transition-all duration-700 cursor-pointer relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <CardContent className="p-10 relative z-10">
                  <div className="flex gap-10">
                    <Avatar className="h-16 w-16 ring-4 ring-[#E5C07B]/5 shadow-2xl group-hover:ring-[#E5C07B]/30 transition-all duration-700">
                      <AvatarFallback className="bg-[#1A1112] text-[#E5C07B] font-black serif italic text-2xl">{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-[#FDF5E6] serif italic tracking-tight group-hover:text-[#E5C07B] transition-all duration-700">{post.title}</h3>
                          <div className="flex items-center gap-6 text-[10px] font-black text-[#FDF5E6]/10 uppercase tracking-[0.4em]">
                            <span className="text-[#FDF5E6]/30 italic transition-colors group-hover:text-[#E5C07B]/40">{post.author}</span>
                            <span>•</span>
                            <span className="font-mono">{post.timeAgo}</span>
                            <Badge className="bg-[#E5C07B]/5 border border-[#E5C07B]/10 text-[#E5C07B]/60 text-[9px] font-black tracking-[0.3em] px-4 py-1">{post.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-base text-[#FDF5E6]/40 mb-8 italic leading-relaxed font-medium serif group-hover:text-[#FDF5E6]/60 transition-colors">"{post.preview}"</p>
                      <div className="flex items-center gap-10 border-t border-white/5 pt-8">
                        <div className="flex items-center gap-3 text-[10px] font-black text-[#FDF5E6]/10 uppercase tracking-[0.4em] group-hover:text-[#E5C07B]/40 transition-colors">
                          <Heart className="h-4 w-4 text-[#E5C07B]/20" />
                          <span>{post.likes} Resonance</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-black text-[#FDF5E6]/10 uppercase tracking-[0.4em] group-hover:text-[#E5C07B]/40 transition-colors">
                          <MessageSquare className="h-4 w-4 text-[#E5C07B]/20" />
                          <span>{post.replies} Echoes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="grid md:grid-cols-2 gap-10">
            {supportGroups.map((group) => (
              <Card key={group.id} className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl hover:ring-[#E5C07B]/30 transition-all duration-700 relative group">
                <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                <CardContent className="p-10 relative z-10">
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-[1.5rem] bg-[#1A1112] flex items-center justify-center ring-1 ring-[#E5C07B]/20 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                        <Users className="h-7 w-7 text-[#E5C07B] drop-shadow-[0_0_10px_#E5C07B]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-[#FDF5E6] serif italic tracking-tight group-hover:text-[#E5C07B] transition-colors">{group.name}</h3>
                        <div className="flex items-center gap-3 text-[10px] font-black text-[#FDF5E6]/10 uppercase tracking-[0.4em]">
                          <Users className="h-4 w-4 text-[#E5C07B]/20" />
                          <span>{group.members} Souls Sequenced</span>
                        </div>
                      </div>
                    </div>
                    {group.isPrivate && (
                      <Badge className="bg-transparent border border-red-500/20 text-red-500/40 text-[9px] font-black tracking-[0.2em]">
                        RESTRICTED
                      </Badge>
                    )}
                  </div>

                  <p className="text-base text-[#FDF5E6]/40 mb-10 italic leading-relaxed font-medium serif group-hover:text-[#FDF5E6]/60 transition-colors">"{group.description}"</p>

                  <div className="flex items-center gap-4 py-6 border-t border-white/5 mb-10 group-hover:border-[#E5C07B]/10 transition-colors">
                    <Calendar className="h-4.5 w-4.5 text-[#E5C07B]/30" />
                    <span className="text-[11px] font-black text-[#E5C07B]/60 uppercase tracking-[0.3em] font-mono italic">Next ritual: {group.nextMeeting}</span>
                  </div>

                  <div className="flex gap-6">
                    <Button className="flex-1 bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-14 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl relative overflow-hidden group/btn transition-all duration-700 hover:tracking-[0.5em]">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
                      <span className="relative z-10">Join Circle</span>
                    </Button>
                    <Button variant="outline" size="icon" className="h-14 w-14 border-[#E5C07B]/10 hover:bg-[#E5C07B]/5 text-[#E5C07B] rounded-2xl ring-1 ring-white/5 shadow-2xl transition-all">
                      <TrendingUp className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {!activeChat ? (
            <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[3rem] overflow-hidden shadow-4xl relative group">
              <div className="absolute top-0 right-0 p-20 opacity-[0.05] rotate-12 select-none pointer-events-none group-hover:rotate-45 transition-transform duration-[3000ms]">
                <Globe className="h-[400px] w-[400px] text-[#E5C07B]" />
              </div>
              <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

              <CardContent className="p-24 text-center relative z-10">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-[2rem] bg-[#1A1112] mb-12 ring-2 ring-[#E5C07B]/20 shadow-4xl group-hover:scale-110 transition-transform duration-1000">
                  <MessageCircle className="h-12 w-12 text-[#E5C07B] drop-shadow-[0_0_15px_#E5C07B]" />
                </div>
                <h3 className="text-5xl font-bold text-[#FDF5E6] serif italic tracking-tighter mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">Instant Resonance</h3>
                <p className="text-xl text-[#FDF5E6]/40 mb-16 max-w-2xl mx-auto italic leading-relaxed font-medium serif">
                  Establish a fleeting connection with a fellow seeker. All linkings are ephemeral and moderated for spectral integrity and absolute sanctuary protocols.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 justify-center">
                  <Button
                    className="bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-20 px-16 rounded-[2rem] font-black uppercase tracking-[0.5em] text-[11px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000 hover:tracking-[0.6em] relative overflow-hidden group/btn"
                    onClick={() => setActiveChat(true)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
                    <span className="relative z-10">Initiate Connection</span>
                  </Button>
                  <Button variant="outline" className="border-[#E5C07B]/10 bg-[#1A1112]/60 text-[#E5C07B] hover:bg-[#E5C07B]/5 h-20 px-16 rounded-[2rem] font-black uppercase tracking-[0.5em] text-[11px] shadow-2xl backdrop-blur-md ring-1 ring-white/5 transition-all">
                    Secure Chamber
                  </Button>
                </div>
                <div className="mt-20 grid grid-cols-3 gap-12 max-w-3xl mx-auto border-t border-white/5 pt-16">
                  <div className="space-y-4 group/stat">
                    <div className="text-3xl font-black text-[#E5C07B] serif italic tracking-tighter group-hover:drop-shadow-[0_0_10px_#E5C07B] transition-all">100%</div>
                    <div className="text-[10px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.4em]">Spectral Identity</div>
                  </div>
                  <div className="space-y-4 group/stat">
                    <div className="text-3xl font-black text-[#E5C07B] serif italic tracking-tighter group-hover:drop-shadow-[0_0_10px_#E5C07B] transition-all">Persistent</div>
                    <div className="text-[10px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.4em]">Cycle Integrity</div>
                  </div>
                  <div className="space-y-4 group/stat">
                    <div className="text-3xl font-black text-[#E5C07B] serif italic tracking-tighter group-hover:drop-shadow-[0_0_10px_#E5C07B] transition-all">Sanctified</div>
                    <div className="text-[10px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.4em]">Curated Node</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="flex items-center justify-between p-8 bg-[#120A0B]/80 rounded-[2rem] ring-1 ring-[#E5C07B]/20 shadow-4xl backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <div className="h-3 w-3 bg-[#E5C07B] rounded-full animate-pulse shadow-[0_0_15px_#E5C07B]" />
                  <span className="text-[11px] font-black text-[#E5C07B]/60 uppercase tracking-[0.5em]">Channel Established: Anonymous Seeker Node</span>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setActiveChat(false)}
                  className="text-red-500/40 hover:text-red-500 hover:bg-red-500/5 font-black uppercase tracking-[0.4em] text-[10px] px-6 h-12 rounded-xl border border-red-500/10 transition-all"
                >
                  Sever Resonance
                </Button>
              </div>

              <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[3rem] overflow-hidden shadow-4xl h-[650px] flex flex-col relative">
                <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
                <div className="flex-1 overflow-y-auto p-12 space-y-12 relative z-10 custom-scrollbar">
                  <div className="text-center text-[10px] font-black text-[#FDF5E6]/5 uppercase tracking-[0.6em] py-8 serif italic">
                    Connection Sequenced • Exercise Spectral Grace
                  </div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-6">
                    <Avatar className="h-14 w-14 ring-2 ring-[#E5C07B]/10 shadow-2xl">
                      <AvatarFallback className="bg-[#1A1112] text-[#E5C07B] text-sm font-black italic serif">?</AvatarFallback>
                    </Avatar>
                    <div className="bg-[#1A1112] rounded-[2rem] rounded-tl-none p-8 max-w-[80%] ring-1 ring-white/5 shadow-2xl">
                      <p className="text-lg text-[#FDF5E6]/70 leading-relaxed italic serif">"I've been feeling a lack of resonance in my daily rituals lately. Do you ever feel the silence of the city too deeply?"</p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-10 border-t border-white/5 bg-[#1A1112]/40 backdrop-blur-md flex gap-6 relative z-10">
                  <Input placeholder="Compose resonance..." className="flex-1 h-16 bg-[#120A0B] border-white/5 text-[#FDF5E6] focus:ring-[#E5C07B]/20 rounded-2xl italic text-base px-8 shadow-inner placeholder:text-[#FDF5E6]/5" />
                  <Button className="bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-16 w-16 rounded-2xl shadow-[0_10px_30px_rgba(229,192,123,0.3)] transition-all duration-500 hover:scale-110 active:scale-90 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Send className="h-6 w-6 relative z-10" />
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
