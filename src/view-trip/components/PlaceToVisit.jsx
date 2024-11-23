import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function PlaceToVisit({ trip }) {
    const [photoUrls, setPhotoUrls] = useState({}); // Map to store photo URLs for each activity

    useEffect(() => {
        if (trip?.tripData?.trip?.itinerary) {
            trip.tripData.trip.itinerary.forEach((item, dayIndex) => {
                item.activities?.forEach((activity, activityIndex) => {
                    fetchPhotoUrl(activity, `${dayIndex}-${activityIndex}`);
                });
            });
        }
    }, [trip]);

    const fetchPhotoUrl = async (activity, key) => {
        const data = {
            textQuery: activity.name, // Use the activity name for the query
        };

        try {
            const result = await GetPlaceDetails(data);
            const photoName = result?.data?.places?.[0]?.photos?.[0]?.name; // Get the first photo name
            if (photoName) {
                const url = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrls((prev) => ({ ...prev, [key]: url })); // Update the map with the new photo URL
            }
        } catch (err) {
            console.error('Error fetching place details:', err);
        }
    };

    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Place To Visit</h2>
            <div>
                {trip?.tripData?.trip?.itinerary?.map((item, dayIndex) => (
                    <div key={dayIndex}>
                        <h3 className='font-bold text-lg mb-2 my-2'>Activities: Day {dayIndex + 1}</h3>
                        {Array.isArray(item.activities) ? (
                            item.activities.map((activity, activityIndex) => {
                                const key = `${dayIndex}-${activityIndex}`;
                                return (
                                    <div key={activityIndex} className="my-4">
                                        <Link
                                            to={`https://www.google.com/maps/search/?api=1&query=${activity.name},${activity?.address}`}
                                            target='_blank'>
                                            <h2 className="text-md font-semibold italic flex gap-2 my-2 text-rose-400">
                                                {activity.name || "Unnamed Activity"}:
                                            </h2>
                                                <img
                                                    src={photoUrls[key] || '/tourism.jpg'} // Use the fetched photo URL or a placeholder
                                                    alt={activity.name || "Activity Image"}
                                                    className='w-[300px] h-[200px] rounded-xl hover:scale-110 transition-all cursor-pointer'
                                                />
                                        </Link>
                                        <p>📝 𝐃𝐞𝐭𝐚𝐢𝐥𝐬: {activity.details || "No details available"}</p>
                                        <p>⛱️ 𝐁𝐞𝐬𝐭 𝐭𝐢𝐦𝐞 𝐭𝐨 𝐯𝐢𝐬𝐢𝐭: {activity.best_time_to_visit || "Not specified"}</p>
                                        <p>⏳ 𝐓𝐫𝐚𝐯𝐞𝐥 𝐭𝐢𝐦𝐞: {activity.travel_time || "Not specified"}</p>
                                        <p>💰 𝐓𝐢𝐜𝐤𝐞𝐭 𝐩𝐫𝐢𝐜𝐞: {activity.ticket_pricing || "Free"}</p>
                                        <p>⭐ 𝐑𝐚𝐭𝐢𝐧𝐠: {activity.rating || "Not rated"}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No activities available</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlaceToVisit;
