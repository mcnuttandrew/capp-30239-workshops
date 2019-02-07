/* global d3 */

// this says that you want to wait until the page is loaded before you start to do stuff
document.addEventListener('DOMContentLoaded', () => {
  // this uses a structure called a promise to asyncronously get the cars data set
  fetch('./cars.json')
    // this converts the returned readablestream into json, don't worry about it
    .then(data => data.json())
    // now that the data is actually understood as json we send it to your function
    .then(data => myVis(data))
});



function myVis(data) {
  console.log('hi!')
  // basic plot configurations, we'll use these
  const height = 600;
  const width = 600;
  const margin = {top: 50, left: 50, right: 50, bottom: 50};

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.bottom - margin.top;
  const colorRange = ['#12939A', '#79C7E3', '#1A3177', '#FF9833'];

  // EXERCISE 0 - CONVERT DATA INTO A USEABLE REPRESENTATION
  // we are going to be making a categorical bar chart with counts for each of the countries
  // so you need to iterate through the data (which you can look at it in the cars.json file)
  // and convert it into a representation like {'USA': 10, 'Europe': 20, etc}
  // then convert that (perhaps using Object.entries and a map) to a format like
  // [{country: 'USA', count: 10}, etc]


  // EXERCISE 1
  // create 3 scales, one mapping x, one mapping y, and one mapping color
  // (color should be an ordinal scale and x should be a band scale)
  // how do you figure out the yDomain ?
  // const x = ;
  // const y = ;
  // const color = ;


  // CREATE A VARIABLE CALLED SVG THAT SELECTS .first ADDS AN SVG TO IT, AND
  // SETS HEIGHT AND WIDTH APPROPRIATELY
  // const svg =

  // USE A SELECTALL AND DATA TO CREATE A JOIN CALLED rects
  // USE ENTER ON THAT, AND APPLY EACH OF THE PROPERTIES AS APPROPRIATE
  // (x, y, height, width, class, fill)

  // JOIN
  // const rects =
  // ENTER
  // rects.enter()


  // PART 2
  // Add Axes
  // I'll give you this one, but you need to figure out the other one!
  // svg.append('g').call(d3.axisRight(y));

  // Next Add labels to each of the bars
  // this should be really similar to adding rects, but using text instead
  // note: text is a function like attr on text nodes
  // there are lots of svg text properties you can use to style your labels
  // try some out!

  // Add A Title
  // (how can use the pattern we saw with labels to do this, perhaps make some artificial data)


}
