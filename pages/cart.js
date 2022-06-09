import React, { useState, useEffect } from 'react'
import { urlFor } from '../lib/client'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'

const Cart = () => {
  const { cartItems, clearCart, handleCheckout} = useStateContext()

  useEffect(() => {
    
  }, [cartItems])

  console.log(cartItems)

  return (
    <div className='px-3 lg:w-2/3 flex justify-center flex-col items-center m-auto'>
      <h1 className='text-2xl font-bold py-1 lg:py-3 mt-3 w-full lg:text-3xl'>Cart Items</h1>
      <h1 className='w-full mb-3'>Total calculated at payment</h1>
      { cartItems[0] ? (
        <div className='flex flex-col gap-4'>
          {cartItems.map((item) => (
            <div key={item._id} className='flex gap-3 p-3'>
              <div className='w-1/2'>
                <img src={urlFor(item?.image[0])} />
                <h1 className='font-semibold lg:text-xl'>{item?.name}</h1>
              </div>
              <div className='flex flex-col gap-1 justify-between'>
                <div>
                  <h1 className='font-semibold md:text-xl lg:text-2xl'>{item?.days?.length} days scheduled</h1>
                  <div className='flex mt-6'>
                    <h1>$</h1>
                    <h1 className='lg:text-xl font-semibold'>{item?.days.length * item?.price}</h1>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-1'>
                  {item?.days?.map((day, i) => (
                    <h1 key={i} className='border bg-[#ebebeb] border-slate-400 px-2 py-1 rounded text-sm self-center'>{dayjs(day).format('MMM-DD')}</h1>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className='flex gap-3 mt-9'>
            <button className='transition ease-in-out hover:bg-red-600 hover:text-white font-semibold text-red-600 border-2 border-red-600 w-1/2 rounded py-3' onClick={() => clearCart()}>Clear</button>
            <button className='transition ease-in-out hover:bg-blue-600 hover:text-white font-semibold text-blue-600 border-2 border-blue-600 w-1/2 rounded py-3' onClick={handleCheckout}>Payment</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Nothing here</h1>
        </div>
      )}
    </div>
  )
}

export default Cart