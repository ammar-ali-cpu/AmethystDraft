import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative h-[500px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1556764420-1c5cf1a9bf0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMHN0YWRpdW0lMjBuaWdodCUyMGFjdGlvbnxlbnwxfHx8fDE3NzA5Mzk1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Baseball Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C4675]/90 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Dominate Your <span className="text-[#C3A6D8]">Fantasy Draft</span>
          </h1>
          <p className="text-xl mb-8 text-purple-100">
            The ultimate 2026 fantasy baseball draft kit. Rankings, analysis, and tools powered by the amethyst engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#9966CC] hover:bg-[#8252b0] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all hover:scale-105">
              Get Started Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all">
              View Rankings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}