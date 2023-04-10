/* 
    Mini Project D3.js
    Using Scatter plot 
*/

/*  y-asix is the weight & x-asix is the height
    ------------------------------
    if user mouse on the dot, data of the dot will be shown (tooltips)
    ------------------------------
    A scatter plot allows us to visualize the relationship between 
    height and weight in several ways. 
    First, we can use the plot to identify any patterns or trends in the data. 
    For example, we might see that there is a general trend for taller individuals 
    to weigh more than shorter individuals. 
    ------------------------------
    We can also use the scatter plot to identify any outliers or unusual data points that 
    do not fit the overall pattern of the data. For example, we might see an individual 
    who is unusually tall and thin or unusually short and heavy.
    ------------------------------
    conclusion: this scatter plot have interval function (D3 Loop), tooltips (UI control)
    */

// d3.csv("data/superhero_data_analysis.csv").then(function(data) {
//     console.log(data);
// });

// this is test of scatter plot with random data
// Set dimensions
const xSize = 500;
const ySize = 500;
const margin = 40;
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;

// Create random points
const numPoints = 100;
const data = [];
for (let i = 0; i < numPoints; i++) {
    data.push([Math.random() * xMax, Math.random() * yMax]);
}

// Append svg to the page
const svg = d3.select("#scatter-plot")
    .append("svg")
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

// X axis
const x = d3.scaleLinear()
    .domain([0, 500])
    .range([0, xMax]);

svg.append("g")
    .attr("transform", "translate(0," + yMax + ")")
    .call(d3.axisBottom(x));

// Y axis
const y = d3.scaleLinear()
    .domain([0, 500])
    .range([yMax, 0]);

svg.append("g")
    .call(d3.axisLeft(y));

// Dots
svg.append('g')
    .selectAll("dot")
    .data(data).enter()
    .append("circle")
    .attr("cx", function (d) { return d[0] } )
    .attr("cy", function (d) { return d[1] } )
    .attr("r", 4.5)
    .style("fill", "skyblue");