import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className='layout h-full w-full'>
      <Navbar />
      <div className='pt-14'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout