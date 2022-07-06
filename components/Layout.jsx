import React, { useState, useEffect} from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()
  const [layoutHidden, setLayoutHidden] = useState(false)

  useEffect(() => {
    if(router.pathname === '/success') { setLayoutHidden(true) }
    if(router.pathname !== '/success') { setLayoutHidden(false) }
  }, [router.pathname])
  
  return (
    <div className='layout h-full w-full'>
      <Head>
        <title>Jetski Rentals</title>
      </Head>
      <nav className={`${layoutHidden ? 'hidden' : 'block'}`}>
        <Navbar />
      </nav>
      <main className='pt-12'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout