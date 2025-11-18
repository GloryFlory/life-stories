import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import nodemailer from "nodemailer"
import { render } from "@react-email/components"
import MagicLinkEmail from "@/emails/magic-link"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: "nodemailer",
      type: "email",
      name: "Email",
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // 24 hours
      async sendVerificationRequest({ identifier: email, url }) {
        console.log('🔐 Attempting to send magic link to:', email);
        console.log('📧 Email from:', process.env.EMAIL_FROM);
        
        try {
          const transport = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD,
            },
          });

          const emailHtml = await render(
            MagicLinkEmail({ 
              url, 
              host: process.env.NEXTAUTH_URL || 'http://localhost:5000' 
            })
          );

          const result = await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Sign in to Life Stories",
            html: emailHtml,
          });

          console.log('✅ Email sent successfully:', result);
        } catch (error) {
          console.error('❌ Error sending email:', error);
          throw error;
        }
      },
    },
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
})
