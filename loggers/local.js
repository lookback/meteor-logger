// Local log
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
    tags = _.invoke(tags, 'toUpperCase').join(' ');
    console[method]('[' + tags + ']', message);
  } else {
    console[method](message);
  }
};
