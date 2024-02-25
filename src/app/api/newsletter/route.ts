import { checkEmailIsExists, createNewSubscriberWithUser } from "@/libs/apis";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
    const { newAddress, userName } = await req.json();

    try {
        const existingAddress = await checkEmailIsExists(newAddress);
        let data;

        if (existingAddress?.emailAddress == newAddress) {
            data = { results: [{ operation: "duplicated" }] }
        } else {
            data = await createNewSubscriberWithUser({ newAddress, userName })
        }

        return NextResponse.json(data, { status: 200, statusText: "Subsciption was successful." });
    } catch (error) {
        console.log("Error while adding new email address", error);
        return new NextResponse("Unable to subscribe with email address", { status: 400 });
    }
}