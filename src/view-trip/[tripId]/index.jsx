import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlaceToVisit from '../components/PlaceToVisit';
import TravelCost from '../components/TravelCost';
import PopularFood from '../components/PopularFood';
import Footer from '../components/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([])
    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    // Used to get trip information from firebase DB

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log("No Such Document")
            toast('No trip Found')
        }
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}
            <Hotels trip={trip} />
            {/* Daily Plan */}
            <PlaceToVisit trip={trip} />
            <TravelCost trip={trip} />
            <PopularFood trip={trip} />
            {/* Footer */}
            <Footer trip={trip} />

        </div>
    )
}

export default Viewtrip
