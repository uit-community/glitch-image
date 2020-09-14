![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# <glitch-image>

<img src="https://user-images.githubusercontent.com/6761278/87383857-556af400-c5d5-11ea-979a-2a97f28fa5ec.gif" width="250">

It's easy to use, just put the file path to the image in the src attribute, like the <img> tag.

```
<script
  src="https://unpkg.com/@uit/glitch-image/dist/glitch-image.js"
  type="module"
></script>

<div style="width: 250px; height: 250px;">
  <glitch-image src="uit-logo.svg"></glitch-image>
</div>
```

## What is the glitch effect?

The glitch effect is an expressive technique that creates a situation where a digital device is unable to display the correct image due to noise or error.  
So, it is not like a static error, but rather a partial error in phase/hue.

## Using this component

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/@uit/glitch-image/dist/glitch-image.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### React

- Run `npm install @uit/glitch-image --save`
- Then, implement it by calling the loader as follows

```
import { applyPolyfills, defineCustomElements } from "@uit/glitch-image/loader";

applyPolyfills().then(() => {
  defineCustomElements();
});

export default function App() {
  return (
    <div className="App">
      <glitch-image src="..." />
    </div>
  );
}
```

### Vue

- Run `npm install @uit/glitch-image --save`
- Then, implement it by calling the loader as follows

```
<template>
  <div id="app">
    <glitch-image src="..." />
  </div>
</template>

<script>
import { applyPolyfills, defineCustomElements } from "@uit/glitch-image/loader";

applyPolyfills().then(() => {
  defineCustomElements();
});

export default {
  name: "App"
};
</script>
```

### Node Modules

- Run `npm install @uit/glitch-image --save`
- Put a script tag similar to this `<script src='node_modules/@uit/glitch-image/dist/glitch-image.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app

- Run `npm install @uit/glitch-image --save`
- Add an import to the npm packages `import @uit/glitch-image;`
- Then you can use the element anywhere in your template, JSX, html etc

## Getting Started

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/uit-community/glitch-image.git glitch-image
cd glitch-image
git remote rm origin
```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```
