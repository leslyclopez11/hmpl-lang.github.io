# hmpl.js

> Template language for displaying UI from server to client

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
      The basis of the language is <a target="_blank" rel="noopener" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" title="Fetch API">fetch</a> and the new ECMAScript features that come with it.
    </p>
  </div>
</div>

## Why hmpl?

The HMPL template language extends the capabilities of regular HTML by adding query objects to the markup to reduce the code on the client. When writing SPA, a large amount of javascript code is generated, which is loaded when the user visits the site, so the loading speed can be quite slow. All this can be avoided by generating the markup on the server and then loading it on the client:

```hmpl
<div>
  <p>
    Clicks: {{"src":"http://localhost:8000/api/clicks",
    "after":"click:.increment"}}
  </p>
  <button class="increment">Click!</button>
</div>
```

Let's say that the same code on popular frameworks such as Vue and others takes up much more code, which, in fact, can be moved to the server.

## Usage

```javascript
const templateFn = hmpl.compile(
  `<div>
      {
         {
           "src": "http://localhost:8000/api/test",
           "indicators": [
               {
                 "trigger": "pending",
                 "content": "<div>Loading...</div>",
               }
            ]
        } 
      }
    </div>`
);
const obj = templateFn();

/**
 * obj = {
 *  response: div,
 *  status: 200
 * }
 */
```

## Webpack

Module has its own loader for files with the `.hmpl` extension. You can include [hmpl-loader](https://www.npmjs.com/package/hmpl-loader) and use the template language syntax in separate files:

### main.hmpl

```hmpl
<div>
  {
    {
      "src":"/api/test"
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
