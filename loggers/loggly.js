Loggers.loggly = function(logglyClient, baseParams) {
  baseParams = baseParams || {};

  // @desc Log a message with a level and one or more tags to loggly
  //
  // @param {string} level
  // @param {string} message
  // @param {(string|array)} [tags]
  return function log(level, message, tags) {
    if (tags && _.isString(tags))
      tags = [tags];

    var toLog = {
      message: message,
      level: level
    };

    _.extend(toLog, baseParams);

    // If the log fails for some reason (bad config, timeout or whatever)
    // at least log it to console.
    var callback = function(err) {
      if (err) {
        console.error('Error while logging', { log: toLog, tags: tags });
        console.error(err);
      }
    };

    if (tags)
      logglyClient.log(toLog, tags, callback);
    else
      logglyClient.log(toLog, callback);
  };
};
