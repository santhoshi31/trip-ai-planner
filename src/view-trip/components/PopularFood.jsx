import React from 'react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

function PopularFood({ trip }) {
    const navigate = useNavigate();
    const backscreen = () => {
        navigate('/create-trip');
    }
    return (
        <div>
            <h2 className='font-bold text-xl mt-5 gap-5'>𝐏𝐨𝐩𝐮𝐥𝐚𝐫 𝐅𝐨𝐨𝐝</h2>
            {/* Placeholder image or replace `placeholder.jpg` with a dynamic image source if available */}
            <img
                    src={'/food.jpg'}
                    className="h-[340px] w-full object-cover rounded-xl mt-5"
                />
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5">
                {Array.isArray(trip?.tripData?.trip?.popular_food) && trip.tripData.trip.popular_food.length > 0 ? (
                    trip.tripData.trip.popular_food.map((food, index) => (
                        <div key={index} className="rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer">                        
                        <p className="text-md italic">{food}</p>
                        </div>
                    ))
                ) : (
                    <p>No popular food information available</p>
                )}
            </div>
            <div className='font-semibold my-10 justify-center flex'>
            <Button variant='outline' onClick = {backscreen} >𝘽𝙖𝙘𝙠</Button>
            </div>
        </div>
    );
}

export default PopularFood;
