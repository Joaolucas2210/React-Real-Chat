import React, { useRef } from 'react'
import io from 'socket.io-client'

export default function Join( {setChatVisibility, setSocket} ) {

const usernameRef = useRef()

const handleSubmit = async () => {
    const username = usernameRef.current.value
    if (!username.trim()) return
    const socket = await io.connect('http://localhost:3001')
    socket.emit('join', username)
    setSocket(socket)
    setChatVisibility(true)
}




  return (
    <div className=' flex, flex-col, align-items-center, justify-content-center'>
        <h1 className='font-bold text-4xl mb-5, text-center, text-gray-800'>



          Entrar


          </h1>

        <input className='border border-gray-400 p-2, w-full, mb-5, rounded-md , text-gray-800, bg-gray-100, outline-none, focus:outline-none, focus:shadow-outline'
         type="text" ref={usernameRef} placeholder='Enter your name' />

        <button className='flex, flex-col, align-items-center, justify-content-center, border border-gray-400 p-2, w-full, mb-5, rounded-md , text-gray-800, bg-gray-100, outline-none, focus:outline-none, focus:shadow-outline'
         onClick={() => handleSubmit()}>Enter</button>
    </div>
  )
}
