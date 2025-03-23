
import * as d3 from "d3";

export let drawBarChart = (barChartLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {

    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    //2. Add a mouseover event to the bar
    //3. The mouseover event should also highlight the corresponding points in the scatter plot
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot 
    //5. You can refer to the code in the drawScatterPlot function 
  
    barChartLayer.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', d => `bar ${d.station.replace(/[^a-zA-Z]/g, "")}`)  // set class based on station
      .attr('x', (d, i) => xScale(d.station))  // Position of the bar based on station
      .attr('y', d => yScale(d.start))
      .attr('width', xScale.bandwidth()) 
      .attr('height', d => barChartHeight - yScale(d.start))
      .attr('fill', 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 1.5)
      // Highlight the the bar when mouseover
      .on('mouseover', (event, d) => {   
        d3.select(event.target)
          .style('fill', 'red')  // cahnge color to red
          const stationClass = `.${d.station.replace(/[^a-zA-Z]/g, "")}`; // get the current station as a class
        d3.selectAll(`.point${stationClass}`)
          .style("fill", "red")  // Highlight the circle
          .attr("r", 10)
          .raise(); // Raise the selected circle to the top
        // Append a yellow rect element around the scatter plot to isolate the selected point
        d3.select("svg")  
          .append("rect")
          .attr("x", 35)
          .attr("y", -20)
          .attr("width", 600)
          .attr("height", 400)
          .attr("fill", "yellow")
          .attr("opacity", 0.5)
          .attr("pointer-events", "none");
      })
      // Remove the highlight from the bar when mouseover over
      .on('mouseout', (event, d) => {
        d3.select(event.target) 
          .style('fill', 'steelblue')  // reset the color
        const stationClass = `.${d.station.replace(/[^a-zA-Z]/g, "")}`; // Create class name based on station
        d3.selectAll(`.point${stationClass}`)
          .attr("r", 5)
          .style("fill", "steelblue"); // Reset the color of the circle
        d3.select("svg").select("rect").remove(); // remove rectangle isolator
      });
    //Task 8: Connect the bar chart with the scatter plot
    //Hint:
    //1. Add a mouseover event to the bar
    //2. The mouseover event should also highlight the corresponding points in the scatter plot
    

  }