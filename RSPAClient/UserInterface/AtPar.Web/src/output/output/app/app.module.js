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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var router_2 = require("@angular/router");
var HttpService_1 = require("./Shared/HttpService");
var tkitHttpService_1 = require("./Shared/tkitHttpService");
var app_component_1 = require("./app.component");
var atpar_page_not_found_component_1 = require("./AtPar/atpar-page-not-found.component");
var app_routing_module_1 = require("./app-routing.module");
var shared_module_1 = require("./Shared/shared.module");
var spinner_module_1 = require("./components/spinner/spinner.module");
var izendaintegrate_1 = require("./_helpers/izendaintegrate");
var AtParEnums_1 = require("./Shared/AtParEnums");
var routepath_1 = require("./AtPar/Menus/routepath");
var AtParConstants_1 = require("./Shared/AtParConstants");
var index_1 = require("./export/index");
var event_spinner_service_1 = require("./components/spinner/event.spinner.service");
var AppModule = (function () {
    function AppModule(title, router, spinnerService, activatedRoute, platformLocation, atParConstant, httpService, tkitHttpService) {
        this.title = title;
        this.router = router;
        this.spinnerService = spinnerService;
        this.activatedRoute = activatedRoute;
        this.platformLocation = platformLocation;
        this.atParConstant = atParConstant;
        this.httpService = httpService;
        this.tkitHttpService = tkitHttpService;
        this._deviceTokenEntry = [];
        this.breadCrumbMenu = new routepath_1.Menus();
        this.routerCounter = 0;
        this.subscribePlatformLocationEvents();
        this.subscribeRouterEvents();
    }
    AppModule.prototype.getTabSession = function () {
        try {
            if (sessionStorage.getItem('isRefreshTab') != null && sessionStorage.getItem('isRefreshTab') != null != undefined && sessionStorage.getItem('isRefreshTab') != '') {
                if (sessionStorage.getItem('isRefreshTab') == AtParEnums_1.YesNo_Enum.Y.toString()) {
                    var sessionItems = [];
                    if (sessionStorage.getItem('localStorageItems') != null && sessionStorage.getItem('localStorageItems') != undefined && sessionStorage.getItem('localStorageItems') != '') {
                        sessionItems = JSON.parse(sessionStorage.getItem('localStorageItems'));
                        var keys = Object.keys(sessionItems);
                        var i = keys.length;
                        while (i--) {
                            localStorage.setItem(sessionItems[keys[i]].key, sessionItems[keys[i]].value);
                        }
                    }
                    if (sessionStorage.getItem('sessionStorageItems') != null && sessionStorage.getItem('sessionStorageItems') != undefined && sessionStorage.getItem('sessionStorageItems') != '') {
                        sessionItems = JSON.parse(sessionStorage.getItem('sessionStorageItems'));
                        keys = Object.keys(sessionItems);
                        i = keys.length;
                        while (i--) {
                            sessionStorage.setItem(sessionItems[keys[i]].key, sessionItems[keys[i]].value);
                        }
                    }
                }
            }
            else {
                if (this.router.url.indexOf('/trackit') != 0) {
                    if (localStorage.getItem('appTabCount') != null && localStorage.getItem('appTabCount') != undefined && localStorage.getItem('appTabCount') != '') {
                        if (parseInt(localStorage.getItem('appTabCount')) == 0) {
                            this.httpService.clearAppSession();
                        }
                        else {
                        }
                    }
                    else {
                        this.httpService.clearAppSession();
                    }
                }
                else {
                    if (localStorage.getItem('tkitAppTabCount') != null && localStorage.getItem('tkitAppTabCount') != undefined && localStorage.getItem('tkitAppTabCount') != '') {
                        if (parseInt(localStorage.getItem('tkitAppTabCount')) == 0) {
                            this.tkitHttpService.clearAppSession();
                        }
                        else {
                        }
                    }
                    else {
                        this.tkitHttpService.clearAppSession();
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'getTabSession');
        }
    };
    AppModule.prototype.subscribePlatformLocationEvents = function () {
        try {
            this.platformLocation.onPopState(function (event) {
                history.forward();
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'subscribePlatformLocationEvents');
        }
    };
    AppModule.prototype.subscribeRouterEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getTabSession()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.router.events.subscribe(function (event) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (event instanceof router_1.NavigationStart) {
                                        if (event.url.indexOf('/trackit') != 0) {
                                            this.onSubscribeAtParNavigationStart(event);
                                        }
                                        else {
                                            this.onSubscribeTrackITNavigationStart(event);
                                        }
                                    }
                                    else if (event instanceof router_1.RoutesRecognized) {
                                    }
                                    else if (event instanceof router_1.NavigationEnd) {
                                        if (event.url.indexOf('/trackit') != 0) {
                                            this.onSubscribeAtParNavigationEnd(event);
                                        }
                                        else {
                                            this.onSubscribeTrackITNavigationEnd(event);
                                        }
                                        this.resetVariables();
                                    }
                                    else if (event instanceof router_1.NavigationCancel) {
                                        this.resetVariables();
                                    }
                                    else if (event instanceof router_1.NavigationError) {
                                        this.resetVariables();
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'subscribeRouterEvents');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppModule.prototype.onSubscribeAtParNavigationStart = function (event) {
        try {
            if (localStorage.getItem('DeviceTokenEntry') != null && localStorage.getItem('DeviceTokenEntry') != undefined) {
                this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            }
            if (this.routerCounter == 0) {
                this.routerCounter = 1;
                if (localStorage.getItem('DeviceTokenEntry') == null || localStorage.getItem('DeviceTokenEntry') == undefined) {
                    if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                        this.router.navigate(['login']);
                    }
                }
                else {
                    if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] == null || this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] == undefined || this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] == '') {
                        if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                            this.router.navigate(['login']);
                        }
                    }
                    else {
                        if (event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                            if (event.id != 1) {
                                if (event.url == '/pagenotfound' || event.url == '/forgot-password' || event.url == '/login' || event.url.startsWith('/login?systemid=') || event.url == '/') {
                                    this.router.navigate(['atpar']);
                                }
                                else if (event.url != '/atpar') {
                                    localStorage.setItem('isAtParDashboard', 'NO');
                                }
                            }
                            else {
                                if (event.url == '/pagenotfound' || event.url == '/forgot-password' || event.url == '/login' || event.url.startsWith('/login?systemid=') || event.url == '/') {
                                    this.httpService.clearAppSession();
                                }
                                else {
                                    if (event.url != '/atpar') {
                                        localStorage.setItem('isAtParDashboard', 'NO');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'onSubscribeAtParNavigationStart');
        }
    };
    AppModule.prototype.onSubscribeTrackITNavigationStart = function (event) {
        try {
            if (localStorage.getItem('tkitDeviceTokenEntry') != null && localStorage.getItem('tkitDeviceTokenEntry') != undefined) {
                this._deviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
            }
            if (this.routerCounter == 0) {
                this.routerCounter = 1;
                if (localStorage.getItem('tkitDeviceTokenEntry') == null || localStorage.getItem('tkitDeviceTokenEntry') == undefined) {
                    if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                        this.router.navigate(['trackitlogin']);
                    }
                }
                else {
                    if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] == null || this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] == undefined || this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID] == '') {
                        if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && event.url != '/trackitlogin' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                            this.router.navigate(['trackitlogin']);
                        }
                    }
                    else {
                        if (event.url != '/pagenotfound' && event.url != '/forgot-password' && event.url != '/login' && !event.url.startsWith('/login?systemid=') && event.url != '/' && !event.url.startsWith('/deliverytracking') && !event.url.startsWith("/viewer/reportpart/") && !event.url.startsWith("/report/view/") && !event.url.startsWith("/dashboard/view/")) {
                            if (event.id != 1) {
                                if (!event.url.startsWith('/trackitdashboard') || event.url == '/trackitlogin') {
                                    this.router.navigate(['trackitdashboard']);
                                }
                            }
                            else {
                                if (event.url == '/trackitlogin') {
                                    this.tkitHttpService.clearAppSession();
                                }
                            }
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'onSubscribeTrackITNavigationStart');
        }
    };
    AppModule.prototype.onSubscribeAtParNavigationEnd = function (event) {
        var _this = this;
        try {
            var subMenu_1 = new routepath_1.Menus();
            //var appName: string = localStorage.getItem('activeGroupModuleName');
            var menuItems = JSON.parse(localStorage.getItem('MenuList'));
            if (event.url != '/atpar') {
                if (menuItems != null && menuItems != undefined) {
                    var _loop_1 = function () {
                        if (event.url.indexOf(menuItems[i].ROUTE) >= 0) {
                            subMenu_1 = menuItems[i];
                            if (subMenu_1.ROUTE == 'reports/viewreport') {
                                //let urlsplit = event.url.split('?');
                                //if (urlsplit[0] == '/atpar/reports/viewreport') {
                                //    event.url = subMenu.ROUTE;
                                //}
                                var reportId_1 = JSON.parse(localStorage.getItem('reportID'));
                                var freports = menuItems.filter(function (x) { return x.REPORT_ID == reportId_1; });
                                if (freports != null && freports.length > 0) {
                                    subMenu_1 = freports[0];
                                }
                                else {
                                    subMenu_1 = JSON.parse(localStorage.getItem('submenu'));
                                }
                            }
                            localStorage.setItem('submenu', JSON.stringify(subMenu_1));
                            localStorage.setItem("bcMenu", JSON.stringify(subMenu_1));
                            return "break";
                        }
                    };
                    for (var i = 0; i < menuItems.length; i++) {
                        var state_1 = _loop_1();
                        if (state_1 === "break")
                            break;
                    }
                    // localStorage.setItem("leftMenuUrl", subGroupMenu.ROUTE);
                    if (subMenu_1 != null && subMenu_1 != undefined && subMenu_1.MENU_NAME != null) {
                        this.title.setTitle(subMenu_1.MENU_NAME);
                    }
                    this.activatedRoute.queryParams.subscribe(function (params) {
                        if (Object.keys(params).length == 0) {
                            if (!(event.url.indexOf('/myprofile') >= 0 || event.url.indexOf('/changepassword') >= 0 || event.url.indexOf('/downloads') >= 0)) {
                                if (subMenu_1 != null && subMenu_1 != undefined) {
                                    _this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(subMenu_1));
                                }
                            }
                            else {
                                if (event.url.indexOf('/myprofile') >= 0) {
                                    _this.breadCrumbMenu.MENU_NAME = "";
                                    _this.breadCrumbMenu.ROUTE = '';
                                    _this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    _this.breadCrumbMenu.APP_NAME = 'My Profile';
                                    _this.breadCrumbMenu.IS_DIV = true;
                                    _this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(_this.breadCrumbMenu));
                                }
                                else if (event.url.indexOf('/changepassword') >= 0) {
                                    _this.breadCrumbMenu.MENU_NAME = "";
                                    _this.breadCrumbMenu.ROUTE = '';
                                    _this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    _this.breadCrumbMenu.APP_NAME = 'Change Password';
                                    _this.breadCrumbMenu.IS_DIV = true;
                                    _this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(_this.breadCrumbMenu));
                                }
                                else if (event.url.indexOf('/downloads') >= 0) {
                                    _this.breadCrumbMenu.MENU_NAME = "";
                                    _this.breadCrumbMenu.ROUTE = '';
                                    _this.breadCrumbMenu.SUB_MENU_NAME = '';
                                    _this.breadCrumbMenu.APP_NAME = 'Downloads';
                                    _this.breadCrumbMenu.IS_DIV = true;
                                    _this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(_this.breadCrumbMenu));
                                }
                            }
                        }
                        else if (localStorage.getItem('localBreadCrumb') != undefined && localStorage.getItem('localBreadCrumb') != null) {
                            _this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(JSON.parse(localStorage.getItem('localBreadCrumb'))));
                            setTimeout(function () {
                                localStorage.removeItem('localBreadCrumb');
                            }, 5);
                        }
                    });
                }
            }
            else {
                this.title.setTitle('Dashboard');
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'onSubscribeAtParNavigationEnd');
        }
    };
    AppModule.prototype.onSubscribeTrackITNavigationEnd = function (event) {
    };
    AppModule.prototype.resetVariables = function () {
        try {
            this.routerCounter = 0;
            this._deviceTokenEntry = [];
            window.history.pushState([], null, null);
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'resetVariables');
        }
    };
    AppModule.prototype.clientErrorMsg = function (ex, funName) {
        var msgs = [];
        this.atParConstant.catchClientError(msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                router_1.RouterModule,
                shared_module_1.SharedModule.forRoot(),
                spinner_module_1.SpinnerModule,
                app_routing_module_1.AppRoutingModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                atpar_page_not_found_component_1.PageNotFoundComponent,
                index_1.ExportReportComponent,
                index_1.ExportReportViewerComponent,
                index_1.ExportDashboardViewerComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                platform_browser_1.Title,
                HttpService_1.HttpService,
                izendaintegrate_1.IzendaIntegrate,
                AtParConstants_1.AtParConstants,
                { provide: common_1.APP_BASE_HREF, useValue: '/AtPar/AtParWeb/' },
                { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
                event_spinner_service_1.SpinnerService,
                tkitHttpService_1.TkitHttpService
            ]
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title,
            router_1.Router,
            event_spinner_service_1.SpinnerService,
            router_2.ActivatedRoute,
            common_1.PlatformLocation,
            AtParConstants_1.AtParConstants,
            HttpService_1.HttpService,
            HttpService_1.HttpService])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map