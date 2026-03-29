import React from 'react';
import { motion } from 'framer-motion';
import { useStore, i18n } from '../store';

export const GrandSlamEffect = () => {
  const { language } = useStore();
  const t = i18n[language];
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-[100] bg-[#72FF70] flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mix-blend-difference text-white"
      >
        <span className="font-['Inter'] text-sm uppercase tracking-[0.5em] font-bold block mb-4">{t.opStatus}</span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">GRAND<br/>SLAM</h1>
        <p className="mt-8 text-xl font-bold uppercase tracking-widest">{t.completed100}</p>
      </motion.div>
    </motion.div>
  );
};
