import React, { useRef, useState, useEffect } from 'react'
import io from 'socket.io-client'

export default function Chat({socket}) {

const messageRef = useRef()
const [messageList, setMessageList] = useState([])


useEffect(() => {
    socket.on('receive_message', (data) => {
        setMessageList((current) => [...current, data])
    })


    return () => {
        socket.off('receive_message')
    }
}, [socket])

const HandleSubmit =  () => {
    const message = messageRef.current.value
    if (!message.trim()) return

    socket.emit('message', message)

    clearInput()
    focusInput()
}

const clearInput = () => {
    messageRef.current.value = ''
}

const focusInput = () => {
    messageRef.current.focus()
}


const getEnterKey = (e) => {
    if (e.key === 'Enter') {
        HandleSubmit()
    }
}


  return (
    <div>
      <h1>Chat</h1>
      {
        messageList.map((message, index) => (
            <p key={index}>{message.author}:{message.text} </p>
        ))
      }
      <input type="text" ref={messageRef} placeholder='Message' onKeyDown={(e) => getEnterKey(e)} />
      <button onClick={() => HandleSubmit()}>Send</button>
    </div>
  )
}
