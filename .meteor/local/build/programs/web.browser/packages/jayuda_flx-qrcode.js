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

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/jayuda_flx-qrcode/client/template.QrCode.js              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //

Template.__checkName("QRCode");
Template["QRCode"] = new Template("Template.QRCode", (function() {
  var view = this;
  return HTML.Raw('<div class="qr-code-container"></div>');
}));

///////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/jayuda_flx-qrcode/client/QrCode.js                       //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

Template.QRCode.onRendered(function () {
    var instance = Template.instance(),
    view = Blaze.getView(),
    data = Blaze.getData(view);

    instance.$("div").qrcode({
        "render": 'canvas',
        "size": 50,
        "text": data.text
    });

    var canvas = instance.$('div > canvas')[0];
    instance.$("div").append(convertCanvasToImage(canvas));
    instance.$("canvas").remove();

    instance.$("img").addClass("qr-code");

    if (instance.data.size !== undefined) {
        instance.$("img").css({
            'width': instance.data.size,
            'height': instance.data.size
        });
    }
});

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jayuda:flx-qrcode");

})();
