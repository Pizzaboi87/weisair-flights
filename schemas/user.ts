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
            description: "Image of the user"
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
            description: "Brief description of the user"
        })
    ]
}

export default user;