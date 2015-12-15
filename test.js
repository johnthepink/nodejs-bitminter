/*
Name:           bitminter - test.js
Source & docs:  https://github.com/fvdm/nodejs-bitminter
Feedback:       https://github.com/fvdm/nodejs-bitminter/issues
License:        Unlicense (public domain)
*/

var app = require ('./');
var colorTerm = String (process.env.TERM) .match (/color$/);

var errors = 0;
var queue = [];
var next = 0;


// Setup
// set env GEOIP2WS_USERID and GEOIP2WS_LICENSE  (CI tests)
var config = {
  apikey: process.env.BITMINTER_APIKEY || null,
  timeout: process.env.BITMINTER_TIMEOUT || 5000
};

var bitminter = app (config);


function log (str) {
  var colors = {
    bold: '\u001b[1m',
    reset: '\u001b[0m',
    red: '\u001b[31m',
    green: '\u001b[32m',
    yellow: '\u001b[33m'
  };

  str = str.replace (/:([a-z]):/g, function (s, c) {
    if (!colors [c]) {
      return ':' + c + ':';
    }

    return colorTerm ? colors [c] : '';
  });

  if (colorTerm) {
    str += color.reset;
  }

  console.log (str);
}


// handle exits
process.on ('exit', function () {
  if (errors === 0) {
    log ('\n:bold:DONE, no errors.\n');
    process.exit (0);
  } else {
    log ('\n:bold:FAIL, ' + errors + ' error' + (errors > 1 ? 's' : '') + ' occurred!\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.log (err.stack);
  console.log ();
  errors++;
});

// Queue to prevent flooding
function doNext () {
  next++;
  if (queue[next]) {
    queue[next] ();
  }
}

// doTest (passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  var testErrors = [];

  if (err instanceof Error) {
    log (label + ': :bold::red:ERROR\n');
    console.dir (err, { depth: null, colors: colorTerm });
    console.log ();
    console.log (err.stack);
    console.log ();
    errors++;
  } else {
    tests.forEach (function (test) {
      if (test[1] !== true) {
        testErrors.push (test[0]);
        errors++;
      }
    });

    if (testErrors.length === 0) {
      log (label + ': :bold::green:ok');
    } else {
      log (label + ': :bold::red:failed:reset:  (' + testErrors.join (', ') + ')');
    }
  }

  doNext ();
}


// METHOD
queue.push (function () {
  doTest (null, 'module', [
    ['function type', typeof geo === 'function']
  ]);
});


queue.push (function () {
  app.pool.stats (function (err, data) {
    doTest (err, 'pool.stats', [
      ['type', data instanceof Object]
    ]);
  });
});


queue.push (function () {
  app.pool.hashrate (function (err, data) {
    doTest (err, 'pool.hashrate', [
      ['type', typeof data === 'number']
    ]);
  });
});


// Start the tests
queue[0] ();
