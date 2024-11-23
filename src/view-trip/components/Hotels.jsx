import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
    const [photoUrls, setPhotoUrls] = useState({}); // Map of photo URLs by hotel index

    useEffect(() => {
        if (trip?.tripData?.trip?.hotels) {
            trip.tripData.trip.hotels.forEach((hotel, index) => {
                fetchPhotoUrl(hotel, index);
            });
        }
    }, [trip]);

    const fetchPhotoUrl = async (hotel, index) => {
        const data = {
            textQuery: hotel.name, // Use the hotel's name to query the API
        };

        try {
            const result = await GetPlaceDetails(data);
            const photoName = result?.data?.places?.[0]?.photos?.[0]?.name; // Get the first photo name
            if (photoName) {
                const url = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrls((prev) => ({ ...prev, [index]: url })); // Update the state for the current hotel
            }
        } catch (err) {
            console.error('Error fetching place details:', err);
        }
    };

    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-5 gap-5'>
                {trip?.tripData?.trip?.hotels?.map((hotel, index) => (

                    <div className="mb-4 hover:scale-110 transition-all cursor-pointer">
                        <Link
                            key={index}
                            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`}
                            target='_blank'
                        >
                            <img
                                src={photoUrls[index] || '/placeholder.jpg'} // Use fetched photo URL or fallback to placeholder
                                alt={hotel?.name}
                                className='rounded-xl w-[600px] h-[200px]'
                            />
                        </Link>
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-bold text-rose-400'>{hotel?.name}</h2>
                            <h2 className='text-s'>🎈{hotel?.address}</h2>
                            <h2 >💶{hotel?.price}</h2>
                            <h2 >⭐{hotel?.rating}</h2>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default Hotels;
