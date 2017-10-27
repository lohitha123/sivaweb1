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
var AtParEnums_2 = require("../Shared/AtParEnums");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupStorageLocationAssign = (function () {
    function SetupStorageLocationAssign(httpService, router, spinnerService, route, atParConstant, commonService, storageLocationService, atParSharedDataService) {
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
        this.growlMessage = [];
        this.lstFilteredBUnits = [];
        this.lstBUnits = [];
        this.showGrid = false;
        this.selectedBunit = "";
        this.selectedArea = "";
        this.blnsortbycolumn = true;
        this.preField = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupStorageLocationAssign.prototype.ngOnInit = function () {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.newItem = this.atParSharedDataService.storage.zoneRowData;
        this.orgGrpId = this.newItem.ORG_GROUP_ID;
        this.GetOrgName();
        this.GetBusinessUnits();
    };
    SetupStorageLocationAssign.prototype.GetOrgName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgGrpName(this.newItem.ORG_GROUP_ID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.newItem.ORG_GROUP_ID = _this.newItem.ORG_GROUP_ID + " " + "-" + " " + data.Data;
                                        _this.spinnerService.stop();
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
                        this.clientErrorMsg(ex_1, "GetOrgName");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupStorageLocationAssign.prototype.GetBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGrpId, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstFilteredBUnits = data.DataList;
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
                        this.clientErrorMsg(ex_2, "GetBusinessUnits");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupStorageLocationAssign.prototype.fillBUnitsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredBUnits = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGrpId, AtParEnums_2.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBUnits = data.DataList;
                                        _this.lstFilteredBUnits = _this.filterBusinessUnits(query, _this.lstBUnits);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "fillBUnitsAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupStorageLocationAssign.prototype.filterBusinessUnits = function (query, businessunits) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < businessunits.length; i++) {
                var Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue);
            }
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i < businessunits.length; i++) {
                    var Bunitvalue = businessunits[i];
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    };
    SetupStorageLocationAssign.prototype.GetZoneStorageLevelDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        if (this.selectedBunit == "") {
                            this.showGrid = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Org ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.lstDBMainDetails = [];
                        return [4 /*yield*/, this.storageLocationService.GetZoneStorageLevelDetails(this.orgGrpId, this.newItem.STORAGE_ZONE_ID, this.selectedBunit, this.selectedArea, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstDBData = data.DataList;
                                        _this.lstCheckedData = [];
                                        _this.lstUnCheckedData = [];
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            _this.lstDBData[i].SNo = i + 1;
                                            if (_this.lstDBData[i].CHK_VALUE == 1) {
                                                _this.lstCheckedData.push(_this.lstDBData[i]);
                                                _this.lstDBData[i].checkvalue = true;
                                            }
                                            else {
                                                _this.lstDBData[i].checkvalue = false;
                                                _this.lstUnCheckedData.push(_this.lstDBData[i]);
                                            }
                                        }
                                        for (var k = 0; k < _this.lstDBData.length; k++) {
                                            _this.lstDBMainDetails.push(_this.lstDBData[k]);
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "GetZoneStorageLevelDetails");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupStorageLocationAssign.prototype.selectedRow = function (selectedRowData, event) {
        if (event == true) {
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (selectedRowData.SNo == this.lstDBData[i].SNo) {
                    this.lstDBData[i].CHK_VALUE = 1;
                }
            }
        }
        else {
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (selectedRowData.SNo == this.lstDBData[i].SNo) {
                    this.lstDBData[i].CHK_VALUE = 0;
                }
            }
        }
    };
    SetupStorageLocationAssign.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstDBData[i].checkvalue = true;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    SetupStorageLocationAssign.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstDBData[i].checkvalue = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    SetupStorageLocationAssign.prototype.InsertZoneStorageLevels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            if (this.lstDBData[i].CHK_VALUE == 1 && this.lstDBData[i].CHK_ALLOCATED == "0") {
                                this.lstDBData[i].PERFORM_ACTION = 1;
                            }
                            else if (this.lstDBData[i].CHK_VALUE == 0 && this.lstDBData[i].CHK_ALLOCATED == "1") {
                                this.lstDBData[i].PERFORM_ACTION = 2;
                            }
                            else {
                                this.lstDBData[i].PERFORM_ACTION = 0;
                            }
                        }
                        this.lstDBData = this.lstDBData.filter(function (x) { return x.PERFORM_ACTION > 0; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.storageLocationService.InsertZoneStorageLevels(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGrpId, this.newItem.STORAGE_ZONE_ID, this.lstDBMainDetails).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.showGrid = false;
                                        var statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Zone").replace("2%", _this.newItem.STORAGE_ZONE_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        _this.selectedBunit = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.selectedBunit = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.selectedBunit = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.selectedBunit = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "InsertZoneStorageLevels");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupStorageLocationAssign.prototype.customSort = function (event, field) {
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            }
            else {
                element.order = 1;
            }
            // element.order = !element.order;
        }
        else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        var result = null;
        var order;
        try {
            this.sortedcheckedrec = this.lstCheckedData.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
            this.sorteduncheckedrec = this.lstUnCheckedData.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    SetupStorageLocationAssign.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        console.log(event);
        this.lstgridfilterData = event;
    };
    SetupStorageLocationAssign.prototype.navigateToStorageLocationsHome = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var navigationExtras = {
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    };
    SetupStorageLocationAssign.prototype.clientErrorMsg = function (strExMsg, funname) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funname, this.constructor.name);
    };
    SetupStorageLocationAssign.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    };
    SetupStorageLocationAssign = __decorate([
        core_1.Component({
            templateUrl: 'atpar-setup-storage-location-groups.component.Assign.html',
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
    ], SetupStorageLocationAssign);
    return SetupStorageLocationAssign;
}());
exports.SetupStorageLocationAssign = SetupStorageLocationAssign;
//# sourceMappingURL=atpar-setup-storage-location-groups.component.Assign.js.map