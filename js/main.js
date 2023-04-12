/* 
    Mini Project D3.js
    -- Scatter plot --
    Height Vs Weight
*/

    const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
    const WIDTH = 1100 - MARGIN.LEFT - MARGIN.RIGHT
    const HEIGHT = 600 - MARGIN.TOP - MARGIN.BOTTOM
    
    const svg = d3.select("#scatter-plot")
        .append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT + 10)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    
    const g = svg.append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
    
    let time = 0
    let interval
    let formattedData
    
    // Tooltip
    const tip = d3.tip()
        .attr('class', 'd3-tip')
        .html(d => {
            let text = `<strong>Name:</strong> <span style='color:#F5A2A2;text-transform:capitalize'>${d.name}</span><br>`
            text += `<strong>Gender:</strong> <span style='color:#F5A2A2;text-transform:capitalize'>${d.Gender}</span><br>`
            text += `<strong>Eye color:</strong> <span style='color:#F5A2A2'>${(d.Eye_color)}</span><br>`
            text += `<strong>Race:</strong> <span style='color:#F5A2A2'>${(d.Race)}</span><br>`
            text += `<strong>Hair color:</strong> <span style='color:#F5A2A2'>${(d.Hair_color)}</span><br>`
            text += `<strong>Height:</strong> <span style='color:#F5A2A2'>${(d.Height)}</span><br>`
            text += `<strong>Publisher:</strong> <span style='color:#F5A2A2'>${(d.Publisher)}</span><br>`
            text += `<strong>Skin color:</strong> <span style='color:#F5A2A2'>${(d.Skin_color)}</span><br>`
            text += `<strong>Alignment:</strong> <span style='color:#F5A2A2'>${(d.Alignment)}</span><br>`
            text += `<strong>Weight:</strong> <span style='color:#F5A2A2'>${(d.Weight)}</span><br>`
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
    // const statusx = d3.scaleOrdinal().range(["#957DAD","#FFB7C5","#B3DFB5"])
    const statusx = d3.scaleOrdinal().range(["#957DAD","#B3DFB5","#7ABACC"])
    // #B3DFB5 puple, #B3DFB5 green, #8FB1CC blue
    
    // Labels
    const xLabel = g.append("text")
        .attr("y", HEIGHT + 50)
        .attr("x", WIDTH / 2)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Weight (kg)")
        .attr("fill", "#FF9C9C")
    
    const x2Label = g.append("text")
        .attr("y", HEIGHT + 100)
        .attr("x", WIDTH / 2)
        .attr("font-size", "18px")
        .attr("text-anchor", "middle")
        
    
    const yLabel = g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -70)
        .attr("x", -250)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Height (cm)")
        .attr("fill", "#80BFA0")
    
    const xAxisGroup = g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
    
    const yAxisGroup = g.append("g")
        .attr("class", "y axis")
    
    const alig = ["Bad","Good","Neutral"];
    
    const legend = g.append("g")
        .attr("transform", `translate(${WIDTH*2 - 450}, ${HEIGHT - 550})`)
    
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
    
    $("#con-select")
        .on("change", () => {
            console.log($("#con-select").val());
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
        .tickValues([-100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000])
        .tickFormat((d) => d)
        xAxisGroup.call(xAxisCall)
    
        const yAxisCall = d3.axisLeft(y)
        yAxisGroup.call(yAxisCall)
    
        const continent = $("#con-select").val()
    
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