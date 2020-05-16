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
                this.state.data.push([new Date(session.stop_time), Number(Number(session.total_time/1000/60).toFixed(2))])
            }
 
            
            for (let i=1; i< (this.state.data.length-1); i++){
                if(String(this.state.data[i][0]).slice(0,10).localeCompare(String(this.state.data[i+1][0]).slice(0,10))==0){
                    this.state.data[i][1]+=this.state.data[i+1][1]
                    this.state.data.splice(i+1,1)
                    
                    i -=1;
                }
                else {
                   
                }
            }
           
            this.setState({data: this.state.data})
            this.setState({dataIsReady: "true"});
            console.log([
                [
                  'Day',
                  'Minutes worked',
                ],
                [new Date("2020-02-2"),22]].concat(this.state.data.slice(1)))
        })
        .catch(err=> {
            console.log(err);
        })
      }
        
    
      
 render(){
        return (<div id={"#" + this.props.id}> 
    

    {this.state.dataIsReady == "true" ? 
    (
         <div class="charts">   
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
        <Chart
  width={'600px'}
  height={'400px'}
  chartType="Line"
  loader={<div>Loading Chart</div>}
  data={[
    [
      'Day',
      'Minutes worked',
    ],
   ].concat(this.state.data.slice(1))}
  options={{
    chart: {
      title: 'Sessions logged',
      subtitle: 'in minutes',
    },
  }}
  rootProps={{ 'data-testid': '3' }}
/>
        </div>
            
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