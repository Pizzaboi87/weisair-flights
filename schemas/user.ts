import { defineField } from "sanity";

const user = {
    name: "user",
    title: "User",
    type: "document",
    fields: [
        defineField({
            name: "isAdmin",
            title: "Is Admin",
            type: "boolean",
            description: "Check if the user is admin",
            initialValue: false,
            validation: Rule => Rule.required(),
            //readOnly: true,
            //hidden: true
        }),
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            description: "Name of the user",
            validation: Rule => Rule.required(),
            readOnly: true
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "url",
            description: "Image of the user",
        }),
        defineField({
            name: "avatar",
            title: "Avatar",
            type: "image",
            description: "Avatar of the user",
            options: {
                hotspot: true
            },
            initialValue: {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: "image-d26040832b67ae4abd37719a322f67339e0cb430-512x512-webp"
                }
            }
        }),
        defineField({
            name: "email",
            title: "Email Address",
            description: "Email address of the user",
            type: "string",
            readOnly: true,
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "password",
            title: "Password",
            type: "string",
            description: "Password of the user",
            hidden: true
        }),
        defineField({
            name: "about",
            title: "About",
            type: "text",
            description: "Brief description of the user",
            initialValue: "I believe I can fly..."
        })
    ]
}

export default user;