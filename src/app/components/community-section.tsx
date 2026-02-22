import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
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
  ChevronRight,
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

      {/* Safety Notice - Refined Structural Block */}
      <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-[#E5C07B]/5 flex items-center justify-center flex-shrink-0 ring-1 ring-[#E5C07B]/20">
              <Shield className="h-6 w-6 text-[#E5C07B]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-[#E5C07B] uppercase tracking-[0.2em] mb-3">Sanctuary Protocols</h3>
              <div className="flex flex-wrap gap-4 text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Moderated Flow</span>
                <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Absolute Privacy</span>
                <span className="flex items-center gap-1.5"><Heart className="h-3 w-3" /> Mutual Resonance</span>
              </div>
            </div>
            <Button variant="outline" className="h-11 border-[#E5C07B]/10 bg-[#2D1417]/40 text-[#E5C07B] rounded-xl font-bold uppercase tracking-widest text-[9px] px-6">Review Manifesto</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="forums" className="w-full">
        <TabsList className="bg-[#1A1112] p-1 rounded-2xl ring-1 ring-[#E5C07B]/10 h-auto mb-10 w-fit mx-auto md:mx-0">
          <TabsTrigger value="forums" className="rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-[#E5C07B] data-[state=active]:text-[#1A1112] transition-all">Discussions</TabsTrigger>
          <TabsTrigger value="groups" className="rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-[#E5C07B] data-[state=active]:text-[#1A1112] transition-all">Circles</TabsTrigger>
          <TabsTrigger value="chat" className="rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-[#E5C07B] data-[state=active]:text-[#1A1112] transition-all">Instant Link</TabsTrigger>
        </TabsList>

        <TabsContent value="forums" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E5C07B]/40" />
              <Input
                placeholder="Search resonance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-[#3D181C]/40 border-[#E5C07B]/10 text-[#FDF5E6] focus:ring-[#E5C07B]/20 rounded-2xl placeholder:text-[#FDF5E6]/10 text-sm tracking-tight"
              />
            </div>
            <Button className="bg-[#E5C07B] hover:bg-[#d4b16a] text-[#2D1417] h-14 rounded-2xl px-8 font-black uppercase tracking-[0.2em] text-[10px]">Initiate Thread</Button>
          </div>

          <div className="grid gap-6">
            {forumPosts.map((post) => (
              <Card key={post.id} className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none group hover:ring-[#E5C07B]/30 transition-all cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <Avatar className="h-12 w-12 ring-2 ring-[#E5C07B]/10">
                      <AvatarFallback className="bg-[#2D1417] text-[#E5C07B] font-bold serif text-lg">{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-[#FDF5E6] serif italic tracking-tight group-hover:text-[#E5C07B] transition-colors mb-1">{post.title}</h3>
                          <div className="flex items-center gap-3 text-[9px] font-bold text-[#FDF5E6]/20 uppercase tracking-widest">
                            <span className="text-[#FDF5E6]/40">{post.author}</span>
                            <span>/</span>
                            <span>{post.timeAgo}</span>
                            <Badge className="bg-[#E5C07B]/5 border border-[#E5C07B]/10 text-[#E5C07B] text-[8px] font-bold tracking-widest px-2">{post.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-[#FDF5E6]/50 mb-6 italic leading-relaxed font-medium">"{post.preview}"</p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[9px] font-bold text-[#FDF5E6]/20 uppercase tracking-widest">
                          <Heart className="h-3.5 w-3.5" />
                          <span>{post.likes} Resonance</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-[#FDF5E6]/20 uppercase tracking-widest">
                          <MessageSquare className="h-3.5 w-3.5" />
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

        <TabsContent value="groups" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid md:grid-cols-2 gap-8">
            {supportGroups.map((group) => (
              <Card key={group.id} className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-[#2D1417] flex items-center justify-center ring-1 ring-[#E5C07B]/10">
                        <Users className="h-5 w-5 text-[#E5C07B]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#FDF5E6] serif italic tracking-tight">{group.name}</h3>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-[#FDF5E6]/20 uppercase tracking-widest">
                          <Users className="h-3 w-3" />
                          <span>{group.members} Souls</span>
                        </div>
                      </div>
                    </div>
                    {group.isPrivate && (
                      <Badge className="bg-transparent border border-red-500/20 text-red-500/60 text-[8px] font-bold tracking-widest">
                        PRIVATE
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-[#FDF5E6]/50 mb-8 italic leading-relaxed font-medium">"{group.description}"</p>

                  <div className="flex items-center gap-3 py-4 border-t border-[#E5C07B]/5 mb-8">
                    <Calendar className="h-3.5 w-3.5 text-[#E5C07B]/40" />
                    <span className="text-[10px] font-bold text-[#FDF5E6] uppercase tracking-widest">Next ritual: {group.nextMeeting}</span>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 bg-[#E5C07B] hover:bg-[#d4b16a] text-[#2D1417] h-12 rounded-xl font-black uppercase tracking-[0.2em] text-[9px]">
                      Join Circle
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 border-[#E5C07B]/10 hover:bg-[#E5C07B]/5 text-[#E5C07B] rounded-xl">
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {!activeChat ? (
            <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 select-none pointer-events-none">
                <Globe className="h-64 w-64 text-[#E5C07B]" />
              </div>
              <CardContent className="p-20 text-center relative z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#E5C07B]/5 mb-10 ring-1 ring-[#E5C07B]/20">
                  <MessageCircle className="h-10 w-10 text-[#E5C07B]" />
                </div>
                <h3 className="text-3xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-4">Instant Resonance</h3>
                <p className="text-base text-[#FDF5E6]/40 mb-10 max-w-lg mx-auto italic leading-relaxed font-medium">
                  Establish a fleeting connection with a fellow seeker. All linkings are ephemeral and moderated for spectral integrity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-[#E5C07B] hover:bg-[#d4b16a] text-[#2D1417] h-16 px-10 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px]"
                    onClick={() => setActiveChat(true)}
                  >
                    Initiate Connection
                  </Button>
                  <Button variant="outline" className="border-[#E5C07B]/10 bg-[#2D1417]/40 text-[#E5C07B] hover:bg-[#E5C07B]/5 h-16 px-10 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px]">
                    Secure Chamber
                  </Button>
                </div>
                <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-[#E5C07B]/5 pt-12">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-[#E5C07B] serif italic">100%</div>
                    <div className="text-[9px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em]">Hidden Identity</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-[#E5C07B] serif italic">Persistent</div>
                    <div className="text-[9px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em]">24/7 Availability</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-[#E5C07B] serif italic">Safe</div>
                    <div className="text-[9px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em]">Curated Protocols</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              <div className="flex items-center justify-between p-6 bg-[#2D1417]/40 rounded-2xl ring-1 ring-[#E5C07B]/20">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 bg-[#E5C07B] rounded-full animate-pulse shadow-[0_0_10px_#E5C07B]" />
                  <span className="text-[10px] font-black text-[#FDF5E6] uppercase tracking-[0.3em]">Channel Established: Anonymous Seeker</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveChat(false)}
                  className="text-red-500/60 hover:text-red-500 hover:bg-red-500/5 font-black uppercase tracking-[0.2em] text-[9px]"
                >
                  Sever Link
                </Button>
              </div>

              <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-10 space-y-8">
                  <div className="text-center text-[9px] font-bold text-[#FDF5E6]/10 uppercase tracking-[0.4em] py-4">
                    Connection Sequenced • Exercise Mutual Grace
                  </div>
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10 ring-1 ring-[#E5C07B]/10">
                      <AvatarFallback className="bg-[#1A1112] text-[#E5C07B] text-xs font-bold">?</AvatarFallback>
                    </Avatar>
                    <div className="bg-[#1A1112] rounded-2xl rounded-tl-none p-5 max-w-[80%] ring-1 ring-white/5">
                      <p className="text-sm text-[#FDF5E6]/80 leading-relaxed italic">"I've been feeling a lack of resonance in my daily rituals lately. Do you ever feel the silence of the city too deeply?"</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 border-t border-[#E5C07B]/5 bg-[#2D1417]/20 flex gap-4">
                  <Input placeholder="Compose resonance..." className="flex-1 h-14 bg-[#1A1112] border-white/5 text-[#FDF5E6] focus:ring-[#E5C07B]/20 rounded-xl italic text-sm" />
                  <Button className="bg-[#E5C07B] hover:bg-[#d4b16a] text-[#2D1417] h-14 w-14 rounded-xl shadow-lg">
                    <Send className="h-5 w-5" />
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
