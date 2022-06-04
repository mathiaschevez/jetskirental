import Image from 'next/image'
import React from 'react'
import Banner from '../assets/jetskifamilyfun.jpg'
import { urlFor } from '../lib/client'

const Header = ({ headerBanner }) => {
  const bannerUrl = urlFor(headerBanner?.image[0])
  const styles = {
    backgroundImage: `url(${bannerUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className='w-full'>
      <div style={styles} className='h-auto flex justify-center items-center py-10'>
        <div className='flex flex-col w-4/5 h-full gap-12 justify-center items-center'>
          <h1 className='text-white font-bold text-center text-xl'>{headerBanner?.bannerTitle}</h1>
          <button className='text-white bg-blue-700 w-2/3 rounded py-3 font-bold'>{headerBanner.buttonText}</button>
        </div>
      </div>
    </div>
  )
}

export default Header