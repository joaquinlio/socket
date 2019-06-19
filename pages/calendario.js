import React from 'react'
import Link from 'next/link'
import io from 'socket.io-client'

class Index extends React.Component{

  constructor(){
    super();
    this.state = {
      messages: [{
        body: 'clase 1'
      },{
        body: 'clase 2'
      }]
    }
  }

  componentDidMount(){
    this.socket = io('/');
    //esto de aca abajo essta escuchando
    this.socket.on('message', message => {
      console.log(message);
      this.setState(message.body)
    })
  }

  render(){
    
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}>
        <b>{message.body}</b>
      </li>
    });
    return(
      <div>

      <h1>Ver clases</h1>
      {messages}
      </div>
    )
  }
}

export default Index
