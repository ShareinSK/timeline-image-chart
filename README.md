# timeline-image-chart

A time based/event series interactive visualization using d3.js. Use drag to navigate in time. By deafult the chart 
takes current date as start date. This chart allows the user to use images in the time series.

## Usage

Include `timelineImageChartApp` in your app.js module.

`angular.module('AngularApp', ['timelineImageChartApp',...])...`

Import `timelineimagechart.js` in your index file.

In HTML file add `<timeline-image-chart chart-data="chartData"></timeline-image-chart>` where you wish to implement the chart.

## Development

Run `grunt serve` for preview.

## License

GNU General Public License v3.0
