/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/connect";
import { User } from "@/models/user";
import { createSession } from "@/lib/session";
import sendEmail from "@/utils/sendEmail";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user?.email });

        if (sessionUser) {
          await createSession(
            sessionUser._id.toString(),
            sessionUser.fullname,
            sessionUser.email,
            sessionUser.image
          );
        }

        return session;
      } catch (error) {
        console.log(error);
        return session;
      }
    },

    async signIn({ profile }) {
      await connectDB();

      try {
        const user = await User.findOne({ email: profile?.email });

        // 🆕 Only create and send email if user doesn't exist
        if (!user && profile) {
          const newUser = await User.create({
            fullname: profile.name,
            email: profile.email,
            image: (profile as any)?.picture,
            password: "qqqqq11111.",
          });

          console.log("New user created:", newUser);

          // ✅ Send welcome email only on first sign-in (registration)
          await sendEmail({
            to: newUser.email,
            subject: "Welcome to StudyM8!",
            template: "welcomeEmail",
            context: {
              subject: "Welcome to StudyM8!",
              header: `Welcome, ${newUser.fullname}!`,
              body: "Thank you for joining StudyM8! We're excited to have you on board. Get started by uploading your study materials.",
              ctaText: "Get Started",
              ctaLink: "https://automated-study-planner.vercel.app/upload",
              logoUrl:
                "https://res.cloudinary.com/dwsc0velt/image/upload/v1750507488/Automated_study_planner/StudyMate-Photoroom_hyhgtl.png",
              fullname: newUser.fullname,
              date: new Date().getFullYear(),
            },
          }).catch((error) => {
            console.log("Welcome Email", error);
            // Just log, don't break auth
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return true; // still allow login even if email fails
      }
    },

    redirect({ baseUrl }) {
      return `${baseUrl}/upload`;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
