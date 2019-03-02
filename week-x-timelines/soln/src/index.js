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

function groupBy(data, accesor) {
  return data.reduce((acc, row) => {
    if (!acc[row[accesor]]) {
      acc[row[accesor]] = [];
    }
    acc[row[accesor]].push(row);
    return acc;
  }, {});
}

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

function getYDomain(data, accessor) {
  return data.reduce((acc, row) => {
    const val = Number(row[accessor]);
    return {
      min: Math.min(val, acc.min),
      max: Math.max(val, acc.max)
    };
  }, {min: Infinity, max: -Infinity});
}

function stockVis(data) {
  // first break apart the data into one series for each of the companies
  const height = 800;
  const width = 1000;
  const margin = {top: 10, left: 10, right: 10, bottom: 10};
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const groups = groupBy(data, 'Name');
  const mappedData = Object.keys(groups).map(key => ({key, data: groups[key]}));
  const timeDomain = getTimeDomain(data);
  const yDomain = getYDomain(data, 'high');
  const x = scaleTime()
    .domain([new Date(timeDomain.min), new Date(timeDomain.max)])
    .range([margin.left, plotWidth]);

  const y = scaleLinear()
    .domain([yDomain.min, yDomain.max])
    .range([plotHeight, margin.top]);

  const color = scaleOrdinal().domain(Object.keys(groups))
    .range(['#F87C1D', '#D7212C']);

  const lineEval = line().x(d => x(new Date(d.date))).y(d => y(Number(d.high)));
  const svg = select('#thevis').attr('width', width).attr('height', height);
  svg.selectAll('line').data(mappedData)
    .enter().append('path')
    .attr('d', d => lineEval(d.data))
    .attr('stroke', d => color(d.key))
    .attr('fill', 'none')
    .attr('stroke-width', 2);

  buildLegend(svg, color, Object.keys(groups), plotHeight, plotWidth);
  buildAnnotations(svg, x, y, plotHeight);
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
  svg.append('g').call(axisBottom(x)).attr('transform', `translate(0, ${plotHeight})`);
  svg.append('g').call(axisRight(y));

  const annotations = [{
    note: {
      label: 'O\'Hare police forcibly remove a passenger from a United Flight',
      title: 'Incident!'
    },
    // can use x, y directly instead of data
    data: {
      date: '2017-04-07',
      high: 67
    },
    dy: -20,
    dx: -100,
    subject: {
      radius: 20,
      radiusPadding: 0
    }
  }, {
    note: {
      label: 'The 2014 holiday was pretty spectacular for both companies',
      title: 'Holidays'
    },
    // can use x, y directly instead of data
    data: {
      date: '2014-11-1',
      high: 46
    },
    dy: -200,
    dx: -100,
    subject: {
      radius: 100,
      radiusPadding: 0
    }
  }];

  const timeFormatter = timeFormat('%Y-%m-%d');

  const makeAnnotations = annotation()
    .editMode(false)
    .type(annotationCalloutCircle)
    // accessors & accessorsInverse not needed
    // if using x, y in annotations JSON
    .accessors({
      x: d => x(new Date(d.date)),
      y: d => y(Number(d.high))
    })
    .accessorsInverse({
      date: d => timeFormatter(x.invert(d.x)),
      high: d => y.invert(d.y)
    })
    .annotations(annotations);

  svg.append('g')
    .attr('class', 'annotation-group')
    .call(makeAnnotations);
}
