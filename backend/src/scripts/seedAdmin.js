import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from '../models/User.js';

const ADMIN_NAME = process.env.ADMIN_NAME || 'SriManasa Admin';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const MONGODB_URI = process.env.MONGODB_URI;

async function seedAdmin() {
  console.log('\n=================================================');
  console.log('🌱 SriManasa Academy - Admin Seed Utility');
  console.log('=================================================');

  if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not set in backend/.env');
    process.exit(1);
  }

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set in backend/.env');
    console.error('   Please define them in backend/.env, for example:');
    console.error('   ADMIN_NAME=Admin');
    console.error('   ADMIN_EMAIL=admin@srimanasa.com');
    console.error('   ADMIN_PASSWORD=your_secure_password\n');
    process.exit(1);
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    const normalizedEmail = ADMIN_EMAIL.trim().toLowerCase();

    // Check if admin already exists
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      if (existing.role === 'admin') {
        console.log(`ℹ️  Admin user already exists with email: ${normalizedEmail}`);
        console.log('   Updating password and name from .env...');
        existing.name = ADMIN_NAME.trim();
        existing.password = ADMIN_PASSWORD; // Will be hashed by pre-save hook
        await existing.save();
        console.log('✅ Admin credentials updated successfully.');
      } else {
        console.log(`ℹ️  User exists with email: ${normalizedEmail} but role was "${existing.role}".`);
        console.log('   Promoting user to admin and updating password...');
        existing.role = 'admin';
        existing.name = ADMIN_NAME.trim();
        existing.password = ADMIN_PASSWORD;
        await existing.save();
        console.log('✅ User successfully promoted to admin.');
      }
    } else {
      console.log(`Creating new admin account for: ${normalizedEmail}...`);
      const admin = new User({
        name: ADMIN_NAME.trim(),
        email: normalizedEmail,
        password: ADMIN_PASSWORD,
        role: 'admin',
      });
      await admin.save();
      console.log(`✅ Admin account created successfully!`);
    }

    console.log('\n-------------------------------------------------');
    console.log(`Admin Email : ${normalizedEmail}`);
    console.log(`Role        : admin`);
    console.log('=================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed admin:', err.message);
    process.exit(1);
  }
}

seedAdmin();
