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

interface CredentialsWithAction
  extends Partial<Record<'username' | 'email' | 'password', unknown>> {
  action?: 'signup' | 'login';
}

async function compareHash(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
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
        credentials: CredentialsWithAction
      ): Promise<{ id: string; username: string | null; email: string } | null> {
        try {
          if (credentials.action === 'signup') {
            const existingUser = await prisma.user.findUnique({
              where: { email: credentials?.email as string },
            });

            if (existingUser) {
              throw new Error('Email already exists');
            }

            const hashedPassword = await bcrypt.hash(credentials.password as string, 10);
            const image = String(credentials.username).charAt(0).toUpperCase();

            const newUser = await prisma.user.create({
              data: {
                username: String(credentials.username),
                email: String(credentials.email),
                password: String(hashedPassword),
                image,
              },
            });
            return {
              id: String(newUser.id),
              username: newUser.username,
              email: String(newUser.email),
            };
          } else {
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
          }
        } catch (error: unknown) {
          console.error('Authorization error:', error);
          // return null;
          // throw error;
          if (error instanceof Error) {
            throw error;
          } else {
            throw new Error('An unexpected error occurred');
          }
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user } : { token:any, user:any | null }): Promise<any>{
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token } : { session: any, token: any}) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.image = token.image; 
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/ui/login',
    signOut: '/ui/login',
    error: '/ui/login',
  },
});
