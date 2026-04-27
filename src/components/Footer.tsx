import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Globe, Hash, Youtube, Tag, Zap, Smartphone, Mail, Info, BookOpen, Shield, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerGroups = [
    {
      title: 'SEO Tools',
      links: [
        { name: 'SEO Score Checker', path: '/seo/score-checker', icon: Activity },
        { name: 'Backlink Checker', path: '/seo/backlink-checker', icon: Globe },
        { name: 'Keyword Density', path: '/seo/keyword-density', icon: Hash },
      ]
    },
    {
      title: 'YouTube SEO',
      links: [
        { name: 'Title Generator', path: '/youtube/title-generator', icon: Youtube },
        { name: 'Tag Generator', path: '/youtube/tag-generator', icon: Tag },
      ]
    },
    {
      title: 'Website Tools',
      links: [
        { name: 'Speed Checker', path: '/website/speed-checker', icon: Zap },
        { name: 'Mobile Friendly Test', path: '/website/mobile-test', icon: Smartphone },
      ]
    },
    {
      title: 'Platform',
      links: [
        { name: 'Blog', path: '/blog', icon: BookOpen },
        { name: 'About Us', path: '/about', icon: Info },
        { name: 'Contact', path: '/contact', icon: Mail },
        { name: 'Privacy Policy', path: '/privacy', icon: Shield },
      ]
    }
  ];

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
              <ShieldCheck className="text-brand-500" />
              SEOScore
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Free professional SEO tools to analyze, optimize, and improve your website and YouTube rankings. Built for creators and marketers.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-6">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-slate-400 hover:text-brand-400 transition-colors text-sm flex items-center gap-3 group"
                    >
                      <link.icon size={14} className="text-slate-600 group-hover:text-brand-500 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-xs font-medium">
            © {currentYear} SEOScore. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-slate-600 text-xs font-medium">
            <Link to="/privacy" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <div className="flex items-center gap-1.5 opacity-50">
              Made with <Heart size={10} className="text-red-500 fill-red-500" /> for creators
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
