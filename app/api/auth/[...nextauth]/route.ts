import { query } from "@/lib/db";
import { createWallet } from "@/lib/rpc";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_SSO_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SSO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const res = await query(
          `SELECT * FROM users WHERE email = $1 LIMIT 1;`,
          [user.email],
        );

        if (res.rows.length === 0) {
          const username = user?.email?.split("@")[0] ?? "user";
          const fullname = user.name ?? username;

          const insertText = `
            INSERT INTO users (
              id, email, username, fullname, artist_name, created_at, updated_at
            ) VALUES (
              gen_random_uuid(), $1, $2, $3, $3, NOW(), NOW()
            ) RETURNING id;
          `;
          const inserted = await query(insertText, [
            user.email,
            username,
            fullname,
          ]);
          const userId = inserted.rows[0].id;

          const { address, privateKey } = await createWallet();

          const updateText = `
            UPDATE users SET
              algo_address = $1,
              algo_private_key = $2,
              updated_at = NOW()
            WHERE id = $3;
          `;
          await query(updateText, [address, privateKey, userId]);
        }

        return true;
      } catch (e) {
        console.error("DB error in signIn callback:", e);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const res = await query(
          `SELECT id FROM users WHERE email = $1 LIMIT 1;`,
          [user.email],
        );

        if (res.rows.length > 0) {
          token.dbId = res.rows[0].id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.dbId) {
        session.user.dbId = token.dbId as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
