import ServiceProvider from '../models/ServiceProvider.js';
import TrustScore from '../models/TrustScore.js';

export const recalculateTrustScore = async (providerId) => {
  try {
    const provider = await ServiceProvider.findById(providerId);
    if (!provider) throw new Error('Provider not found');

    // Base score is 50.
    let score = 50;
    
    // Rating impact: rating (0.0 - 5.0) -> scaled. Example: 4.5 * 5 = +22.5
    const ratingImpact = provider.rating * 5;
    
    // Jobs impact: caps at +15 for >= 50 jobs
    const jobsImpact = Math.min((provider.numReviews || provider.repeatCustomers || 0) * 0.3, 15);
    
    // Cancellation impact: subtract up to 15 points
    const cancellationImpact = -Math.min((provider.cancellationRate || 0) * 0.5, 15);

    // Verified boost
    const verifiedBonus = provider.isVerified ? 10 : 0;
    
    // Fraud flag penalty
    const fraudPenalty = provider.isFraudFlagged ? -40 : 0;

    score = score + ratingImpact + jobsImpact + cancellationImpact + verifiedBonus + fraudPenalty;

    // Clamp score
    score = Math.max(0, Math.min(100, Math.round(score)));

    provider.trustScore = score;
    await provider.save();

    // Log calculation history
    await TrustScore.create({
      provider: provider._id,
      score: score,
      factors: {
        ratingImpact,
        jobsImpact,
        cancellationImpact,
        responseTimeImpact: 0 // Mock implemented
      },
      aiReasoning: 'Calculated using standard marketplace heuristics.'
    });

    return score;
  } catch (error) {
    console.error('Trust Score Calculation Error:', error);
    throw error;
  }
};
