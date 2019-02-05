# Week 7 D3 Workshop

In this workshop we will spend some time learning how do basic d3 manipulation.


## Installation and start

Let's get started! First we need to install our dependencies. To do so we will make use of the npm command line tool, usefully called npm. This will download all of the packages that we've said are required in our package.json file, (go take a look!).

```sh
npm install

# then

npm run start

```

This should open a browser tab with url http://localhost:8080/. If it doesn't point your browser over there. If you happen to have yarn installed you can also use that. If you don't have yarn installed you should try it! It's better than the npm command line tool in most ways.

The main thing we've installed here is a linter, it allows you to check whether or not your code adheres to a particular coding style. Try running the linter via:

```sh
npm run lint
```

In other classes style is directly tied to points, this will not be the case here. Yet, as I (your TA) will be grading all of the javascript it will certainly endear you to me if you make your code follow my preferred set of rules.

The scaffold that I we're using here doesn't use very good engineering. It imports d3 via the browser, rather during a single installation step. This precludes using fancy tooling like super modern javascript, and an easy to understand import syntax but you'll get to all that later. For now if you want something from d3 call it from d3.FUNCTIONNAME.

## Intro to d3

We'll be covering some basic d3 usage.


### Scales

d3 scales are at the backbone of any d3.js chart. They allow you to map pretty much any data type into any other data type. This is most often deployed as mapping from a chart space (somewhere where you can easily reason about the layout of the things in the space) to a view space (where it's actually show). For this you will use the might scaleLinear.

Scale functions work by first invoking the scale function (be it scaleLinear, scaleOrdinal, or anything else) to instantiate the scale, and then calling domain and range functions.

Here's some example usage:

```javascript
const scaleA = d3.scaleLinear().domain([0, 10]).range([0, 5]);
console.log(scaleA(1), scaleA(2))
// 0.5 1

const scaleB = d3.scaleLinear().domain([0, 10]).range([5, 0]);
console.log(scaleB(1), scaleB(2))
// 4.5 4

const domain = ['a', 'b', 'c'];
const range = ['cool', 'dogs', 'sunglasses'];
const scaleC = d3.scaleOrdinal().domain(domain).range(range);
console.log(scaleC('a'), scaleC('b'))
// cool dogs

const scaleD = d3.scaleLinear().domain([0, 10]).range(['red', 'black']);
console.log(scaleD(1), scaleD(2))
// rgb(230, 0, 0) rgb(204, 0, 0)

````

### d3 life cycle methods

The literally best way to learn this is by reading this article https://bost.ocks.org/mike/join/ It's written by the guy who made d3. It's great. Once you've read that, read this annotated pie chart code

```javascript
// all the basics
const w = 300;
const h = 300;
const r = 100;
//builtin range of colors
const color = d3.scale.category20c();

// define some data to plot
const data = [
  {"label":"one", "value":20},
  {"label":"two", "value":50},
  {"label":"three", "value":30}
];

const vis = d3.select("body")
  //create the SVG element inside the <body>
  .append('svg:svg')              
  //associate our data with the document
  .data([data])                   
      //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("width", w)           
      .attr("height", h)
      //make a group to hold our pie chart
  .append("svg:g")               
      // move the center of the pie chart from 0, 0 to radius, radius
      // node the string templating syntax here
      .attr("transform", `translate(${r},${r})`)    

//this will create <path> elements for us using arc data
const arc = d3.svg.arc().outerRadius(r);

//this will create arc data for us given a list of values
const pie = d3.layout.pie()           
    // we must tell it out to access the value of each element in our data array
   .value(d => d.value);
    // you could also write this function explicitly, as below, but the arrow is better
    // .value(function(d) { return d.value; });    

//this selects all <g> elements with class slice (there aren't any yet)
var arcs = vis.selectAll("g.slice")     
  // associate the generated pie data (an array of arcs,
  // each having startAngle, endAngle and value properties)
  .data(pie)                         
  .enter()                            
  // this will create <g> elements for every "extra" data element that should be associated with a selection.
  // The result is creating a <g> for every object in the data array create a group to hold each slice
  // (we will have a <path> and a <text> element associated with each slice)
    .append("svg:g")                
      //allow us to style things in the slices (like text)
      .attr("class", "slice");   

arcs.append("svg:path")
  //set the color for each slice to be chosen from the color function defined above
  // again note the arrow
  .attr("fill", (d, i) => color(i))
  //this creates the actual SVG path using the associated data (pie) with the arc drawing function
  .attr("d", arc);                                    

//add a label to each slice
arcs.append("svg:text")                                     
  //set the label's origin to the center of the arc
  .attr("transform", function(d) {                    
      //we have to make sure to set these before calling arc.centroid
      d.innerRadius = 0;
      d.outerRadius = r;
      //this gives us a pair of coordinates like [50, 50]
      return `translate(${arc.centroid(d)})`;        
  })
  //center the text on it's origin
  .attr("text-anchor", "middle")                          
  //get the label from our original data array
  .text((d, i) => data[i].label; });        
```
(Modified from original Source: http://bl.ocks.org/enjalot/1203641)

## Exercises

1. Separate the anscombsQuartet data into four groups (one per series). The resulting data should look like

```js
[[
  {id: 0, dataset: 'I', x: 10.0, y: 8.04},
  {id: 1, dataset: 'I', x: 8.0, y: 6.95},
  {id: 2, dataset: 'I', x: 13.0, y: 7.58},
  {id: 3, dataset: 'I', x: 9.0, y: 8.81},
  {id: 4, dataset: 'I', x: 11.0, y: 8.33},
  {id: 5, dataset: 'I', x: 14.0, y: 9.96},
  {id: 6, dataset: 'I', x: 6.0, y: 7.24},
  {id: 7, dataset: 'I', x: 4.0, y: 4.26},
  {id: 8, dataset: 'I', x: 12.0, y: 10.84},
  {id: 9, dataset: 'I', x: 7.0, y: 4.82},
], [  
  {id: 10, dataset: 'I', x: 5.0, y: 5.68},
  {id: 11, dataset: 'II', x: 10.0, y: 9.14},
  {id: 12, dataset: 'II', x: 8.0, y: 8.14},
  {id: 13, dataset: 'II', x: 13.0, y: 8.74},
  {id: 14, dataset: 'II', x: 9.0, y: 8.77},
  {id: 15, dataset: 'II', x: 11.0, y: 9.26},
  {id: 16, dataset: 'II', x: 14.0, y: 8.1},
  {id: 17, dataset: 'II', x: 6.0, y: 6.13},
  {id: 18, dataset: 'II', x: 4.0, y: 3.1},
  {id: 19, dataset: 'II', x: 12.0, y: 9.13},
  {id: 20, dataset: 'II', x: 7.0, y: 7.26},
  {id: 21, dataset: 'II', x: 5.0, y: 4.74},
], [  
  {id: 22, dataset: 'III', x: 10.0, y: 7.46},
  {id: 23, dataset: 'III', x: 8.0, y: 6.77},
  {id: 24, dataset: 'III', x: 13.0, y: 12.74},
  {id: 25, dataset: 'III', x: 9.0, y: 7.11},
  {id: 26, dataset: 'III', x: 11.0, y: 7.81},
  {id: 27, dataset: 'III', x: 14.0, y: 8.84},
  {id: 28, dataset: 'III', x: 6.0, y: 6.08},
  {id: 29, dataset: 'III', x: 4.0, y: 5.39},
  {id: 30, dataset: 'III', x: 12.0, y: 8.15},
  {id: 31, dataset: 'III', x: 7.0, y: 6.42},
  {id: 32, dataset: 'III', x: 5.0, y: 5.73},
], [  
  {id: 33, dataset: 'IV', x: 8.0, y: 6.58},
  {id: 34, dataset: 'IV', x: 8.0, y: 5.76},
  {id: 35, dataset: 'IV', x: 8.0, y: 7.71},
  {id: 36, dataset: 'IV', x: 8.0, y: 8.84},
  {id: 37, dataset: 'IV', x: 8.0, y: 8.47},
  {id: 38, dataset: 'IV', x: 8.0, y: 7.04},
  {id: 39, dataset: 'IV', x: 8.0, y: 5.25},
  {id: 40, dataset: 'IV', x: 19.0, y: 12.5},
  {id: 41, dataset: 'IV', x: 8.0, y: 5.56},
  {id: 42, dataset: 'IV', x: 8.0, y: 7.91},
  {id: 43, dataset: 'IV', x: 8.0, y: 6.89}
]];
```

There are lots of ways of doing this (such as copy and paste as I did above), however I want to encourage you to use a functional idiom like reduce. In the index.js file i've written the start of a reduce, see if you can figure out what to do from there!

2. Make one chart with all four series on it. Follow the prompts in index.js

3. Make four charts one per series. (this one can be hard!) Also follow the prompts there.
