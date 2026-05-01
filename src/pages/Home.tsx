import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Activity, Zap, 
  ArrowRight, BookOpen, 
  CheckCircle2, TrendingUp, Globe, Youtube, ShieldCheck, RefreshCw,
  Gauge, Tag, ShieldAlert, Layers
} from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Home = () => {
  React.useEffect(() => {
    document.title = "Free SEO Tools Online – Analyze & Optimize Your Website | SEOScore";
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto space-y-24 mb-20 overflow-x-hidden">
      {/* 🚀 SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Free SEO Tools Online – SEOScore",
          "description": "Use free SEO tools to check website speed, backlinks, and SEO score. Improve rankings and grow your traffic easily.",
          "url": "https://seoscore.site"
        })}
      </script>

      {/* 🔥 Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 py-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold tracking-widest uppercase mb-4">
          <RefreshCw size={14} className="animate-spin-slow" />
          Updated for 2026
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
          Free SEO Tools to Boost Your Website
        </h1>
        <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
          Analyze, optimize, and improve your website performance with our powerful free SEO tools. 
          Use free SEO tools to check website speed, backlinks, and SEO score. Improve rankings and grow your traffic easily.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link to="/tools/seo-score-checker" className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
            Check SEO Score <ArrowRight size={20} />
          </Link>
          <Link to="/tools-guide" className="px-8 py-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-medium hover:bg-zinc-800 transition-all flex items-center gap-2 text-lg">
            Explore Tools
          </Link>
        </div>
      </motion.section>

      {/* 💡 Short Intro */}
      <section className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 md:p-10 lg:p-16 text-left max-w-4xl mx-auto space-y-6">
        <h2 className="text-white text-3xl font-bold">Welcome to SEOScore</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Welcome to SEOScore, your all-in-one platform for free SEO tools designed to help bloggers, marketers, and creators improve their online presence. Whether you want to rank higher on Google or grow your YouTube channel, our tools make SEO simple and effective.
        </p>
        <p className="text-slate-400 text-lg leading-relaxed">
          In today's digital landscape, having a strong search engine optimization strategy is critical for success. Search engines prioritize websites that load fast, have high-quality backlinks, and provide a great user experience. SEOScore provides the technical insights you need to meet these requirements. From our comprehensive **SEO Score Checker** to our specialized **YouTube SEO tools**, we cover every aspect of your growth.
        </p>
        <p className="text-slate-400 text-lg leading-relaxed">
          Our mission is to democratize high-level SEO data. Most professional tools cost hundreds of dollars a month, which is a barrier for small creators. At SEOScore, we believe everyone deserves a chance to rank. That is why our tools are 100% free, updated regularly, and require no login to use. Take the first step toward better rankings today by auditing your site with our performance checkers.
        </p>
      </section>

      {/* 🧰 Our Popular Tools */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Our Popular Tools</h2>
          <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              name: 'SEO Score Checker', 
              desc: 'Analyze your website’s SEO performance and get actionable insights.',
              path: '/tools/seo-score-checker',
              icon: Activity,
              color: 'text-blue-400'
            },
            { 
              name: 'Website Speed Checker', 
              desc: 'Check how fast your site loads and improve user experience.',
              path: '/tools/website-speed-checker',
              icon: Zap,
              color: 'text-amber-400'
            },
            { 
              name: 'Backlink Checker', 
              desc: 'Discover backlinks pointing to your website and boost authority.',
              path: '/tools/backlink-checker',
              icon: Globe,
              color: 'text-emerald-400'
            },
            { 
              name: 'YouTube Tag Generator', 
              desc: 'Generate SEO-friendly tags to increase video visibility.',
              path: '/tools/youtube-tag-generator',
              icon: Youtube,
              color: 'text-red-400'
            },
            { 
              name: 'Ads.txt Validator', 
              desc: 'Secure your ad revenue by validating your transparency records.',
              path: '/tools/ads-txt-validator',
              icon: ShieldAlert,
              color: 'text-brand-400'
            },
            { 
              name: 'Render Blocking Audit', 
              desc: 'Eliminate resources that slow down your critical rendering path.',
              path: '/tools/render-blocking-audit',
              icon: Layers,
              color: 'text-blue-400'
            },
          ].map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl flex flex-col justify-between group hover:bg-zinc-800/50 transition-all hover:border-brand-500/30"
            >
              <div>
                <div className={`p-3 bg-zinc-800 w-fit rounded-xl mb-6 ${tool.color}`}>
                  <tool.icon size={28} />
                </div>
                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-brand-400 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{tool.desc}</p>
              </div>
              <Link to={tool.path} className="mt-8 text-brand-500 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                {tool.name.includes('Checker') ? `Run ${tool.name}` : `Use ${tool.name}`} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🚀 Why Choose SEOScore? & 📈 How Our Tools Help You */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="bg-zinc-900/50 border border-white/5 p-10 rounded-3xl space-y-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 bg-brand-500/10 rounded-lg text-brand-500"><ShieldCheck size={24} /></span>
            Why Choose SEOScore?
          </h2>
          <ul className="space-y-4">
            {[
              '100% Free SEO Tools',
              'Beginner Friendly Interface',
              'Fast & Accurate Results',
              'No Login Required',
              'Regular Updates'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-300">
                <CheckCircle2 size={18} className="text-brand-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-zinc-900/50 border border-white/5 p-10 rounded-3xl space-y-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 bg-brand-500/10 rounded-lg text-brand-500"><TrendingUp size={24} /></span>
            How Our Tools Help You
          </h2>
          <p className="text-slate-400 text-sm italic">Using the right SEO tools can significantly improve your website ranking. Our platform helps you:</p>
          <ul className="space-y-4">
            {[
              'Identify SEO issues',
              'Improve page speed',
              'Optimize content',
              'Increase organic traffic',
              'Grow your online business'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-300">
                <CheckCircle2 size={18} className="text-brand-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 📂 Browse by Category */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <BookOpen className="text-brand-500" size={28} />
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'SEO Core Tools', count: '3 Tools', path: '/tools-guide', icon: Activity, color: 'bg-blue-500/10 text-blue-400' },
            { name: 'YouTube SEO', count: '2 Tools', path: '/tools-guide', icon: Youtube, color: 'bg-red-500/10 text-red-400' },
            { name: 'Infrastructure', count: '2 Tools', path: '/tools-guide', icon: Zap, color: 'bg-amber-500/10 text-amber-400' }
          ].map((cat, i) => (
            <Link 
              key={i} 
              to={cat.path}
              className="p-8 bg-zinc-900 border border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-brand-500/30 transition-all hover:bg-zinc-800/50"
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center`}>
                  <cat.icon size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-none mb-2">{cat.name}</h3>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">{cat.count}</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-slate-800 group-hover:text-brand-400 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* ✍️ Latest SEO Guides */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-brand-500 pl-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Latest SEO Guides</h2>
            <p className="text-slate-500 mt-2 italic font-serif">Learn SEO Step-by-Step</p>
          </div>
          <Link to="/blog" className="btn-primary text-sm px-6 py-2">Explore Blog</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden hover:bg-zinc-800/30 transition-all hover:border-white/10 group"
            >
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                  <span className="text-brand-500">Article</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-2 text-white text-xs font-bold group-hover:gap-4 transition-all">
                  Read More <ArrowRight size={14} className="text-brand-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🎯 Final CTA */}
      <section className="relative overflow-hidden bg-brand-500 rounded-3xl p-8 md:p-12 lg:p-20 text-center">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <RefreshCw size={160} />
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight underline px-2">
            Start optimizing your website today with our powerful SEO tools.
          </h2>
          <div className="flex justify-center pt-4">
            <Link 
              to="/tools/seo-score-checker" 
              className="bg-black text-white hover:bg-zinc-900 px-10 py-5 rounded-xl font-bold text-xl shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-3"
            >
              👉 Try Free Tools Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
