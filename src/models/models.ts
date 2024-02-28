type CoverImage = {
    asset: {
        url: string;
    }
}

export type Image = {
    asset: {
        _id: string;
        url: string;
    }
}

type Amenity = {
    _key: string;
    amenity: string;
    icon: string;
}

type Slug = {
    _type: string;
    current: string;
}

export type RefType = {
    _ref: string;
    _type: string;
}

export type Flight = {
    _id: string;
    coverImage: CoverImage;
    description: string;
    discount: number;
    images: Image[];
    isFeatured: boolean;
    offeredAmenities: Amenity[];
    price: number;
    programLength: number;
    programName: string;
    seats: number;
    slug: Slug;
    specialNote: string;
    generalKnowledge: string;
    type: {
        _id: string,
        _type: string,
        quantity: number,
        slug: {
            current: string,
            _type: string
        }
    }
}

export type Aircraft = {
    _id: string;
    quantity: number;
    slug: Slug;
    type: string;
}

export type BookingDetails = {
    _id: string;
    user: string;
    flightProgram: {
        _id: string,
        coverImage: CoverImage,
        programName: string,
        slug: Slug
    }
    flightTypeId: string;
    flightType: {
        _id: string,
        _type: string,
        quantity: number,
        slug: {
            current: string,
            _type: string
        }
    },
    flightDate: string;
    adults: number;
    children: number;
    discount: number;
    totalPrice: number;
}

export type BookingDetailsPay = {
    user: string;
    flightProgram: string;
    flightType: string;
    flightDate: string;
    adults: number;
    children: number;
    discount: number;
    totalPrice: number;
}

export type User = {
    _createdAt: string;
    _id: string;
    _type: string;
    isAdmin: boolean,
    email: string;
    image: string;
    name: string;
    about: string;
}

export type ReviewExist = {
    _id: string;
}

export type EmailExist = {
    emailAddress: string;
}

export type UpdateReviewData = {
    reviewId: string;
    userReview: string;
    userRating: number;
}

export type CreateReviewData = {
    userId: string;
    flightProgram: string;
    flightBooking: string;
    userReview: string;
    userRating: number;
}

export type GetReviewData = {
    _createdAt: Date;
    _id: string;
    userReview: string;
    userRating: number;
    flightProgram: {
        _ref: string;
    };
    user: {
        name: string;
    }
}

export type About = {
    userId: string;
    aboutMe: string;
}

export type CreateSubscriberUser = {
    newAddress: string;
    userName: string;
}