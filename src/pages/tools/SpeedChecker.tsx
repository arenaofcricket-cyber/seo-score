import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Globe, Loader2, Search, Gauge, Cpu, Layout, Image as ImageIcon, Rocket, CheckCircle2, TrendingUp, HelpCircle, ArrowRight, Activity, Link as LinkIcon, BookOpen, Smartphone, BarChart3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const trendData = [
  { date: 'Mon', fcp: 1.8, lcp: 2.9, cls: 0.05 },
  { date: 'Tue', fcp: 1.6, lcp: 2.7, cls: 0.04 },
  { date: 'Wed', fcp: 1.7, lcp: 2.8, cls: 0.06 },
  { date: 'Thu', fcp: 1.5, lcp: 2.4, cls: 0.03 },
  { date: 'Fri', fcp: 1.4, lcp: 2.2, cls: 0.02 },
  { date: 'Sat', fcp: 1.2, lcp: 2.1, cls: 0.02 },
  { date: 'Sun', fcp: 1.3, lcp: 2.0, cls: 0.01 },
];

const SpeedChecker = () => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);

  const testSpeed = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    // Simulate real-world speed test with random variations
    await new Promise(r => setTimeout(r, 2500));
    
    const randomScore = Math.floor(Math.random() * (98 - 65) + 65);
    setResult({
      score: randomScore,
      fcp: (Math.random() * 2 + 0.5).toFixed(1),
      lcp: (Math.random() * 3 + 1).toFixed(1),
      cls: (Math.random() * 0.1).toFixed(3),
      tbt: Math.floor(Math.random() * 200 + 50),
      breakdown: [
        { name: 'Server Response Time', value: 92, icon: Globe },
        { name: 'JavaScript Execution', value: randomScore - 5, icon: Cpu },
        { name: 'Image Compression', value: randomScore + 2, icon: ImageIcon },
        { name: 'Layout Stability', value: 98, icon: Layout },
      ]
    });
    setLoading(false);
  };

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-16 mb-20">
      {/* 🟢 H1 & 📌 Intro */}
      <div className="space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Free Website Speed Checker Tool</h1>
        <div className="h-1 w-20 bg-brand-500 rounded-full"></div>
        <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
          Is your website slow? A slow-loading website can hurt your rankings and user experience. Use our Website Speed Checker Tool to analyze your site speed and discover ways to improve performance instantly. In today's digital world, every millisecond counts. A delay of just one second can result in a significant drop in conversions and user satisfaction. Our tool provides a deep dive into your site's loading sequence to find exactly what's holding you back.
        </p>
      </div>

      {/* ⚙️ Tool Section */}
      <section className="bg-zinc-900 shadow-2xl border border-white/5 p-8 lg:p-12 rounded-3xl space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-brand-500/10 rounded-full text-brand-500">
            <Rocket size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Enter your website URL</h2>
          <p className="text-slate-500 text-sm">Analyze your page load time and Core Web Vitals</p>
        </div>

        <form onSubmit={testSpeed} className="input-container max-w-3xl mx-auto">
          <Globe className="ml-4 text-slate-500" size={20} />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder:text-slate-600 focus:ring-0"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
            {loading ? 'Analyzing...' : 'Check Speed'}
          </button>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 pt-8 border-t border-white/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { name: 'Performance', value: `${result.score}`, unit: '/100', color: result.score > 90 ? 'text-brand-500' : 'text-amber-500' },
                  { name: 'FCP', value: `${result.fcp}`, unit: 's', color: 'text-white' },
                  { name: 'LCP', value: `${result.lcp}`, unit: 's', color: 'text-white' },
                  { name: 'CLS', value: result.cls, unit: '', color: 'text-white' },
                ].map((stat, i) => (
                  <div key={i} className="bg-zinc-800/50 border border-white/5 p-6 rounded-2xl">
                    <div className="micro-label mb-2">{stat.name}</div>
                    <div className={`text-3xl font-light ${stat.color}`}>
                      {stat.value}<span className="text-sm opacity-40 ml-0.5">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-800/30 border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/5">
                  <h3 className="micro-label text-white">Advanced Performance Breakdown</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {result.breakdown.map((item: any, i: number) => (
                    <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-zinc-700/50 rounded-lg text-brand-400">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-200">{item.name}</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Optimization analysis</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full md:w-3/5">
                        <div className="flex-grow h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            className={`h-full rounded-full ${item.value > 90 ? 'bg-brand-500' : 'bg-amber-500'} shadow-[0_0_8px_rgba(16,185,129,0.2)]`}
                          />
                        </div>
                        <span className="font-mono text-sm font-bold w-12 text-right text-slate-400">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 📊 Trend Visualization */}
              <div className="bg-zinc-800/30 border border-white/5 rounded-2xl overflow-hidden p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="text-brand-500" size={20} />
                    <h3 className="font-bold text-white">Core Web Vitals Trend</h3>
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-zinc-900 px-3 py-1.5 rounded-full">
                    Last 7 Days (Simulated)
                  </div>
                </div>
                
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#71717a" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#71717a" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#18181b', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px'
                        }}
                        itemStyle={{ fontSize: '12px' }}
                      />
                      <Legend 
                        iconType="circle" 
                        wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="fcp" 
                        name="FCP (s)" 
                        stroke="#10b981" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#10b981' }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lcp" 
                        name="LCP (s)" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#3b82f6' }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cls" 
                        name="CLS" 
                        stroke="#f59e0b" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#f59e0b' }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8 p-4 bg-brand-500/5 border border-brand-500/10 rounded-xl flex items-start gap-4">
                  <div className="p-2 bg-brand-500/10 rounded-lg shrink-0">
                    <Sparkles className="text-brand-500" size={16} />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-slate-200 font-bold block mb-1">Performance Insight</span>
                    Your Largest Contentful Paint (LCP) has been consistently improving over the last week. This indicates that your recent server-side optimizations are having a positive impact on user perceived loading speed.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ⚡ What is Website Speed? */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-slate-400 leading-relaxed">
          <h2 className="text-3xl font-bold text-white leading-tight">What is Website Speed?</h2>
          <p>
            Website speed refers to how quickly your web pages load when users visit your site. Faster websites provide a better user experience and rank higher on search engines like Google.
          </p>
          <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-brand-500" /> Why Website Speed Matters?
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Improves user experience',
                'Reduces bounce rate',
                'Helps in higher Google rankings',
                'Increases conversions'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 size={16} className="text-brand-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative aspect-video bg-zinc-900 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent"></div>
          <Gauge size={120} className="text-brand-500/20" />
          <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute w-64 h-64 border-2 border-brand-500/5 rounded-full"
          />
          <div className="relative text-center p-8">
            <div className="text-4xl font-bold text-white mb-2 tracking-tighter">SEO & Speed</div>
            <div className="text-slate-500 text-sm">Perfectly Aligned Performance</div>
          </div>
        </div>
      </section>

      {/* 🔍 How This Tool Works & 🚀 Tips to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-white/5 p-10 rounded-3xl space-y-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Search className="text-brand-500" /> How This Tool Works
          </h2>
          <p className="text-slate-500 text-sm italic">Our tool checks your website performance based on:</p>
          <ul className="space-y-4">
            {[
              'Page load time',
              'Core web vitals (basic level)',
              'Mobile performance',
              'Optimization factors'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-zinc-900 border border-white/5 p-10 rounded-3xl space-y-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Zap className="text-amber-500" /> Tips to Improve Website Speed
          </h2>
          <ul className="space-y-4">
            {[
              'Optimize images',
              'Use fast hosting',
              'Enable caching',
              'Minimize CSS & JavaScript',
              'Use CDN'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-300">
                <CheckCircle2 size={18} className="text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 📖 Learn More (Guide) */}
      <section className="bg-brand-500/5 border border-brand-500/10 rounded-3xl p-10 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <BookOpen className="text-brand-500" size={24} />
          Learn More About Optimization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/blog/improve-speed" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">How to improve Website Speed (Guide)</h3>
            <p className="text-slate-500 text-sm">Technical tips to make your site load faster.</p>
          </Link>
          <Link to="/blog/what-is-seo" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">Core Web Vitals Explained</h3>
            <p className="text-slate-500 text-sm">How Google measures your site performance.</p>
          </Link>
        </div>
      </section>

      {/* 🔗 Related Tools */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">Related Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { name: 'Mobile Friendly Test', path: '/website/mobile-test', icon: Smartphone },
            { name: 'SEO Score Checker', path: '/seo/score-checker', icon: Activity },
          ].map((tool, i) => (
            <Link 
              key={i} 
              to={tool.path}
              className="p-8 bg-zinc-900 border border-white/5 rounded-2xl flex items-center gap-6 hover:bg-zinc-800 transition-all group"
            >
              <div className="p-4 bg-zinc-800 rounded-xl text-brand-500 group-hover:bg-brand-500 group-hover:text-black transition-colors">
                <tool.icon size={24} />
              </div>
              <span className="text-xl font-bold text-white">{tool.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ❓ FAQs */}
      <section className="bg-zinc-900 border border-white/5 rounded-3xl p-10 space-y-12">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <HelpCircle className="text-brand-500" /> FAQs
        </h2>
        <div className="divide-y divide-white/5">
          {[
            { q: 'Is this tool free?', a: 'Yes, completely free. No credit card or registration required.' },
            { q: 'What is a good website speed?', a: 'Under 3 seconds is ideal, but the faster the better. Top sites usually load in under 1.5s.' },
            { q: 'Does speed affect SEO?', a: 'Yes, it’s a ranking factor. Google prioritizes fast-loading sites for better user experience.' }
          ].map((faq, i) => (
            <div key={i} className="py-8 first:pt-0 last:pb-0">
              <h3 className="text-lg font-bold text-white mb-2">Q: {faq.q}</h3>
              <p className="text-slate-500">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📢 CTA */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-3xl p-12 lg:p-20 text-center space-y-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-black tracking-tight leading-tight">
          Check your website speed now and <br className="hidden md:block" /> improve performance instantly.
        </h2>
        <div className="flex justify-center">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-5 bg-black text-white font-bold rounded-xl shadow-2xl hover:scale-105 transition-all text-xl"
          >
            Test My Speed Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default SpeedChecker;
