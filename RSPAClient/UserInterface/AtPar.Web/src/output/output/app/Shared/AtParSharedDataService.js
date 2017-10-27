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
var AtParSharedDataService = (function () {
    function AtParSharedDataService() {
        if (localStorage.getItem('dataStorage') != null && localStorage.getItem('dataStorage') != undefined && localStorage.getItem('dataStorage') != '') {
            this.storage = JSON.parse(localStorage.getItem('dataStorage'));
        }
    }
    AtParSharedDataService.prototype.setStorage = function (storage) {
        this.storage = storage;
        localStorage.setItem('dataStorage', JSON.stringify(this.storage));
    };
    AtParSharedDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AtParSharedDataService);
    return AtParSharedDataService;
}());
exports.AtParSharedDataService = AtParSharedDataService;
//# sourceMappingURL=AtParSharedDataService.js.map