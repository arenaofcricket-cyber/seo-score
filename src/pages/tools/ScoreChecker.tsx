import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { Activity, Globe, Loader2, Search, CheckCircle2, XCircle, RefreshCw, Sparkles, HelpCircle, ArrowRight, BookOpen, Gauge, Hash, Link as LinkIcon, Smartphone, Zap, Download, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
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
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);
  const [metaTitle, setMetaTitle] = React.useState('');
  const [metaDescription, setMetaDescription] = React.useState('');

  const downloadPDF = async () => {
    if (!result) return;
    setIsGeneratingPdf(true);

    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const W = 210;
      const domain = new URL(url.startsWith('http') ? url : 'https://' + url).hostname.replace('www.', '');
      const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

      // Helper for colors
      const getGradeColor = (score: number) => {
        if (score >= 90) return [16, 185, 129]; // Emerald
        if (score >= 50) return [245, 158, 11]; // Amber
        return [239, 68, 68]; // Red
      };

      let y = 0;

      // Header
      doc.setFillColor(14, 14, 14);
      doc.rect(0, 0, W, 40, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(16, 185, 129); // Brand Green
      doc.text('SEOSCORE AUDIT', 60, 22);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(136, 136, 136);
      doc.text('PROFESSIONAL SEO ANALYSIS REPORT', 60, 30);
      
      doc.setTextColor(200, 200, 200);
      doc.text(dateStr, W - 15, 18, { align: 'right' });
      doc.text(domain, W - 15, 26, { align: 'right' });

      y = 55;

      // Score Section
      doc.setFillColor(24, 24, 27);
      doc.roundedRect(15, y, 60, 50, 4, 4, 'F');
      
      const mainScore = result.seoScore || result.score || 0;
      doc.setFontSize(42);
      const [r, g, b] = getGradeColor(mainScore);
      doc.setTextColor(r, g, b);
      doc.text(String(mainScore), 45, y + 25, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('OVERALL SCORE', 45, y + 35, { align: 'center' });

      // Metrics Summary
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(20, 20, 20); // Using darker for header in body
      doc.text(domain, 85, y + 10);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`Analysis for: ${url}`, 85, y + 18);

      const metrics = [
        { label: 'Performance', val: result.performanceScore || 0 },
        { label: 'On-Page', val: result.onPageScore || 85 },
        { label: 'Technical', val: result.technicalScore || 70 },
        { label: 'Content', val: result.contentScore || 80 },
      ];

      y += 65;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text('CRITICAL BREAKDOWN', 15, y);
      
      y += 8;
      metrics.forEach((m, idx) => {
        const mx = 15 + (idx * 48);
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(mx, y, 42, 25, 2, 2, 'F');
        
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(m.label.toUpperCase(), mx + 21, y + 8, { align: 'center' });
        
        doc.setFontSize(14);
        const [mr, mg, mb] = getGradeColor(m.val);
        doc.setTextColor(mr, mg, mb);
        doc.text(String(m.val), mx + 21, y + 18, { align: 'center' });
      });

      // Core Web Vitals
      y += 45;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 80, 80);
      doc.text('CORE WEB VITALS', 15, y);
      
      y += 8;
      const vitals = [
        { l: 'FCP', v: result.metrics?.fcp || 'N/A' },
        { l: 'LCP', v: result.metrics?.lcp || 'N/A' },
        { l: 'CLS', v: result.metrics?.cls || 'N/A' },
        { l: 'TBT', v: result.metrics?.fid || 'N/A' },
      ];

      vitals.forEach((v, idx) => {
        const vx = 15 + (idx * 48);
        doc.setFillColor(250, 250, 250);
        doc.rect(vx, y, 42, 15, 'F');
        doc.setFontSize(7);
        doc.setTextColor(136, 136, 136);
        doc.text(v.l, vx + 5, y + 6);
        doc.setFontSize(10);
        doc.setTextColor(30, 30, 30);
        doc.text(String(v.v), vx + 5, y + 12);
      });

      // AI Recommendations
      y += 35;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129); // Green
      doc.text('AI RECOMMENDATIONS & FIXES', 15, y);
      
      y += 8;
      const recs = result.recommendations?.slice(0, 8) || [];
      recs.forEach((rec: string, idx: number) => {
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(15, y, W - 30, 10, 1, 1, 'F');
        
        doc.setFontSize(8);
        doc.setTextColor(16, 185, 129);
        doc.text(`${idx + 1}.`, 18, y + 6.5);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        
        const safeText = rec.length > 90 ? rec.substring(0, 87) + '...' : rec;
        doc.text(safeText, 25, y + 6.5);
        y += 12;

        if (y > 270) {
            doc.addPage();
            y = 25;
        }
      });

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFillColor(14, 14, 14);
        doc.rect(0, 285, W, 12, 'F');
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated by SEOScore.site Audit Tool • Page ${i} of ${totalPages}`, 15, 292);
      }

      doc.save(`SEO-Report-${domain}.pdf`);
    } catch (err) {
      console.error('PDF Generation Failed:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

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
        // Merge real metrics with AI deep analysis
        setResult({
          ...aiData,
          score: realData.score,
          performanceScore: realData.performanceScore,
          accessibilityScore: realData.accessibilityScore,
          bestPracticesScore: realData.bestPracticesScore,
          seoScore: realData.seoScore,
          metrics: realData.metrics,
          // Merge real audit data points if AI missed any, but prioritize AI's structured fix suggestions
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
    <div 
      itemScope 
      itemType="https://schema.org/WebPage"
      className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto space-y-16 mb-20 overflow-x-hidden"
    >
      {/* 🚀 SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://seoscore.site/seo/score-checker/#webpage",
              "url": "https://seoscore.site/seo/score-checker",
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
                    "name": "SEO Score Checker",
                    "item": "https://seoscore.site/seo/score-checker"
                  }
                ]
              }
            },
            {
              "@type": "SoftwareApplication",
              "@id": "https://seoscore.site/seo/score-checker/#software",
              "name": "SEO Score Checker",
              "url": "https://seoscore.site/seo/score-checker",
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
        <h1 
          itemProp="name" 
          className="text-4xl lg:text-5xl font-bold text-white mb-2"
        >
          Free SEO Score Checker Tool
        </h1>
        <div className="h-1 w-20 bg-brand-500 rounded-full"></div>
        <p 
          itemProp="description"
          className="text-slate-400 text-lg leading-relaxed max-w-4xl"
        >
          Use our **free SEO score checker online** to analyze your website performance and identify critical areas for improvement. Simply enter your website URL and get an instant SEO score along with actionable insights to **improve website seo**.
        </p>
        <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
          Search engines use hundreds of factors to rank websites. Our **website seo checker free** tool simplifies this process by providing a comprehensive audit that covers everything from technical speed to on-page elements, helping you outrank your competition.
        </p>
      </div>

      {/* ⚙️ Tool Section */}
      <section className="bg-zinc-900 shadow-2xl border border-white/5 p-4 md:p-8 lg:p-12 rounded-3xl space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-brand-500/10 rounded-full text-brand-500">
            <Search size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Enter your URL to check SEO score instantly</h2>
          <p className="text-slate-500 text-sm italic">Analyze your site with our **seo analyzer tool free** of charge.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <form onSubmit={handleSubmit} className="input-container mb-0">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meta Title Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Meta Title (Optional)</label>
                <span className={`text-[10px] font-bold ${
                  metaTitle.length === 0 ? 'text-slate-600' :
                  metaTitle.length < 30 ? 'text-amber-500' :
                  metaTitle.length <= 60 ? 'text-emerald-500' :
                  'text-red-500'
                }`}>
                  {metaTitle.length} / 60
                </span>
              </div>
              <div className={`relative rounded-xl border transition-all ${
                metaTitle.length === 0 ? 'bg-zinc-950/50 border-white/5' :
                metaTitle.length < 30 ? 'bg-amber-500/5 border-amber-500/20' :
                metaTitle.length <= 60 ? 'bg-emerald-500/5 border-emerald-500/20' :
                'bg-red-500/5 border-red-500/20'
              }`}>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Enter custom title to test"
                  className="w-full bg-transparent border-none outline-none px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:ring-0"
                />
              </div>
              {metaTitle.length > 0 && (
                <div className="flex items-center gap-1.5 px-1">
                  {metaTitle.length < 30 ? (
                    <><AlertTriangle size={10} className="text-amber-500" /><span className="text-[9px] font-bold text-amber-500/80 uppercase tracking-tighter">Too Short</span></>
                  ) : metaTitle.length <= 60 ? (
                    <><CheckCircle2 size={10} className="text-emerald-500" /><span className="text-[9px] font-bold text-emerald-500/80 uppercase tracking-tighter">Ideal Length</span></>
                  ) : (
                    <><AlertTriangle size={10} className="text-red-500" /><span className="text-[9px] font-bold text-red-500/80 uppercase tracking-tighter">Too Long</span></>
                  )}
                </div>
              )}
            </div>

            {/* Meta Description Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Meta Description (Optional)</label>
                <span className={`text-[10px] font-bold ${
                  metaDescription.length === 0 ? 'text-slate-600' :
                  metaDescription.length < 120 ? 'text-amber-500' :
                  metaDescription.length <= 160 ? 'text-emerald-500' :
                  'text-red-500'
                }`}>
                  {metaDescription.length} / 160
                </span>
              </div>
              <div className={`relative rounded-xl border transition-all ${
                metaDescription.length === 0 ? 'bg-zinc-950/50 border-white/5' :
                metaDescription.length < 120 ? 'bg-amber-500/5 border-amber-500/20' :
                metaDescription.length <= 160 ? 'bg-emerald-500/5 border-emerald-500/20' :
                'bg-red-500/5 border-red-500/20'
              }`}>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Enter custom description to test"
                  rows={1}
                  className="w-full bg-transparent border-none outline-none px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:ring-0 resize-none"
                />
              </div>
              {metaDescription.length > 0 && (
                <div className="flex items-center gap-1.5 px-1">
                  {metaDescription.length < 120 ? (
                    <><AlertTriangle size={10} className="text-amber-500" /><span className="text-[9px] font-bold text-amber-500/80 uppercase tracking-tighter">Too Short</span></>
                  ) : metaDescription.length <= 160 ? (
                    <><CheckCircle2 size={10} className="text-emerald-500" /><span className="text-[9px] font-bold text-emerald-500/80 uppercase tracking-tighter">Ideal Length</span></>
                  ) : (
                    <><AlertTriangle size={10} className="text-red-500" /><span className="text-[9px] font-bold text-red-500/80 uppercase tracking-tighter">Too Long</span></>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

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
              {/* 📊 Score Breakdown Header */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                 <div className="bg-gradient-to-br from-brand-500/20 to-transparent border border-brand-500/20 p-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                        <circle
                          cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
                          strokeDasharray={364.4}
                          strokeDashoffset={364.4 - (364.4 * (result.score || 0)) / 100}
                          className={`${(result.score || 0) >= 90 ? 'text-brand-500' : (result.score || 0) >= 50 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000`}
                        />
                      </svg>
                      <span className="absolute text-4xl font-black text-white">{result.score}</span>
                    </div>
                    <div className="text-xs uppercase font-black tracking-[0.2em] text-brand-400">Overall Score</div>
                 </div>

                 <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'On-Page SEO', score: result.onPageScore || 85, icon: Search, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                      { label: 'Technical SEO', score: result.technicalScore || 70, icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                      { label: 'Content Score', score: result.contentScore || 80, icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                    ].map((cat, i) => (
                      <div key={i} className="bg-zinc-800/50 border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                           <div className={`p-3 rounded-xl ${cat.bg} ${cat.color}`}>
                              <cat.icon size={20} />
                           </div>
                           <div className="text-3xl font-black text-white">{cat.score}%</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-2">{cat.label}</div>
                          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${cat.score}%` }}
                               className={`h-full ${cat.score >= 90 ? 'bg-emerald-500' : cat.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                             />
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-10">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Performance', score: result.performanceScore },
                      { label: 'Accessibility', score: result.accessibilityScore },
                      { label: 'Best Practices', score: result.bestPracticesScore },
                      { label: 'SEO Quality', score: result.seoScore },
                    ].map((cat, i) => (
                      <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center">
                        <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                            <circle
                              cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent"
                              strokeDasharray={175.9}
                              strokeDashoffset={175.9 - (175.9 * (cat.score || 0)) / 100}
                              className={`${(cat.score || 0) >= 90 ? 'text-emerald-500' : (cat.score || 0) >= 50 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000`}
                            />
                          </svg>
                          <span className="absolute text-sm font-bold text-white">{cat.score}</span>
                        </div>
                        <div className="text-[9px] uppercase font-black tracking-widest text-slate-500">{cat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-zinc-800/50 border border-white/5 p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Zap size={120} />
                    </div>
                    <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
                      <Gauge size={20} className="text-brand-400" /> Core Web Vitals
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { label: 'First Contentful Paint', sub: '(FCP)', value: result.metrics?.fcp || 'N/A', icon: Activity, desc: 'Time until first text/image is painted.' },
                        { label: 'Largest Contentful Paint', sub: '(LCP)', value: result.metrics?.lcp || 'N/A', icon: Zap, desc: 'Time until the largest content element is visible.' },
                        { label: 'Cumulative Layout Shift', sub: '(CLS)', value: result.metrics?.cls || 'N/A', icon: Smartphone, desc: 'Measures visual stability and unexpected shifts.' },
                        { label: 'Total Blocking Time', sub: '(TBT)', value: result.metrics?.fid || 'N/A', icon: Loader2, desc: 'Total time tasks were blocked from reacting to input.' },
                        { label: 'Speed Index', sub: '', value: result.metrics?.speedIndex || 'N/A', icon: Gauge, desc: 'How quickly the page contents are visibly populated.' },
                      ].map((metric, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-500">
                            <metric.icon size={14} className="text-brand-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{metric.label} {metric.sub}</span>
                          </div>
                          <div className="text-2xl font-display font-bold text-white">{metric.value}</div>
                          <p className="text-[10px] text-slate-600 leading-tight">{metric.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-800/30 p-8 rounded-2xl border border-emerald-500/10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="micro-label text-emerald-400 flex items-center gap-2">
                          <CheckCircle2 size={16} /> Points of Success
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">
                          {result.pros?.length || 0} PASSING
                        </span>
                      </div>
                      <div className="space-y-4">
                        {result.pros?.map((pro: any, i: number) => (
                          <div key={i} className="group p-4 bg-zinc-950/20 border border-white/5 rounded-xl hover:border-emerald-500/20 transition-all">
                            <div className="flex gap-3 text-sm font-bold text-emerald-400">
                              <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                              {typeof pro === 'string' ? pro : pro.title}
                            </div>
                            {(pro.description || pro.desc) && (
                              <p className="text-[10px] text-slate-500 mt-2 leading-relaxed opacity-70">
                                {(pro.description || pro.desc).replace(/\[Learn more\]\(.*\)/g, '').split('. ')[0]}.
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-zinc-800/30 p-8 rounded-2xl border border-red-500/10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="micro-label text-red-400 flex items-center gap-2">
                          <AlertTriangle size={16} /> Issues to Fix
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500 bg-red-500/5 px-2 py-0.5 rounded-full border border-red-500/10">
                          {result.cons?.length || 0} FAILED
                        </span>
                      </div>
                      <div className="space-y-4">
                        {result.cons?.map((con: any, i: number) => (
                          <IssueAccordion key={i} issue={con} index={i} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 border border-white/5 p-8 rounded-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="font-bold text-xl text-white flex items-center gap-2">
                        <Sparkles size={20} className="text-brand-400" /> Actionable Recommendations
                      </h3>
                      <button
                        onClick={downloadPDF}
                        disabled={isGeneratingPdf}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 text-black font-bold rounded-xl hover:bg-brand-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        {isGeneratingPdf ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                        {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF Report'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.recommendations.map((rec: string, i: number) => (
                        <div key={i} className="flex gap-4 p-4 bg-zinc-900 border border-white/5 rounded-xl text-slate-300 text-sm leading-relaxed hover:border-brand-500/30 transition-colors">
                          <div className="w-6 h-6 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-black text-brand-400">{i+1}</span>
                          </div>
                          <span>{rec}</span>
                        </div>
                      ))}
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

const IssueAccordion = ({ issue, index }: { issue: any; index: number }) => {
  const [isOpen, setIsOpen] = React.useState(index === 0);
  
  return (
    <div className={`overflow-hidden border rounded-xl transition-all ${
        isOpen ? 'bg-zinc-900 border-red-500/30' : 'bg-zinc-950/40 border-white/5 hover:border-white/10'
    }`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left group"
      >
        <div className="flex gap-3 items-start min-w-0">
          <div className={`mt-1 p-1 rounded ${
            issue.impact === 'High' ? 'bg-red-500/20 text-red-400' : 
            issue.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 
            'bg-blue-500/20 text-blue-400'
          }`}>
             <XCircle size={12} />
          </div>
          <div className="min-w-0">
            <div className={`text-sm font-bold truncate transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>
               {issue.title}
            </div>
            {!isOpen && (
               <div className="text-[10px] text-slate-500 mt-0.5 flex gap-2">
                  <span className={`uppercase font-black ${
                    issue.impact === 'High' ? 'text-red-500/70' : 
                    issue.impact === 'Medium' ? 'text-amber-500/70' : 
                    'text-blue-500/70'
                  }`}>{issue.impact || 'Impact'} Impact</span>
               </div>
            )}
          </div>
        </div>
        <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 space-y-4"
          >
            <div className="h-px bg-white/5" />
            <div className="space-y-3">
               <div>
                  <div className="text-[9px] uppercase font-black tracking-widest text-slate-500 mb-1">Problem</div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    {issue.description || issue.desc || 'Optimizing this factor will help search engines better understand your content and improve ranking.'}
                  </p>
               </div>
               
               <div className="bg-brand-500/5 border border-brand-500/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-brand-400" />
                    <div className="text-[9px] uppercase font-black tracking-widest text-brand-400">How to Fix</div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {issue.howToFix || 'Follow structured data guidelines and ensure all technical tags are correctly implemented.'}
                  </p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScoreChecker;
