import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ChevronRight, Search, Tag as TagIcon, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Blog = () => {
  const categories = ['SEO Basics', 'Technical SEO', 'YouTube Growth', 'Content Strategy'];
  const tags = ['Backlinks', 'Speed', 'Keywords', 'Google', 'Algorithm', 'Analytics'];

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
      {/* 🚀 SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": BLOG_POSTS.map((post) => ({
            "@type": "Article",
            "@id": `https://seoscore.io/blog/${post.id}/#article`,
            "url": `https://seoscore.io/blog/${post.id}`,
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": new Date(post.date).toISOString(),
            "author": {
              "@type": "Organization",
              "name": "SEOScore",
              "url": "https://seoscore.io"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SEOScore",
              "logo": {
                "@type": "ImageObject",
                "url": "https://seoscore.io/logo.png"
              }
            },
            "image": {
              "@type": "ImageObject",
              "url": `https://seoscore.io/blog-placeholders/${post.id}.jpg`
            }
          }))
        })}
      </script>

      <div className="flex-1">
        <header className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-4">Learning Center</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Deep dives into search engine optimization, content strategy, and digital growth.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col h-full bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:bg-zinc-900/60 transition-all hover:border-brand-500/30"
            >
              <div className="aspect-video bg-zinc-950 flex items-center justify-center overflow-hidden">
                <div className="text-white/5 transform group-hover:scale-110 transition-transform duration-500 group-hover:text-brand-500/10">
                  <BookOpen size={64} />
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} className="text-brand-500/50" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} className="text-brand-500/50" /> {post.author}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:translate-x-1 transition-transform"
                  >
                    Read Full Guide <ChevronRight size={14} className="text-brand-500" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-8">
        {/* Search */}
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
          <h3 className="micro-label mb-4">Search Guides</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="How to rank..."
              className="w-full bg-zinc-950 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-brand-500/50 outline-none transition-all"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
          <h3 className="micro-label mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat, i) => (
              <li key={i}>
                <Link to="#" className="flex items-center justify-between text-sm text-slate-400 hover:text-brand-400 transition-colors group">
                  {cat}
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
          <h3 className="micro-label mb-4 flex items-center gap-2">
             <TagIcon size={14} className="text-brand-500" /> Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <Link 
                key={i} 
                to="#" 
                className="px-3 py-1 bg-zinc-800 border border-white/5 rounded-lg text-[10px] font-bold uppercase text-slate-500 hover:border-brand-500/30 hover:text-brand-400 transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Ad Space Placeholder / Mini CTA */}
        <div className="bg-brand-500 p-8 rounded-2xl text-center space-y-4">
          <h4 className="font-bold text-black text-lg">Need a custom SEO audit?</h4>
          <p className="text-black/70 text-xs">Analyze your entire site structure now.</p>
          <Link 
            to="/seo/score-checker" 
            className="block w-full py-3 bg-black text-white font-bold rounded-xl text-xs hover:scale-105 transition-transform"
          >
            Start Audit
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Blog;
