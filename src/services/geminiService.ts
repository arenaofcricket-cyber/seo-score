/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateYouTubeTitle(topic: string, keywords: string) {
  const prompt = `Generate 5 catchy, SEO-optimized YouTube titles for the topic: "${topic}". Keywords to include: ${keywords}. Return as a JSON array of strings.`;
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
