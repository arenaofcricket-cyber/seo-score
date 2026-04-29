import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ChevronRight, Search, Tag as TagIcon, X, Filter, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = ['SEO Basics', 'Technical SEO', 'YouTube Growth', 'Content Strategy'];
  const tags = ['Backlinks', 'Speed', 'Keywords', 'Google', 'Algorithm', 'Analytics'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      // @ts-ignore - added fields to constant but TS might be stale if it doesn't see types update yet
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      // @ts-ignore
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchQuery('');
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 overflow-x-hidden">
      {/* 🚀 SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": BLOG_POSTS.map((post) => ({
            "@type": "Article",
            "@id": `https://seoscore.site/blog/${post.id}/#article`,
            "url": `https://seoscore.site/blog/${post.id}`,
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": new Date(post.date).toISOString(),
            "author": {
              "@type": "Organization",
              "name": "SEOScore",
              "url": "https://seoscore.site"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SEOScore",
              "logo": {
                "@type": "ImageObject",
                "url": "https://seoscore.site/logo.png"
              }
            },
            "image": {
              "@type": "ImageObject",
              "url": `https://seoscore.site/blog-placeholders/${post.id}.jpg`
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
          
          {(selectedCategory || selectedTag || searchQuery) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 text-brand-400 text-sm font-bold uppercase tracking-wider bg-brand-500/10 px-4 py-2 rounded-xl border border-brand-500/20">
                <Filter size={14} /> Active Filters:
              </div>
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-xs font-bold text-white hover:bg-zinc-700 transition-colors"
                >
                  Category: {selectedCategory} <X size={12} className="text-slate-500" />
                </button>
              )}
              {selectedTag && (
                <button 
                  onClick={() => setSelectedTag(null)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-xs font-bold text-white hover:bg-zinc-700 transition-colors"
                >
                  Tag: {selectedTag} <X size={12} className="text-slate-500" />
                </button>
              )}
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-xs font-bold text-white hover:bg-zinc-700 transition-colors"
                >
                  Search: {searchQuery} <X size={12} className="text-slate-500" />
                </button>
              )}
              <button 
                onClick={clearFilters}
                className="text-xs font-bold text-slate-500 hover:text-white transition-colors underline underline-offset-4"
              >
                Clear All
              </button>
            </motion.div>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group flex flex-col h-full bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden hover:bg-zinc-900/60 transition-all hover:border-brand-500/40 hover:shadow-2xl hover:shadow-brand-500/10"
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
                    <div className="mt-auto flex items-center justify-between min-h-[40px]">
                      {/* @ts-ignore */}
                      <button 
                        onClick={() => setSelectedCategory(post.category)}
                        className="text-[9px] font-black uppercase tracking-tighter bg-zinc-800 text-slate-400 px-3 py-1.5 rounded-lg border border-white/5 hover:text-brand-400 transition-colors"
                      >
                        {/* @ts-ignore */}
                        {post.category}
                      </button>

                      <Link
                        to={`/blog/${post.id}`}
                        className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-brand-500 text-black px-4 py-2 rounded-xl transition-all duration-300 shadow-xl shadow-brand-500/20 active:scale-95"
                      >
                        Read More <ArrowRight size={14} strokeWidth={3} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4 text-slate-700">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No guides found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2 bg-brand-500 text-black font-bold rounded-xl hover:scale-105 transition-transform"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-8">
        {/* Search */}
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl shadow-xl">
          <h3 className="micro-label mb-4 text-slate-500 font-black">Search Guides</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="How to rank..."
              className="w-full bg-zinc-950 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-brand-500/50 outline-none transition-all placeholder:text-slate-700"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl shadow-xl">
          <h3 className="micro-label mb-4 text-slate-500 font-black">Categories</h3>
          <ul className="space-y-1">
            {categories.map((cat, i) => (
              <li key={i}>
                <button 
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`w-full flex items-center justify-between text-sm py-2 px-3 rounded-lg transition-all group ${
                    selectedCategory === cat 
                    ? 'bg-brand-500/10 text-brand-400 font-bold border border-brand-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                  <ChevronRight size={12} className={`transition-all ${
                    selectedCategory === cat ? 'translate-x-0' : 'opacity-0 -translate-x-2'
                  }`} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl shadow-xl">
          <h3 className="micro-label mb-4 flex items-center gap-2 text-slate-500 font-black">
             <TagIcon size={14} className="text-brand-500" /> Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1.5 border rounded-xl text-[10px] font-bold uppercase transition-all ${
                  selectedTag === tag
                  ? 'bg-brand-500 border-brand-500 text-black'
                  : 'bg-zinc-800 border-white/5 text-slate-500 hover:border-brand-500/30 hover:text-brand-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Ad Space Placeholder / Mini CTA */}
        <div className="bg-gradient-to-br from-brand-600 to-emerald-500 p-8 rounded-3xl text-center space-y-4 shadow-2xl shadow-brand-500/10">
          <h4 className="font-black text-black text-xl leading-tight italic uppercase tracking-tighter">Need a custom SEO audit?</h4>
          <p className="text-black/70 text-xs font-bold">Analyze your entire site structure now with our advanced AI tools.</p>
          <Link 
            to="/tools/seo-score-checker" 
            className="block w-full py-4 bg-black text-white font-black uppercase text-xs rounded-2xl hover:scale-[1.03] transition-transform shadow-xl"
          >
            Start Audit Now
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Blog;
