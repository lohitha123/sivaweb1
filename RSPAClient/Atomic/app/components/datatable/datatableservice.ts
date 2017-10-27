import { Component, OnInit, EventEmitter, Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Employee } from './employee';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { DomHandler } from '../../common/dom/domhandler';
@Injectable()
export class datatableservice {
    public headers: Headers;
    constructor(private http: Http) {

    }

    getdetails() {
        return this.http.get("./app/components/datatable/Employee.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getsetupItem() {
        return this.http.get("./app/components/datatable/setup_items.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getlookupItem() {
        return this.http.get("./app/components/datatable/lookup_item.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getsubstituteItem() {
        return this.http.get("./app/components/datatable/substitute_item.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getsetupInventory() {
        return this.http.get("./app/components/datatable/setup_inventory.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getassignprofiles() {
        return this.http.get("./app/components/datatable/assignprofiles.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getmanageorg() {
        return this.http.get("./app/components/datatable/manage_org-group.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getBunits() {
        return this.http.get("./app/components/datatable/Bunits.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getmenuAccess() {
        return this.http.get("./app/components/datatable/mangae_profiles_menus_access.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getscreenDisplay() {
        return this.http.get("./app/components/datatable/screendisplay.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getauditSetup() {
        return this.http.get("./app/components/datatable/json/audit_setupitems.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getmanageUser() {
        return this.http.get("./app/components/datatable/json/ManageUsers.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getmanageTokens() {
        return this.http.get("./app/components/datatable/json/Manage_Tokens.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getmaintainPrinter() {
        return this.http.get("./app/components/datatable/json/Maintain_Printers.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getimportUser() {
        return this.http.get("./app/components/datatable/json/Import_Users.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getmanageDevices() {
        return this.http.get("./app/components/datatable/json/Manage_Devices.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getcriticalItem() {
        return this.http.get("./app/components/datatable/json/Crtc_CriticalItems.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getallocateCart() {
        return this.http.get("./app/components/datatable/json/CC_AllocateCarts.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getprocessParam() {
        return this.http.get("./app/components/datatable/json/Crct_Prcs_Parameters.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getcarrierInfo() {
        return this.http.get("./app/components/datatable/json/Carrier_Information.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getreleaseOrder() {
        return this.http.get("./app/components/datatable/json/Rec_ReleaseOrders.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getallocateInvBunits() {
        return this.http.get("./app/components/datatable/json/Allocate_Inv_Bunits.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getallocateDistibutiontype() {
        return this.http.get("./app/components/datatable/json/SI_AllocateDistibutionTypes.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getcreateOrder() {
        return this.http.get("./app/components/datatable/json/Crct_Creat_Orders.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getSetupStorageLocationGroup() {
        return this.http.get("./app/components/datatable/json/Init_SetupStrgLctnGroups.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getSetupStorageLocationGroupAssign() {
        return this.http.get("./app/components/datatable/json/Init_SetupstrglctnGrps_AssgnStrgLctns.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getSetupLocation() {
        return this.http.get("./app/components/datatable/json/Init_SetLocations.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getSetupLocationGroups() {
        return this.http.get("./app/components/datatable/json/Init_SetuplctnGrps1.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getSetupLocationGroupsAssignBunits() {
        return this.http.get("./app/components/datatable/json/Init_SetuplctnGrps_AssignLctns.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getallocateBunits() {
        return this.http.get("./app/components/datatable/json/Ptawy_Allct_Bsns_Units.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getPutwayRO() {
        return this.http.get("./app/components/datatable/json/Ptawy_ReleaseOreders.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getAMallocateGrp() {
        return this.http.get("./app/components/datatable/json/AM_AllctLoctnGrps.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getAMaccessPer() {
        return this.http.get("./app/components/datatable/json/AM_AccesPermissions.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getManageCarriers() {
        return this.http.get("./app/components/datatable/json/Recv_MangeCarriers.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getAllocateShiptoIds() {
        return this.http.get("./app/components/datatable/json/Recv_AllctShipToIDs.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getsetupItemAttr() {
        return this.http.get("./app/components/datatable/json/POU_SetupItemAttrbt.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getsetupPhyscians() {
        return this.http.get("./app/components/datatable/json/POU_SetupPhyscians.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getsetupProcedures() {
        return this.http.get("./app/components/datatable/json/POU_SetupProcedures.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getsetupReasons() {
        return this.http.get("./app/components/datatable/json/POU_SetupReasons.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getsetupspcServices() {
        return this.http.get("./app/components/datatable/json/POU_SetupSpcltyServce.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getddAllocation() {
        return this.http.get("./app/components/datatable/json/POU_DeptDvcAllctn.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getddAllocation2() {
        return this.http.get("./app/components/datatable/json/POU_DeptDvcAllctn_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getrecSetupShiptoids() {
        return this.http.get("./app/components/datatable/json/Recv_SetupShiptToIds.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getAllocateEvents() {
        return this.http.get("./app/components/datatable/json/Cyct_AllocateEvents.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getDeptLocationAllocation() {
        return this.http.get("./app/components/datatable/json/POU_DeptLctnAllctn.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getSetupDepartment() {
        return this.http.get("./app/components/datatable/json/POU_SetupDept.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouProcess() {
        return this.http.get("./app/components/datatable/json/POU_Process.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouProcessAlert() {
        return this.http.get("./app/components/datatable/json/POU_Process_Alesrts.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouProcessBill() {
        return this.http.get("./app/components/datatable/json/POU_Process_Billing.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouProcessAssginLocation() {
        return this.http.get("./app/components/datatable/json/POU_Process_AssignLctns.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouCreateorders() {
        return this.http.get("./app/components/datatable/json/POU_CreateOrders.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouManageparLoc() {
        return this.http.get("./app/components/datatable/json/POU_ManagParLctn.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouManageparLoc2() {
        return this.http.get("./app/components/datatable/json/POU_Mangeparlctn_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouSetupParloc() {
        return this.http.get("./app/components/datatable/json/POU_SetupParlctn.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouSetupParloc2() {
        return this.http.get("./app/components/datatable/json/POU_setupparlctn_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getinitUserstatusreport() {
        return this.http.get("./app/components/datatable/json/Init_UserStatusRprt.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getcrct2Bin() {
        return this.http.get("./app/components/datatable/json/Crct_2Binsetup.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getdelAssignsigno() {
        return this.http.get("./app/components/datatable/json/Dlvr_AssignSigntries.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getdelAssignsigno2() {
        return this.http.get("./app/components/datatable/json/Dlvr_AssignSigntries_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getdelShiptoidallocdel() {
        return this.http.get("./app/components/datatable/json/Dlry_ShipToIdallctnDlvry.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getdelSetupdropoffloc() {
        return this.http.get("./app/components/datatable/json/Dlvry_SetupDrpOfLctns.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getdelReleasepackages() {
        return this.http.get("./app/components/datatable/json/Dlvy_RelesPackages.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouMaintnNonCrt1() {
        return this.http.get("./app/components/datatable/json/POU_MaintnNonCrtItems_1.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouMaintnNonCrt2() {
        return this.http.get("./app/components/datatable/json/POU_MaintnNonCrtItem_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouManagecase1() {
        return this.http.get("./app/components/datatable/json/POU_MangeCases_1.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouManagecase2() {
        return this.http.get("./app/components/datatable/json/POU_MangCases_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouRelesecase() {
        return this.http.get("./app/components/datatable/json/POU_ReleseCases.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouManageorder() {
        return this.http.get("./app/components/datatable/json/POU_ManageOrders_1.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouReviewchargescredits1() {
        return this.http.get("./app/components/datatable/json/POU_RevwChrgCrdts_1.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouReviewchargescredits2() {
        return this.http.get("./app/components/datatable/json/POU_RevwChrgsCrdts_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpickAllocPackingZone() {
        return this.http.get("./app/components/datatable/json/Pick_AllctPckngZones.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getorderPrefix() {
        return this.http.get("./app/components/datatable/json/Pick_OrdrPfx.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getallocatePriority() {
        return this.http.get("./app/components/datatable/json/Pick_AllctPrity.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpickallocateBunits() {
        return this.http.get("./app/components/datatable/json/Pick_AllctInvBUints.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpickReleaseorder() {
        return this.http.get("./app/components/datatable/json/Pick_RelsOrders.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpickAllocatelocgrp() {
        return this.http.get("./app/components/datatable/json/Pick_AllctLctnGrps.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getcycleProcesscount() {
        return this.http.get("./app/components/datatable/json/Cyct_PrcsCunts.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpousetupcases() {
        return this.http.get("./app/components/datatable/json/POU_SetupCases.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouPreferedList1() {
        return this.http.get("./app/components/datatable/json/POU_PrfLists_1.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouPreferedList2() {
        return this.http.get("./app/components/datatable/json/POU_PrfnceLists_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouBillonlyitem2() {
        return this.http.get("./app/components/datatable/json/POU_BillonlyItmMaintance_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouBillonlyitem() {
        return this.http.get("./app/components/datatable/json/POU_BillonlyitmMntnce.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouCriticalItems() {
        return this.http.get("./app/components/datatable/json/POU_CriticalItems.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    } 
    getpouManageBill() {
        return this.http.get("./app/components/datatable/json/POU_MangBillonlyConsignItems.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getpouParOptreport() {
        return this.http.get("./app/components/datatable/json/POU_ParOptReport.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getcyclReviewCount() {
        return this.http.get("./app/components/datatable/json/Cyct_RevwCunts.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getrecPononpoRectps() {
        return this.http.get("./app/components/datatable/json/Recv_PoNonPo_Rectps.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getrecPononpoMulti() {
        return this.http.get("./app/components/datatable/json/Recv_PoNonPo_Multple.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getrecPononpoLotSerial() {
        return this.http.get("./app/components/datatable/json/Recv_PoNonPo_LotSerial.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getrecPononpoPrinter() {
        return this.http.get("./app/components/datatable/json/Recv_PononPo_Printer.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    getrecPononpoRecbySchdule() {
        return this.http.get("./app/components/datatable/json/Rcv_PoNonP0RecvBySchdule.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitMangreq() {
        return this.http.get("./app/components/datatable/json/Tkit_MangeDepts.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitMangDep() {
        return this.http.get("./app/components/datatable/json/Tkit_MangReqstor.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitSetupres() {
        return this.http.get("./app/components/datatable/json/Tkit_SetupReasnCodes.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitMangEquip1() {
        return this.http.get("./app/components/datatable/json/Tkit_MangEqupmntITem_1.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitMangEquip2() {
        return this.http.get("./app/components/datatable/json/Tkit_MngEqupmntITem_2.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitInactiveitems() {
        return this.http.get("./app/components/datatable/json/Tkit_InactveItems.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitRequeststatus() {
        return this.http.get("./app/components/datatable/json/Tkit_ReqstStatus.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitPatient() {
        return this.http.get("./app/components/datatable/json/Tkit_SelectColumn.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitdash() {
        return this.http.get("./app/components/datatable/json/dash.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
    gettkitdashAdd() {
        return this.http.get("./app/components/datatable/json/dashadd.json")
            .toPromise()
            .then(res => <Employee[]>res.json())
            .then(data => { return data; });
    }
}

