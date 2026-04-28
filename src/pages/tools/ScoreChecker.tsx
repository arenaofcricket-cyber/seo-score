import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Globe, Loader2, Search, CheckCircle2, XCircle, RefreshCw, Sparkles, HelpCircle, ArrowRight, BookOpen, Gauge, Hash, Link as LinkIcon, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSEOScore } from '../../services/geminiService';
import { getRealPageSpeedData } from '../../services/pageSpeedService';

const ScoreChecker = () => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loadingStep, setLoadingStep] = React.useState(0);
  const [result, setResult] = React.useState<any>(null);
  const [previewDevice, setPreviewDevice] = React.useState<'desktop' | 'mobile'>('desktop');

  React.useEffect(() => {
    document.title = "Free SEO Score Checker Tool – Analyze Website Score | SEOScore";
  }, []);

  const loadingSteps = [
    'Initializing audit engine...',
    'Scanning meta tags and structure...',
    'Checking mobile responsiveness...',
    'Analyzing content relevance...',
    'Running speed simulation...',
    'Generating SEO roadmap...'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Simulated progress for better UX
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      // 1. Try to get real performance data first
      const realData = await getRealPageSpeedData(url);
      
      // Force a minimum loading time for better UX and to show the steps
      await new Promise(r => setTimeout(r, 2000));
      
      setLoadingStep(prev => Math.min(prev + 1, loadingSteps.length - 1));

      // 2. Get AI insights (Gemini) for a deeper qualitative analysis
      const aiData = await getSEOScore(url, realData);
      
      setLoadingStep(loadingSteps.length - 1);
      await new Promise(r => setTimeout(r, 500));

      if (realData) {
        // Merge real metrics with AI recommendations
        setResult({
          score: realData.score,
          performanceScore: realData.performanceScore,
          accessibilityScore: realData.accessibilityScore,
          bestPracticesScore: realData.bestPracticesScore,
          pros: [...realData.audits.filter(a => a.score >= 0.9).map(a => a.title), ...aiData.pros].slice(0, 8),
          cons: [...realData.audits.filter(a => a.score < 0.9).map(a => `${a.title}: ${a.displayValue || ''}`), ...aiData.cons].slice(0, 8),
          recommendations: aiData.recommendations,
          metrics: realData.metrics,
          isRealData: true
        });
      } else {
        setResult(aiData);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to analyze this URL. It might be blocking automated crawlers or could be offline.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-16 mb-20">
      {/* 🚀 SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://seoscore.io/seo/score-checker/#webpage",
              "url": "https://seoscore.io/seo/score-checker",
              "name": "Free SEO Score Checker Online – Analyze Your Website SEO",
              "description": "Check your website performance with our free SEO score checker online. Get instant SEO analysis and improve your rankings today.",
              "keywords": "free seo score checker online, check seo score of website, website seo checker free, seo analyzer tool free, SEO score, website audit",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://seoscore.io/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "SEO Tools",
                    "item": "https://seoscore.io/tools-guide"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "SEO Score Checker",
                    "item": "https://seoscore.io/seo/score-checker"
                  }
                ]
              }
            },
            {
              "@type": "SoftwareApplication",
              "@id": "https://seoscore.io/seo/score-checker/#software",
              "name": "SEO Score Checker",
              "url": "https://seoscore.io/seo/score-checker",
              "operatingSystem": "Windows, macOS, Linux, Android, iOS",
              "applicationCategory": "DeveloperApplication",
              "applicationSuite": "SEOScore SEO Suite",
              "browserRequirements": "Requires JavaScript",
              "softwareVersion": "2026.1",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "1240"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@type": "HowTo",
              "name": "How to Improve Your SEO Score",
              "description": "Actionable steps to enhance your website's search engine optimization and ranking.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Optimize page speed",
                  "text": "Improve your website's loading time to enhance user experience and search rankings."
                },
                {
                  "@type": "HowToStep",
                  "name": "Use relevant keywords",
                  "text": "Research and integrate high-value keywords naturally into your content."
                },
                {
                  "@type": "HowToStep",
                  "name": "Create high-quality content",
                  "text": "Produce informative, engaging, and original content that provides value to users."
                },
                {
                  "@type": "HowToStep",
                  "name": "Build strong backlinks",
                  "text": "Acquire ethical, high-authority backlinks from reputable websites in your niche."
                },
                {
                  "@type": "HowToStep",
                  "name": "Ensure mobile-friendly design",
                  "text": "Make sure your website is responsive and functions perfectly on all mobile devices."
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is this SEO tool free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our SEO Score Checker is completely free to use."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate is the SEO score?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It provides a general overview based on key SEO factors like speed, orientation, and meta data."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use it for any website?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can analyze any public website that is accessible via standard HTTP/HTTPS."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does it improve ranking automatically?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, but it gives insights and actionable steps to help you improve your site manually."
                  }
                }
              ]
            }
          ]
        })}
      </script>

      {/* 🟢 H1 & 📌 Intro */}
      <div className="space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Free SEO Score Checker Tool</h1>
        <div className="h-1 w-20 bg-brand-500 rounded-full"></div>
        <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
          Use our **free SEO score checker online** to analyze your website performance and identify critical areas for improvement. Simply enter your website URL and get an instant SEO score along with actionable insights to **improve website seo**.
        </p>
        <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
          Search engines use hundreds of factors to rank websites. Our **website seo checker free** tool simplifies this process by providing a comprehensive audit that covers everything from technical speed to on-page elements, helping you outrank your competition.
        </p>
      </div>

      {/* ⚙️ Tool Section */}
      <section className="bg-zinc-900 shadow-2xl border border-white/5 p-8 lg:p-12 rounded-3xl space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-brand-500/10 rounded-full text-brand-500">
            <Search size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Enter your URL to check SEO score instantly</h2>
          <p className="text-slate-500 text-sm italic">Analyze your site with our **seo analyzer tool free** of charge.</p>
        </div>

        <form onSubmit={handleSubmit} className="input-container max-w-3xl mx-auto mb-8">
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
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
            {loading ? 'Analyzing...' : 'Analyze Now'}
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
              Audit complete! We've found {result.recommendations?.length || 0} optimization opportunities.
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 pt-12 border-t border-white/5"
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
                    <Activity className="text-brand-500 animate-pulse" size={32} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white transition-all duration-300">
                    {loadingSteps[loadingStep]}
                  </h3>
                  <p className="text-slate-500 text-sm">Our AI is performing a deep audit of {url}</p>
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
                      <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${loadingStep >= idx ? 'bg-brand-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${loadingStep >= idx ? 'text-slate-300' : 'text-slate-600'}`}>
                        Step {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Skeleton Result View */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-40 pointer-events-none">
                <div className="lg:col-span-2 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-800/20 border border-white/5 p-8 rounded-2xl h-48 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-4 border-zinc-700 animate-pulse" />
                    </div>
                    <div className="md:col-span-2 bg-zinc-800/20 border border-white/5 p-8 rounded-2xl h-48 space-y-4">
                      <div className="h-6 w-1/3 bg-zinc-700 rounded animate-pulse" />
                      <div className="h-4 w-full bg-zinc-700 rounded animate-pulse" />
                      <div className="h-4 w-full bg-zinc-700 rounded animate-pulse" />
                      <div className="h-4 w-2/3 bg-zinc-700 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-zinc-800/20 border border-white/5 p-4 rounded-xl h-20 animate-pulse" />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-800/20 border border-white/5 h-64 rounded-2xl p-6 space-y-4">
                      <div className="h-5 w-1/2 bg-zinc-700 rounded animate-pulse" />
                      <div className="space-y-2">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-3 w-full bg-zinc-700/50 rounded animate-pulse" />)}
                      </div>
                    </div>
                    <div className="bg-zinc-800/20 border border-white/5 h-64 rounded-2xl p-6 space-y-4">
                      <div className="h-5 w-1/2 bg-zinc-700 rounded animate-pulse" />
                      <div className="space-y-2">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-3 w-full bg-zinc-700/50 rounded animate-pulse" />)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1 bg-zinc-800/20 border border-white/5 min-h-[400px] rounded-2xl p-6 space-y-4">
                  <div className="h-6 w-1/2 bg-zinc-700 rounded animate-pulse" />
                  <div className="aspect-[4/5] bg-zinc-700/30 rounded-xl animate-pulse" />
                  <div className="h-10 w-full bg-zinc-700/50 rounded-xl animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10 pt-8 border-t border-white/5"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-800/50 border border-white/5 p-8 rounded-2xl text-center flex flex-col items-center justify-center">
                      <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-white/5"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={364.4}
                            strokeDashoffset={364.4 - (364.4 * result.score) / 100}
                            className={`${result.score >= 80 ? 'text-brand-500' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]`}
                          />
                        </svg>
                        <span className="absolute text-4xl font-display font-bold text-white">{result.score}</span>
                      </div>
                      <div className="micro-label">Overall Score</div>
                    </div>

                    <div className="md:col-span-2 bg-zinc-800/50 border border-white/5 p-8 rounded-2xl">
                      <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
                        <Sparkles size={20} className="text-brand-400" /> Improvement Tips
                      </h3>
                      <div className="space-y-4">
                        {result.recommendations.map((rec: string, i: number) => (
                          <div key={i} className="flex gap-4 text-slate-300 text-sm leading-relaxed">
                            <div className="w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <RefreshCw size={12} className="text-brand-400" />
                            </div>
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {result.isRealData && result.metrics && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'LCP', value: result.metrics.lcp, color: 'text-brand-400' },
                        { label: 'Total Blocking', value: result.metrics.fid, color: 'text-amber-400' },
                        { label: 'Speed Index', value: result.metrics.speedIndex, color: 'text-emerald-400' },
                        { label: 'CLS', value: result.metrics.cls, color: 'text-purple-400' },
                      ].map((metric, i) => (
                        <div key={i} className="bg-zinc-800/40 p-4 rounded-xl border border-white/5 text-center">
                          <div className={`text-sm font-bold ${metric.color} mb-1`}>{metric.value}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-tighter">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-800/30 p-8 rounded-2xl border border-emerald-500/10">
                      <h3 className="micro-label text-brand-400 mb-6 flex items-center gap-2">
                        <CheckCircle2 size={16} /> Points of Success
                      </h3>
                      <ul className="space-y-4 text-sm text-slate-400">
                        {result.pros.map((pro: string, i: number) => (
                          <li key={i} className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-zinc-800/30 p-8 rounded-2xl border border-red-500/10">
                      <h3 className="micro-label text-red-400 mb-6 flex items-center gap-2">
                        <XCircle size={16} /> Critical Issues
                      </h3>
                      <ul className="space-y-4 text-sm text-slate-400">
                        {result.cons.map((con: string, i: number) => (
                          <li key={i} className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 🌐 Iframe Preview Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 bg-zinc-800/50 border border-white/5 p-6 rounded-2xl flex flex-col gap-4 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        <Globe size={18} className="text-brand-500" /> Preview
                      </h3>
                      <div className="flex bg-zinc-900 p-1 rounded-lg">
                        <button 
                          onClick={() => setPreviewDevice('desktop')}
                          className={`p-1.5 rounded-md transition-all ${previewDevice === 'desktop' ? 'bg-zinc-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          <Gauge size={14} />
                        </button>
                        <button 
                          onClick={() => setPreviewDevice('mobile')}
                          className={`p-1.5 rounded-md transition-all ${previewDevice === 'mobile' ? 'bg-zinc-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          <Smartphone size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="relative w-full aspect-[4/5] bg-white rounded-xl overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center">
                      <div className={`transition-all duration-500 origin-center ${previewDevice === 'mobile' ? 'w-[375px] h-[667px]' : 'w-[1200px] h-[1500px]'}`} style={{ transform: previewDevice === 'mobile' ? 'scale(0.55)' : 'scale(0.28)' }}>
                        <iframe 
                          src={url}
                          className="w-full h-full bg-white pointer-events-none"
                          title="Site Preview"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Interaction Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-zinc-900/90 border-t border-white/5 backdrop-blur-sm">
                        <p className="text-[10px] text-slate-400 italic leading-tight">
                          View: {previewDevice === 'desktop' ? 'Desktop (1200px)' : 'Mobile (375px)'}
                        </p>
                      </div>
                    </div>

                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 w-full py-3 bg-zinc-700/50 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors group"
                    >
                      Visit Website <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 📊 What is SEO Score? */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">What is SEO Score?</h2>
          <p className="text-slate-400 leading-relaxed">
            An SEO score is a metric that evaluates how well your website adheres to search engine optimization best practices. By using a **free seo score checker online**, you can quickly identify technical errors and content gaps that might be holding your site back.
          </p>
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-xl font-bold text-white">How to Check SEO Score of Website</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Checking your score is simple: enter your link in the field above, and our engine will perform a deep scan of your metadata, structure, and responsiveness.
            </p>
            <h3 className="text-xl font-bold text-white">Why Use a Website SEO Checker Free Tool</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Paid tools can be expensive. Our **seo analyzer tool free** provides the same high-level insights into your speed and structure without any monthly subscription.
            </p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="text-brand-500" /> Why is SEO Score Important?
          </h3>
          <ul className="space-y-4">
            {[
              'Helps improve search engine rankings',
              'Identifies technical SEO issues',
              'Enhances user experience',
              'Increases organic traffic'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-300 text-sm">
                <CheckCircle2 size={18} className="text-brand-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ⚙️ How This Tool Works & 🚀 Tips to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-white/5 p-10 rounded-3xl space-y-8">
          <h2 className="text-2xl font-bold text-white">How This Tool Works</h2>
          <p className="text-slate-500 text-sm italic">Our SEO Score Checker analyzes your website based on multiple SEO factors:</p>
          <ul className="space-y-4">
            {[
              'Page speed performance',
              'Mobile responsiveness',
              'On-page SEO elements',
              'Basic technical checks'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-slate-500 text-sm">It then generates a score and suggestions for improvement.</p>
        </div>

        <div className="bg-zinc-900 border border-white/5 p-10 rounded-3xl space-y-8">
          <h2 className="text-2xl font-bold text-brand-400">Tips to Improve Your SEO Score</h2>
          <ul className="space-y-4">
            {[
              'Optimize page speed',
              'Use relevant keywords',
              'Create high-quality content',
              'Build strong backlinks',
              'Ensure mobile-friendly design'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-300">
                <RefreshCw size={16} className="text-brand-500" />
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
          Learn More About SEO Score
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/blog/what-is-seo" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">How to improve SEO score (Complete Guide)</h3>
            <p className="text-slate-500 text-sm">Discover actionable steps to boost your search presence.</p>
          </Link>
          <Link to="/blog/backlinks-beginner" className="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all group">
            <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition-colors">Understanding Domain Authority</h3>
            <p className="text-slate-500 text-sm">Learn how backlinks and authority affect your SEO score.</p>
          </Link>
        </div>
      </section>

      {/* 🔗 Related Tools */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">Internal Resources to Boost Rankings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Backlink Checker', path: '/seo/backlink-checker', icon: Globe, desc: 'Analyze your authority links' },
            { name: 'Website Speed Checker', path: '/website/speed-checker', icon: Zap, desc: 'Optimize your loading times' },
            { name: 'Keyword Density Tool', path: '/seo/keyword-density', icon: Hash, desc: 'Balance your content keywords' },
          ].map((tool, i) => (
            <Link 
              key={i} 
              to={tool.path}
              className="p-6 bg-zinc-900 border border-white/5 rounded-2xl flex flex-col gap-4 hover:border-brand-500/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg text-brand-500 group-hover:bg-brand-500 group-hover:text-black transition-colors">
                  <tool.icon size={18} />
                </div>
                <span className="text-white font-bold">{tool.name}</span>
              </div>
              <p className="text-xs text-slate-500">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ❓ FAQs */}
      <section className="bg-zinc-900 border border-white/5 rounded-3xl p-10 space-y-12 shadow-2xl">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <HelpCircle className="text-brand-500" /> FAQs
        </h2>
        <div className="divide-y divide-white/5">
          {[
            { q: 'Is this SEO tool free?', a: 'Yes, our SEO Score Checker is completely free to use.' },
            { q: 'How accurate is the SEO score?', a: 'It provides a general overview based on key SEO factors like speed, orientation, and meta data.' },
            { q: 'Can I use it for any website?', a: 'Yes, you can analyze any public website that is accessible via standard HTTP/HTTPS.' },
            { q: 'Does it improve ranking automatically?', a: 'No, but it gives insights and actionable steps to help you improve your site manually.' }
          ].map((faq, i) => (
            <div key={i} className="py-8 first:pt-0 last:pb-0 group">
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">Q: {faq.q}</h3>
              <p className="text-slate-500 leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📢 Final CTA */}
      <section className="bg-brand-500 rounded-3xl p-12 text-center space-y-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <h2 className="text-3xl font-bold text-black relative z-10">
          Start using our **free SEO analyzer tool now** and <br /> see the difference in your search rankings.
        </h2>
        <div className="flex justify-center relative z-10">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-5 bg-black text-white font-bold rounded-xl shadow-2xl flex items-center gap-2 hover:scale-105 transition-all"
          >
            Start Check SEO Score <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ScoreChecker;
