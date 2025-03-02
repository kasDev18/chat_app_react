import React from 'react'

const chat_bg = {
    opacity: '10%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    height: '20%'
}

function Signup() {
  return (
    <div className="h-screen w-screen bg-[#984FD2] font-display">
        <div className='background-chat-imgs'>
            <img src="/images/chat2.png" alt="" className={"opacity-20 absolute top-1/4 left-50 transform -translate-x-1/2 -translate-y-1/2"}/>
            <img src="/images/chat2.png" width={"20%"} height={"20%"} alt="" className={"opacity-20 absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"}/>
            <img src="/images/chat2.png" alt="" className={"opacity-20 absolute top-1/4 left-50 transform -translate-x-1/2 -translate-y-1/2"}/>
            <img src="/images/chat2.png" alt="" className={"opacity-20 absolute top-1/4 left-50 transform -translate-x-1/2 -translate-y-1/2"}/>
            <img src="/images/chat2.png" alt="" className={"opacity-20 absolute top-1/4 left-50 transform -translate-x-1/2 -translate-y-1/2"}/>
        </div>
    </div>
  )
}

export default Signup
