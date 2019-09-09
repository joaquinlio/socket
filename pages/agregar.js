import React from 'react'
import Link from 'next/link'
import io from 'socket.io-client'

class Calendario extends React.Component{

  constructor(){
    super();
    this.state = {
      clases: []
    }
  }

  componentDidMount(){
    this.socket = io('/');
    //esto de aca abajo essta escuchando
    this.socket.on('calendario', message => {
      this.setState({
        clases: [clase, ...this.state.clases]
      })
    })
  }

  handleSubmit = event => {
    const clase = event.target.value
    if (event.keyCode === 13 && clase) {
      const message = {
        clase,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages]});
      this.socket.emit('message', body);
      event.target.value = '';
    }
  }

  render(){
    
    const clases = this.state.clases.map((clase, index) => {
      return <li key={index}>
        <b>{clase.nombre}</b>
      </li>
    });
    return(
      <div> 
          <h1>Agregar Clase</h1>
          <input 
      type="text"
      placeholder="Escribir..."
      onKeyUp={this.handleSubmit.bind(this)}
      />
      <p>Clases</p>
      {clases}
      </div>
    )
  }
}

export default Calendario
