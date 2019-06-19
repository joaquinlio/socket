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
      this.setState({
        messages: [message, ...this.state.messages]
      })
    })
  }

  handleSubmit = event => {
    const body = event.target.value
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        // from: 'Me'
      }
      let todo = { messages: [message, ...this.state.messages]};
      this.setState({ messages: [message, ...this.state.messages]});
      console.log(todo);
      this.socket.emit('message', todo);
      event.target.value = '';
    }
  }

  render(){
    
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}>
        <b>{message.body}</b>
      </li>
    });
    return(
      <div>

      <h1>hola22</h1>

      <input 
      type="text"
      placeholder="Escribir..."
      onKeyUp={this.handleSubmit.bind(this)}
      />
      <p>hola</p>
      {messages}
      </div>
    )
  }
}

export default Index
