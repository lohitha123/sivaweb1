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
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var router_1 = require("@angular/router");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var pou_department_device_allocation_service_1 = require("./pou-department-device-allocation.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var api_1 = require("../components/common/api");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var DepartmentDeviceAllocationComponent = (function () {
    /**
     * Constructor
     * @param leftBarAnimationservice
     * @param router
     * @param pouDeptAllocateService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     */
    function DepartmentDeviceAllocationComponent(leftBarAnimationservice, router, pouDeptAllocateService, httpService, spinnerService, atParConstant, confirmationService) {
        this.leftBarAnimationservice = leftBarAnimationservice;
        this.router = router;
        this.pouDeptAllocateService = pouDeptAllocateService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.workStation = false;
        this.dept = false;
        this.createForm = false;
        this.editform = false;
        this.headForm = true;
        this.goBackForm = false;
        this.departmentID = "";
        this.deptDescr = "";
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstDeptData = [];
        this.lstWorkData = [];
        this.pageName = "";
        this.workStationID = "";
        this.workStationDescription = "";
        this.macAddress = "";
        this.deptName = "";
        this.orgName = "";
        this.iswksExists = false;
        this.disableButton = true;
        this.pageHeader = '';
        this.blnPageName = false;
        this.deptID = "";
        this.breadCrumbMenu = new routepath_1.Menus();
        //this.intAppID = (this.appId);
    }
    /**
     redirecting to home when click on breadcrumbs
     */
    DepartmentDeviceAllocationComponent.prototype.homeurl = function () {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    };
    /**
    * Init Function for getting all the schedule data and org group data when page load
    */
    DepartmentDeviceAllocationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.deviceallocation = "assets/images/icons/common/deviceAllocation.png";
                    this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    this.intAppID = (this.appId);
                    this.lstDeptData = [];
                    this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    // this.spinnerService.start();
                    //  await this.bindDataGrid();
                    if (isNaN(this.intAppID)) {
                        // this.pageName = "Point of Use - Department Device Allocation";
                        this.pageHeader = "PointOfUse";
                        this.intAppID = AtParEnums_1.EnumApps.PointOfUse;
                    }
                    else {
                        if (this.intAppID != AtParEnums_1.EnumApps.PointOfUse) {
                            //   this.pageName = "AtPaRx - Department Device Allocation";
                            this.pageHeader = "ATPARX";
                        }
                        else {
                            //  this.pageName = "Point of Use - Department Device Allocation";
                            this.pageHeader = "PointOfUse";
                        }
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Getting data from database and bind records to data table
     */
    DepartmentDeviceAllocationComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var OrgGroup, OrgGroup, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.dataTableComponent != null) {
                            this.dataTableComponent.reset();
                        }
                        this.lstDeptData = [];
                        if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] == "All") {
                            OrgGroup = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].charAt(0).toUpperCase() + this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].substr(1).toLowerCase();
                        }
                        else {
                            OrgGroup = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID];
                        }
                        this.departmentID = this.departmentID.trim();
                        this.deptDescr = this.deptDescr.trim();
                        return [4 /*yield*/, this.pouDeptAllocateService.getDeptAllocateDetails(this.departmentID, this.deptDescr, OrgGroup)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstDeptData = data.DataList;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.lstDeptData != null) {
                                            if (_this.lstDeptData.length > 0) {
                                                _this.dept = true;
                                                _this.workStation = false;
                                            }
                                            else {
                                                _this.growlMessage = [];
                                                _this.dept = false;
                                                _this.departmentID = '';
                                                _this.deptDescr = '';
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Departments were found' });
                                            }
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.dept = false;
                                            _this.departmentID = '';
                                            _this.deptDescr = '';
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Departments were found' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Departments found' });
                                        }
                                        _this.dept = false;
                                        _this.departmentID = '';
                                        _this.deptDescr = '';
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        if (_this.lstDeptData != null) {
                                            if (_this.lstDeptData.length > 0) {
                                                _this.dept = true;
                                                _this.workStation = false;
                                            }
                                            else {
                                                _this.growlMessage = [];
                                                _this.dept = false;
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Departments were found' });
                                            }
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.dept = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Departments were found' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
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
                        this.displayCatchException(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is used when we click go button on search departments based on departmentid and departmentdesc
     */
    DepartmentDeviceAllocationComponent.prototype.searchDepartment = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * this method is for getting worksations for particular department and orggroup
     */
    DepartmentDeviceAllocationComponent.prototype.selectedRow = function (departmentID, orgGoupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.deptID = departmentID;
                        this.breadCrumbMenu.SUB_MENU_NAME = "Allocate Workstations / Devices - " + departmentID;
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.deptName = departmentID;
                        this.orgName = orgGoupID;
                        this.headForm = false;
                        this.pageName = "Department :" + departmentID;
                        if (isNaN(this.intAppID)) {
                            // this.pageName = "Point of Use - Department Device Allocation - " + departmentID;
                            this.pageHeader = "PointOfUse";
                        }
                        else {
                            if (this.intAppID != AtParEnums_1.EnumApps.PointOfUse) {
                                // this.pageName = "AtPaRx - Department Device Allocation - " + departmentID;
                                this.pageHeader = "ATPARX";
                            }
                            else {
                                //  this.pageName = "Point of Use - Department Device Allocation - " + departmentID;
                                this.pageHeader = "PointOfUse";
                            }
                        }
                        this.workStation = true;
                        this.createForm = false;
                        this.dept = false;
                        return [4 /*yield*/, this.bindWorkStations(departmentID, orgGoupID)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * this method is for bind the work stations for particular department and orggroup
     */
    DepartmentDeviceAllocationComponent.prototype.bindWorkStations = function (departmentID, orgGoupID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.dataTableComponent != null) {
                            this.dataTableComponent.reset();
                        }
                        this.lstWorkData = [];
                        return [4 /*yield*/, this.pouDeptAllocateService.getWorkStationsDetails(departmentID, orgGoupID)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstWorkData = data.DataList;
                                _this.blnPageName = true;
                                _this.goBackForm = true;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.lstWorkData != null) {
                                            if (_this.lstWorkData.length > 0) {
                                                _this.workStation = true;
                                                _this.dept = false;
                                            }
                                            else {
                                                _this.workStation = false;
                                                _this.growlMessage = [];
                                                _this.goBackForm = true;
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                                            }
                                        }
                                        else {
                                            _this.workStation = false;
                                            _this.growlMessage = [];
                                            _this.goBackForm = true;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        if (_this.lstWorkData != null) {
                                            if (_this.lstWorkData.length > 0) {
                                                _this.workStation = true;
                                                _this.dept = false;
                                            }
                                            else {
                                                _this.workStation = false;
                                                _this.growlMessage = [];
                                                _this.goBackForm = true;
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                                            }
                                        }
                                        else {
                                            _this.workStation = false;
                                            _this.goBackForm = true;
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        if (_this.lstWorkData != null) {
                                            if (_this.lstWorkData.length > 0) {
                                                _this.workStation = true;
                                                _this.goBackForm = true;
                                                _this.dept = false;
                                            }
                                            else {
                                                _this.workStation = false;
                                                _this.growlMessage = [];
                                                _this.goBackForm = true;
                                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                                            }
                                        }
                                        else {
                                            _this.workStation = false;
                                            _this.growlMessage = [];
                                            _this.goBackForm = true;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
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
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * this method is for when click on edit button it will show create form
    */
    DepartmentDeviceAllocationComponent.prototype.add = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Workstation / Device';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.createForm = true;
        this.editform = false;
        this.dept = false;
        this.workStationID = "";
        this.workStationDescription = "";
        this.macAddress = "";
        this.growlMessage = [];
        this.disableButton = true;
        this.workStation = false;
        this.goBackForm = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
    };
    /**
     * this method is for when click on edit button it will show edit form
     * @param ven
     */
    DepartmentDeviceAllocationComponent.prototype.edit = function (ven) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Workstation / Device';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.disableButton = false;
        this.createForm = false;
        this.editform = true;
        this.ven = ven;
        this.growlMessage = [];
        this.workStationID = ven.WORKSTATION_ID;
        this.macAddress = ven.WORKSTATION_MAC_ADDRESS;
        this.workStationDescription = ven.WORKSTATION_DESCR;
        this.dept = false;
        this.workStation = false;
        this.goBackForm = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
    };
    /**
     * This method is for close the edit form and delete form when ading or updating time
     */
    DepartmentDeviceAllocationComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Allocate Workstations / Devices - ' + this.deptID;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.createForm = false;
        this.editform = false;
        this.workStationID = "";
        this.workStationDescription = "";
        this.macAddress = "";
        this.disableButton = true;
        this.growlMessage = [];
        if (this.lstWorkData != null && this.lstWorkData.length > 0) {
            this.workStation = true;
        }
        this.goBackForm = true;
        this.mode = null;
        this.workDescStatus = null;
        this.workIDStatus = null;
        this.macAddressStatus = null;
        this.bindWorkStations(this.deptName, this.orgName);
    };
    /**
     * this method is for saving workstataion details to database
     * @param ven
     */
    DepartmentDeviceAllocationComponent.prototype.saveWorkStation = function (ven) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(this.workStationID == null || this.workStationID == "" || this.workStationID == undefined)) return [3 /*break*/, 1];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Valid Workstation ID/Device ID' });
                        return [2 /*return*/];
                    case 1:
                        if (!(this.macAddress == null || this.macAddress == "" || this.macAddress == undefined)) return [3 /*break*/, 2];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Valid MAC Address' });
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.pouDeptAllocateService.addHospGroupWorkstations(this.deptName, this.workStationID, this.workStationDescription, this.macAddress, this.orgName)
                            .subscribe(function (res) {
                            _this.growlMessage = [];
                            if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_WORKSTATION_EXIST) {
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Workstation ID/Mac Address already exists' });
                                _this.spinnerService.stop();
                                return;
                            }
                            else {
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Workstation").replace("2%", _this.workStationID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                        //this.bindWorkStations(this.deptName, this.orgName);
                                        _this.createForm = true;
                                        _this.workStationID = "";
                                        _this.workStationDescription = "";
                                        _this.macAddress = "";
                                        document.getElementById('txtworkStationID').focus();
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            }
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_3 = _a.sent();
                        this.displayCatchException(ex_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is for when we clcik gobac button it will redirect to department page
     */
    DepartmentDeviceAllocationComponent.prototype.goBack = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.workStation = false;
        this.growlMessage = [];
        this.headForm = true;
        this.goBackForm = false;
        this.disableButton = true;
        this.pageName = "";
        if (isNaN(this.intAppID)) {
            // this.pageName = "Point of Use - Department Device Allocation";
            this.pageHeader = "PointOfUse";
        }
        else {
            if (this.intAppID != AtParEnums_1.EnumApps.PointOfUse) {
                //   this.pageName = "AtPaRx - Department Device Allocation";
                this.pageHeader = "ATPARX";
            }
            else {
                //   this.pageName = "Point of Use - Department Device Allocation";
                this.pageHeader = "PointOfUse";
            }
        }
        this.dept = false;
        this.createForm = false;
        this.editform = false;
        this.workDescStatus = null;
        this.workIDStatus = null;
        this.macAddressStatus = null;
    };
    /**
     * deleting a record from workstation grid
     * @param workstation
     */
    DepartmentDeviceAllocationComponent.prototype.deleteRow = function (workstation) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.createForm = false;
                this.editform = false;
                try {
                    this.confirmationService.confirm({
                        message: "Are you sure you want to delete " + workstation + " workstation?",
                        accept: function () { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var blnVar;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.spinnerService.start();
                                        return [4 /*yield*/, this.checkWksCartAllocation(workstation, this.deptName)];
                                    case 1:
                                        _a.sent();
                                        if (this.iswksExists == true) {
                                            this.spinnerService.stop();
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'This Workstation is assigned to a Cart, Unassign before deleting' });
                                            return [2 /*return*/];
                                        }
                                        else {
                                            this.pouDeptAllocateService.deleteHospgroupWorkstation(this.deptName, workstation).
                                                catch(this.httpService.handleError).then(function (res) {
                                                var data = res.json();
                                                _this.spinnerService.stop();
                                                _this.growlMessage = [];
                                                switch (data.StatType) {
                                                    case AtParEnums_1.StatusType.Success: {
                                                        var msg = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", "Workstation").replace("2%", workstation);
                                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                                        //this.bindWorkStations(this.deptName, this.orgName);
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
                                            });
                                        }
                                        this.bindWorkStations(this.deptName, this.orgName);
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    });
                    this.spinnerService.stop();
                }
                catch (ex) {
                    this.displayCatchException(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Checking if workstation alreday exists or not
     * @param workStation
     * @param deptID
     */
    DepartmentDeviceAllocationComponent.prototype.checkWksCartAllocation = function (workStation, deptID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rcount, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        rcount = 0;
                        return [4 /*yield*/, this.pouDeptAllocateService.getCartWorkstations('', '', this.orgName, this.intAppID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstWrkStationDetails = [];
                                _this.growlMessage = [];
                                _this.lstWrkStationDetails = data.DataList;
                                var filterData = _this.lstWrkStationDetails.filter(function (a) { return a.DEPARTMENT_ID == deptID && a.WORKSTATION_ID == workStation; });
                                if (filterData.length > 0) {
                                    _this.iswksExists = true;
                                }
                                else {
                                    _this.iswksExists = false;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This Method is for Updating Work Station Details
     */
    DepartmentDeviceAllocationComponent.prototype.updateWorkStation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(this.macAddress == null || this.macAddress == "" || this.macAddress == undefined)) return [3 /*break*/, 1];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Valid MAC Address' });
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, this.pouDeptAllocateService.updateHospGroupWorkstations(this.deptName, this.workStationID, this.workStationDescription, this.macAddress)
                            .subscribe(function (res) {
                            _this.growlMessage = [];
                            if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_WORKSTATION_EXIST) {
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Mac Address already exists' });
                                _this.spinnerService.stop();
                                return;
                            }
                            else {
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Workstation").replace("2%", _this.workStationID);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                        //this.bindWorkStations(this.deptName, this.orgName);
                                        _this.editform = true;
                                        //this.workStationID = "";
                                        //this.workStationDescription = "";
                                        //this.macAddress = "";
                                        document.getElementById('txtworkStationDescription1').focus();
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            }
                        })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method is for disable submit button untill all basic info is entered
     * @param event
     */
    DepartmentDeviceAllocationComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("txtworkStationID" == event.TextBoxID.toString()) {
                this.workIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtMacAddress" == event.TextBoxID.toString()) {
                this.workDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtMacAddress1" == event.TextBoxID.toString()) {
                this.macAddressStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtworkStationDescription" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtworkStationDescription1" == event.TextBoxID.toString()) {
                this.desc1Status = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if (this.workIDStatus == 0 && this.workDescStatus == 0 && (this.descStatus == 0 || this.descStatus == undefined)) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if ((this.macAddressStatus == 0 || this.macAddressStatus == undefined) && (this.desc1Status == 0 || this.desc1Status == undefined)) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    };
    /**
     * This method is for displaying catch block error messages
     * @param event
     */
    DepartmentDeviceAllocationComponent.prototype.displayCatchException = function (ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    };
    /**
     * delete all the values from variables
     */
    DepartmentDeviceAllocationComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstDeptData = [];
        this.lstWorkData = [];
        this.workStation = false;
        this.dept = true;
        this.createForm = false;
        this.editform = false;
        this.workStationID = "";
        this.workStationDescription = "";
        this.macAddress = "";
        this.deptName = "";
        this.orgName = "";
        this.disableButton = true;
        this.ven = [];
        this.recordsPerPageSize = 0;
        this.intAppID = 0;
        this.pageName = "";
        this.departmentID = "";
        this.deptDescr = "";
        this.headForm = true;
        this.goBackForm = false;
        this.mode = null;
        this.blnPageName = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DepartmentDeviceAllocationComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], DepartmentDeviceAllocationComponent.prototype, "dataTableComponent", void 0);
    DepartmentDeviceAllocationComponent = __decorate([
        core_1.Component({
            selector: 'atpar-pou-department-device-allocation',
            templateUrl: 'pou-department-device-allocation.component.html',
            providers: [pou_department_device_allocation_service_1.POUDeptDeviceAllocateService, AtParConstants_1.AtParConstants, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            pou_department_device_allocation_service_1.POUDeptDeviceAllocateService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants, api_1.ConfirmationService])
    ], DepartmentDeviceAllocationComponent);
    return DepartmentDeviceAllocationComponent;
}());
exports.DepartmentDeviceAllocationComponent = DepartmentDeviceAllocationComponent;
//# sourceMappingURL=pou-department-device-allocation.component.js.map