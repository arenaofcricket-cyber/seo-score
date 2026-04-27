import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Copy, Loader2, Sparkles, Check, Hash, TrendingUp, HelpCircle, ArrowRight, Activity, Zap, Search, CheckCircle2, ShieldCheck, PlayCircle, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateYouTubeTitle } from '../../services/geminiService';

const TitleGenerator = () => {
  const [topic, setTopic] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    try {
      const titles = await generateYouTubeTitle(topic, keywords);
      setResults(titles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-6"
        >
          <Youtube size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Viral SEO Tool</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
          Free YouTube Title Generator Tool
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Struggling to find the perfect title? Our AI-powered YouTube Title Generator helps you create catchy, SEO-optimized titles that drive clicks and increase views.
        </p>
      </div>

      {/* Main Tool Section */}
      <section className="bg-zinc-900 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl mb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -ml-32 -mb-32 text-red-500"></div>
        
        <div className="relative z-10">
          <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Search size={16} className="text-red-500" />
                  What is your video about?
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Best budget cameras for vlogging in 2026"
                  className="w-full bg-zinc-950/50 px-6 py-4 rounded-2xl border border-white/10 focus:border-red-500/50 outline-none transition-all text-white placeholder:text-slate-600 text-lg shadow-inner"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Star size={16} className="text-brand-400" />
                  Target Keywords (Optional)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g. vlogging, tech review, 4k"
                  className="w-full bg-zinc-950/50 px-6 py-4 rounded-2xl border border-white/10 focus:border-brand-500/50 outline-none transition-all text-white placeholder:text-slate-600 shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-red-600 hover:bg-red-500 disabled:bg-red-900/50 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-900/20 active:scale-95 border-b-4 border-red-800 active:border-b-0"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>AI Thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  <span>Generate AI Titles</span>
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 pt-12 border-t border-white/5 space-y-4"
              >
                <h3 className="text-white font-semibold flex items-center gap-2 mb-6">
                  <Star size={18} className="text-red-500" />
                  Suggested Viral Titles
                </h3>
                {results.map((title, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-zinc-800/40 border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-zinc-800 hover:border-red-500/30 transition-all border-l-4 border-l-transparent hover:border-l-red-500"
                  >
                    <span className="text-slate-200 font-medium md:text-lg">{title}</span>
                    <button
                      onClick={() => copyToClipboard(title, i)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                        copied === i 
                        ? 'bg-green-500 text-zinc-950' 
                        : 'bg-white/5 text-slate-400 group-hover:bg-white group-hover:text-zinc-950'
                      }`}
                    >
                      {copied === i ? <Check size={14} /> : <Copy size={14} />}
                      {copied === i ? 'Copied' : 'Copy'}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Educational Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <PlayCircle size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Growth Guide</span>
          </div>
          <h2 className="text-3xl font-semibold text-white">Why a Great Title Matters?</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            Your title is the first thing a potential viewer sees. It works along with your thumbnail to determine your Click-Through Rate (CTR). A high-ranking title tells both the user and the algorithm exactly what to expect.
          </p>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-400" />
              Ranking Factors
            </h3>
            <ul className="space-y-3">
              {[
                'Hooks potential viewers in the first 3 seconds',
                'Contains high-volume search keywords',
                'Increases organic browse feature reach',
                'Improves indexing in YouTube and Google Search'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                  <CheckCircle2 size={16} className="text-brand-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Zap size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Process</span>
          </div>
          <h2 className="text-3xl font-semibold text-white">How AI Generates Titles</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            Our system analyzes thousands of high-performing YouTube videos to understand the psychological triggers that lead to clicks.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: 'Sentiment Analysis', text: 'Uses emotional triggers like curiosity, excitement, or urgency.', icon: Sparkles },
              { title: 'CTR Optimization', text: 'Patterns known to yield higher click-through rates.', icon: Zap },
              { title: 'Search Intent', text: 'Matching the specific problem your viewer is solving.', icon: Search }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-zinc-900/30 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-brand-400 shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{item.title}</h4>
                  <p className="text-slate-500 text-xs">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Tips Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-white mb-8 flex items-center gap-3">
          <Star className="text-brand-400" />
          Pro Tips for Viral Titles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Keep it Under 70', desc: 'YouTube truncates titles after 70 characters on many devices.' },
            { title: 'Use Numbers', desc: 'Lists and years (e.g., 2026) perform 20% better on average.' },
            { title: 'Emotional Hook', desc: 'Words like "Shocking," "Ultimate," or "Proven" drive curiosity.' },
            { title: 'Key Word at Start', desc: 'Put your most important keyword in the first 2-3 words.' }
          ].map((tip, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-brand-500/30 transition-all">
              <h4 className="text-white font-semibold mb-2">{tip.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-white mb-8 flex items-center gap-3">
          <HelpCircle className="text-brand-400" />
          Title Optimization FAQs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: 'Can I change my title after uploading?', a: 'Yes! In fact, changing a title on a slow-performing video can sometimes give it a new life in the algorithm.' },
            { q: 'Should I use Caps Lock?', a: 'Use it sparingly for emphasis on 1-2 words. ALL CAPS can sometimes look like spam and hurting trust.' },
            { q: 'Does title matter more than thumbnail?', a: 'They work together. The title provides the context, and the thumbnail provides the visual punch.' }
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <span className="text-brand-500">Q:</span> {faq.q}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                <span className="text-emerald-500 font-bold mr-2 italic">A:</span> {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 📖 Learn More (Guide) */}
      <section className="bg-brand-500/5 border border-brand-500/10 rounded-3xl p-10 space-y-6 mb-20">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <BookOpen className="text-brand-500" size={24} />
          Learn More About YT SEO
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/blog/yt-seo-2026" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">How to Rank YouTube Videos in 2026</h3>
            <p className="text-slate-500 text-sm">Master the algorithm and get more organic views.</p>
          </Link>
          <Link to="/blog/what-is-seo" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">Title & Thumbnail Strategy</h3>
            <p className="text-slate-500 text-sm">How to increase your Click-Through Rate (CTR).</p>
          </Link>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-white mb-8">Related Video Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { name: 'YouTube Tag Generator', path: '/youtube/tag-generator', icon: Hash },
            { name: 'Keyword Density Tool', path: '/seo/keyword-density', icon: Activity },
          ].map((tool, i) => (
            <Link 
              key={i} 
              to={tool.path}
              className="group p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-brand-500/20 hover:bg-zinc-800/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 group-hover:bg-brand-500/10 flex items-center justify-center text-slate-400 group-hover:text-brand-400 transition-all">
                  <tool.icon size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium group-hover:text-brand-400 transition-all">{tool.name}</h4>
                  <p className="text-slate-500 text-xs mt-1">Boost your visibility</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-slate-700 group-hover:text-brand-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-indigo-600 to-brand-700 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-brand-900/20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Master Your Video SEO</h2>
          <p className="text-brand-100 mb-10 text-lg max-w-2xl mx-auto opacity-90">
            Stop guessing and start ranking. Use our AI tools to craft the perfect YouTube experience for your viewers.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-4 bg-white text-brand-600 rounded-2xl font-bold text-lg hover:bg-brand-50 hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            Create Your Next Viral Title
          </button>
        </div>
      </section>
    </div>
  );
};

export default TitleGenerator;
