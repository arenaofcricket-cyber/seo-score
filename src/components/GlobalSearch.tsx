
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Zap, ArrowRight, Activity, Hash, Youtube, Tag, Smartphone, Globe, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { TOOLS, BLOG_POSTS } from '../constants';

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Combine data for searching
  const allData = useMemo(() => {
    return [
      ...TOOLS.map(t => ({ ...t, type: 'tool' })),
      ...BLOG_POSTS.map(p => ({ ...p, type: 'blog', name: p.title }))
    ];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allData.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(q);
      const descMatch = item.type === 'tool' 
        ? (item as any).description?.toLowerCase().includes(q)
        : (item as any).excerpt?.toLowerCase().includes(q);
      return nameMatch || descMatch;
    }).slice(0, 8);
  }, [query, allData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);

      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          handleNavigate(results[selectedIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleNavigate = (item: any) => {
    const path = item.type === 'tool' ? item.path : `/blog/${item.id}`;
    navigate(path);
    setIsOpen(false);
  };

  const getIcon = (item: any) => {
    if (item.type === 'blog') return <BookOpen size={16} className="text-brand-500" />;
    switch (item.icon) {
      case 'Activity': return <Activity size={16} className="text-blue-500" />;
      case 'Hash': return <Hash size={16} className="text-orange-500" />;
      case 'Youtube': return <Youtube size={16} className="text-red-500" />;
      case 'Tag': return <Tag size={16} className="text-teal-500" />;
      case 'Zap': return <Zap size={16} className="text-yellow-500" />;
      case 'Smartphone': return <Smartphone size={16} className="text-zinc-400" />;
      case 'Globe': return <Globe size={16} className="text-indigo-400" />;
      default: return <Zap size={16} className="text-brand-500" />;
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl text-slate-500 hover:text-white hover:border-white/20 transition-all group w-full max-w-md min-w-0 overflow-hidden"
      >
        <Search size={16} className="group-hover:text-brand-500 transition-colors shrink-0" />
        <span className="text-xs md:text-sm font-medium truncate">Search...</span>
        <div className="ml-auto hidden sm:flex items-center gap-1 shrink-0">
          <kbd className="text-[10px] bg-zinc-950 px-1.5 py-0.5 rounded border border-white/10 font-sans">⌘</kbd>
          <kbd className="text-[10px] bg-zinc-950 px-1.5 py-0.5 rounded border border-white/10 font-sans">K</kbd>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/5 flex items-center gap-4">
                <Search size={20} className="text-brand-500" />
                <input 
                  ref={inputRef}
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search resources..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-600 font-medium"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {query.trim() === '' ? (
                  <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-zinc-800 mb-6 text-brand-500">
                      <Layout size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Search SEOScore</h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">Quickly find SEO tools, YouTube generators, and learning resources.</p>
                    
                    <div className="grid grid-cols-2 gap-3 mt-8">
                       {TOOLS.slice(0, 4).map(tool => (
                         <button 
                          key={tool.id}
                          onClick={() => handleNavigate({...tool, type: 'tool'})}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-800/50 border border-white/5 hover:bg-zinc-800 hover:border-brand-500/30 transition-all text-left group"
                         >
                           <div className="shrink-0 p-2 rounded-xl bg-zinc-900 group-hover:bg-brand-500/10 transition-colors">
                             {getIcon({...tool, type: 'tool'})}
                           </div>
                           <span className="text-xs font-bold text-slate-300 group-hover:text-white truncate">{tool.name}</span>
                         </button>
                       ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((item: any, i) => (
                      <button
                        key={item.id}
                        onMouseEnter={() => setSelectedIndex(i)}
                        onClick={() => handleNavigate(item)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${
                          selectedIndex === i ? 'bg-brand-500/10 border border-brand-500/20' : 'border border-transparent hover:bg-white/5'
                        }`}
                      >
                        <div className={`p-3 rounded-xl transition-colors ${
                          selectedIndex === i ? 'bg-brand-500/20' : 'bg-zinc-800 group-hover:bg-zinc-700'
                        }`}>
                          {getIcon(item)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-bold text-base truncate">{item.name}</span>
                            <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${
                              item.type === 'tool' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
                            }`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-slate-500 text-xs truncate">
                            {item.type === 'tool' ? (item as any).description : (item as any).excerpt}
                          </p>
                        </div>
                        {selectedIndex === i && (
                          <motion.div layoutId="arrow" className="text-brand-500">
                            <ArrowRight size={18} />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-500">
                    <p className="font-medium">No results found for "{query}"</p>
                    <p className="text-xs mt-2 italic">Try a different keyword or explore our blog.</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-zinc-950 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5"><kbd className="bg-zinc-800 border border-white/10 px-1 rounded text-slate-400 font-sans">Enter</kbd> Select</span>
                  <span className="flex items-center gap-1.5"><kbd className="bg-zinc-800 border border-white/10 px-1 rounded text-slate-400 font-sans">↑↓</kbd> Navigate</span>
                  <span className="flex items-center gap-1.5"><kbd className="bg-zinc-800 border border-white/10 px-1 rounded text-slate-400 font-sans">Esc</kbd> Close</span>
                </div>
                <div className="text-brand-500/50">SEOSCORE Global Index</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalSearch;
