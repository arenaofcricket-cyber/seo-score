import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-4">Contact System</h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Have questions or need custom SEO integration? Our technical support team is standing by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="bg-zinc-900 border border-white/5 p-8 rounded-3xl shadow-2xl space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="micro-label">Legal Name</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950/50 px-4 py-4 rounded-xl border border-white/10 focus:border-brand-500/50 outline-none text-white transition-all placeholder:text-slate-700"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-zinc-950/50 px-4 py-4 rounded-xl border border-white/10 focus:border-brand-500/50 outline-none text-white transition-all placeholder:text-slate-700"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="micro-label">Message Details</label>
                  <textarea
                    rows={6}
                    className="w-full bg-zinc-950/50 px-4 py-4 rounded-xl border border-white/10 focus:border-brand-500/50 outline-none text-white transition-all placeholder:text-slate-700 resize-none"
                    placeholder="How can we help optimize your project?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 group"
                >
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  Dispatch Message
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-500/5 border border-brand-500/10 p-12 rounded-3xl text-center"
              >
                <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center text-zinc-950 mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                <p className="text-slate-400">Our team will review your inquiry and respond within 24 standard business hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 micro-label text-brand-400 hover:text-brand-300 transition-colors uppercase tracking-widest"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-900/40 p-8 rounded-3xl border border-white/5">
            <h3 className="micro-label mb-8">Node Infrastructure</h3>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Technical Support', value: 'support@seopulse.ai' },
                { icon: Phone, label: 'Direct Line', value: '+1 (555) 012-3456' },
                { icon: MapPin, label: 'Headquarters', value: 'San Francisco, CA' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-brand-400 border border-white/5">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{item.label}</div>
                    <div className="text-sm font-medium text-slate-200">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-8 bg-brand-500/5 border border-brand-500/10 rounded-3xl">
             <div className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">API Integration</div>
             <p className="text-xs text-slate-400 leading-relaxed">
               Interested in our API? Standard and Enterprise plans are available for developers.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
