import type { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            about: string;
            avatar: {
                asset: {
                    _ref: string;
                }
            }
        }
    }
}