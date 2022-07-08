import dayjs from 'dayjs'
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { client } from '../lib/client'
import getStripe from '../lib/getStripe'

const Context = createContext()

export const StateContext = ({children}) => {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [daysSelected, setDaysSelected] = useState([])
  const [viewOthers, setViewOthers ] = useState(false)

  useEffect(() => {
    checkForCart()
  }, [totalPrice])

  const checkForCart = () => {
    if (typeof window !== "undefined") {
      if(!localStorage.getItem('cartItems')) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        localStorage.setItem('totalPRice', totalPrice)
      } else {
        setCartItems(JSON.parse(localStorage.getItem('cartItems')))
      }
    }
  }

  const onAdd = (jetski, days ) => {
    const checkJetskiInCart = cartItems.find((item) => item._id === jetski._id)
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);

    if(checkJetskiInCart) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if(cartItem._id === jetski._id) {
          const daysToAdd = days.filter((day) => !cartItem.days.includes(day))
          return {
            ...cartItem,
            days: [...cartItem.days, ...daysToAdd]
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
        localStorage.setItem('totalPRice', totalPrice)
      }
    } else {
      jetski.days = days

      setCartItems([...cartItems, { ...jetski }])
      if (typeof window !== "undefined") {
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, { ...jetski }]))
        localStorage.setItem('totalPRice', totalPrice)
      }
    }

    toast.success(`${jetski.name} added`)
  }

  const clearCart = () => {
    setCartItems([])

    if(typeof window !== "undefined") {
      localStorage.setItem('cartItems', JSON.stringify([]))
    }
  }

  const handleCheckout = async () => {
    const stripe = await getStripe()
    
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems),
    })

    if(response.statusCode === 500) return;

    const data = await response.json()

    toast.loading('Redirecting...')
    
    stripe.redirectToCheckout({ sessionId: data.id })
  }

  const updateJetski = (jetski, newBookings) => { 
    {newBookings.map((booking) => {
      client.patch(jetski._id)
        .setIfMissing({bookings: []})
        .append('bookings', [booking])
        .commit({autoGenerateArrayKeys: true})

        .then((updatedJetski) => {
          console.log('Jetski was updated. New jetski: ')
          console.log(updatedJetski)
        })

        .catch((err) => {
          console.error('Did not work: ', err.message)
        })
    })}
  }

  return (
    <Context.Provider
      value={{
        cartItems,
        setCartItems,
        onAdd,
        clearCart,
        isAdding,
        setIsAdding,
        updateJetski,
        handleCheckout,
        daysSelected,
        setDaysSelected,
        viewOthers,
        setViewOthers,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
