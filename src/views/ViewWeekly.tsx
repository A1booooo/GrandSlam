import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { useStore, i18n } from '../store';
import { TopBar } from '../components/TopBar';

export const ViewWeekly = () => {
  const [activeDay, setActiveDay] = useState(1); 
  const { weeklyTemplate, currentDate, syncWeeklyTemplate, setView, setEditingTask, language } = useStore();
  const t = i18n[language];
  
  const daysEN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const daysZH = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const displayDays = language === 'zh' ? daysZH : daysEN;
  const templateTasks = weeklyTemplate.days[activeDay] || [];

  return (
    <div className="pb-32 min-h-screen">
      <TopBar title={t.titleWeekly} />
      
      <main className="px-6 pt-8 max-w-2xl mx-auto space-y-12">
        <section>
          <p className="text-[#1D1D1F]/60 text-sm font-bold leading-relaxed mb-6">
            {t.weeklyDesc}
          </p>
          
          <div className="flex bg-[#1D1D1F]/5 p-1 overflow-x-auto no-scrollbar">
            {displayDays.map((day, idx) => (
              <button 
                key={idx} onClick={() => setActiveDay(idx)}
                className={`flex-1 min-w-[60px] py-4 font-black text-[10px] uppercase tracking-widest transition-colors ${activeDay === idx ? 'bg-[#1D1D1F] text-[#F9F9FB]' : 'text-[#1D1D1F]/60 hover:bg-[#1D1D1F]/10'}`}
              >
                {day}
              </button>
            ))}
          </div>
        </section>

        <button 
          onClick={() => { syncWeeklyTemplate(currentDate); setView('SCHEDULE'); }}
          className="w-full py-5 bg-[#72FF70] text-[#1D1D1F] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:brightness-95 transition-all"
        >
          <Download size={18} strokeWidth={3} /> {t.syncToToday} ({displayDays[new Date(currentDate).getDay()]})
        </button>

        <section className="space-y-4">
          <h3 className="font-['Inter'] text-xs font-black tracking-widest uppercase text-[#1D1D1F]/50 border-b-2 border-[#1D1D1F]/10 pb-4">
            {displayDays[activeDay]} {t.blueprint}
          </h3>
          
          {templateTasks.length === 0 ? (
            <div className="p-8 text-center text-[#1D1D1F]/40 font-bold uppercase tracking-widest text-xs border-2 border-dashed border-[#1D1D1F]/10">
              {t.noOps}
            </div>
          ) : (
            templateTasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => setEditingTask({ context: 'TEMPLATE', day: activeDay, task })}
                className="bg-[#FFFFFF] p-6 border-l-[3px] border-[#1D1D1F] flex justify-between items-start cursor-pointer hover:bg-[#1D1D1F]/5 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-black text-[#1D1D1F]/50 uppercase tracking-widest block mb-1">{task.tags?.[0]}</span>
                  <h4 className="font-black text-lg uppercase tracking-tight text-[#1D1D1F]">{task.name}</h4>
                  <span className="text-xs font-bold text-[#1D1D1F]/60 mt-2 block">{task.startTime} — {task.endTime}</span>
                </div>
              </div>
            ))
          )}
          
          <button 
            onClick={() => setEditingTask({ context: 'TEMPLATE', day: activeDay, task: { id: 'NEW', name: '', startTime: '09:00', endTime: '10:00', status: 'TODO', tags: ['TEMPLATE'] } })}
            className="w-full py-5 border-2 border-[#1D1D1F] text-[#1D1D1F] font-black text-xs uppercase tracking-widest hover:bg-[#1D1D1F] hover:text-[#F9F9FB] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} strokeWidth={3} /> {t.addBlueprint}
          </button>
        </section>
      </main>
    </div>
  );
};
