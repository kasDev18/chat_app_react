import React from 'react'
import {BsSend} from 'react-icons/bs'

function MessageInput() {
  return (
    <form className='px-4 my-3 relative'>
        <div className='w-full'>
            <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white' placeholder='Send a message'/>
        </div>
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-8'>
            <BsSend/>
        </button>
    </form>
  )
}

export default MessageInput