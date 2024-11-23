import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ModeToggle } from '../ui/themetoggle'
import { ThemeProvider } from '../ui/ThemeProvider'
import { useGoogleOAuth } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

function Header({ children }) {

  const user = JSON.parse(localStorage.getItem('user'))
  const Navigate = useNavigate();
  const googleAuth = useGoogleOAuth();


  useEffect(() => {
    console.log(user)
  }, [])

  const handleLogout = async () => {
    try {
      // Revoke Google token (if necessary)
      if (user?.accessToken) {
        await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${user.accessToken}`, {
          method: 'POST',
          headers: {
            Accept: 'Application/json'
          },
        });
      }
      // Clear localStorage and redirect to home page
      localStorage.clear();
      Navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-6'>
      <img src='/logo.svg' />
      <div>
        <div className='flex items-center gap-3'>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
            {/* Render Hero Component */}
            <ModeToggle />
          </ThemeProvider>
          {user ?
          <Popover>
            <PopoverTrigger>
          <img src={user?.picture || '/download.jpeg'} className='rounded-full w-[35px] h-[35px]' />
          </PopoverTrigger>
          <PopoverContent>
            <h2 className='cursor-pointer' onClick={handleLogout}>LogOut</h2>
            </PopoverContent>
            </Popover>
            :
            <img src={'/download.jpeg'} className='rounded-full w-[35px] h-[35px]' />
          }
        </div>
      </div>
    </div>
  )
}

export default Header
