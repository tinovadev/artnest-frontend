import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "../../../lib/db";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await query(`SELECT * FROM users WHERE email = $1 LIMIT 1;`, [user.email]);

        if (res.rows.length === 0) {
          const username = user?.email?.split("@")[0] ?? "user";
          const fullname = user.name ?? username;

          const insertText = `
            INSERT INTO users (
              id, email, username, fullname, created_at, updated_at
            ) VALUES (
              gen_random_uuid(), $1, $2, $3, NOW(), NOW()
            )
          `;

          await query(insertText, [user.email, username, fullname]);
        }
        return true;
      } catch (e) {
        console.error("DB error in signIn callback:", e);
        return false;
      }
    },

    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
