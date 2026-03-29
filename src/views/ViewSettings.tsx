import { Globe, Trash2 } from 'lucide-react';
import { useStore, i18n } from '../store';
import { TopBar } from '../components/TopBar';

export const ViewSettings = () => {
  const { language, setLanguage } = useStore();
  const t = i18n[language];
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: boolean }).MSStream;
  const isAndroid = /android/i.test(navigator.userAgent);

  return (
    <div className="pb-32 min-h-screen">
      <TopBar title={t.titleSettings} />
      
      <main className="px-6 pt-12 max-w-2xl mx-auto space-y-12">
        
        {/* Language Switch */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-black text-[#1D1D1F]/50">Locale</span>
            <h2 className="text-3xl font-black tracking-tighter text-[#1D1D1F] uppercase">{t.language}</h2>
          </div>
          <div 
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="bg-[#FFFFFF] p-6 border-2 border-[#1D1D1F] flex items-center justify-between cursor-pointer hover:bg-[#1D1D1F]/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Globe size={24} />
              <span className="font-bold text-sm tracking-widest uppercase">{t.langLabel}</span>
            </div>
            <div className="text-xl font-black">{language === 'en' ? 'EN' : 'ZH'}</div>
          </div>
        </section>

        {/* PWA Install Guide */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="font-['Inter'] uppercase tracking-widest text-[10px] font-black text-[#1D1D1F]/50">{t.install}</span>
            <h2 className="text-3xl font-black tracking-tighter text-[#1D1D1F] uppercase">{t.addWorkspace}</h2>
          </div>
          
          <div className="bg-[#FFFFFF] p-8 border-2 border-[#1D1D1F] space-y-8">
            {isIOS ? (
              <>
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-[#1D1D1F] text-[#F9F9FB] flex items-center justify-center font-black">1</div>
                  <p className="text-[#1D1D1F] font-bold text-sm leading-relaxed mt-2">{t.iosStep1}</p>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-[#1D1D1F] text-[#F9F9FB] flex items-center justify-center font-black">2</div>
                  <p className="text-[#1D1D1F] font-bold text-sm leading-relaxed mt-2">{t.iosStep2}</p>
                </div>
              </>
            ) : isAndroid ? (
              <>
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-[#1D1D1F] text-[#F9F9FB] flex items-center justify-center font-black">1</div>
                  <p className="text-[#1D1D1F] font-bold text-sm leading-relaxed mt-2">{t.androidStep1}</p>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-[#1D1D1F] text-[#F9F9FB] flex items-center justify-center font-black">2</div>
                  <p className="text-[#1D1D1F] font-bold text-sm leading-relaxed mt-2">{t.androidStep2}</p>
                </div>
              </>
            ) : (
              <p className="font-bold text-sm">{t.visitMsg}</p>
            )}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pt-8 border-t-2 border-[#1D1D1F]/10">
          <button 
            onClick={() => { localStorage.removeItem('planner-pwa-storage'); window.location.reload(); }}
            className="w-full p-6 bg-[#1D1D1F]/5 text-[#1D1D1F] font-black uppercase tracking-widest text-xs hover:bg-[#1D1D1F] hover:text-[#ba1a1a] transition-colors flex items-center justify-center gap-3"
          >
            <Trash2 size={18} /> {t.clearStorage}
          </button>
        </section>
      </main>
    </div>
  );
};
