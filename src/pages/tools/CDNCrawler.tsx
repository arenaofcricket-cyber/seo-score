import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Zap, Loader2, Search, CheckCircle2, AlertCircle, 
  Image as ImageIcon, FileCode, Cpu, ArrowRight, Activity, 
  ExternalLink, BarChart3, Cloud, Server, ShieldCheck
} from 'lucide-react';
import { getCDNAudit } from '../../services/geminiService';

const CDNCrawler = () => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState(0);
  const [result, setResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const loadingSteps = [
    "Locating edge nodes...",
    "Crawling static assets...",
    "Verifying X-Cache headers...",
    "Detecting CDN signatures...",
    "Mapping resource distributions...",
    "Finalizing performance report..."
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
    }, 700);

    try {
      const data = await getCDNAudit(url);
      setLoadingStep(loadingSteps.length - 1);
      await new Promise(r => setTimeout(r, 500));
      setResult(data);
    } catch (err) {
      setError("Analysis failed. Could not verify asset origins for this domain.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-brand-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-300 pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
              <Cloud size={14} className="text-brand-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-500">Global Edge Network</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter leading-[0.9]">
              CDN Usage <span className="text-brand-500">Test.</span>
            </h1>
            <p className="text-lg text-slate-500 mt-6 leading-relaxed">
              Verify if your images, CSS, and JavaScript are served via a CDN. 
              Reduce latency by serving content closer to your users.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl text-right">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Latency Reduction</p>
                <div className="flex items-center gap-2 justify-end">
                   <Activity size={18} className="text-brand-500" />
                   <span className="text-2xl font-black text-white italic">~120ms faster</span>
                </div>
             </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <form 
            onSubmit={handleAudit}
            className="group relative bg-zinc-900 border border-white/5 rounded-[2rem] p-3 md:p-4 flex flex-col md:flex-row gap-4 focus-within:border-brand-500/50 transition-all shadow-2xl"
          >
            <div className="flex-grow flex items-center bg-zinc-950/50 rounded-2xl px-6">
              <Globe className="text-slate-600 group-focus-within:text-brand-500 transition-colors" size={20} />
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yoursite.com"
                className="w-full bg-transparent border-none py-5 px-4 text-white font-medium outline-none placeholder:text-slate-700"
              />
            </div>
            <button 
              disabled={loading || !url}
              className="bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-black font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-brand-500/20 whitespace-nowrap"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              {loading ? 'Analyzing Origins' : 'Test CDN Usage'}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
               <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 bg-brand-500/10 blur-2xl animate-pulse rounded-full" />
                  <div className="relative w-full h-full border border-white/5 rounded-full flex items-center justify-center">
                     <Cloud size={40} className="text-brand-500 animate-bounce" />
                  </div>
               </div>
               <p className="text-sm font-black uppercase tracking-widest text-slate-500 italic animate-pulse">
                 {loadingSteps[loadingStep]}
               </p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Scorecard Hero */}
              <div className={`p-10 rounded-[3rem] border transition-all ${
                result.overallScore >= 80 ? 'bg-emerald-500/5 border-emerald-500/20' : 
                result.overallScore >= 60 ? 'bg-brand-500/5 border-brand-500/20' : 
                'bg-red-500/5 border-red-500/20'
              }`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                   <div className="flex items-center gap-8">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                         <svg className="w-full h-full -rotate-90">
                            <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-zinc-950" />
                            <motion.circle 
                               cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="10" 
                               className={getProgressColor(result.overallScore)}
                               strokeDasharray={364}
                               initial={{ strokeDashoffset: 364 }}
                               animate={{ strokeDashoffset: 364 - (364 * result.overallScore) / 100 }}
                               transition={{ duration: 1.5, ease: "easeOut" }}
                               strokeLinecap="round"
                            />
                         </svg>
                         <span className="absolute text-4xl font-black text-white italic tracking-tighter">{result.overallScore}</span>
                      </div>
                      <div>
                         <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                           {result.cdnFound ? 'CDN Detected' : 'No CDN Found'}
                         </h2>
                         <div className="flex flex-wrap gap-2">
                            {result.detectedCDNs.map((cdn: string) => (
                              <span key={cdn} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase text-white tracking-widest">
                                {cdn}
                              </span>
                            ))}
                            {result.detectedCDNs.length === 0 && (
                              <span className="text-slate-500 text-sm font-bold italic">Static assets served from origin server.</span>
                            )}
                         </div>
                      </div>
                   </div>
                   <div className="w-full md:w-auto flex flex-col gap-4">
                      <div className="p-6 bg-zinc-900/50 rounded-2xl border border-white/5 space-y-4 min-w-[240px]">
                         {Object.entries(result.resourceBreakdown).map(([key, val]: [string, any]) => (
                           <div key={key} className="space-y-1.5">
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                 <span>{key}</span>
                                 <span className="text-white">{val.onCDN}/{val.total}</span>
                              </div>
                              <div className="h-1 bg-zinc-950 rounded-full overflow-hidden">
                                 <div className="h-full bg-brand-500" style={{ width: `${(val.onCDN / val.total) * 100}%` }} />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>

              {/* Recommendations & Unoptimized */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 space-y-6">
                   <div className="flex items-center gap-3 px-2">
                      <CheckCircle2 size={18} className="text-brand-500" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-white">Actionable Steps</h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {result.recommendations.map((rec: any, i: number) => (
                        <div key={i} className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] group hover:border-brand-500/20 transition-all">
                           <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-6 ${rec.impact === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-brand-500/10 text-brand-500'}`}>
                              {rec.impact === 'High' ? <Zap size={20} /> : <BarChart3 size={20} />}
                           </div>
                           <h4 className="text-lg font-black text-white italic mb-2 tracking-tight">{rec.title}</h4>
                           <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-tight opacity-60 italic">{rec.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="lg:col-span-12 space-y-6">
                   <div className="flex items-center gap-3 px-2">
                      <AlertCircle size={18} className="text-red-500" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-white">Direct-from-Origin Items</h3>
                   </div>
                   <div className="bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <table className="w-full border-collapse">
                         <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                               <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Resource</th>
                               <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">Type</th>
                               <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Est. Size</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                            {result.unoptimizedResources.map((res: any, i: number) => (
                              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                 <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                       {res.type === 'Image' ? <ImageIcon size={16} className="text-blue-500" /> : 
                                        res.type === 'Script' ? <FileCode size={16} className="text-amber-500" /> : 
                                        <Server size={16} className="text-slate-500" />}
                                       <span className="text-[12px] font-mono text-slate-300 truncate max-w-sm group-hover:text-brand-400 transition-colors">{res.url}</span>
                                    </div>
                                 </td>
                                 <td className="px-8 py-5 text-center">
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-zinc-950 border border-white/5 text-slate-500 uppercase">
                                      {res.type}
                                    </span>
                                 </td>
                                 <td className="px-8 py-5 text-right font-mono text-xs text-slate-500">
                                    {res.size}
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Grid */}
        {!result && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
             {[
               { title: 'Global Reach', desc: 'Serve users from Tokyo to Paris with local edge performance.', icon: Globe },
               { title: 'DDoS Shield', desc: 'Enterprise CDNs absorb attacks before they reach your server.', icon: ShieldCheck },
               { title: 'Auto-Scaling', desc: 'Handle traffic spikes without manual infrastructure tuning.', icon: Activity },
               { title: 'Core Vitals', desc: 'Lower TTFB (Time to First Byte) boosts all performance metrics.', icon: Zap }
             ].map((benefit, i) => (
               <div key={i} className="p-8 bg-zinc-900 border border-white/5 rounded-3xl hover:border-brand-500/20 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-slate-500 group-hover:text-brand-500 mb-6 transition-colors shadow-inner">
                     <benefit.icon size={24} />
                  </div>
                  <h4 className="text-sm font-black text-white italic mb-2">{benefit.title}</h4>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight leading-relaxed">
                    {benefit.desc}
                  </p>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CDNCrawler;
