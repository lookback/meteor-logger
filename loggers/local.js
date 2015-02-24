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

  if(tags)
    console[method](message, tags);
  else
    console[method](message);
};
