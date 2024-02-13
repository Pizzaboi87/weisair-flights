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
    type: string;
}

export type BookingDetails = {
    user: string;
    flightProgram: string;
    flightDate: string;
    adults: number;
    children: number;
    discount: number;
    totalPrice: number;
}