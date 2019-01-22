//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package['templating-runtime'].Template;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var flxautocomplete, initQuery, query, filter, results;

(function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/jayuda_flx-autocomplete/client/flxautocomplete.js                   //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
/**
 * Generated from flexurio tools
 * Flexurio By Pamungkas Jayuda yulius.jayuda@gmail.com / +628119003077
 */


flxautocomplete = {};
flxautocomplete.enableLogging = false;

var log = function (level, message) {
    if (flxautocomplete.enableLogging)
        console.log('flxautocomplete - ' + level + ' - ' + message);
};

var logObj = function (obj) {
    if (flxautocomplete.enableLogging)
        console.dir(obj);
};

/**
 * Run a database query to find all objects and populate the autocomplete box
 * @param config
 */
flxautocomplete.autocomplete = function (config) {
    if (typeof(config) === 'undefined'){
        log('ERROR', 'Missing required config parameter in autocompleter()');
        return
    }

    // Build the query
    initQuery = {};
    let dataOR = [];
    let dataNamaKolom = config['field'];
    let namaKolom = '';
    let dicari = '';
    let objectOR = {};

    for (var i = 0; i < dataNamaKolom.length; i++) {
        namaKolom = dataNamaKolom[i];
        dicari = ".*" + $(config['element']).val() + ".*";
        objectOR = {};
        objectOR[namaKolom] = {$regex:dicari,$options: 'i'}
        dataOR.push(objectOR);

    }
    initQuery['$or'] = dataOR;

    if (typeof(config['filter']) === 'undefined')
        query = initQuery;
    else
        query = mergeObjects(initQuery, config['filter']);
    log('DEBUG', 'Query object: ');
    logObj(query);

    // Build filtering
    filter = {};
    filter['limit'] = config['limit'];
    filter['sort'] = config['sort'];
    filter['fields'] = config['fields'];

    log('DEBUG', 'Filter object: ');
    logObj(filter);

    // Set session biar subscribtions jalan duluan
    Session.set('oOPTIONS_'+config['name'], filter);
    Session.set('oFILTERS_'+config['name'], query);

    // Find all results
    results = config['collection'].find(query, filter).fetch();
    log('DEBUG', 'Results object: ');
    logObj(results);

    Session.set(config['name'], results);
};

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
var mergeObjects = function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

//////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jayuda:flx-autocomplete", {
  flxautocomplete: flxautocomplete
});

})();
