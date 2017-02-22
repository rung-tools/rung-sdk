<div align="center">
  <img src="https://avatars2.githubusercontent.com/u/25955118?v=3&s=200" />
  <h1>Rung SDK</h1>
</div>

This is the _software development kit_ for writing Rung applications.

### Hello World!

```js
const { create } = require('rung-sdk');
const { String: Text } = require('rung-sdk/dist/types');

function main(context) {
    const { name } = context.params;
    return `Hello, ${name}!`;
}

const params = {
    name: {
        default: 'visitor',
        description: 'Name of the user to greet',
        type: Text
    }
};

module.exports = create(main, { params });
```
