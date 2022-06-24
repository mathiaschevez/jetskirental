import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

const Jetski = ({ jetski }) => {
  return (
    <div className='bg-[white] flex flex-col h-full p-3 rounded-2xl justify-between'>
        <div className=''>
          <h1 className='font-bold text-black mb-3'>{jetski?.name}</h1>
          <div className='flex'>
            <h1 className='font-semibold'>$</h1>
            <h1 className='font-bold text-2xl'>{jetski?.price}</h1>
            <h1 className='text-xs self-end'>/day</h1>
          </div>
        </div>
        <img src={urlFor(jetski.image && jetski.image[0])} className='rounded-t'/>
        <div>
          <Link href={`/jetskis/${jetski?.slug.current}`}>
            <button className='transition ease-in-out hover:bg-blue-600 hover:text-white bg-white border-blue-600 border-2 flex justify-center gap-6 items-center text-blue-600 w-full mb-3 rounded py-3 xl:py-2 font-bold'>Book Now <BsFillArrowRightCircleFill size={22}/> </button>
          </Link>
        </div>
    </div>
  )
}

export default Jetski