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
var WarehouseComponent = (function () {
    function WarehouseComponent() {
        this.wareMenu = [];
        this.wareMenu = [
            { name: 'AtPar', path: '/', img: "app_icon" },
            { name: 'Cart Count', path: '/warehouse', img: "cartCount" },
            { name: 'Cycle Count', path: '/', img: "cycleCount" },
            { name: 'Recieve', path: '/', img: "recieve" },
            { name: 'Pick', path: '/', img: "pick" },
            { name: 'Deliver', path: '/warehouse', img: "deliver" },
            { name: 'Put Away', path: '/', img: "putAway" },
            { name: 'TrackIt', path: '/', img: "trackIt" },
            { name: 'Stock Issue', path: '/', img: "stockIssue" },
            { name: 'Asset Management', path: '/warehouse', img: "assetManagement" },
            { name: 'Bin To Bin', path: '/', img: "binToBin" },
            { name: 'Point Of Use', path: '/', img: "pointOfUse" }
        ];
        console.log(this.wareMenu);
    }
    return WarehouseComponent;
}());
WarehouseComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './warehouse.component.html'
    }),
    __metadata("design:paramtypes", [])
], WarehouseComponent);
exports.WarehouseComponent = WarehouseComponent;
//# sourceMappingURL=warehouse.component.js.map