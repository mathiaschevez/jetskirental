import React from 'react'
import { useStateContext } from '../context/StateContext'
import Link from 'next/link'
import { CartItems } from '../components'

const Cart = () => {
  const { cartItems, clearCart, handleCheckout } = useStateContext()

  if(cartItems.length === 0) return (
    <div className='py-12 flex flex-col gap-9 items-center lg:w-2/3 m-auto'>
      <h1 className='text-xl font-semibold mt-3'>NO JETSKIS SCHEDULED</h1>
      <Link href='/'>
        <button className='transition ease-in-out border border-black hover:bg-black hover:text-white text-black font-semibold rounded px-9 py-3'>Back to Home</button>
      </Link>
    </div>
  )

  return (
    <div className='px-3 xl:w-2/3 flex justify-center flex-col items-center m-auto py-6'>
      <h1 className='text-2xl font-bold py-1 lg:py-3 mt-3 w-full lg:text-3xl'>Cart Items</h1>
      <h1 className='w-full mb-3'>Total calculated at payment</h1>
      { cartItems[0] ? (
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 m-auto md:gap-9 xl:m-0'>
            {cartItems.map((jetski) => (
              <CartItems key={jetski._id} jetski={jetski} />
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