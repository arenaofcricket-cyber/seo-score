import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Loader2, Search, CheckCircle2, AlertCircle, 
  Code, Activity, Info, Layout, Layers, 
  ArrowRight, FileCode, Clock, MousePointer2, Smartphone
} from 'lucide-react';
import { getRenderBlockingAudit } from '../../services/geminiService';

const RenderBlockingAudit = () => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState(0);
  const [result, setResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const loadingSteps = [
    "Analyzing HTML structure...",
    "Crawling external <link> tags...",
    "Evaluating synchronous <script> tags...",
    "Measuring Critical Rendering Path...",
    "Calculating potential FCP savings...",
    "Generating optimization roadmap..."
  ];

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);
    setError(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 2 ? prev + 1 : prev));
    }, 800);

    try {
      const data = await getRenderBlockingAudit(url);
      setLoadingStep(loadingSteps.length - 1);
      await new Promise(r => setTimeout(r, 500));
      setResult(data);
    } catch (err) {
      setError("Analysis failed. Please check the URL and try again.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-300 pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Activity size={14} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Critical Path Analysis</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter leading-[0.9]">
              Eliminate <span className="text-brand-500">Render Blocking.</span>
            </h1>
            <p className="text-lg text-slate-500 mt-6 leading-relaxed">
              Identify scripts and stylesheets preventing your page from rendering. 
              Optimize your First Contentful Paint (FCP) and improve SEO rankings.
            </p>
          </div>
          <div className="hidden md:block text-right">
             <div className="bg-zinc-900 border border-white/5 p-4 rounded-3xl">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Impact Factor</p>
                <div className="flex items-center gap-2">
                   <Clock size={16} className="text-brand-500" />
                   <span className="text-xl font-black text-white italic">FCP -45%</span>
                </div>
             </div>
          </div>
        </div>

        {/* Input */}
        <div className="mb-12">
          <form 
            onSubmit={handleAudit}
            className="group relative bg-zinc-900 border border-white/5 rounded-3xl p-3 md:p-4 flex flex-col md:flex-row gap-4 focus-within:border-brand-500/50 transition-all shadow-2xl"
          >
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              className="flex-grow bg-zinc-950/50 border border-transparent focus:border-white/10 rounded-2xl py-5 px-8 text-white font-medium outline-none transition-all placeholder:text-slate-700"
            />
            <button 
              disabled={loading || !url}
              className="bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-black font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all flex items-center justify-center gap-3 whitespace-nowrap shadow-lg shadow-brand-500/20 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
              {loading ? 'Analyzing Path' : 'Scan Critical Path'}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
               <div className="relative w-20 h-20 mb-8">
                  <div className="absolute inset-0 bg-brand-500/20 blur-xl animate-pulse rounded-full" />
                  <div className="relative w-full h-full border-4 border-zinc-900 rounded-full flex items-center justify-center overflow-hidden">
                     <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-0 w-full bg-brand-500/20"
                     />
                     <Zap size={32} className="text-brand-500 animate-bounce" />
                  </div>
               </div>
               <p className="text-sm font-black uppercase tracking-widest text-slate-500 italic animate-pulse">
                 {loadingSteps[loadingStep]}
               </p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              {/* Scorecard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
                   <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full -rotate-90">
                         <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-zinc-950" />
                         <motion.circle 
                            cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" 
                            className={result.overallScore > 70 ? 'text-brand-500' : 'text-red-500'}
                            strokeDasharray={364}
                            initial={{ strokeDashoffset: 364 }}
                            animate={{ strokeDashoffset: 364 - (364 * result.overallScore) / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            strokeLinecap="round"
                         />
                      </svg>
                      <span className="absolute text-3xl font-black text-white italic tracking-tighter">{result.overallScore}</span>
                   </div>
                   <div>
                      <h2 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Performance Score</h2>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {result.overallScore > 80 
                          ? "Your critical rendering path is highly optimized. Most resources are loaded asynchronously." 
                          : "Synchronous resources are delaying your first Contentful Paint. Users are seeing a white screen for too long."}
                      </p>
                   </div>
                </div>

                <div className="bg-brand-500 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-lg shadow-brand-500/10">
                   <Zap size={32} className="text-black mb-6" />
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-1">Potential Savings</p>
                      <p className="text-4xl font-black text-black italic tracking-tighter">-{result.stats.potentialSavings}</p>
                   </div>
                </div>
              </div>

              {/* Critical Chains */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between px-2">
                     <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Layers size={14} className="text-brand-500" /> Current Blocking Resources
                     </h3>
                     <span className="text-[10px] font-bold text-brand-500 px-3 py-1 bg-brand-500/10 rounded-full border border-brand-500/20">
                        {result.criticalChain.length} Identified
                     </span>
                  </div>

                  <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/5">
                       <div className="col-span-7 text-[10px] font-black uppercase tracking-widest text-slate-500">Resource URL</div>
                       <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Type</div>
                       <div className="col-span-3 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Impact</div>
                    </div>
                    <div className="divide-y divide-white/5">
                       {result.criticalChain.map((item: any, i: number) => (
                         <div key={i} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-white/[0.02] transition-colors">
                            <div className="col-span-7 flex items-center gap-3 min-w-0">
                               <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.type === 'CSS' ? 'bg-blue-500/10 text-blue-500' : 'bg-brand-500/10 text-brand-500'}`}>
                                  <FileCode size={16} />
                               </div>
                               <div className="min-w-0">
                                  <p className="text-[13px] font-bold text-white truncate font-mono">{item.url}</p>
                                  <p className="text-[10px] text-slate-500">{item.size}</p>
                               </div>
                            </div>
                            <div className="col-span-2 text-center">
                               <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${item.type === 'CSS' ? 'bg-blue-500/10 text-blue-500' : 'bg-brand-500/10 text-brand-500'}`}>
                                  {item.type}
                               </span>
                            </div>
                            <div className="col-span-3 text-right">
                               <span className={`text-[10px] font-bold ${item.impact === 'High' ? 'text-red-500' : 'text-amber-500'}`}>
                                  {item.impact} Impact
                               </span>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 px-2">Optimization Steps</h3>
                   <div className="space-y-4">
                      {result.recommendations.map((rec: any, i: number) => (
                        <div key={i} className="p-6 bg-zinc-900 border border-white/5 rounded-3xl relative group overflow-hidden">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 blur-2xl group-hover:bg-brand-500/10 transition-all" />
                           <div className="flex items-start gap-4 relative z-10">
                              <div className="shrink-0 w-10 h-10 rounded-2xl bg-zinc-950 flex items-center justify-center border border-white/5">
                                 {rec.type === 'defer' ? <Clock size={16} className="text-amber-500" /> : <Layout size={16} className="text-brand-500" />}
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-white mb-1">{rec.title}</h4>
                                 <p className="text-xs text-slate-500 leading-relaxed mb-4">{rec.desc}</p>
                                 <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl">
                                    <code className="text-[10px] text-brand-400 font-mono break-all">{rec.fix}</code>
                                 </div>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Grid */}
        {!result && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
             {[
               { icon: Smartphone, title: 'Mobile First', desc: 'Mobile devices often have slower CPUs. Render-blocking JS hits them hardest.' },
               { icon: Layout, title: 'Visual Stability', desc: 'Eliminating blocking CSS helps prevent layout shifts during font loading.' },
               { icon: Activity, title: 'SEO Rankings', desc: 'Core Web Vitals are a direct ranking signal. FCP under 1.8s is ideal.' }
             ].map((item, i) => (
               <div key={i} className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] group hover:border-brand-500/20 transition-all transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-slate-500 group-hover:text-brand-500 mb-6 transition-colors shadow-inner">
                     <item.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 italic">{item.title}</h3>
                  <p className="text-xs text-slate-600 font-bold uppercase tracking-tight leading-relaxed">
                    {item.desc}
                  </p>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderBlockingAudit;
