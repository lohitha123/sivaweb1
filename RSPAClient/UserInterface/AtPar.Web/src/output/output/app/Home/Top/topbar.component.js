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
var HttpService_1 = require("../../Shared/HttpService");
var routepath_1 = require("../../AtPar/Menus/routepath");
var leftbar_animation_service_1 = require("../leftbar-animation.service");
var event_spinner_service_1 = require("../../components/spinner/event.spinner.service");
var linqts_1 = require("linqts");
var linq_es5_1 = require("linq-es5");
var AtParEnums_1 = require("../../Shared/AtParEnums");
var MT_ATPAR_USER_PROFILE_APP_ACL_ORG_1 = require("../../Entities/MT_ATPAR_USER_PROFILE_APP_ACL_ORG");
var AtParConstants_1 = require("../../Shared/AtParConstants");
var router_1 = require("@angular/router");
var api_1 = require("../../components/common/api");
var TopBarComponent = (function () {
    function TopBarComponent(router, leftbaranimationService, spinnerService, httpService, title, atParConstant, route, confirmationService, document) {
        this.router = router;
        this.leftbaranimationService = leftbaranimationService;
        this.spinnerService = spinnerService;
        this.httpService = httpService;
        this.title = title;
        this.atParConstant = atParConstant;
        this.route = route;
        this.confirmationService = confirmationService;
        this.document = document;
        this.mhsatparicon = "";
        this.activeddName = '';
        this.change = new core_1.EventEmitter();
        this.filteredData = new core_1.EventEmitter();
        this.clickCount = 0;
        this.showStyle = true;
        this.displayAboutDialog = false;
        this.displayHelpDialog = false;
        this.isUserAllowed = false;
        this.isclicked = true;
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.breadCrumbAppName = '';
        this.breadCrumbPrvsRoute = '';
        this.breadCrumbSubMenuName = '';
        this.breadCrumbPrvsMenuName = '';
        this.breadCrumbGroupName = '';
        this.breadCrumbsubGroupName = '';
        this.isMsg = false;
        try {
            this.mhsatparicon = "assets/images/MHSAtpar.png";
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.user = new MT_ATPAR_USER_PROFILE_APP_ACL_ORG_1.MT_ATPAR_USER_PROFILE_APP_ACL_ORG();
            this.breadCrumbMenu = new routepath_1.Menus();
            this.localstoragemenu = new routepath_1.Menus();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    TopBarComponent.prototype.openDropDown = function (menu) {
        try {
            this.clickCount = 1;
            if (this.activeddName != menu) {
                this.activeddName = menu;
            }
            else {
                this.activeddName = '';
            }
            this.change.emit(this.activeddName);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TopBarComponent.prototype.AtPar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, div, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        localStorage.setItem("IsClicked", "false");
                        if (!(localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != '')) return [3 /*break*/, 2];
                        this.showStyle = false;
                        this.activeMenu = 'AtPar';
                        this.leftbaranimationService.isHide();
                        this.leftbaranimationService.isHomeClicked = false;
                        localStorage.removeItem('activateLeftBarMenu');
                        localStorage.removeItem('ActiveGroup');
                        localStorage.setItem('isAtParDashboard', 'YES');
                        return [4 /*yield*/, this.router.navigate(['atpar'])];
                    case 1:
                        _a.sent();
                        for (i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                            div = document.getElementsByClassName('breadcrumb')[i];
                            div.setAttribute("style", "padding-left:" + "0px");
                            this.breadCrumbAppName = 'Home';
                            this.breadCrumbMenuName = '';
                            this.breadCrumbRoute = '';
                            this.breadCrumbSubMenuName = '';
                            this.breadCrumbGroupName = '';
                            this.breadCrumbsubGroupName = '';
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        this.httpService.clearAppSession();
                        return [4 /*yield*/, this.router.navigate(['login'])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TopBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        try {
            this.aboutAtPar();
            if (localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != '') {
                this.isUserAllowed = true;
                this.GetUserDetails();
                this.GetMenusList();
                this.lstMenuList = [];
                var breadCrumbs;
                if (localStorage.getItem("BreadCrumbMenus") != undefined && localStorage.getItem("BreadCrumbMenus") != null && localStorage.getItem("BreadCrumbMenus") != '') {
                    breadCrumbs = JSON.parse(localStorage.getItem("BreadCrumbMenus"));
                }
                if (breadCrumbs != null && breadCrumbs != undefined) {
                    this.resetBreadCrumbs(breadCrumbs);
                }
                this.spinnerService.changeBCEmitted$.subscribe(function (groupModules) {
                    localStorage.setItem('BreadCrumbMenus', groupModules);
                    _this.getBreadCrumbs(JSON.parse(groupModules));
                });
            }
            else {
                this.isUserAllowed = false;
                var breadCrumbs = localStorage.getItem("BreadCrumbMenus");
                if (breadCrumbs != null && breadCrumbs != undefined) {
                    this.getBreadCrumbs(JSON.parse(breadCrumbs));
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TopBarComponent.prototype.getBreadCrumbs = function (groupModules) {
        this.localstoragemenu = new routepath_1.Menus();
        if (groupModules.APP_NAME != "My Profile" && groupModules.APP_NAME != "Downloads" && groupModules.APP_NAME != "Change Password") {
            if (groupModules.IS_DIV == true) {
                if (localStorage.getItem("bcMenu") != null) {
                    if (groupModules.SUB_MENU_NAME != null && groupModules.SUB_MENU_NAME != '') {
                        this.localstoragemenu = JSON.parse(localStorage.getItem("bcMenu"));
                        this.selectedMenu = this.localstoragemenu;
                        this.selectedMenu.SUB_MENU_NAME = groupModules.SUB_MENU_NAME;
                        if (groupModules.IS_MESSAGE != undefined && groupModules.IS_MESSAGE != null) {
                            this.selectedMenu.IS_MESSAGE = groupModules.IS_MESSAGE;
                        }
                    }
                    else {
                        this.localstoragemenu = JSON.parse(localStorage.getItem("bcMenu"));
                        this.selectedMenu = this.localstoragemenu;
                    }
                }
                else {
                    this.selectedMenu = groupModules;
                }
            }
            else {
                if (groupModules.IS_DIV == false && groupModules.SUB_MENU_NAME != null && groupModules.SUB_MENU_NAME != '') {
                    this.localstoragemenu = JSON.parse(localStorage.getItem("bcMenu"));
                    this.selectedMenu = this.localstoragemenu;
                    this.selectedMenu.SUB_MENU_NAME = groupModules.SUB_MENU_NAME;
                    if (groupModules.IS_MESSAGE != undefined && groupModules.IS_MESSAGE != null) {
                        this.selectedMenu.IS_MESSAGE = groupModules.IS_MESSAGE;
                    }
                }
                else {
                    this.selectedMenu = groupModules;
                }
            }
        }
        else {
            this.selectedMenu = groupModules;
        }
        if ((this.selectedMenu.APP_NAME == "Reports & Dashboards") && (this.selectedMenu.GROUP_NAME == "Reports & Dashboards")) {
            this.selectedMenu.GROUP_NAME == 'Reports & Dashboards';
            this.selectedMenu.APP_NAME = '';
        }
        this.breadCrumbGroupName = '';
        this.breadCrumbAppName = '';
        this.breadCrumbMenuName = '';
        this.breadCrumbSubMenuName = '';
        this.breadCrumbsubGroupName = '';
        if (this.selectedMenu.SUB_CATEGORY != null && this.selectedMenu.SUB_CATEGORY != "" && this.selectedMenu.SUB_CATEGORY.length > 1) {
            this.breadCrumbGroupName = 'Reports & Dashboards';
            this.breadCrumbsubGroupName = this.selectedMenu.SUB_CATEGORY;
        }
        if ((this.selectedMenu.APP_NAME != "Reports") && (this.selectedMenu.SUB_MENU_GROUP_NAME == 'Reports' || this.selectedMenu.GROUP_NAME == 'Reports & Dashboards' ||
            this.localstoragemenu.SUB_MENU_GROUP_NAME == 'Reports' || this.localstoragemenu.GROUP_NAME == 'Reports & Dashboards')) {
            this.breadCrumbGroupName = 'Reports & Dashboards';
        }
        if (this.selectedMenu.APP_NAME != undefined && this.selectedMenu.APP_NAME != null && this.selectedMenu.APP_NAME != '') {
            this.breadCrumbAppName = this.selectedMenu.APP_NAME;
            localStorage.setItem("appName", this.breadCrumbAppName);
        }
        if (this.selectedMenu.MENU_NAME != undefined && this.selectedMenu.MENU_NAME != null && this.selectedMenu.MENU_NAME != '') {
            if (this.selectedMenu.SUB_CATEGORY != null && this.selectedMenu.SUB_CATEGORY != "" && this.selectedMenu.SUB_CATEGORY.length > 1) {
                this.breadCrumbMenuName = this.selectedMenu.MENU_NAME;
            }
            else if (this.selectedMenu.SUB_CATEGORY != undefined && this.selectedMenu.SUB_CATEGORY != null && this.selectedMenu.SUB_CATEGORY != '') {
                this.breadCrumbMenuName = this.selectedMenu.SUB_CATEGORY + '-' + this.selectedMenu.MENU_NAME;
            }
            else {
                this.breadCrumbMenuName = this.selectedMenu.MENU_NAME;
            }
            localStorage.setItem("breadMenuName", this.breadCrumbMenuName);
        }
        else {
            if (this.router.url.indexOf('/myprofile') >= 0 || this.router.url.indexOf('/changepassword') >= 0 || this.router.url.indexOf('/downloads') >= 0 || (this.breadCrumbAppName == 'Reports & Dashboards' && this.selectedMenu.MENU_NAME == '')) {
                this.breadCrumbMenuName = '';
                localStorage.setItem("IsClicked", "false");
                this.showStyle = false;
                this.activeMenu = 'AtPar';
                this.leftbaranimationService.isHide();
                this.leftbaranimationService.isHomeClicked = false;
                localStorage.removeItem('activateLeftBarMenu');
                localStorage.removeItem('ActiveGroup');
                localStorage.setItem('isAtParDashboard', 'YES');
            }
        }
        if (this.selectedMenu.ROUTE != undefined && this.selectedMenu.ROUTE != null && this.selectedMenu.ROUTE != '') {
            this.breadCrumbRoute = 'atpar/' + this.selectedMenu.ROUTE;
            localStorage.setItem("breadCrumUrl", this.breadCrumbRoute);
        }
        if (this.selectedMenu.SUB_MENU_NAME != undefined && this.selectedMenu.SUB_MENU_NAME != null && this.selectedMenu.SUB_MENU_NAME != '') {
            if (this.selectedMenu.IS_MESSAGE != undefined && this.selectedMenu.IS_MESSAGE != null) {
                this.isMsg = this.selectedMenu.IS_MESSAGE;
            }
            //localStorage.setItem("breadCrumMsg", this.isMsg);
            this.breadCrumbSubMenuName = ' - ' + this.selectedMenu.SUB_MENU_NAME;
        }
        else {
            this.breadCrumbSubMenuName = '';
        }
        localStorage.setItem("breadSubMenuName", this.breadCrumbSubMenuName);
    };
    TopBarComponent.prototype.resetBreadCrumbs = function (breadCrumbs) {
        if (localStorage.getItem("appName") != undefined && localStorage.getItem("appName") != null && localStorage.getItem("appName") != '') {
            this.breadCrumbAppName = localStorage.getItem("appName");
        }
        if (localStorage.getItem("breadMenuName") != undefined && localStorage.getItem("breadMenuName") != null && localStorage.getItem("breadMenuName") != '') {
            if (this.breadCrumbAppName == 'Home') {
                localStorage.setItem("breadMenuName", '');
            }
            this.breadCrumbMenuName = localStorage.getItem("breadMenuName");
        }
        if (localStorage.getItem("breadCrumUrl") != undefined && localStorage.getItem("breadCrumUrl") != null && localStorage.getItem("breadCrumUrl") != '') {
            this.breadCrumbRoute = localStorage.getItem("breadCrumUrl");
        }
        if (localStorage.getItem("breadSubMenuName") != undefined && localStorage.getItem("breadSubMenuName") != null && localStorage.getItem("breadSubMenuName") != '') {
            if (breadCrumbs.IS_DIV == false && breadCrumbs.SUB_MENU_NAME != '' && breadCrumbs.SUB_MENU_NAME != undefined && breadCrumbs.SUB_MENU_NAME != null) {
                if (this.breadCrumbAppName == 'Home') {
                    localStorage.setItem("breadSubMenuName", '');
                }
                this.breadCrumbSubMenuName = localStorage.getItem("breadSubMenuName");
            }
            else {
                localStorage.setItem("breadSubMenuName", '');
                this.breadCrumbSubMenuName = localStorage.getItem("breadSubMenuName");
            }
        }
        else {
            this.breadCrumbSubMenuName = '';
        }
    };
    TopBarComponent.prototype.BreadCrumbProduct_Click = function () {
        var _this = this;
        if (this.breadCrumbAppName != 'Home' && this.breadCrumbAppName != 'Administration' && this.breadCrumbAppName != 'Warehouse' && this.breadCrumbAppName != 'Distribution' && this.breadCrumbAppName != 'CaseCost-360' && this.breadCrumbAppName != 'ATPARX' && this.breadCrumbAppName != 'Reports & Dashboards' && this.breadCrumbAppName != 'My Profile' && this.breadCrumbAppName != 'Change Password' && this.breadCrumbAppName != 'Downloads') {
            if (!this.breadCrumbAppName.includes("Dashboard")) {
                this.title.setTitle(this.breadCrumbAppName);
                this.router.navigate(['atpar/' + this.breadCrumbAppName.replace(/ /g, '').toLowerCase() + 'breadcrumb']);
                setTimeout(function () {
                    //this.breadCrumbAppName = '';
                    _this.breadCrumbAppName = _this.breadCrumbAppName + ' - Dashboard';
                    _this.breadCrumbMenuName = '';
                    _this.breadCrumbRoute = '';
                    _this.breadCrumbSubMenuName = '';
                    _this.breadCrumbGroupName = '';
                    _this.breadCrumbsubGroupName = '';
                    var submenu = new routepath_1.Menus();
                    submenu.APP_NAME = _this.breadCrumbAppName;
                    localStorage.setItem("bcMenu", JSON.stringify(submenu));
                }, 100);
            }
        }
        if (this.breadCrumbAppName == 'My Profile') {
            if (localStorage.getItem("bcMenu") != null) {
                localStorage.removeItem("bcMenu");
            }
            this.router.navigate(['atpar/sameurl']);
            setTimeout(function () {
                _this.router.navigate(['atpar/myprofile']);
            }, 1);
        }
        else if (this.breadCrumbAppName == 'Change Password') {
            if (localStorage.getItem("bcMenu") != null) {
                localStorage.removeItem("bcMenu");
            }
            this.router.navigate(['atpar/sameurl']);
            setTimeout(function () {
                _this.router.navigate(['atpar/changepassword']);
            }, 1);
        }
        else if (this.breadCrumbAppName == 'Downloads') {
            if (localStorage.getItem("bcMenu") != null) {
                localStorage.removeItem("bcMenu");
            }
            this.router.navigate(['atpar/sameurl']);
            setTimeout(function () {
                _this.router.navigate(['atpar/downloads']);
            }, 1);
        }
    };
    TopBarComponent.prototype.BreadCrumbMenu_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var navigateUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('navigateUrl', this.breadCrumbRoute);
                        navigateUrl = '';
                        navigateUrl = localStorage.getItem('navigateUrl') + '';
                        if (!(this.isMsg == false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.router.navigate(['atpar/sameurl'])];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            _this.router.navigate([navigateUrl]);
                            localStorage.removeItem('navigateUrl');
                        }, 1);
                        this.breadCrumbSubMenuName = '';
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.confirmationService.confirm({
                            //this.spinnerService.start();
                            message: 'Unsaved data will be lost, do you want to continue moving back to parent screen?',
                            accept: function () {
                                _this.router.navigate(['atpar/sameurl']);
                                setTimeout(function () {
                                    _this.router.navigate([navigateUrl]);
                                    localStorage.removeItem('navigateUrl');
                                }, 1);
                                _this.breadCrumbSubMenuName = '';
                            }
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TopBarComponent.prototype.GetMenusList = function () {
        try {
            this.appGroups = new linqts_1.List();
            this.appModules = new linqts_1.List();
            this.lstMenus = new linqts_1.List();
            this.lstMenuList1 = [];
            if (localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != '') {
                var appGroups = JSON.parse(localStorage.getItem('AppGroups'));
                for (var i = 0; i < appGroups.length; i++) {
                    this.appGroups.Add(appGroups[i]);
                }
            }
            if (localStorage.getItem('Apps') != undefined && localStorage.getItem('Apps') != null && localStorage.getItem('Apps') != '') {
                var appModules = JSON.parse(localStorage.getItem('Apps'));
                for (var i = 0; i < appModules.length; i++) {
                    this.appModules.Add(appModules[i]);
                }
            }
            if (localStorage.getItem('MenuList') != null && localStorage.getItem('MenuList') != undefined) {
                var menuItems = JSON.parse(localStorage.getItem('MenuList'));
                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].SUB_MENU_GROUP_NAME != AtParEnums_1.SubMenuGroup[AtParEnums_1.SubMenuGroup.Reports]) {
                        this.lstMenuList1.push({
                            value: menuItems[i].MENU_NAME, code: menuItems[i].ROUTE, name: menuItems[i].MENUS_FRIENDLYNAME, APP_ID: menuItems[i].APP_ID, APP_NAME: menuItems[i].APP_NAME, sub_menu_group_name: menuItems[i].SUB_MENU_GROUP_NAME
                        });
                        this.lstMenus.Add(menuItems[i]);
                    }
                    else {
                        if ((this.appModules.Where(function (app) { return app.APP_ID == AtParEnums_1.EnumApps.Reports; })).Count() > 0) {
                            this.lstMenuList1.push({
                                value: menuItems[i].MENU_NAME, code: menuItems[i].ROUTE, name: menuItems[i].MENUS_FRIENDLYNAME, APP_ID: menuItems[i].APP_ID, APP_NAME: menuItems[i].APP_NAME, sub_menu_group_name: menuItems[i].SUB_MENU_GROUP_NAME
                            });
                            this.lstMenus.Add(menuItems[i]);
                        }
                    }
                }
                //Setting order by for filtered records. 
                if (this.lstMenuList1 != null && this.lstMenuList1.length > 0) {
                    this.lstMenuList1 = linq_es5_1.asEnumerable(this.lstMenuList1).OrderBy(function (x) { return x.APP_ID; }).ToArray();
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TopBarComponent.prototype.GetUserDetails = function () {
        var _this = this;
        try {
            this.httpService.get({
                "apiMethod": "/api/User/GetUser",
                params: {
                    "userId": this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]
                }
            }).catch(this.httpService.handleError)
                .map(function (res) { return res.json(); })
                .subscribe(function (res2) {
                var menu = JSON.parse(localStorage.getItem("submenu"));
                var isclicked = localStorage.getItem("IsClicked");
                if (menu != null && isclicked == "true") {
                    _this.document.getElementById('menu-icon').style.left = "175px";
                    _this.document.getElementById('leftsidebar').style.width = "";
                    for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                        var div = document.getElementsByClassName('breadcrumb')[i];
                        div.setAttribute("style", "left:" + "209px");
                    }
                }
                if (res2.Data != null) {
                    _this.user = res2.Data;
                    if (_this.user.IMAGE_PATH == null) {
                        _this.user.IMAGE_PATH = 'assets/images/users/default.png';
                    }
                    localStorage.setItem('userProfile', JSON.stringify(_this.user));
                }
                else {
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TopBarComponent.prototype.search = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_1;
            return __generator(this, function (_a) {
                try {
                    query_1 = event.query;
                    this.lstMenuList = [];
                    setTimeout(function () {
                        _this.lstMenuList = _this.filterMenu(query_1, _this.lstMenuList1);
                    }, 50);
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                this.filteredData.emit(this.Menu);
                return [2 /*return*/];
            });
        });
    };
    TopBarComponent.prototype.filterMenu = function (query, MenuList1) {
        try {
            var filtered = [];
            for (var i = 0; i < MenuList1.length; i++) {
                var menus = MenuList1[i];
                if (menus.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                    filtered.push(menus);
                }
            }
            if (filtered == null || filtered.length == 0 || filtered == undefined) {
                // this.Menu = null;
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TopBarComponent.prototype.SelectRoute = function (Menu2) {
        try {
            this.navigateToSearchItem(Menu2);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.Menu = null;
            this.lstMenuList = [];
        }
    };
    TopBarComponent.prototype.onEnterPress = function (event, Menu) {
        try {
            var searchMenuItem = null;
            var searchMenu = this.lstMenuList1.forEach(function (menuItem) {
                if (menuItem.name == null) {
                    menuItem.name = "";
                }
                if ((menuItem.name.toLowerCase().trim()) == (Menu.toLowerCase().trim())) {
                    searchMenuItem = menuItem;
                }
            });
            if (searchMenuItem != null) {
                this.navigateToSearchItem(searchMenuItem);
            }
            else if (event != null) {
                if (this.lstMenuList.length > 0) {
                    this.SelectRoute(event);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.Menu = null;
            this.lstMenuList = [];
        }
    };
    TopBarComponent.prototype.navigateToSearchItem = function (Menu2) {
        var _this = this;
        try {
            localStorage.setItem("IsClicked", "true");
            this.title.setTitle(Menu2.value);
            var selectedItem = this.lstMenus.Where(function (menu) { return menu.ROUTE == Menu2.code && menu.APP_ID == Menu2.APP_ID && menu.MENU_NAME == Menu2.value; });
            selectedItem.ForEach(function (menu) {
                _this.selectedMenu = menu;
            });
            if (selectedItem != null && selectedItem.Count() > 0) {
                localStorage.setItem("bcMenu", JSON.stringify(this.selectedMenu));
            }
            //For BreadCrum Change
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.selectedMenu));
            this.currentLocation = Menu2.code;
            localStorage.removeItem('modulesubmenu');
            if (Menu2.sub_menu_group_name != AtParEnums_1.EnumGroups[AtParEnums_1.EnumGroups.Reports]) {
                var selectedGroups = this.appGroups.Where(function (group) { return group.GROUP_ID == _this.selectedMenu.GROUP_ID; });
                selectedGroups.ForEach(function (group) {
                    _this.selectedGroup = group;
                });
                if (Menu2.APP_ID == AtParEnums_1.EnumApps.Auth) {
                    var menuItems = JSON.parse(localStorage.getItem('MenuList'));
                    var subMenuItem = null;
                    for (var i = 0; i < menuItems.length - 1; i++) {
                        if (menuItems[i].APP_ID == Menu2.APP_ID && menuItems[i].ROUTE == Menu2.code) {
                            subMenuItem = menuItems[i];
                            break;
                        }
                    }
                    if (subMenuItem != null) {
                        localStorage.setItem('modulesubmenu', JSON.stringify(subMenuItem));
                    }
                }
                localStorage.setItem('activeGroupModuleName', this.selectedMenu.APP_NAME);
            }
            else {
                var selectedGroups = this.appGroups.Where(function (group) { return group.GROUP_ID == AtParEnums_1.EnumGroups.Reports; });
                selectedGroups.ForEach(function (group) {
                    _this.selectedGroup = group;
                });
                localStorage.setItem('activeReportModule', this.selectedMenu.APP_NAME);
                localStorage.setItem('activeGroupModuleName', AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Reports]);
                localStorage.setItem('activeReportMenu', Menu2.value);
            }
            localStorage.setItem('ActiveGroup', JSON.stringify(this.selectedGroup));
            localStorage.setItem('activateLeftBarMenu', 'YES');
            this.leftbaranimationService.isHomeClicked = true;
            this.leftbaranimationService.emitChangeActiveMenu('');
            if (this.selectedGroup.GROUP_NAME != '') {
                this.leftbaranimationService.setActiveLeftBar(this.selectedGroup.GROUP_NAME);
            }
            this.leftbaranimationService.emitChangeLeftBarFromTopBar(true);
            //this.Menu = '';           
            localStorage.setItem("leftMenuUrl", Menu2.code);
            //Setting log Product Name
            var devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            if (Menu2.APP_ID == 0) {
                devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[AtParEnums_1.EnumApps.Init].toString();
            }
            else if (Menu2.APP_ID == 20) {
                devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = Menu2.APP_NAME.toString();
            }
            else {
                devicetoken[AtParEnums_1.TokenEntry_Enum.AppName] = AtParEnums_1.EnumApps[Menu2.APP_ID].toString();
            }
            localStorage.setItem("DeviceTokenEntry", JSON.stringify(devicetoken));
            if (this.currentLocation == Menu2.code) {
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.selectedMenu));
                this.router.navigate(['atpar/sameurl']);
                setTimeout(function () {
                    _this.router.navigate(['atpar/' + Menu2.code]);
                }, 1);
            }
            else {
                this.router.navigate(['atpar/' + Menu2.code]);
            }
            this.currentLocation = Menu2.code;
            this.document.getElementById('menu-icon').style.left = "175px";
            this.document.getElementById('leftsidebar').style.width = "";
            for (var i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                var div = document.getElementsByClassName('breadcrumb')[i];
                div.setAttribute("style", "left:" + "209px");
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.Menu = null;
            this.lstMenuList = [];
        }
    };
    TopBarComponent.prototype.logOut = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            this.activeddName = '';
            this.httpService.clearAppSession();
            setTimeout(function () {
                _this.spinnerService.stop();
                _this.router.navigate(['login']);
            }, 1000);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TopBarComponent.prototype.aboutAtPar = function () {
        var _this = this;
        try {
            this.httpService.getSync({
                "apiMethod": "/api/Common/GetAtParVersions",
                params: {
                    "deviceTokenEntry": this._deviceTokenEntry
                }
            }).catch(this.httpService.handleError).then(function (res) {
                _this.atParVersions = res.json();
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TopBarComponent.prototype.onMyProfile = function () {
        var _this = this;
        if (this.currentLocation == "myprofile") {
            this.router.navigate(['atpar/sameurl']);
            setTimeout(function () {
                _this.router.navigate(['myprofile']);
            }, 1);
        }
        else {
            this.router.navigate(['myprofile']);
        }
    };
    TopBarComponent.prototype.onTopBarClick = function () {
        var _this = this;
        try {
            setTimeout(function () {
                if (_this.clickCount != 1) {
                    _this.activeddName = '';
                    _this.change.emit(_this.activeddName);
                }
                _this.clickCount = 0;
            }, 10);
            this.filteredData.emit(this.Menu);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TopBarComponent.prototype.clientErrorMsg = function (ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    };
    TopBarComponent.prototype.getDispaly = function () {
        if (localStorage.getItem('userProfile') != null) {
            var user = JSON.parse(localStorage.getItem('userProfile'));
            this.user = user;
        }
        return 'none';
    };
    TopBarComponent.prototype.onMyProfileClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, div;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentLocation == "myprofile")) return [3 /*break*/, 2];
                        this.router.navigate(['atpar/sameurl']);
                        return [4 /*yield*/, setTimeout(function () {
                                _this.router.navigate(['atpar/myprofile']);
                            }, 1)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        this.title.setTitle("MyProfile");
                        return [4 /*yield*/, this.router.navigate(['atpar/myprofile'])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        for (i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                            div = document.getElementsByClassName('breadcrumb')[i];
                            div.setAttribute("style", "padding-left:" + "0px");
                        }
                        localStorage.setItem("IsClicked", "false");
                        this.showStyle = false;
                        this.activeMenu = 'AtPar';
                        this.leftbaranimationService.isHide();
                        this.leftbaranimationService.isHomeClicked = false;
                        localStorage.removeItem('activateLeftBarMenu');
                        localStorage.removeItem('ActiveGroup');
                        localStorage.setItem('isAtParDashboard', 'YES');
                        setTimeout(function () {
                            _this.breadCrumbSubMenuName = "";
                            _this.breadCrumbPrvsMenuName = "";
                            _this.breadCrumbMenuName = "";
                            _this.breadCrumbAppName = "";
                            _this.breadCrumbAppName = 'My Profile';
                            _this.breadCrumbGroupName = '';
                            _this.breadCrumbsubGroupName = '';
                            localStorage.setItem("appName", _this.breadCrumbAppName);
                            localStorage.setItem("breadSubMenuName", '');
                            localStorage.setItem("breadMenuName", '');
                        }, 5);
                        this.currentLocation = "myprofile";
                        return [2 /*return*/];
                }
            });
        });
    };
    TopBarComponent.prototype.onChangepasswordClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, div;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currentLocation == "changepassword")) return [3 /*break*/, 2];
                        this.router.navigate(['atpar/sameurl']);
                        return [4 /*yield*/, setTimeout(function () {
                                _this.router.navigate(['atpar/changepassword']);
                            }, 1)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        this.title.setTitle("changepassword");
                        return [4 /*yield*/, this.router.navigate(['atpar/changepassword'])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        for (i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                            div = document.getElementsByClassName('breadcrumb')[i];
                            div.setAttribute("style", "padding-left:" + "0px");
                        }
                        localStorage.setItem("IsClicked", "false");
                        this.showStyle = false;
                        this.activeMenu = 'AtPar';
                        this.leftbaranimationService.isHide();
                        this.leftbaranimationService.isHomeClicked = false;
                        localStorage.removeItem('activateLeftBarMenu');
                        localStorage.removeItem('ActiveGroup');
                        localStorage.setItem('isAtParDashboard', 'YES');
                        return [4 /*yield*/, setTimeout(function () {
                                _this.breadCrumbSubMenuName = "";
                                _this.breadCrumbPrvsMenuName = "";
                                _this.breadCrumbMenuName = "";
                                _this.breadCrumbAppName = "";
                                _this.breadCrumbGroupName = '';
                                _this.breadCrumbsubGroupName = '';
                                _this.breadCrumbAppName = 'Change Password';
                                localStorage.setItem("appName", _this.breadCrumbAppName);
                                localStorage.setItem("breadSubMenuName", '');
                                localStorage.setItem("breadMenuName", '');
                            }, 5)];
                    case 5:
                        _a.sent();
                        this.currentLocation = "changepassword";
                        return [2 /*return*/];
                }
            });
        });
    };
    TopBarComponent.prototype.onDownloadsClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, div;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (i = 0; i < document.getElementsByClassName('breadcrumb').length; i++) {
                            div = document.getElementsByClassName('breadcrumb')[i];
                            div.setAttribute("style", "padding-left:" + "0px");
                        }
                        localStorage.setItem("IsClicked", "false");
                        this.showStyle = false;
                        this.activeMenu = 'AtPar';
                        this.leftbaranimationService.isHide();
                        this.leftbaranimationService.isHomeClicked = false;
                        localStorage.removeItem('activateLeftBarMenu');
                        localStorage.removeItem('ActiveGroup');
                        localStorage.setItem('isAtParDashboard', 'YES');
                        return [4 /*yield*/, setTimeout(function () {
                                _this.breadCrumbSubMenuName = "";
                                _this.breadCrumbPrvsMenuName = "";
                                _this.breadCrumbMenuName = "";
                                _this.breadCrumbAppName = "";
                                _this.breadCrumbGroupName = '';
                                _this.breadCrumbsubGroupName = '';
                                _this.breadCrumbAppName = 'Downloads';
                                localStorage.setItem("appName", _this.breadCrumbAppName);
                                localStorage.setItem("breadSubMenuName", '');
                                localStorage.setItem("breadMenuName", '');
                            }, 5)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TopBarComponent.prototype.onLoginClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.msgs = [];
                        return [4 /*yield*/, this.confirmationService.confirm({
                                message: 'Are you sure you want to redirect to login page ?',
                                accept: function () {
                                    _this.router.navigate(['atpar/sameurl']);
                                    setTimeout(function () {
                                        _this.httpService.clearAppSession();
                                        _this.router.navigate(['login']);
                                    }, 1);
                                },
                                reject: function () {
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TopBarComponent.prototype.OnDestroy = function () {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.menu = null;
        this.activeddName = null;
        this.showStyle = null;
        this.activeMenu = null;
        this.displayAboutDialog = null;
        this.displayHelpDialog = null;
        this.atParVersions = null;
        this._deviceTokenEntry = null;
        this.user = null;
        this.msgs = null;
        this.clickCount = null;
        this.lstTestList = null;
        this.lstMenuList = null;
        this.lstMenus = null;
        this.lstMainlist = null;
        this.lstMenuList1 = null;
        this.groupModules = null;
        this.appGroups = null;
        this.appModules = null;
        this.selectedMenu = null;
        this.selectedGroup = null;
        this.currentLocation = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TopBarComponent.prototype, "activeddName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TopBarComponent.prototype, "Menu", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TopBarComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TopBarComponent.prototype, "filteredData", void 0);
    TopBarComponent = __decorate([
        core_1.Component({
            selector: 'topbar-cmp',
            templateUrl: 'topbar.component.html',
            providers: [
                HttpService_1.HttpService,
                AtParConstants_1.AtParConstants,
                api_1.ConfirmationService
            ]
        }),
        __param(8, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [router_1.Router,
            leftbar_animation_service_1.LeftBarAnimationService,
            event_spinner_service_1.SpinnerService,
            HttpService_1.HttpService,
            platform_browser_1.Title,
            AtParConstants_1.AtParConstants,
            router_1.ActivatedRoute,
            api_1.ConfirmationService, Object])
    ], TopBarComponent);
    return TopBarComponent;
}());
exports.TopBarComponent = TopBarComponent;
//# sourceMappingURL=topbar.component.js.map