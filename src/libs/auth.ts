import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import sanityClient from "./sanity";
import { sessionId } from "@/models/models";

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        SanityCredentials(sanityClient)
    ],
    session: {
        strategy: "jwt"
    },
    adapter: SanityAdapter(sanityClient),
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: async ({ session, token }) => {
            const userEmail = token.email;
            const userIdObject = await sanityClient.fetch<sessionId>(`*[_type == "user" && email == $email][0] {
                _id,
                avatar {
                    asset -> {
                        url
                    }
                }
            }`, { email: userEmail });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: userIdObject._id,
                    avatar: userIdObject.avatar
                }
            }
        }
    }
}