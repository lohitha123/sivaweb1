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
var ModalComponent = (function () {
    function ModalComponent() {
        this.visible = false;
        this.dis = false;
        this.visibleAnimate = false;
        this.innerHeight = (window.screen.height);
        this.innerWidth = (window.screen.width);
    }
    ModalComponent.prototype.show = function (value) {
        var _this = this;
        var v = value;
        if (v == 'help') {
            this.width = "auto";
            this.height = this.innerHeight - 280 + "px";
            this.margin = "100px";
            this.visible = true;
            this.dis = false;
            setTimeout(function () { return _this.visibleAnimate = true; }, 100);
        }
        else if (v == 'tkitHelp') {
            this.dis = true;
            this.visible = true;
            this.margin = "106px auto";
            setTimeout(function () { return _this.visibleAnimate = true; }, 100);
        }
        else {
            this.dis = true;
            this.visible = true;
            this.margin = "100px auto";
            setTimeout(function () { return _this.visibleAnimate = true; }, 100);
        }
    };
    ModalComponent.prototype.hide = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.visible = false; }, 300);
    };
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'atpar-modal',
            template: "\n  <div (click)=\"onContainerClicked($event)\" class=\"modal fade\" tabindex=\"-1\" [ngClass]=\"{'in': visibleAnimate}\"\n       [ngStyle]=\"{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}\">\n    <div class=\"modal-dialog\" [ngStyle]=\"{'width': width, 'margin': margin}\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <ng-content select=\".atpar-modal-header\"></ng-content>\n        </div>\n        <div class=\"modal-body\" [ngStyle]=\"{'max-height': height}\">\n          <ng-content select=\".atpar-modal-body\"></ng-content>\n        </div>\n        <div class=\"modal-footer\" [ngStyle]=\"{'display': dis ? 'block' : 'none'}\">\n          <ng-content select=\".atpar-modal-footer\"></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n  ",
            styles: ["\n    .modal {\n      background: rgba(0,0,0,0.6);\n      z-index:9999;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.js.map