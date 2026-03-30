import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useStore } from '../store';
import { supabase } from '../lib/supabase';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useStore();
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
      setIsAuthModalOpen(false);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div 
          initial={{ y: '100%' }} 
          animate={{ y: 0 }} 
          exit={{ y: '100%' }} 
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-[#F9F9FB] flex flex-col rounded-t-3xl border-t-4 border-x-4 border-[#1D1D1F] h-[85vh] shadow-[0_-8px_0_rgba(29,29,31,1)]"
        >
          <header className="flex justify-between items-center px-6 h-20 border-b-4 border-[#1D1D1F] shrink-0">
            <h1 className="font-black uppercase text-xl tracking-tight text-[#1D1D1F]">
              {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </h1>
            <button 
              onClick={() => setIsAuthModalOpen(false)} 
              className="w-10 h-10 border-4 border-[#1D1D1F] flex items-center justify-center bg-[#FFFFFF] hover:bg-[#1D1D1F] hover:text-[#FFFFFF] transition-colors"
            >
              <X strokeWidth={4} size={20} />
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-6 flex flex-col space-y-8">
            <div className="flex border-4 border-[#1D1D1F] bg-[#FFFFFF] p-1 font-black text-xs tracking-widest uppercase">
              <button 
                onClick={() => { setIsLogin(true); setError(null); }}
                className={`flex-1 py-3 transition-colors ${isLogin ? 'bg-[#1D1D1F] text-[#F9F9FB]' : 'text-[#1D1D1F]/50 hover:bg-[#1D1D1F]/10'}`}
              >
                LOGIN
              </button>
              <button 
                onClick={() => { setIsLogin(false); setError(null); }}
                className={`flex-1 py-3 transition-colors ${!isLogin ? 'bg-[#1D1D1F] text-[#F9F9FB]' : 'text-[#1D1D1F]/50 hover:bg-[#1D1D1F]/10'}`}
              >
                SIGN UP
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
              <div className="space-y-2">
                <label className="block text-[10px] font-black tracking-widest uppercase text-[#1D1D1F]">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#FFFFFF] border-4 border-[#1D1D1F] text-xl font-black py-4 px-4 focus:ring-0 focus:outline-none placeholder:text-[#1D1D1F]/30"
                  placeholder="name@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black tracking-widest uppercase text-[#1D1D1F]">Secret Key</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#FFFFFF] border-4 border-[#1D1D1F] text-xl font-black py-4 px-4 focus:ring-0 focus:outline-none placeholder:text-[#1D1D1F]/30"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-[#1D1D1F] text-[#72FF70] font-black text-xs uppercase tracking-widest border-4 border-[#1D1D1F]">
                  ERROR: {error}
                </div>
              )}

              <div className="mt-auto pt-8 pb-8">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-[#72FF70] border-4 border-[#1D1D1F] text-[#1D1D1F] font-black tracking-[0.2em] uppercase text-sm hover:brightness-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[4px_4px_0px_rgba(29,29,31,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} strokeWidth={3} /> : (isLogin ? 'INITIALIZE SESSION' : 'REGISTER IDENTITY')}
                </button>
              </div>
            </form>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
