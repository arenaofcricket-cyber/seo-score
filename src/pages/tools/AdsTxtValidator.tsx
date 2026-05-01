import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Wifi, Globe, Loader2, Search, CheckCircle2, AlertCircle, Copy, Code, Terminal, Server, ArrowRight, ExternalLink, Activity, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAdsTxtAudit } from '../../services/geminiService';

const AdsTxtValidator = () => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState(0);
  const [result, setResult] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const loadingSteps = [
    "Checking domain DNS...",
    "Requesting /ads.txt path...",
    "Analyzing HTTP Headers...",
    "Validating Content-Type...",
    "Parsing Ad Network records...",
    "Generating fix instructions..."
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
    }, 600);

    try {
      const data = await getAdsTxtAudit(url);
      
      setLoadingStep(loadingSteps.length - 1);
      await new Promise(r => setTimeout(r, 500));
      setResult(data);
    } catch (err) {
      setError("Failed to reach domain or ads.txt file. Ensure the URL is public.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-300 pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
              <ShieldCheck size={14} className="text-brand-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-500">Monetization Safety</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter leading-[0.9]">
              Ads.txt <span className="text-brand-500">Validator.</span>
            </h1>
            <p className="text-lg text-slate-500 mt-6 leading-relaxed">
              Verify your transparency records. Detection for header misconfigurations, 
              wrong <code className="text-brand-400">Content-Type</code>, and unauthorized sellers.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex flex-col items-end gap-2 text-right">
              <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Live Database</div>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/5 rounded-2xl">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[11px] font-bold text-white italic">IAB Standard 1.1 Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Card */}
        <div className="mb-12">
          <form 
            onSubmit={handleAudit}
            className="group relative bg-zinc-900 border border-white/5 rounded-3xl p-3 md:p-4 flex flex-col md:flex-row gap-4 focus-within:border-brand-500/50 transition-all shadow-2xl"
          >
            <div className="flex-grow relative flex items-center">
              <Globe className="absolute left-6 text-slate-600 group-focus-within:text-brand-500 transition-colors" size={20} />
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yoursite.com"
                className="w-full bg-zinc-950/50 border border-transparent focus:border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white font-medium outline-none transition-all placeholder:text-slate-700"
              />
            </div>
            <button 
              disabled={loading || !url}
              className="bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing
                </>
              ) : (
                <>
                  <Search size={20} strokeWidth={3} />
                  Validate Ads.txt
                </>
              )}
            </button>
          </form>
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                  className="h-full bg-brand-500"
                />
              </div>
              <p className="text-sm font-black uppercase tracking-widest text-slate-500 italic animate-pulse">
                {loadingSteps[loadingStep]}
              </p>
            </motion.div>
          )}

          {/* Results Section */}
          {result && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Main Status Panel */}
              <div className="lg:col-span-12">
                <div className={`p-8 rounded-[2.5rem] border flex flex-col md:flex-row items-center justify-between gap-8 transition-all ${
                  result.status === 'Valid' ? 'bg-emerald-500/5 border-emerald-500/20' : 
                  result.status === 'Warning' ? 'bg-amber-500/5 border-amber-500/20' : 
                  'bg-red-500/5 border-red-500/20'
                }`}>
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg ${
                      result.status === 'Valid' ? 'bg-emerald-500 text-black shadow-emerald-500/20' : 
                      result.status === 'Warning' ? 'bg-amber-500 text-black shadow-amber-500/20' : 
                      'bg-red-500 text-white shadow-red-500/20'
                    }`}>
                      {result.status === 'Valid' ? <CheckCircle2 size={40} /> : <ShieldAlert size={40} />}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                        {result.status === 'Valid' ? 'Records Optimized' : 'Validation Error'}
                      </h2>
                      <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                        Detected Content-Type: <code className={`px-2 py-0.5 rounded font-mono ${result.contentType === 'text/plain' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>{result.contentType}</code>. 
                        Advertisers and DSPs require <code>text/plain</code> to safely crawl your monetization records.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center md:items-end gap-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Score</div>
                    <div className={`text-6xl font-black italic tracking-tighter ${result.status === 'Valid' ? 'text-brand-500' : 'text-red-500'}`}>
                      {result.status === 'Valid' ? '100' : '35'}<span className="text-2xl text-slate-700">/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fix Instructions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 px-2">
                   <Terminal size={18} className="text-brand-500" />
                   <h3 className="text-xs font-black uppercase tracking-widest text-white">How to Fix: Server Headers</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Apache (.htaccess)', code: result.serverFixes.htaccess, icon: Server },
                    { label: 'Nginx (Config)', code: result.serverFixes.nginx, icon: Code }
                  ].map((fix, i) => (fix.code && (
                    <div key={i} className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden group">
                       <div className="px-6 py-4 bg-white/5 flex items-center justify-between border-b border-white/5">
                          <div className="flex items-center gap-3">
                             <fix.icon size={14} className="text-slate-500 group-hover:text-brand-500 transition-colors" />
                             <span className="text-[11px] font-black uppercase tracking-widest text-slate-200">{fix.label}</span>
                          </div>
                          <button 
                            onClick={() => copyToClipboard(fix.code)}
                            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 group/btn transition-all"
                          >
                            <Copy size={14} className="group-active/btn:scale-75 transition-transform" />
                          </button>
                       </div>
                       <pre className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-brand-400 bg-zinc-950/50">
                         {fix.code}
                       </pre>
                    </div>
                  )))}
                </div>

                <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex gap-4">
                   <Info className="text-blue-500 shrink-0" size={20} />
                   <div className="space-y-2">
                      <p className="text-sm font-bold text-blue-100">Why this matters</p>
                      <p className="text-xs text-blue-200/60 leading-relaxed italic">
                        DSP crawlers (like Google Adsense or The Trade Desk) are lightweight scrapers. If they encounter <code>text/html</code>, 
                        they often fail to parse the file or assume the site is returning a 404 custom page, resulting in "Missing Ads.txt" warnings in your dashboard.
                      </p>
                   </div>
                </div>
              </div>

              {/* File Preview & Issues */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3 px-2">
                   <AlertCircle size={18} className="text-amber-500" />
                   <h3 className="text-xs font-black uppercase tracking-widest text-white">Detected Issues</h3>
                </div>

                <div className="space-y-3">
                  {result.issues.map((issue: any, i: number) => (
                    <div key={i} className="p-5 bg-zinc-900 border border-white/5 rounded-2xl flex items-start gap-4">
                       <div className={`mt-1 p-2 rounded-lg shrink-0 ${issue.severity === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          <AlertCircle size={14} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white mb-1">{issue.title}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">{issue.fix}</p>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                   <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">File Content Sample</h3>
                      <div className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         <span className="text-[9px] font-black text-slate-400">UTF-8 Encoded</span>
                      </div>
                   </div>
                   <div className="bg-zinc-950 border border-white/5 rounded-3xl p-6 font-mono text-[12px] leading-relaxed text-slate-400 relative group">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Copy size={14} className="text-slate-600 cursor-pointer" />
                      </div>
                      {result.contentPreview?.split('\n').map((line: string, i: number) => (
                        <div key={i} className="flex gap-4">
                           <span className="w-4 text-slate-800 select-none">{i+1}</span>
                           <span className="break-all">{line}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Knowledge Base */}
        {!result && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
             {[
               { title: 'Standard Syntax', icon: ShieldCheck, desc: 'Every record must include Domain, Publisher ID, Type, and Authority ID.' },
               { title: 'Subdomain Reach', icon: Globe, desc: 'Place entries in individual subdomain files or reference them from the root.' },
               { title: 'Update Frequency', icon: Activity, desc: 'Crawlers re-check records every 24 hours. Ensure zero downtime.' }
             ].map((item, i) => (
               <div key={i} className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] hover:border-brand-500/20 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-slate-500 group-hover:text-brand-500 mb-6 transition-colors">
                     <item.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 italic">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-tight opacity-60">
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

export default AdsTxtValidator;
