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
var pou_setup_physicians_services_1 = require("./pou-setup-physicians.services");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var mt_pou_physician_1 = require("../../app/Entities/mt_pou_physician");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var api_1 = require("../components/common/api");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupPhysiciansComponent = (function () {
    function SetupPhysiciansComponent(dataservice, setupPhysicianServices, httpService, spinnerService, commonService, atParConstant, confirmationService) {
        this.dataservice = dataservice;
        this.setupPhysicianServices = setupPhysicianServices;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.showGrid = false;
        this.showAddButton = true;
        this.addPhysiciaId = "";
        this.addPhsysicianFname = "";
        this.addPhsysicianLname = "";
        this.addPhsysicianMname = "";
        this.validationPhysicianMname = 0;
        this.isDuplicateExists = false;
        this.disabled = false;
        this.div1 = true;
        this.addFrom = false;
        this.loading = true;
        this.updatePhysicianId = "";
        this.statusValue = false;
        this.statusType = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    SetupPhysiciansComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    this.mainlstGridData = new Array();
                    this.spinnerService.stop();
                    this.ddlStatusType = [];
                    this.ddlStatusType.push({ label: 'All', value: "" });
                    this.ddlStatusType.push({ label: 'Active', value: true });
                    this.ddlStatusType.push({ label: 'InActive', value: false });
                }
                catch (exMsg) {
                    this.clientErrorMsg(exMsg);
                }
                return [2 /*return*/];
            });
        });
    };
    SetupPhysiciansComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    SetupPhysiciansComponent.prototype.btn_go = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        //if (this.showGrid) {
                        //    this.dataTableComponent.reset();
                        //}
                        //  this.mainlstGridData = new Array<MT_POU_PHYSICIAN>()
                        this.mainlstGridData = [];
                        this.lstGridData = [];
                        this.statusType = "";
                        this.growlMessage = [];
                        return [4 /*yield*/, this.getPhysicianList()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupPhysiciansComponent.prototype.getPhysicianList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupPhysicianServices.getPhysiciansList(this.addPhysiciaId, this.addPhsysicianFname, this.addPhsysicianLname, this.addPhsysicianMname)
                                .then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            var lstGrid = res.json().DataList;
                                            if (lstGrid.length > 0) {
                                                _this.lstGridData = lstGrid;
                                                for (var x = 0; x < _this.lstGridData.length; x++) {
                                                    var setuPhysicianDetails = new mt_pou_physician_1.MT_POU_PHYSICIAN();
                                                    setuPhysicianDetails.FIRST_NAME = _this.lstGridData[x].FIRST_NAME;
                                                    setuPhysicianDetails.LAST_NAME = _this.lstGridData[x].LAST_NAME;
                                                    setuPhysicianDetails.MIDDLE_INITIAL = _this.lstGridData[x].MIDDLE_INITIAL;
                                                    setuPhysicianDetails.PHYSICIAN_ID = _this.lstGridData[x].PHYSICIAN_ID;
                                                    setuPhysicianDetails.STATUS = !_this.lstGridData[x].STATUS;
                                                    setuPhysicianDetails.UPDATE_DATE = _this.lstGridData[x].UPDATE_DATE;
                                                    setuPhysicianDetails.UPDATE_USERID = _this.lstGridData[x].UPDATE_USERID;
                                                    _this.lstGridData[x].STATUS = !_this.lstGridData[x].STATUS;
                                                    _this.mainlstGridData.push(setuPhysicianDetails);
                                                }
                                                var count = _this.lstGridData.length;
                                                _this.physicianCount = count;
                                                _this.physicianCount = _this.physicianCount + " Physician(s) Found";
                                                _this.showGrid = true;
                                            }
                                            else {
                                                _this.showGrid = false;
                                            }
                                        }
                                        break;
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupPhysiciansComponent.prototype.addPhysician = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Physician';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.addFrom = true;
        this.div1 = false;
        this.showGrid = false;
        this.growlMessage = [];
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        this.physiciansDetails = new mt_pou_physician_1.MT_POU_PHYSICIAN();
        this.addPhysiciaId = "";
        this.addPhsysicianFname = "";
        this.addPhsysicianLname = "";
        this.addPhsysicianMname = "";
        this.validationPhysicianId = null;
        this.validationPhysicianFname = null;
        this.validationPhysicianLname = null;
        this.mode = "Add";
        this.loading = true;
    };
    SetupPhysiciansComponent.prototype.saveOrUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode == "Add")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.savePhysician()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.mode == "Edit")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.upDatePhysician()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupPhysiciansComponent.prototype.editPhysician = function (rowData) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Physician';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.addFrom = true;
        this.physiciansDetails = new mt_pou_physician_1.MT_POU_PHYSICIAN();
        this.div1 = false;
        this.showGrid = false;
        this.physiciansDetails.PHYSICIAN_ID = rowData.PHYSICIAN_ID;
        this.physiciansDetails.FIRST_NAME = rowData.FIRST_NAME;
        this.physiciansDetails.LAST_NAME = rowData.LAST_NAME;
        this.physiciansDetails.MIDDLE_INITIAL = rowData.MIDDLE_INITIAL;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        this.disabled = true;
        this.loading = false;
        this.validationPhysicianId = 0;
        this.validationPhysicianLname = 0;
        this.validationPhysicianFname = 0;
    };
    SetupPhysiciansComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.div1 = true;
        this.showGrid = false;
        this.addFrom = false;
        this.growlMessage = [];
        this.mode = null;
        this.disabled = false;
        this.addPhysiciaId = "";
        this.addPhsysicianFname = "";
        this.addPhsysicianLname = "";
        this.addPhsysicianMname = "";
    };
    SetupPhysiciansComponent.prototype.savePhysician = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (this.physiciansDetails.MIDDLE_INITIAL == undefined || this.physiciansDetails.MIDDLE_INITIAL == null) {
                            this.physiciansDetails.MIDDLE_INITIAL = "";
                        }
                        this.physiciansDetails.PHYSICIAN_ID.replace(/\'/g, "''").trim();
                        this.physiciansDetails.FIRST_NAME.replace(/\'/g, "''").trim();
                        this.physiciansDetails.LAST_NAME.replace(/\'/g, "''").trim();
                        this.physiciansDetails.MIDDLE_INITIAL.replace(/\'/g, "''").trim();
                        return [4 /*yield*/, this.checkForDuplicates()];
                    case 2:
                        _a.sent();
                        if (this.isDuplicateExists) {
                            this.growlMessage = [];
                            this.statusMessage = AtParConstants_1.AtParConstants.AlreadyExist_Msg.replace("1%", "Physician").replace("2%", this.physiciansDetails.PHYSICIAN_ID);
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                            this.isDuplicateExists = false;
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupPhysicianServices.addPhysican(this.physiciansDetails.PHYSICIAN_ID, this.physiciansDetails.FIRST_NAME, this.physiciansDetails.LAST_NAME, this.physiciansDetails.MIDDLE_INITIAL, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Physician").replace("2%", _this.physiciansDetails.PHYSICIAN_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                                        _this.physiciansDetails = new mt_pou_physician_1.MT_POU_PHYSICIAN();
                                        _this.loading = true;
                                        _this.physiciansDetails.PHYSICIAN_ID = "";
                                        _this.physiciansDetails.FIRST_NAME = "";
                                        _this.physiciansDetails.LAST_NAME = "";
                                        _this.validationPhysicianId = 1;
                                        _this.validationPhysicianFname = 1;
                                        _this.validationPhysicianLname = 1;
                                        _this.showGrid = false;
                                        document.getElementById("PHYSICIAN_ID").focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SetupPhysiciansComponent.prototype.checkForDuplicates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var selRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPhysicianList()];
                    case 1:
                        _a.sent();
                        if (this.mode == "Add") {
                            if (this.lstGridData != null) {
                                selRows = this.lstGridData.filter(function (x) { return x.PHYSICIAN_ID.toLowerCase().trim() == _this.physiciansDetails.PHYSICIAN_ID.toLowerCase().trim(); });
                                if (selRows.length > 0) {
                                    this.isDuplicateExists = true;
                                }
                            }
                            this.showGrid = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupPhysiciansComponent.prototype.upDatePhysician = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupPhysicianServices.updatePhysicians(this.physiciansDetails.PHYSICIAN_ID, this.physiciansDetails.FIRST_NAME, this.physiciansDetails.LAST_NAME, this.physiciansDetails.MIDDLE_INITIAL, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (webresp) {
                                _this.spinnerService.stop();
                                var response = webresp.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Physician").replace("2%", _this.physiciansDetails.PHYSICIAN_ID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                                        _this.loading = false;
                                        _this.validationPhysicianId = null;
                                        _this.validationPhysicianFname = null;
                                        _this.validationPhysicianLname = null;
                                        document.getElementById("FIRST_NAME").focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupPhysiciansComponent.prototype.confirm = function (physiciandata) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        return [4 /*yield*/, this.confirmationService.confirm({
                                message: 'Are you sure about the change?',
                                accept: function () {
                                    _this.changeStatus(physiciandata);
                                },
                                reject: function () {
                                    physiciandata.STATUS = !physiciandata.STATUS;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupPhysiciansComponent.prototype.changeStatus = function (Physiciandata) {
        this.updatePhysicianId = Physiciandata.PHYSICIAN_ID;
        this.statusValue = Physiciandata.STATUS;
        this.deletePhysician();
    };
    SetupPhysiciansComponent.prototype.deletePhysician = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var status_1, exMsg_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.statusValue == true) {
                            status_1 = "Enable";
                        }
                        else {
                            status_1 = "Disable";
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupPhysicianServices.deletePhysican(this.updatePhysicianId, status_1, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (webresp) {
                                _this.spinnerService.stop();
                                var response = webresp.json();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Physician").replace("2%", _this.updatePhysicianId);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: _this.statusMessage });
                                        var filterData = [];
                                        _this.lstGridData = [];
                                        var matchedrecord = _this.mainlstGridData.filter(function (x) { return x.PHYSICIAN_ID == _this.updatePhysicianId; });
                                        matchedrecord[0].STATUS = _this.statusValue;
                                        if (_this.statusType.toString() == "true") {
                                            filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                                        }
                                        else if (_this.statusType.toString() == "false") {
                                            filterData = _this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                                        }
                                        else {
                                            filterData = _this.mainlstGridData;
                                        }
                                        if (filterData != null) {
                                            for (var x = 0; x < filterData.length; x++) {
                                                var physicianlocDetails = new mt_pou_physician_1.MT_POU_PHYSICIAN();
                                                physicianlocDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                                                physicianlocDetails.LAST_NAME = filterData[x].LAST_NAME;
                                                physicianlocDetails.MIDDLE_INITIAL = filterData[x].MIDDLE_INITIAL;
                                                physicianlocDetails.PHYSICIAN_ID = filterData[x].PHYSICIAN_ID;
                                                physicianlocDetails.UPDATE_USERID = filterData[x].UPDATE_USERID;
                                                physicianlocDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                                                physicianlocDetails.STATUS = filterData[x].STATUS;
                                                _this.lstGridData.push(physicianlocDetails);
                                            }
                                        }
                                        //  this.btn_go();
                                        _this.loading = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_3 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(exMsg_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupPhysiciansComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("PHYSICIAN_ID" == event.TextBoxID.toString()) {
                this.validationPhysicianId = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("FIRST_NAME" == event.TextBoxID.toString()) {
                this.validationPhysicianFname = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("LAST_NAME" == event.TextBoxID.toString()) {
                this.validationPhysicianLname = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("MIDDLE_INITIAL" == event.TextBoxID.toString()) {
                this.validationPhysicianMname = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if (this.validationPhysicianId == 0 && this.validationPhysicianFname == 0 && this.validationPhysicianLname == 0 && this.validationPhysicianMname == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if ((this.validationPhysicianFname == 0 || this.validationPhysicianFname == undefined)
                    && (this.validationPhysicianLname == 0 || this.validationPhysicianLname == undefined)
                    && (this.validationPhysicianMname == 0 || this.validationPhysicianMname == undefined)) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    SetupPhysiciansComponent.prototype.dataFilter = function (evtdata, filed, filterMatchMode) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData, x, physicianlocDetails;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.lstGridData = [];
                if (this.statusType.toString() == "true") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == true; });
                }
                else if (this.statusType.toString() == "false") {
                    filterData = this.mainlstGridData.filter(function (x) { return x.STATUS == false; });
                }
                else {
                    filterData = this.mainlstGridData;
                }
                if (filterData != null) {
                    for (x = 0; x < filterData.length; x++) {
                        physicianlocDetails = new mt_pou_physician_1.MT_POU_PHYSICIAN();
                        physicianlocDetails.FIRST_NAME = filterData[x].FIRST_NAME;
                        physicianlocDetails.LAST_NAME = filterData[x].LAST_NAME;
                        physicianlocDetails.MIDDLE_INITIAL = filterData[x].MIDDLE_INITIAL;
                        physicianlocDetails.PHYSICIAN_ID = filterData[x].PHYSICIAN_ID;
                        physicianlocDetails.UPDATE_USERID = filterData[x].UPDATE_USERID;
                        physicianlocDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                        physicianlocDetails.STATUS = filterData[x].STATUS;
                        this.lstGridData.push(physicianlocDetails);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    SetupPhysiciansComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.showGrid = null;
        this.spinnerService.stop();
        this.pageSize = null;
        this.status = null;
        this.updatePhysicianId = null;
        this.statusMessage = null;
        this.addFrom = null;
        this.addPhsysicianFname = null;
        this.addPhsysicianLname = null;
        this.addPhsysicianMname = null;
        this.addPhysiciaId = null;
        this.validationPhysicianFname = null;
        this.validationPhysicianLname = null;
        this.validationPhysicianMname = null;
        this.showAddButton = null;
        this.disabled = null;
        this.loading = null;
        this.mode = null;
        this.lstGridData = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupPhysiciansComponent.prototype, "dataTableComponent", void 0);
    SetupPhysiciansComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-setup-physicians.component.html',
            providers: [datatableservice_1.datatableservice, pou_setup_physicians_services_1.SetupPhysicianServices, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            pou_setup_physicians_services_1.SetupPhysicianServices,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            api_1.ConfirmationService])
    ], SetupPhysiciansComponent);
    return SetupPhysiciansComponent;
}());
exports.SetupPhysiciansComponent = SetupPhysiciansComponent;
//# sourceMappingURL=pou-setup-physicians.component.js.map