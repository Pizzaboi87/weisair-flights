type CoverImage = {
    url: string;
}

export type Image = {
    _key: string;
    url: string;
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
    isBooked: boolean;
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
    user: string;
    flightProgram: {
        coverImage: CoverImage,
        programName: string
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