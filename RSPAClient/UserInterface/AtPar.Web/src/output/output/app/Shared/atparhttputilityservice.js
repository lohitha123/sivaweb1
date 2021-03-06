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
require("rxjs/add/operator/toPromise");
var HttpService_1 = require("./HttpService");
var HttpServiceUtility = (function () {
    function HttpServiceUtility(httpservice) {
        this.httpservice = httpservice;
        this.url = "http://localhost:8001/";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    HttpServiceUtility.prototype.get = function () {
        return this.httpservice.getSync({
            "apiMethod": ""
        }).then(function (response) { return response.json(); }).catch(this.handleError);
    };
    HttpServiceUtility.prototype.delete = function (id) {
        return this.httpservice.delete({
            "apiMethod": "" + id
        });
    };
    HttpServiceUtility.prototype.create = function (url, data) {
        return this.httpservice.create({
            "apiMethod": url,
            "formData": JSON.stringify(data)
        }).map(function (res) { return res.json().data; });
    };
    HttpServiceUtility.prototype.update = function (url, data) {
        return this.httpservice.update({
            "apiMethod": url,
            "formData": JSON.stringify(data)
        }).map(function (res) { return res.json().data; });
    };
    HttpServiceUtility.prototype.handleError = function (error) {
        console.error('Web Api not hosted properly or server not available', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HttpServiceUtility = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], HttpServiceUtility);
    return HttpServiceUtility;
}());
exports.HttpServiceUtility = HttpServiceUtility;
//# sourceMappingURL=atparhttputilityservice.js.map