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
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var http_1 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_setup_storage_location_groups_component_service_1 = require("../../app/Init/atpar-setup-storage-location-groups.component.service");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var router_1 = require("@angular/router");
var api_1 = require("../components/common/api");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParEnums_3 = require("../Shared/AtParEnums");
var SetupStorageLocationGroupsHomeComponent = (function () {
    function SetupStorageLocationGroupsHomeComponent(httpService, _http, dataservice, spinnerService, commonService, storageLocationService, atParSharedDataService, atParConstant, router, confirmationService, route) {
        this.httpService = httpService;
        this._http = _http;
        this.dataservice = dataservice;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.storageLocationService = storageLocationService;
        this.atParSharedDataService = atParSharedDataService;
        this.atParConstant = atParConstant;
        this.router = router;
        this.confirmationService = confirmationService;
        this.route = route;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.orgGrpId = "";
        this.OrgGroupID = "";
        this.blnShowOrgGroupDD = false;
        this.lstOrgGroups = [];
        this.selectedZone = "";
        this.selectedDescription = "";
        this.selectedOrgGroupId = "";
        this.strOrgGrpId = "";
        this.showGrid = false;
        this.cartsAllocatedMsg = "";
        this.createDeleteMsg = "";
        this.blnDeleteMessage = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupStorageLocationGroupsHomeComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.bindOrgGroups();
    };
    SetupStorageLocationGroupsHomeComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " " + "-" + " " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            //this.GetData("");
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.showGrid = false;
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " " + "-" + " " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupStorageLocationGroupsHomeComponent.prototype.GetData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.OrgGroupID = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.OrgGroupID = this.selectedOrgGroupId;
                        }
                        this.spinnerService.start();
                        if (this.OrgGroupID == "" || this.OrgGroupID == "Select User" || this.OrgGroupID == undefined) {
                            this.growlMessage = [];
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.storageLocationService.GetStorageZoneGroups(this.selectedZone, this.selectedDescription, this.OrgGroupID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        if (_this.blnDeleteMessage == false) {
                                            _this.growlMessage = [];
                                        }
                                        _this.lstDBData = data.DataList;
                                        _this.spinnerService.stop();
                                        _this.blnDeleteMessage = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.blnDeleteMessage = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.blnDeleteMessage = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.blnDeleteMessage = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "GetData");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupStorageLocationGroupsHomeComponent.prototype.ddlChnage = function () {
        this.showGrid = false;
    };
    SetupStorageLocationGroupsHomeComponent.prototype.createZones = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationExtras;
            return __generator(this, function (_a) {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Create Storage Location Group';
                this.breadCrumbMenu.IS_DIV = false;
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                navigationExtras = {
                    queryParams: {
                        "mode": AtParEnums_3.ModeEnum.Add,
                    },
                    relativeTo: this.route
                };
                this.router.navigate(['addZone'], navigationExtras);
                return [2 /*return*/];
            });
        });
    };
    SetupStorageLocationGroupsHomeComponent.prototype.deleteZones = function (deleteData, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.createDeleteMsg = event.target.id;
                        return [4 /*yield*/, this.deleteConfirm(deleteData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupStorageLocationGroupsHomeComponent.prototype.deleteConfirm = function (deleteData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.blnShowOrgGroupLabel == true) {
                    this.strOrgGrpId = this.orgGrpId;
                }
                else {
                    this.strOrgGrpId = this.selectedOrgGroupId;
                }
                try {
                    this.growlMessage = [];
                    this.confirmationService.confirm({
                        message: "Are you sure you want to delete  " + deleteData.STORAGE_ZONE_ID + "?",
                        accept: function () {
                            _this.storageLocationService.UpdateZones(deleteData.STORAGE_ZONE_ID, deleteData.STORAGE_ZONE_DESCR, 0, deleteData.ORG_GROUP_ID).
                                catch(_this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.blnDeleteMessage = true;
                                        var statusMessage = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", "Zone").replace("2%", deleteData.STORAGE_ZONE_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        _this.selectedZone = "";
                                        _this.selectedDescription = "";
                                        // this.GetData();
                                        for (var i = 0; i < _this.lstDBData.length; i++) {
                                            if (_this.lstDBData[i].STORAGE_ZONE_ID == deleteData.STORAGE_ZONE_ID && _this.lstDBData[i].STORAGE_ZONE_DESCR == deleteData.STORAGE_ZONE_DESCR && _this.lstDBData[i].ORG_GROUP_ID == deleteData.ORG_GROUP_ID) {
                                                var index = _this.lstDBData.indexOf(_this.lstDBData[i], 0);
                                                _this.lstDBData.splice(index, 1);
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.blnDeleteMessage = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.blnDeleteMessage = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.blnDeleteMessage = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            });
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "deleteConfirm");
                }
                return [2 /*return*/];
            });
        });
    };
    SetupStorageLocationGroupsHomeComponent.prototype.clientErrorMsg = function (strExMsg, funname) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funname, this.constructor.name);
    };
    SetupStorageLocationGroupsHomeComponent.prototype.AssignStorageLocation = function (zoneRowData) {
        return __awaiter(this, void 0, void 0, function () {
            var navigationExtras;
            return __generator(this, function (_a) {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Manage Zone Storage Location';
                this.breadCrumbMenu.IS_DIV = false;
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.atParSharedDataService.storage = { "zoneRowData": zoneRowData };
                navigationExtras = {
                    queryParams: {
                        "mode": AtParEnums_3.ModeEnum.Edit,
                    },
                    relativeTo: this.route
                };
                this.router.navigate(['assign'], navigationExtras);
                return [2 /*return*/];
            });
        });
    };
    SetupStorageLocationGroupsHomeComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstOrgGroups = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
    };
    SetupStorageLocationGroupsHomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-storage-location-groups.component.home.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, atpar_setup_storage_location_groups_component_service_1.setupStorageLocationGroupServices, api_1.ConfirmationService],
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, datatableservice_1.datatableservice,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            atpar_setup_storage_location_groups_component_service_1.setupStorageLocationGroupServices,
            AtParSharedDataService_1.AtParSharedDataService,
            AtParConstants_1.AtParConstants,
            router_1.Router,
            api_1.ConfirmationService,
            router_1.ActivatedRoute])
    ], SetupStorageLocationGroupsHomeComponent);
    return SetupStorageLocationGroupsHomeComponent;
}());
exports.SetupStorageLocationGroupsHomeComponent = SetupStorageLocationGroupsHomeComponent;
//# sourceMappingURL=atpar-setup-storage-location-groups.component.home.js.map