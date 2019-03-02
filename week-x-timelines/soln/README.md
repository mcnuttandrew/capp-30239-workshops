# Workshop X - Line/Time Chart

In this workshop you will create a simple time series chart using real stock data. In doing so you will see one technique for ingesting data stored outside of javascript, in this case a json file, as well as the use of our first non Bostock authored d3 libraries.


## Setup

As always, have npm/node/yarn installed.

```sh
npm install
# then
npm run start

# or if yarn
yarn
# then
yarn start
```


In this assignment we have increased the complexity of the build pipeline in order to enable a few cool features.

- You are now able to use a special langauge called SCSS, which is a strict superset of css syntax, which allows nesting of selectors, variables, math, and many other great wonders.
- You can now use es6 modules. This syntax is quite powerful and enables the logical breaking up of files. imports look like

```js
// importing external packages
import {functionFromModule} from 'target-module';
// importing from files you've written
import {myFunction} from './my-module';
// if you want import a whole module (which is frowned upon), you could do
import * from 'd3'
```

Finally, the default configuration of this project no longer comes with an entire build of d3. In modern js we break things into atomic packages in order to only install what we need. d3 is no exception to this rule, and provides smaller packages that contain relevant functionality (look here for the complete list https://github.com/d3/d3/blob/master/API.md). If you wish to install additional functions from the small set we have provided initially, you are free to. Say you were trying to install d3-array, this could be done via

```sh
npm install --save d3-array
# or
yarn add d3-array
```

This principle of only bringing in what you need goes back to an old programmers acronym: YAGNI. YA AINT GONNA NEED IT. Only install stuff as required.

That all said, we've installed all of the packages that should be necessary to complete the workshop.


## The Files

You should start this assignment by exploring the new file structure.
- In the app folder you'll find the stuff that will actually be severed to the browser. You shouldn't need to edit anything inside of this folder.
- There is a new file called gulpfile.js. This includes all of the mechanisms for building your project. It is interesting to read, but YOU SHOULD NOT EDIT IT.
- There is a folder called src/, this is where you will do your work in this configuration. Specifically you will be doing your work inside of index.js.

As described in the intro we will be building a time series chart for some stock data. Here is a small snippet of the data


```JSON
[
  {"volume": "9197133", "Name": "DAL", "high": "14.88", "low": "14.52", "date": "2013-02-08", "close": "14.62", "open": "14.77"},
  {"volume": "7583776", "Name": "DAL", "high": "14.9", "low": "14.61", "date": "2013-02-11", "close": "14.69", "open": "14.66"},
  {"volume": "7146775", "Name": "DAL", "high": "14.79", "low": "14.46", "date": "2013-02-12", "close": "14.5", "open": "14.64"},
  {"volume": "7230362", "Name": "DAL", "high": "14.8", "low": "14.5", "date": "2013-02-13", "close": "14.78", "open": "14.57"},
  {"volume": "17917839", "Name": "DAL", "high": "14.68", "low": "14.02", "date": "2013-02-14", "close": "14.24", "open": "14.6"},
  {"volume": "14249465", "Name": "DAL", "high": "14.56", "low": "14.31", "date": "2013-02-15", "close": "14.45", "open": "14.37"},
  {"volume": "12246285", "Name": "DAL", "high": "14.62", "low": "14.2", "date": "2013-02-19", "close": "14.3", "open": "14.4"},
  {"volume": "13826728", "Name": "DAL", "high": "14.32", "low": "13.78", "date": "2013-02-20", "close": "13.82", "open": "14.29"}
]
```

The important keys of this dataset for the work will be Name, high, and date. It is also important to note that everything is stored as a string!

This data describes about four years of stock data for two companies: Delta and United. It is fascinating to look at the inter-related corporate fates of these two companies and how various PR incidents harm their reputations.

## The Lines

The first thing to do will be construct scales for laying out the data. You should have three, a scaleTime called x, a scaleLinear called y, and a scaleOrdinal called color. We have provided you with a function called getTimeDomain that will be useful for constructing the domain of the x scale, however it is up to you to compute the domain of y from the data. You should note that the all of the values are stored as strings in the data, so you will have to convert it a number in order to find the correct domain. Javascript type casts are done like so

```javascript
const newNumber = Number("568.0")
```

We found it useful to define another function called getYDomain to help with this work. Finally, let's talk about color. While it may be tempting to simply read the values of 'Name' from the data, you should do so programmatically. It will help to re-use your groupBy function from HW3 here. By grouping on 'Name' you will be able separate all of the rows of data into their appropriate data series (necessary for later steps), but you will also be able to infer the values to feed to your color scaleOrdinal by reading the keys of the grouping object. You should pick whatever colors you feel are appropriate for the color range, we use some colors from the chromachron, but the choice is yours.


Once you have scales, you should prepare your data for rendering. We will be rendering a line chart consisting of two lines. A suitable structuring of data would an array of objects, one for each line/company:

```js
const mappedData = [{companyName: 'EXAMPLE_NAME', data: [ROWS_OF_ORIGINAL_DATA]}]
```
You should use your group by to organize the data into an object, then loop across the keys using Object.keys(OBJECT_NAME) using a map to change the data into the desired format.

When rendering a line that does more than go from point a to point b you should use an svg path element. Path elements have important properties stroke, stroke-width, and d. d takes a specialized language for describing the path that the element follows (you can read about it here https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d). However, you should not get yourself tangled up by trying to write in this language directly. Instead, you should use the line function offered by the d3-shape package (https://github.com/d3/d3-shape). This function works quite similarly to a scale, you configure and save it to a variable, say lineEval, then feed lineEval a collection of data which will be returned in the path language. You should then set this as the d attribute on your lines. This will look something like

```js
const lineEval = line()
  .x(d => METHOD_OF_ACCESS_DATE_FROM_OBJECT)
  .y(d => METHOD_OF_ACCESSING_NUMERIC_HIGH_FROM_OBJECT);

....

D3_SELCTION_STUFF
    .attr('d', lineEval)
```

In order to accurately make use of the time scales you should use the javascript DateTime type. You can make a new date object like so

```js
const myNewData = new Date('04-10-18');
```

This method of "type casting" will be useful for the above line function.


## The Legend

In order to understand what we did in the previous part we should have a legend. Placing and styling legends can be pretty fiddly, so we have given you an example of a legend in the code. In order to run it, you simply must uncomment buildLegend and set the arguments to match the names of your variables in your code. You should make sure to read and understand our code.


## The annotations

Finally we want to give our data some context. The first step in doing so will be to add axes. This is done, just as in lecture, by appending a g to the svg and calling an axisMethod against it. But that's the easy part! In order to make this visualization really pop we'll be adding textual annotations into our graphic using Susie Lu's http://d3-annotation.susielu.com/ . Take a quick read through the documentation! It's good reading.

Once you've read up, you should start by defining a timeFormatter, which will be useful in a moment. This is an example of d3's super useful d3-time-format library which allows for the programatic expression of time.
```js
const timeFormatter = timeFormat('%Y-%m-%d');
```


Next we'll make an annotation function, which is how our annotations will be placed on the page. The one we'll be using is quite similar to the one from the docs:

```js
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

```

Now the above function references a variable called annotations, which we will provide for you here:

```js
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
```

(You should feel free to add some more!) To get these on the page you should use the same technique you used to insert axes. You should try out adding some other types of annotations. Try adding badges (read the docs!) to stock prices on every holiday you can think of.
