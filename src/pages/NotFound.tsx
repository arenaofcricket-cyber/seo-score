import React from 'react';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Search, AlertCircle, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "404 - Page Not Found | SEOScore";
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-zinc-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      
      <div className="max-w-xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-zinc-900 border border-white/5 relative group mb-6">
            <div className="absolute inset-0 bg-brand-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <AlertCircle size={48} className="text-brand-500 relative z-10" />
          </div>
          
          <h1 className="text-8xl font-black italic text-white tracking-tighter mb-4 [text-shadow:0_0_40px_rgba(255,255,255,0.1)]">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white mb-4">Lost in Cyberspace?</h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            The page you're searching for seems to have moved or doesn't exist. 
            Even our SEO bots couldn't find this one!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-3 p-4 bg-zinc-900 border border-white/5 rounded-2xl text-white font-bold hover:bg-zinc-800 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <Link 
            to="/"
            className="flex items-center justify-center gap-3 p-4 bg-brand-500 rounded-2xl text-black font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-500/20"
          >
            <Home size={18} />
            Dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <p className="micro-label mb-6">Quick Fixes</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/tools/seo-score-checker" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-400 transition-colors">
              <Sparkles size={14} /> Audit Site
            </Link>
            <Link to="/tools/serp-preview" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-400 transition-colors">
              <Search size={14} /> Preview SERP
            </Link>
            <Link to="/blog" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-brand-400 transition-colors">
              <Sparkles size={14} /> Learn SEO
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
