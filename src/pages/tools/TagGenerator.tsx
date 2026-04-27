import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Copy, Loader2, Sparkles, Check, Hash, Youtube, TrendingUp, HelpCircle, ArrowRight, Activity, Zap, Search, CheckCircle2, ShieldCheck, PlayCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateYouTubeTags } from '../../services/geminiService';

const TagGenerator = () => {
  const [topic, setTopic] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    try {
      const tags = await generateYouTubeTags(topic);
      setResults(tags);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <span className="text-xs font-bold uppercase tracking-wider">YouTube SEO Tool</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
          Free YouTube Tag Generator Tool
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Want more views on your YouTube videos? Our YouTube Tag Generator Tool helps you generate SEO-optimized tags that improve your video ranking and visibility.
        </p>
      </div>

      {/* Main Tool Section */}
      <section className="bg-zinc-900 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl mb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="relative z-10">
          <form onSubmit={handleGenerate} className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Search size={16} className="text-red-500" />
                Enter your video topic or keywords
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. How to start a travel blog in 2026"
                  className="w-full bg-zinc-950/50 px-6 py-5 rounded-2xl border border-white/10 focus:border-red-500/50 outline-none transition-all text-white placeholder:text-slate-600 text-lg shadow-inner"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-red-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all"></div>
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
                  <span>Generating Optimized Tags...</span>
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  <span>Generate Tags</span>
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 pt-12 border-t border-white/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                      <Hash size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Generated SEO Tags</h3>
                      <p className="text-xs text-slate-500">Boost your video metadata with these keywords</p>
                    </div>
                  </div>
                  <button
                    onClick={copyAll}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all h-fit ${
                      copied 
                      ? 'bg-green-500 text-zinc-950' 
                      : 'bg-white text-zinc-950 hover:bg-slate-200'
                    }`}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied Tags' : 'Copy All Tags'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {results.map((tag, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="group relative"
                    >
                      <div className="px-4 py-2.5 bg-zinc-800/50 hover:bg-zinc-800 text-slate-300 hover:text-white rounded-xl border border-white/5 hover:border-red-500/30 transition-all cursor-default flex items-center gap-2">
                        <span className="text-red-500/50">#</span>
                        {tag}
                      </div>
                    </motion.div>
                  ))}
                </div>
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
            <span className="text-[10px] font-bold uppercase tracking-widest">Knowledge Base</span>
          </div>
          <h2 className="text-3xl font-semibold text-white">What are YouTube Tags?</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            YouTube tags are descriptive keywords (metadata) that help YouTube's algorithm understand the context and content of your video. They are a critical component of video SEO, helping your content appear in search results and as "Related Videos."
          </p>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-400" />
              Why Tags Matter?
            </h3>
            <ul className="space-y-3">
              {[
                'Improve video discoverability across search',
                'Help YouTube algorithm categorize your content',
                'Increase views through "Related" suggestions',
                'Higher rankings for competitive search results'
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
            <span className="text-[10px] font-bold uppercase tracking-widest">How it Works</span>
          </div>
          <h2 className="text-3xl font-semibold text-white">Advanced Search Logic</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            Our tool doesn't just guess; it uses AI to analyze your topic against real-time data and historical performance metrics.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: 'Keyword Intent', text: 'Analyzes user search intent behind your topic.', icon: Search },
              { title: 'Search Trends', text: 'Prioritizes tags that are currently trending.', icon: TrendingUp },
              { title: 'SEO Relevance', text: 'Ensures tags match YouTube metadata guidelines.', icon: ShieldCheck }
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
          <Sparkles className="text-brand-400" />
          Tips for Better YouTube SEO
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Long-Tail Keywords', desc: 'Use specific, longer phrases to avoid heavy competition.' },
            { title: 'Title & Desc Sync', desc: 'Repeat your primary tags in your title and first 2 lines of description.' },
            { title: 'Custom Thumbnails', desc: 'Higher CTR (Click-Through Rate) boosts tag relevance.' },
            { title: 'Proper Keyword Research', desc: 'Use our generator as a baseline and tweak for your niche.' }
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
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: 'Are tags still important in 2026?', a: 'Yes, while titles and thumbnails are huge, tags still help the algorithm accurately categorize your content for better indexing.' },
            { q: 'How many tags should I use?', a: 'We recommend 10–15 relevant tags. Quality matters more than quantity—don\'t spam irrelevant keywords.' },
            { q: 'Is this tool free?', a: 'Completely. You can generate unlimited tags for all your YouTube videos without any subscription.' }
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
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">SEO Basics for Content Creators</h3>
            <p className="text-slate-500 text-sm">Apply professional search strategies to your channel.</p>
          </Link>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white">Related Video Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { name: 'YouTube Title Generator', path: '/youtube/title-generator', icon: PlayCircle },
            { name: 'SEO Score Checker', path: '/seo/score-checker', icon: Activity },
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
                  <p className="text-slate-500 text-xs mt-1">Optimize your video metadata</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-slate-700 group-hover:text-brand-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-red-900/20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Grow Your Channel Faster</h2>
          <p className="text-red-100 mb-10 text-lg max-w-2xl mx-auto opacity-90">
            Generate powerful YouTube tags and grow your channel faster. Start optimizing your metadata today.
          </p>
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Set focus to the input if we wanted to be fancy, but scroll is enough usually
            }}
            className="px-10 py-4 bg-white text-red-600 rounded-2xl font-bold text-lg hover:bg-red-50 hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            Start Generating Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default TagGenerator;
