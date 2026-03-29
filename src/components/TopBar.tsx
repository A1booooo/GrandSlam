export const TopBar = ({ title, extraText }: { title: string; extraText?: string }) => (
  <header className="bg-[#F9F9FB] flex justify-between items-center w-full px-6 py-5 sticky top-0 z-40 border-b border-[#1D1D1F]/10 mt-5">
    <h1 className="font-['Inter'] font-black tracking-tight uppercase text-lg text-[#1D1D1F]">{title}</h1>
    {extraText && <div className="text-xl font-black tracking-tighter text-[#1D1D1F]">{extraText}</div>}
  </header>
);
