import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { AlertCircle, CheckCircle, Lock, Users2 } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-6 border-orange-200 text-orange-700 bg-orange-50">
              Important Information
            </Badge>
            <h2 className="text-3xl sm:text-4xl text-gray-900 mb-6">
              Your Safety & Privacy Matter
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're committed to supporting your mental health journey with transparency and care. Here's what you need to know about our service.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FDE5D6]">
                    <AlertCircle className="w-5 h-5 text-orange-700" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Not a Replacement for Therapy</h4>
                  <p className="text-gray-600 text-sm">
                    Penguin.AI is designed to supplement, not replace, professional mental health care. Our AI provides support and guidance, but for clinical treatment, we always recommend working with licensed therapists.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D7F0DD]">
                    <CheckCircle className="w-5 h-5 text-green-700" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Crisis Support System</h4>
                  <p className="text-gray-600 text-sm">
                    Our red flag system automatically identifies concerning patterns and provides immediate resources, including crisis hotlines and therapist referrals when needed.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f0f8ff]">
                    <Lock className="w-5 h-5 text-blue-700" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Privacy & Security</h4>
                  <p className="text-gray-600 text-sm">
                    All conversations are encrypted end-to-end. We never share your personal information without consent. Full compliance standards apply as we scale.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-[#D7F0DD]/20 to-[#FDE5D6]/20 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-6">
                  <Users2 className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Government-Supported Initiative
                </h3>
                <p className="text-gray-600 mb-6">
                  Penguin.AI is part of a government-funded initiative to improve mental health accessibility through AI and technology. We're committed to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Making mental health support accessible to all</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Reducing barriers to therapy and counseling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Supporting the mental health professional community</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Continuous improvement through research and feedback</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
