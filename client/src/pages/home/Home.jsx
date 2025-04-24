import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

import "../../index.css"

function Home() {
  return (
    <div className='flex h-screen w-screen overflow-hidden bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 p-5'>
      <Sidebar />
      <MessageContainer/>
    </div>
  )
}

export default Home
