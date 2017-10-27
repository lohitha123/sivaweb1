webpackJsonp([17],{

/***/ 1371:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\" >\r\n    <div class=\"content\">\r\n        <div class=\"page-content-wrapper\">\r\n            <div class=\"container X_panel no_border\">\r\n              <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:10px;\">\r\n                        <div class=\"col-md-12\">\r\n                            <form class=\"form-horizontal form-label-left\">\r\n                                <div class=\"form-group\">\r\n                                    <!--<div class=\"loader\" id=\"progressLoader\"> </div>-->\r\n                                    <div class=\"izenda-container\" id=\"izenda-root\"></div>\r\n                                </div>\r\n\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 1662:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(32);
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
var platform_browser_1 = __webpack_require__(58);
var AtParEnums_1 = __webpack_require__(14);
var ViewPouReport = (function () {
    function ViewPouReport(route, domSanitizer) {
        this.route = route;
        this.domSanitizer = domSanitizer;
        //this.URL ="http://localhost/AtPar/web/login.aspx"
    }
    ViewPouReport.prototype.ngOnInit = function () {
        console.log(localStorage.getItem('menuName').toString());
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        var devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        //'pou_Preference_Card_Optimization
        //
        //let reportParam: string = window.location.protocol + "//" + window.location.hostname + "/AtPar/Web/" + encodeURIComponent('pou_Preference_Card_Optimization.aspx')
        var reportParam = window.location.protocol + "//" + window.location.hostname + "/AtPar/Web/" + encodeURIComponent(localStorage.getItem('menuCode'))
            + '?UserId=' + encodeURIComponent(devicetoken[AtParEnums_1.TokenEntry_Enum.UserID])
            + '&UserPwd=' + encodeURIComponent(localStorage.getItem("UserLoginPwd"))
            + '&SystemId=' + encodeURIComponent(devicetoken[AtParEnums_1.TokenEntry_Enum.SystemId])
            + '&strMenuCode=' + encodeURIComponent(localStorage.getItem('menuCode'));
        console.log(reportParam);
        this.page = this.domSanitizer.bypassSecurityTrustResourceUrl(reportParam);
    };
    return ViewPouReport;
}());
ViewPouReport = __decorate([
    core_1.Component({
        template: __webpack_require__(2152)
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, platform_browser_1.DomSanitizer])
], ViewPouReport);
exports.ViewPouReport = ViewPouReport;


/***/ }),

/***/ 1663:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
// let IzendaSynergy = require("../izenda/izenda_ui");
var AtParEnums_1 = __webpack_require__(14);
var izendaintegrate_1 = __webpack_require__(326);
var IzendaSynergy = __webpack_require__(169);
var event_spinner_service_1 = __webpack_require__(24);
var platform_browser_1 = __webpack_require__(58);
var CustomReportComponent = (function () {
    function CustomReportComponent(izItergrate, route, router, spinnerService, title) {
        this.izItergrate = izItergrate;
        this.route = route;
        this.router = router;
        this.spinnerService = spinnerService;
        this.title = title;
        this.dom = {};
        this.firstName = '';
        this.lastName = '';
        this.MiddleInitial = '';
        this.fullUserId = '';
        this.chVal = "Custom Report Viewer";
    }
    CustomReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.reportID = params['id'];
        });
    };
    CustomReportComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var filtersObj;
        var btwdates = "";
        var app;
        this.route.params.subscribe(function (params) {
            _this.reportID = params['id'];
        });
        this.route.queryParams.subscribe(function (params) {
            app = params["p1value"];
        });
        debugger;
        if (app != AtParEnums_1.EnumApps.CartCount) {
            this.route.queryParams.subscribe(function (params) {
                _this.userId = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                _this.orgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                _this.date1 = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                _this.firstName = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                _this.lastName = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                _this.MiddleInitial = decodeURI(params["p7value"]).replace(/%20/g, ' ');
            });
            this.fullUserId = this.firstName + ' ' + this.MiddleInitial + ' ' + this.lastName + ' (' + this.userId + '  )';
            this.fromdate = new Date(this.date1).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            if (app == AtParEnums_1.EnumApps.PickPlan || app == AtParEnums_1.EnumApps.CycleCount || app == AtParEnums_1.EnumApps.PutAway) {
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue": {
                        p1value: app,
                        p2value: 'I',
                        p3value: '1;#11;#10',
                        p4value: this.orgGrpId,
                        p5value: this.fullUserId,
                        p6value: '',
                        p7value: this.fromdate
                    }
                };
            }
            else if (app == AtParEnums_1.EnumApps.AssetManagement) {
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue": {
                        p1value: 'I',
                        p2value: '1;#8;#13;#10',
                        p3value: app,
                        p4value: this.orgGrpId,
                        p5value: this.fullUserId,
                        p6value: '',
                        p7value: this.fromdate
                    }
                };
            }
            else if (app == AtParEnums_1.EnumApps.Receiving) {
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue": {
                        p1value: app,
                        p2value: '1;#11;#10',
                        p3value: 'I',
                        p4value: this.orgGrpId,
                        p5value: this.fullUserId,
                        p6value: '',
                        p7value: this.fromdate
                    }
                };
            }
            else if (app == AtParEnums_1.EnumApps.Deliver) {
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue": {
                        p1value: '20;#30;#40;#50',
                        p2value: this.orgGrpId,
                        p3value: this.fullUserId,
                        p4value: '',
                        p5value: this.fromdate
                    }
                };
            }
            else if (app == AtParEnums_1.EnumApps.StockIssue) {
                filtersObj = {
                    "filters": [],
                    "overridingFilterValue": {
                        p1value: app,
                        p2value: 'I',
                        p3value: this.orgGrpId,
                        p4value: this.fullUserId,
                        p5value: '',
                        p6value: this.fromdate
                    }
                };
            }
        }
        else if (app == AtParEnums_1.EnumApps.CartCount) {
            if (this.reportID.toLowerCase() == '76d18002-133b-4498-a0f4-1fa6325cf768'.toLowerCase() || this.reportID.toLowerCase() == '8165ee4b-b4ea-4e38-9ea4-81f7901ba45c'.toLowerCase()) {
                this.route.queryParams.subscribe(function (params) {
                    _this.userId = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                    _this.orgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                    _this.date1 = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                    _this.firstName = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                    _this.lastName = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                    _this.MiddleInitial = decodeURI(params["p7value"]).replace(/%20/g, ' ');
                });
                this.fullUserId = this.firstName + ' ' + this.MiddleInitial + ' ' + this.lastName + ' (' + this.userId + '  )';
                this.fromdate = new Date(this.date1).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                ;
                if (this.reportID.toLowerCase() == '76d18002-133b-4498-a0f4-1fa6325cf768'.toLowerCase()) {
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue": {
                            p1value: '2',
                            p2value: '11',
                            p3value: 'I',
                            p4value: this.orgGrpId,
                            p5value: this.fullUserId,
                            p6value: this.fromdate
                        }
                    };
                }
                else if (this.reportID.toLowerCase() == '8165ee4b-b4ea-4e38-9ea4-81f7901ba45c'.toLowerCase()) {
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue": {
                            p1value: '2',
                            p2value: 'I',
                            p3value: '1;#10;#11;#4;#7;#13',
                            p4value: this.orgGrpId,
                            p5value: this.fullUserId,
                            p6value: '',
                            p7value: this.fromdate
                        }
                    };
                }
            }
            else if (this.reportID.toLowerCase() == '2dd12a40-bd86-4a93-bcd6-b12bea128aad'.toLowerCase()) {
                this.route.queryParams.subscribe(function (params) {
                    _this.bussinesUnit = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                    _this.orgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                    _this.date1 = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                    _this.date2 = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                    _this.cartId = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                });
                this.fromdate = new Date(this.date1).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                ;
                this.todate = new Date(this.date2).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                ;
                if (this.reportID.toLowerCase() == '2dd12a40-bd86-4a93-bcd6-b12bea128aad'.toLowerCase()) {
                    btwdates = this.fromdate + ';#' + this.todate;
                    // btwdates = 
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue": {
                            p1value: '2',
                            p2value: '11',
                            p3value: this.orgGrpId,
                            p4value: this.bussinesUnit,
                            p5value: this.cartId,
                            p6value: btwdates
                        }
                    };
                }
            }
            else if (this.reportID.toLowerCase() == 'ff2dd25b-6a6c-4ac1-a6ce-01d89c80322a'.toLowerCase()) {
                this.route.queryParams.subscribe(function (params) {
                    _this.cartId = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                    _this.orgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                    _this.date1 = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                    _this.bussinesUnit = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                });
                if (this.reportID.toLowerCase() == 'ff2dd25b-6a6c-4ac1-a6ce-01d89c80322a'.toLowerCase()) {
                    this.fromdate = new Date(this.date1).toLocaleDateString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                    ;
                    filtersObj = {
                        "filters": [],
                        "overridingFilterValue": {
                            p1value: '2',
                            p2value: 'I',
                            p3value: this.orgGrpId,
                            p4value: this.bussinesUnit,
                            p5value: this.cartId,
                            p6value: '',
                            p7value: this.fromdate,
                            p8value: ''
                        }
                    };
                }
            }
        }
        // debugger;
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (this.reportID != null && this.reportID != "null" && this.reportID != "undefined") {
            if (this.reportID != "null") {
                this.izItergrate.RenderReportCustomizedViewer(this.reportID, filtersObj);
                //this.router.navigate(['atpar/reports/customroute2']);
            }
            else {
                // Dummy report Id to show report does not exsists
                this.dom = this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }
        }
        else {
            // Dummy report Id to show report does not exsists
            this.dom = this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
        var menuItems = JSON.parse(localStorage.getItem('MenuList'));
        var submenu;
        submenu = menuItems.filter(function (x) { return x.REPORT_ID != null && x.REPORT_ID.toLowerCase() == _this.reportID.toLowerCase(); });
        if (submenu != null && submenu.length > 0) {
            this.title.setTitle(submenu[0].MENU_NAME);
            localStorage.setItem('bcMenu', submenu[0]);
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(submenu[0]));
        }
        // this.izItergrate.RenderReportCustomizedViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56", filtersObj);
    };
    CustomReportComponent.prototype.ngOnDestroy = function () {
        this.izItergrate.DestroyDom(this.dom);
    };
    return CustomReportComponent;
}());
CustomReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1371),
        providers: [platform_browser_1.Title]
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate, router_1.ActivatedRoute, router_1.Router, event_spinner_service_1.SpinnerService, platform_browser_1.Title])
], CustomReportComponent);
exports.CustomReportComponent = CustomReportComponent;


/***/ }),

/***/ 1664:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
//let IzendaSynergy = require("../izenda/izenda_ui");
var IzendaSynergy = __webpack_require__(169);
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.currentUserContext = {};
        this.chVal = "DashboardList";
    }
    DashboardComponent.prototype.ngAfterViewInit = function () {
        //this.currentUserContext = { token: "4sl1Fd78wsfHajxJN+9S+ewGi9L2ZnD+aLRkvMGJRURvPoeXiAppU6qv3IZ658zlz8KDR2aSCX7HppEvUbp5YA==" };
        //IzendaSynergy.setCurrentUserContext(this.currentUserContext);
        IzendaSynergy.renderDashboardPage(document.getElementById('izenda-root'));
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;


/***/ }),

/***/ 1665:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
//let IzendaSynergy = require("../izenda/izenda_ui");
var IzendaSynergy = __webpack_require__(169);
var DashboardDesignerComponent = (function () {
    function DashboardDesignerComponent() {
        this.currentUserContext = {};
        this.chVal = "DashboardDesigner";
    }
    DashboardDesignerComponent.prototype.ngAfterViewInit = function () {
        //this.currentUserContext = { token: "4sl1Fd78wsfHajxJN+9S+ewGi9L2ZnD+aLRkvMGJRURvPoeXiAppU6qv3IZ658zlz8KDR2aSCX7HppEvUbp5YA==" };
        //IzendaSynergy.setCurrentUserContext(this.currentUserContext);
        IzendaSynergy.renderNewDashboardPage(document.getElementById('izenda-root'));
    };
    return DashboardDesignerComponent;
}());
DashboardDesignerComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [])
], DashboardDesignerComponent);
exports.DashboardDesignerComponent = DashboardDesignerComponent;


/***/ }),

/***/ 1666:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
// let IzendaSynergy = require("../izenda/izenda_ui");
var izendaintegrate_1 = __webpack_require__(326);
var DashboardViewer = (function () {
    function DashboardViewer(izItergrate) {
        this.izItergrate = izItergrate;
    }
    DashboardViewer.prototype.ngAfterViewInit = function () {
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (localStorage.getItem('reportID') != null && localStorage.getItem('reportID') != "null" && localStorage.getItem('reportID') != "undefined") {
            this.reportID = localStorage.getItem('reportID');
            if (this.reportID != "null") {
                this.izItergrate.RenderDashboardViewer(this.reportID);
            }
            else {
                // Dummy report Id to show report does not exsists
                this.izItergrate.RenderDashboardViewer("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }
        }
        else {
            // Dummy report Id to show report does not exsists
            this.izItergrate.RenderDashboardViewer("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
    };
    return DashboardViewer;
}());
DashboardViewer = __decorate([
    core_1.Component({
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate])
], DashboardViewer);
exports.DashboardViewer = DashboardViewer;


/***/ }),

/***/ 1667:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var izendaintegrate_1 = __webpack_require__(326);
var ReportCustomFilterComponent = (function () {
    function ReportCustomFilterComponent(izItergrate) {
        this.izItergrate = izItergrate;
    }
    ReportCustomFilterComponent.prototype.ngAfterViewInit = function () {
        this.izItergrate.RenderReportCustomizedFilterViewer();
    };
    return ReportCustomFilterComponent;
}());
ReportCustomFilterComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate])
], ReportCustomFilterComponent);
exports.ReportCustomFilterComponent = ReportCustomFilterComponent;


/***/ }),

/***/ 1668:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var izendaintegrate_1 = __webpack_require__(326);
var ReportDesignerComponent = (function () {
    function ReportDesignerComponent(izItergrate) {
        this.izItergrate = izItergrate;
        this.dom = {};
        this.chVal = "ReportDesigner";
    }
    ReportDesignerComponent.prototype.ngAfterViewInit = function () {
        this.dom = this.izItergrate.RenderReportDesigner();
    };
    ReportDesignerComponent.prototype.ngOnDestroy = function () {
        this.izItergrate.DestroyDom(this.dom);
    };
    return ReportDesignerComponent;
}());
ReportDesignerComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate])
], ReportDesignerComponent);
exports.ReportDesignerComponent = ReportDesignerComponent;


/***/ }),

/***/ 1669:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var izendaintegrate_1 = __webpack_require__(326);
var ReportComponent = (function () {
    function ReportComponent(izItergrate) {
        this.izItergrate = izItergrate;
        this.chVal = "ReportList";
    }
    ReportComponent.prototype.ngAfterViewInit = function () {
        this.izItergrate.RenderReportList();
    };
    return ReportComponent;
}());
ReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate])
], ReportComponent);
exports.ReportComponent = ReportComponent;


/***/ }),

/***/ 1670:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var izendaintegrate_1 = __webpack_require__(326);
var ReportPartComponent = (function () {
    function ReportPartComponent(izItergrate) {
        this.izItergrate = izItergrate;
    }
    ReportPartComponent.prototype.ngAfterViewInit = function () {
        this.izItergrate.RenderReportParts();
    };
    return ReportPartComponent;
}());
ReportPartComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2154)
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate])
], ReportPartComponent);
exports.ReportPartComponent = ReportPartComponent;


/***/ }),

/***/ 1671:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ReportsComponent = (function () {
    function ReportsComponent() {
    }
    return ReportsComponent;
}());
ReportsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(2153)
    })
], ReportsComponent);
exports.ReportsComponent = ReportsComponent;


/***/ }),

/***/ 1672:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var izendaintegrate_1 = __webpack_require__(326);
var SettingsComponent = (function () {
    // dom: any = {};
    function SettingsComponent(izItergrate) {
        this.izItergrate = izItergrate;
        this.chVal = "Settings";
        this.izItergrate.DoIzendaConfig();
        //  this.izItergrate.DoIzendaConfig();
    }
    SettingsComponent.prototype.ngOnInit = function () {
        // alert("Hi ReportSettingComponent");
    };
    SettingsComponent.prototype.ngAfterViewInit = function () {
        // this.dom = this.izItergrate.RenderIzendaSettings();
        this.izItergrate.RenderIzendaSettings();
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        // this.izItergrate.DestroyDom(this.dom);
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    core_1.Component({
        //templateUrl: 'rootcontainer.html'
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;


/***/ }),

/***/ 1673:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
// let IzendaSynergy = require("../izenda/izenda_ui");
var izendaintegrate_1 = __webpack_require__(326);
var ReportViewerComponent = (function () {
    function ReportViewerComponent(izItergrate, route, router) {
        this.izItergrate = izItergrate;
        this.route = route;
        this.router = router;
        this.chVal = "Report Viewer";
    }
    ReportViewerComponent.prototype.ngOnInit = function () {
        //    this.route.queryParams.subscribe(params => {
        //    this.reportID = params["reportID"];
        //  this.appId = params["appId"];
        //});
    };
    ReportViewerComponent.prototype.ngAfterViewInit = function () {
        //   debugger;
        var filtersObj = {
            "filters": [],
            "overridingFilterValue": {
                p1value: '2;#6',
                p2value: 'Cart Count'
            }
        };
        //this.izItergrate.RenderReportViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56");
        this.izItergrate.RenderReportCustomizedViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56", filtersObj);
    };
    return ReportViewerComponent;
}());
ReportViewerComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate, router_1.ActivatedRoute, router_1.Router])
], ReportViewerComponent);
exports.ReportViewerComponent = ReportViewerComponent;


/***/ }),

/***/ 1674:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
// let IzendaSynergy = require("../izenda/izenda_ui");
var izendaintegrate_1 = __webpack_require__(326);
var viewDashboardComponent = (function () {
    function viewDashboardComponent(izItergrate, route, router) {
        this.izItergrate = izItergrate;
        this.route = route;
        this.router = router;
        this.dom = {};
        this.chVal = "Dashboard Viewer";
    }
    viewDashboardComponent.prototype.ngOnInit = function () {
        //this.route.queryParams.subscribe(params => {
        //    this.reportID = params["reportID"];
        //   // this.appId = params["appId"];
        //});
    };
    viewDashboardComponent.prototype.ngAfterViewInit = function () {
        //let filtersObj: any = {
        //    "filters": [],
        //    "overridingFilterValue":
        //    {  // filter object to pass to api
        //        p1value: '2;#6',            // override filter value at position 1 which is applying on current report, change >30 to >50
        //        p2value: 'Cart Count'
        //    }
        //};
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (localStorage.getItem('reportID') != null && localStorage.getItem('reportID') != "null" && localStorage.getItem('reportID') != "undefined") {
            this.reportID = localStorage.getItem('reportID');
            if (this.reportID != "null") {
                this.izItergrate.RenderNewDashboard(this.reportID);
            }
            else {
                // Dummy report Id to show report does not exsists
                this.izItergrate.RenderNewDashboard("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }
        }
        else {
            // Dummy report Id to show report does not exsists
            this.dom = this.izItergrate.RenderNewDashboard("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
    };
    return viewDashboardComponent;
}());
viewDashboardComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate, router_1.ActivatedRoute, router_1.Router])
], viewDashboardComponent);
exports.viewDashboardComponent = viewDashboardComponent;


/***/ }),

/***/ 1675:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
// let IzendaSynergy = require("../izenda/izenda_ui");
var izendaintegrate_1 = __webpack_require__(326);
var platform_browser_1 = __webpack_require__(58);
var ViewReportComponent = (function () {
    function ViewReportComponent(izItergrate, route, router, title) {
        this.izItergrate = izItergrate;
        this.route = route;
        this.router = router;
        this.title = title;
        this.dom = {};
        this.chVal = "Report Viewer";
    }
    ViewReportComponent.prototype.ngOnInit = function () {
        //this.route.queryParams.subscribe(params => {
        //    this.reportID = params["reportID"];
        //   // this.appId = params["appId"];
        //});
        var menuName = localStorage.getItem("menuName");
        this.title.setTitle(menuName);
    };
    ViewReportComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var filtersObj = {
            "filters": [],
            "overridingFilterValue": {
                p1value: '2;#6',
                p2value: 'Cart Count'
            }
        };
        debugger;
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (localStorage.getItem('reportID') != null && localStorage.getItem('reportID') != "null" && localStorage.getItem('reportID') != "undefined") {
            this.reportID = localStorage.getItem('reportID');
            if (this.reportID != "null") {
                this.dom = this.izItergrate.RenderNewReport(this.reportID);
            }
            else {
                // Dummy report Id to show report does not exsists
                this.dom = this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }
        }
        else {
            // Dummy report Id to show report does not exsists
            this.dom = this.izItergrate.RenderNewReport("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
        setTimeout(function () {
            var menuName = localStorage.getItem("menuName");
            _this.title.setTitle(menuName);
        }, 1);
        // this.izItergrate.RenderReportCustomizedViewer("93f57672-c24a-44a0-b572-8b3f61f5bc56", filtersObj);
    };
    ViewReportComponent.prototype.ngOnDestroy = function () {
        this.izItergrate.DestroyDom(this.dom);
    };
    return ViewReportComponent;
}());
ViewReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1371)
    }),
    __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate, router_1.ActivatedRoute, router_1.Router, platform_browser_1.Title])
], ViewReportComponent);
exports.ViewReportComponent = ViewReportComponent;


/***/ }),

/***/ 1900:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
var reports_component_1 = __webpack_require__(1671);
var reportviewer_component_1 = __webpack_require__(1673);
var dashboarddesigner_component_1 = __webpack_require__(1665);
var reportsetting_component_1 = __webpack_require__(1672);
var reportdesigner_component_1 = __webpack_require__(1668);
var reportlist_component_1 = __webpack_require__(1669);
var dashboard_component_1 = __webpack_require__(1664);
var reportcustomfilter_component_1 = __webpack_require__(1667);
var reportpart_component_1 = __webpack_require__(1670);
//import { ExportReportComponent } from './export.component';
var viewreport_1 = __webpack_require__(1675);
//import { ExportReportComponent, ExportReportViewerComponent, ExportDashboardViewerComponent } from '../export/index';
var ViewPouReport_1 = __webpack_require__(1662);
var viewDashboard_1 = __webpack_require__(1674);
var dashboardviewer_component_1 = __webpack_require__(1666);
var customreport_1 = __webpack_require__(1663);
exports.routes = [
    {
        path: '',
        component: reports_component_1.ReportsComponent,
        children: [
            { path: 'dashboarddesigner', component: dashboarddesigner_component_1.DashboardDesignerComponent },
            { path: 'settings', component: reportsetting_component_1.SettingsComponent },
            { path: 'reportdesigner', component: reportdesigner_component_1.ReportDesignerComponent },
            { path: 'report', component: reportlist_component_1.ReportComponent },
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
            { path: 'reportcustomfilter', component: reportcustomfilter_component_1.ReportCustomFilterComponent },
            { path: 'reportpart', component: reportpart_component_1.ReportPartComponent },
            { path: 'reportviewer', component: reportviewer_component_1.ReportViewerComponent },
            //{ path: 'viewer/reportpart/:id', component: ExportReportComponent }, 
            { path: 'viewreport', component: viewreport_1.ViewReportComponent },
            //{ path: 'report/view/:id', component: ExportReportViewerComponent },  
            //{ path: 'dashboard/view/:id', component: ExportDashboardViewerComponent },  
            { path: 'ViewPouReport', component: ViewPouReport_1.ViewPouReport },
            { path: 'viewDashboard', component: viewDashboard_1.viewDashboardComponent },
            { path: 'dashboardviewer', component: dashboardviewer_component_1.DashboardViewer },
            { path: 'customreport/:id', component: customreport_1.CustomReportComponent }
        ]
    }
];
var ReportsRoutingModule = (function () {
    function ReportsRoutingModule() {
    }
    return ReportsRoutingModule;
}());
ReportsRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], ReportsRoutingModule);
exports.ReportsRoutingModule = ReportsRoutingModule;


/***/ }),

/***/ 1901:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var reports_component_1 = __webpack_require__(1671);
var reports_routing_module_1 = __webpack_require__(1900);
var shared_module_1 = __webpack_require__(632);
var reportviewer_component_1 = __webpack_require__(1673);
var dashboarddesigner_component_1 = __webpack_require__(1665);
var reportsetting_component_1 = __webpack_require__(1672);
var reportdesigner_component_1 = __webpack_require__(1668);
var reportlist_component_1 = __webpack_require__(1669);
var dashboard_component_1 = __webpack_require__(1664);
var reportcustomfilter_component_1 = __webpack_require__(1667);
var reportpart_component_1 = __webpack_require__(1670);
//import { ExportReportComponent } from './export.component';
var viewreport_1 = __webpack_require__(1675);
//import { ExportReportComponent, ExportReportViewerComponent, ExportDashboardViewerComponent } from '../export/index';
var ViewPouReport_1 = __webpack_require__(1662);
var customreport_1 = __webpack_require__(1663);
var viewDashboard_1 = __webpack_require__(1674);
var dashboardviewer_component_1 = __webpack_require__(1666);
var izendaintegrate_1 = __webpack_require__(326);
var router_1 = __webpack_require__(29);
var customurlserializer_1 = __webpack_require__(643);
var ReportsModule = (function () {
    function ReportsModule() {
    }
    return ReportsModule;
}());
ReportsModule = __decorate([
    core_1.NgModule({
        imports: [
            reports_routing_module_1.ReportsRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            reports_component_1.ReportsComponent,
            reportdesigner_component_1.ReportDesignerComponent,
            reportsetting_component_1.SettingsComponent,
            reportlist_component_1.ReportComponent,
            reportviewer_component_1.ReportViewerComponent,
            dashboard_component_1.DashboardComponent,
            dashboarddesigner_component_1.DashboardDesignerComponent,
            reportcustomfilter_component_1.ReportCustomFilterComponent,
            reportpart_component_1.ReportPartComponent,
            viewreport_1.ViewReportComponent,
            ViewPouReport_1.ViewPouReport,
            viewDashboard_1.viewDashboardComponent,
            dashboardviewer_component_1.DashboardViewer,
            customreport_1.CustomReportComponent
        ],
        providers: [
            izendaintegrate_1.IzendaIntegrate,
            { provide: router_1.UrlSerializer, useClass: customurlserializer_1.CustomUrlSerializer }
        ]
    })
], ReportsModule);
exports.ReportsModule = ReportsModule;


/***/ }),

/***/ 2152:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"content\">\r\n\r\n        <div class=\"\">\r\n            <div class=\"row\">\r\n                <ul class=\"breadcrumb\" >\r\n                    <li class=\"completed1\"><a (click)=\"homeurl()\">Reports </a></li>\r\n                    <li class=\"completed\"><a>{{chVal}}</a></li>\r\n                </ul>\r\n\r\n            </div>\r\n        </div>\r\n        <div class=\"page-content-wrapper\">\r\n            <div class=\"container X_panel no_border\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:10px;\">\r\n                        <div class=\"col-md-12\">\r\n                            <form class=\"form-horizontal form-label-left\">\r\n                                <div class=\"form-group\">\r\n                                    <iframe style=\"width: 100%; height: 100%; border: 1px solid #808080;\" [src]='page'>\r\n                                    </iframe>\r\n                                </div>\r\n\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 2153:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <router-outlet></router-outlet>\r\n</div>";

/***/ }),

/***/ 2154:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"content\">\r\n        <!--<div class=\"\">\r\n            <div class=\"page-header-title\">\r\n                <h4 class=\"page-title\"><a (click)=\"homeurl()\">Reports ></a>  Reporrt Parts</h4>\r\n            </div>\r\n        </div>-->\r\n        <div class=\"page-content-wrapper\">\r\n            <div class=\"container X_panel no_border\">\r\n                <div class=\"izenda-container\">\r\n\r\n                    <div class=\"quarter-screen\" id=\"izenda-report-part1\"> </div>\r\n                    <div class=\"quarter-screen\" id=\"izenda-report-part2\"> </div>\r\n                    <div class=\"half-screen\" id=\"izenda-report-part3\"> </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ })

});
//# sourceMappingURL=17.601fce7cdc00a672fc7a.chunk.js.map