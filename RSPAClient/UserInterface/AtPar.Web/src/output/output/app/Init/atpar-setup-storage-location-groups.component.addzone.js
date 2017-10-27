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
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_setup_storage_location_groups_component_service_1 = require("../../app/Init/atpar-setup-storage-location-groups.component.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var MT_ATPAR_STORAGE_ZONE_1 = require("../../app/Entities/MT_ATPAR_STORAGE_ZONE");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupStorageLocationAddZoneComponent = (function () {
    function SetupStorageLocationAddZoneComponent(httpService, router, spinnerService, route, atParConstant, commonService, storageLocationService, atParSharedDataService) {
        this.httpService = httpService;
        this.router = router;
        this.spinnerService = spinnerService;
        this.route = route;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.storageLocationService = storageLocationService;
        this.atParSharedDataService = atParSharedDataService;
        this.newItem = new MT_ATPAR_STORAGE_ZONE_1.MT_ATPAR_STORAGE_ZONE();
        this.deviceTokenEntry = [];
        this.lstOrgGroups = [];
        this.blnShowOrgGroupDD = false;
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.lstFilteredBUnits = [];
        this.lstBUnits = [];
        this.showGrid = false;
        this.selectedBunit = "";
        this.selectedArea = "";
        this.selectedOrgGroupId = "";
        this.strOrgGrpId = "";
        this.selectedZone = "";
        this.selectedDescription = "";
        this.OrgGroupID = "";
        this.loading = true;
        this.focus = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupStorageLocationAddZoneComponent.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.bindOrgGroups();
        this.focus = true;
    };
    SetupStorageLocationAddZoneComponent.prototype.bindOrgGroups = function () {
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
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + " " + "-" + " " + _this.orgGroupData[0].ORG_GROUP_NAME;
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
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
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
    SetupStorageLocationAddZoneComponent.prototype.ddlOrgGpChange = function () {
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select Org" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgGpStatus = 1;
            }
            else {
                this.ddlOrgGpStatus = 0;
            }
        }
        else if (this.blnShowOrgGroupLabel) {
            this.ddlOrgGpStatus = 0;
        }
        if (this.ccstatus == 0 && this.ddlOrgGpStatus == 0 && (this.selectedZone != "" && this.selectedZone != undefined && this.selectedZone != null)) {
            if (this.descstatus == 0 || this.descstatus == undefined) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        else {
            this.loading = true;
        }
    };
    SetupStorageLocationAddZoneComponent.prototype.bindModelDataChange = function (event) {
        //this.descstatus = null;
        try {
            if ("Zone" == event.TextBoxID.toString()) {
                this.ccstatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("Description" == event.TextBoxID.toString()) {
                this.descstatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            this.ddlOrgGpChange();
            //validations satisfies r not 
            if (this.ccstatus == 0 && this.ddlOrgGpStatus == 0) {
                if (this.descstatus == 0 || this.descstatus == undefined) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            else {
                this.loading = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    };
    SetupStorageLocationAddZoneComponent.prototype.createZones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.OrgGroupID = this.orgGrpId.split("-")[0];
                        }
                        else {
                            this.OrgGroupID = this.selectedOrgGroupId;
                        }
                        if (this.OrgGroupID == "" || this.OrgGroupID == "Select One") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Org Group ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        if (this.selectedZone == "" || this.selectedZone == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Zone" });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.storageLocationService.InsertStorageZoneGroups(this.selectedZone, this.selectedDescription, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.OrgGroupID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.showGrid = true;
                                        var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Zone").replace("2%", _this.selectedZone);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        _this.focus = true;
                                        if (_this.blnShowOrgGroupDD) {
                                            document.getElementById("txtddllstOrgGroups").focus();
                                        }
                                        else {
                                            document.getElementById("Zone").focus();
                                        }
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedZone = "";
                                        _this.selectedDescription = "";
                                        _this.loading = true;
                                        _this.ccstatus = null;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        if (data.StatusMessage === "already Exists") {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Zone " + _this.selectedZone + " for Org Group " + _this.toTitleCase(_this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]) + " " + data.StatusMessage });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        document.getElementById("Zone").focus();
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedZone = "";
                                        _this.selectedDescription = "";
                                        _this.loading = true;
                                        _this.ccstatus = null;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedZone = "";
                                        _this.selectedDescription = "";
                                        _this.loading = true;
                                        _this.ccstatus = null;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.selectedOrgGroupId = "";
                                        _this.selectedZone = "";
                                        _this.selectedDescription = "";
                                        _this.loading = true;
                                        _this.ccstatus = null;
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
                        this.clientErrorMsg(ex_2, "createZones");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupStorageLocationAddZoneComponent.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
    SetupStorageLocationAddZoneComponent.prototype.navigateToStorageLocationsHome = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var navigationExtras = {
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    };
    SetupStorageLocationAddZoneComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SetupStorageLocationAddZoneComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
    };
    SetupStorageLocationAddZoneComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-storage-location-groups.component.addzone.html',
            providers: [atpar_setup_storage_location_groups_component_service_1.setupStorageLocationGroupServices, AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            router_1.Router,
            event_spinner_service_1.SpinnerService,
            router_1.ActivatedRoute,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService,
            atpar_setup_storage_location_groups_component_service_1.setupStorageLocationGroupServices,
            AtParSharedDataService_1.AtParSharedDataService])
    ], SetupStorageLocationAddZoneComponent);
    return SetupStorageLocationAddZoneComponent;
}());
exports.SetupStorageLocationAddZoneComponent = SetupStorageLocationAddZoneComponent;
//# sourceMappingURL=atpar-setup-storage-location-groups.component.addzone.js.map