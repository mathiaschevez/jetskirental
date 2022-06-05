import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const Jetski = ({ jetski }) => {
  return (
    <div className='h-full'>
      <div className='h-full'>
        <div className='grid grid-rows-3 h-1/4'>
          <img src={urlFor(jetski.image && jetski.image[0])}
            width={210}
            height={210}
            className='rounded-t'
          />
        </div>
        <div className='mt-3'>
          <h1 className='font-bold text-white'>{jetski?.name}</h1>
          <h1 className='text-white'>${jetski.price}<span className='text-xs'>/day</span></h1>
        </div>
        <div>
          {jetski?.available === 'true' ? (
            <Link href={`/jetskis/${jetski?.slug.current}`}>
              <button className='w-full bg-blue-700 text-white py-1 mt-3 rounded-b'>View</button>
            </Link>
          ) : (
            <h1 className='w-full bg-slate-200 text-slate-700 font-bold text-center'>UNAVAILABLE</h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jetski