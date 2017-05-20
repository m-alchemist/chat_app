import React, { Component } from 'react';
import io from 'socket.io-client';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={messages:[]}
  }
  componentDidMount(){
    this.socket=io('/');
    this.socket.on('message',message=>{
      this.setState({messages:[message, ...this.state.messages]})

    } )
  }
  handleSubmit=(event)=>{
    const body=event.target.value;
    if(event.keyCode==13 && body){
      const message={
        body,
        from:'Me'
      }
      this.setState({messages:[message, ...this.state.messages]})
      console.log('1');
      this.socket.emit('message',body);
        console.log('2');
      event.target.value='';
    }
  }
  render() {
    const messages=this.state.messages.map((message,index)=>{
      return (<li key={index}><b>{message.from}:</b> {message.body} </li>)
    })
    return (
      <div>
      <input type='text' placeholder='enter a message...'
      onKeyUp={this.handleSubmit}/>
      {messages}

      </div>
    );
  }
}
