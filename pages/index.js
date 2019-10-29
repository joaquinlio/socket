import React from "react";
import Link from "next/link";
import io from "socket.io-client";

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.socket = io("/", {
      transports: ["websocket"],
      secure: false
    });

    this.socket.on("clase", clase => {
      console.log(clase);
    });
  }

  handleSubmit = event => {
    const body = event.target.value;
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: "Me"
      };
      //this.setState({ messages: [message, ...this.state.messages] });
      this.socket.emit("clase", { clase: "probandosocketes" });
      event.target.value = "";
    }
  };

  render() {
    const messages = this.state.messages.map((message, index) => {
      return (
        <li key={index}>
          <b>{message.body}</b>
        </li>
      );
    });
    return (
      <div>
        <h1>hola22</h1>

        <input
          type="text"
          placeholder="Escribir..."
          onKeyUp={this.handleSubmit.bind(this)}
        />
        {messages}
      </div>
    );
  }
}

export default Index;
