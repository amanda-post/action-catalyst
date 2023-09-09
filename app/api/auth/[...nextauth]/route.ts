import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient, User } from '@prisma/client';
import GitHubProvider from 'next-auth/providers/github';

import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        username: { type: 'text', placeholder: 'test@test.com' },
        password: { type: 'password', placeholder: 'Pa$$w0rd' },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { username: credentials?.username as string },
        });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials?.password as string,
          user.password as string
        );

        if (!isPasswordValid) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return token?.username
        ? {
            ...session,
            user: {
              ...session.user,
              id: token?.id,
              username: token.username,
            },
          }
        : {
            ...session,
            user: {
              ...session.user,
              id: token?.id,
            },
          };
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        if (token.username) {
          token.username = (user as User).username;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
