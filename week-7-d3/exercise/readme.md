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

The scaffold that I we're using here doesn't use very good engineering. It imports d3 via the browser, rather during a single installation step. This precludes using fancy tooling like super modern javascript, and an easy to understand import syntax but you'll get to all that later. For now if you want something from d3 call it from d3.FUNCTIONNAME. (If you want to use a well formed scaffold check out the example-folder next door!)

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

The literally best way to learn this is by reading this article https://bost.ocks.org/mike/join/ It's written by the guy who made d3. It's great. Now try exploring this life cycle explorer:  https://bl.ocks.org/cmgiven/32d4c53f19aea6e528faf10bfe4f3da9


Once you've read that, read this annotated pie chart code

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

For more annotated d3 scripting check out this guy: https://github.com/alexcengler/d3-intro-heatmap/blob/master/script.js

## Exercises MAKE A BAR CHART

We're going to be a bar chart describing the number of types of car made different regions of manufacter.  I've provided you some data and a little scaffold in the index.js folder. Make sure you've run npm run start, and pointed your browser to localhost:8080!

0. Convert the data into a usable format.

1. Make the bars.

2. Make axes, labels, and a title.

There are more instructions in the index.js!

BONUS

X. Convert your solution into a histrogram for one of the other data dimensions! Read up on the d3-array package for more.

Y. Download your graphic as an svg, follow the instructions here https://nytimes.github.io/svg-crowbar/ (make sure you use crowbar 2)
