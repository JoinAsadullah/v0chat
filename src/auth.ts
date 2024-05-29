import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

 
const prisma = new PrismaClient()
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
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
