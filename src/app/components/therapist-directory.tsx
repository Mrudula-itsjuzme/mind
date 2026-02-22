import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
  Search,
  MapPin,
  Star,
  Video,
  Phone,
  MessageSquare,
  Award,
  Clock,
  DollarSign,
  Filter,
  ArrowRight,
  ChevronLeft
} from "lucide-react";

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "CBT"],
    rating: 4.9,
    reviews: 127,
    experience: "15 years",
    price: "$120-150",
    availability: "Available today",
    location: "New York, NY",
    isPriority: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Specializing in cognitive behavioral therapy for anxiety and depression.",
    languages: ["English", "Spanish"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Relationships", "Family Therapy", "Trauma"],
    rating: 4.8,
    reviews: 95,
    experience: "12 years",
    price: "$100-130",
    availability: "Available tomorrow",
    location: "Los Angeles, CA",
    isPriority: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    bio: "Helping couples and families build stronger relationships.",
    languages: ["English", "Mandarin"]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Clinical Social Worker",
    specialties: ["Grief", "Trauma", "PTSD"],
    rating: 5.0,
    reviews: 83,
    experience: "10 years",
    price: "$90-120",
    availability: "Available today",
    location: "Chicago, IL",
    isPriority: false,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    bio: "Compassionate support for grief and trauma recovery.",
    languages: ["English"]
  }
];

export function TherapistDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null);

  const filteredTherapists = therapists.filter((therapist) =>
    therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    therapist.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedTherapist) {
    const therapist = therapists.find((t) => t.id === selectedTherapist);
    if (!therapist) return null;

    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <Button
          variant="ghost"
          onClick={() => setSelectedTherapist(null)}
          className="text-[#E5C07B] hover:bg-[#E5C07B]/5 font-black uppercase tracking-[0.4em] text-[10px] pl-0 transition-all hover:pl-2"
        >
          <ChevronLeft className="h-4 w-4 mr-3" /> Back to Archives
        </Button>

        <div className="grid lg:grid-cols-3 gap-12">
          <Card className="lg:col-span-2 border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative">
            <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
            <CardContent className="p-12 relative z-10">
              <div className="flex flex-col md:flex-row gap-10 mb-12 border-b border-[#E5C07B]/5 pb-12">
                <Avatar className="h-40 w-40 ring-4 ring-[#E5C07B]/20 shadow-2xl scale-110 md:scale-100">
                  <AvatarImage src={therapist.image} />
                  <AvatarFallback className="bg-[#1A1112] text-[#E5C07B] text-3xl serif font-black italic">{therapist.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                      <h2 className="text-4xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-3 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">{therapist.name}</h2>
                      <p className="text-[10px] font-black text-[#E5C07B]/60 uppercase tracking-[0.4em] italic">{therapist.title}</p>
                    </div>
                    {therapist.isPriority && (
                      <Badge className="bg-[#E5C07B] text-[#120A0B] border-none font-black px-4 py-1.5 text-[9px] tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(229,192,123,0.3)]">
                        MASTER HEALER
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#1A1112] rounded-2xl ring-1 ring-white/5 shadow-inner">
                      <Star className="h-4 w-4 fill-[#E5C07B] text-[#E5C07B] drop-shadow-[0_0_8px_#E5C07B]" />
                      <span className="text-sm font-black text-[#FDF5E6] serif italic">{therapist.rating}</span>
                      <span className="text-[10px] text-[#FDF5E6]/20 uppercase tracking-[0.3em] font-black">({therapist.reviews})</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black text-[#FDF5E6]/30 uppercase tracking-[0.4em]">
                      <Clock className="h-4 w-4 text-[#E5C07B]/40" />
                      {therapist.experience} Mastery
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="text-[10px] font-black text-[#E5C07B] uppercase tracking-[0.5em] mb-6 opacity-40">Professional Ethos</h3>
                  <p className="text-xl text-[#FDF5E6]/70 leading-relaxed italic font-medium serif tracking-tight">"{therapist.bio}"</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-[10px] font-black text-[#E5C07B] uppercase tracking-[0.5em] mb-6 opacity-40">Specialties</h3>
                    <div className="flex flex-wrap gap-3">
                      {therapist.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-[#E5C07B]/10 text-[#FDF5E6]/40 bg-[#1A1112]/40 px-4 py-1.5 font-black text-[9px] tracking-[0.2em] uppercase hover:bg-[#E5C07B]/5 hover:text-[#E5C07B] transition-colors">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-[#E5C07B] uppercase tracking-[0.5em] mb-6 opacity-40">Live Resonance</h3>
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-[#E5C07B]/5 rounded-2xl ring-1 ring-[#E5C07B]/20 shadow-2xl">
                      <div className="h-2 w-2 bg-[#E5C07B] rounded-full animate-pulse shadow-[0_0_10px_#E5C07B]" />
                      <span className="text-[10px] font-black text-[#E5C07B] uppercase tracking-[0.4em]">{therapist.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-[#E5C07B]/5 grid sm:grid-cols-2 gap-10">
                  <div className="group">
                    <div className="text-[10px] font-black text-[#FDF5E6]/10 uppercase tracking-[0.4em] mb-3 group-hover:text-[#E5C07B]/40 transition-colors">Primary Sanctuary</div>
                    <div className="flex items-center gap-4">
                      <MapPin className="h-5 w-5 text-[#E5C07B]/30" />
                      <span className="text-sm font-black text-[#FDF5E6] serif italic">{therapist.location}</span>
                    </div>
                  </div>
                  <div className="group">
                    <div className="text-[10px] font-black text-[#FDF5E6]/10 uppercase tracking-[0.4em] mb-3 group-hover:text-[#E5C07B]/40 transition-colors">Ritual Allocation</div>
                    <div className="flex items-center gap-4">
                      <DollarSign className="h-5 w-5 text-[#E5C07B]/30" />
                      <span className="text-sm font-black text-[#FDF5E6] serif italic">{therapist.price} / session</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-10">
            <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl relative">
              <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
              <CardContent className="p-10 relative z-10">
                <h3 className="text-[10px] font-black text-[#E5C07B] uppercase tracking-[0.5em] mb-10 text-center opacity-40">Initiate Engagement</h3>
                <div className="space-y-6">
                  <Button className="w-full bg-[#E5C07B] hover:bg-[#d4b16a] text-[#120A0B] h-16 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-700 hover:tracking-[0.5em] shadow-2xl relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Video className="mr-4 h-5 w-5 relative z-10" />
                    <span className="relative z-10">Visual Link</span>
                  </Button>
                  <Button variant="outline" className="w-full border-[#E5C07B]/10 bg-[#1A1112]/60 text-[#E5C07B] hover:bg-[#E5C07B]/5 h-16 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] transition-all ring-1 ring-white/5">
                    <Phone className="mr-4 h-5 w-5" />
                    Auditory Portal
                  </Button>
                  <Button variant="outline" className="w-full border-[#E5C07B]/10 bg-[#1A1112]/60 text-[#E5C07B] hover:bg-[#E5C07B]/5 h-16 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] transition-all ring-1 ring-white/5">
                    <MessageSquare className="mr-4 h-5 w-5" />
                    Textual Exchange
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl">
              <CardContent className="p-10">
                <h3 className="text-[10px] font-black text-[#E5C07B] uppercase tracking-[0.5em] mb-8 opacity-40">Payment Logistics</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-[#1A1112] ring-1 ring-[#E5C07B]/10 shadow-inner">
                    <span className="text-[10px] font-black text-[#FDF5E6]/40 uppercase tracking-[0.3em]">Insurance Support</span>
                    <Badge className="bg-[#E5C07B]/10 text-[#E5C07B] border-none text-[9px] font-black tracking-[0.2em] shadow-[0_0_10px_rgba(229,192,123,0.1)]">ENABLED</Badge>
                  </div>
                  <p className="text-[9px] font-black text-[#FDF5E6]/10 uppercase tracking-[0.3em] leading-relaxed text-center">Accepted: Visa, Master, HSA Sanctuary</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-4">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-2">Directory of <span className="text-[#E5C07B] drop-shadow-[0_0_10px_rgba(229,192,123,0.2)]">Healers</span></h2>
          <p className="text-[10px] font-black text-[#E5C07B]/30 uppercase tracking-[0.5em]">Curated sequence of licensed practitioners</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[#E5C07B]/30 group-hover:text-[#E5C07B] transition-colors" />
            <Input
              placeholder="Search resonance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 w-80 bg-[#120A0B]/80 border-[#E5C07B]/10 text-[#FDF5E6] focus:ring-[#E5C07B]/30 rounded-2xl placeholder:text-[#FDF5E6]/10 italic shadow-2xl backdrop-blur-md"
            />
          </div>
          <Button variant="outline" className="h-14 border-[#E5C07B]/10 bg-[#120A0B]/80 text-[#E5C07B] rounded-2xl hover:bg-[#E5C07B]/5 px-6 backdrop-blur-md">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-2">
        {filteredTherapists.map((therapist) => (
          <Card
            key={therapist.id}
            onClick={() => setSelectedTherapist(therapist.id)}
            className="border-0 bg-[#120A0B] ring-1 ring-[#E5C07B]/10 rounded-[2.5rem] overflow-hidden shadow-3xl group hover:ring-[#E5C07B]/40 hover:bg-[#1A1112] transition-all duration-700 cursor-pointer relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-noise opacity-[0.005] pointer-events-none" />

            <CardContent className="p-10 relative z-10">
              <div className="flex gap-8 mb-10">
                <Avatar className="h-24 w-24 ring-4 ring-[#E5C07B]/10 group-hover:ring-[#E5C07B]/40 transition-all duration-700 shadow-2xl scale-110 group-hover:scale-100">
                  <AvatarImage src={therapist.image} />
                  <AvatarFallback className="bg-[#1A1112] text-[#E5C07B] font-black serif italic">{therapist.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-[#FDF5E6] serif italic tracking-tight group-hover:text-[#E5C07B] transition-all truncate leading-tight">{therapist.name}</h3>
                    <p className="text-[9px] font-black text-[#FDF5E6]/20 uppercase tracking-[0.3em] mt-2 line-clamp-1 italic group-hover:text-[#E5C07B]/40 transition-colors">{therapist.title}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Star className="h-4 w-4 fill-[#E5C07B] text-[#E5C07B] drop-shadow-[0_0_5px_#E5C07B]" />
                    <span className="text-sm font-black text-[#FDF5E6] italic serif">{therapist.rating}</span>
                    <span className="text-[9px] font-black text-[#FDF5E6]/10 uppercase tracking-[0.4em] ml-1">Archive {therapist.reviews}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#FDF5E6]/40 line-clamp-2 mb-10 italic leading-relaxed font-medium serif group-hover:text-[#FDF5E6]/60 transition-colors">"{therapist.bio}"</p>

              <div className="flex flex-wrap gap-2.5 mb-10 min-h-[64px] content-start">
                {therapist.specialties.map((s, i) => (
                  <Badge key={i} variant="outline" className="border-[#E5C07B]/5 bg-[#1A1112]/60 text-[#FDF5E6]/20 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 scale-90 origin-left group-hover:border-[#E5C07B]/20 group-hover:text-[#E5C07B]/40 transition-all">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] border-t border-white/5 pt-8 group-hover:border-[#E5C07B]/10 transition-colors">
                <div className="flex items-center gap-3 text-[#FDF5E6]/10 uppercase font-black tracking-[0.4em] group-hover:text-[#FDF5E6]/30 transition-colors">
                  <MapPin className="h-4 w-4" />
                  {therapist.location.split(',')[0]}
                </div>
                <div className="font-black text-[#E5C07B]/40 text-[11px] uppercase tracking-[0.3em] font-mono group-hover:text-[#E5C07B] group-hover:drop-shadow-[0_0_10px_#E5C07B] transition-all">
                  {therapist.price}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
