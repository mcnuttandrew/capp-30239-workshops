# Data Visualization - Week 6
## ~ ~ ~ Web Stuff ~ ~ ~


In this brief workshop we will get acquainted with some of the basic tools you'll need to use in order to be an effective visualizationist on the internet. We're going to start by getting familiar with some basic html and css, specifically with the goal of building layouts with flex box. Learning this approach to layouts will hopefully enable you to confidently put anything you want on a web page. Let's get going!

## Basic Elements

The basic components for any web thing are html, css, and javascript. HTML provides a basic structure (like bones), CSS provides a good appearance (like skin and clothing), javascript provides responsiveness (like a brain and flexible muscles). Many pages don't need brains, they just need to show images and text. With that in mind let's chat about the first two of these types.

### HTML

HTML, which stands for hyper text markup language, flows in nested tree like structure. The basic element of html is called a tag, it takes a series of arguments, called attributes, and can sometimes contain children. Here's an example

```html
<div class="my-cool-class hella-padding">
  <ul class="well-styled-list">
    <li> Item one </li>
    <li> Item two </li>
    <li> Item three </li>
  </ul>
</div>
```

Observe how we open a tag like <div> and close a tag </div>. This pairing  tells the browser which specific elements are the children of which other elements. Also observe that we've added a class attribute to two of our elements. This allows for identification of particular elements (which will be useful for javascript) and for specific styling of that element (which is crucial for css). On the div we've created two classes by separating our substrings with a space.

Next let's see some real html in action, open up your browser and go to https://xkcd.com/. Next open the dev tools for the browser, in chrome on mac you do cmd+option+i, but consult your browser/os for specifics. This will give you a window into the working world of the dom (document object model). The browser reads your html file and creates a representation of it called the dom, which it then uses to render cat gifs and stuff to the user. Poke around, look at the way the structure works, notice the tags that are present on the page.

The basic tools of the trade in html are as follows:

- divs: these are the primary building blocks. You can put anything in them, if you don't know what to put somewhere, a div will usually suffice.

- spans: these are short blocks that usually contain a small amount of text.

- p: these are paragraphs of block text.

- headers: these elements are for titles and subtitles. They come in a spectrum of sizes h1, h2, h3, h4, h5. Where h1 is the biggest and h5 is the smallest.

- inputs: these elements allow the user to manipulate parts of the page. There are lots different modes for these, including drag handles, file inputs and many more.

- ul / li: These elements describe lists of things, they stand for unordered list and list item correspondingly.

There are lots lots more elements that are good to know about, but those are a good start. As you get more comfortable with web stuff, you should spend some time learning about semantically meaningful html tags. These allow you to embed extra information about the layout in the page, which in turn helps people who require screen readers or other vision-aides to actually understand what you made. Accessibility is important!

### CSS

CSS, which stands for cascading style sheets, is also a declarative language but it operates very differently than html. In css you write two things, selectors and style blocks. Selectors a way to specify which element or elements you want to style, while the style blocks declare how you want to style those elements that have been selected.

Selectors are a special string that combines any identifiable part of a html element, such as it's tag type (like <h1>), any classes that might live on it (denoted in the selector syntax as .class-name or .cool-dogs), or any ids (denoted #my-box). There are lots lots more selectors you can use! If you are ever super lost on how to select something, you can open the dev tools, right click the element of interest in the elements tab, click copy, and then copy selector. This will usually give you a very verbose selector that might be too specific (eg it only selected one element rather than a class of elements), but it can give you a push in the right direction if you are lost.

When you combine selectors in css with spaces, you are describing a nesting, so if we have a situation like

```html
<div>
  <div class="cool-dogs">
    <h1> Wowza </h1>
  </div>
  <div class="uncool-dogs">
    <h1> Yowza </h1>
  </div>
</div>
```
And we wanted to apply a style just to the wowza (and not yowza) we would do something like

`css
.cool-dogs h1 {
  color: red;
  text-decoration: underline;
}
`

Which would make the text red and underlined. Here we see our first style block, it's denoted by curly braces and contains a series of single declarative lines. Each line contains a property (color) and an option. Getting a knowledge of the huge landscape of these rules and properties is one of the main parts of being good at css, so don't be afraid to google a lot.

CSS rules cascade (hence the name) such that rules that come later in the specification override rules from earlier. The more specific the selector being used gets priority.

#### Exercise 0 CSS Sushi Diner

Go get more familiar with writing selectors! They are super important!!! Here's a fun game where you select sushi https://flukeout.github.io/ Do it now!

#### Margin + Padding

At the intersection of html and css is the idea of margin and padding. These two properties are really important for making your website not look like a piece of 90s crap, here's looking at you every piece of C-lang documentation. Margins describe the spaces between objects. You can write margins with one big command like

margin: <top> <right> <bottom> <left>;

or with four little ones (or whatever subset you want):

margin-top: <value>;
margin-bottom: 100px;
margin-right: 150px;
margin-left: 80px;

You can specify values in number of pixels (100px), percentage (50%), or relative to the current font size (1.2em). Generally it is best to use percentages for stuff that needs to change responsively (try changing the size of your window) and pixels for stuff that will always be the same (like the distance between two list elements). Padding is used in exactly the same way, but adds space to the inside of elements, so if you were trying to make some text have a nice space between it and it's containing element, put some padding on the containing element.

#### (A quick note on css style)

The internet will tell you lots of different things on the best way to write css. My belief is that the right way is the one that works for the project you are using, which will depend on the scale, as well as who and how many people are involved. Roughly there are two big camps:

- Use big classes that do lots of things. For example the class '.main-page-container' might contain a style block that applies all of the styles for that element in a single go. This approach, which is sometimes called benv, allows you to apply all of your styling to an element from a single place. Easy to write but hard to maintain.

- Use small classes that each do one thing. Writing little tiny css classes like '.red' or '.big-padding-left' that only apply one or two small properties. This can be a little more challenging to write, but can be rewarding on big projects. This approach is sometimes called atomic css.


The only hard and fast rule in my book is that you *must* use kabob-case. This differentiates css classes from other types of names you might encounter. Some examples 'main-page-container', 'flex-down', or 'cool-donut-chart'. I also tend to thinks it's a bad practice to use element ids (#my-element), but that's up to you.

## Flexbox

Getting elements to be where you want in a webpage is a shockingly challenging task. In the old days this would typically involve lots of fiddly adjustments to make things "pixel perfect". Sometime in the late naughts websites started needing to be responsive: they needed to be able to fit on mobile screens in addition to their canonical home of big cushy desktops. Since then html has only gone to more and more places, tvs, watches, embedded devices, really just anywhere you could put a screen. In response there was a new approach to designing website layouts developed called flex box. (There are lots of other approaches, see [here](https://www.w3schools.com/html/html_layout.asp), which are almost all perfect valid. That said if you use html tables as your layout technique for your whole page, I'll fail you.)


Here's the basic idea, in a flex box environment elements are always flowing in a single direction at time. You can effectively lay things out by creating nested structures where parts of the screen flow in one direction, while some of it's children flow in another. You write html as you normally would and then apply css to change the directions that things are laid out. The directions of flow are up down (column), and left right (row).

You start flex box mode by applying a css style that contains display flex.

`css
.flex {
  display: flex;
}
`

And then apply additional rules like

`css
display: flex;
flex-direction: column|row|<etc>;
justify-content: center|start|end|<etc>;
align-items: center|start|end|<etc>;
`

There's a lot more properties, but these will get you going.

### Exercise 1 Flexbox Froggy

It's one thing to hand wave your way through a flex description, but it's another to actually know how it works. The genuinely best resource on all the wide internet for learning flex box is a game called flex box froggy. You can find it here https://flexboxfroggy.com/ . Go do the whole thing right now.


### Exercise 2 Holy Grail Layout

Alright let's get down to bizness. In order to make everything run in the easiest way possible, I strongly encourage you to install live-server. It's a simple file server that watches your files and refreshes the current page if there have been any changes to it. You don't specifically need it to do this exercise, as you can always just refresh the page again and again, but it'll make your life way easier. If you've installed node correctly (come chat with us if you are not sure how) then you can install live-server with:

```sh
npm install -g live-server
```

This will be one of the only times we'll tell you to install a global (that's what the -g flag is about), it's usually a bad practice, but here it provides a sweet command line tool which you'll want everywhere. You can run it like

```sh
live-server
```

Which will pop open a window for ya, and off you go.

Now, then here's the problem. We want you to build a particular web layout, called the holy grail layout. You can read all about it here https://en.wikipedia.org/wiki/Holy_grail_(web_design) A lot of programming interview books from the mid naughts talk about it as a really common challenge. These days flex box has made it pretty dang easy, so with that in mind, go build one! You can point your browser to my solution if you want a reference on how it might look or check out my code if you get stuck. If you get done quickly add whatever extensions you like! Pictures in the boxes? Scrolling on the text if it get's too long? The world is your oyster.


### Bonus Notes

- If you are using the atom editor then you can install all sorts of cool autocompleters and linters. I like my configuration, which you can see here https://github.com/mcnuttandrew/dotfiles. I believe sublime and vscode both have similar setups, so use what works for you!

- If you are hungry for more practice, a traditional way to get good at css+html is to reproduce public website in a "pixel-perfect" way, the google home page is reasonably easy, facebook is moderate, the New York Times can be hard. Give it a spin!
