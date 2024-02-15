import { defineField } from "sanity";

const airCraft = {
    name: "aircraft",
    title: "Aircraft",
    type: "document",
    fields: [
        defineField({
            name: "type",
            title: "Aircraft type",
            type: "string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "type"
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "quantity",
            title: "Aircraft Quantity",
            type: "number",
            validation: Rule => Rule.required().min(0),
            initialValue: 0
        })
    ]
}

export default airCraft;