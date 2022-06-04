import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const Jetski = ({ jetski }) => {
  return (
    <div className='flex flex-col justify-center'>
      <div className='flex flex-col'>
        <img src={urlFor(jetski.image && jetski.image[0])}
          width={250}
          height={250}
          className='rounded-t'
        />
        <div className='mt-1'>
          <h1 className='font-bold text-white'>{jetski?.name}</h1>
          <h1 className='text-white'>${jetski.price}<span className='text-xs'>/day</span></h1>
        </div>
        {jetski?.available === 'true' ? (
          <Link href={`/jetskis/${jetski?.slug.current}`}>
            <button className='w-full bg-blue-700 text-white py-1 mt-3 rounded-b'>Book</button>
          </Link>
        ) : (
          <h1 className='w-full bg-slate-200 text-slate-700 font-bold text-center'>UNAVAILABLE</h1>
        )}
      </div>
    </div>
  )
}

export default Jetski