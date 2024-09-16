import clientPromise from '../../../../libs/MongoConnect';
import mongoose from 'mongoose';
import { User } from '../../../../models/User';
import NextAuth, { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: "/login",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.name;
                token.email = user.email;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.name = token.username;
                session.user.email = token.email;
                session.user.id = token.id;
            }
            return session;
        },
    }
};

// Named export for isAdmin function
export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
        return false;
    }
    const userInfo = await User.findOne({ email: userEmail });
    if (!userInfo) {
        return false;
    }
    return userInfo.admin === true;
}

// Route handler for NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
