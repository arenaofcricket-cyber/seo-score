/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Activity, Hash, Youtube, Tag, Zap, Smartphone, 
  Menu, X, ChevronRight, Search, Globe, Shield, 
  Mail, Info, BookOpen, Clock, User, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import Home from './pages/Home';
import ScoreChecker from './pages/tools/ScoreChecker';
import KeywordDensity from './pages/tools/KeywordDensity';
import BacklinkChecker from './pages/tools/BacklinkChecker';
import TitleGenerator from './pages/tools/TitleGenerator';
import TagGenerator from './pages/tools/TagGenerator';
import SpeedChecker from './pages/tools/SpeedChecker';
import MobileTest from './pages/tools/MobileTest';
import AdsTxtValidator from './pages/tools/AdsTxtValidator';
import RenderBlockingAudit from './pages/tools/RenderBlockingAudit';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import ToolsGuide from './pages/ToolsGuide';
import NotFound from './pages/NotFound';

// Components
import Footer from './components/Footer';
import GlobalSearch from './components/GlobalSearch';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const groups = [
    {
      title: 'Platform',
      links: [
        { name: 'Dashboard', path: '/', icon: LayoutGrid },
        { name: 'Tools Guide', path: '/tools-guide', icon: BookOpen },
        { name: 'Learning Hub', path: '/blog', icon: BookOpen },
      ]
    },
    {
      title: 'SEO Tools',
      links: [
        { name: 'SEO Score Checker', path: '/tools/seo-score-checker', icon: Activity },
        { name: 'Keyword Density', path: '/tools/keyword-density', icon: Hash },
        { name: 'Backlink Checker', path: '/tools/backlink-checker', icon: Globe },
        { name: 'SERP Preview Tool', path: '/tools/serp-preview', icon: Search },
      ]
    },
    {
      title: 'YouTube Tools',
      links: [
        { name: 'Tag Generator', path: '/tools/youtube-tag-generator', icon: Tag },
      ]
    },
    {
      title: 'Infrastructure',
      links: [
        { name: 'Speed Checker', path: '/tools/website-speed-checker', icon: Zap },
        { name: 'Mobile Test', path: '/tools/mobile-test', icon: Smartphone },
      ]
    }
  ];

  const NavLink = ({ link }: { link: any }) => {
    const isActive = location.pathname === link.path;
    return (
      <Link
        to={link.path}
        onClick={() => setIsOpen(false)}
        className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
      >
        <link.icon size={18} className={isActive ? 'text-brand-400' : 'opacity-50'} />
        {link.name}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-[60] p-2 bg-zinc-900 border border-white/10 rounded-lg text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-brand-500 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-brand-500 rounded-sm"></div>
            </div>
            SEOSCORE
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="micro-label mb-4 px-2">{group.title}</p>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <NavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
          <div className="text-[10px] text-slate-600">© 2024 SEOScore Analytics</div>
        </div>
      </aside>

      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </>
  );
};

const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    if (location.pathname === '/') return 'Overview Dashboard';
    if (location.pathname.includes('seo-score-checker')) return 'SEO Score Checker';
    if (location.pathname.includes('keyword-density')) return 'Keyword Density';
    if (location.pathname.includes('serp-preview')) return 'SERP Preview Tool';
    if (location.pathname.includes('youtube-tag-generator')) return 'YT Tag Generator';
    if (location.pathname.includes('website-speed-checker')) return 'Speed Checker';
    if (location.pathname.includes('mobile-test')) return 'Mobile Friendly Test';
    if (location.pathname.includes('ads-txt-validator')) return 'Ads.txt Validator';
    if (location.pathname.includes('render-blocking-audit')) return 'Render Blocking Audit';
    if (location.pathname.includes('blog')) return 'Learning Center';
    return 'SEOScore';
  };

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-3 md:gap-6 flex-1 max-w-2xl min-w-0">
        <span className="text-white font-bold text-lg hidden lg:block tracking-tighter italic uppercase whitespace-nowrap">{getTitle()}</span>
        <div className="h-4 w-[1px] bg-white/10 hidden lg:block"></div>
        <div className="flex-1 max-w-md min-w-0">
          <GlobalSearch />
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6 ml-4 shrink-0">
        <nav className="hidden xl:flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-500">
          <Link to="/blog" className="hover:text-brand-400 transition-colors">Resources</Link>
          <Link to="/tools-guide" className="hover:text-brand-400 transition-colors">Tools Guide</Link>
        </nav>
        <div className="px-3 py-1.5 md:px-4 md:py-2 bg-brand-500 text-black rounded-xl text-[9px] md:text-[10px] uppercase font-black tracking-widest shadow-lg shadow-brand-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap">Upgrade to Pro</div>
      </div>
    </header>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 lg:ml-64 flex flex-col overflow-y-auto">
          <Header />
          <main className="flex-1 h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools-guide" element={<ToolsGuide />} />
              <Route path="/tools/seo-score-checker" element={<ScoreChecker />} />
              <Route path="/tools/keyword-density" element={<KeywordDensity />} />
              <Route path="/tools/backlink-checker" element={<BacklinkChecker />} />
              <Route path="/tools/serp-preview" element={<TitleGenerator />} />
              <Route path="/tools/youtube-tag-generator" element={<TagGenerator />} />
              <Route path="/tools/website-speed-checker" element={<SpeedChecker />} />
              <Route path="/tools/mobile-test" element={<MobileTest />} />
              <Route path="/tools/ads-txt-validator" element={<AdsTxtValidator />} />
              <Route path="/tools/render-blocking-audit" element={<RenderBlockingAudit />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
