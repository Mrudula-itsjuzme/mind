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
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Button
          variant="ghost"
          onClick={() => setSelectedTherapist(null)}
          className="text-[#E5C07B] hover:bg-[#E5C07B]/5 font-bold uppercase tracking-[0.2em] text-[10px] pl-0"
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Back to Archives
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
            <CardContent className="p-10">
              <div className="flex flex-col md:flex-row gap-8 mb-10 border-b border-[#E5C07B]/5 pb-10">
                <Avatar className="h-32 w-32 ring-4 ring-[#E5C07B]/10 shadow-2xl">
                  <AvatarImage src={therapist.image} />
                  <AvatarFallback className="bg-[#2D1417] text-[#E5C07B] text-2xl serif font-bold">{therapist.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-2">{therapist.name}</h2>
                      <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.3em]">{therapist.title}</p>
                    </div>
                    {therapist.isPriority && (
                      <Badge className="bg-[#E5C07B] text-[#1A1112] border-none font-bold px-3 py-1 text-[9px] tracking-widest uppercase shadow-sm">
                        Featured Sequence
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2D1417]/40 rounded-xl ring-1 ring-white/5">
                      <Star className="h-3.5 w-3.5 fill-[#E5C07B] text-[#E5C07B]" />
                      <span className="text-[11px] font-extrabold text-[#FDF5E6] serif">{therapist.rating}</span>
                      <span className="text-[10px] text-[#FDF5E6]/30 uppercase tracking-widest">({therapist.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-widest">
                      <Clock className="h-3.5 w-3.5" />
                      {therapist.experience} Mastery
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-[10px] font-bold text-[#E5C07B] uppercase tracking-[0.3em] mb-4">Professional Ethos</h3>
                  <p className="text-base text-[#FDF5E6]/60 leading-relaxed italic font-medium">"{therapist.bio}"</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-[10px] font-bold text-[#E5C07B] uppercase tracking-[0.3em] mb-4">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {therapist.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-[#E5C07B]/10 text-[#FDF5E6]/60 bg-[#2D1417]/40 px-3 py-1 font-bold text-[9px] tracking-widest uppercase">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#E5C07B] uppercase tracking-[0.3em] mb-4">Availability</h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E5C07B]/5 rounded-xl ring-1 ring-[#E5C07B]/20">
                      <div className="h-1.5 w-1.5 bg-[#E5C07B] rounded-full animate-pulse" />
                      <span className="text-[10px] font-extrabold text-[#E5C07B] uppercase tracking-widest">{therapist.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-[#E5C07B]/5 grid sm:grid-cols-2 gap-8">
                  <div>
                    <div className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em] mb-2">Primary Sanctuary</div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-[#E5C07B]/40" />
                      <span className="text-sm font-bold text-[#FDF5E6] serif">{therapist.location}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em] mb-2">Ritual Allocation</div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-[#E5C07B]/40" />
                      <span className="text-sm font-bold text-[#FDF5E6] serif">{therapist.price} / session</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
              <CardContent className="p-8">
                <h3 className="text-[10px] font-bold text-[#E5C07B] uppercase tracking-[0.3em] mb-6 text-center">Initiate Engagement</h3>
                <div className="space-y-4">
                  <Button className="w-full bg-[#E5C07B] hover:bg-[#d4b16a] text-[#2D1417] h-14 rounded-xl font-extrabold uppercase tracking-[0.2em] text-[10px] transition-all">
                    <Video className="mr-3 h-4 w-4" />
                    Visual Link
                  </Button>
                  <Button variant="outline" className="w-full border-[#E5C07B]/20 bg-[#2D1417]/40 text-[#E5C07B] hover:bg-[#E5C07B]/10 h-14 rounded-xl font-extrabold uppercase tracking-[0.2em] text-[10px] transition-all">
                    <Phone className="mr-3 h-4 w-4" />
                    Auditory Portal
                  </Button>
                  <Button variant="outline" className="w-full border-[#E5C07B]/20 bg-[#2D1417]/40 text-[#E5C07B] hover:bg-[#E5C07B]/10 h-14 rounded-xl font-extrabold uppercase tracking-[0.2em] text-[10px] transition-all">
                    <MessageSquare className="mr-3 h-4 w-4" />
                    Textual Exchange
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none">
              <CardContent className="p-8">
                <h3 className="text-[10px] font-bold text-[#E5C07B] uppercase tracking-[0.3em] mb-6">Payment Logistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#2D1417]/40 ring-1 ring-white/5">
                    <span className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-widest text-shadow-sm">Insurance Support</span>
                    <Badge className="bg-[#E5C07B]/20 text-[#E5C07B] border-none text-[9px] font-bold tracking-widest">ENABLED</Badge>
                  </div>
                  <p className="text-[9px] font-bold text-[#FDF5E6]/20 uppercase tracking-[0.2em] leading-relaxed">Accepted: Visa, Mastercard, HSA/FSA Sanctuary Cards</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h2 className="text-3xl font-bold text-[#FDF5E6] serif italic tracking-tight mb-2">Directory of <span className="text-[#E5C07B]">Healers</span></h2>
          <p className="text-[10px] font-bold text-[#FDF5E6]/40 uppercase tracking-[0.3em]">Curated sequence of licensed practitioners</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E5C07B]/40" />
            <Input
              placeholder="Search resonance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 w-72 bg-[#3D181C]/60 border-[#E5C07B]/10 text-[#FDF5E6] focus:ring-[#E5C07B]/20 rounded-xl placeholder:text-[#FDF5E6]/10 italic"
            />
          </div>
          <Button variant="outline" className="h-11 border-[#E5C07B]/10 bg-[#3D181C]/60 text-[#E5C07B] rounded-xl hover:bg-[#E5C07B]/5">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTherapists.map((therapist) => (
          <Card
            key={therapist.id}
            onClick={() => setSelectedTherapist(therapist.id)}
            className="border-0 bg-[#3D181C] ring-1 ring-[#E5C07B]/10 rounded-2xl overflow-hidden shadow-none group hover:ring-[#E5C07B]/30 hover:bg-[#E5C07B]/5 transition-all cursor-pointer"
          >
            <CardContent className="p-8">
              <div className="flex gap-6 mb-8">
                <Avatar className="h-20 w-20 ring-2 ring-[#E5C07B]/10 group-hover:ring-[#E5C07B]/30 transition-all">
                  <AvatarImage src={therapist.image} />
                  <AvatarFallback className="bg-[#2D1417] text-[#E5C07B] font-bold serif">{therapist.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-[#FDF5E6] serif italic tracking-tight group-hover:text-[#E5C07B] transition-colors">{therapist.name}</h3>
                    <p className="text-[9px] font-bold text-[#FDF5E6]/30 uppercase tracking-[0.2em] mt-1 line-clamp-1">{therapist.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-[#E5C07B] text-[#E5C07B]" />
                    <span className="text-xs font-bold text-[#FDF5E6] italic serif">{therapist.rating}</span>
                    <span className="text-[10px] text-[#FDF5E6]/20 uppercase tracking-widest">/ {therapist.experience}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#FDF5E6]/50 line-clamp-2 mb-8 italic leading-relaxed font-medium">"{therapist.bio}"</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {therapist.specialties.map((s, i) => (
                  <Badge key={i} variant="outline" className="border-[#E5C07B]/5 bg-[#2D1417]/40 text-[#FDF5E6]/40 text-[8px] font-bold uppercase tracking-widest px-2 group-hover:border-[#E5C07B]/10 transition-colors">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs border-t border-[#E5C07B]/5 pt-6 group-hover:border-[#E5C07B]/20 transition-colors">
                <div className="flex items-center gap-2 text-[#FDF5E6]/30 uppercase font-black tracking-widest text-[8px]">
                  <MapPin className="h-3 w-3" />
                  {therapist.location}
                </div>
                <div className="font-bold text-[#E5C07B] text-[10px] uppercase tracking-widest">
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
