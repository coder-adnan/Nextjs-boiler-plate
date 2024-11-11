import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Missing credentials');
        }

        // Connect to MongoDB
        await connectToDatabase();

        // Find user in MongoDB database by email
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with this email.');
        }

        // Compare password with bcrypt
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          throw new Error('Invalid password');
        }

        // If valid, return user data which will be encoded in the JWT
        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Set JWT as the session strategy
  },
  callbacks: {
    async jwt({ token, user }) {
      // Set issue time for the JWT
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.name = user.name as string;
        token.iat = Date.now(); // Store issue time in the token
      }

      // Set expiration time for the JWT (7 days in this case)
      const expiration = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds

      // Type assertion for token.iat to ensure it's a number
      const issuedAt = token.iat as number;

      if (Date.now() - issuedAt > expiration) {
        // Invalidate the token if it has expired
        return {};
      }

      return token;
    },
    async session({ session, token }) {
      // Ensure session.user properties are always strings
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      } else {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax', // Adjust as per your needs, but 'lax' is often used for authentication cookies
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Set to true for production to ensure cookies are sent over HTTPS
      },
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});
