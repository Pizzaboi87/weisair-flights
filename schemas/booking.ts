import { defineField } from "sanity";

const booking = {
    name: "booking",
    title: "Booking",
    type: "document",
    fields: [
        defineField({
            name: "user",
            title: "User",
            type: "reference",
            to: [{ type: "user" }],
            validation: Rule => Rule.required().error("Username is required.")
        }),
        defineField({
            name: "flightProgram",
            title: "Flight Program",
            type: "reference",
            to: [{ type: "flight" }],
            validation: Rule => Rule.required().error("Flight program name is required.")
        }),
        defineField({
            name: "flightDate",
            title: "Flight Date",
            type: "date",
            validation: Rule => Rule.required().error("Date is required.")
        }),
        defineField({
            name: "adults",
            title: "Number of adult passengers",
            type: "number",
            initialValue: 1,
            validation: Rule => Rule.required().min(1).error("The minimum of adult passengers is one.")
        }),
        defineField({
            name: "children",
            title: "Number of child passengers",
            type: "number",
            initialValue: 0,
            validation: Rule => Rule.required().min(0).error("The number of child passengers should be 0 or above.")
        }),
        defineField({
            name: "discount",
            title: "Discount",
            type: "number",
            initialValue: 0,
            validation: Rule => Rule.required().min(0).error("The discount should be 0 or above.")
        }),
        defineField({
            name: "totalPrice",
            title: "Total Price",
            type: "number",
            validation: Rule => Rule.required().min(0).error("The total price should be 0 or above.")
        }),

    ]
}

export default booking;