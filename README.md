# unix-pipe

Execute with Node.js a list of defined processes and pipe the outputs of each
one to the next one in the definition.

Returns a Transform Stream to which you pipe in the input you want to pass
through the processes pipeline and which pipes out the output of the pipeline.

## Current problem I'm solving

If you check the code you'll notice this is still in an unfinished state.

Sadly I've come across a roadblock on what I can do about this.  If you've an
idea on how to solve this please do open an issue or PR about this :smile:

The part of the process I haven't figured out is marked by an `X`
[Mermaid flowchart](http://knsv.github.io/mermaid/live_editor/#/view/Z3JhcGggVEQKCnNbc3RyZWFtIGlucHV0XQpmW3N0cmVhbSBvdXRwdXRdCnRbdHJhbnNmb3JtIHN0cmVhbV0KcFtwcm9jZXNzZXMgcGlwZWxpbmVdCgpzIC0tPiB0CnQgLS1YLS0-IHAKcCAtLVgtLT4gdAp0IC0tPiBm)

The reason that's hard to figure out is because the input to the transform
stream is a block, but the input the transform's gotta pass to the pipeline is a
stream not a block.  Look at the code and you'll see what I mean.

If you are actually interested in helping me out with this one let me know so I
can provide all the info you need, in case you are able to solve it  :smiley:

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
