/* global d3 */

const anscombsQuartet = [
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
];

function getDomain(accesor) {
  return anscombsQuartet.reduce((acc, row) => {
    return {
      min: Math.min(acc.min, row[accesor]),
      max: Math.max(acc.max, row[accesor])
    };
  }, {min: Infinity, max: -Infinity});
}
const xDomain = getDomain('x');
const yDomain = getDomain('y');


// EXERCISE 1
const quartetMap = anscombsQuartet.reduce(function reducer(acc, row) {
  if (!acc[row.dataset]) {
    acc[row.dataset] = [];
  }
  acc[row.dataset].push(row);
  return acc;
}, {});

const seperatedQuartetData = Object.values(quartetMap);


document.addEventListener('DOMContentLoaded', () => {
  // basic plot configurations, we'll use these
  const height = 600;
  const width = 600;
  const margin = {top: 50, left: 50, right: 50, bottom: 50};

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.bottom - margin.top;
  const colorRange = ['#12939A', '#79C7E3', '#1A3177', '#FF9833'];

  // EXERCISE 2 PART 1
  // create 3 scales, one mapping x, one mapping y, and one mapping color
  // the color should be an ordinal scale that maps the dataset value (see above)
  // to the color range
  const x = d3.scaleLinear().domain([xDomain.min, xDomain.max])
    .range([margin.left, plotWidth]);
  const y = d3.scaleLinear().domain([yDomain.min, yDomain.max])
    .range([plotHeight, margin.top]);
  const color = d3.scaleOrdinal().domain(['I', 'II', 'III', 'IV'])
    .range(colorRange);


  // EXERCISE 2 PART 2
  // CREATE A VARIABLE CALLED SVG THAT SELECTS .first ADDS AN SVG TO IT, AND
  // SETS HEIGHT AND WIDTH APPROPRIATELY
  const svg = d3.select('.first').append('svg')
    .attr('width', width).attr('height', height);

  // EXERCISE 2 PART 3
  // USE A SELECTALL AND DATA TO CREATE A JOIN CALLED CRICLES
  // USE ENTER ON THAT, AND APPLY EACH OF THE PROPERTIES AS APPROPRIATE
  // (r, cx, cy, fill, class)

  // JOIN
  const circles = svg.selectAll('.dot').data(anscombsQuartet);
  // ENTER
  circles.enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('r', 5)
    .attr('cx', d => x(d.x))
    .attr('cy', d => y(d.y))
    .attr('fill', d => color(d.dataset));

  // I've included these for you because it's a drag to remember them
  svg.append('g').call(d3.axisBottom(x));
  svg.append('g').call(d3.axisRight(y));

  // UPDATE + EXIT methods are also available, however they are not of concern for the moment.


  // EXERCISE 3 PART 1
  // CREATE ANOTHER SVG THAT LIVES IN .second THATS DOUBLE THE HEIGHT AND WIDTH
  const secondSVG = d3.select('.second').append('svg')
    .attr('width', width * 2)
    .attr('height', height * 2);

  // EX 3 PART 2
  // RUN A SELECTALL AGAINST gs IN THIS SVG AND USE YOUR EX 1 DATA
  // ENTER AND APPEND gS, APPLY TRANSFORMS AND CALL AXES AS APPRPRITPATE
  const gs = secondSVG.selectAll('g').data(seperatedQuartetData)
    .enter().append('g')
      .attr('transform', (d, idx) => {
        return `translate(${idx % 2 * plotWidth}, ${Math.floor(idx / 2) * plotHeight})`;
      })
      .append('g').call(d3.axisBottom(x))
      .append('g').call(d3.axisRight(y));

  // EX 3 PART 3
  // DO A SELECT ALL (FOR THE CLASS OF THE CIRCLE TO BE ADDED)
  // AGAINST YOUR gS FROM THE PREVIOUS STEP.
  // (the data will be an arrow function, but what arrow?)
  // enter and append scatterplot dots as normal
  gs.selectAll('.dot').data(d => {
    console.log(d)
    return d;
  })
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('r', 5)
    .attr('cx', d => x(d.x))
    .attr('cy', d => y(d.y))
    .attr('fill', d => color(d.dataset));

});
