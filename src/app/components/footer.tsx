import { Heart, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D7F0DD]">
                <span className="text-xl">🌱</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">MindCare</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Supporting your mental wellness journey with AI-powered tools, professional guidance, and community connection.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-[#D7F0DD] transition-colors">
                <Twitter className="w-4 h-4 text-gray-700" />
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-[#D7F0DD] transition-colors">
                <Facebook className="w-4 h-4 text-gray-700" />
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-[#D7F0DD] transition-colors">
                <Instagram className="w-4 h-4 text-gray-700" />
              </a>
              <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-[#D7F0DD] transition-colors">
                <Linkedin className="w-4 h-4 text-gray-700" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Mood Tracking</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">AI Chatbot</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Therapist Directory</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Crisis Support</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Research</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                support@mindcare.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                1-800-MIND-CARE
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Available nationwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2026 MindCare. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for better mental health</span>
          </div>
        </div>

        <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-xs text-orange-800 text-center">
            <strong>Crisis Support:</strong> If you're experiencing a mental health emergency, please call 988 (Suicide & Crisis Lifeline) or visit your nearest emergency room. MindCare is not a crisis service.
          </p>
        </div>
      </div>
    </footer>
  );
}
