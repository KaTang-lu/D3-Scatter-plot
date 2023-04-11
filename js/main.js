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

    const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
    const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
    const HEIGHT = 700 - MARGIN.TOP - MARGIN.BOTTOM
    
    const svg = d3.select("#scatter-plot").append("svg")
        .attr("width", WIDTH*2 + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT*2 + MARGIN.TOP + MARGIN.BOTTOM)
    
    const g = svg.append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
    
    let time = 0
    let interval
    let formattedData
    
    // Tooltip
    const tip = d3.tip()
        .attr('class', 'd3-tip')
        .html(d => {
            let text = `<strong>Name:</strong> <span style='color:#10DEDE;text-transform:capitalize'>${d.name}</span><br>`
            text += `<strong>Gender:</strong> <span style='color:#10DEDE;text-transform:capitalize'>${d.Gender}</span><br>`
            text += `<strong>Eye color:</strong> <span style='color:#10DEDE'>${(d.Eye_color)}</span><br>`
            text += `<strong>Race:</strong> <span style='color:#10DEDE'>${(d.Race)}</span><br>`
            text += `<strong>Hair color:</strong> <span style='color:#10DEDE'>${(d.Hair_color)}</span><br>`
            text += `<strong>Height:</strong> <span style='color:#10DEDE'>${(d.Height)}</span><br>`
            text += `<strong>Publisher:</strong> <span style='color:#10DEDE'>${(d.Publisher)}</span><br>`
            text += `<strong>Skin color:</strong> <span style='color:#10DEDE'>${(d.Skin_color)}</span><br>`
            text += `<strong>Alignment:</strong> <span style='color:#10DEDE'>${(d.Alignment)}</span><br>`
            text += `<strong>Weight:</strong> <span style='color:#10DEDE'>${(d.Weight)}</span><br>`
            return text
        })
    g.call(tip)
    
    // Scales
    const x = d3.scaleLinear()
        .range([0, WIDTH])
    const y = d3.scaleLinear()
        .range([HEIGHT, 0])
    const area = d3.scaleLinear()
        .range([25*Math.PI, 1500*Math.PI])
        .domain([2000,55000])
    const continentColor = d3.scaleOrdinal(d3.schemeAccent)
    const statusx = d3.scaleOrdinal().range(["#FF6666","#3333FF","#808080"])
    
    // Labels
    const xLabel = g.append("text")
        .attr("y", HEIGHT + 50)
        .attr("x", WIDTH / 2)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Weight (kg)")
    
    const x2Label = g.append("text")
        .attr("y", HEIGHT + 100)
        .attr("x", WIDTH / 2)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("รมย์รัมภา วาณิชยธราสกุล 6504062620094")
    
    const yLabel = g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -70)
        .attr("x", -250)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Height (cm)")
    
    const xAxisGroup = g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
    
    const yAxisGroup = g.append("g")
        .attr("class", "y axis")
    
    
    const alig = ["Bad","Good","Neutral"];
    
    const publishers = ["ABC Studios","Dark Horse Comics","DC Comics",
                        "George Lucas","Hanna-Barbera","HarperCollins","Icon Comics",
                        "IDW Publishing","Image Comic","J. K. Rowling","J. R. R. Tolkien","JBZ",
                        "Marvel Comics","Microsoft","NBC - Heroes","None","Rebellion","Shueisha",
                        "Sony Pictures","South Park","Star Trek","SyFy","Team Epic TV",
                        "Titan Book","Universal Studios","Wildstorm"
                        ];
    
    const legend = g.append("g")
        .attr("transform", `translate(${WIDTH*2 - 450}, ${HEIGHT - 550})`)
    
    alig.forEach((publisher, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`)
    
        legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
            .attr("fill", statusx(publisher))
    
        legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(publisher)
    })
    
    d3.csv("data/superhero_data_analysis.csv").then(function(data){
        formattedData = data.map(d => {
            d.Height = Number(d.Height)
            d.Weight = Number(d.Weight)
            return d;
        })
    
        // first run of the visualization
        console.log(formattedData)
        update(formattedData)
    })
    
    $("#continent-select")
        .on("change", () => {
            console.log($("#continent-select").val());
            update(formattedData)
        })
    
    function update(data) {
        // standard transition time for the visualization
        const t = d3.transition()
            .duration(100)
        
        x.domain([d3.min(data,(d)=>d.Weight)-100,d3.max(data,(d)=>d.Weight)+100])
        y.domain([d3.min(data,(d)=>d.Height)-100,d3.max(data,(d)=>d.Height)+100])
    
        // X Axis
        const xAxisCall = d3.axisBottom(x)
        xAxisGroup.call(xAxisCall)
    
        const yAxisCall = d3.axisLeft(y)
        yAxisGroup.call(yAxisCall)
    
        const continent = $("#continent-select").val()
    
        const filteredData = data.filter(d => {
            if (continent === "all") return true
        })
    
        const filteredData2 = data.filter(d => {
            if (continent !== "all") return d.Alignment == continent
        })
    
        // JOIN new data with old elements.
        const circles = g.selectAll("circle")
            .data(filteredData, d => d.Publisher)
    
        const circles2 = g.selectAll("circle")
            .data(filteredData2, d => d.Alignment)
    
        // EXIT old elements not present in new data.
        circles.exit().remove()
    
        // ENTER new elements present in new data.
        circles.enter().append("circle")
            .attr("fill", d => continentColor(d.Publisher))
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .merge(circles)
            .transition(t)
                .attr("cy", d => y(d.Height))
                .attr("cx", d => x(d.Weight))
                .attr("r", 5)
    
                circles2.enter().append("circle")
                .attr("fill", d => statusx(d.Alignment))
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide)
                .merge(circles2)
                .transition(t)
                    .attr("cy", d => y(d.Height))
                    .attr("cx", d => x(d.Weight))
                    .attr("r", 5)
    }
/*-------------------- */