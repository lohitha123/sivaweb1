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
require("rxjs/add/operator/toPromise");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var datatableservice = (function () {
    function datatableservice(http) {
        this.http = http;
    }
    datatableservice.prototype.getdetails = function () {
        return this.http.get("./src/app/components/datatable/Employee.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getBunits = function () {
        return this.http.get("./app/components/datatable/Employee.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.adddetails = function (ven) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        this.http.post('http://localhost/datatableapi/api/Employee/Addemployee', JSON.stringify(ven), { headers: headers }).subscribe();
    };
    datatableservice.prototype.deletedetails = function (id) {
        return this.http.delete("http://localhost/datatableapi/api/Employee/Delete?id=" + id, { headers: this.headers })
            .toPromise()
            .then(function () { return null; });
    };
    datatableservice = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], datatableservice);
    return datatableservice;
}());
exports.datatableservice = datatableservice;
//# sourceMappingURL=datatableservice.js.map