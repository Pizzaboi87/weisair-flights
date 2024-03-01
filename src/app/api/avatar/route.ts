import sanityClient from "@/libs/sanity";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";

export const POST = async (req: Request, res: Response) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Authentication Required", { status: 500 });
    }

    const userId = session.user.id;

    const formData = await req.formData();
    const userImage: File | null = formData.get("userImage") as File | null;

    if (!userImage) {
        return new NextResponse("No files received.", { status: 400 });
    }

    const fileName = userImage.name.replaceAll(" ", "-");

    try {
        const uploadedImage = await sanityClient.assets.upload('image', userImage, {
            filename: fileName
        });

        await sanityClient
            .patch(userId)
            .set({
                avatar: {
                    _type: 'image',
                    asset: {
                        _type: "reference",
                        _ref: uploadedImage._id
                    }
                }
            })
            .commit();

        const data = uploadedImage.url;

        return NextResponse.json(data, { status: 200, statusText: "Avatar updated successfully" });
    } catch (error: any) {
        console.error('Error during avatar update:', error);
        return new NextResponse("Unable to create review", { status: 400 });
    }

}