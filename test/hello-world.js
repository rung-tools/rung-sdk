const { create, run } = require('../dist');
const { String: Text, Color } = require('../dist/types');
const path = require('path');

function main(context) {
    const { name, age } = context.params;
    return `Hello, ${name}! You are ${age} years old!`;
}

const params = {
    // name: {
    //     default: 'visitor',
    //     description: 'Name of the user to greet',
    //     type: Text
    // },
    age: {
        default: 18,
        description: 'Age of the user',
        type: Color
    }
};

const app = create(main, { params });
app.run();

module.exports = app;