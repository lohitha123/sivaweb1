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
var http_1 = require("@angular/http");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var VM_TKIT_ITEM_DETAILS_1 = require("../../app/Entities/VM_TKIT_ITEM_DETAILS");
var TKIT_ITEM_INVENTORY_1 = require("../../app/Entities/TKIT_ITEM_INVENTORY");
var tkit_manage_equipment_items_service_1 = require("./tkit-manage-equipment-items.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var AtParEnums_2 = require("../Shared/AtParEnums");
var routepath_1 = require("../AtPar/Menus/routepath");
var ManageEquipmentItemsComponent = (function () {
    function ManageEquipmentItemsComponent(dataservice, atParCommonService, spinnerService, atParConstant, manageEquipmentItemsService, httpService, http) {
        this.dataservice = dataservice;
        this.atParCommonService = atParCommonService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.manageEquipmentItemsService = manageEquipmentItemsService;
        this.httpService = httpService;
        this.http = http;
        this.page = true;
        this.showLotSerialFields = false;
        this.showCommentsGrid = false;
        this.minDateValue1 = new Date();
        this.showQuantityLabel = false;
        this.deviceTokenEntry = [];
        this.lstFilteredItems = [];
        this.tkitEqItmLotSerail = [];
        this.tkitItemTypeDetials = [];
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.selectedDeptIDs = [];
        this.onitemidvaluechanged = false;
        this.growlMessage = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.lstItems = [];
        this.showgrid = false;
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.dataCheckedSorting = [];
        this.showitemdetailsFields = false;
        this.showlotserialsgrid = false;
        this.newItem = new VM_TKIT_ITEM_DETAILS_1.VM_TKIT_ITEM_DETAILS();
        this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
        this.showImageColumn = true;
        this.showMfrColumn = true;
        this.showVendorColumn = true;
        this.showDescriptionColumn = true;
        this.showQuantityColumn = false;
        this.showDestructionColumn = true;
        this.showDepartmentsColumn = true;
        this.showAddSerailbutton = false;
        this.selectedDeptDetails = [];
        this.userSelectedFile = '';
        this.disableButton = true;
        this.disablelotserailButton = true;
        this.addnewitembutton = false;
        this.searchFlag = false;
        this.gobutton = false;
        this.editItemDetailsFlag = false;
        this.addItemDetailsFlag = false;
        this.editLotSerialFlag = false;
        this.addLotSerailFlag = false;
        this.updateLotSerialFlag = false;
        this.showImage = false;
        this.additemflag = false;
        this.edititemflag = false;
        this.addserailflag = false;
        this.editserailflag = false;
        this.imgBasePath = '';
        this.enteredDescription = '';
        this.assetfieldpart2 = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageEquipmentItemsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nowDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.growlMessage = [];
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.newItem = new VM_TKIT_ITEM_DETAILS_1.VM_TKIT_ITEM_DETAILS();
                        this.InitializationProperties();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        //for org group data
                        return [4 /*yield*/, this.bindUserOrgGroups()];
                    case 1:
                        //for org group data
                        _a.sent();
                        return [4 /*yield*/, this.GetSearchItems()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.PopulateTypesDropDown()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.PopulateItemsDropDown()];
                    case 4:
                        _a.sent();
                        nowDate = new Date();
                        this.date2 = new Date();
                        this.imgBasePath = window.location.protocol + "//" + window.location.hostname + '/AtPar/Web/Uploaded/';
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.InitializationProperties = function () {
        this.newItem = new VM_TKIT_ITEM_DETAILS_1.VM_TKIT_ITEM_DETAILS();
        this.newItem.ORG_GROUP_ID = '';
        this.newItem.ITEM_ID = '';
        this.newItem.DESCRIPTION = '';
        this.newItem.IMAGE = '';
        this.newItem.CHK_VALUE = +'';
        this.newItem.COMMENTS = '';
        this.newItem.CREATEUSERNAME = '';
        this.newItem.CREATE_DATE = new Date();
        this.newItem.DEPT_ID = '';
        this.newItem.OWNER = '';
        this.newItem.ITEM_INACTIVATED = false;
        this.newItem.VENDOR = '';
        this.newItem.MANUFACTURER = '';
        this.newItem.ITEM_DESCR = '';
        this.newItem.DESTRUCTION_DATE = new Date();
        this.newItem.ITEM_QTY = +'';
        this.newItem.ITEM_TYPE = '';
        this.newItem.OWNER_TYPE = '';
        this.newItem.STORAGE_LOCATION = '';
        this.newItem.UPDATEUSERNAME = '';
        this.newItem.UPDATE_DATE = new Date();
        this.newItem.Disable = false;
        this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
        this.newItemLotSerial.AVAILABILITY = false;
        this.newItemLotSerial.CHECKIN_DATE = new Date();
        this.newItemLotSerial.ITEM_ID = '';
        this.newItemLotSerial.ITEM_QTY = +'';
        this.newItemLotSerial.ITEM_TYPE = '';
        this.newItemLotSerial.LOT_NO = '';
        this.newItemLotSerial.ORG_GROUP_ID = '';
        this.newItemLotSerial.OWNER = '';
        this.newItemLotSerial.OWNER_TYPE = '';
        this.newItemLotSerial.ROW_INDEX = +'';
        this.newItemLotSerial.SERIAL_NO = '';
        this.newItemLotSerial.SERVICE_DT_TIME = new Date();
        this.newItemLotSerial.STATUS = false;
        this.newItemLotSerial.STORAGE_LOCATION = '';
        this.newItemLotSerial.UPDATE_DATE = new Date();
        this.newItemLotSerial.USER_FIELD_1 = '';
        this.newItemLotSerial.USER_FIELD_2 = '';
        this.newItemLotSerial.ASSET_ID = '';
        // this.newItemLotSerial.
        this.populateOwnerTypeDD();
    };
    ManageEquipmentItemsComponent.prototype.bindUserOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpID = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.selectedOrgGroupId = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.spinnerService.stop();
                                            _this.populateData();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select OrgGrpID", value: "Select OrgGrpID" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "Select OrgGrpID") {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid OrgGrpId" });
                    return [2 /*return*/];
                }
                else {
                    // this.populateData();
                }
                return [2 /*return*/];
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetSearchItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetMasterItems().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstFilteredItems = data.DataList;
                                        _this.tkitEquipmentItemDetails = [];
                                        _this.tkitEquipmentItemDetails = data.DataList;
                                        if (_this.searchFlag) {
                                            _this.DisplayItemDetailsGrid();
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
    ManageEquipmentItemsComponent.prototype.PopulateTypesDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var itemindicator, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetEquipmentTypes("", this.orgGrpID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.tkitItmEquipmentType = data.DataList;
                                        if (_this.tkitItmEquipmentType != null && _this.tkitItmEquipmentType != undefined) {
                                            _this.lstEquipmentTypes = [];
                                            _this.lstEquipmentTypes.push({ label: "Select Equipment Type", value: "Select Equipment Type" });
                                            for (var i = 0; i < data.DataList.length; i++) {
                                                _this.lstEquipmentTypes.push({
                                                    label: data.DataList[i].ITEM_TYPE_DESCR + " " + "(" + data.DataList[i].ITEM_TYPE + ")",
                                                    value: data.DataList[i].ITEM_TYPE
                                                });
                                            }
                                            // this.PopulateItemsDropDown();
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.PopulateItemsDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //items dropdown
                        // GetItemsForSelectedType
                        this.lstItemDetails = [];
                        this.lstItemDetails.push({ label: "Select Item", value: "Select Item" });
                        if (!(this.selectedEquipmentType != null && this.selectedEquipmentType != undefined && this.selectedEquipmentType != '' && this.selectedEquipmentType != 'Select Equipment')) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetItemsForSelectedEqType(this.selectedEquipmentType, "").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.tkitItemDetials = [];
                                        _this.tkitItemDetials = data.DataVariable.m_Item2;
                                        _this.selectedEqType = '';
                                        _this.selectedEqType = data.DataVariable.m_Item1;
                                        if (_this.tkitItemDetials != null && _this.tkitItemDetials != undefined) {
                                            for (var i = 0; i < data.DataVariable.m_Item2.length; i++) {
                                                _this.lstItemDetails.push({
                                                    label: data.DataVariable.m_Item2[i].DESCRIPTION,
                                                    value: data.DataVariable.m_Item2[i].ITEM_ID
                                                });
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetEquipmentItemDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (this.selectedItemID == null || this.selectedItemID == undefined || this.selectedItemID == '' || this.selectedItemID == 'Select Item') {
                            this.selectedItemID = '';
                        }
                        return [4 /*yield*/, this.PopulateDepartments()];
                    case 2:
                        _a.sent();
                        if (!(this.selectedEqType == "E")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.GetVendorDetials()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: 
                    //  this.spinnerService.start();
                    return [4 /*yield*/, this.manageEquipmentItemsService.GetTypeItems(this.selectedEquipmentType, this.selectedItemID).then(function (res) {
                            var data = res.json();
                            _this.growlMessage = [];
                            switch (data.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    _this.tkitEquipmentItemDetails = [];
                                    _this.tkitEqItmLotSerail = [];
                                    _this.typeIndicator = data.DataVariable.m_Item1;
                                    _this.tkitEquipmentItemDetails = data.DataVariable.m_Item2;
                                    _this.tkitEqItmLotSerail = data.DataVariable.m_Item3;
                                    for (var i = 0; i < _this.tkitEqItmLotSerail.length; i++) {
                                        var changeDate = _this.tkitEqItmLotSerail[i].SERVICE_DT_TIME;
                                        var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                        _this.tkitEqItmLotSerail[i].SERVICE_DT_TIME = dateStr.replace(',', '');
                                        _this.tkitEqItmLotSerail[i].SERVICE_DT_TIME = _this.tkitEqItmLotSerail[i].SERVICE_DT_TIME;
                                    }
                                    if (_this.editItemDetailsFlag == true) {
                                        // this.bindtkitEquipmentItemDetails();
                                        _this.selectedEqType = data.DataVariable.m_Item1;
                                        if (data.DataVariable.m_Item1 == "E") {
                                            _this.showlotserialsgrid = true;
                                            _this.showAddSerailbutton = true;
                                        }
                                    }
                                    if (_this.addnewitembutton == false) {
                                        // this.bindtkitEquipmentItemDetails();
                                    }
                                    _this.bindtkitEquipmentItemDetails();
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                        })];
                    case 5:
                        //  this.spinnerService.start();
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.ddlEquipmentTypeChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.enteredDescription = '';
                this.showLotSerialFields = false;
                this.showgrid = false;
                this.showitemdetailsFields = false;
                this.showlotserialsgrid = false;
                this.selectedItemID = "";
                this.lstItemDetails = [];
                this.showCommentsGrid = false;
                this.selectedItemAsset = '';
                this.tkitEquipmentItemDetails = [];
                //clear the items drop down
                this.tkitItemDetials = [];
                this.selectedEqType = "";
                this.PopulateItemsDropDown();
                return [2 /*return*/];
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.ddlItemIDsChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.populateData = function () {
        this.GetSearchItems();
        // this.showgrid = true;
    };
    ManageEquipmentItemsComponent.prototype.fillItemsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredItems = [];
                        query = event.query;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.selectedOrgGroupId = this.orgGrpID;
                        }
                        else {
                            this.selectedOrgGroupId = this.selectedOrgGroupId;
                        }
                        if (this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "Select OrgGrpID") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetMasterItems().
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstItems = data.DataList;
                                        _this.lstFilteredItems = _this.filterBusinessUnits(query, _this.lstItems);
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.DisplayItemDetailsGrid = function () {
        //need to dispaly the data of search matched records in the grid.
        if (this.selectedItemAsset != null && this.selectedItemAsset != undefined && this.selectedItemAsset != "") {
            this.tkitEquipmentItemDetailsList = [];
            for (var k = 0; k < this.tkitEquipmentItemDetails.length; k++) {
                this.tkitEquipmentItemDetailsList.push(this.tkitEquipmentItemDetails[k]);
            }
            if (this.tkitEquipmentItemDetailsList.length > 0) {
                this.showCommentsGrid = true;
            }
            else {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                return;
            }
        }
        else {
            this.showgrid = false;
        }
    };
    ManageEquipmentItemsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < businessunits.length; i++) {
                var Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue.ITEM_ID + " " + "(" + Bunitvalue.ITEM_DESCR + ")");
            }
        }
        else {
            if (query.length >= 1) {
                for (var i = 0; i < businessunits.length; i++) {
                    var Bunitvalue = businessunits[i];
                    Bunitvalue = Bunitvalue.ITEM_ID + " " + "(" + Bunitvalue.ITEM_DESCR + ")";
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    };
    ManageEquipmentItemsComponent.prototype.PopulateDepartments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstDeptDetails = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetItemDepartments(this.selectedItemID, this.selectedOrgGroupId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.tkitDeptDetails = [];
                                        _this.tkitDeptDetails = data.DataList;
                                        if (_this.tkitDeptDetails != null && _this.tkitDeptDetails != undefined) {
                                            _this.selectedDeptIDs = [];
                                            for (var i = 0; i < data.DataList.length; i++) {
                                                _this.lstDeptDetails.push({
                                                    label: data.DataList[i].DESCRIPTION + " - " + data.DataList[i].DEPT_ID,
                                                    value: data.DataList[i].DEPT_ID
                                                });
                                            }
                                        }
                                        _this.populateOwnerDD();
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.ddlDeptIDChanged = function () {
        this.newItem.DEPT_ID = '';
        var id = '';
        if (this.selectedDeptIDs != null && this.selectedDeptIDs != undefined && this.selectedDeptIDs != []) {
            if (this.selectedDeptIDs.length > 0) {
                id = this.selectedDeptIDs.join();
            }
        }
        else {
            this.selectedDeptIDs = [];
            id = '';
        }
    };
    ManageEquipmentItemsComponent.prototype.btnGo_Click = function () {
        this.selectedDeptDetails = [];
        this.selectedDeptIDs = [];
        this.selectedItemAsset = '';
        this.enteredDescription = '';
        if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == '' || this.selectedOrgGroupId == "Select OrgGrpID") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select OrgGroupID" });
            return;
        }
        this.addnewitembutton = false;
        this.gobutton = true;
        this.growlMessage = [];
        if (this.selectedEqType == null || this.selectedEqType == undefined || this.selectedEqType == '') {
            this.selectedItemAsset = "";
            this.showgrid = false;
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment" });
            return;
        }
        if (this.selectedItemID == null || this.selectedItemID == undefined || this.selectedItemID == '' || this.selectedItemID == 'Select Item') {
            this.selectedItemID = '';
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Item ID" });
            return;
        }
        this.GetEquipmentItemDetails();
    };
    ManageEquipmentItemsComponent.prototype.bindtkitEquipmentItemDetails = function () {
        this.selectedDeptDetails = [];
        this.selectedDeptIDs = [];
        this.InitializationProperties();
        this.tkitEquipmentItemDetailsList = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.tkitEqItmLotSerailList = [];
        for (var k = 0; k < this.tkitEquipmentItemDetails.length; k++) {
            this.tkitEquipmentItemDetailsList.push(this.tkitEquipmentItemDetails[k]);
        }
        if (this.tkitEqItmLotSerail != null && this.tkitEqItmLotSerail != undefined && this.tkitEqItmLotSerail.length != 0) {
            for (var j = 0; j < this.tkitEqItmLotSerail.length; j++) {
                this.tkitEqItmLotSerail[j].ORG_GROUP_ID = this.selectedOrgGroupId;
                this.newItemLotSerial.ITEM_TYPE = this.selectedEquipmentType;
                this.tkitEqItmLotSerailList.push(this.tkitEqItmLotSerail[j]);
            }
        }
        for (var i = 0; i <= this.tkitEquipmentItemDetailsList.length - 1; i++) {
            if (this.tkitEquipmentItemDetailsList[i].IMAGE != null && this.tkitEquipmentItemDetailsList[i].IMAGE != undefined && this.tkitEquipmentItemDetailsList[i].IMAGE != '') {
                this.tkitEquipmentItemDetailsList[i].showImage = true;
            }
            this.tkitEquipmentItemDetails[i].IMAGE_PATH = this.imgBasePath + this.tkitEquipmentItemDetails[i].IMAGE;
            this.userSelectedFile = this.tkitEquipmentItemDetails[i].IMAGE;
            if (this.tkitEquipmentItemDetailsList[i].CHK_VALUE == 1) {
                this.dataCheckedSorting.push(this.tkitEquipmentItemDetailsList[i]);
            }
            else {
                this.dataUncheckedSorting.push(this.tkitEquipmentItemDetailsList[i]);
            }
            if (this.selectedEqType == "B") {
                this.showImageColumn = false;
                this.showMfrColumn = false;
                this.showQuantityColumn = false;
                this.showQuantityLabel = false;
                this.showVendorColumn = false;
                this.showDepartmentsColumn = true;
                this.showDestructionColumn = true;
                this.showAddSerailbutton = false;
                this.showlotserialsgrid = false;
            }
            else if (this.selectedEqType == "E") {
                if (this.tkitEqItmLotSerailList.length > 0) {
                    this.showlotserialsgrid = true; //for item lot/serial details
                }
                this.showAddSerailbutton = true; //for displaying the add serials button
                this.showImageColumn = true;
                this.showMfrColumn = true;
                this.showQuantityLabel = true;
                this.showVendorColumn = true;
                this.showQuantityColumn = false;
                this.showDestructionColumn = false;
                this.showDepartmentsColumn = true;
            }
            else if (this.selectedEqType == "F") {
                this.showImageColumn = true;
                this.showMfrColumn = true;
                this.showQuantityLabel = false;
                this.showAddSerailbutton = false;
                this.showVendorColumn = true;
                this.showQuantityColumn = true;
                this.showDestructionColumn = true;
                this.showlotserialsgrid = false;
                this.showDepartmentsColumn = false;
            }
            // this.show
        }
        this.showitemdetailsFields = true;
        this.editItemDetailsFlag = true;
        this.newItem.DEPT_ID = '';
        this.newItem = this.tkitEquipmentItemDetailsList[0];
        this.newItem.Disable = true;
        if (this.newItem.DEPT_ID != null && this.newItem.DEPT_ID != undefined && this.newItem.DEPT_ID != '')
            var deptiddata = this.newItem.DEPT_ID.trim();
        if (this.newItem.IMAGE != null && this.newItem.IMAGE != undefined && this.newItem.IMAGE != '')
            this.userSelectedFile = this.newItem.IMAGE;
        if (this.newItem.DEPT_ID != null && this.newItem.DEPT_ID != undefined && this.newItem.DEPT_ID != '') {
            if (deptiddata.indexOf(',') > 0) {
                for (var x = 0; x < deptiddata.split(',').length; x++) {
                    this.selectedDeptDetails.push(deptiddata.split(',')[x].trim());
                }
            }
            else {
                this.selectedDeptDetails.push(this.newItem.DEPT_ID);
            }
        }
        this.selectedDeptIDs = this.selectedDeptDetails;
        this.selectedOwnerType = this.newItem.OWNER_TYPE;
        this.selectedVendor = this.newItem.VENDOR;
        this.selectedOwner = this.newItem.OWNER;
        this.disableButton = false;
        this.spinnerService.stop();
        this.validationITEM_ID = 0;
        this.validationITEM_QTY = 0;
        this.validationDESCRIPTION = 0;
        this.validationSTORAGE_LOCATION = 0;
        this.edititemflag = true;
        this.additemflag = false;
        this.page = false;
    };
    ManageEquipmentItemsComponent.prototype.selectedLotSerialAvailability = function (values, event) {
        try {
            if (event == true) {
                values.STATUS = true;
            }
            else {
                values.STATUS = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.ddlOwnerChanged = function () {
        this.newItem.OWNER = this.selectedOwner;
    };
    ManageEquipmentItemsComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                }
            }
            else {
                if (this.EndIndex > this.tkitEquipmentItemDetailsList.length) {
                    this.EndIndex = this.tkitEquipmentItemDetailsList.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.tkitEquipmentItemDetailsList[i].CHK_VALUE = 1;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.filterdata = function (event) {
        try {
            this.lstgridfilterData = [];
            this.lstgridfilterData = new Array();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    //  this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                }
            }
            else {
                if (this.EndIndex > this.tkitEquipmentItemDetailsList.length) {
                    this.EndIndex = this.tkitEquipmentItemDetailsList.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    //  this.tkitEquipmentItemDetailsList[i].checkvalue = false;
                    this.tkitEquipmentItemDetailsList[i].CHK_VALUE = 0;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.selectedRow = function (values, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.tkitEquipmentItemDetailsList = [];
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
                this.tkitEquipmentItemDetailsList = [];
                this.tkitEquipmentItemDetailsList = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            }
            else {
                this.tkitEquipmentItemDetailsList = [];
                this.tkitEquipmentItemDetailsList = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentItemsComponent.prototype.search = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.searchFlag = true;
                        this.addnewitembutton = false;
                        this.gobutton = true;
                        this.showgrid = false;
                        this.showitemdetailsFields = false;
                        this.showlotserialsgrid = false;
                        this.selectedItemID = '';
                        this.selectedEqType = '';
                        this.newItem = new VM_TKIT_ITEM_DETAILS_1.VM_TKIT_ITEM_DETAILS();
                        this.showAddSerailbutton = false;
                        this.showLotSerialFields = false;
                        this.selectedEquipmentType = '';
                        this.growlMessage = [];
                        this.tkitEquipmentItemDetails = [];
                        this.tkitEquipmentItemDetailsList = [];
                        this.showCommentsGrid = false;
                        if (!(this.selectedItemAsset == null || this.selectedItemAsset == undefined || this.selectedItemAsset == '')) return [3 /*break*/, 1];
                        this.showgrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter search string" });
                        return [2 /*return*/];
                    case 1: 
                    // it will call the both PopulateTypesDropDown(),PopulateItemsDropDown()
                    return [4 /*yield*/, this.PopulateTypesDropDown()];
                    case 2:
                        // it will call the both PopulateTypesDropDown(),PopulateItemsDropDown()
                        _a.sent();
                        return [4 /*yield*/, this.PopulateItemsDropDown()];
                    case 3:
                        _a.sent();
                        //   if (this.enteredDescription != null && this.enteredDescription != undefined && this.enteredDescription != '') {
                        return [4 /*yield*/, this.GetSearchItemDetails()];
                    case 4:
                        //   if (this.enteredDescription != null && this.enteredDescription != undefined && this.enteredDescription != '') {
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetSearchItemDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var itemidvalue, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        itemidvalue = this.selectedItemAsset.split('(')[0].trim();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetMasterItemsdetails(itemidvalue, this.enteredDescription).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstFilteredItems = data.DataList;
                                        _this.tkitEquipmentItemDetails = [];
                                        _this.tkitEquipmentItemDetails = data.DataList;
                                        if (_this.searchFlag) {
                                            _this.DisplayItemDetailsGrid();
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showCommentsGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showCommentsGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showCommentsGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.addNewItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.additemflag = true;
                        this.edititemflag = false;
                        // this.validationITEM_ID = 1;
                        this.validationITEM_DESCR = 1;
                        this.validationSTORAGE_LOCATION = 1;
                        this.validationDESCRIPTION = 1;
                        if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == '' || this.selectedOrgGroupId == "Select OrgGrpID") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid OrgGrpId" });
                            return [2 /*return*/];
                        }
                        this.selectedItemAsset = '';
                        this.enteredDescription = '';
                        this.userSelectedFile = '';
                        this.selectedOwner = '';
                        this.selectedOwnerType = '';
                        this.selectedDeptIDs = [];
                        this.selectedDeptDetails = [];
                        this.selectedVendor = '';
                        this.InitializationProperties();
                        this.selectedDeptIDs = [];
                        this.selectedOwnerType = this.lstOwnerType[0].value;
                        this.newItem.OWNER_TYPE = this.selectedOwnerType;
                        this.showCommentsGrid = false;
                        this.showgrid = false;
                        this.editItemDetailsFlag = false;
                        this.addnewitembutton = true;
                        this.gobutton = false;
                        this.addItemDetailsFlag = true;
                        this.growlMessage = [];
                        this.tkitEquipmentItemDetails = [];
                        this.tkitEquipmentItemDetailsList = [];
                        this.growlMessage = [];
                        if (this.selectedEqType == null || this.selectedEqType == undefined || this.selectedEqType == '') {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment" });
                            return [2 /*return*/];
                        }
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Equipment Item';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.selectedItemAsset = '';
                        this.showCommentsGrid = false;
                        this.page = false;
                        this.showgrid = false;
                        this.showitemdetailsFields = false;
                        this.showlotserialsgrid = false;
                        this.selectedItemID = null;
                        this.showAddSerailbutton = false;
                        this.showLotSerialFields = false;
                        return [4 /*yield*/, this.PopulateDepartments()];
                    case 1:
                        _a.sent();
                        this.showitemdetailsFields = true;
                        this.showgrid = false;
                        if (this.selectedEqType == "E") {
                            this.showAddSerailbutton = true;
                        }
                        else {
                            this.showAddSerailbutton = false;
                        }
                        this.newItem.ITEM_TYPE = this.selectedEquipmentType;
                        this.newItem.ITEM_QTY = null;
                        this.newItem.CREATEUSERNAME = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                        this.showAndHideTextBoxs();
                        //need to implement the following service call
                        return [4 /*yield*/, this.GetLatestValue()];
                    case 2:
                        //need to implement the following service call
                        _a.sent();
                        this.tkitEqItmLotSerailList = [];
                        this.tkitEquipmentItemDetailsList = [];
                        this.disableButton = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetLatestAssetIDValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tkitAppId, orgGrpParamName, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        tkitAppId = AtParEnums_2.EnumApps.TrackIT;
                        orgGrpParamName = '';
                        return [4 /*yield*/, this.SetMaxSorageDate()];
                    case 1:
                        _a.sent();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetLatestAssetIDValue(tkitAppId, "ASSET_ID").then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.newItemLotSerial.ASSET_ID = data.DataVariable;
                                        _this.assetfieldpart2 = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.grddata = function (ven3) {
        var imagepath = ven3.IMAGE_PATH;
    };
    ManageEquipmentItemsComponent.prototype.editItemDetails = function (vendata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showgrid = false;
                        this.editItemDetailsFlag = true;
                        this.addItemDetailsFlag = false;
                        this.page = false;
                        this.showitemdetailsFields = true;
                        this.showgrid = false;
                        if (this.selectedEqType == "E") {
                            this.showAddSerailbutton = true;
                            this.showlotserialsgrid = true;
                        }
                        this.selectedItemID = vendata.ITEM_ID;
                        this.selectedEquipmentType = vendata.ITEM_TYPE;
                        return [4 /*yield*/, this.PopulateTypesDropDown()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.PopulateItemsDropDown()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.GetEquipmentItemDetails()];
                    case 3:
                        _a.sent();
                        this.showCommentsGrid = false;
                        this.showAndHideTextBoxs();
                        if (this.editItemDetailsFlag) {
                            //udpate details 
                            this.disableButton = false;
                            if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == undefined || this.newItem.ITEM_DESCR == '') {
                                this.disableButton = true;
                            }
                            if (this.newItem.STORAGE_LOCATION == null || this.newItem.STORAGE_LOCATION == undefined || this.newItem.STORAGE_LOCATION == '') {
                                this.disableButton = true;
                            }
                            if (this.newItem.DESCRIPTION == null || this.newItem.DESCRIPTION == undefined || this.newItem.DESCRIPTION == '') {
                                this.disableButton = true;
                            }
                            if (this.disableButton) {
                            }
                            else {
                                this.disableButton = false;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.showAndHideTextBoxs = function () {
        if (this.selectedEqType == "B") {
            this.showImageColumn = false; //for btype items no need of image column
            this.showMfrColumn = false;
            this.showQuantityColumn = false;
            this.showVendorColumn = false;
            this.showDepartmentsColumn = true;
            this.showDestructionColumn = true;
            this.showQuantityLabel = false;
        }
        else if (this.selectedEqType == "E") {
            this.showImageColumn = true;
            this.showMfrColumn = true;
            this.showQuantityLabel = true;
            this.showVendorColumn = true;
            this.showQuantityColumn = false;
            this.showDestructionColumn = false;
            this.showDepartmentsColumn = true;
        }
        else if (this.selectedEqType == "F") {
            this.showImageColumn = true;
            this.showMfrColumn = true;
            this.showVendorColumn = true;
            this.showQuantityColumn = true;
            this.showDestructionColumn = true;
            this.showQuantityLabel = false;
            this.showDepartmentsColumn = false;
        }
    };
    ManageEquipmentItemsComponent.prototype.addNewserials = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Serial';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        //for displaying the buttons and test boxes in add serail div tag
                        this.addserailflag = true;
                        this.editLotSerialFlag = false;
                        this.addLotSerailFlag = true;
                        this.disablelotserailButton = true;
                        this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
                        this.showLotSerialFields = true;
                        this.showAddSerailbutton = true;
                        this.page = false;
                        this.showgrid = false;
                        this.showCommentsGrid = false;
                        this.showitemdetailsFields = false;
                        this.showlotserialsgrid = false;
                        return [4 /*yield*/, this.GetLatestAssetIDValue()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.editserial = function (vendata) {
        //edit the lot/serail values from the grid
        // this.edititemflag = true;
        this.editserailflag = true;
        this.addLotSerailFlag = false;
        this.updateLotSerialFlag = true;
        this.selectedLotSerialRow = vendata;
        vendata.Disable = true;
        this.page = false;
        this.showgrid = false;
        this.showCommentsGrid = false;
        this.showitemdetailsFields = false;
        this.showlotserialsgrid = true;
        this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
        var lotid = vendata.LOT_NO;
        var serialNo = vendata.SERIAL_NO;
        if (vendata.ASSET_ID.length == 13) {
            if (vendata.ASSET_ID != null && vendata.ASSET_ID != undefined && vendata.ASSET_ID != '')
                var assetid = vendata.ASSET_ID.slice(4, 13);
            if (vendata.ASSET_ID != null && vendata.ASSET_ID != undefined && vendata.ASSET_ID != '')
                var assetidpart1 = vendata.ASSET_ID.slice(0, 4);
        }
        else {
            if (vendata.ASSET_ID != null && vendata.ASSET_ID != undefined && vendata.ASSET_ID != '')
                var assetid = vendata.ASSET_ID;
        }
        var useridField1 = vendata.USER_FIELD_1;
        var checkindate = vendata.CHECKIN_DATE;
        var servicedate = vendata.SERVICE_DT_TIME;
        var newdate = new Date(vendata.SERVICE_DT_TIME);
        var isdiable = vendata.Disable;
        this.newItemLotSerial.LOT_NO = lotid;
        this.newItemLotSerial.SERIAL_NO = serialNo;
        this.newItemLotSerial.ASSET_ID = assetid;
        this.newItemLotSerial.ASSET_IDPART1 = assetidpart1;
        this.newItemLotSerial.USER_FIELD_1 = useridField1;
        this.newItemLotSerial.CHECKIN_DATE = checkindate;
        this.newItemLotSerial.SERVICE_DT_TIME = newdate;
        this.newItemLotSerial.Disable = isdiable;
        this.showLotSerialFields = true;
        this.disablelotserailButton = false;
    };
    ManageEquipmentItemsComponent.prototype.getFormattedDate = function (date) {
        var year = date.getFullYear();
        /// Add 1 because JavaScript months start at 0
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    };
    ManageEquipmentItemsComponent.prototype.lotSerailValidations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, valueofassetId, valueofcheckindate, dateStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //whether the value of serial id is already present
                        if (this.tkitEqItmLotSerailList == null || this.tkitEqItmLotSerailList == undefined) {
                            this.tkitEqItmLotSerailList = new Array();
                        }
                        if (!(this.tkitEqItmLotSerailList != null && this.tkitEqItmLotSerailList != undefined)) return [3 /*break*/, 4];
                        result = this.tkitEqItmLotSerailList.filter(function (x) { return x.SERIAL_NO == _this.newItemLotSerial.SERIAL_NO; });
                        if (!(result.length > 0)) return [3 /*break*/, 1];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Serial ID already Exists" });
                        return [2 /*return*/];
                    case 1:
                        this.growlMessage = [];
                        if (this.newItemLotSerial.SERIAL_NO != null && this.newItemLotSerial.SERIAL_NO != undefined && this.newItemLotSerial.SERIAL_NO != '') {
                            valueofassetId = this.newItemLotSerial.ASSET_ID;
                            valueofcheckindate = this.newItemLotSerial.CHECKIN_DATE;
                            this.newItemLotSerial.ORG_GROUP_ID = this.selectedOrgGroupId;
                            this.newItemLotSerial.ITEM_ID = this.newItem.ITEM_ID;
                            this.newItemLotSerial.ITEM_TYPE = this.selectedEquipmentType;
                            this.newItemLotSerial.STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;
                            this.newItemLotSerial.ITEM_QTY = this.newItem.ITEM_QTY;
                            if (this.newItemLotSerial.ASSET_IDPART1 == undefined || this.newItemLotSerial.ASSET_IDPART1 == null || this.newItemLotSerial.ASSET_IDPART1 == '')
                                this.newItemLotSerial.ASSET_IDPART1 = '';
                            this.newItemLotSerial.ASSET_ID = this.newItemLotSerial.ASSET_IDPART1 + this.newItemLotSerial.ASSET_ID;
                            dateStr = new Date(this.newItemLotSerial.SERVICE_DT_TIME).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                            //this.newItemLotSerial.SERVICE_DT_TIME = dateStr.replace(',', '');                   
                            this.tkitEqItmLotSerailList.push(this.newItemLotSerial);
                            this.showlotserialsgrid = true;
                            this.newItemLotSerial = new TKIT_ITEM_INVENTORY_1.TKIT_ITEM_INVENTORY();
                            this.newItemLotSerial.CHECKIN_DATE = valueofcheckindate;
                            this.newItemLotSerial.ASSET_ID = valueofassetId;
                        }
                        return [4 /*yield*/, this.GetLatestAssetIDValue()];
                    case 2:
                        _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Lot/serials Added Successfully" });
                        this.disablelotserailButton = true;
                        return [2 /*return*/];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.tkitEqItmLotSerailList = new Array();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.gobackFromAddEditSerial = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Equipment Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        // remove the add/edit lot/serail text fields
        this.showLotSerialFields = false;
        this.growlMessage = [];
        this.page = false;
        this.showitemdetailsFields = true;
        this.addLotSerailFlag = false;
        if (this.updateLotSerialFlag == true) {
            if (this.previousvalue != this.newItemLotSerial) {
                this.newItemLotSerial = this.previousvalue;
            }
        }
        if (this.selectedEqType == 'E' && this.tkitEqItmLotSerailList != null && this.tkitEqItmLotSerailList != undefined && this.tkitEqItmLotSerailList.length != 0) {
            this.showlotserialsgrid = true;
        }
        else {
            this.showlotserialsgrid = false;
            ;
        }
        this.addserailflag = false;
        this.editserailflag = false;
    };
    //// regrion for add functionality
    ManageEquipmentItemsComponent.prototype.GetLatestValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tkitAppId, orgGrpParamName, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        tkitAppId = AtParEnums_2.EnumApps.TrackIT;
                        orgGrpParamName = '';
                        this.spinnerService.start();
                        return [4 /*yield*/, this.SetMaxSorageDate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.manageEquipmentItemsService.GetLatestValue(tkitAppId, "ITEM_ID").then(function (res) {
                                // let response = res.json();
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.newItem.ITEM_ID = data.DataVariable;
                                        _this.spinnerService.stop();
                                        if (_this.selectedEqType == "E") {
                                            //for displaying the vendor drop down when equipment type is E
                                            _this.GetVendorDetials();
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.GetVendorDetials = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstVendorDetails = [];
                        this.lstVendorDetails.push({ label: "Select Vendor", value: "Select Vendor" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageEquipmentItemsService.getVendorDetails(this.selectedOrgGroupId, "", "").then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.vendorData = data.DataList;
                                        for (var i = 0; i < _this.vendorData.length; i++) {
                                            _this.lstVendorDetails.push({ label: _this.vendorData[i].VENDOR_ID + " - " + _this.vendorData[i].VENDOR_NAME, value: _this.vendorData[i].VENDOR_ID });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Vendor Id not found" });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.SetMaxSorageDate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tkitAppId, orgGrpParamName, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tkitAppId = AtParEnums_2.EnumApps.TrackIT;
                        orgGrpParamName = 'B_MAX_STOR';
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getOrgGroupParamValue(orgGrpParamName, tkitAppId, this.selectedOrgGroupId)
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var response, data, _a, dataRange, formDate, _b, _c, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            response = res.json();
                                            data = res.json();
                                            this.growlMessage = [];
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_2.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_2.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_2.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_2.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            dataRange = response.DataVariable.toString();
                                            formDate = new Date();
                                            _b = this.newItem;
                                            return [4 /*yield*/, this.addDays(formDate, dataRange)];
                                        case 2:
                                            _b.DESTRUCTION_DATE = _e.sent();
                                            _c = this.newItemLotSerial;
                                            return [4 /*yield*/, this.addDays(formDate, dataRange)];
                                        case 3:
                                            _c.CHECKIN_DATE = _e.sent();
                                            _d = this.newItemLotSerial;
                                            return [4 /*yield*/, this.addDays(formDate, dataRange)];
                                        case 4:
                                            _d.SERVICE_DT_TIME = _e.sent();
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _e.label = 6;
                                        case 6:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _e.label = 7;
                                        case 7:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _e.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    };
    ManageEquipmentItemsComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ManageEquipmentItemsComponent.prototype.SaveItemQtyDetails = function (modeofoperation) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstItemInvDetails, lstItemDetails, deptids, todayDate, toDate, item, toDate, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        lstItemInvDetails = [];
                        lstItemDetails = [];
                        if (modeofoperation == "ADD" || modeofoperation == "ADDNPRINT") {
                            this.newItem.ORG_GROUP_ID = this.selectedOrgGroupId;
                        }
                        this.newItem.ORG_GROUP_ID = this.selectedOrgGroupId;
                        deptids = this.selectedDeptIDs.join();
                        this.newItem.DEPT_ID = deptids.trim();
                        todayDate = new Date();
                        if (this.newItem.DESTRUCTION_DATE != null && this.newItem.DESTRUCTION_DATE != undefined) {
                            toDate = new Date(this.newItem.DESTRUCTION_DATE);
                            if (toDate < todayDate) {
                                // this.grdHide = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Max Storage Date must be greater than or equal to current date" });
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                        }
                        if (this.selectedEqType == "B") {
                            this.newItem.ITEM_QTY = 1;
                        }
                        lstItemDetails.push(this.newItem);
                        // this.newItem.DESTRUCTION_DATE = this.date2;
                        if (this.selectedEqType == "E") {
                            if (this.tkitEqItmLotSerailList == null || this.tkitEqItmLotSerailList == undefined || this.tkitEqItmLotSerailList.length == 0) {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'Warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Please enter atleast one serial number" });
                                return [2 /*return*/];
                            }
                            else {
                                for (item = 0; item < this.tkitEqItmLotSerailList.length; item++) {
                                    this.tkitEqItmLotSerailList[item].ORG_GROUP_ID = this.newItem.ORG_GROUP_ID;
                                    this.tkitEqItmLotSerailList[item].ITEM_ID = this.newItem.ITEM_ID;
                                    if (this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME != null && this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME != undefined) {
                                        toDate = new Date(this.tkitEqItmLotSerailList[item].SERVICE_DT_TIME);
                                        if (toDate < todayDate) {
                                            // this.grdHide = false;
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "NextService Date Time must be greater than or equal to current date" });
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                        }
                                    }
                                }
                                lstItemInvDetails = this.tkitEqItmLotSerailList;
                            }
                        }
                        else {
                            // this.newItemLotSerial.CHECKIN_DATE = this.date2;
                            this.newItemLotSerial.ORG_GROUP_ID = this.selectedOrgGroupId;
                            this.newItemLotSerial.ITEM_ID = this.newItem.ITEM_ID;
                            this.newItemLotSerial.ITEM_TYPE = this.selectedEquipmentType;
                            this.newItemLotSerial.STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;
                            this.newItemLotSerial.OWNER = this.newItem.OWNER;
                            this.newItemLotSerial.OWNER_TYPE = this.newItem.OWNER_TYPE;
                            this.newItemLotSerial.ITEM_QTY = this.newItem.ITEM_QTY;
                            //  this.newItem.STORAGE_LOCATION = this.newItem.STORAGE_LOCATION;
                            this.newItemLotSerial.UPDATE_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID].toString();
                            lstItemInvDetails.push(this.newItemLotSerial);
                        }
                        return [4 /*yield*/, this.manageEquipmentItemsService.SaveItemDetails(lstItemDetails, lstItemInvDetails, this.selectedEqType, modeofoperation)
                                .then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        if (modeofoperation == "ADD" || modeofoperation == "ADDNPRINT") {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Item" + " ' " + _this.newItem.ITEM_ID + " ' " + "created successfully" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Item" + " ' " + _this.newItem.ITEM_ID + " ' " + "updated  successfully" });
                                        }
                                        _this.InitializationProperties();
                                        _this.showitemdetailsFields = false;
                                        _this.showLotSerialFields = false;
                                        _this.selectedEquipmentType = '';
                                        _this.selectedItemID = '';
                                        _this.newItem.DEPT_ID = '';
                                        _this.page = true;
                                        _this.selectedItemAsset = '';
                                        _this.tkitEqItmLotSerailList = [];
                                        _this.tkitEquipmentItemDetailsList = [];
                                        _this.selectedDeptDetails = [];
                                        _this.selectedDeptIDs = [];
                                        _this.userSelectedFile = '';
                                        _this.selectedOwnerType = '';
                                        _this.selectedOwner = '';
                                        _this.additemflag = false;
                                        _this.edititemflag = false;
                                        _this.addserailflag = false;
                                        _this.editserailflag = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (data.StatusCode == 1193001) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Serial ID already Exists" });
                                            break;
                                        }
                                        if (modeofoperation == "ADD" || modeofoperation == "ADDNPRINT") {
                                            if (data.StatusCode == 1112329) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item '" + _this.newItem.ITEM_ID + "' created successfully and no printer address available" });
                                                _this.InitializationProperties();
                                                _this.showitemdetailsFields = false;
                                                _this.showLotSerialFields = false;
                                                _this.selectedEquipmentType = '';
                                                _this.selectedItemID = '';
                                                _this.newItem.DEPT_ID = '';
                                                _this.page = true;
                                                _this.selectedItemAsset = '';
                                                _this.tkitEqItmLotSerailList = [];
                                                _this.tkitEquipmentItemDetailsList = [];
                                                _this.selectedDeptDetails = [];
                                                _this.selectedDeptIDs = [];
                                                _this.userSelectedFile = '';
                                                _this.selectedOwnerType = '';
                                                _this.selectedOwner = '';
                                                _this.additemflag = false;
                                                _this.edititemflag = false;
                                                _this.addserailflag = false;
                                                _this.editserailflag = false;
                                                break;
                                            }
                                            if (data.StatusCode == 1302201) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item '" + _this.newItem.ITEM_ID + "' created successfully. Remote printer error" });
                                                break;
                                            }
                                        }
                                        else {
                                            if (data.StatusCode == 1112329) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item '" + _this.newItem.ITEM_ID + "' updated successfully and no printer address available" });
                                                _this.InitializationProperties();
                                                _this.showitemdetailsFields = false;
                                                _this.showLotSerialFields = false;
                                                _this.selectedEquipmentType = '';
                                                _this.selectedItemID = '';
                                                _this.newItem.DEPT_ID = '';
                                                _this.page = true;
                                                _this.selectedItemAsset = '';
                                                _this.tkitEqItmLotSerailList = [];
                                                _this.tkitEquipmentItemDetailsList = [];
                                                _this.selectedDeptDetails = [];
                                                _this.selectedDeptIDs = [];
                                                _this.userSelectedFile = '';
                                                _this.selectedOwnerType = '';
                                                _this.selectedOwner = '';
                                                _this.additemflag = false;
                                                _this.edititemflag = false;
                                                _this.addserailflag = false;
                                                _this.editserailflag = false;
                                                break;
                                            }
                                            if (data.StatusCode == 1302201) {
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item '" + _this.newItem.ITEM_ID + "' updated successfully. Remote printer error" });
                                                break;
                                            }
                                        }
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.createandprint = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.disableButton = false;
                        return [4 /*yield*/, this.datevalidation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SaveItemQtyDetails("ADDNPRINT")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.disableButton = false;
                        return [4 /*yield*/, this.datevalidation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SaveItemQtyDetails("ADD")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //// end  regrion for add functionality
    //// regrion for update functionality
    ManageEquipmentItemsComponent.prototype.updateandprint = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.datevalidation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SaveItemQtyDetails("UPDATENPRINT")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.datevalidation()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SaveItemQtyDetails("EDIT")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //// end  regrion for update functionality
    ///validations
    ManageEquipmentItemsComponent.prototype.FieldsvalidationRules = function () {
        this.growlMessage = [];
        if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == undefined || this.newItem.ITEM_ID == '') {
            this.disableButton = true;
        }
        if (this.newItem.ITEM_DESCR == null || this.newItem.ITEM_DESCR == undefined || this.newItem.ITEM_DESCR == '') {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Please enter valid Item Desc" });
            this.disableButton = true;
            return;
        }
        if (this.newItem.DESCRIPTION == null || this.newItem.DESCRIPTION == undefined || this.newItem.DESCRIPTION == '') {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Please enter valid StorgLoc " });
            this.disableButton = true;
            return;
        }
    };
    ManageEquipmentItemsComponent.prototype.fileUpload = function (event) {
        var _this = this;
        try {
            //this.spinnerService.start();
            var fileList = event.target.files;
            this.userSelectedFile = event.target.files[0].name;
            if (this.userSelectedFile != null && this.userSelectedFile != undefined && this.userSelectedFile != '') {
                var formData = new FormData();
                if (fileList.length > 0) {
                    var file = fileList[0];
                    this.files = file.name;
                    var listData = [];
                    this.newItem.showImage = false;
                    this.newItem.IMAGE = this.newItem.ITEM_TYPE + "_" + this.newItem.ITEM_ID + '.' + file.name.split('.')[1];
                    this.newItem.IMAGE_PATH = this.imgBasePath + this.newItem.IMAGE;
                    //this.newItem.showImage = true;
                    var obj = { FileName: this.newItem.ITEM_TYPE + "_" + this.newItem.ITEM_ID + '.' + file.name.split('.')[1], File: file };
                    listData.push(obj);
                    formData.append('uploadFile', file, this.newItem.IMAGE);
                }
                var headers = new http_1.Headers();
                headers.append('Authorization', 'bearer');
                headers.append('enctype', 'multipart/form-data');
                var options = new http_1.RequestOptions({ headers: headers });
                var apiUrl = this.httpService.BaseUrl + "/api/ManageEquipmentItems/SaveUploadImage";
                this.http.post(apiUrl, formData, options)
                    .toPromise()
                    .then(function (res) {
                    _this.growlMessage = [];
                    _this.spinnerService.stop();
                    var data = res.json();
                    switch (data.StatType) {
                        case AtParEnums_2.StatusType.Success: {
                            _this.files = '';
                            //this.showUploadImage = false;
                            _this.newItem.showImage = false;
                            _this.newItem.IMAGE_PATH = _this.imgBasePath + _this.newItem.IMAGE;
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                            break;
                        }
                        case AtParEnums_2.StatusType.Warn: {
                            //this.showUploadImage = true;
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case AtParEnums_2.StatusType.Error: {
                            // this.showUploadImage = true;
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case AtParEnums_2.StatusType.Custom: {
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                }, function (error) { return console.log(error); });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    };
    //// end region for image upload functionality
    //item  activ
    ManageEquipmentItemsComponent.prototype.ItemActiveInActive = function (values, event) {
        if (event == true) {
            values.ITEM_INACTIVATED = true;
        }
        else {
            values.ITEM_INACTIVATED = false;
        }
    };
    ManageEquipmentItemsComponent.prototype.bindModelDataChange = function (event) {
        try {
            if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == "" || this.newItem.ITEM_ID == undefined) {
                this.validationITEM_ID = 1;
            }
            else {
                if (this.validationITEM_ID == 1) {
                    this.validationITEM_ID = 1;
                }
                else {
                    this.validationITEM_ID = 0;
                }
            }
            if (this.selectedEqType == "F") {
                if ("txtQuantity" == event.TextBoxID.toString()) {
                    this.validationITEM_QTY = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
            }
            if ("txtItemDvalue" == event.TextBoxID.toString()) {
                this.validationITEM_ID = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtStoragelocation" == event.TextBoxID.toString()) {
                this.validationSTORAGE_LOCATION = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDescription" == event.TextBoxID.toString()) {
                this.validationDESCRIPTION = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.selectedEqType == "F") {
                if (this.validationITEM_QTY == 0 && this.validationITEM_ID === 0 && this.validationSTORAGE_LOCATION === 0 && this.validationDESCRIPTION === 0) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            else {
                if (this.validationITEM_ID === 0 && this.validationSTORAGE_LOCATION === 0 && this.validationDESCRIPTION === 0) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            if (this.selectedEqType == "E") {
                if (this.updateLotSerialFlag == true) {
                    this.disablelotserailButton = false;
                    if (this.newItemLotSerial.SERIAL_NO == null || this.newItemLotSerial.SERIAL_NO == undefined || this.newItemLotSerial.SERIAL_NO == '') {
                        this.disablelotserailButton = true;
                    }
                    if (this.newItemLotSerial.LOT_NO == null || this.newItemLotSerial.LOT_NO == undefined || this.newItemLotSerial.LOT_NO == '') {
                        this.disablelotserailButton = true;
                    }
                    if (this.newItemLotSerial.USER_FIELD_1 == null || this.newItemLotSerial.USER_FIELD_1 == undefined || this.newItemLotSerial.USER_FIELD_1 == '') {
                        this.disablelotserailButton = true;
                    }
                    if (this.disablelotserailButton) {
                    }
                    else {
                        this.disablelotserailButton = false;
                    }
                }
                else if (this.addLotSerailFlag == true) {
                    if (this.showLotSerialFields == true || this.addnewitembutton == true) {
                        if ("txtSD1" == event.TextBoxID.toString()) {
                            this.validationSERIAL_NO = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("txtLD1" == event.TextBoxID.toString()) {
                            this.validationLOT_NO = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("txtUserf" == event.TextBoxID.toString()) {
                            this.validationUSER_FIELD_1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("txtAssetId" == event.TextBoxID.toString()) {
                            this.validationUSER_FIELD_1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("txtAssetId1" == event.TextBoxID.toString()) {
                            this.validationUSER_FIELD_1 = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if (this.validationSERIAL_NO == 0 && this.validationLOT_NO == 0 && this.validationUSER_FIELD_1 == 0) {
                            this.disablelotserailButton = false;
                        }
                        else {
                            this.disablelotserailButton = true;
                        }
                    }
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    ManageEquipmentItemsComponent.prototype.populateOwnerTypeDD = function () {
        this.lstOwnerType = [];
        this.lstOwnerType.push({ label: "Owned", value: "O" });
        this.lstOwnerType.push({ label: "Leased", value: "L" });
        this.lstOwnerType.push({ label: "Rented", value: "R" });
        //
    };
    ManageEquipmentItemsComponent.prototype.ddlvendorChanged = function () {
        //var data:any[] = this.selectedDeptIDs;
        // data.
        // this.newItem.DEPT_ID = this.selectedDeptIDs;
        this.newItem.VENDOR = this.selectedVendor;
    };
    ManageEquipmentItemsComponent.prototype.ddlOwnerTypeChanged = function () {
        this.newItem.OWNER_TYPE = this.selectedOwnerType;
    };
    ManageEquipmentItemsComponent.prototype.populateOwnerDD = function () {
        this.lstOwnerDetails = [];
        this.lstOwnerDetails.push({ label: "Select One", value: "Select One" });
        for (var k = 0; k < this.tkitDeptDetails.length; k++) {
            this.lstOwnerDetails.push({
                label: this.tkitDeptDetails[k].DESCRIPTION + " " + "(" + this.tkitDeptDetails[k].DEPT_ID + ")",
                value: this.tkitDeptDetails[k].DEPT_ID
            });
        }
    };
    ManageEquipmentItemsComponent.prototype.createLotSerials = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lotSerailValidations()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.updateLotSerials = function () {
        var _this = this;
        // this.lotSerailValidations();
        this.page = true;
        this.showLotSerialFields = false;
        this.showitemdetailsFields = true;
        this.showAddSerailbutton = true;
        var selectedrow = this.tkitEqItmLotSerailList.filter(function (x) { return x.SERIAL_NO == _this.newItemLotSerial.SERIAL_NO; })[0];
        if (this.newItemLotSerial.ASSET_IDPART1 == undefined || this.newItemLotSerial.ASSET_IDPART1 == null || this.newItemLotSerial.ASSET_IDPART1 == '')
            this.newItemLotSerial.ASSET_IDPART1 = '';
        this.newItemLotSerial.ASSET_ID = this.newItemLotSerial.ASSET_IDPART1 + this.newItemLotSerial.ASSET_ID;
        selectedrow.LOT_NO = this.newItemLotSerial.LOT_NO;
        selectedrow.ASSET_ID = this.newItemLotSerial.ASSET_ID;
        selectedrow.USER_FIELD_1 = this.newItemLotSerial.USER_FIELD_1;
        selectedrow.CHECKIN_DATE = this.newItemLotSerial.CHECKIN_DATE;
        selectedrow.SERVICE_DT_TIME = this.newItemLotSerial.SERVICE_DT_TIME;
        var changeDate = selectedrow.SERVICE_DT_TIME;
        var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
        //selectedrow.SERVICE_DT_TIME = dateStr.replace(',', '');
        selectedrow.UPDATE_DATE = this.date1;
        selectedrow.UPDATE_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
        selectedrow.ORG_GROUP_ID = this.selectedOrgGroupId;
        //this.newItemLotSerial = this.newItemLotSerial;
    };
    ManageEquipmentItemsComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ManageEquipmentItemsComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    ManageEquipmentItemsComponent.prototype.datevalidation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ManageEquipmentItemsComponent.prototype.gobackFromItemdetails = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.page = true;
        this.growlMessage = [];
        this.showitemdetailsFields = false;
        this.showLotSerialFields = false;
        this.additemflag = false;
        this.edititemflag = false;
        this.addserailflag = false;
        this.editserailflag = false;
    };
    ManageEquipmentItemsComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    ManageEquipmentItemsComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-manage-equipment-items.component.html',
            providers: [HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, tkit_manage_equipment_items_service_1.ManageEquipmentItemsService, datatableservice_1.datatableservice]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            tkit_manage_equipment_items_service_1.ManageEquipmentItemsService,
            HttpService_1.HttpService,
            http_1.Http])
    ], ManageEquipmentItemsComponent);
    return ManageEquipmentItemsComponent;
}());
exports.ManageEquipmentItemsComponent = ManageEquipmentItemsComponent;
//# sourceMappingURL=tkit-manage-equipment-items.component.js.map