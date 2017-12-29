'use strict';

/**
 * @ngdoc directive
 * @name timelineImageChartApp.directive:timelineImageChart
 * @description
 * # timelineImageChart
 */
angular.module('timelineImageChartApp',[])
  .directive('timelineImageChart', function () {
    return {
      template: '<svg class="chart"></svg>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
            var chartData = scope[attrs.chartData];
            var options = chartData.options;
            var rawSvg = element.find("svg")[0];
            var tickList = [d3.time.hour, d3.time.day];
            var width = options.width===undefined ? 1000 : options.width, 
                height = options.height===undefined ? 400 : options.height,  
                offsetValue = options.offset===undefined ? 5 : options.offset,
                tickType = options.tickType===undefined ? d3.time.hour: tickList[options.tickType],
                tickDuration = options.tickDuration===undefined ? 12 : options.tickDuration,
                xZoom = options.xZoom===undefined ? 1 : options.xZoom,
                yZoom = options.yZoom===undefined ? 0 : options.yZoom,
                color = options.color===undefined ? '#000' : options.color;

            var svg = d3.select(rawSvg)
                        .attr("width", width)
                        .attr("height", height)
                        .style("margin", '20px');

            var div = d3.select("body").append("div")	
                        .attr("class", "tooltip")				
                        .style("opacity", 1);

            
            // scale for x and y axis
            var xScale = d3.time.scale().domain([d3.time.day.offset(new Date(), 0), d3.time.day.offset(new Date(), offsetValue)]).range([0, width]);
            var yScale = d3.scale.linear().domain([30, 0]).range([0, height-75]);
            
            
            // zoom
            function zoomed(){
                if(xZoom===1){
                    g.select('.x-axis')
                        .call(xAxis);

                    g.selectAll('image')
                        .attr('x',function(d){
                            return xScale(d.date);
                        });

                    g.selectAll('circle')
                        .attr("transform", "translate(" + d3.event.translate[0] + ")scale(" + d3.event.scale + ")");
                }
                if(yZoom===1){
                    g.select('.y-axis')
                        .call(yAxis);

                    g.selectAll('image')
                        .attr('y',function(d){
                            return yScale(d.y);
                        });
                    var tx = 0, ty=1;
                    g.selectAll('circle')
                        .attr("transform", "translate(0, " + Math.min(height-75, d3.event.translate[1]) + ")scale(" + d3.event.scale + ")");
                }
            }

            var zoom = d3.behavior.zoom().x(xScale).y(yScale).scaleExtent([1,1]).on("zoom", zoomed);

            // setting up axis
            var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(tickType, tickDuration).innerTickSize(-(height-75)).outerTickSize(2);
            
            var yAxis = d3.svg.axis().scale(yScale).orient("left").outerTickSize(2).ticks(0).tickFormat(function(d){
                return '';
            }).tickPadding(10);

            var g = svg.append("g").attr("transform","translate(5,10)");

            g.append("rect")
                .attr("width", width)
                .attr("height", height-75)
                .style("fill", "none")
                .style("pointer-events", "all")
                .call(zoom);
            
            // adding axis
            g.append("g")
                .attr("class", "x-axis")
                .attr("transform","translate(0,"+(height-75)+")")
                .call(xAxis)
                .selectAll("text")	
                .style("text-anchor", "center");
    
            g.append("g")
                .attr("class", "y-axis")
                .call(yAxis);
            
            // adding image
            if(options.type==="image") {
                g.selectAll(null)
                    .data(chartData.data)
                    .enter()
                    .append("image")
                    .attr("width", '25px')
                    .attr("height", '25px')
                    .attr({'x':function(d){ return xScale(d.date); },
                        'y':function(d){ return yScale(d.y); }
                    })
                    .attr("xlink:href", function(d){
                        return d.url!==undefined ? d.url : 'https://github.com/favicon.ico';
                    })
                    .style("cursor", "pointer")
                    .on("mouseover", function(d) {
                        div.transition()		
                            .duration(200)		
                            .style("opacity", 0.9);		
                        div.html((d.date).toDateString() +"<br>" + (d.label!=undefined ? d.label : " "))	
                            .style("left", (d3.event.pageX) + "px")		
                            .style("top", (d3.event.pageY - 28) + "px");	
                        })					
                    .on("mouseout", function(d) {		
                        div.transition()		
                            .duration(500)		
                            .style("opacity", 0);	
                    });
            }

            if(options.type==="circle") {
                g.selectAll(null)
                    .data(chartData.data)
                    .enter()
                    .append('circle')
                    .attr('r', function(d) { return 5; }) 
                    .attr('cy', function(d) { return yScale(d.y); })
                    .attr('cx', function(d) { return xScale(d.date); } )
                    .attr('fill', color) 
                    .attr('opacity', 1)
                    .style('stroke', color)
                    .style("cursor", "pointer")
                    .on("mouseover", function(d) {
                        div.transition()		
                            .duration(200)		
                            .style("opacity", 0.9);		
                        div.html((d.date).toDateString() +"<br>" + (d.label!=undefined ? d.label : " "))	
                            .style("left", (d3.event.pageX) + "px")		
                            .style("top", (d3.event.pageY - 28) + "px");	
                        })					
                    .on("mouseout", function(d) {		
                        div.transition()		
                            .duration(500)		
                            .style("opacity", 0);	
                    });
            }
      }
    };
  });
