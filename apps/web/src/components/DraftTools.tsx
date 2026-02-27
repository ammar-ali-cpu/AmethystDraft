import { ClipboardList, Target, TrendingUp, Zap } from 'lucide-react';

const tools = [
  {
    title: 'Custom Cheat Sheets',
    description: 'Exportable rankings tailored to your league settings.',
    icon: ClipboardList,
    color: 'bg-purple-100 text-[#9966CC]'
  },
  {
    title: 'Mock Draft Simulator',
    description: 'Practice against our advanced AI in minutes.',
    icon: Zap,
    color: 'bg-purple-100 text-[#9966CC]'
  },
  {
    title: 'Value Indicators',
    description: 'Find sleepers and busts before your competition does.',
    icon: TrendingUp,
    color: 'bg-purple-100 text-[#9966CC]'
  },
  {
    title: 'Projections Hub',
    description: 'Daily updated stats for every player in the MLB.',
    icon: Target,
    color: 'bg-purple-100 text-[#9966CC]'
  }
];

export function DraftTools() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#6C4675]">Draft Day Weapons</h2>
          <p className="text-gray-600 mt-2">Everything you need to win your league trophy.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="p-8 rounded-2xl border border-purple-50 hover:border-[#9966CC] transition-all group shadow-sm hover:shadow-md">
              <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600 leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
