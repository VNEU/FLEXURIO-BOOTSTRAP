var require = meteorInstall({"lib":{"collections.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// lib/collections.js                                                                                   //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"moduleumum.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// lib/moduleumum.js                                                                                    //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// lib/router.js                                                                                        //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"collectionsHook.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/collectionsHook.js                                                                            //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
var kolomStandar = ['_id', 'aktifYN', 'createByID', 'createBy', 'createAt', 'updateByID', 'updateBy', 'updateAt', 'deleteByID', 'deleteBy', 'deleteAt'];
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"countBadge.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/countBadge.js                                                                                 //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
/**
 * Created by Jayuda on 6/1/17.
 */
countBadge = function (sRouter) {
  if (sRouter == 'messages') {
    var qty = MESSAGES.find({
      aktifYN: 1,
      status: "UNREAD"
    }).fetch().length;
    return qty;
  } else {
    return "";
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"methods.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/methods.js                                                                                    //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
let Accounts;
module.link("meteor/accounts-base", {
  Accounts(v) {
    Accounts = v;
  }

}, 0);
let Session;
module.link("meteor/session", {
  Session(v) {
    Session = v;
  }

}, 1);
Meteor.methods({
  createUserNew: function (nama, email, password) {
    if (Roles.userIsInRole(this.userId, ['root', 'administrator', 'admin'])) {
      if (Meteor.users.find({
        username: email
      }).count() === 0) {
        Accounts.createUser({
          email: email,
          password: password,
          profile: {
            name: nama,
            createAt: new Date(),
            updateAt: new Date(),
            verification: "1"
          }
        });
      }
    }
  },
  deleteUser: function (_id) {
    if (Roles.userIsInRole(this.userId, ['root', 'administrator', 'admin'])) {
      Meteor.users.remove(_id);
    }
  },
  updateUserData: function (_id, emailNew, passwordNew) {
    if (emailNew !== "") {
      if (adaDATA(MEMBER.findOne({
        _id: _id
      }).emails)) {
        Accounts.removeEmail(_id, MEMBER.findOne({
          _id: _id
        }).emails[0].address);
      }

      Accounts.addEmail(_id, emailNew);
    }

    if (passwordNew !== "") {
      Accounts.setPassword(_id, passwordNew);
    }
  },
  updateFotoMember: function (oDataFoto, idSelector) {
    if (!this.userId) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    try {
      if (!/^data:image\/png;base64,/i.test(oDataFoto)) {
        return false;
      }

      return MEMBER.update({
        _id: idSelector
      }, {
        $set: {
          'profile.fotoProfile': oDataFoto
        }
      });
    } catch (e) {
      throw new Meteor.Error(403, e.message);
    }

    return true;
  },
  updateFotoBackground: function (oDataFoto, idSelector) {
    try {
      return MEMBER.update({
        _id: idSelector
      }, {
        $set: {
          'profile.fotoBackground': oDataFoto
        }
      });
    } catch (e) {
      throw new Meteor.Error(403, e.message);
    }
  },
  cariKunci: function () {
    let sTokenKey = DATATOKEN.findOne().sTokenKey;
    MEMBER.update({
      _id: this.userId
    }, {
      $set: {
        tokenTemp: sTokenKey
      }
    });
  },
  resetKunci: function () {
    MEMBER.update({
      _id: this.userId
    }, {
      $set: {
        tokenTemp: ""
      }
    });
  },
  updatePassUser: function (_id, passwordNew) {
    if (passwordNew !== "") {
      Accounts.setPassword(_id, passwordNew);
    }
  },
  badgeData: function (sRouter) {
    var qty = countBadge(sRouter);

    if (parseInt(qty) > 0) {
      return qty;
    } else {
      return "";
    }
  }
});

setToken = function (idUser) {
  sTokenKey = DATATOKEN.findOne().sTokenKey;
  return sTokenKey;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/publications.js                                                                               //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
/**
* Flexruio Created by YN. Pamungkas Jayuda.
*/
Meteor.publish('member', function (iLimit, oFilter, oOptions) {
  if (this.userId) {
    var oOPTIONS = Object.assign({}, {
      fields: {
        profile: 1,
        username: 1
      }
    }, oOptions);
    oOPTIONS.limit = iLimit * 2;

    if (iLimit == 0) {
      delete oOPTIONS.limit;
    }

    if (Roles.userIsInRole(this.userId, ['root', 'administrator'])) {
      return Meteor.users.find({
        aktifYN: 1
      });
    } else {
      return Meteor.users.find(oFilter, oOPTIONS);
    }
  } else {
    this.ready();
  }
});
Meteor.publish('menuGroup', function () {
  if (this.userId) {
    var menuAuth = MENUAUTH.find({
      userId: this.userId
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

    if (Roles.userIsInRole(this.userId, ['root', 'administrator'])) {
      return MENUGROUP.find({
        aktifYN: 1
      });
    } else {
      return MENUGROUP.find(oFILTERS);
    }
  } else {
    this.ready();
  }
});
Meteor.publish('messageMember', function (iLimit) {
  if (this.userId) {
    var thisusername = MEMBER.findOne({
      _id: this.userId
    }).username;
    var dataMESSAGE = MESSAGEMEMBER.find({
      username: thisusername,
      aktifYN: 1
    });
    var idMessage = dataMESSAGE.map(function (p) {
      return p.idMessage;
    });
    var oOPTIONS = {
      sort: {
        createAt: -1
      },
      limit: iLimit
    };

    if (Roles.userIsInRole(this.userId, ['root', 'administrator'])) {
      return MESSAGEMEMBER.find({
        aktifYN: 1
      }, oOPTIONS);
    } else {
      return MESSAGEMEMBER.find({
        idMessage: {
          $in: idMessage
        },
        aktifYN: 1
      }, oOPTIONS);
    }
  } else {
    this.ready();
  }
});
Meteor.publish('message', function (iLimit) {
  if (this.userId) {
    var thisusername = MEMBER.findOne({
      _id: this.userId
    }).username;
    var dataMESSAGE = MESSAGEMEMBER.find({
      username: thisusername,
      aktifYN: 1
    });
    var idMessage = dataMESSAGE.map(function (p) {
      return p.idMessage;
    });
    var oOPTIONS = {
      sort: {
        createAt: -1
      },
      limit: iLimit
    };

    if (Roles.userIsInRole(this.userId, ['root', 'administrator'])) {
      return MESSAGE.find({
        aktifYN: 1
      }, oOPTIONS);
    } else {
      return MESSAGE.find({
        _id: {
          $in: idMessage
        },
        aktifYN: 1
      }, oOPTIONS);
    }
  } else {
    this.ready();
  }
});
Meteor.publish('menu', function () {
  if (this.userId) {
    var menuAuth = MENUAUTH.find({
      userId: this.userId
    });
    var idMenu = menuAuth.map(function (p) {
      return p.idMENU;
    });

    if (Roles.userIsInRole(this.userId, ['root', 'administrator'])) {
      return MENU.find({
        aktifYN: 1
      });
    } else {
      return MENU.find({
        _id: {
          $in: idMenu
        },
        aktifYN: 1
      });
    }
  } else {
    this.ready();
  }
});

publishData = function (sNama, sObject, oWhere, oConditions) {
  Meteor.publish(sNama, function (iLimit, oFilter, oOptions) {
    // gabungkan OR
    var atauALL = [{
      aktifYN: 1
    }, {
      aktifYN: "1"
    }, {
      aktifYN: 1
    }];

    if (adaDATA(oWhere["$or"])) {
      atauALL = atauALL.concat(oWhere["$or"]);
    }

    var oFILTER_OR = oFilter["$or"];

    if (adaDATA(oFILTER_OR)) {
      atauALL = atauALL.concat(oFilter["$or"]);
    } // gabungkan AND


    var andALL = [];

    if (adaDATA(oWhere["$and"])) {
      andALL = andALL.concat(oWhere["$and"]);
    }

    if (adaDATA(oFilter["$and"])) {
      andALL = andALL.concat(oFilter["$and"]);
    } // gabungkan oWhere dan oFilter


    oWhere = Object.assign({}, oWhere, oFilter);
    oWhere["$or"] = atauALL;
    oWhere["$and"] = andALL; // gabungkan oConditions

    oConditions = Object.assign({}, oConditions, oOptions);

    if (!adaDATA(oConditions)) {
      oConditions = {
        sort: {
          createAt: -1
        },
        limit: iLimit
      };
    }

    oConditions.limit = iLimit * 2;

    if (iLimit == 0) {
      delete oConditions.limit;
    }

    if (this.userId) {
      var data = sObject.find(oFilter, oConditions);
      return data;
    } else {
      this.ready();
    }
  });
};
/**    publishData(NAME_Publications, OBJECT_Collections, OBJECT_OFilter, OBJECT_oOPTIONS)      **/


publishData("menuAuthku", MENUAUTH, {}, {});
publishData('menuAuth', MENUAUTH, {}, {});
publishData('activitylogs', ACTIVITYLOGS, {}, {});
publishData('profileData', PROFILEDATA, {}, {});
publishData('woTipe', WOTIPE, {}, {});
publishData('woSubTipe', WOSUBTIPE, {}, {});
publishData('woSubTipeDetail', WOSUBTIPEDETAIL, {}, {});
publishData('wo', WO, {}, {});
publishData('apimanager', APIMANAGER, {}, {});
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publicationsAuth.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/publicationsAuth.js                                                                           //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
MEMBER.allow({
  'insert': function (userId, doc) {
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    return true;
  }
});
APIMANAGER.allow({
  'insert': function (userId, doc) {
    // do somethings here
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    // do somethings here
    return true;
  }
});
WO.allow({
  'insert': function (userId, doc) {
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    return true;
  }
});
WOTIPE.allow({
  'insert': function (userId, doc) {
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    return true;
  }
});
WOSUBTIPE.allow({
  'insert': function (userId, doc) {
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    return true;
  }
});
WOSUBTIPEDETAIL.allow({
  'insert': function (userId, doc) {
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    return true;
  }
});
MENUAUTH.allow({
  'insert': function (userId, doc) {
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    // do somethings here
    return true;
  }
});
MENU.allow({
  'insert': function (userId, doc) {
    // do somethings here
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    // do somethings here
    return true;
  }
});
MENUGROUP.allow({
  'insert': function (userId, doc) {
    // do somethings here
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    // do somethings here
    return true;
  }
});
MESSAGE.allow({
  'insert': function (userId, doc) {
    // do somethings here
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    // do somethings here
    return true;
  }
});
MESSAGEMEMBER.allow({
  'insert': function (userId, doc) {
    // do somethings here
    return true;
  },
  'remove': function (userId, doc) {
    if (Roles.userIsInRole(userId, ['root', 'administrator'])) {
      return true;
    } else {
      return false;
    }
  },
  'update': function (userId, doc, fieldNames, modifier) {
    // do somethings here
    return true;
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"redis.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/redis.js                                                                                      //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rest.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/rest.js                                                                                       //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
/**
 * Created by ThinkMac on 8/11/16.
 */
Meteor.startup(function () {
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    apiPath: "flxAPI"
  });
  Api.addCollection(WO, {
    routeOptions: {
      authRequired: true
    },
    endpoints: {
      get: {
        authRequired: true
      },
      post: {
        authRequired: true
      },
      put: {
        authRequired: true,
        roleRequired: 'admin'
      },
      delete: {
        authRequired: true,
        roleRequired: 'admin'
      }
    }
  }); // Maps to: /api/articles/:id

  Api.addRoute('/wo/:id', {
    authRequired: true
  }, {
    get: function () {
      console.log(Api.users);
      return WO.findOne(this.urlParams.id);
    }
  });
}); //curl http://localhost:3000/flxAPI/login/ -d "username=admin@flexurio.com&password=flx.indo"
//curl -H "x-auth-token: ZQFv9449VLIF5I8BPc0v2kqg4dK1KouNNQXIa9eu6My" -H "x-user-id: 4BxgJARXEevAbuirr" http://localhost:3000/flx/wo/
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"init":{"main.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/init/main.js                                                                                  //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
DATATOKEN = new Mongo.Collection('dataToken');
Meteor.startup(function () {
  console.log("Flexurio - start on server . . . ");

  if (MENU.find().count() === 0) {
    [{
      "_id": "YjcMkpQt8NxF9pddYcE",
      "namaMENU": "Dashboard",
      "routerMENU": "/",
      "groupMENU": "HOME",
      "iconMENU": "glyphicon glyphicon-th-large",
      "aktifYN": 1
    }, {
      "_id": "YjcMkpQt8NxF9pYcE",
      "namaMENU": "Messages",
      "routerMENU": "message",
      "groupMENU": "HOME",
      "iconMENU": "glyphicon glyphicon-envelope",
      "aktifYN": 1
    }, {
      "namaMENU": "Menu",
      "routerMENU": "menuGroup",
      "groupMENU": "SETTINGS",
      "iconMENU": "glyphicon glyphicon-th-list",
      aktifYN: 1
    }, {
      "namaMENU": "Members",
      "routerMENU": "member",
      "groupMENU": "SETTINGS",
      "iconMENU": "glyphicon glyphicon-user",
      aktifYN: 1
    }, {
      "_id": "kaQdHiHmbbJkrW749",
      "namaMENU": "Tipe WO",
      "routerMENU": "woTipe",
      "groupMENU": "WORK ORDER",
      "iconMENU": "glyphicon glyphicon-list",
      aktifYN: 1
    }, {
      "_id": "kaQdHiHmbbJkrdW749",
      "namaMENU": "WO",
      "routerMENU": "wo",
      "groupMENU": "WORK ORDER",
      "iconMENU": "glyphicon glyphicon-list",
      aktifYN: 1
    }].forEach(function (dataMenu) {
      MENU.insert(dataMenu);
    });
  }

  if (MENUGROUP.find().count() === 0) {
    [{
      "_id": "D8zEEzJxrZi8YFnhj",
      "namaMENUGROUP": "HOME",
      "iconMENUGROUP": "glyphicon glyphicon-home",
      "locationsMENUGROUP": "1. Top Locations",
      "aktifYN": 1
    }, {
      "namaMENUGROUP": "SETTINGS",
      "iconMENUGROUP": "glyphicon glyphicon-wrench",
      "locationsMENUGROUP": "2. Middle Locations",
      aktifYN: 1
    }, {
      "namaMENUGROUP": "WORK ORDER",
      "iconMENUGROUP": "glyphicon glyphicon-blackboard",
      "locationsMENUGROUP": "2. Middle Locations",
      aktifYN: 1
    }].forEach(function (dataMenuGroup) {
      MENUGROUP.insert(dataMenuGroup);
    });
  }

  if (MEMBER.find().count() === 0) {
    var seedUserId = Accounts.createUser({
      password: "flx.indo",
      email: 'admin@flexurio.com',
      username: 'admin@flexurio.com',
      profile: {
        name: 'administrator'
      }
    });
  }

  if (DATATOKEN.find().count() === 0) {
    [{
      "sTokenKey": "QWjnk034K#JSND239NSD0&99mn_bKJort78s86fg0sd765fwjh4knsd*&jknerkwjf328",
      "aktifYN": true
    }].forEach(function (dataToken) {
      DATATOKEN.insert(dataToken);
    });
  }

  var idAdmin = MEMBER.findOne({
    'emails.address': 'admin@flexurio.com'
  })._id;

  Roles.addUsersToRoles(idAdmin, ['root', 'administrator'], Roles.GLOBAL_GROUP);
  Roles.getUsersInRole(['root', 'administrator']).map(function (user, index, originalCursor) {
    console.log("Flexurio - Check Auth Admin . . . ");
    MENUAUTH.find({
      userId: user._id
    }).forEach(function (obj) {
      MENUAUTH.remove({
        _id: obj._id
      });
    });
    MENU.find({
      aktifYN: 1
    }).forEach(function (obj) {
      MENUAUTH.insert({
        userId: user._id,
        idMENU: obj._id,
        namaMENU: obj.namaMENU,
        groupMENU: obj.groupMENU,
        routerMENU: obj.routerMENU,
        authTipe: "ADD",
        aktifYN: 1
      });
      MENUAUTH.insert({
        userId: user._id,
        idMENU: obj._id,
        namaMENU: obj.namaMENU,
        groupMENU: obj.groupMENU,
        routerMENU: obj.routerMENU,
        authTipe: "EDIT",
        aktifYN: 1
      });
      MENUAUTH.insert({
        userId: user._id,
        idMENU: obj._id,
        namaMENU: obj.namaMENU,
        groupMENU: obj.groupMENU,
        routerMENU: obj.routerMENU,
        authTipe: "DELETE",
        aktifYN: 1
      });
      MENUAUTH.insert({
        userId: user._id,
        idMENU: obj._id,
        namaMENU: obj.namaMENU,
        groupMENU: obj.groupMENU,
        routerMENU: obj.routerMENU,
        authTipe: "CONFIRM",
        aktifYN: 1
      });
      MENUAUTH.insert({
        userId: user._id,
        idMENU: obj._id,
        namaMENU: obj.namaMENU,
        groupMENU: obj.groupMENU,
        routerMENU: obj.routerMENU,
        authTipe: "PRINT",
        aktifYN: 1
      });
      MENUAUTH.insert({
        userId: user._id,
        idMENU: obj._id,
        namaMENU: obj.namaMENU,
        groupMENU: obj.groupMENU,
        routerMENU: obj.routerMENU,
        authTipe: "DOWNLOAD",
        aktifYN: 1
      });
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// server/main.js                                                                                       //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
Meteor.startup(() => {
  Accounts.loginServiceConfiguration.remove({
    service: "google"
  });
  Accounts.loginServiceConfiguration.insert({
    service: "google",
    clientId: google.clientId,
    secret: google.clientSecret
  });
  ServiceConfiguration.configurations.remove({
    service: 'facebook'
  });
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: facebook.appId,
    secret: facebook.secret
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"configurations.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// configurations.js                                                                                    //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////

},"global.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// global.js                                                                                            //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/lib/collections.js");
require("/lib/moduleumum.js");
require("/lib/router.js");
require("/server/collectionsHook.js");
require("/server/countBadge.js");
require("/server/methods.js");
require("/server/publications.js");
require("/server/publicationsAuth.js");
require("/server/redis.js");
require("/server/rest.js");
require("/configurations.js");
require("/global.js");
require("/server/init/main.js");
require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvbGliL2NvbGxlY3Rpb25zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9saWIvbW9kdWxldW11bS5qcyIsIm1ldGVvcjovL/CfkrthcHAvbGliL3JvdXRlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2NvbGxlY3Rpb25zSG9vay5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2NvdW50QmFkZ2UuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tZXRob2RzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcHVibGljYXRpb25zQXV0aC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL3JlZGlzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvcmVzdC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2luaXQvbWFpbi5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2NvbmZpZ3VyYXRpb25zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9nbG9iYWwuanMiXSwibmFtZXMiOlsiTW9uZ28iLCJtb2R1bGUiLCJsaW5rIiwidiIsIk1FTlUiLCJDb2xsZWN0aW9uIiwiTUVOVUdST1VQIiwiTUVOVUFVVEgiLCJNRU1CRVIiLCJNZXRlb3IiLCJ1c2VycyIsIk1FU1NBR0UiLCJNRVNTQUdFTUVNQkVSIiwiQUNUSVZJVFlMT0dTIiwiUFJPRklMRURBVEEiLCJXT1RJUEUiLCJXT1NVQlRJUEUiLCJXT1NVQlRJUEVERVRBSUwiLCJXTyIsIkFQSU1BTkFHRVIiLCJTZXNzaW9uIiwic2V0U0VTU0lPTiIsIm5hbWEiLCJuaWxhaSIsIm5pbGFpQmFydSIsImhpZGVEYXRhIiwiVXNlcklEIiwic2V0IiwiRmxhc2hNZXNzYWdlcyIsInNlbmRXYXJuaW5nIiwiZ2V0U0VTU0lPTiIsImFkYURBVEEiLCJnZXQiLCJzaG93RGF0YSIsInNldEJPT0xFQU4iLCJnZXRCT09MRUFOIiwiaW5jcmVtZW50TGltaXQiLCJuZXdMaW1pdCIsImdldFJvdXRlIiwic1VSTE5vdyIsInNSb3V0ZSIsInJlcGxhY2UiLCJzVVJMIiwiaXNBZG1pbkFjdGlvbnMiLCJzQWN0aW9ucyIsImRhdGFBY3Rpb25zIiwiZmluZE9uZSIsInVzZXJJZCIsInJvdXRlck1FTlUiLCJhdXRoVGlwZSIsImlzQWRtaW4iLCJpZE1lbnUiLCJpZE1FTlUiLCJzdWJzY3JpYnRpb24iLCJzT2JqZWN0Iiwib0ZpbHRlciIsIm9PcHRpb25zIiwiaUxpbWl0Iiwic3Vic2NyaWJlIiwiRW1haWxVc2VyIiwidXNlciIsImVtYWlscyIsImFkZHJlc3MiLCJVc2VyTmFtZSIsInByb2ZpbGUiLCJuYW1lIiwiU2Nyb2xsSGFuZGxlciIsIiQiLCJ3aW5kb3ciLCJzY3JvbGwiLCJzY3JvbGxUb3AiLCJoZWlnaHQiLCJkb2N1bWVudCIsIlNjcm9sbDJUb3AiLCJhbmltYXRlIiwidXBsb2FkRm90b01lbWJlciIsImlkTWVtYmVyIiwiaWQiLCJkaXJlY3RvcnkiLCJuYW1lZmlsZSIsIlNldEZPVE8iLCJpUGFuamFuZyIsImlMZWJhciIsInNNZXRob2QiLCJzUGljdEhhc2lsIiwic0lEVXNlciIsInBpY3RQcm9maWxlQmFja2dyb3VuZCIsImZvdG8iLCJzQmFja2dyb3VuZCIsImRhdGFGb3RvIiwiX2lkIiwiZm90b0JhY2tncm91bmQiLCJ1bmRlZmluZWQiLCJlcnJvciIsInBpY3RQcm9maWxlIiwic0F2YXRhciIsImZvdG9Qcm9maWxlIiwiaW5zZXJ0TG9ncyIsImtvZGVBQ1RJVklUWUxPR1MiLCJuYW1hQUNUSVZJVFlMT0dTIiwiaW5zZXJ0IiwiY3JlYXRlQnkiLCJjcmVhdGVCeUlEIiwic2VuZFN1Y2Nlc3MiLCJGaWxlUmVhZGVyT2JqZWN0IiwicHJldmlld0ltYWdlIiwiZmlsZSIsImNhbGxiYWNrIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImUiLCJfIiwiY29udGFpbnMiLCJGSUxFVVBMT0FEIiwiSU1HIiwiVFlQRSIsInR5cGUiLCJFcnJvciIsInNpemUiLCJNQVhTSVpFIiwicmVzdWx0IiwidGFyZ2V0Iiwib25lcnJvciIsInJlYWRBc0RhdGFVUkwiLCJzZXRSRVBPUlQiLCJzUmVwb3J0TmFtZSIsInNSZXBvcnROdW1iZXIiLCJzUmVwb3J0Rm9vdE5vdGUiLCJzQ29sbGVjdGlvbnMiLCJzQmFja1VybCIsImNDb2xsZWN0aW9uc0luaXRpYWwiLCJhUmVwb3J0RmlsdGVyIiwiYVJlcG9ydE9wdGlvbnMiLCJvUmVwb3J0RmllbGREaXNwbGF5IiwiZmluZCIsImZldGNoIiwiUm91dGVyIiwiZ28iLCJTZWxlY3RlZFRlcnBpbGloIiwiZWxlbWVudElkIiwiZWx0IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RlZEluZGV4Iiwib3B0aW9ucyIsInRleHQiLCJzZXRLdW5jaSIsImt1bmNpVXNlciIsImRhdGFNZW1iZXIiLCJ0b2tlblRlbXAiLCJzVG9rZW5LZXkiLCJrZWx1YXIiLCJwdWJsaWNSU0EiLCJrdW5jaUhpZGUiLCJwcml2YXRlUlNBIiwia3VuY2lTaG93IiwiZGF0YSIsImt1bmNpIiwia3VuYyIsIkpTRW5jcnlwdCIsImRlZmF1bHRfa2V5X3NpemUiLCJzZXRLZXkiLCJkZWNyeXB0IiwiZW5jcnlwdCIsImNhbGwiLCJsb2dvdXQiLCJzZW5kRXJyb3IiLCJpc1JvbGVBZG1pbiIsIlJvbGVzIiwidXNlcklzSW5Sb2xlIiwiaXNMb2NrTWVudSIsInBsdWdpbiIsIm5vdEZvdW5kVGVtcGxhdGUiLCJjb25maWd1cmUiLCJyb3V0ZSIsInJlbmRlciIsImtvbG9tU3RhbmRhciIsImNvdW50QmFkZ2UiLCJzUm91dGVyIiwicXR5IiwiTUVTU0FHRVMiLCJha3RpZllOIiwic3RhdHVzIiwibGVuZ3RoIiwiQWNjb3VudHMiLCJtZXRob2RzIiwiY3JlYXRlVXNlck5ldyIsImVtYWlsIiwicGFzc3dvcmQiLCJ1c2VybmFtZSIsImNvdW50IiwiY3JlYXRlVXNlciIsImNyZWF0ZUF0IiwiRGF0ZSIsInVwZGF0ZUF0IiwidmVyaWZpY2F0aW9uIiwiZGVsZXRlVXNlciIsInJlbW92ZSIsInVwZGF0ZVVzZXJEYXRhIiwiZW1haWxOZXciLCJwYXNzd29yZE5ldyIsInJlbW92ZUVtYWlsIiwiYWRkRW1haWwiLCJzZXRQYXNzd29yZCIsInVwZGF0ZUZvdG9NZW1iZXIiLCJvRGF0YUZvdG8iLCJpZFNlbGVjdG9yIiwidGVzdCIsInVwZGF0ZSIsIiRzZXQiLCJtZXNzYWdlIiwidXBkYXRlRm90b0JhY2tncm91bmQiLCJjYXJpS3VuY2kiLCJEQVRBVE9LRU4iLCJyZXNldEt1bmNpIiwidXBkYXRlUGFzc1VzZXIiLCJiYWRnZURhdGEiLCJwYXJzZUludCIsInNldFRva2VuIiwiaWRVc2VyIiwicHVibGlzaCIsIm9PUFRJT05TIiwiT2JqZWN0IiwiYXNzaWduIiwiZmllbGRzIiwibGltaXQiLCJyZWFkeSIsIm1lbnVBdXRoIiwiZ3JvdXBNRU5VIiwibWFwIiwicCIsIm9GSUxURVJTIiwibmFtYU1FTlVHUk9VUCIsIiRpbiIsInRoaXN1c2VybmFtZSIsImRhdGFNRVNTQUdFIiwiaWRNZXNzYWdlIiwic29ydCIsInB1Ymxpc2hEYXRhIiwic05hbWEiLCJvV2hlcmUiLCJvQ29uZGl0aW9ucyIsImF0YXVBTEwiLCJjb25jYXQiLCJvRklMVEVSX09SIiwiYW5kQUxMIiwiYWxsb3ciLCJkb2MiLCJmaWVsZE5hbWVzIiwibW9kaWZpZXIiLCJzdGFydHVwIiwiQXBpIiwiUmVzdGl2dXMiLCJ1c2VEZWZhdWx0QXV0aCIsInByZXR0eUpzb24iLCJhcGlQYXRoIiwiYWRkQ29sbGVjdGlvbiIsInJvdXRlT3B0aW9ucyIsImF1dGhSZXF1aXJlZCIsImVuZHBvaW50cyIsInBvc3QiLCJwdXQiLCJyb2xlUmVxdWlyZWQiLCJkZWxldGUiLCJhZGRSb3V0ZSIsImNvbnNvbGUiLCJsb2ciLCJ1cmxQYXJhbXMiLCJmb3JFYWNoIiwiZGF0YU1lbnUiLCJkYXRhTWVudUdyb3VwIiwic2VlZFVzZXJJZCIsImRhdGFUb2tlbiIsImlkQWRtaW4iLCJhZGRVc2Vyc1RvUm9sZXMiLCJHTE9CQUxfR1JPVVAiLCJnZXRVc2Vyc0luUm9sZSIsImluZGV4Iiwib3JpZ2luYWxDdXJzb3IiLCJvYmoiLCJuYW1hTUVOVSIsImxvZ2luU2VydmljZUNvbmZpZ3VyYXRpb24iLCJzZXJ2aWNlIiwiY2xpZW50SWQiLCJnb29nbGUiLCJzZWNyZXQiLCJjbGllbnRTZWNyZXQiLCJTZXJ2aWNlQ29uZmlndXJhdGlvbiIsImNvbmZpZ3VyYXRpb25zIiwiYXBwSWQiLCJmYWNlYm9vayIsIkVuY3J5cENvbmZpZyIsImVuZm9yY2VFbWFpbFZlcmlmaWNhdGlvbiIsInNBUFBOYW1lIiwicmVkaXNTRVJWRVIiLCJob3N0IiwicG9ydCIsInNIZWFkZXJCYWNrZ3JvdW5kIiwic0hlYWRlckJhY2tncm91bmRTZWNvbmRhcnkiLCJzUHJvZmlsZUJhY2tncm91bmQiLCJzR2VuZXJhbEZvbnRCYWNrZ3JvdW5kIiwic0dlbmVyYWxGb250Iiwic1VSTF91cFVzZXIiLCJzTG9rYXNpX3VwVXNlciIsInByb2Nlc3MiLCJlbnYiLCJQV0QiLCJzTG9nbyIsImFic29sdXRlVXJsIiwiZGVmYXVsdE9wdGlvbnMiLCJyb290VXJsIiwiZmx4Z3JvdXAiLCJoYXMiLCJhbnkiLCJ2YWx1ZSIsImlzRXF1YWwiLCJrZXlzIiwibmFtZXMiLCJyZWR1Y2UiLCJtZW1vIiwiaXRlbSIsImtleSIsInBpY2siLCJwdXNoIiwiZ3JvdXAiLCJza29sb20iLCJzdGVtcyIsInN0ZW0iLCJrb2xvbSIsInZhbHMiLCJ3aGVyZSIsIm9taXQiLCJyZWdpc3RlciIsImNvbnZlcnRlciIsImV4dGVuZCIsIlNVTSIsIm5vZGUiLCJOdW1iZXIiLCJDT1VOVCIsIkFWRyIsIk1BWCIsIk1hdGgiLCJtYXgiLCJORUdBVElWRV9JTkZJTklUWSIsIk1JTiIsIm1pbiIsImhhc093blByb3BlcnR5IiwicHJvdG90eXBlIiwiZXJyIiwiZGF0ZUFkZCIsImRhdGUiLCJzRGF0ZVBhcnQiLCJqdW1sYWhBZGQiLCJkYXRlTmV3IiwibWVuaXRCYXJ1IiwiZ2V0TWludXRlcyIsInNldE1pbnV0ZXMiLCJnZXRIb3VycyIsInNldEhvdXJzIiwiaGFyaUJhcnUiLCJnZXREYXRlIiwic2V0RGF0ZSIsImJ1bGFuQmFydSIsImdldE1vbnRoIiwic2V0TW9udGgiLCJ0YWh1bkJhcnUiLCJnZXRGdWxsWWVhciIsInNldEZ1bGxZZWFyIiwiQXJyYXlSZW1vdmUiLCJvQXJyYXkiLCJzUHJvcGVydHlFbGVtZW50IiwiZmlsdGVyIiwidmFsIiwicmFuZG9tIiwiZmxvb3IiLCJpc051bWVyaWMiLCJuIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiaXNGaW5pdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSUEsS0FBSjtBQUFVQyxNQUFNLENBQUNDLElBQVAsQ0FBWSxjQUFaLEVBQTJCO0FBQUNGLE9BQUssQ0FBQ0csQ0FBRCxFQUFHO0FBQUNILFNBQUssR0FBQ0csQ0FBTjtBQUFROztBQUFsQixDQUEzQixFQUErQyxDQUEvQztBQUtWQyxJQUFJLEdBQUcsSUFBSUosS0FBSyxDQUFDSyxVQUFWLENBQXFCLE1BQXJCLENBQVA7QUFDQUMsU0FBUyxHQUFHLElBQUlOLEtBQUssQ0FBQ0ssVUFBVixDQUFxQixXQUFyQixDQUFaO0FBQ0FFLFFBQVEsR0FBRyxJQUFJUCxLQUFLLENBQUNLLFVBQVYsQ0FBcUIsVUFBckIsQ0FBWDtBQUNBRyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0MsS0FBaEI7QUFDQUMsT0FBTyxHQUFHLElBQUlYLEtBQUssQ0FBQ0ssVUFBVixDQUFxQixTQUFyQixDQUFWO0FBQ0FPLGFBQWEsR0FBRyxJQUFJWixLQUFLLENBQUNLLFVBQVYsQ0FBcUIsZUFBckIsQ0FBaEI7QUFFQVEsWUFBWSxHQUFHLElBQUliLEtBQUssQ0FBQ0ssVUFBVixDQUFxQixjQUFyQixDQUFmO0FBQ0FTLFdBQVcsR0FBRyxJQUFJZCxLQUFLLENBQUNLLFVBQVYsQ0FBcUIsYUFBckIsQ0FBZDtBQUNBVSxNQUFNLEdBQUcsSUFBSWYsS0FBSyxDQUFDSyxVQUFWLENBQXFCLFFBQXJCLENBQVQ7QUFDQVcsU0FBUyxHQUFHLElBQUloQixLQUFLLENBQUNLLFVBQVYsQ0FBcUIsV0FBckIsQ0FBWjtBQUNBWSxlQUFlLEdBQUcsSUFBSWpCLEtBQUssQ0FBQ0ssVUFBVixDQUFxQixpQkFBckIsQ0FBbEI7QUFDQWEsRUFBRSxHQUFHLElBQUlsQixLQUFLLENBQUNLLFVBQVYsQ0FBcUIsSUFBckIsQ0FBTDtBQUNBYyxVQUFVLEdBQUcsSUFBSW5CLEtBQUssQ0FBQ0ssVUFBVixDQUFxQixZQUFyQixDQUFiLEM7Ozs7Ozs7Ozs7O0FDbEJBLElBQUllLE9BQUo7QUFBWW5CLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGdCQUFaLEVBQTZCO0FBQUNrQixTQUFPLENBQUNqQixDQUFELEVBQUc7QUFBQ2lCLFdBQU8sR0FBQ2pCLENBQVI7QUFBVTs7QUFBdEIsQ0FBN0IsRUFBcUQsQ0FBckQ7O0FBSVprQixVQUFVLEdBQUcsVUFBVUMsSUFBVixFQUFnQkMsS0FBaEIsRUFBdUI7QUFDaEMsTUFBSSxPQUFPQSxLQUFQLEtBQWtCLFNBQXRCLEVBQWlDO0FBQzdCLFFBQUlDLFNBQVMsR0FBR0MsUUFBUSxDQUFDRixLQUFELEVBQVFHLE1BQU0sRUFBZCxDQUF4QjtBQUNBTixXQUFPLENBQUNPLEdBQVIsQ0FBWUwsSUFBWixFQUFrQkUsU0FBbEI7QUFDSCxHQUhELE1BR087QUFDSEksaUJBQWEsQ0FBQ0MsV0FBZCxDQUEwQixrQ0FBMUI7QUFDQVQsV0FBTyxDQUFDTyxHQUFSLENBQVlMLElBQVosRUFBa0JDLEtBQWxCO0FBQ0g7QUFDSixDQVJEOztBQVVBTyxVQUFVLEdBQUcsVUFBVVIsSUFBVixFQUFnQjtBQUN6QixNQUFJQyxLQUFKOztBQUNBLE1BQUlRLE9BQU8sQ0FBQ1gsT0FBTyxDQUFDWSxHQUFSLENBQVlWLElBQVosQ0FBRCxDQUFYLEVBQWdDO0FBQzVCQyxTQUFLLEdBQUdILE9BQU8sQ0FBQ1ksR0FBUixDQUFZVixJQUFaLENBQVI7QUFDQSxRQUFJRSxTQUFKO0FBQ0FBLGFBQVMsR0FBR1MsUUFBUSxDQUFDVixLQUFELEVBQVFHLE1BQU0sRUFBZCxDQUFwQjtBQUNILEdBSkQsTUFJTztBQUNIRixhQUFTLEdBQUcsRUFBWjtBQUNIOztBQUNELFNBQU9BLFNBQVA7QUFDSCxDQVZEOztBQVlBVSxVQUFVLEdBQUcsVUFBVVosSUFBVixFQUFnQkMsS0FBaEIsRUFBdUI7QUFDaENILFNBQU8sQ0FBQ08sR0FBUixDQUFZTCxJQUFaLEVBQWtCQyxLQUFsQjtBQUNILENBRkQ7O0FBSUFZLFVBQVUsR0FBRyxVQUFVYixJQUFWLEVBQWdCO0FBQ3pCLFNBQU9GLE9BQU8sQ0FBQ1ksR0FBUixDQUFZVixJQUFaLENBQVA7QUFDSCxDQUZEOztBQUlBYyxjQUFjLEdBQUcsWUFBWTtBQUN6QixNQUFJQyxRQUFRLEdBQUdqQixPQUFPLENBQUNZLEdBQVIsQ0FBWSxPQUFaLElBQXVCLENBQXRDO0FBQ0FaLFNBQU8sQ0FBQ08sR0FBUixDQUFZLE9BQVosRUFBcUJVLFFBQXJCO0FBQ0gsQ0FIRDs7QUFLQUMsUUFBUSxHQUFHLFVBQVVDLE9BQVYsRUFBbUI7QUFDMUIsTUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUNFLE9BQVIsQ0FBZ0JDLElBQWhCLEVBQXNCLEVBQXRCLEVBQTBCRCxPQUExQixDQUFrQyxHQUFsQyxFQUF1QyxFQUF2QyxFQUEyQ0EsT0FBM0MsQ0FBbUQsR0FBbkQsRUFBd0QsRUFBeEQsQ0FBYjtBQUNBLFNBQU9ELE1BQVA7QUFDSCxDQUhEOztBQUtBRyxjQUFjLEdBQUcsVUFBVUgsTUFBVixFQUFrQkksUUFBbEIsRUFBNEI7QUFDekMsTUFBSUMsV0FBVyxHQUFHdEMsUUFBUSxDQUFDdUMsT0FBVCxDQUFpQjtBQUFDQyxVQUFNLEVBQUVyQixNQUFNLEVBQWY7QUFBbUJzQixjQUFVLEVBQUVSLE1BQS9CO0FBQXVDUyxZQUFRLEVBQUVMO0FBQWpELEdBQWpCLENBQWxCOztBQUNBLE1BQUlDLFdBQUosRUFBaUI7QUFDYixXQUFPLElBQVA7QUFDSCxHQUZELE1BRU87QUFDSCxXQUFPLEtBQVA7QUFDSDtBQUNKLENBUEQ7O0FBU0FLLE9BQU8sR0FBRyxVQUFVQyxNQUFWLEVBQWtCO0FBQ3hCLE1BQUlwQixPQUFPLENBQUN4QixRQUFRLENBQUN1QyxPQUFULENBQWlCO0FBQUNDLFVBQU0sRUFBRXRDLE1BQU0sQ0FBQ3NDLE1BQVAsRUFBVDtBQUEwQkssVUFBTSxFQUFFRDtBQUFsQyxHQUFqQixDQUFELENBQVgsRUFBMEU7QUFDdEUsV0FBTyxJQUFQO0FBQ0gsR0FGRCxNQUVPO0FBQ0gsV0FBTyxLQUFQO0FBQ0g7QUFDSixDQU5EOztBQVFBRSxZQUFZLEdBQUcsVUFBVUMsT0FBVixFQUFtQkMsT0FBbkIsRUFBNEJDLFFBQTVCLEVBQXNDQyxNQUF0QyxFQUE4QztBQUN6RCxTQUFPaEQsTUFBTSxDQUFDaUQsU0FBUCxDQUFpQkosT0FBakIsRUFBMEJHLE1BQTFCLEVBQWtDRixPQUFsQyxFQUEyQ0MsUUFBM0MsQ0FBUDtBQUNILENBRkQ7O0FBSUFHLFNBQVMsR0FBRyxZQUFZO0FBQ3BCLFNBQU9sRCxNQUFNLENBQUNtRCxJQUFQLEdBQWNDLE1BQWQsQ0FBcUIsQ0FBckIsRUFBd0JDLE9BQS9CO0FBQ0gsQ0FGRDs7QUFJQUMsUUFBUSxHQUFHLFlBQVk7QUFDbkIsTUFBSUgsSUFBSSxHQUFHbkQsTUFBTSxDQUFDbUQsSUFBUCxFQUFYOztBQUNBLE1BQUk3QixPQUFPLENBQUM2QixJQUFELENBQVgsRUFBbUI7QUFDZixXQUFPQSxJQUFJLENBQUNJLE9BQUwsQ0FBYUMsSUFBcEI7QUFDSCxHQUZELE1BRU87QUFDSCxXQUFPLEVBQVA7QUFDSDtBQUNKLENBUEQ7O0FBUUF2QyxNQUFNLEdBQUcsWUFBWTtBQUNqQixTQUFPakIsTUFBTSxDQUFDc0MsTUFBUCxFQUFQO0FBQ0gsQ0FGRDs7QUFJQW1CLGFBQWEsR0FBRyxVQUFVWixPQUFWLEVBQW1CQyxPQUFuQixFQUE0QkMsUUFBNUIsRUFBc0M7QUFDbERXLEdBQUMsQ0FBQ0MsTUFBRCxDQUFELENBQVVDLE1BQVYsQ0FBaUIsWUFBWTtBQUN6QixRQUFJRixDQUFDLENBQUNDLE1BQUQsQ0FBRCxDQUFVRSxTQUFWLEtBQXdCSCxDQUFDLENBQUNDLE1BQUQsQ0FBRCxDQUFVRyxNQUFWLEVBQXhCLElBQThDSixDQUFDLENBQUNLLFFBQUQsQ0FBRCxDQUFZRCxNQUFaLEVBQWxELEVBQXdFO0FBQ3BFbkMsb0JBQWM7QUFDakI7QUFDSixHQUpEO0FBS0gsQ0FORDs7QUFTQXFDLFVBQVUsR0FBRyxZQUFZO0FBQ3JCTixHQUFDLENBQUMsWUFBRCxDQUFELENBQWdCTyxPQUFoQixDQUF3QjtBQUNwQkosYUFBUyxFQUFFO0FBRFMsR0FBeEIsRUFFRyxHQUZIO0FBR0gsQ0FKRDs7QUFNQUssZ0JBQWdCLEdBQUcsVUFBVUMsUUFBVixFQUFvQjtBQUNuQyxTQUFPO0FBQ0hDLE1BQUUsRUFBRSxZQUFZRCxRQURiO0FBRUhFLGFBQVMsRUFBRSxtQkFBbUJGLFFBRjNCO0FBR0hHLFlBQVEsRUFBRSxZQUFZSCxRQUFaLEdBQXVCO0FBSDlCLEdBQVA7QUFLSCxDQU5EOztBQVFBSSxPQUFPLEdBQUcsVUFBVUMsUUFBVixFQUFvQkMsTUFBcEIsRUFBNEJDLE9BQTVCLEVBQXFDQyxVQUFyQyxFQUFpREMsT0FBakQsRUFBMEQ7QUFDaEVqRSxTQUFPLENBQUNPLEdBQVIsQ0FBWSxVQUFaLEVBQXdCdUQsTUFBeEI7QUFDQTlELFNBQU8sQ0FBQ08sR0FBUixDQUFZLFdBQVosRUFBeUJzRCxRQUF6QjtBQUNBN0QsU0FBTyxDQUFDTyxHQUFSLENBQVksWUFBWixFQUEwQndELE9BQTFCO0FBQ0EvRCxTQUFPLENBQUNPLEdBQVIsQ0FBWSxTQUFaLEVBQXVCeUQsVUFBdkI7QUFDQWhFLFNBQU8sQ0FBQ08sR0FBUixDQUFZLE9BQVosRUFBcUIwRCxPQUFyQjtBQUNILENBTkQ7O0FBT0FDLHFCQUFxQixHQUFHLFVBQVV2QyxNQUFWLEVBQWtCO0FBQ3RDLE1BQUk7QUFDQSxRQUFJd0MsSUFBSSxHQUFHQyxXQUFYO0FBQ0EsUUFBSUMsUUFBUSxHQUFHakYsTUFBTSxDQUFDc0MsT0FBUCxDQUFlO0FBQUM0QyxTQUFHLEVBQUUzQztBQUFOLEtBQWYsQ0FBZjs7QUFDQSxRQUFJaEIsT0FBTyxDQUFDMEQsUUFBRCxDQUFYLEVBQXVCO0FBQ25CLFVBQUlBLFFBQVEsQ0FBQ3pCLE9BQVQsQ0FBaUIyQixjQUFqQixJQUFtQ0MsU0FBdkMsRUFBa0Q7QUFDOUNMLFlBQUksR0FBR0UsUUFBUSxDQUFDekIsT0FBVCxDQUFpQjJCLGNBQXhCO0FBQ0g7QUFDSjs7QUFDRCxXQUFPSixJQUFQO0FBQ0gsR0FURCxDQVNFLE9BQU9NLEtBQVAsRUFBYztBQUNaLFdBQU9MLFdBQVA7QUFDSDtBQUNKLENBYkQ7O0FBZUFNLFdBQVcsR0FBRyxVQUFVL0MsTUFBVixFQUFrQjtBQUM1QixNQUFJO0FBQ0EsUUFBSXdDLElBQUksR0FBR1EsT0FBWDtBQUNBLFFBQUlOLFFBQVEsR0FBR2pGLE1BQU0sQ0FBQ3NDLE9BQVAsQ0FBZTtBQUFDNEMsU0FBRyxFQUFFM0M7QUFBTixLQUFmLENBQWY7O0FBQ0EsUUFBSWhCLE9BQU8sQ0FBQzBELFFBQUQsQ0FBWCxFQUF1QjtBQUNuQixVQUFJQSxRQUFRLENBQUN6QixPQUFULENBQWlCZ0MsV0FBakIsSUFBZ0NKLFNBQXBDLEVBQStDO0FBQzNDTCxZQUFJLEdBQUdFLFFBQVEsQ0FBQ3pCLE9BQVQsQ0FBaUJnQyxXQUF4QjtBQUNIO0FBQ0o7O0FBQ0QsV0FBT1QsSUFBUDtBQUNILEdBVEQsQ0FTRSxPQUFPTSxLQUFQLEVBQWM7QUFDWixXQUFPRSxPQUFQO0FBQ0g7QUFDSixDQWJEOztBQWdCQUUsVUFBVSxHQUFHLFVBQVVDLGdCQUFWLEVBQTRCQyxnQkFBNUIsRUFBOEM7QUFDdkR0RixjQUFZLENBQUN1RixNQUFiLENBQW9CO0FBQ2hCRixvQkFBZ0IsRUFBRUEsZ0JBREY7QUFFaEJDLG9CQUFnQixFQUFFQSxnQkFGRjtBQUdoQkUsWUFBUSxFQUFFdEMsUUFBUSxFQUhGO0FBSWhCdUMsY0FBVSxFQUFFN0YsTUFBTSxDQUFDc0MsTUFBUDtBQUpJLEdBQXBCO0FBTUFuQixlQUFhLENBQUMyRSxXQUFkLENBQTBCSixnQkFBMUI7QUFFSCxDQVREOztBQVdBSyxnQkFBZ0IsR0FBRztBQUNmQyxjQUFZLEVBQUUsVUFBVUMsSUFBVixFQUFnQkMsUUFBaEIsRUFBMEI7QUFDcEMsUUFBSUMsTUFBTSxHQUFHLElBQUlDLFVBQUosRUFBYjs7QUFDQUQsVUFBTSxDQUFDRSxNQUFQLEdBQWdCLFVBQVVDLENBQVYsRUFBYTtBQUN6QjtBQUNBLFVBQUksQ0FBQ0MsQ0FBQyxDQUFDQyxRQUFGLENBQVdDLFVBQVUsQ0FBQ0MsR0FBWCxDQUFlQyxJQUExQixFQUFnQ1YsSUFBSSxDQUFDVyxJQUFyQyxDQUFMLEVBQWlEO0FBQzdDVixnQkFBUSxDQUFDLElBQUlsRyxNQUFNLENBQUM2RyxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLHVEQUF0QixDQUFELENBQVI7QUFDQTtBQUNILE9BTHdCLENBTXpCOzs7QUFDQSxVQUFJWixJQUFJLENBQUNhLElBQUwsR0FBWUwsVUFBVSxDQUFDQyxHQUFYLENBQWVLLE9BQS9CLEVBQXdDO0FBQ3BDYixnQkFBUSxDQUFDLElBQUlsRyxNQUFNLENBQUM2RyxLQUFYLENBQWlCLEdBQWpCLEVBQXNCLHFDQUF0QixDQUFELENBQVI7QUFDQTtBQUNIOztBQUNEWixVQUFJLENBQUNlLE1BQUwsR0FBY1YsQ0FBQyxDQUFDVyxNQUFGLENBQVNELE1BQXZCO0FBQ0FkLGNBQVEsQ0FBQyxJQUFELEVBQU9ELElBQVAsQ0FBUjtBQUNILEtBYkQ7O0FBY0FFLFVBQU0sQ0FBQ2UsT0FBUCxHQUFpQixZQUFZO0FBQ3pCaEIsY0FBUSxDQUFDQyxNQUFNLENBQUNmLEtBQVIsQ0FBUjtBQUNILEtBRkQ7O0FBR0FlLFVBQU0sQ0FBQ2dCLGFBQVAsQ0FBcUJsQixJQUFyQjtBQUNIO0FBckJjLENBQW5COztBQXdCQW1CLFNBQVMsR0FBRyxVQUFVQyxXQUFWLEVBQXVCQyxhQUF2QixFQUFzQ0MsZUFBdEMsRUFBdURDLFlBQXZELEVBQXFFQyxRQUFyRSxFQUErRUMsbUJBQS9FLEVBQW9HQyxhQUFwRyxFQUFtSEMsY0FBbkgsRUFBbUlDLG1CQUFuSSxFQUF3SjtBQUNoS2xILFNBQU8sQ0FBQ08sR0FBUixDQUFZLFlBQVosRUFBMEJtRyxXQUExQjtBQUNBMUcsU0FBTyxDQUFDTyxHQUFSLENBQVksYUFBWixFQUEyQjJHLG1CQUEzQjtBQUNBbEgsU0FBTyxDQUFDTyxHQUFSLENBQVksbUJBQVosRUFBaUNzRyxZQUFqQztBQUNBN0csU0FBTyxDQUFDTyxHQUFSLENBQVksZUFBWixFQUE2QnVHLFFBQTdCO0FBQ0E5RyxTQUFPLENBQUNPLEdBQVIsQ0FBWSxzQkFBWixFQUFvQ3dHLG1CQUFtQixDQUFDSSxJQUFwQixDQUF5QkgsYUFBekIsRUFBd0NDLGNBQXhDLEVBQXdERyxLQUF4RCxFQUFwQztBQUNBcEgsU0FBTyxDQUFDTyxHQUFSLENBQVksY0FBWixFQUE0Qm9HLGFBQTVCO0FBQ0EzRyxTQUFPLENBQUNPLEdBQVIsQ0FBWSxnQkFBWixFQUE4QnFHLGVBQTlCO0FBRUFTLFFBQU0sQ0FBQ0MsRUFBUCxDQUFVLFFBQVY7QUFDSCxDQVZEOztBQWFBQyxnQkFBZ0IsR0FBRyxVQUFVQyxTQUFWLEVBQXFCO0FBQ3BDLE1BQUlDLEdBQUcsR0FBR3JFLFFBQVEsQ0FBQ3NFLGNBQVQsQ0FBd0JGLFNBQXhCLENBQVY7QUFFQSxNQUFJQyxHQUFHLENBQUNFLGFBQUosSUFBcUIsQ0FBQyxDQUExQixFQUNJLE9BQU8sSUFBUDtBQUVKLFNBQU9GLEdBQUcsQ0FBQ0csT0FBSixDQUFZSCxHQUFHLENBQUNFLGFBQWhCLEVBQStCRSxJQUF0QztBQUNILENBUEQ7O0FBU0FDLFFBQVEsR0FBRyxZQUFZO0FBQ25CLE1BQUksQ0FBQ25ILE9BQU8sQ0FBQ1gsT0FBTyxDQUFDWSxHQUFSLENBQVksT0FBWixDQUFELENBQVosRUFBb0M7QUFDaEMsUUFBSW1ILFNBQVMsR0FBRyxFQUFoQjtBQUNBLFFBQUlDLFVBQVUsR0FBRzVJLE1BQU0sQ0FBQ3NDLE9BQVAsQ0FBZTtBQUFDNEMsU0FBRyxFQUFFaEUsTUFBTTtBQUFaLEtBQWYsQ0FBakI7O0FBRUEsUUFBSTBILFVBQVUsQ0FBQ0MsU0FBWCxLQUF5QnpELFNBQTdCLEVBQXdDO0FBQ3BDdUQsZUFBUyxDQUFDRyxTQUFWLEdBQXNCRixVQUFVLENBQUNDLFNBQWpDO0FBQ0gsS0FGRCxNQUVPO0FBQ0hFLFlBQU07QUFDTjtBQUNIOztBQUVELFFBQUlILFVBQVUsQ0FBQ0ksU0FBWCxLQUF5QjVELFNBQTdCLEVBQXdDO0FBQ3BDdUQsZUFBUyxDQUFDTSxTQUFWLEdBQXNCTCxVQUFVLENBQUNJLFNBQWpDO0FBQ0gsS0FGRCxNQUVPO0FBQ0hELFlBQU07QUFDTjtBQUNIOztBQUVELFFBQUlILFVBQVUsQ0FBQ00sVUFBWCxLQUEwQjlELFNBQTlCLEVBQXlDO0FBQ3JDdUQsZUFBUyxDQUFDUSxTQUFWLEdBQXNCUCxVQUFVLENBQUNNLFVBQWpDO0FBQ0gsS0FGRCxNQUVPO0FBQ0hILFlBQU07QUFDTjtBQUNIOztBQUNEbkksV0FBTyxDQUFDTyxHQUFSLENBQVksT0FBWixFQUFxQndILFNBQXJCO0FBQ0g7QUFDSixDQTNCRDs7QUE2QkFsSCxRQUFRLEdBQUcsVUFBVTJILElBQVYsRUFBZ0IvRSxFQUFoQixFQUFvQjtBQUMzQixNQUFJK0UsSUFBSSxJQUFJLEVBQVosRUFBZ0I7QUFDWjtBQUNIOztBQUNEVixVQUFRO0FBQ1IsTUFBSVcsS0FBSyxHQUFHekksT0FBTyxDQUFDWSxHQUFSLENBQVksT0FBWixDQUFaO0FBQ0EsTUFBSThILElBQUksR0FBRyxJQUFJQyxTQUFKLENBQWM7QUFBQ0Msb0JBQWdCLEVBQUU7QUFBbkIsR0FBZCxDQUFYO0FBQ0FGLE1BQUksQ0FBQ0csTUFBTCxDQUFZSixLQUFLLENBQUNGLFNBQWxCO0FBQ0EsU0FBT0csSUFBSSxDQUFDSSxPQUFMLENBQWFOLElBQWIsQ0FBUDtBQUNILENBVEQ7O0FBV0FuSSxRQUFRLEdBQUcsVUFBVW1JLElBQVYsRUFBZ0IvRSxFQUFoQixFQUFvQjtBQUMzQixNQUFJK0UsSUFBSSxJQUFJLEVBQVosRUFBZ0I7QUFDWjtBQUNIOztBQUNEVixVQUFRO0FBQ1IsTUFBSVcsS0FBSyxHQUFHekksT0FBTyxDQUFDWSxHQUFSLENBQVksT0FBWixDQUFaO0FBQ0EsTUFBSThILElBQUksR0FBRyxJQUFJQyxTQUFKLENBQWM7QUFBQ0Msb0JBQWdCLEVBQUU7QUFBbkIsR0FBZCxDQUFYO0FBQ0FGLE1BQUksQ0FBQ0csTUFBTCxDQUFZSixLQUFLLENBQUNKLFNBQWxCO0FBQ0EsU0FBT0ssSUFBSSxDQUFDSyxPQUFMLENBQWFQLElBQWIsQ0FBUDtBQUNILENBVEQ7O0FBV0FMLE1BQU0sR0FBRyxZQUFZO0FBQ2pCOUksUUFBTSxDQUFDMkosSUFBUCxDQUFZLFlBQVo7QUFDQTNKLFFBQU0sQ0FBQzRKLE1BQVAsQ0FBYyxZQUFZO0FBQ3RCakosV0FBTyxDQUFDTyxHQUFSLENBQVksU0FBWixFQUF1QixJQUF2QjtBQUNBQyxpQkFBYSxDQUFDMEksU0FBZCxDQUF3Qiw4REFBeEI7QUFDQTdCLFVBQU0sQ0FBQ0MsRUFBUCxDQUFVLE1BQVY7QUFDSCxHQUpEO0FBS0gsQ0FQRDs7QUFVQTZCLFdBQVcsR0FBRyxVQUFVeEgsTUFBVixFQUFrQjtBQUM1QixNQUFJeUgsS0FBSyxDQUFDQyxZQUFOLENBQW1CMUgsTUFBbkIsRUFBMkIsQ0FBQyxNQUFELEVBQVMsZUFBVCxDQUEzQixDQUFKLEVBQTJEO0FBQ3ZELFdBQU8sSUFBUDtBQUNILEdBRkQsTUFFTztBQUNILFdBQU8sS0FBUDtBQUNIO0FBQ0osQ0FORDs7QUFTQTJILFVBQVUsR0FBRyxZQUFZO0FBQ3JCLE1BQUl0SixPQUFPLENBQUNZLEdBQVIsQ0FBWSxVQUFaLENBQUosRUFBNkI7QUFDekIsV0FBTywwQkFBUDtBQUNILEdBRkQsTUFFTztBQUNILFdBQU8sMkJBQVA7QUFDSDs7QUFDRDtBQUNILENBUEQsQzs7Ozs7Ozs7Ozs7QUM3UUE7OztBQUdBeUcsTUFBTSxDQUFDa0MsTUFBUCxDQUFjLGNBQWQsRUFBOEI7QUFBQ0Msa0JBQWdCLEVBQUU7QUFBbkIsQ0FBOUI7QUFDQW5DLE1BQU0sQ0FBQ29DLFNBQVAsQ0FBaUI7QUFDYkQsa0JBQWdCLEVBQUU7QUFETCxDQUFqQjtBQUlBbkMsTUFBTSxDQUFDcUMsS0FBUCxDQUFhLEdBQWIsRUFBa0IsWUFBWTtBQUMxQixPQUFLQyxNQUFMLENBQVksTUFBWjtBQUNILENBRkQ7QUFJQXRDLE1BQU0sQ0FBQ3FDLEtBQVAsQ0FBYSxTQUFiLEVBQXdCLFlBQVk7QUFDaEMxSixTQUFPLENBQUNPLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLFFBQXhCO0FBQ0EsT0FBS29KLE1BQUwsQ0FBWSxRQUFaO0FBQ0gsQ0FIRDtBQUtBdEMsTUFBTSxDQUFDcUMsS0FBUCxDQUFhLE9BQWIsRUFBc0IsWUFBWTtBQUM5QjFKLFNBQU8sQ0FBQ08sR0FBUixDQUFZLFVBQVosRUFBd0IsV0FBeEI7QUFDQSxPQUFLb0osTUFBTCxDQUFZLE1BQVo7QUFDSCxDQUhEO0FBS0F0QyxNQUFNLENBQUNxQyxLQUFQLENBQWEsWUFBYixFQUEyQixZQUFZO0FBQ25DMUosU0FBTyxDQUFDTyxHQUFSLENBQVksVUFBWixFQUF3QixXQUF4QjtBQUNBLE9BQUtvSixNQUFMLENBQVksV0FBWjtBQUNILENBSEQ7QUFNQXRDLE1BQU0sQ0FBQ3FDLEtBQVAsQ0FBYSxXQUFiLEVBQTBCLFlBQVk7QUFDbEMxSixTQUFPLENBQUNPLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLFFBQXhCO0FBQ0EsT0FBS29KLE1BQUwsQ0FBWSxVQUFaO0FBQ0gsQ0FIRDtBQU1BdEMsTUFBTSxDQUFDcUMsS0FBUCxDQUFhLFNBQWIsRUFBd0IsWUFBWTtBQUNoQzFKLFNBQU8sQ0FBQ08sR0FBUixDQUFZLFVBQVosRUFBd0IsUUFBeEI7QUFDQSxPQUFLb0osTUFBTCxDQUFZLFFBQVo7QUFDSCxDQUhEO0FBT0F0QyxNQUFNLENBQUNxQyxLQUFQLENBQWEsVUFBYixFQUF5QixZQUFZO0FBQ2pDMUosU0FBTyxDQUFDTyxHQUFSLENBQVksVUFBWixFQUF3QixTQUF4QjtBQUNBLE9BQUtvSixNQUFMLENBQVksU0FBWjtBQUNILENBSEQ7QUFLQXRDLE1BQU0sQ0FBQ3FDLEtBQVAsQ0FBYSxlQUFiLEVBQThCLFlBQVk7QUFDdEMxSixTQUFPLENBQUNPLEdBQVIsQ0FBWSxVQUFaLEVBQXdCLGNBQXhCO0FBQ0EsT0FBS29KLE1BQUwsQ0FBWSxjQUFaO0FBQ0gsQ0FIRDtBQU1BdEMsTUFBTSxDQUFDcUMsS0FBUCxDQUFhLGNBQWIsRUFBNkIsWUFBWTtBQUNyQzFKLFNBQU8sQ0FBQ08sR0FBUixDQUFZLFVBQVosRUFBd0IsYUFBeEI7QUFDQSxPQUFLb0osTUFBTCxDQUFZLGFBQVo7QUFDSCxDQUhEO0FBS0F0QyxNQUFNLENBQUNxQyxLQUFQLENBQWEsVUFBYixFQUF5QixZQUFZO0FBQ2pDLE9BQUtDLE1BQUwsQ0FBWSxTQUFaO0FBQ0gsQ0FGRDtBQU1BdEMsTUFBTSxDQUFDcUMsS0FBUCxDQUFhLFNBQWIsRUFBd0IsWUFBWTtBQUNoQzFKLFNBQU8sQ0FBQ08sR0FBUixDQUFZLFVBQVosRUFBd0IsUUFBeEI7QUFDQSxPQUFLb0osTUFBTCxDQUFZLFFBQVo7QUFDSCxDQUhEO0FBTUF0QyxNQUFNLENBQUNxQyxLQUFQLENBQWEsWUFBYixFQUEyQixZQUFZO0FBQ25DMUosU0FBTyxDQUFDTyxHQUFSLENBQVksVUFBWixFQUF3QixRQUF4QjtBQUNBLE9BQUtvSixNQUFMLENBQVksV0FBWjtBQUNILENBSEQ7QUFNQXRDLE1BQU0sQ0FBQ3FDLEtBQVAsQ0FBYSxrQkFBYixFQUFpQyxZQUFZO0FBQ3pDMUosU0FBTyxDQUFDTyxHQUFSLENBQVksVUFBWixFQUF3QixRQUF4QjtBQUNBLE9BQUtvSixNQUFMLENBQVksaUJBQVo7QUFDSCxDQUhEO0FBTUF0QyxNQUFNLENBQUNxQyxLQUFQLENBQWEsS0FBYixFQUFvQixZQUFZO0FBQzVCMUosU0FBTyxDQUFDTyxHQUFSLENBQVksVUFBWixFQUF3QixJQUF4QjtBQUNBLE9BQUtvSixNQUFMLENBQVksSUFBWjtBQUNILENBSEQsRTs7Ozs7Ozs7Ozs7QUNqRkEsSUFBSUMsWUFBWSxHQUFHLENBQUMsS0FBRCxFQUFPLFNBQVAsRUFBaUIsWUFBakIsRUFBOEIsVUFBOUIsRUFBeUMsVUFBekMsRUFBb0QsWUFBcEQsRUFBaUUsVUFBakUsRUFBNEUsVUFBNUUsRUFBdUYsWUFBdkYsRUFBb0csVUFBcEcsRUFBK0csVUFBL0csQ0FBbkIsQzs7Ozs7Ozs7Ozs7QUNBQTs7O0FBSUFDLFVBQVUsR0FBRyxVQUFVQyxPQUFWLEVBQW1CO0FBQzVCLE1BQUdBLE9BQU8sSUFBSSxVQUFkLEVBQTBCO0FBQ3RCLFFBQUlDLEdBQUcsR0FBR0MsUUFBUSxDQUFDN0MsSUFBVCxDQUFjO0FBQUM4QyxhQUFPLEVBQUUsQ0FBVjtBQUFhQyxZQUFNLEVBQUU7QUFBckIsS0FBZCxFQUE4QzlDLEtBQTlDLEdBQXNEK0MsTUFBaEU7QUFDQSxXQUFPSixHQUFQO0FBQ0gsR0FIRCxNQUdPO0FBQ0gsV0FBTyxFQUFQO0FBQ0g7QUFDSixDQVBELEM7Ozs7Ozs7Ozs7O0FDSkEsSUFBSUssUUFBSjtBQUFhdkwsTUFBTSxDQUFDQyxJQUFQLENBQVksc0JBQVosRUFBbUM7QUFBQ3NMLFVBQVEsQ0FBQ3JMLENBQUQsRUFBRztBQUFDcUwsWUFBUSxHQUFDckwsQ0FBVDtBQUFXOztBQUF4QixDQUFuQyxFQUE2RCxDQUE3RDtBQUFnRSxJQUFJaUIsT0FBSjtBQUFZbkIsTUFBTSxDQUFDQyxJQUFQLENBQVksZ0JBQVosRUFBNkI7QUFBQ2tCLFNBQU8sQ0FBQ2pCLENBQUQsRUFBRztBQUFDaUIsV0FBTyxHQUFDakIsQ0FBUjtBQUFVOztBQUF0QixDQUE3QixFQUFxRCxDQUFyRDtBQUd6Rk0sTUFBTSxDQUFDZ0wsT0FBUCxDQUFlO0FBQ2RDLGVBQWEsRUFBRSxVQUFVcEssSUFBVixFQUFnQnFLLEtBQWhCLEVBQXVCQyxRQUF2QixFQUFpQztBQUMvQyxRQUFJcEIsS0FBSyxDQUFDQyxZQUFOLENBQW1CLEtBQUsxSCxNQUF4QixFQUFnQyxDQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLE9BQTFCLENBQWhDLENBQUosRUFBeUU7QUFDeEUsVUFBSXRDLE1BQU0sQ0FBQ0MsS0FBUCxDQUFhNkgsSUFBYixDQUFrQjtBQUFDc0QsZ0JBQVEsRUFBRUY7QUFBWCxPQUFsQixFQUFxQ0csS0FBckMsT0FBaUQsQ0FBckQsRUFBd0Q7QUFDdkROLGdCQUFRLENBQUNPLFVBQVQsQ0FBb0I7QUFDbkJKLGVBQUssRUFBRUEsS0FEWTtBQUVuQkMsa0JBQVEsRUFBRUEsUUFGUztBQUduQjVILGlCQUFPLEVBQUU7QUFDUkMsZ0JBQUksRUFBRTNDLElBREU7QUFFUjBLLG9CQUFRLEVBQUUsSUFBSUMsSUFBSixFQUZGO0FBR1JDLG9CQUFRLEVBQUUsSUFBSUQsSUFBSixFQUhGO0FBSVJFLHdCQUFZLEVBQUU7QUFKTjtBQUhVLFNBQXBCO0FBVUE7QUFDRDtBQUNELEdBaEJhO0FBaUJkQyxZQUFVLEVBQUUsVUFBVTFHLEdBQVYsRUFBZTtBQUMxQixRQUFJOEUsS0FBSyxDQUFDQyxZQUFOLENBQW1CLEtBQUsxSCxNQUF4QixFQUFnQyxDQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLE9BQTFCLENBQWhDLENBQUosRUFBeUU7QUFDeEV0QyxZQUFNLENBQUNDLEtBQVAsQ0FBYTJMLE1BQWIsQ0FBb0IzRyxHQUFwQjtBQUNBO0FBQ0QsR0FyQmE7QUFzQlg0RyxnQkFBYyxFQUFFLFVBQVU1RyxHQUFWLEVBQWU2RyxRQUFmLEVBQXlCQyxXQUF6QixFQUFzQztBQUNsRCxRQUFJRCxRQUFRLEtBQUssRUFBakIsRUFBcUI7QUFDakIsVUFBSXhLLE9BQU8sQ0FBQ3ZCLE1BQU0sQ0FBQ3NDLE9BQVAsQ0FBZTtBQUFDNEMsV0FBRyxFQUFFQTtBQUFOLE9BQWYsRUFBMkI3QixNQUE1QixDQUFYLEVBQWdEO0FBQzVDMkgsZ0JBQVEsQ0FBQ2lCLFdBQVQsQ0FBcUIvRyxHQUFyQixFQUEwQmxGLE1BQU0sQ0FBQ3NDLE9BQVAsQ0FBZTtBQUFDNEMsYUFBRyxFQUFFQTtBQUFOLFNBQWYsRUFBMkI3QixNQUEzQixDQUFrQyxDQUFsQyxFQUFxQ0MsT0FBL0Q7QUFDSDs7QUFDRDBILGNBQVEsQ0FBQ2tCLFFBQVQsQ0FBa0JoSCxHQUFsQixFQUF1QjZHLFFBQXZCO0FBQ0g7O0FBQ0QsUUFBSUMsV0FBVyxLQUFLLEVBQXBCLEVBQXdCO0FBQ3BCaEIsY0FBUSxDQUFDbUIsV0FBVCxDQUFxQmpILEdBQXJCLEVBQTBCOEcsV0FBMUI7QUFDSDtBQUNKLEdBaENVO0FBaUNkSSxrQkFBZ0IsRUFBRSxVQUFVQyxTQUFWLEVBQXFCQyxVQUFyQixFQUFpQztBQUNsRCxRQUFJLENBQUMsS0FBSy9KLE1BQVYsRUFBa0I7QUFDakIsWUFBTSxJQUFJdEMsTUFBTSxDQUFDNkcsS0FBWCxDQUFpQixHQUFqQixFQUFzQix1QkFBdEIsQ0FBTjtBQUNBOztBQUVELFFBQUk7QUFDSCxVQUFJLENBQUMsNEJBQTRCeUYsSUFBNUIsQ0FBaUNGLFNBQWpDLENBQUwsRUFBa0Q7QUFDakQsZUFBTyxLQUFQO0FBQ0E7O0FBRUQsYUFBT3JNLE1BQU0sQ0FBQ3dNLE1BQVAsQ0FDTjtBQUFDdEgsV0FBRyxFQUFFb0g7QUFBTixPQURNLEVBRU47QUFDQ0csWUFBSSxFQUFFO0FBQ0wsaUNBQXVCSjtBQURsQjtBQURQLE9BRk0sQ0FBUDtBQVFBLEtBYkQsQ0FjQSxPQUFPOUYsQ0FBUCxFQUFVO0FBQ1QsWUFBTSxJQUFJdEcsTUFBTSxDQUFDNkcsS0FBWCxDQUFpQixHQUFqQixFQUFzQlAsQ0FBQyxDQUFDbUcsT0FBeEIsQ0FBTjtBQUNBOztBQUNELFdBQU8sSUFBUDtBQUNBLEdBeERhO0FBMERkQyxzQkFBb0IsRUFBRSxVQUFVTixTQUFWLEVBQXFCQyxVQUFyQixFQUFpQztBQUN0RCxRQUFJO0FBQ0gsYUFBT3RNLE1BQU0sQ0FBQ3dNLE1BQVAsQ0FDTjtBQUFDdEgsV0FBRyxFQUFFb0g7QUFBTixPQURNLEVBRU47QUFBQ0csWUFBSSxFQUFFO0FBQUMsb0NBQTBCSjtBQUEzQjtBQUFQLE9BRk0sQ0FBUDtBQUlBLEtBTEQsQ0FLRSxPQUFPOUYsQ0FBUCxFQUFVO0FBQ1gsWUFBTSxJQUFJdEcsTUFBTSxDQUFDNkcsS0FBWCxDQUFpQixHQUFqQixFQUFzQlAsQ0FBQyxDQUFDbUcsT0FBeEIsQ0FBTjtBQUNBO0FBQ0QsR0FuRWE7QUFvRWRFLFdBQVMsRUFBRSxZQUFZO0FBQ3RCLFFBQUk5RCxTQUFTLEdBQUcrRCxTQUFTLENBQUN2SyxPQUFWLEdBQW9Cd0csU0FBcEM7QUFDQTlJLFVBQU0sQ0FBQ3dNLE1BQVAsQ0FDQztBQUFDdEgsU0FBRyxFQUFDLEtBQUszQztBQUFWLEtBREQsRUFFQztBQUNDa0ssVUFBSSxFQUFDO0FBQ0g1RCxpQkFBUyxFQUFDQztBQURQO0FBRE4sS0FGRDtBQVFBLEdBOUVhO0FBK0VkZ0UsWUFBVSxFQUFFLFlBQVk7QUFDdkI5TSxVQUFNLENBQUN3TSxNQUFQLENBQ0M7QUFBQ3RILFNBQUcsRUFBQyxLQUFLM0M7QUFBVixLQURELEVBRUM7QUFDQ2tLLFVBQUksRUFBQztBQUNINUQsaUJBQVMsRUFBQztBQURQO0FBRE4sS0FGRDtBQVFBLEdBeEZhO0FBMEZYa0UsZ0JBQWMsRUFBRSxVQUFVN0gsR0FBVixFQUFlOEcsV0FBZixFQUE0QjtBQUN4QyxRQUFJQSxXQUFXLEtBQUssRUFBcEIsRUFBd0I7QUFDcEJoQixjQUFRLENBQUNtQixXQUFULENBQXFCakgsR0FBckIsRUFBMEI4RyxXQUExQjtBQUNIO0FBQ0osR0E5RlU7QUErRlhnQixXQUFTLEVBQUUsVUFBVXRDLE9BQVYsRUFBbUI7QUFDMUIsUUFBSUMsR0FBRyxHQUFHRixVQUFVLENBQUNDLE9BQUQsQ0FBcEI7O0FBQ0EsUUFBR3VDLFFBQVEsQ0FBQ3RDLEdBQUQsQ0FBUixHQUFnQixDQUFuQixFQUFzQjtBQUNsQixhQUFRQSxHQUFSO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBUSxFQUFSO0FBQ0g7QUFDSjtBQXRHVSxDQUFmOztBQTJHQXVDLFFBQVEsR0FBRyxVQUFVQyxNQUFWLEVBQWtCO0FBQzVCckUsV0FBUyxHQUFHK0QsU0FBUyxDQUFDdkssT0FBVixHQUFvQndHLFNBQWhDO0FBQ0EsU0FBT0EsU0FBUDtBQUNBLENBSEQsQzs7Ozs7Ozs7Ozs7QUM5R0E7OztBQUlBN0ksTUFBTSxDQUFDbU4sT0FBUCxDQUFlLFFBQWYsRUFBeUIsVUFBVW5LLE1BQVYsRUFBa0JGLE9BQWxCLEVBQTJCQyxRQUEzQixFQUFxQztBQUMxRCxNQUFJLEtBQUtULE1BQVQsRUFBaUI7QUFDYixRQUFJOEssUUFBUSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCO0FBQUNDLFlBQU0sRUFBRTtBQUFDaEssZUFBTyxFQUFFLENBQVY7QUFBYTZILGdCQUFRLEVBQUM7QUFBdEI7QUFBVCxLQUFsQixFQUFzRHJJLFFBQXRELENBQWY7QUFDQXFLLFlBQVEsQ0FBQ0ksS0FBVCxHQUFpQnhLLE1BQU0sR0FBRyxDQUExQjs7QUFDQSxRQUFJQSxNQUFNLElBQUksQ0FBZCxFQUFpQjtBQUNiLGFBQU9vSyxRQUFRLENBQUNJLEtBQWhCO0FBQ0g7O0FBQ0QsUUFBSXpELEtBQUssQ0FBQ0MsWUFBTixDQUFtQixLQUFLMUgsTUFBeEIsRUFBZ0MsQ0FBQyxNQUFELEVBQVMsZUFBVCxDQUFoQyxDQUFKLEVBQWdFO0FBQzVELGFBQU90QyxNQUFNLENBQUNDLEtBQVAsQ0FBYTZILElBQWIsQ0FBa0I7QUFBQzhDLGVBQU8sRUFBRTtBQUFWLE9BQWxCLENBQVA7QUFDSCxLQUZELE1BRU87QUFDSCxhQUFPNUssTUFBTSxDQUFDQyxLQUFQLENBQWE2SCxJQUFiLENBQWtCaEYsT0FBbEIsRUFBMkJzSyxRQUEzQixDQUFQO0FBQ0g7QUFDSixHQVhELE1BV087QUFDSCxTQUFLSyxLQUFMO0FBQ0g7QUFDSixDQWZEO0FBa0JBek4sTUFBTSxDQUFDbU4sT0FBUCxDQUFlLFdBQWYsRUFBNEIsWUFBWTtBQUNwQyxNQUFJLEtBQUs3SyxNQUFULEVBQWlCO0FBQ2IsUUFBSW9MLFFBQVEsR0FBRzVOLFFBQVEsQ0FBQ2dJLElBQVQsQ0FBYztBQUFDeEYsWUFBTSxFQUFFLEtBQUtBO0FBQWQsS0FBZCxDQUFmO0FBQ0EsUUFBSXFMLFNBQVMsR0FBR0QsUUFBUSxDQUFDRSxHQUFULENBQWEsVUFBVUMsQ0FBVixFQUFhO0FBQ3RDLGFBQU9BLENBQUMsQ0FBQ0YsU0FBVDtBQUNILEtBRmUsQ0FBaEI7QUFHQSxRQUFJRyxRQUFRLEdBQUc7QUFBQ2xELGFBQU8sRUFBRSxDQUFWO0FBQWFtRCxtQkFBYSxFQUFFO0FBQUNDLFdBQUcsRUFBRUw7QUFBTjtBQUE1QixLQUFmOztBQUVBLFFBQUk1RCxLQUFLLENBQUNDLFlBQU4sQ0FBbUIsS0FBSzFILE1BQXhCLEVBQWdDLENBQUMsTUFBRCxFQUFTLGVBQVQsQ0FBaEMsQ0FBSixFQUFnRTtBQUM1RCxhQUFRekMsU0FBUyxDQUFDaUksSUFBVixDQUFlO0FBQUM4QyxlQUFPLEVBQUU7QUFBVixPQUFmLENBQVI7QUFDSCxLQUZELE1BRU87QUFDSCxhQUFPL0ssU0FBUyxDQUFDaUksSUFBVixDQUFlZ0csUUFBZixDQUFQO0FBQ0g7QUFDSixHQVpELE1BWU87QUFDSCxTQUFLTCxLQUFMO0FBQ0g7QUFDSixDQWhCRDtBQW9CQXpOLE1BQU0sQ0FBQ21OLE9BQVAsQ0FBZSxlQUFmLEVBQWdDLFVBQVVuSyxNQUFWLEVBQWtCO0FBQzlDLE1BQUksS0FBS1YsTUFBVCxFQUFpQjtBQUNiLFFBQUkyTCxZQUFZLEdBQUdsTyxNQUFNLENBQUNzQyxPQUFQLENBQWU7QUFBQzRDLFNBQUcsRUFBQyxLQUFLM0M7QUFBVixLQUFmLEVBQWtDOEksUUFBckQ7QUFDQSxRQUFJOEMsV0FBVyxHQUFHL04sYUFBYSxDQUFDMkgsSUFBZCxDQUFtQjtBQUFDc0QsY0FBUSxFQUFDNkMsWUFBVjtBQUF3QnJELGFBQU8sRUFBQztBQUFoQyxLQUFuQixDQUFsQjtBQUNBLFFBQUl1RCxTQUFTLEdBQUdELFdBQVcsQ0FBQ04sR0FBWixDQUFnQixVQUFVQyxDQUFWLEVBQWE7QUFDekMsYUFBT0EsQ0FBQyxDQUFDTSxTQUFUO0FBQ0gsS0FGZSxDQUFoQjtBQUdBLFFBQUlmLFFBQVEsR0FBRztBQUNYZ0IsVUFBSSxFQUFFO0FBQUM3QyxnQkFBUSxFQUFFLENBQUM7QUFBWixPQURLO0FBRVhpQyxXQUFLLEVBQUV4SztBQUZJLEtBQWY7O0FBS0EsUUFBSStHLEtBQUssQ0FBQ0MsWUFBTixDQUFtQixLQUFLMUgsTUFBeEIsRUFBZ0MsQ0FBQyxNQUFELEVBQVMsZUFBVCxDQUFoQyxDQUFKLEVBQWdFO0FBQzVELGFBQU9uQyxhQUFhLENBQUMySCxJQUFkLENBQW1CO0FBQUM4QyxlQUFPLEVBQUU7QUFBVixPQUFuQixFQUFpQ3dDLFFBQWpDLENBQVA7QUFDSCxLQUZELE1BRU87QUFDSCxhQUFPak4sYUFBYSxDQUFDMkgsSUFBZCxDQUFtQjtBQUFDcUcsaUJBQVMsRUFBRTtBQUFDSCxhQUFHLEVBQUVHO0FBQU4sU0FBWjtBQUE4QnZELGVBQU8sRUFBRTtBQUF2QyxPQUFuQixFQUE4RHdDLFFBQTlELENBQVA7QUFDSDtBQUVKLEdBakJELE1BaUJPO0FBQ0gsU0FBS0ssS0FBTDtBQUNIO0FBQ0osQ0FyQkQ7QUF3QkF6TixNQUFNLENBQUNtTixPQUFQLENBQWUsU0FBZixFQUEwQixVQUFVbkssTUFBVixFQUFrQjtBQUN4QyxNQUFJLEtBQUtWLE1BQVQsRUFBaUI7QUFDYixRQUFJMkwsWUFBWSxHQUFHbE8sTUFBTSxDQUFDc0MsT0FBUCxDQUFlO0FBQUM0QyxTQUFHLEVBQUMsS0FBSzNDO0FBQVYsS0FBZixFQUFrQzhJLFFBQXJEO0FBRUEsUUFBSThDLFdBQVcsR0FBRy9OLGFBQWEsQ0FBQzJILElBQWQsQ0FBbUI7QUFBQ3NELGNBQVEsRUFBQzZDLFlBQVY7QUFBd0JyRCxhQUFPLEVBQUU7QUFBakMsS0FBbkIsQ0FBbEI7QUFDQSxRQUFJdUQsU0FBUyxHQUFHRCxXQUFXLENBQUNOLEdBQVosQ0FBZ0IsVUFBVUMsQ0FBVixFQUFhO0FBQ3pDLGFBQU9BLENBQUMsQ0FBQ00sU0FBVDtBQUNILEtBRmUsQ0FBaEI7QUFHQSxRQUFJZixRQUFRLEdBQUc7QUFDWGdCLFVBQUksRUFBRTtBQUFDN0MsZ0JBQVEsRUFBRSxDQUFDO0FBQVosT0FESztBQUVYaUMsV0FBSyxFQUFFeEs7QUFGSSxLQUFmOztBQUtBLFFBQUkrRyxLQUFLLENBQUNDLFlBQU4sQ0FBbUIsS0FBSzFILE1BQXhCLEVBQWdDLENBQUMsTUFBRCxFQUFTLGVBQVQsQ0FBaEMsQ0FBSixFQUFnRTtBQUM1RCxhQUFPcEMsT0FBTyxDQUFDNEgsSUFBUixDQUFhO0FBQUM4QyxlQUFPLEVBQUU7QUFBVixPQUFiLEVBQTJCd0MsUUFBM0IsQ0FBUDtBQUNILEtBRkQsTUFFTztBQUNILGFBQU9sTixPQUFPLENBQUM0SCxJQUFSLENBQWE7QUFBQzdDLFdBQUcsRUFBRTtBQUFDK0ksYUFBRyxFQUFFRztBQUFOLFNBQU47QUFBd0J2RCxlQUFPLEVBQUU7QUFBakMsT0FBYixFQUFrRHdDLFFBQWxELENBQVA7QUFDSDtBQUNKLEdBakJELE1BaUJPO0FBQ0gsU0FBS0ssS0FBTDtBQUNIO0FBQ0osQ0FyQkQ7QUF3QkF6TixNQUFNLENBQUNtTixPQUFQLENBQWUsTUFBZixFQUF1QixZQUFZO0FBQy9CLE1BQUksS0FBSzdLLE1BQVQsRUFBaUI7QUFDYixRQUFJb0wsUUFBUSxHQUFHNU4sUUFBUSxDQUFDZ0ksSUFBVCxDQUFjO0FBQUN4RixZQUFNLEVBQUUsS0FBS0E7QUFBZCxLQUFkLENBQWY7QUFDQSxRQUFJSSxNQUFNLEdBQUdnTCxRQUFRLENBQUNFLEdBQVQsQ0FBYSxVQUFVQyxDQUFWLEVBQWE7QUFDbkMsYUFBT0EsQ0FBQyxDQUFDbEwsTUFBVDtBQUNILEtBRlksQ0FBYjs7QUFHQSxRQUFJb0gsS0FBSyxDQUFDQyxZQUFOLENBQW1CLEtBQUsxSCxNQUF4QixFQUFnQyxDQUFDLE1BQUQsRUFBUyxlQUFULENBQWhDLENBQUosRUFBZ0U7QUFDNUQsYUFBTzNDLElBQUksQ0FBQ21JLElBQUwsQ0FBVTtBQUFDOEMsZUFBTyxFQUFFO0FBQVYsT0FBVixDQUFQO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBT2pMLElBQUksQ0FBQ21JLElBQUwsQ0FBVTtBQUFDN0MsV0FBRyxFQUFFO0FBQUMrSSxhQUFHLEVBQUV0TDtBQUFOLFNBQU47QUFBcUJrSSxlQUFPLEVBQUU7QUFBOUIsT0FBVixDQUFQO0FBQ0g7QUFDSixHQVZELE1BVU87QUFDSCxTQUFLNkMsS0FBTDtBQUNIO0FBQ0osQ0FkRDs7QUFnQkFZLFdBQVcsR0FBRyxVQUFVQyxLQUFWLEVBQWlCekwsT0FBakIsRUFBMEIwTCxNQUExQixFQUFrQ0MsV0FBbEMsRUFBK0M7QUFDekR4TyxRQUFNLENBQUNtTixPQUFQLENBQWVtQixLQUFmLEVBQXNCLFVBQVV0TCxNQUFWLEVBQWtCRixPQUFsQixFQUEyQkMsUUFBM0IsRUFBcUM7QUFDdkQ7QUFDQSxRQUFJMEwsT0FBTyxHQUFHLENBQUM7QUFBQzdELGFBQU8sRUFBRTtBQUFWLEtBQUQsRUFBZTtBQUFDQSxhQUFPLEVBQUU7QUFBVixLQUFmLEVBQStCO0FBQUNBLGFBQU8sRUFBRTtBQUFWLEtBQS9CLENBQWQ7O0FBQ0EsUUFBSXRKLE9BQU8sQ0FBQ2lOLE1BQU0sQ0FBQyxLQUFELENBQVAsQ0FBWCxFQUE0QjtBQUN4QkUsYUFBTyxHQUFHQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUgsTUFBTSxDQUFDLEtBQUQsQ0FBckIsQ0FBVjtBQUNIOztBQUNELFFBQUlJLFVBQVUsR0FBRzdMLE9BQU8sQ0FBQyxLQUFELENBQXhCOztBQUNBLFFBQUl4QixPQUFPLENBQUNxTixVQUFELENBQVgsRUFBeUI7QUFDckJGLGFBQU8sR0FBR0EsT0FBTyxDQUFDQyxNQUFSLENBQWU1TCxPQUFPLENBQUMsS0FBRCxDQUF0QixDQUFWO0FBQ0gsS0FUc0QsQ0FXdkQ7OztBQUNBLFFBQUk4TCxNQUFNLEdBQUcsRUFBYjs7QUFDQSxRQUFJdE4sT0FBTyxDQUFDaU4sTUFBTSxDQUFDLE1BQUQsQ0FBUCxDQUFYLEVBQTZCO0FBQ3pCSyxZQUFNLEdBQUdBLE1BQU0sQ0FBQ0YsTUFBUCxDQUFjSCxNQUFNLENBQUMsTUFBRCxDQUFwQixDQUFUO0FBQ0g7O0FBQ0QsUUFBSWpOLE9BQU8sQ0FBQ3dCLE9BQU8sQ0FBQyxNQUFELENBQVIsQ0FBWCxFQUE4QjtBQUMxQjhMLFlBQU0sR0FBR0EsTUFBTSxDQUFDRixNQUFQLENBQWM1TCxPQUFPLENBQUMsTUFBRCxDQUFyQixDQUFUO0FBQ0gsS0FsQnNELENBb0J2RDs7O0FBQ0F5TCxVQUFNLEdBQUdsQixNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCaUIsTUFBbEIsRUFBMEJ6TCxPQUExQixDQUFUO0FBQ0F5TCxVQUFNLENBQUMsS0FBRCxDQUFOLEdBQWdCRSxPQUFoQjtBQUNBRixVQUFNLENBQUMsTUFBRCxDQUFOLEdBQWlCSyxNQUFqQixDQXZCdUQsQ0F5QnZEOztBQUNBSixlQUFXLEdBQUduQixNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCa0IsV0FBbEIsRUFBK0J6TCxRQUEvQixDQUFkOztBQUVBLFFBQUksQ0FBQ3pCLE9BQU8sQ0FBQ2tOLFdBQUQsQ0FBWixFQUEyQjtBQUN2QkEsaUJBQVcsR0FBRztBQUNWSixZQUFJLEVBQUU7QUFBQzdDLGtCQUFRLEVBQUUsQ0FBQztBQUFaLFNBREk7QUFFVmlDLGFBQUssRUFBRXhLO0FBRkcsT0FBZDtBQUlIOztBQUNEd0wsZUFBVyxDQUFDaEIsS0FBWixHQUFvQnhLLE1BQU0sR0FBRyxDQUE3Qjs7QUFFQSxRQUFHQSxNQUFNLElBQUksQ0FBYixFQUFnQjtBQUNmLGFBQU93TCxXQUFXLENBQUNoQixLQUFuQjtBQUNOOztBQUVLLFFBQUksS0FBS2xMLE1BQVQsRUFBaUI7QUFDYixVQUFJNkcsSUFBSSxHQUFHdEcsT0FBTyxDQUFDaUYsSUFBUixDQUFhaEYsT0FBYixFQUFzQjBMLFdBQXRCLENBQVg7QUFDQSxhQUFPckYsSUFBUDtBQUNILEtBSEQsTUFHTztBQUNILFdBQUtzRSxLQUFMO0FBQ0g7QUFDSixHQTlDRDtBQStDSCxDQWhERDtBQW1EQTs7O0FBQ0FZLFdBQVcsQ0FBQyxZQUFELEVBQWV2TyxRQUFmLEVBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLENBQVg7QUFDQXVPLFdBQVcsQ0FBQyxVQUFELEVBQWF2TyxRQUFiLEVBQXVCLEVBQXZCLEVBQTJCLEVBQTNCLENBQVg7QUFDQXVPLFdBQVcsQ0FBQyxjQUFELEVBQWlCak8sWUFBakIsRUFBK0IsRUFBL0IsRUFBbUMsRUFBbkMsQ0FBWDtBQUNBaU8sV0FBVyxDQUFDLGFBQUQsRUFBZ0JoTyxXQUFoQixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxDQUFYO0FBQ0FnTyxXQUFXLENBQUMsUUFBRCxFQUFXL04sTUFBWCxFQUFtQixFQUFuQixFQUF1QixFQUF2QixDQUFYO0FBQ0ErTixXQUFXLENBQUMsV0FBRCxFQUFjOU4sU0FBZCxFQUF5QixFQUF6QixFQUE2QixFQUE3QixDQUFYO0FBQ0E4TixXQUFXLENBQUMsaUJBQUQsRUFBb0I3TixlQUFwQixFQUFxQyxFQUFyQyxFQUF5QyxFQUF6QyxDQUFYO0FBQ0E2TixXQUFXLENBQUMsSUFBRCxFQUFPNU4sRUFBUCxFQUFXLEVBQVgsRUFBZSxFQUFmLENBQVg7QUFDQTROLFdBQVcsQ0FBQyxZQUFELEVBQWUzTixVQUFmLEVBQTJCLEVBQTNCLEVBQStCLEVBQS9CLENBQVgsQzs7Ozs7Ozs7Ozs7QUN0S0FYLE1BQU0sQ0FBQzhPLEtBQVAsQ0FBYTtBQUNULFlBQVUsVUFBVXZNLE1BQVYsRUFBa0J3TSxHQUFsQixFQUF1QjtBQUM3QixXQUFPLElBQVA7QUFDSCxHQUhRO0FBSVQsWUFBVSxVQUFVeE0sTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCO0FBQzdCLFFBQUkvRSxLQUFLLENBQUNDLFlBQU4sQ0FBbUIxSCxNQUFuQixFQUEyQixDQUFDLE1BQUQsRUFBUyxlQUFULENBQTNCLENBQUosRUFBMkQ7QUFDdkQsYUFBTyxJQUFQO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBTyxLQUFQO0FBQ0g7QUFDSixHQVZRO0FBV1QsWUFBVSxVQUFVQSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUJDLFVBQXZCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUNuRCxXQUFPLElBQVA7QUFDSDtBQWJRLENBQWI7QUFnQkF0TyxVQUFVLENBQUNtTyxLQUFYLENBQWlCO0FBQ2IsWUFBVSxVQUFVdk0sTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCO0FBQzdCO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsR0FKWTtBQUtiLFlBQVUsVUFBVXhNLE1BQVYsRUFBa0J3TSxHQUFsQixFQUF1QjtBQUM3QixRQUFJL0UsS0FBSyxDQUFDQyxZQUFOLENBQW1CMUgsTUFBbkIsRUFBMkIsQ0FBQyxNQUFELEVBQVMsZUFBVCxDQUEzQixDQUFKLEVBQTJEO0FBQ3ZELGFBQU8sSUFBUDtBQUNILEtBRkQsTUFFTztBQUNILGFBQU8sS0FBUDtBQUNIO0FBQ0osR0FYWTtBQVliLFlBQVUsVUFBVUEsTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCQyxVQUF2QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbkQ7QUFDQSxXQUFPLElBQVA7QUFDSDtBQWZZLENBQWpCO0FBa0JBdk8sRUFBRSxDQUFDb08sS0FBSCxDQUFTO0FBQ0wsWUFBVSxVQUFVdk0sTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCO0FBQzdCLFdBQU8sSUFBUDtBQUNILEdBSEk7QUFJTCxZQUFVLFVBQVV4TSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUI7QUFDN0IsUUFBSS9FLEtBQUssQ0FBQ0MsWUFBTixDQUFtQjFILE1BQW5CLEVBQTJCLENBQUMsTUFBRCxFQUFTLGVBQVQsQ0FBM0IsQ0FBSixFQUEyRDtBQUN2RCxhQUFPLElBQVA7QUFDSCxLQUZELE1BRU87QUFDSCxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBVkk7QUFXTCxZQUFVLFVBQVVBLE1BQVYsRUFBa0J3TSxHQUFsQixFQUF1QkMsVUFBdkIsRUFBbUNDLFFBQW5DLEVBQTZDO0FBQ25ELFdBQU8sSUFBUDtBQUNIO0FBYkksQ0FBVDtBQWdCQTFPLE1BQU0sQ0FBQ3VPLEtBQVAsQ0FBYTtBQUNULFlBQVUsVUFBVXZNLE1BQVYsRUFBa0J3TSxHQUFsQixFQUF1QjtBQUM3QixXQUFPLElBQVA7QUFDSCxHQUhRO0FBSVQsWUFBVSxVQUFVeE0sTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCO0FBQzdCLFFBQUkvRSxLQUFLLENBQUNDLFlBQU4sQ0FBbUIxSCxNQUFuQixFQUEyQixDQUFDLE1BQUQsRUFBUyxlQUFULENBQTNCLENBQUosRUFBMkQ7QUFDdkQsYUFBTyxJQUFQO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBTyxLQUFQO0FBQ0g7QUFDSixHQVZRO0FBV1QsWUFBVSxVQUFVQSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUJDLFVBQXZCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUNuRCxXQUFPLElBQVA7QUFDSDtBQWJRLENBQWI7QUFlQXpPLFNBQVMsQ0FBQ3NPLEtBQVYsQ0FBZ0I7QUFDWixZQUFVLFVBQVV2TSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUI7QUFDN0IsV0FBTyxJQUFQO0FBQ0gsR0FIVztBQUlaLFlBQVUsVUFBVXhNLE1BQVYsRUFBa0J3TSxHQUFsQixFQUF1QjtBQUM3QixRQUFJL0UsS0FBSyxDQUFDQyxZQUFOLENBQW1CMUgsTUFBbkIsRUFBMkIsQ0FBQyxNQUFELEVBQVMsZUFBVCxDQUEzQixDQUFKLEVBQTJEO0FBQ3ZELGFBQU8sSUFBUDtBQUNILEtBRkQsTUFFTztBQUNILGFBQU8sS0FBUDtBQUNIO0FBQ0osR0FWVztBQVdaLFlBQVUsVUFBVUEsTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCQyxVQUF2QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbkQsV0FBTyxJQUFQO0FBQ0g7QUFiVyxDQUFoQjtBQWdCQXhPLGVBQWUsQ0FBQ3FPLEtBQWhCLENBQXNCO0FBQ2xCLFlBQVUsVUFBVXZNLE1BQVYsRUFBa0J3TSxHQUFsQixFQUF1QjtBQUM3QixXQUFPLElBQVA7QUFDSCxHQUhpQjtBQUlsQixZQUFVLFVBQVV4TSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUI7QUFDN0IsUUFBSS9FLEtBQUssQ0FBQ0MsWUFBTixDQUFtQjFILE1BQW5CLEVBQTJCLENBQUMsTUFBRCxFQUFTLGVBQVQsQ0FBM0IsQ0FBSixFQUEyRDtBQUN2RCxhQUFPLElBQVA7QUFDSCxLQUZELE1BRU87QUFDSCxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBVmlCO0FBV2xCLFlBQVUsVUFBVUEsTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCQyxVQUF2QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbkQsV0FBTyxJQUFQO0FBQ0g7QUFiaUIsQ0FBdEI7QUFrQkFsUCxRQUFRLENBQUMrTyxLQUFULENBQWU7QUFDWCxZQUFVLFVBQVV2TSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUI7QUFDN0IsV0FBTyxJQUFQO0FBQ0gsR0FIVTtBQUlYLFlBQVUsVUFBVXhNLE1BQVYsRUFBa0J3TSxHQUFsQixFQUF1QjtBQUM3QixRQUFJL0UsS0FBSyxDQUFDQyxZQUFOLENBQW1CMUgsTUFBbkIsRUFBMkIsQ0FBQyxNQUFELEVBQVMsZUFBVCxDQUEzQixDQUFKLEVBQTJEO0FBQ3ZELGFBQU8sSUFBUDtBQUNILEtBRkQsTUFFTztBQUNILGFBQU8sS0FBUDtBQUNIO0FBQ0osR0FWVTtBQVdYLFlBQVUsVUFBVUEsTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCQyxVQUF2QixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbkQ7QUFDQSxXQUFPLElBQVA7QUFDSDtBQWRVLENBQWY7QUFpQkFyUCxJQUFJLENBQUNrUCxLQUFMLENBQVc7QUFDUCxZQUFVLFVBQVV2TSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUI7QUFDN0I7QUFDQSxXQUFPLElBQVA7QUFDSCxHQUpNO0FBS1AsWUFBVSxVQUFVeE0sTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCO0FBQzdCLFFBQUkvRSxLQUFLLENBQUNDLFlBQU4sQ0FBbUIxSCxNQUFuQixFQUEyQixDQUFDLE1BQUQsRUFBUyxlQUFULENBQTNCLENBQUosRUFBMkQ7QUFDdkQsYUFBTyxJQUFQO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBTyxLQUFQO0FBQ0g7QUFDSixHQVhNO0FBWVAsWUFBVSxVQUFVQSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUJDLFVBQXZCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUNuRDtBQUNBLFdBQU8sSUFBUDtBQUNIO0FBZk0sQ0FBWDtBQWtCQW5QLFNBQVMsQ0FBQ2dQLEtBQVYsQ0FBZ0I7QUFDWixZQUFVLFVBQVV2TSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUI7QUFDN0I7QUFDQSxXQUFPLElBQVA7QUFDSCxHQUpXO0FBS1osWUFBVSxVQUFVeE0sTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCO0FBQzdCLFFBQUkvRSxLQUFLLENBQUNDLFlBQU4sQ0FBbUIxSCxNQUFuQixFQUEyQixDQUFDLE1BQUQsRUFBUyxlQUFULENBQTNCLENBQUosRUFBMkQ7QUFDdkQsYUFBTyxJQUFQO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBTyxLQUFQO0FBQ0g7QUFDSixHQVhXO0FBWVosWUFBVSxVQUFVQSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUJDLFVBQXZCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUNuRDtBQUNBLFdBQU8sSUFBUDtBQUNIO0FBZlcsQ0FBaEI7QUFpQkE5TyxPQUFPLENBQUMyTyxLQUFSLENBQWM7QUFDVixZQUFVLFVBQVV2TSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUI7QUFDN0I7QUFDQSxXQUFPLElBQVA7QUFDSCxHQUpTO0FBS1YsWUFBVSxVQUFVeE0sTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCO0FBQzdCLFFBQUkvRSxLQUFLLENBQUNDLFlBQU4sQ0FBbUIxSCxNQUFuQixFQUEyQixDQUFDLE1BQUQsRUFBUyxlQUFULENBQTNCLENBQUosRUFBMkQ7QUFDdkQsYUFBTyxJQUFQO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsYUFBTyxLQUFQO0FBQ0g7QUFDSixHQVhTO0FBWVYsWUFBVSxVQUFVQSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUJDLFVBQXZCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUNuRDtBQUNBLFdBQU8sSUFBUDtBQUNIO0FBZlMsQ0FBZDtBQWlCQTdPLGFBQWEsQ0FBQzBPLEtBQWQsQ0FBb0I7QUFDaEIsWUFBVSxVQUFVdk0sTUFBVixFQUFrQndNLEdBQWxCLEVBQXVCO0FBQzdCO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsR0FKZTtBQUtoQixZQUFVLFVBQVV4TSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUI7QUFDN0IsUUFBSS9FLEtBQUssQ0FBQ0MsWUFBTixDQUFtQjFILE1BQW5CLEVBQTJCLENBQUMsTUFBRCxFQUFTLGVBQVQsQ0FBM0IsQ0FBSixFQUEyRDtBQUN2RCxhQUFPLElBQVA7QUFDSCxLQUZELE1BRU87QUFDSCxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBWGU7QUFZaEIsWUFBVSxVQUFVQSxNQUFWLEVBQWtCd00sR0FBbEIsRUFBdUJDLFVBQXZCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUNuRDtBQUNBLFdBQU8sSUFBUDtBQUNIO0FBZmUsQ0FBcEIsRTs7Ozs7Ozs7Ozs7QUN4S0EsSUFBSWhQLE1BQUo7QUFBV1IsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDTyxRQUFNLENBQUNOLENBQUQsRUFBRztBQUFDTSxVQUFNLEdBQUNOLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQsRTs7Ozs7Ozs7Ozs7QUNBWDs7O0FBR0FNLE1BQU0sQ0FBQ2lQLE9BQVAsQ0FBZSxZQUFZO0FBQ3ZCLE1BQUlDLEdBQUcsR0FBRyxJQUFJQyxRQUFKLENBQWE7QUFDbkJDLGtCQUFjLEVBQUUsSUFERztBQUVuQkMsY0FBVSxFQUFFLElBRk87QUFHbkJDLFdBQU8sRUFBQztBQUhXLEdBQWIsQ0FBVjtBQU1BSixLQUFHLENBQUNLLGFBQUosQ0FBa0I5TyxFQUFsQixFQUFzQjtBQUNsQitPLGdCQUFZLEVBQUU7QUFDVkMsa0JBQVksRUFBRTtBQURKLEtBREk7QUFJbEJDLGFBQVMsRUFBRTtBQUNQbk8sU0FBRyxFQUFFO0FBQ0RrTyxvQkFBWSxFQUFFO0FBRGIsT0FERTtBQUlQRSxVQUFJLEVBQUU7QUFDRkYsb0JBQVksRUFBRTtBQURaLE9BSkM7QUFPUEcsU0FBRyxFQUFFO0FBQ0RILG9CQUFZLEVBQUUsSUFEYjtBQUVESSxvQkFBWSxFQUFFO0FBRmIsT0FQRTtBQVdQQyxZQUFNLEVBQUU7QUFDSkwsb0JBQVksRUFBRSxJQURWO0FBRUpJLG9CQUFZLEVBQUU7QUFGVjtBQVhEO0FBSk8sR0FBdEIsRUFQdUIsQ0E2QnZCOztBQUNBWCxLQUFHLENBQUNhLFFBQUosQ0FBYSxTQUFiLEVBQXdCO0FBQUNOLGdCQUFZLEVBQUU7QUFBZixHQUF4QixFQUE4QztBQUMxQ2xPLE9BQUcsRUFBRSxZQUFZO0FBQ2J5TyxhQUFPLENBQUNDLEdBQVIsQ0FBWWYsR0FBRyxDQUFDalAsS0FBaEI7QUFDQSxhQUFPUSxFQUFFLENBQUM0QixPQUFILENBQVcsS0FBSzZOLFNBQUwsQ0FBZTlMLEVBQTFCLENBQVA7QUFDSDtBQUp5QyxHQUE5QztBQU1ILENBcENELEUsQ0F1Q0E7QUFDQSxxSTs7Ozs7Ozs7Ozs7QUMzQ0F3SSxTQUFTLEdBQUcsSUFBSXJOLEtBQUssQ0FBQ0ssVUFBVixDQUFxQixXQUFyQixDQUFaO0FBQ0FJLE1BQU0sQ0FBQ2lQLE9BQVAsQ0FBZSxZQUFZO0FBQ3ZCZSxTQUFPLENBQUNDLEdBQVIsQ0FBWSxtQ0FBWjs7QUFFQSxNQUFJdFEsSUFBSSxDQUFDbUksSUFBTCxHQUFZdUQsS0FBWixPQUF3QixDQUE1QixFQUErQjtBQUMzQixLQUNJO0FBQ0ksYUFBTyxxQkFEWDtBQUVJLGtCQUFZLFdBRmhCO0FBR0ksb0JBQWMsR0FIbEI7QUFJSSxtQkFBYSxNQUpqQjtBQUtJLGtCQUFZLDhCQUxoQjtBQU1JLGlCQUFXO0FBTmYsS0FESixFQVNJO0FBQ0ksYUFBTyxtQkFEWDtBQUVJLGtCQUFZLFVBRmhCO0FBR0ksb0JBQWMsU0FIbEI7QUFJSSxtQkFBYSxNQUpqQjtBQUtJLGtCQUFZLDhCQUxoQjtBQU1JLGlCQUFXO0FBTmYsS0FUSixFQWlCSTtBQUNJLGtCQUFZLE1BRGhCO0FBRUksb0JBQWMsV0FGbEI7QUFHSSxtQkFBYSxVQUhqQjtBQUlJLGtCQUFZLDZCQUpoQjtBQUtJVCxhQUFPLEVBQUc7QUFMZCxLQWpCSixFQXdCSTtBQUNJLGtCQUFZLFNBRGhCO0FBRUksb0JBQWMsUUFGbEI7QUFHSSxtQkFBYSxVQUhqQjtBQUlJLGtCQUFZLDBCQUpoQjtBQUtJQSxhQUFPLEVBQUc7QUFMZCxLQXhCSixFQStCSTtBQUNJLGFBQU8sbUJBRFg7QUFFSSxrQkFBWSxTQUZoQjtBQUdJLG9CQUFjLFFBSGxCO0FBSUksbUJBQWEsWUFKakI7QUFLSSxrQkFBWSwwQkFMaEI7QUFNSUEsYUFBTyxFQUFHO0FBTmQsS0EvQkosRUF1Q0k7QUFDSSxhQUFPLG9CQURYO0FBRUksa0JBQVksSUFGaEI7QUFHSSxvQkFBYyxJQUhsQjtBQUlJLG1CQUFhLFlBSmpCO0FBS0ksa0JBQVksMEJBTGhCO0FBTUlBLGFBQU8sRUFBRztBQU5kLEtBdkNKLEVBK0NFdUYsT0EvQ0YsQ0ErQ1UsVUFBVUMsUUFBVixFQUFvQjtBQUMxQnpRLFVBQUksQ0FBQ2dHLE1BQUwsQ0FBWXlLLFFBQVo7QUFDSCxLQWpERDtBQWtESDs7QUFFRCxNQUFJdlEsU0FBUyxDQUFDaUksSUFBVixHQUFpQnVELEtBQWpCLE9BQTZCLENBQWpDLEVBQW9DO0FBQ2hDLEtBQ0k7QUFDSSxhQUFPLG1CQURYO0FBRUksdUJBQWlCLE1BRnJCO0FBR0ksdUJBQWlCLDBCQUhyQjtBQUlJLDRCQUFzQixrQkFKMUI7QUFLSSxpQkFBVztBQUxmLEtBREosRUFRSTtBQUNJLHVCQUFpQixVQURyQjtBQUVJLHVCQUFpQiw0QkFGckI7QUFHSSw0QkFBc0IscUJBSDFCO0FBSUlULGFBQU8sRUFBRztBQUpkLEtBUkosRUFjSTtBQUNJLHVCQUFpQixZQURyQjtBQUVJLHVCQUFpQixnQ0FGckI7QUFHSSw0QkFBc0IscUJBSDFCO0FBSUlBLGFBQU8sRUFBRztBQUpkLEtBZEosRUFvQkV1RixPQXBCRixDQW9CVSxVQUFVRSxhQUFWLEVBQXlCO0FBQy9CeFEsZUFBUyxDQUFDOEYsTUFBVixDQUFpQjBLLGFBQWpCO0FBQ0gsS0F0QkQ7QUF1Qkg7O0FBRUQsTUFBSXRRLE1BQU0sQ0FBQytILElBQVAsR0FBY3VELEtBQWQsT0FBMEIsQ0FBOUIsRUFBaUM7QUFDN0IsUUFBSWlGLFVBQVUsR0FBR3ZGLFFBQVEsQ0FBQ08sVUFBVCxDQUFvQjtBQUNqQ0gsY0FBUSxFQUFFLFVBRHVCO0FBRWpDRCxXQUFLLEVBQUUsb0JBRjBCO0FBR2pDRSxjQUFRLEVBQUUsb0JBSHVCO0FBSWpDN0gsYUFBTyxFQUFFO0FBQ0xDLFlBQUksRUFBRTtBQUREO0FBSndCLEtBQXBCLENBQWpCO0FBUUg7O0FBRUQsTUFBSW9KLFNBQVMsQ0FBQzlFLElBQVYsR0FBaUJ1RCxLQUFqQixPQUE2QixDQUFqQyxFQUFvQztBQUNoQyxLQUNJO0FBQ0ksbUJBQWEsdUVBRGpCO0FBRUksaUJBQVc7QUFGZixLQURKLEVBS0U4RSxPQUxGLENBS1UsVUFBVUksU0FBVixFQUFxQjtBQUMzQjNELGVBQVMsQ0FBQ2pILE1BQVYsQ0FBaUI0SyxTQUFqQjtBQUNILEtBUEQ7QUFRSDs7QUFFRCxNQUFJQyxPQUFPLEdBQUd6USxNQUFNLENBQUNzQyxPQUFQLENBQWU7QUFBQyxzQkFBa0I7QUFBbkIsR0FBZixFQUF5RDRDLEdBQXZFOztBQUNBOEUsT0FBSyxDQUFDMEcsZUFBTixDQUFzQkQsT0FBdEIsRUFBK0IsQ0FBQyxNQUFELEVBQVMsZUFBVCxDQUEvQixFQUEwRHpHLEtBQUssQ0FBQzJHLFlBQWhFO0FBRUEzRyxPQUFLLENBQUM0RyxjQUFOLENBQXFCLENBQUMsTUFBRCxFQUFTLGVBQVQsQ0FBckIsRUFBZ0QvQyxHQUFoRCxDQUFvRCxVQUFVekssSUFBVixFQUFnQnlOLEtBQWhCLEVBQXVCQyxjQUF2QixFQUF1QztBQUN2RmIsV0FBTyxDQUFDQyxHQUFSLENBQVksb0NBQVo7QUFFQW5RLFlBQVEsQ0FBQ2dJLElBQVQsQ0FBYztBQUFDeEYsWUFBTSxFQUFFYSxJQUFJLENBQUM4QjtBQUFkLEtBQWQsRUFBa0NrTCxPQUFsQyxDQUEwQyxVQUFVVyxHQUFWLEVBQWU7QUFDckRoUixjQUFRLENBQUM4TCxNQUFULENBQWdCO0FBQUMzRyxXQUFHLEVBQUU2TCxHQUFHLENBQUM3TDtBQUFWLE9BQWhCO0FBQ0gsS0FGRDtBQUdBdEYsUUFBSSxDQUFDbUksSUFBTCxDQUFVO0FBQUM4QyxhQUFPLEVBQUU7QUFBVixLQUFWLEVBQXdCdUYsT0FBeEIsQ0FBZ0MsVUFBVVcsR0FBVixFQUFlO0FBQzNDaFIsY0FBUSxDQUFDNkYsTUFBVCxDQUNJO0FBQ0lyRCxjQUFNLEVBQUVhLElBQUksQ0FBQzhCLEdBRGpCO0FBRUl0QyxjQUFNLEVBQUVtTyxHQUFHLENBQUM3TCxHQUZoQjtBQUdJOEwsZ0JBQVEsRUFBRUQsR0FBRyxDQUFDQyxRQUhsQjtBQUlJcEQsaUJBQVMsRUFBRW1ELEdBQUcsQ0FBQ25ELFNBSm5CO0FBS0lwTCxrQkFBVSxFQUFFdU8sR0FBRyxDQUFDdk8sVUFMcEI7QUFNSUMsZ0JBQVEsRUFBRSxLQU5kO0FBT0lvSSxlQUFPLEVBQUc7QUFQZCxPQURKO0FBWUE5SyxjQUFRLENBQUM2RixNQUFULENBQ0k7QUFDSXJELGNBQU0sRUFBRWEsSUFBSSxDQUFDOEIsR0FEakI7QUFFSXRDLGNBQU0sRUFBRW1PLEdBQUcsQ0FBQzdMLEdBRmhCO0FBR0k4TCxnQkFBUSxFQUFFRCxHQUFHLENBQUNDLFFBSGxCO0FBSUlwRCxpQkFBUyxFQUFFbUQsR0FBRyxDQUFDbkQsU0FKbkI7QUFLSXBMLGtCQUFVLEVBQUV1TyxHQUFHLENBQUN2TyxVQUxwQjtBQU1JQyxnQkFBUSxFQUFFLE1BTmQ7QUFPSW9JLGVBQU8sRUFBRztBQVBkLE9BREo7QUFZQTlLLGNBQVEsQ0FBQzZGLE1BQVQsQ0FDSTtBQUNJckQsY0FBTSxFQUFFYSxJQUFJLENBQUM4QixHQURqQjtBQUVJdEMsY0FBTSxFQUFFbU8sR0FBRyxDQUFDN0wsR0FGaEI7QUFHSThMLGdCQUFRLEVBQUVELEdBQUcsQ0FBQ0MsUUFIbEI7QUFJSXBELGlCQUFTLEVBQUVtRCxHQUFHLENBQUNuRCxTQUpuQjtBQUtJcEwsa0JBQVUsRUFBRXVPLEdBQUcsQ0FBQ3ZPLFVBTHBCO0FBTUlDLGdCQUFRLEVBQUUsUUFOZDtBQU9Jb0ksZUFBTyxFQUFHO0FBUGQsT0FESjtBQVlBOUssY0FBUSxDQUFDNkYsTUFBVCxDQUNJO0FBQ0lyRCxjQUFNLEVBQUVhLElBQUksQ0FBQzhCLEdBRGpCO0FBRUl0QyxjQUFNLEVBQUVtTyxHQUFHLENBQUM3TCxHQUZoQjtBQUdJOEwsZ0JBQVEsRUFBRUQsR0FBRyxDQUFDQyxRQUhsQjtBQUlJcEQsaUJBQVMsRUFBRW1ELEdBQUcsQ0FBQ25ELFNBSm5CO0FBS0lwTCxrQkFBVSxFQUFFdU8sR0FBRyxDQUFDdk8sVUFMcEI7QUFNSUMsZ0JBQVEsRUFBRSxTQU5kO0FBT0lvSSxlQUFPLEVBQUc7QUFQZCxPQURKO0FBWUE5SyxjQUFRLENBQUM2RixNQUFULENBQ0k7QUFDSXJELGNBQU0sRUFBRWEsSUFBSSxDQUFDOEIsR0FEakI7QUFFSXRDLGNBQU0sRUFBRW1PLEdBQUcsQ0FBQzdMLEdBRmhCO0FBR0k4TCxnQkFBUSxFQUFFRCxHQUFHLENBQUNDLFFBSGxCO0FBSUlwRCxpQkFBUyxFQUFFbUQsR0FBRyxDQUFDbkQsU0FKbkI7QUFLSXBMLGtCQUFVLEVBQUV1TyxHQUFHLENBQUN2TyxVQUxwQjtBQU1JQyxnQkFBUSxFQUFFLE9BTmQ7QUFPSW9JLGVBQU8sRUFBRztBQVBkLE9BREo7QUFZQTlLLGNBQVEsQ0FBQzZGLE1BQVQsQ0FDSTtBQUNJckQsY0FBTSxFQUFFYSxJQUFJLENBQUM4QixHQURqQjtBQUVJdEMsY0FBTSxFQUFFbU8sR0FBRyxDQUFDN0wsR0FGaEI7QUFHSThMLGdCQUFRLEVBQUVELEdBQUcsQ0FBQ0MsUUFIbEI7QUFJSXBELGlCQUFTLEVBQUVtRCxHQUFHLENBQUNuRCxTQUpuQjtBQUtJcEwsa0JBQVUsRUFBRXVPLEdBQUcsQ0FBQ3ZPLFVBTHBCO0FBTUlDLGdCQUFRLEVBQUUsVUFOZDtBQU9Jb0ksZUFBTyxFQUFHO0FBUGQsT0FESjtBQWFILEtBMUVEO0FBMkVILEdBakZEO0FBa0ZILENBN0xELEU7Ozs7Ozs7Ozs7O0FDREEsSUFBSTVLLE1BQUo7QUFBV1IsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDTyxRQUFNLENBQUNOLENBQUQsRUFBRztBQUFDTSxVQUFNLEdBQUNOLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFFWE0sTUFBTSxDQUFDaVAsT0FBUCxDQUFlLE1BQU07QUFDcEJsRSxVQUFRLENBQUNpRyx5QkFBVCxDQUFtQ3BGLE1BQW5DLENBQTBDO0FBQ3pDcUYsV0FBTyxFQUFFO0FBRGdDLEdBQTFDO0FBR0FsRyxVQUFRLENBQUNpRyx5QkFBVCxDQUFtQ3JMLE1BQW5DLENBQTBDO0FBQ3pDc0wsV0FBTyxFQUFFLFFBRGdDO0FBRXpDQyxZQUFRLEVBQUVDLE1BQU0sQ0FBQ0QsUUFGd0I7QUFHekNFLFVBQU0sRUFBRUQsTUFBTSxDQUFDRTtBQUgwQixHQUExQztBQU1BQyxzQkFBb0IsQ0FBQ0MsY0FBckIsQ0FBb0MzRixNQUFwQyxDQUEyQztBQUMxQ3FGLFdBQU8sRUFBRTtBQURpQyxHQUEzQztBQUdBSyxzQkFBb0IsQ0FBQ0MsY0FBckIsQ0FBb0M1TCxNQUFwQyxDQUEyQztBQUMxQ3NMLFdBQU8sRUFBRSxVQURpQztBQUUxQ08sU0FBSyxFQUFFQyxRQUFRLENBQUNELEtBRjBCO0FBRzFDSixVQUFNLEVBQUVLLFFBQVEsQ0FBQ0w7QUFIeUIsR0FBM0M7QUFNQSxDQW5CRCxFOzs7Ozs7Ozs7OztBQ0ZBOzs7QUFJQU0sWUFBWSxHQUFHO0FBQ1hDLDBCQUF3QixFQUFFO0FBRGYsQ0FBZixDLENBSUE7O0FBQ0FDLFFBQVEsR0FBRyxVQUFYO0FBQ0F0QyxPQUFPLEdBQUcsYUFBVixDLENBRUE7O0FBQ0E2QixNQUFNLEdBQUc7QUFDTEQsVUFBUSxFQUFFLDBFQURMO0FBRUxHLGNBQVksRUFBRTtBQUZULENBQVQ7QUFJQUksUUFBUSxHQUFHO0FBQ1BELE9BQUssRUFBRSwwRUFEQTtBQUVQSixRQUFNLEVBQUU7QUFGRCxDQUFYLEMsQ0FNQTs7QUFDQVMsV0FBVyxHQUFHO0FBQ1ZDLE1BQUksRUFBRSxpQkFESTtBQUVWQyxNQUFJLEVBQUUsZUFGSSxDQU1kOztBQU5jLENBQWQ7QUFPQUMsaUJBQWlCLEdBQUcsU0FBcEI7QUFDQUMsMEJBQTBCLEdBQUcsU0FBN0I7QUFDQUMsa0JBQWtCLEdBQUcsU0FBckI7QUFDQUMsc0JBQXNCLEdBQUcsT0FBekI7QUFDQUMsWUFBWSxHQUFHLFNBQWYsQyxDQUVBOztBQUNBQyxXQUFXLEdBQUcsd0JBQWQ7QUFDQXBRLElBQUksR0FBRyx3QkFBUDtBQUNBcVEsY0FBYyxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsR0FBWixHQUFrQixVQUFuQztBQUVBbk4sT0FBTyxHQUFHckQsSUFBSSxHQUFHLG1CQUFqQjtBQUNBeVEsS0FBSyxHQUFHelEsSUFBSSxHQUFHLGlCQUFmO0FBQ0E4QyxXQUFXLEdBQUc5QyxJQUFJLEdBQUcsdUJBQXJCO0FBRUFqQyxNQUFNLENBQUMyUyxXQUFQLENBQW1CQyxjQUFuQixDQUFrQ0MsT0FBbEMsR0FBNEM1USxJQUE1QyxDOzs7Ozs7Ozs7OztBQzlDQTs7O0FBS0E2USxRQUFRLEdBQUksWUFBVztBQUNuQixNQUFJQyxHQUFHLEdBQUcsVUFBU2pDLEdBQVQsRUFBYzdKLE1BQWQsRUFBc0I7QUFDNUIsV0FBT1YsQ0FBQyxDQUFDeU0sR0FBRixDQUFNbEMsR0FBTixFQUFXLFVBQVNtQyxLQUFULEVBQWdCO0FBQzlCLGFBQU8xTSxDQUFDLENBQUMyTSxPQUFGLENBQVVELEtBQVYsRUFBaUJoTSxNQUFqQixDQUFQO0FBQ0gsS0FGTSxDQUFQO0FBR0gsR0FKRDs7QUFNQSxNQUFJa00sSUFBSSxHQUFHLFVBQVNoSyxJQUFULEVBQWVpSyxLQUFmLEVBQXNCO0FBQzdCLFdBQU83TSxDQUFDLENBQUM4TSxNQUFGLENBQVNsSyxJQUFULEVBQWUsVUFBU21LLElBQVQsRUFBZUMsSUFBZixFQUFxQjtBQUN2QyxVQUFJQyxHQUFHLEdBQUdqTixDQUFDLENBQUNrTixJQUFGLENBQU9GLElBQVAsRUFBYUgsS0FBYixDQUFWOztBQUNBLFVBQUksQ0FBQ0wsR0FBRyxDQUFDTyxJQUFELEVBQU9FLEdBQVAsQ0FBUixFQUFxQjtBQUNqQkYsWUFBSSxDQUFDSSxJQUFMLENBQVVGLEdBQVY7QUFDSDs7QUFDRCxhQUFPRixJQUFQO0FBQ0gsS0FOTSxFQU1KLEVBTkksQ0FBUDtBQU9ILEdBUkQ7O0FBVUEsTUFBSUssS0FBSyxHQUFHLFVBQVN4SyxJQUFULEVBQWVpSyxLQUFmLEVBQXNCUSxNQUF0QixFQUE4QjtBQUN0QyxRQUFJQyxLQUFLLEdBQUdWLElBQUksQ0FBQ2hLLElBQUQsRUFBT2lLLEtBQVAsQ0FBaEI7QUFDQSxXQUFPN00sQ0FBQyxDQUFDcUgsR0FBRixDQUFNaUcsS0FBTixFQUFhLFVBQVNDLElBQVQsRUFBZTtBQUMvQixhQUFPO0FBQ0hDLGFBQUssRUFBQ0gsTUFESDtBQUVISixXQUFHLEVBQUVNLElBRkY7QUFHSEUsWUFBSSxFQUFDek4sQ0FBQyxDQUFDcUgsR0FBRixDQUFNckgsQ0FBQyxDQUFDME4sS0FBRixDQUFROUssSUFBUixFQUFjMkssSUFBZCxDQUFOLEVBQTJCLFVBQVNQLElBQVQsRUFBZTtBQUMzQyxpQkFBT2hOLENBQUMsQ0FBQzJOLElBQUYsQ0FBT1gsSUFBUCxFQUFhSCxLQUFiLENBQVA7QUFDSCxTQUZJO0FBSEYsT0FBUDtBQU9ILEtBUk0sQ0FBUDtBQVNILEdBWEQ7O0FBYUFPLE9BQUssQ0FBQ1EsUUFBTixHQUFpQixVQUFTM1EsSUFBVCxFQUFlNFEsU0FBZixFQUEwQjtBQUN2QyxXQUFPVCxLQUFLLENBQUNuUSxJQUFELENBQUwsR0FBYyxVQUFTMkYsSUFBVCxFQUFlaUssS0FBZixFQUFzQlEsTUFBdEIsRUFBOEI7QUFDL0MsYUFBT3JOLENBQUMsQ0FBQ3FILEdBQUYsQ0FBTStGLEtBQUssQ0FBQ3hLLElBQUQsRUFBT2lLLEtBQVAsRUFBY1EsTUFBZCxDQUFYLEVBQWtDUSxTQUFsQyxDQUFQO0FBQ0gsS0FGRDtBQUdILEdBSkQ7O0FBTUEsU0FBT1QsS0FBUDtBQUNILENBckNXLEVBQVo7O0FBdUNBYixRQUFRLENBQUNxQixRQUFULENBQWtCLEtBQWxCLEVBQXlCLFVBQVNaLElBQVQsRUFBZTtBQUNwQyxTQUFPaE4sQ0FBQyxDQUFDOE4sTUFBRixDQUFTLEVBQVQsRUFBYWQsSUFBSSxDQUFDQyxHQUFsQixFQUF1QjtBQUFDYyxPQUFHLEVBQUUvTixDQUFDLENBQUM4TSxNQUFGLENBQVNFLElBQUksQ0FBQ1MsSUFBZCxFQUFvQixVQUFTVixJQUFULEVBQWVpQixJQUFmLEVBQXFCO0FBQ3pFLGFBQU9qQixJQUFJLEdBQUdrQixNQUFNLENBQUNELElBQUksQ0FBQyxLQUFHaEIsSUFBSSxDQUFDUSxLQUFSLEdBQWMsRUFBZixDQUFMLENBQXBCO0FBQ0gsS0FGbUMsRUFFakMsQ0FGaUM7QUFBTixHQUF2QixDQUFQO0FBR0gsQ0FKRDtBQU1BakIsUUFBUSxDQUFDcUIsUUFBVCxDQUFrQixPQUFsQixFQUEyQixVQUFTWixJQUFULEVBQWU7QUFDdEMsU0FBT2hOLENBQUMsQ0FBQzhOLE1BQUYsQ0FBUyxFQUFULEVBQWFkLElBQUksQ0FBQ0MsR0FBbEIsRUFBdUI7QUFBQ2lCLFNBQUssRUFBRWxPLENBQUMsQ0FBQzhNLE1BQUYsQ0FBU0UsSUFBSSxDQUFDUyxJQUFkLEVBQW9CLFVBQVNWLElBQVQsRUFBZWlCLElBQWYsRUFBcUI7QUFDM0UsYUFBT2pCLElBQUksR0FBRyxDQUFkO0FBQ0gsS0FGcUMsRUFFbkMsQ0FGbUM7QUFBUixHQUF2QixDQUFQO0FBR0gsQ0FKRDtBQU1BUixRQUFRLENBQUNxQixRQUFULENBQWtCLEtBQWxCLEVBQXlCLFVBQVNaLElBQVQsRUFBZTtBQUNwQ3ZELFNBQU8sQ0FBQ0MsR0FBUixDQUFZc0QsSUFBSSxDQUFDUyxJQUFMLENBQVVsSixNQUF0QjtBQUNBLFNBQU92RSxDQUFDLENBQUM4TixNQUFGLENBQ0gsRUFERyxFQUNDZCxJQUFJLENBQUNDLEdBRE4sRUFDVztBQUFDa0IsT0FBRyxFQUFFbk8sQ0FBQyxDQUFDOE0sTUFBRixDQUFTRSxJQUFJLENBQUNTLElBQWQsRUFBb0IsVUFBU1YsSUFBVCxFQUFlaUIsSUFBZixFQUFxQjtBQUN6RCxhQUFPakIsSUFBSSxHQUFHa0IsTUFBTSxDQUFDRCxJQUFJLENBQUMsS0FBR2hCLElBQUksQ0FBQ1EsS0FBUixHQUFjLEVBQWYsQ0FBTCxDQUFwQjtBQUNILEtBRm1CLEVBRWpCLENBRmlCLElBRVpSLElBQUksQ0FBQ1MsSUFBTCxDQUFVbEo7QUFGSixHQURYLENBQVA7QUFLSCxDQVBEO0FBU0FnSSxRQUFRLENBQUNxQixRQUFULENBQWtCLEtBQWxCLEVBQXlCLFVBQVNaLElBQVQsRUFBZTtBQUNwQyxTQUFPaE4sQ0FBQyxDQUFDOE4sTUFBRixDQUFTLEVBQVQsRUFBYWQsSUFBSSxDQUFDQyxHQUFsQixFQUF1QjtBQUFDbUIsT0FBRyxFQUFFcE8sQ0FBQyxDQUFDOE0sTUFBRixDQUFTRSxJQUFJLENBQUNTLElBQWQsRUFBb0IsVUFBU1YsSUFBVCxFQUFlaUIsSUFBZixFQUFxQjtBQUN6RSxhQUFPSyxJQUFJLENBQUNDLEdBQUwsQ0FBU3ZCLElBQVQsRUFBZWtCLE1BQU0sQ0FBQ0QsSUFBSSxDQUFDLEtBQUdoQixJQUFJLENBQUNRLEtBQVIsR0FBYyxFQUFmLENBQUwsQ0FBckIsQ0FBUDtBQUNILEtBRm1DLEVBRWpDUyxNQUFNLENBQUNNLGlCQUYwQjtBQUFOLEdBQXZCLENBQVA7QUFHSCxDQUpEO0FBTUFoQyxRQUFRLENBQUNxQixRQUFULENBQWtCLEtBQWxCLEVBQXlCLFVBQVNaLElBQVQsRUFBZTtBQUNwQyxTQUFPaE4sQ0FBQyxDQUFDOE4sTUFBRixDQUFTLEVBQVQsRUFBYWQsSUFBSSxDQUFDQyxHQUFsQixFQUF1QjtBQUFDdUIsT0FBRyxFQUFFeE8sQ0FBQyxDQUFDOE0sTUFBRixDQUFTRSxJQUFJLENBQUNTLElBQWQsRUFBb0IsVUFBU1YsSUFBVCxFQUFlaUIsSUFBZixFQUFxQjtBQUN6RSxhQUFPSyxJQUFJLENBQUNJLEdBQUwsQ0FBUzFCLElBQVQsRUFBZWtCLE1BQU0sQ0FBQ0QsSUFBSSxDQUFDLEtBQUdoQixJQUFJLENBQUNRLEtBQVIsR0FBYyxFQUFmLENBQUwsQ0FBckIsQ0FBUDtBQUNILEtBRm1DLEVBRWpDUyxNQUFNLENBQUNNLGlCQUYwQjtBQUFOLEdBQXZCLENBQVA7QUFHSCxDQUpEOztBQVlBeFQsT0FBTyxHQUFHLFVBQVN3UCxHQUFULEVBQWM7QUFFcEIsTUFBSTtBQUNBO0FBQ0EsUUFBSUEsR0FBRyxJQUFJLElBQVgsRUFBaUIsT0FBTyxLQUFQO0FBQ2pCLFFBQUlBLEdBQUcsSUFBSTNMLFNBQVgsRUFBc0IsT0FBTyxLQUFQO0FBQ3RCLFFBQUkyTCxHQUFHLElBQUksRUFBWCxFQUFlLE9BQU8sS0FBUCxDQUpmLENBTUE7O0FBQ0EsUUFBSUEsR0FBRyxJQUFJLElBQVgsRUFBaUIsT0FBTyxJQUFQO0FBQ2pCLFFBQUlBLEdBQUcsSUFBSSxLQUFYLEVBQWtCLE9BQU8sS0FBUCxDQVJsQixDQVVBO0FBQ0E7O0FBQ0EsUUFBSUEsR0FBRyxDQUFDaEcsTUFBSixHQUFhLENBQWpCLEVBQXVCLE9BQU8sSUFBUDtBQUN2QixRQUFJZ0csR0FBRyxDQUFDaEcsTUFBSixLQUFlLENBQW5CLEVBQXVCLE9BQU8sS0FBUDtBQUV2QixRQUFJLE9BQU9nRyxHQUFQLElBQWMsUUFBZCxJQUEwQkEsR0FBRyxJQUFJLENBQXJDLEVBQXdDLE9BQU8sSUFBUCxDQWZ4QyxDQWlCQTtBQUNBO0FBQ0E7O0FBQ0EsUUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkIsT0FBTyxLQUFQLENBcEI3QixDQXNCQTtBQUNBO0FBQ0E7O0FBQ0EsUUFBSW1FLGNBQWMsR0FBRzVILE1BQU0sQ0FBQzZILFNBQVAsQ0FBaUJELGNBQXRDOztBQUNBLFNBQUssSUFBSXpCLEdBQVQsSUFBZ0IxQyxHQUFoQixFQUFxQjtBQUNqQixVQUFJbUUsY0FBYyxDQUFDdEwsSUFBZixDQUFvQm1ILEdBQXBCLEVBQXlCMEMsR0FBekIsQ0FBSixFQUFtQyxPQUFPLElBQVA7QUFDdEM7O0FBQ0QsV0FBTyxLQUFQO0FBQ0gsR0E5QkQsQ0E4QkUsT0FBTTJCLEdBQU4sRUFBVztBQUNULFdBQU8sS0FBUDtBQUNIO0FBQ0osQ0FuQ0Q7O0FBdUNBQyxPQUFPLEdBQUcsVUFBVUMsSUFBVixFQUFnQkMsU0FBaEIsRUFBMkJDLFNBQTNCLEVBQXNDO0FBQzVDLE1BQUlDLE9BQU8sR0FBRyxJQUFJaEssSUFBSixFQUFkOztBQUNBLE1BQUk4SixTQUFTLElBQUksU0FBakIsRUFBNEI7QUFDeEIsUUFBSUcsU0FBUyxHQUFHSixJQUFJLENBQUNLLFVBQUwsS0FBb0JILFNBQXBDO0FBQ0FDLFdBQU8sR0FBR0gsSUFBSSxDQUFDTSxVQUFMLENBQWdCRixTQUFoQixDQUFWO0FBQ0g7O0FBRUQsTUFBSUgsU0FBUyxJQUFJLE9BQWpCLEVBQTBCO0FBQ3RCLFFBQUlHLFNBQVMsR0FBR0osSUFBSSxDQUFDTyxRQUFMLEtBQWtCTCxTQUFsQztBQUNBQyxXQUFPLEdBQUdILElBQUksQ0FBQ1EsUUFBTCxDQUFjSixTQUFkLENBQVY7QUFDSDs7QUFDRCxNQUFJSCxTQUFTLElBQUksTUFBakIsRUFBeUI7QUFDckIsUUFBSVEsUUFBUSxHQUFHVCxJQUFJLENBQUNVLE9BQUwsS0FBaUJSLFNBQWhDO0FBQ0FDLFdBQU8sR0FBR0gsSUFBSSxDQUFDVyxPQUFMLENBQWFGLFFBQWIsQ0FBVjtBQUNIOztBQUNELE1BQUlSLFNBQVMsSUFBSSxRQUFqQixFQUEyQjtBQUN2QixRQUFJVyxTQUFTLEdBQUdaLElBQUksQ0FBQ2EsUUFBTCxLQUFrQlgsU0FBbEM7QUFDQUMsV0FBTyxHQUFHSCxJQUFJLENBQUNjLFFBQUwsQ0FBY0YsU0FBZCxDQUFWO0FBQ0g7O0FBQ0QsTUFBSVgsU0FBUyxJQUFJLE9BQWpCLEVBQTBCO0FBQ3RCLFFBQUljLFNBQVMsR0FBR2YsSUFBSSxDQUFDZ0IsV0FBTCxLQUFxQmQsU0FBckM7QUFDQUMsV0FBTyxHQUFHSCxJQUFJLENBQUNpQixXQUFMLENBQWlCRixTQUFqQixDQUFWO0FBQ0g7O0FBRUQsU0FBTyxJQUFJNUssSUFBSixDQUFTZ0ssT0FBVCxDQUFQO0FBQ0gsQ0F6QkQ7O0FBNkJBZSxXQUFXLEdBQUcsVUFBVUMsTUFBVixFQUFpQkMsZ0JBQWpCLEVBQWtDeEQsS0FBbEMsRUFDZDtBQUNJLFNBQU91RCxNQUFNLENBQUNFLE1BQVAsQ0FBYyxVQUFVQyxHQUFWLEVBQWU7QUFDaEMsV0FBT0EsR0FBRyxDQUFDRixnQkFBRCxDQUFILEtBQTBCeEQsS0FBakM7QUFDSCxHQUZNLENBQVA7QUFJSCxDQU5EOztBQVNBMkQsTUFBTSxHQUFHLFlBQVk7QUFDakIsU0FBT2hDLElBQUksQ0FBQ2lDLEtBQUwsQ0FBWWpDLElBQUksQ0FBQ2dDLE1BQUwsS0FBZ0IsR0FBakIsR0FBd0IsQ0FBbkMsQ0FBUDtBQUNILENBRkQ7O0FBSUFFLFNBQVMsR0FBRyxVQUFVQyxDQUFWLEVBQWE7QUFDckIsU0FBTyxDQUFDQyxLQUFLLENBQUNDLFVBQVUsQ0FBQ0YsQ0FBRCxDQUFYLENBQU4sSUFBeUJHLFFBQVEsQ0FBQ0gsQ0FBRCxDQUF4QztBQUNILENBRkQsQyIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGbGV4dXJpbyBDcmVhdGVkIGJ5IFlOLlBhbXVuZ2thcyBKYXl1ZGEgb24gMTIvMy8xNS5cbiAqL1xuaW1wb3J0IHtNb25nb30gZnJvbSAnbWV0ZW9yL21vbmdvJztcblxuTUVOVSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdtZW51Jyk7XG5NRU5VR1JPVVAgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbignbWVudUdyb3VwJyk7XG5NRU5VQVVUSCA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdtZW51QXV0aCcpO1xuTUVNQkVSID0gTWV0ZW9yLnVzZXJzO1xuTUVTU0FHRSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdtZXNzYWdlJyk7XG5NRVNTQUdFTUVNQkVSID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ21lc3NhZ2VNZW1iZXInKTtcblxuQUNUSVZJVFlMT0dTID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2FjdGl2aXR5bG9ncycpO1xuUFJPRklMRURBVEEgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigncHJvZmlsZURhdGEnKTtcbldPVElQRSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCd3b1RpcGUnKTtcbldPU1VCVElQRSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCd3b1N1YlRpcGUnKTtcbldPU1VCVElQRURFVEFJTCA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCd3b1N1YlRpcGVEZXRhaWwnKTtcbldPID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ3dvJyk7XG5BUElNQU5BR0VSID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2FwaW1hbmFnZXInKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBUaGlua01hYyBvbiA3LzI2LzE2LlxuICovXG5pbXBvcnQge1Nlc3Npb259IGZyb20gXCJtZXRlb3Ivc2Vzc2lvblwiO1xuc2V0U0VTU0lPTiA9IGZ1bmN0aW9uIChuYW1hLCBuaWxhaSkge1xuICAgIGlmICh0eXBlb2YobmlsYWkpICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICB2YXIgbmlsYWlCYXJ1ID0gaGlkZURhdGEobmlsYWksIFVzZXJJRCgpKTtcbiAgICAgICAgU2Vzc2lvbi5zZXQobmFtYSwgbmlsYWlCYXJ1KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBGbGFzaE1lc3NhZ2VzLnNlbmRXYXJuaW5nKFwiRXJyb3IsIG9uIHVzZSBib29sZWFuIHZhcmlhYmxlICFcIik7XG4gICAgICAgIFNlc3Npb24uc2V0KG5hbWEsIG5pbGFpKTtcbiAgICB9XG59O1xuXG5nZXRTRVNTSU9OID0gZnVuY3Rpb24gKG5hbWEpIHtcbiAgICB2YXIgbmlsYWk7XG4gICAgaWYgKGFkYURBVEEoU2Vzc2lvbi5nZXQobmFtYSkpKSB7XG4gICAgICAgIG5pbGFpID0gU2Vzc2lvbi5nZXQobmFtYSk7XG4gICAgICAgIHZhciBuaWxhaUJhcnU7XG4gICAgICAgIG5pbGFpQmFydSA9IHNob3dEYXRhKG5pbGFpLCBVc2VySUQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmlsYWlCYXJ1ID0gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIG5pbGFpQmFydTtcbn07XG5cbnNldEJPT0xFQU4gPSBmdW5jdGlvbiAobmFtYSwgbmlsYWkpIHtcbiAgICBTZXNzaW9uLnNldChuYW1hLCBuaWxhaSk7XG59O1xuXG5nZXRCT09MRUFOID0gZnVuY3Rpb24gKG5hbWEpIHtcbiAgICByZXR1cm4gU2Vzc2lvbi5nZXQobmFtYSk7XG59O1xuXG5pbmNyZW1lbnRMaW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV3TGltaXQgPSBTZXNzaW9uLmdldCgnbGltaXQnKSArIDU7XG4gICAgU2Vzc2lvbi5zZXQoJ2xpbWl0JywgbmV3TGltaXQpO1xufTtcblxuZ2V0Um91dGUgPSBmdW5jdGlvbiAoc1VSTE5vdykge1xuICAgIHZhciBzUm91dGUgPSBzVVJMTm93LnJlcGxhY2Uoc1VSTCwgJycpLnJlcGxhY2UoXCIjXCIsICcnKS5yZXBsYWNlKCchJywgJycpO1xuICAgIHJldHVybiBzUm91dGU7XG59O1xuXG5pc0FkbWluQWN0aW9ucyA9IGZ1bmN0aW9uIChzUm91dGUsIHNBY3Rpb25zKSB7XG4gICAgdmFyIGRhdGFBY3Rpb25zID0gTUVOVUFVVEguZmluZE9uZSh7dXNlcklkOiBVc2VySUQoKSwgcm91dGVyTUVOVTogc1JvdXRlLCBhdXRoVGlwZTogc0FjdGlvbnN9KTtcbiAgICBpZiAoZGF0YUFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbmlzQWRtaW4gPSBmdW5jdGlvbiAoaWRNZW51KSB7XG4gICAgaWYgKGFkYURBVEEoTUVOVUFVVEguZmluZE9uZSh7dXNlcklkOiBNZXRlb3IudXNlcklkKCksIGlkTUVOVTogaWRNZW51fSkpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG5zdWJzY3JpYnRpb24gPSBmdW5jdGlvbiAoc09iamVjdCwgb0ZpbHRlciwgb09wdGlvbnMsIGlMaW1pdCkge1xuICAgIHJldHVybiBNZXRlb3Iuc3Vic2NyaWJlKHNPYmplY3QsIGlMaW1pdCwgb0ZpbHRlciwgb09wdGlvbnMpO1xufTtcblxuRW1haWxVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBNZXRlb3IudXNlcigpLmVtYWlsc1swXS5hZGRyZXNzO1xufTtcblxuVXNlck5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHVzZXIgPSBNZXRlb3IudXNlcigpO1xuICAgIGlmIChhZGFEQVRBKHVzZXIpKSB7XG4gICAgICAgIHJldHVybiB1c2VyLnByb2ZpbGUubmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG59O1xuVXNlcklEID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBNZXRlb3IudXNlcklkKCk7XG59O1xuXG5TY3JvbGxIYW5kbGVyID0gZnVuY3Rpb24gKHNPYmplY3QsIG9GaWx0ZXIsIG9PcHRpb25zKSB7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCkgPj0gJChkb2N1bWVudCkuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgIGluY3JlbWVudExpbWl0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblxuU2Nyb2xsMlRvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgfSwgNjAwKTtcbn07XG5cbnVwbG9hZEZvdG9NZW1iZXIgPSBmdW5jdGlvbiAoaWRNZW1iZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogXCJtZW1iZXJfXCIgKyBpZE1lbWJlcixcbiAgICAgICAgZGlyZWN0b3J5OiBcInBpY3R1cmVzL21lbWJfXCIgKyBpZE1lbWJlcixcbiAgICAgICAgbmFtZWZpbGU6IFwibWVtYmVyX1wiICsgaWRNZW1iZXIgKyBcIi5qcGdcIlxuICAgIH1cbn07XG5cblNldEZPVE8gPSBmdW5jdGlvbiAoaVBhbmphbmcsIGlMZWJhciwgc01ldGhvZCwgc1BpY3RIYXNpbCwgc0lEVXNlcikge1xuICAgIFNlc3Npb24uc2V0KCdVSV9XaWR0aCcsIGlMZWJhcik7XG4gICAgU2Vzc2lvbi5zZXQoJ1VJX0hlaWdodCcsIGlQYW5qYW5nKTtcbiAgICBTZXNzaW9uLnNldCgnVUlfTWV0aG9kcycsIHNNZXRob2QpO1xuICAgIFNlc3Npb24uc2V0KCdVSV9Gb3RvJywgc1BpY3RIYXNpbCk7XG4gICAgU2Vzc2lvbi5zZXQoJ1VJX0lEJywgc0lEVXNlcik7XG59O1xucGljdFByb2ZpbGVCYWNrZ3JvdW5kID0gZnVuY3Rpb24gKHVzZXJJZCkge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBmb3RvID0gc0JhY2tncm91bmQ7XG4gICAgICAgIHZhciBkYXRhRm90byA9IE1FTUJFUi5maW5kT25lKHtfaWQ6IHVzZXJJZH0pO1xuICAgICAgICBpZiAoYWRhREFUQShkYXRhRm90bykpIHtcbiAgICAgICAgICAgIGlmIChkYXRhRm90by5wcm9maWxlLmZvdG9CYWNrZ3JvdW5kICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZvdG8gPSBkYXRhRm90by5wcm9maWxlLmZvdG9CYWNrZ3JvdW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3RvO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBzQmFja2dyb3VuZDtcbiAgICB9XG59O1xuXG5waWN0UHJvZmlsZSA9IGZ1bmN0aW9uICh1c2VySWQpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgZm90byA9IHNBdmF0YXI7XG4gICAgICAgIHZhciBkYXRhRm90byA9IE1FTUJFUi5maW5kT25lKHtfaWQ6IHVzZXJJZH0pO1xuICAgICAgICBpZiAoYWRhREFUQShkYXRhRm90bykpIHtcbiAgICAgICAgICAgIGlmIChkYXRhRm90by5wcm9maWxlLmZvdG9Qcm9maWxlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZvdG8gPSBkYXRhRm90by5wcm9maWxlLmZvdG9Qcm9maWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3RvO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBzQXZhdGFyO1xuICAgIH1cbn07XG5cblxuaW5zZXJ0TG9ncyA9IGZ1bmN0aW9uIChrb2RlQUNUSVZJVFlMT0dTLCBuYW1hQUNUSVZJVFlMT0dTKSB7XG4gICAgQUNUSVZJVFlMT0dTLmluc2VydCh7XG4gICAgICAgIGtvZGVBQ1RJVklUWUxPR1M6IGtvZGVBQ1RJVklUWUxPR1MsXG4gICAgICAgIG5hbWFBQ1RJVklUWUxPR1M6IG5hbWFBQ1RJVklUWUxPR1MsXG4gICAgICAgIGNyZWF0ZUJ5OiBVc2VyTmFtZSgpLFxuICAgICAgICBjcmVhdGVCeUlEOiBNZXRlb3IudXNlcklkKClcbiAgICB9KTtcbiAgICBGbGFzaE1lc3NhZ2VzLnNlbmRTdWNjZXNzKG5hbWFBQ1RJVklUWUxPR1MpO1xuXG59O1xuXG5GaWxlUmVhZGVyT2JqZWN0ID0ge1xuICAgIHByZXZpZXdJbWFnZTogZnVuY3Rpb24gKGZpbGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGZpbGVcbiAgICAgICAgICAgIGlmICghXy5jb250YWlucyhGSUxFVVBMT0FELklNRy5UWVBFLCBmaWxlLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobmV3IE1ldGVvci5FcnJvcig0MTIsIFwiRmlsZSBmb3JtYXQgbm90IHN1cHBvcnRlZC4gUGxlYXNlIHVwbG9hZCAuanBnIG9yIC5wbmdcIikpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIHNpemVcbiAgICAgICAgICAgIGlmIChmaWxlLnNpemUgPiBGSUxFVVBMT0FELklNRy5NQVhTSVpFKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobmV3IE1ldGVvci5FcnJvcig0MTIsIFwiRmlsZSBpcyB0b28gbGFyZ2UuIDUxMmtiIHNpemUgbGltaXRcIikpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbGUucmVzdWx0ID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZmlsZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2socmVhZGVyLmVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfVxufTtcblxuc2V0UkVQT1JUID0gZnVuY3Rpb24gKHNSZXBvcnROYW1lLCBzUmVwb3J0TnVtYmVyLCBzUmVwb3J0Rm9vdE5vdGUsIHNDb2xsZWN0aW9ucywgc0JhY2tVcmwsIGNDb2xsZWN0aW9uc0luaXRpYWwsIGFSZXBvcnRGaWx0ZXIsIGFSZXBvcnRPcHRpb25zLCBvUmVwb3J0RmllbGREaXNwbGF5KSB7XG4gICAgU2Vzc2lvbi5zZXQoXCJyZXBvcnROYW1hXCIsIHNSZXBvcnROYW1lKTtcbiAgICBTZXNzaW9uLnNldChcInJlcG9ydEtvbG9tXCIsIG9SZXBvcnRGaWVsZERpc3BsYXkpO1xuICAgIFNlc3Npb24uc2V0KFwicmVwb3J0Q29sbGVjdGlvbnNcIiwgc0NvbGxlY3Rpb25zKTtcbiAgICBTZXNzaW9uLnNldChcInJlcG9ydEJhY2tVcmxcIiwgc0JhY2tVcmwpO1xuICAgIFNlc3Npb24uc2V0KFwicmVwb3J0Q29sbGVjdGlvbnNBbGxcIiwgY0NvbGxlY3Rpb25zSW5pdGlhbC5maW5kKGFSZXBvcnRGaWx0ZXIsIGFSZXBvcnRPcHRpb25zKS5mZXRjaCgpKTtcbiAgICBTZXNzaW9uLnNldChcInJlcG9ydE51bWJlclwiLCBzUmVwb3J0TnVtYmVyKTtcbiAgICBTZXNzaW9uLnNldChcInJlcG9ydEZvb3Rub3RlXCIsIHNSZXBvcnRGb290Tm90ZSk7XG5cbiAgICBSb3V0ZXIuZ28oXCJyZXBvcnRcIik7XG59O1xuXG5cblNlbGVjdGVkVGVycGlsaWggPSBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gICAgdmFyIGVsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG5cbiAgICBpZiAoZWx0LnNlbGVjdGVkSW5kZXggPT0gLTEpXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIGVsdC5vcHRpb25zW2VsdC5zZWxlY3RlZEluZGV4XS50ZXh0O1xufTtcblxuc2V0S3VuY2kgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFhZGFEQVRBKFNlc3Npb24uZ2V0KCdrdW5jaScpKSkge1xuICAgICAgICB2YXIga3VuY2lVc2VyID0ge307XG4gICAgICAgIHZhciBkYXRhTWVtYmVyID0gTUVNQkVSLmZpbmRPbmUoe19pZDogVXNlcklEKCl9KTtcblxuICAgICAgICBpZiAoZGF0YU1lbWJlci50b2tlblRlbXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga3VuY2lVc2VyLnNUb2tlbktleSA9IGRhdGFNZW1iZXIudG9rZW5UZW1wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2VsdWFyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YU1lbWJlci5wdWJsaWNSU0EgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga3VuY2lVc2VyLmt1bmNpSGlkZSA9IGRhdGFNZW1iZXIucHVibGljUlNBO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2VsdWFyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YU1lbWJlci5wcml2YXRlUlNBICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGt1bmNpVXNlci5rdW5jaVNob3cgPSBkYXRhTWVtYmVyLnByaXZhdGVSU0E7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZWx1YXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBTZXNzaW9uLnNldCgna3VuY2knLCBrdW5jaVVzZXIpO1xuICAgIH1cbn07XG5cbnNob3dEYXRhID0gZnVuY3Rpb24gKGRhdGEsIGlkKSB7XG4gICAgaWYgKGRhdGEgPT0gXCJcIikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldEt1bmNpKCk7XG4gICAgdmFyIGt1bmNpID0gU2Vzc2lvbi5nZXQoJ2t1bmNpJyk7XG4gICAgdmFyIGt1bmMgPSBuZXcgSlNFbmNyeXB0KHtkZWZhdWx0X2tleV9zaXplOiAyMDQ4fSk7XG4gICAga3VuYy5zZXRLZXkoa3VuY2kua3VuY2lTaG93KTtcbiAgICByZXR1cm4ga3VuYy5kZWNyeXB0KGRhdGEpO1xufVxuXG5oaWRlRGF0YSA9IGZ1bmN0aW9uIChkYXRhLCBpZCkge1xuICAgIGlmIChkYXRhID09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRLdW5jaSgpO1xuICAgIHZhciBrdW5jaSA9IFNlc3Npb24uZ2V0KCdrdW5jaScpO1xuICAgIHZhciBrdW5jID0gbmV3IEpTRW5jcnlwdCh7ZGVmYXVsdF9rZXlfc2l6ZTogMjA0OH0pO1xuICAgIGt1bmMuc2V0S2V5KGt1bmNpLmt1bmNpSGlkZSk7XG4gICAgcmV0dXJuIGt1bmMuZW5jcnlwdChkYXRhKTtcbn1cblxua2VsdWFyID0gZnVuY3Rpb24gKCkge1xuICAgIE1ldGVvci5jYWxsKCdyZXNldEt1bmNpJyk7XG4gICAgTWV0ZW9yLmxvZ291dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIFNlc3Npb24uc2V0KFwiaXNMb2dpblwiLCB0cnVlKTtcbiAgICAgICAgRmxhc2hNZXNzYWdlcy5zZW5kRXJyb3IoXCJZb3VyIFJTQSBLZXkgbm90IFNldCwgcGxlYXNlIGNvbnRhY3Qgc3lzdGVtcyBhZG1pbmlzdHJhdG9yICFcIik7XG4gICAgICAgIFJvdXRlci5nbyhcImhvbWVcIik7XG4gICAgfSk7XG59O1xuXG5cbmlzUm9sZUFkbWluID0gZnVuY3Rpb24gKHVzZXJJZCkge1xuICAgIGlmIChSb2xlcy51c2VySXNJblJvbGUodXNlcklkLCBbJ3Jvb3QnLCAnYWRtaW5pc3RyYXRvciddKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuXG5pc0xvY2tNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChTZXNzaW9uLmdldChcImxvY2tNZW51XCIpKSB7XG4gICAgICAgIHJldHVybiBcImNvbC1tZC05IGNvbC1tZC1vZmZzZXQtM1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImNvbC1tZC0xMiBjb2wtbWQtb2Zmc2V0LTBcIjtcbiAgICB9XG4gICAgO1xufTtcblxuIiwiLyoqXG4gKiBGbGV4dXJpbyBDcmVhdGVkIGJ5IFlOLlBhbXVuZ2thcyBKYXl1ZGEgb24gMTIvMy8xNS5cbiAqL1xuUm91dGVyLnBsdWdpbignZGF0YU5vdEZvdW5kJywge25vdEZvdW5kVGVtcGxhdGU6ICdvcmFvbm8nfSk7XG5Sb3V0ZXIuY29uZmlndXJlKHtcbiAgICBub3RGb3VuZFRlbXBsYXRlOiAnb3Jhb25vJ1xufSk7XG5cblJvdXRlci5yb3V0ZSgnLycsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlbmRlcignaG9tZScpO1xufSk7XG5cblJvdXRlci5yb3V0ZSgnL29yYW9ubycsIGZ1bmN0aW9uICgpIHtcbiAgICBTZXNzaW9uLnNldCgnc1VSTE1lbnUnLCAnb3Jhb25vJyk7XG4gICAgdGhpcy5yZW5kZXIoJ29yYW9ubycpO1xufSk7XG5cblJvdXRlci5yb3V0ZSgnL21lbnUnLCBmdW5jdGlvbiAoKSB7XG4gICAgU2Vzc2lvbi5zZXQoJ3NVUkxNZW51JywgJ21lbnVHcm91cCcpO1xuICAgIHRoaXMucmVuZGVyKCdtZW51Jyk7XG59KTtcblxuUm91dGVyLnJvdXRlKCcvbWVudUdyb3VwJywgZnVuY3Rpb24gKCkge1xuICAgIFNlc3Npb24uc2V0KCdzVVJMTWVudScsICdtZW51R3JvdXAnKTtcbiAgICB0aGlzLnJlbmRlcignbWVudUdyb3VwJyk7XG59KTtcblxuXG5Sb3V0ZXIucm91dGUoJy9tZW51QXV0aCcsIGZ1bmN0aW9uICgpIHtcbiAgICBTZXNzaW9uLnNldCgnc1VSTE1lbnUnLCAnbWVtYmVyJyk7XG4gICAgdGhpcy5yZW5kZXIoJ21lbnVBdXRoJyk7XG59KTtcblxuXG5Sb3V0ZXIucm91dGUoJy9tZW1iZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgU2Vzc2lvbi5zZXQoJ3NVUkxNZW51JywgJ21lbWJlcicpO1xuICAgIHRoaXMucmVuZGVyKCdtZW1iZXInKTtcbn0pO1xuXG5cblxuUm91dGVyLnJvdXRlKCcvbWVzc2FnZScsIGZ1bmN0aW9uICgpIHtcbiAgICBTZXNzaW9uLnNldCgnc1VSTE1lbnUnLCAnbWVzc2FnZScpO1xuICAgIHRoaXMucmVuZGVyKCdtZXNzYWdlJyk7XG59KTtcblxuUm91dGVyLnJvdXRlKCcvYWN0aXZpdHlsb2dzJywgZnVuY3Rpb24gKCkge1xuICAgIFNlc3Npb24uc2V0KCdzVVJMTWVudScsICdhY3Rpdml0eWxvZ3MnKTtcbiAgICB0aGlzLnJlbmRlcignYWN0aXZpdHlsb2dzJyk7XG59KTtcblxuXG5Sb3V0ZXIucm91dGUoJy9wcm9maWxlRGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICBTZXNzaW9uLnNldCgnc1VSTE1lbnUnLCAncHJvZmlsZURhdGEnKTtcbiAgICB0aGlzLnJlbmRlcigncHJvZmlsZURhdGEnKTtcbn0pO1xuXG5Sb3V0ZXIucm91dGUoJy9wcm9maWxlJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVuZGVyKCdwcm9maWxlJyk7XG59KTtcblxuXG5cblJvdXRlci5yb3V0ZSgnL3dvVGlwZScsIGZ1bmN0aW9uICgpIHtcbiAgICBTZXNzaW9uLnNldCgnc1VSTE1lbnUnLCAnd29UaXBlJyk7XG4gICAgdGhpcy5yZW5kZXIoJ3dvVGlwZScpO1xufSk7XG5cblxuUm91dGVyLnJvdXRlKCcvd29TdWJUaXBlJywgZnVuY3Rpb24gKCkge1xuICAgIFNlc3Npb24uc2V0KCdzVVJMTWVudScsICd3b1RpcGUnKTtcbiAgICB0aGlzLnJlbmRlcignd29TdWJUaXBlJyk7XG59KTtcblxuXG5Sb3V0ZXIucm91dGUoJy93b1N1YlRpcGVEZXRhaWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgU2Vzc2lvbi5zZXQoJ3NVUkxNZW51JywgJ3dvVGlwZScpO1xuICAgIHRoaXMucmVuZGVyKCd3b1N1YlRpcGVEZXRhaWwnKTtcbn0pO1xuXG5cblJvdXRlci5yb3V0ZSgnL3dvJywgZnVuY3Rpb24gKCkge1xuICAgIFNlc3Npb24uc2V0KCdzVVJMTWVudScsICd3bycpO1xuICAgIHRoaXMucmVuZGVyKCd3bycpO1xufSk7XG4iLCJ2YXIga29sb21TdGFuZGFyID0gWydfaWQnLCdha3RpZllOJywnY3JlYXRlQnlJRCcsJ2NyZWF0ZUJ5JywnY3JlYXRlQXQnLCd1cGRhdGVCeUlEJywndXBkYXRlQnknLCd1cGRhdGVBdCcsJ2RlbGV0ZUJ5SUQnLCdkZWxldGVCeScsJ2RlbGV0ZUF0J107XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgSmF5dWRhIG9uIDYvMS8xNy5cbiAqL1xuXG5jb3VudEJhZGdlID0gZnVuY3Rpb24gKHNSb3V0ZXIpIHtcbiAgICBpZihzUm91dGVyID09ICdtZXNzYWdlcycpIHtcbiAgICAgICAgdmFyIHF0eSA9IE1FU1NBR0VTLmZpbmQoe2FrdGlmWU46IDEsIHN0YXR1czogXCJVTlJFQURcIn0pLmZldGNoKCkubGVuZ3RoO1xuICAgICAgICByZXR1cm4gcXR5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn07IiwiaW1wb3J0IHtBY2NvdW50c30gZnJvbSBcIm1ldGVvci9hY2NvdW50cy1iYXNlXCI7XG5pbXBvcnQge1Nlc3Npb259IGZyb20gXCJtZXRlb3Ivc2Vzc2lvblwiO1xuXG5NZXRlb3IubWV0aG9kcyh7XG5cdGNyZWF0ZVVzZXJOZXc6IGZ1bmN0aW9uIChuYW1hLCBlbWFpbCwgcGFzc3dvcmQpIHtcblx0XHRpZiAoUm9sZXMudXNlcklzSW5Sb2xlKHRoaXMudXNlcklkLCBbJ3Jvb3QnLCAnYWRtaW5pc3RyYXRvcicsICdhZG1pbiddKSkge1xuXHRcdFx0aWYgKE1ldGVvci51c2Vycy5maW5kKHt1c2VybmFtZTogZW1haWx9KS5jb3VudCgpID09PSAwKSB7XG5cdFx0XHRcdEFjY291bnRzLmNyZWF0ZVVzZXIoe1xuXHRcdFx0XHRcdGVtYWlsOiBlbWFpbCxcblx0XHRcdFx0XHRwYXNzd29yZDogcGFzc3dvcmQsXG5cdFx0XHRcdFx0cHJvZmlsZToge1xuXHRcdFx0XHRcdFx0bmFtZTogbmFtYSxcblx0XHRcdFx0XHRcdGNyZWF0ZUF0OiBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRcdFx0dXBkYXRlQXQ6IG5ldyBEYXRlKCksXG5cdFx0XHRcdFx0XHR2ZXJpZmljYXRpb246IFwiMVwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGRlbGV0ZVVzZXI6IGZ1bmN0aW9uIChfaWQpIHtcblx0XHRpZiAoUm9sZXMudXNlcklzSW5Sb2xlKHRoaXMudXNlcklkLCBbJ3Jvb3QnLCAnYWRtaW5pc3RyYXRvcicsICdhZG1pbiddKSkge1xuXHRcdFx0TWV0ZW9yLnVzZXJzLnJlbW92ZShfaWQpO1xuXHRcdH1cblx0fSxcbiAgICB1cGRhdGVVc2VyRGF0YTogZnVuY3Rpb24gKF9pZCwgZW1haWxOZXcsIHBhc3N3b3JkTmV3KSB7XG4gICAgICAgIGlmIChlbWFpbE5ldyAhPT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKGFkYURBVEEoTUVNQkVSLmZpbmRPbmUoe19pZDogX2lkfSkuZW1haWxzKSkge1xuICAgICAgICAgICAgICAgIEFjY291bnRzLnJlbW92ZUVtYWlsKF9pZCwgTUVNQkVSLmZpbmRPbmUoe19pZDogX2lkfSkuZW1haWxzWzBdLmFkZHJlc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQWNjb3VudHMuYWRkRW1haWwoX2lkLCBlbWFpbE5ldyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhc3N3b3JkTmV3ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBBY2NvdW50cy5zZXRQYXNzd29yZChfaWQsIHBhc3N3b3JkTmV3KTtcbiAgICAgICAgfVxuICAgIH0sXG5cdHVwZGF0ZUZvdG9NZW1iZXI6IGZ1bmN0aW9uIChvRGF0YUZvdG8sIGlkU2VsZWN0b3IpIHtcblx0XHRpZiAoIXRoaXMudXNlcklkKSB7XG5cdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgXCJZb3UgbXVzdCBiZSBsb2dnZWQgaW5cIik7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdGlmICghL15kYXRhOmltYWdlXFwvcG5nO2Jhc2U2NCwvaS50ZXN0KG9EYXRhRm90bykpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gTUVNQkVSLnVwZGF0ZShcblx0XHRcdFx0e19pZDogaWRTZWxlY3Rvcn0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQkc2V0OiB7XG5cdFx0XHRcdFx0XHQncHJvZmlsZS5mb3RvUHJvZmlsZSc6IG9EYXRhRm90b1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IoNDAzLCBlLm1lc3NhZ2UpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHR1cGRhdGVGb3RvQmFja2dyb3VuZDogZnVuY3Rpb24gKG9EYXRhRm90bywgaWRTZWxlY3Rvcikge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gTUVNQkVSLnVwZGF0ZShcblx0XHRcdFx0e19pZDogaWRTZWxlY3Rvcn0sXG5cdFx0XHRcdHskc2V0OiB7J3Byb2ZpbGUuZm90b0JhY2tncm91bmQnOiBvRGF0YUZvdG99fVxuXHRcdFx0KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKDQwMywgZS5tZXNzYWdlKTtcblx0XHR9XG5cdH0sXG5cdGNhcmlLdW5jaTogZnVuY3Rpb24gKCkge1xuXHRcdGxldCBzVG9rZW5LZXkgPSBEQVRBVE9LRU4uZmluZE9uZSgpLnNUb2tlbktleTtcblx0XHRNRU1CRVIudXBkYXRlKFxuXHRcdFx0e19pZDp0aGlzLnVzZXJJZH0sXG5cdFx0XHR7XG5cdFx0XHRcdCRzZXQ6e1xuXHRcdFx0XHRcdFx0dG9rZW5UZW1wOnNUb2tlbktleVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblx0fSxcblx0cmVzZXRLdW5jaTogZnVuY3Rpb24gKCkge1xuXHRcdE1FTUJFUi51cGRhdGUoXG5cdFx0XHR7X2lkOnRoaXMudXNlcklkfSxcblx0XHRcdHtcblx0XHRcdFx0JHNldDp7XG5cdFx0XHRcdFx0XHR0b2tlblRlbXA6XCJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblx0fSxcblxuICAgIHVwZGF0ZVBhc3NVc2VyOiBmdW5jdGlvbiAoX2lkLCBwYXNzd29yZE5ldykge1xuICAgICAgICBpZiAocGFzc3dvcmROZXcgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIEFjY291bnRzLnNldFBhc3N3b3JkKF9pZCwgcGFzc3dvcmROZXcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBiYWRnZURhdGE6IGZ1bmN0aW9uIChzUm91dGVyKSB7XG4gICAgICAgIHZhciBxdHkgPSBjb3VudEJhZGdlKHNSb3V0ZXIpO1xuICAgICAgICBpZihwYXJzZUludChxdHkpID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuICBxdHk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gIFwiXCI7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbn0pO1xuXG5zZXRUb2tlbiA9IGZ1bmN0aW9uIChpZFVzZXIpIHtcblx0c1Rva2VuS2V5ID0gREFUQVRPS0VOLmZpbmRPbmUoKS5zVG9rZW5LZXk7XG5cdHJldHVybiBzVG9rZW5LZXk7XG59O1xuIiwiLyoqXG4qIEZsZXhydWlvIENyZWF0ZWQgYnkgWU4uIFBhbXVuZ2thcyBKYXl1ZGEuXG4qL1xuXG5NZXRlb3IucHVibGlzaCgnbWVtYmVyJywgZnVuY3Rpb24gKGlMaW1pdCwgb0ZpbHRlciwgb09wdGlvbnMpIHtcbiAgICBpZiAodGhpcy51c2VySWQpIHtcbiAgICAgICAgdmFyIG9PUFRJT05TID0gT2JqZWN0LmFzc2lnbih7fSwge2ZpZWxkczoge3Byb2ZpbGU6IDEsIHVzZXJuYW1lOjF9fSwgb09wdGlvbnMpO1xuICAgICAgICBvT1BUSU9OUy5saW1pdCA9IGlMaW1pdCAqIDI7XG4gICAgICAgIGlmIChpTGltaXQgPT0gMCkge1xuICAgICAgICAgICAgZGVsZXRlIG9PUFRJT05TLmxpbWl0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChSb2xlcy51c2VySXNJblJvbGUodGhpcy51c2VySWQsIFsncm9vdCcsICdhZG1pbmlzdHJhdG9yJ10pKSB7XG4gICAgICAgICAgICByZXR1cm4gTWV0ZW9yLnVzZXJzLmZpbmQoe2FrdGlmWU46IDF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNZXRlb3IudXNlcnMuZmluZChvRmlsdGVyLCBvT1BUSU9OUyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlYWR5KCk7XG4gICAgfVxufSk7XG5cblxuTWV0ZW9yLnB1Ymxpc2goJ21lbnVHcm91cCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy51c2VySWQpIHtcbiAgICAgICAgdmFyIG1lbnVBdXRoID0gTUVOVUFVVEguZmluZCh7dXNlcklkOiB0aGlzLnVzZXJJZH0pO1xuICAgICAgICB2YXIgZ3JvdXBNRU5VID0gbWVudUF1dGgubWFwKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICByZXR1cm4gcC5ncm91cE1FTlVcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBvRklMVEVSUyA9IHtha3RpZllOOiAxLCBuYW1hTUVOVUdST1VQOiB7JGluOiBncm91cE1FTlV9fTtcblxuICAgICAgICBpZiAoUm9sZXMudXNlcklzSW5Sb2xlKHRoaXMudXNlcklkLCBbJ3Jvb3QnLCAnYWRtaW5pc3RyYXRvciddKSkge1xuICAgICAgICAgICAgcmV0dXJuICBNRU5VR1JPVVAuZmluZCh7YWt0aWZZTjogMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1FTlVHUk9VUC5maW5kKG9GSUxURVJTKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVhZHkoKTtcbiAgICB9XG59KTtcblxuXG5cbk1ldGVvci5wdWJsaXNoKCdtZXNzYWdlTWVtYmVyJywgZnVuY3Rpb24gKGlMaW1pdCkge1xuICAgIGlmICh0aGlzLnVzZXJJZCkge1xuICAgICAgICB2YXIgdGhpc3VzZXJuYW1lID0gTUVNQkVSLmZpbmRPbmUoe19pZDp0aGlzLnVzZXJJZH0pLnVzZXJuYW1lO1xuICAgICAgICB2YXIgZGF0YU1FU1NBR0UgPSBNRVNTQUdFTUVNQkVSLmZpbmQoe3VzZXJuYW1lOnRoaXN1c2VybmFtZSwgYWt0aWZZTjoxfSk7XG4gICAgICAgIHZhciBpZE1lc3NhZ2UgPSBkYXRhTUVTU0FHRS5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgIHJldHVybiBwLmlkTWVzc2FnZVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG9PUFRJT05TID0ge1xuICAgICAgICAgICAgc29ydDoge2NyZWF0ZUF0OiAtMX0sXG4gICAgICAgICAgICBsaW1pdDogaUxpbWl0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKFJvbGVzLnVzZXJJc0luUm9sZSh0aGlzLnVzZXJJZCwgWydyb290JywgJ2FkbWluaXN0cmF0b3InXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBNRVNTQUdFTUVNQkVSLmZpbmQoe2FrdGlmWU46IDF9LCBvT1BUSU9OUyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTUVTU0FHRU1FTUJFUi5maW5kKHtpZE1lc3NhZ2U6IHskaW46IGlkTWVzc2FnZX0sIGFrdGlmWU46IDF9LCBvT1BUSU9OUyk7XG4gICAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVhZHkoKTtcbiAgICB9XG59KTtcblxuXG5NZXRlb3IucHVibGlzaCgnbWVzc2FnZScsIGZ1bmN0aW9uIChpTGltaXQpIHtcbiAgICBpZiAodGhpcy51c2VySWQpIHtcbiAgICAgICAgdmFyIHRoaXN1c2VybmFtZSA9IE1FTUJFUi5maW5kT25lKHtfaWQ6dGhpcy51c2VySWR9KS51c2VybmFtZTtcblxuICAgICAgICB2YXIgZGF0YU1FU1NBR0UgPSBNRVNTQUdFTUVNQkVSLmZpbmQoe3VzZXJuYW1lOnRoaXN1c2VybmFtZSwgYWt0aWZZTjogMX0pO1xuICAgICAgICB2YXIgaWRNZXNzYWdlID0gZGF0YU1FU1NBR0UubWFwKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICByZXR1cm4gcC5pZE1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBvT1BUSU9OUyA9IHtcbiAgICAgICAgICAgIHNvcnQ6IHtjcmVhdGVBdDogLTF9LFxuICAgICAgICAgICAgbGltaXQ6IGlMaW1pdFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChSb2xlcy51c2VySXNJblJvbGUodGhpcy51c2VySWQsIFsncm9vdCcsICdhZG1pbmlzdHJhdG9yJ10pKSB7XG4gICAgICAgICAgICByZXR1cm4gTUVTU0FHRS5maW5kKHtha3RpZllOOiAxfSwgb09QVElPTlMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1FU1NBR0UuZmluZCh7X2lkOiB7JGluOiBpZE1lc3NhZ2V9LCBha3RpZllOOiAxfSwgb09QVElPTlMpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWFkeSgpO1xuICAgIH1cbn0pO1xuXG5cbk1ldGVvci5wdWJsaXNoKCdtZW51JywgZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnVzZXJJZCkge1xuICAgICAgICB2YXIgbWVudUF1dGggPSBNRU5VQVVUSC5maW5kKHt1c2VySWQ6IHRoaXMudXNlcklkfSk7XG4gICAgICAgIHZhciBpZE1lbnUgPSBtZW51QXV0aC5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgIHJldHVybiBwLmlkTUVOVVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKFJvbGVzLnVzZXJJc0luUm9sZSh0aGlzLnVzZXJJZCwgWydyb290JywgJ2FkbWluaXN0cmF0b3InXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBNRU5VLmZpbmQoe2FrdGlmWU46IDF9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNRU5VLmZpbmQoe19pZDogeyRpbjogaWRNZW51fSwgYWt0aWZZTjogMX0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWFkeSgpO1xuICAgIH1cbn0pO1xuXG5wdWJsaXNoRGF0YSA9IGZ1bmN0aW9uIChzTmFtYSwgc09iamVjdCwgb1doZXJlLCBvQ29uZGl0aW9ucykge1xuICAgIE1ldGVvci5wdWJsaXNoKHNOYW1hLCBmdW5jdGlvbiAoaUxpbWl0LCBvRmlsdGVyLCBvT3B0aW9ucykge1xuICAgICAgICAvLyBnYWJ1bmdrYW4gT1JcbiAgICAgICAgdmFyIGF0YXVBTEwgPSBbe2FrdGlmWU46IDF9LCB7YWt0aWZZTjogXCIxXCJ9LCB7YWt0aWZZTjogMX1dO1xuICAgICAgICBpZiAoYWRhREFUQShvV2hlcmVbXCIkb3JcIl0pKSB7XG4gICAgICAgICAgICBhdGF1QUxMID0gYXRhdUFMTC5jb25jYXQob1doZXJlW1wiJG9yXCJdKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb0ZJTFRFUl9PUiA9IG9GaWx0ZXJbXCIkb3JcIl07XG4gICAgICAgIGlmIChhZGFEQVRBKG9GSUxURVJfT1IpKSB7XG4gICAgICAgICAgICBhdGF1QUxMID0gYXRhdUFMTC5jb25jYXQob0ZpbHRlcltcIiRvclwiXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnYWJ1bmdrYW4gQU5EXG4gICAgICAgIHZhciBhbmRBTEwgPSBbXTtcbiAgICAgICAgaWYgKGFkYURBVEEob1doZXJlW1wiJGFuZFwiXSkpIHtcbiAgICAgICAgICAgIGFuZEFMTCA9IGFuZEFMTC5jb25jYXQob1doZXJlW1wiJGFuZFwiXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkYURBVEEob0ZpbHRlcltcIiRhbmRcIl0pKSB7XG4gICAgICAgICAgICBhbmRBTEwgPSBhbmRBTEwuY29uY2F0KG9GaWx0ZXJbXCIkYW5kXCJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdhYnVuZ2thbiBvV2hlcmUgZGFuIG9GaWx0ZXJcbiAgICAgICAgb1doZXJlID0gT2JqZWN0LmFzc2lnbih7fSwgb1doZXJlLCBvRmlsdGVyKTtcbiAgICAgICAgb1doZXJlW1wiJG9yXCJdID0gYXRhdUFMTDtcbiAgICAgICAgb1doZXJlW1wiJGFuZFwiXSA9IGFuZEFMTDtcblxuICAgICAgICAvLyBnYWJ1bmdrYW4gb0NvbmRpdGlvbnNcbiAgICAgICAgb0NvbmRpdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvQ29uZGl0aW9ucywgb09wdGlvbnMpO1xuXG4gICAgICAgIGlmICghYWRhREFUQShvQ29uZGl0aW9ucykpIHtcbiAgICAgICAgICAgIG9Db25kaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIHNvcnQ6IHtjcmVhdGVBdDogLTF9LFxuICAgICAgICAgICAgICAgIGxpbWl0OiBpTGltaXRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgb0NvbmRpdGlvbnMubGltaXQgPSBpTGltaXQgKiAyO1xuXG4gICAgICAgIGlmKGlMaW1pdCA9PSAwKSB7XG4gICAgICAgIFx0ZGVsZXRlIG9Db25kaXRpb25zLmxpbWl0O1xuXHRcdH1cblxuICAgICAgICBpZiAodGhpcy51c2VySWQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gc09iamVjdC5maW5kKG9GaWx0ZXIsIG9Db25kaXRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5cbi8qKiAgICBwdWJsaXNoRGF0YShOQU1FX1B1YmxpY2F0aW9ucywgT0JKRUNUX0NvbGxlY3Rpb25zLCBPQkpFQ1RfT0ZpbHRlciwgT0JKRUNUX29PUFRJT05TKSAgICAgICoqL1xucHVibGlzaERhdGEoXCJtZW51QXV0aGt1XCIsIE1FTlVBVVRILCB7fSwge30pO1xucHVibGlzaERhdGEoJ21lbnVBdXRoJywgTUVOVUFVVEgsIHt9LCB7fSk7XG5wdWJsaXNoRGF0YSgnYWN0aXZpdHlsb2dzJywgQUNUSVZJVFlMT0dTLCB7fSwge30pO1xucHVibGlzaERhdGEoJ3Byb2ZpbGVEYXRhJywgUFJPRklMRURBVEEsIHt9LCB7fSk7XG5wdWJsaXNoRGF0YSgnd29UaXBlJywgV09USVBFLCB7fSwge30pO1xucHVibGlzaERhdGEoJ3dvU3ViVGlwZScsIFdPU1VCVElQRSwge30sIHt9KTtcbnB1Ymxpc2hEYXRhKCd3b1N1YlRpcGVEZXRhaWwnLCBXT1NVQlRJUEVERVRBSUwsIHt9LCB7fSk7XG5wdWJsaXNoRGF0YSgnd28nLCBXTywge30sIHt9KTtcbnB1Ymxpc2hEYXRhKCdhcGltYW5hZ2VyJywgQVBJTUFOQUdFUiwge30sIHt9KTtcbiIsIk1FTUJFUi5hbGxvdyh7XG4gICAgJ2luc2VydCc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgICdyZW1vdmUnOiBmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbiAgICAgICAgaWYgKFJvbGVzLnVzZXJJc0luUm9sZSh1c2VySWQsIFsncm9vdCcsICdhZG1pbmlzdHJhdG9yJ10pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgJ3VwZGF0ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYywgZmllbGROYW1lcywgbW9kaWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSk7XG5cbkFQSU1BTkFHRVIuYWxsb3coe1xuICAgICdpbnNlcnQnOiBmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbiAgICAgICAgLy8gZG8gc29tZXRoaW5ncyBoZXJlXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgJ3JlbW92ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYykge1xuICAgICAgICBpZiAoUm9sZXMudXNlcklzSW5Sb2xlKHVzZXJJZCwgWydyb290JywgJ2FkbWluaXN0cmF0b3InXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAndXBkYXRlJzogZnVuY3Rpb24gKHVzZXJJZCwgZG9jLCBmaWVsZE5hbWVzLCBtb2RpZmllcikge1xuICAgICAgICAvLyBkbyBzb21ldGhpbmdzIGhlcmVcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSk7XG5cbldPLmFsbG93KHtcbiAgICAnaW5zZXJ0JzogZnVuY3Rpb24gKHVzZXJJZCwgZG9jKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgJ3JlbW92ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYykge1xuICAgICAgICBpZiAoUm9sZXMudXNlcklzSW5Sb2xlKHVzZXJJZCwgWydyb290JywgJ2FkbWluaXN0cmF0b3InXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAndXBkYXRlJzogZnVuY3Rpb24gKHVzZXJJZCwgZG9jLCBmaWVsZE5hbWVzLCBtb2RpZmllcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59KTtcblxuV09USVBFLmFsbG93KHtcbiAgICAnaW5zZXJ0JzogZnVuY3Rpb24gKHVzZXJJZCwgZG9jKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgJ3JlbW92ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYykge1xuICAgICAgICBpZiAoUm9sZXMudXNlcklzSW5Sb2xlKHVzZXJJZCwgWydyb290JywgJ2FkbWluaXN0cmF0b3InXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAndXBkYXRlJzogZnVuY3Rpb24gKHVzZXJJZCwgZG9jLCBmaWVsZE5hbWVzLCBtb2RpZmllcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59KTtcbldPU1VCVElQRS5hbGxvdyh7XG4gICAgJ2luc2VydCc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgICdyZW1vdmUnOiBmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbiAgICAgICAgaWYgKFJvbGVzLnVzZXJJc0luUm9sZSh1c2VySWQsIFsncm9vdCcsICdhZG1pbmlzdHJhdG9yJ10pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgJ3VwZGF0ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYywgZmllbGROYW1lcywgbW9kaWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSk7XG5cbldPU1VCVElQRURFVEFJTC5hbGxvdyh7XG4gICAgJ2luc2VydCc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgICdyZW1vdmUnOiBmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbiAgICAgICAgaWYgKFJvbGVzLnVzZXJJc0luUm9sZSh1c2VySWQsIFsncm9vdCcsICdhZG1pbmlzdHJhdG9yJ10pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgJ3VwZGF0ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYywgZmllbGROYW1lcywgbW9kaWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSk7XG5cblxuXG5NRU5VQVVUSC5hbGxvdyh7XG4gICAgJ2luc2VydCc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgICdyZW1vdmUnOiBmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbiAgICAgICAgaWYgKFJvbGVzLnVzZXJJc0luUm9sZSh1c2VySWQsIFsncm9vdCcsICdhZG1pbmlzdHJhdG9yJ10pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgJ3VwZGF0ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYywgZmllbGROYW1lcywgbW9kaWZpZXIpIHtcbiAgICAgICAgLy8gZG8gc29tZXRoaW5ncyBoZXJlXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuXG5NRU5VLmFsbG93KHtcbiAgICAnaW5zZXJ0JzogZnVuY3Rpb24gKHVzZXJJZCwgZG9jKSB7XG4gICAgICAgIC8vIGRvIHNvbWV0aGluZ3MgaGVyZVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgICdyZW1vdmUnOiBmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbiAgICAgICAgaWYgKFJvbGVzLnVzZXJJc0luUm9sZSh1c2VySWQsIFsncm9vdCcsICdhZG1pbmlzdHJhdG9yJ10pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgJ3VwZGF0ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYywgZmllbGROYW1lcywgbW9kaWZpZXIpIHtcbiAgICAgICAgLy8gZG8gc29tZXRoaW5ncyBoZXJlXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuXG5NRU5VR1JPVVAuYWxsb3coe1xuICAgICdpbnNlcnQnOiBmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbiAgICAgICAgLy8gZG8gc29tZXRoaW5ncyBoZXJlXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgJ3JlbW92ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYykge1xuICAgICAgICBpZiAoUm9sZXMudXNlcklzSW5Sb2xlKHVzZXJJZCwgWydyb290JywgJ2FkbWluaXN0cmF0b3InXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAndXBkYXRlJzogZnVuY3Rpb24gKHVzZXJJZCwgZG9jLCBmaWVsZE5hbWVzLCBtb2RpZmllcikge1xuICAgICAgICAvLyBkbyBzb21ldGhpbmdzIGhlcmVcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSk7XG5NRVNTQUdFLmFsbG93KHtcbiAgICAnaW5zZXJ0JzogZnVuY3Rpb24gKHVzZXJJZCwgZG9jKSB7XG4gICAgICAgIC8vIGRvIHNvbWV0aGluZ3MgaGVyZVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgICdyZW1vdmUnOiBmdW5jdGlvbiAodXNlcklkLCBkb2MpIHtcbiAgICAgICAgaWYgKFJvbGVzLnVzZXJJc0luUm9sZSh1c2VySWQsIFsncm9vdCcsICdhZG1pbmlzdHJhdG9yJ10pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgJ3VwZGF0ZSc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYywgZmllbGROYW1lcywgbW9kaWZpZXIpIHtcbiAgICAgICAgLy8gZG8gc29tZXRoaW5ncyBoZXJlXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuTUVTU0FHRU1FTUJFUi5hbGxvdyh7XG4gICAgJ2luc2VydCc6IGZ1bmN0aW9uICh1c2VySWQsIGRvYykge1xuICAgICAgICAvLyBkbyBzb21ldGhpbmdzIGhlcmVcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICAncmVtb3ZlJzogZnVuY3Rpb24gKHVzZXJJZCwgZG9jKSB7XG4gICAgICAgIGlmIChSb2xlcy51c2VySXNJblJvbGUodXNlcklkLCBbJ3Jvb3QnLCAnYWRtaW5pc3RyYXRvciddKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuICAgICd1cGRhdGUnOiBmdW5jdGlvbiAodXNlcklkLCBkb2MsIGZpZWxkTmFtZXMsIG1vZGlmaWVyKSB7XG4gICAgICAgIC8vIGRvIHNvbWV0aGluZ3MgaGVyZVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBKYXl1ZGEgb24gNy8yOC8xNy5cbiAqL1xuXG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuLypcblxudmFyIHJlZGlzID0gcmVxdWlyZShcInJlZGlzXCIpO1xudmFyIGNsaWVudFJlZGlzID0gcmVkaXMuY3JlYXRlQ2xpZW50KHJlZGlzU0VSVkVSKTtcbmNsaWVudFJlZGlzLnNldFN5bmMgPSBNZXRlb3Iud3JhcEFzeW5jKGNsaWVudFJlZGlzLnNldCk7XG5jbGllbnRSZWRpcy5nZXRTeW5jID0gTWV0ZW9yLndyYXBBc3luYyhjbGllbnRSZWRpcy5nZXQpO1xuXG5cbk1ldGVvci5tZXRob2RzKHtcbiAgICBzZXRSZWRpczogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gY2xpZW50UmVkaXMuc2V0U3luYyhrZXksIHZhbHVlKTtcbiAgICB9LFxuICAgIGdldFJlZGlzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIGNsaWVudFJlZGlzLmdldFN5bmMoa2V5KTtcbiAgICB9LFxufSk7XG5cbiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IFRoaW5rTWFjIG9uIDgvMTEvMTYuXG4gKi9cbk1ldGVvci5zdGFydHVwKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgQXBpID0gbmV3IFJlc3RpdnVzKHtcbiAgICAgICAgdXNlRGVmYXVsdEF1dGg6IHRydWUsXG4gICAgICAgIHByZXR0eUpzb246IHRydWUsXG4gICAgICAgIGFwaVBhdGg6XCJmbHhBUElcIlxuICAgIH0pO1xuXG4gICAgQXBpLmFkZENvbGxlY3Rpb24oV08sIHtcbiAgICAgICAgcm91dGVPcHRpb25zOiB7XG4gICAgICAgICAgICBhdXRoUmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZW5kcG9pbnRzOiB7XG4gICAgICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgICAgICBhdXRoUmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3N0OiB7XG4gICAgICAgICAgICAgICAgYXV0aFJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHV0OiB7XG4gICAgICAgICAgICAgICAgYXV0aFJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJvbGVSZXF1aXJlZDogJ2FkbWluJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbGV0ZToge1xuICAgICAgICAgICAgICAgIGF1dGhSZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICByb2xlUmVxdWlyZWQ6ICdhZG1pbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gTWFwcyB0bzogL2FwaS9hcnRpY2xlcy86aWRcbiAgICBBcGkuYWRkUm91dGUoJy93by86aWQnLCB7YXV0aFJlcXVpcmVkOiB0cnVlfSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEFwaS51c2Vycyk7XG4gICAgICAgICAgICByZXR1cm4gV08uZmluZE9uZSh0aGlzLnVybFBhcmFtcy5pZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5cbi8vY3VybCBodHRwOi8vbG9jYWxob3N0OjMwMDAvZmx4QVBJL2xvZ2luLyAtZCBcInVzZXJuYW1lPWFkbWluQGZsZXh1cmlvLmNvbSZwYXNzd29yZD1mbHguaW5kb1wiXG4vL2N1cmwgLUggXCJ4LWF1dGgtdG9rZW46IFpRRnY5NDQ5VkxJRjVJOEJQYzB2MmtxZzRkSzFLb3VOTlFYSWE5ZXU2TXlcIiAtSCBcIngtdXNlci1pZDogNEJ4Z0pBUlhFZXZBYnVpcnJcIiBodHRwOi8vbG9jYWxob3N0OjMwMDAvZmx4L3dvL1xuIiwiREFUQVRPS0VOID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2RhdGFUb2tlbicpO1xuTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwiRmxleHVyaW8gLSBzdGFydCBvbiBzZXJ2ZXIgLiAuIC4gXCIpO1xuXG4gICAgaWYgKE1FTlUuZmluZCgpLmNvdW50KCkgPT09IDApIHtcbiAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiX2lkXCI6IFwiWWpjTWtwUXQ4TnhGOXBkZFljRVwiLFxuICAgICAgICAgICAgICAgIFwibmFtYU1FTlVcIjogXCJEYXNoYm9hcmRcIixcbiAgICAgICAgICAgICAgICBcInJvdXRlck1FTlVcIjogXCIvXCIsXG4gICAgICAgICAgICAgICAgXCJncm91cE1FTlVcIjogXCJIT01FXCIsXG4gICAgICAgICAgICAgICAgXCJpY29uTUVOVVwiOiBcImdseXBoaWNvbiBnbHlwaGljb24tdGgtbGFyZ2VcIixcbiAgICAgICAgICAgICAgICBcImFrdGlmWU5cIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBcIllqY01rcFF0OE54RjlwWWNFXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1hTUVOVVwiOiBcIk1lc3NhZ2VzXCIsXG4gICAgICAgICAgICAgICAgXCJyb3V0ZXJNRU5VXCI6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgIFwiZ3JvdXBNRU5VXCI6IFwiSE9NRVwiLFxuICAgICAgICAgICAgICAgIFwiaWNvbk1FTlVcIjogXCJnbHlwaGljb24gZ2x5cGhpY29uLWVudmVsb3BlXCIsXG4gICAgICAgICAgICAgICAgXCJha3RpZllOXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1hTUVOVVwiOiBcIk1lbnVcIixcbiAgICAgICAgICAgICAgICBcInJvdXRlck1FTlVcIjogXCJtZW51R3JvdXBcIixcbiAgICAgICAgICAgICAgICBcImdyb3VwTUVOVVwiOiBcIlNFVFRJTkdTXCIsXG4gICAgICAgICAgICAgICAgXCJpY29uTUVOVVwiOiBcImdseXBoaWNvbiBnbHlwaGljb24tdGgtbGlzdFwiLFxuICAgICAgICAgICAgICAgIGFrdGlmWU4gOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtYU1FTlVcIjogXCJNZW1iZXJzXCIsXG4gICAgICAgICAgICAgICAgXCJyb3V0ZXJNRU5VXCI6IFwibWVtYmVyXCIsXG4gICAgICAgICAgICAgICAgXCJncm91cE1FTlVcIjogXCJTRVRUSU5HU1wiLFxuICAgICAgICAgICAgICAgIFwiaWNvbk1FTlVcIjogXCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZXJcIixcbiAgICAgICAgICAgICAgICBha3RpZllOIDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBcImthUWRIaUhtYmJKa3JXNzQ5XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1hTUVOVVwiOiBcIlRpcGUgV09cIixcbiAgICAgICAgICAgICAgICBcInJvdXRlck1FTlVcIjogXCJ3b1RpcGVcIixcbiAgICAgICAgICAgICAgICBcImdyb3VwTUVOVVwiOiBcIldPUksgT1JERVJcIixcbiAgICAgICAgICAgICAgICBcImljb25NRU5VXCI6IFwiZ2x5cGhpY29uIGdseXBoaWNvbi1saXN0XCIsXG4gICAgICAgICAgICAgICAgYWt0aWZZTiA6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJfaWRcIjogXCJrYVFkSGlIbWJiSmtyZFc3NDlcIixcbiAgICAgICAgICAgICAgICBcIm5hbWFNRU5VXCI6IFwiV09cIixcbiAgICAgICAgICAgICAgICBcInJvdXRlck1FTlVcIjogXCJ3b1wiLFxuICAgICAgICAgICAgICAgIFwiZ3JvdXBNRU5VXCI6IFwiV09SSyBPUkRFUlwiLFxuICAgICAgICAgICAgICAgIFwiaWNvbk1FTlVcIjogXCJnbHlwaGljb24gZ2x5cGhpY29uLWxpc3RcIixcbiAgICAgICAgICAgICAgICBha3RpZllOIDogMVxuICAgICAgICAgICAgfVxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKGRhdGFNZW51KSB7XG4gICAgICAgICAgICBNRU5VLmluc2VydChkYXRhTWVudSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChNRU5VR1JPVVAuZmluZCgpLmNvdW50KCkgPT09IDApIHtcbiAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiX2lkXCI6IFwiRDh6RUV6SnhyWmk4WUZuaGpcIixcbiAgICAgICAgICAgICAgICBcIm5hbWFNRU5VR1JPVVBcIjogXCJIT01FXCIsXG4gICAgICAgICAgICAgICAgXCJpY29uTUVOVUdST1VQXCI6IFwiZ2x5cGhpY29uIGdseXBoaWNvbi1ob21lXCIsXG4gICAgICAgICAgICAgICAgXCJsb2NhdGlvbnNNRU5VR1JPVVBcIjogXCIxLiBUb3AgTG9jYXRpb25zXCIsXG4gICAgICAgICAgICAgICAgXCJha3RpZllOXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1hTUVOVUdST1VQXCI6IFwiU0VUVElOR1NcIixcbiAgICAgICAgICAgICAgICBcImljb25NRU5VR1JPVVBcIjogXCJnbHlwaGljb24gZ2x5cGhpY29uLXdyZW5jaFwiLFxuICAgICAgICAgICAgICAgIFwibG9jYXRpb25zTUVOVUdST1VQXCI6IFwiMi4gTWlkZGxlIExvY2F0aW9uc1wiLFxuICAgICAgICAgICAgICAgIGFrdGlmWU4gOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtYU1FTlVHUk9VUFwiOiBcIldPUksgT1JERVJcIixcbiAgICAgICAgICAgICAgICBcImljb25NRU5VR1JPVVBcIjogXCJnbHlwaGljb24gZ2x5cGhpY29uLWJsYWNrYm9hcmRcIixcbiAgICAgICAgICAgICAgICBcImxvY2F0aW9uc01FTlVHUk9VUFwiOiBcIjIuIE1pZGRsZSBMb2NhdGlvbnNcIixcbiAgICAgICAgICAgICAgICBha3RpZllOIDogMVxuICAgICAgICAgICAgfVxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKGRhdGFNZW51R3JvdXApIHtcbiAgICAgICAgICAgIE1FTlVHUk9VUC5pbnNlcnQoZGF0YU1lbnVHcm91cCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChNRU1CRVIuZmluZCgpLmNvdW50KCkgPT09IDApIHtcbiAgICAgICAgdmFyIHNlZWRVc2VySWQgPSBBY2NvdW50cy5jcmVhdGVVc2VyKHtcbiAgICAgICAgICAgIHBhc3N3b3JkOiBcImZseC5pbmRvXCIsXG4gICAgICAgICAgICBlbWFpbDogJ2FkbWluQGZsZXh1cmlvLmNvbScsXG4gICAgICAgICAgICB1c2VybmFtZTogJ2FkbWluQGZsZXh1cmlvLmNvbScsXG4gICAgICAgICAgICBwcm9maWxlOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2FkbWluaXN0cmF0b3InXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChEQVRBVE9LRU4uZmluZCgpLmNvdW50KCkgPT09IDApIHtcbiAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwic1Rva2VuS2V5XCI6IFwiUVdqbmswMzRLI0pTTkQyMzlOU0QwJjk5bW5fYktKb3J0NzhzODZmZzBzZDc2NWZ3amg0a25zZComamtuZXJrd2pmMzI4XCIsXG4gICAgICAgICAgICAgICAgXCJha3RpZllOXCI6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhVG9rZW4pIHtcbiAgICAgICAgICAgIERBVEFUT0tFTi5pbnNlcnQoZGF0YVRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGlkQWRtaW4gPSBNRU1CRVIuZmluZE9uZSh7J2VtYWlscy5hZGRyZXNzJzogJ2FkbWluQGZsZXh1cmlvLmNvbSd9KS5faWQ7XG4gICAgUm9sZXMuYWRkVXNlcnNUb1JvbGVzKGlkQWRtaW4sIFsncm9vdCcsICdhZG1pbmlzdHJhdG9yJ10sIFJvbGVzLkdMT0JBTF9HUk9VUCk7XG5cbiAgICBSb2xlcy5nZXRVc2Vyc0luUm9sZShbJ3Jvb3QnLCAnYWRtaW5pc3RyYXRvciddKS5tYXAoZnVuY3Rpb24gKHVzZXIsIGluZGV4LCBvcmlnaW5hbEN1cnNvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZsZXh1cmlvIC0gQ2hlY2sgQXV0aCBBZG1pbiAuIC4gLiBcIik7XG5cbiAgICAgICAgTUVOVUFVVEguZmluZCh7dXNlcklkOiB1c2VyLl9pZH0pLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgTUVOVUFVVEgucmVtb3ZlKHtfaWQ6IG9iai5faWR9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIE1FTlUuZmluZCh7YWt0aWZZTjogMX0pLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgTUVOVUFVVEguaW5zZXJ0KFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgaWRNRU5VOiBvYmouX2lkLFxuICAgICAgICAgICAgICAgICAgICBuYW1hTUVOVTogb2JqLm5hbWFNRU5VLFxuICAgICAgICAgICAgICAgICAgICBncm91cE1FTlU6IG9iai5ncm91cE1FTlUsXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlck1FTlU6IG9iai5yb3V0ZXJNRU5VLFxuICAgICAgICAgICAgICAgICAgICBhdXRoVGlwZTogXCJBRERcIixcbiAgICAgICAgICAgICAgICAgICAgYWt0aWZZTiA6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBNRU5VQVVUSC5pbnNlcnQoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgICAgICBpZE1FTlU6IG9iai5faWQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWFNRU5VOiBvYmoubmFtYU1FTlUsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwTUVOVTogb2JqLmdyb3VwTUVOVSxcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyTUVOVTogb2JqLnJvdXRlck1FTlUsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhUaXBlOiBcIkVESVRcIixcbiAgICAgICAgICAgICAgICAgICAgYWt0aWZZTiA6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBNRU5VQVVUSC5pbnNlcnQoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgICAgICBpZE1FTlU6IG9iai5faWQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWFNRU5VOiBvYmoubmFtYU1FTlUsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwTUVOVTogb2JqLmdyb3VwTUVOVSxcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyTUVOVTogb2JqLnJvdXRlck1FTlUsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhUaXBlOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgICAgICAgICBha3RpZllOIDogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIE1FTlVBVVRILmluc2VydChcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgICAgIGlkTUVOVTogb2JqLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtYU1FTlU6IG9iai5uYW1hTUVOVSxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBNRU5VOiBvYmouZ3JvdXBNRU5VLFxuICAgICAgICAgICAgICAgICAgICByb3V0ZXJNRU5VOiBvYmoucm91dGVyTUVOVSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aFRpcGU6IFwiQ09ORklSTVwiLFxuICAgICAgICAgICAgICAgICAgICBha3RpZllOIDogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIE1FTlVBVVRILmluc2VydChcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlci5faWQsXG4gICAgICAgICAgICAgICAgICAgIGlkTUVOVTogb2JqLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtYU1FTlU6IG9iai5uYW1hTUVOVSxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBNRU5VOiBvYmouZ3JvdXBNRU5VLFxuICAgICAgICAgICAgICAgICAgICByb3V0ZXJNRU5VOiBvYmoucm91dGVyTUVOVSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aFRpcGU6IFwiUFJJTlRcIixcbiAgICAgICAgICAgICAgICAgICAgYWt0aWZZTiA6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBNRU5VQVVUSC5pbnNlcnQoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXIuX2lkLFxuICAgICAgICAgICAgICAgICAgICBpZE1FTlU6IG9iai5faWQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWFNRU5VOiBvYmoubmFtYU1FTlUsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwTUVOVTogb2JqLmdyb3VwTUVOVSxcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyTUVOVTogb2JqLnJvdXRlck1FTlUsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhUaXBlOiBcIkRPV05MT0FEXCIsXG4gICAgICAgICAgICAgICAgICAgIGFrdGlmWU4gOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuXG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcblxuTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuXHRBY2NvdW50cy5sb2dpblNlcnZpY2VDb25maWd1cmF0aW9uLnJlbW92ZSh7XG5cdFx0c2VydmljZTogXCJnb29nbGVcIlxuXHR9KTtcblx0QWNjb3VudHMubG9naW5TZXJ2aWNlQ29uZmlndXJhdGlvbi5pbnNlcnQoe1xuXHRcdHNlcnZpY2U6IFwiZ29vZ2xlXCIsXG5cdFx0Y2xpZW50SWQ6IGdvb2dsZS5jbGllbnRJZCxcblx0XHRzZWNyZXQ6IGdvb2dsZS5jbGllbnRTZWNyZXRcblx0fSk7XG5cblx0U2VydmljZUNvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbnMucmVtb3ZlKHtcblx0XHRzZXJ2aWNlOiAnZmFjZWJvb2snXG5cdH0pO1xuXHRTZXJ2aWNlQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucy5pbnNlcnQoe1xuXHRcdHNlcnZpY2U6ICdmYWNlYm9vaycsXG5cdFx0YXBwSWQ6IGZhY2Vib29rLmFwcElkLFxuXHRcdHNlY3JldDogZmFjZWJvb2suc2VjcmV0XG5cdH0pO1xuXG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBUaGlua01hYyBvbiAxMC8xMy8xNS5cbiAqL1xuXG5FbmNyeXBDb25maWcgPSB7XG4gICAgZW5mb3JjZUVtYWlsVmVyaWZpY2F0aW9uOiBmYWxzZVxufTtcblxuLy8gR0VORVJBTCBDT05GSUdcbnNBUFBOYW1lID0gXCJGbGV4dXJpb1wiO1xuYXBpUGF0aCA9ICdmbGV4dXJpb0FQSSc7XG5cbi8vIEtFWSBPQVVUSFxuZ29vZ2xlID0ge1xuICAgIGNsaWVudElkOiBcIjc5MjU2Njk3MDY2Mi03N2wxc2U4c3V1c2s4OWI0bWY4aWFkcDczMGFscTJqby5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiLFxuICAgIGNsaWVudFNlY3JldDogXCJwclNNdzczd0gzMHFCekxjY2hFY0Q4X0lcIlxufTtcbmZhY2Vib29rID0ge1xuICAgIGFwcElkOiBcIjc5MjU2Njk3MDY2Mi03N2wxc2U4c3V1c2s4OWI0bWY4aWFkcDczMGFscTJqby5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiLFxuICAgIHNlY3JldDogXCJwclNNdzczd0gzMHFCekxjY2hFY0Q4X0lcIlxufTtcblxuXG4vLyBSRURJU1xucmVkaXNTRVJWRVIgPSB7XG4gICAgaG9zdDogXCJZT1VSUkVESVNTRVJWRVJcIixcbiAgICBwb3J0OiBcIllPVVJSRURJU1BPUlRcIlxufVxuXG5cbi8vIFRIRU1FIENPTE9SXG5zSGVhZGVyQmFja2dyb3VuZCA9IFwiIzBFNDg3QVwiO1xuc0hlYWRlckJhY2tncm91bmRTZWNvbmRhcnkgPSBcIiMwRTVBQTRcIjtcbnNQcm9maWxlQmFja2dyb3VuZCA9IFwiIzBDMzM1MVwiO1xuc0dlbmVyYWxGb250QmFja2dyb3VuZCA9IFwid2hpdGVcIjtcbnNHZW5lcmFsRm9udCA9IFwiIzBFNDg3QVwiO1xuXG4vLyBDT05GIE9OIFNFUlZFUlxuc1VSTF91cFVzZXIgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIjtcbnNVUkwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIjtcbnNMb2thc2lfdXBVc2VyID0gcHJvY2Vzcy5lbnYuUFdEICsgXCIvcHVibGljL1wiO1xuXG5zQXZhdGFyID0gc1VSTCArIFwiaW1hZ2VzL2F2YXRhci5zdmdcIjtcbnNMb2dvID0gc1VSTCArIFwiaW1hZ2VzL2xvZ28uc3ZnXCI7XG5zQmFja2dyb3VuZCA9IHNVUkwgKyBcImltYWdlcy9iYWNrZ3JvdW5kLnN2Z1wiO1xuXG5NZXRlb3IuYWJzb2x1dGVVcmwuZGVmYXVsdE9wdGlvbnMucm9vdFVybCA9IHNVUkw7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgSmF5dWRhIG9uIDcvMTUvMTcuXG4gKi9cblxuXG5mbHhncm91cCA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgaGFzID0gZnVuY3Rpb24ob2JqLCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIF8uYW55KG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBfLmlzRXF1YWwodmFsdWUsIHRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIga2V5cyA9IGZ1bmN0aW9uKGRhdGEsIG5hbWVzKSB7XG4gICAgICAgIHJldHVybiBfLnJlZHVjZShkYXRhLCBmdW5jdGlvbihtZW1vLCBpdGVtKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gXy5waWNrKGl0ZW0sIG5hbWVzKTtcbiAgICAgICAgICAgIGlmICghaGFzKG1lbW8sIGtleSkpIHtcbiAgICAgICAgICAgICAgICBtZW1vLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgICB9LCBbXSk7XG4gICAgfTtcblxuICAgIHZhciBncm91cCA9IGZ1bmN0aW9uKGRhdGEsIG5hbWVzLCBza29sb20pIHtcbiAgICAgICAgdmFyIHN0ZW1zID0ga2V5cyhkYXRhLCBuYW1lcyk7XG4gICAgICAgIHJldHVybiBfLm1hcChzdGVtcywgZnVuY3Rpb24oc3RlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBrb2xvbTpza29sb20sXG4gICAgICAgICAgICAgICAga2V5OiBzdGVtLFxuICAgICAgICAgICAgICAgIHZhbHM6Xy5tYXAoXy53aGVyZShkYXRhLCBzdGVtKSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy5vbWl0KGl0ZW0sIG5hbWVzKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGdyb3VwLnJlZ2lzdGVyID0gZnVuY3Rpb24obmFtZSwgY29udmVydGVyKSB7XG4gICAgICAgIHJldHVybiBncm91cFtuYW1lXSA9IGZ1bmN0aW9uKGRhdGEsIG5hbWVzLCBza29sb20pIHtcbiAgICAgICAgICAgIHJldHVybiBfLm1hcChncm91cChkYXRhLCBuYW1lcywgc2tvbG9tKSwgY29udmVydGVyKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGdyb3VwO1xufSgpKTtcblxuZmx4Z3JvdXAucmVnaXN0ZXIoXCJzdW1cIiwgZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiBfLmV4dGVuZCh7fSwgaXRlbS5rZXksIHtTVU06IF8ucmVkdWNlKGl0ZW0udmFscywgZnVuY3Rpb24obWVtbywgbm9kZSkge1xuICAgICAgICByZXR1cm4gbWVtbyArIE51bWJlcihub2RlW1wiXCIraXRlbS5rb2xvbStcIlwiXSk7XG4gICAgfSwgMCl9KTtcbn0pO1xuXG5mbHhncm91cC5yZWdpc3RlcihcImNvdW50XCIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICByZXR1cm4gXy5leHRlbmQoe30sIGl0ZW0ua2V5LCB7Q09VTlQ6IF8ucmVkdWNlKGl0ZW0udmFscywgZnVuY3Rpb24obWVtbywgbm9kZSkge1xuICAgICAgICByZXR1cm4gbWVtbyArIDE7XG4gICAgfSwgMCl9KTtcbn0pO1xuXG5mbHhncm91cC5yZWdpc3RlcihcImF2Z1wiLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgY29uc29sZS5sb2coaXRlbS52YWxzLmxlbmd0aCk7XG4gICAgcmV0dXJuIF8uZXh0ZW5kKFxuICAgICAgICB7fSwgaXRlbS5rZXksIHtBVkc6IF8ucmVkdWNlKGl0ZW0udmFscywgZnVuY3Rpb24obWVtbywgbm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1lbW8gKyBOdW1iZXIobm9kZVtcIlwiK2l0ZW0ua29sb20rXCJcIl0pO1xuICAgICAgICB9LCAwKSAvIGl0ZW0udmFscy5sZW5ndGh9XG4gICAgKTtcbn0pO1xuXG5mbHhncm91cC5yZWdpc3RlcihcIm1heFwiLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgcmV0dXJuIF8uZXh0ZW5kKHt9LCBpdGVtLmtleSwge01BWDogXy5yZWR1Y2UoaXRlbS52YWxzLCBmdW5jdGlvbihtZW1vLCBub2RlKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChtZW1vLCBOdW1iZXIobm9kZVtcIlwiK2l0ZW0ua29sb20rXCJcIl0pKTtcbiAgICB9LCBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkpfSk7XG59KTtcblxuZmx4Z3JvdXAucmVnaXN0ZXIoXCJtaW5cIiwgZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiBfLmV4dGVuZCh7fSwgaXRlbS5rZXksIHtNSU46IF8ucmVkdWNlKGl0ZW0udmFscywgZnVuY3Rpb24obWVtbywgbm9kZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4obWVtbywgTnVtYmVyKG5vZGVbXCJcIitpdGVtLmtvbG9tK1wiXCJdKSk7XG4gICAgfSwgTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZKX0pO1xufSk7XG5cblxuXG5cblxuXG5cbmFkYURBVEEgPSBmdW5jdGlvbihvYmopIHtcblxuICAgIHRyeSB7XG4gICAgICAgIC8vIG51bGwgYW5kIHVuZGVmaW5lZCBhcmUgXCJlbXB0eVwiXG4gICAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAob2JqID09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAob2JqID09IFwiXCIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyB1bnR1ayBib29sZWFuXG4gICAgICAgIGlmIChvYmogPT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgICAgIGlmIChvYmogPT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBBc3N1bWUgaWYgaXQgaGFzIGEgbGVuZ3RoIHByb3BlcnR5IHdpdGggYSBub24temVybyB2YWx1ZVxuICAgICAgICAvLyB0aGF0IHRoYXQgcHJvcGVydHkgaXMgY29ycmVjdC5cbiAgICAgICAgaWYgKG9iai5sZW5ndGggPiAwKSAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKG9iai5sZW5ndGggPT09IDApICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gXCJudW1iZXJcIiAmJiBvYmogIT0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgLy8gSWYgaXQgaXNuJ3QgYW4gb2JqZWN0IGF0IHRoaXMgcG9pbnRcbiAgICAgICAgLy8gaXQgaXMgZW1wdHksIGJ1dCBpdCBjYW4ndCBiZSBhbnl0aGluZyAqYnV0KiBlbXB0eVxuICAgICAgICAvLyBJcyBpdCBlbXB0eT8gIERlcGVuZHMgb24geW91ciBhcHBsaWNhdGlvbi5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBPdGhlcndpc2UsIGRvZXMgaXQgaGF2ZSBhbnkgcHJvcGVydGllcyBvZiBpdHMgb3duP1xuICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyBkb2Vzbid0IGhhbmRsZVxuICAgICAgICAvLyB0b1N0cmluZyBhbmQgdmFsdWVPZiBlbnVtZXJhdGlvbiBidWdzIGluIElFIDwgOVxuICAgICAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuXG5cbmRhdGVBZGQgPSBmdW5jdGlvbiAoZGF0ZSwgc0RhdGVQYXJ0LCBqdW1sYWhBZGQpIHtcbiAgICB2YXIgZGF0ZU5ldyA9IG5ldyBEYXRlKCk7XG4gICAgaWYgKHNEYXRlUGFydCA9PSBcIm1pbnV0ZXNcIikge1xuICAgICAgICB2YXIgbWVuaXRCYXJ1ID0gZGF0ZS5nZXRNaW51dGVzKCkgKyBqdW1sYWhBZGQ7XG4gICAgICAgIGRhdGVOZXcgPSBkYXRlLnNldE1pbnV0ZXMobWVuaXRCYXJ1KTtcbiAgICB9XG5cbiAgICBpZiAoc0RhdGVQYXJ0ID09IFwiaG91cnNcIikge1xuICAgICAgICB2YXIgbWVuaXRCYXJ1ID0gZGF0ZS5nZXRIb3VycygpICsganVtbGFoQWRkO1xuICAgICAgICBkYXRlTmV3ID0gZGF0ZS5zZXRIb3VycyhtZW5pdEJhcnUpO1xuICAgIH1cbiAgICBpZiAoc0RhdGVQYXJ0ID09IFwiZGF5c1wiKSB7XG4gICAgICAgIHZhciBoYXJpQmFydSA9IGRhdGUuZ2V0RGF0ZSgpICsganVtbGFoQWRkO1xuICAgICAgICBkYXRlTmV3ID0gZGF0ZS5zZXREYXRlKGhhcmlCYXJ1KTtcbiAgICB9XG4gICAgaWYgKHNEYXRlUGFydCA9PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgIHZhciBidWxhbkJhcnUgPSBkYXRlLmdldE1vbnRoKCkgKyBqdW1sYWhBZGQ7XG4gICAgICAgIGRhdGVOZXcgPSBkYXRlLnNldE1vbnRoKGJ1bGFuQmFydSk7XG4gICAgfVxuICAgIGlmIChzRGF0ZVBhcnQgPT0gXCJ5ZWFyc1wiKSB7XG4gICAgICAgIHZhciB0YWh1bkJhcnUgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyBqdW1sYWhBZGQ7XG4gICAgICAgIGRhdGVOZXcgPSBkYXRlLnNldEZ1bGxZZWFyKHRhaHVuQmFydSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVOZXcpO1xufTtcblxuXG5cbkFycmF5UmVtb3ZlID0gZnVuY3Rpb24gKG9BcnJheSxzUHJvcGVydHlFbGVtZW50LHZhbHVlKVxue1xuICAgIHJldHVybiBvQXJyYXkuZmlsdGVyKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbFtzUHJvcGVydHlFbGVtZW50XSAhPT0gdmFsdWU7XG4gICAgfSk7XG5cbn07XG5cblxucmFuZG9tID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTAwKSArIDEpO1xufTtcblxuaXNOdW1lcmljID0gZnVuY3Rpb24gKG4pIHtcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xufTtcblxuIl19
