import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Search, 
  Monitor, 
  Smartphone, 
  Copy, 
  Check, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Hash,
  Sparkles,
  Wifi,
  BatteryMedium,
  Signal,
  RefreshCw,
  Loader2,
  List,
  Type
} from 'lucide-react';
import { generateTitleVariations, generateTitleSuggestions } from '../../services/geminiService';

const TitleGenerator = () => {
  const [url, setUrl] = React.useState('');
  const [keyword, setKeyword] = React.useState('');
  const [urlError, setUrlError] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [device, setDevice] = React.useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = React.useState(false);
  const [faviconError, setFaviconError] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [variations, setVariations] = React.useState<any[]>([]);
  const [selectedVariation, setSelectedVariation] = React.useState<number | null>(null);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const getSuggestions = async () => {
    if (!title || title.length < 5) return;
    setIsAnalyzing(true);
    try {
      const data = await generateTitleSuggestions(title);
      setSuggestions(data);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerate = async () => {
    if (!keyword) return;
    setIsGenerating(true);
    try {
      const data = await generateTitleVariations(keyword);
      setVariations(data);
    } catch (error) {
      console.error('Failed to generate titles:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyVariation = (v: any, index: number) => {
    setTitle(v.title);
    setDescription(v.description);
    setSelectedVariation(index);
  };

  const TITLE_IDEAL_MIN = 30;
  const TITLE_IDEAL_MAX = 60;
  const DESC_IDEAL_MIN = 120;
  const DESC_IDEAL_MAX = 160;

  const getDomain = (inputUrl: string) => {
    try {
      const u = new URL(inputUrl.startsWith('http') ? inputUrl : 'https://' + inputUrl);
      return u.hostname.replace('www.', '');
    } catch {
      return 'yoursite.com';
    }
  };

  const getPath = (inputUrl: string) => {
    try {
      const u = new URL(inputUrl.startsWith('http') ? inputUrl : 'https://' + inputUrl);
      const parts = u.pathname.split('/').filter(Boolean);
      const domain = u.hostname.replace('www.', '');
      return parts.length ? `${domain} › ${parts.join(' › ')}` : domain;
    } catch {
      return 'yoursite.com › your-page';
    }
  };

  const domain = getDomain(url);
  const path = getPath(url);
  const initial = domain ? domain[0].toUpperCase() : 'S';

  const validateUrl = (value: string) => {
    if (!value) {
      setUrlError('');
      return;
    }
    try {
      const u = new URL(value.startsWith('http') ? value : 'https://' + value);
      const parts = u.hostname.split('.');
      // Basic check for TLD existence
      if (parts.length < 2 || parts[parts.length - 1].length < 2) {
        throw new Error();
      }
      setUrlError('');
    } catch {
      setUrlError('Invalid URL format (e.g. example.com)');
    }
  };

  React.useEffect(() => {
    setFaviconError(false);
  }, [domain]);

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  const [showTitleTips, setShowTitleTips] = React.useState(false);
  const [showDescTips, setShowDescTips] = React.useState(false);

  const renderFavicon = (containerSize: string, textSize: string) => {
    if (faviconError || !url || domain === 'yoursite.com') {
      return (
        <div className={`${containerSize} rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-slate-600 shrink-0`}>
          <Globe className={textSize === 'text-[6px]' ? 'w-2 h-2' : 'w-3.5 h-3.5'} />
        </div>
      );
    }
    return (
      <img 
        src={faviconUrl} 
        alt=""
        onError={() => setFaviconError(true)}
        referrerPolicy="no-referrer"
        className={`${containerSize} rounded-sm object-contain shrink-0`}
      />
    );
  };

  const titleStatus = title.length === 0 ? 'empty' : title.length < TITLE_IDEAL_MIN ? 'short' : title.length <= TITLE_IDEAL_MAX ? 'perfect' : 'long';
  const descStatus = description.length === 0 ? 'empty' : description.length < DESC_IDEAL_MIN ? 'short' : description.length <= DESC_IDEAL_MAX ? 'perfect' : 'long';

  const copyMetaTags = () => {
    const metaHtml = `<title>${title || 'Your Page Title'}</title>\n<meta name="description" content="${description || 'Your meta description'}">`;
    navigator.clipboard.writeText(metaHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTruncatedTitle = (text: string, isMobile: boolean = false) => {
    const display = text || 'Your page title will appear here';
    const limit = isMobile ? 70 : 60;
    if (display.length > limit) {
      return (
        <span>
          {display.slice(0, limit - 3)}<span className={isMobile ? "" : "text-amber-600 font-bold"}>...</span>
        </span>
      );
    }
    return display;
  };

  const renderTruncatedDescription = (text: string, isMobile: boolean = false) => {
    const defaultText = isMobile 
      ? 'Your meta description will appear here. Mobile previews highlight the first 120 characters most clearly.'
      : 'Your meta description will appear here. Make it compelling to improve click-through rates from search results.';
    
    const display = text || defaultText;
    const limit = isMobile ? 120 : 160;
    
    if (display.length > limit) {
      return (
        <span>
          {display.slice(0, limit - 3)}<span className={isMobile ? "" : "text-amber-600 font-bold"}>...</span>
        </span>
      );
    }
    return display;
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto space-y-12 mb-20 overflow-x-hidden">
      {/* 🚀 SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Free SERP Preview Tool",
          "description": "Visualize how your meta title and description appear in Google search results with our free preview tool.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Tools", "item": "https://seoscore.site/tools" },
              { "@type": "ListItem", "position": 2, "name": "SERP Preview Tool", "item": "https://seoscore.site/tools/serp-preview" }
            ]
          }
        })}
      </script>

      {/* Header */}
      <div className="space-y-4 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2"
        >
          <Globe size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">SERP PREVIEW</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Google SERP Preview Tool
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          Dekhein ki aapka page Google Search Result mein kaisa dikhta hai. Clicks aur CTR badhane ke liye optimize karein.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Inputs */}
        <div className="xl:col-span-5 space-y-6 order-2 xl:order-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-900 border border-white/5 rounded-3xl p-6 shadow-xl space-y-6 sticky top-8"
          >
            {/* AI Generator Input */}
            <div className="space-y-3 p-4 bg-brand-500/5 border border-brand-500/10 rounded-2xl">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 flex items-center gap-2">
                <Sparkles size={12} /> AI Title Generator
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter Keyword (e.g. SEO Tips 2026)"
                    className="w-full bg-zinc-950/50 pl-10 pr-4 py-2.5 rounded-xl border border-white/5 outline-none focus:border-brand-500/30 text-white text-xs"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !keyword}
                  className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-brand-500/20 active:scale-95"
                >
                  {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Page URL</label>
                <AnimatePresence mode="wait">
                  {urlError ? (
                    <motion.span 
                      key="error"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -5 }}
                      className="text-[10px] text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded flex items-center gap-1"
                    >
                      <AlertTriangle size={10} />
                      {urlError}
                    </motion.span>
                  ) : url.length > 0 && (
                    <motion.span 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -5 }}
                      className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1"
                    >
                      <CheckCircle2 size={10} />
                      Valid URL
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  validateUrl(e.target.value);
                }}
                placeholder="https://yoursite.com/your-page"
                className={`w-full bg-zinc-950/50 px-4 py-3 rounded-xl border outline-none transition-all text-white placeholder:text-slate-700 text-sm ${
                  urlError ? 'border-red-500/50 focus:border-red-500' : 
                  url.length > 0 ? 'border-emerald-500/30 focus:border-emerald-500/50' :
                  'border-white/10 focus:border-blue-500/50'
                }`}
              />
            </div>

            <div className="space-y-2 relative">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Meta Title</label>
                <motion.div 
                  animate={titleStatus === 'long' ? { scale: [1, 1.05, 1] } : {}}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded-lg transition-all border ${
                    titleStatus === 'perfect' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    titleStatus === 'long' ? 'bg-red-500 text-white border-red-600 shadow-lg shadow-red-900/40' :
                    titleStatus === 'short' && title.length > 0 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    'bg-zinc-800/50 text-slate-500 border-white/5'
                  }`}
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.1em]">
                    {titleStatus === 'perfect' ? 'Ideal' : 
                     titleStatus === 'long' ? 'Too Long' : 
                     titleStatus === 'short' ? 'Too Short' : 'Empty'}
                  </span>
                  <div className={`w-1 h-1 rounded-full ${
                    titleStatus === 'perfect' ? 'bg-emerald-500 animate-pulse' :
                    titleStatus === 'long' ? 'bg-white' :
                    titleStatus === 'short' ? 'bg-amber-500' : 'bg-slate-600'
                  }`} />
                  <span className="text-[10px] font-bold tabular-nums">
                    {title.length} / 60
                  </span>
                </motion.div>
              </div>
              
              <AnimatePresence>
                {showTitleTips && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute z-20 bottom-full left-0 right-0 mb-3 bg-zinc-800 border border-white/10 rounded-2xl p-4 shadow-2xl pointer-events-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <Sparkles size={16} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white">Title Best Practices</p>
                        <ul className="text-[10px] text-slate-400 space-y-1 leading-relaxed">
                          <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-emerald-500" /> Keep it between 50–60 characters</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-emerald-500" /> Place primary keyword near the beginning</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-emerald-500" /> Include your brand name if possible</li>
                        </ul>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 left-6 w-2 h-2 bg-zinc-800 border-r border-b border-white/10 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                type="text"
                value={title}
                onFocus={() => setShowTitleTips(true)}
                onBlur={() => setShowTitleTips(false)}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value.length === 0) setSuggestions([]);
                }}
                placeholder="Enter your page title here..."
                maxLength={100}
                className={`w-full bg-zinc-950/50 px-4 py-3 rounded-xl border outline-none transition-all text-white placeholder:text-slate-700 text-sm ${
                  titleStatus === 'perfect' ? 'border-emerald-500/30 focus:border-emerald-500/50' :
                  titleStatus === 'long' ? 'border-red-500/30 focus:border-red-500/50' :
                  titleStatus === 'short' && title.length > 0 ? 'border-amber-500/30 focus:border-amber-500/50' :
                  'border-white/10 focus:border-blue-500/50'
                }`}
              />
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((title.length / 60) * 100, 100)}%` }}
                  className={`h-full ${
                    titleStatus === 'perfect' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                    titleStatus === 'long' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                    'bg-amber-500'
                  }`}
                />
              </div>

              {/* Smart Suggestions */}
              {title.length > 5 && (
                <div className="mt-3">
                  <button
                    onClick={getSuggestions}
                    disabled={isAnalyzing}
                    className="w-full py-2.5 rounded-xl border border-brand-500/20 bg-brand-500/5 text-brand-400 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-500/10 transition-all disabled:opacity-50 shadow-sm"
                  >
                    {isAnalyzing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    {isAnalyzing ? 'Analyzing Title...' : 'Get SEO Tips for Title'}
                  </button>
                </div>
              )}

              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-brand-500/5 border border-brand-500/10 rounded-xl space-y-2 mt-2"
                  >
                    <p className="text-[8px] font-black uppercase tracking-widest text-brand-400">SEO Improvements</p>
                    <div className="space-y-1.5">
                      {suggestions.map((s, i) => (
                        <div key={i} className="flex gap-2 text-[10px] text-slate-300 leading-tight">
                          <span className="text-brand-500 font-bold">•</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2 relative">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Meta Description</label>
                <motion.div 
                  animate={descStatus === 'long' ? { scale: [1, 1.05, 1] } : {}}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded-lg transition-all border ${
                    descStatus === 'perfect' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    descStatus === 'long' ? 'bg-red-500 text-white border-red-600 shadow-lg shadow-red-900/40' :
                    descStatus === 'short' && description.length > 0 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    'bg-zinc-800/50 text-slate-500 border-white/5'
                  }`}
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.1em]">
                    {descStatus === 'perfect' ? 'Ideal Length' : 
                     descStatus === 'long' ? 'Too Long' : 
                     descStatus === 'short' ? 'Too Short' : 'Empty'}
                  </span>
                  <div className={`w-1 h-1 rounded-full ${
                    descStatus === 'perfect' ? 'bg-emerald-500 animate-pulse' :
                    descStatus === 'long' ? 'bg-white' :
                    descStatus === 'short' ? 'bg-amber-500' : 'bg-slate-600'
                  }`} />
                  <span className="text-[10px] font-bold tabular-nums">
                    {description.length} / 160
                  </span>
                </motion.div>
              </div>

              <AnimatePresence>
                {showDescTips && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute z-20 bottom-full left-0 right-0 mb-3 bg-zinc-800 border border-white/10 rounded-2xl p-4 shadow-2xl pointer-events-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        <Sparkles size={16} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white">Description Best Practices</p>
                        <ul className="text-[10px] text-slate-400 space-y-1 leading-relaxed">
                          <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-emerald-500" /> Aim for 150–160 characters</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-emerald-500" /> Use a clear call-to-action (CTA)</li>
                          <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className="text-emerald-500" /> Include relevant secondary keywords</li>
                        </ul>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 left-6 w-2 h-2 bg-zinc-800 border-r border-b border-white/10 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              <textarea
                value={description}
                onFocus={() => setShowDescTips(true)}
                onBlur={() => setShowDescTips(false)}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this page is about in 150–160 characters..."
                rows={4}
                maxLength={300}
                className={`w-full bg-zinc-950/50 px-4 py-3 rounded-xl border outline-none transition-all text-white placeholder:text-slate-700 text-sm resize-none leading-relaxed ${
                  descStatus === 'perfect' ? 'border-emerald-500/30 focus:border-emerald-500/50' :
                  descStatus === 'long' ? 'border-red-500/30 focus:border-red-500/50' :
                  descStatus === 'short' && description.length > 0 ? 'border-amber-500/30 focus:border-amber-500/50' :
                  'border-white/10 focus:border-blue-500/50'
                }`}
              />
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((description.length / 160) * 100, 100)}%` }}
                  className={`h-full ${
                    descStatus === 'perfect' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                    descStatus === 'long' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                    'bg-amber-500'
                  }`}
                />
              </div>
            </div>

            {/* AI Variations List */}
            <AnimatePresence>
              {variations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-2"
                >
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <List size={12} /> Variations ({variations.length})
                  </label>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {variations.map((v, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, x: 0, transition: { delay: 0 } }}
                        onClick={() => applyVariation(v, i)}
                        className={`w-full text-left p-3 rounded-xl border transition-all group ${
                          selectedVariation === i 
                            ? 'bg-brand-500/10 border-brand-500/30 shadow-lg shadow-brand-500/5' 
                            : 'bg-zinc-950/30 border-white/5 hover:border-white/10 hover:shadow-xl'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                            v.category === 'Clickbait' ? 'bg-orange-500/10 text-orange-400' :
                            v.category === 'Listicle' ? 'bg-purple-500/10 text-purple-400' :
                            'bg-blue-500/10 text-blue-400'
                          }`}>
                            {v.category}
                          </span>
                          <span className="text-[9px] font-bold text-slate-500">{v.title.length} chars</span>
                        </div>
                        <p className="text-xs font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                          {v.title}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={copyMetaTags}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border ${
                copied 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10 text-white shadow-lg'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Meta Tags Copied!' : 'Copy Tags as HTML'}
            </button>
          </motion.div>

          <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-3xl space-y-4">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <Info size={16} className="text-blue-400" />
              Power Tip
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Google sirf letters hi nahi check karta balki pixel width bhi. Aam taur par uppercase letters zyada space lete hain isliye standard sentence case use karein.
            </p>
          </div>
        </div>

        {/* Right Column: Preview & Analysis */}
        <div className="xl:col-span-7 space-y-8 order-1 xl:order-2">
          <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-zinc-950 px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Google Snippet Preview</span>
              <div className="flex bg-zinc-900 p-1 rounded-2xl gap-1 shadow-inner border border-white/5">
                <button 
                  onClick={() => setDevice('desktop')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs ${device === 'desktop' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Monitor size={14} />
                  Desktop
                </button>
                <button 
                  onClick={() => setDevice('mobile')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs ${device === 'mobile' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Smartphone size={14} />
                  Mobile
                </button>
              </div>
            </div>

            <div className="p-4 md:p-8 bg-zinc-950/20 relative min-h-[500px] flex items-center justify-center overflow-x-auto">
              <AnimatePresence mode="wait">
                {device === 'desktop' ? (
                  <motion.div
                    key="desktop"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.01, y: -5, boxShadow: "0 30px 60px -12px rgba(0,0,0,0.25)" }}
                    className="w-full max-w-[600px] bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200 shrink-0 transition-all duration-300"
                  >
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex-1 bg-white border border-slate-200 rounded-full px-3 py-1 flex items-center gap-2">
                        {renderFavicon('w-3 h-3', 'text-[6px]')}
                        <span className="text-[10px] text-slate-400 truncate tracking-tight">{domain}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 mb-1">
                          {renderFavicon('w-7 h-7', 'text-xs')}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-[#202124] leading-tight">{domain}</span>
                            <span className="text-xs text-[#4d5156] leading-tight truncate max-w-[400px]">{path}</span>
                          </div>
                        </div>
                        <h3 className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer font-normal leading-tight font-sans">
                          {renderTruncatedTitle(title, false)}
                        </h3>
                        <p className="text-[14px] text-[#4d5156] leading-[1.58] max-w-[600px] mt-1 break-words">
                          {renderTruncatedDescription(description, false)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                    <motion.div
                    key="mobile"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.01, y: -5, boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)" }}
                    className="w-[360px] mx-auto bg-zinc-50 rounded-[3.5rem] overflow-hidden border-[10px] border-zinc-950 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] h-[760px] relative ring-1 ring-white/10 shrink-0 select-none transition-all duration-300"
                  >
                    {/* Hardware Buttons - More Realistic */}
                    <div className="absolute top-24 -left-[11px] w-[3px] h-10 bg-zinc-800 rounded-r-sm z-30" /> {/* Action Button */}
                    <div className="absolute top-40 -left-[11px] w-[3px] h-16 bg-zinc-800 rounded-r-sm z-30" /> {/* Vol Up */}
                    <div className="absolute top-60 -left-[11px] w-[3px] h-16 bg-zinc-800 rounded-r-sm z-30" /> {/* Vol Down */}
                    <div className="absolute top-44 -right-[11px] w-[3px] h-24 bg-zinc-800 rounded-l-sm z-30" /> {/* Power */}

                    {/* Antenna Bands */}
                    <div className="absolute top-16 -left-[10px] w-full h-[1px] bg-zinc-900/10 pointer-events-none" />
                    <div className="absolute bottom-16 -left-[10px] w-full h-[1px] bg-zinc-900/10 pointer-events-none" />

                    {/* Status Bar - Improved spacing */}
                    <div className="h-12 w-full bg-white flex justify-between items-end px-12 pb-2 relative z-10">
                      <span className="text-[14px] font-bold text-zinc-900 tracking-tight">9:41</span>
                      
                      {/* Dynamic Island - More Precise */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-3 h-7 w-[100px] bg-zinc-950 rounded-[1.25rem] flex items-center justify-between px-3.5 group shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                         <div className="w-[18px] h-3 bg-zinc-900/50 rounded-full" />
                         <div className="flex gap-1.5 items-center">
                            <div className="w-1 h-1 rounded-full bg-blue-500/80 animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800/80 ring-1 ring-white/10" />
                         </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-zinc-900 mb-0.5">
                        <Signal size={15} strokeWidth={2.5} />
                        <Wifi size={15} strokeWidth={2.5} />
                        <div className="w-5.5 h-2.5 border-[1.5px] border-zinc-900 rounded-[3px] p-[1px] relative flex items-center">
                          <div className="w-full h-full bg-zinc-900 rounded-[1px]" />
                          <div className="absolute -right-[3.5px] w-[2px] h-[4px] bg-zinc-900 rounded-r-full" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Browser Toolbar / URL Field - Safari Style */}
                    <div className="bg-[#f8f9fa] pt-0.5 pb-2 px-4 border-b border-slate-200/50">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-zinc-200/40 rounded-xl py-2 px-3 flex items-center gap-2">
                           <RefreshCw size={11} className="text-slate-400 rotate-90" />
                           <div className="flex-1 text-[12px] text-slate-700 font-medium truncate tracking-tight text-center">
                             {domain}
                           </div>
                           <div className="text-[10px] font-black text-slate-400 tracking-tighter">
                              AA
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Viewport Content with Correct Scaling */}
                    <div className="h-[calc(100%-100px)] overflow-y-auto scrollbar-none bg-white">
                      <div className="p-4 pb-24 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                        {/* Current Result with Premium Styling */}
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center gap-2.5">
                            <div className="p-0.5 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                              {renderFavicon('w-6 h-6', 'text-xs')}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-[#202124] leading-tight truncate">{domain}</span>
                              <span className="text-[10px] text-[#4d5156] leading-tight truncate max-w-[240px] italic">{path}</span>
                            </div>
                          </div>
                          <h3 className="text-[20px] text-[#1558d6] font-medium leading-[1.3] break-words g-title active:text-[#1a0dab] tracking-tight">
                            {renderTruncatedTitle(title, true)}
                          </h3>
                          <p className="text-[14px] text-[#4d5156] leading-[1.5] line-clamp-4 break-words g-desc font-sans">
                            {renderTruncatedDescription(description, true)}
                          </p>
                        </div>
                        
                        {/* Ad / Knowledge Panel Mock (Skeleton) */}
                        <div className="pt-2">
                           <div className="p-4 bg-slate-50/50 rounded-2xl border border-dotted border-slate-200 flex items-center gap-4 group cursor-default">
                              <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-200">
                                 <Sparkles size={20} />
                              </div>
                              <div className="space-y-1.5 flex-1">
                                 <div className="h-2 w-1/3 bg-slate-200/50 rounded" />
                                 <div className="h-2 w-3/4 bg-slate-100 rounded" />
                              </div>
                           </div>
                        </div>

                        {/* Other Results Skeleton */}
                        <div className="pt-2 space-y-8">
                          {[1, 2, 3].map((i) => (
                             <div key={i} className="space-y-3 opacity-30">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-slate-100 rounded-full" />
                                  <div className="flex flex-col gap-1">
                                    <div className="h-2 w-20 bg-slate-100 rounded" />
                                    <div className="h-1.5 w-32 bg-slate-50 rounded" />
                                  </div>
                                </div>
                                <div className="h-4 w-5/6 bg-slate-100/40 rounded-md" />
                                <div className="h-16 w-full bg-slate-50/30 rounded-xl border border-dashed border-slate-200" />
                             </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Home Indicator Safe Area */}
                    <div className="absolute bottom-1 w-full flex justify-center py-2 pointer-events-none z-20">
                      <div className="w-32 h-1.5 bg-zinc-950/20 rounded-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusCard 
                label="Title Score"
                value={title.length}
                status={titleStatus}
                ideal="50-60"
                hint={titleStatus === 'long' ? 'Too long' : titleStatus === 'short' ? 'Too short' : 'Perfect'}
            />
            <StatusCard 
                label="Meta Score"
                value={description.length}
                status={descStatus}
                ideal="120-160"
                hint={descStatus === 'long' ? 'Too long' : descStatus === 'short' ? 'Too short' : descStatus === 'perfect' ? 'Perfect' : 'Empty'}
            />
          </div>
        </div>
      </div>

      <section className="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white italic tracking-tight underline underline-offset-8 decoration-blue-500">How to write high-CTR Titles?</h2>
                <p className="text-slate-400 leading-relaxed">
                    Aapka main target keyword pehle 3 words mein hona chahiye. Aisa karne se algorithm aur user dono ko turant context mil jata hai. Numbers aur emotional hooks (e.g. "Free", "Limited", "Confirmed") use karein taaki user rukk jaaye.
                </p>
                <div className="bg-zinc-950/40 p-5 rounded-2xl border border-white/5 space-y-4">
                    {[
                        'Use power words like "Essential", "Complete Guide"',
                        'Include current year if relevant (e.g. 2026)',
                        'Keep it naturally readable, not just robotic keywords'
                    ].map((step, idx) => (
                        <div key={idx} className="flex gap-3 text-sm text-slate-300">
                             <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                             {step}
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white italic tracking-tight underline underline-offset-8 decoration-amber-500">Meta Description Secrets</h2>
                <p className="text-slate-400 leading-relaxed">
                    Description mein end mein ek "Call to Action" zaroor add karein. Jaise ki "Click here to learn more" ya "Download for free". Isse conversion rate badhta hai. Duplicate meta descriptions kabhi mat rakhein.
                </p>
                <div className="grid grid-cols-1 gap-3">
                    <div className="p-4 bg-zinc-950/50 border border-white/5 rounded-xl flex items-center gap-4 group hover:border-blue-500/30 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold group-hover:scale-110 transition-transform">1.</div>
                        <span className="text-sm text-slate-300">Target main intent clearly</span>
                    </div>
                    <div className="p-4 bg-zinc-950/50 border border-white/5 rounded-xl flex items-center gap-4 group hover:border-blue-500/30 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold group-hover:scale-110 transition-transform">2.</div>
                        <span className="text-sm text-slate-300">Address a specific pain point</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <HelpCircle className="text-blue-500" />
          Common SEO Snippet Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { q: 'Is it bad to exceed 60 chars?', a: 'Yes, because Google will likely cut it off, and sometimes users might find it unprofessional if key info is missing.' },
            { q: 'Can I use Emojis?', a: 'Yes! Emojis can increase CTR significantly, but use them sparingly and test if they display correctly in our preview.' },
            { q: 'Does URL impact snippet?', a: 'Definitely. Short, readable URLs with keywords (slugs) are more trusted by users and have better visibility.' }
          ].map((f, i) => (
            <div key={i} className="p-8 bg-zinc-900 border border-white/10 rounded-[2rem] hover:bg-zinc-800/50 transition-all">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Hash size={16} className="text-blue-500" />
                    {f.q}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                    {f.a}
                </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const StatusCard = ({ label, value, status, ideal, hint }: any) => (
    <motion.div 
        whileHover={{ scale: 1.02, y: -2 }}
        className={`p-6 rounded-3xl border transition-all cursor-default shadow-lg hover:shadow-2xl ${
        status === 'perfect' ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/10' :
        status === 'long' ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40 hover:shadow-red-500/10' :
        status === 'empty' ? 'bg-zinc-900/50 border-white/5 hover:border-white/10' :
        'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40 hover:shadow-amber-500/10'
    }`}>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">{label}</div>
        <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black italic tracking-tighter ${
                status === 'perfect' ? 'text-emerald-500' :
                status === 'empty' ? 'text-slate-400' :
                status === 'long' ? 'text-red-500' : 'text-amber-500'
            }`}>{value}</span>
            <span className="text-slate-500 text-xs font-mono">chars</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Ideal: {ideal}</div>
            <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                status === 'perfect' ? 'bg-emerald-500 text-white' :
                status === 'long' ? 'bg-red-500 text-white' :
                status === 'empty' ? 'bg-zinc-800 text-slate-500' :
                'bg-amber-500 text-white'
            }`}>{hint}</div>
        </div>
    </motion.div>
);

export default TitleGenerator;
