"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var linqts_1 = require("linqts");
var event_spinner_service_1 = require("../../components/spinner/event.spinner.service");
var leftbar_animation_service_1 = require("../leftbar-animation.service");
var routepath_1 = require("../../AtPar/Menus/routepath");
var HttpService_1 = require("../../Shared/HttpService");
var AtParConstants_1 = require("../../Shared/AtParConstants");
var BodyComponent = (function () {
    function BodyComponent(leftBarAnimationService, httpservice, title, atParConstant, document, spinnerservice) {
        this.leftBarAnimationService = leftBarAnimationService;
        this.httpservice = httpservice;
        this.title = title;
        this.atParConstant = atParConstant;
        this.document = document;
        this.spinnerservice = spinnerservice;
        this.showStyle = false;
        this.msgs = [];
        this.marginTop = '0';
        try {
            //this.title.setTitle(AtParConstants.PRODUCT_NAME + ' - Dashboard');
            this.title.setTitle('Dashboard');
            this.lstMenus = new linqts_1.List();
            this.basePath = this.httpservice.Path;
            this.appGroups = new linqts_1.List();
            this.appModules = new linqts_1.List();
            this.breadCrumb = new routepath_1.Menus();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    BodyComponent.prototype.getMargin = function () {
        try {
            this.showStyle = this.leftBarAnimationService.getLeftBarMargin();
            if (this.showStyle) {
                return "";
            }
            else {
                this.activeGroup = "Atpar";
                return "0px";
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    BodyComponent.prototype.getMenu = function () {
        try {
            this.activeGroup = this.leftBarAnimationService.getActiveLeftBar();
            if (this.activeGroup != 'none') {
                return this.strshowStyle;
            }
            else {
                return this.hideStyle;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    BodyComponent.prototype.getGroupModules = function (appGroup) {
        localStorage.setItem("IsClicked", "false");
        this.document.getElementById('leftsidebar').style.width = "";
        this.document.getElementById('main').style.margin = "";
        this.document.getElementById('menu-icon').style.left = "175px";
        for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
            var div = document.getElementsByClassName('breadcrumb')[i];
            div.setAttribute("style", "padding-left:" + "0px");
        }
        for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
            var div = document.getElementsByClassName('breadcrumb')[i];
            div.setAttribute("style", "left:" + "209px");
        }
        try {
            localStorage.removeItem("bcMenu");
            this.breadCrumb.APP_NAME = appGroup.GROUP_NAME;
            ////this.breadCrumb = new Menus(this.breadCrumb.APP_NAME:'AtPar')
            ////let bedGramp = new Menus("dsv",)
            localStorage.removeItem('activeGroupModuleName');
            this.spinnerservice.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumb));
            this.groupModules = new linqts_1.List();
            localStorage.setItem('ActiveGroup', JSON.stringify(appGroup));
            localStorage.setItem('activateLeftBarMenu', 'YES');
            localStorage.setItem('isAtParDashboard', 'YES');
            this.activeGroup = appGroup.GROUP_NAME;
            this.groupModules = this.appModules.Where(function (appModule) { return appModule.GROUP_ID == appGroup.GROUP_ID; });
            this.showStyle = true;
            this.leftBarAnimationService.isHomeClicked = true;
            this.leftBarAnimationService.emitChange(this.groupModules);
            this.leftBarAnimationService.emitChangeActiveMenu(this.activeGroup);
            if (this.activeGroup != '') {
                this.leftBarAnimationService.setActiveLeftBar(this.activeGroup);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    BodyComponent.prototype.ngOnInit = function () {
        //this.breadCrumb.APP_NAME = ""; 
        //this.breadCrumb.MENU_NAME = "";    
        //this.spinnerservice.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumb))
        this.getmenulist();
    };
    BodyComponent.prototype.getBodyMargin = function () {
        try {
            var wheight = void 0;
            wheight = window.innerHeight;
            this.marginTop = parseInt(((wheight / 100) * 41.38).toString()) + 'px';
            return this.marginTop + ' 0 0 0';
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    BodyComponent.prototype.getmenulist = function () {
        return __awaiter(this, void 0, void 0, function () {
            var appModules, i, menuItems, i;
            return __generator(this, function (_a) {
                try {
                    if (localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != '') {
                        this.appGroups = JSON.parse(localStorage.getItem('AppGroups'));
                    }
                    if (localStorage.getItem('Apps') != undefined && localStorage.getItem('Apps') != null && localStorage.getItem('Apps') != '') {
                        appModules = JSON.parse(localStorage.getItem('Apps'));
                        for (i = 0; i < appModules.length; i++) {
                            this.appModules.Add(appModules[i]);
                        }
                    }
                    if (localStorage.getItem('MenuList') != undefined && localStorage.getItem('MenuList') != null && localStorage.getItem('MenuList') != '') {
                        menuItems = JSON.parse(localStorage.getItem('MenuList'));
                        for (i = 0; i < menuItems.length; i++) {
                            this.lstMenus.Add(menuItems[i]);
                        }
                    }
                    if (localStorage.getItem('isAtParDashboard') != null && localStorage.getItem('isAtParDashboard') != undefined) {
                        if (localStorage.getItem('isAtParDashboard') == 'YES') {
                            localStorage.removeItem('ActiveGroup');
                            this.activeGroup = '';
                        }
                        else {
                            if (localStorage.getItem('ActiveGroup') != null && localStorage.getItem('ActiveGroup') != undefined) {
                                this.activeGroup = JSON.parse(localStorage.getItem('ActiveGroup').toString()).GROUP_NAME;
                            }
                        }
                    }
                    else {
                        if (localStorage.getItem('ActiveGroup') != null && localStorage.getItem('ActiveGroup') != undefined) {
                            this.activeGroup = JSON.parse(localStorage.getItem('ActiveGroup').toString()).GROUP_NAME;
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    BodyComponent.prototype.isDisabledAppGroup = function (group) {
        try {
            return this.appModules.Where(function (x) { return x.GROUP_ID == group.GROUP_ID; }).Count() >= 1 ? false : true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    BodyComponent.prototype.clientErrorMsg = function (ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerservice, ex.toString());
    };
    BodyComponent.prototype.OnDestroy = function () {
        localStorage.setItem('isAtParDashboard', 'YES');
        this.spinnerservice = null;
        this.activeGroup = null;
        this.showStyle = null;
        this.lstMenus = null;
        this.groupModules = null;
        this.strshowStyle = null;
        this.hideStyle = null;
        this.appGroups = null;
        this.appModules = null;
        this.msgs = null;
    };
    BodyComponent = __decorate([
        core_1.Component({
            templateUrl: 'body.component.html',
            providers: [AtParConstants_1.AtParConstants]
        }),
        __param(4, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService, HttpService_1.HttpService,
            platform_browser_1.Title,
            AtParConstants_1.AtParConstants, Object, event_spinner_service_1.SpinnerService])
    ], BodyComponent);
    return BodyComponent;
}());
exports.BodyComponent = BodyComponent;
//# sourceMappingURL=body.component.js.map