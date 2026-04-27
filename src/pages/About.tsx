import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Zap, Globe, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-4">Precision SEO.</h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          We build technical tools for creators who value depth and performance. SEO Pulse combines advanced AI with a minimalist, non-distracting interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <h3 className="micro-label text-brand-500">The Mission</h3>
          <p className="text-slate-300 leading-relaxed">
            In an era of oversaturated content, quality is the only differentiator. Our mission is to provide you with the raw data and AI insights needed to cut through the noise and reach your audience.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="micro-label text-brand-500">Design First</h3>
          <p className="text-slate-300 leading-relaxed">
            We believe that professional software should be elegant. That's why we adopted the "Elegant Dark" aesthetic—reducing eye strain and focusing entirely on your data.
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-6">Built with Privacy in Mind</h2>
          <p className="text-slate-400 mb-8 max-w-2xl">
            Your analysis results and proprietary data are never stored or sold. We use the Gemini API to process requests in real-time, ensuring maximum security and speed.
          </p>
          <Link to="/contact" className="btn-primary inline-flex">
            Get in Touch
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default About;
