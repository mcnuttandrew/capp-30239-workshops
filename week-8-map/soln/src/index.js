const domReady = require('domready');

import {geoPath, geoAlbersUsa} from 'd3-geo';
import {select} from 'd3-selection';
import {interpolateInferno} from 'd3-scale-chromatic';
import {scaleLinear} from 'd3-scale';

domReady(() => {
  // this is just one example of how to import data. there are lots of ways to do it!
  // fetch('./data/example.json')
  //   .then(response => response.json())
  //   .then(data => myVis(data));
  // in this example we need to import a bunch of things at once (well two)
  // our map data and our state data
  Promise.all([
    'https://raw.githubusercontent.com/ResidentMario/geoplot-data/master/contiguous-usa.geojson',
    './data/state-pops.json'
  ].map(url => fetch(url).then(data => data.json())))
    .then(data => myVis(data));
});

function computeDomain(data, key) {
  return data.reduce((acc, row) => {
    return {
      min: Math.min(acc.min, row[key]),
      max: Math.max(acc.max, row[key])
    };
  }, {min: Infinity, max: -Infinity});
}

function myVis(data) {
  // this is an es6ism called a destructuring, it allows you to save and name argument
  // you tend to see it for stuff in object, (as opposed to arrays), but this is cool too
  const [stateShapes, statePops] = data;
  const width = 1000;
  const height = 800;
  const margin = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10
  };
  // we're going to be coloring our cells based on their population so we should compute the
  // population domain
  const popDomain = computeDomain(statePops, 'pop');
  // the data that we will be iterating over will be the geojson array of states, so we want to be
  // able to access the populations of all of the states. to do so we flip it to a object representation
  const stateNameToPop = statePops.reduce((acc, row) => {
    acc[row.state] = row.pop;
    return acc;
  }, {});
  const popScale = scaleLinear().domain([0, popDomain.max]).range([0, 1]);
  const colorScale = d => interpolateInferno(Math.sqrt(popScale(d)));
  // next we set up our projection stuff
  const projection = geoAlbersUsa();
  const geoGenerator = geoPath(projection);
  // then our container as usual
  const svg = select('.vis-container')
    .attr('width', width)
    .attr('height', height)
    .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  // finally we construct our rendered states
  svg.selectAll('.state')
    .data(stateShapes.features)
    .enter()
    .append('path')
      .attr('class', 'state')
      .attr('stroke', 'black')
      .attr('fill', d => colorScale(stateNameToPop[d.properties.State]))
      .attr('d', d => geoGenerator(d));

}
