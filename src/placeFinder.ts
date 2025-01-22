import fetch from 'node-fetch';

/**
 * Searches for a place using the Google Maps Geocoding API
 * 
 * @param placeName - The name of the place to search for (e.g., "Paris, France")
 * @returns Promise resolving to a PlaceResult object containing location details
 * @throws Will throw an error if the API key is not set
 * 
 * @example
 * ```typescript
 * const result = await findPlace("Tokyo, Japan");
 * if (result.found) {
 *   console.log(result.coordinates);
 * }
 * ```
 */
export async function findPlace(placeName: string): Promise<PlaceResult> {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
            throw new Error('Please set the GOOGLE_MAPS_API_KEY environment variable');
        }

        // Construct the Geocoding API URL
        const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
        const params = new URLSearchParams({
            address: placeName,
            key: apiKey
        });

        // Make the API request
        const response = await fetch(`${endpoint}?${params}`);
        const data = await response.json() as any;

        console.log(data)
        // Check if we got any results
        if (data.status === 'OK' && data.results.length > 0) {
            const result = data.results[0];
            
            // Find the different components
            const cityComponent = result.address_components.find((component: any) => 
                component.types.includes('locality') || 
                component.types.includes('administrative_area_level_1')
            );
            
            const countryComponent = result.address_components.find((component: any) =>
                component.types.includes('country')
            );

            if (countryComponent) {
                return {
                    found: true,
                    place: result.formatted_address,
                    locationType: cityComponent ? 'city' : 'country',
                    city: cityComponent?.long_name || null,
                    country: countryComponent.long_name,
                    countryCode: countryComponent.short_name,
                    coordinates: {
                        lat: result.geometry.location.lat,
                        lng: result.geometry.location.lng
                    }
                };
            }
        }

        return {
            found: false,
            message: `Could not find location information for "${placeName}"`
        };

    } catch (error) {
        return {
            found: false,
            message: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
        };
    }
}
