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
// import {CommonModule} from '@angular/common';
// import {Header} from '../common/shared';
// import {BlockableUI} from '../common/api';
var ModalComponent = (function () {
    //background: rgba(0,0,0,0.6);
    function ModalComponent() {
        this.visible = false;
        this.dis = false;
        this.visibleAnimate = false;
        this.mini = false;
        this.innerHeight = (window.screen.height);
        this.innerWidth = (window.screen.width);
    }
    ModalComponent.prototype.show = function (value) {
        var _this = this;
        this.mini = false;
        var v = value;
        if (v == 'help') {
            console.log(this.innerHeight);
            console.log(this.innerWidth);
            this.width = 'auto';
            this.height = this.innerHeight - 280 + "px";
            this.margin = "100px 0 auto 155px";
            this.visible = true;
            this.dis = false;
            console.log(this.height);
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
        this.mini = false;
        setTimeout(function () { return _this.visible = false; }, 300);
    };
    ModalComponent.prototype.minimize = function () {
        this.mini = true;
    };
    ModalComponent.prototype.max = function (event) {
        //var x = <HTMLElement>event.target;
        //console.log(x);
        this.mini = false;
    };
    ModalComponent.prototype.onContainerClicked = function (event) {
        //var x = <HTMLElement>event.target;
        //console.log(x);
        //alert('hit');
        if (event.target.classList.contains('modal')) {
            this.hide();
        }
    };
    return ModalComponent;
}());
ModalComponent = __decorate([
    core_1.Component({
        selector: 'app-modal',
        template: "\n  <div (click)=\"onContainerClicked($event)\" *ngIf=\"!mini\" class=\"modal fade\" tabindex=\"-1\" [ngClass]=\"{'in': visibleAnimate}\"\n       [ngStyle]=\"{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}\">\n    <div class=\"modal-dialog\" [ngStyle]=\"{'width': width, 'margin': margin}\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <ng-content select=\".app-modal-header\"></ng-content>\n        </div>\n        <div class=\"modal-body\" [ngStyle]=\"{'max-height': height}\">\n          <ng-content select=\".app-modal-body\"></ng-content>\n        </div>\n        <div class=\"modal-footer\" [ngStyle]=\"{'display': dis ? 'block' : 'none'}\">\n          <ng-content select=\".app-modal-footer\"></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"min\" *ngIf=\"mini\">\n        <div class=\"app-modal-header\">\n        <div class=\"pull-left text-primary\">@Par Help</div>      \n        <a (click)=\"hide()\" class=\"class pull-right\" href=\"javascript:void(0)\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n        <a (click)=\"max()\" class=\"class pull-right\" href=\"javascript:void(0)\"><i class=\"fa fa-clone\" aria-hidden=\"true\"></i></a>\n    </div>\n  </div>\n  ",
        styles: ["\n    .modal {\n      z-index:9999;\n    }\n    .minimize > .modal-dialog >.modal-content>.modal-body {\n        display: none;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [])
], ModalComponent);
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.js.map