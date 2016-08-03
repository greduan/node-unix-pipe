# unix-pipe

Execute with Node.js a list of defined processes and pipe the outputs of each
one to the next one in the definition.

Returns a Transform Stream to which you pipe in the input you want to pass
through the processes pipeline and which pipes out the output of the pipeline.

## Installation

```
$ git clone https://github.com/greduan/node-unix-pipe.git
$ cd node-unix-pipe
$ npm i
$ npm link
```

## Usage

### CoffeeScript pipe example

```js
// Make a pipe that just formats the input through CS

var pipe = require('unix-pipe');

var coffee = pipe([
  {
    command: 'coffee',
    options: ['-s', '-p'],
  },
]);

// Pipe file through the CoffeeScript pipeline

var fs = require('fs');

var srcFile = fs.createReadStream('/some/path.cs');
var outFile = fs.createWriteStream('/some/path.js');

// srcFile -> coffee -> outFile
srcFile.pipe(coffee).pipe(outFile);
```

### Process definition format

```js
[
  {
    command: String, // Unix command name
    options: Array, // options and other to pass to the command
  },
]
```

## License

Licensed under the permissive ISC license.  Check the `LICENSE` file for further
details.
