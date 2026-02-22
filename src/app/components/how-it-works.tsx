import { Card, CardContent } from "@/app/components/ui/card";
import { UserPlus, MessageSquare, TrendingUp, Smile } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in minutes and complete a brief wellness assessment to personalize your experience.",
    color: "#D7F0DD"
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Choose Your Support",
    description: "Select from AI therapy options, browse therapists, or join community discussions based on your needs.",
    color: "#FDE5D6"
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Log your moods daily, review session summaries, and visualize your mental health journey over time.",
    color: "#FFF7EC"
  },
  {
    number: "04",
    icon: Smile,
    title: "Thrive Together",
    description: "Connect with supportive communities, get professional referrals when needed, and celebrate your growth.",
    color: "#f0f8ff"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-gradient-to-br from-[#f0f8ff] to-[#FFF7EC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 mb-6">
            <span className="text-sm font-medium text-gray-700">Simple & Effective</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            How this Works
          </h2>
          <p className="text-lg text-gray-600">
            Getting started with your mental wellness journey is easy. Follow these four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gray-300">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
              )}
              <Card className="relative bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <div className="text-4xl font-bold text-gray-200 mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
