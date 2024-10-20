import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

interface User {
  id: string;
  username: string;
  email: string;
}

async function compareHash(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compareSync(plainTextPassword, hashedPassword);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        email: { label: 'Email', type: 'email' },
      },
      async authorize(
        credentials
      ): Promise<{ id: string; username: string | null; email: string } | null> {
        try {
          // Find user by username
          const user = await prisma.user.findUnique({
            where: { username: credentials?.username as string },
          });

          if (!user) {
            throw new Error('user_not_found');
          }

          // Check if password matches
          const isValid = await compareHash(credentials.password as string, user.password);
          if (!isValid) {
            throw new Error('Invalid password');
          }

          return { id: String(user.id), username: user.username, email: String(user.email) };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/ui/login',
    signOut: '/ui/login',
    error: '/api/auth/login',
  },
});
