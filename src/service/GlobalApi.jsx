import axios from 'axios';

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

export const GetPlaceDetails = async (data) => {
        console.log(data,"fun called");
        return axios.post('https://places.googleapis.com/v1/places:searchText',
            { textQuery: data.textQuery }, // Correct body for the API
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY, // API key in headers
                    'X-Goog-FieldMask': 'places.photos,places.displayName,places.id', // Comma-separated fields
                },
            },
            {params: {
                key: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,  // Alternatively, pass the API key here if required
            },
        });
};
