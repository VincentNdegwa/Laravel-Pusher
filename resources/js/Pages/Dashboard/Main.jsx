import React, { useEffect, useState } from 'react'
import "./styles/main.css"
import Pusher from "pusher-js"
import axios from 'axios'
import { data } from 'autoprefixer'

function Main() {

    const [username, setUsername] = useState("Vincent")
    const [text, setText] = useState("")
    const [messages, setMessages] = useState([])

    let arrayMessages = []

    const submitForm = async ev => {
        ev.preventDefault()
        await axios.post("http://192.168.43.120:8000/api/message",
            { username: username, message: text })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        Pusher.logToConsole = true;

        var pusher = new Pusher('b526271d9952b0873f03', {
            cluster: 'mt1'
        });

        var channel = pusher.subscribe('chat');
        channel.bind('chat_messages', function (data) {
            arrayMessages.push(JSON.parse(JSON.stringify(data)))
            setMessages(arrayMessages)
        });
    })




    return (
        <div className="container">
            <div className="container-holder">
                <input
                    type='text'
                    className='usernameInput'
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}
                />
                <div className="text-display">
                    {messages.map((item) => {
                        return (
                            <div className="text-item">
                                <span>{item.username}</span>
                                <p>{item.message}</p>
                            </div>
                        )

                    })}
                </div>
            </div>
            <form onSubmit={submitForm} className='form-control text-form'>
                <div className="input-holder">
                    <input
                        type='text'
                        value={text}
                        onChange={ev => setText(ev.target.value)}
                        placeholder='Write a message' />
                    <button type='submit'>Send</button>
                </div>
            </form>
        </div>

    )
}

export default Main
