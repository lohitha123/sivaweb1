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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var AtParConstants = (function () {
    function AtParConstants(document) {
        this.document = document;
    }
    AtParConstants.prototype.catchClientError = function (statusMsgs, spnrService, errorMsg, funName, compName) {
        if (funName === void 0) { funName = ""; }
        if (compName === void 0) { compName = ""; }
        spnrService.stop();
        statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage + ":" + errorMsg.toString() });
    };
    AtParConstants.prototype.scrollToTop = function () {
        var elmnt = this.document.getElementById('main-section');
        elmnt.scrollTop = 0;
    };
    AtParConstants.count = false;
    AtParConstants.PRODUCT_NAME = 'AtPar';
    AtParConstants.isclicked = true;
    AtParConstants.ClientErrorMessage = 'Internal Client Error';
    AtParConstants.GrowlTitle_Warn = 'Warn';
    AtParConstants.GrowlTitle_Error = 'Error';
    AtParConstants.GrowlTitle_Info = 'Info';
    AtParConstants.GrowlTitle_Success = 'Success';
    //<Label excluding ID> <Value> <Created/Updated/Added/Deleted> <Successfully>
    AtParConstants.Created_Msg = "1% 2% Created Successfully"; //Ex:Org Group(1%) HUMC(2%) Created Successfully 
    AtParConstants.Updated_Msg = "1% 2% Updated Successfully"; //Ex: Org Group(1%) HUMC(2%) Updated Successfully
    AtParConstants.Updated_Status_Msg = "1% 2% Status Updated Successfully"; //Ex: Org Group(1%) HUMC(2%) Status Updated Successfully  
    AtParConstants.Deleted_Msg = "1% 2% Deleted Successfully"; //Ex: Org Group(1%) HUMC(2%) Deleted Successfully 
    AtParConstants.AlreadyExist_Msg = "1% 2% Already Exists"; //Ex:Org Group(1%) HUMC(2%) Created Successfully 
    AtParConstants.Added_Msg = "1% 2% Added Successfully"; //Ex:Org Group(1%) HUMC(2%) Added Successfully
    AtParConstants = __decorate([
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], AtParConstants);
    return AtParConstants;
}());
exports.AtParConstants = AtParConstants;
//# sourceMappingURL=AtParConstants.js.map