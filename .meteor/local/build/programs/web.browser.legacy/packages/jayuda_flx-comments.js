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
var flxcomments, addComments;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/jayuda_flx-comments/client/template.flxcomments.js                                    //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //

Template.__checkName("flxcomments");
Template["flxcomments"] = new Template("Template.flxcomments", (function() {
  var view = this;
  return [ HTML.Raw("<!-- Comments -->\n    "), Blaze.If(function() {
    return Spacebars.call(view.lookup("isCommentOpen"));
  }, function() {
    return [ "\n        ", HTML.A({
      class: "addComments mdi-communication-clear-all linkSubDetail glyphicon glyphicon-comment",
      id: function() {
        return Spacebars.mustache(view.lookup("_id"));
      },
      style: "position: relative;left: 5%;"
    }, "\n            Comments\n        "), "\n    " ];
  }), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isComment"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      id: function() {
        return [ "Comments", Spacebars.mustache(view.lookup("_id")) ];
      },
      style: "width: 94%;left: 3%;position: relative;"
    }, "\n            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("comments"));
    }, function() {
      return [ "\n                ", HTML.DIV({
        class: "list-group-item"
      }, "\n                    ", HTML.A({
        class: "mdi-action-account-box linkSubDetail",
        href: "#"
      }, " By\n                        : ", Blaze.View("lookup:comment_By", function() {
        return Spacebars.mustache(view.lookup("comment_By"));
      }), " at ", Blaze.View("lookup:comment_createAt", function() {
        return Spacebars.mustache(view.lookup("comment_createAt"));
      })), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), "\n                    ", HTML.P({
        class: "list-group-item-text textDetail"
      }, "\n                        ", Blaze.View("lookup:comment_text", function() {
        return Spacebars.mustache(view.lookup("comment_text"));
      }), "\n                    "), "\n                "), "\n            " ];
    }), "\n            ", HTML.FORM({
      class: "form-comments form-group has-info",
      name: function() {
        return Spacebars.mustache(view.lookup("_id"));
      }
    }, "\n                ", HTML.INPUT({
      class: "form-control floating-label",
      name: function() {
        return [ "textComments", Spacebars.mustache(view.lookup("_id")) ];
      },
      id: function() {
        return [ "textComments", Spacebars.mustache(view.lookup("_id")) ];
      },
      type: "text",
      placeholder: "Types your comments",
      style: "font-size: xx-small;"
    }), HTML.BR(), "\n            "), "\n        "), "\n        ", HTML.BR(), "\n    " ];
  }) ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/jayuda_flx-comments/client/flxcomments.js                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
/**
 * Generated from flexurio tools
 * Flexurio By Pamungkas Jayuda yulius.jayuda@gmail.com / +628119003077
 */
 Template.flxcomments.onRendered(function () {
     var instance = Template.instance(),
     view = Blaze.getView(),
     data = Blaze.getData(view);
     Session.set("isCommentOpen", data.isCommentOpen);
 });

Template.flxcomments.created = function () {
	Session.set("isComment", false);
	Session.set("isCommentOpen", true);
};

Template.flxcomments.helpers({
	isComment: function () {
		return Session.get("isComment") === this._id || Session.get("isCommentOpen");
	},
    isCommentOpen: function () {
		return !Session.get("isCommentOpen");
	}
});

Template.flxcomments.events({
	'click a.addComments': function (e,tpl) {
		e.preventDefault();
		if(Session.get("isComment") === e.currentTarget.id) {
			Session.set("isComment", null);
		} else {
			Session.set("isComment", e.currentTarget.id);
		}
	},
});


flxcomments = function (e,tpl,oCollections) {
    let idData = e.currentTarget.name;
    let textComments = tpl.$('input[id="textComments' + idData + '"]').val();
    if (textComments.length) {
        addComments(idData, textComments, oCollections);
    }
    e.target.reset();
};

addComments = function (idData, textComments, sCollections) {
    sCollections.update(idData, {
            $addToSet: {
                comments: {
                    comment_text: textComments,
                    comment_By: Meteor.user().profile.name,
                    comment_Byid: Meteor.userId(),
                    comment_createAt: new Date()
                }
            }
        },
        {validate: true});
};

////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jayuda:flx-comments", {
  flxcomments: flxcomments
});

})();
