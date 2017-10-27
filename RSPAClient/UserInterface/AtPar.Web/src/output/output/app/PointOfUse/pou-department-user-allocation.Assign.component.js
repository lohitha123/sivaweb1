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
/// <reference path="../Shared/AtParEnums.ts" />
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var MT_POU_DEPT_1 = require("../../app/Entities/MT_POU_DEPT");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var router_1 = require("@angular/router");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var pou_department_user_allocation_component_service_1 = require("./pou-department-user-allocation.component.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var linq_es5_1 = require("linq-es5");
var api_1 = require("../components/common/api");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var DepartmentUserAllocationAssignComponent = (function () {
    function DepartmentUserAllocationAssignComponent(httpService, _http, dataservice, commonService, deptUserAllocationService, spinnerService, atParConstant, router, route, confirmationService, atParSharedDataService) {
        this.httpService = httpService;
        this._http = _http;
        this.dataservice = dataservice;
        this.commonService = commonService;
        this.deptUserAllocationService = deptUserAllocationService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.router = router;
        this.route = route;
        this.confirmationService = confirmationService;
        this.atParSharedDataService = atParSharedDataService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.newItem = new MT_POU_DEPT_1.MT_POU_DEPT();
        this.addUserAlloc = false;
        this.blnShowUserIdLabel = false;
        this.blnShowUserIdDD = false;
        this.showHideGrid = false;
        this.showHideForGoback = false;
        this.lstUsers = [];
        this.blnHomeDept = false;
        this.pageName = "";
        this.editMsg = "";
        this.statusCode = -1;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    DepartmentUserAllocationAssignComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.RecordsPerPage];
        this.newItem = this.atParSharedDataService.storage.Departmentdata;
        this.AppId = this.atParSharedDataService.storage.AppId;
        this.BindGrid();
    };
    DepartmentUserAllocationAssignComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.showHideGrid == true) {
                            this.dataTableComponent.reset();
                        }
                        this.spinnerService.start();
                        if (this.AppId == AtParEnums_2.EnumApps.PointOfUse) {
                            this.pageName = "Department: " + this.newItem.DEPT_ID;
                        }
                        else {
                            this.pageName = "Department: " + this.newItem.DEPT_ID;
                        }
                        this.showHideGrid = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.deptUserAllocationService.GetDepartmentUsers(this.newItem.DEPT_ID, this.newItem.ORG_GROUP_ID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = data.DataList;
                                        _this.showHideGrid = true;
                                        _this.showHideForGoback = true;
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            if (_this.lstDBData[i].HOME_DEPARTMENT === "Y") {
                                                _this.lstDBData[i].checkvalue = true;
                                            }
                                            _this.lstDBData[i].disabled = true;
                                            if (_this.lstDBData[i].CURRENT_HOME_DEPT !== "" && _this.lstDBData[i].CURRENT_HOME_DEPT !== _this.newItem.DEPT_ID) {
                                                _this.lstDBData[i].editMsg = "Home department cannot be edited";
                                                //this.lstDBData[i].disabledForEdit = "disabled";
                                            }
                                            else {
                                                _this.lstDBData[i].editMsg = "Click here to Edit this item";
                                                //this.lstDBData[i].disabledForEdit = "";
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.showHideGrid = false;
                                        _this.showHideForGoback = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showHideGrid = false;
                                        _this.showHideForGoback = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.showHideGrid = false;
                                        _this.showHideForGoback = true;
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
    DepartmentUserAllocationAssignComponent.prototype.addUserAllocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Mode = "I";
                        this.addUserAlloc = true;
                        return [4 /*yield*/, this.bindUsersList()];
                    case 1:
                        _a.sent();
                        this.selectedUserID = "";
                        this.blnHomeDept = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    DepartmentUserAllocationAssignComponent.prototype.SaveUserAllocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.Mode === "I")) return [3 /*break*/, 2];
                        if (this.selectedUserID === "" || this.selectedUserID == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select User" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.CheckForDuplicates(this.selectedUserID)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.Mode === "U") {
                            this.editSaveUserAllocation();
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentUserAllocationAssignComponent.prototype.editUserAllocation = function (editData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.addUserAlloc) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please save or close before continuing!!!" });
                }
                else {
                    this.spinnerService.start();
                    this.growlMessage = [];
                    if (editData.editMsg === "Home department cannot be edited") {
                        this.addUserAlloc = false;
                        this.spinnerService.stop();
                        return [2 /*return*/];
                    }
                    this.addUserAlloc = true;
                    this.blnShowUserIdDD = false;
                    this.blnShowUserIdLabel = true;
                    this.UserId = editData.USER_ID;
                    this.blnHomeDept = editData.checkvalue;
                    this.Mode = "U";
                    this.spinnerService.stop();
                }
                return [2 /*return*/];
            });
        });
    };
    DepartmentUserAllocationAssignComponent.prototype.editSaveUserAllocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AllocateUserToDept(this.UserId, this.blnHomeDept, this.Mode)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DepartmentUserAllocationAssignComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID], 15, this.deviceTokenEntry[AtParEnums_2.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.addUserAlloc = true;
                                _this.blnShowUserIdDD = true;
                                _this.blnShowUserIdLabel = false;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentUserAllocationAssignComponent.prototype.CheckForDuplicates = function (UserID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deptUserAllocationService.GetDepartmentUsers(this.newItem.DEPT_ID, this.newItem.ORG_GROUP_ID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstDBUserCheckedData = data.DataList;
                                _this.lstDBUserCheckedData = linq_es5_1.asEnumerable(_this.lstDBUserCheckedData).Where(function (x) { return x.USER_ID == UserID; }).ToArray();
                                if (_this.lstDBUserCheckedData.length > 0) {
                                    _this.growlMessage = [];
                                    var statusMessage = AtParConstants_1.AtParConstants.AlreadyExist_Msg.replace("1%", "User").replace("2%", UserID);
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                                    _this.addUserAlloc = false;
                                    return;
                                }
                                else {
                                    _this.AllocateUserToDept(UserID, _this.blnHomeDept, "I");
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentUserAllocationAssignComponent.prototype.AllocateUserToDept = function (UserId, BlnHomeDept, Mode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusMessage, statusMessage, ex_4, statusMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(BlnHomeDept != undefined)) return [3 /*break*/, 8];
                        this.spinnerService.start();
                        this.statusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 7]);
                        return [4 /*yield*/, this.deptUserAllocationService.AllocateUserToDepartment(this.newItem.DEPT_ID, UserId, this.newItem.ORG_GROUP_ID.trim(), BlnHomeDept, Mode).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.addUserAlloc = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.addUserAlloc = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.addUserAlloc = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (!(this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 4];
                        this.addUserAlloc = false;
                        return [4 /*yield*/, this.BindGrid()];
                    case 3:
                        _a.sent();
                        if (this.Mode === "I") {
                            statusMessage = ("User " + UserId + " Added Successfully");
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                        }
                        else if (this.Mode === "U") {
                            statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", UserId);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.addUserAlloc = false;
                        this.spinnerService.start();
                        this.growlMessage = [];
                        statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", UserId);
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                        this.spinnerService.stop();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentUserAllocationAssignComponent.prototype.DeallocateUserToDepartment = function (deleteData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.addUserAlloc) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please save or close before continuing!!!" });
                }
                else {
                    //this.spinnerService.start();
                    try {
                        this.growlMessage = [];
                        this.confirmationService.confirm({
                            message: "Are you sure you want to delete this user " + deleteData.USER_ID + '?',
                            accept: function () {
                                _this.deptUserAllocationService.DeallocateUserToDepartment(_this.newItem.DEPT_ID, deleteData.USER_ID).
                                    catch(_this.httpService.handleError).then(function (res) {
                                    var data = res.json();
                                    _this.growlMessage = [];
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            var statusMessage = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", "User").replace("2%", deleteData.USER_ID);
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                            _this.BindGrid();
                                            //this.spinnerService.stop();
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            //this.spinnerService.stop();
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            //this.spinnerService.stop();
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            //this.spinnerService.stop();
                                            break;
                                        }
                                    }
                                });
                            },
                            reject: function () {
                                //this.spinnerService.stop();
                            }
                        });
                    }
                    catch (ex) {
                        this.clientErrorMsg(ex);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    DepartmentUserAllocationAssignComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    DepartmentUserAllocationAssignComponent.prototype.navigateToPOUUserAllocationHome = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var navigationExtras = {
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    };
    DepartmentUserAllocationAssignComponent.prototype.close = function () {
        this.addUserAlloc = false;
        this.growlMessage = [];
    };
    DepartmentUserAllocationAssignComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.lstUsers = null;
        this.growlMessage = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], DepartmentUserAllocationAssignComponent.prototype, "dataTableComponent", void 0);
    DepartmentUserAllocationAssignComponent = __decorate([
        core_1.Component({
            selector: 'atpar-dept-user-alloc-assign',
            templateUrl: 'pou-department-user-allocation.Assign.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, pou_department_user_allocation_component_service_1.DepartmentUserAllocationServiceComponent, AtParConstants_1.AtParConstants, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            pou_department_user_allocation_component_service_1.DepartmentUserAllocationServiceComponent,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            router_1.Router,
            router_1.ActivatedRoute,
            api_1.ConfirmationService,
            AtParSharedDataService_1.AtParSharedDataService])
    ], DepartmentUserAllocationAssignComponent);
    return DepartmentUserAllocationAssignComponent;
}());
exports.DepartmentUserAllocationAssignComponent = DepartmentUserAllocationAssignComponent;
//# sourceMappingURL=pou-department-user-allocation.Assign.component.js.map