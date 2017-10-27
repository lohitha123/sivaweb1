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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var HttpService_1 = require("../Shared/HttpService");
var ManageEqTypeService = (function () {
    function ManageEqTypeService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    ManageEqTypeService.prototype.updateEqTypeData = function (itemType) {
        return this.httpService.create({
            apiMethod: "/api/ManageEquipmentType/UpdateEqTypeData",
            formData: itemType
        }).toPromise();
    };
    ManageEqTypeService.prototype.saveEqTypeData = function (itemType) {
        return this.httpService.create({
            apiMethod: "/api/ManageEquipmentType/SaveEqTypeData",
            formData: itemType
        }).toPromise();
    };
    ManageEqTypeService.prototype.getEquipmentTypes = function (itemIndicator, orgGrpId, searchEqTypeOrDesc) {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetEquipmentTypes",
            params: {
                "itemIndicator": itemIndicator,
                "orgGrpId": orgGrpId,
                "searchEqTypeOrDesc": searchEqTypeOrDesc
            }
        });
    };
    ManageEqTypeService.prototype.getEqIndicators = function () {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetEqIndicators"
        });
    };
    ManageEqTypeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http])
    ], ManageEqTypeService);
    return ManageEqTypeService;
}());
exports.ManageEqTypeService = ManageEqTypeService;
//# sourceMappingURL=tkit-manage-equipment-type.service.js.map