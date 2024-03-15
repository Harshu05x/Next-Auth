import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt"
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { 
                    label: "Username", 
                    type: "text" ,
                    placeholder: "Your username"
                },
                password: { 
                    label: "Password", 
                    type: "password" ,
                    placeholder: "Your password"
                }
            },
            async authorize(credentials){
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username
                    }
                });

                if(!user) 
                    throw new Error("User not found");

                if(!credentials?.password) 
                    throw new Error("Please provide a password");

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

                if(!isCorrectPassword) 
                    throw new Error("Invalid password");

                const { password, ...userWithoutPassword } = user;

                return userWithoutPassword;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user) token.user = user as User;
            return token;
        },
        async session({session, token}){
            session.user = token.user as User;
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};