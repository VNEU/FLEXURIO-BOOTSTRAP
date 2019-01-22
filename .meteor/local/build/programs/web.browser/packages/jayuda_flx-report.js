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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
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
var i, ikiAngkoUdu;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jayuda_flx-report/client/template.flxreport.js                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("flxreport");
Template["flxreport"] = new Template("Template.flxreport", (function() {
  var view = this;
  return [ HTML.DIV({
    class: "no-print"
  }, "\n        ", HTML.DIV({
    style: "position: fixed; bottom: 20px; right: 20px;z-index: 1000;"
  }, "\n            ", HTML.A({
    href: "#",
    class: "print btn btn-fab btn-fab-mini btn-raised shadow-z-4 shadow-z-2 animasiAtas",
    style: function() {
      return [ "background-color:", Spacebars.mustache(view.lookup("sGeneralFontBackground")), ";color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
    }
  }, HTML.Raw('<i class="material-icons">&#xE8AD;</i>')), "\n        "), "\n    "), "\n\n    ", HTML.DIV({
    class: "invoice-box"
  }, "\n        ", HTML.TABLE({
    cellpadding: "0",
    cellspacing: "0"
  }, "\n            ", HTML.TR({
    class: "top"
  }, "\n                ", HTML.TD({
    colspan: "4"
  }, "\n                    ", HTML.TABLE("\n                        ", HTML.TR("\n                            ", HTML.TD({
    class: "title"
  }, "\n                                ", Blaze._TemplateWith(function() {
    return {
      text: Spacebars.call(view.lookup("reportNumber")),
      size: Spacebars.call("90px")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("QRCode"));
  }), "\n                            "), "\n                            ", HTML.TD("\n                                ", Blaze.View("lookup:headerRight", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("headerRight")));
  }), "\n                            "), "\n                        "), "\n                    "), "\n                "), "\n            "), "\n\n            ", HTML.TR({
    class: "information"
  }, "\n                ", HTML.TD({
    colspan: "3"
  }, "\n                    ", HTML.TABLE("\n                        ", HTML.TR("\n                            ", HTML.TD("\n                                ", Blaze.View("lookup:reportCompany", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("reportCompany")));
  }), "\n                            "), "\n                            ", HTML.TD("\n                                ", HTML.CharRef({
    html: "&nbsp;",
    str: " "
  }), HTML.CharRef({
    html: "&nbsp;",
    str: " "
  }), HTML.CharRef({
    html: "&nbsp;",
    str: " "
  }), HTML.CharRef({
    html: "&nbsp;",
    str: " "
  }), "\n                            "), "\n                            ", HTML.TD({
    style: "text-align: right"
  }, "\n                                ", Blaze.View("lookup:reportTo", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("reportTo")));
  }), "\n                            "), "\n                        "), "\n                    "), "\n                "), "\n            "), "\n        "), "\n        ", HTML.TABLE({
    cellpadding: "0",
    cellspacing: "0",
    style: "border:2px solid black !important;"
  }, "\n            ", HTML.TR({
    class: "heading",
    style: "background-color: dimgray;"
  }, "\n                ", HTML.TD({
    style: "text-align: left;"
  }, "\n                    ITEM PRODUCTS\n                "), "\n                ", HTML.TD({
    style: "text-align: right;"
  }, "\n                    QTY\n                "), "\n                ", HTML.TD({
    style: "text-align: right;"
  }, "\n                    PRICE\n                "), "\n                ", HTML.TD({
    style: "text-align: right;"
  }, "\n                    TOTAL\n                "), "\n            "), "\n\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("sData"));
  }, function() {
    return [ "\n                ", HTML.TR({
      class: "item"
    }, "\n                    ", Blaze.View("lookup:DATA", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("DATA")));
    }), "\n                "), "\n            " ];
  }), "\n\n\n\n            ", HTML.TR({
    class: "total"
  }, "\n                ", HTML.TD({
    colspan: "4",
    style: "text-align: right;"
  }, "\n                    ", Blaze.View("lookup:totalvalue", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("totalvalue")));
  }), "\n                "), "\n            "), "\n        "), "\n        ", HTML.TABLE({
    cellpadding: "0",
    cellspacing: "0"
  }, "\n            ", HTML.TR({
    class: "top"
  }, "\n                ", HTML.TD({
    colspan: "2"
  }, "\n                    ", Blaze.View("lookup:reportFootnote", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("reportFootnote")));
  }), "\n                "), "\n            "), "\n\n            ", HTML.TR({
    class: "information"
  }, "\n                ", HTML.TD({
    colspan: "2"
  }, "\n                    ", HTML.TABLE("\n                        ", HTML.TR("\n                            ", HTML.TD("\n                                ", Blaze.View("lookup:ttdleft", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("ttdleft")));
  }), "\n                            "), "\n                            ", HTML.TD("\n                                ", Blaze.View("lookup:ttdright", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("ttdright")));
  }), "\n                            "), "\n                        "), "\n                    "), "\n                "), "\n            "), "\n        "), "\n\n    ") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jayuda_flx-report/client/flxreport.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**
 * Created by YN. Pamungkas Jayuda ~ email:yulius.jayuda@gmail.com on 8/25/16.
 */

var iKolom = 0;
var data = [];

Template.flxreport.created = function () {
	subscribtion(Session.get("reportCollections"), 1000000);
	iKolom = 0;
	data = [];
	setTimeout(function() {
		window.print();
	}, 2000);

};
Template.flxreport.helpers({
	separator: function () {
		return Session.get("separator");
	},
	ttdleft: function () {
		return Session.get("ttdleft");
	},
	ttdright: function () {
		return Session.get("ttdright");
	},
	reportTo: function () {
		return Session.get("reportTo");
	},
	headerRight: function () {
		return Session.get("headerRight");
	},
	reportCompany: function () {
		return Session.get("reportCompany");
	},
	totalvalue: function () {
		return Session.get("totalvalue");
	},
	reportFootnote: function () {
		return Session.get("reportFootnote");
	},
	reportNama: function () {
		return Session.get("reportNama");
	},
	reportNumber: function () {
		return Session.get("reportNumber");
	},
	created: function () {
		return new Date().toISOString().substring(0, 11);
	},
	colSpan: function(){
		return iKolom-1;
	},
	sKolom: function () {
		var dataKolomNew = Session.get("reportKolom");
		return dataKolomNew;
	},
	sData: function () {
		var namaKolom = "";
		var DataColl = Session.get("reportCollectionsAll");

		DataColl.forEach(function (obj){
			var tdData = "";
			var reportKolom = Session.get("reportKolom");
			var nilaiData = "";
			for (i = 0; i < reportKolom.length; i++) {
				namaKolom = reportKolom[i].fields;
				nilaiData = "";
				if(ikiAngkoUdu(obj[namaKolom])) {
					nilaiData = parseInt(obj[namaKolom]).toLocaleString();
				} else {
					nilaiData = obj[namaKolom];
				}
				tdData = tdData + "<td>" + nilaiData + "</td>";
			}
			data.push({"DATA":tdData});
		});
		return data;
	},
	spacer:function () {
		var tdData = "";
		for (i = 0; i < iKolom-2; i++) {
			tdData = tdData + "<td></td>";
		}
		return tdData;
	},
	logo: function () {
		return sLogo;
	},
	sHeaderBackground: function () {
		return sHeaderBackground;
	},

});

Template.flxreport.events({
	'click a.print': function (e,tpl) {
		e.preventDefault();
		window.print();
	},
});

ikiAngkoUdu = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jayuda:flx-report");

})();
