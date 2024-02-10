import { groq } from "next-sanity";

export const getHighlightedProgramQuery = groq`*[_type == "flight" && isFeatured == true][0] {
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
    type,
}`

export const getFlightProgramQuery = groq`*[_type == "flight"] {
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
    type,
}`