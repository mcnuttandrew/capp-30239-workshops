# Modern JS Scaffold

In this folder I've provided an example project that enables you to use really modern javascript tooling with as little effort as possible. This scaffold includes

- a dev server that combines javascript modules and presents them to the browser. This comes with autoreload for free! It's great.
- It also includes linters and autoformaters so you'll be able to check if your writing well styled javascript code. I have some pretty strong linting in here. You can disable them if you want, but I will judge you.



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

Step 1: Do all of your work in src. There is no step 2.

Production:

There are currently two easy ways to deploy this scaffold onto the internet.  

### Netlify

Netlify is an excellent company that tries to make the dev process as easy as possible. The way you deploy this scaffold there is get an account, start a new project, point it to the relevant github folder (that contains just this scaffold!), set the build command to be 'yarn build' and that's it.


### GH Pages

gh-pages is a wonderful resource for doing web-development, and allows you to have classy YOU_PERSONAL_DOMAIN/projectname type links. You can deploy this scaffold there by running 'yarn build' in your command line, commiting the modified file, and push to github. If you've configured your projects settings correct it should all just work out.