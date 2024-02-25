import { About, Aircraft, BookingDetails, BookingDetailsPay, CreateReviewData, CreateSubscriberUser, EmailExist, Flight, GetReviewData, ReviewExist, UpdateReviewData, User } from "@/models/models";
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

export const checkReviewExists = async (userId: string, bookingId: string): Promise<null | { _id: string }> => {
    const result = await sanityClient.fetch<ReviewExist>(
        queries.getIfReviewExists,
        { userId, bookingId },
        { cache: "no-cache" }
    );

    return result;
}

export const getReview = async (reviewId: string): Promise<null | GetReviewData> => {
    const result = await sanityClient.fetch<GetReviewData>(
        queries.getReview,
        { reviewId },
        { cache: "no-cache" }
    );

    return result;
}

export const getReviews = async (flightId: string) => {
    const result = await sanityClient.fetch<GetReviewData[]>(
        queries.getAllReview,
        { flightId },
        { cache: "no-cache" }
    );

    return result;
}

export const updateReview = async ({ reviewId, userReview, userRating }: UpdateReviewData) => {
    const mutation = {
        mutations: [
            {
                patch: {
                    id: reviewId,
                    set: {
                        userReview,
                        userRating,
                    }
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

export const createReview = async ({
    userId,
    flightProgram,
    flightBooking,
    userReview,
    userRating
}: CreateReviewData) => {
    const mutation = {
        mutations: [
            {
                create: {
                    _type: "review",
                    user: {
                        _type: "reference",
                        _ref: userId
                    },
                    flightProgram: {
                        _type: "reference",
                        _ref: flightProgram
                    },
                    flightBooking: {
                        _type: "reference",
                        _ref: flightBooking
                    },
                    userReview,
                    userRating
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

export const updateAbout = async ({
    userId,
    aboutMe
}: About) => {
    const mutation = {
        mutations: [
            {
                patch: {
                    id: userId,
                    set: {
                        about: aboutMe
                    }
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
};

export const checkEmailIsExists = async (address: string): Promise<null | { emailAddress: string }> => {
    const result = await sanityClient.fetch<EmailExist>(
        queries.getIfEmailExist,
        { address },
        { cache: "no-cache" }
    );

    return result;
}

export const createNewSubscriberWithUser = async ({ newAddress, userName }: CreateSubscriberUser) => {
    const mutation = {
        mutations: [
            {
                create: {
                    _type: "subscriber",
                    emailAddress: newAddress,
                    userName
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