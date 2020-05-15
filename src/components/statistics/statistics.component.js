import React, {Component} from 'react';
import Chart from "react-google-charts";
import axios from "axios";
import { Message, Icon, Dimmer, Loader, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
class Statistics extends Component {
    constructor(props){
        super(props);
        
    
        this.state = {sessions: [],
                     data: [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'minutesWorked' }],],
                     dataIsReady: "false"  
                    };
      }

    componentDidMount() {
        axios.get("http://localhost:5000/session/")
        .then(res =>{
            this.setState({sessions: res.data});
            for (const session of this.state.sessions){
                this.state.data.push([new Date(session.stop_time), Number(session.total_time/1000/60).toFixed(2)])
            }
            this.setState({dataIsReady: "true"});
            console.log(this.state.data)
        })
        .catch(err=> {
            console.log(err);
        })
      }
        
    
            
      render(){
        return (<div id={"#" + this.props.id}> 
    

    {this.state.dataIsReady == "true" ? 
    (
    <Chart
  width={1000}
  height={350}
  chartType="Calendar"
  loader={<div>Loading Chart</div>}
  data={this.state.data}
  options={{
    title: 'Yearly Data in minutes',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
    ) :
    (
        <Segment>
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
        Hold on while we fetch your data.
    </Segment>
    

  
    )}


        </div>);
      }
}

export default Statistics;