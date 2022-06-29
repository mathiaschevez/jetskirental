import Image from 'next/image'
import React from 'react'
import banner from '../assets/work2playbanner.JPG'

const Header = () => {
  return (
    <div className='w-screen'>
      <div className='lg:-mt-24 xl:w-2/3 xl:-mt-12 m-auto'>
        <Image src={banner} sizes='100%' objectFit='contain'/>
      </div>
    </div>
  )
}

export default Header