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
var deliver_exclude_locations_services_1 = require("../../app/Deliver/deliver-exclude-locations.services");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var api_1 = require("../components/common/api");
var ExcludeLocationsComponent = (function () {
    function ExcludeLocationsComponent(excludeLocationsService, spinnerService, atParCommonService, httpService, atParConstant, confirmationService) {
        this.excludeLocationsService = excludeLocationsService;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.appID = 10;
        this.deviceTokenEntry = [];
        this.selectedSetID = "";
        this.dataCheckedSorting = [];
        this.selectedLocation = "";
        this.isVisible = false;
        this.growlMessage = [];
        this.lstLocations = [];
        this.blnsortbycolumn = true;
        this.custom = "custom";
    }
    ExcludeLocationsComponent.prototype.ngOnInit = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            this.lstCheckedLocations = new Array();
            this.dataCheckedSorting = new Array();
            this.dataUncheckedSorting = new Array();
            this.lstFilteredLocation = new Array();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    ExcludeLocationsComponent.prototype.selectedRow = function (values, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
            for (var i = 0; i < this.lstCheckedLocations.length; i++) {
                if (this.lstCheckedLocations[i].SETID === values.SETID) {
                    var index = this.lstCheckedLocations.indexOf(this.lstCheckedLocations[i], 0);
                    this.lstCheckedLocations.splice(index, 1);
                }
            }
            this.lstCheckedLocations.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    ExcludeLocationsComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedLocations.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedLocations.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    ExcludeLocationsComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedLocations.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedLocations.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    ExcludeLocationsComponent.prototype.BindDataGrid = function () {
        try {
            var lstDBDataList;
            this.growlMessage = [];
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.dataCheckedSorting.push(this.lstDBData[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.lstDBData[i]);
                }
            }
            if (this.lstDBData != null && this.lstDBData.length > 0) {
                this.isVisible = true;
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
            }
            this.spinnerService.stop();
            this.lstCheckedLocations = new Array();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    ExcludeLocationsComponent.prototype.filterdata = function (event) {
        try {
            this.lstgridfilterData = [];
            this.lstgridfilterData = new Array();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterdata");
        }
    };
    ExcludeLocationsComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.lstDBData = [];
            this.blnsortbycolumn = !this.blnsortbycolumn;
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (this.blnsortbycolumn == false) {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            }
            else {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            this.lstCheckedLocations = new Array();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    ExcludeLocationsComponent.prototype.getAllLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isVisible = false;
                        this.lstgridfilterData = null;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.lstDBData = new Array();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.excludeLocationsService.getAllLocations(this.selectedSetID, this.selectedLocation, this.deviceTokenEntry)
                                .forEach(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = response.DataList;
                                        _this.lstLocations = [];
                                        for (var i = 0; i <= _this.lstDBData.length - 1; i++) {
                                            _this.lstLocations.push(_this.lstDBData[i].SETID);
                                            if (_this.lstDBData[i].CHK_ALLOCATED == 1) {
                                                _this.lstDBData[i].checkvalue = true;
                                            }
                                            else {
                                                _this.lstDBData[i].checkvalue = false;
                                            }
                                        }
                                        _this.BindDataGrid();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.isVisible = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getAllLocations");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ExcludeLocationsComponent.prototype.excludeLocatons = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.excludeLocationsService.excludeLocs(this.lstCheckedLocations, this.deviceTokenEntry)
                        .subscribe(function (response) {
                        _this.growlMessage = [];
                        switch (response.StatType) {
                            case AtParEnums_1.StatusType.Success: {
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                _this.selectedLocation = "";
                                _this.selectedSetID = "";
                                _this.lstCheckedLocations = new Array();
                                _this.isVisible = false;
                                _this.spinnerService.stop();
                                _this.lstDBData = [];
                                break;
                            }
                            case AtParEnums_1.StatusType.Warn: {
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                break;
                            }
                            case AtParEnums_1.StatusType.Error: {
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                _this.isVisible = false;
                                break;
                            }
                            case AtParEnums_1.StatusType.Custom: {
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                _this.spinnerService.stop();
                                _this.isVisible = false;
                                break;
                            }
                        }
                    });
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "excludeLocatons");
                }
                return [2 /*return*/];
            });
        });
    };
    ExcludeLocationsComponent.prototype.confirm = function () {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure Do you want to Submit the Changes ?',
                accept: function () {
                    _this.excludeLocatons();
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirm");
        }
    };
    ExcludeLocationsComponent.prototype.fillLocationsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                this.lstFilteredLocation = [];
                query = event.query;
                this.lstFilteredLocation = this.filteredLoations(query, this.lstLocations);
                return [2 /*return*/];
            });
        });
    };
    ExcludeLocationsComponent.prototype.filteredLoations = function (query, deslocatiions) {
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < deslocatiions.length; i++) {
                    var desLocValue = deslocatiions[i];
                    filtered.push(desLocValue);
                }
            }
            else {
                if (query.length >= 1) {
                    for (var i = 0; i < deslocatiions.length; i++) {
                        var desLocValue = deslocatiions[i];
                        if (desLocValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(desLocValue);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filteredLoations");
        }
    };
    ExcludeLocationsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ExcludeLocationsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstBUnits = null;
        this.lstFilteredLocation = null;
        this.lstCheckedLocations = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.appID = -1;
        this.selectedLocation = null;
    };
    ExcludeLocationsComponent = __decorate([
        core_1.Component({
            templateUrl: 'deliver-exclude-locations.component.html',
            providers: [deliver_exclude_locations_services_1.ExcludeLocationsService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [deliver_exclude_locations_services_1.ExcludeLocationsService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            api_1.ConfirmationService])
    ], ExcludeLocationsComponent);
    return ExcludeLocationsComponent;
}());
exports.ExcludeLocationsComponent = ExcludeLocationsComponent;
//# sourceMappingURL=deliver-exclude-locations.component.js.map