import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

// Initialize SDK (Assuming GENAI_API_KEY or similar is in .env)
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export const estimatePrice = async (serviceType, city, quotedPrice) => {
  if (!ai) return { estimatedRange: [quotedPrice * 0.8, quotedPrice * 1.2], isFair: true, confidence: 'low - mock data' };
  
  try {
    const prompt = `Estimate the fair market price for a ${serviceType} service in ${city}. The provider quoted $${quotedPrice}. Return a JSON with { "estimatedRange": [min, max], "isFair": boolean, "confidence": "high" | "medium" | "low", "reasoning": "short explanation" }`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text());
  } catch (err) {
    console.error('AI Price Estimation Error:', err);
    return { estimatedRange: [quotedPrice, quotedPrice], isFair: true, confidence: 'error' };
  }
};

export const summarizeReviews = async (reviewsTextGrouped) => {
  if (!ai) return { summary: 'Mock summary', sentimentRatio: { positive: 80, neutral: 10, negative: 10 }, commonGoodKeywords: ['fast'], commonBadKeywords: ['expensive'] };
  
  try {
    const prompt = `Analyze these reviews: ${reviewsTextGrouped}. Return JSON { "summary": "overall thought", "sentimentRatio": { "positive": 0-100, "neutral": 0-100, "negative": 0-100 }, "commonGoodKeywords": ["list"], "commonBadKeywords": ["list"] }`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text());
  } catch (error) {
    console.error('AI Review Summarization Error:', error);
    return null;
  }
};
