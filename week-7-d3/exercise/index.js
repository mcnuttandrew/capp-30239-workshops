/* global d3 */

// this says that you want to wait until the page is loaded before you start to do stuff
document.addEventListener('DOMContentLoaded', () => {
  myVis();
});

const myVis = () => {
  // const rectHeight = 490;
  // const rectWidth = 350;
  // const containerSize = 625;
  //
  // // part 2 code
  // const container = document.querySelector('.container');
  // container.setAttribute('width', containerSize);
  // container.setAttribute('height', containerSize);
  //
  // const grayRect = document.querySelector('.gray-rect');
  // grayRect.setAttribute('width', containerSize);
  // grayRect.setAttribute('height', containerSize);
  // grayRect.setAttribute('fill', '#E0DFCB');
  //
  // const blueRect = document.querySelector('.blue-rect');
  // blueRect.setAttribute('width', rectWidth);
  // blueRect.setAttribute('height', rectHeight);
  // blueRect.setAttribute('fill', '#31AED4');
  // const blueRectContainer = document.querySelector('.blue-rect-container');
  // blueRectContainer.setAttribute('transform', 'translate(0, 115) rotate(-15)');
  //
  // const orangeRect = document.querySelector('.orange-rect');
  // orangeRect.setAttribute('width', rectWidth);
  // orangeRect.setAttribute('height', rectHeight);
  // orangeRect.setAttribute('fill', '#FFC186');
  // orangeRect.setAttribute('opacity', 0.7);
  // const orangeRectContainer = document.querySelector('.orange-rect-container');
  // orangeRectContainer.setAttribute('transform', 'translate(265, 50) rotate(7.3)');
  //
  // const corners = [
  //   {x: 0, y: 0},
  //   {x: 0, y: rectHeight},
  //   {x: rectWidth, y: rectHeight},
  //   {x: rectWidth, y: 0}
  // ];
  // // loops!
  // let i = 0;
  // corners.forEach(({x, y}, j) => {
  //   i = j
  //   [blueRectContainer, orangeRectContainer].forEach(rectContainer => {
  //     const newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  //     rectContainer.appendChild(newCircle);
  //     newCircle.setAttribute('cx', x);
  //     newCircle.setAttribute('cy', y);
  //     newCircle.setAttribute('r', 10);
  //     newCircle.setAttribute('fill', '#EA1111');
  //   });
  // });

  const rectHeight = 490;
  const rectWidth = 350;
  const corners = [
    {x: 0, y: 0},
    {x: 0, y: rectHeight},
    {x: rectWidth, y: rectHeight},
    {x: rectWidth, y: 0}
  ];
  const containerSize = 625;
  const svg = d3.select('.container')
    .attr('width', containerSize)
    .attr('height', containerSize)
    .style('background-color', '#E0DFCB');

  // JOIN
  const rects = svg.selectAll('.rect-container').data([
    {color: '#FFC186', transform: 'translate(265, 50) rotate(7.3)'},
    {color: '#31AED4', transform: 'translate(0, 115) rotate(-15)'}
  ])
  // ENTER
  const containers = rects.enter()
    .append('g')
      .attr('transform', (x, idx) => x.transform)
      .attr('class', 'rect-container');
  containers.append('rect')
    .attr('height', rectHeight)
    .attr('width', rectWidth)
    .attr('fill', d => d.color)
    .attr('opacity', 0.7);
  //
  // containers.data(d => corners)
  //   .enter()
  //   .append('circle')
};
