import { Trophy, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-[#9966CC]" />
              <span className="text-lg font-bold text-white tracking-tight">AMETHYST DRAFT</span>
            </div>
            <p className="text-sm leading-relaxed">
              Precision analytics for the modern fantasy baseball manager. Win your league with Amethyst.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#C3A6D8]">Draft Cheat Sheet</a></li>
              <li><a href="#" className="hover:text-[#C3A6D8]">Stat Projections</a></li>
              <li><a href="#" className="hover:text-[#C3A6D8]">Prospect Hub</a></li>
              <li><a href="#" className="hover:text-[#C3A6D8]">Closer Chart</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#C3A6D8]">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#C3A6D8]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#C3A6D8]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#C3A6D8]">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#9966CC] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#9966CC] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#9966CC] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Amethyst Fantasy Draft Kit. All rights reserved.</p>
          <p className="flex gap-4">
            <span>MLB is not affiliated with Amethyst Draft.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
