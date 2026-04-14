import ServiceProvider from '../models/ServiceProvider.js';

export const getProviders = async (req, res) => {
  try {
    const { serviceType, minRating } = req.query;
    let query = {};
    if (serviceType) query.serviceType = { $regex: serviceType, $options: 'i' };
    if (minRating) query.rating = { $gte: Number(minRating) };

    const providers = await ServiceProvider.find(query).populate('user', 'name email location');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id).populate('user', 'name email location');
    if (provider) {
      res.json(provider);
    } else {
      res.status(404).json({ message: 'Provider not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProviderProfile = async (req, res) => {
  try {
    const { serviceType, skills, experienceYears, basePrice, bio } = req.body;
    
    let provider = await ServiceProvider.findOne({ user: req.user._id });
    if (provider) {
      return res.status(400).json({ message: 'Provider profile already exists' });
    }

    provider = await ServiceProvider.create({
      user: req.user._id,
      serviceType,
      skills,
      experienceYears,
      basePrice,
      bio
    });

    req.user.role = 'provider';
    await req.user.save();

    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
