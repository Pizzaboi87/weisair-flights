import { BookingDetails, Flight } from "@/models/flight";
import sanityClient from "./sanity"
import * as queries from "./sanityQueries"
import axios from "axios";

export const getHighlightedProgram = async () => {
    const result = await sanityClient.fetch<Flight>(
        queries.getHighlightedProgramQuery,
        {},
        { cache: "no-cache" }
    );

    return result;
}

export const getFlightProgram = async () => {
    const result = await sanityClient.fetch<Flight[]>(
        queries.getFlightProgramQuery,
        {},
        { cache: "no-cache" }
    );

    return result;
}

export const getFlightProgramDetails = async (slug: string) => {
    const result = await sanityClient.fetch<Flight>(
        queries.getFlightDetails,
        { slug },
        { cache: "no-cache" }
    );

    return result;
}

export const createBooking = async ({
    user,
    flightProgram,
    flightDate,
    adults,
    children,
    totalPrice,
    discount
}: BookingDetails) => {
    const mutation = {
        mutations: [
            {
                create: {
                    _type: "booking",
                    user: {
                        _type: "reference",
                        _ref: user,
                    },
                    flightProgram: {
                        _type: "reference",
                        _ref: flightProgram
                    },
                    flightDate,
                    adults,
                    children,
                    totalPrice,
                    discount
                }
            }
        ]
    };
    const { data } = await axios.post(
        `https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
        mutation,
        { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );

    return data;
}