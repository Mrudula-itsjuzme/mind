import { Card, CardContent } from "@/app/components/ui/card";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { 
  Calendar, 
  MessageCircle, 
  FileText, 
  Users, 
  Search,
  Sparkles,
  Shield,
  Heart
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Mood Assessment & Tracking",
    description: "Log your daily mood with voice notes, visualize patterns in a calendar view, and share your status with friends—like WhatsApp status or Instagram notes.",
    image: "https://images.unsplash.com/photo-1649298173603-9c95aa950879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29kJTIwdHJhY2tpbmclMjBjYWxlbmRhciUyMHdlbGxiZWluZ3xlbnwxfHx8fDE3NzAxNDY2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#D7F0DD"
  },
  {
    icon: MessageCircle,
    title: "AI Therapy Chatbot",
    description: "Choose from multiple therapy categories and personality types—calm therapist, best friend, dad figure, or silent listener. Get support when you need it most.",
    image: "https://images.unsplash.com/photo-1725798451557-fc60db3eb6a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGNoYXRib3QlMjBzdXBwb3J0JTIwY29udmVyc2F0aW9ufGVufDF8fHx8MTc3MDE0NjY4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#FDE5D6"
  },
  {
    icon: FileText,
    title: "Session Summaries",
    description: "Receive automated summaries after each session including key issues, patterns, triggers, action plans, and self-care recommendations. Red flag system for urgent cases.",
    image: "https://images.unsplash.com/photo-1759216853310-7d315a1fd07d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB0aGVyYXB5JTIwcGVhY2VmdWx8ZW58MXx8fHwxNzcwMTQ2NjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#FFF7EC"
  },
  {
    icon: Search,
    title: "Therapist Directory",
    description: "Browse and search a curated directory of licensed therapists. Filter by specialization, with future options for price and location filtering.",
    image: "https://images.unsplash.com/photo-1758887248912-03a0c34a2f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXBpc3QlMjBjb3Vuc2VsaW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDE0NjY4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#f0f8ff"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with others through anonymous chats, join group therapy meetups, and participate in moderated forums. Build meaningful connections with people who understand.",
    image: "https://images.unsplash.com/photo-1767990375626-fb68b2239490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0JTIwZ3JvdXAlMjBwZW9wbGV8ZW58MXx8fHwxNzcwMTQ2Njg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#D7F0DD"
  }
];

const highlights = [
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get personalized recommendations based on your mood patterns and history"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and secure. Anonymous options available"
  },
  {
    icon: Heart,
    title: "Holistic Wellness",
    description: "Beyond therapy: dietitian, workout planner, and life coach support"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#D7F0DD]/20 px-4 py-2 mb-6">
            <span className="text-sm font-medium text-gray-700">Comprehensive Mental Health Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Everything You Need for Mental Wellness
          </h2>
          <p className="text-lg text-gray-600">
            Our platform combines AI technology, professional support, and community connection to help you on your mental health journey.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl ${
                index % 2 === 0 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
              }`}
              style={{
                backgroundImage: `linear-gradient(to ${index % 2 === 0 ? 'right' : 'left'}, ${feature.color}20, white)`
              }}
            >
              <CardContent className="p-0">
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={`p-8 sm:p-12 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div 
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                      style={{ backgroundColor: feature.color }}
                    >
                      <feature.icon className="w-7 h-7 text-gray-700" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className={`relative h-[300px] lg:h-[400px] ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D7F0DD] mb-4">
                <highlight.icon className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {highlight.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
