import { getUserData, updateAbout } from "@/libs/apis";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/auth"

export const GET = async (req: Request, res: Response) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Authentication Required", { status: 500 });
    }

    const userId = session.user.id;

    try {
        const data = await getUserData(userId);
        return NextResponse.json(data, { status: 200, statusText: "Data fetch successful" });
    } catch (error) {
        return new NextResponse("Unable to fetch userdata", { status: 400 })
    }
}

export const POST = async (req: Request, res: Response) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Authentication Required", { status: 500 });
    }

    const { aboutMe } = await req.json();

    if (!aboutMe) {
        return new NextResponse("Empty about section", { status: 400 });
    }

    const userId = session.user.id;

    try {
        const data = await updateAbout({ userId, aboutMe });

        return NextResponse.json(data, { status: 200, statusText: "About updated successfully" })
    } catch (error: any) {
        console.log("Error while updating About section", error);
        return new NextResponse("Unable to update About section", { status: 400 });
    }
}