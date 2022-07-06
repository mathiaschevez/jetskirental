import React, { useRef } from 'react'
import Head from 'next/head'
import { Header, Jetski } from '../components'
import { client } from '../lib/client'
import emailjs from '@emailjs/browser';
import { FiCopy } from 'react-icons/fi'
import toast from 'react-hot-toast';

const Home = ({ jetskis }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_yejwh1f', 'template_eskle82', form.current, 'gJ9ktICIqZDCLNhh1')
      .then((result) => {
          toast.success('Message sent successfully!')
          console.log(result.text);
          e.target.reset()
      }, (error) => {
          toast.error('Oops! Something went wrong.')
          console.log(error.text);
      });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('work2playutah@gmail.com')
    toast.success('Email copied to clipboard!')
  }

  const copyAddress = () => {
    navigator.clipboard.writeText('2618 W 800 N Clinton, UT 84015')
    toast.success('Address copied to clipboard!')
  }

  return (
    <div className='flex flex-col lg:justify-center'>
      <Head>
        <title>Work 2 Play Rentals</title>
        <meta name="description" content="We offer top of the line ski rentals." />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <Header />
      <div className='xl:w-2/3 pt-6 md:pt-12 m-auto'>
        <div className='flex flex-col px-3 items-left'>
          <h1 id='catalog' className='text-2xl text-black font-bold mt-6 md:text-3xl xl:text-4xl text-left'>Jetski Catalog</h1>
        </div>
        <div className='jetskis grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 px-3 xl:px-0 gap-3 mb-6'>
          {jetskis.map((jetski) => (
            <Jetski key={jetski._id} jetski={jetski} />
          ))}
        </div>
      </div>
      <div className='w-full px-3 py-6 m-auto xl:w-2/3'>
        <h1 className='font-semibold text-2xl xl:text-4xl'>Contact</h1>
        <div className='flex flex-col md:flex-row gap-3'>
          <form ref={form} onSubmit={sendEmail} className='border flex flex-col gap-2 md:w-1/2 mt-3 p-6 rounded'>
            <label className='font-semibold'>Name</label>
            <input className='border-2 border-[#00A7C3] rounded focus:outline-none px-2 py-1' required type="text" name="user_name" />
            <label className='font-semibold'>Email</label>
            <input className='border-2 border-[#00A7C3] rounded focus:outline-none px-2 py-1' required type="email" name="user_email" />
            <label className='font-semibold'>Message</label>
            <textarea className='h-28 resize-none border-2 border-[#00A7C3] rounded focus:outline-none px-2 py-1' required name="message" />
            <input className='font-semibold bg-[#00A7C3] text-white m-auto w-full py-3 mt-6 rounded cursor-pointer' type="submit" value="Send" />
          </form>
          <div className='flex flex-col gap-2 md:w-1/2 mt-3'>
            <h1>Email</h1>
            <button onClick={() => copyEmail()} className='hover:text-[#00A7C3] hover:border-[#00A7C3] border rounded p-2 flex justify-between text-lg items-center'>
              <h1>work2playutah@gmail.com</h1>
              <FiCopy className='cursor-pointer' size={24}/>
            </button>      
            <h1 className='mt-3'>Address</h1>      
            <button onClick={() => copyAddress()} className='hover:text-[#00A7C3] hover:border-[#00A7C3] border rounded p-2 flex justify-between text-lg items-center'>
              <h1>2618 W 800 N Clinton, UT 84015</h1>
              <FiCopy className='cursor-pointer' size={24}/>
            </button>            
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "jetski"]'
  
  const jetskis = await client.fetch(query)
  return {
    props: { jetskis }
  }
}

export default Home