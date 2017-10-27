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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// let IzendaSynergy = require("../izenda/izenda_ui");
var AtParEnums_1 = require("../Shared/AtParEnums");
var izendaintegrate_1 = require("../_helpers/izendaintegrate");
var IzendaSynergy = require("../../assets/Izenda/izenda_ui");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var platform_browser_1 = require("@angular/platform-browser");
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
    CustomReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'rootcontainer.html',
            providers: [platform_browser_1.Title]
        }),
        __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate, router_1.ActivatedRoute, router_1.Router, event_spinner_service_1.SpinnerService, platform_browser_1.Title])
    ], CustomReportComponent);
    return CustomReportComponent;
}());
exports.CustomReportComponent = CustomReportComponent;
//# sourceMappingURL=customreport.js.map