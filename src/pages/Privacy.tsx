import React from 'react';

const Privacy = () => {
  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-4">Privacy Standards</h1>
        <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em] mb-12">Security Protocol Version 2.0</p>
      </div>

      <div className="space-y-12 text-slate-400">
        <section>
          <h2 className="micro-label text-brand-500 mb-4 px-0">01. Data Governance</h2>
          <p className="leading-relaxed">
            All URL analysis and text processing are performed in volatile memory. No user-specific data is persisted on our core nodes beyond the active session lifetime.
          </p>
        </section>

        <section>
          <h2 className="micro-label text-brand-500 mb-4">02. Intelligence Processing</h2>
          <p className="leading-relaxed">
            We utilize the Gemini Large Language Model (LLM) for processing content requests. Your inputs are transmitted securely to Google's API infrastructure under strictly managed security tunnels and are not used for training future model iterations.
          </p>
        </section>

        <section>
          <h2 className="micro-label text-brand-500 mb-4">03. Local Storage Policy</h2>
          <p className="leading-relaxed">
            We use localized cookie storage only for critical session state and preference toggles. No third-party tracking pixels or behavioral marketing scripts are deployed on our infrastructure.
          </p>
        </section>

        <section className="p-8 bg-zinc-900 border border-white/5 rounded-2xl mt-16">
          <p className="text-slate-500 text-xs italic leading-relaxed">
            By utilizing the SEO Pulse toolkit, you acknowledge our data processing standards. We maintain a zero-trust architecture to ensure that your technical strategy remains your competitive advantage.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
