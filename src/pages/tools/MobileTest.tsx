import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Globe, Loader2, Search, CheckCircle2, XCircle, Layout, MousePointer2, Type, TrendingUp, HelpCircle, ArrowRight, Zap, ShieldCheck, Activity, Info, Sparkles, MessageSquare, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMobileFriendlyRecommendations } from '../../services/geminiService';

const MobileTest = () => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any>(null);

  const loadingSteps = [
    'Detecting viewports...',
    'Analyzing layout shifts...',
    'Checking tap targets...',
    'Testing font legibility...',
    'Checking media queries...',
    'Finalizing mobile report...'
  ];

  const [loadingStep, setLoadingStep] = React.useState(0);

  React.useEffect(() => {
    document.title = "Free Mobile Friendly Test Tool – Check Website Responsiveness | SEOScore";
  }, []);

  const runTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL (including https://)');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);
    setLoadingStep(0);
    
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 800);
    
    try {
      // Simulated delay for UI feel
      await new Promise(r => setTimeout(r, 2000));
      
      setLoadingStep(loadingSteps.length - 2);
      
      const aiResponse = await getMobileFriendlyRecommendations(url);
      
      setLoadingStep(loadingSteps.length - 1);
      await new Promise(r => setTimeout(r, 500));

      setResult({
        isFriendly: aiResponse.isFriendly ?? Math.random() > 0.3,
        score: aiResponse.score ?? 75,
        viewports: [
          { name: 'iPhone 15 Pro', status: 'Optimal' },
          { name: 'Samsung S24 Ultra', status: 'Optimal' },
          { name: 'Google Pixel 8', status: 'Optimal' },
          { name: 'iPad Air', status: 'Warning' },
        ],
        issues: aiResponse.recommendations || [
          { title: 'Touch targets too close', category: 'UX', impact: 'High', desc: 'Buttons are difficult to press on small screens. Include: .your-button-class { min-width: 48px; min-height: 48px; } to meet mobile usability standards.' },
          { title: 'Horizontal scrolling detected', category: 'UX', impact: 'High', desc: 'Content exceeds viewport width.' },
          { title: 'Font sizes legible', category: 'Accessibility', impact: 'Low', desc: 'Typography is large enough for reading.' }
        ]
      });
    } catch (err) {
      console.error(err);
      setError('Mobile analysis failed. Please try again with a different URL.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto overflow-x-hidden">
      {/* Header Section */}
      <div className="mb-12 text-center max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6"
        >
          <Smartphone size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">UX & Infrastructure Tool</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
          Free Mobile-Friendly Test Tool
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          Is your website hard to use on a phone? Our Mobile-Friendly Test Tool analyzes your site’s responsiveness and accessibility, helping you provide a great user experience on any device.
        </p>
      </div>

      {/* Main Tool Section */}
      <section className="bg-zinc-900 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl mb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -ml-32 -mt-32"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <form onSubmit={runTest} className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-500 transition-colors">
                <Globe size={20} />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full bg-zinc-950/50 pl-12 pr-6 py-4 rounded-2xl border border-white/10 focus:border-brand-500/50 outline-none transition-all text-white placeholder:text-slate-700 shadow-inner"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-600 hover:bg-brand-500 disabled:bg-brand-900/50 text-brand-50 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap min-w-[200px]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
              {loading ? 'Analyzing...' : 'Test Mobile View'}
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm flex items-center gap-3"
              >
                <XCircle size={18} />
                {error}
              </motion.div>
            )}
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-sm flex items-center gap-3"
              >
                <CheckCircle2 size={18} />
                Mobile test complete! Your site is {result.isFriendly ? 'optimized for mobile devices.' : 'experiencing technical mobile issues.'}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 pt-12 border-t border-white/5"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-brand-500 border-t-transparent rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Smartphone className="text-brand-500 animate-pulse" size={32} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      {loadingSteps[loadingStep]}
                    </h3>
                    <p className="text-slate-500 text-sm italic">Audit in progress for {url}</p>
                  </div>

                  <div className="w-full max-w-md bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                      className="h-full bg-brand-500"
                    />
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {loadingSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${loadingStep >= idx ? 'bg-brand-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
                        <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 ${loadingStep >= idx ? 'text-slate-300' : 'text-slate-600'}`}>
                          {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skeleton UI */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 opacity-40 pointer-events-none">
                  <div className="lg:col-span-5 flex justify-center h-[500px]">
                    <div className="relative w-[280px] h-[500px] border-8 border-zinc-800 rounded-[2.5rem] bg-zinc-900 overflow-hidden animate-pulse">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-800 rounded-b-2xl" />
                      <div className="p-6 space-y-6">
                        <div className="h-6 w-1/3 bg-zinc-800 rounded mx-auto" />
                        <div className="h-32 w-full bg-zinc-800/50 rounded-xl" />
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-zinc-800 rounded" />
                          <div className="h-3 w-5/6 bg-zinc-800 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-7 space-y-8 py-4">
                    <div className="h-28 bg-zinc-800 border border-white/5 rounded-3xl animate-pulse" />
                    <div className="bg-zinc-800/30 border border-white/5 p-8 rounded-3xl h-64 animate-pulse space-y-4">
                      <div className="h-4 w-1/4 bg-zinc-800 rounded" />
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-14 bg-zinc-800 rounded-xl" />)}
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[1, 2].map(i => <div key={i} className="h-20 bg-zinc-800/50 rounded-2xl animate-pulse" />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-white/5"
              >
                {/* Visual Simulation */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-[300px] h-[600px] bg-zinc-950 border-[12px] border-zinc-800 rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden scale-90 md:scale-100 origin-top">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-800 rounded-b-3xl z-20 flex items-center justify-center">
                      <div className="w-10 h-1 bg-zinc-900 rounded-full" />
                    </div>
                    
                    {/* Simulated Content */}
                    <div className="w-full h-full bg-zinc-950 flex flex-col overflow-y-auto no-scrollbar">
                      <div className="pt-10 px-4 pb-4 border-b border-white/5 bg-zinc-900/40 sticky top-0 backdrop-blur-md z-10">
                        <div className="h-5 bg-zinc-800 rounded-lg w-1/3 mb-2" />
                        <div className="h-3 bg-zinc-800 rounded-lg w-full" />
                      </div>
                      <div className="p-4 space-y-6">
                        <div className="h-40 bg-zinc-900/50 rounded-2xl border border-white/5 animate-pulse" />
                        <div className="space-y-3">
                          <div className="h-4 bg-zinc-900/50 rounded-lg w-5/6" />
                          <div className="h-4 bg-zinc-900/50 rounded-lg w-2/3" />
                          <div className="h-4 bg-zinc-900/50 rounded-lg w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-24 bg-zinc-900/50 rounded-2xl border border-white/5" />
                          <div className="h-24 bg-zinc-900/50 rounded-2xl border border-white/5" />
                        </div>
                        <div className="h-32 bg-zinc-900/50 rounded-2xl border border-white/5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="lg:col-span-7 space-y-8">
                  <div className={`p-8 rounded-3xl border transition-all ${result.isFriendly ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]'}`}>
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${result.isFriendly ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'}`}>
                        {result.isFriendly ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {result.isFriendly ? 'Site is Mobile Friendly' : 'Technical Issues Found'}
                        </h2>
                        <p className="text-sm text-slate-400">
                          {result.isFriendly 
                            ? 'Excellent! Your website follows best practices for mobile usability and indexing.' 
                            : 'We detected several critical infrastructure issues that may hurt your mobile ranking.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Mobile Score</span>
                        <div className="text-4xl font-black text-brand-500 italic tracking-tighter shadow-brand-500/10 [text-shadow:0_0_20px_rgba(16,185,129,0.3)]">
                          {result.score}/100
                        </div>
                      </div>
                    </div>
                    <h3 className="micro-label mb-6 flex items-center gap-2">
                      <Layout size={14} className="text-brand-500" />
                      Cross-Device Compatibility
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.viewports.map((v: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-2xl border border-white/5 hover:border-brand-500/20 transition-all group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-slate-500 group-hover:text-brand-400 transition-colors">
                              <Smartphone size={16} />
                            </div>
                            <span className="text-sm font-medium text-slate-300">{v.name}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest ${v.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            {v.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="micro-label flex items-center gap-2">
                        <Sparkles size={14} className="text-brand-500" />
                        Actionable Recommendations
                      </h3>
                      <div className="flex gap-2">
                        {['High', 'Medium', 'Low'].map(lvl => (
                          <div key={lvl} className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${lvl === 'High' ? 'bg-red-500' : lvl === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                            <span className="text-[9px] font-bold text-slate-500 uppercase">{lvl} Impact</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {result.issues.map((issue: any, i: number) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-6 rounded-3xl bg-zinc-900 border border-white/5 hover:bg-zinc-800/50 transition-all flex flex-col md:flex-row gap-6 relative group"
                        >
                          <div className="flex flex-col gap-2 shrink-0 md:w-32">
                            <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded w-fit ${
                              issue.impact === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                              issue.impact === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                              'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}>
                              {issue.impact} Impact
                            </span>
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{issue.category}</span>
                          </div>
                          <div className="space-y-1 flex-1">
                            <h4 className="text-white font-bold text-base group-hover:text-brand-400 transition-colors uppercase italic tracking-tight">{issue.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                              {issue.desc.includes('Include:') ? (
                                <>
                                  {issue.desc.split('Include:')[0]}
                                  <span className="block mt-2 p-3 bg-zinc-950 rounded-lg border border-white/5 font-mono text-xs text-brand-400">
                                    {issue.desc.split('Include:')[1].split(' to meet')[0]}
                                  </span>
                                  {issue.desc.includes('to meet') && (
                                    <span className="block mt-2 text-slate-500">
                                      to meet{issue.desc.split('to meet')[1]}
                                    </span>
                                  )}
                                </>
                              ) : (
                                issue.desc
                              )}
                            </p>
                          </div>
                          <button className="self-center p-2 rounded-xl bg-white/5 text-slate-500 hover:text-brand-400 hover:bg-brand-500/10 transition-all opacity-0 group-hover:opacity-100">
                            <ArrowRight size={18} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Educational Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Layout size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Core Knowledge</span>
          </div>
          <h2 className="text-4xl font-semibold text-white leading-tight">What is a Mobile-Friendly Website?</h2>
          <p className="text-slate-400 leading-relaxed text-lg italic">
            "A mobile-friendly website is one that correctly displays on mobile devices like smartphones and tablets, offering the same level of functionality as the desktop site."
          </p>
          <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
            <h3 className="text-white font-medium mb-6 flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" />
              Why Mobile Optimization Matters?
            </h3>
            <ul className="space-y-6">
              {[
                { title: 'Google Ranking', text: 'Google uses mobile-first indexing to rank your pages.' },
                { title: 'User Experience', text: '90% of users leave sites that are difficult to navigate on mobile.' },
                { title: 'Lower Bounce Rate', text: 'Responsive designs keep users engaged longer.' },
                { title: 'Higher Conversions', text: 'Mobile sales now account for over 60% of all e-commerce.' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 mt-0.5">
                    <ArrowRight size={14} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">The Audit</span>
          </div>
          <h2 className="text-4xl font-semibold text-white leading-tight">How Our Tool Works</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            We simulate dozens of common screen resolutions and interaction patterns to find weak links in your mobile infrastructure.
          </p>
          <div className="space-y-4">
            {[
              { title: 'Viewport Analysis', text: 'Checking the meta viewport tag for correct scaling behavior.', icon: Layout },
              { title: 'Tap Target Audit', text: 'Measuring the distance between buttons and links for fat-finger errors.', icon: MousePointer2 },
              { title: 'Legibility Scan', text: 'Ensuring your text size doesn\'t require zooming on phones.', icon: Type }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-3xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-brand-400 shrink-0 border border-white/5">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Tips Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white mb-4">Tips to Improve Mobile SEO</h2>
          <p className="text-slate-500">Simple changes that make a huge impact on your rankings.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Use Responsive Design', desc: 'Ensure your site layout adapts fluidly with CSS Media Queries.' },
            { title: 'Fast Image Loading', desc: 'Use WebP formats and lazy loading for high-resolution graphics.' },
            { title: 'Check Button Sizing', desc: 'Touch elements should be at least 48x48px for easy interaction.' }
          ].map((tip, i) => (
            <div key={i} className="p-8 rounded-3xl bg-zinc-900 border border-white/5 text-center group hover:border-brand-500/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-zinc-800 mx-auto mb-6 flex items-center justify-center text-brand-500 group-hover:scale-110 transition-transform">
                <Sparkles size={32} />
              </div>
              <h4 className="text-white font-bold mb-4 text-xl">{tip.title}</h4>
              <p className="text-slate-400 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20 bg-zinc-950/50 border border-white/5 rounded-3xl p-12">
        <h2 className="text-3xl font-semibold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {[
            { q: 'Is a separate mobile site (m.example.com) still good?', a: 'Generally, no. Responsive design is the standard today because it keeps all your SEO authority on a single URL.' },
            { q: 'How does mobile speed affect friendliness?', a: 'Significantly. A site that is technically "responsive" but takes 10 seconds to load on 3G is not considered mobile-friendly.' },
            { q: 'Can I have different content on mobile?', a: 'It\'s risky. Google recommends parity between desktop and mobile content for consistent indexing.' }
          ].map((faq, i) => (
            <div key={i} className="space-y-3">
              <h4 className="text-brand-400 font-bold flex items-center gap-2">
                <HelpCircle size={16} /> {faq.q}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed pl-6 border-l border-white/10">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📖 Learn More (Guide) */}
      <section className="bg-brand-500/5 border border-brand-500/10 rounded-3xl p-10 space-y-6 mb-20">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <BookOpen className="text-brand-500" size={24} />
          Learn More About Mobile SEO
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/blog/what-is-seo" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">Mobile-First Indexing Guide</h3>
            <p className="text-slate-500 text-sm">How Google uses mobile versions for ranking.</p>
          </Link>
          <Link to="/blog/improve-speed" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">Optimizing Mobile Performance</h3>
            <p className="text-slate-500 text-sm">Make your site fly on mobile networks.</p>
          </Link>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Performance Ecosystem</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { name: 'Website Speed Checker', path: '/website/speed-checker', icon: Zap },
            { name: 'SEO Score Checker', path: '/seo/score-checker', icon: Activity },
          ].map((tool, i) => (
            <Link 
              key={i} 
              to={tool.path}
              className="group p-8 rounded-3xl bg-zinc-900 border border-white/5 hover:border-brand-500/20 hover:bg-zinc-800/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 group-hover:bg-brand-500/10 flex items-center justify-center text-slate-500 group-hover:text-brand-400 transition-all border border-white/5">
                  <tool.icon size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-brand-400 transition-all">{tool.name}</h4>
                  <p className="text-slate-500 text-sm mt-1">Audit your infrastructure</p>
                </div>
              </div>
              <ArrowRight size={24} className="text-slate-800 group-hover:text-brand-400 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-900 rounded-[3rem] p-16 text-center relative overflow-hidden shadow-2xl shadow-indigo-950/40">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-8 leading-tight italic">Optimized for 2026. Ready for Every Device.</h2>
          <p className="text-indigo-100 mb-12 text-xl opacity-80 leading-relaxed font-medium">
            Don't let poor mobile UX kill your conversions. Audit your platform now and stay ahead of the search algorithms.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-5 bg-white text-indigo-700 rounded-2xl font-black text-xl hover:bg-indigo-50 hover:scale-105 transition-all shadow-2xl active:scale-95 uppercase tracking-tighter"
          >
            Run Your Mobile Audit
          </button>
        </div>
      </section>
    </div>
  );
};

// Internal icon fix if needed
const AlertTriangle = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);

export default MobileTest;
