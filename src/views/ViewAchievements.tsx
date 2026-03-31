import { useMemo, useState } from 'react';
import { useStore, i18n } from '../store';
import { TopBar } from '../components/TopBar';

export const ViewAchievements = () => {
  const { plans, language } = useStore();
  const t = i18n[language];
  const [viewDate, setViewDate] = useState(() => new Date());
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Swipe left (next month)
    if (diff > 50) {
      setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }
    // Swipe right (prev month)
    else if (diff < -50) {
      setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }
    setTouchStart(null);
  };

  const calendarData = useMemo(() => {
    const today = new Date();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    // Dynamically calculate days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
    
    const grid: { date: string; dayNum: number; isSlam: boolean; isToday: boolean }[] = [];
    let monthlySlams = 0;
    let currentStreak = 0;

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      // Local time formatting manually handling timezones gracefully
      const d = new Date(year, month, dayNum);
      const mOffset = String(d.getMonth() + 1).padStart(2, '0');
      const dOffset = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${mOffset}-${dOffset}`;
      
      const plan = plans[dateStr];
      const isSlam = plan?.isGrandSlam || false;
      const isToday = year === today.getFullYear() && month === today.getMonth() && dayNum === today.getDate();
      
      if (isSlam) monthlySlams++;
      grid.push({ date: dateStr, dayNum, isSlam, isToday });
    }

    // Calculate streak backwards from today or yesterday
    let streakCounter = 0;
    for (let i = 0; i < 60; i++) { // lookback max 60 days for streak
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const mOffset = String(d.getMonth() + 1).padStart(2, '0');
      const dOffset = String(d.getDate()).padStart(2, '0');
      const dateStr = `${d.getFullYear()}-${mOffset}-${dOffset}`;
      
      const isSlam = plans[dateStr]?.isGrandSlam || false;
      if (isSlam) {
        streakCounter++;
      } else {
        if (i !== 0) break; // if today is false, we can still have a streak from yesterday, so only break if i!=0
      }
    }
    currentStreak = streakCounter;

    // Month name
    const monthNamesEN = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const monthNamesZH = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    const monthName = language === 'zh' ? monthNamesZH[month] : monthNamesEN[month];

    return { grid, firstDay, currentStreak, monthlySlams, monthName, year };
  }, [plans, language, viewDate]);

  const daysEN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysZH = ['日', '一', '二', '三', '四', '五', '六'];
  const displayWeekdays = language === 'zh' ? daysZH : daysEN;

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

        <section className="space-y-6" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex justify-between items-end border-b-2 border-[#1D1D1F]/10 pb-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                className="text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition-colors p-2 -ml-2 font-black"
              >
                &lt;
              </button>
              <h3 className="font-['Inter'] text-xs font-black tracking-widest uppercase text-[#1D1D1F] select-none">
                {calendarData.monthName} {calendarData.year}
              </h3>
              <button 
                onClick={() => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                className="text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition-colors p-2 font-black"
              >
                &gt;
              </button>
            </div>
            {viewDate.getMonth() !== new Date().getMonth() || viewDate.getFullYear() !== new Date().getFullYear() ? (
              <button 
                onClick={() => setViewDate(new Date())}
                className="text-[10px] font-black tracking-widest uppercase text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition-colors"
              >
                TODAY
              </button>
            ) : null}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {/* Weekday Header */}
            {displayWeekdays.map((day, idx) => (
              <div key={`wd-${idx}`} className="text-center font-black text-[10px] text-[#1D1D1F]/30 pb-2">
                {day}
              </div>
            ))}
            
            {/* Empty Offset Days */}
            {Array.from({ length: calendarData.firstDay }).map((_, i) => (
              <div key={`blank-${i}`} className="aspect-square bg-transparent" />
            ))}
            
            {/* Actual Days */}
            {calendarData.grid.map((cell) => (
              <div 
                key={cell.date} 
                className={`aspect-square flex items-center justify-center text-sm font-bold border-2 transition-all
                  ${cell.isSlam 
                    ? 'bg-[#1D1D1F] border-[#1D1D1F] text-[#72FF70] shadow-[4px_4px_0px_#72FF70]' 
                    : cell.isToday 
                      ? 'border-[#1D1D1F] text-[#1D1D1F] bg-[#FFFFFF]' 
                      : 'border-transparent bg-[#1D1D1F]/5 text-[#1D1D1F]/40'}`}
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
