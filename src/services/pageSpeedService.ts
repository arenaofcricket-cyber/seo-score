/**
 * Service to interact with Google PageSpeed Insights API
 */

const API_KEY = import.meta.env.VITE_PAGESPEED_API_KEY;
const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export interface PageSpeedResults {
  score: number;
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  details: {
    title: string;
    description: string;
    url: string;
  };
  metrics: {
    lcp: string; // Largest Contentful Paint
    fid: string; // First Input Delay (or TBT)
    cls: string; // Cumulative Layout Shift
    speedIndex: string;
  };
  audits: {
    title: string;
    description: string;
    score: number;
    displayValue?: string;
  }[];
}

export async function getRealPageSpeedData(targetUrl: string, category: 'seo' | 'performance' | 'accessibility' | 'best-practices' = 'seo'): Promise<PageSpeedResults | null> {
  if (!API_KEY) {
    console.warn('VITE_PAGESPEED_API_KEY is not set. Real analysis skipped.');
    return null;
  }

  try {
    const response = await fetch(`${API_URL}?url=${encodeURIComponent(targetUrl)}&key=${API_KEY}&category=seo&category=performance&strategy=desktop`);
    
    if (!response.ok) {
      throw new Error(`PageSpeed API error: ${response.statusText}`);
    }

    const data = await response.json();
    const lighthouse = data.lighthouseResult;
    const categories = lighthouse.categories;

    return {
      score: Math.round(categories.seo.score * 100),
      performanceScore: Math.round(categories.performance.score * 100),
      accessibilityScore: Math.round(categories.accessibility?.score * 100 || 0),
      bestPracticesScore: Math.round(categories['best-practices']?.score * 100 || 0),
      seoScore: Math.round(categories.seo.score * 100),
      details: {
        title: lighthouse.metadata?.title || 'Unknown',
        description: lighthouse.metadata?.description || '',
        url: lighthouse.finalUrl
      },
      metrics: {
        lcp: lighthouse.audits['largest-contentful-paint']?.displayValue || 'N/A',
        fid: lighthouse.audits['total-blocking-time']?.displayValue || 'N/A',
        cls: lighthouse.audits['cumulative-layout-shift']?.displayValue || 'N/A',
        speedIndex: lighthouse.audits['speed-index']?.displayValue || 'N/A',
      },
      audits: Object.values(lighthouse.audits)
        .filter((a: any) => a.score !== null && a.score < 0.9)
        .map((a: any) => ({
          title: a.title,
          description: a.description,
          score: a.score,
          displayValue: a.displayValue
        }))
        .slice(0, 10)
    };
  } catch (error) {
    console.error('Error fetching real SEO data:', error);
    return null;
  }
}
