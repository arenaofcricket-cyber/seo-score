import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Activity, Globe, Hash, Youtube, Tag, Zap, Smartphone, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

const ToolsGuide = () => {
  const silos = [
    {
      title: 'SEO Core Tools',
      description: 'Master your search engine rankings with our essential optimization suite.',
      icon: <Activity className="text-brand-500" />,
      tools: [
        { name: 'SEO Score Checker', path: '/tools/seo-score-checker', desc: 'Complete website audit and performance analysis.' },
        { name: 'Backlink Checker', path: '/tools/backlink-checker', desc: 'Identify and analyze your domain authority links.' },
        { name: 'Keyword Density', path: '/tools/keyword-density', desc: 'Optimize content frequency for better ranking.' },
      ]
    },
    {
      title: 'YouTube SEO Tools',
      description: 'Grow your channel faster with AI-powered video metadata generation.',
      icon: <Youtube className="text-red-500" />,
      tools: [
        { name: 'Title Generator', path: '/tools/youtube-title-generator', desc: 'Create viral, catchy titles for higher CTR.' },
        { name: 'Tag Generator', path: '/tools/youtube-tag-generator', desc: 'Generate SEO-friendly metadata for video discovery.' },
      ]
    },
    {
      title: 'Infrastructure Tools',
      description: 'Ensure your website is fast, reliable, and mobile-friendly for 2026.',
      icon: <Zap className="text-yellow-500" />,
      tools: [
        { name: 'Website Speed Checker', path: '/tools/website-speed-checker', desc: 'Analyze and improve your page load times.' },
        { name: 'Mobile Friendly Test', path: '/tools/mobile-test', desc: 'Verify your UX across all mobile devices.' },
      ]
    }
  ];

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto">
      {/* 🚀 SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://seoscore.site/tools-guide/#webpage",
              "url": "https://seoscore.site/tools-guide",
              "name": "Complete SEO Tools Guide | SEOScore",
              "description": "The ultimate directory for all our free optimization utilities. Learn how each tool works and how to combine them for maximum search engine performance.",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seoscore.site/" },
                  { "@type": "ListItem", "position": 2, "name": "Tools Guide", "item": "https://seoscore.site/tools-guide" }
                ]
              }
            },
            {
              "@type": "ItemList",
              "name": "SEO Tools Catalog",
              "numberOfItems": silos.length,
              "itemListElement": silos.map((silo, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": silo.title,
                "description": silo.description,
                "item": {
                  "@type": "ItemList",
                  "name": silo.title,
                  "numberOfItems": silo.tools.length,
                  "itemListElement": silo.tools.map((tool, tIdx) => ({
                    "@type": "ListItem",
                    "position": tIdx + 1,
                    "name": tool.name,
                    "description": tool.desc,
                    "url": `https://seoscore.site${tool.path}`
                  }))
                }
              }))
            }
          ]
        })}
      </script>

      {/* Header */}
      <div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6"
        >
          <BookOpen size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">The Complete Manual</span>
        </motion.div>
        <h1 className="text-5xl font-bold text-white mb-6">Complete SEO Tools Guide</h1>
        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
          The ultimate directory for all our free optimization utilities. Learn how each tool works and how to combine them for maximum search engine performance.
        </p>
      </div>

      {/* Silos */}
      <div className="space-y-20">
        {silos.map((silo, i) => (
          <section key={i} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-2xl">
                {silo.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">{silo.title}</h2>
                <p className="text-slate-500">{silo.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {silo.tools.map((tool, j) => (
                <motion.div
                  key={j}
                  whileHover={{ y: -5 }}
                  className="bg-zinc-900 border border-white/5 p-8 rounded-3xl group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">{tool.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
                    <Link 
                      to={tool.path} 
                      className="inline-flex items-center gap-2 text-brand-500 font-bold text-sm hover:gap-4 transition-all"
                    >
                      Open Tool <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Strategy Section */}
      <section className="mt-32 p-12 bg-zinc-900/50 border border-white/5 rounded-[3rem] space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Sparkles className="text-brand-400 mx-auto" size={32} />
          <h2 className="text-4xl font-bold text-white">How to Combine Tools for Success</h2>
          <p className="text-slate-500 text-lg">Don't just use one tool. Create a holistic optimization workflow to outperform your competitors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-brand-500" />
              Website Audit Flow
            </h3>
            <ol className="space-y-6">
              {[
                { title: 'Run an SEO Audit', text: 'Start with the Score Checker to find technical errors.' },
                { title: 'Check Site Infrastructure', text: 'Use Speed Checker and Mobile Friendly Test to fix UX.' },
                { title: 'Analyze Content', text: 'Optimize keyword density for your primary pages.' },
                { title: 'Build Authority', text: 'Use Backlink Checker to monitor growth.' }
              ].map((step, k) => (
                <li key={k} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-sm shrink-0">{k + 1}</span>
                  <div>
                    <h4 className="text-white font-bold">{step.title}</h4>
                    <p className="text-slate-500 text-sm">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Youtube className="text-red-500" />
              Video Growth Strategy
            </h3>
            <ul className="space-y-4">
              {[
                'Research trending topics for your niche.',
                'Generate a viral title using Title Generator.',
                'Optimize metadata with Tag Generator.',
                'Verify content density if you have a video transcript.'
              ].map((strategy, m) => (
                <li key={m} className="flex items-center gap-4 text-slate-300">
                  <CheckCircle2 size={18} className="text-brand-500 shrink-0" />
                  {strategy}
                </li>
              ))}
            </ul>
            <div className="p-6 bg-brand-500/5 border border-brand-500/10 rounded-2xl">
              <p className="text-sm text-slate-400 italic font-medium leading-relaxed">
                "We recommend doing keyword research first, then title generation, then metadata creation for the most consistent growth results."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-32 mb-20 text-center space-y-8">
        <h2 className="text-4xl font-bold text-white">Ready to start your journey?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/" className="px-10 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand-900/20">Go to Dashboard</Link>
          <Link to="/blog" className="px-10 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/5 rounded-2xl font-bold text-lg transition-all">Check Latest Blogs</Link>
        </div>
      </section>
    </div>
  );
};

export default ToolsGuide;
