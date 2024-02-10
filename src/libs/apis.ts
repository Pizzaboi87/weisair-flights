import { Flight } from "@/models/flight";
import sanityClient from "./sanity"
import * as queries from "./sanityQueries"

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
        queries.getFlightProgramQuery
    );

    return result;
}