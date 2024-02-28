import { defineField } from "sanity";

const flight = {
    name: "flight",
    title: "Flight Program",
    type: "document",
    fields: [
        defineField({
            name: "programName",
            title: "Program Name",
            type: "string",
            validation: Rule => Rule.required().max(50).error("Maximum 50 characters")
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "programName"
            },
            validation: Rule => Rule.required().error("Slug is required.")
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: Rule => Rule.required().min(100).error("Minimum 100 characters")
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            initialValue: 0,
            validation: Rule => Rule.required().min(100).error("Minimum price is 100€")
        }),
        defineField({
            name: "discount",
            title: "Discount",
            type: "number",
            initialValue: 0,
            validation: Rule => Rule.min(0).error("The number should be 0 or above.")
        }),
        defineField({
            name: "images",
            title: "Images",
            type: "array",
            of: [{
                name: "image",
                title: "Image",
                type: "image",
                options: {
                    hotspot: true
                },
            }],
            validation: Rule => Rule.required().min(3).error("Minimum three images required.")
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required().error("Cover image is required.")
        }),
        defineField({
            name: "type",
            title: "Flight Type",
            type: "reference",
            to: [{ type: "aircraft" }],
            validation: Rule => Rule.required().error("Aircraft type is required.")
        }),
        defineField({
            name: "specialNote",
            title: "Special Note",
            type: "text",
            validation: Rule => Rule.required(),
            initialValue: "To ensure a smooth booking process, please note that reservations should be made at least 48 hours in advance. You can consider your booking validated only, once you receive the confirmation email.",
        }),
        defineField({
            name: "generalKnowledge",
            title: "General Knowledge",
            type: "text",
            validation: Rule => Rule.required(),
            initialValue: "Important Information for Your Flight Experience**Thank you for choosing our service for your upcoming flight adventure! To ensure a smooth and enjoyable experience, please take note of the following essential information:**Package Inclusions:**Your chosen package includes flight tickets, insurance coverage, and other specified amenities. Rest assured, we've taken care of all the essentials to make your journey as convenient and comfortable as possible.**Arrival Time:**We recommend arriving at the airport at least one hour prior to your scheduled departure time. This allows ample time for check-in procedures, security screenings, and any unforeseen delays, ensuring a stress-free start to your adventure.**Ticket Presentation:**You are not required to print your ticket; however, please ensure you have the QR code available for scanning. The QR code is essential for check-in and boarding purposes and will be provided to you via email prior to your travel date.**Pre-flight Briefing:**Before boarding, you will participate in a brief pre-flight orientation session. This session, typically lasting around thirty minutes, covers important safety procedures, boarding instructions, and any other relevant information to ensure your comfort and well-being during the flight.**Weather Conditions:**Please note that flight schedules may be subject to change based on weather conditions and other factors beyond our control. We prioritize the safety of our passengers above all else and will make necessary adjustments to your itinerary if required.**Contact Information:**Should you have any questions or require assistance before or during your journey, our customer service team is available to assist you. Please don't hesitate to reach out to us via phone, email, or our online chat support for prompt assistance.**We look forward to welcoming you aboard and providing you with an unforgettable flight experience. Safe travels and enjoy your adventure!"
        }),
        defineField({
            name: "programLength",
            title: "Program length",
            type: "number",
            validation: Rule => Rule.required().min(60).error("The minimum length is one hour (60 min)"),
            initialValue: 60
        }),
        defineField({
            name: "seats",
            title: "Seats",
            type: "number",
            validation: Rule => Rule.required().min(1).error("The minimum number of seats should be more than one."),
            initialValue: 1
        }),
        defineField({
            name: "offeredAmenities",
            title: "Offered Amenities",
            type: "array",
            of: [{
                type: "object",
                fields: [
                    { name: "icon", title: "Icon", type: "string" },
                    { name: "amenity", title: "Amenity", type: "string" }
                ]
            }]
        }),
        defineField({
            name: "isFeatured",
            title: "Is Featured",
            type: "boolean",
            initialValue: false
        })
    ]
}

export default flight;