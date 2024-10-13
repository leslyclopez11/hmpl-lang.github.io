# Examples

<!--List of test examples of work without request to api. Will also work by itself.-->

## Example 1

### Result

<div>
  <button @click="switchComponent" class="getHTML">Get HTML!</button>
  <component :is="currentComponent"></component>
</div>

<script setup>
  import { createCommentVNode, h, ref } from 'vue'
  let id = ref(0);
  const els = [createCommentVNode("hmpl0"), h("div", "Loading..."), h("div", "HTML from server")];
  const Comment = (_, ctx) => els[0];
  const Loading = (_, ctx) => els[1];
  const HTMLFromServer = (_, ctx) => els[2];
    const currentComponent = ref(Comment)
    const switchComponent = () => {
      const isComment = currentComponent.value === Comment;
      if(isComment){
        currentComponent.value = Loading;
        setTimeout(()=>{
          currentComponent.value = HTMLFromServer;
        }, 300);
      }
    }
</script>

### Code

```javascript
import { compile } from "hmpl-js";

const templateFn = compile(
  `<div>
    <button class="getHTML">Get HTML!</button>
    { 
      {
        "src":"/api/test",
        "after":"click:.getHTML",
        "repeat":false,
        "indicators": [
           {
             "trigger": "pending",
             "content": "<div>Loading...</div>"
           }
        ]
      } 
    }
  </div>`
);

const wrapper = document.getElementById("wrapper");

const elementObj = templateFn();

wrapper.appendChild(elementObj.response);
```

## A repository of simple projects examples on hmpl

[Examples](https://github.com/hmpl-lang/examples)
