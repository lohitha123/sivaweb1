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
var event_spinner_service_1 = require("./event.spinner.service");
var spinner_sent_event_1 = require("./spinner.sent.event");
var SpinnerComponent = (function () {
    function SpinnerComponent(spinnerService) {
        var _this = this;
        this.spinnerService = spinnerService;
        this.isSpin = false;
        this.onSpinnerCall = function (isSpin) {
            //if (isSpin == false) {
            //    setTimeout(() => {
            _this.isSpin = isSpin;
            //    }, 1000);
            //}
            //else {
            //    this.isSpin = isSpin;
            //}
        };
    }
    SpinnerComponent.prototype.ngOnInit = function () {
        this.spinnerService.getEvent(spinner_sent_event_1.SpinnerSentEvent).subscribe(this.onSpinnerCall);
    };
    SpinnerComponent.prototype.ngOnDestroy = function () {
        this.isSpin = null;
        this.spinnerService.getEvent(spinner_sent_event_1.SpinnerSentEvent).unsubscribe(this.onSpinnerCall);
    };
    SpinnerComponent = __decorate([
        core_1.Component({
            selector: 'atpar-spinner',
            templateUrl: 'spinner.html',
            styleUrls: ['atpar-spinner.css']
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;
//# sourceMappingURL=spinner-component.js.map