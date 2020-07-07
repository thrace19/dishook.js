# dishook.js
A light weight discord webhook client

How to use without embed
```js
const hook = require('dishook.js');
const DisHook = new hook.Client({
id: 'The id of the webhook' //must be a string
token: 'The token of the webhook must be a string',
});

DisHook.send("it's working");
```

With embed

```js
const hook = require('dishook.js');
const DisHook = new hook.Client({
id: 'The id of the webhook' //must be a string
token: 'The token of the webhook must be a string',
});

const embed = new hook.EmbedBuilder()
.setTitle('Some cool title')
.setColor('#000000')
.serDescription('some coool description');
DisHook.send(embed)
```
