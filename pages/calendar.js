import dayjs from 'dayjs'
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

  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setMonth(maxDate.getMonth() + 2)

  useEffect(() => {
    findAvailableJetskis()
    setDaysSelected([dayjs(currentDate).format('YYYY-MM-DD')])
  }, [currentDate])

  const findAvailableJetskis = () => {
    let availableJetkis = jetskis.filter((jetski) => {
      if(jetski.bookings !== undefined) {
        return jetski.bookings?.filter((day) => {
          return dayjs(day).format('YYYY-MM-DD') === dayjs(currentDate).format('YYYY-MM-DD')
        }) < jetski.quantity
      } else {
        return jetski
      }
    })

    let jetskisNotSelected = availableJetkis.filter((jetski) => {
      return cartItems.filter((item) => {
        return item._id === jetski._id && item.days.includes(dayjs(currentDate).format('YYYY-MM-DD'))
      }).length !== jetski.quantity
    })

    console.log(jetskisNotSelected)

    setJetskisToShow(jetskisNotSelected)
  }

  const handleAdd = (jetski) => {
    if(dayjs(currentDate).format('YYYY-MM-DD') === dayjs(today).format('YYYY-MM-DD')) {
      toast.error('You can\'t book today')
      return
    }

    onAdd(jetski, daysSelected)
    setCurrentDate(new Date())
  }

  const handleBuyNow = (jetski) => {
    if(dayjs(currentDate).format('YYYY-MM-DD') === dayjs(today).format('YYYY-MM-DD')) {
      toast.error('You can\'t book today')
      return
    }

    onAdd(jetski, daysSelected)
    router.push('/cart')
  }

  return (
    <div className='py-12 lg:py-16 lg:w-2/3 m-auto'>
      <div className='px-3 mb-6'>
        <h1 className='text-2xl font-semibold'>Calendar</h1>
        <h1>Select days to view available jetskis</h1>
      </div>
      <div className='flex flex-col items-center md:items-start px-3'>
        <div className='flex sm:w-2/3 md:w-full lg:w-2/3 m-auto'>
          <Calendar 
            className='rounded-xl' 
            value={currentDate} 
            onChange={setCurrentDate}
            next2Label={null}
            prev2Label={null}
            // tileDisabled={({ date }) => handleDisableDates({ date })}
            minDate={today}
            maxDate={maxDate}
            prevLabel={(<IoArrowBack size={22}/>)}
            nextLabel={(<IoArrowForward size={22}/>)}
          />
        </div>
      </div>
      <div className='mt-6 px-3'>
        <h1 className='text-xl font-semibold mb-6'>Available jetskis</h1>
        <div className='flex flex-col gap-9'>
          {jetskisToShow?.map((jetski) => (
            <div className='flex flex-col' key={jetski._id}>
              <img src={urlFor(jetski.image[0])} className='rounded m-auto'/>
              <div className='flex justify-between items-center my-3'>
                <h1 className='font-bold text-lg'>{jetski.name}</h1>
                <div className='flex'>
                  <h1 className='font-semibold'>$</h1>
                  <h1 className='font-bold text-2xl'>{jetski?.price}</h1>
                  <h1 className='text-xs self-center ml-1'>/day</h1>
                </div>
              </div>
              <div className='flex w-full gap-3 mt-3'>
                <button onClick={() => handleAdd(jetski)} className='transition ease-in-out w-1/2 border-2 border-[#00A7C3] rounded font-bold text-[#00A7C3] hover:bg-[#00A7C3] hover:text-white'>Add to cart</button>
                <button onClick={() => handleBuyNow(jetski)} className='transition ease-in-out w-1/2 border-2 border-[#00A7C3] rounded font-bold text-[#00A7C3] hover:bg-[#00A7C3] hover:text-white py-3'>Book Now</button>
              </div>
            </div>
          ))}
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