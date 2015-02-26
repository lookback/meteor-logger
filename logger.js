var loggly = Npm.require('loggly');

/**
  @desc Gives us log levels that will be used with loggly.
        E.g. calling MyLogger.info('Merge complete', 'Processing') will
        log the message 'Merge complete' with the log level 'info' and the tag
        'Processing' to loggly or whatever logger you are using.

  @param {(function|array)} loggers - the function or array of functions to do the logging.
  @return {object} - Logging methods for each log level
*/
function attachLogLevels(loggers) {
  if (_.isFunction(loggers))
    loggers = [loggers];

  var levels = [
    'error',
    'warn',
    'info',
    'debug'
  ];

  return levels.reduce(function(memo, level) {
    memo[level] = function(/* arguments */) {
      // Call all loggers as:
      //  logger(level, arguments...)
      // Usually level, message, tags.
      var args = _.toArray(arguments);
      args.unshift(level);
      _.invoke(loggers, 'apply', null, args);
    };

    return memo;
  }, {});
}

/**
  @example - Logger = logger({
               loggly: {
                 logglyModuleOptions: {
                   token: 'test',
                   subdomain: 'lookback',
                   json: true,
                 },
                 baseParams: {
                   environment: 'development',
                   serverName: 'my dev env' // if you need more than the ip
                 }
               },
               local: false,
             });

             Logger.debug('Init hyperdrive', ['this-is-a-tag', 'and-another-tag']);

  @param {object} options

  @param {object} [options.loggly] - options for loggly.
  @param {object} options.loggly.logglyModuleOptions - options to init the loggly module
  @param {object} options.loggly.baseParams - key/values sent to loggly with every request.

  @param {object} [options.local] - logs everything locally, and to loggly if thats configured.
                                  useful if you need the log data immediately.

  @return {object} - Logger with log methods
*/
logger = function(options) {
  options = options || {};
  var logglyOptions = options.loggly;

  // log locally if loggly isnt enabled or if specifically requested.
  var local = options.local || !logglyOptions;

  var loggers = [];

  if (logglyOptions) {
    try {
      var logglyClient = loggly.createClient(logglyOptions.logglyModuleOptions);
      var baseParams = logglyOptions.baseParams || {};

      // Use environment name from options or default to NODE_ENV.
      baseParams.environment = baseParams.environment || process.env.NODE_ENV;

      baseParams.platform = 'site';

      loggers.push(Loggers.loggly(logglyClient, baseParams));
    } catch (e) {
      console.warn('Error creating Loggly client. No logs will be sent.');
      console.warn(e.message);
    }
  }

  if (local) {
    loggers.push(Loggers.local);
  }

  return attachLogLevels(loggers);
};
