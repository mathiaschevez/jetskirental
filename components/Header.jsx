import Image from 'next/image'
import React from 'react'
import banner from '../assets/jetskiheader2.JPG'

const Header = () => {
  return (
    <div className='w-screen'>
      <div className='mt-8 lg:mt-8 xl:mt-8 m-auto'>
        <Image src={banner} sizes='100%' objectFit='contain'/>
      </div>
    </div>
  )
}

export default Header