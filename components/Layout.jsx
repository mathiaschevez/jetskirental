import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className='layout bg-[#333] h-screen w-screen'>
      <Navbar />
      <div className='pt-14'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout