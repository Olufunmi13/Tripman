import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '@/app/lib/prisma'; 

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Received request:', req.body);
  console.log('Prisma client initialized:', prisma);

  const { username, email, password } = req.body;

  console.log('Extracted username:', username);
  console.log('Extracted email:', email);
  console.log('Extracted password:', password);

  // Validate request body
  if (!username || !email || !password) {
    console.log('Validation failed: missing required fields');
    return res.status(400).json({ message: 'Please provide all required fields: username, email, and password' });
  }

  try {
    console.log('Checking database connection...');
    const isConnected = await prisma.$queryRaw`
      SELECT 1
    `;
    
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    console.log('Database connection successful');

    console.log('Checking for existing user...');
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('Existing user found:', existingUser);
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    console.log('Creating new user...');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log('New user created:', newUser);
    return res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (error: unknown) {
    console.error('Signup error:', error);
    console.log('Error stack trace:', (error as Error).stack);
    return res.status(500).json({ message: 'Internal server error' });
  }
}