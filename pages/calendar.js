import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setMonth(maxDate.getMonth() + 2)

  return (
    <div className='pt-20 lg:w-2/3 m-auto pb-10'>
      <div className='flex flex-col px-3 items-center md:items-start'>
        <div className='flex justify-center items-center sm:w-2/3 md:w-full lg:w-full xl:w-full'>
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
    </div>
  )
}

export default CalendarPage