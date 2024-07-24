# hmpl.js

> Template language for [fetching](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) HTML from API

[Get Started](/docs#introduction)
[Demo Sandbox](https://codesandbox.io/p/sandbox/basic-hmpl-example-dxlgfg)

## Features

<div class="features">
  <div class="feature feature-1">
    <span>:page_facing_up: Object as a basis</span>
    <p>
      By creating one template object, you can make many DOM nodes that display server-side HTML
    </p>
  </div>
  <div class="feature feature-2">
    <span>:capital_abcd: Syntax</span>
    <p>
      Work with server-side html directly in markup, passing only the object
    </p>
  </div>
  <div class="feature feature-3">
    <span>:watch: Modernity</span>
    <p>
      The basis of the language is fetch and the new ECMAScript features that come with it.
    </p>
  </div>
</div>

## Getting started

After installation using any convenient method described in [Installation](https://hmpljs.github.io/#/docs?id=installation), you can start working with the server in the following way:

```html
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
<script>
  const templateFn = compile(
    `{ 
       {
         "src": "/api/test" 
       } 
     }`
  );
  const elementObj = templateFn();
</script>
```

Or, if you need to work with hmpl as a module, there is a list of imported functions, such as `compile`:

```javascript
import { compile } from "hmpl-js";
const templateFn = compile(
  `{ 
     {
       "src": "/api/test" 
     } 
   }`
);
const elementObj = templateFn();
```

These will be the two main ways to interact with the server. In future versions, the functionality will be expanded, but the methods themselves will not change.

## Webpack

Module has its own loader for files with the `.hmpl` extension. You can include [hmpl-loader](https://www.npmjs.com/package/hmpl-loader) and use the template language syntax in separate files:

### main.hmpl

```hmpl
<div>
  {
    {
      "src": "/api/test"
    }
  }
</div>
```

### main.js

```javascript
const templateFn = require("./main.hmpl");

const elementObj = templateFn();
```

For the loader to work, it is better to use versions `0.0.2` or higher.

<hr/>

Licensed under MIT
