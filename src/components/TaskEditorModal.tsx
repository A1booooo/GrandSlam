import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useStore, i18n, type Task } from '../store';

export const TaskEditorModal = () => {
  const { 
    editingTask, setEditingTask, currentDate, language,
    addTask, updateTask, deleteTask,
    addTemplateTask, updateTemplateTask, deleteTemplateTask
  } = useStore();
  
  const [form, setForm] = useState<Task | null>(null);

  // eslint-disable-next-line
  useEffect(() => { 
    if (editingTask?.task) {
      setForm(editingTask.task);
    }
  }, [editingTask]);

  const t = i18n[language];
  const isNew = form?.id === 'NEW';
  const isTemplate = editingTask?.context === 'TEMPLATE';

  const handleSave = () => {
    if (!form) return;
    if (isTemplate) {
      if (isNew) {
        addTemplateTask(editingTask!.day!, form);
      } else {
        updateTemplateTask(editingTask!.day!, form);
      }
    } else {
      if (isNew) {
        addTask(currentDate, form);
      } else {
        updateTask(currentDate, form);
      }
    }
  };

  const handleDelete = () => {
    if (!form) return;
    if (isTemplate) {
      deleteTemplateTask(editingTask!.day!, form.id);
    } else {
      deleteTask(currentDate, form.id);
    }
  };

  return (
    <AnimatePresence>
      {editingTask && form && (
        <motion.div 
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 bg-[#F9F9FB] flex flex-col mt-8"
        >
          <header className="flex justify-between items-center px-6 h-20 bg-[#F9F9FB] border-b-2 border-[#1D1D1F] shrink-0">
            <button onClick={() => setEditingTask(null)} className="font-black uppercase text-xs tracking-widest text-[#1D1D1F]/50 hover:text-[#1D1D1F]">{t.cancel}</button>
            <h1 className="font-black uppercase text-sm tracking-tight text-[#1D1D1F]">{isNew ? t.newTask : t.editTask} {isTemplate && '(Template)'}</h1>
            <button onClick={handleSave} className="font-black uppercase text-xs tracking-widest bg-[#1D1D1F] text-[#F9F9FB] px-6 py-3 hover:bg-[#72FF70] hover:text-[#1D1D1F] transition-colors">
              {t.save}
            </button>
          </header>

          <main className="flex-1 overflow-y-auto pt-10 pb-32 px-6 max-w-2xl mx-auto w-full space-y-12">
            <section className="space-y-2">
              <label className="block text-[10px] font-black tracking-widest uppercase text-[#1D1D1F]/50">{t.taskIdentity}</label>
              <input 
                type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-transparent border-t-0 border-x-0 border-b-[3px] border-[#1D1D1F] text-3xl font-black tracking-tighter py-3 focus:ring-0 focus:outline-none placeholder:text-[#1D1D1F]/20 rounded-none"
                placeholder={t.taskIdentity} autoFocus
              />
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FFFFFF] p-6 border-2 border-[#1D1D1F]">
                <label className="block text-[10px] font-black tracking-widest uppercase text-[#1D1D1F]/50 mb-4">{t.startBlock}</label>
                <input 
                  type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})}
                  className="text-4xl font-black tracking-tighter bg-transparent border-none p-0 focus:ring-0 w-full" 
                />
              </div>
              <div className="bg-[#1D1D1F]/5 p-6 border-2 border-transparent">
                <label className="block text-[10px] font-black tracking-widest uppercase text-[#1D1D1F]/50 mb-4">{t.endBlock}</label>
                <input 
                  type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})}
                  className="text-4xl font-black tracking-tighter bg-transparent border-none p-0 focus:ring-0 w-full" 
                />
              </div>
            </section>

            {!isNew && (
              <section className="pt-12 mt-auto">
                <button 
                  onClick={handleDelete}
                  className="w-full py-6 bg-transparent border-2 border-[#ba1a1a] text-[#ba1a1a] font-black tracking-[0.2em] uppercase text-xs hover:bg-[#ba1a1a] hover:text-white transition-colors flex items-center justify-center gap-3"
                >
                  <Trash2 size={18} strokeWidth={3} /> {t.terminate}
                </button>
              </section>
            )}
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
