import React from 'react';

const Disclaimer = () => {
  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-8 text-slate-400">
      <h1 className="text-4xl font-bold text-white mb-8">Disclaimer</h1>
      
      <p className="border-l-4 border-brand-500 pl-6 py-2 italic text-lg text-white">
        Last Updated: April 2026
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
        <p>
          The information provided by SEOScore ("we," "us," or "our") on seoscore.io (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">2. SEO Performance and Results</h2>
        <p>
          The tools and resources provided on this Site, including the SEO Score Checker, Website Speed Checker, and YouTube Optimization tools, are intended to provide insights and recommendations based on current SEO best practices. However, search engine algorithms are proprietary and change frequently. We do not guarantee that using our tools will result in a specific search engine ranking, traffic volume, or business outcome.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">3. Third-Party Data</h2>
        <p>
          Our Site may integrate with or link to third-party services like Google PageSpeed Insights or use AI models like Gemini. We are not responsible for the accuracy or reliability of any third-party data or the performance of their APIs.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">4. No Professional Advice</h2>
        <p>
          The Site cannot and does not contain SEO or marketing advice. The SEO and technical information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">5. External Links</h2>
        <p>
          The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
        </p>
      </section>

      <section className="space-y-4 pt-12 border-t border-white/5">
        <p className="text-sm">
          If you have any questions regarding this disclaimer, please contact us at support@seoscore.io
        </p>
      </section>
    </div>
  );
};

export default Disclaimer;
