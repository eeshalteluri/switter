import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prismadb"
import bcrypt from "bcrypt"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: { label: 'email', type: 'text'},
            password: { label: 'password', type: 'password'},
        },
        async authorize(credentials) {
            const email = credentials?.email as string;
            const password = credentials?.password as string;

            if (!email || !password) {
                throw new Error('Invalid Credentials');
            }

            const user = await prisma.user.findUnique({
                where: { email }, // ✅ Type-safe now
            });

            if (!user || !user?.hashedPassword) {
                throw new Error('Invalid Credentials');
            }

            const isCorrectPassword = await bcrypt.compare(
                password, user.hashedPassword
            )

            if(!isCorrectPassword){
                throw new Error('Invalid Credentials')
            }

            return user; 
        }

    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET
})