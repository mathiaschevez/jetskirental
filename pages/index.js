import React from 'react'
import Head from 'next/head'
import { Header, Jetski } from '../components'
import { client } from '../lib/client'

const Home = ({ jetskis, banners }) => {
  return (
    <div className=''>
      <Head>
        <title>Ski Rentals</title>
        <meta name="description" content="We offer top of the line ski rentals." />
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <Header headerBanner={banners?.length && banners[0]} />
      <div className='flex px-3 justify-between items-center'>
        <h1 id='catalog' className='text-xl text-white font-bold my-3'>CATALOG</h1>
        <button className='text-white hover:underline'>View all</button>
      </div>
      <div className='jetskis grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 px-3 gap-3'>
        {jetskis.map((jetski) => (
          <Jetski key={jetski._id} jetski={jetski} />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "jetski"]'
  const bannerQuery = '*[_type == "banner"]'
  
  const jetskis = await client.fetch(query)
  const banners = await client.fetch(bannerQuery)
  return {
    props: { jetskis, banners }
  }
}

export default Home