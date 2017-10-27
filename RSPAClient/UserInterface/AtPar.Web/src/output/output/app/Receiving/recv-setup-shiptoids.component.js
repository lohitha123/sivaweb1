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
var VM_RECV_SETUPSHIPTO_ID_ALLOCATION_1 = require("../../app/Entities/VM_RECV_SETUPSHIPTO_ID_ALLOCATION");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var recv_setup_shiptoids_service_1 = require("./recv-setup-shiptoids.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var platform_browser_1 = require("@angular/platform-browser");
var SetupShipToIdsComponent = (function () {
    function SetupShipToIdsComponent(dataservice, httpService, spinnerService, commonService, setupShpIdsServices, document, atParConstant) {
        this.dataservice = dataservice;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.setupShpIdsServices = setupShpIdsServices;
        this.document = document;
        this.atParConstant = atParConstant;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.statusType = "";
        this.pop = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.lstBusinessData = [];
        this.ddlBusinessData = [];
        this.selectedOrgID = '';
        this.disableAdd = false;
        this.disableUpdate = false;
        this._strStatus = "";
        this.status = false;
        this.ShipToID = '';
        this.ShipToName = '';
        this.selectedStatus = false;
        this.strShipToID = "";
        this.strShipToName = "";
        this.SETID = "";
        this.SHIPTO_ID = "";
        this.SHIPTO_NAME = "";
        this.ADDRESS1 = "";
        this.CITY = "";
        this.STATE = "";
        this.ZIP = "";
        this.PHONE = "";
        this.ATTENTION_TO = "";
        this.COMMENT = "";
        this.editShipToIDDatas = "";
        this.editOrgID = '';
        this.OrgIDStatus = 1;
        this.breadCrumbMenu = new routepath_1.Menus();
        this.newItem = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION_1.VM_RECV_SETUPSHIPTO_ID_ALLOCATION();
    }
    SetupShipToIdsComponent.prototype.edit = function (ven) {
        try {
            this.editform = true;
            this.form = false;
            this.page = false;
            this.pop = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "edit");
        }
    };
    SetupShipToIdsComponent.prototype.btnBack_Click = function () {
        try {
            this.growlMessage = [];
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.selectedOrgID = "Select Org";
            this.ShipToID = "";
            this.ShipToName = "";
            this.form = false;
            this.page = true;
            this.pop = false;
            this.editform = false;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnBack_Click");
        }
    };
    SetupShipToIdsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                    this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    this.addStatusTypes();
                    this.populateBusinessUnits();
                    this.mainlstGridData = new Array();
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    SetupShipToIdsComponent.prototype.addStatusTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.ddlStatusType = [];
                this.ddlStatusType.push({ label: 'All', value: "" });
                this.ddlStatusType.push({ label: 'Active', value: true });
                this.ddlStatusType.push({ label: 'InActive', value: false });
                return [2 /*return*/];
            });
        });
    };
    SetupShipToIdsComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist_1, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        isOrgBUnitsExist_1 = false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getBusinessUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.BusinessType.Purchasing.toString())
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.ddlBusinessData = [];
                                _this.ddlBusinessData.push({ label: "Select Org", value: "Select Org" });
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBusinessData = data.DataList;
                                        if (_this.lstBusinessData.length > 0) {
                                            for (var i = 0; i < _this.lstBusinessData.length; i++) {
                                                _this.ddlBusinessData.push({ label: _this.lstBusinessData[i].toString(), value: _this.lstBusinessData[i].toString() });
                                            }
                                        }
                                        _this.selectedOrgID = _this.ddlBusinessData[0].value;
                                        isOrgBUnitsExist_1 = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist_1 = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist_1 = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist_1 = false;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "populateBusinessUnits");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupShipToIdsComponent.prototype.getShiptoIdDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist_2, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.ddlBusinessData = [];
                        isOrgBUnitsExist_2 = false;
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getBusinessUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.BusinessType.Purchasing.toString())
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBusinessData = data.DataList;
                                        if (_this.lstBusinessData.length > 0) {
                                            for (var i = 0; i < _this.lstBusinessData.length; i++) {
                                                _this.ddlBusinessData.push({ label: _this.lstBusinessData[i], value: _this.lstBusinessData[i] });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist_2 = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist_2 = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist_2 = false;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getShipToIDS()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getShiptoIdDetails");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupShipToIdsComponent.prototype.btnAddShipToID_Click = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add ShipTo ID';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.selectedOrgID = "";
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.disableAdd = true;
        try {
            this.spinnerService.start();
            this.populateBusinessUnits();
            this.spinnerService.stop();
            this.newItem = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION_1.VM_RECV_SETUPSHIPTO_ID_ALLOCATION;
            this.addselectedOrgID = "";
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnAddShipToID_Click");
        }
    };
    SetupShipToIdsComponent.prototype.getShipToIDS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.mainlstGridData = [];
                        this.spinnerService.start();
                        if (this.ShipToID != "" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null) {
                            this.strShipToID = this.ShipToID;
                        }
                        if (this.ShipToName != "" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null) {
                            this.strShipToName = this.ShipToName;
                        }
                        return [4 /*yield*/, this.setupShpIdsServices.getShipToIDs(this.selectedOrgID, this.ShipToID, this.ShipToName, "", this.lstBusinessData, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList.length > 0) {
                                            _this.lstShipToIDAllc = data.DataList;
                                            for (var i = 0; i < _this.lstShipToIDAllc.length; i++) {
                                                if (_this.lstShipToIDAllc[i].ACTIVESTATUS == "Active") {
                                                    _this.lstShipToIDAllc[i].CURRENTSTATUS = false;
                                                }
                                                else {
                                                    _this.lstShipToIDAllc[i].CURRENTSTATUS = true;
                                                }
                                                _this.mainlstGridData.push(_this.lstShipToIDAllc[i]);
                                            }
                                            _this.pop = true;
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.pop = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.pop = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.pop = false;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getShipToIDS");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupShipToIdsComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.pop = false;
                        this.statusType = "";
                        return [4 /*yield*/, this.addStatusTypes()];
                    case 1:
                        _a.sent();
                        if (this.pop) {
                            this.dataTableComponent.reset();
                        }
                        this.growlMessage = [];
                        if (!(this.selectedOrgID == "Select Org")) return [3 /*break*/, 2];
                        this.pop = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.getShipToIDS()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "btnGo_Click");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SetupShipToIdsComponent.prototype.ddlOrgIdChanged = function () {
        try {
            if (this.form) {
                if (this.addselectedOrgID == "Select Org" || this.addselectedOrgID == "" || this.addselectedOrgID == undefined || this.addselectedOrgID == null) {
                    this.OrgIDStatus = 1;
                }
                else {
                    this.OrgIDStatus = 0;
                }
            }
            if (this.editform) {
                this.ShipToIDStstaus = 0;
                if ((this.editShipToIDDatas == "Select Org" || this.editShipToIDDatas == "" || this.editShipToIDDatas == undefined || this.editShipToIDDatas == null)) {
                    this.OrgIDStatus = 1;
                }
                else {
                    this.OrgIDStatus = 0;
                }
            }
            if (this.ShipToIDStstaus == 0 && this.OrgIDStatus == 0 && (this.newItem.SHIPTO_ID != "" || this.newItem.SHIPTO_ID != undefined || this.newItem.SHIPTO_ID != null)) {
                if ((this.ShipToNameStatus == 0 || this.ShipToNameStatus == undefined) &&
                    (this.Address1Status == 0 || this.Address1Status == undefined) &&
                    (this.CityStatus == 0 || this.CityStatus == undefined) &&
                    (this.StateStatus == 0 || this.StateStatus == undefined) &&
                    (this.ZipStatus == 0 || this.ZipStatus == undefined) &&
                    (this.tPhoneStatus == 0 || this.tPhoneStatus == undefined) &&
                    (this.AttentionToStatus == 0 || this.AttentionToStatus == undefined) &&
                    (this.CommentStatus == 0 || this.CommentStatus == undefined)) {
                    this.disableAdd = false;
                    this.disableUpdate = false;
                }
                else {
                    this.disableAdd = true;
                    this.disableUpdate = true;
                }
            }
            else {
                this.disableAdd = true;
                this.disableUpdate = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgIdChanged");
        }
    };
    SetupShipToIdsComponent.prototype.btnSave_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstShipToIDs = [];
                        this.newItem.SHIPTO_NAME = this.newItem.DESCR;
                        this.newItem.ORG_ID = this.addselectedOrgID;
                        this.newItem.STATUS = true;
                        this.lstShipToIDs.push(this.newItem);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupShpIdsServices.insertShipToIDs(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstShipToIDs)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMesssage = AtParConstants_1.AtParConstants.Added_Msg.replace("1%", "ShipTo ID").replace("2%", _this.newItem.SHIPTO_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                        _this.OrgIDStatus = 1;
                                        _this.form = true;
                                        _this.page = false;
                                        document.getElementById("ShipToId").focus();
                                        _this.disableAdd = true;
                                        _this.newItem = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION_1.VM_RECV_SETUPSHIPTO_ID_ALLOCATION();
                                        _this.addselectedOrgID = "";
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
                                _this.atParConstant.scrollToTop();
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "btnSave_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupShipToIdsComponent.prototype.btnUpdate_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstShipToIDs = [];
                        if (this.editOrgID != this.editShipToIDDatas) {
                            this.NewOrgId = '*' + this.editShipToIDDatas;
                            this.newItem.ORG_ID = this.editOrgID;
                        }
                        else {
                            this.NewOrgId = this.editShipToIDDatas;
                            this.newItem.ORG_ID = this.editShipToIDDatas;
                        }
                        this.newItem.SHIPTO_NAME = this.newItem.DESCR;
                        this.lstShipToIDs.push(this.newItem);
                        for (i = 0; i < this.lstShipToIDs.length; i++) {
                            if (this.lstShipToIDs[i].STATUS == false) {
                                this.lstShipToIDs[i].STATUS = true;
                            }
                        }
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupShpIdsServices.updateShiptoIDs(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstShipToIDs, this.NewOrgId)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    _this.editShipToIDDatas = _this.editOrgID;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "ShipTo ID").replace("2%", _this.newItem.SHIPTO_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMesssage });
                                        _this.editform = true;
                                        _this.page = false;
                                        _this.form = false;
                                        document.getElementById("txtddlOrgID").focus();
                                        _this.OrgIDStatus = 1;
                                        _this.ShipToIDStstaus = 1;
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
                                _this.atParConstant.scrollToTop();
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "btnUpdate_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupShipToIdsComponent.prototype.updateShiptoIDStatus = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var prStatus, statuscode_1, exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        prStatus = status.STATUS;
                        this.growlMessage = [];
                        this.spinnerService.start;
                        return [4 /*yield*/, this.setupShpIdsServices.updateShipToIDStatus(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], status.ORG_ID, status.SHIPTO_ID, status.CURRENTSTATUS)
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, filterData, matchedrecord, x, lstVendorDetails;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    statuscode_1 = data.StatusCode;
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            this.growlMessage = [];
                                            this.statusMesssage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "ShipTo ID").replace("2%", status.SHIPTO_ID + ' Status');
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                                            this.editform = false;
                                            this.page = true;
                                            this.form = false;
                                            filterData = [];
                                            this.lstShipToIDAllc = [];
                                            matchedrecord = this.mainlstGridData.filter(function (x) { return x.SHIPTO_ID == status.SHIPTO_ID; });
                                            matchedrecord[0].CURRENTSTATUS = status.CURRENTSTATUS;
                                            if (this.statusType.toString() == "false") {
                                                filterData = this.mainlstGridData.filter(function (x) { return x.CURRENTSTATUS == false; });
                                            }
                                            else if (this.statusType.toString() == "true") {
                                                filterData = this.mainlstGridData.filter(function (x) { return x.CURRENTSTATUS == true; });
                                            }
                                            else {
                                                filterData = this.mainlstGridData;
                                            }
                                            if (filterData != null) {
                                                for (x = 0; x < filterData.length; x++) {
                                                    lstVendorDetails = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION_1.VM_RECV_SETUPSHIPTO_ID_ALLOCATION();
                                                    lstVendorDetails.ORG_ID = filterData[x].ORG_ID;
                                                    lstVendorDetails.SHIPTO_ID = filterData[x].SHIPTO_ID;
                                                    lstVendorDetails.SHIPTO_NAME = filterData[x].SHIPTO_NAME;
                                                    lstVendorDetails.ADDRESS_1 = filterData[x].ADDRESS_1;
                                                    lstVendorDetails.CITY = filterData[x].CITY;
                                                    lstVendorDetails.STATE = filterData[x].STATE;
                                                    lstVendorDetails.ZIP = filterData[x].ZIP;
                                                    lstVendorDetails.PHONE_NO = filterData[x].PHONE_NO;
                                                    lstVendorDetails.STATUS = filterData[x].STATUS;
                                                    lstVendorDetails.CITY = filterData[x].CITY;
                                                    lstVendorDetails.ATTENTION_TO = filterData[x].ATTENTION_TO;
                                                    lstVendorDetails.COMMENTS = filterData[x].COMMENTS;
                                                    lstVendorDetails.CHK_VALUE = filterData[x].CHK_VALUE;
                                                    lstVendorDetails.CHK_ALLOCATED = filterData[x].CHK_ALLOCATED;
                                                    lstVendorDetails.ROWINDEX = filterData[x].ROWINDEX;
                                                    lstVendorDetails.DESCR = filterData[x].DESCR;
                                                    lstVendorDetails.CURRENTSTATUS = filterData[x].CURRENTSTATUS;
                                                    //   lstVendorDetails.ACTIVESTATUS = filterData[x].ACTIVESTATUS;
                                                    lstVendorDetails.EFF_STATUS = filterData[x].EFF_STATUS;
                                                    lstVendorDetails.USER_ID = filterData[x].USER_ID;
                                                    lstVendorDetails.SETID = filterData[x].SETID;
                                                    lstVendorDetails.checkvalue = filterData[x].checkvalue;
                                                    lstVendorDetails.LAST_UPDATE_USERID = filterData[x].LAST_UPDATE_USERID;
                                                    this.lstShipToIDAllc.push(lstVendorDetails);
                                                }
                                            }
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            if (data.StatusCode == "1142311") {
                                                status.CURRENTSTATUS = !status.CURRENTSTATUS;
                                            }
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/, statuscode_1];
                    case 2:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1, "updateShiptoIDStatus");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupShipToIdsComponent.prototype.statusShipToIDUpdate = function (setupshipid) {
        return __awaiter(this, void 0, void 0, function () {
            var exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.updateShiptoIDStatus(setupshipid)];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2, "statusShipToIDUpdate");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupShipToIdsComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, lstVendorDetails;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.lstShipToIDAllc.length = 0;
                if (this.statusType.toString() == "true") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.CURRENTSTATUS == true; });
                }
                else if (this.statusType.toString() == "false") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.CURRENTSTATUS == false; });
                }
                else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        lstVendorDetails = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION_1.VM_RECV_SETUPSHIPTO_ID_ALLOCATION();
                        lstVendorDetails.ORG_ID = filterData[x].ORG_ID;
                        lstVendorDetails.SHIPTO_ID = filterData[x].SHIPTO_ID;
                        lstVendorDetails.SHIPTO_NAME = filterData[x].SHIPTO_NAME;
                        lstVendorDetails.ADDRESS_1 = filterData[x].ADDRESS_1;
                        lstVendorDetails.CITY = filterData[x].CITY;
                        lstVendorDetails.STATE = filterData[x].STATE;
                        lstVendorDetails.ZIP = filterData[x].ZIP;
                        lstVendorDetails.PHONE_NO = filterData[x].PHONE_NO;
                        lstVendorDetails.STATUS = filterData[x].BILL_ONLY_EMAIL;
                        lstVendorDetails.ATTENTION_TO = filterData[x].ATTENTION_TO;
                        lstVendorDetails.COMMENTS = filterData[x].COMMENTS;
                        lstVendorDetails.CHK_VALUE = filterData[x].CHK_VALUE;
                        lstVendorDetails.CHK_ALLOCATED = filterData[x].CHK_ALLOCATED;
                        lstVendorDetails.ROWINDEX = filterData[x].ROWINDEX;
                        lstVendorDetails.DESCR = filterData[x].DESCR;
                        lstVendorDetails.CURRENTSTATUS = filterData[x].CURRENTSTATUS;
                        // lstVendorDetails.ACTIVESTATUS = filterData[x].ACTIVESTATUS;
                        lstVendorDetails.EFF_STATUS = filterData[x].EFF_STATUS;
                        lstVendorDetails.USER_ID = filterData[x].USER_ID;
                        lstVendorDetails.SETID = filterData[x].SETID;
                        lstVendorDetails.checkvalue = filterData[x].checkvalue;
                        lstVendorDetails.LAST_UPDATE_USERID = filterData[x].LAST_UPDATE_USERID;
                        this.lstShipToIDAllc.push(lstVendorDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    SetupShipToIdsComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("ShipToId" == event.TextBoxID.toString()) {
                this.ShipToIDStstaus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("ShipToName" == event.TextBoxID.toString()) {
                this.ShipToNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("Address1" == event.TextBoxID.toString()) {
                this.Address1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("City" == event.TextBoxID.toString()) {
                this.CityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("State" == event.TextBoxID.toString()) {
                this.StateStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("Zip" == event.TextBoxID.toString()) {
                this.ZipStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("Phone" == event.TextBoxID.toString()) {
                this.tPhoneStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("AttentionTo" == event.TextBoxID.toString()) {
                this.AttentionToStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("Comment" == event.TextBoxID.toString()) {
                this.CommentStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.editform) {
                this.ShipToIDStstaus = 0;
                this.OrgIDStatus = 0;
            }
            if (this.ShipToIDStstaus == 0 && this.OrgIDStatus == 0) {
                if ((this.ShipToNameStatus == 0 || this.ShipToNameStatus == undefined) &&
                    (this.Address1Status == 0 || this.Address1Status == undefined) &&
                    (this.CityStatus == 0 || this.CityStatus == undefined) &&
                    (this.StateStatus == 0 || this.StateStatus == undefined) &&
                    (this.ZipStatus == 0 || this.ZipStatus == undefined) &&
                    (this.tPhoneStatus == 0 || this.tPhoneStatus == undefined) &&
                    (this.AttentionToStatus == 0 || this.AttentionToStatus == undefined) &&
                    (this.CommentStatus == 0 || this.CommentStatus == undefined)) {
                    this.disableAdd = false;
                    this.disableUpdate = false;
                }
                else {
                    this.disableAdd = true;
                    this.disableUpdate = true;
                }
            }
            else {
                this.disableAdd = true;
                this.disableUpdate = true;
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    };
    SetupShipToIdsComponent.prototype.editShipToIDData = function (ven) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit ShipTo ID';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.newItem = ven;
            this.editform = true;
            this.editShipToIDDatas = ven.SETID;
            this.editOrgID = ven.SETID;
            this.pop = false;
            this.page = false;
            this.form = false;
            this.disableUpdate = false;
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "editShipToIDData");
        }
    };
    SetupShipToIdsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SetupShipToIdsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.growlMessage = null;
        this.recordsPerPageSize = null;
        this.ddlBusinessData = null;
        this.ddlStatusType = null;
        this.newItem = null;
        this.lstShipToIDAllc = null;
        this.lstBusinessData = null;
        this.spinnerService = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupShipToIdsComponent.prototype, "dataTableComponent", void 0);
    SetupShipToIdsComponent = __decorate([
        core_1.Component({
            templateUrl: 'recv-setup-shiptoids.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, recv_setup_shiptoids_service_1.SetupShipToIDsServices, HttpService_1.HttpService, AtParConstants_1.AtParConstants]
        }),
        __param(5, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            recv_setup_shiptoids_service_1.SetupShipToIDsServices, Object, AtParConstants_1.AtParConstants])
    ], SetupShipToIdsComponent);
    return SetupShipToIdsComponent;
}());
exports.SetupShipToIdsComponent = SetupShipToIdsComponent;
//# sourceMappingURL=recv-setup-shiptoids.component.js.map