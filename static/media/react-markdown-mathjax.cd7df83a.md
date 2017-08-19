# Simple blogging using React, Markdown and MathJax

This is my first blog post and also a very meta one, its a blog about making a blog.

All the source code for this blog is contained in the `develop` (*master is reserved to host from {{username}}.github.io*) branch in the [blog repo](https://github.com/Bam4d/bam4d.github.io/tree/develop). I can't guarantee that it will be exactly the same as I add new code and experiment. however, feel free to clone the code from github, play around with it, run it locally, use it for your own blog etc...

## My Approach to blogging

I'm probably not very good at structuring blogs posts or tutorials just yet so forgive me if you get confused.

This is not intended to be for complete beginners, but I'm also no expert at all in anything i'm going to blog about.

I'm going to try to explain things in a series of what I think tangible steps. I'm very aware that sometimes blogs/tutorials seem to skip steps that to **me** are completely vital and I would otherwise not be able to complete the task, or understand it. Therefore I'm going to add a Disqus plugin at the bottom on the page, so if you want to ask a question or hurl abuse at my shitty grammar feel free to do the needful.

## I'm doing this because of the reasons

I've never written a blog before but I knew I wanted to try and do it in a particular way: 
 * **React**
    * I'm not that versed in making websites, but I know that React is very popular right now and I've heard lots of good things about it.
    * React allows you to treat different components on web pages in a very object-oriented way, which appeals to any sane engineer.
 * **Self-Contained**
    * I didn't want to use a database, or anything that would cost me any money to host, I wanted to just have a {{username}}.github.io page that I can shove stuff into for free :) Maybe there are some libraries/frameworks/CMSs out there in the real world to do this, but then I wouldn't learn how to tie up all the other components. If I ended up using a pre-existing tool, this blog post would be replaced by pictures of holistic bourgeois deconstructed escargot ice cream.
    * Yes there is more effort involved here, and probably every time I create a new post I'd have to update some references in a few places then probably and a config file to point to the new post. Currently I'm not too bothered about and I don't feel like it's a limitation right now. I'm not trying to build an amazing blog platform, I'm trying to learn stuff. 
 * **Markdown**
    * I didn't want to spend a long time styling my blog in terms of tags and images and formatting and css, I know that it's not my forte. I'm an **awful** designer. I'm going to use bootstrap. Fight me.
    * Markdown allows you to write really simple readable documents with barely any effort, plus its supported in so many tools for documentation, messaging apps, etc.. If you are a software engineer, learn it immediately. It's **awesome**.
 * **MathJax**
    * I really wanted to write mathematical formulas in my posts. I'm planning on doing some blog posts about mathematical things and machine learning in the near future.
    * MathJax is pretty much the only decent way of displaying mathematical symbols/formulas/notation on the web, unless you are completely insane and want to copy and paste tonnes of rendered `png` formulas from some online tool into your html directly.

More importantly I did not want to use and off the shelf blogging platform because I constantly want to learn stuff all the time. **If I'm not learning something new, I'm not having fun. I have no attention span.**

## Getting React up and running

*If you are familiar with `npm` then continue reading. Otherwise, familiarize yourself with `npm` first. I suggest playing around with pulling in dependencies and using them. There's tonnes of tutorials and examples out there.* 

### create-react-app

So I used the facebook tool [`create-react-app`](https://github.com/facebookincubator/create-react-app) in order to create my basic baseline application. 

it's very simple to install and create an example baseline react app.
```
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
```

At this point, you might want to create your github repo in the `my-app` directory and sync up your source. This is always a good idea.

## Creating a markdown component in react

So firstly, we will need to install some dependencies using `npm`.

1. [Markdown-it](https://github.com/markdown-it/markdown-it) - This will render your markdown as html in the browser
    * `npm install --save markdown-it`

2. [Markdown-it-mathjax](https://github.com/markdown-it/markdown-it) - Normalizes different mathjax formats so they do not interfere with markdown syntax
    * `npm install --save markdown-it`

Now we have those dependencies installed we want to create our `MarkdownComponent`

### MarkdownComponent.js

```javascript
import React, { Component } from 'react';
import md from 'markdown-it'
import mj from 'markdown-it-mathjax'

class MarkdownComponent extends React.Component {

    constructor(props) {
        super(props);
        this.md = md().use(mj());
        this.state = {markdownData: ""}
    }

    setMarkdown = (markdown) => {
        console.log("Setting markdown for page");
        this.setState({markdownData: markdown})
    }

    componentWillMount() {

        if(this.props.markdownSrc) {
            fetch(this.props.markdownSrc)
            .then((response) => {
                
                if(!response.ok) {
                    return "# Not Found";
                } else {
                    return response.text();
                }
            }).then((markdownData) => {
                this.setMarkdown(markdownData);
            });
        } else if(this.props.markdownText) {
            this.setMarkdown(this.props.markdownText);
        }
    }

    render() {
        const markdown = this.md.render(this.state.markdownData);
        return <div dangerouslySetInnerHTML={{__html:markdown}} />;
    }
};

export default MarkdownComponent;
```

So what is going on here, let me briefly explain each function...
#### constructor() - [documentation](https://facebook.github.io/react/docs/react-component.html#constructor)

In the constructor we are doing a few things that might seem to have odd syntax.
for example the following line:
```javascript
this.md = md().use(mj());
```

The explanation for this is that the imports `mardown-it` and `markdown-it-mathjax` have been translated to ES6 format:

* not using ES6, `require` is returning a function which you have to execute in order to return the reference.

    ```javascript
    var md = require('markdown-it')()
                .use(require('markdown-it-mathjax')());
    ```
* Using ES6 we are just returning the references to the functions and not actually executing them.

    ```javascript
    import md from 'markdown-it'
    import mj from 'markdown-it-mathjax'
    ```

So to get the equivalent of `var md` from the non-ES6 example, we have to execute both of them to get our useable markdown reference, we can then store it within the context of the component so we can use it later.
```javascript
this.md = md().use(mj());
```

#### setMarkdown

This function is simply a re-usable bit of code to set the state of the markdown component. The `markdownData` variable in the state contains the raw markdown text that we want to render as html.

#### componentWillMount() - [documentation](https://facebook.github.io/react/docs/react-component.html#componentwillmount)

This function is called synchronously before `render()` which allows us to preprocess some state variables before we render the page.

when we are going to use our markdown component later on, we will use it in the following way:

`<MarkdownComponent markdownSrc="someMarkdown.md">`

The `markdownSrc` property will be magically set on the `this.props` variable within the react component, all we need to do is actually fetch the content from `someMarkdown.md` and then send that content to `setMarkdown` which will cause the `render()` function to be called.

Similarly you can use:

`<MarkdownComponent markdownText="#Random inline markdown header">`

#### render()

In `setMarkdown`, we are calling the `this.setState({markdownData: markdown})` which will be internally setting `this.state.markdownData` and then calling the `render()` function.

All render needs to do at this point is use the markdown processor `this.md` that we initialized in the constructor to generate markdown as html.

```javascript
const markdown = this.md.render(this.state.markdownData);
return <div dangerouslySetInnerHTML={{__html:markdown}} />;
```

## Modifying the Markdown Component to allow inline MathJax formulas

First things first, mathjax is not very react friendly. So there's going to be some nasty looking hackiness that is going to be a bit cringey. I tried to use the mathjax npm module but i could not for the life of me work out how to actually get it to work as part of a react app. Depending on its configuration, Mathjax will try to download other dependencies from the same host location, which, when bundled built with `create-react-app`, are not where MathJax.js thinks they should be. It just doesn't appear to work. I could not get it to work, and neither could [this guy](https://groups.google.com/forum/#!topic/mathjax-users/FN4Z1VV0ffg)

It doesn't seem that many people have tried to achieve a markdown-mathjax-react app. Or at least there is not a lot of information out there to do it. (until now!)

There is a new dependency `load-script` that we will need to install in order to pull the MathJax script into react. You can install it using `npm`.

```
npm install --save load-script
```

We will also need to make code changes to a few places: 

### App.js

```javascript
import React, { Component } from 'react';
import MarkdownComponent from './MarkdownComponent';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import demoivre from './posts/demoivre.md';
import loadScript from 'load-script'

const MATHJAX_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";

const MATHJAX_OPTIONS = {
    tex2jax: {
      inlineMath: [ ['$','$'], ['\\(','\\)'] ],
      displayMath: [ ['$$','$$'], ['\[','\]'] ]
    },
    showMathMenu: false,
    showMathMenuMSIE: false
};

class App extends Component {

  constructor(props) {
    super(props);
    loadScript(MATHJAX_SCRIPT, () => {
      window.MathJax.Hub.Config(MATHJAX_OPTIONS);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chris Bamford's Tech Blog</h2>
        </div>
        <div className="container">
          <div>
            <MarkdownComponent markdownSrc={demoivre}></MarkdownComponent>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
```


Firstly you can see there are two global variables:

1. We need to use the CDN hosted version of mathjax so mathjax can work out where it's dependencies are hiding, it will download what it needs from cloudflare.
    ```javascript
    const MATHJAX_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";
    ```
1. The MathJax configuration. Documentation for these configuration variables can be found [here](http://docs.mathjax.org/en/latest/options/index.html).
    ```javascript
    const MATHJAX_OPTIONS = {
        tex2jax: {
            inlineMath: [ ['$','$'], ['\\(','\\)'] ],
            displayMath: [ ['$$','$$'], ['\[','\]'] ]
        },
        showMathMenu: false,
        showMathMenuMSIE: false
    };
    ```

Then in the constructor for the App React component (the main component of the entire react application) we are doing the following few lines of code:

```javascript
loadScript(MATHJAX_SCRIPT, () => {
    window.MathJax.Hub.Config(MATHJAX_OPTIONS);
});
```

This will load the MathJax script into a `<script>` tag in the `<head>` of the html document. 
MathJax will create an instance of itself on the `window` object of the document, and this is where we can reference it from.

`load-script`'s second argument is a callback for when the script has loaded in the page. When that script is loaded, here we are setting the MathJax config from the `MATHJAX_OPTIONS` constant.

MathJax is now loaded into the react app and configured. The next step is to add it to the `MarkdownComponent`.

### MarkdownComponent.js - with MathJax support

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import md from 'markdown-it'
import mj from 'markdown-it-mathjax'

class MarkdownComponent extends React.Component {

    constructor(props) {
        super(props);
        this.md = md().use(mj());
        this.state = {markdownData: ""}
    }

    setMarkdown = (markdown) => {
        this.setState({markdownData: markdown})
    }

    renderMathJax = () => {
        const currentNode = ReactDOM.findDOMNode(this);
        window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub,currentNode]);
    }

    componentDidMount() {
        this.renderMathJax();
    }

    componentDidUpdate(props, state) {
        this.renderMathJax();
    }

    componentWillMount() {

        if(this.props.markdownSrc) {
            fetch(this.props.markdownSrc)
            .then((response) => {
                
                if(!response.ok) {
                    return "# Not Found";
                } else {
                    return response.text();
                }
            }).then((markdownData) => {
                this.setMarkdown(markdownData);
            });
        } else if(this.props.markdownText) {
            this.setMarkdown(this.props.markdownText);
        }
    }

    render() {
        const markdown = this.md.render(this.state.markdownData);
        return <div dangerouslySetInnerHTML={{__html:markdown}} />;
    }
};

export default MarkdownComponent;
```

You can see that this is mostly the same as the previous `MarkdownComponent` script above, but this has a few additions:

#### renderMathJax()

This function like setMarkdown is a helper function to just wrap the MathJax script to re-load and parse any string that have mathjax syntax within a particular node.

Firstly we need get a DOM reference to the markdown component DOM node itself using 

```
const currentNode = ReactDOM.findDOMNode(this);
```

and then we pass that to the `MathJax.Hub.Queue` function:
```
window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub,currentNode]);
```

This forces mathjax to look through the text of that node and replace any mathjax annotations with actual renderered equations.
    

#### componentDidMount() and componentDidUpdate() - [documentation](https://facebook.github.io/react/docs/react-component.html#componentdidmount)
 These functions are called when the component is rendered into the page, or the content of the component changes. Therefore at this point we need to make sure that we tell mathjax to re-render any new equations that might have appeared. (this doesn't technically happen in this example, but if you were to dynamically change the text... this would make sure that any equations would get re-rendered)




## Publishing to {{username}}.github.io

*This section is derived from the documentation for using github pages with `create-react-app` that can be found [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages)*

If you want to publish your awesome blog to `{{username}}.github.io` you will need to do a few tricks:

1. Switch your branch to something other than master (i use `develop`, only commit on this branch from now on.

    * `git checkout -b "develop"` 

    The reason for this is that by default, `{{username}}.github.io` repositories will host your site from the `master` branch. And when using `create-react-app` your published branch is going to look very different than your `develop` branch. This is because `create-react-app` is going to compile all your dependencies together into a super browser friendly, optimized format.

1. Install `gh-pages` deployment plugin using `npm`
    
    * `npm install --save gh-pages`
    

1. Change the homepage in your `my-app/package.json` file
    * `"homepage": "https://myusername.github.io"`


1. Add a "deploy" command to your `my-app/package.json` file

    ```javascript
    // Find this bit of code in package.json
    "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build --branch master", // THIS LINE IS NEW
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test --env=jsdom",
        "eject": "react-scripts eject"
    },
    ```

1. Test it out, bruh!

    Run the following command to deploy to your `{{username}}.github.io`
    * `npm run deploy`
    
    You should then be able to navigate to `https://{{username}}.github.io` and see your react app! WOO!


## And to prove it all works.... embedded markdown MathJax examples!

### Sum of squares up to $n$

$$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$

### A matrix...

$$ \left[
    \begin{array}{cc|c}
      1&2&3\\
      4&5&6
    \end{array}
\right] $$

### A Table...

$$
\begin{array}{c|lcr}
n & \text{Left} & \text{Center} & \text{Right} \\
\hline
1 & 0.24 & 1 & 125 \\
2 & -1 & 189 & -8 \\
3 & -20 & 2000 & 1+10i
\end{array}
$$