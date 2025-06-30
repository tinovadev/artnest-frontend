import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      dbId?: string;
    };
  }

  interface User {
    dbId?: string;
  }

  interface JWT {
    dbId?: string;
  }
}
