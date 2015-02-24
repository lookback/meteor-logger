// This really shouldn't be part of the package because its forces the
// developer to set Meteor.settings.logging rather than initing the Logger
// any way they want.
//
// The upside is however that other packages can use the logger package
// directly so we dont have to use a wrapper package just for the config.

var settings = Meteor.settings.logging || {};

// Default to logging locally
var local = true;
if (typeof settings.local !== 'undefined')
  local = settings.local;

var loggly = settings.loggly;

Logger = logger({
  local: local,
  loggly: loggly
});
