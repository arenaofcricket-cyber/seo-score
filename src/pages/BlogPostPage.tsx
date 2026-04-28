import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { BLOG_POSTS } from '../constants';

const BlogPostPage = () => {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) return <div className="text-center py-24 text-slate-500 font-mono text-sm">HTTP 404: Post Not Found</div>;

  return (
    <div className="p-8 lg:p-12 max-w-3xl mx-auto">
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-400 mb-12 uppercase tracking-widest transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Learning Center
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header className="mb-12">
          <div className="flex items-center gap-4 text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-6">
            <span className="flex items-center gap-1"><Calendar size={14} className="text-brand-500/50" /> {post.date}</span>
            <span className="flex items-center gap-1"><User size={14} className="text-brand-500/50" /> {post.author}</span>
            {/* @ts-ignore */}
            <span className="px-2 py-0.5 bg-brand-500/10 text-brand-400 rounded-md border border-brand-500/20">{post.category}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 p-4 bg-zinc-900 border border-white/5 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-slate-500">
              <User size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{post.author}</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Lead Content Strategist</div>
            </div>
          </div>
        </header>

        <div className="markdown-body prose prose-invert prose-emerald max-w-none text-slate-300 space-y-6 text-lg leading-relaxed">
          <Markdown
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-bold text-white pt-8 pb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-3xl font-bold text-white pt-6 pb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-2xl font-bold text-white pt-4 pb-2">{children}</h3>,
              a: ({ href, children }) => (
                <Link to={href || '#'} className="text-brand-400 hover:text-brand-300 underline decoration-brand-500/30 underline-offset-4 font-bold decoration-2">
                  {children}
                </Link>
              ),
              p: ({ children }) => <p className="mb-6">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6">{children}</ol>,
            }}
          >
            {post.content}
          </Markdown>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {/* @ts-ignore */}
            {post.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-zinc-900 border border-white/5 rounded-lg text-[10px] uppercase font-bold text-slate-500">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
               <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest font-mono">End of Article</span>
            </div>
            <button className="p-3 bg-white/5 rounded-full text-slate-500 hover:text-brand-400 hover:bg-brand-500/10 transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPostPage;
