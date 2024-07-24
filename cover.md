# hmpl.js

> Template language for [fetching](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) HTML from API

[Get Started](/docs#introduction)
[Demo Sandbox](https://codesandbox.io/p/sandbox/basic-hmpl-example-dxlgfg)

```javascript
const templateFn = hmpl.compile(
  `<div>
      {
         {
           "src": "http://localhost:8000/api/test",
           "on": {
              "trigger": "loading",
              "content": "<div>Loading...</div>",
           }
         }
      }
    </div>`
);
const obj = templateFn();
document.getElementById("wrapper").appendChild(obj.response);
```
