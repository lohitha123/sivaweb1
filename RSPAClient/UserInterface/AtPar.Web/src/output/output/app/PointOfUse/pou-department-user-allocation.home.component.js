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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../entities/mt_pou_dept.ts" />
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var pou_department_user_allocation_component_service_1 = require("./pou-department-user-allocation.component.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var router_1 = require("@angular/router");
var AtParEnums_3 = require("../Shared/AtParEnums");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParEnums_4 = require("../Shared/AtParEnums");
var DepartmentUserAllocationHomeComponent = (function () {
    function DepartmentUserAllocationHomeComponent(httpService, _http, dataservice, commonService, deptUserAllocationService, spinnerService, atParConstant, router, route, atParSharedDataService) {
        this.httpService = httpService;
        this._http = _http;
        this.dataservice = dataservice;
        this.commonService = commonService;
        this.deptUserAllocationService = deptUserAllocationService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.router = router;
        this.route = route;
        this.atParSharedDataService = atParSharedDataService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.selectedDeptID = "";
        this.selectedDescription = "";
        this.showGrid = false;
        this.NoofDepartmentsMessage = "";
        this.pageName = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    DepartmentUserAllocationHomeComponent.prototype.ngOnInit = function () {
        this.intAppID = this.appId;
        this.spinnerService.start();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.spinnerService.stop();
        if (isNaN(this.intAppID)) {
            this.intAppID = AtParEnums_3.EnumApps.PointOfUse;
            this.pageName = "Point of Use - Department User Allocation";
        }
        else {
            if (this.intAppID != AtParEnums_3.EnumApps.PointOfUse) {
                this.pageName = "AtPaRx - Department User Allocation";
            }
            else {
                this.pageName = "Point of Use - Department User Allocation";
            }
        }
    };
    DepartmentUserAllocationHomeComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        this.spinnerService.start();
                        this.selectedDeptID = this.selectedDeptID.trim();
                        this.selectedDescription = this.selectedDescription.trim();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.deptUserAllocationService.GetDeptUsers(this.selectedDeptID, this.selectedDescription, this.toTitleCase(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstDBData = data.DataList;
                                        _this.NoofDepartmentsMessage = data.DataList.length.toString() + " Department(s) Found";
                                        //this.selectedDeptID = "";
                                        //this.selectedDescription = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.NoofDepartmentsMessage = "";
                                        _this.selectedDeptID = "";
                                        _this.selectedDescription = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.NoofDepartmentsMessage = "";
                                        _this.selectedDeptID = "";
                                        _this.selectedDescription = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.NoofDepartmentsMessage = "";
                                        _this.selectedDeptID = "";
                                        _this.selectedDescription = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentUserAllocationHomeComponent.prototype.DepartmentUserCollection = function (Departmentdata) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationExtras;
            return __generator(this, function (_a) {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Allocate Users';
                this.breadCrumbMenu.IS_DIV = false;
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                //this.atParSharedDataService.storage = { "Departmentdata": Departmentdata, "AppId": this.intAppID };
                this.atParSharedDataService.setStorage({ "Departmentdata": Departmentdata, "AppId": this.intAppID });
                navigationExtras = {
                    queryParams: {
                        "mode": AtParEnums_4.ModeEnum.Add,
                    },
                    relativeTo: this.route
                };
                this.router.navigate(['assign'], navigationExtras);
                return [2 /*return*/];
            });
        });
    };
    DepartmentUserAllocationHomeComponent.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
    DepartmentUserAllocationHomeComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    DepartmentUserAllocationHomeComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.growlMessage = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DepartmentUserAllocationHomeComponent.prototype, "appId", void 0);
    DepartmentUserAllocationHomeComponent = __decorate([
        core_1.Component({
            selector: 'atpar-pou-departmentuserallocation',
            templateUrl: 'pou-department-user-allocation.home.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, pou_department_user_allocation_component_service_1.DepartmentUserAllocationServiceComponent, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            pou_department_user_allocation_component_service_1.DepartmentUserAllocationServiceComponent,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            router_1.Router,
            router_1.ActivatedRoute,
            AtParSharedDataService_1.AtParSharedDataService])
    ], DepartmentUserAllocationHomeComponent);
    return DepartmentUserAllocationHomeComponent;
}());
exports.DepartmentUserAllocationHomeComponent = DepartmentUserAllocationHomeComponent;
//# sourceMappingURL=pou-department-user-allocation.home.component.js.map