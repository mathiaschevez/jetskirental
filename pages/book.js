import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import { client, urlFor } from '../lib/client'

const Book = () => {
  const [date, setDate] = useState(new Date())
  const [jetskis, setJetskis] = useState([])

  console.log(date)
  console.log(dayjs(date).format('YYYY-MM-DD'))

  useEffect(() => {
    fetchJetskis()
  }, [date])

  const fetchJetskis = async () => {
    const query = '*[_type == "jetski"]'
    const jetskis = await client.fetch(query)

    const availableJetskis = []

    {jetskis?.map((jetski) => {
      if(!jetski?.bookings?.includes(`${dayjs(date).format('YYYY-MM-DD')}`)) {
        availableJetskis.push(jetski)
      }
    })}

    setJetskis(availableJetskis)
  }
  
  console.log(jetskis)

  return (
    <div className='px-3 flex flex-col justify-center my-6'>
      <h1 className='font-bold text-3xl mb-9'>BOOKING</h1>
      <Calendar 
        className='rounded-xl' 
        value={date} 
        onChange={setDate}
        onClickDay={fetchJetskis}
        next2Label={null}
        prev2Label={null}
      />
      <div>
        <h1 className='mt-9 font-bold text-xl mb-3'>Available Jetskis</h1>
        <div className='flex flex-col gap-3'>
          {jetskis.map((jetski) => (
            <div className='p-2 bg-white rounded flex'>
              <div>
                <img className='rounded mb-3' src={urlFor(jetski?.image[0])} width={125} height={125} />
                <h1 className='font-semibold'>{jetski.name}</h1>
              </div>
              <div>
                <h1>items</h1>
              </div>  
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Book