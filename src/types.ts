/**
 * Represents geographical coordinates with latitude and longitude
 */
interface Coordinates {
    /** Latitude in decimal degrees */
    lat: number;
    /** Longitude in decimal degrees */
    lng: number;
}

/**
 * Represents the result of a place search operation
 */
interface PlaceResult {
    /** Indicates if the place was successfully found */
    found: boolean;
    /** The formatted address of the found place */
    place?: string;
    /** The type of location found - either a city or country */
    locationType?: 'city' | 'country';
    /** The city name if available, null if not applicable */
    city?: string | null;
    /** The country name of the found place */
    country?: string;
    /** The ISO country code (e.g., 'US', 'GB') */
    countryCode?: string;
    /** The geographical coordinates of the place */
    coordinates?: Coordinates;
    /** Error or information message when place is not found */
    message?: string;
}
