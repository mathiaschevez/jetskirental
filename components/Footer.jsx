import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

const Footer = () => {
  const router = useRouter()
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    if(router.pathname === '/success') { setShowMap(true) }
    if(router.pathname !== '/success') { setShowMap(false) }
  }, [router.pathname])

  return (
    <div className='flex flex-col justify-center items-center py-6 border-t-2 xl:w-2/3 lg:m-auto'>
      { showMap && (
        <div className='flex flex-col justify-center items-center py-6 w-full'>
          <div>
            <h1 className='text-2xl mb-6 font-semibold'>WHERE TO FIND US</h1>
          </div>
          <iframe className='w-4/5 lg:w-full h-[200px] sm:h-[300px] lg:h-[400px] lg:px-9' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.4082866198787!2d-112.07914468429252!3d41.12561222014451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87531ae6af5e7fef%3A0x69207904a80241c8!2s2618%20W%20800%20N%2C%20Clinton%2C%20UT%2084015!5e0!3m2!1sen!2sus!4v1655220995454!5m2!1sen!2sus" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      )}
      <div>
        {/* MAYBE SOME SOCIAL MEDIA STUFF HERE  */}
        <h1 className={`${showMap ? 'mt-12' : 'mt-3'}`}>Work 2 Play Rentals  &copy; 2022</h1>
      </div>
    </div>
  )
}

export default Footer