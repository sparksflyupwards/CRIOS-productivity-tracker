import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


const Creature = props => 
(

  <tr>
    <td>{props.creature.username}</td>
    <td>{props.creature.stop_time.substring(0,10)}</td>
    <td>{props.creature.notes}</td>
    <td>
      <Link to={"/edit/"+props.creature._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCreature(props.creature._id) }}>delete</a>
    </td>
  </tr>
)
export default class CreatureList extends Component {
  constructor(props){
    super(props);
    
    this.deleteCreature = this.deleteCreature.bind(this);

    this.state = {creatures: []};
  }
  componentDidMount(){

    axios.get("http://localhost:5000/creature/")
    .then(res =>{
        this.setState({creatures: res.data});
    })
    .catch(err=> {
        console.log(err);
    })

}
deleteCreature(id){
  axios.delete("http://localhost:5000/creature/"+id)
  .then(res => {
      console.log(res)
      this.setState({creatures: this.state.creatures.filter(creature=>creature._id !== id)})
  })
  .catch(err =>{
      console.log(err)
  })
}

creatureList() {
  return this.state.creatures.map(creature => {
    return <Creature creature={creature} deleteCreature={this.deleteCreature} key={creature._id}/>;
  })
}
  render() {
    return(
      <div>
          <h1>Logged creatures</h1>
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
                  { this.creatureList() }
              </tbody>
          </table>
      </div>
  )
  }
}