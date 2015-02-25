// Local log

function toString(arr) {
  return '[' + _.invoke(arr, 'toUpperCase').join(' ') + ']';
}

Loggers.local = function(level, message, tags) {
  var method = (function() {
    switch (level) {
      case 'info': return 'info';
      case 'debug': return 'log';
      case 'warn': return 'warn';
      case 'error': return 'error';
    }
  })();

  if(tags) {
    /*
      Output tags before message in brackets, for
      easy scanning:

        [EMAILS SOMETHING-ELSE] This is my message.
    */

    var tagsArgs = _.rest(arguments, 2);

    if(!Array.isArray(tags) && tagsArgs.length) {
      tags = tagsArgs;
    }

    if(Array.isArray(tags)) {
      tags = toString(tags);
    }

    console[method](tags, message);
  } else {
    console[method](message);
  }
};
