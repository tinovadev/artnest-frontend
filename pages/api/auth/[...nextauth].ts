import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
        // TOOD: 회원가입,로그인 공통 로직
        return true;
    },
    async session({ session, token, user }) {
        // TOOD: 세션에 사용자 정보 추가
        return session;
    },
  },

    // TOOD: 데이터 저장
});
