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
var ColSpanDirective = (function () {
    function ColSpanDirective(el) {
        this.el = el;
    }
    ColSpanDirective.prototype.ngAfterViewInit = function () {
        console.log('Col Span Is' + this.colSpan);
        var row = document.createElement("tr");
        var data = document.createElement("td");
        data.colSpan = this.colSpan;
        data.align = "center";
        data.style.fontWeight = "bold";
        var description = document.createTextNode(this.description);
        data.appendChild(description);
        row.appendChild(data);
        this.insertAfter(this.el.nativeElement.parentNode.parentNode.parentNode, row);
    };
    ColSpanDirective.prototype.insertAfter = function (referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ColSpanDirective.prototype, "colSpan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ColSpanDirective.prototype, "description", void 0);
    ColSpanDirective = __decorate([
        core_1.Directive({
            selector: '[inColSpan]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], ColSpanDirective);
    return ColSpanDirective;
}());
exports.ColSpanDirective = ColSpanDirective;
var CustomRowModule = (function () {
    function CustomRowModule() {
    }
    CustomRowModule = __decorate([
        core_1.NgModule({
            exports: [ColSpanDirective],
            declarations: [ColSpanDirective]
        })
    ], CustomRowModule);
    return CustomRowModule;
}());
exports.CustomRowModule = CustomRowModule;
//# sourceMappingURL=customerow.js.map