import { Button } from "@/app/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#D7F0DD]" />
            <span className="text-sm font-medium">Join 100,000+ users on their wellness journey</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6">
            Ready to Start Your Mental Wellness Journey?
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Take the first step towards better mental health. Get 24/7 AI support, connect with therapists, and join a caring community—all for free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-[#D7F0DD] text-gray-900 hover:bg-[#c5e8cd] group px-8"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-8"
            >
              Talk to an Expert
            </Button>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            No credit card required • Free forever • Cancel anytime
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#D7F0DD] mb-2">24/7</div>
            <div className="text-sm text-gray-400">AI Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#FDE5D6] mb-2">1000+</div>
            <div className="text-sm text-gray-400">Licensed Therapists</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#FFF7EC] mb-2">95%</div>
            <div className="text-sm text-gray-400">User Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
