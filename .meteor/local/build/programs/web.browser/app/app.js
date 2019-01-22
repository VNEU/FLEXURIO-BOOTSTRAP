var require = meteorInstall({"lib":{"template.moduleumum.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/template.moduleumum.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("progressbar");
Template["progressbar"] = new Template("Template.progressbar", (function() {
  var view = this;
  return HTML.Raw('<div class="progress progress-striped active">\n        <div class="progress-bar progress-bar-info" style="width: 0%;position: fixed;height: 5px;top:50px;z-index: 2001;"></div>\n    </div>');
}));

Template.__checkName("flashTemplates");
Template["flashTemplates"] = new Template("Template.flashTemplates", (function() {
  var view = this;
  return HTML.DIV({
    class: "flash"
  }, "\n        ", Spacebars.include(view.lookupTemplate("flashMessages")), "\n    ");
}));

Template.__checkName("blockBackground");
Template["blockBackground"] = new Template("Template.blockBackground", (function() {
  var view = this;
  return HTML.Raw('<div class="animasiAtas jumbotron" style="position: fixed;top: 0px;left: 0px;width: 100%;height: 100%;z-index: 9999;background: url(/images/background.svg); -webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;width: 100%;height: 100%;">\n    </div>\n    <a href="#" class="cancel btn btn-fab btn-raised shadow-z-4 shadow-z-2 animasiAtas" data-ripple-color="#F0F0F0" style="z-index: 10000;position: fixed;top: 23px;right: 20px;background-color:transparent;color:red;"><i class="material-icons">&#xE14C;</i></a>');
}));

Template.__checkName("blockModals");
Template["blockModals"] = new Template("Template.blockModals", (function() {
  var view = this;
  return HTML.Raw('<div class="animasiAtas jumbotron" style="position: fixed;top: 0px;left: 0px;width: 100%;height: 100%;z-index: 9999;background-color: white; -webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;width: 100%;height: 100%;">\n    </div>\n    <a href="#" class="cancel btn btn-fab btn-raised shadow-z-4 shadow-z-2 animasiAtas" data-ripple-color="#F0F0F0" style="z-index: 10000;position: fixed;top: 23px;right: 20px;background-color:transparent;color:red;"><i class="material-icons">&#xE14C;</i></a>');
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"collections.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/collections.js                                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
MENU = new Mongo.Collection('menu');
MENUGROUP = new Mongo.Collection('menuGroup');
MENUAUTH = new Mongo.Collection('menuAuth');
MEMBER = Meteor.users;
MESSAGE = new Mongo.Collection('message');
MESSAGEMEMBER = new Mongo.Collection('messageMember');
ACTIVITYLOGS = new Mongo.Collection('activitylogs');
PROFILEDATA = new Mongo.Collection('profileData');
WOTIPE = new Mongo.Collection('woTipe');
WOSUBTIPE = new Mongo.Collection('woSubTipe');
WOSUBTIPEDETAIL = new Mongo.Collection('woSubTipeDetail');
WO = new Mongo.Collection('wo');
APIMANAGER = new Mongo.Collection('apimanager');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"moduleumum.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/moduleumum.js                                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 0);

setSESSION = function (nama, nilai) {
  if (typeof nilai !== "boolean") {
    var nilaiBaru = hideData(nilai, UserID());
    Session.set(nama, nilaiBaru);
  } else {
    FlashMessages.sendWarning("Error, on use boolean variable !");
    Session.set(nama, nilai);
  }
};

getSESSION = function (nama) {
  var nilai;

  if (adaDATA(Session.get(nama))) {
    nilai = Session.get(nama);
    var nilaiBaru;
    nilaiBaru = showData(nilai, UserID());
  } else {
    nilaiBaru = "";
  }

  return nilaiBaru;
};

setBOOLEAN = function (nama, nilai) {
  Session.set(nama, nilai);
};

getBOOLEAN = function (nama) {
  return Session.get(nama);
};

incrementLimit = function () {
  var newLimit = Session.get('limit') + 5;
  Session.set('limit', newLimit);
};

getRoute = function (sURLNow) {
  var sRoute = sURLNow.replace(sURL, '').replace("#", '').replace('!', '');
  return sRoute;
};

isAdminActions = function (sRoute, sActions) {
  var dataActions = MENUAUTH.findOne({
    userId: UserID(),
    routerMENU: sRoute,
    authTipe: sActions
  });

  if (dataActions) {
    return true;
  } else {
    return false;
  }
};

isAdmin = function (idMenu) {
  if (adaDATA(MENUAUTH.findOne({
    userId: Meteor.userId(),
    idMENU: idMenu
  }))) {
    return true;
  } else {
    return false;
  }
};

subscribtion = function (sObject, oFilter, oOptions, iLimit) {
  return Meteor.subscribe(sObject, iLimit, oFilter, oOptions);
};

EmailUser = function () {
  return Meteor.user().emails[0].address;
};

UserName = function () {
  var user = Meteor.user();

  if (adaDATA(user)) {
    return user.profile.name;
  } else {
    return "";
  }
};

UserID = function () {
  return Meteor.userId();
};

ScrollHandler = function (sObject, oFilter, oOptions) {
  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      incrementLimit();
    }
  });
};

Scroll2Top = function () {
  $("html, body").animate({
    scrollTop: 0
  }, 600);
};

uploadFotoMember = function (idMember) {
  return {
    id: "member_" + idMember,
    directory: "pictures/memb_" + idMember,
    namefile: "member_" + idMember + ".jpg"
  };
};

SetFOTO = function (iPanjang, iLebar, sMethod, sPictHasil, sIDUser) {
  Session.set('UI_Width', iLebar);
  Session.set('UI_Height', iPanjang);
  Session.set('UI_Methods', sMethod);
  Session.set('UI_Foto', sPictHasil);
  Session.set('UI_ID', sIDUser);
};

pictProfileBackground = function (userId) {
  try {
    var foto = sBackground;
    var dataFoto = MEMBER.findOne({
      _id: userId
    });

    if (adaDATA(dataFoto)) {
      if (dataFoto.profile.fotoBackground != undefined) {
        foto = dataFoto.profile.fotoBackground;
      }
    }

    return foto;
  } catch (error) {
    return sBackground;
  }
};

pictProfile = function (userId) {
  try {
    var foto = sAvatar;
    var dataFoto = MEMBER.findOne({
      _id: userId
    });

    if (adaDATA(dataFoto)) {
      if (dataFoto.profile.fotoProfile != undefined) {
        foto = dataFoto.profile.fotoProfile;
      }
    }

    return foto;
  } catch (error) {
    return sAvatar;
  }
};

insertLogs = function (kodeACTIVITYLOGS, namaACTIVITYLOGS) {
  ACTIVITYLOGS.insert({
    kodeACTIVITYLOGS: kodeACTIVITYLOGS,
    namaACTIVITYLOGS: namaACTIVITYLOGS,
    createBy: UserName(),
    createByID: Meteor.userId()
  });
  FlashMessages.sendSuccess(namaACTIVITYLOGS);
};

FileReaderObject = {
  previewImage: function (file, callback) {
    var reader = new FileReader();

    reader.onload = function (e) {
      // check file
      if (!_.contains(FILEUPLOAD.IMG.TYPE, file.type)) {
        callback(new Meteor.Error(412, "File format not supported. Please upload .jpg or .png"));
        return;
      } // check size


      if (file.size > FILEUPLOAD.IMG.MAXSIZE) {
        callback(new Meteor.Error(412, "File is too large. 512kb size limit"));
        return;
      }

      file.result = e.target.result;
      callback(null, file);
    };

    reader.onerror = function () {
      callback(reader.error);
    };

    reader.readAsDataURL(file);
  }
};

setREPORT = function (sReportName, sReportNumber, sReportFootNote, sCollections, sBackUrl, cCollectionsInitial, aReportFilter, aReportOptions, oReportFieldDisplay) {
  Session.set("reportNama", sReportName);
  Session.set("reportKolom", oReportFieldDisplay);
  Session.set("reportCollections", sCollections);
  Session.set("reportBackUrl", sBackUrl);
  Session.set("reportCollectionsAll", cCollectionsInitial.find(aReportFilter, aReportOptions).fetch());
  Session.set("reportNumber", sReportNumber);
  Session.set("reportFootnote", sReportFootNote);
  Router.go("report");
};

SelectedTerpilih = function (elementId) {
  var elt = document.getElementById(elementId);
  if (elt.selectedIndex == -1) return null;
  return elt.options[elt.selectedIndex].text;
};

setKunci = function () {
  if (!adaDATA(Session.get('kunci'))) {
    var kunciUser = {};
    var dataMember = MEMBER.findOne({
      _id: UserID()
    });

    if (dataMember.tokenTemp !== undefined) {
      kunciUser.sTokenKey = dataMember.tokenTemp;
    } else {
      keluar();
      return;
    }

    if (dataMember.publicRSA !== undefined) {
      kunciUser.kunciHide = dataMember.publicRSA;
    } else {
      keluar();
      return;
    }

    if (dataMember.privateRSA !== undefined) {
      kunciUser.kunciShow = dataMember.privateRSA;
    } else {
      keluar();
      return;
    }

    Session.set('kunci', kunciUser);
  }
};

showData = function (data, id) {
  if (data == "") {
    return;
  }

  setKunci();
  var kunci = Session.get('kunci');
  var kunc = new JSEncrypt({
    default_key_size: 2048
  });
  kunc.setKey(kunci.kunciShow);
  return kunc.decrypt(data);
};

hideData = function (data, id) {
  if (data == "") {
    return;
  }

  setKunci();
  var kunci = Session.get('kunci');
  var kunc = new JSEncrypt({
    default_key_size: 2048
  });
  kunc.setKey(kunci.kunciHide);
  return kunc.encrypt(data);
};

keluar = function () {
  Meteor.call('resetKunci');
  Meteor.logout(function () {
    Session.set("isLogin", true);
    FlashMessages.sendError("Your RSA Key not Set, please contact systems administrator !");
    Router.go("home");
  });
};

isRoleAdmin = function (userId) {
  if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
    return true;
  } else {
    return false;
  }
};

isLockMenu = function () {
  if (Session.get("lockMenu")) {
    return "col-md-9 col-md-offset-3";
  } else {
    return "col-md-12 col-md-offset-0";
  }

  ;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/router.js                                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**
 * Flexurio Created by YN.Pamungkas Jayuda on 12/3/15.
 */
Router.plugin('dataNotFound', {
  notFoundTemplate: 'oraono'
});
Router.configure({
  notFoundTemplate: 'oraono'
});
Router.route('/', function () {
  this.render('home');
});
Router.route('/oraono', function () {
  Session.set('sURLMenu', 'oraono');
  this.render('oraono');
});
Router.route('/menu', function () {
  Session.set('sURLMenu', 'menuGroup');
  this.render('menu');
});
Router.route('/menuGroup', function () {
  Session.set('sURLMenu', 'menuGroup');
  this.render('menuGroup');
});
Router.route('/menuAuth', function () {
  Session.set('sURLMenu', 'member');
  this.render('menuAuth');
});
Router.route('/member', function () {
  Session.set('sURLMenu', 'member');
  this.render('member');
});
Router.route('/message', function () {
  Session.set('sURLMenu', 'message');
  this.render('message');
});
Router.route('/activitylogs', function () {
  Session.set('sURLMenu', 'activitylogs');
  this.render('activitylogs');
});
Router.route('/profileData', function () {
  Session.set('sURLMenu', 'profileData');
  this.render('profileData');
});
Router.route('/profile', function () {
  this.render('profile');
});
Router.route('/woTipe', function () {
  Session.set('sURLMenu', 'woTipe');
  this.render('woTipe');
});
Router.route('/woSubTipe', function () {
  Session.set('sURLMenu', 'woTipe');
  this.render('woSubTipe');
});
Router.route('/woSubTipeDetail', function () {
  Session.set('sURLMenu', 'woTipe');
  this.render('woSubTipeDetail');
});
Router.route('/wo', function () {
  Session.set('sURLMenu', 'wo');
  this.render('wo');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"client":{"views":{"core":{"template.actionListview.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.actionListview.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("actionListview");
Template["actionListview"] = new Template("Template.actionListview", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("isActionEDIT"));
  }, function() {
    return [ "\n      ", HTML.A({
      class: "editData",
      style: "color:orange;",
      "data-toggle": "tooltip",
      title: "EDIT DATA"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-pencil"
    })), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "\n   " ];
  }), "\n   ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isActionDELETE"));
  }, function() {
    return [ "\n      ", HTML.A({
      class: "deleteData",
      style: "color:red;",
      "data-toggle": "tooltip",
      title: "DELETE DATA"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-trash"
    })), "\n   " ];
  }) ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.activitylogs.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.activitylogs.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("activitylogs");
Template["activitylogs"] = new Template("Template.activitylogs", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "list-group panel panel-default headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("activitylogss"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                        ", HTML.DIV({
      class: "row-content"
    }, "\n                            ", HTML.BR(), "\n                            ", HTML.P({
      style: "font-size:large;"
    }, "\n                                ", Blaze.View("lookup:kodeACTIVITYLOGS", function() {
      return Spacebars.mustache(view.lookup("kodeACTIVITYLOGS"));
    }), "\n                            "), "\n                            ", HTML.P("\n                                ", Blaze.View("lookup:namaACTIVITYLOGS", function() {
      return Spacebars.mustache(view.lookup("namaACTIVITYLOGS"));
    }), "\n                            "), "\n\n                            ", HTML.DIV({
      class: "least-content",
      style: "top:20px;"
    }, "\n                                ", HTML.A({
      class: "deleteData",
      style: "color:red;",
      "data-toggle": "tooltip",
      title: "DELETE DATA"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-trash"
    })), "\n                            "), "\n                        "), "\n                    "), "\n\n                " ];
  }), "\n            "), "\n        "), "\n\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"apimanager.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/apimanager.html                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.apimanager.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.apimanager.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.apimanager.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("apimanager");
Template["apimanager"] = new Template("Template.apimanager", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", Spacebars.include(view.lookupTemplate("menuAdd")), "\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "list-group panel panel-default headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("apimanagers"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                        ", HTML.DIV({
      class: "row-content"
    }, "\n                            ", HTML.BR(), "\n                            ", HTML.H2("API NAME : ", Blaze.View("lookup:namaAPIMANAGER", function() {
      return Spacebars.mustache(view.lookup("namaAPIMANAGER"));
    })), "\n                            ", HTML.P("KEY : ", Blaze.View("lookup:_id", function() {
      return Spacebars.mustache(view.lookup("_id"));
    })), "\n                            ", HTML.P("TOKEN : ", Blaze.View("lookup:sTokenAPI", function() {
      return Spacebars.mustache(view.lookup("sTokenAPI"));
    })), "\n\n                            ", HTML.DIV({
      class: "least-content",
      style: "top:20px;"
    }, "\n                                ", Spacebars.include(view.lookupTemplate("actionListview")), "\n                            "), "\n                        "), "\n                    "), "\n\n\n                    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isEditing"));
    }, function() {
      return [ "\n                        ", Spacebars.include(view.lookupTemplate("blockModals")), "\n                        ", HTML.DIV({
        class: "container animasiAtas",
        style: "position:fixed;top:10%;left:10%;width:80%;z-index:10001;"
      }, "\n                            ", HTML.DIV({
        class: "col-md-12",
        style: function() {
          return [ "height:auto;max-height:", Spacebars.mustache(view.lookup("sTinggiPopUp")), "px;overflow-y:scroll;" ];
        }
      }, "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-12"
      }, "\n                                    ", HTML.LABEL({
        for: "namaEditAPIMANAGER",
        class: "control-label"
      }, "NAMA APIMANAGER"), "\n                                    ", HTML.INPUT({
        name: "namaEditAPIMANAGER",
        id: "namaEditAPIMANAGER",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("namaAPIMANAGER"));
        }
      }), "\n                                "), "\n                            "), "\n\n                            ", HTML.DIV({
        class: "pull-right"
      }, "\n                                ", HTML.A({
        class: "saveEDIT btn btn-primary",
        style: "background-color:green;color:white;"
      }, "SAVE"), "\n                            "), "\n                        "), "\n                    " ];
    }), "\n\n\n                " ];
  }), "\n            "), "\n            ", Spacebars.include(view.lookupTemplate("menuLoadMore")), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isCreating"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n            ", HTML.DIV({
      class: "container animasiAtas",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                ", HTML.DIV({
      class: "col-md-12",
      style: function() {
        return [ "height:auto;max-height:", Spacebars.mustache(view.lookup("sTinggiPopUp")), "px;overflow-y:scroll;" ];
      }
    }, "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-12"
    }, "\n                        ", HTML.LABEL({
      for: "namaAPIMANAGER",
      class: "control-label"
    }, "NAMA APIMANAGER"), "\n                        ", HTML.INPUT({
      name: "namaAPIMANAGER",
      id: "namaAPIMANAGER",
      type: "text",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                    "), "\n                "), "\n\n                ", HTML.DIV({
      class: "pull-right"
    }, "\n                    ", HTML.A({
      class: "save btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n                "), "\n            "), "\n        " ];
  }), "\n\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"editYourAvatarModal.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/editYourAvatarModal.html                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.editYourAvatarModal.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.editYourAvatarModal.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.editYourAvatarModal.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("editYourAvatarModal");
Template["editYourAvatarModal"] = new Template("Template.editYourAvatarModal", (function() {
  var view = this;
  return HTML.DIV({
    id: "editYourAvatarModal",
    "aria-hidden": "true",
    "aria-labelledby": "editYourAvatarModalLabel",
    class: "modal fade",
    role: "dialog",
    tabindex: "-1"
  }, "\n        ", HTML.DIV({
    class: "modal-dialog w-modal0"
  }, "\n            ", HTML.DIV({
    class: "modal-content modal-radius"
  }, "\n                ", HTML.Raw('<div class="modal-header">\n                    <br>\n                    <button aria-hidden="true" class="close" data-dismiss="modal" type="button">×</button>\n                </div>'), "\n\n                ", HTML.DIV({
    class: "modal-body"
  }, "\n                    ", Spacebars.include(view.lookupTemplate("editYourAvatarModalBody")), "\n                "), "\n\n                ", HTML.Raw('<a type="button" id="changeAvatarButton" class="btn pull-right" style="position: absolute;left: 10px;bottom: 0px;color: gray;">GET IMAGE</a>'), "\n                ", HTML.Raw('<label style="font-size: xx-small;position: absolute;top: 30px;left: 10px;">Get Images to add photos and drag on the photo to crop as you want</label>'), "\n                ", HTML.Raw('<div class="col-md-12 col-sm-12 error" style="position: absolute;left: 0px;top: 50px;"></div>'), "\n                ", HTML.Raw('<input type="button" id="saveAvatarButton" class="btn pull-right" value="SAVE" style="position: absolute;right:10px;bottom: 0px;border-bottom: none !important;;">'), "\n            "), "\n        "), "\n    ");
}));

Template.__checkName("editYourAvatarModalBody");
Template["editYourAvatarModalBody"] = new Template("Template.editYourAvatarModalBody", (function() {
  var view = this;
  return HTML.DIV({
    class: "row"
  }, "\n        ", HTML.DIV({
    class: "col-md-12",
    style: "overflow: hidden;"
  }, "\n            ", HTML.IMG({
    id: "realImage",
    src: function() {
      return Spacebars.mustache(view.lookup("image"));
    },
    class: "hide",
    alt: ""
  }), "\n            ", HTML.IMG({
    id: "avatarUserImg",
    src: function() {
      return Spacebars.mustache(view.lookup("image"));
    },
    class: "",
    alt: ""
  }), "\n\n            ", HTML.Raw('<input type="file" name="avatarFile" class="hide">'), "\n        "), "\n\n        ", HTML.DIV({
    class: "col-md-12 hide",
    style: "overflow: hidden;"
  }, "\n            ", HTML.DIV({
    id: "previewFrame",
    class: "hide",
    style: function() {
      return [ "width: ", Spacebars.mustache(view.lookup("sLebar")), "px; height: ", Spacebars.mustache(view.lookup("sTinggi")), "px;" ];
    }
  }, "\n                ", HTML.DIV({
    id: "preview",
    style: function() {
      return [ "width: ", Spacebars.mustache(view.lookup("sLebar")), "px; height: ", Spacebars.mustache(view.lookup("sTinggi")), "px;" ];
    }
  }, "\n                    ", HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("image"));
    }
  }), "\n                "), "\n             "), "\n        "), "\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"header.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/header.html                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.header.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.header.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.header.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("header");
Template["header"] = new Template("Template.header", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("isDisconnect"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "jumbotron",
      style: "z-index:10000;position:fixed;top:60px;right:80px;background-color:red;color:white;opacity:0.7;height:40px;"
    }, "\n            ", HTML.H6({
      style: "position:relative;top:-15px;"
    }, HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "Warning, Failed to connect to host server . . . ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    })), "\n        "), "\n    " ];
  }), "\n    ", HTML.DIV({
    class: "navbar navbar-fixed-top shadow-z-2 shadow-z-4",
    style: function() {
      return [ "height: 50px;background-color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";z-index: 9000" ];
    }
  }, "\n        ", HTML.DIV({
    class: "navbar-header",
    style: "position:absolute;font-size:xx-large;left: -5px;top: -2px;"
  }, "\n            ", HTML.BUTTON({
    type: "button",
    class: function() {
      return [ "navbar-toggle toggle-left ", Spacebars.mustache(view.lookup("showIcon")) ];
    },
    "data-toggle": "sidebar",
    "data-target": ".sidebar-left"
  }, "\n                ", HTML.Raw('<span class="icon-bar"></span>'), "\n                ", HTML.Raw('<span class="icon-bar"></span>'), "\n                ", HTML.Raw('<span class="icon-bar"></span>'), "\n            "), "\n        "), "\n        ", HTML.A({
    href: "#",
    class: "gohome",
    style: "font-family: 'Raleway-Thin', sans-serif;font-size: x-large;position: relative;left: 30px;top:10px;color: white;text-decoration: none;"
  }, Blaze.View("lookup:namaApp", function() {
    return Spacebars.mustache(view.lookup("namaApp"));
  })), "\n\n        ", HTML.BUTTON({
    type: "button",
    class: "create btn btn-default btn-fab btn-raised",
    style: "position: fixed; top: 23px;right: 20px;z-index: 4002;",
    "data-toggle": "sidebar",
    "data-target": ".sidebar-right"
  }, "\n            ", HTML.IMG({
    class: "img-circle btn-raised",
    style: "height: 100%; width: 100%;position: relative;top:0px;left: 0px;z-index: 4000;overflow:hidden;",
    src: function() {
      return Spacebars.mustache(view.lookup("lokasiFotoKaryawan"));
    },
    onerror: "this.onerror=null;this.src='/images/avatar.svg';"
  }), "\n        "), "\n    ") ];
}));

Template.__checkName("headerListview");
Template["headerListview"] = new Template("Template.headerListview", (function() {
  var view = this;
  return HTML.DIV({
    class: "panel-heading"
  }, "\n        ", HTML.DIV({
    class: "form-search"
  }, "\n            ", HTML.P({
    class: "mdi-action-list namaHeader"
  }, Blaze.View("lookup:namaHeader", function() {
    return Spacebars.mustache(view.lookup("namaHeader"));
  })), "\n        "), "\n    ");
}));

Template.__checkName("formDeleting");
Template["formDeleting"] = new Template("Template.formDeleting", (function() {
  var view = this;
  return HTML.DIV({
    class: "modal_formDeleting modal",
    id: "modal_formDeleting",
    name: "modal_formDeleting"
  }, "\n        ", HTML.DIV({
    class: "modal-dialog",
    role: "document"
  }, "\n            ", HTML.DIV({
    class: "modal-content"
  }, "\n                ", HTML.DIV({
    class: "modal-body"
  }, "\n                    ", HTML.DIV({
    class: "form-group label-floating has-info col-md-12"
  }, "\n                        ", HTML.H3("Are you sure delete ", Blaze.View("lookup:dataDelete", function() {
    return Spacebars.mustache(view.lookup("dataDelete"));
  }), " ?"), "\n                    "), "\n                    ", HTML.Raw('<div class="modal-footer">\n                        <a class="deleteDataOK btn" style="background-color:red;color:white;">DELETE</a>\n                    </div>'), "\n                "), "\n            "), "\n        "), "\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"loading.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/loading.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.loading.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.loading.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.loading.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("loading");
Template["loading"] = new Template("Template.loading", (function() {
  var view = this;
  return [ HTML.TABLE({
    style: "height:100%;width: 100%;margin: 0;padding: 0;border: 0;"
  }, "\n        ", HTML.TR("\n            ", HTML.TD({
    style: "vertical-align: middle;text-align: center;"
  }, "\n                ", HTML.DIV({
    class: "spinner"
  }, "\n                    ", HTML.DIV({
    class: "bounce1"
  }), "\n                    ", HTML.DIV({
    class: "bounce2"
  }), "\n                    ", HTML.DIV({
    class: "bounce3"
  }), "\n                "), "\n                ", HTML.P({
    style: "vertical-align: middle;text-align: center;font-size: xx-large;"
  }, "Umrahaji processing your request", HTML.BR(), "Please wait a\n                    momments,..."), "\n            "), "\n        "), "\n    "), "\n\n    ", Spacebars.include(view.lookupTemplate("blockModals")), HTML.Raw('\n    <div style="position:fixed;width:110%;left:5%;top:10%;z-index: 999999">\n        <h1 class="loadingText" data-content="Umrahaji">Umrahaji</h1>\n    </div>') ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"login.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/login.html                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.login.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.login.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.login.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("login");
Template["login"] = new Template("Template.login", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("blockBackground")), "\n    ", HTML.DIV({
    class: "center_page input shadow-z-6 animasiSampingKanan",
    align: "center"
  }, "\n        ", HTML.Raw("<br>"), "\n        ", HTML.DIV({
    style: function() {
      return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
    }
  }, "\n            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isLogin"));
  }, function() {
    return [ "\n                ", HTML.FORM({
      class: "login-server"
    }, "\n                    ", HTML.DIV({
      class: "form-group has-info",
      style: "width: 90%;",
      align: "left"
    }, "\n                        ", HTML.DIV({
      class: "form-group label-floating has-info"
    }, "\n                            ", HTML.LABEL({
      for: "username",
      class: "control-label",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }, "Email"), "\n                            ", HTML.INPUT({
      type: "text",
      class: "form-control",
      id: "username",
      name: "username",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }), "\n                        "), "\n                        ", HTML.DIV({
      class: "form-group label-floating has-info"
    }, "\n                            ", HTML.LABEL({
      for: "password",
      class: "control-label",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }, "Password"), "\n                            ", HTML.INPUT({
      type: "password",
      class: "form-control",
      id: "password",
      name: "password",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }), "\n                        "), "\n\n                        ", HTML.BUTTON({
      type: "submit",
      class: "btn btn-raised btn-sm navbar-left",
      style: function() {
        return [ "position:absolute;left: 20px;color:white;background-color: ", Spacebars.mustache(view.lookup("sHeaderBackground")) ];
      }
    }, "LOGIN"), "\n                        ", HTML.A({
      href: "#",
      class: "registerForm btn btn-sm navbar-left",
      style: "position:absolute;right: 30px;color:white;"
    }, "REGISTER"), "\n                        ", HTML.BR(), HTML.BR(), "\n                        ", HTML.HR(), "\n                        ", HTML.DIV({
      class: "col-md-12",
      align: "center"
    }, "\n                            ", HTML.P({
      style: "color: darkgray;font-size: small;",
      href: "#"
    }, "Atau login dg Social Media"), "\n                        "), "\n                        ", HTML.DIV({
      class: "col-md-6 col-sm-6 col-xs-6",
      align: "center"
    }, "\n                            ", HTML.A({
      id: "loginGoogle",
      class: "btn btn-fab btn-fab-mini",
      style: "color: white;background-color: white;",
      href: "#"
    }, "\n                                ", HTML.I({
      class: "mdi mdi-google-plus",
      style: "position: relative;top: 7px;color: red;"
    }), "\n                            "), HTML.BR(), "\n                        "), "\n                        ", HTML.DIV({
      class: "col-md-6 col-sm-6 col-xs-6",
      align: "center"
    }, "\n                            ", HTML.A({
      id: "loginFacebook",
      class: "btn btn-fab btn-fab-mini",
      style: "background-color: white;top: 10%;",
      href: "#"
    }, "\n                                ", HTML.I({
      class: "mdi mdi-facebook",
      style: "position: relative;top: 7px;color: dodgerblue;"
    }), "\n                            "), HTML.BR(), "\n                        "), "\n                        ", HTML.BR(), HTML.BR(), HTML.BR(), HTML.BR(), HTML.BR(), "\n                    "), "\n                "), "\n            " ];
  }, function() {
    return [ "\n                ", HTML.FORM({
      class: "register-server"
    }, "\n                    ", HTML.DIV({
      class: "form-group",
      style: "width: 90%;",
      align: "left"
    }, "\n                        ", HTML.DIV({
      class: "form-group label-floating has-info"
    }, "\n                            ", HTML.LABEL({
      for: "textFirstName",
      class: "control-label",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }, "First Name"), "\n                            ", HTML.INPUT({
      type: "text",
      class: "form-control",
      id: "textFirstName",
      name: "textFirstName",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }), "\n                        "), "\n                        ", HTML.DIV({
      class: "form-group label-floating has-info"
    }, "\n                            ", HTML.LABEL({
      for: "textLastName",
      class: "control-label",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }, "Last Name"), "\n                            ", HTML.INPUT({
      type: "text",
      class: "form-control",
      id: "textLastName",
      name: "textLastName",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }), "\n                        "), "\n\n                        ", HTML.DIV({
      class: "form-group label-floating has-info"
    }, "\n                            ", HTML.LABEL({
      for: "textEmail",
      class: "control-label",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }, "Email"), "\n                            ", HTML.INPUT({
      type: "email",
      class: "form-control",
      id: "textEmail",
      name: "textEmail",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }), "\n                        "), "\n\n                        ", HTML.DIV({
      class: "form-group label-floating has-info"
    }, "\n                            ", HTML.LABEL({
      for: "textPassword",
      class: "control-label",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }, "Password"), "\n                            ", HTML.INPUT({
      type: "password",
      class: "form-control",
      id: "textPassword",
      name: "textPassword",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }), "\n                        "), "\n                        ", HTML.DIV({
      class: "form-group label-floating has-info"
    }, "\n                            ", HTML.LABEL({
      for: "textPasswordRetype",
      class: "control-label",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }, "Retype Password"), "\n                            ", HTML.INPUT({
      type: "password",
      class: "form-control",
      id: "textPasswordRetype",
      name: "textPasswordRetype",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";" ];
      }
    }), "\n                        "), "\n\n                        ", HTML.BR(), "\n                        ", HTML.BUTTON({
      type: "submit",
      class: "btn btn-raised btn-sm navbar-left",
      style: "background-color: #15794F;color:white;"
    }, "\n                            Register\n                        "), "\n                        ", HTML.A({
      href: "#",
      class: "registerLogin btn btn-default btn-sm navbar-left",
      style: "position:absolute;right: 30px;color:white;"
    }, "LOGIN"), "\n                        ", HTML.BR(), HTML.BR(), "\n                    "), "\n                "), "\n            " ];
  }), "\n\n        "), "\n    ") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"member.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/member.html                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.member.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.member.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.member.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("member");
Template["member"] = new Template("Template.member", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", Spacebars.include(view.lookupTemplate("menuAdd")), "\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "list-group panel panel-default headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n                ", Spacebars.include(view.lookupTemplate("editYourAvatarModal")), "\n\n\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("members"));
  }, function() {
    return [ "\n\n                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                        ", HTML.DIV({
      class: "row row-content",
      style: "height: 200px;"
    }, "\n                            ", HTML.DIV({
      class: "col-md-4 col-sm-4 shadow-z-4",
      style: "overflow: hidden;"
    }, "\n                                ", HTML.A({
      class: "ubahProfile btn btn-default btn-fab btn-raised shadow-z-2",
      style: "position: absolute; top: 10px;left: 0px;z-index: 99;"
    }, "\n                                    ", HTML.IMG({
      class: "img-circle shadow-z-4 btn-raised",
      style: "height: 100%; width: 100%;position: relative;top:0px;left: 0px;z-index: 99;overflow:hidden;",
      src: function() {
        return Spacebars.mustache(view.lookup("pictProfile"));
      },
      onerror: function() {
        return [ "this.onerror=null;this.src='", Spacebars.mustache(view.lookup("sAvatar")), "';" ];
      }
    }), "\n                                "), "\n                                ", HTML.IMG({
      class: "shadow-z-4 btn-raised",
      style: "left:-30%;top:-10%;height: 110%; width: 160%;position: relative;z-index: 98;overflow:hidden;",
      src: function() {
        return Spacebars.mustache(view.lookup("pictProfileBackground"));
      },
      onerror: function() {
        return [ "this.onerror=null;this.src='", Spacebars.mustache(view.lookup("sAvatar")), "';" ];
      }
    }), "\n                            "), "\n\n                            ", HTML.DIV({
      class: "col-md-8 col-sm-8"
    }, "\n                                ", HTML.DIV({
      style: "position:relative;left:20px;"
    }, "\n                                    ", HTML.BR(), "\n                                    ", HTML.P({
      style: "font-size:x-large;font-weight:bold;"
    }, "\n                                        ", Blaze.View("lookup:profile.name", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
    }), "\n                                    "), "\n                                    ", HTML.P("\n                                        ID : ", Blaze.View("lookup:_id", function() {
      return Spacebars.mustache(view.lookup("_id"));
    }), HTML.BR(), "\n                                        EMAIL : ", Blaze.View("lookup:emailUsers", function() {
      return Spacebars.mustache(view.lookup("emailUsers"));
    }), "\n                                    "), "\n                                "), "\n                            "), "\n                            ", HTML.DIV({
      class: "least-content",
      style: "top:20px;"
    }, "\n                                ", HTML.A({
      class: "authMember",
      style: "color:blue;",
      "data-toggle": "tooltip",
      title: "AUTHENTICATION MEMBER"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-warning-sign"
    })), " ", HTML.CharRef({
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
    }), "\n                                ", Spacebars.include(view.lookupTemplate("actionListview")), "\n                            "), "\n                        "), "\n                    "), "\n\n\n                    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isEditing"));
    }, function() {
      return [ "\n                        ", Spacebars.include(view.lookupTemplate("blockModals")), "\n                        ", HTML.DIV({
        class: "container animasiAtas",
        style: "position:fixed;top:10%;left:10%;width:80%;z-index:10001;"
      }, "\n                            ", HTML.DIV({
        class: "col-md-12"
      }, "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-12"
      }, "\n                                    ", HTML.LABEL({
        for: "emailNew",
        class: "control-label"
      }, "New Email"), "\n                                    ", HTML.INPUT({
        name: "emailNew",
        id: "emailNew",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("emailUsers"));
        }
      }), "\n                                "), "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-6"
      }, "\n                                    ", HTML.LABEL({
        for: "newPassword",
        class: "control-label"
      }, "New Password"), "\n                                    ", HTML.INPUT({
        name: "newPassword",
        id: "newPassword",
        type: "text",
        class: "form-control",
        style: "font-size:larger;"
      }), "\n                                "), "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-6"
      }, "\n                                    ", HTML.LABEL({
        for: "retypePassword",
        class: "control-label"
      }, "Retype Password"), "\n                                    ", HTML.INPUT({
        name: "retypePassword",
        id: "retypePassword",
        type: "text",
        class: "form-control",
        style: "font-size:larger;"
      }), "\n                                "), "\n                            "), "\n\n                            ", HTML.DIV({
        class: "pull-right"
      }, "\n                                ", HTML.A({
        class: "saveEDIT btn btn-primary",
        style: "background-color:green;color:white;"
      }, "SAVE"), "\n                            "), "\n                        "), "\n                    " ];
    }), "\n\n\n                " ];
  }), "\n            "), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isCreating"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n            ", HTML.DIV({
      class: "container animasiAtas",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                ", HTML.DIV({
      class: "col-md-12"
    }, "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-6"
    }, "\n                        ", HTML.LABEL({
      for: "textFirstName",
      class: "control-label"
    }, "First Name"), "\n                        ", HTML.INPUT({
      type: "text",
      class: "form-control",
      id: "textFirstName",
      name: "textFirstName"
    }), "\n                    "), "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-6"
    }, "\n                        ", HTML.LABEL({
      for: "textLastName",
      class: "control-label"
    }, "Last Name"), "\n                        ", HTML.INPUT({
      type: "text",
      class: "form-control",
      id: "textLastName",
      name: "textLastName"
    }), "\n                    "), "\n\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-12"
    }, "\n                        ", HTML.LABEL({
      for: "textEmail",
      class: "control-label"
    }, "Email"), "\n                        ", HTML.INPUT({
      type: "email",
      class: "form-control",
      id: "textEmail",
      name: "textEmail"
    }), "\n                    "), "\n\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-6"
    }, "\n                        ", HTML.LABEL({
      for: "textPassword",
      class: "control-label"
    }, "Password"), "\n                        ", HTML.INPUT({
      type: "password",
      class: "form-control",
      id: "textPassword",
      name: "textPassword"
    }), "\n                    "), "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-6"
    }, "\n                        ", HTML.LABEL({
      for: "textPasswordRetype",
      class: "control-label"
    }, "Retype Password"), "\n                        ", HTML.INPUT({
      type: "password",
      class: "form-control",
      id: "textPasswordRetype",
      name: "textPasswordRetype"
    }), "\n                    "), "\n                "), "\n\n                ", HTML.DIV({
      class: "pull-right"
    }, "\n                    ", HTML.A({
      class: "save btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n                "), "\n            "), "\n        " ];
  }), "\n\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.menu.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.menu.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("menu");
Template["menu"] = new Template("Template.menu", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", Spacebars.include(view.lookupTemplate("menuAdd")), "\n        ", Spacebars.include(view.lookupTemplate("menuBack")), "\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "list-group panel panel-default headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("menus"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                        ", HTML.DIV({
      class: "row-content"
    }, "\n                            ", HTML.BR(), "\n                            ", HTML.P("\n                                ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("routerMENU"));
      },
      style: "font-size:larger;text-decoration: none;",
      class: function() {
        return [ "detailData ", Spacebars.mustache(view.lookup("iconMENU")) ];
      }
    }, "\n                                    ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), Blaze.View("lookup:namaMENU", function() {
      return Spacebars.mustache(view.lookup("namaMENU"));
    }), " / ", Blaze.View("lookup:routerMENU", function() {
      return Spacebars.mustache(view.lookup("routerMENU"));
    }), "\n                                "), "\n                            "), "\n\n                            ", HTML.DIV({
      class: "least-content",
      style: "top:20px;"
    }, "\n                                ", HTML.A({
      class: "editData",
      style: "color:orange;",
      "data-toggle": "tooltip",
      title: "EDIT DATA"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-pencil"
    })), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "\n                                ", HTML.A({
      class: "deleteData",
      style: "color:red;",
      "data-toggle": "tooltip",
      title: "DELETE DATA"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-trash"
    })), "\n                            "), "\n                        "), "\n                    "), "\n\n\n                    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isEditing"));
    }, function() {
      return [ "\n                        ", Spacebars.include(view.lookupTemplate("blockModals")), "\n                        ", HTML.DIV({
        class: "container animasiAtas",
        style: "position:fixed;top:10%;left:10%;width:80%;z-index:10001;"
      }, "\n                            ", HTML.DIV({
        class: "col-md-12"
      }, "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-12"
      }, "\n                                    ", HTML.LABEL({
        for: "namaEditMENU",
        class: "control-label"
      }, "Nama MENU"), "\n                                    ", HTML.INPUT({
        name: "namaEditMENU",
        id: "namaEditMENU",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("namaMENU"));
        }
      }), "\n                                "), "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-8"
      }, "\n                                    ", HTML.LABEL({
        for: "routerEditMENU",
        class: "control-label"
      }, "Router MENU"), "\n                                    ", HTML.INPUT({
        name: "routerEditMENU",
        id: "routerEditMENU",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("routerMENU"));
        }
      }), "\n                                "), "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-4"
      }, "\n                                    ", HTML.LABEL({
        for: "iconEditMENU",
        class: "control-label"
      }, "Icon MENU"), "\n                                    ", HTML.INPUT({
        name: "iconEditMENU",
        id: "iconEditMENU",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("iconMENU"));
        }
      }), "\n                                "), "\n\n                            "), "\n\n                            ", HTML.DIV({
        class: "pull-right"
      }, "\n                                ", HTML.A({
        class: "saveEDIT btn btn-primary",
        style: "background-color:green;color:white;"
      }, "SAVE"), "\n                            "), "\n                        "), "\n                    " ];
    }), "\n\n\n                " ];
  }), "\n            "), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isCreating"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n            ", HTML.DIV({
      class: "container animasiAtas",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                ", HTML.DIV({
      class: "col-md-12"
    }, "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-12"
    }, "\n                        ", HTML.LABEL({
      for: "namaMENU",
      class: "control-label"
    }, "Nama MENU"), "\n                        ", HTML.INPUT({
      name: "namaMENU",
      id: "namaMENU",
      type: "text",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                    "), "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-8"
    }, "\n                        ", HTML.LABEL({
      for: "routerMENU",
      class: "control-label"
    }, "Router MENU"), "\n                        ", HTML.INPUT({
      name: "routerMENU",
      id: "routerMENU",
      type: "text",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                    "), "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-4"
    }, "\n                        ", HTML.LABEL({
      for: "iconMENU",
      class: "control-label"
    }, "Icon MENU"), "\n                        ", HTML.INPUT({
      name: "iconMENU",
      id: "iconMENU",
      type: "text",
      class: "form-control",
      style: "font-size:larger;",
      value: "glyphicon glyphicon-menu-right"
    }), "\n                    "), "\n                "), "\n\n                ", HTML.DIV({
      class: "pull-right"
    }, "\n                    ", HTML.A({
      class: "save btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n                "), "\n            "), "\n        " ];
  }), "\n\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.menuAuth.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.menuAuth.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("menuAuth");
Template["menuAuth"] = new Template("Template.menuAuth", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n            ", Spacebars.include(view.lookupTemplate("headerListview")), "\n\n            ", HTML.DIV({
    class: "container animasiAtas headerApp"
  }, "\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("sideMenuGroup"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group panel panel-default flexSidebar"
    }, "\n                        ", HTML.DIV({
      class: "panel-heading shadow-z-1"
    }, "\n                            ", HTML.P({
      class: function() {
        return Spacebars.mustache(view.lookup("iconMENUGROUP"));
      },
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
      }
    }, HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), Blaze.View("lookup:namaMENUGROUP", function() {
      return Spacebars.mustache(view.lookup("namaMENUGROUP"));
    })), "\n                        "), "\n                        ", HTML.UL({
      class: "nav navbar-stacked"
    }, "\n                            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("sideMenu"));
    }, function() {
      return [ "\n                                ", HTML.BR(), "\n                                ", HTML.LI({
        style: "width:96%;left:2%;"
      }, "\n                                    ", HTML.DIV({
        style: "position:relative;top:5px;",
        class: "pull-right"
      }, "\n                                        ", HTML.A({
        name: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        class: "allAuth",
        style: function() {
          return [ "color:", Spacebars.mustache(view.lookup("AllDiPilih")), ";" ];
        },
        "data-toggle": "tooltip",
        title: "AUTHENTICATION ALL"
      }, HTML.SPAN({
        class: "glyphicon glyphicon-star"
      })), " ", HTML.CharRef({
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
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), "\n\n                                        ", HTML.A({
        name: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        class: "confirmAuth",
        style: function() {
          return [ "color:", Spacebars.mustache(view.lookup("ConfirmDiPilih")), ";" ];
        },
        "data-toggle": "tooltip",
        title: "AUTHENTICATION CONFIRM DATA"
      }, HTML.SPAN({
        class: "glyphicon glyphicon-certificate"
      })), " ", HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), "\n\n                                        ", HTML.A({
        name: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        class: "printAuth",
        style: function() {
          return [ "color:", Spacebars.mustache(view.lookup("PrintDiPilih")), ";" ];
        },
        "data-toggle": "tooltip",
        title: "AUTHENTICATION PRINT DATA"
      }, HTML.SPAN({
        class: "glyphicon glyphicon-print"
      })), " ", HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), "\n                                        ", HTML.A({
        name: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        class: "downloadAuth",
        style: function() {
          return [ "color:", Spacebars.mustache(view.lookup("DownloadDiPilih")), ";" ];
        },
        "data-toggle": "tooltip",
        title: "AUTHENTICATION DOWNLOAD DATA"
      }, HTML.SPAN({
        class: "glyphicon glyphicon-download-alt"
      })), " ", HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), "\n                                        ", HTML.A({
        name: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        class: "addAuth",
        style: function() {
          return [ "color:", Spacebars.mustache(view.lookup("AddDiPilih")), ";" ];
        },
        "data-toggle": "tooltip",
        title: "AUTHENTICATION ADD DATA"
      }, HTML.SPAN({
        class: "glyphicon glyphicon-plus"
      })), " ", HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), "\n                                        ", HTML.A({
        name: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        class: "editAuth",
        style: function() {
          return [ "color:", Spacebars.mustache(view.lookup("EditDiPilih")), ";" ];
        },
        "data-toggle": "tooltip",
        title: "AUTHENTICATION EDIT DATA"
      }, HTML.SPAN({
        class: "glyphicon glyphicon-pencil"
      })), " ", HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), "\n                                        ", HTML.A({
        name: function() {
          return Spacebars.mustache(view.lookup("_id"));
        },
        class: "deleteAuth",
        style: function() {
          return [ "color:", Spacebars.mustache(view.lookup("DeleteDiPilih")), ";" ];
        },
        "data-toggle": "tooltip",
        title: "AUTHENTICATION DELETE DATA"
      }, HTML.SPAN({
        class: "glyphicon glyphicon-trash"
      })), "\n                                    "), "\n                                    ", HTML.P({
        class: function() {
          return [ "menuPilih ", Spacebars.mustache(view.lookup("iconMENU")) ];
        },
        style: function() {
          return [ "color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
        }
      }, HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), Blaze.View("lookup:namaMENU", function() {
        return Spacebars.mustache(view.lookup("namaMENU"));
      })), "\n                                "), "\n                            " ];
    }), "\n                            ", HTML.BR(), HTML.BR(), HTML.BR(), "\n                        "), "\n                    "), "\n                " ];
  }), "\n            "), "\n\n        "), "\n\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"menuFab.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/menuFab.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.menuFab.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.menuFab.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.menuFab.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("menuSearch");
Template["menuSearch"] = new Template("Template.menuSearch", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("isSearch"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      style: "position: fixed; bottom: 20px; right: 40px; width: 270px;z-index: 1000;",
      class: "animasiSampingKiri"
    }, "\n            ", HTML.DIV({
      class: "form-group label-floating has-info"
    }, "\n                ", HTML.LABEL({
      for: "searchBox",
      class: "control-label",
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
      }
    }, "Search"), "\n                ", HTML.INPUT({
      name: "searchBox",
      id: "searchBox",
      type: "text",
      class: "form-control has-info",
      style: function() {
        return [ "font-size: medium;color: ", Spacebars.mustache(view.lookup("sGeneralFont")), ";border-color: color: ", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
      }
    }), "\n            "), "\n        "), "\n    " ];
  }, function() {
    return [ "\n        ", HTML.DIV({
      style: "position: fixed; bottom: 20px; right: 20px;z-index: 1000;",
      class: "animasiAtas"
    }, "\n            ", HTML.A({
      class: "searchBtn btn btn-fab btn-fab-mini btn-raised shadow-z-4 shadow-z-2",
      style: function() {
        return [ "background-color:", Spacebars.mustache(view.lookup("sGeneralFontBackground")), ";color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
      }
    }, HTML.I({
      class: "material-icons"
    }, HTML.CharRef({
      html: "&#xE8B6;",
      str: ""
    }))), "\n        "), "\n    " ];
  });
}));

Template.__checkName("menuAdd");
Template["menuAdd"] = new Template("Template.menuAdd", (function() {
  var view = this;
  return HTML.DIV({
    style: "position: fixed; bottom: 80px; right: 20px;z-index: 1000;",
    class: "animasiAtas"
  }, "\n        ", HTML.A({
    href: "#",
    class: "create btn btn-fab btn-fab-mini btn-raised shadow-z-4 shadow-z-2",
    style: function() {
      return [ "background-color:", Spacebars.mustache(view.lookup("sGeneralFontBackground")), ";color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
    }
  }, HTML.Raw('<i class="material-icons">&#xE145;</i>')), "\n    ");
}));

Template.__checkName("menuDownload");
Template["menuDownload"] = new Template("Template.menuDownload", (function() {
  var view = this;
  return HTML.DIV({
    style: "position: fixed; bottom: 20px; right: 80px;z-index: 1000;",
    class: "animasiAtas"
  }, "\n        ", HTML.A({
    href: "#",
    class: "download btn btn-fab btn-fab-mini btn-raised shadow-z-4 shadow-z-2",
    style: function() {
      return [ "background-color:", Spacebars.mustache(view.lookup("sGeneralFontBackground")), ";color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
    }
  }, HTML.Raw('<i class="material-icons">&#xE2C0;</i>')), "\n    ");
}));

Template.__checkName("menuUpload");
Template["menuUpload"] = new Template("Template.menuUpload", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("isUpload"));
  }, function() {
    return [ "\n        ", Spacebars.include(view.lookupTemplate("blockModals")), "\n        ", HTML.DIV({
      class: "container animasiAtas",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n            ", HTML.DIV({
      class: "col-md-12"
    }, "\n                ", HTML.DIV({
      class: "input-group col-md-12"
    }, "\n                    ", HTML.INPUT({
      type: "file",
      class: "form-control col-md-12",
      id: "uploadCSV",
      accept: ".csv"
    }), "\n                "), "\n            "), "\n\n            ", HTML.DIV({
      class: "pull-right"
    }, "\n                ", HTML.A({
      class: "saveUpload btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n            "), "\n        "), "\n    " ];
  }, function() {
    return [ "\n        ", HTML.DIV({
      style: "position: fixed; bottom: 140px; right: 20px;z-index: 1000;",
      class: "animasiAtas"
    }, "\n            ", HTML.A({
      href: "#",
      class: "upload btn btn-fab btn-fab-mini btn-raised shadow-z-4 shadow-z-2",
      style: function() {
        return [ "background-color:", Spacebars.mustache(view.lookup("sGeneralFontBackground")), ";color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
      }
    }, HTML.I({
      class: "material-icons"
    }, HTML.CharRef({
      html: "&#xE2C3;",
      str: ""
    }))), "\n        "), "\n    " ];
  });
}));

Template.__checkName("menuPrint");
Template["menuPrint"] = new Template("Template.menuPrint", (function() {
  var view = this;
  return HTML.DIV({
    style: "position: fixed; bottom: 20px; right: 20px;z-index: 1000;"
  }, "\n        ", HTML.A({
    href: "#",
    class: "print btn btn-fab btn-fab-mini btn-raised shadow-z-4 shadow-z-2 animasiAtas",
    style: function() {
      return [ "background-color:", Spacebars.mustache(view.lookup("sGeneralFontBackground")), ";color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
    }
  }, HTML.Raw('<i class="material-icons">&#xE8AD;</i>')), "\n    ");
}));

Template.__checkName("menuReport");
Template["menuReport"] = new Template("Template.menuReport", (function() {
  var view = this;
  return HTML.DIV({
    style: "position: fixed; bottom: 200px; right: 20px;z-index: 1000;"
  }, "\n        ", HTML.A({
    href: "#",
    class: "report btn btn-fab btn-fab-mini btn-raised shadow-z-4 shadow-z-2 animasiAtas",
    style: function() {
      return [ "background-color:", Spacebars.mustache(view.lookup("sGeneralFontBackground")), ";color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
    }
  }, HTML.Raw('<i class="material-icons">&#xE434;</i>')), "\n    ");
}));

Template.__checkName("menuBack");
Template["menuBack"] = new Template("Template.menuBack", (function() {
  var view = this;
  return HTML.DIV({
    style: "position: fixed; bottom: 140px; right: 20px;z-index: 1000;"
  }, "\n        ", HTML.A({
    href: "#",
    class: "back btn btn-fab btn-fab-mini btn-raised shadow-z-4 shadow-z-2 animasiAtas",
    style: function() {
      return [ "background-color:", Spacebars.mustache(view.lookup("sGeneralFontBackground")), ";color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
    }
  }, HTML.Raw('<i class="material-icons">&#xE5C4;</i>')), "\n    ");
}));

Template.__checkName("menuBackBottom");
Template["menuBackBottom"] = new Template("Template.menuBackBottom", (function() {
  var view = this;
  return HTML.DIV({
    style: "position: fixed; bottom: 20px; right: 140px;z-index: 1000;"
  }, "\n        ", HTML.A({
    href: "#",
    class: "back btn btn-fab btn-fab-mini btn-raised shadow-z-4 shadow-z-2 animasiAtas",
    style: function() {
      return [ "background-color:", Spacebars.mustache(view.lookup("sGeneralFontBackground")), ";color:", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
    }
  }, HTML.Raw('<i class="material-icons">&#xE5C4;</i>')), "\n    ");
}));

Template.__checkName("menuLoadMore");
Template["menuLoadMore"] = new Template("Template.menuLoadMore", (function() {
  var view = this;
  return HTML.Raw('<a href="#" class="loadmore btn btn-fab btn-fab-mini btn-raised shadow-z-4 animasiAtas" style="background-color:transparent;color:white;position:absolute;right:50%;"><i class="material-icons">&#xE5CF;</i></a>');
}));

Template.__checkName("footNoteReport");
Template["footNoteReport"] = new Template("Template.footNoteReport", (function() {
  var view = this;
  return HTML.DIV({
    style: "position: fixed; bottom: 20px; left: 20px;z-index: 1000;"
  }, "\n        ", HTML.A({
    href: "#",
    class: "print",
    style: function() {
      return [ "color:", Spacebars.mustache(view.lookup("sHeaderBackground")), ";font-size: smaller;" ];
    }
  }, " Print By ", Blaze.View("lookup:username", function() {
    return Spacebars.mustache(view.lookup("username"));
  }), " at ", Blaze.View("lookup:datePrint", function() {
    return Spacebars.mustache(view.lookup("datePrint"));
  }), " "), "\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.menuGroup.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.menuGroup.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("menuGroup");
Template["menuGroup"] = new Template("Template.menuGroup", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", Spacebars.include(view.lookupTemplate("menuAdd")), "\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "list-group panel panel-default headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("menuGroups"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                        ", HTML.DIV({
      class: "row-content"
    }, "\n                            ", HTML.BR(), "\n                            ", HTML.P({
      class: function() {
        return Spacebars.mustache(view.lookup("iconMENUGROUP"));
      }
    }, "\n                                ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), Blaze.View("lookup:namaMENUGROUP", function() {
      return Spacebars.mustache(view.lookup("namaMENUGROUP"));
    }), "\n                            "), "\n\n                            ", HTML.DIV({
      class: "least-content",
      style: "top:20px;"
    }, "\n                                ", HTML.A({
      class: "detailData",
      style: "color:blue;",
      "data-toggle": "tooltip",
      title: "EDIT DATA"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-align-justify"
    })), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "\n                                ", Spacebars.include(view.lookupTemplate("actionListview")), "\n                            "), "\n                        "), "\n                    "), "\n\n\n                    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isEditing"));
    }, function() {
      return [ "\n                        ", Spacebars.include(view.lookupTemplate("blockModals")), "\n                        ", HTML.DIV({
        class: "container animasiAtas",
        style: "position:fixed;top:10%;left:10%;width:80%;z-index:10001;"
      }, "\n                            ", HTML.DIV({
        class: "col-md-12"
      }, "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-12"
      }, "\n                                    ", HTML.LABEL({
        for: "namaEditMENUGROUP",
        class: "control-label"
      }, "NAMA MENU GROUP"), "\n                                    ", HTML.INPUT({
        name: "namaEditMENUGROUP",
        id: "namaEditMENUGROUP",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("namaMENUGROUP"));
        }
      }), "\n                                "), "\n\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-4"
      }, "\n                                    ", HTML.LABEL({
        for: "groupLocations",
        class: "control-label"
      }, "LOCATIONS"), "\n                                    ", HTML.SELECT({
        class: "form-control",
        id: "groupLocationsEDIT",
        name: "groupLocationsEDIT"
      }, "\n                                        ", HTML.OPTION({
        value: function() {
          return Spacebars.mustache(view.lookup("locationsMENUGROUP"));
        }
      }, Blaze.View("lookup:locationsMENUGROUP", function() {
        return Spacebars.mustache(view.lookup("locationsMENUGROUP"));
      })), "\n                                        ", HTML.OPTION({
        value: "1. Top Locations"
      }, "1. Top Locations"), "\n                                        ", HTML.OPTION({
        value: "2. Middle Locations"
      }, "2. Middle Locations"), "\n                                        ", HTML.OPTION({
        value: "3. Bottom Locations"
      }, "3. Bottom Locations"), "\n                                    "), "\n                                "), "\n\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-8"
      }, "\n                                    ", HTML.LABEL({
        for: "iconEditMENUGROUP",
        class: "control-label"
      }, "ICON MENU GROUP"), "\n                                    ", HTML.INPUT({
        name: "iconEditMENUGROUP",
        id: "iconEditMENUGROUP",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("iconMENUGROUP"));
        }
      }), "\n                                "), "\n\n                            "), "\n\n                            ", HTML.DIV({
        class: "pull-right"
      }, "\n                                ", HTML.A({
        class: "saveEDIT btn btn-primary",
        style: "background-color:green;color:white;"
      }, "SAVE"), "\n                            "), "\n                        "), "\n                    " ];
    }), "\n\n\n                " ];
  }), "\n            "), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isCreating"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n            ", HTML.DIV({
      class: "container animasiAtas",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                ", HTML.DIV({
      class: "col-md-12"
    }, "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-12"
    }, "\n                        ", HTML.LABEL({
      for: "namaMENUGROUP",
      class: "control-label"
    }, "NAMA MENU GROUP"), "\n                        ", HTML.INPUT({
      name: "namaMENUGROUP",
      id: "namaMENUGROUP",
      type: "text",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                    "), "\n\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-4"
    }, "\n                        ", HTML.LABEL({
      for: "groupLocations",
      class: "control-label"
    }, "LOCATIONS"), "\n                        ", HTML.SELECT({
      class: "form-control",
      id: "groupLocations",
      name: "groupLocations"
    }, "\n                            ", HTML.OPTION({
      value: ""
    }), "\n                            ", HTML.OPTION({
      value: "1. Top Locations"
    }, "1. Top Locations"), "\n                            ", HTML.OPTION({
      value: "2. Middle Locations"
    }, "2. Middle Locations"), "\n                            ", HTML.OPTION({
      value: "3. Bottom Locations"
    }, "3. Bottom Locations"), "\n                        "), "\n                    "), "\n\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-8"
    }, "\n                        ", HTML.LABEL({
      for: "iconMENUGROUP",
      class: "control-label"
    }, "ICON MENU GROUP"), "\n                        ", HTML.INPUT({
      name: "iconMENUGROUP",
      id: "iconMENUGROUP",
      type: "text",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                    "), "\n                "), "\n\n                ", HTML.DIV({
      class: "pull-right"
    }, "\n                    ", HTML.A({
      class: "save btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n                "), "\n            "), "\n        " ];
  }), "\n\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"message.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/message.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.message.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.message.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.message.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("message");
Template["message"] = new Template("Template.message", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", Spacebars.include(view.lookupTemplate("menuAdd")), "\n\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "headerApp"
  }, "\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("messages"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group-item jumbotron"
    }, "\n                        ", HTML.LABEL({
      style: "position: absolute;right: 10px;top:6px;z-index: 200;font-size: x-small;"
    }, Blaze.View("lookup:createAt", function() {
      return Spacebars.mustache(view.lookup("createAt"));
    }), " "), "\n                        ", HTML.DIV({
      class: "least-content",
      style: "position:absolute;top:35px;right: 10px;"
    }, "\n                            ", HTML.A({
      class: "deleteData",
      style: "color:red;",
      "data-toggle": "tooltip",
      title: "DELETE DATA"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-trash"
    })), "\n                        "), "\n\n                        ", HTML.DIV({
      class: "row-content"
    }, "\n                            ", HTML.P({
      style: "font-size: medium;"
    }, "From : ", Blaze.View("lookup:createBy", function() {
      return Spacebars.mustache(view.lookup("createBy"));
    })), "\n                            ", HTML.P({
      style: "font-size: medium;"
    }, "\n                                To :\n                                ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("messagesMember"));
    }, function() {
      return [ "\n                                    ", Blaze.View("lookup:username", function() {
        return Spacebars.mustache(view.lookup("username"));
      }), ";\n                                " ];
    }), "\n                            "), "\n                            ", HTML.P({
      style: "font-size: medium; font-weight: bolder;text-transform: capitalize"
    }, "\n                                Subject : ", Blaze.View("lookup:subject", function() {
      return Spacebars.mustache(view.lookup("subject"));
    }), "\n                            "), "\n                            ", HTML.HR(), "\n                            ", HTML.P("\n                                ", Blaze.View("lookup:isiMessage", function() {
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("isiMessage")));
    }), "\n                            "), "\n                            ", HTML.HR(), "\n\n                        "), "\n                        ", Blaze._TemplateWith(function() {
      return {
        isCommentOpen: Spacebars.call(true),
        _id: Spacebars.call(view.lookup("_id")),
        comments: Spacebars.call(view.lookup("comments"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("flxcomments"));
    }), "\n                    "), "\n                " ];
  }), "\n            "), "\n            ", Spacebars.include(view.lookupTemplate("menuLoadMore")), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isCreating"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n            ", HTML.DIV({
      class: "container animasiAtas",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                ", HTML.DIV({
      class: "col-md-12",
      style: function() {
        return [ "height:auto;max-height:", Spacebars.mustache(view.lookup("sTinggiPopUp")), "px;overflow-y:scroll;" ];
      }
    }, "\n                    ", HTML.DIV({
      class: "form-group has-info col-md-12 col-sm-12"
    }, "\n                        ", HTML.LABEL({
      for: "toMessage",
      class: "control-label"
    }, "TO"), "\n                        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("penerima"));
    }, function() {
      return [ "\n                            ", HTML.LABEL({
        class: "btn btn-sm",
        style: "background-color:lightgray;color:dodgerblue;font-size: small;"
      }, Blaze.View("lookup:username", function() {
        return Spacebars.mustache(view.lookup("username"));
      }), " ", HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.CharRef({
        html: "&nbsp;",
        str: " "
      }), HTML.A({
        class: "hapusTerima",
        id: function() {
          return Spacebars.mustache(view.lookup("username"));
        },
        style: "position: relative;right: -3px;"
      }, HTML.I({
        class: "material-icons",
        style: "color: white;"
      }, HTML.CharRef({
        html: "&#xE5CD;",
        str: ""
      })))), "\n                        " ];
    }), "\n\n                        ", HTML.INPUT({
      class: "form-control",
      id: "toMessage",
      name: "toMessage",
      type: "search",
      list: "XXXX"
    }), "\n                        ", HTML.DATALIST({
      id: "XXXX"
    }, "\n                            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("datasearchBox"));
    }, function() {
      return [ "\n                                ", HTML.OPTION({
        value: function() {
          return Spacebars.mustache(view.lookup("username"));
        }
      }, Blaze.View("lookup:profile.name", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
      })), "\n                            " ];
    }), "\n                        "), "\n                    "), "\n\n                    ", HTML.DIV({
      class: "form-group has-info col-md-12 col-sm-12"
    }, "\n                        ", HTML.LABEL({
      for: "subjectMESSAGE",
      class: "control-label"
    }, "SUBJECT"), "\n                        ", HTML.INPUT({
      name: "subjectMESSAGE",
      id: "subjectMESSAGE",
      type: "text",
      class: "form-control",
      style: "font-size:larger;",
      value: function() {
        return Spacebars.mustache(view.lookup("subjectMESSAGE"));
      }
    }), "\n                    "), "\n\n                    ", HTML.DIV({
      class: "form-group has-info col-md-12 col-sm-12"
    }, "\n                        ", HTML.LABEL({
      for: "textMESSAGE",
      class: "control-label"
    }, "MESSAGE"), "\n                        ", HTML.TEXTAREA({
      name: "textMESSAGE",
      id: "textMESSAGE",
      type: "text",
      class: "form-control",
      rows: "4",
      style: "font-size:larger;"
    }), "\n                        ", HTML.LABEL({
      style: "font-size: xx-small;color: lightgray;"
    }, "*. need to be artist, you can use Markdown"), "\n                    "), "\n                "), "\n\n                ", HTML.DIV({
      class: "pull-right"
    }, "\n                    ", HTML.A({
      class: "save btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SEND MESSAGE"), "\n                "), "\n            "), "\n        " ];
  }), "\n\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"oraono.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/oraono.html                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.oraono.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.oraono.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.oraono.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("oraono");
Template["oraono"] = new Template("Template.oraono", (function() {
  var view = this;
  return [ HTML.DIV({
    style: function() {
      return [ "position: fixed;left: 0px;top: 0px;z-index: -100;display: block;background-image: url(", Spacebars.mustache(view.lookup("pictBackground")), ");-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;width: 100%;height: 100%; -webkit-filter: blur(6px);" ];
    }
  }), "\n  ", HTML.DIV({
    class: "container"
  }, "\n\n    ", HTML.DIV({
    class: "row",
    style: "position:relative;top:30%;"
  }, "\n      ", HTML.DIV({
    class: "col-md-6 col-md-offset-3 text-center"
  }, "\n        ", HTML.A({
    href: "/"
  }, HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("sAvatar"));
    }
  })), "\n        ", HTML.Raw('<h2>\n          <i class="fa fa-exclamation-triangle" style="color:red"></i>\n          Page not found <small>404 error</small></h2>'), "\n          ", HTML.Raw("<p>Well, this is embarrassing.<br></p>"), "\n          ", HTML.Raw('<p><a href="/">Click here to visit our home page</a></p>'), "\n      "), "\n\n    "), "\n  ") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.profile.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.profile.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("profile");
Template["profile"] = new Template("Template.profile", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("header")), "\n    ", Spacebars.include(view.lookupTemplate("flashTemplates")), "\n    ", Spacebars.include(view.lookupTemplate("profilebar")), "\n\n\n    ", HTML.DIV({
    class: "container-fluid profile"
  }, "\n        ", HTML.DIV({
    style: "position: relative;top:30px;width: 102%;"
  }, "\n            ", HTML.Raw("<br>"), "\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("members"));
  }, function() {
    return [ "\n                ", HTML.DIV({
      style: function() {
        return [ "position: fixed;left: 0px;top: 0px;z-index: -100;display: block;background-image: url(", Spacebars.mustache(view.lookup("pictBackground")), ");-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;width: 100%;height: 100%; -webkit-filter: blur(6px);" ];
      }
    }), "\n                ", HTML.A({
      class: "upload glyphicon glyphicon-camera btn-sm btn-raised shadow-z-2",
      id: function() {
        return Spacebars.mustache(view.lookup("_id"));
      },
      style: function() {
        return [ "color:", Spacebars.mustache(view.lookup("sHeaderBackground")), ";position: relative;top: 100px;left: 50px;z-index:1000;font-size:x-large;" ];
      },
      href: "#"
    }), "\n                ", HTML.DIV({
      style: "overflow: hidden;"
    }, "\n                    ", HTML.DIV({
      class: "row"
    }, "\n                        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isEditingUpload"));
    }, function() {
      return [ "\n                            ", HTML.Comment(" =============== Upload  ========================= "), "\n                            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n                            ", HTML.FORM({
        class: "form-upload"
      }, "\n                                ", HTML.DIV({
        class: "jumbotron pict_wall fotoPaket shadow-z-4 shadow-z-2",
        style: "width: 80%;z-index:10000;left:10%;"
      }, "\n                                    ", HTML.A({
        class: "simpanPhoto btn-raised shadow-z-4 shadow-z-2",
        style: "z-index:10;position:absolute;bottom: 10px;right: 10px;opacity:0.6;"
      }, "SAVE"), "\n                                    ", Blaze._TemplateWith(function() {
        return {
          fileTypes: Spacebars.call(".jpg"),
          formData: Spacebars.call(view.lookup("uploadData"))
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("dropzone"));
      }), "\n                                    ", HTML.DIV({
        style: "opacity: 0.4;position: absolute;top: 3px;left: 0.5px;"
      }, "\n                                        ", Blaze._TemplateWith(function() {
        return {
          fileTypes: Spacebars.call(".jpg"),
          formData: Spacebars.call(view.lookup("uploadData")),
          class: Spacebars.call("shadow-z-4 shadow-z-2")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("upload_bootstrap"));
      }), "\n                                    "), "\n                                "), "\n                            "), "\n                        " ];
    }, function() {
      return [ "\n                            ", HTML.BR(), "\n                            ", HTML.DIV({
        class: "col-md-12 animasiAtas",
        align: "center"
      }, "\n                                ", HTML.BR(), HTML.BR(), HTML.BR(), "\n                                ", Spacebars.include(view.lookupTemplate("editYourAvatarModal")), "\n                                ", HTML.A({
        class: "profilePict"
      }, "\n                                    ", HTML.IMG({
        class: "img-circle btn-raised mdi-action-dashboard",
        style: "width:200px;-webkit-filter: drop-shadow(0px 0px 40px white);  filter: drop-shadow(0px 0px 40px white);",
        src: function() {
          return Spacebars.mustache(view.lookup("pictProfile"));
        },
        onerror: function() {
          return [ "this.onerror=null;this.src='", Spacebars.mustache(view.lookup("pictMember")), "';" ];
        }
      }), "\n                                    ", HTML.H2({
        style: "color: white;"
      }, Blaze.View("lookup:namadepan", function() {
        return Spacebars.mustache(view.lookup("namadepan"));
      }), " ", Blaze.View("lookup:namatengah", function() {
        return Spacebars.mustache(view.lookup("namatengah"));
      }), " ", Blaze.View("lookup:namabelakang", function() {
        return Spacebars.mustache(view.lookup("namabelakang"));
      })), "\n                                "), "\n                                ", HTML.BR(), HTML.BR(), HTML.BR(), HTML.BR(), "\n                            "), "\n                        " ];
    }), "\n                    "), "\n                "), "\n            " ];
  }), "\n\n            ", Spacebars.include(view.lookupTemplate("profileData")), "\n        "), "\n\n    ") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"profileData.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/profileData.html                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.profileData.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.profileData.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.profileData.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("profileData");
Template["profileData"] = new Template("Template.profileData", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", HTML.DIV({
    class: "row main col-md-12"
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "list-group panel panel-default headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n\n                ", HTML.DIV({
    class: "list-group-item"
  }, "\n                    ", HTML.DIV({
    class: "row-content"
  }, "\n                        ", HTML.Raw("<br>"), "\n                        ", HTML.P("\n                            Name : ", Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  }), "\n                        "), "\n                        ", HTML.P("\n                            Email : ", Blaze.View("lookup:emails", function() {
    return Spacebars.mustache(view.lookup("emails"));
  }), "\n                        "), "\n\n                        ", HTML.Raw('<div class="least-content" style="top:20px;">\n                            <a class="editData" style="color:orange;" data-toggle="tooltip" title="EDIT DATA"><span class="glyphicon glyphicon-pencil"></span></a> &nbsp;&nbsp;&nbsp;&nbsp;\n                        </div>'), "\n                    "), "\n                "), "\n\n\n                ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isEditingPASS"));
  }, function() {
    return [ "\n                    ", Spacebars.include(view.lookupTemplate("blockModals")), "\n                    ", HTML.DIV({
      class: "jumbotron container animasiAtas",
      style: "position:fixed;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                        ", HTML.DIV({
      class: "col-md-12"
    }, "\n                            ", HTML.DIV({
      class: "form-group label-floating has-info col-md-6"
    }, "\n                                ", HTML.LABEL({
      for: "password",
      class: "control-label"
    }, "Password"), "\n                                ", HTML.INPUT({
      name: "password",
      id: "password",
      type: "password",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                            "), "\n                            ", HTML.DIV({
      class: "form-group label-floating has-info col-md-6"
    }, "\n                                ", HTML.LABEL({
      for: "retype",
      class: "control-label"
    }, "Retype Password"), "\n                                ", HTML.INPUT({
      name: "retype",
      id: "retype",
      type: "password",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                            "), "\n                        "), "\n\n                        ", HTML.DIV({
      class: "pull-right"
    }, "\n                            ", HTML.A({
      class: "saveEDIT btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n                        "), "\n                    "), "\n                " ];
  }), "\n\n\n            "), "\n        "), "\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"profilebar.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/profilebar.html                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.profilebar.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.profilebar.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.profilebar.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("profilebar");
Template["profilebar"] = new Template("Template.profilebar", (function() {
  var view = this;
  return HTML.DIV({
    class: "col-xs-10 col-sm-5 col-md-5 sidebar sidebar-right sidebar-animate shadow-z-2 jumbotron",
    style: "z-index: 2000;"
  }, "\n        ", HTML.DIV({
    style: function() {
      return [ "position: fixed;left: 0px;top: 0px;z-index: -100;display: block;background-image: url(", Spacebars.mustache(view.lookup("pictBackground")), ");-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;width: 100%;height: 100%; -webkit-filter: blur(6px);" ];
    }
  }), "\n        ", HTML.DIV({
    class: "list-group panel panel-default profilebar",
    style: function() {
      return [ "overflow-y:hidden;height: 400px;background: url('", Spacebars.mustache(view.lookup("foto")), "') no-repeat;background-size: 100%;" ];
    }
  }, "\n            ", HTML.A({
    class: "navbar-brand namaprofile",
    href: "/profile"
  }, Blaze.View("lookup:username", function() {
    return Spacebars.mustache(view.lookup("username"));
  })), "\n        "), "\n\n        ", HTML.DIV({
    class: "list-group panel panel-default flexSidebar",
    style: "opacity: 0.8;"
  }, "\n            ", HTML.UL({
    class: "nav navbar-stacked"
  }, "\n                ", HTML.LI(HTML.A({
    class: "glyphicon glyphicon-user",
    style: function() {
      return [ "font-size: inherit;color: ", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
    },
    href: "/profile"
  }, "\n                    Profile")), "\n                ", HTML.LI(HTML.A({
    class: "glyphicon glyphicon-qrcode",
    style: function() {
      return [ "font-size: inherit;color: ", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
    },
    href: "/activitylogs"
  }, " Activity Logs")), "\n            "), "\n        "), HTML.Raw('\n\n        <div class="list-group panel panel-default flexSidebar" style="opacity: 0.8;">\n            <ul class="nav navbar-stacked">\n                <li><a class="linkLogout glyphicon glyphicon-log-out" style="font-size: inherit;color: darkred" href="">\n                    Logout</a></li>\n            </ul>\n        </div>\n        <br><br><br><br><br>\n    '));
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.report.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.report.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("report");
Template["report"] = new Template("Template.report", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("flxreport"));
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sidebar.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/sidebar.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.sidebar.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.sidebar.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.sidebar.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("sidebar");
Template["sidebar"] = new Template("Template.sidebar", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "col-xs-6 col-sm-5 col-md-4 col-lg-3 sidebar sidebar-left sidebar-animate shadow-z-2 shadow-z-4 -webkit-scrollbar jumbotron ", Spacebars.mustache(view.lookup("showIcon")), " ", Spacebars.mustache(view.lookup("animasiSide")) ];
    },
    style: "background: url(/images/body.jpg);z-index: 100;"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("sideMenuGroup"));
  }, function() {
    return [ "\n            ", HTML.DIV({
      class: "list-group panel panel-default flexSidebar"
    }, "\n                ", HTML.DIV({
      class: "panel-heading shadow-z-1"
    }, "\n                    ", HTML.P({
      class: function() {
        return Spacebars.mustache(view.lookup("iconMENUGROUP"));
      },
      style: function() {
        return [ "color: ", Spacebars.mustache(view.lookup("sGeneralFont")), ";" ];
      }
    }, HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), Blaze.View("lookup:namaMENUGROUP", function() {
      return Spacebars.mustache(view.lookup("namaMENUGROUP"));
    })), "\n                "), "\n                ", HTML.UL({
      class: "nav navbar-stacked"
    }, "\n                    ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("sideMenu"));
    }, function() {
      return [ "\n                        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("isAuthAdmin"));
      }, function() {
        return [ "\n                            ", HTML.LI(HTML.A({
          class: function() {
            return Spacebars.mustache(view.lookup("iconMENU"));
          },
          href: function() {
            return Spacebars.mustache(view.lookup("routerMENU"));
          },
          style: "text-decoration: none;"
        }, "\n                                ", HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), Blaze.View("lookup:namaMENU", function() {
          return Spacebars.mustache(view.lookup("namaMENU"));
        }), "\n                                ", HTML.SPAN({
          class: "badge",
          style: function() {
            return [ "background-color: ", Spacebars.mustache(view.lookup("sHeaderBackground")), ";color:white;" ];
          }
        }, Blaze.View("lookup:noBadge", function() {
          return Spacebars.mustache(view.lookup("noBadge"));
        })), "\n                            ")), "\n                        " ];
      }), "\n                    " ];
    }), "\n                "), "\n            "), "\n        " ];
  }), "\n\n\n        ", HTML.DIV({
    class: "list-group panel panel-default flexSidebar"
  }, "\n            ", HTML.DIV({
    style: "position: absolute;right: 0px;;z-index: 20000;"
  }, "\n                ", HTML.LABEL({
    class: "switch",
    style: "position: relative"
  }, "\n                    ", HTML.INPUT(HTML.Attrs({
    type: "checkbox",
    class: "lockMenu",
    name: "lockMenu"
  }, function() {
    return Spacebars.attrMustache(view.lookup("isLockMenu"));
  })), "\n                    ", HTML.Raw('<div class="slider round"></div>'), "\n                "), "\n            "), "\n            ", HTML.DIV({
    style: "position: absolute;right: 35px;"
  }, "\n                ", HTML.LABEL({
    style: function() {
      return [ "font-size: x-small;color: ", Spacebars.mustache(view.lookup("warnaLock")), ";" ];
    }
  }, "Lock Menu"), "\n            "), "\n        "), HTML.Raw("\n\n        <br><br><br><br><br>\n\n    "));
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utama.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/utama.html                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.utama.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.utama.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/template.utama.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("utama");
Template["utama"] = new Template("Template.utama", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("header")), "\n    ", Spacebars.include(view.lookupTemplate("flashTemplates")), "\n\n    ", HTML.DIV({
    class: "container-fluid",
    style: "position: relative;top: 41px;"
  }, "\n        ", HTML.DIV({
    class: "row main col-md-9 col-md-offset-3"
  }, "\n            ", Spacebars.include(view.lookupTemplate("sidebar")), "\n        "), "\n    "), "\n\n    ", Spacebars.include(view.lookupTemplate("profilebar")), HTML.Raw("\n    <br><br>") ];
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"actionListview.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/actionListview.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.actionListview.helpers({
  isActionEDIT: function () {
    return isAdminActions(Session.get('sURLMenu'), 'EDIT');
  },
  isActionDELETE: function () {
    return isAdminActions(Session.get('sURLMenu'), 'DELETE');
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"activitylogs.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/activitylogs.js                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 0);

Template.activitylogs.created = function () {
  Session.set('limit', 50);
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('textSearch', '');
  Session.set('namaHeader', 'ACTIVITY LOGS');
  Session.set('dataDelete', '');
  this.autorun(function () {
    subscribtion('activitylogs', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
  });
};

Template.activitylogs.onRendered(function () {
  ScrollHandler();
});
Template.activitylogs.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  activitylogss: function () {
    var textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    var oFILTERS = {
      $or: [{
        namaACTIVITYLOGS: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        kodeACTIVITYLOGS: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        _id: {
          $regex: textSearch,
          $options: 'i'
        }
      }]
    };
    var oOPTIONS = {
      sort: {
        createAt: -1
      },
      limit: Session.get('limit')
    };
    Session.set('oOPTIONS', oOPTIONS);
    Session.set('oFILTERS', oFILTERS);
    return ACTIVITYLOGS.find(oFILTERS);
  }
});
Template.activitylogs.events({
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', false);
    Session.set('isEditing', false);
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    ACTIVITYLOGS.remove(Session.get('idDeleting'));
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaACTIVITYLOGS);
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"apimanager.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/apimanager.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./apimanager.html");

Template.apimanager.created = function () {
  Session.set('limit', 5);
  Session.set('textSearch', '');
  subscribtion('apimanager', Session.get('limit'), {});
  Session.set('namaHeader', 'DATA APIMANAGER');
  Session.set('dataDelete', '');
  Session.set('isCreating', false);
  Session.set('isEditing', false);
  this.autorun(function () {
    subscribtion('apimanager', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
  });
};

Template.apimanager.onRendered(function () {
  ScrollHandler();
});
Template.apimanager.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  sTokenAPI: function () {
    return CryptoJS.AES.encrypt(this._id, sTokenKey).toString();
  },
  sTinggiPopUp: function () {
    return 0.6 * $(window).height();
  },
  isEditing: function () {
    return Session.get('idEditing') === this._id;
  },
  isCreating: function () {
    return Session.get('isCreating');
  },
  apimanagers: function () {
    var textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    var oFILTERS = {
      aktifYN: 1,
      $or: [{
        namaAPIMANAGER: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        kodeAPIMANAGER: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        _id: {
          $regex: textSearch,
          $options: 'i'
        }
      }]
    };
    var oOPTIONS = {
      sort: {
        createAt: -1
      },
      limit: Session.get('limit')
    };
    Session.set('oOPTIONS', oOPTIONS);
    Session.set('oFILTERS', oFILTERS);
    return APIMANAGER.find(oFILTERS, oOPTIONS);
  }
});
Template.apimanager.events({
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', false);
    Session.set('isEditing', false);
    Session.set('idEditing', '');
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    deleteAPIMANAGER();
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('show');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaAPIMANAGER);
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', true);
  },
  'keyup #namaAPIMANAGER': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      insertAPIMANAGER(tpl);
    }
  },
  'click a.save': function (e, tpl) {
    e.preventDefault();
    insertAPIMANAGER(tpl);
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditing', this._id);
  },
  'keyup #namaEditAPIMANAGER': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      updateAPIMANAGER(tpl);
    }
  },
  'click a.saveEDIT': function (e, tpl) {
    e.preventDefault();
    updateAPIMANAGER(tpl);
  }
});

insertAPIMANAGER = function (tpl) {
  var namaAPIMANAGER = tpl.$('input[name="namaAPIMANAGER"]').val();

  if (!adaDATA(namaAPIMANAGER)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  APIMANAGER.insert({
    namaAPIMANAGER: namaAPIMANAGER,
    aktifYN: 1,
    createByID: UserID(),
    createBy: UserName(),
    createAt: new Date()
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('isCreating', false);
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

updateAPIMANAGER = function (tpl) {
  var namaEditAPIMANAGER = tpl.$('input[name="namaEditAPIMANAGER"]').val();

  if (!adaDATA(namaEditAPIMANAGER)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  APIMANAGER.update({
    _id: Session.get('idEditing')
  }, {
    $set: {
      namaAPIMANAGER: namaEditAPIMANAGER,
      updateByID: UserID(),
      updateBy: UserName(),
      updateAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

deleteAPIMANAGER = function () {
  if (!adaDATA(Session.get('idDeleting'))) {
    FlashMessages.sendWarning('Please select data that you want to remove . . .');
    return;
  }

  APIMANAGER.update({
    _id: Session.get('idDeleting')
  }, {
    $set: {
      aktifYN: 0,
      deleteByID: UserID(),
      deleteBy: UserName(),
      deleteAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"editYourAvatarModal.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/editYourAvatarModal.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./editYourAvatarModal.html");
var x,
    // x position of crop image
y,
    // y position of crop image
width,
    // width of crop image
height,
    // height of crop image
error,
    //
saveAvatarButton,
    modal,
    realImage,
    displayImage,
    isShowCropAndButton = false;
var ratioImage = '1:1';
Template.editYourAvatarModalBody.helpers({
  image: function () {
    if (Meteor.user()) return Session.get('UI_Foto');else return sAvatar;
  },
  sLebar: function () {
    return Session.get('UI_Width');
  },
  sTinggi: function () {
    return Session.get('UI_Height');
  }
});

Template.editYourAvatarModal.rendered = function () {
  if (Session.get('UI_Width') >= Session.get('UI_Height')) {
    ratioImage = Math.ceil(Session.get('UI_Width') / Session.get('UI_Height')).toString() + ':1';
  } else {
    ratioImage = '1:' + Math.ceil(Session.get('UI_Height') / Session.get('UI_Width')).toString();
  }

  let tmpl = this; // cache the dom

  modal = $(tmpl.find('#editYourAvatarModal'));
  error = $(tmpl.find('.error'));
  saveAvatarButton = $(tmpl.find('#saveAvatarButton'));
  propSaveAvatarButton(false);
  realImage = tmpl.find('#realImage');
  modal.on('hide.bs.modal', function () {
    clear();
  });
  modal.on('show.bs.modal', function () {
    loadImage(tmpl, Session.get('UI_Foto'));
    $(function () {
      displayImage.imgAreaSelect({
        aspectRatio: ratioImage,
        handles: true,
        fadeSpeed: 200,
        onSelectChange: preview,
        parent: $('.modal-content')
      });
    });
  });
};

Template.editYourAvatarModalBody.rendered = function () {
  if (Session.get('UI_Width') >= Session.get('UI_Height')) {
    ratioImage = '1:' + Math.ceil(Session.get('UI_Width') / Session.get('UI_Height')).toString();
  } else {
    ratioImage = Math.ceil(Session.get('UI_Height') / Session.get('UI_Width')).toString() + ':1';
  }

  displayImage = $(this.find('#avatarUserImg'));
  $(function () {
    displayImage.imgAreaSelect({
      aspectRatio: ratioImage,
      handles: true,
      fadeSpeed: 200,
      onSelectChange: preview
    });
  });
};

Template.editYourAvatarModalBody.events({
  "change input[name=avatarFile]": function (evt, tmpl) {
    evt.preventDefault();
    let input = tmpl.find('input[name=avatarFile]');

    if (input.files && input.files[0]) {
      FileReaderObject.previewImage(input.files[0], function (err, file) {
        if (err) {
          error.html(createAlertDanger(err.message));
          Meteor.setTimeout(function () {
            error.html('');
          }, 5000);
        } else {
          loadImage(tmpl, file.result);
          $(function () {
            displayImage.imgAreaSelect({
              aspectRatio: ratioImage,
              handles: true,
              fadeSpeed: 200,
              onSelectChange: preview
            });
          });
        }
      });
    }
  },
  'click #changeAvatarButton': function (evt, tmp) {
    evt.preventDefault();
    tmp.find('input[name=avatarFile]').click();
  }
});
Template.editYourAvatarModal.events({
  'click #changeAvatarButton': function (evt, tmp) {
    evt.preventDefault();
    tmp.find('input[name=avatarFile]').click();
  },
  'click #saveAvatarButton': function (evt, tmp) {
    evt.preventDefault();
    processChangeAvatar(tmp);
  },
  'keypress': function (evt, tmp) {
    if (evt.charCode == 13) {
      evt.preventDefault();
      modal.modal('hide');
    }
  }
});
/**
 * FUNCTION CLASS DEFINE
 */

var processChangeAvatar = function (tmp) {
  let canvas = document.createElement("canvas");
  canvas.width = Session.get('UI_Width');
  canvas.height = Session.get('UI_Height');
  let scaleX = realImage.width / displayImage.width();
  let scaleY = realImage.height / displayImage.height();
  let ctx = canvas.getContext("2d");
  ctx.drawImage(realImage, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, Session.get('UI_Width'), Session.get('UI_Height'));
  let sMethods = Session.get('UI_Methods');
  Meteor.call(sMethods, canvas.toDataURL(), Session.get("UI_ID"), function (err, res) {
    if (err) {
      error.html(createAlertDanger(err.message));
      Meteor.setTimeout(function () {
        error.html('');
      }, 5000);
    } else {
      modal.modal('hide');
    }
  });
};

function preview(img, selection) {
  if (!selection.width || !selection.height) return;
  let scaleX = Session.get('UI_Width') / selection.width;
  let scaleY = Session.get('UI_Height') / selection.height;
  $('#preview img').css({
    width: Math.round(scaleX * img.width),
    height: Math.round(scaleY * img.height),
    marginLeft: -Math.round(scaleX * selection.x1),
    marginTop: -Math.round(scaleY * selection.y1)
  });
  x = selection.x1;
  y = selection.y1;
  width = selection.width;
  height = selection.height;

  if (!isShowCropAndButton) {
    open();
  }
}

;

function propSaveAvatarButton(bool) {
  if (saveAvatarButton) {
    saveAvatarButton.prop('disabled', !bool);
  }
}

;

function loadImage(tmp, src) {
  $(tmp.find('#avatarUserImg')).attr('src', src);
  $(tmp.find('#preview img')).attr('src', src);
  $(tmp.find('#realImage')).attr('src', src);
}

;

function open() {
  propSaveAvatarButton(true);
  $('#previewFrame').removeClass('hide');
  isShowCropAndButton = true;
}

;

function clear() {
  // hide crop area
  $('.imgareaselect-border1').parent().hide();
  $('.imgareaselect-outer').hide();
  isShowCropAndButton = false;
  $('#previewFrame').addClass('hide'); // reset input
  //http://stackoverflow.com/questions/16452699/how-to-reset-a-form-using-jquery-with-reset-method

  let inputAvatar = $('input[name=avatarFile]');
  inputAvatar.wrap('<form>').closest('form').get(0).reset();
  inputAvatar.unwrap();
}

;
/**
 * =====================================================================================================================
 * AVATAR DEFAULT BASE64
 */

AVATAR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSgBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIAAgAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APZ6ACgAoAKACgAoAKAIbi6t7Zc3M8UI9ZHC/wA6AK8GradPKI4b61eQ9FWVST9OaAL1ABQAUAFABQAUAFABQAUAFABQAUANkdIo2kkZURRlmY4AHqaAPPvEXjOaZ3g0gmKEcGcj5m+noP1+lAHHyyPNI0krtJI3JZjkn8aAGUAb9h4t1azRU89Z0XoJl3H8+v60Adn4c8V2+rSC3nT7Pdn7q5yr/Q+vt/OgDpKACgAoAKACgAoAKACgAoAKAOE+I2rOrR6ZA2FIEk2O/wDdX+v5UAcJQAUAFABQA5HaN1dGKupBVgcEEdxQB7RpF0b3S7S5b70sSs31xz+tAFygAoAKACgAoAKACgAoAKAPHvFMzT+ItQdjnEpQfRflH8qAMqgAoAKACgAoA9e8IHPhrT/+ueP1NAGxQAUAFABQAUAFABQAUAFAHi+uHOt6gf8Ap5k/9CNAFGgAoAKACgAoA9T8BXS3Hh2KMAhrdmibPfndx+DCgDo6ACgAoAKACgAoAKACgAoA8a8RRtFr+oq4IPnu2D6E5H6EUAZ1ABQAUAFABQB6p4EszaeHombIa4YzEHsDwP0AP40AdFQAUAFABQAUAFABQAUAFAHF/EPRzNCupW6AvENs2OpXsfw/kfagDz2gAoAKACgDX8LaUNX1eOCQkQoPMkx3UY4/EkCgD15VCqFUAKBgAdhQAtABQAUAFABQAUAFABQAUARzxJPBJFIMpIpRh6gjBoA8SuYJLa4lgmG2SNijD3BxQBFQAUAFAHonw2sRFp896335n2L7Kv8AiSfyoA7KgAoAKACgAoAKACgAoAKACgBCQASSAB1JoA8l8Zy28/iK6ktHWRDtyyHILBQDg0AYlABQAUAeo/D+5jm8PRwoR5kDMrr35JIP6/pQB0tABQAUAFABQAUAFABQAUAU9R1Kz06Pfe3EcQ7An5m+g6mgDzfxR4mm1dzDb7obEfwd5Pdv8KAOdoAKACgAoAnsruexuVntJWilXoVPX2PqPagD1fw3rkOs2YYFUuUH72LPIPqPagDYoAKACgAoAKAMDVPFmmafLJCzyTTISGSJc4Ppk4FAHP3nj6ZlxZ2SIf70rlv0GP50AYl74p1e7yDdtCv92EbP16/rQBiuzOxZ2LMeSSck0ANoAKACgAoAKACgB0bvG6vGzI68hlOCPxoA6HTfGGqWZCyyC6jzyJvvY9m6/nmgDrNM8Z6bd7VuN9pIe0nK/wDfQ/rigDpIZY54lkhkSSNuQyHIP40APoApazefYNKurrvFGSv+90H64oA8XJJOSSSepPegBKACgAoAKACgAoAKACgAoAKACgAoA0dG1e70i4ElrIdhPzxE/K49x/WgD13T7uO+sYLqHPlyqGAPb2oA574i3Jh0FYVIzPKqkewy38wKAPMqACgAoAKACgAoAKACgAoAKACgAoAKACgD074e3y3Oh/ZuBJasVI9VYkg/qR+FAGD8SrnzNUtrcHIii3EehY/4AUAcfQAUAFABQAUAFABQAUAFABQAUAFABQAUAdV8ObnytdeE9J4iPxGD/LNAGZ4tuRd+I76Rfuh/LH/AQF/pQBkUAFABQAUAFABQAUAFABQAUAFABQAUAFAGv4Tn+z+I7B/WTy/++gV/rQBlyuZJXdurMWP40AMoAKACgAoAKACgAoAKACgAoAKACgAoAKAJ7GXyL23m/wCeciv+RBoA/wD/2Q==";
FILEUPLOAD = {
  IMG: {
    TYPE: ["image/jpeg", "image/png"],
    MAXSIZE: 512000
  },
  // 512 kb
  DOC: []
};

validateImgBase64 = function (src) {
  if (!/^data:image\/png;base64,/i.test(src)) {
    throw new Error("Image is not decode 1");
  }

  return true;
};

createAlert = {
  'error': function (message) {
    return '<div class="alert alert-danger">' + message + '</div>';
  },
  'success': function (message) {
    return '<div class="alert alert-success">' + message + '</div>';
  },
  'alert': function (message) {
    return '<div class="alert alert-warning">' + message + '</div>';
  },
  'info': function (message) {
    return '<div class="alert alert-info">' + message + '</div>';
  },
  'default': function (message) {
    return '<div class="alert">' + message + '</div>';
  }
};

createAlertDanger = function (message) {
  return createAlert['error'](message);
};

createAlertSuccess = function (message) {
  return createAlert['success'](message);
};

createAlertInfo = function (message) {
  return createAlert['info'](message);
};
/*
 * =====================================================================================================================
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"header.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/header.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 0);
let moment;
module.link("meteor/momentjs:moment", {
  moment(v) {
    moment = v;
  }

}, 1);
module.link("./header.html");
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 2);

Template.header.created = function () {
  Blaze._allowJavascriptUrls();

  Session.set('limit', 50);
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('showMenuDept', false);
  subscribtion('memberku', {}, {}, 0);
  subscribtion('menu', {}, {}, 0);
  subscribtion('menuAuthku', {}, {}, 0);
  subscribtion('menuGroup', {}, {}, 0);
};

Template.header.helpers({
  showIcon: function () {
    var sIcon = "";

    if (getRoute(window.location.href) == "dash") {
      sIcon = "hidden-md hidden-lg";
    }

    return sIcon;
  },
  isDisconnect: function () {
    return !Meteor.status().connected;
  },
  quotes: function () {
    return moment().format("YYYY-MM-DD hh:mm:ss");
  },
  lokasiFotoKaryawan: function () {
    return pictProfile(UserID());
  },
  namaApp: function () {
    return sAPPName;
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  }
});
Template.header.events({
  'click a.gohome': function (e) {
    e.preventDefault();
    Router.go('/');
  },
  'click a.menuDept': function (e, tpl) {
    e.preventDefault();
    Session.set('showMenuDept', true);
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('showMenuDept', false);
  },
  'click a.setMenuDept': function (e, tpl) {
    e.preventDefault();
    Session.set("menuDept", e.target.id);
    Session.set('showMenuDept', false);
  },
  'click .app': function (e, tpl) {
    e.preventDefault();
    Session.set('showMenuDept', false);
  }
});
Template.headerListview.helpers({
  namaHeader: function () {
    return Session.get("namaHeader");
  }
});
Template.formDeleting.helpers({
  dataDelete: function () {
    return Session.get("dataDelete");
  }
});
globalHotkeys = new Hotkeys();
globalHotkeys.add({
  combo: ['command+shift', 'ctrl+shift'],
  description: 'ADD DATA',
  callback: function () {
    Session.set('isCreating', true);
  }
});
globalHotkeys.add({
  combo: ['esc'],
  description: 'CANCEL DATA',
  callback: function () {
    Session.set('isCreating', false);
    Session.set('isEditing', false);
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"loading.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/loading.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./loading.html");

Template.loading.rendered = function () {
  if (!Session.get('loadingSplash')) {
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.destroyed = function () {
  if (this.loading) {
    this.loading.finish();
  }
};

var message = '<p class="loading-message">Loading Message</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"login.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/login.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 0);
module.link("./login.html");
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 1);

pasangkunc = function () {
  Meteor.call('cariKunci');
};

Template.login.created = function () {
  Session.set("isLogin", true);
};

Template.login.helpers({
  sHeaderBackground: function () {
    return sHeaderBackground;
  },
  isLogin: function () {
    return Session.get("isLogin");
  }
});
Template.login.events({
  'click a.registerLogin': function (e, tpl) {
    e.preventDefault();
    Session.set("isLogin", true);
  },
  'click a.registerForm': function (e, tpl) {
    e.preventDefault();
    Session.set("isLogin", false);
  },
  'click a#loginGoogle': function (e, t) {
    e.preventDefault();
    Session.set('isPROSES', true);
    Meteor.loginWithGoogle({
      requestPermissions: ['https://picasaweb.google.com/data/', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/plus.me'],
      requestOfflineToken: 'true'
    }, function (error) {
      if (error) {} else {
        pasangkunc();
        Router.go('/');
      }
    });
  },
  'click #loginFacebook': function (event) {
    Session.set('isPROSES', true);
    Meteor.loginWithFacebook({}, function (err) {
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      } else {
        pasangkunc();
        Router.go('/');
      }
    });
  },
  'submit form.register-server': function (e, tpl) {
    e.preventDefault();
    Session.set('isPROSES', true);
    let textFirstName = tpl.$('input[name=textFirstName]').val();
    let textLastName = tpl.$('input[name=textLastName]').val();
    let textEmail = tpl.$('input[name=textEmail]').val();
    let textPassword = tpl.$('input[name=textPassword]').val();
    let textPasswordRetype = tpl.$('input[name=textPasswordRetype]').val();

    if (textPassword != textPasswordRetype) {
      FlashMessages.sendWarning('Sorry, Please retype your password corectlly !');
      return;
    }

    Accounts.createUser({
      password: textPassword,
      email: textEmail,
      profile: {
        name: textFirstName + ' ' + textLastName,
        firstName: textFirstName,
        lastName: textLastName
      }
    }, function (err) {
      if (err) {
        FlashMessages.sendWarning('Register failed, Please try again');
      } else {
        pasangkunc();
        Router.go('/');
        FlashMessages.sendSuccess('Hello ' + UserName() + ', Wellcome to ' + sAPPName);
      }
    });
  },
  'submit form.login-server': function (e, tpl) {
    e.preventDefault();
    let textEmail = tpl.$('input[name=username]').val();
    let textPassword = tpl.$('input[name=password]').val();
    Meteor.loginWithPassword(textEmail, textPassword, function (err) {
      if (err) {
        FlashMessages.sendWarning('Sorry, your username or password not valid !');
      } else {
        FlashMessages.sendSuccess('Hello ' + UserName() + ', Wellcome to ' + sAPPName);
        pasangkunc();
        Router.go('/');
      }
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"member.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/member.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 2);
module.link("./member.html");

Template.member.created = function () {
  Session.set('limit', 50);
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('textSearch', '');
  Session.set('namaHeader', 'DATA MEMBER');
  Session.set('dataDelete', '');
  Session.set('isCreating', false);
  Session.set('isEditing', false);
  SetFOTO(200, 300, 'updateFotoBackground', pictProfileBackground(""), "");
  this.autorun(function () {
    subscribtion('member', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
  });
};

Template.member.onRendered(function () {
  ScrollHandler();
});
Template.member.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  pictProfile: function () {
    return pictProfile(this._id);
  },
  pictProfileBackground: function () {
    return pictProfileBackground(this._id);
  },
  sAvatar: function () {
    return sAvatar;
  },
  emailUsers: function () {
    var emailUser = this.emails;

    if (adaDATA(emailUser)) {
      return this.emails[0].address;
    } else if (adaDATA(this.services)) {
      return this.services.google.email;
    }
  },
  isEditing: function () {
    return Session.get('idEditing') === this._id;
  },
  isCreating: function () {
    return Session.get('isCreating');
  },
  members: function () {
    var textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    var oOPTIONS = {
      sort: {
        _id: -1
      },
      limit: Session.get('limit')
    };
    var oFILTERS = {
      $or: [{
        _id: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        'profile.name': {
          $regex: textSearch,
          $options: 'i'
        }
      }]
    };
    Session.set('oOPTIONS', oOPTIONS);
    Session.set('oFILTERS', oFILTERS);
    return MEMBER.find(oFILTERS, oOPTIONS);
  }
});
Template.member.events({
  'click a.ubahProfile': function (e, tpl) {
    e.preventDefault();
    SetFOTO(400, 500, 'updateFotoBackground', pictProfileBackground(this._id), this._id);
    $('#editYourAvatarModal').modal();
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', false);
    Session.set('isEditing', false);
    Session.set('idEditing', '');
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    Meteor.call('deleteUser', Session.get("idDeleting"));
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.profile.name);
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', true);
  },
  'keyup #namaMEMBER': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      insertMEMBER(tpl);
    }
  },
  'click a.save': function (e, tpl) {
    e.preventDefault();
    insertMEMBER(tpl);
  },
  'click a.authMember': function (e, tpl) {
    e.preventDefault();
    Session.set('idMember', this._id);
    Session.set('namaMember', this.profile.name);
    Router.go("menuAuth");
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditing', this._id);
    Session.set('namaMember', this.profile.name);
    Session.set('emailEditing', this.emails[0].address);
  },
  'keyup #namaEditMEMBER': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      updateMEMBER(tpl);
    }
  },
  'click a.saveEDIT': function (e, tpl) {
    e.preventDefault();
    updateMEMBER(tpl);
  }
});

insertMEMBER = function (tpl) {
  var textFirstName = tpl.$('input[name=textFirstName]').val();
  var textLastName = tpl.$('input[name=textLastName]').val();
  var textEmail = tpl.$('input[name=textEmail]').val();
  var textPassword = tpl.$('input[name=textPassword]').val();
  var textPasswordRetype = tpl.$('input[name=textPasswordRetype]').val();

  if (textPassword != textPasswordRetype) {
    FlashMessages.sendWarning('Sorry, Please retype your password corectlly !');
    return;
  }

  if (!adaDATA(textFirstName) | !adaDATA(textLastName) | !adaDATA(textEmail)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  Meteor.call('createUserNew', textFirstName + ' ' + textLastName, textEmail, textPassword, function (err) {
    if (err == "GAGAL") {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('isCreating', false);
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
  insertLogs("CREATE ACCOUNT " + textFirstName + ' ' + textLastName, " " + UserName() + " create new user account.");
};

updateMEMBER = function (tpl) {
  var emailNew = tpl.$('input[name="emailNew"]').val();
  var newPassword = tpl.$('input[name="newPassword"]').val();
  var retypePassword = tpl.$('input[name="retypePassword"]').val();

  if (!adaDATA(emailNew) & (!adaDATA(newPassword) | !adaDATA(retypePassword))) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  if (adaDATA(newPassword) | adaDATA(retypePassword)) {
    if (newPassword !== retypePassword) {
      FlashMessages.sendWarning('Please check data change password . . .');
      return;
    }
  }

  var dataMember = MEMBER.findOne({
    'emails.address': emailNew
  });

  if (adaDATA(dataMember)) {
    if (dataMember._id != Session.get("idEditing")) {
      FlashMessages.sendWarning('Sorry, Email already use by ' + dataMember.profile.name);
    } else {
      Meteor.call('updateUserData', Session.get("idEditing"), emailNew, newPassword, function (err) {
        console.log(err);

        if (err == "GAGAL") {
          FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
        } else {
          Session.set('isCreating', false);
          FlashMessages.sendSuccess('Thanks, your data is successfully saved');
        }
      });
      Session.set('idEditing', "");
      insertLogs("UPDATE DATA MEMBER ", " " + username() + " change data email or password user " + Session.get("namaMember").toUpperCase(), "SUCCESS");
    }
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"menu.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/menu.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 0);

Template.menu.created = function () {
  Session.set('limit', 5);
  Session.set('textSearch', '');
  Session.set('namaHeader', 'DATA MENU ');
  Session.set('dataDelete', '');
  Session.set('isCreating', false);
  Session.set('isEditing', false);
};

Template.menu.onRendered(function () {
  ScrollHandler();
});
Template.menu.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  isEditing: function () {
    return Session.get('idEditing') === this._id;
  },
  isCreating: function () {
    return Session.get('isCreating');
  },
  menus: function () {
    let textSearch = '';
    let menuGroups = Session.get('groupMENU');

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    return MENU.find({
      $or: [{
        namaMENU: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        _id: {
          $regex: textSearch,
          $options: 'i'
        }
      }],
      groupMENU: menuGroups,
      aktifYN: 1
    }, {
      sort: {
        createAt: -1
      },
      limit: Session.get('limit')
    });
  }
});
Template.menu.events({
  'click a.back': function (e, tpl) {
    e.preventDefault();
    Router.go("menuGroup");
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', false);
    Session.set('isEditing', false);
    Session.set('idEditing', '');
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    deleteMENU();
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaMENU);
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    Scroll2Top();
    Session.set('isCreating', true);
  },
  'keyup #namaMENU': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      insertMENU(tpl);
    }
  },
  'click a.save': function (e, tpl) {
    e.preventDefault();
    insertMENU(tpl);
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditing', this._id);
  },
  'keyup #namaEditMENU': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      updateMENU(tpl);
    }
  },
  'click a.saveEDIT': function (e, tpl) {
    e.preventDefault();
    updateMENU(tpl);
  }
});

insertMENU = function (tpl) {
  let namaMENU = tpl.$('input[name="namaMENU"]').val();
  let routerMENU = tpl.$('input[name="routerMENU"]').val();
  let groupMENU = Session.get('groupMENU');
  let iconMENU = tpl.$('input[name="iconMENU"]').val();

  if (!adaDATA(groupMENU) | !adaDATA(namaMENU)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  MENU.insert({
    namaMENU: namaMENU,
    routerMENU: routerMENU,
    groupMENU: groupMENU,
    iconMENU: iconMENU,
    aktifYN: 1,
    createByID: UserID(),
    createBy: UserName(),
    createAt: new Date()
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('isCreating', false);
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

updateMENU = function (tpl) {
  let namaEditMENU = tpl.$('input[name="namaEditMENU"]').val();
  let routerEditMENU = tpl.$('input[name="routerEditMENU"]').val();
  let iconEditMENU = tpl.$('input[name="iconEditMENU"]').val();
  let groupEditMENU = Session.get('groupMENU');

  if (!adaDATA(groupEditMENU) | !adaDATA(namaEditMENU)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  MENU.update({
    _id: Session.get('idEditing')
  }, {
    $set: {
      routerMENU: routerEditMENU,
      namaMENU: namaEditMENU,
      groupMENU: groupEditMENU,
      iconMENU: iconEditMENU,
      updateByID: UserID(),
      updateBy: UserName(),
      updateAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

deleteMENU = function () {
  if (!adaDATA(Session.get('idDeleting'))) {
    FlashMessages.sendWarning('Please select data that you want to remove . . .');
    return;
  }

  MENU.update({
    _id: Session.get('idDeleting')
  }, {
    $set: {
      aktifYN: 0,
      deleteByID: UserID(),
      deleteBy: UserName(),
      deleteAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"menuAuth.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/menuAuth.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 0);

Template.menuAuth.created = function () {
  if (!adaDATA(Session.get('idMember'))) {
    Router.go("member");
  }

  Session.set('limit', 500);
  Session.set('textSearch', '');
  Session.set('namaHeader', 'AUTH USER : ' + Session.get('namaMember').toUpperCase());
  subscribtion('memberku', {}, {}, 0);
  subscribtion('menu', {}, {}, 0);
  subscribtion('menuAuthku', {}, {}, 0);
  subscribtion('menuGroup', {}, {}, 0);
  this.autorun(function () {
    subscribtion('menuAuth', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
  });
};

Template.member.onRendered(function () {
  ScrollHandler();
});
Template.menuAuth.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  sTinggiPopUp: function () {
    return 0.6 * $(window).height();
  },
  sGeneralFont: function () {
    return sGeneralFont;
  },
  DownloadDiPilih: function () {
    return warnaMENU("DOWNLOAD", this._id);
  },
  PrintDiPilih: function () {
    return warnaMENU("PRINT", this._id);
  },
  ConfirmDiPilih: function () {
    return warnaMENU("CONFIRM", this._id);
  },
  AddDiPilih: function () {
    return warnaMENU("ADD", this._id);
  },
  EditDiPilih: function () {
    return warnaMENU("EDIT", this._id);
  },
  DeleteDiPilih: function () {
    return warnaMENU("DELETE", this._id);
  },
  sideMenuGroup: function () {
    let textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    let dataMenu = MENU.find({
      namaMENU: {
        $regex: textSearch,
        $options: 'i'
      }
    });
    let idGroupMenu = dataMenu.map(function (p) {
      return p.groupMENU;
    });
    return MENUGROUP.find({
      namaMENUGROUP: {
        $in: idGroupMenu
      }
    }, {
      sort: {
        locationsMENUGROUP: 1
      }
    });
  },
  sideMenu: function () {
    let textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    return MENU.find({
      groupMENU: this.namaMENUGROUP,
      namaMENU: {
        $regex: textSearch,
        $options: 'i'
      }
    });
  },
  isCreating: function () {
    return Session.get('isCreating');
  }
});
Template.menuAuth.events({
  'keyup #searchBox': function (e, tpl) {
    e.preventDefault();
    let textSearch = tpl.$('input[name="searchBox"]').val();
    Session.set('textSearch', textSearch);
  },
  'click a.allAuth': function (e, tpl) {
    e.preventDefault();
    insertMENUAUTH("ADD", this._id);
    insertMENUAUTH("EDIT", this._id);
    insertMENUAUTH("DELETE", this._id);
    insertMENUAUTH("DOWNLOAD", this._id);
    insertMENUAUTH("PRINT", this._id);
    insertMENUAUTH("CONFIRM", this._id);
  },
  'click a.downloadAuth': function (e, tpl) {
    e.preventDefault();
    insertMENUAUTH("DOWNLOAD", this._id);
  },
  'click a.printAuth': function (e, tpl) {
    e.preventDefault();
    insertMENUAUTH("PRINT", this._id);
  },
  'click a.confirmAuth': function (e, tpl) {
    e.preventDefault();
    insertMENUAUTH("CONFIRM", this._id);
  },
  'click a.addAuth': function (e, tpl) {
    e.preventDefault();
    insertMENUAUTH("ADD", this._id);
  },
  'click a.editAuth': function (e, tpl) {
    e.preventDefault();
    insertMENUAUTH("EDIT", this._id);
  },
  'click a.deleteAuth': function (e, tpl) {
    e.preventDefault();
    insertMENUAUTH("DELETE", this._id);
  }
});

warnaMENU = function (authTipe, idMenu) {
  var dataAUTH = MENUAUTH.find({
    userId: Session.get('idMember'),
    idMENU: idMenu,
    authTipe: authTipe
  }).fetch();

  if (adaDATA(dataAUTH)) {
    return "green";
  } else {
    return "gray";
  }
};

insertMENUAUTH = function (authTipe, idMenu) {
  var menuArray = MENU.findOne({
    _id: idMenu
  });
  var dataAUTH = MENUAUTH.find({
    userId: Session.get('idMember'),
    idMENU: idMenu,
    authTipe: authTipe
  });

  if (adaDATA(dataAUTH.fetch())) {
    dataAUTH.forEach(function (obj) {
      MENUAUTH.remove({
        _id: obj._id
      });
    });
    insertLogs("AUTH MEMBER", UserName() + " REMOVE Authentication type `" + authTipe + "` to " + Session.get("namaMember").toUpperCase() + " MENU : " + menuArray.namaMENU + "");
  } else {
    MENUAUTH.insert({
      userId: Session.get('idMember'),
      idMENU: idMenu,
      namaMENU: menuArray.namaMENU,
      groupMENU: menuArray.groupMENU,
      routerMENU: menuArray.routerMENU,
      authTipe: authTipe
    });
    insertLogs("AUTH MEMBER", UserName() + " ALLOW Authentication type `" + authTipe + "` to " + Session.get("namaMember").toUpperCase() + " MENU : " + menuArray.namaMENU + "");
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"menuFab.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/menuFab.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./menuFab.html");
Template.footNoteReport.helpers({
  sHeaderBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sHeaderBackground;
  },
  isSearch: function () {
    return Session.get('isSearch');
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  },
  datePrint: function () {
    let date = new Date().toString();
    return date;
  },
  username: function () {
    return UserName();
  }
});
Template.menuDownload.helpers({
  sGeneralFontBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sHeaderBackground;
  },
  isSearch: function () {
    return Session.get('isSearch');
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  }
});
Template.menuPrint.helpers({
  sGeneralFontBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sGeneralFont;
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  },
  isSearch: function () {
    return Session.get('isSearch');
  }
});
Template.member.events({
  'click a.upload': function (e, tpl) {
    e.preventDefault();
    Session.set("isUpload", true);
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set("isUpload", false);
  },
  'click a.saveUpload': function (e, tpl) {
    e.preventDefault();
    let file = document.getElementById('uploadCSV').files[0];
    readFile(file, function (content) {
      let dataCSV = JSON.parse(csv2json(content));
      let beda = cekKolom(getKeys(MEMBER.findOne()), getKeys(dataCSV[0]));

      if (adaDATA(beda)) {
        FlashMessages.sendWarning("Please include column " + JSON.stringify(beda) + " corectlly field like this : " + JSON.stringify(getKeys(MEMBER.findOne())));
        return;
      } else {//insert to collections
      }
    });
  }
});
Template.menuUpload.helpers({
  isUpload: function () {
    return Session.get("isUpload");
  },
  sGeneralFontBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sHeaderBackground;
  },
  isSearch: function () {
    return Session.get('isSearch');
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  }
});
Template.menuSearch.helpers({
  sGeneralFontBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sHeaderBackground;
  },
  isSearch: function () {
    return Session.get('isSearch');
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  }
});
Template.menuSearch.events({
  'click a.searchBtn': function (e, tpl) {
    e.preventDefault();
    Session.set('isSearch', true);
  },
  'keyup #searchBox': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 27) {
      Session.set('isSearch', false);
    } else {
      let textSearch = tpl.$('input[name="searchBox"]').val();
      Session.set('textSearch', textSearch);
    }
  }
});

Template.menuSearch.created = function () {
  Session.set('isSearch', false);
};

Template.menuReport.helpers({
  sGeneralFontBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sGeneralFont;
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  },
  isSearch: function () {
    return Session.get('isSearch');
  }
});
Template.menuLoadMore.helpers({
  sGeneralFontBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sGeneralFont;
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  },
  isSearch: function () {
    return Session.get('isSearch');
  }
});
Template.menuBack.helpers({
  sGeneralFontBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sGeneralFont;
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  },
  isSearch: function () {
    return Session.get('isSearch');
  }
});
Template.menuBackBottom.helpers({
  sGeneralFontBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sGeneralFont;
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  }
});
Template.menuAdd.helpers({
  sGeneralFontBackground: function () {
    return sGeneralFontBackground;
  },
  sHeaderBackground: function () {
    return sGeneralFontBackground;
  },
  sGeneralFont: function () {
    return sHeaderBackground;
  },
  isSearch: function () {
    return Session.get('isSearch');
  }
});
Template.menuLoadMore.events({
  'click a.loadmore': function (e, tpl) {
    e.preventDefault();
    incrementLimit();
  }
});

csv2json = function (csv) {
  let lines = csv.split("\n");
  let result = [];
  let headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return JSON.stringify(result);
};

readFile = function (f, onLoadCallback) {
  let reader = new FileReader();

  reader.onload = function (e) {
    let contents = e.target.result;
    onLoadCallback(contents);
  };

  reader.readAsText(f);
};

getKeys = function (oArray) {
  return Object.keys(oArray);
};

cekKolom = function (oArrayOne, csvJson_One) {
  let data = $(oArrayOne).not(csvJson_One).get();
  return data;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"menuGroup.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/menuGroup.js                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 0);

Template.menuGroup.created = function () {
  Session.set('limit', 50);
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('textSearch', '');
  Session.set('namaHeader', 'DATA MENU GROUP');
  Session.set('dataDelete', '');
  Session.set('isCreating', false);
  Session.set('isEditing', false);
  this.autorun(function () {
    subscribtion('menuGroup', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
  });
};

Template.menuGroup.onRendered(function () {
  ScrollHandler();
});
Template.menuGroup.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  isEditing: function () {
    return Session.get('idEditing') === this._id;
  },
  isCreating: function () {
    return Session.get('isCreating');
  },
  menuGroups: function () {
    var textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    var oFILTERS = {
      $or: [{
        namaMENUGROUP: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        iconMENUGROUP: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        _id: {
          $regex: textSearch,
          $options: 'i'
        }
      }],
      aktifYN: 1
    };
    var oOPTIONS = {
      sort: {
        locationsMENU: 1
      },
      limit: Session.get('limit')
    };
    Session.set('oOPTIONS', oOPTIONS);
    Session.set('oFILTERS', oFILTERS);
    return MENUGROUP.find(oFILTERS, oOPTIONS);
  }
});
Template.menuGroup.events({
  'click a.detailData': function (e, tpl) {
    e.preventDefault();
    Session.set('groupMENU', this.namaMENUGROUP);
    Router.go("menu");
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', false);
    Session.set('isEditing', false);
    Session.set('idEditing', '');
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    deleteMENUGROUP();
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaMENUGROUP);
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', true);
  },
  'keyup #namaMENUGROUP': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      insertMENUGROUP(tpl);
    }
  },
  'click a.save': function (e, tpl) {
    e.preventDefault();
    insertMENUGROUP(tpl);
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditing', this._id);
  },
  'keyup #namaEditMENUGROUP': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      updateMENUGROUP(tpl);
    }
  },
  'click a.saveEDIT': function (e, tpl) {
    e.preventDefault();
    updateMENUGROUP(tpl);
  }
});

insertMENUGROUP = function (tpl) {
  var namaMENUGROUP = tpl.$('input[name="namaMENUGROUP"]').val();
  var iconMENUGROUP = tpl.$('input[name="iconMENUGROUP"]').val();
  var locationsMENUGROUP = SelectedTerpilih('groupLocations');

  if (!adaDATA(iconMENUGROUP) | !adaDATA(namaMENUGROUP)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  MENUGROUP.insert({
    namaMENUGROUP: namaMENUGROUP.toUpperCase(),
    iconMENUGROUP: iconMENUGROUP,
    locationsMENUGROUP: locationsMENUGROUP,
    aktifYN: 1,
    createByID: UserID(),
    createBy: UserName(),
    createAt: new Date()
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('isCreating', false);
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

updateMENUGROUP = function (tpl) {
  var namaEditMENUGROUP = tpl.$('input[name="namaEditMENUGROUP"]').val();
  var iconEditMENUGROUP = tpl.$('input[name="iconEditMENUGROUP"]').val();
  var locationsMENUGROUP = SelectedTerpilih('groupLocationsEDIT');

  if (!adaDATA(iconEditMENUGROUP) | !adaDATA(namaEditMENUGROUP)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  MENUGROUP.update({
    _id: Session.get('idEditing')
  }, {
    $set: {
      namaMENUGROUP: namaEditMENUGROUP.toUpperCase(),
      iconMENUGROUP: iconEditMENUGROUP,
      locationsMENUGROUP: locationsMENUGROUP,
      updateByID: UserID(),
      updateBy: UserName(),
      updateAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

deleteMENUGROUP = function () {
  if (!adaDATA(Session.get('idDeleting'))) {
    FlashMessages.sendWarning('Please select data that you want to remove . . .');
    return;
  }

  MENUGROUP.update({
    _id: Session.get('idDeleting')
  }, {
    $set: {
      aktifYN: 0,
      deleteByID: UserID(),
      deleteBy: UserName(),
      deleteAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"message.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/message.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
let ReactiveVar;
module.link("meteor/reactive-var", {
  ReactiveVar(v) {
    ReactiveVar = v;
  }

}, 2);
module.link("./message.html");
var toMessage = new ReactiveVar([]);

Template.message.created = function () {
  Session.set('limit', 50);
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('textSearch', '');
  Session.set('namaHeader', 'DATA MESSAGE');
  Session.set('dataDelete', '');
  Session.set('isCreating', false);
  Session.set('isEditing', false);
  Session.set('oFILTERSMembers', {});
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('flxauto_message_status', true);
  Session.set('flxauto_message_data', MENU.findOne());
  this.autorun(function () {
    subscribtion('member', {}, Session.get('oOPTIONS_toMessage'), 0);
    Meteor.subscribe('message', Session.get('limit'));
    Meteor.subscribe('messageMember', Session.get('limit'));
  });
};

Template.message.onRendered(function () {
  ScrollHandler();
});
Template.message.helpers({
  isiMessage: function () {
    var converter = new Showdown.converter();
    var isi = converter.makeHtml(this.text);
    return isi;
  },
  penerima: function () {
    return toMessage.get();
  },
  datasearchBox: function () {
    return Session.get('toMessage');
  },
  objectCARI: function () {
    return TIMELINES.findOne();
  },
  isLockMenu: function () {
    return isLockMenu();
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  },
  sTinggiPopUp: function () {
    return 0.8 * $(window).height();
  },
  isCreating: function () {
    return Session.get('isCreating');
  },
  messagesMember: function () {
    return MESSAGEMEMBER.find({
      idMessage: this._id
    });
  },
  messages: function () {
    var textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    var dataMESSAGE = MESSAGEMEMBER.find({
      username: EmailUser(),
      aktifYN: 1
    });
    var idMessage = dataMESSAGE.map(function (p) {
      return p.idMessage;
    });
    var oFILTERS = {
      _id: {
        $in: idMessage
      },
      aktifYN: 1,
      $or: [{
        subject: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        text: {
          $regex: textSearch,
          $options: 'i'
        }
      }]
    };
    var oOPTIONS = {
      sort: {
        createAt: -1
      },
      limit: Session.get('limit')
    };
    Session.set('oOPTIONS', oOPTIONS);
    Session.set('oFILTERS', oFILTERS);
    return MESSAGE.find(oFILTERS, oOPTIONS);
  }
});
Template.message.events({
  'keyup input#toMessage': function (e, tpl) {
    flxautocomplete.autocomplete({
      name: 'toMessage',
      element: 'input#toMessage',
      collection: MEMBER,
      field: ['profile.name', 'username'],
      fields: {
        profile: 1,
        username: 1
      },
      limit: 0,
      sort: {
        'profile.name': 1
      },
      filter: {}
    });
  },
  'change input#toMessage': function (e, tpl) {
    var dataPilih = tpl.$('input[name="toMessage"]').val();

    if (dataPilih.length > 10) {
      var allmember = toMessage.get();
      dataMember = MEMBER.findOne({
        username: dataPilih
      });

      if (adaDATA(dataMember)) {
        allmember.push({
          username: dataMember.username
        });
        toMessage.set(allmember);
        document.getElementById("toMessage").value = "";
      } else {
        FlashMessages.sendError('Emails not valid !');
      }
    }
  },
  'click a.hapusTerima': function (e, tpl) {
    var penerimaAll = toMessage.get();
    penerimaAll = ArrayRemove(penerimaAll, 'username', e.currentTarget.id);
    toMessage.set(penerimaAll);
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', false);
    Session.set('isEditing', false);
    Session.set('idEditing', '');
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    deleteMESSAGE();
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' "' + this.subject + '" From "' + this.createBy + '" ');
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    toMessage.set([]);
    Scroll2Top();
    Session.set('isCreating', true);
  },
  'keyup #namaMESSAGE': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      insertMESSAGE(tpl);
    }
  },
  'click a.save': function (e, tpl) {
    e.preventDefault();
    insertMESSAGE(tpl);
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditing', this._id);
  },
  'keyup #namaEditMESSAGE': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      updateMESSAGE(tpl);
    }
  },
  'click a.saveEDIT': function (e, tpl) {
    e.preventDefault();
    updateMESSAGE(tpl);
  },
  'submit form.form-comments': function (e, tpl) {
    e.preventDefault();
    flxcomments(e, tpl, MESSAGE);
  }
});

insertMESSAGE = function (tpl) {
  var subjectMESSAGE = tpl.$('input[name="subjectMESSAGE"]').val();
  var textMESSAGE = tpl.$('textarea[name="textMESSAGE"]').val();
  var dataTo = toMessage.get();

  if (dataTo < 1) {
    FlashMessages.sendWarning('Hello ' + UserName() + ', please input person at "TO", use ENTER to add them. ');
    return;
  }

  if (!adaDATA(subjectMESSAGE) | !adaDATA(textMESSAGE)) {
    FlashMessages.sendWarning('Please add subject or Messages text');
    return;
  }

  MESSAGE.insert({
    subject: subjectMESSAGE,
    text: textMESSAGE,
    aktifYN: 1,
    createByID: UserID(),
    createBy: UserName(),
    createAt: new Date()
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again, ' + err.toString());
    } else {
      var aPenerima = {};
      aPenerima.idMessage = id;
      aPenerima.aktifYN = 1;
      aPenerima.createByID = UserID();
      aPenerima.createBy = UserName();
      aPenerima.createAt = new Date();
      aPenerima.username = Meteor.user().username;
      MESSAGEMEMBER.insert(aPenerima);

      for (var i = 0; i < dataTo.length; i++) {
        aPenerima = dataTo[i];
        aPenerima.idMessage = id;
        aPenerima.aktifYN = 1;
        aPenerima.createByID = UserID();
        aPenerima.createBy = UserName();
        aPenerima.createAt = new Date();
        MESSAGEMEMBER.insert(aPenerima);
      }

      Meteor.subscribe('message', Session.get('limit'));
      Meteor.subscribe('messageMember', Session.get('limit'));
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
      Session.set('isCreating', null);
    }
  });
};

updateMESSAGE = function (tpl) {
  var fromEditMESSAGE = tpl.$('input[name="fromEditMESSAGE"]').val();
  var toEditMESSAGE = tpl.$('input[name="toEditMESSAGE"]').val();
  var ccEditMESSAGE = tpl.$('input[name="ccEditMESSAGE"]').val();
  var subjectEditMESSAGE = tpl.$('input[name="subjectEditMESSAGE"]').val();
  var textEditMESSAGE = tpl.$('input[name="textEditMESSAGE"]').val();

  if (!adaDATA(fromEditMESSAGE) | !adaDATA(toEditMESSAGE) | !adaDATA(ccEditMESSAGE) | !adaDATA(subjectEditMESSAGE) | !adaDATA(textEditMESSAGE)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  MESSAGE.update({
    _id: Session.get('idEditing')
  }, {
    $set: {
      from: hideData(fromEditMESSAGE),
      to: hideData(toEditMESSAGE),
      cc: hideData(ccEditMESSAGE),
      subject: hideData(subjectEditMESSAGE),
      text: hideData(textEditMESSAGE),
      updateByID: UserID(),
      updateBy: UserName(),
      updateAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

deleteMESSAGE = function () {
  if (!adaDATA(Session.get('idDeleting'))) {
    FlashMessages.sendWarning('Please select data that you want to remove . . .');
    return;
  }

  var dataMESSAGE = MESSAGEMEMBER.find({
    username: Meteor.user().username,
    idMessage: Session.get('idDeleting')
  });
  dataMESSAGE.map(function (p) {
    MESSAGEMEMBER.update({
      _id: p._id
    }, {
      $set: {
        aktifYN: 0,
        deleteByID: UserID(),
        deleteBy: UserName(),
        deleteAt: new Date()
      }
    }, function (err, id) {
      if (err) {
        FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
      } else {
        Session.set('idEditing', '');
        Meteor.subscribe('message', Session.get('limit'));
        Meteor.subscribe('messageMember', Session.get('limit'));
      }
    });
  });
  Session.set('idEditing', '');
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"oraono.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/oraono.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./oraono.html");
Template.oraono.helpers({
  pictBackground: function () {
    return sBackground;
  },
  sAvatar: function () {
    return sAvatar;
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"profile.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/profile.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**
 * Created by MacBookPro on 6/3/15.
 * By Pamungkas Jayuda
 * yulius.jayuda@gmail.com / +628119003077
 */
Template.profile.created = function () {
  subscribtion('memberku', {}, {}, 0);
  SetFOTO(500, 500, 'updateFotoMember', pictProfile(UserID()), UserID());
};

Template.profile.helpers({
  sHeaderBackground: function () {
    return sHeaderBackground;
  },
  isEditingUpload: function () {
    return Session.get('editedUploadId') === this._id;
  },
  pictProfile: function () {
    return pictProfile(UserID());
  },
  pictBackground: function () {
    return pictProfileBackground(UserID());
  },
  members: function () {
    return MEMBER.find(Meteor.userId());
  },
  username: function () {
    return UserName();
  },
  email: function () {
    return email();
  },
  uploadData: function () {
    return uploadFotoMember(Meteor.userId());
  },
  isCreatingProfile: function () {
    return Session.get('isCreatingProfile');
  },
  isCreatingPenyelenggara: function () {
    let penyelenggara = PenyelenggaraAdmins.findOne({
      penyelenggaraAdminID: Meteor.userId()
    });

    if (!penyelenggara) {
      return true;
    } else {
      return false;
    }
  }
});
Template.profile.events({
  "click a.profilePict": function (e, tpl) {
    e.preventDefault();
    SetFOTO(500, 500, 'updateFotoMember', pictProfile(UserID()), UserID());
    $('#editYourAvatarModal').modal();
  },
  "click a.upload": function (e, tpl) {
    e.preventDefault();
    SetFOTO(700, 700, 'updateFotoBackground', pictProfileBackground(UserID()), UserID());
    $('#editYourAvatarModal').modal();
  },
  'click a.simpanPhoto': function (e, tpl) {
    let lokasi = sURL_upUser + ".upUser/pictures/memb_" + Meteor.userId() + "/member_" + Meteor.userId() + ".jpg";
    Members.update(Session.get('editedUploadId'), {
      $set: {
        fotoMember: lokasi,
        updateAt: new Date(),
        updateBy: profileName(),
        updateByID: Meteor.userId()
      }
    });
    Session.set('editedUploadId', null);
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreatingProfile', true);
  },
  "click a.edit": function (e, tpl) {
    e.preventDefault();
    Session.set('editedProfileId', true);
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreatingProfile', false);
    Session.set('editedProfileId', null);
    Session.set('isCommentsMessage', false);
    Session.set('editedUploadId', null);
  },
  'click a.start': function (e, tpl) {
    FlashMessages.sendInfo("Status VERIFIED AKTIF : " + this.namatravel);
    e.preventDefault();
    Profile.update(this._id, {
      $set: {
        statusPenyelenggaras: "VERIFIED AKTIF"
      }
    });
    Profile.update(this._id, {
      $addToSet: {
        statusDetail: {
          status: "VERIFIED AKTIF",
          status_By: profileName(),
          status_Byid: Meteor.userId(),
          status_createdAt: new Date(TimeSync.serverTime())
        }
      }
    });
  },
  'click a.createFollower': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreatingFollower', true);
  },
  "click a.addFollower": function (e, tpl) {
    e.preventDefault();
    Session.set('isFollower', true);
    Session.set('idFollower', this._id);
  },
  'click a.end': function (e, tpl) {
    FlashMessages.sendInfo("Status VERIFIED NONAKTIF : " + this.namatravel);
    e.preventDefault();
    Profile.update(this._id, {
      $set: {
        statusPenyelenggaras: "VERIFIED NONAKTIF"
      }
    });
    Profile.update(this._id, {
      $addToSet: {
        statusDetail: {
          status: "VERIFIED NONAKTIF",
          status_By: profileName(),
          status_Byid: Meteor.userId(),
          status_createdAt: new Date(TimeSync.serverTime())
        }
      }
    });
  },
  'click a.remove': function (e, tpl) {
    e.preventDefault();
    Profile.remove(this._id);
  },
  'click a.loadmore': function (e, tpl) {
    e.preventDefault();
    incrementLimit();
  },
  "submit form.form-search": function (e, tpl) {
    e.preventDefault();
    let textSearch = tpl.$('input[name="search"]').val();
    Session.set('textSearch', textSearch);
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"profileData.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/profileData.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./profileData.html");

Template.profileData.created = function () {
  Session.set('limit', 100);
  Session.set('textSearch', '');
  Session.set('namaHeader', 'PROFILE DATA');
  Session.set('dataDelete', '');
  Session.set('idEditingPass', false);
};

Template.profileData.rendered = function () {
  ScrollHandler();
};

Template.profileData.helpers({
  isEditingPASS: function () {
    return Session.get('idEditingPass') === this._id;
  },
  name: function () {
    return UserName();
  },
  emails: function () {
    return Meteor.users.findOne({
      _id: UserID()
    }).emails[0].address;
  }
});
Template.profileData.events({
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditingPass', '');
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    PROFILEDATA.remove(Session.get('idDeleting'));
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaPROFILEDATA);
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditingPass', this._id);
  },
  'keyup #namaEditPROFILEDATA': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      updatePROFILEDATA(tpl);
    }
  },
  'click a.saveEDIT': function (e, tpl) {
    e.preventDefault();
    updatePROFILEDATA(tpl);
  }
});

updatePROFILEDATA = function (tpl) {
  var password = tpl.$('input[name="password"]').val();
  var retype = tpl.$('input[name="retype"]').val();

  if (password != retype) {
    FlashMessages.sendWarning('The specified password is not correct');
    return;
  } else {
    Meteor.call('updatePassUser', UserID(), password);
    Router.go("/");
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"profilebar.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/profilebar.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./profilebar.html");
Template.profilebar.helpers({
  username: function () {
    return UserName();
  },
  foto: function () {
    return pictProfile(UserID());
  },
  quotes: function () {
    let dKaryawan = MEMBER.findOne({
      _id: Meteor.userId()
    });

    if (dKaryawan) {
      return dKaryawan.quotes;
    } else {
      return "Orang sukses adalah orang yang bisa mensukseskan orang lain";
    }
  },
  sGeneralFont: function () {
    return sGeneralFont;
  },
  pictBackground: function () {
    return pictProfileBackground(UserID());
  }
});
Template.profilebar.events({
  'click a.linkLogout': function (e, tpl) {
    Meteor.logout(function () {
      Meteor.call('resetKunci');
      Router.go("/");
    });
  },
  "submit form.form-quotes": function (e, tpl) {
    e.preventDefault();
    let textQuotes = tpl.$('input[name="quotes"]').val();
    let dKaryawan = MEMBER.findOne({
      _id: Meteor.userId()
    });
    let idKaryawan = "";

    if (dKaryawan) {
      idKaryawan = dKaryawan._id;
    } else {
      FlashMessages.sendError("Mohon Hub IT, untuk Konfirmasi DATA KARYAWAN Anda tidak VALID !");
    }

    MEMBER.update(idKaryawan, {
      $set: {
        quotes: textQuotes
      }
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sidebar.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/sidebar.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./sidebar.html");

Template.sidebar.created = function () {
  Blaze._allowJavascriptUrls();

  var menuAuth = MENUAUTH.find({
    userId: UserID()
  });
  var idMenu = menuAuth.map(function (p) {
    return p.idMENU;
  });
  var oFILTERMENU = {
    _id: {
      $in: idMenu
    },
    groupMENU: this.namaMENUGROUP,
    aktifYN: 1
  };
  menuAuth = MENUAUTH.find({
    userId: UserID()
  });
  var groupMENU = menuAuth.map(function (p) {
    return p.groupMENU;
  });
  var oFILTERS = {
    aktifYN: 1,
    namaMENUGROUP: {
      $in: groupMENU
    }
  };

  if (adaDATA(Session.get("menuDept"))) {
    oFILTERS.namaMENUGROUP = Session.get("menuDept");
  } else {
    oFILTERS.namaMENUGROUP = "";
  }

  subscribtion('menu', oFILTERMENU, {}, 0);
  subscribtion('menuGroup', oFILTERS, {
    sort: {
      locationsMENUGROUP: 1
    }
  }, 0);
};

Template.sidebar.onRendered(function () {
  ScrollHandler();
});
Template.sidebar.events({
  'click input.lockMenu': function (e, tpl) {
    MEMBER.update(UserID(), {
      $set: {
        'profile.lockMenu': e.target.checked
      }
    });
    Session.set("lockMenu", e.target.checked);
  }
});
Template.sidebar.helpers({
  animasiSide: function () {
    if (Session.get("lockMenu")) {
      return "animasiSampingKanan";
    } else {
      return "";
    }

    ;
  },
  warnaLock: function () {
    if (Session.get("lockMenu")) {
      return "#0E487A";
    } else {
      return "#C1C7CC";
    }

    ;
  },
  isLockMenu: function () {
    if (!adaDATA(Session.get("lockMenu"))) {
      var dataLock = Meteor.user();

      if (adaDATA(dataLock)) {
        Session.set("lockMenu", dataLock.profile.lockMenu);
      } else {
        Session.set("lockMenu", false);
      }
    }

    if (Session.get("lockMenu")) {
      return "checked";
    } else {
      return "";
    }

    ;
  },
  showIcon: function () {
    var sIcon = "";

    if (Session.get("lockMenu")) {
      sIcon = "sidebar-md-show";
    }

    return sIcon;
  },
  isAuthAdmin: function () {
    return isAdmin(this._id);
  },
  sGeneralFont: function () {
    return sGeneralFont;
  },
  sideMenuGroup: function () {
    return MENUGROUP.find({}, {
      sort: {
        locationsMENUGROUP: 1
      }
    });
  },
  sideMenu: function () {
    return MENU.find({
      groupMENU: this.namaMENUGROUP,
      aktifYN: 1
    });
  },
  noBadge: function () {
    if (adaDATA(Session.get(this.routerMENU))) {
      FlashMessages.sendInfo('Hello ' + UserName() + ', you have new data ' + this.namaMENU);
    }

    return Session.get(this.routerMENU);
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utama.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/core/utama.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./utama.html");

Template.utama.created = function () {
  if (!Meteor.userId()) {
    Router.go('/');
  }

  if (!adaDATA(MENUAUTH.findOne({
    routerMENU: Session.get('sURLMenu'),
    userId: UserID()
  }))) {
    console.log("cek your auth " + Session.get('sURLMenu'));
    Router.go('/');
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"workorder":{"wo.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/wo.html                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.wo.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.wo.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/template.wo.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("wo");
Template["wo"] = new Template("Template.wo", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", Spacebars.include(view.lookupTemplate("menuAdd")), "\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "list-group panel panel-default shadow-z-4 headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("wos"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                        ", HTML.DIV({
      class: "row-content"
    }, "\n                            ", HTML.H3({
      style: "font-weight: bold;"
    }, "\n                                ", Blaze.View("lookup:namaWO", function() {
      return Spacebars.mustache(view.lookup("namaWO"));
    }), "\n                            "), "\n                            ", HTML.P("\n                                ", Blaze.View("lookup:tipeWO", function() {
      return Spacebars.mustache(view.lookup("tipeWO"));
    }), " - ", Blaze.View("lookup:subTipeWO", function() {
      return Spacebars.mustache(view.lookup("subTipeWO"));
    }), " - ", Blaze.View("lookup:detailTipeWO", function() {
      return Spacebars.mustache(view.lookup("detailTipeWO"));
    }), "\n                            "), "\n                            ", HTML.P("\n                                ", Blaze.View("lookup:keteranganWO", function() {
      return Spacebars.mustache(view.lookup("keteranganWO"));
    }), "\n                            "), "\n                            ", HTML.P({
      style: "font-size: x-small;",
      align: "right"
    }, "\n                                ", HTML.H4({
      style: "color: red;"
    }, Blaze.View("lookup:status", function() {
      return Spacebars.mustache(view.lookup("status"));
    })), "\n                                Create At : ", Blaze.View("lookup:createAt", function() {
      return Spacebars.mustache(view.lookup("createAt"));
    }), HTML.BR(), "\n                                Sign At : ", Blaze.View("lookup:signAt", function() {
      return Spacebars.mustache(view.lookup("signAt"));
    }), " to ", Blaze.View("lookup:signTo", function() {
      return Spacebars.mustache(view.lookup("signTo"));
    }), HTML.BR(), "\n                                Close At : ", Blaze.View("lookup:closeAt", function() {
      return Spacebars.mustache(view.lookup("closeAt"));
    }), " to ", Blaze.View("lookup:closeBy", function() {
      return Spacebars.mustache(view.lookup("closeBy"));
    }), "\n                            "), "\n\n                            ", HTML.DIV({
      class: "least-content",
      style: "top:20px;"
    }, "\n                                ", HTML.A({
      class: "report",
      style: "color:blue;",
      "data-toggle": "tooltip",
      title: "PRINT DATA"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-print"
    })), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "\n                                ", HTML.A({
      class: "signTo",
      style: "color:green;",
      "data-toggle": "tooltip",
      title: "SIGN PIC USER"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-user"
    })), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "\n                                ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isPlay"));
    }, function() {
      return [ "\n                                    ", Blaze.If(function() {
        return Spacebars.call(view.lookup("isStop"));
      }, function() {
        return [ "\n                                        ", HTML.A({
          class: "stop",
          style: "color:red;",
          "data-toggle": "tooltip",
          title: "STOP WO"
        }, HTML.SPAN({
          class: "glyphicon glyphicon-stop"
        })), " ", HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), "\n                                    " ];
      }), "\n                                    ", Blaze.If(function() {
        return Spacebars.call(view.lookup("isStart"));
      }, function() {
        return [ "\n                                        ", HTML.A({
          class: "play",
          style: "color:red;",
          "data-toggle": "tooltip",
          title: "START WO"
        }, HTML.SPAN({
          class: "glyphicon glyphicon-play"
        })), " ", HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), HTML.CharRef({
          html: "&nbsp;",
          str: " "
        }), "\n                                    " ];
      }), "\n                                " ];
    }), "\n                                ", Spacebars.include(view.lookupTemplate("actionListview")), "\n                            "), "\n                        "), "\n                    "), "\n                    ", HTML.HR(), "\n\n                    ", Spacebars.include(view.lookupTemplate("flxcomments")), "\n\n                    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isEditing"));
    }, function() {
      return [ "\n                        ", Spacebars.include(view.lookupTemplate("blockModals")), "\n                        ", HTML.DIV({
        class: "jumbotron container",
        style: "position:fixed;top:10%;left:10%;width:80%;z-index:10001;"
      }, "\n                            ", HTML.DIV({
        class: "col-md-12"
      }, "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-12"
      }, "\n                                    ", HTML.LABEL({
        for: "keteranganEditWO",
        class: "control-label"
      }, "NAMA WO"), "\n                                    ", HTML.INPUT({
        name: "keteranganEditWO",
        id: "keteranganEditWO",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("keteranganWO"));
        }
      }), "\n                                "), "\n                            "), "\n\n                            ", HTML.DIV({
        class: "pull-right"
      }, "\n                                ", HTML.A({
        class: "saveEDIT btn btn-primary",
        style: "background-color:green;color:white;"
      }, "SAVE"), "\n                            "), "\n                        "), "\n                    " ];
    }), "\n\n\n                " ];
  }), "\n            "), "\n            ", Spacebars.include(view.lookupTemplate("menuLoadMore")), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isCreating"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n            ", HTML.DIV({
      class: "jumbotron container",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                ", HTML.DIV({
      class: "col-md-12"
    }, "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-12"
    }, "\n                        ", HTML.LABEL({
      for: "namaWO",
      class: "control-label"
    }, "NAMA WO"), "\n                        ", HTML.INPUT({
      name: "namaWO",
      id: "namaWO",
      type: "text",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                    "), "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-4"
    }, "\n                        ", HTML.LABEL({
      for: "tipeWO",
      class: "control-label"
    }, "TIPE"), "\n                        ", HTML.SELECT({
      class: "form-control",
      name: "tipeWO",
      id: "tipeWO",
      style: "font-size:larger;"
    }, "\n                            ", HTML.OPTION(), "\n                            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("woTipeDATA"));
    }, function() {
      return [ "\n                                ", HTML.OPTION({
        value: function() {
          return Spacebars.mustache(view.lookup("_id"));
        }
      }, Blaze.View("lookup:namaWOTIPE", function() {
        return Spacebars.mustache(view.lookup("namaWOTIPE"));
      })), "\n                            " ];
    }), "\n                        "), "\n                    "), "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-4"
    }, "\n                        ", HTML.LABEL({
      for: "subTipeWO",
      class: "control-label"
    }, "SUB TIPE"), "\n                        ", HTML.SELECT({
      class: "form-control",
      name: "subTipeWO",
      id: "subTipeWO",
      style: "font-size:larger;"
    }, "\n                            ", HTML.OPTION(), "\n                            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("subTipeWODATA"));
    }, function() {
      return [ "\n                                ", HTML.OPTION({
        value: function() {
          return Spacebars.mustache(view.lookup("_id"));
        }
      }, Blaze.View("lookup:namaWOSUBTIPE", function() {
        return Spacebars.mustache(view.lookup("namaWOSUBTIPE"));
      })), "\n                            " ];
    }), "\n                        "), "\n                    "), "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-4"
    }, "\n                        ", HTML.LABEL({
      for: "detailTipeWO",
      class: "control-label"
    }, "SUB TIPE"), "\n                        ", HTML.SELECT({
      class: "form-control",
      name: "detailTipeWO",
      id: "detailTipeWO",
      style: "font-size:larger;"
    }, "\n                            ", HTML.OPTION(), "\n                            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("subTipeWODetailDATA"));
    }, function() {
      return [ "\n                                ", HTML.OPTION({
        value: function() {
          return Spacebars.mustache(view.lookup("_id"));
        }
      }, Blaze.View("lookup:namaWOSUBTIPEDETAIL", function() {
        return Spacebars.mustache(view.lookup("namaWOSUBTIPEDETAIL"));
      })), "\n                            " ];
    }), "\n                        "), "\n                    "), "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-12"
    }, "\n                        ", HTML.LABEL({
      for: "keteranganWO",
      class: "control-label"
    }, "KETERANGAN"), "\n                        ", HTML.TEXTAREA({
      name: "keteranganWO",
      id: "keteranganWO",
      type: "text",
      class: "form-control",
      style: "font-size:larger;",
      rows: "3"
    }), "\n                    "), "\n                "), "\n\n                ", HTML.DIV({
      class: "pull-right"
    }, "\n                    ", HTML.A({
      class: "save btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n                "), "\n            "), "\n        " ];
  }), "\n\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isSignTo"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n            ", HTML.DIV({
      class: "jumbotron container",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                ", HTML.DIV({
      class: "col-md-12"
    }, "\n                    ", HTML.DIV({
      class: "label-floating has-info col-md-12"
    }, "\n                        ", HTML.LABEL({
      for: "signTo",
      class: "control-label"
    }, "TO"), "\n                        ", HTML.SELECT({
      class: "form-control",
      name: "signTo",
      id: "signTo",
      type: "text",
      style: "font-size:larger;"
    }, "\n                            ", HTML.OPTION(), "\n                            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("members"));
    }, function() {
      return [ "\n                                ", HTML.OPTION({
        value: function() {
          return Spacebars.mustache(view.lookup("_id"));
        }
      }, Blaze.View("lookup:profile.name", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("profile"), "name"));
      })), "\n                            " ];
    }), "\n                        "), "\n                    "), "\n                "), "\n                ", HTML.BR(), "\n\n                ", HTML.DIV({
      class: "pull-right"
    }, "\n                    ", HTML.A({
      class: "saveSignTo btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n                "), "\n            "), "\n        " ];
  }), "\n\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"woSubTipe.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/woSubTipe.html                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.woSubTipe.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.woSubTipe.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/template.woSubTipe.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("woSubTipe");
Template["woSubTipe"] = new Template("Template.woSubTipe", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", Spacebars.include(view.lookupTemplate("menuAdd")), "\n        ", Spacebars.include(view.lookupTemplate("menuBack")), "\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "list-group panel panel-default headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("woSubTipes"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                        ", HTML.DIV({
      class: "row-content"
    }, "\n                            ", HTML.BR(), "\n                            ", HTML.P("\n                                ", Blaze.View("lookup:namaWOSUBTIPE", function() {
      return Spacebars.mustache(view.lookup("namaWOSUBTIPE"));
    }), "\n                            "), "\n\n                            ", HTML.DIV({
      class: "least-content",
      style: "top:20px;"
    }, "\n                                ", HTML.A({
      class: "subTipeDetailData",
      style: "color:blue;",
      "data-toggle": "tooltip",
      title: "DATA PROVINSI"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-th-large"
    })), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "\n                                ", Spacebars.include(view.lookupTemplate("actionListview")), "\n                            "), "\n                        "), "\n                    "), "\n\n\n                    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isEditing"));
    }, function() {
      return [ "\n                        ", Spacebars.include(view.lookupTemplate("blockModals")), "\n                        ", HTML.DIV({
        class: "container animasiAtas",
        style: "position:fixed;top:10%;left:10%;width:80%;z-index:10001;"
      }, "\n                            ", HTML.DIV({
        class: "col-md-12"
      }, "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-12"
      }, "\n                                    ", HTML.LABEL({
        for: "namaEditWOSUBTIPE",
        class: "control-label"
      }, "NAMA WOSUBTIPE"), "\n                                    ", HTML.INPUT({
        name: "namaEditWOSUBTIPE",
        id: "namaEditWOSUBTIPE",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("namaWOSUBTIPE"));
        }
      }), "\n                                "), "\n                            "), "\n\n                            ", HTML.DIV({
        class: "pull-right"
      }, "\n                                ", HTML.A({
        class: "saveEDIT btn btn-primary",
        style: "background-color:green;color:white;"
      }, "SAVE"), "\n                            "), "\n                        "), "\n                    " ];
    }), "\n\n\n                " ];
  }), "\n            "), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isCreating"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n            ", HTML.DIV({
      class: "container animasiAtas",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                ", HTML.DIV({
      class: "col-md-12"
    }, "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-12"
    }, "\n                        ", HTML.LABEL({
      for: "namaWOSUBTIPE",
      class: "control-label"
    }, "NAMA WOSUBTIPE"), "\n                        ", HTML.INPUT({
      name: "namaWOSUBTIPE",
      id: "namaWOSUBTIPE",
      type: "text",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                    "), "\n                "), "\n\n                ", HTML.DIV({
      class: "pull-right"
    }, "\n                    ", HTML.A({
      class: "save btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n                "), "\n            "), "\n        " ];
  }), "\n\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"woSubTipeDetail.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/woSubTipeDetail.html                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.woSubTipeDetail.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.woSubTipeDetail.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/template.woSubTipeDetail.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("woSubTipeDetail");
Template["woSubTipeDetail"] = new Template("Template.woSubTipeDetail", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", Spacebars.include(view.lookupTemplate("menuAdd")), "\n        ", Spacebars.include(view.lookupTemplate("menuBack")), "\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n\n            ", HTML.Raw("<!-- HEADER LISTVIEW -->"), "\n            ", HTML.DIV({
    class: "list-group panel panel-default headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("woSubTipeDetails"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                        ", HTML.DIV({
      class: "row-content"
    }, "\n                            ", HTML.BR(), "\n                            ", HTML.P("\n                                ", Blaze.View("lookup:namaWOSUBTIPEDETAIL", function() {
      return Spacebars.mustache(view.lookup("namaWOSUBTIPEDETAIL"));
    }), "\n                            "), "\n\n                            ", HTML.DIV({
      class: "least-content",
      style: "top:20px;"
    }, "\n                                ", Spacebars.include(view.lookupTemplate("actionListview")), "\n                            "), "\n                        "), "\n                    "), "\n\n\n                    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isEditing"));
    }, function() {
      return [ "\n                        ", Spacebars.include(view.lookupTemplate("blockModals")), "\n                        ", HTML.DIV({
        class: "container animasiAtas",
        style: "position:fixed;top:10%;left:10%;width:80%;z-index:10001;"
      }, "\n                            ", HTML.DIV({
        class: "col-md-12"
      }, "\n                                ", HTML.DIV({
        class: "form-group label-floating has-info col-md-12"
      }, "\n                                    ", HTML.LABEL({
        for: "namaEditWOSUBTIPEDETAIL",
        class: "control-label"
      }, "NAMA WOSUBTIPEDETAIL"), "\n                                    ", HTML.INPUT({
        name: "namaEditWOSUBTIPEDETAIL",
        id: "namaEditWOSUBTIPEDETAIL",
        type: "text",
        class: "form-control",
        style: "font-size:larger;",
        value: function() {
          return Spacebars.mustache(view.lookup("namaWOSUBTIPEDETAIL"));
        }
      }), "\n                                "), "\n                            "), "\n\n                            ", HTML.DIV({
        class: "pull-right"
      }, "\n                                ", HTML.A({
        class: "saveEDIT btn btn-primary",
        style: "background-color:green;color:white;"
      }, "SAVE"), "\n                            "), "\n                        "), "\n                    " ];
    }), "\n\n\n                " ];
  }), "\n            "), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isCreating"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("blockModals")), "\n            ", HTML.DIV({
      class: "container animasiAtas",
      style: "position:absolute;top:10%;left:10%;width:80%;z-index:10001;"
    }, "\n                ", HTML.DIV({
      class: "col-md-12"
    }, "\n                    ", HTML.DIV({
      class: "form-group label-floating has-info col-md-12"
    }, "\n                        ", HTML.LABEL({
      for: "namaWOSUBTIPEDETAIL",
      class: "control-label"
    }, "NAMA WOSUBTIPEDETAIL"), "\n                        ", HTML.INPUT({
      name: "namaWOSUBTIPEDETAIL",
      id: "namaWOSUBTIPEDETAIL",
      type: "text",
      class: "form-control",
      style: "font-size:larger;"
    }), "\n                    "), "\n                "), "\n\n                ", HTML.DIV({
      class: "pull-right"
    }, "\n                    ", HTML.A({
      class: "save btn btn-primary",
      style: "background-color:green;color:white;"
    }, "SAVE"), "\n                "), "\n            "), "\n        " ];
  }), "\n\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n\n    ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"woTipe.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/woTipe.html                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.woTipe.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.woTipe.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/template.woTipe.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.__checkName("woTipe");
Template["woTipe"] = new Template("Template.woTipe", (function() {
  var view = this;
  return HTML.DIV({
    class: "container-fluid app"
  }, "\n        ", Spacebars.include(view.lookupTemplate("utama")), "\n        ", Spacebars.include(view.lookupTemplate("menuSearch")), "\n        ", Spacebars.include(view.lookupTemplate("menuAdd")), "\n        ", Spacebars.include(view.lookupTemplate("formDeleting")), "\n\n        ", HTML.DIV({
    class: function() {
      return [ "row main ", Spacebars.mustache(view.lookup("isLockMenu")), " animasiAtas" ];
    }
  }, "\n            ", HTML.DIV({
    class: "list-group panel panel-default headerApp"
  }, "\n                ", Spacebars.include(view.lookupTemplate("headerListview")), "\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("woTipes"));
  }, function() {
    return [ "\n                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                        ", HTML.DIV({
      class: "row-content"
    }, "\n                            ", HTML.BR(), "\n                            ", HTML.P("\n                                ", Blaze.View("lookup:namaWOTIPE", function() {
      return Spacebars.mustache(view.lookup("namaWOTIPE"));
    }), "\n                            "), "\n                            ", HTML.DIV({
      class: "least-content",
      style: "top:20px;"
    }, "\n                                ", HTML.A({
      class: "subTipeData",
      style: "color:blue;",
      "data-toggle": "tooltip",
      title: "DATA PROVINSI"
    }, HTML.SPAN({
      class: "glyphicon glyphicon-th-large"
    })), " ", HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "\n                                ", Spacebars.include(view.lookupTemplate("actionListview")), "\n                            "), "\n                        "), "\n                    "), "\n                " ];
  }), "\n            "), "\n        "), HTML.Raw('\n\n\n        <div class="modal_woTipe modal" id="modal_woTipe" name="modal_woTipe">\n            <div class="modal-dialog" role="document">\n                <div class="modal-content">\n                    <div class="modal-body">\n                        <div class="form-group label-floating has-info col-md-12">\n                            <label for="namaWOTIPE" class="control-label">WO TIPE</label>\n                            <input name="namaWOTIPE" id="namaWOTIPE" type="text" class="form-control" style="font-size:larger;" autofocus="">\n                        </div>\n                        <div class="modal-footer">\n                            <a class="save btn btn-primary" style="background-color:green;color:white;">SAVE</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    '));
}));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wo.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/wo.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./wo.html");

Template.wo.created = function () {
  Session.set('limit', 50);
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('namaHeader', 'WORK ORDER');
  Session.set('dataDelete', '');
  Session.set('isCreating', false);
  Session.set('isEditing', false);
  Session.set('idSignTo', "");
  subscribtion('woTipe', {
    aktifYN: 1
  }, {}, 0);
  subscribtion('woSubTipe', {
    aktifYN: 1
  }, {}, 0);
  subscribtion('woSubTipeDetail', {
    aktifYN: 1
  }, {}, 0);
  this.autorun(function () {
    subscribtion('wo', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
  });
};

Template.wo.onRendered(function () {
  ScrollHandler();
});
Template.wo.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  isStop: function () {
    if (this.status !== "FINISH") {
      if (this.status === "START") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  isPlay: function () {
    if (this.status !== "FINISH") {
      return this.signToID === UserID() | isRoleAdmin(UserID());
    } else {
      return false;
    }
  },
  members: function () {
    return MEMBER.find({}, {
      sort: {
        'profile.name': 1
      }
    });
  },
  subTipeWODetailDATA: function () {
    return WOSUBTIPEDETAIL.find({
      kodeWOSUBTIPE: Session.get("subTipeWO"),
      aktifYN: 1
    }, {
      sort: {
        namaWOSUBTIPEDETAIL: 1
      }
    });
  },
  subTipeWODATA: function () {
    return WOSUBTIPE.find({
      kodeWOTIPE: Session.get("tipeWOID"),
      aktifYN: 1
    }, {
      sort: {
        namaWOSUBTIPE: 1
      }
    });
  },
  woTipeDATA: function () {
    return WOTIPE.find({
      aktifYN: 1
    }, {
      sort: {
        namaWOTIPE: 1
      }
    });
  },
  isSignTo: function () {
    return Session.get('isSignTo');
  },
  isEditing: function () {
    if (this.status !== "FINISH") {
      return Session.get('idEditing') === this._id;
    } else {
      return false;
    }
  },
  isCreating: function () {
    return Session.get('isCreating');
  },
  wos: function () {
    var textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    var oFILTERS = {
      $or: [{
        namaWO: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        tipeWO: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        detailTipeWO: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        keteranganWO: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        createBy: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        tipeWO: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        _id: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        status: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        signTo: {
          $regex: textSearch,
          $options: 'i'
        }
      }],
      aktifYN: 1
    };

    if (!isRoleAdmin(UserID())) {
      oFILTERS.createByID = UserID();
    }

    var oOPTIONS = {
      sort: {
        createAt: -1
      },
      limit: Session.get('limit')
    };
    Session.set('oOPTIONS', oOPTIONS);
    Session.set('oFILTERS', oFILTERS);
    return WO.find(oFILTERS, oOPTIONS);
  }
});
Template.wo.events({
  'click a.report': function (e, tpl) {
    e.preventDefault();

    if (this.status !== "FINISH") {
      var sReportName = this.namaWO;
      var sReportNumber = this.tipeWO + ' - ' + this.subTipeWO;
      var sReportFootNote = this.createBy + '<BR>' + this.createAt;
      var sCollections = "wo";
      var sBackUrl = "wo";
      var cCollectionsInitial = WO;
      var aReportFilter = {
        aktifYN: 1,
        _id: this._id
      };
      var aReportOptions = {
        fields: {
          keteranganWO: 1
        }
      };
      var oReportFieldDisplay = [{
        "NAMA": this.detailTipeWO,
        "fields": "keteranganWO"
      }];
      setREPORT(sReportName, sReportNumber, sReportFootNote, sCollections, sBackUrl, cCollectionsInitial, aReportFilter, aReportOptions, oReportFieldDisplay);
    } else {
      FlashMessages.sendWarning('Attention, This WO has been FINISH !');
    }
  },
  'change #subTipeWO': function (e, tpl) {
    e.preventDefault();
    var ID_tipeWODipilih = tpl.$('select[name="subTipeWO"]').val();
    Session.set("subTipeWO", ID_tipeWODipilih);
  },
  'change #tipeWO': function (e, tpl) {
    e.preventDefault();
    var ID_tipeWODipilih = tpl.$('select[name="tipeWO"]').val();
    Session.set("tipeWOID", ID_tipeWODipilih);
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', false);
    Session.set('isEditing', false);
    Session.set('idEditing', '');
    Session.set('idSignTo', null);
    Session.set('isSignTo', false);
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    deleteWO();
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();

    if (this.status !== "FINISH") {
      Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaWO);
      Session.set('idDeleting', this._id);
      $("#modal_formDeleting").modal('show');
    } else {
      FlashMessages.sendWarning('Attention, This WO has been FINISH !');
    }
  },
  'click a.signTo': function (e, tpl) {
    e.preventDefault();

    if (this.status !== "FINISH") {
      Session.set('idSignTo', this._id);
      Session.set('isSignTo', true);
    } else {
      FlashMessages.sendWarning('Attention, This WO has been FINISH !');
    }
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', true);
  },
  'keyup #namaWO': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      insertWO(tpl);
    }
  },
  'click a.save': function (e, tpl) {
    e.preventDefault();
    insertWO(tpl);
  },
  'click a.saveSignTo': function (e, tpl) {
    e.preventDefault();
    updatePIC(tpl);
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();

    if (this.status !== "FINISH") {
      Session.set('idEditing', this._id);
    } else {
      FlashMessages.sendWarning('Attention, This WO has been FINISH !');
    }
  },
  'keyup #namaEditWO': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      updateWO(tpl);
    }
  },
  'click a.saveEDIT': function (e, tpl) {
    e.preventDefault();
    updateWO(tpl);
  },
  "submit form.form-comments": function (e, tpl) {
    e.preventDefault();
    flxcomments(e, tpl, WO);
  },
  'click a.play': function (e, tpl) {
    e.preventDefault();
    WO.update({
      _id: this._id
    }, {
      $set: {
        status: "START",
        statusBy: UserName(),
        statusByID: UserID()
      }
    }, function (err, id) {
      if (err) {
        FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
      } else {
        Session.set('idEditing', '');
        FlashMessages.sendSuccess('Thanks, your data is successfully saved');
      }
    });
  },
  'click a.stop': function (e, tpl) {
    e.preventDefault();
    WO.update({
      _id: this._id
    }, {
      $set: {
        status: "FINISH",
        statusBy: UserName(),
        statusByID: UserID()
      }
    }, function (err, id) {
      if (err) {
        FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
      } else {
        Session.set('idEditing', '');
        FlashMessages.sendSuccess('Thanks, your data is successfully saved');
      }
    });
  }
});

insertWO = function (tpl) {
  var namaWO = tpl.$('input[name="namaWO"]').val();
  var tipeWO = SelectedTerpilih("tipeWO");
  var subTipeWO = SelectedTerpilih("subTipeWO");
  var detailTipeWO = SelectedTerpilih("detailTipeWO");
  var keteranganWO = tpl.$('textarea[name="keteranganWO"]').val();

  if (!adaDATA(namaWO) | !adaDATA(tipeWO) | !adaDATA(subTipeWO) | !adaDATA(detailTipeWO) | !adaDATA(keteranganWO)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  WO.insert({
    namaWO: namaWO,
    tipeWO: tipeWO,
    subTipeWO: subTipeWO,
    detailTipeWO: detailTipeWO,
    keteranganWO: keteranganWO,
    aktifYN: 1,
    status: "INPUT",
    signByID: "-",
    signBy: "-",
    signAt: "-",
    signTo: "-",
    closeByID: "-",
    closeBy: "-",
    closeAt: "-",
    createByID: UserID(),
    createBy: UserName(),
    createAt: new Date()
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('isCreating', false);
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

updatePIC = function (tpl) {
  var id = tpl.$('select[name="signTo"]').val();
  var nama = SelectedTerpilih("signTo");

  if (!adaDATA(nama)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  } else {
    var nama = MEMBER.findOne({
      _id: id
    }).profile.name;
  }

  WO.update({
    _id: Session.get('idSignTo')
  }, {
    $set: {
      signByID: UserID(),
      signBy: UserName(),
      signAt: new Date(),
      signTo: nama,
      status: "SIGN PIC",
      signToID: id
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
  addTodo("SIGN PIC WO", "Hello " + nama + ", Anda telah di minta menjadi PIC untuk Pekerjaan baru. Mohon lihat WO Menu", sURL + "wo", Session.get('idSignTo'), nama, id);
  Session.set('idSignTo', null);
  Session.set('isSignTo', false);
};

updateWO = function (tpl) {
  var keteranganWO = tpl.$('input[name="keteranganEditWO"]').val();

  if (!adaDATA(keteranganWO)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  WO.update({
    _id: Session.get('idEditing')
  }, {
    $set: {
      keteranganWO: keteranganWO
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

deleteWO = function () {
  if (!adaDATA(Session.get('idDeleting'))) {
    FlashMessages.sendWarning('Please select data that you want to remove . . .');
    return;
  }

  WO.update({
    _id: Session.get('idDeleting')
  }, {
    $set: {
      aktifYN: 0,
      deleteByID: UserID(),
      deleteBy: UserName(),
      deleteAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"woSubTipe.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/woSubTipe.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./woSubTipe.html");

Template.woSubTipe.created = function () {
  Session.set('limit', 50);
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('textSearch', '');
  Session.set('namaHeader', 'SUB TIPE WORK ORDER');
  Session.set('dataDelete', '');
  Session.set('isCreating', false);
  Session.set('isEditing', false);
  this.autorun(function () {
    subscribtion('woSubTipe', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
  });
};

Template.woSubTipe.onRendered(function () {
  ScrollHandler();
});
Template.woSubTipe.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  isEditing: function () {
    return Session.get('idEditing') === this._id;
  },
  isCreating: function () {
    return Session.get('isCreating');
  },
  woSubTipes: function () {
    var textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    var oFILTERS = {
      $or: [{
        namaWOSUBTIPE: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        kodeWOSUBTIPE: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        _id: {
          $regex: textSearch,
          $options: 'i'
        }
      }],
      kodeWOTIPE: Session.get('kodeWOTIPE'),
      aktifYN: 1
    };
    var oOPTIONS = {
      sort: {
        createAt: -1
      },
      limit: Session.get('limit')
    };
    Session.set('oFILTERS', oFILTERS);
    Session.set('oOPTIONS', oOPTIONS);
    return WOSUBTIPE.find(oFILTERS, oOPTIONS);
  }
});
Template.woSubTipe.events({
  'click a.back': function (e, tpl) {
    e.preventDefault();
    Session.set('kodeWOTIPE', "");
    Session.set('namaWOTIPE', "");
    Router.go("woTipe");
  },
  'click a.subTipeDetailData': function (e, tpl) {
    e.preventDefault();
    Session.set('kodeWOSUBTIPE', this._id);
    Session.set('namaWOSUBTIPE', this.namaWOSUBTIPE);
    Router.go("woSubTipeDetail");
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', false);
    Session.set('isEditing', false);
    Session.set('idEditing', '');
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    deleteWOSUBTIPE();
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaWOSUBTIPE);
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', true);
  },
  'keyup #namaWOSUBTIPE': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      insertWOSUBTIPE(tpl);
    }
  },
  'click a.save': function (e, tpl) {
    e.preventDefault();
    insertWOSUBTIPE(tpl);
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditing', this._id);
  },
  'keyup #namaEditWOSUBTIPE': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      updateWOSUBTIPE(tpl);
    }
  },
  'click a.saveEDIT': function (e, tpl) {
    e.preventDefault();
    updateWOSUBTIPE(tpl);
  }
});

insertWOSUBTIPE = function (tpl) {
  var namaWOSUBTIPE = tpl.$('input[name="namaWOSUBTIPE"]').val();

  if (!adaDATA(namaWOSUBTIPE)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  WOSUBTIPE.insert({
    kodeWOTIPE: Session.get('kodeWOTIPE'),
    namaWOTIPE: Session.get('namaWOTIPE'),
    namaWOSUBTIPE: namaWOSUBTIPE,
    aktifYN: 1,
    createByID: UserID(),
    createBy: UserName(),
    createAt: new Date()
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('isCreating', false);
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

updateWOSUBTIPE = function (tpl) {
  var namaEditWOSUBTIPE = tpl.$('input[name="namaEditWOSUBTIPE"]').val();

  if (!adaDATA(namaEditWOSUBTIPE)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  WOSUBTIPE.update({
    _id: Session.get('idEditing')
  }, {
    $set: {
      namaWOSUBTIPE: namaEditWOSUBTIPE,
      updateByID: UserID(),
      updateBy: UserName(),
      updateAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

deleteWOSUBTIPE = function () {
  if (!adaDATA(Session.get('idDeleting'))) {
    FlashMessages.sendWarning('Please select data that you want to remove . . .');
    return;
  }

  WOSUBTIPE.update({
    _id: Session.get('idDeleting')
  }, {
    $set: {
      aktifYN: 0,
      deleteByID: UserID(),
      deleteBy: UserName(),
      deleteAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"woSubTipeDetail.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/woSubTipeDetail.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./woSubTipeDetail.html");

Template.woSubTipeDetail.created = function () {
  Session.set('limit', 50);
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('textSearch', '');
  Session.set('namaHeader', 'DETAIL SUB TIPE WORK ORDER');
  Session.set('dataDelete', '');
  Session.set('isCreating', false);
  Session.set('isEditing', false);
  this.autorun(function () {
    subscribtion('woSubTipeDetail', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
  });
};

Template.woSubTipeDetail.onRendered(function () {
  ScrollHandler();
});
Template.woSubTipeDetail.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  isEditing: function () {
    return Session.get('idEditing') === this._id;
  },
  isCreating: function () {
    return Session.get('isCreating');
  },
  woSubTipeDetails: function () {
    let textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    let oFILTERS = {
      $or: [{
        namaWOSUBTIPEDETAIL: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        kodeWOSUBTIPEDETAIL: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        _id: {
          $regex: textSearch,
          $options: 'i'
        }
      }],
      kodeWOSUBTIPE: Session.get('kodeWOSUBTIPE'),
      aktifYN: 1
    };
    var oOPTIONS = {
      sort: {
        createAt: -1
      },
      limit: Session.get('limit')
    };
    Session.set('oFILTERS', oFILTERS);
    Session.set('oOPTIONS', oOPTIONS);
    return WOSUBTIPEDETAIL.find(oFILTERS, oOPTIONS);
  }
});
Template.woSubTipeDetail.events({
  'click a.back': function (e, tpl) {
    e.preventDefault();
    Session.set('kodeWOSUBTIPE', "");
    Session.set('namaWOSUBTIPE', "");
    Router.go("woSubTipe");
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', false);
    Session.set('isEditing', false);
    Session.set('idEditing', '');
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    deleteWOSUBTIPEDETAIL();
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaWOSUBTIPEDETAIL);
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreating', true);
  },
  'keyup #namaWOSUBTIPEDETAIL': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      insertWOSUBTIPEDETAIL(tpl);
    }
  },
  'click a.save': function (e, tpl) {
    e.preventDefault();
    insertWOSUBTIPEDETAIL(tpl);
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditing', this._id);
  },
  'keyup #namaEditWOSUBTIPEDETAIL': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      updateWOSUBTIPEDETAIL(tpl);
    }
  },
  'click a.saveEDIT': function (e, tpl) {
    e.preventDefault();
    updateWOSUBTIPEDETAIL(tpl);
  }
});

insertWOSUBTIPEDETAIL = function (tpl) {
  let namaWOSUBTIPEDETAIL = tpl.$('input[name="namaWOSUBTIPEDETAIL"]').val();

  if (!adaDATA(namaWOSUBTIPEDETAIL)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  WOSUBTIPEDETAIL.insert({
    kodeWOSUBTIPE: Session.get('kodeWOSUBTIPE'),
    namaWOSUBTIPE: Session.get('namaWOSUBTIPE'),
    namaWOSUBTIPEDETAIL: namaWOSUBTIPEDETAIL,
    aktifYN: 1,
    createByID: UserID(),
    createBy: UserName(),
    createAt: new Date()
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('isCreating', false);
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

updateWOSUBTIPEDETAIL = function (tpl) {
  let namaEditWOSUBTIPEDETAIL = tpl.$('input[name="namaEditWOSUBTIPEDETAIL"]').val();

  if (!adaDATA(namaEditWOSUBTIPEDETAIL)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  WOSUBTIPEDETAIL.update({
    _id: Session.get('idEditing')
  }, {
    $set: {
      namaWOSUBTIPEDETAIL: namaEditWOSUBTIPEDETAIL,
      updateByID: UserID(),
      updateBy: UserName(),
      updateAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

deleteWOSUBTIPEDETAIL = function () {
  if (!adaDATA(Session.get('idDeleting'))) {
    FlashMessages.sendWarning('Please select data that you want to remove . . .');
    return;
  }

  WOSUBTIPEDETAIL.update({
    _id: Session.get('idDeleting')
  }, {
    $set: {
      aktifYN: 0,
      deleteByID: UserID(),
      deleteBy: UserName(),
      deleteAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"woTipe.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/views/workorder/woTipe.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
module.link("./woTipe.html");

Template.woTipe.created = function () {
  Session.set('limit', 50);
  Session.set('oFILTERS', {});
  Session.set('oOPTIONS', {});
  Session.set('textSearch', '');
  Session.set('namaHeader', 'TIPE WORK ORDER');
  Session.set('dataDelete', '');
  this.autorun(function () {
    subscribtion('woTipe', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
  });
};

Template.woTipe.onRendered(function () {
  ScrollHandler();
});
Template.woTipe.helpers({
  isLockMenu: function () {
    return isLockMenu();
  },
  woTipes: function () {
    var textSearch = '';

    if (adaDATA(Session.get('textSearch'))) {
      textSearch = Session.get('textSearch').replace('#', '').trim();
    }

    var oFILTERS = {
      $or: [{
        namaWOTIPE: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        kodeWOTIPE: {
          $regex: textSearch,
          $options: 'i'
        }
      }, {
        _id: {
          $regex: textSearch,
          $options: 'i'
        }
      }],
      aktifYN: 1
    };
    var oOPTIONS = {
      sort: {
        createAt: -1
      },
      limit: Session.get('limit')
    };
    return WOTIPE.find(oFILTERS, oOPTIONS);
  }
});
Template.woTipe.events({
  'click a.subTipeData': function (e, tpl) {
    e.preventDefault();
    Session.set('kodeWOTIPE', this._id);
    Session.set('namaWOTIPE', this.namaWOTIPE);
    Router.go("woSubTipe");
  },
  'click a.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditing', null);
  },
  'click a.deleteDataOK': function (e, tpl) {
    e.preventDefault();
    deleteWOTIPE();
    FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
    $("#modal_formDeleting").modal('hide');
  },
  'click a.deleteData': function (e, tpl) {
    e.preventDefault();
    Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaWOTIPE);
    Session.set('idDeleting', this._id);
    $("#modal_formDeleting").modal('show');
  },
  'click a.create': function (e, tpl) {
    e.preventDefault();
    $("#modal_woTipe").modal('show');
  },
  'keyup #namaWOTIPE': function (e, tpl) {
    e.preventDefault();

    if (e.keyCode == 13) {
      if (adaDATA(Session.get('idEditing'))) {
        updateWOTIPE(tpl);
      } else {
        insertWOTIPE(tpl);
      }
    }
  },
  'click a.save': function (e, tpl) {
    e.preventDefault();

    if (adaDATA(Session.get('idEditing'))) {
      updateWOTIPE(tpl);
    } else {
      insertWOTIPE(tpl);
    }
  },
  'click a.editData': function (e, tpl) {
    e.preventDefault();
    Session.set('idEditing', this._id);
    document.getElementById('namaWOTIPE').value = this.namaWOTIPE;
    $("#modal_woTipe").modal('show');
  }
});

insertWOTIPE = function (tpl) {
  var namaWOTIPE = tpl.$('input[name="namaWOTIPE"]').val();

  if (!adaDATA(namaWOTIPE)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  WOTIPE.insert({
    namaWOTIPE: namaWOTIPE,
    aktifYN: 1,
    createByID: UserID(),
    createBy: UserName(),
    createAt: new Date()
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      $("#modal_woTipe").modal('hide');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

updateWOTIPE = function (tpl) {
  var namaWOTIPE = tpl.$('input[name="namaWOTIPE"]').val();

  if (!adaDATA(namaWOTIPE)) {
    FlashMessages.sendWarning('Please complete all of the data to be . . .');
    return;
  }

  WOTIPE.update({
    _id: Session.get('idEditing')
  }, {
    $set: {
      namaWOTIPE: namaWOTIPE,
      updateByID: UserID(),
      updateBy: UserName(),
      updateAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      $("#modal_woTipe").modal('hide');
      Session.set('idEditing', null);
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};

deleteWOTIPE = function () {
  if (!adaDATA(Session.get('idDeleting'))) {
    FlashMessages.sendWarning('Please select data that you want to remove . . .');
    return;
  }

  WOTIPE.update({
    _id: Session.get('idDeleting')
  }, {
    $set: {
      aktifYN: 0,
      deleteByID: UserID(),
      deleteBy: UserName(),
      deleteAt: new Date()
    }
  }, function (err, id) {
    if (err) {
      FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
    } else {
      Session.set('idEditing', '');
      FlashMessages.sendSuccess('Thanks, your data is successfully saved');
    }
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"home.html":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/home.html                                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.link("./template.home.js", { "*": "*+" });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.home.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/template.home.js                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

Template.body.addContent((function() {
  var view = this;
  return "";
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return "\n        ";
  }, function() {
    return [ "\n        ", Spacebars.include(view.lookupTemplate("login")), "\n    " ];
  }), "\n\n    ", Spacebars.include(view.lookupTemplate("progressbar")), "\n    ", Spacebars.include(view.lookupTemplate("header")), "\n    ", Spacebars.include(view.lookupTemplate("flashTemplates")), "\n\n    ", HTML.DIV({
    class: "container-fluid",
    style: "position: relative;top: 41px;"
  }, "\n        ", HTML.DIV({
    class: "row main col-md-9 col-md-offset-3"
  }, "\n            ", Spacebars.include(view.lookupTemplate("sidebar")), "\n        "), "\n    "), "\n    ", Spacebars.include(view.lookupTemplate("profilebar")), HTML.Raw('\n\n    <div class="row main col-md-9 col-md-offset-3">\n      <br><br><br>\n  </div>') ];
}));
Meteor.startup(function() {
  var attrs = {"style":"font-family: 'Raleway-Thin', sans-serif;"};
  for (var prop in attrs) {
    document.body.setAttribute(prop, attrs[prop]);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"styles":{"js":{"controlmenu.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/styles/js/controlmenu.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* ========================================================================
 * Bootstrap: controlmenu.js v0.1
 * ========================================================================
 * Copyright 2011-2014 Asyraf Abdul Rahman
 * Licensed under MIT
 * ======================================================================== */
+function ($) {
  'use strict'; // SIDEBAR PUBLIC CLASS DEFINITION
  // ================================

  var ControlMenu = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, ControlMenu.DEFAULTS, options);
    this.transitioning = null;
    if (this.options.parent) this.$parent = $(this.options.parent);
    if (this.options.toggle) this.toggle();
  };

  ControlMenu.DEFAULTS = {
    toggle: true
  };

  ControlMenu.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('controlmenu-open')) return;
    var startEvent = $.Event('show.bs.controlmenu');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    this.$element.addClass('controlmenu-open');
    this.transitioning = 1;

    var complete = function () {
      this.$element;
      this.transitioning = 0;
      this.$element.trigger('shown.bs.controlmenu');
    };

    if (!$.support.transition) return complete.call(this);
    this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(400);
  };

  ControlMenu.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('controlmenu-open')) return;
    var startEvent = $.Event('hide.bs.controlmenu');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    this.$element.removeClass('controlmenu-open');
    this.transitioning = 1;

    var complete = function () {
      this.transitioning = 0;
      this.$element.trigger('hidden.bs.controlmenu');
    };

    if (!$.support.transition) return complete.call(this);
    this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(400);
  };

  ControlMenu.prototype.toggle = function () {
    this[this.$element.hasClass('controlmenu-open') ? 'hide' : 'show']();
  };

  var old = $.fn.controlmenu;

  $.fn.controlmenu = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.controlmenu');
      var options = $.extend({}, ControlMenu.DEFAULTS, $this.data(), typeof options == 'object' && option);
      if (!data && options.toggle && option == 'show') option = !option;
      if (!data) $this.data('bs.controlmenu', data = new ControlMenu(this, options));
      if (typeof option == 'string') data[option]();
    });
  };

  $.fn.controlmenu.Constructor = ControlMenu;

  $.fn.controlmenu.noConflict = function () {
    $.fn.controlmenu = old;
    return this;
  };

  $(document).on('click.bs.controlmenu.data-api', '[data-toggle="controlmenu"]', function (e) {
    var $this = $(this),
        href;
    var target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
    var $target = $(target);
    var data = $target.data('bs.controlmenu');
    var option = data ? 'toggle' : $this.data();
    $target.controlmenu(option);
  });
  $('html').on('click.bs.controlmenu.autohide', function (event) {
    var $this = $(event.target);
    var isButtonOrControlMenu = $this.is('.controlmenu, [data-toggle="controlmenu"]') || $this.parents('.controlmenu, [data-toggle="controlmenu"]').length;

    if (isButtonOrControlMenu) {
      return;
    } else {
      var $target = $('.controlmenu');
      $target.each(function (i, trgt) {
        var $trgt = $(trgt);

        if ($trgt.data('bs.controlmenu') && $trgt.hasClass('controlmenu-open')) {
          $trgt.controlmenu('hide');
        }
      });
    }
  });
}(jQuery);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"flexurio.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/styles/js/flexurio.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**
 * Created by MacBookPro on 6/14/15.
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"jquery.imgareaselect.pack.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/styles/js/jquery.imgareaselect.pack.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
eval(function (p, a, c, k, e, d) {
  e = function (c) {
    return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
  };

  while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);

  return p;
}('(m($){18 W=2v.4T,D=2v.4S,F=2v.4R,u=2v.4Q;m V(){C $("<4P/>")};$.N=m(T,c){18 O=$(T),1F,A=V(),1k=V(),I=V().r(V()).r(V()).r(V()),B=V().r(V()).r(V()).r(V()),E=$([]),1K,G,l,17={v:0,l:0},Q,M,1l,1g={v:0,l:0},12=0,1J="1H",2k,2j,1t,1s,S,1B,1A,2o,2n,14,1Q,a,b,j,g,f={a:0,b:0,j:0,g:0,H:0,L:0},2u=R.4O,1M=4N.4M,$p,d,i,o,w,h,2p;m 1n(x){C x+17.v-1g.v};m 1m(y){C y+17.l-1g.l};m 1b(x){C x-17.v+1g.v};m 1a(y){C y-17.l+1g.l};m 1z(3J){C 3J.4L-1g.v};m 1y(3I){C 3I.4K-1g.l};m 13(32){18 1i=32||1t,1h=32||1s;C{a:u(f.a*1i),b:u(f.b*1h),j:u(f.j*1i),g:u(f.g*1h),H:u(f.j*1i)-u(f.a*1i),L:u(f.g*1h)-u(f.b*1h)}};m 23(a,b,j,g,31){18 1i=31||1t,1h=31||1s;f={a:u(a/1i||0),b:u(b/1h||0),j:u(j/1i||0),g:u(g/1h||0)};f.H=f.j-f.a;f.L=f.g-f.b};m 1f(){9(!1F||!O.H()){C}17={v:u(O.2t().v),l:u(O.2t().l)};Q=O.2Y();M=O.3H();17.l+=(O.30()-M)>>1;17.v+=(O.2q()-Q)>>1;1B=u(c.4J/1t)||0;1A=u(c.4I/1s)||0;2o=u(F(c.4H/1t||1<<24,Q));2n=u(F(c.4G/1s||1<<24,M));9($().4F=="1.3.2"&&1J=="21"&&!2u["4E"]){17.l+=D(R.1q.2r,2u.2r);17.v+=D(R.1q.2s,2u.2s)}1g=/1H|4D/.1c(1l.q("1p"))?{v:u(1l.2t().v)-1l.2s(),l:u(1l.2t().l)-1l.2r()}:1J=="21"?{v:$(R).2s(),l:$(R).2r()}:{v:0,l:0};G=1n(0);l=1m(0);9(f.j>Q||f.g>M){1U()}};m 1V(3F){9(!1Q){C}A.q({v:1n(f.a),l:1m(f.b)}).r(1k).H(w=f.H).L(h=f.L);1k.r(I).r(E).q({v:0,l:0});I.H(D(w-I.2q()+I.2Y(),0)).L(D(h-I.30()+I.3H(),0));$(B[0]).q({v:G,l:l,H:f.a,L:M});$(B[1]).q({v:G+f.a,l:l,H:w,L:f.b});$(B[2]).q({v:G+f.j,l:l,H:Q-f.j,L:M});$(B[3]).q({v:G+f.a,l:l+f.g,H:w,L:M-f.g});w-=E.2q();h-=E.30();2O(E.3f){15 8:$(E[4]).q({v:w>>1});$(E[5]).q({v:w,l:h>>1});$(E[6]).q({v:w>>1,l:h});$(E[7]).q({l:h>>1});15 4:E.3G(1,3).q({v:w});E.3G(2,4).q({l:h})}9(3F!==Y){9($.N.2Z!=2R){$(R).U($.N.2z,$.N.2Z)}9(c.1T){$(R)[$.N.2z]($.N.2Z=2R)}}9(1j&&I.2q()-I.2Y()==2){I.q("3E",0);3x(m(){I.q("3E","4C")},0)}};m 22(3D){1f();1V(3D);a=1n(f.a);b=1m(f.b);j=1n(f.j);g=1m(f.g)};m 27(2X,2w){c.1P?2X.4B(c.1P,2w):2X.1r()};m 1d(2W){18 x=1b(1z(2W))-f.a,y=1a(1y(2W))-f.b;9(!2p){1f();2p=11;A.1G("4A",m(){2p=Y})}S="";9(c.2D){9(y<=c.1W){S="n"}X{9(y>=f.L-c.1W){S="s"}}9(x<=c.1W){S+="w"}X{9(x>=f.H-c.1W){S+="e"}}}A.q("2V",S?S+"-19":c.26?"4z":"");9(1K){1K.4y()}};m 2S(4x){$("1q").q("2V","");9(c.4w||f.H*f.L==0){27(A.r(B),m(){$(J).1r()})}$(R).U("P",2l);A.P(1d);c.2f(T,13())};m 2C(1X){9(1X.3z!=1){C Y}1f();9(S){$("1q").q("2V",S+"-19");a=1n(f[/w/.1c(S)?"j":"a"]);b=1m(f[/n/.1c(S)?"g":"b"]);$(R).P(2l).1G("1x",2S);A.U("P",1d)}X{9(c.26){2k=G+f.a-1z(1X);2j=l+f.b-1y(1X);A.U("P",1d);$(R).P(2T).1G("1x",m(){c.2f(T,13());$(R).U("P",2T);A.P(1d)})}X{O.1O(1X)}}C Y};m 1w(3C){9(14){9(3C){j=D(G,F(G+Q,a+W(g-b)*14*(j>a||-1)));g=u(D(l,F(l+M,b+W(j-a)/14*(g>b||-1))));j=u(j)}X{g=D(l,F(l+M,b+W(j-a)/14*(g>b||-1)));j=u(D(G,F(G+Q,a+W(g-b)*14*(j>a||-1))));g=u(g)}}};m 1U(){a=F(a,G+Q);b=F(b,l+M);9(W(j-a)<1B){j=a-1B*(j<a||-1);9(j<G){a=G+1B}X{9(j>G+Q){a=G+Q-1B}}}9(W(g-b)<1A){g=b-1A*(g<b||-1);9(g<l){b=l+1A}X{9(g>l+M){b=l+M-1A}}}j=D(G,F(j,G+Q));g=D(l,F(g,l+M));1w(W(j-a)<W(g-b)*14);9(W(j-a)>2o){j=a-2o*(j<a||-1);1w()}9(W(g-b)>2n){g=b-2n*(g<b||-1);1w(11)}f={a:1b(F(a,j)),j:1b(D(a,j)),b:1a(F(b,g)),g:1a(D(b,g)),H:W(j-a),L:W(g-b)};1V();c.2g(T,13())};m 2l(2U){j=/w|e|^$/.1c(S)||14?1z(2U):1n(f.j);g=/n|s|^$/.1c(S)||14?1y(2U):1m(f.g);1U();C Y};m 1v(3B,3A){j=(a=3B)+f.H;g=(b=3A)+f.L;$.2c(f,{a:1b(a),b:1a(b),j:1b(j),g:1a(g)});1V();c.2g(T,13())};m 2T(2m){a=D(G,F(2k+1z(2m),G+Q-f.H));b=D(l,F(2j+1y(2m),l+M-f.L));1v(a,b);2m.4v();C Y};m 2h(){$(R).U("P",2h);1f();j=a;g=b;1U();S="";9(!B.2y(":4u")){A.r(B).1r().2E(c.1P||0)}1Q=11;$(R).U("1x",1N).P(2l).1G("1x",2S);A.U("P",1d);c.3y(T,13())};m 1N(){$(R).U("P",2h).U("1x",1N);27(A.r(B));23(1b(a),1a(b),1b(a),1a(b));9(!(J 4t $.N)){c.2g(T,13());c.2f(T,13())}};m 2A(2i){9(2i.3z!=1||B.2y(":4s")){C Y}1f();2k=a=1z(2i);2j=b=1y(2i);$(R).P(2h).1x(1N);C Y};m 2B(){22(Y)};m 2x(){1F=11;25(c=$.2c({1S:"4r",26:11,20:"1q",2D:11,1W:10,3w:m(){},3y:m(){},2g:m(){},2f:m(){}},c));A.r(B).q({3b:""});9(c.2F){1Q=11;1f();1V();A.r(B).1r().2E(c.1P||0)}3x(m(){c.3w(T,13())},0)};18 2R=m(16){18 k=c.1T,d,t,2N=16.4q;d=!1L(k.2P)&&(16.2e||16.3t.2e)?k.2P:!1L(k.2a)&&16.3u?k.2a:!1L(k.2b)&&16.3v?k.2b:!1L(k.2Q)?k.2Q:10;9(k.2Q=="19"||(k.2b=="19"&&16.3v)||(k.2a=="19"&&16.3u)||(k.2P=="19"&&(16.2e||16.3t.2e))){2O(2N){15 37:d=-d;15 39:t=D(a,j);a=F(a,j);j=D(t+d,a);1w();1u;15 38:d=-d;15 40:t=D(b,g);b=F(b,g);g=D(t+d,b);1w(11);1u;3s:C}1U()}X{a=F(a,j);b=F(b,g);2O(2N){15 37:1v(D(a-d,G),b);1u;15 38:1v(a,D(b-d,l));1u;15 39:1v(a+F(d,Q-1b(j)),b);1u;15 40:1v(a,b+F(d,M-1a(g)));1u;3s:C}}C Y};m 1R(3r,2M){3p(18 2d 4p 2M){9(c[2d]!==1Y){3r.q(2M[2d],c[2d])}}};m 25(K){9(K.20){(1l=$(K.20)).2G(A.r(B))}$.2c(c,K);1f();9(K.2L!=3q){E.1o();E=$([]);i=K.2L?K.2L=="4o"?4:8:0;3g(i--){E=E.r(V())}E.29(c.1S+"-4n").q({1p:"1H",36:0,1I:12+1||1});9(!4m(E.q("H"))>=0){E.H(5).L(5)}9(o=c.2K){E.q({2K:o,2H:"3m"})}1R(E,{3n:"2J-28",3l:"2I-28",3o:"1e"})}1t=c.4l/Q||1;1s=c.4k/M||1;9(K.a!=3q){23(K.a,K.b,K.j,K.g);K.2F=!K.1r}9(K.1T){c.1T=$.2c({2b:1,2a:"19"},K.1T)}B.29(c.1S+"-4j");1k.29(c.1S+"-4i");3p(i=0;i++<4;){$(I[i-1]).29(c.1S+"-2J"+i)}1R(1k,{4h:"2I-28",4g:"1e"});1R(I,{3o:"1e",2K:"2J-H"});1R(B,{4f:"2I-28",4e:"1e"});9(o=c.3n){$(I[0]).q({2H:"3m",3k:o})}9(o=c.3l){$(I[1]).q({2H:"4d",3k:o})}A.2G(1k.r(I).r(1K)).2G(E);9(1j){9(o=(B.q("3j")||"").3i(/1e=(\\d+)/)){B.q("1e",o[1]/1Z)}9(o=(I.q("3j")||"").3i(/1e=(\\d+)/)){I.q("1e",o[1]/1Z)}}9(K.1r){27(A.r(B))}X{9(K.2F&&1F){1Q=11;A.r(B).2E(c.1P||0);22()}}14=(d=(c.4c||"").4b(/:/))[0]/d[1];O.r(B).U("1O",2A);9(c.1E||c.1D===Y){A.U("P",1d).U("1O",2C);$(3h).U("19",2B)}X{9(c.1D||c.1E===Y){9(c.2D||c.26){A.P(1d).1O(2C)}$(3h).19(2B)}9(!c.4a){O.r(B).1O(2A)}}c.1D=c.1E=1Y};J.1o=m(){25({1E:11});A.r(B).1o()};J.49=m(){C c};J.33=25;J.48=13;J.47=23;J.46=1N;J.45=22;18 1j=(/44 ([\\w.]+)/i.43(1M)||[])[1],3c=/42/i.1c(1M),3d=/41/i.1c(1M)&&!/3Z/i.1c(1M);$p=O;3g($p.3f){12=D(12,!1L($p.q("z-3e"))?$p.q("z-3e"):12);9($p.q("1p")=="21"){1J="21"}$p=$p.20(":3Y(1q)")}12=c.1I||12;9(1j){O.3X("3W","3V")}$.N.2z=1j||3d?"3U":"3T";9(3c){1K=V().q({H:"1Z%",L:"1Z%",1p:"1H",1I:12+2||2})}A.r(B).q({3b:"3a",1p:1J,3S:"3a",1I:12||"0"});A.q({1I:12+2||2});1k.r(I).q({1p:"1H",36:0});T.35||T.3R=="35"||!O.2y("3Q")?2x():O.1G("3P",2x);9(!1F&&1j&&1j>=7){T.34=T.34}};$.2w.N=m(Z){Z=Z||{};J.3O(m(){9($(J).1C("N")){9(Z.1o){$(J).1C("N").1o();$(J).3N("N")}X{$(J).1C("N").33(Z)}}X{9(!Z.1o){9(Z.1D===1Y&&Z.1E===1Y){Z.1D=11}$(J).1C("N",3M $.N(J,Z))}}});9(Z.3L){C $(J).1C("N")}C J}})(3K);', 62, 304, '|||||||||if|x1|y1|_7|||_23|y2|||x2||top|function||||css|add|||_4|left|||||_a|_d|return|_2|_e|_3|_10|width|_c|this|_55|height|_13|imgAreaSelect|_8|mousemove|_12|document|_1c|_6|unbind|_5|_1|else|false|_58||true|_16|_2c|_21|case|_50|_11|var|resize|_29|_28|test|_3a|opacity|_30|_15|sy|sx|_35|_b|_14|_27|_26|remove|position|body|hide|_1b|_1a|break|_45|_42|mouseup|evY|evX|_1e|_1d|data|enable|disable|_9|one|absolute|zIndex|_17|_f|isNaN|ua|_4a|mousedown|fadeSpeed|_22|_51|classPrefix|keys|_31|_32|resizeMargin|_40|undefined|100|parent|fixed|_36|_2e||_4f|movable|_38|color|addClass|ctrl|shift|extend|_54|altKey|onSelectEnd|onSelectChange|_49|_4c|_19|_18|_3e|_48|_20|_1f|_25|outerWidth|scrollTop|scrollLeft|offset|_24|Math|fn|_4e|is|keyPress|_4b|_4d|_3f|resizable|fadeIn|show|append|borderStyle|background|border|borderWidth|handles|_53|key|switch|alt|arrows|_34|_3c|_41|_44|cursor|_3b|_39|innerWidth|onKeyPress|outerHeight|_2f|_2d|setOptions|src|complete|fontSize||||hidden|visibility|_56|_57|index|length|while|window|match|filter|borderColor|borderColor2|solid|borderColor1|borderOpacity|for|null|_52|default|originalEvent|ctrlKey|shiftKey|onInit|setTimeout|onSelectStart|which|_47|_46|_43|_37|margin|_33|slice|innerHeight|_2b|_2a|jQuery|instance|new|removeData|each|load|img|readyState|overflow|keypress|keydown|on|unselectable|attr|not|chrome||webkit|opera|exec|msie|update|cancelSelection|setSelection|getSelection|getOptions|persistent|split|aspectRatio|dashed|outerOpacity|outerColor|selectionOpacity|selectionColor|selection|outer|imageHeight|imageWidth|parseInt|handle|corners|in|keyCode|imgareaselect|animated|instanceof|visible|preventDefault|autoHide|_3d|toggle|move|mouseout|fadeOut|auto|relative|getBoundingClientRect|jquery|maxHeight|maxWidth|minHeight|minWidth|pageY|pageX|userAgent|navigator|documentElement|div|round|min|max|abs'.split('|')));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"markerMAP.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/styles/js/markerMAP.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*
/!**
 * Created by ThinkMac on 5/9/16.
 *!/

/!*
 Leaflet.AwesomeMarkers, a plugin that adds colorful iconic markers for Leaflet, based on the Font Awesome icons
 (c) 2012-2013, Lennard Voogdt
 http://leafletjs.com
 https://github.com/lvoogdt
 *!/

/!*global L*!/

(function (window, document, undefined) {
    "use strict";
    /!*
     * Leaflet.AwesomeMarkers assumes that you have already included the Leaflet library.
     *!/

    L.AwesomeMarkers = {};

    L.AwesomeMarkers.version = '2.0.1';

    L.AwesomeMarkers.Icon = L.Icon.extend({
        options: {
            iconSize: [35, 45],
            iconAnchor:   [17, 42],
            popupAnchor: [1, -32],
            shadowAnchor: [10, 12],
            shadowSize: [36, 16],
            className: 'awesome-marker',
            prefix: 'glyphicon',
            spinClass: 'fa-spin',
            extraClasses: '',
            icon: 'home',
            markerColor: 'blue',
            iconColor: 'white'
        },

        initialize: function (options) {
            options = L.Util.setOptions(this, options);
        },

        createIcon: function () {
            var div = document.createElement('div'),
                options = this.options;

            if (options.icon) {
                div.innerHTML = this._createInner();
            }

            if (options.bgPos) {
                div.style.backgroundPosition =
                    (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
            }

            this._setIconStyles(div, 'icon-' + options.markerColor);
            return div;
        },

        _createInner: function() {
            var iconClass, iconSpinClass = "", iconColorClass = "", iconColorStyle = "", options = this.options;

            if(options.icon.slice(0,options.prefix.length+1) === options.prefix + "-") {
                iconClass = options.icon;
            } else {
                iconClass = options.prefix + "-" + options.icon;
            }

            if(options.spin && typeof options.spinClass === "string") {
                iconSpinClass = options.spinClass;
            }

            if(options.iconColor) {
                if(options.iconColor === 'white' || options.iconColor === 'black') {
                    iconColorClass = "icon-" + options.iconColor;
                } else {
                    iconColorStyle = "style='color: " + options.iconColor + "' ";
                }
            }

            return "<i " + iconColorStyle + "class='" + options.extraClasses + " " + options.prefix + " " + iconClass + " " + iconSpinClass + " " + iconColorClass + "'></i>";
        },

        _setIconStyles: function (img, name) {
            var options = this.options,
                size = L.point(options[name === 'shadow' ? 'shadowSize' : 'iconSize']),
                anchor;

            if (name === 'shadow') {
                anchor = L.point(options.shadowAnchor || options.iconAnchor);
            } else {
                anchor = L.point(options.iconAnchor);
            }

            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }

            img.className = 'awesome-marker-' + name + ' ' + options.className;

            if (anchor) {
                img.style.marginLeft = (-anchor.x) + 'px';
                img.style.marginTop  = (-anchor.y) + 'px';
            }

            if (size) {
                img.style.width  = size.x + 'px';
                img.style.height = size.y + 'px';
            }
        },

        createShadow: function () {
            var div = document.createElement('div');

            this._setIconStyles(div, 'shadow');
            return div;
        }
    });

    L.AwesomeMarkers.icon = function (options) {
        return new L.AwesomeMarkers.Icon(options);
    };

}(this, document));
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sidebar.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/styles/js/sidebar.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/* ========================================================================
 * Bootstrap: sidebar.js v0.1
 * ========================================================================
 * Copyright 2011-2014 Asyraf Abdul Rahman
 * Licensed under MIT
 * ======================================================================== */
+function ($) {
  'use strict'; // SIDEBAR PUBLIC CLASS DEFINITION
  // ================================

  var Sidebar = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Sidebar.DEFAULTS, options);
    this.transitioning = null;
    if (this.options.parent) this.$parent = $(this.options.parent);
    if (this.options.toggle) this.toggle();
  };

  Sidebar.DEFAULTS = {
    toggle: true
  };

  Sidebar.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('sidebar-open')) return;
    var startEvent = $.Event('show.bs.sidebar');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    this.$element.addClass('sidebar-open');
    this.transitioning = 1;

    var complete = function () {
      this.$element;
      this.transitioning = 0;
      this.$element.trigger('shown.bs.sidebar');
    };

    if (!$.support.transition) return complete.call(this);
    this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(400);
  };

  Sidebar.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('sidebar-open')) return;
    var startEvent = $.Event('hide.bs.sidebar');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    this.$element.removeClass('sidebar-open');
    this.transitioning = 1;

    var complete = function () {
      this.transitioning = 0;
      this.$element.trigger('hidden.bs.sidebar');
    };

    if (!$.support.transition) return complete.call(this);
    this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(400);
  };

  Sidebar.prototype.toggle = function () {
    this[this.$element.hasClass('sidebar-open') ? 'hide' : 'show']();
  };

  var old = $.fn.sidebar;

  $.fn.sidebar = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.sidebar');
      var options = $.extend({}, Sidebar.DEFAULTS, $this.data(), typeof options == 'object' && option);
      if (!data && options.toggle && option == 'show') option = !option;
      if (!data) $this.data('bs.sidebar', data = new Sidebar(this, options));
      if (typeof option == 'string') data[option]();
    });
  };

  $.fn.sidebar.Constructor = Sidebar;

  $.fn.sidebar.noConflict = function () {
    $.fn.sidebar = old;
    return this;
  };

  $(document).on('click.bs.sidebar.data-api', '[data-toggle="sidebar"]', function (e) {
    var $this = $(this),
        href;
    var target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
    var $target = $(target);
    var data = $target.data('bs.sidebar');
    var option = data ? 'toggle' : $this.data();
    $target.sidebar(option);
  });
  $('html').on('click.bs.sidebar.autohide', function (event) {
    var $this = $(event.target);
    var isButtonOrSidebar = $this.is('.sidebar, [data-toggle="sidebar"]') || $this.parents('.sidebar, [data-toggle="sidebar"]').length;

    if (isButtonOrSidebar) {
      return;
    } else {
      var $target = $('.sidebar');
      $target.each(function (i, trgt) {
        var $trgt = $(trgt);

        if ($trgt.data('bs.sidebar') && $trgt.hasClass('sidebar-open')) {
          $trgt.sidebar('hide');
        }
      });
    }
  });
}(jQuery);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"home.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client/home.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
let Template;
module.link("meteor/templating", {
  Template(v) {
    Template = v;
  }

}, 0);
let ReactiveVar;
module.link("meteor/reactive-var", {
  ReactiveVar(v) {
    ReactiveVar = v;
  }

}, 1);
let flashMessages;
module.link("meteor/mrt:flash-messages", {
  flashMessages(v) {
    flashMessages = v;
  }

}, 2);
module.link("./home.html");
Template.header.helpers({
  namaApp: function () {
    return sAPPName;
  }
});
Template.login.helpers({
  namaApp: function () {
    return sAPPName;
  },
  sHeaderBackground: function () {
    return sHeaderBackground;
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"configurations.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// configurations.js                                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**
 * Created by ThinkMac on 10/13/15.
 */
EncrypConfig = {
  enforceEmailVerification: false
}; // GENERAL CONFIG

sAPPName = "Flexurio";
apiPath = 'flexurioAPI'; // KEY OAUTH

google = {
  clientId: "792566970662-77l1se8suusk89b4mf8iadp730alq2jo.apps.googleusercontent.com",
  clientSecret: "prSMw73wH30qBzLcchEcD8_I"
};
facebook = {
  appId: "792566970662-77l1se8suusk89b4mf8iadp730alq2jo.apps.googleusercontent.com",
  secret: "prSMw73wH30qBzLcchEcD8_I"
}; // REDIS

redisSERVER = {
  host: "YOURREDISSERVER",
  port: "YOURREDISPORT" // THEME COLOR

};
sHeaderBackground = "#0E487A";
sHeaderBackgroundSecondary = "#0E5AA4";
sProfileBackground = "#0C3351";
sGeneralFontBackground = "white";
sGeneralFont = "#0E487A"; // CONF ON SERVER

sURL_upUser = "http://localhost:3000/";
sURL = "http://localhost:3000/";
sLokasi_upUser = process.env.PWD + "/public/";
sAvatar = sURL + "images/avatar.svg";
sLogo = sURL + "images/logo.svg";
sBackground = sURL + "images/background.svg";
Meteor.absoluteUrl.defaultOptions.rootUrl = sURL;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"global.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// global.js                                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**
 * Created by Jayuda on 7/15/17.
 */
flxgroup = function () {
  var has = function (obj, target) {
    return _.any(obj, function (value) {
      return _.isEqual(value, target);
    });
  };

  var keys = function (data, names) {
    return _.reduce(data, function (memo, item) {
      var key = _.pick(item, names);

      if (!has(memo, key)) {
        memo.push(key);
      }

      return memo;
    }, []);
  };

  var group = function (data, names, skolom) {
    var stems = keys(data, names);
    return _.map(stems, function (stem) {
      return {
        kolom: skolom,
        key: stem,
        vals: _.map(_.where(data, stem), function (item) {
          return _.omit(item, names);
        })
      };
    });
  };

  group.register = function (name, converter) {
    return group[name] = function (data, names, skolom) {
      return _.map(group(data, names, skolom), converter);
    };
  };

  return group;
}();

flxgroup.register("sum", function (item) {
  return _.extend({}, item.key, {
    SUM: _.reduce(item.vals, function (memo, node) {
      return memo + Number(node["" + item.kolom + ""]);
    }, 0)
  });
});
flxgroup.register("count", function (item) {
  return _.extend({}, item.key, {
    COUNT: _.reduce(item.vals, function (memo, node) {
      return memo + 1;
    }, 0)
  });
});
flxgroup.register("avg", function (item) {
  console.log(item.vals.length);
  return _.extend({}, item.key, {
    AVG: _.reduce(item.vals, function (memo, node) {
      return memo + Number(node["" + item.kolom + ""]);
    }, 0) / item.vals.length
  });
});
flxgroup.register("max", function (item) {
  return _.extend({}, item.key, {
    MAX: _.reduce(item.vals, function (memo, node) {
      return Math.max(memo, Number(node["" + item.kolom + ""]));
    }, Number.NEGATIVE_INFINITY)
  });
});
flxgroup.register("min", function (item) {
  return _.extend({}, item.key, {
    MIN: _.reduce(item.vals, function (memo, node) {
      return Math.min(memo, Number(node["" + item.kolom + ""]));
    }, Number.NEGATIVE_INFINITY)
  });
});

adaDATA = function (obj) {
  try {
    // null and undefined are "empty"
    if (obj == null) return false;
    if (obj == undefined) return false;
    if (obj == "") return false; // untuk boolean

    if (obj == true) return true;
    if (obj == false) return false; // Assume if it has a length property with a non-zero value
    // that that property is correct.

    if (obj.length > 0) return true;
    if (obj.length === 0) return false;
    if (typeof obj == "number" && obj != 0) return true; // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.

    if (typeof obj !== "object") return false; // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    for (let key in obj) {
      if (hasOwnProperty.call(obj, key)) return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

dateAdd = function (date, sDatePart, jumlahAdd) {
  var dateNew = new Date();

  if (sDatePart == "minutes") {
    var menitBaru = date.getMinutes() + jumlahAdd;
    dateNew = date.setMinutes(menitBaru);
  }

  if (sDatePart == "hours") {
    var menitBaru = date.getHours() + jumlahAdd;
    dateNew = date.setHours(menitBaru);
  }

  if (sDatePart == "days") {
    var hariBaru = date.getDate() + jumlahAdd;
    dateNew = date.setDate(hariBaru);
  }

  if (sDatePart == "months") {
    var bulanBaru = date.getMonth() + jumlahAdd;
    dateNew = date.setMonth(bulanBaru);
  }

  if (sDatePart == "years") {
    var tahunBaru = date.getFullYear() + jumlahAdd;
    dateNew = date.setFullYear(tahunBaru);
  }

  return new Date(dateNew);
};

ArrayRemove = function (oArray, sPropertyElement, value) {
  return oArray.filter(function (val) {
    return val[sPropertyElement] !== value;
  });
};

random = function () {
  return Math.floor(Math.random() * 100 + 1);
};

isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});

require("/lib/template.moduleumum.js");
require("/client/views/core/template.actionListview.js");
require("/client/views/core/template.activitylogs.js");
require("/client/views/core/template.apimanager.js");
require("/client/views/core/template.editYourAvatarModal.js");
require("/client/views/core/template.header.js");
require("/client/views/core/template.loading.js");
require("/client/views/core/template.login.js");
require("/client/views/core/template.member.js");
require("/client/views/core/template.menu.js");
require("/client/views/core/template.menuAuth.js");
require("/client/views/core/template.menuFab.js");
require("/client/views/core/template.menuGroup.js");
require("/client/views/core/template.message.js");
require("/client/views/core/template.oraono.js");
require("/client/views/core/template.profile.js");
require("/client/views/core/template.profileData.js");
require("/client/views/core/template.profilebar.js");
require("/client/views/core/template.report.js");
require("/client/views/core/template.sidebar.js");
require("/client/views/core/template.utama.js");
require("/client/views/workorder/template.wo.js");
require("/client/views/workorder/template.woSubTipe.js");
require("/client/views/workorder/template.woSubTipeDetail.js");
require("/client/views/workorder/template.woTipe.js");
require("/client/template.home.js");
require("/lib/collections.js");
require("/lib/moduleumum.js");
require("/lib/router.js");
require("/client/styles/js/controlmenu.js");
require("/client/styles/js/flexurio.js");
require("/client/styles/js/jquery.imgareaselect.pack.js");
require("/client/styles/js/markerMAP.js");
require("/client/styles/js/sidebar.js");
require("/client/views/core/actionListview.js");
require("/client/views/core/activitylogs.js");
require("/client/views/core/apimanager.js");
require("/client/views/core/editYourAvatarModal.js");
require("/client/views/core/header.js");
require("/client/views/core/loading.js");
require("/client/views/core/login.js");
require("/client/views/core/member.js");
require("/client/views/core/menu.js");
require("/client/views/core/menuAuth.js");
require("/client/views/core/menuFab.js");
require("/client/views/core/menuGroup.js");
require("/client/views/core/message.js");
require("/client/views/core/oraono.js");
require("/client/views/core/profile.js");
require("/client/views/core/profileData.js");
require("/client/views/core/profilebar.js");
require("/client/views/core/sidebar.js");
require("/client/views/core/utama.js");
require("/client/views/workorder/wo.js");
require("/client/views/workorder/woSubTipe.js");
require("/client/views/workorder/woSubTipeDetail.js");
require("/client/views/workorder/woTipe.js");
require("/client/home.js");
require("/configurations.js");
require("/global.js");