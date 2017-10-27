"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var spinner_sent_event_1 = require("./spinner.sent.event");
var Subject_1 = require("rxjs/Subject");
var SpinnerService = (function () {
    function SpinnerService() {
        this.events = [];
        this.emitChangeBreadCrumb = new Subject_1.Subject();
        this.emitthecountvalue = new Subject_1.Subject();
        this.changeEmittedofCount = this.emitthecountvalue.asObservable();
        this.changeBCEmitted$ = this.emitChangeBreadCrumb.asObservable();
    }
    SpinnerService.prototype.getEvent = function (type) {
        var instance;
        var index = this.events.findIndex(function (item) { return item[0] === type.toLocaleString(); });
        if (index > -1) {
            var eventBase = this.events[index][1];
            return eventBase;
        }
        else {
            instance = new type();
            this.events.push([type.toLocaleString(), instance]);
        }
        return instance;
    };
    SpinnerService.prototype.activator = function (type) {
        return new type();
    };
    SpinnerService.prototype.start = function () {
        this.getEvent(spinner_sent_event_1.SpinnerSentEvent).publish(true);
    };
    SpinnerService.prototype.stop = function () {
        this.getEvent(spinner_sent_event_1.SpinnerSentEvent).publish(false);
    };
    SpinnerService.prototype.emitChangeBreadCrumbEvt = function (change) {
        this.emitChangeBreadCrumb.next(change);
    };
    SpinnerService.prototype.emitCountChangedValue = function (change) {
        this.emitthecountvalue.next(change);
    };
    SpinnerService = __decorate([
        core_1.Injectable()
    ], SpinnerService);
    return SpinnerService;
}());
exports.SpinnerService = SpinnerService;
//# sourceMappingURL=event.spinner.service.js.map