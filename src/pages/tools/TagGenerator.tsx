import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Copy, Loader2, Sparkles, Check, Hash, Youtube, TrendingUp, HelpCircle, ArrowRight, Activity, Zap, Search, CheckCircle2, ShieldCheck, PlayCircle, BookOpen, AlertCircle, Instagram, FileText, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateDetailedTags } from '../../services/geminiService';

const TagGenerator = () => {
  const [topic, setTopic] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [platform, setPlatform] = React.useState<'YouTube' | 'Blog' | 'Instagram'>('YouTube');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<{tag: string, volume: string, relevance: number}[]>([]);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    document.title = `Free ${platform} Tag Generator Tool – Get Tags Free | SEOScore`;
  }, [platform]);

  const [loadingStep, setLoadingStep] = React.useState(0);

  const loadingSteps = [
    `Analyzing ${platform.toLowerCase()} topic...`,
    'Identifying target audience...',
    'Scanning high-volume keywords...',
    'Evaluating competitor strategies...',
    'Refining tag list for maximum reach...'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    setError(null);
    setResults([]);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1000);

    try {
      const tags = await generateDetailedTags(topic, platform);
      if (!tags || tags.length === 0) {
        throw new Error('No tags could be generated for this topic.');
      }
      setLoadingStep(loadingSteps.length - 1);
      await new Promise(r => setTimeout(r, 500));
      setResults(tags);
    } catch (error) {
      console.error(error);
      setError('Failed to generate tags. Please try again with a different topic.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const copyAll = () => {
    const text = results.map(r => r.tag).join(', ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto overflow-x-hidden">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Free YouTube Tag Generator Tool – Get Video Tags Free",
          "description": "Find the best tags for your video to improve discoverability on YouTube with our free tag generator.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seoscore.site" },
              { "@type": "ListItem", "position": 2, "name": "YouTube Tag Generator", "item": "https://seoscore.site/tools/youtube-tag-generator" }
            ]
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a YouTube Tag Generator?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A YouTube Tag Generator is a tool that helps creators find the most relevant and high-ranking tags for their videos to improve search visibility."
              }
            },
            {
              "@type": "Question",
              "name": "How many tags should I use on YouTube?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "While YouTube allows up to 500 characters, it's best to focus on 5-8 highly relevant tags that accurately describe your content."
              }
            },
            {
              "@type": "Question",
              "name": "Are tags still important for YouTube SEO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, tags help YouTube's algorithm understand the context of your video, especially for common misspellings or related search terms."
              }
            }
          ]
        })}
      </script>

      <div className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-6"
        >
          {platform === 'YouTube' ? <Youtube size={14} /> : 
           platform === 'Instagram' ? <Instagram size={14} /> : 
           <FileText size={14} />}
          <span className="text-xs font-bold uppercase tracking-wider">{platform} Optimization Tool</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
          Free {platform} Tag Generator Tool
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Generate SEO-optimized {platform === 'Instagram' ? 'hashtags' : 'tags'} that improve your content visibility and reach. Simple, fast, and free.
        </p>
      </div>

      {/* Main Tool Section */}
      <section className="bg-zinc-900 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl mb-20 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 ${
          platform === 'YouTube' ? 'bg-red-500/5' : 
          platform === 'Instagram' ? 'bg-pink-500/5' : 
          'bg-blue-500/5'
        }`}></div>
        
        <div className="relative z-10">
          <form onSubmit={handleGenerate} className="max-w-3xl mx-auto space-y-10">
            {/* Platform Selection */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <ListChecks size={16} className="text-brand-500" />
                Select Platform
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'YouTube', icon: Youtube, color: 'hover:border-red-500/50 hover:bg-red-500/5', active: 'border-red-500 bg-red-500/10 text-white' },
                  { id: 'Blog', icon: FileText, color: 'hover:border-blue-500/50 hover:bg-blue-500/5', active: 'border-blue-500 bg-blue-500/10 text-white' },
                  { id: 'Instagram', icon: Instagram, color: 'hover:border-pink-500/50 hover:bg-pink-500/5', active: 'border-pink-500 bg-pink-500/10 text-white' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id as any)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/5 transition-all group ${
                      platform === p.id ? p.active : `bg-zinc-950/30 text-slate-400 ${p.color}`
                    }`}
                  >
                    <p.icon size={20} className={platform === p.id ? 'text-inherit' : 'group-hover:text-inherit'} />
                    <span className="text-xs font-bold uppercase tracking-widest">{p.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Search size={16} className="text-brand-500" />
                  Your Topic / Niche
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={`e.g. ${platform === 'YouTube' ? 'Budget Travel Tips' : platform === 'Blog' ? 'Next.js 15 Tutorial' : 'Minimalist Workspace'}`}
                    className="w-full bg-zinc-950/50 px-6 py-5 rounded-2xl border border-white/10 focus:border-brand-500/50 outline-none transition-all text-white placeholder:text-slate-600 text-lg shadow-inner"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-16 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 border-b-4 active:border-b-0 ${
                platform === 'YouTube' ? 'bg-red-600 hover:bg-red-500 border-red-800 shadow-red-900/20' :
                platform === 'Instagram' ? 'bg-gradient-to-r from-pink-600 to-purple-600 border-purple-800 shadow-pink-900/20' :
                'bg-blue-600 hover:bg-blue-500 border-blue-800 shadow-blue-900/20'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>AI is Crafting High-Reach Tags...</span>
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  <span>Generate AI {platform === 'Instagram' ? 'Hashtags' : 'Tags'}</span>
                </>
              )}
            </button>


            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3 mt-6"
                >
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 space-y-12 pt-12 border-t border-white/5 text-center"
              >
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-red-500 border-t-transparent rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="text-red-500 animate-pulse" size={28} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white transition-all duration-300">
                      {loadingSteps[loadingStep]}
                    </h3>
                    <p className="text-slate-500 text-sm">Our AI is analyzing keywords for "{topic}"</p>
                  </div>

                  <div className="w-full max-w-md bg-zinc-800 h-1.5 rounded-full overflow-hidden mx-auto">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                      className="h-full bg-red-500"
                    />
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    {loadingSteps.map((_, idx) => (
                      <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${loadingStep >= idx ? 'bg-red-500' : 'bg-zinc-800'}`} />
                    ))}
                  </div>
                </div>
                
                {/* Skeleton Tags */}
                <div className="space-y-8 pt-8 opacity-40 pointer-events-none">
                  <div className="flex justify-between items-center bg-zinc-800/20 p-6 rounded-2xl animate-pulse">
                    <div className="space-y-2 w-1/3">
                      <div className="h-4 w-full bg-zinc-700/50 rounded" />
                      <div className="h-2 w-1/2 bg-zinc-700/30 rounded" />
                    </div>
                    <div className="h-10 w-32 bg-zinc-700/50 rounded-xl" />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                      <div key={i} className="h-10 bg-zinc-800/50 rounded-xl w-28 animate-pulse border border-white/5" />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {results.length > 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 pt-12 border-t border-white/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                      <Hash size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Generated {platform === 'Instagram' ? 'Hashtags' : 'SEO Tags'}</h3>
                      <p className="text-xs text-slate-500">Boost your metadata with these high-intent keywords</p>
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
                    {copied ? 'Copied All' : 'Copy All Tags'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((res, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="group p-4 bg-zinc-950/50 hover:bg-zinc-800/80 border border-white/5 hover:border-brand-500/30 rounded-2xl transition-all cursor-default relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-3 relative z-10">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-brand-500/50 font-bold">#</span>
                          <span className="text-white text-sm font-bold truncate">{res.tag.replace(/^#/, '')}</span>
                        </div>
                        <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                          res.volume === 'High' ? 'bg-red-500/10 text-red-400' :
                          res.volume === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-blue-500/10 text-blue-400'
                        }`}>
                          {res.volume} Vol
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between relative z-10">
                         <div className="flex-1 bg-white/5 h-1 rounded-full overflow-hidden mr-3">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${res.relevance}%` }}
                              className="h-full bg-brand-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                            />
                         </div>
                         <span className="text-[9px] font-bold text-slate-500 whitespace-nowrap">{res.relevance}% Rel</span>
                      </div>

                      {/* Hover background effect */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
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
      <section className={`rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl transition-all duration-500 ${
        platform === 'YouTube' ? 'bg-gradient-to-br from-red-600 to-red-800 shadow-red-900/20' :
        platform === 'Instagram' ? 'bg-gradient-to-br from-pink-600 to-purple-800 shadow-pink-900/20' :
        'bg-gradient-to-br from-blue-600 to-blue-800 shadow-blue-900/20'
      }`}>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Grow Your {platform} Reach</h2>
          <p className="text-white/90 mb-10 text-lg max-w-2xl mx-auto opacity-90">
            Generate powerful AI-optimized {platform === 'Instagram' ? 'hashtags' : 'tags'} and scale your content today. Join thousands of creators.
          </p>
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-10 py-4 bg-white text-zinc-950 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            Start Generating Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default TagGenerator;
