import React from 'react'
import Head from 'next/head'
import { Header, Jetski } from '../components'
import { client } from '../lib/client'

const Home = ({ jetskis, banners }) => {
  return (
    <div className='lg:flex lg:justify-center'>
      <Head>
        <title>Ski Rentals</title>
        <meta name="description" content="We offer top of the line ski rentals." />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <div className='lg:w-2/3 pt-6 md:pt-12'>
        {/* <Header headerBanner={banners?.length && banners[0]} /> */}
        <div className='flex flex-col px-3 items-left'>
          <h1 id='catalog' className='text-2xl text-black font-bold mt-6 md:text-3xl xl:text-4xl xl:text-left text-center'>Jetski Catalog</h1>
        </div>
        <div className='jetskis grid grid-cols-1 md:grid-cols-3 mt-3 px-3 xl:px-0 gap-3 mb-6'>
          {jetskis.map((jetski) => (
            <Jetski key={jetski._id} jetski={jetski} />
          ))}
        </div>
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