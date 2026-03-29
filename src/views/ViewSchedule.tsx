import React from 'react';
import { Download, Check, Plus } from 'lucide-react';
import { useStore, i18n } from '../store';
import { TopBar } from '../components/TopBar';

export const ViewSchedule = () => {
  const { currentDate, plans, toggleTaskStatus, setEditingTask, syncWeeklyTemplate, language } = useStore();
  const t = i18n[language];
  const plan = plans[currentDate] || { tasks: [], isGrandSlam: false };
  const total = plan.tasks.length;
  const completed = plan.tasks.filter(t => t.status === 'COMPLETED').length;
  const progressPercent = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="pb-32 min-h-screen">
      <TopBar title={t.titleSchedule} extraText={currentDate.replace(/-/g, '.')} />
      
      <main className="px-6 pt-12 max-w-2xl mx-auto space-y-16">
        {/* Progress Metrics */}
        <section className="flex flex-col gap-6">
          <div className="space-y-1">
            <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest text-[#1D1D1F]/50">{t.status}</span>
            <h2 className="text-5xl font-black tracking-tighter text-[#1D1D1F] uppercase">
              {plan.isGrandSlam ? t.grandSlam : t.active}
            </h2>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-end mb-2 font-['Inter'] text-xs font-bold uppercase tracking-widest text-[#1D1D1F]">
              <span>{t.completion}</span>
              <span>{completed} / {total}</span>
            </div>
            <div className="w-full h-1 bg-[#1D1D1F]/10 relative">
              <div 
                className={`absolute inset-y-0 left-0 transition-all duration-700 ease-out ${plan.isGrandSlam ? 'bg-[#72FF70]' : 'bg-[#1D1D1F]'}`} 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </section>

        {/* Sync Intent (If Empty) */}
        {total === 0 && (
          <button 
            onClick={() => syncWeeklyTemplate(currentDate)}
            className="w-full p-8 bg-[#1D1D1F] text-[#F9F9FB] flex flex-col items-center justify-center hover:bg-[#1D1D1F]/90 transition-colors"
          >
            <Download size={32} className="mb-4" />
            <span className="font-['Inter'] font-black text-xl uppercase tracking-tight">{t.syncTemplate}</span>
            <span className="font-['Inter'] text-xs tracking-widest uppercase mt-2 opacity-60">{t.pullTemplate}</span>
          </button>
        )}

        {/* Timeline Blade */}
        <div className="relative">
          <div className="absolute left-[3.5rem] top-0 bottom-0 w-[2px] bg-[#1D1D1F]/10 hidden sm:block" />
          
          <div className="space-y-6 relative">
            {plan.tasks.map((task) => {
              const isCompleted = task.status === 'COMPLETED';
              return (
                <div key={task.id} className="group flex items-start gap-4 sm:gap-8 w-full">
                  <div className="w-10 shrink-0 text-right pt-2">
                    <span className={`font-['Inter'] text-xs font-black uppercase tracking-tighter ${isCompleted ? 'text-[#1D1D1F]/30' : 'text-[#1D1D1F]'}`}>
                      {task.startTime}
                    </span>
                  </div>
                  
                  <div 
                    className={`relative grow flex items-start gap-4 p-5 sm:p-6 cursor-pointer transition-all duration-300 border-l-[3px]
                      ${isCompleted ? 'bg-[#1D1D1F]/5 border-[#1D1D1F]/20' : 'bg-[#FFFFFF] border-[#1D1D1F] hover:bg-[#1D1D1F]/5'}`}
                    onClick={() => setEditingTask({ context: 'DAILY', task })}
                  >
                    <button 
                      className="pt-1 shrink-0" 
                      onClick={(e) => { e.stopPropagation(); toggleTaskStatus(currentDate, task.id); }}
                    >
                      {isCompleted ? (
                        <div className="w-6 h-6 bg-[#1D1D1F] flex items-center justify-center">
                          <Check size={16} strokeWidth={4} color="#F9F9FB" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-[#1D1D1F] bg-transparent" />
                      )}
                    </button>
                    
                    <div className="flex flex-col grow min-w-0">
                      <span className="font-['Inter'] text-[10px] font-black text-[#1D1D1F]/50 uppercase tracking-widest mb-1 truncate">
                        {task.tags?.[0] || 'TASK'}
                      </span>
                      <h3 className={`text-lg sm:text-xl font-black truncate transition-all duration-300 ${isCompleted ? 'text-[#1D1D1F]/40 line-through decoration-2' : 'text-[#1D1D1F]'}`}>
                        {task.name}
                      </h3>
                      <p className={`text-sm mt-1 font-bold tracking-tight ${isCompleted ? 'text-[#1D1D1F]/30' : 'text-[#1D1D1F]/60'}`}>
                        {task.startTime} — {task.endTime}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="flex sm:pl-22 pt-6">
              <button 
                onClick={() => setEditingTask({ context: 'DAILY', task: { id: 'NEW', name: '', startTime: '12:00', endTime: '13:00', status: 'TODO', tags: ['NEW'] } })}
                className="w-full sm:w-auto px-8 py-5 bg-[#FFFFFF] border-2 border-dashed border-[#1D1D1F]/30 text-[#1D1D1F] font-black uppercase tracking-widest text-xs hover:border-[#1D1D1F] hover:bg-[#1D1D1F]/5 transition-all flex items-center justify-center gap-3 rounded-none"
              >
                <Plus size={18} strokeWidth={3} /> {t.createManual}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
