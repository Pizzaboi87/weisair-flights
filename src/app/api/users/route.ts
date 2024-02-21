import { checkReviewExists, createReview, getUserData, updateReview } from "@/libs/apis";
import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

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

    const { flightProgram, flightBooking, userReview, userRating } = await req.json();

    if (!flightProgram || !flightBooking || !userReview || !userRating) {
        return new NextResponse("All fields are required", { status: 400 });
    }

    const userId = session.user.id;

    try {
        const existingReview = await checkReviewExists(userId, flightBooking);
        let data;

        if (existingReview) {
            data = await updateReview({ reviewId: existingReview._id, userReview, userRating })
        } else {
            data = await createReview({ userId, flightProgram, flightBooking, userReview, userRating })
        }

        return NextResponse.json(data, { status: 200, statusText: "Review saved successfully" })
    } catch (error: any) {
        console.log("Error while updating", error);
        return new NextResponse("Unable to create review", { status: 400 });
    }
}