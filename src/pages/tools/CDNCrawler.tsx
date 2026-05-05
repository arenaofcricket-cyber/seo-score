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

  const handleAudit = async (e?: React.FormEvent, directUrl?: string) => {
    if (e) e.preventDefault();
    const targetUrl = directUrl || url;
    if (!targetUrl) return;

    if (directUrl) setUrl(directUrl);

    setLoading(true);
    setResult(null);
    setError(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 2 ? prev + 1 : prev));
    }, 700);

    try {
      const data = await getCDNAudit(targetUrl);
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

  const tryExample = () => {
    const exampleUrl = "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js";
    handleAudit(undefined, exampleUrl);
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-brand-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-300 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
              <Cloud size={14} className="text-brand-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-500">Global Edge Network</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black italic text-white tracking-tighter leading-[0.9]">
              CDN Usage <span className="text-brand-500">Test.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 mt-6 leading-relaxed">
              Verify if your images, CSS, and JavaScript are served via a CDN. 
              Reduce latency by serving content closer to your users.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="bg-zinc-900 border border-white/5 p-6 rounded-3xl text-right">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Latency Reduction</p>
                <div className="flex items-center gap-2 justify-end">
                   <Activity size={18} className="text-brand-500" />
                   <span className="text-2xl font-black text-white italic">
                     {result?.performanceImpact?.estimatedLatencySaved ? `~${result.performanceImpact.estimatedLatencySaved} faster` : '~120ms faster'}
                   </span>
                </div>
             </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <form 
            onSubmit={handleAudit}
            className="group relative bg-zinc-900 border border-white/5 rounded-2xl md:rounded-[2rem] p-2 md:p-4 flex flex-col md:flex-row gap-4 focus-within:border-brand-500/50 transition-all shadow-2xl"
          >
            <div className={`flex-grow flex items-center bg-zinc-950/50 rounded-xl md:rounded-2xl px-4 md:px-6 relative transition-all ${loading ? 'ring-2 ring-brand-500/20' : ''}`}>
              {loading ? (
                <Loader2 className="text-brand-500 animate-spin" size={20} />
              ) : (
                <Globe className="text-slate-600 group-focus-within:text-brand-500 transition-colors" size={20} />
              )}
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yoursite.com"
                disabled={loading}
                className="w-full bg-transparent border-none py-4 md:py-5 px-3 md:px-4 text-white font-medium outline-none placeholder:text-slate-700 text-sm md:text-base disabled:opacity-70"
              />
              {!url && !loading && (
                <button
                  type="button"
                  onClick={tryExample}
                  className="absolute right-2 md:right-4 px-2 md:px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-500 hover:border-brand-500/50 transition-all active:scale-95"
                >
                  Detect CDN
                </button>
              )}
            </div>
            <button 
              disabled={loading || !url}
              className="bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-black font-black uppercase tracking-widest px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-brand-500/20 whitespace-nowrap text-xs md:text-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
              {loading ? 'Analyzing Origins' : 'Test CDN Usage'}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
               <div className="relative w-20 h-20 md:w-24 md:h-24 mb-8">
                  <div className="absolute inset-0 bg-brand-500/10 blur-2xl animate-pulse rounded-full" />
                  <div className="relative w-full h-full border border-white/5 rounded-full flex items-center justify-center">
                     <Cloud size={32} className="text-brand-500 animate-bounce" />
                  </div>
               </div>
               <p className="text-[10px] md:text-sm font-black uppercase tracking-widest text-slate-500 italic animate-pulse px-4 text-center">
                 {loadingSteps[loadingStep]}
               </p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Scorecard Hero */}
              <div className={`p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border transition-all ${
                result.overallScore >= 80 ? 'bg-emerald-500/5 border-emerald-500/20' : 
                result.overallScore >= 60 ? 'bg-brand-500/5 border-brand-500/20' : 
                'bg-red-500/5 border-red-500/20'
              }`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
                   <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shrink-0">
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
                         <span className="absolute text-3xl md:text-4xl font-black text-white italic tracking-tighter">{result.overallScore}</span>
                      </div>
                      <div>
                         <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                           {result.cdnFound ? 'CDN Detected' : 'No CDN Found'}
                         </h2>
                         <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {result.detectedCDNs.map((cdn: string) => (
                              <span key={cdn} className="px-3 py-1 bg-white/10 rounded-full text-[9px] md:text-[10px] font-black uppercase text-white tracking-widest">
                                {cdn}
                              </span>
                            ))}
                            {result.detectedCDNs.length === 0 && (
                              <span className="text-slate-500 text-xs md:text-sm font-bold italic">Static assets served from origin server.</span>
                            )}
                         </div>
                      </div>
                   </div>
                   <div className="w-full md:w-auto flex flex-col gap-4">
                      <div className="p-5 md:p-6 bg-zinc-900/50 rounded-2xl border border-white/5 space-y-4 md:min-w-[240px]">
                         {Object.entries(result.resourceBreakdown).map(([key, val]: [string, any]) => (
                           <div key={key} className="space-y-1.5 text-left">
                              <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">
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

              {/* Performance Impact Metrics */}
              {result.performanceImpact && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl md:rounded-3xl flex items-center justify-between group hover:border-brand-500/20 transition-all">
                    <div className="space-y-1">
                      <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Latency Saved</p>
                      <p className="text-xl md:text-2xl font-black text-white italic tracking-tighter">{result.performanceImpact.estimatedLatencySaved}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                      <Zap size={18} />
                    </div>
                  </div>
                  <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl md:rounded-3xl flex items-center justify-between group hover:border-brand-500/20 transition-all">
                    <div className="space-y-1">
                      <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Bandwidth Saved</p>
                      <p className="text-xl md:text-2xl font-black text-white italic tracking-tighter">{result.performanceImpact.bandwidthSaved}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <BarChart3 size={18} />
                    </div>
                  </div>
                  <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl md:rounded-3xl flex items-center justify-between group hover:border-brand-500/20 transition-all">
                    <div className="space-y-1">
                      <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">TTI Improvement</p>
                      <p className="text-xl md:text-2xl font-black text-white italic tracking-tighter">{result.performanceImpact.ttiImprovement}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Cpu size={18} />
                    </div>
                  </div>
                </div>
              )}

                          {/* Recommendations & Unoptimized */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 space-y-8">
                   <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-brand-500" />
                        <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">Performance Action Plan</h3>
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 flex items-center gap-2">
                        <Activity size={12} className="text-brand-500" />
                        <span>Analysis Result: {result.overallScore < 70 ? 'CRITICAL' : 'OPTIMIZED'}</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {result.recommendations.map((rec: any, i: number) => (
                        <div key={i} className="flex flex-col h-full p-8 bg-zinc-900 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] group hover:border-brand-500/20 transition-all">
                           <div className="flex items-start justify-between mb-8">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${rec.impact === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-brand-500/10 text-brand-500'}`}>
                                {rec.impact === 'High' ? <Zap size={24} /> : <BarChart3 size={24} />}
                             </div>
                             <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${
                               rec.impact === 'High' ? 'bg-red-500/5 text-red-500 border-red-500/20' : 'bg-brand-500/5 text-brand-500 border-brand-500/20'
                             }`}>
                               {rec.impact} Impact
                             </span>
                           </div>
                           
                           <h4 className="text-lg font-black text-white italic mb-3 tracking-tight">{rec.title}</h4>
                           <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">{rec.desc}</p>
                           
                           {rec.steps && rec.steps.length > 0 && (
                             <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                               <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Implementation Steps:</p>
                               <div className="space-y-2">
                                 {rec.steps.map((step: string, j: number) => (
                                   <div key={j} className="flex items-start gap-2 group/step">
                                     <div className="w-1 h-1 rounded-full bg-brand-500 mt-1.5 shrink-0 group-hover/step:scale-150 transition-transform" />
                                     <span className="text-[10px] font-bold text-slate-400 leading-snug">{step}</span>
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}
                        </div>
                      ))}
                   </div>
                </div>

                {/* Technical Implementation Guide */}
                <div className="lg:col-span-12">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.98 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="p-8 md:p-12 bg-gradient-to-br from-brand-500/10 to-transparent border border-brand-500/10 rounded-[3rem] relative overflow-hidden"
                   >
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Cloud size={160} className="text-brand-500" />
                      </div>

                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 mb-6">
                            <Zap size={12} className="text-brand-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-brand-500">Expert Optimization Guide</span>
                          </div>
                          <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter leading-none mb-6">
                            Path to <span className="text-brand-500">Instant Loading.</span>
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed mb-8">
                            Beyond just using a CDN, your configuration determines your ultimate performance. 
                            Follow these enterprise-grade standards to achieve 99th percentile speed.
                          </p>
                          
                          <div className="space-y-4">
                            {[
                              { label: 'Cache-Control', value: 'Set max-age=31536000 for immutable assets.', icon: ShieldCheck },
                              { label: 'Network Protocols', value: 'Force HTTP/3 and TLS 1.3 for minimum handshake latency.', icon: Zap },
                              { label: 'Global Routing', value: 'Enable Anycast IP for faster DNS resolution globally.', icon: Globe }
                            ].map((item, i) => (
                              <div key={i} className="flex gap-4 p-4 bg-zinc-950/50 rounded-2xl border border-white/5 hover:border-brand-500/20 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-brand-500 shrink-0">
                                  <item.icon size={18} />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-white mb-0.5">{item.label}</p>
                                  <p className="text-[11px] text-slate-500 font-bold">{item.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                           <div className="flex items-center gap-3 mb-8">
                             <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                               <Server size={16} />
                             </div>
                             <h4 className="text-sm font-black text-white uppercase tracking-widest">Typical Edge Logic</h4>
                           </div>
                           
                           <div className="space-y-6">
                              <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 font-mono text-[10px] text-brand-400 space-y-1">
                                 <p className="text-slate-500 italic"># Recommended headers for CDN optimization</p>
                                 <p>Header set Cache-Control "public, max-age=31536000, immutable"</p>
                                 <p>Header set X-Content-Type-Options "nosniff"</p>
                                 <p>Header set Timing-Allow-Origin "*"</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-950/30 rounded-xl border border-white/5 text-center">
                                  <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Push Latency</p>
                                  <p className="text-xl font-black text-white italic">~5ms</p>
                                </div>
                                <div className="p-4 bg-zinc-950/30 rounded-xl border border-white/5 text-center">
                                  <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Cold Start</p>
                                  <p className="text-xl font-black text-white italic">~120ms</p>
                                </div>
                              </div>

                              <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-brand-500 transition-all flex items-center justify-center gap-2 group">
                                Learn CDN Best Practices
                                <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </button>
                           </div>
                        </div>
                      </div>
                   </motion.div>
                </div>

                <div className="lg:col-span-12 space-y-6">
                   <div className="flex items-center gap-3 px-2">
                      <AlertCircle size={16} className="text-red-500" />
                      <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">Direct-from-Origin Items</h3>
                   </div>
                   <div className="bg-zinc-900 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl responsive-table">
                      <table className="w-full border-collapse">
                         <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="px-5 md:px-8 py-5 text-left text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Resource</th>
                               <th className="px-5 md:px-8 py-5 text-center text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Type</th>
                               <th className="px-5 md:px-8 py-5 text-right text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Est. Size</th>
                               <th className="px-5 md:px-8 py-5 text-left text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Optimization</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                            {result.unoptimizedResources.map((res: any, i: number) => (
                              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                 <td className="px-5 md:px-8 py-5">
                                    <div className="flex items-center gap-4">
                                       {res.type === 'Image' ? <ImageIcon size={14} className="text-blue-500 shrink-0" /> : 
                                        res.type === 'Script' ? <FileCode size={14} className="text-amber-500 shrink-0" /> : 
                                        <Server size={14} className="text-slate-500 shrink-0" />}
                                       <span className="text-[11px] md:text-[12px] font-mono text-slate-300 truncate max-w-[120px] sm:max-w-xs md:max-w-sm group-hover:text-brand-400 transition-colors">{res.url}</span>
                                    </div>
                                 </td>
                                 <td className="px-5 md:px-8 py-5 text-center">
                                    <span className="text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded-full bg-zinc-950 border border-white/5 text-slate-500 uppercase">
                                      {res.type}
                                    </span>
                                 </td>
                                 <td className="px-5 md:px-8 py-5 text-right font-mono text-[10px] md:text-xs text-slate-500">
                                    {res.size}
                                 </td>
                                 <td className="px-5 md:px-8 py-5">
                                    <div className="flex items-center gap-2">
                                       <ArrowRight size={10} className="text-brand-500 shrink-0" />
                                       <span className="text-[9px] md:text-[10px] font-bold text-slate-400 italic">{res.suggestion}</span>
                                    </div>
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
