import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillCalendar } from 'react-icons/ai'
import { BsCartFill } from 'react-icons/bs'
import logo from '../assets/LOGOS_PRIMARY-BLACK.png'

const Navbar = () => {
  return (
    <div className='fixed bg-[#ebebeb] w-full py-1 px-3 text-black z-50 lg:flex lg:justify-center'>
      <div className='flex items-center justify-between w-full xl:w-2/3'>
        <Link href='/'>
          <button>
            <Image src={logo} alt='logo' width={180} height={69} objectFit='contain'/>
          </button>
        </Link>
        <div className='flex gap-1 lg:gap-6 justify-center items-center'>
          <Link href='/calendar'>
            <button className='p-1 rounded flex gap-2 items-center'>
              <h1 className='font-bold italic text-sm md:text-base'>CALENDAR</h1>
              <AiFillCalendar size={21}/>
            </button>
          </Link>
          <Link href='/cart'>
            <button className='p-1 rounded flex gap-2 items-center'>
              <h1 className='font-bold italic text-sm md:text-base'>CART</h1>
              <BsCartFill size={21}/>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar