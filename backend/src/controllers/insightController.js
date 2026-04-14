import ReviewInsight from '../models/ReviewInsight.js';
import Review from '../models/Review.js';
import { summarizeReviews } from '../services/aiService.js';

export const getProviderReviewInsights = async (req, res) => {
  try {
    const { providerId } = req.params;
    let insight = await ReviewInsight.findOne({ provider: providerId });

    if (!insight) {
      // Dynamic generation fallback
      const reviews = await Review.find({ provider: providerId });
      const texts = reviews.map(r => r.comment).join(' | ');
      
      const aiSummary = await summarizeReviews(texts);
      
      if (aiSummary) {
        insight = await ReviewInsight.create({
          provider: providerId,
          summary: aiSummary.summary,
          sentimentRatio: aiSummary.sentimentRatio,
          commonGoodKeywords: aiSummary.commonGoodKeywords,
          commonBadKeywords: aiSummary.commonBadKeywords
        });
      }
    }

    res.json(insight || { message: "Not enough data to parse insights." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
