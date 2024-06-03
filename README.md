## About

🌐 hmpl is a small request language for working with server-side HTML. It is based on requests sent to the server via fetch and processed into ready-made HTML. The word hmpl is a combination of the old name cample-html into one word. h-html, mpl-cample.

### Example

<b>HTML before</b>

```html
<div id="wrapper"></div>
<script src="https://unpkg.com/hmpl-js@1.0.3/dist/hmpl.min.js"></script>
<script>
  const templateFn = hmpl.compile(`<request src="/api/test"></request>`);

  const wrapper = document.getElementById("wrapper");

  const elementObj = templateFn({
    credentials: "same-origin",
    get: (prop, value) => {
      if (prop === "response") {
        if (value) {
          wrapper.appendChild(value.content.firstElementChild);
        }
      }
    },
  });
</script>
```

<b>Server route - /api/test</b>

```html
<div>123</div>
```

<b>HTML after</b>

```html
<div id="wrapper">
  <div>123</div>
</div>

<script src="https://unpkg.com/hmpl-js@1.0.3"></script>
```

### Why hmpl?

hmpl is easy to use and effective in practice. You can literally download reusable HTML from the server in just a couple of clicks, which will reduce a huge amount of code and also simplify the creation of the user interface. Also, this product is open-source under the [MIT license](https://github.com/hmpl-js/hmpl/blob/master/LICENSE), which allows it to be used for commercial purposes.

Here are a few small advantages that the module has:

- Light weight
- Ability to work with request mounting directly via js
- Request Status Update
- Fairly safe HTML processing without outerHTML and similar functions, which minimizes the likelihood of errors
- Fully documented

And other advantages that will be visible when working with the module.

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
    <request src="/api/test" after="click:.getHTML"></request>
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

const templateFn = compile(
  `<div>
    <request src="/api/test" ref="1"></request>
    <request src="/api/test" ref="2"></request>
  </div>`
);

const wrapper = document.getElementById("wrapper");

const elementObj = templateFn([
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
```

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

You can install the package by simply [downloading](https://unpkg.com/hmpl-js@1.0.3/dist/hmpl.min.js) it as a file and moving it to the project folder.

```html
<script src="./hmpl.min.js"></script>
```

If, for some reason, you do not need the minified file, then you can download the full file from this [link](https://unpkg.com/hmpl-js@1.0.3/dist/hmpl.js).

```html
<script src="./hmpl.js"></script>
```

The non-minified file is larger in size, but it is there as it is with all the formatting.

### CDN

This method involves connecting the file through a third-party resource, which provides the ability to obtain a javascript file from npm via a link.

```html
<script
  src="https://unpkg.com/hmpl-js@1.0.3/dist/hmpl.min.js"
  integrity="sha384-i7lwvj+UgP+px6zcZg3FBKKBNgiRaf7MEc6z/WznWYnSn+XmzaZi+dcn6KX4LEcd"
  crossorigin="anonymous"
></script>
```

This resource could be unpkg, skypack or other resources. The examples include unpkg simply because it is one of the most popular and its url by characters is not so long.

## Getting started

After installation using any convenient method described in [Installation](https://hmpljs.github.io/#/?id=installation), you can start working with the server in the following way:

```html
<script src="https://unpkg.com/hmpl-js@1.0.3/dist/hmpl.min.js"></script>
<script>
  const templateFn = hmpl.compile(`<request src="/api/test"></request>`);
  const elementObj = templateFn();
</script>
```

Or, if you need to work with hmpl as a module, there is a list of imported functions, such as `compile`:

```javascript
import { compile } from "hmpl-js";
const templateFn = hmpl.compile(`<request src="/api/test"></request>`);
const elementObj = templateFn();
```

These will be the two main ways to interact with the server. In future versions, the functionality will be expanded, but the methods themselves will not change.

## Request

The main tag when working with hmpl is request. This tag is compiled into a "template" tag, which allows you to place the request anywhere on the page (in the table and in other "specific" tags)

```html
<request></request>
```

> When working with `request`, all `script` tags are removed by the module.

To work with a request, special attributes are defined that allow the code to access template markup.

### src

This attribute specifies the url to which the request will be sent.

```html
<request src="/api/test"></request>
```

```html
<request src="http://localhost:5000/api/test"></request>
```

It is worth considering that if there is no hostname (protocol etc.) in the url, the hostname (protocol etc.) of the address from which the request is sent will be substituted.

### method

This attribute specifies the request method that is sent to the server. The default value is the `get` method.

```html
<request method="get"></request>
```

The supported methods are `GET`, `POST`, `PUT`, `PATCH` or `DELETE`.

### after

The after property specifies after which event the request will be sent to the server. The value of the property is the string of the following construction `${event}:${selectors}`, where event is the event after which the request will be sent. and selectors are the targets to which event handlers will be assigned

```html
<request after="click:.target"></request>
```

> Selectors are not looked for in the `document`, but in the template string.

The HTML that comes from the server will change to a new one each time in the DOM if events are triggered.

### mode

This property specifies the mode of sending requests to the server and replacing HTML in the real DOM of the template. Takes two values `one` and `all`. The first value makes it so that the request to the server will be sent once, and after that all event handlers that were assigned by `selectors` will be removed and the second value, by default, sends a request every time the event is triggered. At the same time, HTML also changes once and changes constantly.

```html
<request mode="one"></request>
```

### ref

The ref attribute refers to the current identity settings object that was specified in the array in the compile function.

```html
<div>
  <request ref="1"></request>
  <request ref="2"></request>
</div>
```

```javascript
const arr = [
  { id: "1", optons: {...} },
  { id: "2", optons: {...} },
];
```

This link can be specified for several `request`'s at the same time. This can be compared to assigning a primary key in databases.

## hmpl

The main object of the entire module. It includes all the properties and methods that help you work with the server.

This object does not need to be imported. It is assigned to the entire document, so you can immediately use it in your code.

### compile

This function receives a string that contains a request with modular attributes.

```javascript
const templateFn = hmpl.compile(
  `<request src="/api/test" method="get"></request>`
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

The function returns an object that depends on the template string to determine the number of properties. If there are 2 or more `request` tags in the template string, then the `requests` property is added, which has the value of an array of objects for each `request`. Their properties are copied as if there was one tag with `request` in the template string.

```javascript
const templateFn = hmpl.compile(`<request src="/api/test"></request>`);
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
  `<div><request src="/api/test"></request><request src="/api/test"></request></div>`
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
  get?: HMPLRequestGet;
  body?: BodyInit | null;
  credentials?: RequestCredentials;
  headers?: HMPLHeaders;
  timeout?: number;
}
```

### HMPLTemplateObject

Return object of template function

```typescript
interface HMPLTemplateObject {
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

### HMPLIdentificationOptions (In future versions it will be exported)

Identification object of options, which is located in the array when passing it to the parameters of the template function

```typescript
interface HMPLIdentificationOptions {
  options: HMPLRequestOptions;
  id: string;
}
```
