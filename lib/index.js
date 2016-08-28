'use strict';

var spawn = require('child_process').spawn;
var through2 = require('through2');

module.exports = function (processDefinitions) {
  // 1. Create processes

  var processes = processDefinitions.map(function (p) {
    return spawn(p.command, p.options || []);
  });

  // 2. Create processes stream pipeline

  processes.forEach(function (p, i, arr) {
    // Last process, we don't do anything here
    if (i === arr.length - 1) {
      return;
    }

    // Pipe process output to the next process
    p.stdout.pipe(arr[i + 1].stdin);

    // NOTE: Maybe have each input stream close once its input is done and each
    //       output stream close once its output is done.  This would close the
    //       processes.
  });

  // 3. Make Transform Stream which makes use of pipeline

  // (for ease of use)
  var entryPoint = processes[0].stdin;
  var exitPoint = processes[processes.length - 1].stdout;

  var processFunc = function (chunk, cb) {
    // TODO: should pass it to entryPoint, should listen for exitPoint
  };

  var transformStream = through2(function (chunk, enc, cb) {
    var that = this;

    processFunc(chunk, function (processed) {
      if (err) { return cb(err); }

      that.push(processed);
      cb();
    });
  });

  return transformStream;
};
