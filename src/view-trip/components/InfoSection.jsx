import { GetPlaceDetails, PHOTO_REF_URL} from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaShare } from "react-icons/fa";
import { Button } from '../../components/ui/button';





function InfoSection({ trip }) {

    const [photoUrl,setPhotoUrl] = useState();
    useEffect(() => {
        if (trip) GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.Tlocation?.label,
        };

        try {
            
            const result = await GetPlaceDetails(data);
            console.log(result,"bujjjjjjj");
            console.log(result.data.places[0].photos[6].name);

            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[4].name)
            setPhotoUrl(PhotoUrl);
        } catch (err) {
            console.error('Error fetching place details:', err);
        }
    };

    return (
        <div>
            <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl' />
            <div className='my-4 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl text-rose-400'>{trip?.userSelection?.Tlocation?.label}</h2>

                <div className='my-2 flex justify-between items-center'>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 rounded-lg text-l md:text-md'>📆{trip?.userSelection?.noOfDays} Day/Days</h2>
                        <h2 className='p-1 px-3 rounded-lg text-l md:text-md'>💰{trip?.userSelection?.budget}</h2>
                        <h2 className='p-1 px-3 rounded-lg text-l md:text-md'>🎉 No. Of Traveler {trip?.userSelection?.traveler} </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
