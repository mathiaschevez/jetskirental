import React, { useEffect } from 'react'
import { urlFor } from '../lib/client'
import dayjs from 'dayjs'
import { useStateContext } from '../context/StateContext'
import Link from 'next/link'

const Cart = () => {
  const { cartItems, clearCart, handleCheckout, setCartItems } = useStateContext()

  if(cartItems.length === 0) return (
    <div className='py-12 flex flex-col gap-9 items-center lg:w-2/3 m-auto'>
      <h1 className='text-xl font-semibold mt-3'>NO JETSKIS SCHEDULED</h1>
      <Link href='/'>
        <button className='transition ease-in-out border border-black hover:bg-black hover:text-white text-black font-semibold rounded px-9 py-3'>Back to Home</button>
      </Link>
    </div>
  )

  const handleQtyChange = (e, itemId) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if(cartItem._id === itemId) {
        let price = 1
        if(e.target.value === '1') {
          price = cartItem.price / 2
        } else {
          price = cartItem.price * 2
        }

        return {
          ...cartItem,
          qty: Number(e.target.value),
          price: price,
        }
      } else {
        return { 
          ...cartItem
        }
      }
    })

    setCartItems(updatedCartItems)
    if (typeof window !== "undefined") {
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    }
  }

  return (
    <div className='px-3 xl:w-2/3 flex justify-center flex-col items-center m-auto py-6'>
      <h1 className='text-2xl font-bold py-1 lg:py-3 mt-3 w-full lg:text-3xl'>Cart Items</h1>
      <h1 className='w-full mb-3'>Total calculated at payment</h1>
      { cartItems[0] ? (
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 m-auto md:gap-9 xl:m-0'>
            {cartItems.map((item) => (
              <div key={item._id} className='flex justify-between gap-3 lg:gap-9 py-3'>
                <div className='w-1/2'>
                  <img src={urlFor(item?.image[0])} className='rounded mb-6' />
                  <h1 className='font-semibold lg:text-2xl'>{item?.name}</h1>
                </div>
                <div className='flex flex-col gap-1 justify-between w-1/2'>
                  <div >
                    <div className='flex md:mt-6'>
                      <h1 className='lg:text-lg font-semibold'>$</h1>
                      <h1 className='font-semibold md:text-xl lg:text-2xl xl:text-3xl'>{item?.days.length * item?.price}</h1>
                    </div>
                    <h1 className='font-semibold mt-3 xl:text-lg'>{item?.days?.length} days scheduled</h1>
                    <div className='flex justify-between gap-3 rounded border  my-1 p-2 w-full md:w-2/3 items-center'>
                      <label htmlFor="qty">Qty</label>
                      {item?.quantity > 1 ? (
                        <select value={item?.qty} onChange={(e) => handleQtyChange(e, item._id)} className='flex border border-slate-400 px-2 py-1 focus:outline-none rounded' id="qty">
                          <option>1</option>
                          <option>2</option>
                        </select>
                      ) : (
                        <select id='qty'>
                          <option>1</option>
                        </select>
                      )}
                    </div>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-2 gap-1'>
                    {item?.days?.map((day, i) => (
                      <h1 key={i} className='border bg-[#ebebeb] border-slate-400 px-2 py-1 rounded text-xs sm:text-sm self-center xl:py-2 xl:px-3 xl:text-base'>{dayjs(day).format('MMM-DD')}</h1>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex gap-3 mt-9 lg:w-full xl:w-2/3 xl:gap-6'>
            <button className='transition ease-in-out hover:bg-red-600 hover:text-white font-semibold text-red-600 border-2 border-red-600 w-1/2 rounded py-3' onClick={() => clearCart()}>Clear</button>
            <button className='transition ease-in-out hover:bg-[#00A7C3] hover:text-white font-semibold text-[#00A7C3] border-2 border-[#00A7C3] w-1/2 rounded py-3' onClick={handleCheckout}>Payment</button>
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