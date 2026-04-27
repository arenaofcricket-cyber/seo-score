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
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import ToolsGuide from './pages/ToolsGuide';

// Components
import Footer from './components/Footer';

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
        { name: 'SEO Score Checker', path: '/seo/score-checker', icon: Activity },
        { name: 'Keyword Density', path: '/seo/keyword-density', icon: Hash },
        { name: 'Backlink Checker', path: '/seo/backlink-checker', icon: Globe },
      ]
    },
    {
      title: 'YouTube Tools',
      links: [
        { name: 'Title Generator', path: '/youtube/title-generator', icon: Youtube },
        { name: 'Tag Generator', path: '/youtube/tag-generator', icon: Tag },
      ]
    },
    {
      title: 'Infrastructure',
      links: [
        { name: 'Speed Checker', path: '/website/speed-checker', icon: Zap },
        { name: 'Mobile Test', path: '/website/mobile-test', icon: Smartphone },
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
    if (location.pathname.includes('score-checker')) return 'SEO Score Checker';
    if (location.pathname.includes('keyword-density')) return 'Keyword Density';
    if (location.pathname.includes('title-generator')) return 'YT Title Generator';
    if (location.pathname.includes('tag-generator')) return 'YT Tag Generator';
    if (location.pathname.includes('speed-checker')) return 'Speed Checker';
    if (location.pathname.includes('mobile-test')) return 'Mobile Friendly Test';
    if (location.pathname.includes('blog')) return 'Learning Center';
    return 'SEOScore';
  };

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <span className="text-white font-medium">{getTitle()}</span>
        <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
        <nav className="hidden md:flex gap-4 text-sm text-slate-400">
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link to="/blog/seo-guide" className="hover:text-white transition-colors">SEO Guide</Link>
          <Link to="/blog/backlinks-guide" className="hover:text-white transition-colors">Backlinks</Link>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 bg-zinc-800 rounded-full text-[10px] uppercase font-bold tracking-wider text-brand-400 border border-brand-500/20">Pro Account</div>
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
              <Route path="/seo/score-checker" element={<ScoreChecker />} />
              <Route path="/seo/keyword-density" element={<KeywordDensity />} />
              <Route path="/seo/backlink-checker" element={<BacklinkChecker />} />
              <Route path="/youtube/title-generator" element={<TitleGenerator />} />
              <Route path="/youtube/tag-generator" element={<TagGenerator />} />
              <Route path="/website/speed-checker" element={<SpeedChecker />} />
              <Route path="/website/mobile-test" element={<MobileTest />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
