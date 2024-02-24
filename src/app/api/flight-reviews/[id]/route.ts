import { getReviews } from "@/libs/apis";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const flightId = params.id;

    try {
        const flightReviews = await getReviews(flightId);

        return NextResponse.json(flightReviews, {
            status: 200,
            statusText: "Fetch successful"
        });
    } catch (error) {
        console.log("Error during reviews fetching", error);
        return new NextResponse("Unable to fetch reviews", { status: 400 });
    }
}