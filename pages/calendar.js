import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import toast from 'react-hot-toast'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { useStateContext } from '../context/StateContext'
import { client, urlFor } from '../lib/client'

const CalendarPage = ({ jetskis }) => {
  const { cartItems, onAdd, setDaysSelected, daysSelected } = useStateContext() 
  const [currentDate, setCurrentDate] = useState(new Date())
  const [jetskisToShow, setJetskisToShow] = useState([])
  const router = useRouter()

  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setMonth(maxDate.getMonth() + 3)

  useEffect(() => {
    findAvailableJetskis()
    setDaysSelected([dayjs(currentDate).format('YYYY-MM-DD')])
  }, [currentDate])

  const findAvailableJetskis = () => {
    let availableJetkis = jetskis.filter((jetski) => {
      if(jetski.bookings !== undefined) {
        return jetski.bookings?.filter((day) => {
          return dayjs(day).format('YYYY-MM-DD') === dayjs(currentDate).format('YYYY-MM-DD')
        }).length < jetski.quantity

      } else {
        return jetski
      }
    })

    let jetskisNotSelected = availableJetkis.filter((jetski) => {
      return cartItems.filter((item) => {
        return item._id === jetski._id && item.days.includes(dayjs(currentDate).format('YYYY-MM-DD'))
      }).length === 0
    })
    
    setJetskisToShow(jetskisNotSelected)
  }

  const handleAdd = (jetski) => {
    // if(dayjs(currentDate).format('YYYY-MM-DD') === dayjs(today).format('YYYY-MM-DD')) {
    //   toast.error('You can\'t book today')
    //   return
    // }

    onAdd(jetski, daysSelected)
    setCurrentDate(new Date())
  }

  const handleBuyNow = (jetski) => {
    // if(dayjs(currentDate).format('YYYY-MM-DD') === dayjs(today).format('YYYY-MM-DD')) {
    //   toast.error('You can\'t book today')
    //   return
    // }

    onAdd(jetski, daysSelected)
    router.push('/cart')
  }

  return (
    <div className='py-9 sm:py-12 md:py-12 lg:py-9 lg:w-2/3 m-auto lg:my-16 lg:border lg:px-9 rounded'>
      <div className='px-3 lg:px-0 mb-6'>
        <h1 className='text-2xl font-semibold'>Calendar</h1>
        <h1>Select day to view available jetskis</h1>
      </div>
      <div className='flex flex-col  gap-9 w-full items-center xl:items-start'>
        <div className='flex flex-col items-center px-3 lg:px-0 md:w-2/3 lg:w-full xl:w-2/3 2xl:w-1/3 m-auto lg:m-0'>
          <Calendar 
            className='rounded-xl' 
            value={currentDate} 
            onChange={setCurrentDate}
            next2Label={null}
            prev2Label={null}
            // tileDisabled={({ date }) => (dayjs(date).format('ddd') === 'Sun')}
            minDate={today}
            maxDate={maxDate}
            prevLabel={(<IoArrowBack size={22}/>)}
            nextLabel={(<IoArrowForward size={22}/>)}
          />
        </div>
        <div className='px-3 xl:px-0 w-full'>
          <h1 className='text-xl font-semibold mb-6'>Available jetskis</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9'>
            {jetskisToShow?.map((jetski) => (
              <div className='flex flex-col' key={jetski._id}>
                <img src={urlFor(jetski.image[0])} className='rounded m-auto'/>
                <div className='flex justify-between items-center my-3'>
                  <h1 className='font-bold text-lg'>{jetski.name}</h1>
                  <div className='flex'>
                    <h1 className='font-semibold'>$</h1>
                    <h1 className='font-bold text-xl'>{jetski?.price}</h1>
                    <h1 className='text-xs self-center ml-1'>/day</h1>
                  </div>
                </div>
                <div className='flex w-full gap-3 mt-3'>
                  <button onClick={() => handleAdd(jetski)} className='transition ease-in-out w-1/2 border-2 border-[#00A7C3] rounded font-bold text-[#00A7C3] hover:bg-[#00A7C3] hover:text-white'>Add to cart</button>
                  <button onClick={() => handleBuyNow(jetski)} className='transition ease-in-out w-1/2 border-2 border-[#00A7C3] rounded font-bold text-[#00A7C3] hover:bg-[#00A7C3] hover:text-white py-3 lg:py-2'>Book Now</button>
                </div>
              </div>
            ))}
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
    props: {
      jetskis
    }
  }
}

export default CalendarPage