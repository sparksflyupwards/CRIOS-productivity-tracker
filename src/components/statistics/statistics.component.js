import React, {Component} from 'react';
import * as d3 from "d3";
import Chart from "react-google-charts";

class Statistics extends Component {
    componentDidMount() {
        this.drawChart();
      }
        
      drawChart() {
         const w = 700;
         const h = 500;
        const data = [12, 5, 6, 6, 9, 100];
        
        const svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("margin-left", 100);
                      
        svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d, i) => i * 70)
          .attr("y", (d, i) => h - 10 * d)
          .attr("width", 65)
          .attr("height", (d, i) => d * 10)
          .attr("fill", "green")
         
          
      }
            
      render(){
        return <div id={"#" + this.props.id}>
    <Chart
  width={'500px'}
  height={'300px'}
  chartType="Bar"
  loader={<div>Loading Chart</div>}
  data={[
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350],
  ]}
  options={{
    // Material design options
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
  }}
  // For tests
  rootProps={{ 'data-testid': '2' }}
/>

        </div>
      }
}

export default Statistics;