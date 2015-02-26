Package.describe({
  name: 'lookback:logger',
  summary: 'Logger for Meteor with Loggly integration',
  git: 'https://github.com/lookback/meteor-logger',
  version: '1.1.1'
});

Npm.depends({
  'loggly': '1.0.8'
});

var where = 'server';

Package.onUse(function (api) {
  api.versionsFrom('0.9.3');
  api.use('underscore', where);

  api.addFiles([
    'loggers/loggers.js',
    'loggers/local.js',
    'loggers/loggly.js',
    'logger.js',
    'init.js'
  ]
  , where);

  api.export(['Logger', 'logger'], where);
});

Package.onTest(function(api) {
  api.use(['coffeescript', 'practicalmeteor:munit', 'lookback:logger'], where);
  api.addFiles(['tests/logger-spec.coffee'], where);
});
