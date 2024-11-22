/* eslint-disable @typescript-eslint/no-unused-vars */
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";
import { DefaultSession, SessionStrategy, Account, Profile, User } from "next-auth";
import { env } from "process";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
    interface Session {
        user: {
            role?: string;
        } & DefaultSession["user"];
    }
}

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID || "",
            clientSecret: env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }: { 
            user: User | AdapterUser;
            account: Account | null;
            profile?: Profile;
            email?: { verificationRequest?: boolean };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            credentials?: Record<string, any>;
        }) {
            if (account?.provider && profile?.email) {
                const existingUser = await prisma.user.findFirst({
                    where: { email: profile.email },
                });

                if (existingUser) {
                    const existingAccount = await prisma.account.findFirst({
                        where: {
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        },
                    });

                    if (!existingAccount) {
                        await prisma.account.create({
                            data: {
                                userId: existingUser.id,
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                                type: account.type,
                                access_token: account.access_token,
                                id_token: account.id_token,
                                scope: account.scope,
                                token_type: account.token_type,
                            },
                        });
                    }
                    return true;
                }
            }
            return false;
        },
    },
    debug: env.NODE_ENV === "development",
    secret: env.NEXTAUTH_SECRET,
};