import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { compare } from "bcrypt";

// Initialize Prisma Client to interact with the database
const prisma = new PrismaClient();

// Configuration object for NextAuth authentication
export const authOptions: any = {
  session: {
    strategy: "jwt", // Define the session strategy as JWT
  },
  providers: [
    CredentialsProvider({
      name: "credentials", // Local strategy for username and password login
      credentials: {
        email: { label: "email", type: "email" }, // Define email as a required credential
        password: { label: "password", type: "password" }, // Define password as a required credential
      },
      async authorize(credentials, req) {
        // Custom login function using credentials
        if (!credentials?.email || !credentials.password) {
          return null; // Return null if email or password are missing
        }

        // Find the user in the database using the provided email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null; // Return null if no user is found
        }

        // Compare provided password with the stored hashed password
        const isPasswordValid = user.password
          ? await compare(credentials.password, user.password)
          : false;

        if (!isPasswordValid) {
          return null; // Return null if password is not valid
        }

        // Return user details if successful
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          permissions: user?.permissions,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      // Extend session object with custom properties
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          username: token.username,
          role: token.role,
          permissions: token?.permissions,
        },
      };
    },

    async jwt({ token, user }: { token: any; user: any }) {
      // Handling JWT creation, adding user data to the token
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          permissions: user?.permissions,
        };
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      // Handling external provider sign-ins
      if (account.provider !== "credentials") {
        let userId;
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              username: user.name,
            },
          });
          userId = newUser.id;
        } else {
          userId = existingUser.id;
        }

        // Store the user's ID in their session
        user.id = userId;
      }
      return true;
    },
  },

  pages: {
    signIn: "/login", // Define custom sign-in page URL
  },

  debug: process.env.NODE_ENV === "development", // Enable debugging in development mode
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET, // JWT secret for signing tokens
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret used for session cookie signature
};

// Export NextAuth handler for handling authentication requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // Export handler for both GET and POST requests
