import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import jetski from '../assets/redOnWhite-removebg-preview.png'
import { urlFor } from '../lib/client'

const Header = ({ headerBanner }) => {
  const bannerUrl = urlFor(headerBanner?.image[0])
  // const styles = {
  //   backgroundImage: `url(${bannerUrl})`,
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  // }

  return (
    <div className='w-full'>
      <div className='h-48 flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-white font-bold text-center text-xl'>{headerBanner?.bannerTitle}</h1>
        </div>
        <Image src={jetski} width={250} height={250}/>
      </div>
    </div>
  )
}

export default Header