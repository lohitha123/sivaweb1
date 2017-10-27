"use strict";
//let IzendaSynergy = require("../izenda/izenda_ui");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../assets/Izenda/izenda_common");
require("../../assets/Izenda/izenda_locales");
require("../../assets/Izenda/izenda_vendors");
var core_1 = require("@angular/core");
var IzendaSynergy = require("../../assets/Izenda/izenda_ui");
var IzendaIntegrate = (function () {
    function IzendaIntegrate() {
    }
    IzendaIntegrate.prototype.DoIzendaConfig = function () {
        var IpAdress = window.location.protocol + "//" + window.location.hostname + "/AtPar/ReportingApi/api/";
        //  var Path: string = "/AtPar/ReportingApi/api/";
        //  var t1 = window.location.protocol + "//" + window.location.hostname;
        // var t1 = "http://localhost:8080";
        // var t = t1;
        //public route: string = "Login";
        // var IpAdress: string = t + Path;
        //var IpAdress="http://192.168.177.116/AtPar/ReportingApi/api/"
        //   var IpAdress = "http://localhost/AtPar/ReportingApi/api/"
        IzendaSynergy.config({
            // "WebApiUrl": "http://localhost/Izenda_Angular_API/api/",
            //"WebApiUrl": "http://izenda-vm04.kms.com.vn:8200/api/",  
            "WebApiUrl": IpAdress,
            "BaseUrl": "/AtPar/AtParWeb/",
            "RootPath": "/AtPar/AtParWeb/assets/Izenda/",
            "CssFile": "izenda-ui.css",
            "Routes": {
                "settings": "settings",
                "New": "new",
                "dashboard": "dashboard",
                "report": "report",
                "reportviewer": "reportviewer",
                "ReportViewerPopup": "reportviewerpopup",
                "viewer": "viewer"
            },
            "Timeout": 3600,
            "NeedToEncodeUrl": false,
            "UIPreferences": {
                "ReportFilterSectionExpanded": !1
            }
        });
    };
    IzendaIntegrate.prototype.setContext = function () {
        var currentUserContext = {
            token: localStorage.getItem("izendatoken")
        };
        IzendaSynergy.setCurrentUserContext(currentUserContext);
    };
    /* Izenda Function */
    IzendaIntegrate.prototype.RenderIzenda = function () {
        this.setContext();
        IzendaSynergy.render(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.RenderIzendaSettings = function () {
        this.setContext();
        IzendaSynergy.renderSettingPage(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.RenderReportList = function () {
        this.setContext();
        IzendaSynergy.renderReportPage(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.RenderReportDesigner = function () {
        this.setContext();
        var dom = document.getElementById('izenda-root');
        IzendaSynergy.renderReportDesignerPage(dom);
        return dom;
    };
    IzendaIntegrate.prototype.RenderReportViewer = function (ReportID) {
        this.setContext();
        //// alert(ReportID)
        // if (ReportID == null)
        // { ReportID ='ceb0d4b2-51c8-49f2-ba37-0ff103873151' }
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), ReportID);
    };
    IzendaIntegrate.prototype.RenderNewReport = function (ReportID) {
        this.setContext();
        var dom = document.getElementById('izenda-root');
        IzendaSynergy.renderReportViewerPage(dom, ReportID);
        return dom;
    };
    IzendaIntegrate.prototype.RenderReportCustomizedFilterViewer = function () {
        this.setContext();
        var filtersObj = {
            "filters": [],
            "overridingFilterValue": {
                p1value: 50,
                p2value: '30;#40' // override filter value at position 2 which is applying on current report, change beetween (20:50) to (30:40)
            }
        };
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), '75d975db-c19e-4b81-a5b2-8c63663856c9', filtersObj);
    };
    IzendaIntegrate.prototype.RenderReportCustomizedViewer = function (reportID, filtersObj) {
        this.setContext();
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), reportID, filtersObj);
    };
    IzendaIntegrate.prototype.RenderReportCustomizedFilters = function (reportID, filtersObj) {
        this.setContext();
        var dom = document.getElementById('izenda-root');
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), reportID, filtersObj);
        return dom;
    };
    IzendaIntegrate.prototype.RenderReportParts = function () {
        this.setContext();
        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part1'), {
            "id": "8F3B24F7-B55A-4095-81DE-68104175032A",
        });
        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part2'), {
            "id": "FFE428F2-1F4B-4BEB-9678-8FB7147A36FE",
        });
        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part3'), {
            "id": "C0D6695F-10F2-4CD3-851C-A47BAA2A2E4A",
        });
    };
    IzendaIntegrate.prototype.RenderDashboard = function () {
        this.setContext();
        IzendaSynergy.renderDashboardPage(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.RenderDashboardDesigner = function () {
        this.setContext();
        IzendaSynergy.renderNewDashboardPage(document.getElementById('izenda-root'));
    };
    IzendaIntegrate.prototype.DestroyDom = function (dom) {
        this.setContext();
        IzendaSynergy.unmountComponent(dom);
    };
    IzendaIntegrate.prototype.RenderNewDashboard = function (ReportID) {
        this.setContext();
        // IzendaSynergy.renderDashboardPage(document.getElementById('izenda-root'), ReportID);
        IzendaSynergy.renderDashboardViewerPage(document.getElementById('izenda-root'), ReportID);
    };
    IzendaIntegrate.prototype.RenderDashboardViewer = function (ReportID) {
        this.setContext();
        IzendaSynergy.renderDashboardViewerPage(document.getElementById('izenda-root'), ReportID);
    };
    IzendaIntegrate = __decorate([
        core_1.Injectable()
    ], IzendaIntegrate);
    return IzendaIntegrate;
}());
exports.IzendaIntegrate = IzendaIntegrate;
//# sourceMappingURL=izendaintegrate.js.map