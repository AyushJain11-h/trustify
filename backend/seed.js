import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import User from './src/models/User.js';
import ServiceProvider from './src/models/ServiceProvider.js';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@trustify.com',
    password: 'password123',
    role: 'admin',
    phone: '9999999999'
  },
  {
    name: 'Customer John',
    email: 'john@example.com',
    password: 'password123',
    role: 'customer',
    phone: '8888888888'
  },
  {
    name: 'Prakash Sharma',
    email: 'prakash@example.com',
    password: 'password123',
    role: 'provider',
    phone: '7777777777'
  },
  {
    name: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    password: 'password123',
    role: 'provider',
    phone: '6666666666'
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await ServiceProvider.deleteMany();

    const createdUsers = await User.insertMany(users);

    const providerUsers = [...Array(15)].map((_, i) => ({
      name: `Mock Provider ${i+1}`,
      email: `provider${i+1}@trustify.com`,
      password: 'password123',
      role: 'provider',
      phone: `55500000${i < 10 ? '0'+i : i}`
    }));

    const createdProviderUsers = await User.insertMany(providerUsers);

    const services = ['Electrician', 'Plumber', 'AC Repair', 'Carpenter', 'Painter', 'House Cleaning', 'Pest Control'];
    
    const providers = createdProviderUsers.map((user, i) => {
      const isGood = i % 3 !== 0; // 2/3 are good, 1/3 have lower scores
      return {
        user: user._id,
        serviceType: services[i % services.length],
        skills: ['General maintenance', 'Repairs', 'Installations'],
        experienceYears: Math.floor(Math.random() * 10) + 1,
        basePrice: Math.floor(Math.random() * 400) + 100,
        bio: `Professional ${services[i % services.length]} with years of verified experience. Customer satisfaction is our priority.`,
        isVerified: isGood,
        rating: isGood ? (4 + Math.random()).toFixed(1) : (2 + Math.random() * 2).toFixed(1),
        numReviews: Math.floor(Math.random() * 100) + 10,
        trustScore: isGood ? (80 + Math.random() * 20) : (40 + Math.random() * 20),
        cancellationRate: isGood ? Math.random() * 2 : 10 + Math.random() * 10
      };
    });

    await ServiceProvider.insertMany(providers);

    console.log('Data Imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
