import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context/StateContext'
import { client, urlFor } from '../lib/client'

const CartItem = ({ jetski }) => {
  const { cartItems, setCartItems } = useStateContext()
  const [dbjetski, setdbJetski] = useState({})
  const [multipleAvailable, setMultipleAvailable] = useState(true)

  useEffect(() => {
    const findDbJetski = async () => {
      const query = `*[_type == "jetski" && slug.current == '${jetski.slug.current}'][0]`
      const dbjetski = await client.fetch(query)

      setdbJetski(dbjetski)
    }
    
    findDbJetski()
    handleSelectionOptions()
  }, [dbjetski])

  // console.log(dbjetski)

  const handleQtyChange = (e) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if(cartItem._id === jetski._id) {
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

  const handleSelectionOptions = () => {
    dbjetski?.bookings?.map((booking) => {
      jetski?.days.map((day) => {
        if(dayjs(day).format('YYYY-MM-DD') === booking) {
          setMultipleAvailable(false)
        }
      })
    })
  }

  return (
    <div className='flex justify-between gap-3 lg:gap-9 py-3'>
      <div className='w-1/2'>
        <img src={urlFor(jetski?.image[0])} className='rounded mb-6' />
        <h1 className='font-semibold lg:text-2xl'>{jetski?.name}</h1>
      </div>
      <div className='flex flex-col gap-1 justify-between w-1/2'>
        <div >
          <div className='flex md:mt-6'>
            <h1 className='lg:text-lg font-semibold'>$</h1>
            <h1 className='font-semibold md:text-xl lg:text-2xl xl:text-3xl'>{jetski?.days.length * jetski?.price}</h1>
          </div>
          <h1 className='font-semibold mt-3 xl:text-lg'>{jetski?.days?.length} days scheduled</h1>
          <div className='flex justify-between gap-3 rounded border  my-1 p-2 w-full md:w-2/3 items-center'>
            <label htmlFor="qty">Qty</label>
            {multipleAvailable ? (
              <select value={jetski?.qty} onChange={(e) => handleQtyChange(e)} className='flex border border-slate-400 px-2 py-1 focus:outline-none rounded' id="qty">
                <option>1</option>
                <option>2</option>
              </select>
            ) : (
              <select className='flex border border-slate-400 px-2 py-1 focus:outline-none rounded' id="qty">
                <option>1</option>
              </select>
            )}
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-2 gap-1'>
          {jetski?.days?.map((day, i) => (
            <h1 key={i} className='border bg-[#ebebeb] border-slate-400 px-2 py-1 rounded text-xs sm:text-sm self-center xl:py-2 xl:px-3 xl:text-base'>{dayjs(day).format('MMM-DD')}</h1>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CartItem