# timeline-image-chart

A time based/event series interactive visualization using d3.js v3. Use drag to navigate in time. By deafult the chart 
takes current date as start date. This chart allows the user to use images in the time series.

## Usage
You can either install using `bower` or clone this repo.

`bower install timeline-image-chart`

Include `timelineImageChartApp` in your app.js module.

`angular.module('AngularApp', ['timelineImageChartApp',...])...`

Import `timelineimagechart.js` in your index file.

In HTML file add `<timeline-image-chart chart-data="chartData"></timeline-image-chart>` where you wish to implement the chart.

```
chartData = {
   data: [
     {date: new Date('2017-12-30'), y: 15, url: 'http://image_url'},...
   ],
   options: {
     width: 1000,
     height: 300,
     offset: 2,
     tickType: 0,
     tickDuration: 6,
     xZoom: 1,
     yZoom: 0,
     type: 'image'
   }
}
```
The y-scale value needs to be set for clear visibility of data. If too many data in a particular set different  values for `y`.  

|Option | Description|
|---|---|
|**width**| set the width for svg, default value is `1000`|
|**height**| set the width for svg, default value is `300`|
|**offset**| set offset for no. of days to be visible along `x-axis`, default value is `5`|
|**tickType**| set your desired tick type `0 - hour` and `1 - day`, default value is `0`|
|**tickDuration**| choose your desired duration for the ticks to appear, default value is `12`|
|**xZoom**| to enable pan along `x-axis` set value to 1|
|**yZoom**| to enable pan along `y-axis` set value to 1, default value is `0`|
|**type**| choose your desired chart type if you do not have image url set this value to `circle`|

## Preview

Run `grunt serve` for preview.

## License

GNU General Public License v3.0
