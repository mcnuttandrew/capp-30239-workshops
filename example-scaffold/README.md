# Modern JS Scaffold

In this folder I've provided an example project that enables you to use really modern javascript tooling with as little effort as possible. This scaffold includes

- a dev server that combines javascript modules and presents them to the browser. This comes with autoreload for free! It's great.
- a cool super set of css called sass. If you don't want to learn to use sass, you don't have to. You can just write css as you normally would. (just make sure you still only write it in src/.scss)
- It also includes linters so you'll be able to check if your writing well styled javascript code. I have some pretty strong linting in here. You can disable them if you want, but I will judge you.



## Setup

As always, have npm/node/yarn installed.

```sh
npm install
# then
npm run start

# or if yarn-ing
yarn
# then
yarn start
```


You will still need to be explicit about your imports, eg
```js
import {functionFromModule} from 'target-module';
```

In this scaffold I have not installed any d3 packages. Some helpful ones (read the ones I usually end up using) are d3-selection, d3-scale, and d3-shape. To add one of these packages just do

```sh
npm install --save PACKAGENAME

# or if yarning
yarn add PACKAGENAME
```


## Usage

Development:

Step 1: Do all of your work in src. There is no step 2. (Don't change .css)

Production:

When you are done run `yarn build`, which will spit out a bundle.js containing all of the javascript necessary to run your page. You can then mount the contents of the app folder wherever you want (gh-pages for instance) and it'll work good. 
