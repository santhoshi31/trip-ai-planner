import React from 'react';

function TravelCost({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Travel Cost</h2>
            <div>
                {trip?.tripData?.trip?.itinerary?.map((item, index) => {
                    return (
                        <div key={index} className="my-3">
                            {/* Display the day */}
                            <h3 className="text-lg font-semibold text-rose-400">Day {item.day}</h3>

                            {/* Travel Cost Information */}
                            <div>
                                {item.travel_cost ? (
                                    <div className="p-3 flex gap-2">
                                        {item.travel_cost.flight && (
                                            <p>✈️ 𝐅𝐥𝐢𝐠𝐡𝐭: {item.travel_cost.flight}</p>
                                        )}
                                        {item.travel_cost.ferry && (
                                            <p>🚢 𝐅𝐞𝐫𝐫𝐲: {item.travel_cost.ferry}</p>
                                        )}
                                        {item.travel_cost.transport && (
                                            <p>🚗 𝐓𝐫𝐚𝐧𝐬𝐩𝐨𝐫𝐭: {item.travel_cost.transport}</p>
                                        )}
                                    </div>
                                ) : (
                                    <p>No travel cost information available</p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default TravelCost;
