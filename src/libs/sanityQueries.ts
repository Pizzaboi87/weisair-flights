import { groq } from "next-sanity";

export const getHighlightedProgramQuery = groq`*[_type == "flight" && isFeatured == true][0] {
    _id,
    coverImage {
        asset -> {
            url
        }
    },
    description,
    discount,
    images[] {
        asset -> {
            _id,
            url
        }
    },
    isFeatured,
    price,
    programName,
    slug,
    type,
}`

export const getFlightProgramQuery = groq`*[_type == "flight"] {
    _id,
    coverImage {
        asset -> {
            url
        }
    },
    description,
    images[] {
        asset -> {
            _id,
            url
        }
    },
    price,
    programLength,
    programName,
    seats,
    slug,
    type -> {
        _id,
        _type,
        quantity,
        slug
    }
}`

export const getFlightDetails = groq`*[_type == "flight" && slug.current == $slug][0] {
    _id,
    coverImage {
        asset -> {
            url
        }
    },
    description,
    discount,
    images[] {
        asset -> {
            _id,
            url
        }
    },
    isFeatured,
    offeredAmenities,
    price,
    programLength,
    programName,
    seats,
    slug, 
    specialNote,
    generalKnowledge,
    type -> {
        _id,
        _type,
        quantity,
        slug
    }
}`

export const getBookings = groq`*[_type == "booking"] {
    flightType -> {
        _id,
        _type,
        quantity,
        slug
    },
    flightDate,
}`

export const getUserBookings = groq`*[_type == "booking" && user._ref == $userId] {
    _id,
    user,
    flightProgram -> {
        _id,
        coverImage {
            asset -> {
                url
            }
        },
        programName,
        slug
    },
    flightType,
    flightDate,
    adults,
    children,
    discount,
    totalPrice,
}`

export const getUserDetails = groq`*[_type == "user" && _id == $userId][0] {
    _createdAt,
    _id,
    _type,
    isAdmin,
    email,
    image,
    name,
    about,
    avatar {
        asset -> {
            url
        }
    }
}`

export const getIfReviewExists = groq`*[_type == "review" && user._ref == $userId && flightBooking._ref == $bookingId][0] {
    _id
}`

export const getReview = groq`*[_type == "review" && _id == $reviewId][0] {
    userRating,
    userReview
}`

export const getAllReview = groq`*[_type == "review" && flightProgram._ref == $flightId] {
    _createdAt,
    _id,
    user -> {
        name
    },
    userRating,
    userReview
}`

export const getIfEmailExist = groq`*[_type == "subscriber" && emailAddress == $address][0] {
    emailAddress
}`