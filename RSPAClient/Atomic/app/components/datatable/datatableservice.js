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
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var datatableservice = (function () {
    function datatableservice(http) {
        this.http = http;
    }
    datatableservice.prototype.getdetails = function () {
        return this.http.get("./app/components/datatable/Employee.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getsetupItem = function () {
        return this.http.get("./app/components/datatable/setup_items.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getlookupItem = function () {
        return this.http.get("./app/components/datatable/lookup_item.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getsubstituteItem = function () {
        return this.http.get("./app/components/datatable/substitute_item.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getsetupInventory = function () {
        return this.http.get("./app/components/datatable/setup_inventory.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getassignprofiles = function () {
        return this.http.get("./app/components/datatable/assignprofiles.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getmanageorg = function () {
        return this.http.get("./app/components/datatable/manage_org-group.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getBunits = function () {
        return this.http.get("./app/components/datatable/Bunits.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getmenuAccess = function () {
        return this.http.get("./app/components/datatable/mangae_profiles_menus_access.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getscreenDisplay = function () {
        return this.http.get("./app/components/datatable/screendisplay.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getauditSetup = function () {
        return this.http.get("./app/components/datatable/json/audit_setupitems.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getmanageUser = function () {
        return this.http.get("./app/components/datatable/json/ManageUsers.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getmanageTokens = function () {
        return this.http.get("./app/components/datatable/json/Manage_Tokens.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getmaintainPrinter = function () {
        return this.http.get("./app/components/datatable/json/Maintain_Printers.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getimportUser = function () {
        return this.http.get("./app/components/datatable/json/Import_Users.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getmanageDevices = function () {
        return this.http.get("./app/components/datatable/json/Manage_Devices.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getcriticalItem = function () {
        return this.http.get("./app/components/datatable/json/Crtc_CriticalItems.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getallocateCart = function () {
        return this.http.get("./app/components/datatable/json/CC_AllocateCarts.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getprocessParam = function () {
        return this.http.get("./app/components/datatable/json/Crct_Prcs_Parameters.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getcarrierInfo = function () {
        return this.http.get("./app/components/datatable/json/Carrier_Information.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getreleaseOrder = function () {
        return this.http.get("./app/components/datatable/json/Rec_ReleaseOrders.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getallocateInvBunits = function () {
        return this.http.get("./app/components/datatable/json/Allocate_Inv_Bunits.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getallocateDistibutiontype = function () {
        return this.http.get("./app/components/datatable/json/SI_AllocateDistibutionTypes.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getcreateOrder = function () {
        return this.http.get("./app/components/datatable/json/Crct_Creat_Orders.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getSetupStorageLocationGroup = function () {
        return this.http.get("./app/components/datatable/json/Init_SetupStrgLctnGroups.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getSetupStorageLocationGroupAssign = function () {
        return this.http.get("./app/components/datatable/json/Init_SetupstrglctnGrps_AssgnStrgLctns.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getSetupLocation = function () {
        return this.http.get("./app/components/datatable/json/Init_SetLocations.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getSetupLocationGroups = function () {
        return this.http.get("./app/components/datatable/json/Init_SetuplctnGrps1.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getSetupLocationGroupsAssignBunits = function () {
        return this.http.get("./app/components/datatable/json/Init_SetuplctnGrps_AssignLctns.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getallocateBunits = function () {
        return this.http.get("./app/components/datatable/json/Ptawy_Allct_Bsns_Units.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getPutwayRO = function () {
        return this.http.get("./app/components/datatable/json/Ptawy_ReleaseOreders.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getAMallocateGrp = function () {
        return this.http.get("./app/components/datatable/json/AM_AllctLoctnGrps.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getAMaccessPer = function () {
        return this.http.get("./app/components/datatable/json/AM_AccesPermissions.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getManageCarriers = function () {
        return this.http.get("./app/components/datatable/json/Recv_MangeCarriers.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getAllocateShiptoIds = function () {
        return this.http.get("./app/components/datatable/json/Recv_AllctShipToIDs.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getsetupItemAttr = function () {
        return this.http.get("./app/components/datatable/json/POU_SetupItemAttrbt.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getsetupPhyscians = function () {
        return this.http.get("./app/components/datatable/json/POU_SetupPhyscians.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getsetupProcedures = function () {
        return this.http.get("./app/components/datatable/json/POU_SetupProcedures.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getsetupReasons = function () {
        return this.http.get("./app/components/datatable/json/POU_SetupReasons.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getsetupspcServices = function () {
        return this.http.get("./app/components/datatable/json/POU_SetupSpcltyServce.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getddAllocation = function () {
        return this.http.get("./app/components/datatable/json/POU_DeptDvcAllctn.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getddAllocation2 = function () {
        return this.http.get("./app/components/datatable/json/POU_DeptDvcAllctn_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getrecSetupShiptoids = function () {
        return this.http.get("./app/components/datatable/json/Recv_SetupShiptToIds.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getAllocateEvents = function () {
        return this.http.get("./app/components/datatable/json/Cyct_AllocateEvents.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getDeptLocationAllocation = function () {
        return this.http.get("./app/components/datatable/json/POU_DeptLctnAllctn.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getSetupDepartment = function () {
        return this.http.get("./app/components/datatable/json/POU_SetupDept.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouProcess = function () {
        return this.http.get("./app/components/datatable/json/POU_Process.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouProcessAlert = function () {
        return this.http.get("./app/components/datatable/json/POU_Process_Alesrts.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouProcessBill = function () {
        return this.http.get("./app/components/datatable/json/POU_Process_Billing.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouProcessAssginLocation = function () {
        return this.http.get("./app/components/datatable/json/POU_Process_AssignLctns.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouCreateorders = function () {
        return this.http.get("./app/components/datatable/json/POU_CreateOrders.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouManageparLoc = function () {
        return this.http.get("./app/components/datatable/json/POU_ManagParLctn.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouManageparLoc2 = function () {
        return this.http.get("./app/components/datatable/json/POU_Mangeparlctn_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouSetupParloc = function () {
        return this.http.get("./app/components/datatable/json/POU_SetupParlctn.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouSetupParloc2 = function () {
        return this.http.get("./app/components/datatable/json/POU_setupparlctn_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getinitUserstatusreport = function () {
        return this.http.get("./app/components/datatable/json/Init_UserStatusRprt.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getcrct2Bin = function () {
        return this.http.get("./app/components/datatable/json/Crct_2Binsetup.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getdelAssignsigno = function () {
        return this.http.get("./app/components/datatable/json/Dlvr_AssignSigntries.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getdelAssignsigno2 = function () {
        return this.http.get("./app/components/datatable/json/Dlvr_AssignSigntries_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getdelShiptoidallocdel = function () {
        return this.http.get("./app/components/datatable/json/Dlry_ShipToIdallctnDlvry.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getdelSetupdropoffloc = function () {
        return this.http.get("./app/components/datatable/json/Dlvry_SetupDrpOfLctns.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getdelReleasepackages = function () {
        return this.http.get("./app/components/datatable/json/Dlvy_RelesPackages.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouMaintnNonCrt1 = function () {
        return this.http.get("./app/components/datatable/json/POU_MaintnNonCrtItems_1.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouMaintnNonCrt2 = function () {
        return this.http.get("./app/components/datatable/json/POU_MaintnNonCrtItem_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouManagecase1 = function () {
        return this.http.get("./app/components/datatable/json/POU_MangeCases_1.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouManagecase2 = function () {
        return this.http.get("./app/components/datatable/json/POU_MangCases_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouRelesecase = function () {
        return this.http.get("./app/components/datatable/json/POU_ReleseCases.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouManageorder = function () {
        return this.http.get("./app/components/datatable/json/POU_ManageOrders_1.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouReviewchargescredits1 = function () {
        return this.http.get("./app/components/datatable/json/POU_RevwChrgCrdts_1.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouReviewchargescredits2 = function () {
        return this.http.get("./app/components/datatable/json/POU_RevwChrgsCrdts_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpickAllocPackingZone = function () {
        return this.http.get("./app/components/datatable/json/Pick_AllctPckngZones.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getorderPrefix = function () {
        return this.http.get("./app/components/datatable/json/Pick_OrdrPfx.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getallocatePriority = function () {
        return this.http.get("./app/components/datatable/json/Pick_AllctPrity.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpickallocateBunits = function () {
        return this.http.get("./app/components/datatable/json/Pick_AllctInvBUints.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpickReleaseorder = function () {
        return this.http.get("./app/components/datatable/json/Pick_RelsOrders.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpickAllocatelocgrp = function () {
        return this.http.get("./app/components/datatable/json/Pick_AllctLctnGrps.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getcycleProcesscount = function () {
        return this.http.get("./app/components/datatable/json/Cyct_PrcsCunts.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpousetupcases = function () {
        return this.http.get("./app/components/datatable/json/POU_SetupCases.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouPreferedList1 = function () {
        return this.http.get("./app/components/datatable/json/POU_PrfLists_1.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouPreferedList2 = function () {
        return this.http.get("./app/components/datatable/json/POU_PrfnceLists_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouBillonlyitem2 = function () {
        return this.http.get("./app/components/datatable/json/POU_BillonlyItmMaintance_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouBillonlyitem = function () {
        return this.http.get("./app/components/datatable/json/POU_BillonlyitmMntnce.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouCriticalItems = function () {
        return this.http.get("./app/components/datatable/json/POU_CriticalItems.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouManageBill = function () {
        return this.http.get("./app/components/datatable/json/POU_MangBillonlyConsignItems.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getpouParOptreport = function () {
        return this.http.get("./app/components/datatable/json/POU_ParOptReport.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getcyclReviewCount = function () {
        return this.http.get("./app/components/datatable/json/Cyct_RevwCunts.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getrecPononpoRectps = function () {
        return this.http.get("./app/components/datatable/json/Recv_PoNonPo_Rectps.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getrecPononpoMulti = function () {
        return this.http.get("./app/components/datatable/json/Recv_PoNonPo_Multple.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getrecPononpoLotSerial = function () {
        return this.http.get("./app/components/datatable/json/Recv_PoNonPo_LotSerial.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getrecPononpoPrinter = function () {
        return this.http.get("./app/components/datatable/json/Recv_PononPo_Printer.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.getrecPononpoRecbySchdule = function () {
        return this.http.get("./app/components/datatable/json/Rcv_PoNonP0RecvBySchdule.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitMangreq = function () {
        return this.http.get("./app/components/datatable/json/Tkit_MangeDepts.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitMangDep = function () {
        return this.http.get("./app/components/datatable/json/Tkit_MangReqstor.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitSetupres = function () {
        return this.http.get("./app/components/datatable/json/Tkit_SetupReasnCodes.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitMangEquip1 = function () {
        return this.http.get("./app/components/datatable/json/Tkit_MangEqupmntITem_1.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitMangEquip2 = function () {
        return this.http.get("./app/components/datatable/json/Tkit_MngEqupmntITem_2.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitInactiveitems = function () {
        return this.http.get("./app/components/datatable/json/Tkit_InactveItems.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitRequeststatus = function () {
        return this.http.get("./app/components/datatable/json/Tkit_ReqstStatus.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitPatient = function () {
        return this.http.get("./app/components/datatable/json/Tkit_SelectColumn.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitdash = function () {
        return this.http.get("./app/components/datatable/json/dash.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    datatableservice.prototype.gettkitdashAdd = function () {
        return this.http.get("./app/components/datatable/json/dashadd.json")
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    return datatableservice;
}());
datatableservice = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], datatableservice);
exports.datatableservice = datatableservice;
//# sourceMappingURL=datatableservice.js.map