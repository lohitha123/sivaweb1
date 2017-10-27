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
var common_1 = require("@angular/common");
var domhandler_1 = require("../../common/dom/domhandler");
var Growl = (function () {
    function Growl(el, domHandler, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.sticky = false;
        this.life = 3000;
        this.differ = differs.find([]).create(null);
        // this.zIndex = DomHandler.zindex;
    }
    Growl.prototype.ngAfterViewInit = function () {
        this.container = this.containerViewChild.nativeElement;
    };
    Growl.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.value);
        if (changes && this.container) {
            if (this.stopDoCheckPropagation) {
                this.stopDoCheckPropagation = false;
            }
            else if (this.value && this.value.length) {
                //this.zIndex = ++DomHandler.zindex;
                this.domHandler.fadeIn(this.container, 250);
                if (!this.sticky) {
                    if (this.timeout) {
                        clearTimeout(this.timeout);
                    }
                    this.timeout = setTimeout(function () {
                        _this.removeAll();
                    }, this.life);
                }
            }
        }
    };
    Growl.prototype.remove = function (msg, msgel) {
        var _this = this;
        this.stopDoCheckPropagation = true;
        this.domHandler.fadeOut(msgel, 250);
        setTimeout(function () {
            _this.value.splice(_this.findMessageIndex(msg), 1);
        }, 250);
    };
    Growl.prototype.removeAll = function () {
        var _this = this;
        if (this.value && this.value.length) {
            this.stopDoCheckPropagation = true;
            this.domHandler.fadeOut(this.container, 250);
            setTimeout(function () {
                _this.value.splice(0, _this.value.length);
            }, 250);
        }
    };
    Growl.prototype.findMessageIndex = function (msg) {
        var index = -1;
        if (this.value && this.value.length) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == msg) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Growl.prototype.ngOnDestroy = function () {
        if (!this.sticky) {
            clearTimeout(this.timeout);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Growl.prototype, "sticky", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Growl.prototype, "life", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Growl.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Growl.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Growl.prototype, "styleClass", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], Growl.prototype, "containerViewChild", void 0);
    Growl = __decorate([
        core_1.Component({
            selector: 'atpar-growl',
            templateUrl: 'growl.html',
            providers: [domhandler_1.DomHandler]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers])
    ], Growl);
    return Growl;
}());
exports.Growl = Growl;
var GrowlModule = (function () {
    function GrowlModule() {
    }
    GrowlModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Growl],
            declarations: [Growl]
        })
    ], GrowlModule);
    return GrowlModule;
}());
exports.GrowlModule = GrowlModule;
//# sourceMappingURL=growl.js.map