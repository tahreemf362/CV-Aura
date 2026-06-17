import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, FileText, Award, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 transition-colors duration-300 relative overflow-hidden flex flex-col">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-6 border-b border-slate-200/50 dark:border-neutral-900/40">
        <div className="flex items-center gap-2.5">
          <div className="bg-black text-white dark:bg-white dark:text-black p-2 rounded-2xl shadow-md flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-none">
              CV Aura
            </h1>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">
              SaaS Document Studio
            </span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/login')}
          className="text-xs font-black uppercase tracking-wider px-4 py-2 border border-black/30 hover:border-black dark:border-white/20 dark:hover:border-white rounded-xl transition-all cursor-pointer shadow-sm bg-white dark:bg-neutral-900"
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-16 md:py-24 text-center max-w-5xl mx-auto w-full">
        
        {/* Shimmer Badge */}
        <div className="mb-6 inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Standardizing Visual Portfolios</span>
        </div>

        {/* Hero Title */}
        <h2 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tight text-slate-900 dark:text-white leading-[1.05] max-w-4xl">
          Wanna Create Your Professional{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-slate-500 to-black dark:from-white dark:via-neutral-400 dark:to-white bg-[length:200%_auto] animate-shimmer">
            CV, Resume, Cover Letter & Skill Posters
          </span>{' '}
          At No Cost?
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-slate-500 dark:text-neutral-400 max-w-2xl mt-6 leading-relaxed">
          Create, edit, and synchronize professional documents instantly. Switch layout styles, pick templates, toggle dark mode, and download print-ready PDFs tailored to match recruiters' highest expectations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/signup')}
            className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest bg-black text-white hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100 px-8 py-4 rounded-xl transition-all cursor-pointer shadow-xl shadow-black/10 dark:shadow-white/5 active:scale-[0.98]"
          >
            Sign Up
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Showcase Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-24 w-full">
          {/* Card 1 */}
          <div className="border border-slate-200 dark:border-neutral-900 bg-white/70 dark:bg-neutral-900/30 p-6 rounded-2xl flex flex-col gap-4 text-left backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-800 dark:text-white">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">CV & Resume</h4>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                Choose from Editorial, Minimal Grid, or Architect themes. Input coordinates once and render three styles instantly.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-slate-200 dark:border-neutral-900 bg-white/70 dark:bg-neutral-900/30 p-6 rounded-2xl flex flex-col gap-4 text-left backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-800 dark:text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Cover Letters</h4>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                Draft professional letters synced to sender settings. Available in Formal, Modern, and Chic layouts.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-slate-200 dark:border-neutral-900 bg-white/70 dark:bg-neutral-900/30 p-6 rounded-2xl flex flex-col gap-4 text-left backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-800 dark:text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Skills Posters</h4>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                Render highly colorful, neon-bordered, and warm-toned sunset capability matrices to pitch clients directly.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Checkmarks */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-12 text-xs font-semibold text-slate-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-slate-900 dark:text-white" />
            <span>Real-time Live Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-slate-900 dark:text-white" />
            <span>Google Sign-In</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-slate-900 dark:text-white" />
            <span>High Quality PDF Output</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto py-6 px-6 text-center text-xs text-slate-400 border-t border-slate-200/50 dark:border-neutral-900/40">
        &copy; {new Date().getFullYear()} CV Aura SaaS. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
