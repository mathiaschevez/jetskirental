import Link from 'next/link'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsCart2 } from 'react-icons/bs'

const Navbar = () => {
  return (
    <div className='fixed bg-[#333] w-full py-4 px-3 text-white z-50'>
      <div className='flex items-center justify-between'>
        <Link href='/'>
          <h1 className='font-bold'>LOGO HERE</h1>
        </Link>
        <div className='flex gap-1 justify-center items-center'>
          <div className='hidden md:flex'>
            items here
          </div>
          <Link href='/'>
            <button className='hover:bg-slate-800 p-1 rounded fill-slate-800'>
              <BsCart2  size={21}/>
            </button>
          </Link>
          <button className='md:hidden hover:bg-slate-800 p-1 rounded fill-slate-800'>
            <AiOutlineMenu size={21}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar