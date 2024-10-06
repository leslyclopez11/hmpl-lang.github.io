# Examples

## Example 1

```javascript
import { compile } from "hmpl-js";

const templateFn = compile(
  `<div>
    <button class="getHTML">Get HTML!</button>
    { 
      {
        "src":"/api/test",
        "after":"click:.getHTML",
        "indicators": [
           {
             "trigger": "pending",
             "content": "<div>Loading...</div>"
           },
           {
             "trigger": "rejected",
             "content": "<div>Error</div>"
           }
        ]
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

## Example 2

```javascript
import { compile, stringify } from "hmpl-js";

const request2 = stringify({
  src: "/api/test",
  initId: 2,
});

const templateFn = compile(
  `<div>
     { 
       {
         "src":"/api/test",
         "initId":"1"
       } 
     }
     {${request2}}
  </div>`
);

const wrapper = document.getElementById("wrapper");

const obj1 = templateFn([
  {
    id: "1",
    value: {
      credentials: "same-origin",
    },
  },
  {
    id: 2,
    value: {
      credentials: "omit",
    },
  },
]);

const obj2 = templateFn([
  {
    id: "1",
    value: {
      mode: "cors",
    },
  },
  {
    id: "2",
    value: {
      mode: "no-cors",
    },
  },
]);

wrapper.appendChild(obj1.response);
wrapper.appendChild(obj2.response);
```
