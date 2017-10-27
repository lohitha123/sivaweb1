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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var linqts_1 = require("linqts");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var tkitHttpService_1 = require("../Shared/tkitHttpService");
var TrackITDashboardComponent = (function () {
    function TrackITDashboardComponent(title, document, atParConstant, spinnerservice, httpService) {
        this.title = title;
        this.document = document;
        this.atParConstant = atParConstant;
        this.spinnerservice = spinnerservice;
        this.httpService = httpService;
        this.showAdmin = true;
        this.msgs = [];
        try {
            this.title.setTitle('Dashboard');
            this.activeddName = '';
            this.showStyle = "block";
            this.hideStyle = "none";
            this.isModuleActive = false;
            this.groupModules = new linqts_1.List();
            this.moduleName = 'none';
            this.moduleMenus = new linqts_1.List();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    TrackITDashboardComponent.prototype.ngOnInit = function () {
        try {
            this.getMenu();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TrackITDashboardComponent.prototype.getMenu = function () {
        try {
            return this.showStyle;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    TrackITDashboardComponent.prototype.appModuleChange = function (activeModuleName) {
        this.moduleName = activeModuleName;
    };
    TrackITDashboardComponent.prototype.onHomeClick = function () {
        this.activeddName = '';
        this.Menu = '';
    };
    TrackITDashboardComponent.prototype.profileClickChanged = function (activeddName) {
        this.activeddName = activeddName;
    };
    TrackITDashboardComponent.prototype.filteredData = function (searchString) {
        this.Menu = searchString;
    };
    TrackITDashboardComponent.prototype.clientErrorMsg = function (ex) {
    };
    TrackITDashboardComponent.prototype.divClick = function () {
    };
    TrackITDashboardComponent.prototype.OnDestroy = function () {
    };
    TrackITDashboardComponent = __decorate([
        core_1.Component({
            selector: 'trackit-home-cmp',
            templateUrl: 'trackit.dashboard.component.html',
            providers: [
                AtParConstants_1.AtParConstants,
                tkitHttpService_1.TkitHttpService
            ]
        }),
        __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [platform_browser_1.Title, Object, AtParConstants_1.AtParConstants,
            event_spinner_service_1.SpinnerService,
            tkitHttpService_1.TkitHttpService])
    ], TrackITDashboardComponent);
    return TrackITDashboardComponent;
}());
exports.TrackITDashboardComponent = TrackITDashboardComponent;
//# sourceMappingURL=trackit.dashboard.component.js.map