import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

const Jetski = ({ jetski }) => {
  return (
    <div className='bg-[white] flex flex-col gap-3 h-full p-3 rounded-2xl justify-between'>
        <img src={urlFor(jetski.image && jetski.image[0])} className='rounded'/>
        <div className='flex justify-between'>
          <h1 className='font-bold text-black mb-3 text-2xl md:text-lg lg:text-md xl:text-xl'>{jetski?.name}</h1>
          <div className='flex'>
            <h1 className='font-semibold'>$</h1>
            <h1 className='font-bold text-2xl md:text-lg xl:text-2xl'>{jetski?.price}</h1>
            <h1 className='text-xs self-center ml-1'>/day</h1>
          </div>
        </div>
        <div>
          <Link href={`/jetskis/${jetski?.slug.current}`}>
            <button className='transition ease-in-out hover:bg-[#00A7C3] hover:text-white bg-white border-[#00A7C3] border-2 flex justify-center gap-6 items-center text-[#00A7C3] w-full mb-3 rounded py-3 xl:py-2 font-bold'>Book Now <BsFillArrowRightCircleFill size={22}/> </button>
          </Link>
        </div>
    </div>
  )
}

export default Jetski