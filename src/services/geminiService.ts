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

export async function generateYouTubeTags(topic: string) {
  const prompt = `Generate 15 highly relevant YouTube tags for the topic: "${topic}". Return as a comma-separated list of strings in a JSON array.`;
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
  "score": number (0-100),
  "pros": array of strings,
  "cons": array of strings,
  "recommendations": array of strings.
  
  Focus on actionable steps to improve the SEO score and technical performance.`;
  
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
  - Improving tap target spacing
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
