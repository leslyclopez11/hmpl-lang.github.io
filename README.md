## About

🌐 hmpl is a small template language for fetching HTML from API. It is based on requests sent to the server via fetch and processed into ready-made HTML. The word hmpl is a combination of the old name cample-html into one word. h-html, mpl-cample.

### Example

### HTML before

```html
<div id="wrapper"></div>
<script src="https://unpkg.com/hmpl-js@2.0.0/dist/hmpl.min.js"></script>
<script>
  const templateFn = hmpl.compile(
    `<div>
       { 
         {
           "src":"http://localhost:8000/api/test" 
         } 
       }
    </div>`
  );

  const wrapper = document.getElementById("wrapper");

  const obj = templateFn();

  wrapper.appendChild(obj.response);
</script>
```

### API route - /api/test

```html
<span>123</span>
```

### HTML after

```html
<div id="wrapper">
  <div><span>123</span></div>
</div>
```

### Why hmpl?

The main goal of this new template language is to simplify working with the server by integrating small request structures into HTML. This can be compared to how, in files with a php extension, you could work with the response from the server received through a php request, but at the same time work with it directly through javascript. Using the example of simply getting the title from a button, you can understand how this template language can simplify your work:

```php
<div>
  <button id="getTitle" onclick="?">Get Title</button>
  <h1><?php echo $title; ?></h1> <!-- if(){?} -->
</div>
```

or

```javascript
import { compile } from "hmpl-js";

const templateFn = compile(
  `<div>
    <button class="getTitle">Get Title!</button>
    <h1>
      { 
        {
          "src":"http://localhost:8000/api/test",
          "after":"click:.getTitle"
        } 
      }
    </h1>
  </div>`
);

const bodyEl = document.querySelector("body");

const elementObj = templateFn();

bodyEl.appendChild(elementObj.response);
```

Thus, despite the fact that this approach does not imply server-side rendering, it does simplify working with HTML and the server and makes it possible to make requests out of the box safely, as well as write less code than would be done through pure javascript

### About server-side rendering

Although the markup is generated on the server, the module <b>does not provide</b> functionality for displaying content to search robots. This is not expected in the future because this module is intended for other purposes.

### Discussion and development of an open-source project

This product has a discussion platform on [github](https://github.com/hmpl-js/hmpl/discussions). You can write your reviews or wishes about the project there. The project developer will try to answer you as soon as possible.

In the future, it is planned to maintain social networks, but for now the entire focus is only on the product.

## More examples

### Example 1

```javascript
import { compile } from "hmpl-js";

const templateFn = compile(
  `<div>
    <button class="getHTML">Get HTML!</button>
    { 
      {
        "src":"/api/test",
        "after":"click:.getHTML"
      } 
    }
  </div>`
);

const wrapper = document.getElementById("wrapper");

const elementObj = templateFn({
  get: (prop, value) => {
    if (prop === "response") {
      if (value) {
        wrapper.appendChild(value);
      }
    }
  },
});
```

### Example 2

```javascript
import { compile } from "hmpl-js";

const request2 = JSON.stringify({
  src: "/api/test",
  ref: "2",
});

const templateFn = compile(
  `<div>
     { 
       {
         "src":"/api/test",
         "ref":"1"
       } 
     }
     {${request2}}
  </div>`
);

const wrapper = document.getElementById("wrapper");

const obj1 = templateFn([
  {
    id: "1",
    options: {
      credentials: "same-origin",
    },
  },
  {
    id: "2",
    options: {
      credentials: "omit",
    },
  },
]);

const obj2 = templateFn([
  {
    id: "1",
    options: {
      mode: "cors",
    },
  },
  {
    id: "2",
    options: {
      mode: "no-cors",
    },
  },
]);

wrapper.appendChild(obj1.response);
wrapper.appendChild(obj2.response);
```

### GitHub repository with examples

The [repository](https://github.com/hmpljs/examples) has a list of several example projects. There you can find examples with and without webpack, as well as a test local server.

## Installation

hmpl can be installed in several ways, which are described in this article. This tool is a simple javascript file that is connected in the usual way through a `script`, or using the `import` construct in an environment that supports this (webpack build, parcel build etc.). The first and easiest way is to install using a CDN.

### Package Manager

This method involves downloading through npm or other package managers.

```bash
npm i hmpl-js
```

> [Node.js](https://nodejs.org) is required for npm.

Along the path node-modules/hmpl/dist you can find two files that contain a regular js file and a minified one.

### Manual download

You can install the package by simply [downloading](https://unpkg.com/hmpl-js@2.0.0/dist/hmpl.min.js) it as a file and moving it to the project folder.

```html
<script src="./hmpl.min.js"></script>
```

If, for some reason, you do not need the minified file, then you can download the full file from this [link](https://unpkg.com/hmpl-js@2.0.0/dist/hmpl.js).

```html
<script src="./hmpl.js"></script>
```

The non-minified file is larger in size, but it is there as it is with all the formatting.

### CDN

This method involves connecting the file through a third-party resource, which provides the ability to obtain a javascript file from npm via a link.

```html
<script
  src="https://unpkg.com/hmpl-js@2.0.0/dist/hmpl.min.js"
  integrity="sha384-RMAg0iL86fS8l7iNWZUtkhHwNr/gWEqEi32LszRjm2dYRV2r5Kur/aJmaw4es7Ae"
  crossorigin="anonymous"
></script>
```

This resource could be unpkg, skypack or other resources. The examples include unpkg simply because it is one of the most popular and its url by characters is not so long.

## Getting started

After installation using any convenient method described in [Installation](https://hmpljs.github.io/#/?id=installation), you can start working with the server in the following way:

```html
<script src="https://unpkg.com/hmpl-js@2.0.0/dist/hmpl.min.js"></script>
<script>
  const templateFn = compile(
    `{ 
       {
         "src":"/api/test" 
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
       "src":"/api/test" 
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

## Request

The main thing in hmpl syntax is string interpolation. In most frameworks, such as Cample and others, string interpolation occurs using double curly braces, but since it is not convenient to do three curly braces together with a request object, a single brace was chosen. The format in which string interpolation works is as follows - `{${request}}`.

> When working with request, all `script` tags are removed by the module.

The main way to send a request to the server is through a request object. This object includes the properties described below in documentation.

```hmpl
{
  {
     "src":"/api/test"
  }
}
```

This object is parsed using `JSON.parse`, so for convenience you can use the `JSON.stringify` function by passing the object that needs to be inserted into the string:

```javascript
const request = JSON.stringify({
  src: "/api/test",
});

const templateFn = compile(`{${request}}`);
```

This object is replaced with HTML that comes from the server using the `template` tag.

Until the request is sent, there will be a comment in place of the request object that looks like this:

```html
<!--hmpl1-->
```

This comment is replaced with HTML that comes from the server.

### src

This property specifies the url to which the request will be sent. Property `src` is required.

```hmpl
{
  {
     "src":"http://localhost:5000/api/test"
  }
}
```

It is worth considering that if there is no hostname (protocol etc.) in the url, the hostname (protocol etc.) of the address from which the request is sent will be substituted.

```hmpl
{
  {
     "src":"/api/test"
  }
}
```

### method

This property specifies the request method that is sent to the server. The default value is the `get` method.

```hmpl
{
  {
     "method":"get"
  }
}
```

The supported methods are `GET`, `POST`, `PUT`, `PATCH` or `DELETE`.

### after

The `after` property specifies after which event the request will be sent to the server. The value of the property is the string of the following construction `${event}:${selectors}`, where event is the event after which the request will be sent. and selectors are the targets to which event handlers will be assigned

```hmpl
{
  {
     "after":"click:.target"
  }
}
```

> Selectors are not looked for in the `document`, but in the template string.

The HTML that comes from the server will change to a new one each time in the DOM if events are triggered.

### mode

This property specifies the mode of sending requests to the server and replacing HTML in the real DOM of the template. Takes two values `one` and `all`. The first value makes it so that the request to the server will be sent once, and after that all event handlers that were assigned by `selectors` will be removed and the second value, by default, sends a request every time the event is triggered. At the same time, HTML also changes once and changes constantly.

```hmpl
{
  {
     "mode":"one"
  }
}
```

### ref

The `ref` property refers to the current identity settings object that was specified in the array in the compile function.

```hmpl
<div>
  {
    {
      "src":"/api/test",
      "ref":"1"
    }
  }
  {
    {
      "src":"/api/test",
      "ref":"2"
    }
  }
</div>
```

```javascript
const arr = [
  { id: "1", optons: {...} },
  { id: "2", optons: {...} },
];
```

This link can be specified for several request objects at the same time. This can be compared to assigning a primary key in databases.

## hmpl

The main object of the entire module. It includes all the properties and methods that help you work with the server.

This object does not need to be imported. It is assigned to the entire document, so you can immediately use it in your code.

### compile

This function receives a string that contains a strin with hmpl syntax.

```javascript
const templateFn = hmpl.compile(
  `{ 
     {
       "src":"/api/test" 
     } 
   }`
);
```

This function returns a function that already creates an object with values for request. The function receives as parameters either an options object or an array of identification options.

```javascript
const elementObj = templateFn({
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "text/html",
  },
  redirect: "follow",
  get: (prop, value) => {},
  referrerPolicy: "no-referrer",
  body: JSON.stringify(data),
  signal: new AbortController().signal,
  integrity: "...",
  window: null,
  refferer: "about:client",
});
```

or

```javascript
const elementObj = templateFn([
  {
    id: "1",
    options: {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "text/html",
      },
      redirect: "follow",
      get: (prop, value) => {},
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    },
  },
]);
```

> It is worth considering that if an array is passed, then if the `ref` attribute is not specified, the request will be sent without a settings object

The `id` value of each options identification object is unique. The value type is `string`

The function returns an object that depends on the template string to determine the number of properties. If there are 2 or more request objects in the template string, then the `requests` property is added, which has the value of an array of objects for each request object. Their properties are copied as if there was one request object in the template string.

```javascript
const templateFn = hmpl.compile(
  `{ 
     {
       "src":"/api/test" 
     } 
   }`
);
const elementObj = templateFn();
```

result:

```javascript
{
  status: 200,
  response: template
}
```

or

```javascript
const templateFn = hmpl.compile(
  `<div>
   {
     {
       "src":"/api/test"
     }
   }
   {
     {
       "src":"/api/test"
     }
   }
</div>`
);
const elementObj = templateFn();
```

result:

```javascript
{
  response: div,
  requests: [
    {
      status: 200,
      response: template,
    },
    {
      status: 200,
      response: template,
    },
  ],
};
```

The `response` that is generated for the `element` will not contain a `template` tag, but an array with `ChildNode`'s, because these nodes have already been rendered into the DOM from the template string.

Values are dynamically assigned to the object depending on the server response.

> The status changes depending on the server response. But, the most important thing is that it is not assigned several times if it is the same. When working with `Proxy` or `Object.defineProperty` or `get` or something like that, this will not give the object unnecessary updates!

#### get

The get property takes the value of a function that fires every time one of the properties is updated.

```javascript
const elementObj = templateFn({
  get: (prop, value, requestObject) => {
    switch (prop) {
      case "response":
        if (!requestObject) console.log(requestObject);
        console.log("Response:");
        console.log(value);
        break;
      case "status":
        console.log("Status:");
        console.log(value);
        break;
    }
  },
});
```

It is worth noting that the `requests` property is not called when the value changes, because the function is called when the values ​​in this property change only for array elements. This is a debatable thing, but it may not be necessary to call this function when a specific property of an object is called.

## Types

### HMPLRequestOptions

Options object. Will update based on `RequestInit` type

```typescript
interface HMPLRequestOptions {
  mode?: RequestMode;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
  integrity?: string;
  referrer?: string;
  get?: HMPLRequestGet;
  body?: BodyInit | null;
  signal?: AbortSignal | null;
  window?: any;
  credentials?: RequestCredentials;
  headers?: HMPLHeaders;
  timeout?: number;
}
```

### HMPLInstance

Return object of template function

```typescript
interface HMPLInstance {
  response: undefined | Element | null;
  status?: number;
  requests?: HMPLRequest[];
}
```

### HMPLRequest

Object in the `requests` property

```typescript
interface HMPLRequest {
  response: undefined | Element | null | ChildNode[];
  status: number;
  id?: string;
}
```

### HMPLRequestGet

`get` function in options object

```typescript
type HMPLRequestGet = (prop: string, value: any, request?: HMPLRequest) => void;
```

### HMPLHeaders

headers object in options object

```typescript
interface HMPLHeaders {
  [key: string]: string;
}
```

### HMPLIdentificationOptions

Identification object of options, which is located in the array when passing it to the parameters of the template function

```typescript
interface HMPLIdentificationOptions {
  options: HMPLRequestOptions;
  id: string;
}
```

### HMPLCompile

Creates a template function

```typescript
(template: string) => HMPLTemplateFunction;
```

### HMPLTemplateFunction

The function returned in response to the `compile` function. Creates template instances.

```typescript
(options?: HMPLIdentificationOptions[] | HMPLRequestOptions) => HMPLInstance;
```
