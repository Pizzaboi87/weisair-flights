import { createBooking } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16"
});

export const POST = async (req: Request, res: Response) => {
    const reqBody = await req.text();
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 })
    }

    switch (event.type) {
        case checkout_session_completed:
            const session = event.data.object;

            if (!session.metadata) {
                console.log("Empty metadata")
                return new NextResponse("Empty metadata", { status: 400, statusText: "Empty metadata" })
            }

            const {
                metadata: {
                    user,
                    flightProgram,
                    flightDate,
                    adults,
                    children,
                    totalPrice,
                    discount
                }
            } = session;

            await createBooking({
                user,
                flightProgram,
                flightDate,
                adults: Number(adults),
                children: Number(children),
                totalPrice: Number(totalPrice),
                discount: Number(discount)
            });

            return NextResponse.json("Booking successful", {
                status: 200,
                statusText: "Booking successful"
            });

        default:
            console.log(`Undhandled event type: ${event.type}`);
            break;
    }

    return NextResponse.json("Event received", {
        status: 200,
        statusText: "Event received"
    });
}