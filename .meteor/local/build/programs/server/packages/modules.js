(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package['modules-runtime'].meteorInstall;

var require = meteorInstall({"node_modules":{"meteor":{"modules":{"server.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/modules/server.js                                                                    //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
require("./install-packages.js");
require("./process.js");
require("./reify.js");

///////////////////////////////////////////////////////////////////////////////////////////////////

},"install-packages.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/modules/install-packages.js                                                          //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
function install(name, mainModule) {
  var meteorDir = {};

  // Given a package name <name>, install a stub module in the
  // /node_modules/meteor directory called <name>.js, so that
  // require.resolve("meteor/<name>") will always return
  // /node_modules/meteor/<name>.js instead of something like
  // /node_modules/meteor/<name>/index.js, in the rare but possible event
  // that the package contains a file called index.js (#6590).

  if (typeof mainModule === "string") {
    // Set up an alias from /node_modules/meteor/<package>.js to the main
    // module, e.g. meteor/<package>/index.js.
    meteorDir[name + ".js"] = mainModule;
  } else {
    // back compat with old Meteor packages
    meteorDir[name + ".js"] = function (r, e, module) {
      module.exports = Package[name];
    };
  }

  meteorInstall({
    node_modules: {
      meteor: meteorDir
    }
  });
}

// This file will be modified during computeJsOutputFilesMap to include
// install(<name>) calls for every Meteor package.

install("meteor");
install("meteor-base");
install("npm-mongo");
install("ecmascript-runtime");
install("modules-runtime");
install("modules", "meteor/modules/server.js");
install("modern-browsers", "meteor/modern-browsers/modern.js");
install("es5-shim");
install("promise", "meteor/promise/server.js");
install("ecmascript-runtime-client", "meteor/ecmascript-runtime-client/versions.js");
install("ecmascript-runtime-server", "meteor/ecmascript-runtime-server/runtime.js");
install("babel-compiler");
install("ecmascript");
install("babel-runtime", "meteor/babel-runtime/babel-runtime.js");
install("fetch", "meteor/fetch/server.js");
install("inter-process-messaging", "meteor/inter-process-messaging/inter-process-messaging.js");
install("dynamic-import", "meteor/dynamic-import/server.js");
install("base64", "meteor/base64/base64.js");
install("ejson", "meteor/ejson/ejson.js");
install("diff-sequence", "meteor/diff-sequence/diff.js");
install("geojson-utils", "meteor/geojson-utils/main.js");
install("id-map", "meteor/id-map/id-map.js");
install("random");
install("mongo-id", "meteor/mongo-id/id.js");
install("ordered-dict", "meteor/ordered-dict/ordered_dict.js");
install("tracker");
install("minimongo", "meteor/minimongo/minimongo_server.js");
install("check", "meteor/check/match.js");
install("retry", "meteor/retry/retry.js");
install("callback-hook", "meteor/callback-hook/hook.js");
install("ddp-common");
install("reload");
install("socket-stream-client", "meteor/socket-stream-client/node.js");
install("ddp-client", "meteor/ddp-client/server/server.js");
install("underscore");
install("rate-limit", "meteor/rate-limit/rate-limit.js");
install("ddp-rate-limiter");
install("logging", "meteor/logging/logging.js");
install("routepolicy", "meteor/routepolicy/main.js");
install("boilerplate-generator", "meteor/boilerplate-generator/generator.js");
install("webapp-hashing");
install("webapp", "meteor/webapp/webapp_server.js");
install("ddp-server");
install("ddp");
install("allow-deny");
install("mongo-dev-server", "meteor/mongo-dev-server/server.js");
install("mongo-decimal", "meteor/mongo-decimal/decimal.js");
install("binary-heap", "meteor/binary-heap/binary-heap.js");
install("mongo");
install("blaze-html-templates");
install("reactive-var");
install("jquery");
install("standard-minifier-css");
install("standard-minifier-js");
install("accounts-base", "meteor/accounts-base/server_main.js");
install("npm-bcrypt", "meteor/npm-bcrypt/wrapper.js");
install("sha");
install("srp");
install("email");
install("accounts-password");
install("alanning:roles");
install("dapearce:material-icons");
install("coffeescript");
install("eluck:accounts-lockout");
install("observe-sequence");
install("deps");
install("htmljs");
install("blaze");
install("ui");
install("spacebars");
install("templating-compiler");
install("templating-runtime");
install("templating");
install("iron:core");
install("iron:dynamic-template");
install("iron:layout");
install("iron:url");
install("iron:middleware-stack");
install("iron:location");
install("reactive-dict", "meteor/reactive-dict/migration.js");
install("iron:controller");
install("iron:router");
install("jeremy:selectize");
install("jparker:crypto-core");
install("jparker:crypto-base64");
install("jparker:crypto-md5");
install("jparker:crypto-evpkdf");
install("jparker:crypto-cipher-core");
install("jparker:crypto-padding");
install("jparker:crypto-mode");
install("jparker:crypto-aes");
install("lfergon:exportcsv");
install("mdg:geolocation");
install("miktam:api-password");
install("mizzao:timesync");
install("session");
install("mrt:flash-messages");
install("percolate:paginated-subscription");
install("service-configuration");
install("standard-minifiers");
install("fourseven:scss");
install("momentjs:moment");
install("localstorage");
install("url", "meteor/url/url_server.js");
install("oauth");
install("accounts-oauth");
install("oauth2");
install("http", "meteor/http/httpcall_server.js");
install("google-oauth", "meteor/google-oauth/namespace.js");
install("google-config-ui");
install("accounts-google");
install("facebook-oauth");
install("facebook-config-ui");
install("accounts-facebook");
install("oauth1");
install("twitter-oauth");
install("twitter-config-ui");
install("accounts-twitter");
install("shell-server", "meteor/shell-server/main.js");
install("autoupdate", "meteor/autoupdate/autoupdate_server.js");
install("meteor-platform");
install("steeve:jquery-qrcode");
install("livedata");
install("jayuda:flx-qrcode");
install("chart:chart");
install("jayuda:flx-chart");
install("jayuda:flx-report");
install("jayuda:flx-comments");
install("jayuda:flx-typeahead");
install("matb33:collection-hooks");
install("jayuda:flx-jsencrypt");
install("twbs:bootstrap");
install("fezvrasta:bootstrap-material-design");
install("fullcalendar:fullcalendar");
install("simple:json-routes");
install("nimble:restivus");
install("flowkey:hotkeys");
install("jayuda:flx-autocomplete");
install("showdown");
install("meteortoys:toykit");
install("msavin:mongol");
install("hot-code-push");
install("markdown");

///////////////////////////////////////////////////////////////////////////////////////////////////

},"process.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/modules/process.js                                                                   //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
if (! global.process) {
  try {
    // The application can run `npm install process` to provide its own
    // process stub; otherwise this module will provide a partial stub.
    global.process = require("process");
  } catch (missing) {
    global.process = {};
  }
}

var proc = global.process;

if (Meteor.isServer) {
  // Make require("process") work on the server in all versions of Node.
  meteorInstall({
    node_modules: {
      "process.js": function (r, e, module) {
        module.exports = proc;
      }
    }
  });
} else {
  proc.platform = "browser";
  proc.nextTick = proc.nextTick || Meteor._setImmediate;
}

if (typeof proc.env !== "object") {
  proc.env = {};
}

var hasOwn = Object.prototype.hasOwnProperty;
for (var key in meteorEnv) {
  if (hasOwn.call(meteorEnv, key)) {
    proc.env[key] = meteorEnv[key];
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////

},"reify.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/modules/reify.js                                                                     //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
require("reify/lib/runtime").enable(
  module.constructor.prototype
);

///////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"reify":{"lib":{"runtime":{"index.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// node_modules/meteor/modules/node_modules/reify/lib/runtime/index.js                           //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
meteorInstall({"node_modules":{"@babel":{"runtime":{"package.json":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// node_modules/@babel/runtime/package.json                                                      //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////

},"helpers":{"interopRequireDefault.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// node_modules/@babel/runtime/helpers/interopRequireDefault.js                                  //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////

},"objectSpread.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// node_modules/@babel/runtime/helpers/objectSpread.js                                           //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"bcrypt":{"package.json":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// node_modules/bcrypt/package.json                                                              //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.exports = {
  "name": "bcrypt",
  "version": "0.8.7",
  "main": "./bcrypt"
};

///////////////////////////////////////////////////////////////////////////////////////////////////

},"bcrypt.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// node_modules/bcrypt/bcrypt.js                                                                 //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////

}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/modules/server.js");

/* Exports */
Package._define("modules", exports, {
  meteorInstall: meteorInstall
});

})();
