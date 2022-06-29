import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { client, urlFor } from '../lib/client'

const CalendarPage = ({ jetskis }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [availableJetskis, setAvailableJetskis] = useState([])

  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setMonth(maxDate.getMonth() + 2)

  useEffect(() => {
    let availableJetkis = jetskis.filter((jetski) => {
      if(jetski.bookings !== undefined) {
        return jetski.bookings?.filter((day) => {
          return dayjs(day).format('YYYY-MM-DD') === dayjs(currentDate).format('YYYY-MM-DD')
        }) < jetski.quantity
      } else {
        return jetski
      }
    })

    console.log(dayjs(currentDate).format('YYYY-MM-DD'))
    console.log(availableJetkis)
    setAvailableJetskis(availableJetkis)
  }, [currentDate])

  console.log()

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
        <h1 className='text-xl font-semibold mb-3'>Available jetskis</h1>
        <div>
          {availableJetskis?.map((jetski) => (
            <div key={jetski._id}>
              <img src={urlFor(jetski.image[0])} className='rounded m-auto'/>
              <h1>{jetski.name}</h1>
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