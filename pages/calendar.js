import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { client } from '../lib/client'

const CalendarPage = ({ jetskis }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [availableJetskis, setAvailableJetskis] = useState([])

  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setMonth(maxDate.getMonth() + 2)

  useEffect(() => {
    jetskis.filter((jetski) => {
      return jetski?.bookings?.filter((day) => {
        return dayjs(day).format('YYYY-MM-DD') === dayjs(currentDate).format('YYYY-MM-DD')
      }).length < jetski.quantity
    })
  }, [currentDate])

  return (
    <div className='py-12 lg:py-16 lg:w-2/3 m-auto'>
      <div className='px-3 mb-6'>
        <h1 className='text-2xl font-semibold'>Calendar</h1>
        <h1>Select days view available jetskis</h1>
      </div>
      <div className='flex flex-col items-center md:items-start px-3'>
        <div className='flex sm:w-2/3 md:w-full lg:w-2/3 m-auto'>
          <Calendar 
            className='rounded-xl' 
            value={currentDate} 
            onChange={setCurrentDate}
            next2Label={null}
            prev2Label={null}
            // tileDisabled={({ date }) => handleDisableDates({ date})}
            minDate={today}
            maxDate={maxDate}
            prevLabel={(<IoArrowBack size={22}/>)}
            nextLabel={(<IoArrowForward size={22}/>)}
          />
        </div>
      </div>
      <div className='mt-6 px-3'>
        {jetskis?.map((jetski) => (
          <h1 key={jetski._id}>{jetski.name}</h1>
        ))}
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