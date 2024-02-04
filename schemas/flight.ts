import { defineField } from "sanity";

const flightTypes = [
    { title: "Airplane", value: "airplane" },
    { title: "Helicopter", value: "helicopter" },
    { title: "Group tour", value: "group" },
    { title: "Wedding Flight", value: "wedding" },
    { title: "Romantic Flight", value: "romantic" },
    { title: "Balloon", value: "balloon" }
]

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
                type: "object",
                fields: [
                    { name: "url", type: "url", title: "URL" },
                    { name: "file", type: "file", title: "File" }
                ]
            }],
            validation: Rule => Rule.required().min(3).error("Minimum three images required.")
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "object",
            fields: [
                { name: "url", type: "url", title: "URL" },
                { name: "file", type: "file", title: "File" }
            ],
            validation: Rule => Rule.required().error("Cover image is required.")
        }),
        defineField({
            name: "type",
            title: "Flight Type",
            type: "string",
            options: {
                list: flightTypes
            },
            initialValue: "airplane",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "specialNote",
            title: "Special Note",
            type: "text",
            validation: Rule => Rule.required(),
            initialValue: "To ensure a smooth booking process, please note that reservations should be made at least 48 hours in advance. You can consider your booking validated only, once you receive the confirmation email.",
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
            name: "isBooked",
            title: "Is Booked",
            type: "boolean",
            initialValue: false
        }),
        defineField({
            name: "isFeatured",
            title: "Is Featured",
            type: "boolean",
            initialValue: false
        }),
        defineField({
            name: "reviews",
            title: "Reviews",
            type: "array",
            of: [{ type: "review" }]
        }),
    ]
}

export default flight;