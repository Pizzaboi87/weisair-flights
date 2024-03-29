import Stripe from "stripe";
import { getFlightProgramDetails } from "@/libs/apis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16"
});

type RequestData = {
    flightProgram: string;
    flightDate: string;
    flightSlug: string;
    adults: number;
    children: number;
    totalPrice: number;
    discount: number;
}

export const POST = async (req: Request, res: Response) => {
    const { flightProgram, flightDate, flightSlug, adults, children, totalPrice, discount }: RequestData = await req.json();

    if (!flightDate || !adults || !flightSlug) {
        return new NextResponse("All fields are required.", { status: 400 });
    }

    const origin = req.headers.get("origin");

    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Authentication required.", { status: 400 });
    }

    const userId = session.user.id;

    try {
        const flight = await getFlightProgramDetails(flightSlug)

        const stripeSession = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: flightProgram,
                            images: flight.images.map(image => image.asset.url)
                        },
                        unit_amount: parseInt((totalPrice * 100).toString())
                    }
                }
            ],
            payment_method_types: ["card"],
            success_url: `${origin}/users/${userId}`,
            metadata: {
                user: userId,
                flightProgram: flight._id,
                flightType: flight.type._id,
                flightDate,
                adults,
                children,
                totalPrice,
                discount: discount || 0
            }
        });

        return NextResponse.json(stripeSession, {
            status: 200,
            statusText: "Payment Session Created"
        })
    } catch (error: any) {
        console.log("Payment failed", error)
        return new NextResponse(error, { status: 500 });
    }
}