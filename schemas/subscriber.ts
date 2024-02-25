import { defineField } from "sanity";

type Selection = {
    emailAddress: string;
}

const subscriber = {
    name: 'subscriber',
    title: 'Subscriber',
    type: 'document',
    options: {
        preview: {
            select: {
                emailAddress: "emailAddress"
            },
            prepare(selection: Selection) {
                const { emailAddress } = selection;
                return {
                    title: emailAddress
                };
            }
        }
    },
    fields: [
        defineField({
            name: 'emailAddress',
            title: 'Email',
            type: 'string',
            description: "Email address",
            validation: Rule => Rule.required().email()
        }),
        defineField({
            name: 'userName',
            title: 'User',
            description: "Name of the user",
            type: 'string',
            validation: Rule => Rule.required()
        })
    ]
}

export default subscriber;
