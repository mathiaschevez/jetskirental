import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStateContext } from '../context/StateContext'

const Success = () => {
  const { cartItems, clearCart, updateJetski } = useStateContext()
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

  console.log(cartItems)

  return (
    <div className='px-3 flex flex-col items-center text-center'>
      <h1 className='text-xl font-bold'>Thank you for your purchase</h1>
      <h1>An email with a confirmation of your purchase will be sent to your email.</h1>
      <button className='bg-[#00A7C3] text-white font-semibold w-1/2 rounded py-3 mt-6' onClick={() => handleToHome()}>Back to home</button>
    </div>
  )
}

export default Success