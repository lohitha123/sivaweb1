"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var HelpComponent = (function () {
    function HelpComponent() {
        this.index = 0;
    }
    HelpComponent.prototype.onTabClose = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index });
    };
    HelpComponent.prototype.onTabOpen = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
    };
    HelpComponent.prototype.openNext = function () {
        this.index = (this.index === 3) ? 0 : this.index + 1;
    };
    HelpComponent.prototype.openPrev = function () {
        this.index = (this.index === 0) ? 3 : this.index - 1;
    };
    return HelpComponent;
}());
HelpComponent = __decorate([
    core_1.Component({
        templateUrl: './app/TrackIT/tkit-help.component.html'
    })
], HelpComponent);
exports.HelpComponent = HelpComponent;
//# sourceMappingURL=tkit-help.component.js.map