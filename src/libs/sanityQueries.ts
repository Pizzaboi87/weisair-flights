import { groq } from "next-sanity";

export const getAircraft = groq`*[_type == "aircraft"] {
    _id,
    quantity,
    slug,
    type
}`

export const getHighlightedProgramQuery = groq`*[_type == "flight" && isFeatured == true][0] {
    _id,
    coverImage,
    description,
    discount,
    images,
    isFeatured,
    price,
    programName,
    slug,
    type,
}`

export const getFlightProgramQuery = groq`*[_type == "flight"] {
    _id,
    coverImage,
    description,
    images,
    price,
    programLength,
    programName,
    seats,
    slug,
    type,
}`

export const getFlightDetails = groq`*[_type == "flight" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    discount,
    images,
    isBooked,
    isFeatured,
    offeredAmenities,
    price,
    programLength,
    programName,
    seats,
    slug,
    specialNote,
    generalKnowledge,
    type,
}`