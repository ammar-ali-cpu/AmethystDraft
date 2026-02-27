import { Hero } from '../components/Hero';
import { DraftTools } from '../components/DraftTools';
import { MockDraftSimulator } from '../components/MockDraftSimulator';
import { Link } from 'react-router';  //might need react-router-dom 
import { Zap, Target, TrendingUp } from 'lucide-react';

export function Home() {
  return (
    <>
      <Hero />
      <MockDraftSimulator />
      <DraftTools />
      
      {/* Quick Links to Key Pages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6C4675] text-center mb-12">Your Complete Draft Arsenal</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link 
              to="/draft-room"
              className="group bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
            >
              <Zap className="w-12 h-12 mb-4 group-hover:animate-pulse" />
              <h3 className="text-2xl font-bold mb-3">Live Draft Room</h3>
              <p className="text-green-50 mb-4">Your command center for draft night with real-time updates and breaking news alerts</p>
              <span className="inline-block px-4 py-2 bg-white/20 rounded-lg font-semibold text-sm">Launch Draft Room →</span>
            </Link>

            <Link 
              to="/sleepers"
              className="group bg-gradient-to-br from-[#9966CC] to-[#6C4675] rounded-2xl p-8 text-white hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
            >
              <Target className="w-12 h-12 mb-4 group-hover:animate-pulse" />
              <h3 className="text-2xl font-bold mb-3">Sleeper Picks</h3>
              <p className="text-purple-100 mb-4">Discover undervalued players with breakout potential to give you the edge</p>
              <span className="inline-block px-4 py-2 bg-white/20 rounded-lg font-semibold text-sm">Find Sleepers →</span>
            </Link>

            <Link 
              to="/mock-draft"
              className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
            >
              <TrendingUp className="w-12 h-12 mb-4 group-hover:animate-pulse" />
              <h3 className="text-2xl font-bold mb-3">Mock Draft</h3>
              <p className="text-blue-50 mb-4">Practice your strategy against AI opponents before the real thing</p>
              <span className="inline-block px-4 py-2 bg-white/20 rounded-lg font-semibold text-sm">Start Mocking →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#6C4675] to-[#9966CC]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to win your league?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join over 50,000 managers who use the Amethyst Draft Kit to dominate their competition every spring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white/60 text-white"
            />
            <button className="bg-white text-[#6C4675] px-8 py-4 rounded-xl font-bold hover:bg-[#C3A6D8] transition-all shadow-xl">
              Get Early Access
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;