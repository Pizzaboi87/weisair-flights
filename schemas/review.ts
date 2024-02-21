import { defineField } from "sanity";

type Selection = {
    userName: string;
    programName: string;
}

const review = {
    name: "review",
    title: "Review",
    type: "document",
    options: {
        preview: {
            select: {
                userName: "user.name",
                programName: "flightProgram.programName"
            },
            prepare(selection: Selection) {
                const { userName, programName } = selection;
                return {
                    title: `User: ${userName}, Flight Program: ${programName}`
                };
            }
        }
    },
    fields: [
        defineField({
            name: "user",
            title: "User",
            type: "reference",
            to: [{ type: "user" }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "flightProgram",
            title: "Flight Program",
            type: "reference",
            to: [{ type: "flight" }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "flightBooking",
            title: "Flight Booking",
            type: "reference",
            to: [{ type: "booking" }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "userReview",
            title: "Review Text",
            type: "text",
            validation: Rule => Rule.required().min(10).error("The review should be minimum 10 characters long.")
        }),
        defineField({
            name: "userRating",
            title: "User Rating",
            type: "number",
            validation: Rule => Rule.required().min(1).max(5).error("The rating must be between 1 and 5")
        }),
    ]
}

export default review;