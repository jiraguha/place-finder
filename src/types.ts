interface Coordinates {
    lat: number;
    lng: number;
}

interface PlaceResult {
    found: boolean;
    place?: string;
    locationType?: 'city' | 'country';
    city?: string | null;
    country?: string;
    countryCode?: string;
    coordinates?: Coordinates;
    message?: string;
}