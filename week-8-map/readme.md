# Data Fetching And Maps

This week we will be briefly looking at an example of how to use the modern es6 scaffold, provided to you in another part of this repo, as well as some good practices for fetching data. We will use these skills to map a little map, it'll be a great time!


### Setup


Now we're going to need to add a few d3 libraries in order to get our map going. I think we're going to need d3-scale, d3-scale-chromatic, d3-geo, and d3-selection. We can install them with:

```sh
npm install --save d3-scale d3-scale-chromatic d3-geo d3-selection
```

This downloads and installs these dependencies to the node_modules folder and records which versions we are using in the package.json. This means that someone else could download our code, run npm install, and have everything work just in the way that we expect. If you want to uninstall one of them later, you can! Just remove it from your package.json and run npm install.


### Getting Data

The first thing we need to do is actually get the data. The map we will be drawing is a choropleth of population of the united states. I've made a little json file describing the pops of the states, based on wikipedia data. It's in app/data, go check it out! In addition, we will be needing shapes to render the map with, in this case states. After a little googling I found this repo

https://raw.githubusercontent.com/ResidentMario/geoplot-data/master/contiguous-usa.geojson

Which contains some well formatted geojson (which is better in every conceivable way than shapefiles, most importantly it's easier to work with in js). We don't want our chart to start rendering until after we've loaded the whole dataset, so we're going to use two promise structures. Promises are a special structure which allow you to sequence events that are asyncronous, such as requesting some data over the internet.

Their basic for is like this:

```js
new Promise((resolve, reject) => {
  // DO ACTION
  // Once action is done, call the resolve() function
  // if the action fails call the reject() function
})
.then(results => {
  // this gets called after the resolve function is called
  // the variable here called results, is whatever you put into the arguments of resolve
})
.catch(err => {
  // if either reject is called or if there is error then this function gets called
})
```

You can write promises explicitly like this if you want, but they don't come up that often. What you will likely mostly see is predefined promises. For instance the browser now comes with a function `fetch`, which takes up to two arguments like

```js
fetch(URL, {OPTIONS})
  .then(d => d.json())
```

Just like our first promise fetch is also a promise and we can use .then to sequence our subsequent actions. If the url points to a json address then we get back a ReadableStream and we need to convert it to a json blob, which we do with the d.json function.

IMPORTANT POINT you can only access the contents of your promises from inside of the promise chain, eg inside of the .then squence. You must write functions to direct the flow of data. It is essential.

The next structure we will use is a special one that allows us to wait for a group fo promises to finish, called Promise.all. It takes an array of promises as an argument and has usage like this:

```js
Promise.all([
  fetch('https://www.google.com/'),
  new Promise((resolve, reject) => {
    resolve('all done!');
  })
]).then(results => {
  console.log(results)
  // results is an array of length 2 containing the results of each of the returned promises.
})
```

EXERCISE: this brings us to your first task, try writing a promise.all structure that fetches both of the urls mentioned above. Write all of your code inside of the index.js file


### Using d3-scale-chromatic

The next thing that we will be doing is setting up scales to draw our map with. We'll be using one generator (which i've given you) and a color scale. Scale chromatic color scales offer a wide range of different color systems to choose from, but can be a little unintuitive. They take a single argument between 0 and 1 and return a hex color.

That's great but what if we want to set a domain based on data, well here's the trick.

1. Make a new scale using scaleLinear, it should have domain equal to the domain you are interested in (such as the popDomain I defined for you) and a range [0, 1]. In order to use scaleLinear you will have to import it. You can do this by writing at the top of the file

```js
import {scaleLinear} from 'd3-scale';
```

 2. Write a new function called color scale that take a single argument, just like a regular scale. Pass that argument to your scaleLinear scale, and then pass the results of that to interpolateInferno (which you need to import d3-scale-chromatic).

Go do that!!


### Drawing the map

Finally the meat of the work. In the code i've given you the appropriate generator:

```js
const projection = geoAlbersUsa();
const geoGenerator = geoPath(projection);
```
The first line constructs a map projection, specifically one that is designed to show the USA in a nice way, while the second line constructors a path generator. We saw path generators last time, you give them some data and they give you a path. This path generator takes in geoJSON features and returns svg path code.

Here's the steps for drawing the map:
1. Construct an svg container by selecting the one that's already on the page from the html, give it appropriate width and height, append a g that's been translated by the top and left margin in order to ensure padding.
2. selectAll against that svg container, and form a join using stateShapes.features as your features.
3. enter and append paths, setting the stroke to black, the fill as appropriate using our color scale from before, and our d using the geo generator.

And that's it! You should have a nice map now!
