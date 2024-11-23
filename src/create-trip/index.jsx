import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { AI_PROMPT, SelectBudgetOption, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/FirebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Footer from '@/view-trip/components/Footer';


function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData]);

  // creating the trip and giving the promt to the AI and getting the data and saving it to the Firebase

  const OnGenerateTrip = async () => {

    if (!formData?.Flocation) {
      toast('Please select your Starting location')
      return;
    }

    if (!formData?.Tlocation) {
      toast('Please select your Destination Place')
      return;
    }

    if (!formData?.noOfDays) {
      toast('Please enter Number of Days')
      return;
    }

    if (formData?.noOfDays > 10) {
      toast('Please enter less than 11 days')
      return;
    }

    if (formData?.noOfDays < 1) {
      toast('Please enter more than 0 days')
      return;
    }

    if (!formData?.budget) {
      toast('Please select a budget')
      return;
    }

    if (!formData?.traveler) {
      toast('Please select number of travelers')
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{FLocation}', formData?.Flocation?.label)
      .replace('{TLocation}', formData?.Tlocation?.label)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text())
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  // For saving data in Firestore

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user')); // Parse the user data
    const docId = Date.now().toString();

    try{
      const tripDataObject = typeof TripData === 'string' ? JSON.parse(TripData) : TripData


      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: tripDataObject,
        userEmail : user?.email,
        id: docId
      });
    } catch (error) {
      console.log("Error saving document:", error);
    } finally {
      setLoading(false);
      navigate('/view-trip/'+docId);
    }
  }

  return (

    // for intro purposes

    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us about your travel preferences</h2>
      <p className='mt-3 text-xl'>Just Provide some basic information, and our trip planner will generate a customized itinerary based on your preferences. </p>

      <div className='mt-9 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Starting your trip from?</h2>
          <div className='text-gray-800'>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('Flocation', v) }
              }}
            />
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination</h2>
          <div className='text-gray-800'>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('Tlocation', v) }
              }}
            />
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
          <Input placeholder={'Ex.11'} type='number'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-7 mt-5 border-white'>
          {SelectBudgetOption.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.desc)}
              className={`p-3 cursor-pointer
            round-lg hover:shadow-xl shadow-xl border-red-600
            ${formData?.budget == item.desc && 'border'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-lg text-gray-300'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>With Whom your traveling for your next Wonder</h2>
        <div className='grid grid-cols-3 gap-7 mt-5'>
          {SelectTravelsList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-3 cursor-pointer 
              round-lg hover:shadow-xl shadow-xl border-red-600
              ${formData?.traveler == item.people && 'border'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-xl'>{item.title}</h2>
              <h2 className='text-lg text-gray-300'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-center flex'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </Button>
      </div>
       {/* Footer */}
       <Footer />
    </div>
  )
}

export default CreateTrip
