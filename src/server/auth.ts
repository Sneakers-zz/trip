
import  { getServerSession,type DefaultSession, type NextAuthOptions, type Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}


export const authOptions: NextAuthOptions = {
 
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  providers: [
    
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
      // ...add more providers here
    ],

  debug: true,
  events: {
    signIn: async ({ profile, account }) => {
      console.log('profile:', profile);
      console.log('account:', account);
    },
  },
  callbacks: {
    session: ({ session, token  }) => {
      console.log('session:', session);
      console.log('user:', token );
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub , // Ensure `user.id` is actually provided by your user model in the database
        },
      };
    },
  },
};

/**
 * Wrapper for `getServerSession` to simplify imports.
 *
 * @param {NextApiRequest} req - The request object
 * @param {NextApiResponse} res - The response object
 * @returns {Promise<Session | null>} The session object or null
 */
export const getServerAuthSession = async (
): Promise<Session | null> => {
  return getServerSession();
};

