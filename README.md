# dishook.js
A light weight discord webhook client

How to use without embed
```js
const hook = require('dishook.js');
const DisHook = new hook({
id: 'The id of the webhook' //must be a string
token: 'The token of the webhook must be a string',
});

DisHook.send('it's working');
```

With embed

```js
const hook = require('dishook.js');
const DisHook = new hook({
id: 'The id of the webhook' //must be a string
token: 'The token of the webhook must be a string',
});

DisHook.send({
title: 'some cool title',
description: 'some description'
color: '0x00000'
});
```
