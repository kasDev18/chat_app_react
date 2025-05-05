import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

import "../../index.css"

function Home() {
  return (
    <div className='flex h-screen w-screen bg-purple-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 md:p-5'>
      <Sidebar />
      <MessageContainer/>
      <div className='lg:grid w-1/2 p-5 rounded-2xl bg-purple-950 hidden'>
        <div className='h-full flex flex-col items-center'>
          <div className='pt-5'>
            <img className='rounded-full border-2 border-amber-500' width={200} src="https://th.bing.com/th/id/R.e2a8b23a278ed28d089dc4a87dbf50ef?rik=35UwSrV89r9CCw&riu=http%3a%2f%2fgcraftupvc.in%2fassets%2fimages%2fabout%2fabout-shape.png&ehk=xkGFVBAk88y56o6rUD%2fKI%2f0Ke3B28bVGUw8Eebtrjxs%3d&risl=&pid=ImgRaw&r=0" alt="" />
          </div>
          <div className='text-center text-amber-500 text-2xl font-bold mt-5'>John Doe</div>
          <span className='text-center text-gray-400'>Full Stack Developer</span>
          <div className='flex gap-3 mt-5'>
              <button className='btn btn-active btn-secondary'>Message</button><button className='btn btn-active btn-secondary'>Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
