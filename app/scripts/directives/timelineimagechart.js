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
            var width = options.width==undefined ? 1000 : options.width, 
                height = options.height==undefined ? 400 : options.height,  
                offsetValue = options.offset==undefined ? 5 : options.offset;

            var svg = d3.select(rawSvg)
                        .attr("width", width)
                        .attr("height", height);

            var div = d3.select("body").append("div")	
                        .attr("class", "tooltip")				
                        .style("opacity", 1);

            
            // scale for x and y axis
            var xScale = d3.time.scale().domain([d3.time.day.offset(new Date(), 0), d3.time.day.offset(new Date(), offsetValue)]).range([0, width]);
            var yScale = d3.scale.linear().domain([30, 0]).range([0, height-75]);
            
            
            // zoom
            function zoomed(){
                g.select('.x-axis')
                    .call(xAxis);
                g.selectAll('image')
                    .attr('x',function(d){
                        return xScale(d.x);
                    });
            }

            var zoom = d3.behavior.zoom().x(xScale).y(yScale).scaleExtent([1,1]).on("zoom", zoomed);

            // setting up axis
            var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(d3.time.hour, 12).innerTickSize(-(height-75)).outerTickSize(2);
            
            var yAxis = d3.svg.axis().scale(yScale).orient("left").outerTickSize(2).ticks(0).tickFormat(function(d){
                return '';
            }).tickPadding(10);

            var g = svg.append("g").attr("transform","translate(20,10)");

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
            g.selectAll(null)
                    .data(chartData.data)
                    .enter()
                    .append("image")
                    .attr("width", '25px')
                    .attr("height", '25px')
                    .attr({'x':function(d){ return xScale(d.x); },
                        'y':function(d){ return yScale(d.y); }
                    })
                    .attr("xlink:href", function(d){
                        return d.url;
                    })
                    .style("cursor", "pointer")
                    .on("mouseover", function(d) {
                        div.transition()		
                            .duration(200)		
                            .style("opacity", 0.9);		
                        div	.html("Date: "+ (d.x).toDateString() +"<br>" +"Log: "+d.item)	
                            .style("left", (d3.event.pageX) + "px")		
                            .style("top", (d3.event.pageY - 28) + "px");	
                        })					
                    .on("mouseout", function(d) {		
                        div.transition()		
                            .duration(500)		
                            .style("opacity", 0);	
                    });

      }
    };
  });
