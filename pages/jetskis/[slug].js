import React, { useState } from 'react'
import Link from 'next/link'
import { client, urlFor } from '../../lib/client'
import { Jetski } from '../../components'

const JetskiDetail = ({ jetski, jetskis }) => {
  const [viewOthers, setViewOthers ] = useState(false)

  return (
    <div>
      <img src={urlFor(jetski.image[0])} height={250} />
      <div className='px-3 flex justify-between items-center mt-3'>
        <h1 className='text-white font-bold text-3xl'>{jetski?.name}</h1>
        <h1 className='font-bold text-white self-end'>${jetski.price}<span className='font-semibold text-sm'> /day</span></h1>
      </div>
      <div className='px-3 mt-6'>
        <h1 className='text-white'>{jetski.details}</h1> 
      </div>
      <div className='flex flex-col gap-3 px-3 mt-12'>
        <div className='flex justify-between gap-3'>
          <button className='w-1/2 bg-blue-700 py-3 rounded text-white font-bold'>Add to Cart</button>
          <Link href='/book'>
            <button className='rounded w-1/2 bg-blue-700 text-white font-bold'>Book</button>
          </Link>
        </div>
        {/* <Link href='/#catalog'>
          <button className='w-full border-4 border-white rounded-b py-2 text-white font-bold'>Catalog</button>
        </Link> */}
      </div>
      <div className='mt-9 px-3'>
        {!viewOthers ? (
          <button onClick={() => setViewOthers(true)} className='text-white border-2 border-white w-full py-2 hover:bg-white hover:text-black font-bold'>View Catalog</button>
        ) : (
          <button onClick={() => setViewOthers(false)} className='text-white border-2 border-white w-full py-2 hover:bg-white hover:text-black font-bold'>Close Catolog</button>
        )}
        {viewOthers &&
          <div>
            <h1 className={`${!jetskis[0] && 'hidden'} text-white font-bold mt-6`}>OTHERS</h1>
            <div className='grid grid-cols-2 gap-1'>
              {jetskis.map((jetski) => (
                <Jetski jetski={jetski} />
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "jetski"] {
    slug {
      current
    }
  }` 

  const jetskis = await client.fetch(query)

  const paths = jetskis.map((jetski) => ({
    params: {
      slug: jetski.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}


export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "jetski" && slug.current == '${slug}'][0]`
  const allQuery = `*[_type == "jetski" && slug.current != '${slug}']`

  const jetski = await client.fetch(query)
  const jetskis = await client.fetch(allQuery)

  return {
    props: { jetski, jetskis }
  }
}

export default JetskiDetail