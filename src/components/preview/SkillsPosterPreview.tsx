import { useCV } from '../../hooks/useCV';
import { Download } from 'lucide-react';
import { triggerMonetizedPrint } from '../../utils/monetize';


export const SkillsPosterPreview = () => {
  const { skillsPosterData } = useCV();
  const { name, tagline, bio, skills, contactLink, selectedTemplate } = skillsPosterData;

  // Template 0: The Aurora Neon Grid (Deep violet-purple gradient with fuchsia neon borders)
  const renderAuroraNeonGrid = () => {
    return (
      <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 text-white p-5 md:p-12 rounded-3xl shadow-2xl flex flex-col gap-6 font-sans relative overflow-hidden border border-purple-500/20 print:rounded-none print:shadow-none print:border-none print:min-h-screen">
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-400">Consultant Directory</span>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mt-1 leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-fuchsia-300">
            {name || 'Developer Name'}
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mt-2">
            {tagline || 'Tagline / Focus'}
          </p>
        </div>
        
        {bio && (
          <p className="relative z-10 text-sm leading-relaxed text-slate-350">
            {bio}
          </p>
        )}

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {skills.map((skill) => (
            <div 
              key={skill.id} 
              className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-fuchsia-400/50 p-5 rounded-2xl flex flex-col gap-2.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(240,70,250,0.15)] group"
            >
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-black uppercase tracking-wide text-white group-hover:text-fuchsia-300 transition-colors">
                  {skill.name}
                </h4>
                <span className="text-[9px] font-black uppercase tracking-widest bg-fuchsia-500/25 text-fuchsia-300 border border-fuchsia-500/30 px-2 py-0.5 rounded">
                  {skill.proficiency}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {contactLink && (
          <div className="relative z-10 mt-4 pt-4 border-t border-white/10 text-xs font-bold uppercase tracking-wider text-center text-slate-400">
            {contactLink}
          </div>
        )}
      </div>
    );
  };

  // Template 1: The Cyberpunk Pitch (Dark zinc layout with electric cyan/lime gradient accents)
  const renderCyberpunkPitch = () => {
    return (
      <div className="bg-zinc-950 text-slate-100 p-5 md:p-12 rounded-3xl shadow-2xl flex flex-col gap-6 font-sans border border-zinc-800 relative print:rounded-none print:shadow-none print:border-none print:min-h-screen">
        <div className="absolute top-4 right-14 flex items-center gap-1.5 print:hidden">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-[8px] font-black tracking-widest text-lime-400 uppercase">System Active</span>
        </div>

        <div className="border-l-4 border-lime-400 pl-4 py-1.5">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
            {name || 'Developer Name'}
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mt-1">
            {tagline || 'Tagline / Focus'}
          </p>
        </div>

        {bio && (
          <p className="text-xs leading-relaxed text-slate-400 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
            <span className="text-lime-400 font-bold block mb-1 uppercase tracking-wider text-[9px]">// Mission statement</span>
            {bio}
          </p>
        )}

        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Core Capabilities</h3>
          <div className="flex flex-col gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 border border-zinc-900 bg-zinc-900/30 p-4 rounded-xl hover:border-cyan-500/30 transition-all duration-300">
                <div className="md:w-1/3 shrink-0">
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    {skill.name}
                  </h4>
                  <span className="inline-block text-[8px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 px-1.5 py-0.5 rounded mt-1 uppercase tracking-widest">
                    {skill.proficiency}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed md:w-2/3">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {contactLink && (
          <div className="mt-4 pt-4 border-t border-zinc-900 text-[9px] font-bold text-center text-zinc-650 uppercase tracking-widest">
            {contactLink}
          </div>
        )}
      </div>
    );
  };

  // Template 2: Sunset Minimalist (Vibrant orange-pink sunset gradient backdrop)
  const renderSunsetMinimalist = () => {
    return (
      <div className="bg-gradient-to-br from-amber-500 via-rose-500 to-violet-650 text-white p-5 md:p-12 rounded-3xl shadow-2xl flex flex-col gap-8 font-sans border border-rose-400/20 relative print:rounded-none print:shadow-none print:border-none print:min-h-screen">
        <div className="text-center flex flex-col gap-1">
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-200">Creative Technologist</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-1 leading-none text-white drop-shadow-sm">
            {name || 'Developer Name'}
          </h1>
          <div className="h-0.5 w-16 bg-white mx-auto mt-4 opacity-50" />
        </div>

        <div className="text-center italic text-base md:text-lg text-slate-100 max-w-lg mx-auto leading-relaxed my-1 drop-shadow-sm font-serif">
          {tagline || 'Tagline / Focus'}
        </div>

        <div className="flex flex-col gap-6 max-w-xl mx-auto w-full mt-2">
          {skills.map((skill) => (
            <div key={skill.id} className="flex flex-col gap-1 border-b border-white/10 pb-4 last:border-0">
              <div className="flex justify-between items-center gap-2">
                <h4 className="text-sm font-black uppercase tracking-widest text-white">
                  {skill.name}
                </h4>
                <span className="text-[8px] font-black bg-white/20 text-white border border-white/30 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                  {skill.proficiency}
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-1">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {contactLink && (
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-amber-200">
              {contactLink}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="transition-all duration-300 relative group/preview print:p-0">
      {/* Grey Floating Download Button */}
      <button 
        onClick={triggerMonetizedPrint}
        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/90 dark:bg-neutral-900/80 dark:hover:bg-neutral-800/90 text-slate-650 dark:text-neutral-400 backdrop-blur-sm transition-colors cursor-pointer print:hidden flex items-center justify-center shadow-md z-30"
        title="Download PDF"
      >
        <Download className="w-4 h-4" />
      </button>
      {selectedTemplate === 0 && renderAuroraNeonGrid()}
      {selectedTemplate === 1 && renderCyberpunkPitch()}
      {selectedTemplate === 2 && renderSunsetMinimalist()}
    </div>
  );
};

export default SkillsPosterPreview;
