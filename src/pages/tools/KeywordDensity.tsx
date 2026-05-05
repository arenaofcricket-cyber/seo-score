import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hash, FileText, AlertTriangle, CheckCircle2, Search, TrendingUp, HelpCircle, ArrowRight, Zap, ShieldCheck, Activity, Info, Sparkles, MessageSquare, BookOpen, Loader2, List, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLSIKeywords } from '../../services/geminiService';

const KeywordDensity = () => {
  const [text, setText] = React.useState('');
  const [results, setResults] = React.useState<{word: string, count: number, density: number}[]>([]);
  const [lsiKeywords, setLsiKeywords] = React.useState<{word: string, reason: string}[]>([]);
  const [isLSILoading, setIsLSILoading] = React.useState(false);

  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const fetchLSI = async (content: string) => {
    if (content.length < 100) return;
    setIsLSILoading(true);
    try {
      const data = await getLSIKeywords(content);
      setLsiKeywords(data);
    } catch (error) {
      console.error('Failed to fetch LSI keywords:', error);
    } finally {
      setIsLSILoading(false);
    }
  };

  const analyze = () => {
    if (!text) {
      setResults([]);
      setIsAnalyzing(false);
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate slight processing delay for better UX "feel"
    setTimeout(() => {
      // Simple word regex, filtering out common short words and non-alphanumeric
      const words: string[] = text.toLowerCase().match(/\b(\w+)\b/g) || [];
      const totalWords = words.length;
      const freq: Record<string, number> = {};
      
      // Stop words to ignore (basic set)
      const stopWords = new Set(['the', 'and', 'for', 'you', 'was', 'with', 'your', 'from', 'this', 'that', 'our', 'are', 'were', 'how', 'can', 'not', 'but']);

      words.forEach(w => {
        if (w.length > 2 && !stopWords.has(w)) {
          freq[w] = (freq[w] || 0) + 1;
        }
      });

      const entries = Object.entries(freq)
        .map(([word, count]) => ({
          word,
          count,
          density: totalWords > 0 ? (count / totalWords) * 100 : 0
        }))
        .sort((a, b) => b.count - a.count);

      setResults(entries.slice(0, 15));
      setIsAnalyzing(false);
    }, 400);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => analyze(), 500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto overflow-x-hidden">
      {/* 🚀 SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://seoscore.site/seo/keyword-density/#webpage",
              "url": "https://seoscore.site/seo/keyword-density",
              "name": "Free Keyword Density Checker Tool | SEOScore",
              "description": "Analyze keyword frequency and density on any webpage. Optimizing your content's keyword density is crucial for improving visibility and search rankings on Google.",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://seoscore.site/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "SEO Tools",
                    "item": "https://seoscore.site/tools-guide"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Keyword Density Tool",
                    "item": "https://seoscore.site/seo/keyword-density"
                  }
                ]
              }
            },
            {
              "@type": "SoftwareApplication",
              "@id": "https://seoscore.site/seo/keyword-density/#software",
              "name": "Keyword Density Checker",
              "url": "https://seoscore.site/seo/keyword-density",
              "operatingSystem": "All",
              "applicationCategory": "DeveloperApplication",
              "browserRequirements": "Requires JavaScript",
              "softwareVersion": "1.2.0",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "956"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
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
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6"
        >
          <Hash size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Content SEO Tool</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
          Free Keyword Density Checker Tool
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Worried about keyword stuffing? Our Keyword Density Checker helps you analyze your content’s frequency and identify areas to optimize your SEO without overdoing it.
        </p>
      </div>

      {/* Main Tool Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-4 z-20">
              <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 px-2 py-1 rounded-full">
                {text.length > 0 ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Analyzing Live</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-slate-600" />
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Idle</span>
                  </>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <FileText size={16} className="text-brand-500" />
                  Paste your article content below
                </label>
                <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-2">
                  {text.split(/\s+/).filter(Boolean).length} Words
                </div>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your content here to begin analysis..."
                className="flex-1 w-full min-h-[300px] md:min-h-[400px] bg-zinc-950/50 px-4 md:px-6 py-4 md:py-5 rounded-2xl border border-white/10 focus:border-brand-500/50 outline-none transition-all resize-none text-slate-300 placeholder:text-slate-700 text-base md:text-lg shadow-inner leading-relaxed"
              />
              
              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 italic">
                <Info size={12} className="text-brand-400" />
                Analysis updates automatically as you type.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col">
          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl flex-1">
            <h3 className="micro-label mb-8 flex items-center gap-2">
              <TrendingUp size={14} className="text-brand-500" />
              Density Analysis (Top 15)
            </h3>
            
            <div className="relative">
              <AnimatePresence mode="popLayout">
                {results.length > 0 ? (
                  <div className={`space-y-6 transition-opacity duration-300 ${isAnalyzing ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}>
                    {results.map((res, i) => (
                      <motion.div 
                        key={res.word}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="group"
                      >
                        <div className="flex justify-between items-end text-sm mb-2.5">
                          <div className="flex flex-col">
                            <span className="font-bold text-white tracking-tight text-lg leading-none uppercase italic">{res.word}</span>
                            <span className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 uppercase">{res.count} Occurrences</span>
                          </div>
                            <span className={`font-mono text-lg ${
                              res.density > 3 ? 'text-red-500 font-black' : 
                              res.density > 2 ? 'text-amber-500' : 
                              'text-brand-400'
                            }`}>
                              {res.density.toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2.5 bg-zinc-950 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(res.density * 25, 100)}%` }}
                              className={`h-full rounded-full transition-all duration-700 ${
                                res.density > 3 
                                ? 'bg-gradient-to-r from-red-600 to-rose-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                                : res.density > 2
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                                : 'bg-gradient-to-r from-brand-600 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                              }`}
                            />
                          </div>
                          {res.density > 3 && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl mt-3">
                              <AlertTriangle size={14} className="text-red-500 animate-pulse shrink-0" />
                              <div className="flex flex-col">
                                <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">Keyword Stuffing Detected</span>
                                <p className="text-[9px] text-red-400/80 leading-tight">This word appears too frequently. Try using synonyms to improve readability and avoid Google penalties.</p>
                              </div>
                            </div>
                          )}
                          {res.density > 2 && res.density <= 3 && (
                            <div className="flex items-center gap-1.5 text-[9px] text-amber-400 mt-2 uppercase font-bold tracking-widest bg-amber-500/5 px-2 py-0.5 rounded-full w-fit border border-amber-500/10">
                              <HelpCircle size={10} /> High Density Alert
                            </div>
                          )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-30">
                    <Search size={48} className="mb-4" />
                    <p className="text-sm font-medium">Capture text to see live data</p>
                  </div>
                )}
              </AnimatePresence>
              
              {isAnalyzing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-3 bg-zinc-950/80 border border-white/5 px-4 py-2 rounded-xl backdrop-blur-sm shadow-xl">
                    <Loader2 className="animate-spin text-brand-500" size={16} />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Processing...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: results.length > 0 ? 1 : 0, scale: results.length > 0 ? 1 : 0.95 }}
            className="bg-brand-500/5 border border-brand-500/10 rounded-2xl p-6"
          >
            <h4 className="micro-label text-brand-400 mb-3 flex items-center gap-2">
              <CheckCircle2 size={12} /> Pro Tip
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aim for a primary keyword density between <strong className="text-white">1% and 2%</strong>. If you exceed 3%, Google may flag your content as "spammy." Use semantic synonyms and LSI keywords to naturally reduce primary density while strengthening topic relevance.
            </p>
          </motion.div>

          <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col min-h-[400px]">
             <div className="flex items-center justify-between mb-8">
                <h3 className="micro-label flex items-center gap-2">
                  <Lightbulb size={14} className="text-brand-500" />
                  Semantic (LSI) Suggestions
                </h3>
                {text.length >= 100 && (
                  <button 
                    onClick={() => fetchLSI(text)}
                    disabled={isLSILoading}
                    className="text-[10px] font-black uppercase tracking-widest text-brand-400 hover:text-brand-300 disabled:opacity-50 transition-colors flex items-center gap-1.5 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20"
                  >
                    {isLSILoading ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                    {lsiKeywords.length > 0 ? 'Regenerate' : 'Get Suggestions'}
                  </button>
                )}
             </div>

             <div className="flex-1 relative">
                {isLSILoading && (
                  <div className="absolute inset-0 z-20 bg-zinc-900/60 backdrop-blur-[2px] flex items-center justify-center rounded-2xl">
                     <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-brand-400" size={24} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-400">AI Analyzing Semantics...</span>
                     </div>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {lsiKeywords.length > 0 ? (
                    <motion.div 
                      key="lsi-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {lsiKeywords.map((lsi, i) => (
                        <motion.div 
                          key={lsi.word}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl group hover:border-brand-500/20 transition-all"
                        >
                           <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-500/40 group-hover:bg-brand-500 transition-colors" />
                              <span className="text-sm font-bold text-white uppercase italic">{lsi.word}</span>
                           </div>
                           <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                              {lsi.reason}
                           </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center p-8 opacity-40">
                      <div className="p-4 bg-zinc-800 rounded-full mb-4">
                        <Sparkles size={32} className="text-brand-400" />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Unlock Semantic Power</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed max-w-[200px]">
                        Add at least 100 characters of text to unlock AI-powered LSI keyword suggestions for better topical authority.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <MessageSquare size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Core Concept</span>
          </div>
          <h2 className="text-3xl font-semibold text-white">What is Keyword Density?</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            Keyword density is the percentage of times a keyword or phrase appears on a web page compared to the total number of words on that page. In the world of SEO, it's a way search engines determine the context of your content.
          </p>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <Zap size={18} className="text-yellow-400" />
              Why Density Still Matters?
            </h3>
            <ul className="space-y-4">
              {[
                'Helps Google categorize your content accurately',
                'Avoids the "Keyword Stuffing" penalty',
                'Ensures a natural flow for your human readers',
                'Identifies LSI keywords you might be overusing'
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
            <TrendingUp size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">The Strategy</span>
          </div>
          <h2 className="text-3xl font-semibold text-white">Advanced Optimization</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            Our tool analyzes your text in real-time to provide immediate feedback on your writing style and keyword focus.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: 'Real-time Calculations', text: 'Instantly updates your results as you add or remove text.', icon: Activity },
              { title: 'Stuffing Detection', text: 'Visual alerts when a specific word exceeds safe SEO limits.', icon: AlertTriangle },
              { title: 'Frequency Ranking', text: 'Identifies which words are dominating your content.', icon: Hash }
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
          Pro Tips for Better Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Use Synonyms', desc: 'Instead of repeating "SEO Tool," use "optimization software" or "ranking utility."' },
            { title: 'Focus on Intent', desc: 'Write for the user first. If the density feels high, it probably is.' },
            { title: 'Check LSI Keywords', desc: 'Ensure your secondary keywords are appearing at lower densities.' },
            { title: 'Avoid Stop Words', desc: 'Our tool automatically filters basic stop words to give you real data.' }
          ].map((tip, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-brand-500/30 transition-all">
              <h4 className="text-white font-semibold mb-2 text-sm">{tip.title}</h4>
              <p className="text-slate-400 text-[10px] leading-relaxed uppercase tracking-wider">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-white mb-10 flex items-center gap-3">
          <HelpCircle className="text-brand-400" />
          Common Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { q: 'What is a "safe" keyword density?', a: 'Most SEO experts recommend a density of 1-3%. Anything higher may trigger spam filters in the search algorithm.' },
            { q: 'Will this tool help me rank #1?', a: 'Content optimization is just one part of SEO. You also need quality backlinks, site speed, and mobile responsiveness.' },
            { q: 'Does this count exact match phrases?', a: 'This tool currently analyzes single words. We recommend checking your primary phrase manually within the text.' }
          ].map((faq, i) => (
            <div key={i} className="group relative">
              <div className="absolute -left-4 top-0 h-full w-[1px] bg-brand-500/20 group-hover:bg-brand-500 transition-colors"></div>
              <h4 className="text-white font-medium mb-3 text-lg">{faq.q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📖 Learn More (Guide) */}
      <section className="bg-brand-500/5 border border-brand-500/10 rounded-3xl p-10 space-y-6 mb-20">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <BookOpen className="text-brand-500" size={24} />
          Learn More About Optimization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/blog/what-is-seo" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">On-Page SEO Best Practices</h3>
            <p className="text-slate-500 text-sm">How to structure your content for Google.</p>
          </Link>
          <Link to="/blog/yt-seo-2026" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">Keyword Research Guide</h3>
            <p className="text-slate-500 text-sm">Find the right words to target for your niche.</p>
          </Link>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-white mb-8">Complementary Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { name: 'SEO Score Checker', path: '/seo/score-checker', icon: Activity },
            { name: 'Backlink Checker', path: '/seo/backlink-checker', icon: Search },
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
                  <p className="text-slate-500 text-xs mt-1">Audit your platform</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-slate-700 group-hover:text-brand-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-brand-600 to-emerald-800 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-brand-900/20">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.05),transparent)]"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Write Content Like a Pro</h2>
          <p className="text-brand-100 mb-10 text-lg max-w-2xl mx-auto opacity-90">
            Eliminate guesswork. Use our Keyword Density tool to create balanced, rank-worthy content today.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-4 bg-white text-brand-600 rounded-2xl font-bold text-lg hover:bg-brand-50 hover:scale-105 transition-all shadow-xl"
          >
            Start Analyzing Content
          </button>
        </div>
      </section>
    </div>
  );
};

export default KeywordDensity;
