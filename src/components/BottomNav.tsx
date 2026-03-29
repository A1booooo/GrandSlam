import React from 'react';
import { CalendarDays, LayoutTemplate, Calendar, Settings } from 'lucide-react';
import { useStore, i18n, type ViewType } from '../store';

export const BottomNav = () => {
  const { currentView, setView, language } = useStore();
  const t = i18n[language];
  const navItems: { id: ViewType; icon: React.ElementType; label: string }[] = [
    { id: 'SCHEDULE', icon: CalendarDays, label: t.navDaily },
    { id: 'WEEKLY', icon: LayoutTemplate, label: t.navWeekly },
    { id: 'ACHIEVEMENTS', icon: Calendar, label: t.navGrid },
    { id: 'SETTINGS', icon: Settings, label: t.navPWA },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 flex justify-around items-stretch bg-[#F9F9FB]/90 backdrop-blur-md z-40 border-t border-[#1D1D1F]/10">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button 
            key={item.id} onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center h-full w-full transition-colors border-t-2 rounded-none ${isActive ? 'bg-[#1D1D1F] text-[#F9F9FB] border-[#1D1D1F]' : 'text-[#1D1D1F]/50 border-transparent hover:bg-[#1D1D1F]/5'}`}
          >
            <Icon size={20} strokeWidth={isActive ? 3 : 2} className="mb-1" />
            <span className="font-['Inter'] text-[9px] uppercase tracking-widest font-black">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
