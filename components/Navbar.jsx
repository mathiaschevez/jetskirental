import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsCartFill } from 'react-icons/bs'
import secondaryLogo from '../assets/LOGOS_PRIMARY-BLACK.png'

const Navbar = () => {
  return (
    <div className='fixed bg-[#ebebeb] w-full py-1 px-3 text-black z-50 lg:flex lg:justify-center'>
      <div className='flex items-center justify-between lg:w-2/3'>
        <Link href='/'>
          <Image className='cursor-pointer' src={secondaryLogo} alt='logo' width={180} height={69} objectFit='contain'/>
        </Link>
        <div className='flex gap-3 justify-center items-center'>
          <Link href='/cart'>
            <button className='p-1 rounded flex gap-3'>
              <h1 className='font-bold italic'>CART</h1>
              <BsCartFill size={21}/>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar