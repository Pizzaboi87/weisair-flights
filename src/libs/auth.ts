import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import sanityClient from "./sanity";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        }),
        SanityCredentials(sanityClient)
    ],
    session: {
        strategy: "jwt"
    },
    theme: {
        logo: "/images/logo_black.png"
    },
    adapter: SanityAdapter(sanityClient),
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: async ({ session, token }) => {
            const userEmail = token.email;
            const userIdObject = await sanityClient.fetch<{ _id: string }>(`*[_type == "user" && email == $email][0] {
                _id
            }`, { email: userEmail });

            return {
                ...session,
                user: {
                    ...session.user,
                    id: userIdObject._id,
                }
            }
        }
    }
}