/* eslint-disable turbo/no-undeclared-env-vars */
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import db from '@repo/db/client'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !user.email) {
        return false
      }

      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name || '',
          auth_type: account?.provider === 'google' ? 'Google' : 'Github', // Ensure account is not null
        },
        update: {
          name: user.name || '',
          auth_type: account?.provider === 'google' ? 'Google' : 'Github', // Ensure account is not null
        },
      })

      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'secret',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
