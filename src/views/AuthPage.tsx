import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { useStore, i18n } from '../store';
import { supabase } from '../lib/supabase';

export const AuthPage = () => {
  const { language } = useStore();
  const t = i18n[language];
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || t.authError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9F9FB] text-[#1D1D1F] antialiased min-h-screen flex flex-col font-['Inter'] relative selection:bg-[#72FF70] selection:text-[#1D1D1F]">
      <main className="flex-grow flex items-center justify-center px-6 py-12 z-10">
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Branding */}
          <div className="mb-20">
            <h1 className="text-3xl font-black tracking-[0.1em] text-[#000000] uppercase">GRAND SLAM</h1>
            <div className="h-1 w-12 bg-[#000000] mt-2"></div>
          </div>

          {/* Header Section */}
          <section className="mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[#1D1D1F] leading-none uppercase break-words">
              {t.systemAccess}
            </h2>
            <p className="mt-4 text-[#474747] font-medium tracking-wide uppercase text-xs">
              {t.idRequired}
            </p>
          </section>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-8 relative">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#515F74] mb-2">
                    {t.userIdentifier}
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#f3f3f5] border-none border-b border-[#c6c6c6] focus:ring-0 focus:border-[#000000] px-4 py-4 text-[#1D1D1F] placeholder:text-[#c6c6c6] font-medium transition-all duration-150 outline-none" 
                    placeholder={t.emailPlaceholder} 
                    required 
                  />
                </div>

                <div className="group">
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#515F74]">
                      {t.securePhrase}
                    </label>
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#f3f3f5] border-none border-b border-[#c6c6c6] focus:ring-0 focus:border-[#000000] px-4 py-4 text-[#1D1D1F] placeholder:text-[#c6c6c6] font-medium transition-all duration-150 outline-none" 
                    placeholder="••••••••" 
                    required 
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-[#ffdad6] text-[#410002] font-black text-xs uppercase tracking-widest">
                {error}
              </motion.div>
            )}

            <div className="pt-6">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-[#000000] text-[#FFFFFF] font-black uppercase tracking-[0.2em] text-sm hover:bg-[#3b3b3d] active:bg-[#5f5e60] transition-colors duration-150 flex items-center justify-center group disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : (
                  <>
                    {isLogin ? t.authorize : t.createAccount}
                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} strokeWidth={3} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-12 flex flex-col space-y-4">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
              className="inline-block self-start text-xs font-bold uppercase tracking-[0.05em] text-[#1D1D1F] border-b border-[#000000] pb-1 hover:text-[#515F74] transition-all"
            >
              {isLogin ? t.createAccount : t.signIn}
            </button>
            
            <div className="pt-12 grid grid-cols-2 gap-8 items-start">
              <div className="space-y-2">
                <span className="block text-[9px] font-bold text-[#c6c6c6] uppercase tracking-widest">ENCRYPTION</span>
                <p className="text-[10px] text-[#474747] leading-relaxed">
                  AES-256 BIT SYSTEM / ISO 27001 COMPLIANT
                </p>
              </div>
              <div className="space-y-2">
                <span className="block text-[9px] font-bold text-[#c6c6c6] uppercase tracking-widest">STATUS</span>
                <p className="text-[10px] text-[#474747] leading-relaxed">
                  ALL NODES OPERATIONAL / LATENCY: 12MS
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Decorative Structural Element */}
      <div className="fixed left-0 top-0 h-full w-px bg-[#c6c6c6]/20 hidden md:block"></div>
      <div className="fixed left-12 top-0 h-full w-px bg-[#c6c6c6]/10 hidden lg:block"></div>
      
      {/* Background texture simulation */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <img 
          className="w-full h-full object-cover grayscale mix-blend-overlay" 
          alt="texture" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Vgz1Fg4lyXptFuvUgw_qi_7WGGnBTfjksYLxYVtC2TirbWVcApHQdNhd3yXkMzrI4dqmUUbY_Xald_jchzSs_ho9wmvcjey21FK-QuhSHy4L0JZEQK3BVCp6cY3ogWOzpqG6dUMxF2eOaY7LBKt4qo7mKHzGB-czRGvN23YCZktf7rQiioQyyaRyMK8QHWZ8G27xyH-iGlXLIfQYhBDoT5n6BJYS0wwFYhl5zscn0Gv7nx1d4S7ISN_w-aG3TKbQUrw0goTr1JlQ" 
        />
      </div>

    </div>
  );
};
