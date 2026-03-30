import { useEffect } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

import { useStore } from './store';
import { supabase } from './lib/supabase';
import { BottomNav } from './components/BottomNav';
import { TaskEditorModal } from './components/TaskEditorModal';
import { AuthModal } from './components/AuthModal';
import { GrandSlamEffect } from './components/GrandSlamEffect';

import { ViewSchedule } from './views/ViewSchedule';
import { ViewWeekly } from './views/ViewWeekly';
import { ViewAchievements } from './views/ViewAchievements';
import { ViewSettings } from './views/ViewSettings';

export default function App() {
  const { currentView, showGrandSlamEffect, setUserSession } = useStore();

  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session?.user ?? null, session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session?.user ?? null, session);
    });

    return () => { 
      document.head.removeChild(fontLink); 
      subscription.unsubscribe();
    };
  }, [setUserSession]);

  return (
    <div className="min-h-screen bg-[#F9F9FB] text-[#1D1D1F] font-['Inter'] selection:bg-[#72FF70] selection:text-[#1D1D1F] relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {currentView === 'SCHEDULE' && <ViewSchedule />}
          {currentView === 'WEEKLY' && <ViewWeekly />}
          {currentView === 'ACHIEVEMENTS' && <ViewAchievements />}
          {currentView === 'SETTINGS' && <ViewSettings />}
        </motion.div>
      </AnimatePresence>

      <BottomNav />
      <TaskEditorModal />
      <AuthModal />

      <AnimatePresence>
        {showGrandSlamEffect && <GrandSlamEffect />}
      </AnimatePresence>
    </div>
  );
}