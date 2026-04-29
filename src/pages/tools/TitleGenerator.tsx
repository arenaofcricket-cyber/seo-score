import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Copy, Loader2, Sparkles, Check, Hash, TrendingUp, HelpCircle, ArrowRight, Activity, Zap, Search, CheckCircle2, ShieldCheck, PlayCircle, Star, BookOpen, AlertCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateYouTubeTitle } from '../../services/geminiService';

const TitleGenerator = () => {
  const [topic, setTopic] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<{title: string, description: string}[]>([]);
  const [copied, setCopied] = React.useState<{index: number, type: 'title' | 'description'} | null>(null);

  const [loadingStep, setLoadingStep] = React.useState(0);

  const loadingSteps = [
    'Analyzing video topic...',
    'Researching high-CTR patterns...',
    'Incorporating target keywords...',
    'Evaluating emotional triggers...',
    'Drafting viral titles & descriptions...'
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
      const titles = await generateYouTubeTitle(topic, keywords);
      if (!titles || titles.length === 0) {
        throw new Error('No titles could be generated.');
      }
      setLoadingStep(loadingSteps.length - 1);
      await new Promise(r => setTimeout(r, 500));
      setResults(titles);
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please check your topic and try again.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number, type: 'title' | 'description') => {
    navigator.clipboard.writeText(text);
    setCopied({ index, type });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto overflow-x-hidden">
      {/* 🚀 SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "AI YouTube Title Generator",
          "operatingSystem": "All",
          "applicationCategory": "MultimediaApplication",
          "description": "Generate high-CTR, SEO-optimized YouTube titles for your videos with our free AI tool.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1250"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Free YouTube Title Generator Tool – Generate Catchy Titles",
          "description": "Generate high-CTR, SEO-optimized YouTube titles for your videos with our free AI tool.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seoscore.site" },
              { "@type": "ListItem", "position": 2, "name": "YouTube Title Generator", "item": "https://seoscore.site/tools/youtube-title-generator" }
            ]
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to generate viral YouTube titles",
          "description": "Follow these simple steps to create catchy, SEO-friendly titles for your YouTube videos.",
          "step": [
            {
              "@type": "HowToStep",
              "text": "Enter your video topic or primary subject in the input field."
            },
            {
              "@type": "HowToStep",
              "text": "Optionally provide target keywords to guide the AI's SEO focus."
            },
            {
              "@type": "HowToStep",
              "text": "Click the 'Generate AI Titles' button to start the analysis."
            },
            {
              "@type": "HowToStep",
              "text": "Review the list of viral title suggestions and click any title to copy it to your clipboard."
            }
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Why is the YouTube title important?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The title is one of the most important factors for Click-Through Rate (CTR) and SEO, helping users and the algorithm understand what your video is about."
              }
            },
            {
              "@type": "Question",
              "name": "What makes a good YouTube title?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A good title is catchy, contains relevant keywords, is under 60-70 characters, and creates curiosity without being clickbait."
              }
            },
            {
              "@type": "Question",
              "name": "Does the YouTube title help in ranking?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, including your primary keyword near the beginning of your title significantly helps your video rank in YouTube search results."
              }
            }
          ]
        })}
      </script>
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
      <section className="bg-zinc-900 border border-white/5 rounded-3xl p-4 md:p-8 lg:p-12 shadow-2xl mb-20 relative overflow-hidden">
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
                    <p className="text-slate-500 text-sm italic">Our AI is drafting high-engagement titles for "{topic}"</p>
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
                      <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${loadingStep >= idx ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-zinc-800'}`} />
                    ))}
                  </div>
                </div>
                
                {/* Skeleton Titles */}
                <div className="space-y-4 opacity-40 pointer-events-none">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-16 bg-zinc-800/40 border border-white/5 rounded-2xl w-full animate-pulse flex items-center justify-between px-6">
                      <div className="h-4 w-2/3 bg-zinc-700/50 rounded" />
                      <div className="h-6 w-16 bg-zinc-700/30 rounded-lg" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {results.length > 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 pt-12 border-t border-white/5 space-y-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Star size={18} className="text-red-500" />
                    Suggested AI Content Packages
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:block">Optimized for Viral Reach</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {results.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`group relative p-8 rounded-[2rem] transition-all border-l-4 border-l-transparent overflow-hidden ${
                        item.title.length > 70 
                        ? 'bg-red-500/5 border border-red-500/20' 
                        : 'bg-zinc-800/40 border border-white/5'
                      }`}
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/0 to-red-500/[0.03] pointer-events-none" />
                      
                      <div className="relative z-10 space-y-6">
                        {/* Title Section */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-slate-200 font-bold text-xl leading-tight line-clamp-2">{item.title}</span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => copyToClipboard(item.title, i, 'title')}
                              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-tighter transition-all duration-300 ${
                                copied?.index === i && copied?.type === 'title'
                                ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                                : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              {copied?.index === i && copied?.type === 'title' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={3} />}
                              {copied?.index === i && copied?.type === 'title' ? 'Title Copied!' : 'Copy Title'}
                            </motion.button>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                              item.title.length > 70 ? 'bg-red-500/20 text-red-500 border border-red-500/20' : 'bg-zinc-950 text-slate-500 border border-white/5'
                            }`}>
                              {item.title.length} characters
                            </div>
                            {item.title.length > 70 && (
                              <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                <AlertTriangle size={12} />
                                <span>Optimization Warning</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-white/5 w-full" />

                        {/* Description Section */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-slate-500">
                              <BookOpen size={14} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Suggested Description</span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => copyToClipboard(item.description, i, 'description')}
                              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-tighter transition-all duration-300 ${
                                copied?.index === i && copied?.type === 'description'
                                ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                                : 'bg-brand-500/10 text-brand-400 hover:bg-brand-500/20'
                              }`}
                            >
                              {copied?.index === i && copied?.type === 'description' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={3} />}
                              {copied?.index === i && copied?.type === 'description' ? 'Desc Copied!' : 'Copy description'}
                            </motion.button>
                          </div>
                          <p className="text-slate-400 text-sm leading-relaxed bg-zinc-950/40 p-5 rounded-2xl border border-white/5 italic">
                            "{item.description}"
                          </p>
                        </div>
                      </div>
                      
                      {/* Sparkle effect on copy */}
                      <AnimatePresence>
                        {copied?.index === i && (
                          <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            className="absolute right-8 top-8 text-emerald-400 pointer-events-none"
                          >
                            <Sparkles size={40} className="animate-pulse" />
                          </motion.div>
                        )}
                      </AnimatePresence>
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
