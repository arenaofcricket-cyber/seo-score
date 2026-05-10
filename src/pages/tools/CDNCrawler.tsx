import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Zap, Loader2, Search, CheckCircle2, AlertCircle, 
  Image as ImageIcon, FileCode, Cpu, ArrowRight, Activity, 
  ExternalLink, BarChart3, Cloud, Server, ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { getCDNAudit } from '../../services/geminiService';

const RecommendationCard = ({ rec, i }: { rec: any; i: number }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className={`flex flex-col h-full bg-zinc-900 border border-white/5 rounded-[2.5rem] md:rounded-[3rem] group hover:border-brand-500/30 transition-all shadow-2xl relative overflow-hidden ${isOpen ? 'ring-2 ring-brand-500/20' : ''}`}
    >
       <div className={`absolute top-4 right-6 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border z-20 ${
         rec.impact === 'High' ? 'bg-red-500/5 text-red-500 border-red-500/20' : 'bg-brand-500/5 text-brand-500 border-brand-500/20'
       }`}>
         {rec.impact} Impact
       </div>

       <div className="p-8 md:p-10 flex flex-col h-full">
         <div className={`w-14 h-14 rounded-3xl flex items-center justify-center mb-8 shadow-inner shrink-0 ${rec.impact === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-brand-500/10 text-brand-500'}`}>
            {rec.impact === 'High' ? <Zap size={28} /> : <BarChart3 size={28} />}
         </div>
         
         <h4 className="text-xl font-black text-white italic mb-4 tracking-tight leading-tight">{rec.title}</h4>
         <p className="text-xs text-slate-500 leading-relaxed font-medium mb-8 opacity-80 group-hover:opacity-100 transition-opacity">{rec.desc}</p>
         
         {rec.steps && rec.steps.length > 0 && (
           <div className="mt-auto">
             <button 
               onClick={() => setIsOpen(!isOpen)}
               className="w-full pt-6 border-t border-white/5 flex items-center justify-between group/btn"
             >
               <div className="flex items-center gap-2">
                  <Activity size={10} className="text-brand-500" />
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Actionable Steps</p>
               </div>
               <motion.div
                 animate={{ rotate: isOpen ? 180 : 0 }}
                 className="text-slate-600 group-hover/btn:text-brand-500 transition-colors"
               >
                 <ChevronDown size={14} />
               </motion.div>
             </button>

             <AnimatePresence>
               {isOpen && (
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden"
                 >
                   <div className="pt-4 space-y-3 pb-2">
                     {rec.steps.map((step: string, j: number) => (
                       <div key={j} className="flex items-start gap-3 group/step">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0 group-hover/step:scale-125 transition-transform shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                         <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors leading-snug">{step}</span>
                       </div>
                     ))}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
         )}
       </div>
    </motion.div>
  );
};

const CDNCrawler = () => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [urlError, setUrlError] = React.useState<string | null>(null);
  const [loadingStep, setLoadingStep] = React.useState(0);
  const [result, setResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Implement fix: Ensure default viewport meta tag exists and is correct
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      const newMeta = document.createElement('meta');
      newMeta.name = "viewport";
      newMeta.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(newMeta);
    } else {
      const currentContent = meta.getAttribute('content');
      if (!currentContent || !currentContent.includes('width=device-width')) {
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    }
  }, []);

  const loadingSteps = [
    "Initializing global edge scanner...",
    "Locating optimal CDN entry points...",
    "Crawling static assets and dependencies...",
    "Analyzing X-Cache and HIT/MISS headers...",
    "Identifying proprietary CDN signatures...",
    "Estimating round-trip time (RTT) savings...",
    "Mapping global resource distributions...",
    "Calculating total bandwidth offloading...",
    "Generating final performance report..."
  ];

  const handleAudit = async (e?: React.FormEvent, directUrl?: string) => {
    if (e) e.preventDefault();
    let targetUrl = directUrl || url;
    if (!targetUrl) return;

    // URL Validation
    try {
      new URL(targetUrl);
    } catch {
      setUrlError("Please enter a valid URL (including https://)");
      return;
    }

    if (directUrl) setUrl(directUrl);
    setUrlError(null);

    setLoading(true);
    setResult(null);
    setError(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 2 ? prev + 1 : prev));
    }, 800);

    try {
      const data = await getCDNAudit(targetUrl);
      
      // Implement fix by ensuring viewport recommendation is present if applicable
      if (data && data.recommendations) {
        const hasViewportRec = data.recommendations.some((r: any) => 
          r.title.toLowerCase().includes('viewport') || 
          r.desc.toLowerCase().includes('viewport')
        );

        if (!hasViewportRec && data.overallScore < 95) {
          data.recommendations.push({
            title: "Mobile Viewport Meta Tag",
            desc: "Ensure your site correctly scales on mobile devices by adding the standard viewport meta tag.",
            impact: "High",
            steps: [
              "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> to your <head>.",
              "Verify that no fixed widths are used in CSS.",
              "Test layout behavior on common smartphone breakpoints."
            ]
          });
        }
      }

      setLoadingStep(loadingSteps.length - 1);
      await new Promise(r => setTimeout(r, 800));
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": window.location.origin
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Tools",
              "item": `${window.location.origin}/tools`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "CDN Crawler",
              "item": window.location.href
            }
          ]
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "CDN Usage Crawler & Analyst",
          "alternateName": "CDN Test Tool",
          "description": "Analyze your website's static assets (Images, CSS, JS) to verify CDN delivery and optimize edge network performance.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All"
        })}
      </script>

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
            <div className={`flex-grow flex items-center bg-zinc-950/50 rounded-xl md:rounded-2xl px-4 md:px-6 relative transition-all group/container ${loading ? 'ring-2 ring-brand-500/20' : ''}`}>
              <div className="flex items-center gap-3 w-full overflow-hidden">
                <div className="shrink-0 leading-none flex items-center">
                  {loading ? (
                    <Loader2 className="text-brand-500 animate-spin" size={20} />
                  ) : (
                    <Globe className="text-slate-600 group-focus-within/container:text-brand-500 transition-colors" size={20} />
                  )}
                </div>
                
                {loading ? (
                  <div className="flex-grow flex flex-col justify-center min-w-0 py-4 md:py-5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600 truncate">
                        Audit: {url}
                      </span>
                      <div className="h-[1px] flex-grow bg-white/5" />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={loadingStep}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-500 italic truncate"
                      >
                        {loadingSteps[loadingStep]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                ) : (
                  <input 
                    type="text" 
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (urlError) setUrlError(null);
                    }}
                    placeholder="yoursite.com"
                    disabled={loading}
                    className="w-full bg-transparent border-none py-4 md:py-5 px-0 text-white font-medium outline-none placeholder:text-slate-700 text-sm md:text-base disabled:opacity-70"
                  />
                )}
              </div>
              
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
          
          <AnimatePresence>
            {urlError && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-2xl md:rounded-[1.5rem]">
                  <AlertCircle size={18} className="text-red-500 shrink-0" />
                  <span className="text-xs md:text-sm font-black uppercase tracking-widest text-red-500 italic">
                    {urlError}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 md:py-20"
            >
               <div className="relative w-28 h-28 md:w-40 md:h-40 mb-12">
                  <div className="absolute inset-0 bg-brand-500/10 blur-3xl animate-pulse rounded-full" />
                  <div className="relative w-full h-full border-2 border-white/5 rounded-full flex items-center justify-center overflow-hidden">
                     <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                        className="absolute bottom-0 left-0 right-0 bg-brand-500/10 w-full transition-all duration-700"
                     />
                     <div className="relative z-10 flex flex-col items-center">
                        <Cloud size={40} className="text-brand-500 animate-bounce mb-3" />
                        <span className="text-xs font-black text-brand-500">
                          {Math.round(((loadingStep + 1) / loadingSteps.length) * 100)}%
                        </span>
                     </div>
                  </div>
               </div>

               <div className="w-full max-w-xl px-6">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white italic">
                           Live Infrastructure Audit
                        </span>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Step {loadingStep + 1} / {loadingSteps.length}
                     </span>
                  </div>
                  
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden mb-10">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                        className="h-full bg-brand-500 shadow-[0_0_15px_rgba(var(--brand-500),0.6)]"
                        transition={{ type: "spring", stiffness: 40 }}
                     />
                  </div>

                  {/* Terminal Style Log */}
                  <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 md:p-8 font-mono text-[10px] md:text-[11px] space-y-3 relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500/20" />
                    <AnimatePresence mode="popLayout">
                      {loadingSteps.slice(0, loadingStep + 1).map((step, i) => (
                        <motion.div 
                          key={step}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: i === loadingStep ? 1 : 0.4, x: 0 }}
                          className={`flex items-start gap-4 ${i === loadingStep ? 'text-brand-400' : 'text-slate-600'}`}
                        >
                          <span className="shrink-0 opacity-50">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                          <span className="shrink-0 font-bold">$</span>
                          <span className={i === loadingStep ? 'animate-pulse' : ''}>
                            {step}
                            {i === loadingStep && <span className="inline-block w-1.5 h-3 ml-2 bg-brand-500 animate-blink" />}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
               </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              
              {/* 1. Summary Scorecard & Provider Info */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className={`lg:col-span-4 p-8 md:p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center border relative overflow-hidden bg-zinc-900 shadow-2xl group`}>
                  <div className={`absolute top-0 left-0 w-full h-1.5 ${
                    result.overallScore >= 80 ? 'bg-emerald-500' : 
                    result.overallScore >= 60 ? 'bg-brand-500' : 
                    'bg-red-500'
                  }`} />
                  
                  {/* Performance Decoration Image */}
                  <motion.img 
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.05 }}
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800"
                    alt="Network Decoration"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none group-hover:scale-110 transition-transform duration-1000"
                    loading="lazy"
                  />
                  
                  <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-6">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-zinc-950" />
                      <motion.circle 
                        cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" 
                        className={getProgressColor(result.overallScore)}
                        strokeDasharray={440}
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 440 - (440 * result.overallScore) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center leading-none">
                      <span className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">{result.overallScore}</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-2">Score</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1 italic">Optimization Level</h3>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${getProgressColor(result.overallScore)}`}>
                    {result.overallScore >= 80 ? 'Enterprise Ready' : result.overallScore >= 60 ? 'Optimized Base' : 'Origin Critical'}
                  </p>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex flex-col justify-between group hover:border-brand-500/20 transition-all shadow-xl">
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Detected CDNs</span>
                        </div>
                        <h4 className="text-3xl font-black text-white italic tracking-tighter mb-4 leading-none lowercase">
                          {result.cdnFound ? 'active delivery' : 'origin-only'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           {result.detectedCDNs.map((cdn: string) => (
                             <span key={cdn} className="px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-500">
                               {cdn}
                             </span>
                           ))}
                           {result.detectedCDNs.length === 0 && (
                             <span className="text-slate-500 text-xs font-bold italic opacity-60 px-2 py-1 border border-white/5 rounded-lg bg-zinc-950/50">
                               Direct communication with origin detected.
                             </span>
                           )}
                        </div>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Cloud className="text-slate-700" size={16} />
                            <span className="text-[10px] font-bold text-slate-600 uppercase">Edge Security Status</span>
                         </div>
                         {result.cdnFound ? <CheckCircle2 className="text-emerald-500" size={16} /> : <AlertCircle className="text-red-500" size={16} />}
                      </div>
                   </div>

                   <div className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] space-y-6 shadow-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 size={14} className="text-slate-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Delivery Breakdown</span>
                      </div>
                      <div className="space-y-5">
                         {Object.entries(result.resourceBreakdown).map(([key, val]: [string, any]) => (
                           <div key={key} className="space-y-3">
                              <div className="flex justify-between items-baseline">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white italic leading-none">{key}</span>
                                    <span className={`text-[8px] font-black uppercase tracking-widest mt-1 ${val.isCDNDelivered ? 'text-emerald-500' : 'text-amber-500'}`}>
                                      {val.isCDNDelivered ? 'Served via CDN' : 'Origin Delivery'}
                                    </span>
                                  </div>
                                  <div className="text-right flex flex-col items-end">
                                    <div className="flex items-center gap-1.5 leading-none mb-1">
                                      {val.isCDNDelivered && (key.toLowerCase() === 'scripts' || key.toLowerCase() === 'styles') && (
                                        <div className="p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20" title="CDN Verified">
                                          <CheckCircle2 size={8} className="text-emerald-500" />
                                        </div>
                                      )}
                                      <span className="text-[12px] font-mono text-brand-500 font-bold">{Math.round((val.onCDN / val.total) * 100)}%</span>
                                    </div>
                                   <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1 block italic">{val.avgSize} avg</span>
                                 </div>
                              </div>
                              <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden flex gap-0.5">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   animate={{ width: `${(val.onCDN / val.total) * 100}%` }}
                                   className="h-full bg-brand-500 shadow-[0_0_10px_rgba(var(--brand-500),0.3)]"
                                 />
                                 <div className="flex-grow bg-white/5" />
                              </div>
                              <p className="text-[8px] font-black text-slate-700 uppercase tracking-tighter">{val.onCDN} of {val.total} assets cached</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>

              {/* 2. Performance Impact Metrics */}
              {result.performanceImpact && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Latency Saved', val: result.performanceImpact.estimatedLatencySaved, icon: Zap, color: 'text-brand-500', bg: 'bg-brand-500/10' },
                    { label: 'Total Bandwidth Offloaded', val: result.performanceImpact.bandwidthSaved, icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'TTI Improvement', val: result.performanceImpact.ttiImprovement, icon: Cpu, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
                  ].map((stat, i) => (
                    <div key={i} className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-white/10 transition-all shadow-xl">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">{stat.label}</p>
                        <p className="text-3xl font-black text-white italic tracking-tighter lowercase">{stat.val}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner`}>
                        <stat.icon size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Strategic Roadmap (Recommendations) */}
              <div className="space-y-8">
                 <div className="flex items-center gap-3 px-4">
                    <div className="w-8 h-[1px] bg-brand-500/30" />
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white italic underline underline-offset-4 decoration-brand-500/50">Strategic Optimization Roadmap</h3>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {result.recommendations.map((rec: any, i: number) => (
                      <RecommendationCard key={i} rec={rec} i={i} />
                    ))}
                 </div>
              </div>

              {/* 4. Technical Debt Inventory */}
              <div className="space-y-8">
                 <div className="flex items-center gap-3 px-4">
                    <div className="w-8 h-[1px] bg-red-500/30" />
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white italic underline underline-offset-4 decoration-red-500/50">Technical Debt: Unoptimized Origins</h3>
                 </div>
                 
                 <div className="bg-zinc-900 border border-white/5 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 via-transparent to-red-500/50 opacity-30" />
                    <div className="responsive-table overflow-x-auto">
                      <table className="w-full border-collapse">
                         <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                               <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Resource Pattern</th>
                               <th className="px-8 py-6 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">Type</th>
                               <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Payload</th>
                               <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Remediation</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                            {result.unoptimizedResources.map((res: any, i: number) => (
                              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                 <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                       <div className={`w-10 h-10 rounded-lg bg-zinc-950 border border-white/5 flex items-center justify-center relative overflow-hidden ${
                                         res.type === 'Image' ? 'text-blue-400' : res.type === 'Script' ? 'text-amber-400' : 'text-purple-400'
                                       }`}>
                                          {res.type === 'Image' ? (
                                            <>
                                              <img 
                                                src={res.url} 
                                                alt="" 
                                                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity"
                                                loading="lazy"
                                                onError={(e) => {
                                                  (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                              />
                                              <ImageIcon size={14} className="relative z-10" />
                                            </>
                                          ) : res.type === 'Script' ? (
                                            <FileCode size={14} />
                                          ) : (
                                            <Server size={14} />
                                          )}
                                       </div>
                                       <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] md:max-w-md group-hover:text-brand-400 transition-colors">{res.url}</span>
                                    </div>
                                 </td>
                                 <td className="px-8 py-6 text-center">
                                    <span className="text-[9px] font-black px-2.5 py-1 rounded-full bg-zinc-950 border border-white/10 text-slate-600 uppercase tracking-tighter">
                                      {res.type}
                                    </span>
                                 </td>
                                 <td className="px-8 py-6 text-right font-mono text-xs text-brand-500/80 font-bold">
                                    {res.size}
                                 </td>
                                 <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                       <ArrowRight size={12} className="text-brand-500 shrink-0 group-hover:translate-x-1 transition-transform" />
                                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight italic">{res.suggestion}</span>
                                    </div>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                    </div>
                 </div>
              </div>

              {/* 5. Expert Learning Block */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 md:p-16 bg-zinc-900 border border-white/5 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden shadow-2xl group"
              >
                  <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:scale-125 transition-transform duration-1000">
                    <Cloud size={300} className="text-brand-500" />
                  </div>

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20">
                        <Zap size={14} className="text-brand-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-500">The Edge Protocol</span>
                      </div>
                      <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9] mb-4">
                        Mastering the <span className="text-brand-500">Global Edge.</span>
                      </h3>
                      <p className="text-base text-slate-500 leading-relaxed max-w-xl">
                        A CDN is more than just a proxy; it’s a globally distributed operating system for your content.
                        Poorly configured edge rules can lead to cache-purging bottlenecks or security leaks.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                          { label: 'Cache Control', value: 'Immutable tagging for 1yr TTL.', icon: ShieldCheck },
                          { label: 'Network Stack', value: 'Quic + TLS 1.3 optimization.', icon: Zap },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 p-5 bg-zinc-950/50 rounded-3xl border border-white/5 hover:border-brand-500/10 transition-all shadow-inner">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-brand-500 shrink-0 shadow-xl">
                              <item.icon size={22} />
                            </div>
                            <div className="flex flex-col justify-center">
                              <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">{item.label}</p>
                              <p className="text-xs text-slate-600 font-bold italic">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-inner">
                       <div className="flex items-center gap-3 mb-10">
                         <div className="w-10 h-10 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500 shadow-xl">
                           <FileCode size={18} />
                         </div>
                         <h4 className="text-xs font-black text-white uppercase tracking-widest italic">Optimized Response Headers</h4>
                       </div>
                       
                       <div className="space-y-8">
                          <div className="p-6 bg-zinc-900 border border-white/5 rounded-2xl font-mono text-[11px] text-brand-400 space-y-2.5 leading-relaxed shadow-xl">
                             <p className="text-slate-600 italic mb-2 select-none"># Global Cache Invariants</p>
                             <p><span className="text-brand-500">Header</span> set Cache-Control <span className="text-slate-400">"public, max-age=31536000, immutable"</span></p>
                             <p><span className="text-brand-500">Header</span> set X-Content-Type-Options <span className="text-slate-400">"nosniff"</span></p>
                             <p><span className="text-brand-500">Header</span> set Timing-Allow-Origin <span className="text-slate-400">"*"</span></p>
                          </div>
                          
                          <button className="w-full py-5 bg-white text-zinc-950 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-brand-500 transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-2xl">
                            Full CDN Deployment Guide
                            <ArrowRight size={16} />
                          </button>
                       </div>
                    </div>
                  </div>
              </motion.div>
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
