'use strict';

var spawn = require('child_process').spawn;

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

    // Any process other than the last pipes its output to the next process
    p.stdout.pipe(arr[i + 1].stdin);

    // NOTE: Maybe do `arr[i + 1].stdin.end()`.
  });

  // 3. Make Transform Stream which makes use of pipeline

  // TODO: Don't have internet, can't make this part

  // 3.1. Setup pipes

  // First process, pipe in Transform Stream's input
  trans.pipe(processes[0].stdin);

  // Last process, pipe in output to Transform Stream
  processes[process.length - 1].stdout.pipe(trans);
};
