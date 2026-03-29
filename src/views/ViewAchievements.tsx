import { useMemo } from 'react';
import { useStore, i18n } from '../store';
import { TopBar } from '../components/TopBar';

export const ViewAchievements = () => {
  const { plans, language } = useStore();
  const t = i18n[language];
  
  const calendarData = useMemo(() => {
    const today = new Date();
    const data: { date: string; dayNum: number; isSlam: boolean; isToday: boolean }[] = [];
    let currentStreak = 0;
    let monthlySlams = 0;

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const plan = plans[dateStr];
      const isSlam = plan?.isGrandSlam || false;
      data.push({ date: dateStr, dayNum: d.getDate(), isSlam, isToday: i === 0 });
    }

    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].isSlam) {
        currentStreak++;
      } else {
        if(i !== data.length - 1) break; 
      }
    }
    monthlySlams = data.filter(d => d.isSlam).length;

    return { grid: data, currentStreak, monthlySlams };
  }, [plans]);

  return (
    <div className="pb-32 min-h-screen">
      <TopBar title={t.titleAchievements} />
      <main className="px-6 pt-12 max-w-2xl mx-auto space-y-16">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#FFFFFF] border-2 border-[#1D1D1F] p-6">
            <span className="font-['Inter'] text-[10px] font-black uppercase tracking-widest text-[#1D1D1F]/50 block mb-2">{t.slams30}</span>
            <div className="text-5xl font-black tracking-tighter text-[#1D1D1F]">{calendarData.monthlySlams}</div>
          </div>
          <div className="bg-[#1D1D1F] p-6 text-[#F9F9FB]">
            <span className="font-['Inter'] text-[10px] font-black uppercase tracking-widest text-[#F9F9FB]/50 block mb-2">{t.currentStreak}</span>
            <div className="text-5xl font-black tracking-tighter text-[#72FF70]">{calendarData.currentStreak}</div>
          </div>
        </div>

        <section className="space-y-6">
          <h3 className="font-['Inter'] text-xs font-black tracking-widest uppercase text-[#1D1D1F] border-b-2 border-[#1D1D1F]/10 pb-4">
            {t.heatmap}
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {calendarData.grid.map((cell) => (
              <div 
                key={cell.date} 
                className={`aspect-square flex items-center justify-center text-sm font-bold transition-all
                  ${cell.isSlam ? 'bg-[#1D1D1F] text-[#72FF70] shadow-[4px_4px_0px_#72FF70]' : 'bg-[#1D1D1F]/5 text-[#1D1D1F]/40'}`}
              >
                {cell.dayNum}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
