const domReady = require('domready');
// These imports should be sufficent to complete the lab
import {select} from 'd3-selection';
import {scaleOrdinal, scaleTime, scaleLinear} from 'd3-scale';
import {timeFormat} from 'd3-time-format';
import {line} from 'd3-shape';
import {axisBottom, axisRight} from 'd3-axis';
import {annotation, annotationCalloutCircle} from 'd3-svg-annotation';

// NO NEED TO EDIT THIS FUNCTION
domReady(() => {
  // this is the javascript fetch API, it uses a structure called a promise
  // to asyncronously make AJAX requests. Here we are using it acquire some data
  // that is being served by the gulp servelet.
  fetch('./data/stock-data.json')
    .then(response => response.json())
    .then(data => stockVis(data));
});

// This function addresses the often fidly problem of date manipulation
// minVal and maxVal are in epoch time, while min and max are the regular domain
// as strings. You should use min and max for the domain.
function getTimeDomain(data) {
  return data.reduce((acc, row) => {
    const epochTime = (new Date(row.date)).getTime();
    return {
      minVal: Math.min(epochTime, acc.minVal),
      maxVal: Math.max(epochTime, acc.maxVal),
      min: epochTime < acc.minVal ? row.date : acc.min,
      max: epochTime > acc.maxVal ? row.date : acc.max
    };
  }, {minVal: Infinity, maxVal: -Infinity, min: null, max: null});
}

function stockVis(data) {
  // first break apart the data into one series for each of the companies
  const height = 800;
  const width = 1000;
  const margin = {top: 10, left: 10, right: 10, bottom: 10};
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  // YOUR CODE FOR MANIUPLATING THE DATA AND DRAWING THE LINES HERE

  // buildLegend(svg, color, Object.keys(groups), plotHeight, plotWidth);
  // buildAnnotations(svg, x, y, plotHeight);
}

function buildLegend(svg, color, groupNames, plotHeight, plotWidth) {
  const g = svg.append('g').attr('transform', `translate(${plotWidth * 0.9}, ${plotHeight * 0.8})`);
  g.selectAll('rect').data(groupNames)
    .enter().append('rect')
    .attr('x', 0)
    .attr('y', (d, i) => i * 40)
    .attr('width', 20)
    .attr('height', 20)
    .attr('fill', d => color(d));

  g.selectAll('text').data(groupNames)
    .enter().append('text')
    .attr('x', 30)
    .attr('y', (d, i) => i * 40 + 15)
    .text(d => d);
}

function buildAnnotations(svg, x, y, plotHeight) {
  // PLACE YOUR ANNOTATIONS AND AXIS CODE HERE!!!
}
