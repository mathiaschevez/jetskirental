import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useStateContext } from '../context/StateContext'
import { AiOutlineDownload } from 'react-icons/ai'
import toast from 'react-hot-toast'
import Image from 'next/image'
import logo from '../assets/LOGOS_PRIMARY-BLACK.png'
import { FiCopy } from 'react-icons/fi'

const Success = () => {
  const { cartItems, clearCart, updateJetski } = useStateContext()
  const [bounceActive, setBounceActive] = useState(true)
  const router = useRouter()

  useEffect(() => {
    {cartItems.map((cartItem) => {
      updateJetski(cartItem, cartItem.days)
    })}
  }, [cartItems])

  const handleToHome = () => {
    clearCart()
    router.push('/')
  }

  const copyAddress = () => {
    navigator.clipboard.writeText('2618 W 800 N Clinton, UT 84015')
    toast.success('Address copied to clipboard!')
  }

  return (
    <div className='px-3 flex flex-col items-center text-center mb-9'>
      <Image src={logo} alt='logo' width={180} height={69} objectFit='contain'/>
      <h1 className='text-xl xl:text-3xl mt-6 font-bold'>Thank you for your purchase</h1>
      {/* <h1>An email with a confirmation of your purchase will be sent to your email.</h1> */}
      <h1 className='text-xl mt-12'>Please download and fill out the Rental Contract before picking up your jetskis!</h1>
      <div className='flex flex-col md:flex-row items-center xl:w-1/3 w-full gap-3 lg:gap-9'>
        <a onClick={() => setBounceActive(false)} href='/Waverunner-Rental-Template.pdf' download className='flex justify-center gap-3 lg:gap-6 items-center bg-[#00A7C3] text-white font-semibold w-2/3 md:w-1/2 rounded py-3 mt-6' >
          <h1>Download</h1>
          <AiOutlineDownload className={`${bounceActive && 'animate-bounce'}`} size={30}/>
        </a>
        <button disabled={bounceActive} className={`${!bounceActive && 'text-[#00A7C3] hover:bg-[#00A7C3] hover:text-white border-[#00A7C3] cursor-pointer' } transition ease-in-out border font-semibold w-2/3 md:w-1/2 rounded py-3 mt-6`} onClick={() => handleToHome()}>Back to home</button>
      </div>
      <h1 className='mt-6 mb-3 text-lg'>Address</h1>      
      <button onClick={() => copyAddress()} className='hover:text-[#00A7C3] hover:border-[#00A7C3] border rounded p-2 flex justify-between text-lg items-center gap-20'>
        <h1>2618 W 800 N Clinton, UT 84015</h1>
        <FiCopy className='cursor-pointer' size={24}/>
      </button>    
    </div>
  )
}

export default Success