import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';


// Dialog import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Footer from '@/view-trip/components/Footer';


function Hero() {

  const [openDailog,setOpenDailog] = useState(false);
  const navigate = useNavigate();


  const login = useGoogleLogin({
    onSuccess:(codeResp) => GetUserProfile(codeResp),
    onError:(error) => console.log(error)
  })

  const SignIn=() =>
  {
    const user=localStorage.getItem('user');
    if(!user){
      setOpenDailog(true)
      return
    }
    else{
      navigate('/create-trip'); // Redirect to create-trip screen if sign-in is completed
    }
  }

  const GetUserProfile=(tokenInfo) =>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,{
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      navigate('/create-trip'); // Redirect after sign-in success
    })
  }

  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1
        className='font-extrabold text-[40px] text-center mt-9'>
        <span className='text-[#e60e0e]'>
        Discover Your Next Wonder with AI:</span> Personalized Itineraries at your Fingertips
        <p className='text-xl text-pink-600 text-center mt-9'>Your personal trip planner and travel curator, creating custom intineraries tailored to your interests and budget. </p>
      </h1>

      <img src={'/first-page.jpg'} className='h-[340px] w-full object-cover rounded-xl' />

        <Button variant='outline' onClick={SignIn}> Start</Button>

      <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <div className='flex flex-col items-center'>
                <img src='/logo.svg'/>
                <h2 className='font-bold font-serif text-xl'>Sign in to Wander Weaver</h2>
                </div>
                <Button 
                 onClick = {login}
                 className='w-full mt-5 font-serif font-extrabold flex gap-3 items-center'>
                 <FcGoogle  className='h-10 w-10'/>
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Hero
