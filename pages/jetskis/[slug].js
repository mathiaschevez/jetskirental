import React, { useState, useEffect } from 'react'
import { client, urlFor } from '../../lib/client'
import { Jetski } from '../../components'
import { useRouter } from 'next/router'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useStateContext } from '../../context/StateContext'
import toast from 'react-hot-toast'

const JetskiDetail = ({ jetski, jetskis }) => {
  const { onAdd } = useStateContext()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewOthers, setViewOthers ] = useState(false)
  const [daysSelected, setDaysSelected] = useState([])
  const [removing, setRemoving] = useState(-1)
  const router = useRouter()

  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setMonth(maxDate.getMonth() + 2)

  useEffect(() => {
    handleSetDays()
  }, [currentDate])
  
  const handleSetDays = () => {
    if((daysSelected?.includes(dayjs(currentDate).format('YYYY-MM-DD'))) || (daysSelected?.length > 5) || dayjs(currentDate).format('YYYY-MM-DD') === dayjs(today).format('YYYY-MM-DD')) return
    
    setDaysSelected([...daysSelected, dayjs(currentDate).format('YYYY-MM-DD')])
  }

  const handleRemoveDay = (dayToRemove) => {
    const newDaysSelected = daysSelected.filter((day) => dayjs(day).format('MMM-DD') !== dayjs(dayToRemove).format('MMM-DD'))

    setDaysSelected(newDaysSelected)
  }

  const handleAdd = () => {
    onAdd(jetski, daysSelected)
    setDaysSelected([])
  }

  const handleBuyNow = () => {
    onAdd(jetski, daysSelected)
    router.push('/cart')
  }

  return (
    <div className='flex flex-col md:flex-row md:items-start lg:w-2/3 m-auto gap-6 justify-around items-center py-12 lg:py-16'>
      <div className='flex flex-col px-3 items-center md:items-start'>
        <h1 className='font-bold text-2xl'>Booking</h1>
        <h1 className='font-semibold mb-6'>Select days to book</h1>
        <div className='flex justify-center items-center sm:w-2/3 md:w-full lg:w-full xl:w-2/3'>
          <Calendar 
            className='rounded-xl' 
            value={currentDate} 
            onChange={setCurrentDate}
            next2Label={null}
            prev2Label={null}
            tileDisabled={({ date }) => (jetski?.bookings?.includes(dayjs(date).format('YYYY-MM-DD'))) || (dayjs(date).format('ddd') === 'Sun')}
            minDate={today}
            maxDate={maxDate}
            prevLabel={(<IoArrowBack size={22}/>)}
            nextLabel={(<IoArrowForward size={22}/>)}
          />
        </div>
      </div>
      <div>
        <img src={urlFor(jetski.image[0])} height={250} />
        <div className='px-3 flex justify-between items-center mt-3'>
          <h1 className='text-black font-bold text-2xl'>{jetski?.name}</h1>
          <div className='flex'>
            <h1 className='font-semibold'>$</h1>
            <h1 className='font-bold text-2xl'>{jetski?.price}</h1>
            <h1 className='text-xs self-end'>/day</h1>
          </div>
        </div>
        {daysSelected[0] && (
          <div className='px-3 mt-6'>
            <h1 className='font-semibold mb-3'>Days selected</h1>
            <div className='grid grid-cols-2 gap-3'>
              {daysSelected?.map((day, i) => (
                <div key={i} className={`${removing === i && 'border-red-600'} flex gap-3 bg-[#ebebeb] px-2 py-2 justify-between rounded border border-slate-400`}>
                  <h1 className='px-2'>{dayjs(day).format('MMM DD')}</h1>
                  <button 
                    onMouseEnter={() => setRemoving(i)} 
                    onMouseLeave={() => setRemoving(-1)}
                    onClick={() => handleRemoveDay(dayjs(day).format('MMM DD'))}
                    className='text-red-600 px-2 rounded' 
                  >
                    <AiOutlineCloseCircle size={24}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className=''>
          {daysSelected[0] ? (
            <div className='flex gap-3 px-3 mt-12'>
              <button onClick={() => handleAdd()} className='transition ease-in-out w-1/2 border-2 border-blue-700 rounded font-bold text-blue-700 hover:bg-blue-600 hover:text-white'>Add to cart</button>
              <button onClick={() => handleBuyNow()} className='transition ease-in-out w-1/2 border-2 border-blue-700 rounded font-bold text-blue-700 hover:bg-blue-600 hover:text-white py-3'>Book Now</button>
            </div>
          ) : (
            <div className='flex gap-3 px-3 mt-12'>
              <h1 onClick={() => toast.error('Please add days to book.')} className='text-center py-3 w-1/2 border-2 border-slate-500 rounded font-bold text-slate-500'>Add to cart</h1>
              <h1 onClick={() => toast.error('Please add days to book.')} className='text-center py-3 w-1/2 border-2 border-slate-500 rounded font-bold text-slate-500'>Book Now</h1>
            </div>
          )}
        </div>
        <div className='mt-6 px-3 mb-6'>
          {!viewOthers ? (
            <button onClick={() => setViewOthers(true)} className='transition ease-in-out text-black border-2 rounded border-black w-full py-2 hover:bg-black hover:text-white font-bold'>View Catalog</button>
          ) : (
            <button onClick={() => setViewOthers(false)} className='transition ease-in-out text-black border-2 rounded border-black w-full py-2 hover:bg-black hover:text-white font-bold'>Close Catolog</button>
          )}
          {viewOthers &&
            <div className='mt-3'>
              <div className='grid grid-cols-1 gap-1'>
                {jetskis.map((jetski) => (
                  <Jetski key={jetski._id} jetski={jetski} />
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "jetski"] {
    slug {
      current
    }
  }` 

  const jetskis = await client.fetch(query)

  const paths = jetskis.map((jetski) => ({
    params: {
      slug: jetski.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}


export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "jetski" && slug.current == '${slug}'][0]`
  const allQuery = `*[_type == "jetski" && slug.current != '${slug}']`

  const jetski = await client.fetch(query)
  const jetskis = await client.fetch(allQuery)

  return {
    props: { jetski, jetskis }
  }
}

export default JetskiDetail