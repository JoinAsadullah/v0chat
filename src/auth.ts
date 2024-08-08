import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma";
import github from "next-auth/providers/github"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, github],
  secret: process.env.SECRET,
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  callbacks:{
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
})
