webpackJsonp([13],{

/***/ 1439:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var CycleCountComponent = (function () {
    function CycleCountComponent() {
    }
    return CycleCountComponent;
}());
CycleCountComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1955)
    })
], CycleCountComponent);
exports.CycleCountComponent = CycleCountComponent;


/***/ }),

/***/ 1440:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var ActivityReportComponent = (function () {
    function ActivityReportComponent() {
        this.cyctProductId = AtParEnums_1.EnumApps.CycleCount;
    }
    return ActivityReportComponent;
}());
ActivityReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1956)
    })
], ActivityReportComponent);
exports.ActivityReportComponent = ActivityReportComponent;


/***/ }),

/***/ 1441:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var leftbar_animation_service_1 = __webpack_require__(229);
var router_1 = __webpack_require__(29);
var HttpService_1 = __webpack_require__(12);
var event_spinner_service_1 = __webpack_require__(24);
var AtParConstants_1 = __webpack_require__(31);
var cyct_allocate_events_service_1 = __webpack_require__(1714);
var AtParEnums_1 = __webpack_require__(14);
var api_1 = __webpack_require__(72);
var atpar_common_service_1 = __webpack_require__(43);
var linq_es5_1 = __webpack_require__(115);
var datatable_1 = __webpack_require__(71);
var AtParStatusCodes_1 = __webpack_require__(50);
var AllocateEventsComponent = (function () {
    //previousFiled: string = "";
    /**
     *
     * @param leftBarAnimationservice
     * @param router
     * @param cyctAllocateEventService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     * @param confirmationService
     */
    function AllocateEventsComponent(leftBarAnimationservice, router, cyctAllocateEventService, httpService, spinnerService, atParConstant, confirmationService, commonService) {
        this.leftBarAnimationservice = leftBarAnimationservice;
        this.router = router;
        this.cyctAllocateEventService = cyctAllocateEventService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.commonService = commonService;
        /*Varaiable declaration*/
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstUsers = [];
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.orgGrpDesc = "";
        this.ven = [];
        this.blnStatusMsg = false;
        this.selectedOrgGroupId = "";
        this.selectedDropDownUserId = "";
        this.selectedBunit = "";
        this.selectedDescription = "";
        this.orgGroupIDForDBUpdate = "";
        this.eventDescription = "";
        this.lstsearch = [];
        this.selectedSearch = "";
        this.lstNoofRecords = [];
        this.selectedRecords = "";
        this.recordsPerPageAll = "";
        this.hdnSelOrgGrpId = "";
        this.dataCheckedSorting = [];
        this.page = true;
        this.eventDesc = "";
        this.blnSortByColumn = true;
        this.custom = "custom";
        this.showGrid = false;
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.growlMessage = [];
    }
    /**
     redirecting to home when click on breadcrumbs
     */
    AllocateEventsComponent.prototype.homeurl = function () {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    };
    /**
   * Init Function for getting all org group data and UserID and BusinessUnits when page load
   */
    AllocateEventsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                    this.lstCheckedBUnits = new Array();
                    this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    this.lstsearch.push({ label: 'All', value: 'All' }, { label: 'Allocated', value: 'Allocated' }, { label: 'Unallocated', value: 'Unallocated' });
                    this.lstNoofRecords.push({ label: '10', value: '10' }, { label: '20', value: '20' }, { label: '30', value: '30' }, { label: '40', value: '40' }, { label: '50', value: '50' }, { label: '60', value: '60' }, { label: '70', value: '70' }, { label: '80', value: '80' });
                    this.bindOrgGroups();
                    this.selectedSearch = 'All';
                }
                catch (ex) {
                    this.displayCatchException(ex, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Getting Org Group Data at page Load
     */
    AllocateEventsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.orgGroupData = data.DataList;
                                        _this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpDesc = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateBusinessUnits();
                                            _this.bindUsersList();
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstUsers = [];
                                            _this.lstFilteredBUnits = [];
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + ' - ' + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.displayCatchException(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Getting Business Units at page Load
     */
    AllocateEventsComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstFilteredBUnits = [];
                        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.spinnerService.stop();
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var lstFilteredBUnitsTest = data.DataList;
                                        if (lstFilteredBUnitsTest != null) {
                                            if (lstFilteredBUnitsTest.length > 0) {
                                                for (var i = 0; i < lstFilteredBUnitsTest.length; i++) {
                                                    _this.lstFilteredBUnits.push({ label: lstFilteredBUnitsTest[i], value: lstFilteredBUnitsTest[i] });
                                                }
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Getting Users List at page Load
     */
    AllocateEventsComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.CycleCount, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({
                                                label: data.DataList[i].FULLNAME,
                                                value: data.DataList[i].USER_ID
                                            });
                                        }
                                        if (_this.lstUsers.length <= 0 || _this.lstUsers == null) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No users Available' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
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
                        this.displayCatchException(ex_3, "bindUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is Change event for OrgGroup ID
     */
    AllocateEventsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.hdnSelOrgGrpId = this.selectedOrgGroupId;
                        this.showGrid = false;
                        this.selectedDropDownUserId = '';
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstUsers = [];
                            this.selectedBunit = '';
                            this.selectedDropDownUserId = '';
                            this.lstUsers.push({ label: "Select User", value: "Select User" });
                            this.lstFilteredBUnits = [];
                            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                            return [2 /*return*/];
                        }
                        this.lstFilteredBUnits = [];
                        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                        this.selectedBunit = '';
                        this.selectedDropDownUserId = '';
                        this.lstEvents = new Array();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindUsersList()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is Change event for User ID
     */
    AllocateEventsComponent.prototype.ddlUserIdChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.eventDesc = event.label;
                this.showGrid = false;
                return [2 /*return*/];
            });
        });
    };
    /**
     * This function is Change event for Records per page
     * @param event
     */
    AllocateEventsComponent.prototype.ddlSelectChangePage = function (event) {
        this.recordsPerPageSize = parseInt(event.value);
    };
    AllocateEventsComponent.prototype.ddlBUnitChanged = function () {
        this.showGrid = false;
    };
    AllocateEventsComponent.prototype.ddlSelectChanged = function () {
        this.showGrid = false;
    };
    /**
     * This function is called when we click on go button
     */
    AllocateEventsComponent.prototype.getAllBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstGridFilterData = null;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.showGrid = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select User ID' });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.bindEventDetails()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5, "getAllBUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is called when we click on go button
     */
    AllocateEventsComponent.prototype.bindEventDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.buildHeadersInputDataset()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.displayCatchException(ex_6, "bindEventDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is called when we click on go button
     */
    AllocateEventsComponent.prototype.buildHeadersInputDataset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.dataTableComponent != null) {
                            this.dataTableComponent.reset();
                        }
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] = this.orgGroupIDForDBUpdate;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cyctAllocateEventService.getAllocateEvents(this.selectedDropDownUserId, this.selectedBunit, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                var data, i;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    this.lstEvents = data.DataList;
                                    this.lstEventsData = this.lstEvents;
                                    this.lstEventsTotal = data.DataList;
                                    if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No business units allocated for Org Grp Id' });
                                        this.spinnerService.stop();
                                        this.showGrid = false;
                                        return [2 /*return*/];
                                    }
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            if (this.lstEvents.length > 0) {
                                                this.showGrid = true;
                                                for (i = 0; i < this.lstEvents.length; i++) {
                                                    if (this.lstEvents[i].COUNT_HDR_STATUS == "1") {
                                                        this.lstEvents[i].isOrphan = true;
                                                        this.lstEvents[i].CartColor = "black";
                                                    }
                                                    else {
                                                        this.lstEvents[i].isOrphan = false;
                                                        this.lstEvents[i].CartColor = "red";
                                                    }
                                                }
                                                if (this.selectedSearch == 'All') {
                                                    if (this.eventDescription == "" || this.eventDescription == null || this.eventDescription == undefined) {
                                                        //this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => a.STATUSALLOCATED === false).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                    else {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return (a.STATUSALLOCATED === false || a.STATUSALLOCATED === true) && a.EVENT_ID.toLowerCase().startsWith(_this.eventDescription.toLowerCase()); }).OrderBy(function (a) { return a.BUSINESS_UNIT; }).ToArray();
                                                        //this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => (a.STATUSALLOCATED === false)).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                }
                                                else if (this.selectedSearch == 'Allocated') {
                                                    if (this.eventDescription == "" || this.eventDescription == null || this.eventDescription == undefined) {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return a.STATUSALLOCATED === true; }).ToArray(); //.OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                    else {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return a.STATUSALLOCATED === true && a.EVENT_ID.toLowerCase().startsWith(_this.eventDescription.toLowerCase()); }).OrderBy(function (a) { return a.BUSINESS_UNIT; }).ToArray();
                                                        // this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => (a.STATUSALLOCATED === false)).OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                }
                                                else if (this.selectedSearch == 'Unallocated') {
                                                    if (this.eventDescription == "" || this.eventDescription == null || this.eventDescription == undefined) {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return a.STATUSALLOCATED === false; }).ToArray(); //.OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                    else {
                                                        this.lstEvents = linq_es5_1.asEnumerable(this.lstEvents).Where(function (a) { return a.STATUSALLOCATED === false && a.EVENT_ID.toLowerCase().startsWith(_this.eventDescription.toLowerCase()); }).OrderBy(function (a) { return a.BUSINESS_UNIT; }).ToArray();
                                                        //  this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => (a.STATUSALLOCATED === false)).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                                    }
                                                }
                                                this.lstLength = "Number of Events allocated to  " + this.eventDesc + " :" + this.lstEventsTotal.filter(function (x) { return x.STATUSALLOCATED === true; }).length;
                                                if (this.lstEvents == null || this.lstEvents.length <= 0) {
                                                    this.showGrid = false;
                                                    this.growlMessage = [];
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Events Found" });
                                                }
                                            }
                                            else {
                                                this.growlMessage = [];
                                                this.spinnerService.stop();
                                                this.showGrid = false;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Events Found" });
                                                break;
                                            }
                                            this.bindDataGrid();
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            if (this.lstEvents == null || this.lstEvents.length <= 0) {
                                                this.showGrid = false;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Events Found" });
                                            }
                                            else if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_EVENTS_CNCT_UNALLOCATE) {
                                                this.showGrid = true;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            }
                                            else {
                                                this.showGrid = false;
                                                this.growlMessage.push({
                                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage
                                                });
                                            }
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.displayCatchException(ex_7, "buildHeadersInputDataset");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is for binding data to datatable
     */
    AllocateEventsComponent.prototype.bindDataGrid = function () {
        try {
            var lstDBDataList;
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];
            for (var i = 0; i <= this.lstEvents.length - 1; i++) {
                if (this.lstEvents[i].STATUSALLOCATED == true) {
                    this.dataCheckedSorting.push(this.lstEvents[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.lstEvents[i]);
                }
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.displayCatchException(ex, "bindDataGrid");
        }
    };
    /**
     * This event is called when we check or uncheck the swicth component
     * @param values
     * @param event
     */
    AllocateEventsComponent.prototype.selectedRow = function (values, event) {
        return __awaiter(this, void 0, void 0, function () {
            var i, index;
            return __generator(this, function (_a) {
                try {
                    if (event == true) {
                        values.STATUSALLOCATED = true;
                    }
                    else {
                        values.STATUSALLOCATED = false;
                    }
                    if (this.lstCheckedBUnits.length > 0 && this.lstCheckedBUnits != null) {
                        for (i = 0; i < this.lstCheckedBUnits.length; i++) {
                            if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                                index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0);
                                this.lstCheckedBUnits.splice(index, 1);
                            }
                        }
                        this.lstCheckedBUnits.push(values);
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "selectedRow");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    * check all the switches
    */
    AllocateEventsComponent.prototype.checkAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.lstCheckedBUnits = [];
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                    if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                        if (this.endIndex > this.lstGridFilterData.length) {
                            this.endIndex = this.lstGridFilterData.length;
                        }
                        for (i = this.startIndex; i <= this.endIndex - 1; i++) {
                            this.lstGridFilterData[i].STATUSALLOCATED = true;
                            this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                        }
                    }
                    else {
                        if (this.endIndex > this.lstEvents.length) {
                            this.endIndex = this.lstEvents.length;
                        }
                        for (i = this.startIndex; i <= this.endIndex - 1; i++) {
                            this.lstEvents[i].STATUSALLOCATED = true;
                            this.lstCheckedBUnits.push(this.lstEvents[i]);
                        }
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "checkAll");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Uncheck all the switches
     */
    AllocateEventsComponent.prototype.unCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.lstCheckedBUnits = [];
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                    if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                        if (this.endIndex > this.lstGridFilterData.length) {
                            this.endIndex = this.lstGridFilterData.length;
                        }
                        for (i = this.endIndex - 1; i >= this.startIndex; i--) {
                            this.lstGridFilterData[i].STATUSALLOCATED = false;
                            this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                        }
                    }
                    else {
                        if (this.endIndex > this.lstEvents.length) {
                            this.endIndex = this.lstEvents.length;
                        }
                        for (i = this.endIndex - 1; i >= this.startIndex; i--) {
                            this.lstEvents[i].STATUSALLOCATED = false;
                            this.lstCheckedBUnits.push(this.lstEvents[i]);
                        }
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "unCheckAll");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Updating Events
     */
    AllocateEventsComponent.prototype.updateEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstdsEventDetails, i, business, eventID, noRecords, fromLoc, toLoc, userID, statusAllocation, actualStatus, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        lstdsEventDetails = [];
                        if (!(this.lstEvents.length > 0)) return [3 /*break*/, 2];
                        lstdsEventDetails = [];
                        for (i = 0; i < this.lstEvents.length; i++) {
                            if (this.lstEvents[i].STATUSALLOCATED != this.lstEvents[i].ACTUAL_STATUSALLOCATED) {
                                business = AtParEnums_1.Send_CycleCount_Event_Enum.BUSINESS_UNIT;
                                eventID = AtParEnums_1.Send_CycleCount_Event_Enum.EVENT_ID;
                                noRecords = AtParEnums_1.Send_CycleCount_Event_Enum.NO_RECORDS;
                                fromLoc = AtParEnums_1.Send_CycleCount_Event_Enum.FROM_STOR_LOC;
                                toLoc = AtParEnums_1.Send_CycleCount_Event_Enum.TO_STOR_LOC;
                                userID = AtParEnums_1.Send_CycleCount_Event_Enum.USER_ID;
                                statusAllocation = AtParEnums_1.Send_CycleCount_Event_Enum.ALLOCATION_STATUS;
                                actualStatus = AtParEnums_1.Send_CycleCount_Event_Enum.ACTUAL_ALLOCATION_STATUS;
                                lstdsEventDetails.push({
                                    BUSINESS_UNIT: this.lstEvents[i].BUSINESS_UNIT,
                                    EVENT_ID: this.lstEvents[i].EVENT_ID,
                                    NO_RECORDS: this.lstEvents[i].NO_RECORDS,
                                    FROM_STOR_LOC: this.lstEvents[i].FROM_STOR_LOC,
                                    TO_STOR_LOC: this.lstEvents[i].TO_STOR_LOC,
                                    USER_ID: this.selectedDropDownUserId,
                                    STATUSALLOCATED: this.lstEvents[i].STATUSALLOCATED,
                                    ALLOCATION_STATUS: this.lstEvents[i].STATUSALLOCATED,
                                    ACTUAL_STATUSALLOCATED: this.lstEvents[i].ACTUAL_STATUSALLOCATED
                                });
                            }
                        }
                        localStorage.setItem('EventDetails', JSON.stringify(lstdsEventDetails));
                        this.spinnerService.start();
                        return [4 /*yield*/, this.cyctAllocateEventService.updateEvents(lstdsEventDetails, this.deviceTokenEntry)
                                .subscribe(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            this.growlMessage = [];
                                            _a = response.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 2];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1:
                                            {
                                                this.lstEvents = [];
                                                this.showGrid = false;
                                                this.selectedDropDownUserId = "";
                                                this.selectedBunit = "";
                                                this.eventDescription = "";
                                                this.spinnerService.stop();
                                                this.selectedSearch = 'All';
                                                this.growlMessage = [];
                                                // this.selectedOrgGroupId = "";
                                                this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'User Events Updated Successfully' });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 2;
                                        case 2:
                                            this.showGrid = true;
                                            //this.spinnerService.start();
                                            this.growlMessage = [];
                                            return [4 /*yield*/, this.warnMessage(response.StatusCode, response.StatusMessage)];
                                        case 3:
                                            _b.sent();
                                            // setTimeout(() => {}, 100);
                                            return [3 /*break*/, 6];
                                        case 4:
                                            {
                                                this.spinnerService.stop();
                                                this.showGrid = false;
                                                this.growlMessage = [];
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 5;
                                        case 5:
                                            {
                                                this.spinnerService.stop();
                                                this.showGrid = false;
                                                this.growlMessage = [];
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _a.sent();
                        this.displayCatchException(ex_8, "updateEvents");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateEventsComponent.prototype.warnMessage = function (statusCode, statusMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.growlMessage = [];
                        if (!(statusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_EVENTS_CNCT_UNALLOCATE)) return [3 /*break*/, 2];
                        //this.showGrid = false;
                        return [4 /*yield*/, this.bindEventDetails()];
                    case 1:
                        //this.showGrid = false;
                        _a.sent();
                        this.showGrid = true;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                        return [3 /*break*/, 3];
                    case 2:
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                        _a.label = 3;
                    case 3:
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_9 = _a.sent();
                        this.displayCatchException(ex_9, "warnMessage");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is used for filtering data in datatable
     * @param event
     */
    AllocateEventsComponent.prototype.filterdata = function (event) {
        this.lstGridFilterData = [];
        this.lstGridFilterData = new Array();
        this.lstGridFilterData = event;
    };
    /**
     * This function  is used for Custom sorting in data table for all columns
     * @param event
     */
    AllocateEventsComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.lstEvents = [];
            this.blnSortByColumn = !this.blnSortByColumn;
            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];
            this.sortedCheckedRec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sortedUncheckedRec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (this.blnSortByColumn == false) {
                this.lstEvents = [];
                if (this.selectedSearch == 'All') {
                    this.lstEvents = this.sortedCheckedRec.reverse().concat(this.sortedUncheckedRec.reverse());
                }
                else if (this.selectedSearch == 'Allocated') {
                    this.lstEvents = this.sortedCheckedRec.reverse();
                }
                else if (this.selectedSearch == 'Unallocated') {
                    this.lstEvents = this.sortedUncheckedRec.reverse();
                }
            }
            else {
                this.lstEvents = [];
                if (this.selectedSearch == 'All') {
                    this.lstEvents = this.sortedCheckedRec.concat(this.sortedUncheckedRec);
                }
                else if (this.selectedSearch == 'Allocated') {
                    this.lstEvents = this.sortedCheckedRec;
                }
                else if (this.selectedSearch == 'Unallocated') {
                    this.lstEvents = this.sortedUncheckedRec;
                }
            }
            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];
        }
        catch (ex) {
            this.displayCatchException(ex, "customSort");
        }
    };
    /**
    * This method is for displaying catch block error messages
    * @param event
    */
    AllocateEventsComponent.prototype.displayCatchException = function (ex, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    /**
   * delete all the values from variables
   */
    AllocateEventsComponent.prototype.ngOnDestroy = function () {
        this.lstEvents = null;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstOrgGroups = [];
        this.lstUsers = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.lstGridFilterData = [];
        this.sortedCheckedRec = [];
        this.sortedUncheckedRec = [];
        this.lstLength = 0;
        this.blnSortByColumn = true;
    };
    return AllocateEventsComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], AllocateEventsComponent.prototype, "dataTableComponent", void 0);
AllocateEventsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1957),
        providers: [AtParConstants_1.AtParConstants, api_1.ConfirmationService, cyct_allocate_events_service_1.CyctAllocateEventsService, atpar_common_service_1.AtParCommonService]
    }),
    __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
        router_1.Router,
        cyct_allocate_events_service_1.CyctAllocateEventsService,
        HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService,
        AtParConstants_1.AtParConstants,
        api_1.ConfirmationService,
        atpar_common_service_1.AtParCommonService])
], AllocateEventsComponent);
exports.AllocateEventsComponent = AllocateEventsComponent;


/***/ }),

/***/ 1442:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var atpar_common_service_1 = __webpack_require__(43);
var HttpService_1 = __webpack_require__(12);
var AtParConstants_1 = __webpack_require__(31);
var AtParStatusCodes_1 = __webpack_require__(50);
var event_spinner_service_1 = __webpack_require__(24);
var AtParEnums_1 = __webpack_require__(14);
var AllocateIBUsManualCountsComponent = (function () {
    function AllocateIBUsManualCountsComponent(datatableservice, commonService, httpService, atParConstant, spinnerService) {
        this.datatableservice = datatableservice;
        this.commonService = commonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.spinnerService = spinnerService;
        this.isVisible = false;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstOrgGroups = [];
        this.ddlUserID = [];
        this.selectedOrgGroupID = "";
        this.selectedDescription = "";
        this.lstFilteredBUnits = [];
        this.lstBUnits = [];
        this.selectedBunit = "";
        this.blnsortbycolumn = false;
        this.showGrid = false;
        this.preField = "";
        this.dataCheckedSorting = [];
    }
    AllocateIBUsManualCountsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.lstCheckedBUnits = new Array();
                        this.dataCheckedSorting = new Array();
                        this.dataUncheckedSorting = new Array();
                        this.lstFilteredBUnits = new Array();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var orgGroups = res.json();
                                _this.spinnerService.stop();
                                switch (orgGroups.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlUserID.push({ label: "Select User", value: "Select User" });
                                        _this.orgGroupData = orgGroups.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.lblOrgGrpID = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpID = _this.orgGroupData[0].ORG_GROUP_ID;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupID = true;
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID != "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + " - " + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        if (_this.blnShowOrgGroupLabel) {
                                            _this.populateUsersDropDown();
                                            _this.populateBunitsDdlst();
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_1 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(exMsg_1, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isVisible = false;
                        this.growlMessage = [];
                        if (this.selectedOrgGroupID == "Select One") {
                            this.ddlUserID = [];
                            this.ddlUserID.push({ label: "Select User", value: "Select User" });
                            return [2 /*return*/];
                        }
                        this.selectedUserID = "";
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.populateUsersDropDown()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.populateBunitsDdlst()];
                    case 3:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.populateBunitsDdlst = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
                        }
                        this.spinnerService.start();
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupID) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.lstBUnits = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBUnits = data.DataList;
                                        isOrgBUnitsExist = true;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "populateBunitsDdlst");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.populateUsersDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ddlUserID = [];
                        this.selectedUserID = "";
                        if (this.blnShowOrgGroupLabel) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        if (this.blnShowOrgGroupID) {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.CycleCount, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var webresp = res.json();
                                _this.spinnerService.stop();
                                _this.ddlUserID.push({ label: "Select User", value: "Select User" });
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstUserData = webresp.DataList;
                                        if (_this.lstUserData.length > 0) {
                                            for (var i = 0; i < _this.lstUserData.length; i++) {
                                                _this.ddlUserID.push({ label: _this.lstUserData[i].FULLNAME, value: _this.lstUserData[i].USER_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2, "populateUsersDropDown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.fillBUnitsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredBUnits = [];
                        query = event.query;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
                        }
                        if (this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "Select One") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstBUnits = data.DataList;
                                        _this.lstFilteredBUnits = _this.filterBusinessUnits(query, _this.lstBUnits);
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "fillBUnitsAuto");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.filterBusinessUnits = function (query, businessunits) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < businessunits.length; i++) {
                var Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue);
            }
        }
        else {
            if (query.length >= 1) {
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
    AllocateIBUsManualCountsComponent.prototype.checkAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    AllocateIBUsManualCountsComponent.prototype.unCheckAll = function () {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    };
    AllocateIBUsManualCountsComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    //customSort1(event) {
    //    try {
    //        var element = event;
    //        this.lstDBData = [];
    //        this.blnsortbycolumn = !this.blnsortbycolumn;
    //        let sortedcheckedrec = [];
    //        let sorteduncheckedrec = [];
    //        sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnsortbycolumn == false) {
    //            this.lstDBData = [];
    //            this.lstDBData = sortedcheckedrec.reverse().concat(sorteduncheckedrec.reverse());
    //        }
    //        else {
    //            this.lstDBData = [];
    //            this.lstDBData = sortedcheckedrec.concat(sorteduncheckedrec);
    //        }
    //        sortedcheckedrec = [];
    //        sorteduncheckedrec = [];
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
    AllocateIBUsManualCountsComponent.prototype.customSort = function (event, field) {
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            }
            else {
                element.order = 1;
            }
        }
        else {
            element.order = 1;
        }
        this.preField = element.field;
        var dataChecked = [];
        var dataUnchecked = [];
        var result = null;
        var order;
        try {
            dataChecked = this.dataCheckedSorting.sort(function (a, b) {
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
            dataUnchecked = this.dataUncheckedSorting.sort(function (a, b) {
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
        this.lstDBData = this.dataCheckedSorting.concat(this.dataUncheckedSorting);
        dataChecked = [];
        dataUnchecked = [];
    };
    AllocateIBUsManualCountsComponent.prototype.getAllBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isBUnitsExists, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstgridfilterData = null;
                        this.isVisible = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
                        }
                        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupID) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedUserID === "Select User" || this.selectedUserID === "undefined" || this.selectedUserID == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                            this.showGrid = false;
                            return [2 /*return*/, false];
                        }
                        this.lstDBData = new Array();
                        return [4 /*yield*/, this.populateBunitsDdlst()];
                    case 2:
                        isBUnitsExists = _a.sent();
                        if (isBUnitsExists == true) {
                            this.spinnerService.start();
                            this.commonService.getBUs(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstBUnits, AtParEnums_1.EnumApps.CycleCount, this.selectedUserID, this.selectedBunit, this.selectedDescription)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDBData = [];
                                        _this.lstDBData = response.DataList;
                                        for (var i = 0; i <= response.DataList.length - 1; i++) {
                                            if (response.DataList[i].CHK_ALLOCATED == 1) {
                                                response.DataList[i].checkvalue = true;
                                            }
                                            else {
                                                response.DataList[i].checkvalue = false;
                                            }
                                        }
                                        _this.lstDBData = response.DataList;
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
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getAllBUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocateIBUsManualCountsComponent.prototype.BindDataGrid = function () {
        try {
            var lstDBDataList;
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
            this.showGrid = true;
            this.isVisible = true;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    };
    AllocateIBUsManualCountsComponent.prototype.allocateBUnits = function () {
        var _this = this;
        try {
            if ((this.selectedBunit != null && this.selectedBunit != undefined && this.selectedBunit != "") || (this.selectedDescription != null && this.selectedDescription != undefined && this.selectedDescription != "")) {
                this.searched = true;
            }
            else {
                this.searched = false;
            }
            this.allocateDBData = new Array();
            this.spinnerService.start();
            for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].checkvalue == true) {
                    this.lstDBData[i].CHK_ALLOCATED = 1;
                    this.lstDBData[i].CHK_VALUE = 1;
                }
                else {
                    this.lstDBData[i].CHK_ALLOCATED = 0;
                    this.lstDBData[i].CHK_VALUE = 0;
                }
            }
            this.allocateDBData = this.lstDBData;
            if (!this.searched) {
                this.allocateDBData = this.lstDBData.filter(function (obj) { return obj.CHK_VALUE == 1; });
            }
            this.commonService.allocateBUnits(AtParEnums_1.EnumApps.CycleCount, this.selectedUserID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.allocateDBData, this.searched)
                .catch(this.httpService.handleError).then(function (res) {
                var response = res.json();
                _this.growlMessage = [];
                switch (response.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                        if (_this.blnShowOrgGroupID) {
                            _this.ddlUserID = [];
                            _this.ddlUserID.push({ label: "Select User", value: "Select User" });
                        }
                        _this.selectedUserID = "";
                        _this.selectedOrgGroupID = "";
                        _this.selectedDescription = "";
                        _this.selectedBunit = "";
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
                        _this.showGrid = false;
                        break;
                    }
                    case AtParEnums_1.StatusType.Custom: {
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                        _this.spinnerService.stop();
                        _this.showGrid = false;
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateBUnits");
        }
    };
    AllocateIBUsManualCountsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocateIBUsManualCountsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstFilteredBUnits = [];
        this.ddlUserID = [];
        this.lstBUnits = [];
        this.lstOrgGroups = [];
        this.lstCheckedBUnits = [];
        this.lstDBData = [];
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.lstgridfilterData = [];
        this.allocateDBData = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.orgGroupData = [];
        this.spinnerService.stop();
    };
    return AllocateIBUsManualCountsComponent;
}());
AllocateIBUsManualCountsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1958),
        providers: [datatableservice_1.datatableservice, HttpService_1.HttpService, AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants,
        event_spinner_service_1.SpinnerService])
], AllocateIBUsManualCountsComponent);
exports.AllocateIBUsManualCountsComponent = AllocateIBUsManualCountsComponent;


/***/ }),

/***/ 1443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DailyActivityComponent = (function () {
    function DailyActivityComponent() {
    }
    return DailyActivityComponent;
}());
DailyActivityComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1959)
    })
], DailyActivityComponent);
exports.DailyActivityComponent = DailyActivityComponent;


/***/ }),

/***/ 1444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var DailyUserActivityComponent = (function () {
    function DailyUserActivityComponent() {
    }
    return DailyUserActivityComponent;
}());
DailyUserActivityComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1960)
    })
], DailyUserActivityComponent);
exports.DailyUserActivityComponent = DailyUserActivityComponent;


/***/ }),

/***/ 1445:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var EventSummaryReportComponent = (function () {
    function EventSummaryReportComponent() {
    }
    return EventSummaryReportComponent;
}());
EventSummaryReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1961)
    })
], EventSummaryReportComponent);
exports.EventSummaryReportComponent = EventSummaryReportComponent;


/***/ }),

/***/ 1446:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var HttpService_1 = __webpack_require__(12);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var AtParStatusCodes_1 = __webpack_require__(50);
var datatable_1 = __webpack_require__(71);
var routepath_1 = __webpack_require__(70);
var cyct_item_exception_report_service_1 = __webpack_require__(1715);
var file_saver_1 = __webpack_require__(228);
var ItemExceptionReportComponent = (function () {
    function ItemExceptionReportComponent(spinnerService, atParCommonService, httpService, atParConstant, itemExceptionReportService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.itemExceptionReportService = itemExceptionReportService;
        this.growlMessage = [];
        this.defDuration = 0;
        this.statusCode = -1;
        this.showGrid = false;
        this.isMailDialog = false;
        this.toDate = new Date();
        this.lstOrgGroupIds = [];
        this.lstBusinessUnits = [];
        this.lstExceptionDetails = [];
        this.lstChildExcpDetails = [];
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    ItemExceptionReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.start();
                        this.statusType = '';
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 1:
                        _a.sent();
                        if (this.statusType != AtParEnums_2.StatusType.Success) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 2:
                        _a.sent();
                        if (!!this.showOrgDropdown) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.populateBUnitDropDown()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.statusType = res.StatType;
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.defDuration = parseInt(res.DataVariable.toString());
                                        _this.fromDate = new Date();
                                        var d = _this.fromDate.getDate() - _this.defDuration;
                                        _this.fromDate.setDate(d);
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'getMyPreferences');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstOrgGroupIds = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataList.length == 1) {
                                            _this.showOrgDropdown = false;
                                            _this.orgGroupId = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                            _this.selectedOrgGroupID = res.DataList[0].ORG_GROUP_ID;
                                        }
                                        else {
                                            _this.showOrgDropdown = true;
                                            _this.lstBusinessUnits = [];
                                            _this.lstBusinessUnits.push({ label: 'Select BUnit', value: 'Select BUnit' });
                                            _this.lstOrgGroupIds.push({ label: 'Select One', value: 'Select One' });
                                            _this.selectedOrgGroupID = 'Select One';
                                            for (var i = 0; i < res.DataList.length; i++) {
                                                if (res.DataList[i].ORG_GROUP_ID.toUpperCase() != 'ALL') {
                                                    _this.lstOrgGroupIds.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.populateBUnitDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getBusinessUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.BusinessType.Inventory.toString())
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstBusinessUnits = [];
                                _this.lstBusinessUnits.push({ label: 'Select BUnit', value: 'Select BUnit' });
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i in res.DataList) {
                                            _this.lstBusinessUnits.push({ label: res.DataList[i], value: res.DataList[i] });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "populateBUnitDropDown");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.ddlOrgGroup_SelectedIndexChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedOrgGroupID = this.orgGroupId;
                        this.lstBusinessUnits = [];
                        this.lstBusinessUnits.push({ label: 'Select BUnit', value: 'Select BUnit' });
                        this.businessUnit = 'Select BUnit';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(this.orgGroupId != 'Select One')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.getOrgGroupBUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedOrgGroupID, AtParEnums_1.BusinessType[AtParEnums_1.BusinessType.Inventory.toString()])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        for (var i in res.DataList) {
                                            _this.lstBusinessUnits.push({ label: res.DataList[i], value: res.DataList[i] });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No assigned org business units" });
                                            break;
                                        }
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.businessUnit = 'All';
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "ddlOrgGroup_SelectedIndexChanged");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        this.growlMessage = [];
                        this.showGrid = false;
                        if (!(this.selectedOrgGroupID == 'Select One' || this.selectedOrgGroupID == undefined || this.selectedOrgGroupID == null)) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(this.lstBusinessUnits.length <= 1)) return [3 /*break*/, 2];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No assigned org business units" });
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.fromDate.getDate() > this.toDate.getDate())) return [3 /*break*/, 3];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To date must be greater than From date" });
                        return [3 /*break*/, 5];
                    case 3:
                        if (this.businessUnit == 'Select BUnit' || this.businessUnit == undefined) {
                            this.businessUnit = 'All';
                        }
                        if (this.itemID == undefined) {
                            this.itemID = '';
                        }
                        if (this.eventID == undefined) {
                            this.eventID = '';
                        }
                        this.strFromDate = this.getDateString(this.fromDate);
                        this.strToDate = this.getDateString(this.toDate);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.itemExceptionReportService.getCycleExceptionReport(this.businessUnit, this.itemID, this.eventID, this.strFromDate, this.strToDate, this.selectedOrgGroupID).catch(this.httpService.handleError).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstExceptionDetails = res.DataDictionary['dsExpRep']['Table1'];
                                        if (_this.lstExceptionDetails.length == 0) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                            break;
                                        }
                                        _this.showGrid = true;
                                        _this.lstChildExcpDetails = res.DataDictionary['dsExpRep']['Table2'];
                                        for (var j = 0; j < _this.lstChildExcpDetails.length; j++) {
                                            _this.lstChildExcpDetails[j].COUNT_DATE1 = _this.formatDate(_this.lstChildExcpDetails[j].COUNT_DATE.toString());
                                        }
                                        for (var i = 0; i < _this.lstExceptionDetails.length; i++) {
                                            var list = _this.lstChildExcpDetails.filter(function (x) { return x.LOCATION.trim() == _this.lstExceptionDetails[i].LOCATION.trim() && x.EVENT_ID.trim() == _this.lstExceptionDetails[i].EVENT_ID.trim() && x.ITEM_ID.trim() == _this.lstExceptionDetails[i].ITEM_ID.trim(); });
                                            _this.lstExceptionDetails[i].SUB_ITEMS = list;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'btnGo_Click');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "CycleCountItemExceptionReport.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Cycle Count Item Exception Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'onSendMailIconClick');
                }
                return [2 /*return*/];
            });
        });
    };
    ItemExceptionReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Email Address to Send' });
                            return [2 /*return*/];
                        }
                        val = this.validateEmail(this.toMailAddr);
                        if (!val) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Email Address to Send' });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.isMailDialog = false;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Cycle Count Item Exception Report', JSON.stringify(html), this.toMailAddr, AtParEnums_2.MailPriority.Normal.toString(), '')
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server is Not Configured! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, i, j, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.atParCommonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        title = '""' + "AtparVersion2.4.4" + '""';
                        htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td  align=left  width='15%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cycle Count Item Exception Report between " + this.strFromDate + " and " + this.strToDate + " </b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cycle Count Item Exception Report between " + this.strFromDate + " and " + this.strToDate + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
                        htmlBuilder += "<table align=center width=100% style=" + "BORDER-COLLAPSE:collapse" + " border=1>";
                        htmlBuilder += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>BUnit</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Event ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Parent Event ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Item ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Custom Item NO</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Item Description</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Location</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Count Date</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>System Qty</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Count Qty</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Count %</b></span></td>";
                        htmlBuilder += "</tr>";
                        for (i = 0; i < this.lstExceptionDetails.length; i++) {
                            if (this.lstExceptionDetails[i].SUB_ITEMS.length != 0) {
                                for (j = 0; j < this.lstExceptionDetails[i].SUB_ITEMS.length; j++) {
                                    htmlBuilder += "<tr>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].BUSINESS_UNIT + "</span></td>";
                                    if (this.lstExceptionDetails[i].EVENT_ID == null) {
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].EVENT_ID + "</span></td>";
                                    }
                                    else {
                                        htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstExceptionDetails[i].EVENT_ID + "</span></td>";
                                    }
                                    if (this.lstExceptionDetails[i].PARENT_EVENT_ID == null) {
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].PARENT_EVENT_ID + "</span></td>";
                                    }
                                    else {
                                        htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstExceptionDetails[i].PARENT_EVENT_ID + "</span></td>";
                                    }
                                    if (this.lstExceptionDetails[i].ITEM_ID == null) {
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].ITEM_ID + "</span></td>";
                                    }
                                    else {
                                        htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstExceptionDetails[i].ITEM_ID + "</span></td>";
                                    }
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].REPORT_DATA_15 + "</span></td>";
                                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].ITEM_DESC + "</span></td>";
                                    if (this.lstExceptionDetails[i].LOCATION == null) {
                                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].LOCATION + "</span></td>";
                                    }
                                    else {
                                        htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstExceptionDetails[i].LOCATION + "</span></td>";
                                    }
                                    htmlBuilder += "<td align=left nowrap><span class=c3> &nbsp;" + this.lstExceptionDetails[i].SUB_ITEMS[j].COUNT_DATE1 +
                                        "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstExceptionDetails[i].SUB_ITEMS[j].SYS_QTY + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstExceptionDetails[i].SUB_ITEMS[j].COUNT_QTY + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstExceptionDetails[i].SUB_ITEMS[j].COUNT_PERCENT +
                                        "</span></td>";
                                }
                            }
                        }
                        htmlBuilder += "</table></Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_9 = _a.sent();
                        htmlBuilder = '';
                        this.clientErrorMsg(ex_9, 'exportReportDetails');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ItemExceptionReportComponent.prototype.getDateString = function (MyDate) {
        var MyDateString = ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + ('0' + MyDate.getDate()).slice(-2) + '/' + MyDate.getFullYear();
        return MyDateString;
    };
    ItemExceptionReportComponent.prototype.formatDate = function (dateVal) {
        var newDate = new Date(dateVal);
        var sMonth = this.padValue(newDate.getMonth() + 1);
        var sDay = this.padValue(newDate.getDate());
        var sYear = newDate.getFullYear();
        var sHour = newDate.getHours();
        var sMinute = this.padValue(newDate.getMinutes());
        var seconds = this.padValue(newDate.getSeconds());
        var sAMPM = "AM";
        var iHourCheck = sHour;
        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
            sHour = 12;
        }
        sHour = this.padValue(sHour);
        return sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + ":" + seconds + " " + sAMPM;
    };
    ItemExceptionReportComponent.prototype.padValue = function (value) {
        return (value < 10) ? "0" + value : value;
    };
    ItemExceptionReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ItemExceptionReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ItemExceptionReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ItemExceptionReportComponent.prototype.ngOnDestroy = function () {
        this.lstBusinessUnits = [];
        this.lstChildExcpDetails = [];
        this.lstExceptionDetails = [];
        this.lstOrgGroupIds = [];
    };
    return ItemExceptionReportComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ItemExceptionReportComponent.prototype, "appId", void 0);
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], ItemExceptionReportComponent.prototype, "dataTableComponent", void 0);
ItemExceptionReportComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1962),
        providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cyct_item_exception_report_service_1.ItemExceptionReportService],
    }),
    __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants,
        cyct_item_exception_report_service_1.ItemExceptionReportService])
], ItemExceptionReportComponent);
exports.ItemExceptionReportComponent = ItemExceptionReportComponent;


/***/ }),

/***/ 1447:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var HttpService_1 = __webpack_require__(12);
var event_spinner_service_1 = __webpack_require__(24);
var atpar_common_service_1 = __webpack_require__(43);
var AtParEnums_1 = __webpack_require__(14);
var AtParEnums_2 = __webpack_require__(14);
var AtParConstants_1 = __webpack_require__(31);
var AtParWebApiResponse_1 = __webpack_require__(1370);
var AtParStatusCodes_1 = __webpack_require__(50);
var datatable_1 = __webpack_require__(71);
var cyct_process_counts_service_1 = __webpack_require__(1716);
var MT_ATPAR_SECURITY_AUDIT_1 = __webpack_require__(325);
var VM_UPDATE_REVIEWER_DATA_1 = __webpack_require__(1875);
var api_1 = __webpack_require__(72);
var file_saver_1 = __webpack_require__(228);
var ProcessCountsComponent = (function () {
    function ProcessCountsComponent(dataservice, spinnerService, atParCommonService, httpService, atParConstant, processSevice, confirmationService) {
        this.dataservice = dataservice;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.processSevice = processSevice;
        this.confirmationService = confirmationService;
        this.growlMessage = [];
        this.pop = false;
        this.usersList = [];
        this.activateSend = false;
        this.loading = true;
        this.lstAuditData = [];
        this.performManualCounts = "";
        this.reviewManualCounts = "";
        this.reviewCounts = "";
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.ddlOrgGroups = [];
        this.ddlBunit = [];
        this.ddlEvent = [];
        this.lblOrgGrpID = "";
        this.selectedOrgGrpID = "";
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupID = false;
        this.selectedBUnit = "";
        this.selectedEventID = "";
        this.lstEventId = [];
        this.startIndex = 0;
        this.isParentEvent = "";
        this.blnEventIsSplit = false;
        this.lstEventDetails = [];
        this.transIDCount = 0;
        this.orderHistory = "";
        this.eventDetails = [];
        this.lstColDetails = [];
        this.activeFlag = "true";
        this.ddlStatus = [];
        this.lstUpdateReviewerData = [];
        this.strUpdateCntDtWeb = '';
        this.auditSatus = '';
        this.isSend = false;
        this.showDropDowns = false;
        this.m_strEditCounts = '';
        this.isMailDialog = false;
        this.blnSortByColumn = false;
        this.preField = '';
    }
    ProcessCountsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        this.growlMessage = [];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.strMenuCode = localStorage.getItem("menuCode");
                        this.getProfileParamValue();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.UPDATE_COUNTDATE_WEB].toString())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_COUNTS].toString())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString())];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString())];
                    case 4:
                        _a.sent();
                        if (!(this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()] &&
                            ((this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()] && this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()] ||
                                (this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()]))))) return [3 /*break*/, 5];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Check Review Counts Organization Parameter" });
                        this.showDropDowns = false;
                        return [2 /*return*/];
                    case 5:
                        this.showDropDowns = true;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 6:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pop = false;
                        this.growlMessage = [];
                        this.ddlEvent = [];
                        this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        if (this.selectedOrgGrpID == "Select One") {
                            this.ddlBunit = [];
                            this.ddlBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                            return [2 /*return*/];
                        }
                        this.selectedBUnit = "Select BUnit";
                        this.selectedEventID = "Select EventId";
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.populateBUnits()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.ddlBUnitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.growlMessage = [];
                        this.pop = false;
                        this.ddlEvent = [];
                        this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        if (!((this.selectedBUnit != "Select BUnit") && (this.selectedBUnit != undefined) && (this.selectedBUnit != ''))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.populateEventIds()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "ddlBUnitChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.ddlEventChanged = function () {
        this.growlMessage = [];
        this.pop = false;
    };
    ProcessCountsComponent.prototype.gridBound = function () {
        try {
            for (var item in this.eventDetails) {
                if (this.eventDetails[item].CONSIGNED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                    this.eventDetails[item].rowClsStyle = 'ui-datatable-green';
                }
                else {
                    if (this.eventDetails[item].L_S_CONTROLLED == 'L' || this.eventDetails[item].L_S_CONTROLLED == 'S' ||
                        this.eventDetails[item].L_S_CONTROLLED == 'B') {
                        this.eventDetails[item].rowClsStyle = 'ui-datatable-brown';
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "gridBound");
        }
    };
    ProcessCountsComponent.prototype.bindModelDataChange = function (ven) {
        this.growlMessage = [];
        try {
            if (ven.SERIAL_CONTROLLED == 'Y') {
                if (ven.activeCount > 1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Qty cannot be greater than 1 for serial item" });
                    ven.activeCount = '';
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    };
    ProcessCountsComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.pop = false;
                        this.growlMessage = [];
                        if (this.selectedOrgGrpID == "Select One" || this.selectedOrgGrpID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBUnit == "Select BUnit" || this.selectedBUnit == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindGrid()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "go");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_2.EnumApps.CycleCount, 'EDIT_COUNTS')
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.m_strEditCounts = res.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "getProfileParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.orgGroupParamValue = function (orgGrpParamName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cycleCntAppId, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cycleCntAppId = AtParEnums_2.EnumApps.CycleCount;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getOrgGroupParamValue(orgGrpParamName, cycleCntAppId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    response = res.json();
                                    if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_COUNTS].toString()) {
                                        this.reviewCounts = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString()) {
                                        this.performManualCounts = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString()) {
                                        this.reviewManualCounts = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else if (orgGrpParamName == "STORE_DETAILED_COUNT_HISTORY") {
                                        this.orderHistory = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else if (orgGrpParamName.toString() == "UPDATE_COUNTDATE_WEB") {
                                        this.strUpdateCntDtWeb = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                                    }
                                    else {
                                        return [2 /*return*/];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "orgGroupParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ddlBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a, i;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
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
                                            this.lstOrgGroups = data.DataList;
                                            this.spinnerService.stop();
                                            if (!(this.lstOrgGroups.length == 1)) return [3 /*break*/, 3];
                                            this.blnShowOrgGroupLabel = true;
                                            this.lblOrgGrpID = this.lstOrgGroups[0].ORG_GROUP_ID + " - " + this.lstOrgGroups[0].ORG_GROUP_NAME;
                                            this.selectedOrgGrpID = this.lstOrgGroups[0].ORG_GROUP_ID;
                                            return [4 /*yield*/, this.populateBUnits()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 8];
                                        case 3:
                                            if (this.lstOrgGroups.length > 1) {
                                                this.blnShowOrgGroupID = true;
                                                this.ddlOrgGroups = [];
                                                this.ddlOrgGroups.push({ label: "Select One", value: "Select One" });
                                                for (i = 0; i < this.lstOrgGroups.length; i++) {
                                                    if (this.lstOrgGroups[i].ORG_GROUP_ID !== "All") {
                                                        this.ddlOrgGroups.push({ label: this.lstOrgGroups[i].ORG_GROUP_ID + " - " + this.lstOrgGroups[i].ORG_GROUP_NAME, value: this.lstOrgGroups[i].ORG_GROUP_ID });
                                                    }
                                                }
                                                this.selectedOrgGrpID = this.ddlOrgGroups[0].value;
                                            }
                                            _b.label = 4;
                                        case 4: return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.populateBUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isOrgBUnitsExist = false;
                        this.spinnerService.start();
                        if ((this.selectedOrgGrpID == "Select One") && this.blnShowOrgGroupID) {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.ddlBunit = [];
                        this.ddlBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.selectedOrgGrpID, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.lstBUnits = data.DataList;
                                        for (var item in _this.lstBUnits) {
                                            _this.ddlBunit.push({ label: _this.lstBUnits[item], value: _this.lstBUnits[item] });
                                        }
                                        _this.selectedBUnit = _this.ddlBunit[0].value;
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        _this.ddlEvent = [];
                                        _this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "populateBUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.usersList = [];
                        this.ddlStatus = [];
                        this.ddlStatus.push({ label: "Downloaded", value: "1" });
                        this.ddlStatus.push({ label: "Counting", value: "4" });
                        this.ddlStatus.push({ label: "Completed", value: "7" });
                        this.ddlStatus.push({ label: "Cancelled", value: "13" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 2:
                        _a.sent();
                        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        if (!(this.selectedBUnit != "Select BUnit" && this.selectedEventID != "Select EventId")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getCount()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getEventDetails()];
                    case 4:
                        _a.sent();
                        if (this.lstEventDetails["EVENT_DETAILS"].length == 0) {
                            this.pop = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                            return [2 /*return*/];
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "bindGrid");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.userCount = function (col, col1) {
        try {
            var val = "";
            var userIndex = this.usersList.findIndex(function (a) { return a.header == col1.header; });
            var ColName = void 0;
            ColName = "COUNT" + userIndex;
            val = col[ColName];
            return val;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "userCount");
        }
    };
    ProcessCountsComponent.prototype.getCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.processSevice.CheckIfEventIsParentEvent(this.selectedBUnit, this.selectedEventID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.isParentEvent = data.DataVariable.toString();
                                        if (_this.isParentEvent == "true") {
                                            _this.activateSend = true;
                                        }
                                        else {
                                            _this.activateSend = false;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.pop = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.pop = false;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "getCount");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.getEventDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.processSevice.getEventDetails(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.lstEventDetails = [];
                                        _this.eventDetails = [];
                                        _this.usersList = [];
                                        var lstData = data.DataDictionary["EVENT_SPLIT_DETAILS"];
                                        if (lstData[0].ISSPLITTED.toString() > 0) {
                                            _this.blnEventIsSplit = true;
                                        }
                                        else {
                                            _this.blnEventIsSplit = false;
                                        }
                                        _this.lstEventDetails = data.DataDictionary;
                                        if (data.DataDictionary["EVENT_DETAILS"].length > 0) {
                                            _this.eventDetails = data.DataDictionary["EVENT_DETAILS"];
                                            if (_this.lstEventDetails["EVENT_TRANSACTIONS"].length > 0) {
                                                for (var cnt in _this.lstEventDetails["EVENT_TRANSACTIONS"]) {
                                                    if (_this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE != null && _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE != '') {
                                                        var dateStr = new Date(_this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                                    }
                                                    _this.usersList.push({
                                                        header: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].EVENTUSERS,
                                                        completedDate: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE != null ? dateStr.replace(',', '') : "",
                                                        userstatus: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].EVENT_STATUS,
                                                        previousStatus: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].EVENT_STATUS,
                                                        USER_ID: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].USER_ID,
                                                        TRANSACTION_ID: _this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].TRANSACTION_ID,
                                                    });
                                                }
                                            }
                                            var iscalled = false;
                                            var LtCnt = 0;
                                            var checkedUser = "";
                                            for (var intCnt = 0; intCnt <= _this.eventDetails.length - 1; intCnt++) {
                                                iscalled = false;
                                                LtCnt = 0;
                                                checkedUser = "";
                                                _this.eventDetails[intCnt].DESCRIPTION = (_this.eventDetails[intCnt].DESCRIPTION != null) ? _this.eventDetails[intCnt].DESCRIPTION : '';
                                                _this.eventDetails[intCnt].INV_ITEM_ID1 = _this.eventDetails[intCnt].INV_ITEM_ID + " " + _this.eventDetails[intCnt].DESCRIPTION;
                                                _this.eventDetails[intCnt]["checkedUser"] = "";
                                                _this.eventDetails[intCnt]["previousCount"] = "";
                                                _this.eventDetails[intCnt]["rowUpdated"] = "N";
                                                _this.eventDetails[intCnt]["CountDate"] = "";
                                                _this.eventDetails[intCnt]["TransID"] = "";
                                                _this.eventDetails[intCnt]["FinalCount"] = '';
                                                _this.eventDetails[intCnt]["User_TransID"] = '';
                                                _this.eventDetails[intCnt].COUNT_DIFF = (_this.eventDetails[intCnt].COUNT_DIFF == '-9999') ? '' : _this.eventDetails[intCnt].COUNT_DIFF;
                                                _this.eventDetails[intCnt].COUNT_DIFFS = _this.eventDetails[intCnt].COUNT_DIFF;
                                                _this.eventDetails[intCnt].COUNT_DIFF_PER = (_this.eventDetails[intCnt].COUNT_DIFF_PER == '-9999') ? '' : _this.eventDetails[intCnt].COUNT_DIFF_PER;
                                                _this.eventDetails[intCnt].COUNT_DIFF_PERS = _this.eventDetails[intCnt].COUNT_DIFF_PER;
                                                _this.eventDetails[intCnt].VALUE_DIFF = (_this.eventDetails[intCnt].VALUE_DIFF == '-9999') ? '' : _this.eventDetails[intCnt].VALUE_DIFF;
                                                _this.eventDetails[intCnt].VALUE_DIFFS = _this.eventDetails[intCnt].VALUE_DIFF;
                                                _this.eventDetails[intCnt].EXT_VALUE = (_this.eventDetails[intCnt].EXT_VALUE == '-9999') ? '' : _this.eventDetails[intCnt].EXT_VALUE;
                                                _this.eventDetails[intCnt].EXT_VALUES = _this.eventDetails[intCnt].EXT_VALUE;
                                                for (var Cnt = 0; Cnt <= _this.usersList.length - 1; Cnt++) {
                                                    var ColName = "COUNT_" + Cnt;
                                                    var ColName1 = "activeFlag_" + Cnt;
                                                    var _strCount = void 0;
                                                    var arrCount = _this.eventDetails[intCnt]["COUNT" + Cnt].toString().split(",");
                                                    _this.eventDetails[intCnt][ColName] = arrCount[0];
                                                    _strCount = arrCount[0];
                                                    if (arrCount[5] == 'Y') {
                                                        iscalled = false;
                                                    }
                                                    if (_strCount == "N") {
                                                        iscalled = true;
                                                        if ((_this.eventDetails[intCnt].EVENT_TYPE != null || _this.eventDetails[intCnt].EVENT_TYPE != '')
                                                            && parseInt(_this.eventDetails[intCnt].EVENT_TYPE) == AtParEnums_2.EventType.Manual
                                                            && (_this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() != _this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpperCase())) {
                                                            _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].STD_PACK_UOM;
                                                        }
                                                        else if (_this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() == _this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpperCase())
                                                            _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].UNIT_OF_MEASURE;
                                                        else
                                                            _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].UNIT_OF_MEASURE + " " + _this.eventDetails[intCnt].STD_PACK_UOM;
                                                    }
                                                    else {
                                                        if (!iscalled) {
                                                            if ((_this.eventDetails[intCnt].EVENT_TYPE != null || _this.eventDetails[intCnt].EVENT_TYPE != '')
                                                                && parseInt(_this.eventDetails[intCnt].EVENT_TYPE) == AtParEnums_2.EventType.Manual
                                                                && (_this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() != _this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpperCase())) {
                                                                if ((_strCount != null && _strCount != '') && _this.eventDetails[intCnt].CONVERSION_RATE != '' && _this.eventDetails[intCnt].CONVERSION_RATE != undefined) {
                                                                    _strCount = (parseFloat(_strCount) * parseFloat(_this.eventDetails[intCnt].CONVERSION_RATE)).toString();
                                                                    _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].STD_PACK_UOM;
                                                                }
                                                            }
                                                            else if (_this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() == _this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpper)
                                                                _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].UNIT_OF_MEASURE;
                                                            else
                                                                _this.eventDetails[intCnt].SYS_QTY1 = _this.eventDetails[intCnt].SYS_QTY + " " + _this.eventDetails[intCnt].UNIT_OF_MEASURE;
                                                        }
                                                        if (arrCount[5] == 'Y') {
                                                            LtCnt = arrCount[0];
                                                        }
                                                        if (arrCount[5] == "Y") {
                                                            _this.eventDetails[intCnt]["FinalCount"] = arrCount[0];
                                                            _this.eventDetails[intCnt][ColName1] = true;
                                                            _this.eventDetails[intCnt]["showSelectedCount"] = true;
                                                            _this.eventDetails[intCnt]["activeFlag"] = "true";
                                                            _this.eventDetails[intCnt]["User_TransID"] = arrCount[3];
                                                            if (_strCount == null || _strCount == '' || _strCount == undefined) {
                                                                _strCount = "0";
                                                            }
                                                            if ((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) < 0) {
                                                                _this.eventDetails[intCnt].COUNT_DIFFS = Math.abs(parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2);
                                                                _this.eventDetails[intCnt].COUNT_DIFF = "(" + parseFloat(Math.abs(parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2)).toLocaleString('en') + ")";
                                                            }
                                                            else {
                                                                _this.eventDetails[intCnt].COUNT_DIFFS = parseFloat((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2));
                                                                _this.eventDetails[intCnt].COUNT_DIFF = parseFloat((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2)).toLocaleString('en');
                                                            }
                                                            _this.eventDetails[intCnt].COUNT_DIFF_PER = (((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) / parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) * 100);
                                                            _this.eventDetails[intCnt].COUNT_DIFF_PERS = (((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) / parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) * 100);
                                                            if (_this.eventDetails[intCnt].LATEST_SYSQTY == 0) {
                                                                _this.eventDetails[intCnt].COUNT_DIFF_PER = _this.addZeroes(_this.eventDetails[intCnt].LATEST_SYSQTY);
                                                                _this.eventDetails[intCnt].COUNT_DIFF_PERS = _this.addZeroes(_this.eventDetails[intCnt].LATEST_SYSQTY);
                                                            }
                                                            else {
                                                                if (parseFloat(_this.eventDetails[intCnt].COUNT_DIFF_PER) < 0) {
                                                                    _this.eventDetails[intCnt].COUNT_DIFF_PERS = (Math.abs(parseFloat(_this.eventDetails[intCnt].COUNT_DIFF_PER))).toFixed(2);
                                                                    _this.eventDetails[intCnt].COUNT_DIFF_PER = "(" + (Math.abs(parseFloat(_this.eventDetails[intCnt].COUNT_DIFF_PER))).toFixed(2) + ")";
                                                                }
                                                                else {
                                                                    _this.eventDetails[intCnt].COUNT_DIFF_PER = _this.addZeroes(_this.eventDetails[intCnt].COUNT_DIFF_PER);
                                                                    _this.eventDetails[intCnt].COUNT_DIFF_PERS = _this.addZeroes(_this.eventDetails[intCnt].COUNT_DIFF_PER); //sorting purpose
                                                                }
                                                            }
                                                            if ((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) < 0) {
                                                                _this.eventDetails[intCnt].VALUE_DIFFS = parseFloat((parseFloat((Math.abs(parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY))).toString()) * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2));
                                                                _this.eventDetails[intCnt].VALUE_DIFF = "(" + parseFloat((parseFloat((Math.abs(parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY))).toString()) * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2)).toLocaleString('en') + ")";
                                                                if (_this.eventDetails[intCnt].VALUE_DIFFS == 0) {
                                                                    _this.eventDetails[intCnt].VALUE_DIFF = "(" + parseFloat("0.0").toFixed(2) + ")";
                                                                    _this.eventDetails[intCnt].VALUE_DIFFS = parseFloat("0.0").toFixed(2);
                                                                }
                                                            }
                                                            else {
                                                                _this.eventDetails[intCnt].VALUE_DIFF = parseFloat(((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2)).toLocaleString('en');
                                                                _this.eventDetails[intCnt].VALUE_DIFFS = parseFloat(((parseFloat(_strCount) - parseFloat(_this.eventDetails[intCnt].LATEST_SYSQTY)) * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2));
                                                            }
                                                            _this.eventDetails[intCnt].EXT_VALUES = parseFloat((_strCount * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2));
                                                            _this.eventDetails[intCnt].EXT_VALUE = parseFloat((_strCount * (_this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2)).toLocaleString('en');
                                                            _this.eventDetails[intCnt]["rowUpdated"] = "Y";
                                                            _this.eventDetails[intCnt]["CountDate"] = arrCount[4];
                                                        }
                                                        else {
                                                            _this.eventDetails[intCnt][ColName1] = false;
                                                            // this.eventDetails[intCnt]["activeFlag"] = "false";                                                
                                                        }
                                                        _this.eventDetails[intCnt]["previousCount"] = arrCount[0];
                                                        _this.eventDetails[intCnt]["checkedUser"] = arrCount[2];
                                                        _this.eventDetails[intCnt]["TransID"] = arrCount[3];
                                                        _this.eventDetails[intCnt].ITEM_REC_NUM = (_this.eventDetails[intCnt].ITEM_REC_NUM == '' || _this.eventDetails[intCnt].ITEM_REC_NUM == undefined) ? arrCount[1] : _this.eventDetails[intCnt].ITEM_REC_NUM;
                                                    }
                                                    _this.eventDetails[intCnt]["rowIndex"] = intCnt;
                                                    _this.eventDetails[intCnt]["activeCount"] = LtCnt;
                                                }
                                            }
                                            _this.gridBound();
                                            _this.pop = true;
                                        }
                                        else {
                                            _this.pop = false;
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.pop = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.pop = false;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.pop = false;
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "getEventDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.populateEventIds = function () {
        var _this = this;
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            this.atParCommonService.getEventIds(this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then(function (res) {
                var data = res.json();
                _this.growlMessage = [];
                switch (data.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        _this.ddlEvent = [];
                        _this.spinnerService.stop();
                        _this.lstEventId = data.DataList;
                        _this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        if (data.DataList.length > 0) {
                            if (_this.performManualCounts != "" && _this.performManualCounts != undefined) {
                                if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y] && _this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y] && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y]) {
                                    for (var item in _this.lstEventId) {
                                        _this.ddlEvent.push({ label: _this.lstEventId[item].EVENT_ID, value: _this.lstEventId[item].EVENT_ID });
                                    }
                                }
                                else {
                                    var drEvents = new Array();
                                    if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() &&
                                        (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString())
                                        || (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString())) {
                                        drEvents = _this.lstEventId.filter(function (a) { return a.EVENT_TYPE == AtParEnums_2.EventType.Regular; });
                                    }
                                    else if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString() &&
                                        (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) {
                                        drEvents = _this.lstEventId.filter(function (a) { return a.EVENT_TYPE == AtParEnums_2.EventType.Manual; });
                                    }
                                    if (drEvents.length > 0) {
                                        for (var item in drEvents) {
                                            _this.ddlEvent.push({ label: drEvents[item].EVENT_ID, value: drEvents[item].EVENT_ID });
                                        }
                                    }
                                    else {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                        return;
                                    }
                                }
                            }
                            else {
                                for (var item in _this.lstEventId) {
                                    _this.ddlEvent.push({ label: _this.lstEventId[item].EVENT_ID, value: _this.lstEventId[item].EVENT_ID });
                                }
                            }
                        }
                        _this.selectedEventID = _this.ddlEvent[0].value;
                        _this.spinnerService.stop();
                        break;
                    }
                    case AtParEnums_2.StatusType.Warn: {
                        _this.pop = false;
                        _this.spinnerService.stop();
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        _this.ddlEvent = [];
                        _this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        break;
                    }
                    case AtParEnums_2.StatusType.Error: {
                        _this.pop = false;
                        _this.spinnerService.stop();
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Custom: {
                        _this.pop = false;
                        _this.spinnerService.stop();
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateEventIds");
        }
    };
    ProcessCountsComponent.prototype.SaveData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var saveStatusCode, lstIssueOrqQty, cnt, strCount, strItemRecNum, strCountUser, strTransID, strCountDate, strPrevCount, strItemID, strCount1, strCount2, _dblConvertRate, strIssueQty, strOrderQty, audit, updateReviewerData, blnFlag, finalUserList, finalCount, usersListStatus, intCnt, strStatus, strTransStatus, strTransId, eventStatus, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.spinnerService.start();
                        this.lstUpdateReviewerData = [];
                        this.lstAuditData = [];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        saveStatusCode = 0;
                        if (this.selectedOrgGrpID == "Select One" || this.selectedOrgGrpID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBUnit == "Select BUnit" || this.selectedBUnit == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 19, , 20]);
                        return [4 /*yield*/, this.orgGroupParamValue("STORE_DETAILED_COUNT_HISTORY")];
                    case 2:
                        _a.sent();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.eventDetails.filter(function (a) { return a.rowUpdated == 'Y'; })];
                    case 3:
                        lstIssueOrqQty = _a.sent();
                        if (lstIssueOrqQty.length > 0) {
                            for (cnt = 0; cnt <= lstIssueOrqQty.length - 1; cnt++) {
                                if (lstIssueOrqQty[cnt].activeCount != '' && lstIssueOrqQty[cnt].activeCount != null) {
                                    strCount = lstIssueOrqQty[cnt].activeCount;
                                    strItemRecNum = lstIssueOrqQty[cnt].ITEM_REC_NUM;
                                    strCountUser = lstIssueOrqQty[cnt].checkedUser;
                                    strTransID = lstIssueOrqQty[cnt].User_TransID;
                                    strCountDate = lstIssueOrqQty[cnt].CountDate;
                                    strPrevCount = lstIssueOrqQty[cnt].previousCount;
                                    strItemID = lstIssueOrqQty[cnt].INV_ITEM_ID;
                                    strCount1 = lstIssueOrqQty[cnt].COUNT_QTY1;
                                    strCount2 = lstIssueOrqQty[cnt].COUNT_QTY2;
                                    if (strCount1 == null || strCount1 == '')
                                        strCount1 = 0;
                                    if (strCount2 == null || strCount2 == '')
                                        strCount2 = 0;
                                    if (strCount.toString() != strPrevCount.toString()) {
                                        audit = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                        audit.OLD_VALUE = strPrevCount;
                                        audit.NEW_VALUE = strCount;
                                        audit.KEY_2 = this.selectedBUnit;
                                        audit.KEY_3 = this.selectedEventID;
                                        audit.KEY_4 = strCount;
                                        audit.KEY_5 = '';
                                        audit.FIELD_NAME = "REVIEWER_COUNT";
                                        this.lstAuditData.push(audit);
                                        if (strCount1 == 0 && strCount2 == 0) {
                                            strIssueQty = strCount.ToString;
                                            strOrderQty = 0;
                                        }
                                        else if (strCount1 == 0) {
                                            _dblConvertRate = (strPrevCount.ToString - strCount1) / strCount2;
                                            strIssueQty = (strCount % _dblConvertRate);
                                            strOrderQty = (strCount / _dblConvertRate);
                                        }
                                        else if (strCount2 == 0) {
                                            strIssueQty = strCount;
                                            strOrderQty = 0;
                                        }
                                        else {
                                            _dblConvertRate = (strPrevCount - strCount1) / strCount2;
                                            strIssueQty = (strCount.ToString % _dblConvertRate);
                                            strOrderQty = (strCount.ToString / _dblConvertRate);
                                        }
                                    }
                                    else {
                                        strIssueQty = strCount1;
                                        strOrderQty = strCount2;
                                    }
                                    updateReviewerData = new VM_UPDATE_REVIEWER_DATA_1.VM_UPDATE_REVIEWER_DATA();
                                    updateReviewerData.REVIEWERCNT = strCount;
                                    updateReviewerData.ISSUECNT = strIssueQty;
                                    updateReviewerData.ORDERCNT = strOrderQty;
                                    if (strCount != strCountUser)
                                        updateReviewerData.UPDATEUSER = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                                    else
                                        updateReviewerData.UPDATEUSER = strCountUser;
                                    updateReviewerData.ITEMRECNUM = strItemRecNum;
                                    updateReviewerData.TRANSID = strTransID;
                                    updateReviewerData.UPDATEDT = strCountDate;
                                    updateReviewerData.UPDATECNTDTWEB = this.strUpdateCntDtWeb;
                                    updateReviewerData.INVITEMID = strItemID;
                                    this.lstUpdateReviewerData.push(updateReviewerData);
                                    strIssueQty = '';
                                    strOrderQty = '';
                                    strCount1 = '';
                                    strCount2 = '';
                                }
                            }
                        }
                        blnFlag = false;
                        if (!(this.lstUpdateReviewerData.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.processSevice.updateReviewer(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lstUpdateReviewerData, this.selectedEventID, this.selectedBUnit)
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    this.growlMessage = [];
                                    switch (data.StatType) {
                                        case AtParEnums_2.StatusType.Success: {
                                            this.spinnerService.stop();
                                            saveStatusCode = data.StatusCode;
                                            if (saveStatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                                return [2 /*return*/, saveStatusCode];
                                            }
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Warn: {
                                            this.pop = false;
                                            saveStatusCode = data.StatusCode;
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            this.ddlEvent = [];
                                            this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Error: {
                                            this.pop = false;
                                            saveStatusCode = data.StatusCode;
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Custom: {
                                            this.pop = false;
                                            saveStatusCode = data.StatusCode;
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.processSevice.updateHdrDetails(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBUnit, this.selectedEventID)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    return data.StatusCode;
                                }
                            })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.checkAuditAllowed()];
                    case 7:
                        saveStatusCode = _a.sent();
                        if (saveStatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, saveStatusCode];
                        }
                        if (!(this.auditSatus == 'Y')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.insertAuditData(this.lstAuditData)];
                    case 8:
                        saveStatusCode = (_a.sent());
                        _a.label = 9;
                    case 9:
                        this.spinnerService.start();
                        if (saveStatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.spinnerService.stop();
                            return [2 /*return*/, saveStatusCode];
                        }
                        return [4 /*yield*/, this.usersList.length];
                    case 10:
                        if (!((_a.sent()) > 0)) return [3 /*break*/, 15];
                        finalUserList = [];
                        finalCount = this.eventDetails.filter(function (x) { return x.activeCount != '' && x.activeCount != null; });
                        usersListStatus = this.usersList.filter(function (a) { return a.previousStatus != a.userstatus; });
                        if (!(usersListStatus.length > 0)) return [3 /*break*/, 15];
                        intCnt = 0;
                        _a.label = 11;
                    case 11:
                        if (!(intCnt <= usersListStatus.length - 1)) return [3 /*break*/, 15];
                        strStatus = '';
                        strTransStatus = '';
                        strTransId = '';
                        eventStatus = '';
                        //  let transID = this.eventDetails.filter(a => a.User_TransID == usersListStatus[intCnt].TRANSACTION_ID);
                        //if (transID.length > 0) {
                        //    strTransId = transID[0].User_TransID;
                        //}
                        //let transStatus = usersListStatus.filter(a => a.TRANSACTION_ID == strTransId);
                        //updated on 09-09-2017 Begining
                        eventStatus = usersListStatus[intCnt].previousStatus;
                        strStatus = usersListStatus[intCnt].userstatus;
                        strTransId = usersListStatus[intCnt].TRANSACTION_ID;
                        if (!(eventStatus != strStatus)) return [3 /*break*/, 14];
                        if (!(((strStatus.toString() == "7" || strStatus.toString() == "4") && (finalCount.length > 0)) || strStatus == "13")) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.updateStatusForTransaction(strStatus, strTransId)];
                    case 12:
                        saveStatusCode = _a.sent();
                        if (saveStatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.revertUserStatusToPreviosState();
                            return [2 /*return*/, saveStatusCode];
                        }
                        return [3 /*break*/, 14];
                    case 13:
                        blnFlag = true;
                        _a.label = 14;
                    case 14:
                        intCnt++;
                        return [3 /*break*/, 11];
                    case 15:
                        if (!blnFlag) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.getEventDetails()];
                    case 16:
                        _a.sent();
                        if (this.isSend) {
                            saveStatusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                        }
                        else {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No counts selected to update" });
                            saveStatusCode = 1111;
                        }
                        return [3 /*break*/, 18];
                    case 17:
                        if (saveStatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            saveStatusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                            if (!this.isSend) {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Saved Successfully" });
                                if (saveStatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    this.pop = false;
                                    this.ddlEvent = [];
                                    this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                    this.selectedEventID = "Select EventId";
                                    this.selectedBUnit = "Select BUnit";
                                }
                            }
                        }
                        else {
                            this.spinnerService.stop();
                            return [2 /*return*/, saveStatusCode];
                        }
                        _a.label = 18;
                    case 18:
                        this.spinnerService.stop();
                        return [2 /*return*/, saveStatusCode];
                    case 19:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "SaveData");
                        return [2 /*return*/, saveStatusCode];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.revertUserStatusToPreviosState = function () {
        for (var intCnt in this.usersList) {
            this.usersList[intCnt].userstatus = this.usersList[intCnt].previousStatus;
        }
    };
    ProcessCountsComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, webresp_1, exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statusCode = -1;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        webresp_1 = new AtParWebApiResponse_1.AtParWebApiResponse();
                        return [4 /*yield*/, this.atParCommonService.getAuditAllowed(AtParEnums_2.EnumApps.CycleCount, this.strMenuCode)
                                .catch(this.httpService.handleError).then(function (res) {
                                webresp_1 = res.json();
                                statusCode = webresp_1.StatusCode;
                                _this.spinnerService.stop();
                                if (statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.auditSatus = webresp_1.Data.toString();
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1, "checkAuditAllowed");
                        return [2 /*return*/, statusCode];
                    case 4: return [2 /*return*/, statusCode];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.insertAuditData = function (lstAuditData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.insertAuditData(lstAuditData, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.strMenuCode).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        statusCode = response.StatusCode;
                                        _this.spinnerService.stop();
                                        //this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully" });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        statusCode = response.StatusCode;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        statusCode = response.StatusCode;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        statusCode = response.StatusCode;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_2 = _a.sent();
                        statusCode = AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR;
                        this.clientErrorMsg(exMsg_2, "insertAuditData");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, statusCode];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.changeStatus = function (ven, val, finalCount, selectedUser, transID) {
        try {
            var y = 123;
            ven.activeCount = val;
            ven.rowUpdated = "Y";
            ven.FinalCount = finalCount;
            if (finalCount.split(',').length > 0) {
                ven.transID = finalCount.split(',')[3];
                ven.INV_ITEM_ID = finalCount.split(',')[7];
                ven.ITEM_REC_NUM = finalCount.split(',')[1];
            }
            //ven.activeFlag = "true";        
            //ven["activeFlag_"+index] = true;
            ven.showSelectedCount = true;
            this.populateSelectedCounts(val, ven, finalCount, selectedUser, transID);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    ProcessCountsComponent.prototype.addZeroes = function (num) {
        try {
            // Cast as number
            var result = void 0;
            var numb = Number(num);
            // If not a number, return 0
            if (isNaN(numb)) {
                return 0;
            }
            // If there is no decimal, or the decimal is less than 2 digits, toFixed           
            if (numb.toString().split(".").length < 2 || numb.toString().split(".")[1].length <= 2) {
                result = numb.toFixed(2);
            }
            // Return the number
            return result;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "addZeroes");
        }
    };
    ProcessCountsComponent.prototype.populateSelectedCounts = function (val, ven, finalCount, selectedUser, userTransID) {
        try {
            var txtCount;
            var lblCount;
            var rdCount;
            var intcnt;
            if (ven != null) {
                var strCount;
                var lblCountDiff;
                var lblCountDiffPer;
                var lblValDiff;
                var lblExtVal;
                var lblSysQty;
                var lblPrice;
                var intCountDiff;
                var lblFinalCount;
                var lblItemID;
                var lblDispCount;
                var lblLot;
                var lblCustItemNo;
                var lblSerial;
                lblCountDiff = ven.COUNT_DIFF;
                lblCountDiffPer = ven.COUNT_DIFF_PER;
                lblValDiff = ven.VALUE_DIFF;
                lblExtVal = ven.EXT_VALUE;
                //  ContentPlaceHolder1_dgdrEvents_lblSysqty_0
                lblSysQty = ven.LATEST_SYSQTY;
                lblPrice = ven.ITEM_PRICE;
                //Label with counts beside the radio button
                lblCount = finalCount;
                //Hidden label containing the final counts(data) which needs to be updated to the database
                //Textbox with the selected count when edit counts parameter is checked
                lblItemID = ven.INV_ITEM_ID;
                //Label with the selected count when edit counts parameter is unchecked
                lblLot = ven.INV_LOT_ID;
                lblCustItemNo = ven.CUST_ITEM_NO;
                lblSerial = ven.SERIAL_ID;
                txtCount = val;
                lblDispCount = val;
                /*If edit counts parameter checked then display textbox, if not display label in
                selected counts cloumn */
                var intCountDiffPer;
                var intValDiff;
                var intExtVal;
                ven.User_TransID = userTransID;
                if (val != '') {
                    //Format the count diff, count diff percentage, val diff, ext val values to precision 2
                    ven.checkedUser = selectedUser;
                    intCountDiff = val - lblSysQty;
                    if (intCountDiff < 0) {
                        ven.COUNT_DIFF = "(" + Math.abs(intCountDiff.toFixed(2)) + ")";
                    }
                    else {
                        ven.COUNT_DIFF = intCountDiff.toFixed(2);
                    }
                    if (lblSysQty == 0) {
                        ven.COUNT_DIFF_PER = 0.00;
                    }
                    else {
                        intCountDiffPer = intCountDiff / lblSysQty * 100;
                        if (intCountDiffPer < 0) {
                            ven.COUNT_DIFF_PER = "(" + Math.abs(intCountDiffPer.toFixed(2)) + ")";
                        }
                        else {
                            ven.COUNT_DIFF_PER = intCountDiffPer.toFixed(2);
                        }
                    }
                    intValDiff = intCountDiff * lblPrice;
                    if (intValDiff < 0) {
                        ven.VALUE_DIFF = "(" + Math.abs(intValDiff.toFixed(2)) + ")";
                    }
                    else {
                        ven.VALUE_DIFF = intValDiff.toFixed(2);
                    }
                    intExtVal = val * lblPrice;
                    if (intExtVal < 0) {
                        ven.EXT_VALUE = "(" + Math.abs(intExtVal.toFixed(2)) + ")";
                    }
                    else {
                        ven.EXT_VALUE = intExtVal.toFixed(2);
                    }
                }
                else {
                    ven.COUNT_DIFF = '';
                    ven.COUNT_DIFF_PER = '';
                    ven.VALUE_DIFF = '';
                    ven.EXT_VALUE = '';
                }
                lblFinalCount = lblCount.split(',')[0];
                var arrFinalCount;
                var strFinalCount;
                var i;
                if (lblFinalCount != '' && lblFinalCount != null) {
                    ven.FinalCount = lblFinalCount;
                }
                strFinalCount = lblFinalCount;
                arrFinalCount = strFinalCount.split(',');
                /* Updates the hidden label values with the counts changed while radio button changed
                and the prev value being updated */
                for (i = 0; i <= arrFinalCount.length - 3; i++) {
                    if (i == 0) {
                        /*when we change the radio button the value in textbox also changes hence
                        using the textbox value itself*/
                        lblFinalCount = txtCount;
                    }
                    else {
                        lblFinalCount = lblFinalCount + ',' + arrFinalCount[i];
                    }
                }
                /* Appending the label value with the prev count and item id these are required
                while updating the counts */
                lblFinalCount = lblFinalCount + ',' + arrFinalCount[0] + ',' + lblItemID;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateSelectedCounts");
        }
    };
    ProcessCountsComponent.prototype.sendEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, blnAllEventsDownloaded, blnAllEventsCounted, blnStatusUpdated, blnSend, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        statusCode = -1;
                        blnAllEventsDownloaded = false;
                        blnAllEventsCounted = false;
                        blnStatusUpdated = false;
                        blnSend = false;
                        this.isSend = true;
                        if (this.selectedOrgGrpID == "Select One" || this.selectedOrgGrpID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBUnit == "Select BUnit" || this.selectedBUnit == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 14, , 15]);
                        return [4 /*yield*/, this.SaveData()];
                    case 2:
                        statusCode = _a.sent();
                        this.isSend = false;
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            this.isSend = false;
                            this.spinnerService.stop();
                            if (statusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_RECOUNTS_EXIST) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This event has Items assigned for recount, please unassign before cancelling the event." });
                                return [2 /*return*/];
                            }
                            else if (statusCode == 1111) {
                                return [2 /*return*/];
                            }
                        }
                        this.spinnerService.start();
                        if (!this.blnEventIsSplit) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.processSevice.CheckIfAllEventsDownloaded(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        blnAllEventsDownloaded = response.DataVariable;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        if (!!blnAllEventsDownloaded) return [3 /*break*/, 5];
                        //this.pop = false;
                        this.isSend = false;
                        return [4 /*yield*/, this.getEventDetails()];
                    case 4:
                        _a.sent();
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Few of the sub events are not downloaded, please download and count them to send to ERP" });
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, this.processSevice.CheckIfAllEventsCounted(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                            .catch(this.httpService.handleError).then(function (res) {
                            var response = res.json();
                            switch (response.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    blnAllEventsCounted = response.DataVariable;
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                            }
                        })];
                    case 6:
                        _a.sent();
                        if (!!blnAllEventsCounted) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getEventDetails()];
                    case 7:
                        _a.sent();
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Few of the items are not counted, Please count them to send to ERP" });
                        this.isSend = false;
                        return [2 /*return*/];
                    case 8: return [4 /*yield*/, this.processSevice.CheckIfStatusUpdatedForCountedEvent(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                            .catch(this.httpService.handleError).then(function (res) {
                            var response = res.json();
                            switch (response.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    blnStatusUpdated = response.DataVariable;
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.isSend = false;
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    _this.spinnerService.stop();
                                    break;
                                }
                            }
                        })];
                    case 9:
                        _a.sent();
                        if (!blnStatusUpdated) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Counting or Completed status to Submit the counts" });
                            this.isSend = false;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.processSevice.CheckStatusOfEvents(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBUnit, this.selectedEventID)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        blnSend = response.DataVariable;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 10:
                        _a.sent();
                        if (!blnSend) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.processSevice.SendEvent(this.selectedBUnit, this.selectedEventID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.orderHistory)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                switch (response.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        blnSend = response.DataVariable;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Sent Successfully" });
                                        _this.spinnerService.stop();
                                        _this.pop = false;
                                        _this.ddlEvent = [];
                                        _this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                        _this.selectedEventID = "Select EventId";
                                        _this.selectedBUnit = "Select BUnit";
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.isSend = false;
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_EVENT_PROCESSED_INERP) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Event already processed in the ERP and cannot upload the counts" });
                                            return;
                                        }
                                        else if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_NO_ERP_USER_ID) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP User Id required to upload to server" });
                                            return;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            _this.spinnerService.stop();
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.isSend = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Events with status other than Completed cannot be sent" });
                        return [2 /*return*/];
                    case 13:
                        this.isSend = false;
                        this.spinnerService.stop();
                        return [3 /*break*/, 15];
                    case 14:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "sendEvent");
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.updateStatusForTransaction = function (strStatus, strTransId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var saveStatusCode, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saveStatusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.processSevice.updateStatusForTransaction(strStatus, strTransId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a, blnNoCntsExists;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
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
                                            saveStatusCode = data.StatusCode;
                                            blnNoCntsExists = '';
                                            blnNoCntsExists = data.DataVariable.toString();
                                            if (!(blnNoCntsExists == "true" && strStatus != '13')) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.getEventDetails()];
                                        case 2:
                                            _b.sent();
                                            this.spinnerService.stop();
                                            if (!this.isSend) {
                                                saveStatusCode = AtParStatusCodes_1.AtparStatusCodes.INV_E_ITEMDONOTEXIST;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Counts for the items.Please count them before changing the status for the event" });
                                            }
                                            this.revertUserStatusToPreviosState();
                                            return [2 /*return*/];
                                        case 3:
                                            saveStatusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                            if (!this.isSend) {
                                                // this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully" });
                                            }
                                            _b.label = 4;
                                        case 4: return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.pop = false;
                                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_RECOUNTS_EXIST) {
                                                    saveStatusCode = data.StatusCode;
                                                    this.spinnerService.stop();
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This event has Items assigned for recount,please unassign before cancelling the event." });
                                                    //this.ddlEvent = [];
                                                    //this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                                }
                                                else {
                                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                    saveStatusCode = data.StatusCode;
                                                }
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                saveStatusCode = data.StatusCode;
                                                this.pop = false;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                saveStatusCode = data.StatusCode;
                                                this.pop = false;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14, "updateStatusForTransaction");
                        return [2 /*return*/, saveStatusCode];
                    case 4: return [2 /*return*/, saveStatusCode];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.confirm = function () {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Do you want to Send Data to ERP? ',
                accept: function () {
                    _this.sendEvent();
                },
                reject: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.spinnerService.start();
                                return [4 /*yield*/, this.bindGrid()];
                            case 1:
                                _a.sent();
                                this.spinnerService.stop();
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirm");
        }
    };
    ProcessCountsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ProcessCountsComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, html, blob, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        statusCode = -1;
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        //if (html != '' && html != null) {
                        //    var ua = window.navigator.userAgent;
                        //    var msie = ua.indexOf("MSIE ");
                        //    // If Internet Explorer
                        //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                        //        statusCode = -1;
                        //        let folderName: string = '';
                        //        await this.atParCommonService.exportToExcel(html, "cyct-process-counts_", "cyct-process-counts_report")
                        //            .then((res: Response) => {
                        //                let data = res.json();
                        //                statusCode = data.StatusCode;
                        //                if (statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
                        //                    folderName = data.DataVariable.toString();
                        //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/cyct-process-counts_report.xls';
                        //                    var query = '?download';
                        //                    window.open(filename + query);
                        //                }
                        //                else {
                        //                    this.growlMessage = [];
                        //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                        //                }
                        //            });
                        //        await this.atParCommonService.deleteExcel(folderName, "cyct-process-counts_report")
                        //            .then((res: Response) => {
                        //            });
                        //    } else {
                        //        var a = document.createElement('a');
                        //        var data_type = 'data:application/vnd.ms-excel';
                        //        html = html.replace(/ /g, '%20');
                        //        a.href = data_type + ', ' + html;
                        //        a.download = 'cyct-process-counts_report.xls';
                        //        a.click();
                        //    }
                        //}
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "ProcessCountReport.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=600,width=600,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<style>@page{size:landscape;"}</style><html><head><title>' + 'CycleCount - Process Count' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                // mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                // mywindow.print();
                                // mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'onSendMailIconClick');
                }
                return [2 /*return*/];
            });
        });
    };
    ProcessCountsComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, statusCode_1, ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Email Address to Send' });
                            return [2 /*return*/];
                        }
                        val = this.validateEmail(this.toMailAddr);
                        if (!val) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Email Address to Send' });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        this.isMailDialog = false;
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.growlMessage = [];
                        statusCode_1 = -1;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Process Count', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
                                .then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                statusCode_1 = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, ipAddress, gstrProtocal, gstrServerName, gstrPortNo, statusCode, sbMailText, _strFrmDt, _strToDt, imgserverPath, drow, _strTransStatus, strStatus, dgItem, strFontColor, strConsignedflag, strLotOrSerial, intuser, StrCountQty, ex_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        ipAddress = '';
                        gstrProtocal = '';
                        gstrServerName = '';
                        gstrPortNo = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 7]);
                        statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.atParCommonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    switch (data.StatType) {
                                        case AtParEnums_2.StatusType.Success: {
                                            ipAddress = data.DataVariable.toString();
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_2.StatusType.Success) {
                                        htmlBuilder = '';
                                        return [2 /*return*/, htmlBuilder];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    this.growlMessage = [];
                                    data = res.json();
                                    switch (data.StatType) {
                                        case AtParEnums_2.StatusType.Success: {
                                            gstrProtocal = data.Data.PROTOCOL.toString();
                                            gstrServerName = data.Data.SERVER_NAME.toString();
                                            gstrPortNo = data.Data.PORT_NO.toString();
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_2.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_2.StatusType.Success) {
                                        htmlBuilder = '';
                                        return [2 /*return*/, htmlBuilder];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        imgserverPath = gstrProtocal + '://' + ipAddress + '/atpar/AtParWebApi/assets/images/';
                        htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='63' nowrap><img height='63' src=" + imgserverPath + "logo.jpg nowrap></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align=left><span class=c2>Process Counts for Business Unit <b>" + this.selectedBUnit + "</b> and EventID  <b>" + this.selectedEventID + "</b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == "Excel") {
                            htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align=left><span class=c2>Process Counts For Business Unit <b>" + this.selectedBUnit + "</b> and EventID  <b>" + this.selectedEventID + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        else if (reqType == "Mail") {
                            htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=12 align=left><span class=c2>Process Counts For Business Unit <b>" + this.selectedBUnit + "</b> and EventID  <b>" + this.selectedEventID + "</b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> ";
                        htmlBuilder += "<table align=left width=99% style=" + "BORDER-COLLAPSE:collapse" + " border=1>";
                        htmlBuilder += "<tr >";
                        htmlBuilder += "<td align=center><span class=c2><b>Item ID (Description)</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Custom Item NO</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Lot #</b></span></td>";
                        htmlBuilder += "<td align=center><span class=c2><b>Serial #</b></span></td>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Mfg ItemID </b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Storage Location</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Item Price($)</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Sys Qty - UOM</b></span></TD>";
                        for (drow in this.usersList) {
                            _strTransStatus = this.usersList[drow].userstatus.toString();
                            strStatus = '';
                            if (_strTransStatus == "1")
                                strStatus = "Downloaded";
                            else if (_strTransStatus == "7")
                                strStatus = "Completed";
                            else if (_strTransStatus == "4")
                                strStatus = "Counting";
                            else if (_strTransStatus == "13")
                                strStatus = "Cancelled";
                            else if (_strTransStatus == "11")
                                strStatus = "Sent";
                            htmlBuilder += "<td align=center nowrap><span class=c2><b>" + this.lstEventDetails["EVENT_TRANSACTIONS"][drow].EVENTUSERS + "<br /> Status <br />" + strStatus + "<br /> Count Qty</b></span></TD>";
                        }
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Selected Count</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Count Diff</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Count Diff (%)</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Value Diff($)</b></span></TD>";
                        htmlBuilder += "<TD align=center nowrap><span class=c2><b>Ext $ Value</b></span></TD>";
                        htmlBuilder += "</tr>";
                        if (this.eventDetails != null) {
                            for (dgItem in this.eventDetails) {
                                strFontColor = "None";
                                strConsignedflag = this.eventDetails[dgItem].CONSIGNED_FLAG;
                                strLotOrSerial = this.eventDetails[dgItem].L_S_CONTROLLED;
                                if (strConsignedflag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                    strFontColor = "DarkGreen";
                                }
                                else {
                                    if (strLotOrSerial == "L" ||
                                        strLotOrSerial == "S" ||
                                        strLotOrSerial == "B") {
                                        strFontColor = "Brown";
                                    }
                                }
                                htmlBuilder += "<tr >";
                                htmlBuilder += "<td align=left><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].INV_ITEM_ID + " " + this.eventDetails[dgItem].DESCRIPTION + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].CUST_ITEM_NO + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].INV_LOT_ID + "</span></td>";
                                htmlBuilder += "<td align=left ><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].SERIAL_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].MFG_ITEM_ID + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].STORAGE_LOCATION + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].ITEM_PRICE + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].LATEST_SYSQTY + " " + this.eventDetails[dgItem].UNIT_OF_MEASURE + "</span></td>";
                                for (intuser in this.usersList) {
                                    StrCountQty = '';
                                    if (this.eventDetails[dgItem].rowUpdated == 'Y') {
                                        if (this.eventDetails[dgItem]["activeFlag_" + intuser]) {
                                            StrCountQty = this.eventDetails[dgItem].activeCount;
                                        }
                                    }
                                    else {
                                        if (this.eventDetails[dgItem]["COUNT_" + intuser] != undefined && this.eventDetails[dgItem]["COUNT_" + intuser] != "N") {
                                            StrCountQty = this.eventDetails[dgItem]["COUNT_" + intuser];
                                        }
                                    }
                                    htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + StrCountQty + "</span></td>";
                                }
                                if (this.eventDetails[dgItem].showSelectedCount) {
                                    htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].activeCount + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + "&nbsp;" + "</span></td>";
                                }
                                htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].COUNT_DIFF + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].COUNT_DIFF_PER + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].VALUE_DIFF + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c3 style=color:" + strFontColor + ">" + this.eventDetails[dgItem].EXT_VALUE + "</span></td>";
                                htmlBuilder += "</tr>";
                            }
                        }
                        htmlBuilder += "</table></td></tr>";
                        htmlBuilder += "</Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18, 'exportReportDetails');
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProcessCountsComponent.prototype.customSort = function (event, elementname) {
        var element = event;
        //this.eventDetails = [];
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;
        }
        else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;
        try {
            var emptyValues = this.eventDetails.filter(function (a) { return a[elementname] === '' || a[elementname] === null; });
            if (emptyValues.length == this.eventDetails.length) {
                return;
            }
            this.eventDetails = this.eventDetails.sort(function (a, b) {
                if (a[elementname] != '' && b[elementname] != '' && a[elementname] != undefined && b[elementname] != undefined) {
                    if (parseFloat(a[elementname]) < parseFloat(b[elementname]))
                        return -1;
                    if (parseFloat(a[elementname]) > parseFloat(b[elementname]))
                        return 1;
                    return 0;
                }
                else {
                    if (a[elementname] < b[elementname])
                        return -1;
                    if (a[elementname] > b[elementname])
                        return 1;
                    return 0;
                }
                //if (parseFloat(a[elementname]) < parseFloat(b[elementname]))
                //        return -1;
                //    if (parseFloat(a[elementname]) > parseFloat(b[elementname]))
                //        return 1;
                //    return 0;
            });
            if (this.blnSortByColumn == false) {
                this.eventDetails = this.eventDetails.reverse();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    ProcessCountsComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ProcessCountsComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ProcessCountsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.usersList = [];
        this.lstOrgGroups = [];
        this.lstAuditData = [];
        this.lstBUnits = [];
        this.ddlOrgGroups = [];
        this.ddlBunit = [];
        this.ddlEvent = [];
        this.lstEventId = [];
        this.spinnerService.stop();
        this.lstEventDetails = [];
        this.eventDetails = [];
        this.lstColDetails = [];
        this.ddlStatus = [];
        this.lstUpdateReviewerData = [];
    };
    return ProcessCountsComponent;
}());
__decorate([
    core_1.ViewChild(datatable_1.DataTable),
    __metadata("design:type", datatable_1.DataTable)
], ProcessCountsComponent.prototype, "dataTableComponent", void 0);
ProcessCountsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1963),
        providers: [datatableservice_1.datatableservice, cyct_process_counts_service_1.ProcessCountsService, atpar_common_service_1.AtParCommonService, api_1.ConfirmationService]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice,
        event_spinner_service_1.SpinnerService,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        AtParConstants_1.AtParConstants,
        cyct_process_counts_service_1.ProcessCountsService,
        api_1.ConfirmationService])
], ProcessCountsComponent);
exports.ProcessCountsComponent = ProcessCountsComponent;


/***/ }),

/***/ 1448:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var atpar_common_service_1 = __webpack_require__(43);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var event_spinner_service_1 = __webpack_require__(24);
var AtParConstants_1 = __webpack_require__(31);
var AtParStatusCodes_1 = __webpack_require__(50);
var cyct_review_counts_service_1 = __webpack_require__(1717);
var file_saver_1 = __webpack_require__(228);
var ReviewCountsComponent = (function () {
    function ReviewCountsComponent(dataservice, atParCommonService, httpService, spinnerService, atParConstant, reviewCountsService) {
        this.dataservice = dataservice;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.reviewCountsService = reviewCountsService;
        this.blnSortByColumn = false;
        this.totalItems = "";
        this.lstEventId = [];
        this.loading = true;
        this.strUpdateCntDtWeb = "";
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.bunitsData = [];
        this.eventIdDataList = [];
        this.strEventAllocation = "";
        this.blnRecntUsers = true;
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupID = false;
        this.orgGrpID = "";
        this.orgGrpIDData = "";
        this.selectedOrgGroupId = "";
        this.selectedBunit = "";
        this.selectedUser = "";
        this.selectedEvent = "";
        this.selectedRecntUser = "";
        this.performManualCounts = "";
        this.reviewManualCounts = "";
        this.reviewCounts = "";
        this.flgBtnEnable = "";
        this.Users = [];
        this.lstEventDetails = [];
        this.recCount = "";
        this.ErrMsg = "";
        this.flgParentEvent = "";
        this.strMenuCode = "";
        this.blnsortbycolumn = true;
        this.custom = "custom";
        this.showgrid = false;
        this._strUserId = "";
        this._strDateTime = "";
        this._intRecCnt = "";
        this.isSend = false;
        this.lblEventAllocUsers = "";
        this.lblEventAllocUsersToolTip = "";
        this.rctFlag = false;
        this.showDropDowns = false;
        this.changedTextBoxVal = '';
        this.isMailDialog = false;
        this.preField = '';
    }
    ReviewCountsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blnresult, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        this.spinnerService.start();
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.strMenuCode = localStorage.getItem("menuCode");
                        this.pazeSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.UPDATE_COUNTDATE_WEB].toString())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_COUNTS].toString())];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString())];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString())];
                    case 5:
                        _a.sent();
                        this.spinnerService.stop();
                        if (!((this.reviewCounts == "N") &&
                            ((this.performManualCounts == "Y" && this.reviewManualCounts == "N") ||
                                (this.performManualCounts == "N")))) return [3 /*break*/, 6];
                        this.spinnerService.stop();
                        this.showDropDowns = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Review counts Parameter is Unchecked. Please check to review." });
                        return [2 /*return*/];
                    case 6:
                        this.showDropDowns = true;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ChkEventIds()];
                    case 7:
                        blnresult = _a.sent();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindUserOrgGroups(blnresult)];
                    case 8:
                        _a.sent();
                        this.spinnerService.stop();
                        return [4 /*yield*/, this.orgGroupParamValue(AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.EVENT_ALLOCATION].toString())];
                    case 9:
                        _a.sent();
                        this.selectedRecntUser = "Select User";
                        if (this.strEventAllocation == "N") {
                            this.lstRecntUsers = [];
                            this.blnRecntUsers = false;
                            this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                        }
                        else if (this.blnShowOrgGroupLabel) {
                            this.lstRecntUsers = [];
                            //this.blnRecntUsers = true;
                            this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                            //await this.populateReCntUsers();
                        }
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.ChkEventIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnisExists, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        blnisExists = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getEventIds("", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.trVisibleTrue();
                                        blnisExists = true;
                                        return blnisExists;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.trVisibleFalse();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No events available to review the counts" });
                                        }
                                        else {
                                            _this.showgrid = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No events available to review the counts" });
                                        }
                                        _this.spinnerService.stop();
                                        blnisExists = false;
                                        return blnisExists;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.showgrid = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        blnisExists = false;
                                        return blnisExists;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.showgrid = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        blnisExists = false;
                                        return blnisExists;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, blnisExists];
                    case 3:
                        ex_2 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_2, "ChkEventIds");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.trVisibleFalse = function () {
        this.showgrid = false;
        this.selectedEvent = "Select EventId";
        this.selectedBunit = "Select BUnit";
        this.selectedUser = "Select User";
        this.selectedRecntUser = "Select User";
        if (this.blnShowOrgGroupID) {
            this.selectedOrgGroupId = "Select One";
        }
        this.isSend = false;
    };
    ReviewCountsComponent.prototype.trVisibleTrue = function () {
    };
    ReviewCountsComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.CycleCount, 'EDIT_COUNTS')
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.hdnProfEditTxt = res.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getProfileParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.orgGroupParamValue = function (orgGrpParamName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cycleCntAppId, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cycleCntAppId = AtParEnums_1.EnumApps.CycleCount;
                        return [4 /*yield*/, this.atParCommonService.getOrgGroupParamValue(orgGrpParamName, cycleCntAppId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    response = res.json();
                                    response.DataVariable = (response.DataVariable != null) ? response.DataVariable : "";
                                    if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_COUNTS].toString()) {
                                        this.reviewCounts = response.DataVariable.toString();
                                    }
                                    else if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString()) {
                                        this.performManualCounts = response.DataVariable.toString();
                                    }
                                    else if (orgGrpParamName == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString()) {
                                        this.reviewManualCounts = response.DataVariable.toString();
                                    }
                                    else if (orgGrpParamName.toString() == "UPDATE_COUNTDATE_WEB") {
                                        this.strUpdateCntDtWeb = response.DataVariable.toString();
                                    }
                                    else if (orgGrpParamName.toString() == AtParEnums_1.AppParameters_Enum[AtParEnums_1.AppParameters_Enum.EVENT_ALLOCATION].toString()) {
                                        this.strEventAllocation = response.DataVariable.toString();
                                    }
                                    else {
                                        return [2 /*return*/];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "orgGroupParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.bindUserOrgGroups = function (blnresult) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpIDData = _this.orgGroupData[0].ORG_GROUP_ID + " - " + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpID = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.lstUsers = [];
                                            _this.lstEvents = [];
                                            _this.lstRecntUsers = [];
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
                                            _this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                            _this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                                            _this.populateData(blnresult);
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupID = true;
                                            _this.lstBunit = [];
                                            _this.lstUsers = [];
                                            _this.lstEvents = [];
                                            _this.lstRecntUsers = [];
                                            _this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                                            _this.lstUsers.push({ label: "Select User", value: "Select User" });
                                            _this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                            _this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + "-" + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        if (blnresult) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        if (blnresult) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        if (blnresult) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "bindUserOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.populateData = function (blnresult) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.populateBusinessUnits(blnresult)];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "populateData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.populateBusinessUnits = function (blnresult) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (blnresult != false) {
                            this.growlMessage = [];
                        }
                        this.spinnerService.start();
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        this.lstBunit = [];
                        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (blnresult != false) {
                                    _this.growlMessage = [];
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.bunitsData = data.DataList;
                                        for (var i = 0; i < _this.bunitsData.length; i++) {
                                            _this.lstBunit.push({
                                                label: _this.bunitsData[i],
                                                value: _this.bunitsData[i]
                                            });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.bindUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], 3, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.userDataList = data.DataList;
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
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, "bindUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.growlMessage = [];
                        this.showgrid = false;
                        this.lstBunit = [];
                        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                        if (!(this.selectedOrgGroupId == "Select One")) return [3 /*break*/, 1];
                        this.lstUsers = [];
                        this.lstUsers.push({ label: "Select User", value: "Select User" });
                        this.lstEvents = [];
                        this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                        this.lstRecntUsers = [];
                        this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                        return [2 /*return*/];
                    case 1:
                        this.spinnerService.start();
                        this.selectedBunit = "Select BUnit";
                        this.selectedUser = "Select User";
                        this.selectedEvent = "Select EventId";
                        return [4 /*yield*/, this.populateBusinessUnits(true)];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.ddlBUnitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.growlMessage = [];
                        this.lstEvents = [];
                        this.showgrid = false;
                        this.selectedUser = "Select User";
                        this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                        if (!((this.selectedBunit != "Select BUnit") && (this.selectedBunit != undefined) && (this.selectedBunit != ''))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.populateUsersList()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10, "ddlBUnitChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.ddlUsersChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.lstEvents = [];
                    this.showgrid = false;
                    this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                    if ((this.selectedUser != "Select User") && (this.selectedUser != undefined) && (this.selectedUser != '')) {
                        this.populateEventIds();
                        this.populateReCntUsers();
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "ddlUsersChanged");
                }
                return [2 /*return*/];
            });
        });
    };
    ReviewCountsComponent.prototype.ddlEventIDChanged = function () {
        this.showgrid = false;
    };
    ReviewCountsComponent.prototype.populateUsersList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else if (this.blnShowOrgGroupID) {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.getUsersList(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.EnumApps.CycleCount, this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstUsers = [];
                                        _this.lstUsers.push({ label: "Select User", value: "Select User" });
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstUsers.push({ label: data.DataList[i].FULLNAME, value: data.DataList[i].USER_ID });
                                        }
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
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11, "populateUsersList");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.populateReCntUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstRecntUsers = [];
                        this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                        return [4 /*yield*/, this.reviewCountsService.getReCountUsersList(AtParEnums_1.EnumApps.CycleCount, this.orgGroupIDForDBUpdate)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.recntUserDataList = data.DataList;
                                        if (_this.recntUserDataList.length > 0) {
                                            for (var i = 0; i < data.DataList.length; i++) {
                                                _this.lstRecntUsers.push({
                                                    label: data.DataList[i].FULLNAME,
                                                    value: data.DataList[i].USER_ID
                                                });
                                            }
                                            _this.lstRecntUsers = _this.lstRecntUsers.filter(function (a) { return a.value != _this.selectedUser; });
                                            _this.selectedRecntUser = _this.lstRecntUsers[0].value;
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
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12, "populateReCntUsers");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.populateEventIds = function () {
        var _this = this;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.lstEvents = [];
            this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
            this.spinnerService.start();
            this.reviewCountsService.getReviewCountsEventIds(this.selectedBunit, this.selectedUser)
                .subscribe(function (res) {
                var data = res.json();
                _this.growlMessage = [];
                switch (data.StatType) {
                    case AtParEnums_1.StatusType.Success: {
                        _this.lstEventId = data.DataList;
                        if (_this.lstEventId.length > 0) {
                            if (_this.performManualCounts != "" && _this.performManualCounts != undefined) {
                                if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y] && _this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y] && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y]) {
                                    for (var item in _this.lstEventId) {
                                        _this.lstEvents.push({ label: _this.lstEventId[item].EVENT_ID, value: _this.lstEventId[item].EVENT_ID });
                                    }
                                }
                                else {
                                    var drEvents = new Array();
                                    if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() &&
                                        (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString())
                                        || (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString())) {
                                        drEvents = _this.lstEventId.filter(function (a) { return a.EVENT_TYPE == AtParEnums_1.EventType.Regular; });
                                    }
                                    else if (_this.reviewCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString() &&
                                        (_this.performManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() && _this.reviewManualCounts == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString())) {
                                        drEvents = _this.lstEventId.filter(function (a) { return a.EVENT_TYPE == AtParEnums_1.EventType.Manual; });
                                    }
                                    if (drEvents.length > 0) {
                                        for (var item in drEvents) {
                                            _this.lstEvents.push({ label: drEvents[item].EVENT_ID, value: drEvents[item].EVENT_ID });
                                        }
                                    }
                                    else {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No events available to review the counts" });
                                    }
                                }
                            }
                            else {
                                for (var item in _this.lstEventId) {
                                    _this.lstEvents.push({ label: _this.lstEventId[item].EVENT_ID, value: _this.lstEventId[item].EVENT_ID });
                                }
                            }
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
            });
            this.selectedEvent = "Select EventId";
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateEventIds");
        }
    };
    ReviewCountsComponent.prototype.btnSend_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, i, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        statusCode = -1;
                        this.isSend = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        for (i = 0; i < this.lstEventDetails.length; i++) {
                            if (this.lstEventDetails[i].COUNT_QTY == undefined || this.lstEventDetails[i].COUNT_QTY == null) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Few of the items are not counted, please count them to send to ERP "
                                });
                                this.isSend = false;
                                return [2 /*return*/];
                            }
                            if (this.lstEventDetails[i].COUNT_QTY.toString() == '') {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Few of the items are not counted, please count them to send to ERP "
                                });
                                this.isSend = false;
                                return [2 /*return*/];
                            }
                        }
                        if (!((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User"))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.UpdateReviewCountEvent(this.selectedRecntUser)];
                    case 2:
                        statusCode = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.UpdateReviewCountEvent("")];
                    case 4:
                        statusCode = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.isSend = false;
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        this.reviewCountsService.SendRevCntEvntsToERP(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedUser, this.selectedBunit, this.selectedEvent, this.lstEventDetails, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                            .catch(this.httpService.handleError).then(function (res) {
                            var data = res.json();
                            _this.growlMessage = [];
                            switch (data.StatType) {
                                case AtParEnums_1.StatusType.Success: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage.push({
                                        severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Review Counts Sent Successfully "
                                    });
                                    _this.showgrid = false;
                                    _this.lstEvents = [];
                                    _this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                    _this.selectedEvent = "Select EventId";
                                    _this.selectedBunit = "Select BUnit";
                                    _this.selectedUser = "Select User";
                                    _this.selectedRecntUser = "Select User";
                                    if (_this.blnShowOrgGroupID) {
                                        _this.selectedOrgGroupId = "Select One";
                                    }
                                    _this.isSend = false;
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_1.StatusType.Warn: {
                                    _this.isSend = false;
                                    if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_EVENT_PROCESSED_INERP) {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Event already processed in the ERP and cannot upload the counts " });
                                    }
                                    else if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_NO_ERP_USER_ID) {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "ERP User Id required to upload to server " });
                                    }
                                    else if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                        if (data.DataVariable.toString() != '' && data.DataVariable.toString() != null) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.DataVariable.toString() });
                                        }
                                    }
                                    _this.spinnerService.stop();
                                    break;
                                }
                                case AtParEnums_1.StatusType.Error: {
                                    _this.isSend = false;
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
                        });
                        this.isSend = false;
                        return [3 /*break*/, 7];
                    case 6:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13, "btnSend_Click");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.btnSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, blnIsParentEvent, index, _dblConvertRate, dateStr, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        statusCode = -1;
                        blnIsParentEvent = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        this.spinnerService.start();
                        if (!((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User"))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.CheckIfSplitEvntIsPartEvnt()];
                    case 2:
                        blnIsParentEvent = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (blnIsParentEvent) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select the split event to assign/unassign recount to another user." });
                            return [2 /*return*/];
                        }
                        for (index in this.lstEventDetails) {
                            if (this.hdnProfEditTxt == 'Y') {
                                if (this.lstEventDetails[index].ACTUAL_COUNT_QTY != this.lstEventDetails[index].COUNT_QTY) {
                                    _dblConvertRate = void 0;
                                    this.lstEventDetails[index].COUNT_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                                    if (this.strUpdateCntDtWeb == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                        dateStr = new Date().toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                        this.lstEventDetails[index].UPDATE_DATE = dateStr.replace(',', '').toString();
                                    }
                                    if (this.lstEventDetails[index].COUNT_QTY1 == 0 && this.lstEventDetails[index].COUNT_QTY2 == 0) {
                                        this.lstEventDetails[index].COUNT_QTY1 = this.lstEventDetails[index].COUNT_QTY;
                                        this.lstEventDetails[index].COUNT_QTY2 = 0;
                                    }
                                    else if (this.lstEventDetails[index].COUNT_QTY1 == 0) {
                                        _dblConvertRate = (this.lstEventDetails[index].COUNT_QTY - this.lstEventDetails[index].COUNT_QTY1) / this.lstEventDetails[index].COUNT_QTY2;
                                        this.lstEventDetails[index].COUNT_QTY1 = (this.lstEventDetails[index].COUNT_QTY % _dblConvertRate);
                                        this.lstEventDetails[index].COUNT_QTY2 = (this.lstEventDetails[index].COUNT_QTY / _dblConvertRate);
                                    }
                                    else if (this.lstEventDetails[index].COUNT_QTY2 == 0) {
                                        this.lstEventDetails[index].COUNT_QTY1 = this.lstEventDetails[index].COUNT_QTY;
                                        this.lstEventDetails[index].COUNT_QTY2 = 0;
                                    }
                                    else {
                                        _dblConvertRate = (this.lstEventDetails[index].COUNT_QTY - this.lstEventDetails[index].COUNT_QTY1) / this.lstEventDetails[index].COUNT_QTY2;
                                        this.lstEventDetails[index].COUNT_QTY1 = (this.lstEventDetails[index].COUNT_QTY % _dblConvertRate);
                                        this.lstEventDetails[index].COUNT_QTY2 = (this.lstEventDetails[index].COUNT_QTY / _dblConvertRate);
                                    }
                                }
                            }
                            if (this.lstEventDetails[index].checkEnable) {
                                if (this.lstEventDetails[index].RECOUNTCHECK_FLAG == true) {
                                    if ((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User" && this.selectedRecntUser != null)) {
                                        this.lstEventDetails[index].RECOUNT_FLAG = 'Y';
                                        this.lstEventDetails[index].RECOUNT_USER_ID = this.selectedRecntUser;
                                    }
                                    else {
                                        if (this.lstEventDetails[index].RECOUNT_USER_ID == '' || this.lstEventDetails[index].RECOUNT_USER_ID == null) {
                                            this.lstEventDetails[index].RECOUNT_FLAG = 'Y';
                                            this.lstEventDetails[index].RECOUNT_USER_ID = this.selectedUser;
                                        }
                                    }
                                }
                                else if (this.lstEventDetails[index].RECOUNTCHECK_FLAG == false) {
                                    this.lstEventDetails[index].RECOUNT_FLAG = 'N';
                                    this.lstEventDetails[index].RECOUNT_USER_ID = '';
                                }
                                if (this.lstEventDetails[index].ACTUAL_RECOUNT_FLAG != this.lstEventDetails[index].RECOUNT_FLAG) {
                                    this.lstEventDetails[index].COUNT_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                                }
                            }
                            if (this.lstEventDetails[index].COUNT_QTY != null && this.lstEventDetails[index].COUNT_QTY != undefined) {
                                this.lstEventDetails[index].REALVALUEDIFF = (this.lstEventDetails[index].COUNT_QTY.toString() != '') ? Math.abs(Math.round(this.lstEventDetails[index].COUNT_QTY - this.lstEventDetails[index].LATEST_SYSQTY) * this.lstEventDetails[index].ITEM_PRICE) : -1;
                            }
                            else {
                                this.lstEventDetails[index].REALVALUEDIFF = -1;
                            }
                        }
                        if (!((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User"))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.UpdateReviewCountEvent(this.selectedRecntUser)];
                    case 4:
                        statusCode = _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.UpdateReviewCountEvent("")];
                    case 6:
                        statusCode = _a.sent();
                        _a.label = 7;
                    case 7:
                        this.spinnerService.stop();
                        return [3 /*break*/, 9];
                    case 8:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14, "btnSubmit_Click");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.UpdateReviewCountEvent = function (selectedRecntUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var StatusCode, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        StatusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.reviewCountsService.UpdateReviewCountEvent(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedBunit, this.selectedEvent, this.lstEventDetails, this.selectedUser, selectedRecntUser)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        StatusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                        _this.ErrMsg = data.DataDictionary["pErrorMsg"];
                                        if (_this.ErrMsg != "" && _this.ErrMsg != null) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: _this.ErrMsg
                                            });
                                            _this.showgrid = false;
                                            _this.selectedEvent = "Select EventId";
                                            _this.selectedBunit = "Select BUnit";
                                            _this.selectedUser = "Select User";
                                            _this.selectedRecntUser = "Select User";
                                            if (_this.blnShowOrgGroupID) {
                                                _this.selectedOrgGroupId = "Select One";
                                            }
                                            return;
                                        }
                                        else {
                                            if (!_this.isSend) {
                                                _this.lstEventDetails = data.DataDictionary["pDsReviewCountDtls"]["Table1"];
                                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Review Counts Updated Successfully " });
                                                _this.showgrid = false;
                                                _this.selectedEvent = "Select EventId";
                                                _this.selectedBunit = "Select BUnit";
                                                _this.selectedUser = "Select User";
                                                _this.selectedRecntUser = "Select User";
                                                if (_this.blnShowOrgGroupID) {
                                                    _this.selectedOrgGroupId = "Select One";
                                                }
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        StatusCode = data.StatusCode;
                                        if (StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_CYCT_RECOUNT_USER) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Highlighted records are already assigned for recount to user:" + _this.selectedRecntUser + " Please uncheck and submit."
                                            });
                                            return;
                                        }
                                        else {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage
                                            });
                                        }
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        StatusCode = data.StatusCode;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        StatusCode = data.StatusCode;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, StatusCode];
                    case 3:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15, "UpdateReviewCountEvent");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.CheckIfSplitEvntIsPartEvnt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnIsParentEvent, ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blnIsParentEvent = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reviewCountsService.CheckIfSplitEvntIsPartEvnt(this.selectedBunit, this.selectedEvent)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        blnIsParentEvent = data.DataVariable;
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
                    case 2:
                        _a.sent();
                        return [2 /*return*/, blnIsParentEvent];
                    case 3:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16, "CheckIfSplitEvntIsPartEvnt");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.showgrid = false;
                        this.rctFlag = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpID;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        /////Bunit 
                        if (this.selectedBunit == null || this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        ///UserID
                        if (this.selectedUser == null || this.selectedUser == "" || this.selectedUser == "Select User" || this.selectedUser == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                            return [2 /*return*/];
                        }
                        /// event id 
                        if (this.selectedEvent == null || this.selectedEvent == "" || this.selectedEvent == "Select EventId" || this.selectedEvent == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.BindEventDetails()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17, "btnGo_Click");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.BindEventDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, ex_18, ex_19, ex_20, ex_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.reviewCountsService.CheckIfEventHasMultipleTransactions(this.selectedEvent, this.selectedBunit, this.selectedUser)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        statusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                        _this.flgBtnEnable = data.DataVariable.toString();
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
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18, "BindEventDetails");
                        return [3 /*break*/, 4];
                    case 4:
                        if (!(this.selectedRecntUser != null && this.selectedRecntUser != "" && this.selectedRecntUser != "Select User" && this.selectedRecntUser != undefined)) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.reviewCountsService.getReviewCountEventDetails(this.selectedBunit, this.selectedEvent, this.selectedUser, this.selectedRecntUser)
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.growlMessage = [];
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            statusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                            this.flgParentEvent = data.DataDictionary["pflgParentEvent"].toString();
                                            this.recCount = data.DataDictionary["precCount"].toString();
                                            this.lstEventDetails = data.DataDictionary["pDsDetails"]["DETAILS"];
                                            this.Users = data.DataDictionary["pDsDetails"]["Table2"];
                                            if (!(this.lstEventDetails.length > 0)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.gridBound()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            this.selectedBunit = "Select BUnit";
                                            this.lstUsers = [];
                                            this.lstEvents = [];
                                            this.lstRecntUsers = [];
                                            this.lstUsers.push({ label: "Select User", value: "Select User" });
                                            this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                            this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                                            this.selectedEvent = "Select EventId";
                                            this.selectedUser = "Select User";
                                            this.selectedRecntUser = "Select User";
                                            statusCode = AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND;
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                            this.showgrid = false;
                                            return [2 /*return*/];
                                        case 4:
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_19 = _a.sent();
                        this.clientErrorMsg(ex_19, "BindEventDetails");
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 12];
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.reviewCountsService.getReviewCountEventDetails(this.selectedBunit, this.selectedEvent, this.selectedUser, "0")
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.growlMessage = [];
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            statusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK;
                                            this.lstEventDetails = data.DataDictionary["pDsDetails"]["DETAILS"];
                                            this.Users = data.DataDictionary["pDsDetails"]["Table2"];
                                            this.flgParentEvent = data.DataDictionary["pflgParentEvent"].toString();
                                            this.recCount = data.DataDictionary["precCount"].toString();
                                            if (!(this.lstEventDetails.length > 0)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.gridBound()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            statusCode = AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND;
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                            this.showgrid = false;
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                        case 4:
                                            this.spinnerService.stop();
                                            return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                statusCode = data.StatusCode;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                statusCode = data.StatusCode;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                statusCode = data.StatusCode;
                                                this.spinnerService.stop();
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        ex_20 = _a.sent();
                        this.clientErrorMsg(ex_20, "BindEventDetails");
                        return [3 /*break*/, 12];
                    case 12:
                        if (!(statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 16];
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.reviewCountsService.getUser_Date(this.selectedBunit, this.selectedEvent, this.selectedUser)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this._strUserId = data.DataDictionary["updateUserId"].toString();
                                        _this._strDateTime = data.DataDictionary["updateDtTime"].toString();
                                        if (_this._strDateTime == null || _this._strDateTime == '') {
                                            _this._strDateTime = new Date().toDateString();
                                        }
                                        if (_this.Users.length > 0) {
                                            if (_this.Users[0].Users != null) {
                                                var _strArray = _this.Users[0].Users.toString().split(",");
                                                if (_strArray.length > 2) {
                                                    _this.lblEventAllocUsers = _strArray[0] + "," + _strArray[1] + "....";
                                                    _this.lblEventAllocUsersToolTip = _this.Users[0].Users;
                                                }
                                                else {
                                                    _this.lblEventAllocUsers = _this.Users[0].Users;
                                                    _this.lblEventAllocUsersToolTip = _this.Users[0].Users;
                                                }
                                            }
                                        }
                                        _this.showgrid = true;
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
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        ex_21 = _a.sent();
                        this.clientErrorMsg(ex_21, "BindEventDetails");
                        return [3 /*break*/, 16];
                    case 16:
                        if (statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            if (this.flgParentEvent == "visible") {
                                if (this.flgBtnEnable == "enable") {
                                    this.flgParentEvent = "visible";
                                }
                                else if (this.flgBtnEnable == "disable") {
                                    this.flgParentEvent = "hidden";
                                }
                            }
                            if (this.flgParentEvent == "hidden" || this.recCount == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                this.btnUpload = false;
                            }
                            else if (this.flgParentEvent == "visible" || this.recCount == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()]) {
                                this.btnUpload = true;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.switch_Click = function () {
        for (var index in this.lstEventDetails) {
            if (this.rctFlag) {
                if (this.lstEventDetails[index].checkEnable == false) {
                    //It doesn't check the checkbox because it's already in disable mode
                }
                else {
                    this.lstEventDetails[index].RECOUNTCHECK_FLAG = true;
                    //It Means we can change the checkbox value to true because not in disable mode
                }
            }
            else {
                if (this.lstEventDetails[index].checkEnable == false) {
                    //It doesn't uncheck the checkbox because already in disable mode
                }
                else {
                    this.lstEventDetails[index].RECOUNTCHECK_FLAG = false;
                    //It Means we can change the checkbox value to false because not in disable mode
                }
            }
        }
    };
    ReviewCountsComponent.prototype.switch_changed = function () {
        var gridLength = 0;
        var filterChecks = 0;
        gridLength = this.lstEventDetails.length;
        filterChecks = this.lstEventDetails.filter(function (a) { return a.RECOUNTCHECK_FLAG == true; }).length;
        if (gridLength == filterChecks) {
            this.rctFlag = true;
        }
        else {
            this.rctFlag = false;
        }
    };
    ReviewCountsComponent.prototype.focusEvent = function (event, ven) {
        if (event) {
            this.changedTextBoxVal = ven;
        }
        else {
            this.focusOutEvent(ven);
        }
    };
    ReviewCountsComponent.prototype.focusOutEvent = function (ven) {
        if (this.changedTextBoxVal != ven.COUNT_QTY) {
            var _dblConvertRate = void 0;
            ven.COUNT_USER_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
            if (ven.COUNT_QTY1 == 0 && ven.COUNT_QTY2 == 0) {
                ven.COUNT_QTY1 = ven.COUNT_QTY;
                ven.COUNT_QTY2 = 0;
            }
            else if (ven.COUNT_QTY1 == 0) {
                _dblConvertRate = (ven.COUNT_QTY - ven.COUNT_QTY1) / ven.COUNT_QTY2;
                ven.COUNT_QTY1 = (ven.COUNT_QTY % _dblConvertRate);
                ven.COUNT_QTY2 = (ven.COUNT_QTY / _dblConvertRate);
            }
            else if (ven.COUNT_QTY2 == 0) {
                ven.COUNT_QTY1 = ven.COUNT_QTY;
                ven.COUNT_QTY2 = 0;
            }
            else {
                _dblConvertRate = (ven.COUNT_QTY - ven.COUNT_QTY1) / ven.COUNT_QTY2;
                ven.COUNT_QTY1 = (ven.COUNT_QTY % _dblConvertRate);
                ven.COUNT_QTY2 = (ven.COUNT_QTY / _dblConvertRate);
            }
        }
    };
    //customSort(event) {
    //    try {
    //        this.blnSortByColumn = !this.blnSortByColumn;
    //        this.lstEventDetails = this.lstEventDetails.sort(function (a, b) {
    //            if (a["Valdiffs"] < b["Valdiffs"])
    //                return -1;
    //            if (a["Valdiffs"] > b["Valdiffs"])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnSortByColumn == false) {
    //            this.lstEventDetails = this.lstEventDetails.reverse();
    //        }
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
    ReviewCountsComponent.prototype.customSort = function (event, elementname) {
        var element = event;
        //this.eventDetails = [];
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;
        }
        else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;
        try {
            this.lstEventDetails = this.lstEventDetails.sort(function (a, b) {
                if (parseFloat(a[elementname]) < parseFloat(b[elementname]))
                    return -1;
                if (parseFloat(a[elementname]) > parseFloat(b[elementname]))
                    return 1;
                return 0;
            });
            if (this.blnSortByColumn == false) {
                this.lstEventDetails = this.lstEventDetails.reverse();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    };
    ReviewCountsComponent.prototype.gridBound = function () {
        var itemCount = 0;
        var intCntQty = 0;
        var ItmValueDiff = 0;
        var ItmCountDiffernce = 0;
        this.totalItems = "";
        try {
            for (var item in this.lstEventDetails) {
                itemCount++;
                if (this.lstEventDetails[item].RECOUNT_FLAG == 'Y') {
                    this.lstEventDetails[item].RECOUNTCHECK_FLAG = true;
                }
                else {
                    this.lstEventDetails[item].RECOUNTCHECK_FLAG = false;
                }
                var LblItemId_forecolor = this.lstEventDetails[item].INV_ITEM_ID;
                var LblItemNo_forecolor = this.lstEventDetails[item].CUST_ITEM_NO;
                var LblLot_forecolor = this.lstEventDetails[item].INV_LOT_ID;
                var LblSerial_forecolor = this.lstEventDetails[item].SERIAL_ID;
                var lblDiscription_forecolor = this.lstEventDetails[item].DESCRIPTION;
                var lblSTORLOC_forecolor = this.lstEventDetails[item].STORLOC;
                var lblUOM_forecolor = this.lstEventDetails[item].UNIT_OF_MEASURE;
                var lblSysQty_forecolor = this.lstEventDetails[item].LATEST_SYSQTY;
                var lblCntDiff_forecolor = this.lstEventDetails[item].COUNT_QTY - this.lstEventDetails[item].LATEST_SYSQTY;
                var lblDiffQty_forecolor = Math.round(parseFloat((((this.lstEventDetails[item].COUNT_QTY - this.lstEventDetails[item].LATEST_SYSQTY) * 100) / this.lstEventDetails[item].LATEST_SYSQTY).toFixed(2)));
                var lblItmPrice_forecolor = this.lstEventDetails[item].ITEM_PRICE;
                var lblValDifference_forecolor = this.lstEventDetails[item].VALUEDIFF;
                var lblUSERNAME_forecolor = this.lstEventDetails[item].USERNAME;
                var lblReCntUserName_forecolor = this.lstEventDetails[item].RECOUNT_USER_NAME;
                var txtCntQty_forecolor = this.lstEventDetails[item].COUNT_QTY;
                var lblmfgitmid_forecolor = this.lstEventDetails[item].MFG_ITEM_ID;
                var lblConsignedFlag = this.lstEventDetails[item].CONSIGNED_FLAG;
                var lblLotOrSerial = this.lstEventDetails[item].L_S_CONTROLLED;
                var lblEventType = this.lstEventDetails[item].EVENT_TYPE;
                var lblConvRate = this.lstEventDetails[item].CONVERSION_RATE;
                var lblUom = this.lstEventDetails[item].UNIT_OF_MEASURE;
                var lblSTDUOM = this.lstEventDetails[item].STD_PACK_UOM;
                if (this.lstEventDetails[item].CONSIGNED_FLAG == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                    this.lstEventDetails[item].rowClsStyle = 'ui-datatable-green';
                }
                else {
                    if (this.lstEventDetails[item].L_S_CONTROLLED == 'L' || this.lstEventDetails[item].L_S_CONTROLLED == 'S' ||
                        this.lstEventDetails[item].L_S_CONTROLLED == 'B') {
                        this.lstEventDetails[item].rowClsStyle = 'ui-datatable-brown';
                    }
                }
                if (lblEventType == AtParEnums_1.EventType.Manual) {
                    if (lblUom.toUpperCase() == lblSTDUOM.toUpperCase()) {
                        intCntQty = parseFloat(this.lstEventDetails[item].COUNT_QTY.toString());
                    }
                    else {
                        intCntQty = parseFloat(txtCntQty_forecolor.toString()) * parseFloat(lblConvRate.toString());
                    }
                }
                else {
                    if (this.lstEventDetails[item].COUNT_QTY != undefined) {
                        intCntQty = parseFloat(this.lstEventDetails[item].COUNT_QTY.toString());
                    }
                }
                var intSysQty = parseFloat(this.lstEventDetails[item].LATEST_SYSQTY.toString());
                var itemPrice = parseFloat(this.lstEventDetails[item].ITEM_PRICE.toString());
                var lblReCountUser = this.lstEventDetails[item].RECOUNT_USER_ID;
                if (lblReCountUser != '' && lblReCountUser != null) {
                    if (this.blnRecntUsers == true && (this.selectedRecntUser != "Select User" && this.selectedRecntUser != null && this.selectedRecntUser != '')) {
                        if (lblReCountUser == this.selectedRecntUser) {
                            this.lstEventDetails[item].checkEnable = true;
                            this.chkReCntFlag = true;
                        }
                        else {
                            this.lstEventDetails[item].checkEnable = false;
                            this.chkReCntFlag = false;
                        }
                    }
                    else if (lblReCountUser == this.selectedUser) {
                        this.lstEventDetails[item].checkEnable = true;
                        this.chkReCntFlag = true;
                    }
                    else if (lblReCountUser != this.selectedUser) {
                        this.lstEventDetails[item].checkEnable = false;
                        this.chkReCntFlag = false;
                    }
                    else {
                        this.lstEventDetails[item].checkEnable = true;
                        this.chkReCntFlag = true;
                    }
                }
                else {
                    this.lstEventDetails[item].checkEnable = true;
                    this.chkReCntFlag = true;
                }
                var ValDif = 0;
                if (intCntQty == -1) {
                    var lblValdiff = this.lstEventDetails[item].VALUEDIFF;
                    var lblValdiffp = lblDiffQty_forecolor;
                    var lblCntDiff1 = lblCntDiff_forecolor;
                }
                else if (intCntQty >= 0 && intCntQty != -1) {
                    ValDif = (intCntQty - intSysQty) * itemPrice;
                    var Valdiff = this.lstEventDetails[item].VALUEDIFF;
                    if (ValDif < 0) {
                        this.lstEventDetails[item].Valdiffd = "(" + Math.abs(ValDif).toFixed(2) + ")";
                        this.lstEventDetails[item].Valdiffs = parseFloat(Math.abs(ValDif).toFixed(2));
                    }
                    else {
                        this.lstEventDetails[item].Valdiffd = ValDif.toString();
                        this.lstEventDetails[item].Valdiffs = ValDif;
                    }
                    ItmValueDiff = ItmValueDiff + ValDif;
                    var DiffPerc = (intCntQty - intSysQty) * 100 / intSysQty;
                    if (DiffPerc == 0) {
                        this.lstEventDetails[item].Valdiffp = "0";
                        this.lstEventDetails[item].CntDiff1 = "0";
                    }
                    else if (DiffPerc < 0) {
                        ItmCountDiffernce = ItmCountDiffernce + 1;
                        this.lstEventDetails[item].Valdiffp = "(" + Math.abs(parseFloat(DiffPerc.toString())).toFixed(2) + ")";
                        if ((intCntQty - intSysQty) < 0) {
                            this.lstEventDetails[item].CntDiff1 = "(" + Math.abs(intCntQty - intSysQty) + ")";
                        }
                    }
                    else {
                        ItmCountDiffernce = ItmCountDiffernce + 1;
                        if (intSysQty == 0) {
                            this.lstEventDetails[item].Valdiffp = "0";
                        }
                        else {
                            this.lstEventDetails[item].Valdiffp = DiffPerc.toFixed(2);
                        }
                        this.lstEventDetails[item].CntDiff1 = (intCntQty - intSysQty).toFixed(2);
                    }
                }
                this.lstEventDetails[item].COUNT_QTY = this.lstEventDetails[item].COUNT_QTY == -1 ? undefined : this.lstEventDetails[item].COUNT_QTY;
            }
            this.totalItems = " <b>Total # Of Items  :</b> <span><font color='#6c276a'>" + itemCount.toString() +
                "</font></span><b> Sum Of Value Difference  :</b> &nbsp;<span><font color='#6c276a'>" + ItmValueDiff.toFixed(2)
                + "</font></span> <b># of items with difference</b>  <span><font color='#6c276a'>" + ItmCountDiffernce.toString() + "</font></span>";
            this.switch_changed();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "gridBound");
        }
    };
    ReviewCountsComponent.prototype.bindModelDataChange = function (ven) {
        this.growlMessage = [];
        try {
            if (ven.SERIAL_CONTROLLED == 'Y') {
                if (ven.COUNT_QTY > 1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Qty cannot be greater than 1 for serial item" });
                    ven.COUNT_QTY = '';
                }
            }
            else {
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    };
    ReviewCountsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ReviewCountsComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, html, blob, ex_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        statusCode = -1;
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        //if (html != '' && html != null) {
                        //    var ua = window.navigator.userAgent;
                        //    var msie = ua.indexOf("MSIE ");
                        //    // If Internet Explorer
                        //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                        //        statusCode = -1;
                        //        let folderName: string = '';
                        //        await this.atParCommonService.exportToExcel(html, "cyct-review-counts_", "cyct-review-counts_report")
                        //            .then((res: Response) => {
                        //                let data = res.json();
                        //                statusCode = data.StatusCode;
                        //                if (statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
                        //                    folderName = data.DataVariable.toString();
                        //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/cyct-review-counts_report.xls';
                        //                    var query = '?download';
                        //                    window.open(filename + query);
                        //                }
                        //                else {
                        //                    this.growlMessage = [];
                        //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                        //                }
                        //            });
                        //        await this.atParCommonService.deleteExcel(folderName, "cyct-review-counts_report")
                        //            .then((res: Response) => {
                        //            });
                        //    } else {
                        //        var a = document.createElement('a');
                        //        var data_type = 'data:application/vnd.ms-excel';
                        //        html = html.replace(/ /g, '%20');
                        //        a.href = data_type + ', ' + html;
                        //        a.download = 'cyct-review-counts_report.xls';
                        //        a.click();
                        //    }
                        //}
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "mt_cyct-review-counts_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_22 = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.growlMessage = [];
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=600,width=600,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Cycle Count - Review Counts' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                //mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                // mywindow.print();
                                // mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_23 = _a.sent();
                        this.clientErrorMsg(ex_23, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'onSendMailIconClick');
                }
                return [2 /*return*/];
            });
        });
    };
    ReviewCountsComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, statusCode_1, ex_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Email Address to Send' });
                            return [2 /*return*/];
                        }
                        val = this.validateEmail(this.toMailAddr);
                        if (!val) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Email Address to Send' });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        this.isMailDialog = false;
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.growlMessage = [];
                        statusCode_1 = -1;
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Review Counts', JSON.stringify(html), this.toMailAddr, AtParEnums_1.MailPriority.Normal.toString(), '')
                                .then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                statusCode_1 = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                        }
                        else if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_24 = _a.sent();
                        this.clientErrorMsg(ex_24, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, ipAddress, gstrProtocal, gstrServerName, gstrPortNo, statusCode, sbMailText, _strFrmDt, _strToDt, imgserverPath, row, ItemId, lblSTORLOC, strfontcolor, ChkValue, TxtValue, LblSysQty, ItemNo, LotId, SerialId, TransId, ItemRecNum, lblMfgId, lblDiscription, lblUOM, lblCntDiff, lblDiffQty, lblItmPrice, lblValDifference, lblUSERNAME, lblReCntUser, lblConsignedFlag, lblLotOrSerial, ex_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        ipAddress = '';
                        gstrProtocal = '';
                        gstrServerName = '';
                        gstrPortNo = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.atParCommonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            ipAddress = data.DataVariable.toString();
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_1.StatusType.Success) {
                                        htmlBuilder = '';
                                        return [2 /*return*/, htmlBuilder];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    this.growlMessage = [];
                                    data = res.json();
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            gstrProtocal = data.Data.PROTOCOL.toString();
                                            gstrServerName = data.Data.SERVER_NAME.toString();
                                            gstrPortNo = data.Data.PORT_NO.toString();
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    if (data.StatType != AtParEnums_1.StatusType.Success) {
                                        htmlBuilder = '';
                                        return [2 /*return*/, htmlBuilder];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        imgserverPath = gstrProtocal + '://' + ipAddress + '/atpar/AtParWebApi/assets/images/';
                        htmlBuilder = "<Table id='table1' align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        htmlBuilder += "<tr><td>";
                        if (reqType == "Print") {
                            htmlBuilder += "<tr width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='63' nowrap><img height='63' src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<tr><td height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>" +
                                "<tr><td colspan=5 align=left><span class=c2>Review Counts For Business Unit &nbsp;<b>" + this.selectedBunit + "</b> and EventID<b> " + this.selectedEvent + "</span></td></tr>";
                            htmlBuilder = htmlBuilder + "<tr><td colspan=5 align=left>";
                            if (this.lblEventAllocUsersToolTip != '') {
                                htmlBuilder += "<span class=c2>Users allocated to count / recount this event: " + this.lblEventAllocUsersToolTip + "</span>";
                            }
                            htmlBuilder += "</td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else if (reqType == "Excel") {
                            htmlBuilder += "<tr width='100%' ><td colspan=2  align=left  height=63 width='100%' nowrap><img height='63' src=" + imgserverPath + "logo.jpg nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td colspan=6 ></td></tr>" +
                                "<tr><td colspan=6 align=left><span class=c2>Review Counts For Business Unit &nbsp;<b>" + this.selectedBunit + "</b> and EventID<b> " + this.selectedEvent + "</span></td></tr>";
                            htmlBuilder = htmlBuilder + "<tr><td colspan=5 align=left>";
                            if (this.lblEventAllocUsersToolTip != '') {
                                htmlBuilder += "<span class=c2>Users allocated to count / recount this event: " + this.lblEventAllocUsersToolTip + "</span>";
                            }
                            htmlBuilder += "</td><td align=right valign=top>&nbsp;";
                        }
                        else if (reqType == "Mail") {
                            htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='63' nowrap><img height='63' src=" + imgserverPath + "logo.jpg></td></tr>";
                            htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>";
                            htmlBuilder += "</tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td colspan=6 ></td></tr>" +
                                "<tr><td colspan=6 align=left><span class=c2>Review Counts For Business Unit &nbsp;<b>" + this.selectedBunit + "</b> and EventID<b> " + this.selectedEvent + "</span></td></tr>";
                            htmlBuilder = htmlBuilder + "<tr><td colspan=5 align=left>";
                            if (this.lblEventAllocUsersToolTip != '') {
                                htmlBuilder += "<span class=c2>Users allocated to count / recount this event: " + this.lblEventAllocUsersToolTip + "</span>";
                            }
                            htmlBuilder += "</td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr></td><td> " +
                            "<table align=center width=90% style=" + "BORDER-COLLAPSE:collapse" + " border=1>" +
                            "<tr bgcolor=white><td colspan=17 align=left><b>" + this.totalItems + " </b></td></tr>" +
                            "<tr bgcolor=#d3d3d3>" +
                            "<td align=center nowrap><span class=c3><b>Item ID</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Custom Item NO</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Lot</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Serial</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Mfg ID</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Description</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Storage Location</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>UOM</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Count Qty</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Sys Qty</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Diff Count Qty</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Diff Count Qty %</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Price/ Item</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Value Diff</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Re count</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Count User</b></span></td>" +
                            "<td align=center nowrap><span class=c3><b>Recount User</b></span></td>" +
                            "</tr>";
                        for (row in this.lstEventDetails) {
                            ItemId = '';
                            lblSTORLOC = '';
                            strfontcolor = "None";
                            ChkValue = this.lstEventDetails[row].RECOUNTCHECK_FLAG;
                            TxtValue = this.lstEventDetails[row].COUNT_QTY;
                            LblSysQty = this.lstEventDetails[row].LATEST_SYSQTY;
                            if ((this.lstEventDetails[row].INV_ITEM_ID.trim() == '')) {
                                ItemId = this.lstEventDetails[row].INV_ITEM_ID;
                            }
                            else {
                                ItemId = "'" + this.lstEventDetails[row].INV_ITEM_ID;
                            }
                            ItemNo = this.lstEventDetails[row].CUST_ITEM_NO;
                            if (ItemNo == null) {
                                ItemNo = '';
                            }
                            LotId = this.lstEventDetails[row].INV_LOT_ID;
                            SerialId = this.lstEventDetails[row].SERIAL_ID;
                            TransId = this.lstEventDetails[row].TRANSACTION_ID;
                            ItemRecNum = this.lstEventDetails[row].ITEM_REC_NUM;
                            lblMfgId = this.lstEventDetails[row].MFG_ITEM_ID;
                            lblDiscription = this.lstEventDetails[row].DESCRIPTION;
                            lblUOM = this.lstEventDetails[row].UNIT_OF_MEASURE;
                            if (this.lstEventDetails[row].STORLOC == '') {
                                lblSTORLOC = this.lstEventDetails[row].STORLOC;
                            }
                            else {
                                lblSTORLOC = "'" + this.lstEventDetails[row].STORLOC;
                            }
                            lblCntDiff = this.lstEventDetails[row].CntDiff1;
                            lblDiffQty = this.lstEventDetails[row].Valdiffp;
                            lblItmPrice = this.lstEventDetails[row].ITEM_PRICE;
                            lblValDifference = this.lstEventDetails[row].Valdiffd;
                            lblUSERNAME = this.lstEventDetails[row].USERNAME;
                            lblReCntUser = this.lstEventDetails[row].RECOUNT_USER_NAME;
                            lblConsignedFlag = this.lstEventDetails[row].CONSIGNED_FLAG;
                            lblLotOrSerial = this.lstEventDetails[row].L_S_CONTROLLED;
                            ;
                            if (lblConsignedFlag == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                strfontcolor = "DarkGreen";
                            }
                            else {
                                if (lblLotOrSerial == "L" ||
                                    lblLotOrSerial == "S" ||
                                    lblLotOrSerial == "B") {
                                    strfontcolor = "Brown";
                                }
                            }
                            htmlBuilder += "<tr>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + ItemId + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + ItemNo + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + LotId + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + SerialId + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblMfgId + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblDiscription + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblSTORLOC + "</span></td>" +
                                "<td align=left nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblUOM + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + TxtValue + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + LblSysQty + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblCntDiff + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblDiffQty + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblItmPrice + "</span></td>" +
                                "<td align=right nowrap><span class=c3 style=color:" + strfontcolor + ">" + lblValDifference + "</span></td>" +
                                "<td bgcolor=#ffffff align='center'><span class=c2><input type=checkbox name=CB value=on ";
                            if (ChkValue == true)
                                htmlBuilder += "checked";
                            htmlBuilder += "/></span></td><td align=left ><span class=c3 style=color:" + strfontcolor + ">" + lblUSERNAME + " </span></td>";
                            htmlBuilder += "<td align=left ><span class=c3 style=color:" + strfontcolor + ">" + lblReCntUser + " </span></td></tr>";
                        }
                        htmlBuilder += "<tr bgcolor=white><td colspan=17 align=left><b>" + this.totalItems + "</b></td></tr></table>";
                        htmlBuilder += "</td></tr></Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 4:
                        ex_25 = _a.sent();
                        this.clientErrorMsg(ex_25, 'exportReportDetails');
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ReviewCountsComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ReviewCountsComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    ReviewCountsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.userDataList = [];
        this.lstOrgGroups = [];
        this.eventIdDataList = [];
        this.lstBunit = [];
        this.lstEventDetails = [];
        this.lstEvents = [];
        this.lstOrgGroups = [];
        this.lstRecntUsers = [];
        this.lstUsers = [];
        this.lstEventId = [];
        this.spinnerService.stop();
        this.recntUserDataList = [];
        this.Users = [];
    };
    return ReviewCountsComponent;
}());
ReviewCountsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1964),
        providers: [datatableservice_1.datatableservice, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, cyct_review_counts_service_1.ReviewCountsService]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice,
        atpar_common_service_1.AtParCommonService,
        HttpService_1.HttpService,
        event_spinner_service_1.SpinnerService,
        AtParConstants_1.AtParConstants,
        cyct_review_counts_service_1.ReviewCountsService])
], ReviewCountsComponent);
exports.ReviewCountsComponent = ReviewCountsComponent;


/***/ }),

/***/ 1449:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var datatableservice_1 = __webpack_require__(131);
var atpar_common_service_1 = __webpack_require__(43);
var AtParConstants_1 = __webpack_require__(31);
var AtParEnums_1 = __webpack_require__(14);
var HttpService_1 = __webpack_require__(12);
var AtParStatusCodes_1 = __webpack_require__(50);
var event_spinner_service_1 = __webpack_require__(24);
var cyct_split_events_service_1 = __webpack_require__(1718);
var MT_CYCT_EVENT_HDR_MASTER_1 = __webpack_require__(1734);
var SplitEventsComponent = (function () {
    function SplitEventsComponent(dataservice, commonService, spinnerService, httpService, splitEventsServiceObj, atParConstant) {
        this.dataservice = dataservice;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.httpService = httpService;
        this.splitEventsServiceObj = splitEventsServiceObj;
        this.atParConstant = atParConstant;
        this.pop = false;
        this.page = false;
        this.form = false;
        this.editform = false;
        this.ddlOrgGrpID = [];
        this.ddlEvent = [];
        this.ddlSort = [];
        this.ddlBunit = [];
        this.lstEvents = [];
        this.loading = true;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.orgGroupsInfo = [];
        this.blnSubEventsExists = false;
        this.doSplit = false;
    }
    SplitEventsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        return [4 /*yield*/, this.orgGroupParamValue()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.orgGroupParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var paramReviewCounts, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        paramReviewCounts = "REVIEW_COUNTS";
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgGroupParamValue(paramReviewCounts, AtParEnums_1.EnumApps.CycleCount, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                _this.strReviewCount = data.DataVariable.toString();
                                if (_this.strReviewCount == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N]) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Check Review Counts Organization Parameter" });
                                    _this.page = false;
                                    return;
                                }
                                else {
                                    _this.page = true;
                                    _this.bindOrgGroups();
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.ddlSort.push({ label: "Item ID", value: "INV_ITEM_ID" });
                        this.ddlSort.push({ label: "Storage Location", value: "STORAGE_AREA" });
                        this.ddlSort.push({ label: "Description", value: "DESCRIPTION" });
                        this.selectedSortValue = this.ddlSort[0].value;
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "orgGroupParamValue");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.ddlOrgGrpID = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var orgGroups = res.json();
                                _this.spinnerService.stop();
                                switch (orgGroups.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlBunit.push({ label: "Select BUnit", value: "SelectBUnit" });
                                        _this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                                        _this.orgGroupsInfo = orgGroups.DataList;
                                        if (_this.orgGroupsInfo.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.blnShowOrgGroupID = false;
                                            _this.lblOrgGroupID = _this.orgGroupsInfo[0].ORG_GROUP_ID + " - " + _this.orgGroupsInfo[0].ORG_GROUP_NAME;
                                            _this.selOrgGrpId = _this.orgGroupsInfo[0].ORG_GROUP_ID;
                                        }
                                        else if (_this.orgGroupsInfo.length > 1) {
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.blnShowOrgGroupID = true;
                                            _this.ddlOrgGrpID.push({ label: "Select One", value: "Select One" });
                                            for (var rowCnt = 0; rowCnt < _this.orgGroupsInfo.length; rowCnt++) {
                                                if (_this.orgGroupsInfo[rowCnt].ORG_GROUP_ID.toString() != "All") {
                                                    _this.ddlOrgGrpID.push({
                                                        label: _this.orgGroupsInfo[rowCnt].ORG_GROUP_ID + " - "
                                                            + _this.orgGroupsInfo[rowCnt].ORG_GROUP_NAME, value: _this.orgGroupsInfo[rowCnt].ORG_GROUP_ID
                                                    });
                                                }
                                            }
                                            _this.selOrgGrpId = _this.ddlOrgGrpID[0].value;
                                        }
                                        if (_this.blnShowOrgGroupLabel) {
                                            _this.populateBunitsDdlst();
                                        }
                                        _this.selectedBUnit = _this.ddlBunit[0].value;
                                        _this.selectedEvent = _this.ddlEvent[0].value;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: orgGroups.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.populateBunitsDdlst = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.ddlBunit = [];
                        this.ddlEvent = [];
                        this.ddlBunit.push({ label: "Select BUnit", value: "SelectBUnit" });
                        this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.selOrgGrpId, AtParEnums_1.BusinessType.Inventory)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var lstBUnits = response.DataList;
                                        if (lstBUnits.length > 0) {
                                            for (var rowCnt = 0; rowCnt < lstBUnits.length; rowCnt++) {
                                                _this.ddlBunit.push({
                                                    label: lstBUnits[rowCnt], value: lstBUnits[rowCnt]
                                                });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "populateBunitsDdlst");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.ddlBUnitChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.ddlEvent = [];
                        this.pop = false;
                        this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                        if (!(this.selectedBUnit != "SelectBUnit")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getEventsList()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "ddlBUnitChanged");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.ddlEventChanged = function () {
        this.pop = false;
    };
    SplitEventsComponent.prototype.getEventsList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.splitEventsServiceObj.GetEventsList(this.selectedBUnit)
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstEvents = response.DataList;
                                        if (_this.lstEvents.length > 0) {
                                            for (var rowCnt = 0; rowCnt < _this.lstEvents.length; rowCnt++) {
                                                _this.ddlEvent.push({
                                                    label: _this.lstEvents[rowCnt].EVENT_ID, value: _this.lstEvents[rowCnt].EVENT_ID
                                                });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                                _this.selectedEvent = "Select Event";
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getEventsList");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var eventsList, exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.pop = false;
                        if (this.selOrgGrpId == 'Select One') {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        else if (this.selectedBUnit == "SelectBUnit") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        else if (this.selectedEvent == "Select Event") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        eventsList = this.lstEvents.filter(function (a) { return a.BUSINESS_UNIT == _this.selectedBUnit && a.EVENT_ID == _this.selectedEvent; });
                        this.eventsSplit = new MT_CYCT_EVENT_HDR_MASTER_1.MT_CYCT_EVENT_HDR_MASTER();
                        if (eventsList.length == 1) {
                            this.eventsSplit.EVENT_ID = eventsList[0].EVENT_ID;
                            this.eventsSplit.FROM = eventsList[0].FROM;
                            this.eventsSplit.TO = eventsList[0].TO;
                            this.eventsSplit.NO_OF_ITEMS = eventsList[0].NO_OF_ITEMS;
                            this.eventsSplit.PARENT_EVENT_ID = eventsList[0].PARENT_EVENT_ID;
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.splitEventsServiceObj.checkForSplit(this.selectedEvent, this.selectedBUnit, true, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var blnCheckSplit = response.DataVariable;
                                        if (blnCheckSplit.toString() == "true") {
                                            _this.doSplit = true;
                                        }
                                        else if (blnCheckSplit.toString() == "false") {
                                            _this.doSplit = false;
                                        }
                                        _this.pop = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_1 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(exMsg_1, "go");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.add = function () {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
    };
    SplitEventsComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    SplitEventsComponent.prototype.close = function () {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
    };
    SplitEventsComponent.prototype.ddlOrgGrpIdChanged = function () {
        this.growlMessage = [];
        this.pop = false;
        try {
            if (this.selOrgGrpId == 'Select One') {
                this.ddlBunit = [];
                this.ddlBunit.push({ label: "Select BUnit", value: "SelectBUnit" });
                this.selectedBUnit = "SelectBUnit";
                this.ddlEvent = [];
                this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                this.selectedEvent = "Select Event";
            }
            else {
                this.selectedBUnit = "SelectBUnit";
                this.selectedEvent = "Select Event";
                this.populateBunitsDdlst();
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "ddlOrgGrpIdChanged");
        }
    };
    SplitEventsComponent.prototype.splitEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blnEventCanBeSplit, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blnEventCanBeSplit = false;
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (this.selectedBUnit == "SelectBUnit") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                            return [2 /*return*/];
                        }
                        if (this.selectedEvent == "Select Event") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                            return [2 /*return*/];
                        }
                        if (this.eventsSplit.PARENT_EVENT_ID.toString() == "" || this.eventsSplit.PARENT_EVENT_ID == null) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter number of Splits required" });
                            return [2 /*return*/];
                        }
                        if (this.eventsSplit.PARENT_EVENT_ID == 0 || this.eventsSplit.PARENT_EVENT_ID == 1) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Split Into cannot have 0 or 1 value" });
                            return [2 /*return*/];
                        }
                        if (this.eventsSplit.PARENT_EVENT_ID > parseInt(this.eventsSplit.NO_OF_ITEMS.toString())) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Number splits cannot be more than number of items for an event" });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.splitEventsServiceObj.checkForSplit(this.selectedEvent, this.selectedBUnit, true, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var blnCheckSplit = response.DataVariable;
                                        if (blnCheckSplit.toString() == "false") {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Event cannot be split as it is downloaded by HHT user" });
                                            return;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.splitEventsServiceObj.SplitEvent(this.selectedBUnit, this.selectedEvent, this.eventsSplit.PARENT_EVENT_ID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.selectedSortValue, this.eventsSplit.FROM, this.eventsSplit.TO)
                                .catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Event Splitted Successfully" });
                                        _this.pop = false;
                                        _this.selectedSortValue = _this.ddlSort[0].value;
                                        if (_this.blnShowOrgGroupID) {
                                            //this.selOrgGrpId = 'Select One';                               
                                            _this.selectedBUnit = "SelectBUnit";
                                            _this.ddlEvent = [];
                                            _this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                                            _this.selectedEvent = "Select Event";
                                        }
                                        else {
                                            _this.selectedBUnit = "SelectBUnit";
                                            _this.ddlEvent = [];
                                            _this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                                            _this.selectedEvent = "Select Event";
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No items for the event to Split" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, "splitEvents");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SplitEventsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    SplitEventsComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.ddlOrgGrpID = [];
        this.ddlEvent = [];
        this.ddlSort = [];
        this.ddlBunit = [];
        this.lstEvents = [];
        this.eventsSplit = null;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.orgGroupsInfo = [];
        this.spinnerService.stop();
    };
    return SplitEventsComponent;
}());
SplitEventsComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1965),
        providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, cyct_split_events_service_1.SplitEventsService, AtParConstants_1.AtParConstants]
    }),
    __metadata("design:paramtypes", [datatableservice_1.datatableservice,
        atpar_common_service_1.AtParCommonService,
        event_spinner_service_1.SpinnerService,
        HttpService_1.HttpService,
        cyct_split_events_service_1.SplitEventsService,
        AtParConstants_1.AtParConstants])
], SplitEventsComponent);
exports.SplitEventsComponent = SplitEventsComponent;


/***/ }),

/***/ 1450:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var AtParEnums_1 = __webpack_require__(14);
var UserParametersComponent = (function () {
    function UserParametersComponent() {
        this.cyctappId = AtParEnums_1.EnumApps.CycleCount;
    }
    return UserParametersComponent;
}());
UserParametersComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(1966)
    })
], UserParametersComponent);
exports.UserParametersComponent = UserParametersComponent;


/***/ }),

/***/ 1712:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(29);
var cyclecount_component_1 = __webpack_require__(1439);
var cyct_activity_report_component_1 = __webpack_require__(1440);
var cyct_allocate_events_component_1 = __webpack_require__(1441);
var cyct_allocate_ibus_maunal_counts_component_1 = __webpack_require__(1442);
var cyct_daily_activity_component_1 = __webpack_require__(1443);
var cyct_daily_user_activity_component_1 = __webpack_require__(1444);
var cyct_event_summary_report_component_1 = __webpack_require__(1445);
var cyct_item_exception_report_component_1 = __webpack_require__(1446);
var cyct_process_counts_component_1 = __webpack_require__(1447);
var cyct_review_counts_components_1 = __webpack_require__(1448);
var cyct_split_events_component_1 = __webpack_require__(1449);
var cyct_user_parameters_component_1 = __webpack_require__(1450);
exports.routes = [
    {
        path: '',
        component: cyclecount_component_1.CycleCountComponent,
        children: [
            { path: 'activityreport', component: cyct_activity_report_component_1.ActivityReportComponent },
            { path: 'allocateevents', component: cyct_allocate_events_component_1.AllocateEventsComponent },
            { path: 'allocateibusmanualcounts', component: cyct_allocate_ibus_maunal_counts_component_1.AllocateIBUsManualCountsComponent },
            { path: 'dailyactivity', component: cyct_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: cyct_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'eventsummaryreport', component: cyct_event_summary_report_component_1.EventSummaryReportComponent },
            { path: 'itemexceptionreport', component: cyct_item_exception_report_component_1.ItemExceptionReportComponent },
            { path: 'processcounts', component: cyct_process_counts_component_1.ProcessCountsComponent },
            { path: 'reviewcounts', component: cyct_review_counts_components_1.ReviewCountsComponent },
            { path: 'splitevents', component: cyct_split_events_component_1.SplitEventsComponent },
            { path: 'userparameters', component: cyct_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var CycleCountRoutingModule = (function () {
    function CycleCountRoutingModule() {
    }
    return CycleCountRoutingModule;
}());
CycleCountRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], CycleCountRoutingModule);
exports.CycleCountRoutingModule = CycleCountRoutingModule;


/***/ }),

/***/ 1713:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var cyclecount_component_1 = __webpack_require__(1439);
var cyct_activity_report_component_1 = __webpack_require__(1440);
var cyct_allocate_events_component_1 = __webpack_require__(1441);
var cyct_allocate_ibus_maunal_counts_component_1 = __webpack_require__(1442);
var cyct_daily_activity_component_1 = __webpack_require__(1443);
var cyct_daily_user_activity_component_1 = __webpack_require__(1444);
var cyct_event_summary_report_component_1 = __webpack_require__(1445);
var cyct_item_exception_report_component_1 = __webpack_require__(1446);
var cyct_process_counts_component_1 = __webpack_require__(1447);
var cyct_review_counts_components_1 = __webpack_require__(1448);
var cyct_split_events_component_1 = __webpack_require__(1449);
var cyct_user_parameters_component_1 = __webpack_require__(1450);
var cyclecount_routing_module_1 = __webpack_require__(1712);
var shared_module_1 = __webpack_require__(632);
var CycleCountModule = (function () {
    function CycleCountModule() {
    }
    return CycleCountModule;
}());
CycleCountModule = __decorate([
    core_1.NgModule({
        imports: [
            cyclecount_routing_module_1.CycleCountRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            cyclecount_component_1.CycleCountComponent,
            cyct_activity_report_component_1.ActivityReportComponent,
            cyct_allocate_events_component_1.AllocateEventsComponent,
            cyct_allocate_ibus_maunal_counts_component_1.AllocateIBUsManualCountsComponent,
            cyct_daily_activity_component_1.DailyActivityComponent,
            cyct_daily_user_activity_component_1.DailyUserActivityComponent,
            cyct_event_summary_report_component_1.EventSummaryReportComponent,
            cyct_item_exception_report_component_1.ItemExceptionReportComponent,
            cyct_process_counts_component_1.ProcessCountsComponent,
            cyct_review_counts_components_1.ReviewCountsComponent,
            cyct_split_events_component_1.SplitEventsComponent,
            cyct_user_parameters_component_1.UserParametersComponent
        ]
    })
], CycleCountModule);
exports.CycleCountModule = CycleCountModule;


/***/ }),

/***/ 1714:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(38);
var HttpService_1 = __webpack_require__(12);
__webpack_require__(32);
var Rx_1 = __webpack_require__(37);
__webpack_require__(168);
var CyctAllocateEventsService = (function () {
    function CyctAllocateEventsService(httpservice) {
        this.httpservice = httpservice;
        this.deviceTokenEntry = [];
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.deviceTokenEntry = JSON.parse(sessionStorage.getItem("DeviceTokenEntry"));
    }
    CyctAllocateEventsService.prototype.getAllocateEvents = function (userID, bUnit, orgGroupID) {
        return this.httpservice.getSync({
            apiMethod: "/api/AllocateEvents/GetAllocateEvents",
            params: {
                "userID": userID,
                "bUnit": bUnit,
                "orgGroupID": orgGroupID,
            }
        });
    };
    CyctAllocateEventsService.prototype.updateEvents = function (lstdsEventDetails, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/AllocateEvents/AllocateEvents",
            formData: lstdsEventDetails,
            params: {
                "deviceTokenEntry": deviceTokenEntry,
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
        ;
    };
    CyctAllocateEventsService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return CyctAllocateEventsService;
}());
CyctAllocateEventsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], CyctAllocateEventsService);
exports.CyctAllocateEventsService = CyctAllocateEventsService;


/***/ }),

/***/ 1715:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var Rx_1 = __webpack_require__(37);
var HttpService_1 = __webpack_require__(12);
var ItemExceptionReportService = (function () {
    function ItemExceptionReportService(httpservice) {
        this.httpservice = httpservice;
    }
    ItemExceptionReportService.prototype.getCycleExceptionReport = function (businessUnit, itemID, eventID, fromDate, toDate, orgGrpId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/ItemExceptionReport/GetCycleExceptionReport",
                            params: {
                                bUnit: businessUnit,
                                itemID: itemID,
                                eventID: eventID,
                                fromDate: fromDate,
                                toDate: toDate,
                                orgGrpId: orgGrpId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ItemExceptionReportService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ;
    return ItemExceptionReportService;
}());
ItemExceptionReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], ItemExceptionReportService);
exports.ItemExceptionReportService = ItemExceptionReportService;


/***/ }),

/***/ 1716:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var HttpService_1 = __webpack_require__(12);
var ProcessCountsService = (function () {
    function ProcessCountsService(httpService) {
        this.httpService = httpService;
    }
    ProcessCountsService.prototype.getEventDetails = function (eventID, bUnit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ProcessCounts/GetEventDetails",
                            params: {
                                "eventID": eventID,
                                "bUnit": bUnit,
                                "userID": userID,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessCountsService.prototype.CheckIfEventIsParentEvent = function (bUnit, eventID, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ProcessCounts/CheckIfEventIsParentEvent",
                            params: {
                                "bUnit": bUnit,
                                "eventID": eventID,
                                "userID": userID,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessCountsService.prototype.updateReviewer = function (userID, lstUpdateReviewerData, eventID, bUnit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            apiMethod: "/api/ProcessCounts/UpdateReviewer",
                            formData: lstUpdateReviewerData,
                            params: {
                                "updateUser": userID,
                                "eventID": eventID,
                                "bUnit": bUnit,
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessCountsService.prototype.updateHdrDetails = function (userID, bUnit, eventID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ProcessCounts/UpdateHdrDetails",
                            params: {
                                "updateUser": userID,
                                "bUnit": bUnit,
                                "eventID": eventID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessCountsService.prototype.updateStatusForTransaction = function (status, transID, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ProcessCounts/UpdateStatusForTransaction",
                            params: {
                                "status": status,
                                "transID": transID,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessCountsService.prototype.CheckIfAllEventsDownloaded = function (eventID, bUnit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ProcessCounts/CheckIfAllEventsDownloaded",
                            params: {
                                "eventID": eventID,
                                "bUnit": bUnit,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessCountsService.prototype.CheckIfAllEventsCounted = function (eventID, bUnit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ProcessCounts/CheckIfAllEventsCounted",
                            params: {
                                "eventID": eventID,
                                "bUnit": bUnit,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessCountsService.prototype.CheckIfStatusUpdatedForCountedEvent = function (eventID, bUnit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ProcessCounts/CheckIfStatusUpdatedForCountedEvent",
                            params: {
                                "eventID": eventID,
                                "bUnit": bUnit,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessCountsService.prototype.CheckStatusOfEvents = function (userID, bUnit, eventID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ProcessCounts/CheckStatusOfEvents",
                            params: {
                                "userID": userID,
                                "bUnit": bUnit,
                                "eventID": eventID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessCountsService.prototype.SendEvent = function (bUnit, eventID, userID, profileID, orderHistory) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ProcessCounts/SendEvent",
                            params: {
                                "bUnit": bUnit,
                                "eventID": eventID,
                                "userID": userID,
                                "profileID": profileID,
                                "storeDetailHistory": orderHistory
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ProcessCountsService;
}());
ProcessCountsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], ProcessCountsService);
exports.ProcessCountsService = ProcessCountsService;


/***/ }),

/***/ 1717:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var HttpService_1 = __webpack_require__(12);
var ReviewCountsService = (function () {
    function ReviewCountsService(httpService) {
        this.httpService = httpService;
    }
    ReviewCountsService.prototype.getReCountUsersList = function (appId, orgGrpID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/GetReCountUsersList",
                            params: {
                                "appID": appId,
                                "orgGrpID": orgGrpID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.UpdateReviewCountEvent = function (reviewedUser, bUnit, eventID, lstEventDetails, userID, recntUsers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            apiMethod: "/api/ReviewCounts/UpdateReviewCountEvent",
                            formData: lstEventDetails,
                            params: {
                                "reviewedUser": reviewedUser,
                                "bUnit": bUnit,
                                "eventID": eventID,
                                "userID": userID,
                                "reCntUser": recntUsers
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.getReviewCountsEventIds = function (bUnit, userID) {
        return this.httpService.get({
            apiMethod: "/api/ReviewCounts/GetReviewCountsEventIds",
            params: {
                "bUnit": bUnit,
                "userID": userID
            }
        });
    };
    ReviewCountsService.prototype.CheckIfEventHasMultipleTransactions = function (eventID, bUnit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/CheckIfEventHasMultipleTransactions",
                            params: {
                                "eventId": eventID,
                                "bunit": bUnit,
                                "userID": userID,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.getReviewCountEventDetails = function (bUnit, eventID, userID, recntUserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/GetReviewCountEventDetails",
                            params: {
                                "bUnit": bUnit,
                                "eventID": eventID,
                                "userID": userID,
                                "recntuserID": recntUserId,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.getUser_Date = function (bUnit, eventID, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/GetUser_Date",
                            params: {
                                "bUnit": bUnit,
                                "eventID": eventID,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.updateStatusForTransaction = function (status, transID, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/UpdateStatusForTransaction",
                            params: {
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.CheckIfAllEventsDownloaded = function (eventID, bUnit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/CheckIfAllEventsDownloaded",
                            params: {
                                "eventID": eventID,
                                "bUnit": bUnit,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.CheckIfAllEventsCounted = function (eventID, bUnit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/CheckIfAllEventsCounted",
                            params: {
                                "eventID": eventID,
                                "bUnit": bUnit,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.CheckIfStatusUpdatedForCountedEvent = function (eventID, bUnit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/CheckIfStatusUpdatedForCountedEvent",
                            params: {
                                "eventID": eventID,
                                "bUnit": bUnit,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.CheckIfSplitEvntIsPartEvnt = function (bUnit, eventID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/CheckIfSplitEvntIsPartEvnt",
                            params: {
                                "bUnit": bUnit,
                                "eventID": eventID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.CheckStatusOfEvents = function (userID, bUnit, eventID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ReviewCounts/CheckStatusOfEvents",
                            params: {
                                "userID": userID,
                                "bUnit": bUnit,
                                "eventID": eventID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReviewCountsService.prototype.SendRevCntEvntsToERP = function (loginUser, reviewedUser, bUnit, eventID, lstEventDetails, profileID, orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            apiMethod: "/api/ReviewCounts/SendRevCntEvntsToERP",
                            formData: lstEventDetails,
                            params: {
                                "loginUser": loginUser,
                                "reviewedUser": reviewedUser,
                                "bUnit": bUnit,
                                "eventID": eventID,
                                "profileID": profileID,
                                "orgGroupID": orgGroupID
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ReviewCountsService;
}());
ReviewCountsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], ReviewCountsService);
exports.ReviewCountsService = ReviewCountsService;


/***/ }),

/***/ 1718:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
__webpack_require__(32);
var HttpService_1 = __webpack_require__(12);
var SplitEventsService = (function () {
    function SplitEventsService(httpService) {
        this.httpService = httpService;
    }
    SplitEventsService.prototype.checkForSplit = function (selectedEvent, selectedBUnit, blnCheckSplit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/SplitEvents/CheckForSplit",
                            params: {
                                "eventID": selectedEvent,
                                "bUnit": selectedBUnit,
                                "checkSplit": blnCheckSplit,
                                "userID": userID,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SplitEventsService.prototype.GetEventsList = function (bUnit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/SplitEvents/GetEventsList",
                            params: {
                                "bUnit": bUnit,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SplitEventsService.prototype.SplitEvent = function (selectedBUnit, selectedEvent, noOfSubEvents, userID, profileID, orgGroupID, selectedSortValue, fromLoc, toLoc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/SplitEvents/SplitEvents",
                            params: {
                                "bUnit": selectedBUnit,
                                "eventID": selectedEvent,
                                "noOfSubEvents": noOfSubEvents,
                                "userID": userID,
                                "profileID": profileID,
                                "orgGroupID": orgGroupID,
                                "orderBy": selectedSortValue,
                                "fromLoc": fromLoc,
                                "toLoc": toLoc,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SplitEventsService;
}());
SplitEventsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [HttpService_1.HttpService])
], SplitEventsService);
exports.SplitEventsService = SplitEventsService;


/***/ }),

/***/ 1734:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MT_CYCT_EVENT_HDR_MASTER = (function () {
    function MT_CYCT_EVENT_HDR_MASTER() {
    }
    return MT_CYCT_EVENT_HDR_MASTER;
}());
exports.MT_CYCT_EVENT_HDR_MASTER = MT_CYCT_EVENT_HDR_MASTER;


/***/ }),

/***/ 1875:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VM_UPDATE_REVIEWER_DATA = (function () {
    function VM_UPDATE_REVIEWER_DATA() {
    }
    return VM_UPDATE_REVIEWER_DATA;
}());
exports.VM_UPDATE_REVIEWER_DATA = VM_UPDATE_REVIEWER_DATA;


/***/ }),

/***/ 1955:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <router-outlet></router-outlet>\r\n</div>";

/***/ }),

/***/ 1956:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <atpar-activity-report [productId]=\"cyctProductId\"></atpar-activity-report>\r\n</div>\r\n";

/***/ }),

/***/ 1957:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"page\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupDD\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedDropDownUserId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlUserIdChanged($event)\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstFilteredBUnits\" [id]=\"'ddllstBunit'\" [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlBUnitChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Event ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"eventDescription\" [name]=\"txtLocationID1\" *ngIf=\"!isEditMode\"  [id]=\"'txtEventDescription'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text> <!--[validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\"-->\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Display</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstsearch\" [id]=\"'ddlsearch'\" [(ngModel)]=\"selectedSearch\" [ngModelOptions]=\"{standalone: true}\"  (onChange)=\"ddlSelectChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                        <button class=\"btn btn-purple sbtn\" (click)=\"getAllBUnits()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12\" *ngIf=\"showGrid\">\r\n                            <div class=\"container\">\r\n                            <span class=\"text-primary\">{{lstLength}}</span>\r\n                                <atpar-datatable [value]=\"lstEvents\" [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"recordsPerPageSize\" expandableRows=\"true\"\r\n                                                 [rowsPerPageOptions]=\"[10,20, 30, 40, 50, 60, 70, 80, 90, 100]\" [globalFilter]=\"gb\" [responsive]=\"true\" (filteredData)=\"filterdata($event)\">\r\n                                    <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li>\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.STATUSALLOCATED\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"BUSINESS_UNIT\" header=\"Business Unit\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'10%'}\">\r\n                                        <template let-col let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <span [style.color]=\"ven['CartColor']\">{{ven.BUSINESS_UNIT}}</span>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"EVENT_ID\" header=\"Event ID\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'8%'}\">\r\n                                        <template let-col let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <span [style.color]=\"ven['CartColor']\">{{ven.EVENT_ID}}</span>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"NO_RECORDS\" header=\"No of Items\" styleClass=\"text-right\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'8%'}\">\r\n                                        <template let-col let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <span [style.color]=\"ven['CartColor']\">{{ven.NO_RECORDS}}</span>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"FROM_STOR_LOC\" header=\"From\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'20%'}\">\r\n                                        <template let-col let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <span [style.color]=\"ven['CartColor']\">{{ven.FROM_STOR_LOC}}</span>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"TO_STOR_LOC\" header=\"To\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'20%'}\">\r\n                                        <template let-col let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <span [style.color]=\"ven['CartColor']\">{{ven.TO_STOR_LOC}}</span>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"USER_ID\" header=\"User\"></p-column>\r\n                                </atpar-datatable>\r\n                               </div>\r\n                            <br />\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"updateEvents()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n";

/***/ }),

/***/ 1958:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\" *ngIf=\"true\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px 0 10px 0;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label  class=\"control-label lbl-left\" *ngIf=\"blnShowOrgGroupLabel\">{{lblOrgGrpID}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupID\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupID\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"ddlUserID\" [id]=\"'ddllstUsers'\" [required]=\"true\" [(ngModel)]=\"selectedUserID\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-ac-server [(ngModel)]=\"selectedBunit\" [ngModelOptions]=\"{standalone: true}\" [suggestions]=\"lstFilteredBUnits\" (completeMethod)=\"fillBUnitsAuto($event)\"></atpar-ac-server>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-sm-6 col-md-4\">Description</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-6\">\r\n                                        <atpar-text [(ngModel)]=\"selectedDescription\" [ngModelOptions]=\"{standalone: true}\" [validations]=\"''\" [id]=\"'txtdescription'\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"getAllBUnits()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div class=\"col-xs-12\" *ngIf=\"isVisible\">\r\n                            <div class=\"container\">\r\n                                <atpar-datatable [value]=\"lstDBData\" [style]=\"{'width':'100%'}\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" (filteredData)=\"filterdata($event)\"\r\n                                                 [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [responsive]=\"true\">\r\n\r\n                                    <p-column [style]=\"{'width':'7%', 'text-align':'center'}\" header=\"Select\">\r\n                                        <template pTemplate=\"filter\" let-col>\r\n                                            <ul class=\"list-inline li-all-none\">\r\n                                                <li>\r\n\r\n                                                    <span (click)=\"checkAll()\" style=\"cursor:pointer\">All</span>\r\n                                                </li> |\r\n                                                <li>\r\n                                                    <span (click)=\"unCheckAll()\" style=\"cursor:pointer\">None</span>\r\n\r\n                                                </li>\r\n                                            </ul>\r\n                                        </template>\r\n                                        <template let-ven=\"rowData\" pTemplate=\"body\">\r\n                                            <atpar-switch (change)=\"selectedRow(ven,$event)\" [(ngModel)]=\"ven.checkvalue\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column [style]=\"{'width':'10%'}\" field=\"BUSINESS_UNIT\" header=\"Business Unit\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'40%'}\" field=\"DESCR\" header=\"Description\" sortable=\"custom\" (sortFunction)=\"customSort($event)\" [filter]=\"true\" filterPlaceholder=\"Search\"> </p-column>\r\n                                    <p-column [style]=\"{'width':'25%'}\" field=\"USER_ID\" header=\"User\" sortable=\"custom\" (sortFunction)=\"customSort($event)\"> </p-column>\r\n\r\n                                </atpar-datatable>\r\n                            </div>\r\n\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-md-4 col-md-offset-5 col-sm-6 col-sm-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" id=\"btnsubmitForGrid\" (click)=\"allocateBUnits()\">Submit &nbsp; <i class=\"fa fa-check\"></i></button>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n";

/***/ }),

/***/ 1959:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>Cycle Count Daily Activity Screen</span>\r\n</div>";

/***/ }),

/***/ 1960:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>Cycle Count Daily User Activity Screen</span>\r\n</div>";

/***/ }),

/***/ 1961:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <span>Cycle Count Event Summary Report Screen</span>\r\n</div>";

/***/ }),

/***/ 1962:
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\">\r\n                        <!--style=\"padding:10px 0 0 0;\"-->\r\n                        <form class=\"form-horizontal form-label-left\" novalidate>\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"pull-right\" *ngIf=\"showGrid\">\r\n                                    <ul class=\"list-inline\">\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgMail\" title=\"Send mail\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgPrint\" title=\"Print\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                        <li class=\"no-padding\">\r\n                                            <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgExcel\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                        </li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label class=\"control-label lbl-left\" *ngIf=\"!showOrgDropdown\">{{orgGroupId}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroupIds\" *ngIf=\"showOrgDropdown\" [required]=\"true\" [id]=\"'ddlMasterOrgGrp'\" [(ngModel)]=\"orgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlOrgGroup_SelectedIndexChanged($event)\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstBusinessUnits\" [id]=\"'ddlBusinessUnit'\" [(ngModel)]=\"businessUnit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Event ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"eventID\" [name]=\"txtEvent\" [id]=\"'txtEvent'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">Item ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-text [(ngModel)]=\"itemID\" [name]=\"txtItemID\" [id]=\"'txtItemID'\" [ngModelOptions]=\"{standalone: true}\"></atpar-text>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">From Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'FromDatePicker'\" [(ngModel)]=\"fromDate\" [placeholder]=\"'From Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"col-xs-12 col-sm-6 col-md-4 control-label\">To Date</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <p-calendar [showIcon]=\"true\" [id]=\"'ToDatePicker'\" [(ngModel)]=\"toDate\" [placeholder]=\"'To Date'\" [dateFormat]=\"'mm/dd/yy'\" [required]=\"true\" [readonlyInput]=\"true\" [ngModelOptions]=\"{standalone: true}\" [yearNavigator]=\"true\"  yearRange=\"1950:2050\"></p-calendar>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <br />\r\n                        <div style=\"clear:both;\"></div>\r\n                        <div class=\"col-xs-12\">\r\n                            <div class=\"container no-scrl\" *ngIf=\"showGrid\">\r\n                                <atpar-datatable [value]=\"lstExceptionDetails\" scrollable=\"true\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                    <p-column header=\"\" [style]=\"{'width': '4%','overflow':'visible'}\" expander=\"true\">\r\n                                    </p-column>\r\n                                    <p-column field=\"BUSINESS_UNIT\" header=\"BUnit\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '15%'}\"></p-column>\r\n                                    <p-column field=\"EVENT_ID\" header=\"Event ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '8%'}\"></p-column>\r\n                                    <p-column field=\"PARENT_EVENT_ID\" header=\"Parent Event ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '8%'}\"></p-column>\r\n                                    <p-column field=\"ITEM_ID\" header=\"Item ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '8%'}\"></p-column>\r\n                                    <p-column field=\"REPORT_DATA_15\" header=\"Custom Item No\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '8%'}\"></p-column>\r\n                                    <p-column field=\"ITEM_DESC\" header=\"Item Description\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '15%'}\"></p-column>\r\n                                    <p-column field=\"LOCATION\" header=\"Location\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width': '10%'}\"></p-column>\r\n\r\n\r\n\r\n                                    <template let-expandRow pTemplate=\"rowexpansion\">\r\n                                        <atpar-datatable [value]=\"expandRow.SUB_ITEMS\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\">\r\n                                            <p-column header=\"System Qty\" field=\"SYS_QTY\" filterPlaceholder=\"Search\"  [style]=\"{'text-align': 'right'}\"></p-column>\r\n                                            <p-column header=\"Count Qty\" field=\"COUNT_QTY\" filterPlaceholder=\"Search\" [style]=\"{'text-align': 'right'}\"></p-column>\r\n                                            <p-column header=\"Count %\" field=\"COUNT_PERCENT\" filterPlaceholder=\"Search\" [style]=\"{'text-align': 'right'}\"></p-column>\r\n                                            <p-column header=\"Count Date\" field=\"COUNT_DATE1\" filterPlaceholder=\"Search\" [style]=\"{'text-align': 'right'}\"></p-column>                                         \r\n                                        </atpar-datatable>\r\n                                    </template>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n\r\n<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\" style=\"margin-top:2%;margin-right:-2%\">\r\n                <span style=\"font-weight:600\">To : </span>\r\n            </div>\r\n            <div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n\r\n\r\n";

/***/ }),

/***/ 1963:
/***/ (function(module, exports) {

module.exports = "<style>\r\n  \r\n    .table-responsive {\r\n        overflow-x: hidden !important;\r\n    }\r\n\r\n    @media screen and (max-width:767px) {\r\n        /*.parloc-well {\r\n            margin-bottom: 15px;\r\n        }*/\r\n        .table-responsive {\r\n            overflow-x: auto !important;\r\n        }\r\n    }\r\n</style>\r\n\r\n<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\" *ngIf=\"showDropDowns\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" for=\"\" class=\"control-label lbl-left\">{{lblOrgGrpID}}</label>\r\n                                        <atpar-select [options]=\"ddlOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\"\r\n                                                      [(ngModel)]=\"selectedOrgGrpID\" [ngModelOptions]=\"{standalone: true}\"\r\n                                                      filter=\"filter\" *ngIf=\"blnShowOrgGroupID\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"ddlBunit\" [id]=\"'ddlSts'\" [(ngModel)]=\"selectedBUnit\" (onChange)=\"ddlBUnitChanged()\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Event ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"ddlEvent\" [id]=\"'ddlSts1'\" [(ngModel)]=\"selectedEventID\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" (onChange)=\"ddlEventChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"go()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div style=\"clear:both;\"></div>\r\n                        <div class=\"col-xs-12 table-responsive\" *ngIf=\"pop\">\r\n                            <div class=\"container\">\r\n                                <!--<p class=\"text-danger\">Note:Save Changes before navigating to next pages</p>-->\r\n                                        <ul class=\"list-inline\">\r\n                                            <li><strong>Status Legend</strong></li>\r\n                                            <li><i class=\"fa fa-square\" style=\"color:black;\"></i> &nbsp;Normal</li>\r\n                                            <li><i class=\"fa fa-square\" style=\"color:green;\"></i> &nbsp; Consigned</li>\r\n                                            <li><i class=\"fa fa-square\" style=\"color:brown;\"></i> &nbsp; Lot/Serial</li>\r\n                                            <li class=\"pull-right\">\r\n                                                <ul class=\"list-inline\">\r\n                                                    <li class=\"no-padding\">\r\n                                                        <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgMail\" title=\"Send mail\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                                    </li>\r\n                                                    <li class=\"no-padding\">\r\n                                                        <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgPrint\" title=\"Print\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                                    </li>\r\n                                                    <li class=\"no-padding\">\r\n                                                        <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgExcel\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                                    </li>\r\n                                                </ul>\r\n                                            </li>\r\n                                        </ul> \r\n                                \r\n                                <atpar-datatable [value]=\"eventDetails\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\" [scrollable]=\"true\">\r\n                                    <p-column field=\"INV_ITEM_ID1\" header=\"Item ID (Description)\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'200px'}\"></p-column>\r\n                                    <p-column field=\"CUST_ITEM_NO\" header=\"Custom Item No\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'111px'}\"></p-column>\r\n                                    <p-column field=\"INV_LOT_ID\" header=\"Lot #\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'85px'}\"></p-column>\r\n                                    <p-column field=\"SERIAL_ID\" header=\"Serial #\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'85px'}\"></p-column>\r\n                                    <p-column field=\"MFG_ITEM_ID\" header=\"Mfg Item ID\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'106px'}\"></p-column>\r\n                                    <p-column field=\"STORAGE_LOCATION\" header=\"Storage Location\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'120px'}\"></p-column>\r\n                                    <p-column field=\"ITEM_PRICE\" header=\"Item Price($)\" sortable=\"custom\" (sortFunction)=\"customSort($event,'ITEM_PRICE')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'100px','text-align':'right'}\"></p-column>\r\n                                    <p-column field=\"SYS_QTY1\" header=\"Sys Qty-UOM\" sortable=\"custom\" (sortFunction)=\"customSort($event,'SYS_QTY')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'105px','text-align':'right'}\"></p-column>\r\n                                    <p-column *ngFor=\"let coldata of usersList;let Myindex=index\" [style]=\"{'overflow':'visible','width':'135px'}\">\r\n                                        <template pTemplate=\"filter\">\r\n                                            <span> {{coldata.header}}</span>\r\n                                            <br />\r\n                                            <span *ngIf=\"coldata.completedDate!=null && coldata.completedDate!=''\">Completed - {{coldata.completedDate}}</span>\r\n\r\n                                            <atpar-select [options]=\"ddlStatus\" [id]=\"'ddlStst'\" [(ngModel)]=\"coldata.userstatus\" [ngModelOptions]=\"{standalone: true}\"></atpar-select>\r\n                                            <br> Count Qty\r\n                                        </template>                                     \r\n                                        <template let-ven=\"rowData\" let-col let-row=\"rowIndex\" pTemplate type=\"body\">\r\n                                            <atpar-radioButton name=\"{{ven.rowIndex}}\" [(ngModel)]=\"ven['activeFlag_'+Myindex]\" (click)=\"changeStatus(ven,ven['COUNT_'+Myindex],ven['COUNT'+Myindex],coldata.USER_ID,coldata.TRANSACTION_ID)\" value=\"{{ven['activeFlag_'+Myindex]}}\" label=\"{{ven['COUNT_'+Myindex] }}\" *ngIf=\"ven['COUNT_'+Myindex]!='N'\"></atpar-radioButton>\r\n                                            <!--<div [style]=\"{'cursor':'pointer'}\">\r\n                                                <input #rb type=\"radio\" name=\"{{ven.rowIndex}}\" value=\"{{ven['activeFlag_'+Myindex]}}\"\r\n                                                       (click)=\"changeStatus(ven,ven['COUNT_'+Myindex],ven['COUNT'+Myindex],coldata.USER_ID,Myindex)\"\r\n                                                       [checked]=\"ven['activeFlag_'+Myindex]\"\r\n                                                       *ngIf=\"ven['COUNT_'+Myindex]!='N'\"\r\n                                                       [style]=\"{'cursor':'pointer','padding': '4px 25px;'}\">\r\n                                                <span *ngIf=\"ven['COUNT_'+Myindex]!='N'\">{{ven['COUNT_'+Myindex] }}</span>\r\n                                            </div>-->\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"activeCount\" header=\"Selected Count\"  [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'90px','text-align':'right'}\">\r\n                                        <template let-col let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                            <atpar-text [(ngModel)]=\"ven[col.field]\" name=\"txtLocatio\" *ngIf=\"m_strEditCounts=='Y'?ven.showSelectedCount?true:false:false\" [validations]=\"'numeric_dot,max=10,min=0'\" [id]=\"'ddcntQty'\"\r\n                                                        [ngModelOptions]=\"{standalone: true}\"  (bindModelDataChange)=\"bindModelDataChange(ven)\"\r\n                                                        [style]=\"{'text-align':'right','padding-right':'6px','color':(ven.rowClsStyle=='ui-datatable-brown')?'brown':(ven.rowClsStyle=='ui-datatable-green')?'green':'black'}\"></atpar-text>\r\n                                            <span *ngIf=\"m_strEditCounts=='N'?ven.showSelectedCount?true:false:false\">{{ven[col.field]}}</span>\r\n                                            <!--(focusEventEmiter)=\"focusEvent($event,ven)\"-->\r\n                                            <!--<input type=\"number\" class=\"form-control\" [(ngModel)]=\"ven[col.field]==-1?'':ven[col.field]\" name=\"txtLocatio\" *ngIf=\"!isEditMode\" max=\"10\" min=\"0\" id=\"'Locatio'\" (focus)=\"focusEvent(ven[col.field])\"  (blur)=\"focusOutEvent(ven)\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"hdnProfEditTxt=='N'?true:false\" />-->\r\n                                        </template>\r\n\r\n                                    </p-column>\r\n\r\n                                    <p-column field=\"COUNT_DIFF\" header=\"Count Diff\" sortable=\"custom\" (sortFunction)=\"customSort($event,'COUNT_DIFFS')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'text-align':'right','width':'90px'}\" >\r\n                                        <!--<template let-col let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                           <span>{{ven.COUNT_DIFF.toLocaleString('en-IN')}}</span>\r\n                                         </template>-->\r\n                                    </p-column>\r\n\r\n                                    <p-column field=\"COUNT_DIFF_PER\" header=\"Count Diff(%)\" sortable=\"custom\" (sortFunction)=\"customSort($event,'COUNT_DIFF_PERS')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'text-align':'right','width':'100px'}\"></p-column>\r\n                                    \r\n                                    <p-column field=\"VALUE_DIFF\" header=\"Value Diff($)\" sortable=\"custom\" (sortFunction)=\"customSort($event,'VALUE_DIFFS')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'text-align':'right','width':'100px'}\">\r\n                                        <!--<template let-col let-ven=\"rowData\" pTemplate type=\"body\">                                          \r\n                                            <span>{{ven.VALUE_DIFF.toLocaleString('en-IN')}}</span>\r\n                                           </template>-->\r\n                                    </p-column>\r\n\r\n                                    <p-column field=\"EXT_VALUE\" header=\"Ext $ Value\" sortable=\"custom\" (sortFunction)=\"customSort($event,'EXT_VALUES')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'text-align':'right','width':'85px'}\">\r\n                                        <!--<template let-col let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                            <span>{{ven.EXT_VALUE.toLocaleString('en-IN')}}</span>\r\n                                        </template>-->\r\n                                    </p-column>\r\n                                </atpar-datatable>\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"SaveData()\">Save &nbsp; <i class=\"fa fa-floppy-o\"></i></button>\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"confirm()\" *ngIf=\"activateSend\">Send &nbsp; <i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"content-section implementation\">\r\n            <atpar-confirmdialog header=\"Confirmation\" icon=\"fa fa-question-circle\" width=\"425\"></atpar-confirmdialog>\r\n        </div>\r\n    </div>\r\n    <mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n    <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\" style=\"margin-top:2%;margin-right:-2%\">\r\n                <span style=\"font-weight:600\">To : </span>\r\n            </div>\r\n            <div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\">\r\n                <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n            </div>\r\n            <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\">\r\n                <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mail-dialog>\r\n    <!--<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n        <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                    <span>To : </span>\r\n                </div>\r\n                <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                    <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n                </div>\r\n                <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                    <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </mail-dialog>-->\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n<style>\r\n     span.radio-compo-label {\r\n        margin:2px 0 -4px 26px!important;\r\n    }\r\n</style>";

/***/ }),

/***/ 1964:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n            <div class=\"\" *ngIf=\"showDropDowns\">\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\">\r\n                            <div class=\"col-xs-12\" >\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID </label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <!--<atpar-text [(ngModel)]=\"newItem.LocationID1\" [name]=\"txtLocationID1\" *ngIf=\"!isEditMode\" [validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\" [id]=\"'LocationID1'\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"true\"></atpar-text>-->\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" class=\"control-label lbl-left\">{{orgGrpIDData}}</label>\r\n                                        <atpar-select [options]=\"lstOrgGroups\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\" [(ngModel)]=\"selectedOrgGroupId\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" *ngIf=\"blnShowOrgGroupID\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstBunit\" [id]=\"'ddlSts'\" [(ngModel)]=\"selectedBunit\" (onChange)=\"ddlBUnitChanged()\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">User ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstUsers\" [id]=\"'ddlSts12'\" [(ngModel)]=\"selectedUser\" (onChange)=\"ddlUsersChanged()\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Event ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstEvents\" [id]=\"'ddlSts1'\" [(ngModel)]=\"selectedEvent\" (onChange)=\"ddlEventIDChanged()\" [required]=\"true\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Assign To</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"lstRecntUsers\" [id]=\"'ddlStsr1'\" [(ngModel)]=\"selectedRecntUser\"  [disabled]=\"!blnRecntUsers\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-md-4 form-group\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"btnGo_Click()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <div style=\"clear:both;\"></div>\r\n                        <div class=\"col-xs-12 no-scrl\" *ngIf=\"showgrid\">\r\n                            <div class=\"container\">\r\n                                <span class=\"text-danger\">User {{_strUserId}} has reviewed this event on {{_strDateTime}} ({{_strDateTime | date:'EEEE'}})</span><br />\r\n                                <span class=\"text-dark\" title=\"{{lblEventAllocUsersToolTip}}\">User allocated to count / recount this event : {{lblEventAllocUsers}}</span>\r\n                                <br /><br />\r\n                                <ul class=\"list-inline\">\r\n                                    <li>Status Legend</li>\r\n                                    <li><i class=\"fa fa-square\" style=\"color:black;\"></i> &nbsp;Normal</li>\r\n                                    <li><i class=\"fa fa-square\" style=\"color:green;\"></i> &nbsp; Consigned</li>\r\n                                    <li><i class=\"fa fa-square\" style=\"color:brown;\"></i> &nbsp; Lot/Serial</li>\r\n                                    <li class=\"pull-right\">\r\n                                        <ul class=\"list-inline\">\r\n                                            <li class=\"no-padding\">\r\n                                                <i class=\"fa fa-envelope-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgMail\" title=\"Send mail\" (click)=\"onSendMailIconClick($event)\"></i>&nbsp;\r\n                                            </li>\r\n                                            <li class=\"no-padding\">\r\n                                                <i class=\"fa fa-print fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgPrint\" title=\"Print\" (click)=\"onPrintClick($event)\"></i>&nbsp;\r\n                                            </li>\r\n                                            <li class=\"no-padding\">\r\n                                                <i class=\"fa fa-file-excel-o fa-bg-lg bg-blue\" aria-hidden=\"true\" style=\"cursor:pointer\" id=\"imgExcel\" title=\"Excel Format\" (click)=\"onExportToExcelClick($event)\"></i>&nbsp;\r\n                                            </li>\r\n                                        </ul>\r\n                                    </li>\r\n                                </ul>\r\n                                <br />\r\n                                <div [innerHtml]=\"totalItems\"></div>\r\n                                <br />\r\n                                <atpar-datatable [value]=\"lstEventDetails\" [paginator]=\"true\" [pageLinks]=\"3\" [rows]=\"pageSize\" expandableRows=\"true\" [rowsPerPageOptions]=\"[10,20,30,40,50,60,70,80,90,100]\" [globalFilter]=\"gb\" [responsive]=\"true\"  [scrollable]=\"true\">\r\n                                    <p-column field=\"INV_ITEM_ID\" header=\"Item ID\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'150px'} \"></p-column>\r\n                                    <p-column field=\"CUST_ITEM_NO\" header=\"Custom Item No\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'100px'} \"></p-column>\r\n                                    <p-column field=\"INV_LOT_ID\" header=\"Lot #\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'64px'} \"></p-column>\r\n                                    <p-column field=\"SERIAL_ID\" header=\"Serial #\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'70px'} \"></p-column>\r\n                                    <p-column field=\"MFG_ITEM_ID\" header=\"Mfg Item ID\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'120px'} \"></p-column>\r\n                                    <p-column field=\"DESCRIPTION\" header=\"Description\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'350px'} \">\r\n                                    </p-column>\r\n                                    <p-column field=\"STORLOC\" header=\"Storage Location\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'150px'}\"></p-column>\r\n                                    <p-column field=\"UNIT_OF_MEASURE\" header=\"UOM\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'62px'} \"></p-column>\r\n                                    <p-column field=\"COUNT_QTY\" header=\"Count Qty\" [sortable]=\"true\" [style]=\"{'width':'98px'} \">\r\n                                        <template let-col let-ven=\"rowData\" pTemplate type=\"body\">\r\n                                            <atpar-text [(ngModel)]=\"ven.COUNT_QTY\" name=\"txtLocatio\" *ngIf=\"!isEditMode\" [validations]=\"'numeric_dot,max=10,min=0'\" [id]=\"ven.INV_ITEM_ID\" [style]=\"{'text-align':'left','padding-right':'6px','color':(ven.rowClsStyle=='ui-datatable-brown')?'brown':(ven.rowClsStyle=='ui-datatable-green')?'green':'black'}\"\r\n                                                        [ngModelOptions]=\"{standalone: true}\" [disabled]=\"hdnProfEditTxt=='N'?true:false\" (bindModelDataChange)=\"bindModelDataChange(ven)\"></atpar-text>\r\n                                            <!--(focusEventEmiter)=\"focusEvent($event,ven)\"-->\r\n                                            <!--<input type=\"number\" class=\"form-control\" [(ngModel)]=\"ven[col.field]==-1?'':ven[col.field]\" name=\"txtLocatio\" *ngIf=\"!isEditMode\" max=\"10\" min=\"0\" id=\"'Locatio'\" (focus)=\"focusEvent(ven[col.field])\"  (blur)=\"focusOutEvent(ven)\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"hdnProfEditTxt=='N'?true:false\" />-->\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"SYS_QTY\" header=\"Sys Qty\" sortable=\"custom\" (sortFunction)=\"customSort($event,'SYS_QTY')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'84px'} \"></p-column>\r\n                                    <!--<p-column field=\"\" header=\"Selected Count\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\"></p-column>-->\r\n                                    <p-column field=\"CntDiff1\" header=\"Diff Count Qty\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'100px'} \">\r\n                                        <!--<template let-col let-ven=\"rowData\" pTemplate type=\"body\">\r\n                    <atpar-text [(ngModel)]=\"ven[col.field]\" [name]=\"txtLocatio\" *ngIf=\"!isEditMode\" [validations]=\"'numeric_10'\" [id]=\"'Locatio'\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"hdnProfEditTxt\"></atpar-text>\r\n                </template>-->\r\n                                    </p-column>\r\n                                    <p-column field=\"Valdiffp\" header=\"Diff Count Qty (%)\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'130px'} \">\r\n\r\n                                    </p-column>\r\n                                    <p-column field=\"ITEM_PRICE\" header=\"Price($) / Item\" sortable=\"custom\" (sortFunction)=\"customSort($event,'ITEM_PRICE')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'100px'} \"></p-column>\r\n                                    <p-column field=\"Valdiffd\" header=\"Value Diff\" sortable=\"custom\" (sortFunction)=\"customSort($event,'Valdiffs')\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'90px'}\"></p-column>\r\n                                    <p-column field=\"RECOUNTCHECK_FLAG\" header=\"Re Count\" [style]=\"{'width':'56px','text-align':'center'}\">\r\n                                        <template pTemplate=\"filter\" let-ven>\r\n                                            <atpar-switch [(ngModel)]=\"rctFlag\" [checked]=\"rctFlag\" (click)=\"switch_Click()\"></atpar-switch>\r\n                                        </template>\r\n                                        <template pTemplate=\"filter\" type=\"body\" let-col let-ven=\"rowData\">\r\n                                            <atpar-switch [(ngModel)]=\"ven[col.field]\" [checked]=\"ven[col.field]\" (click)=\"switch_changed()\" [disabled]=\"!ven['checkEnable']\"></atpar-switch>\r\n                                        </template>\r\n                                    </p-column>\r\n                                    <p-column field=\"USERNAME\" header=\"Count User\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'145px'} \"></p-column>\r\n                                    <p-column field=\"RECOUNT_USER_NAME\" header=\"Recount User\" [sortable]=\"true\" [filter]=\"true\" filterPlaceholder=\"Search\" [style]=\"{'width':'145px'} \"></p-column>\r\n                                </atpar-datatable>\r\n                                <br>\r\n                            </div>\r\n                            <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"btnSubmit_Click()\">Submit &nbsp;<i class=\"fa fa-check\"></i></button>\r\n                                <button class=\"btn btn-purple sbtn\" (click)=\"btnSend_Click()\" *ngIf=\"btnUpload\">Send/Upload &nbsp;<i class=\"fa fa-upload\"></i></button>\r\n                            </div>                            \r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n            <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\" style=\"margin-top:2%;margin-right:-2%\">\r\n                        <span style=\"font-weight:600\">To : </span>\r\n                    </div>\r\n                    <div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\">\r\n                        <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n                    </div>\r\n                    <div class=\"col-lg-1 col-md-1 col-sm-3 col-xs-3\">\r\n                        <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </mail-dialog>\r\n        <!--<mail-dialog header=\"Enter Recipient`s Email Address\" [width]=\"450\" (onClose)=\"closeMailPopup()\" [(visible)]=\"isMailDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\r\n            <div class=\"ui-grid ui-grid-responsive ui-fluid\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                        <span>To : </span>\r\n                    </div>\r\n                    <div class=\"col-lg-6 col-md-6 col-sm-8 col-xs-8\">\r\n                        <atpar-text [(ngModel)]=\"toMailAddr\" [name]=\"txtToMailAddr\" [id]=\"'txtToMailAddr'\"></atpar-text>\r\n                    </div>\r\n                    <div class=\"col-lg-2 col-md-2 col-sm-3 col-xs-3\">\r\n                        <span><button class=\"btn btn-purple sbtn\" (click)=\"onSendMailClick()\">Send &nbsp;<i class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i></button> </span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </mail-dialog>-->     \r\n        <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 1965:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" class=\"content-page\">\r\n    <div class=\"page-content-wrapper\">\r\n        <div class=\"container x_panel no-border\">\r\n            <br>\r\n                <div class=\"panel panel-default\" style=\"border: 1px solid #eee;\" *ngIf=\"page\">\r\n                    <div class=\"panel-body\" style=\"padding:0px;\">\r\n                        <form class=\"form-horizontal form-label-left\" >\r\n                            <div class=\"col-xs-12\">\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Org Group ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <!--<atpar-text [(ngModel)]=\"newItem.OrgID\" [name]=\"txtOrgID\" *ngIf=\"blnShowOrgGroupLabel\" [validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\" [id]=\"'OrgID'\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"true\"></atpar-text>-->\r\n\r\n                                        <label *ngIf=\"blnShowOrgGroupLabel\" for=\"\" class=\"control-label lbl-left\">{{lblOrgGroupID}}</label>\r\n                                        <atpar-select [options]=\"ddlOrgGrpID\" [id]=\"'ddllstOrgGroups'\" [required]=\"true\"\r\n                                                      [(ngModel)]=\"selOrgGrpId\" [ngModelOptions]=\"{standalone: true}\"\r\n                                                      filter=\"filter\" *ngIf=\"blnShowOrgGroupID\" (onChange)=\"ddlOrgGrpIdChanged()\"></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Business Unit</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"ddlBunit\" [id]=\"'ddlOrg'\" [(ngModel)]=\"selectedBUnit\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" [required]=\"true\" (onChange)=\"ddlBUnitChanged()\" ></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-xs-12 col-sm-12 col-md-4 form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-4 col-sm-6\">Event ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md-8\">\r\n                                        <atpar-select [options]=\"ddlEvent\" [id]=\"'ddlSts'\" [(ngModel)]=\"selectedEvent\" [ngModelOptions]=\"{standalone: true}\" filter=\"filter\" [required]=\"true\" (onChange)=\"ddlEventChanged()\" ></atpar-select>\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"go()\">Go &nbsp; <i class=\"fa fa-arrow-right\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                        <br>\r\n                        <!--below form-->\r\n                        <form class=\"form-horizontal form-label-left\" *ngIf=\"pop\">\r\n                            <div style=\"clear:both;\"></div>\r\n                            <hr>\r\n                            <div class=\"col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2\">\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-3 col-sm-3\">Event ID</label>\r\n                                    <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                        <!--<atpar-text [(ngModel)]=\"eventsSplit.EVENT_ID\" [name]=\"txtEventID\" *ngIf=\"!isEditMode\" [validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\" [id]=\"'EventID'\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"true\"></atpar-text>-->\r\n                                        <label for=\"\" class=\"control-label lbl-left\">{{eventsSplit.EVENT_ID}}</label>\r\n                                    </div>\r\n                                    <!--<div class=\"col-xs-12 col-sm-6 col-md- help_txt\">\r\n                                        Enter Event ID\r\n                                    </div>-->\r\n\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-3 col-sm-3\">From Storage Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                        <!--<atpar-text [(ngModel)]=\"eventsSplit.FROM\" [name]=\"txtFromStorageLoc\" *ngIf=\"!isEditMode\" [validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\" [id]=\"'FromStorageLoc'\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"true\"></atpar-text>-->\r\n                                        <label for=\"\" class=\"control-label lbl-left\">{{eventsSplit.FROM}}</label>\r\n                                    </div>\r\n                                    <!--<div class=\"col-xs-12 col-sm-6 col-md- help_txt\">\r\n                                        Enter From Storage Location\r\n                                    </div>-->\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-3 col-sm-3\">To Storage Location</label>\r\n                                    <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                        <!--<atpar-text [(ngModel)]=\"eventsSplit.TO\" [name]=\"txtToStorageLoc\" *ngIf=\"!isEditMode\" [validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\" [id]=\"'ToStorageLoc'\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"true\"></atpar-text>-->\r\n                                        <label for=\"\" class=\"control-label lbl-left\">{{eventsSplit.TO}}</label>\r\n                                    </div>\r\n                                    <!--<div class=\"col-xs-12 col-sm-6 col-md- help_txt\">\r\n                                        Enter To Storage Location\r\n                                    </div>-->\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-3 col-sm-3\">No of Items</label>\r\n                                    <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                        <label for=\"\" class=\"control-label lbl-left\">{{eventsSplit.NO_OF_ITEMS}}</label>\r\n                                        <!--<atpar-text [(ngModel)]=\"eventsSplit.NO_OF_ITEMS\" [name]=\"txtNoOfItems\" *ngIf=\"!isEditMode\" [validations]=\"'alpha_numeric_underscore_hyphen_backslash_nospace'\" [id]=\"'NoOfItems'\" [ngModelOptions]=\"{standalone: true}\" [readonly]=\"true\"></atpar-text>-->\r\n                                    </div>\r\n                                    <!--<div class=\"col-xs-12 col-sm-6 col-md- help_txt\">\r\n                                        Enter No of Items\r\n                                    </div>-->\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-3 col-sm-3\">Split Into</label>\r\n                                    <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                        <atpar-text [(ngModel)]=\"eventsSplit.PARENT_EVENT_ID\" [name]=\"txtSplitInto\" *ngIf=\"!isEditMode\" [validations]=\"'mandatory,numeric,max=3'\" [id]=\"'SplitInto'\" [ngModelOptions]=\"{standalone: true}\" [isFocused]=\"'true'\"></atpar-text>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md- help_txt\">\r\n                                        Enter Split Into\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                    <label for=\"\" class=\"control-label col-xs-12 col-md-3 col-sm-3\">Sort By</label>\r\n                                    <div class=\"col-xs-12 col-sm-3 col-md-3\">\r\n                                        <atpar-select [options]=\"ddlSort\" [id]=\"'ddlOrg'\" [(ngModel)]=\"selectedSortValue\" [ngModelOptions]=\"{standalone: true}\" [required]=\"true\"></atpar-select>\r\n                                    </div>\r\n                                    <div class=\"col-xs-12 col-sm-6 col-md- help_txt\">\r\n                                        Select Sort By\r\n                                    </div>\r\n                                </div>\r\n                                <div style=\"clear:both;\"></div>\r\n                                <div class=\"col-xs-12 col-sm-6 col-sm-offset-5 col-md-4 col-md-offset-5\">\r\n                                    <button class=\"btn btn-purple sbtn\" (click)=\"splitEvents()\" [disabled]= \"!doSplit\">Split &nbsp; <i class=\"fa fa-columns\"></i></button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                </div>            \r\n        </div>\r\n    </div>\r\n    <atpar-growl [value]=\"growlMessage\" sticky=\"sticky\"></atpar-growl>\r\n</div>\r\n";

/***/ }),

/***/ 1966:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <!--<span>CycleCount User Parameters Screen</span>-->\r\n    <atpar-user-parameters [appId]=\"cyctappId\"></atpar-user-parameters>\r\n</div>";

/***/ })

});
//# sourceMappingURL=13.601fce7cdc00a672fc7a.chunk.js.map