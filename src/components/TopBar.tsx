import { User } from 'lucide-react';
import { useStore } from '../store';

export const TopBar = ({ title, extraText }: { title: string; extraText?: string }) => {
  const { user, setIsAuthModalOpen } = useStore();
  
  return (
    <header className="bg-[#F9F9FB] flex justify-between items-center w-full px-6 py-5 sticky top-0 z-40 border-b border-[#1D1D1F]/10 mt-8">
      <div className="flex items-center gap-3">
        <h1 className="font-['Inter'] font-black tracking-tight uppercase text-lg text-[#1D1D1F]">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {extraText && <div className="text-xl font-black tracking-tighter text-[#1D1D1F]">{extraText}</div>}
        <button 
          onClick={() => !user && setIsAuthModalOpen(true)}
          className={`w-10 h-10 flex items-center justify-center border-2 border-[#1D1D1F] rounded-full transition-colors ${user ? 'bg-[#72FF70] text-[#1D1D1F] shadow-[2px_2px_0px_#1D1D1F]' : 'bg-[#FFFFFF] text-[#1D1D1F]/50 hover:bg-[#1D1D1F]/5'}`}
        >
          {user ? <span className="font-black text-xs uppercase">{user.email?.slice(0, 2)}</span> : <User size={18} strokeWidth={3} />}
        </button>
      </div>
    </header>
  );
};
