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
var http_1 = require("@angular/http");
var linqts_1 = require("linqts");
var platform_browser_1 = require("@angular/platform-browser");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var HttpService_1 = require("../Shared/HttpService");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtparDownloads = (function () {
    function AtparDownloads(httpservice, http, leftBarAnimationService, atParConstant, spinnerservice, title) {
        this.httpservice = httpservice;
        this.http = http;
        this.leftBarAnimationService = leftBarAnimationService;
        this.atParConstant = atParConstant;
        this.spinnerservice = spinnerservice;
        this.title = title;
        this.isUploadBtn = true;
        this.showStyle = false;
        this.isPOUAssign = false;
        this.appicon = "";
        this._deviceTokenEntry = [];
        this.msgs = [];
        try {
            this.showStyle = false;
            this.isPOUAssign = false;
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        }
        catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }
    AtparDownloads.prototype.ngOnInit = function () {
        this.appicon = "assets/images/icons/app_icon_.png";
        this.title.setTitle('Downloads');
        try {
            this.getPOUAssignValue();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    AtparDownloads.prototype.getPOUAssignValue = function () {
        var _this = this;
        try {
            if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID] == 'ADMIN') {
                this.isPOUAssign = true;
            }
            else if (this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID] == 'VENDOR') {
                this.isPOUAssign = false;
            }
            else {
                this.appModules = new linqts_1.List();
                if (localStorage.getItem('Apps') != undefined && localStorage.getItem('Apps') != null && localStorage.getItem('Apps') != '') {
                    var appModules = JSON.parse(localStorage.getItem('Apps'));
                    for (var i = 0; i < appModules.length; i++) {
                        this.appModules.Add(appModules[i]);
                    }
                }
                this.appModules.ForEach(function (app) {
                    if (app.APP_NAME == 'Point Of Use') {
                        _this.isPOUAssign = true;
                    }
                });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getPOUAssignValue");
        }
    };
    AtparDownloads.prototype.getMargin = function () {
        try {
            this.showStyle = this.leftBarAnimationService.getLeftBarMargin();
            if (this.showStyle) {
                return "";
            }
            else {
                return "0px";
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getMargin");
        }
    };
    AtparDownloads.prototype.downloadPOUDTFile = function () {
        try {
            var filename = '../redist/AtPar-POU_DT.exe';
            var query = '?download';
            window.open(filename + query);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "downloadPOUDTFile");
        }
    };
    AtparDownloads.prototype.downloadNETCFVFile = function () {
        try {
            var filename = '../redist/NETCFv35[1].wm.armv4i.cab';
            var query = '?download';
            window.open(filename + query);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "downloadNETCFVFile");
        }
    };
    AtparDownloads.prototype.downloadAndriodFile = function () {
        try {
            var filename = '../redist/AtPar.Droid-Signed.apk';
            var query = '?download';
            window.open(filename + query);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "downloadAndriodFile");
        }
    };
    AtparDownloads.prototype.downloadSQLCE30File = function () {
        try {
            var filename = '../redist/sqlce30.ppc.wce4.armv4.CAB';
            var query = '?download';
            window.open(filename + query);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "downloadSQLCE30File");
        }
    };
    AtparDownloads.prototype.downloadAtParClientFile = function () {
        try {
            var filename = '../redist/AtParClient_ARM.CAB';
            var query = '?download';
            window.open(filename + query);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "downloadAtParClientFile");
        }
    };
    AtparDownloads.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerservice, strExMsg.toString(), funName, this.constructor.name);
    };
    AtparDownloads.prototype.OnDestroy = function () {
        this.spinnerservice.stop();
        this.spinnerservice = null;
        this.isUploadBtn = null;
        this.showStyle = null;
        this.isPOUAssign = null;
        this.msgs = null;
        this._deviceTokenEntry = null;
        this.appModules = null;
    };
    AtparDownloads = __decorate([
        core_1.Component({
            templateUrl: 'atpar-downloads.component.html',
            providers: [HttpService_1.HttpService, AtParConstants_1.AtParConstants, platform_browser_1.Title],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            http_1.Http,
            leftbar_animation_service_1.LeftBarAnimationService,
            AtParConstants_1.AtParConstants,
            event_spinner_service_1.SpinnerService,
            platform_browser_1.Title])
    ], AtparDownloads);
    return AtparDownloads;
}());
exports.AtparDownloads = AtparDownloads;
//# sourceMappingURL=atpar-downloads.component.js.map