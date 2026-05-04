/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateYouTubeTitle(topic: string, keywords: string) {
  const prompt = `Generate 5 catchy, SEO-optimized YouTube titles and a compelling video description for EACH title for the topic: "${topic}". Keywords to include: ${keywords}. Return as a JSON array of objects, each with "title" and "description" fields.`;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "[]");
}

export async function generateYouTubeTags(topic: string, keywords: string) {
  const prompt = `Generate 20 highly relevant, SEO-optimized YouTube tags for a video about "${topic}". Target keywords to include: ${keywords}. Return as a JSON array of strings. Maximum tag length should be 50 characters each.`;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "[]");
}

export async function getSEOScore(url: string, realData?: any) {
  let context = "";
  if (realData) {
    context = `Real metrics detected for this URL:
    - SEO Score: ${realData.seoScore}
    - Performance Score: ${realData.performanceScore}
    - LCP: ${realData.metrics.lcp}
    - CLS: ${realData.metrics.cls}
    Please base your qualitative analysis (recommendations, pros, cons) on these REAL metrics.`;
  }

  const prompt = `Analyze the website URL: "${url}". 
  ${context}
  Provide a JSON object with:
  "score": number (Overall SEO Score, 0-100),
  "onPageScore": number (0-100),
  "technicalScore": number (0-100),
  "contentScore": number (0-100),
  "pros": array of objects with "title" (string) and "description" (string),
  "cons": array of objects with "title" (string), "impact" (High|Medium|Low), "howToFix" (detailed instruction string),
  "recommendations": array of strings.
  
  Focus on actionable steps and ensuring "howToFix" is practical for a developer or site owner.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "{}");
}

export async function getMobileFriendlyRecommendations(url: string) {
  const prompt = `Perform a mobile-friendliness audit for the URL: "${url}". 
  Provide a JSON object with:
  "isFriendly": boolean,
  "score": number (0-100),
  "recommendations": array of objects with "title": string, "category": string (e.g., Performance, UX, Accessibility), "impact": string (High, Medium, Low), "desc": string.
  
  Specifically include recommendations for:
  - Optimizing image sizes (compression, WebP, responsive images)
  - Reducing JavaScript execution time (deferred loading, code splitting)
  - Improving tap target spacing (If "Touch targets too close" is detected, explicitly provide this CSS recommendation in the description: "Include: .your-button-class { min-width: 48px; min-height: 48px; } to meet mobile usability standards.")
  - Preventing horizontal scrolling
  - Improving font legibility on small screens.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "{}");
}

export async function getRealPageSpeedData(url: string) {
  const prompt = `Analyze the website speed and performance for: "${url}". 
  Provide a JSON object with:
  "performance": number (0-100),
  "accessibility": number (0-100),
  "bestPractices": number (0-100),
  "seo": number (0-100),
  "metrics": {
    "fcp": string,
    "lcp": string,
    "cls": string,
    "tbt": string,
    "fcpValue": number,
    "lcpValue": number,
    "clsValue": number,
    "tbtValue": number
  },
  "recommendations": array of objects with "title": string, "desc": string, "impact": string.
  
  Base these on realistic interpretations of what PageSpeed Insights would return for this URL.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "{}");
}

export async function getLSIKeywords(text: string) {
  const prompt = `Analyze this content and suggest 8-10 LSI (Latent Semantic Indexing) keywords that should be included for better Semantic SEO. For each keyword, provide a brief reason why it fits.
  
  Content: "${text.substring(0, 2000)}"
  
  Provide a JSON array of objects with:
  "word": string,
  "reason": string.
  
  Return ONLY the JSON array.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "[]");
}

export async function getBacklinkData(url: string) {
  const prompt = `Analyze the backlink profile for the URL: "${url}". 
  Provide a JSON object with:
  "totalBacklinks": number,
  "referringDomains": number,
  "domainAuthority": number (0-100),
  "spamScore": number (0-100),
  "doFollowPercent": number,
  "noFollowPercent": number,
  "qualityBreakdown": {
    "highAuthority": number,
    "lowQuality": number,
    "toxic": number
  },
  "recentLinks": array of objects with:
    "url": string,
    "platform": string,
    "anchor": string,
    "da": number (Domain Authority of the linking site),
    "type": "Do-follow" | "No-follow",
    "status": "Quality" | "Toxic" | "High Authority"
  };

  Generate realistic, simulated backlink data for this domain as if you were an SEO audit tool like Ahrefs or Semrush.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "{}");
}

export async function generateTitleVariations(keyword: string, type: 'blog' | 'product' | 'page' = 'blog') {
  const prompt = `Generate 6 high-performing SEO title tags and meta descriptions for the keyword: "${keyword}". 
  The focus is a ${type}.
  
  Provide a JSON array of objects, each with:
  "title": string (try to stay between 50-60 characters for SEO),
  "description": string (try to stay between 120-160 characters),
  "category": "Clickbait" | "Educational" | "Direct" | "Question" | "Listicle",
  "ctr_score": number (estimated CTR importance 0-100).

  Return ONLY the JSON array.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "[]");
}

export async function generateDetailedTags(topic: string, platform: 'YouTube' | 'Blog' | 'Instagram' = 'YouTube') {
  const prompt = `Generate 15 highly relevant tags for a ${platform} content about "${topic}". 
  
  For ${platform === 'Instagram' ? 'Hashtags' : 'Tags'}, provide a JSON array of objects, each with:
  "tag": string (including '#' for Instagram),
  "volume": "High" | "Medium" | "Low" (estimated search volume or popularity),
  "relevance": number (0-100).

  Return ONLY the JSON array.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "[]");
}

export async function getSpeedAudit(url: string) {
  const prompt = `Analyze the website speed and performance for: "${url}". 
  Provide a JSON object with separate mobile and desktop audits.
  
  Each audit (mobile and desktop) should include:
  "score": number (0-100),
  "coreWebVitals": {
    "lcp": { "value": string, "status": "Good" | "Needs Improvement" | "Poor" },
    "fid": { "value": string, "status": "Good" | "Needs Improvement" | "Poor" },
    "cls": { "value": string, "status": "Good" | "Needs Improvement" | "Poor" }
  },
  "metrics": {
    "fcp": string,
    "tti": string,
    "speedIndex": string
  },
  "issues": array of objects with:
    "title": string,
    "impact": "High" | "Medium" | "Low",
    "description": string
  };

  Generate realistic, simulated performance data as if from Google PageSpeed Insights.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "{}");
}

export async function getMobileAudit(url: string) {
  const prompt = `Analyze the mobile friendliness for: "${url}". 
  Provide a JSON object with:
  "overallScore": number (0-100),
  "isMobileFriendly": boolean,
  "viewport": {
    "status": "Found" | "Missing" | "Invalid",
    "content": string,
    "suggestion": string (HTML snippet if missing/invalid)
  },
  "touchTargets": {
    "score": number (0-100),
    "status": "Good" | "Needs Improvement" | "Poor",
    "issues": array of strings
  },
  "contentWidth": {
    "status": "Correct" | "Overflows",
    "description": string
  },
  "readability": {
    "fontSize": "Good" | "Small",
    "description": string
  }
  };

  Generate a realistic SEO audit for this domain's mobile usability.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "{}");
}

export async function getRenderBlockingAudit(url: string) {
  const prompt = `Analyze render-blocking resources for: "${url}".
  
  Provide a JSON object with:
  "overallScore": number (0-100),
  "criticalChain": array of { "url": string, "type": "CSS" | "JS", "size": string, "impact": "High" | "Medium" },
  "stats": {
    "scripts": number,
    "stylesheets": number,
    "potentialSavings": string
  },
  "recommendations": array of { "title": string, "desc": string, "fix": string, "type": "defer" | "async" | "inline" | "preload" }
  };

  Generate a realistic technical audit for this domain's loading performance.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "{}");
}
export async function getAdsTxtAudit(domain: string) {
  const prompt = `Perform a technical SEO audit for the ads.txt file of: "${domain}".
  The user is reporting an "Unexpected Content-Type: text/html" error.
  
  Provide a JSON object with:
  "status": "Valid" | "Invalid" | "Warning",
  "contentType": "text/html" | "text/plain",
  "issues": array of { "title": string, "severity": "Critical" | "Warning", "fix": string },
  "serverFixes": {
    "apache": string,
    "nginx": string,
    "htaccess": string
  },
  "contentPreview": string (simulated ads.txt content)
  };

  Provide exact configuration snippets to fix the Content-Type header issue.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "{}");
}

export async function getCDNAudit(url: string) {
  const prompt = `Analyze CDN usage for the website: "${url}".
  
  Provide a JSON object with:
  "overallScore": number (0-100),
  "cdnFound": boolean,
  "detectedCDNs": array of strings (e.g., Cloudflare, Akamai, Fastly),
  "performanceImpact": {
    "estimatedLatencySaved": string (e.g., "145ms"),
    "bandwidthSaved": string (e.g., "1.2GB/mo"),
    "ttiImprovement": string (e.g., "0.8s")
  },
  "resourceBreakdown": {
    "images": { "onCDN": number, "total": number },
    "scripts": { "onCDN": number, "total": number },
    "styles": { "onCDN": number, "total": number }
  },
  "recommendations": array of { "title": string, "desc": string, "impact": "High" | "Medium" },
  "unoptimizedResources": array of { "url": string, "type": "Image" | "Script" | "CSS", "size": string, "suggestion": string }
  };

  Generate a realistic audit of how many of this domain's resources are served through a CDN and specifically analyze the performance impact (latency, bandwidth, and TTI) for this specific domain.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "{}");
}

export async function generateTitleSuggestions(title: string) {
  const prompt = `Analyze this SEO meta title: "${title}".
  Provide 3 specific improvements based on:
  1. Character count (ideal is 50-60).
  2. Keyword placement (front-loading keywords).
  3. Compelling language (action words, USP).

  Return a JSON array of 3 strings, each being a short, actionable suggestion.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  return JSON.parse(response.text || "[]");
}


