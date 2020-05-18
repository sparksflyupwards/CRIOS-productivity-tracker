import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import axios from "axios";
import { Segment, Icon, Modal, Button, Header } from 'semantic-ui-react'
const ms = require('pretty-ms')


export default class newSession extends Component {

  /**
   * 
   * 
   * 
   * username: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    stop_time: {
        type: Date,
        required: true
    },
    total_time: {
        type: Number,
        required: true
    }
   */
  constructor(props){
    super(props);

    this.onStartTime = this.onStartTime.bind(this);
    this.onStopTime = this.onStopTime.bind(this);
    this.onClearTime = this.onClearTime.bind(this);
    this.onResumeTime = this.onResumeTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        time: 0,
        isOn: false,
        start_time: 0,
        stop_time: 0
    }
}
onSubmit(e){
  e.preventDefault();
  const session = {
      username: "saad",
      notes: "this is the notes",
      start_time: this.state.start_time,
      stop_time: this.state.stop_time,
      total_time: this.state.time
  }
  console.log(session)
  axios.post('http://localhost:5000/session/add', session)
    .then(res => console.log(res.data));

  window.location = '/';

}
onResumeTime(){
  this.setState({
    time: this.state.time,
    isOn: true,
    start: Date.now() - this.state.time
 });
 this.timer = setInterval(() => {
   this.setState({
   time:  Date.now() - this.state.start
 })
 } , 1);
}
onStopTime() {
  this.setState({isOn: false, stop_time: Date.now()})
  clearInterval(this.timer)
}
onClearTime() {
  this.setState({time: 0, stop_time:0, isOn: false})
}

onStartTime() {
  this.setState({
     time: this.state.time,
     isOn: true,
     start_time: Date.now() - this.state.start_time,
     start: Date.now()
  });
  this.timer = setInterval(() => {
    console.log(this.state.time)
    this.setState({
    time: Date.now() - this.state.start
  })
  } , 1);
}

  render() {
   
      let start = (this.state.time == 0) ?
      <button onClick={this.onStartTime}>start</button> :
      null
    let stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <button onClick={this.onStopTime}>stop</button>
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.onResumeTime}>resume</button>
    let reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <button onClick={this.onClearTime}>reset</button>
      
    let submitSession = (this.state.time==0 || this.state.isOn) ?
      null :
      <form onSubmit={this.onSubmit}>
      <input type="submit" value="Create Session" className="btn btn-primary" />
      </form>
    return(
      
      <div>
      <Modal trigger={<Button>Create Session</Button>} 
             dimmer="blurring"
             closeOnDimmerClick= {false}
             closeIcon>
    <Modal.Header>New Session</Modal.Header>
    <Modal.Content>
       <Modal.Description>
        <Header></Header>
      </Modal.Description>
      <h3>timer: {ms(this.state.time)}</h3>
        {start}
        {resume}
        {stop}
        {reset}
        {submitSession}
      
    {
      /**
       * 
      
        <CountdownCircleTimer
    isPlaying
    duration={10}
    colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
  >
     
    {({ remainingTime }) => this.state.time}
  </CountdownCircleTimer>

  */
    }
    </Modal.Content>
  </Modal>
     
       
  
      </div>
      );
  }
}