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
var izendaintegrate_1 = require("../_helpers/izendaintegrate");
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
    ReportDesignerComponent = __decorate([
        core_1.Component({
            templateUrl: 'rootcontainer.html'
        }),
        __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate])
    ], ReportDesignerComponent);
    return ReportDesignerComponent;
}());
exports.ReportDesignerComponent = ReportDesignerComponent;
//# sourceMappingURL=reportdesigner.component.js.map