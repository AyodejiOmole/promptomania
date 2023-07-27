"use client"
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

const getGoogleVariables = ( ) : {clientId: string; clientSecret: string} => {
    const clientId = process.env.GOOGLE_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || clientId.length === 0) {
      throw new Error("No clientId");
    }
  
    if (!clientSecret || clientSecret.length === 0) {
      throw new Error("No clientSecret");
    }
    return { clientId, clientSecret };
  }

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({ session }) {

    },
    async signIn({ profile }) {
        try {
          await connectToDB();

          return true;
        } catch (error) {
            console.log(error);
            return false;
        }
        
    } 
});

export { handler as GET, handler as POST}