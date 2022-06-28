import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import banner from '../assets/work2playbanner.JPG'

const Header = () => {
  const styles = {
    backgroundImage: `url(${banner})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className='w-screen'>
      <div className='lg:-mt-24'>
        <Image src={banner} sizes='100%' objectFit='cover'/>
      </div>
      {/* <div className='h-48 flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
        </div>
      </div> */}
    </div>
  )
}

export default Header