import { Aircraft, BookingDetails, BookingDetailsPay, Flight, User } from "@/models/models";
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

export const getAircrafts = async () => {
    const result = await sanityClient.fetch<Aircraft[]>(
        queries.getAircraft,
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
    flightType,
    flightDate,
    adults,
    children,
    totalPrice,
    discount
}: BookingDetailsPay) => {
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
                    flightType: {
                        _type: "reference",
                        _ref: flightType
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

export const getAllBookings = async () => {
    const result = await sanityClient.fetch<BookingDetails[]>(
        queries.getBookings,
        {},
        { cache: "no-cache" }
    );

    return result;
}

export const getUserBookings = async (userId: string) => {
    const result = await sanityClient.fetch<BookingDetails[]>(
        queries.getUserBookings,
        { userId },
        { cache: "no-cache" }
    );

    return result;
}

export const getUserData = async (userId: string) => {
    const result = await sanityClient.fetch<User>(
        queries.getUserDetails,
        { userId },
        { cache: "no-cache" }
    );

    return result;
}