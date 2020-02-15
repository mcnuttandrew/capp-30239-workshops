// if the data you are going to import is small, then you can import it using es6 import
// import MY_DATA from './app/data/example.json'
// (I tend to think it's best to use screaming snake case for imported json)
const domReady = require('domready');

domReady(() => {
  // this is just one example of how to import data. there are lots of ways to do it!
  fetch('./data/example.json')
    .then(response => response.json())
    .then(data => myVis(data))
    .catch(e => {
      console.log(e);
    });
});

function myVis(data) {
  // portrait
  const width = 5000;
  const height = (36 / 24) * width;
  console.log(data, height);
  console.log('Hi!');
  // EXAMPLE FIRST FUNCTION
}
