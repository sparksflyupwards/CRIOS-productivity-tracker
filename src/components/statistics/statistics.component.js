import React, {Component} from 'react';
import Chart from "react-google-charts";
import axios from "axios";

class Statistics extends Component {
    constructor(props){
        super(props);
        
    
        this.state = {sessions: [],
                     data: [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'minutesWorked' }],],
                     dataIsReady: "true"  
                    };
      }

    componentDidMount() {
        axios.get("http://localhost:5000/session/")
        .then(res =>{
            this.setState({sessions: res.data});
            for (const session of this.state.sessions){
                this.state.data.push([new Date(session.stop_time), Number(session.total_time/1000/60).toFixed(2)])
            }
            this.state.dataIsReady = "true"
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
        <div>Fetching data from API</div>
    )}


        </div>);
      }
}

export default Statistics;