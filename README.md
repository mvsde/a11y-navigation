# A11Y Navigation

Create an accessible navigation bar that works on mobile, desktop, and everything in between. This package doesn't provide any CSS but instead gives you the freedom to style the navigation to your liking.

The JavaScript sets all necessary `aria-*`-attributes and adds a class to the currently opened navigation item. The class can be customized to be anything that fits your CSS architecture.

Take a look at the [minimal required markup](#minimal-required-markup) and build your own custom navigation based on the example.

The minified browser bundle is `2.98 KB` small and only `1.1 KB` with Gzip enabled.

## Usage

### Minimal required markup

```html
<nav class="js-nav" id="navigation">
  <ul>

    <li class="js-nav-item">
      <a class="js-nav-link" href="#0">Entry #1</a>
      <button class="js-nav-button" hidden>Child menu</button>
      <ul class="js-nav-child">
        <li><a href="#0">Child link</a></li>
        <li><a href="#0">Child link</a></li>
        <li><a href="#0">Child link</a></li>
      </ul>
    </li>

    <li class="js-nav-item">
      <a class="js-nav-link" href="#0">Entry #2</a>
      <button class="js-nav-button" hidden>Child menu</button>
      <ul class="js-nav-child">
        <li><a href="#0">Child link</a></li>
        <li><a href="#0">Child link</a></li>
        <li><a href="#0">Child link</a></li>
      </ul>
    </li>

    <li>
      <a href="#0">Entry without child</a>
    </li>

  </ul>
</nav>
```

### Bundling system

A JavaScript bundler like [webpack](https://webpack.js.org) or [rollup.js](https://rollupjs.org) is required.

**Installation**

```bash
yarn add a11y-navigation
# or
npm install --save a11y-navigation
```

**Importing and instantiation**

```js
import A11yNavigation from 'a11y-navigation'

new A11yNavigation({
  el: document.querySelector('.js-nav')
})
```

More [constructor options](#constructor-options) are available.

### In browser with `<script>`

Use the file [https://unpkg.com/a11y-navigation](https://unpgk.com/a11y-navigation) directly from the UNPKG CDN or download and link it locally.

**index.html**

```html
<!DOCTYPE html>
<html>
  <head>
    …
    <script defer src="https://unpkg.com/a11y-navigation"></script>
    <script defer src="scripts.js"></script>
  </head>
  <body>
    <nav class="js-nav">
      <!-- A11Y Navigation markup -->
    </nav>
  </body>
</html>
```

**script.js**

```js
new A11yNavigation({
  el: document.querySelector('.js-nav')
})
```

More [constructor options](#constructor-options) are available.

### Constructor options

```js
const options = {
  // Required
  el: document.querySelector('.js-nav'),
  id: el.id, // Defaults to nav container id
  // Optional (these are the default values)
  classOpen: 'is-open',
  selectorButton: '.js-nav-button',
  selectorChild: '.js-nav-child',
  selectorItem: '.js-nav-item',
  selectorLink: '.js-nav-link'
}
```

## Development

### Prerequisites

* [Node.js](https://nodejs.org)
* [Yarn (optional)](https://yarnpkg.com)

### Installation

```bash
yarn
# or
npm install
```

### Start development server

```bash
yarn dev
# or
npm run dev
```

### Build production files

```bash
yarn build
yarn build:min
# or
npm run build
npm run build:min
```
