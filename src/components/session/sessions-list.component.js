import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
function timeConverter( ms ) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  // 2- Extract hours:
  var hours = parseInt( seconds / 3600 ); 
  hours = pad(hours)// 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt( seconds / 60 );
  minutes = pad(minutes) // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  seconds = Math.round(seconds)
  seconds = pad(seconds)
  
  function pad(num){
    if(num<10){
      num = "0"+num
    }
    return "" + num;
  }
  return( hours+":"+minutes+":"+seconds);
}
const Session = props => 
(

  <tr>
    <td>{props.session.username}</td>
    <td>{props.session.stop_time.substring(0,10)}</td>
    <td>{timeConverter(props.session.total_time)}</td>
    <td>{props.session.notes}</td>
    <td>
      <Link to={"/edit/"+props.session._id}>edit</Link> | <a href="#" onClick={() => { props.deleteSession(props.session._id) }}>delete</a>
    </td>
  </tr>
)
export default class SessionList extends Component {
  constructor(props){
    super(props);
    
    this.deleteSession = this.deleteSession.bind(this);

    this.state = {sessions: []};
  }
  componentDidMount(){

    axios.get("http://localhost:5000/session/")
    .then(res =>{
        this.setState({sessions: res.data});
    })
    .catch(err=> {
        console.log(err);
    })

}
deleteSession(id){
  axios.delete("http://localhost:5000/session/"+id)
  .then(res => {
      console.log(res)
      this.setState({sessions: this.state.sessions.filter(session=>session._id !== id)})
  })
  .catch(err =>{
      console.log(err)
  })
}

sessionList() {
  return this.state.sessions.map(session => {
    return <Session session={session} deleteSession={this.deleteSession} key={session._id}/>;
  })
}
  render() {
    return(
      <div>
          <h1>Logged Sessions</h1>
          <table className="table">
              <thead className="thead-light">
                  <tr>
                      <th>Username</th>
                      <th>Stop time</th>
                      <th>Total Time</th>
                      <th>Notes</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  { this.sessionList() }
              </tbody>
          </table>
      </div>
  )
  }
}