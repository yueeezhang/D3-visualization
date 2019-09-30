var margin={top: 50, right:50, bottom:50, left:50};
var width=1200,  height=600;
var gwidth=width-margin.left-margin.right, gheight=height-margin.top-margin.bottom;

var months=["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
var days=[];
for(i=1;i<=31;i++) days.push(i);



var svg=d3.select('#heatmap').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('transform', 'translate('+((document.body.clientWidth-width)/2)+', 0)')
        .append("g")
        .attr('transform', 'translate('+margin.left+','+ margin.top+')');


var x=d3.scaleBand()
        .range([0, gwidth])
        .domain(days)
        .padding(0.01);

var y=d3.scaleBand()
        .range([gheight, 0])
        .domain(months)
        .padding(0.01);

svg.append('g')
    .attr('transform', 'translate(0,'+gheight+')')
    .call(d3.axisBottom(x));

svg.append('g')
    .call(d3.axisLeft(y));
/*
var myColor = d3.scaleLinear()
    .range(["white", "#327efd"])
    .domain([0,9]); */


hoursCovered=new Array(12);
for(i=0;i<12;i++) hoursCovered[i]=new Array(31).fill(0);


d3.csv("../data/CALHOUN CITY hourly precipitation.csv", function(data){
    data.forEach(element => {
        date=String(element.DATE);
        m=parseInt(date.substring(4,6));
        d=parseInt(date.substring(6,8));
        //console.log(m, d);
        hoursCovered[m-1][d-1]++;
    });
    for(i=0;i<12;i++){
        for(j=0;j<31;j++){
            svg.append('rect')
                .attr('x', x(days[j]))
                .attr('y', y(months[i]))
                .attr('width', x.bandwidth())
                .attr('height', y.bandwidth())
                .style('fill', d3.interpolatePurples(hoursCovered[i][j]/10));
        }
    }
    
});