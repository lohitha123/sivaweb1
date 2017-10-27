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
var core_1 = require("@angular/core");
var HighlightDirective = (function () {
    function HighlightDirective(el) {
        this.el = el;
    }
    HighlightDirective.prototype.onKeyDown = function (event) {
        var oldValue = event.target.value;
        var keyPressed = event.key;
        var keyCode = event.keyCode;
        if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
            return false;
        }
        return true;
        // this  is 2 nd type
        //if (isNaN(event.char))
        //{
        //    debugger;
        //    return false;
        //} else
        //{
        //    debugger;
        //    return true;
        //}
        // old
        //if (isNaN(oldValue.substr(oldValue.length - 1)) || keyCode === 32) {
        //  this.el.nativeElement.value = oldValue.substr(0, oldValue.length - 1);
        //} else {
        //  return false;
        //}
    };
    return HighlightDirective;
}());
__decorate([
    core_1.Input('myValidateonlynumbers'),
    __metadata("design:type", String)
], HighlightDirective.prototype, "highlightColor", void 0);
__decorate([
    core_1.HostListener('keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HighlightDirective.prototype, "onKeyDown", null);
HighlightDirective = __decorate([
    core_1.Directive({
        selector: '[myValidateonlynumbers]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], HighlightDirective);
exports.HighlightDirective = HighlightDirective;
//# sourceMappingURL=myValidate onlynumbers.js.map