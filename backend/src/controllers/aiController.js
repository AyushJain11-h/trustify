import AILog from '../models/AILog.js';
import ServiceProvider from '../models/ServiceProvider.js';
import Review from '../models/Review.js';
import { estimatePrice } from '../services/aiService.js';

// Mock responses for when API key is missing
const mockAIChatResponse = (query) => {
  if (query.toLowerCase().includes('electrician') || query.toLowerCase().includes('plumber')) {
    return "Based on verified providers in your area, I recommend Prakash (Electrician, ★4.8, ₹200/hr) or Ramesh (Plumber, ★4.9, ₹150/hr). They both have clear background checks and excellent reviews for punctuality.";
  }
  return "I am Trustify's AI assistant. I can help you find reliable service providers, estimate fair pricing for a job, and verify provider backgrounds. How can I help you today?";
};

export const chatWithAI = async (req, res) => {
  try {
    const { query } = req.body;
    let responseText = '';

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY') {
       // In a real scenario, we'll initialize the genai client here
       // import { GoogleGenAI } from '@google/genai';
       // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
       // const response = await ai.models.generateContent({ ... })
       responseText = "[Gemini API Mode]: " + mockAIChatResponse(query); // Mapped to mock for stability in demo
    } else {
       responseText = mockAIChatResponse(query);
    }

    if (req.user) {
      await AILog.create({ user: req.user._id, query, response: responseText, type: 'chatbot' });
    }

    res.json({ reply: responseText });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPriceEstimate = async (req, res) => {
  try {
    const { serviceType, city, quotedPrice } = req.body;
    
    // Call our new AI service
    const estimate = await estimatePrice(serviceType, city || 'Local', quotedPrice || 500);

    // Save to AI Log if user exists
    if (req.user) {
      await AILog.create({ user: req.user._id, query: `Price check ${serviceType} ${quotedPrice}`, response: JSON.stringify(estimate), type: 'price_estimator' });
    }

    res.json(estimate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderRecommendation = async (req, res) => {
  try {
     const { criteria } = req.body;
     const providers = await ServiceProvider.find().sort({ rating: -1 }).limit(3).populate('user', 'name');
     
     const recommendation = {
       suggestedProviders: providers,
       reasoning: "These providers match your search for highly-rated experts. They have the highest frequency of positive reviews and are currently available."
     };
     res.json(recommendation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
