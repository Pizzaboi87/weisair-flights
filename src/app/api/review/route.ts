import { checkReviewExists, createReview, getReview, updateReview } from "@/libs/apis";
import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Authentication Required", { status: 500 });
    }

    const flightBooking = req.url.slice(-22).toString();

    const userId = session.user.id;

    try {
        const existingReview = await checkReviewExists(userId, flightBooking);
        let data;

        if (existingReview) {
            data = await getReview(existingReview._id);
        } else {
            data = null;
        }

        return NextResponse.json(data, { status: 200, statusText: "Review returned successfully" })
    } catch (error) {
        console.log("Error while checking reviews", error);
        return new NextResponse("Unable to check reviews", { status: 400 });
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