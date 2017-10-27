/// <reference path="../entities/vm_mt_pou_billonly_items.ts" />
/// <reference path="../entities/vm_atpar_pou_locations.ts" />
/// <reference path="../entities/par_mngt_vendor.ts" />
/// <reference path="billonlyitemmaintainservice.ts" />
/// <reference path="../entities/mt_pou_billonly_items.ts" />
import { Component, Inject } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
//import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { TextboxControl } from '../Common/DynamicControls/TextboxControl';
import { DropDownControl } from '../Common/DynamicControls/DropDownControl';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { StatusType } from '../Shared/AtParEnums';
import { Message } from '../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';
import { AddUserServices } from '../../app/Init/atpar-add-user.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_POU_BILLONLY_ITEMS } from '../entities/mt_pou_billonly_items';
import { PAR_MNGT_VENDOR } from '../entities/par_mngt_vendor';
import { VM_ATPAR_POU_LOCATIONS } from '../entities/vm_atpar_pou_locations';
import { VM_MT_POU_BILLONLY_ITEMS } from '../entities/vm_mt_pou_billonly_items';
import { BillOnlyItemMaintainService } from './BillOnlyItemMaintainService';
import { Menus } from '../AtPar/Menus/routepath';
import { DOCUMENT } from '@angular/platform-browser';

declare var module: {
    id: string;
}

@Component({


    templateUrl: 'pou-bill-only-item-maintenance.component.html',
    // providers: [datatableservice],
    providers: [AddUserServices, AtParConstants, AtParCommonService, datatableservice, BillOnlyItemMaintainService],
})

export class BillOnlyItemMaintenanceComponent {
    pop: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    Hideloading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    dropdownOrgData: SelectItem[] = [];
    ddlFillKillFlag: SelectItem[] = [];
    ddlReplenishment: SelectItem[] = [];
    ddlOrderingType: SelectItem[] = [];
    ddlRequisitionType: SelectItem[] = [];
    ddlCostCenter: SelectItem[] = [];
    ddlInvBusinessUnit: SelectItem[] = [];
    orgGroups: any = [];
    profiles: any = [];
    _deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    ItemID: string = "";
    Description: string = "";
    OrggroupID: string = "";
    orggrpID: string = "";
    pageSize: number;
    resType: any;
    drpstatus: boolean = false;
    lblstatus: boolean = false;
    orggrpID1: string = "";
    grdHide: boolean = false;
    BindGrid: MT_POU_BILLONLY_ITEMS[];
    errorMessage: string = "";
    Address2: string = "";
    newItem = new MT_POU_BILLONLY_ITEMS();
    updatedata: MT_POU_BILLONLY_ITEMS[];
    vendorIDstatus: number;
    vendorItemstatus: number;
    uomstatus: number;
    DepartmentD: number;
    Location: number;
    Manufacturer: number;
    ManufacturerID: number;
    UPCID: number;
    ItemPrice: number;
    LotID: number;
    SerialID: number;
    GTIN: number;
    FoqQty: number;
    MaxQty: number;
    ChargeCode: number;
    CountOrder: number;
    UserField1: number;
    Location12: number;
    BindConvertGrid: VM_ATPAR_POU_LOCATIONS[];
    GetconvertGrdItem: VM_ATPAR_POU_LOCATIONS[] = [];
    newConvertItem = new VM_MT_POU_BILLONLY_ITEMS();
    updateConvertdata: VM_MT_POU_BILLONLY_ITEMS[] = [];
    Compartment1: number;
    OptQty: number;
    UOM: number;
    UntiOfIssue: number;
    conversionrate: number;
    conversionrate1: number;
    lstFilteredVendors: any = [];
    lstVendors: any = [];
    Binddata: PAR_MNGT_VENDOR[];
    filtereddata: any[];
    lstFilteredVendordata: SelectItem[] = [];
    editID: boolean = false;
    selectedScreenDisplayId: string = "";
    selectedScreenId: string = "";
    selectedFlagID: string = "";
    deviceallocation: string;
    breadCrumbMenu: Menus;
    lblstatus1: boolean = false;
    lblstatus2: boolean = false;
    ddldrpStatus: number;
    formname: string = "";
    lstFilteredItemIds: any = [];
    lstItems: any = [];
    lstItemIDs: any = [];
    filtereditemdata: any = [];
    //public newItem = new PAR_MNGT_VENDOR();

    constructor(
        public dataservice: datatableservice,
        private spinnerService: SpinnerService,
        private router: Router,
        private BillOnlyItemMaintainService: BillOnlyItemMaintainService,
        //private atParSharedDataService: AtParSharedDataService,
        private route: ActivatedRoute,
        private addUserServices: AddUserServices,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        @Inject(DOCUMENT) private document,
        private atParConstant: AtParConstants,
        private http: Http
    ) {
        this.breadCrumbMenu = new Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    ngOnInit(): void {

        try {

            this.deviceallocation = "assets/images/icons/common/convert.png";
            // this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.bindOrgDropdown();
            this.bindItemIDS();


        }
        catch (ex) {

        }
    }

    Validate() {
        if (this.newItem.VENDOR_ID != null && this.newItem.VENDOR_ID != "" && this.newItem.VENDOR_ID != "%") {
            this.vendorIDstatus = 0;
        }
        else {
            this.vendorIDstatus = 1;
        }

        if (this.vendorItemstatus == 0 && this.uomstatus == 0 && this.vendorIDstatus == 0 && (this.newItem.VEND_ITEM_ID !== "" && this.newItem.VEND_ITEM_ID != null && this.newItem.VEND_ITEM_ID != undefined) && (this.newItem.UOM !== "" && this.newItem.UOM != null && this.newItem.UOM != undefined)) {
            if ((this.DepartmentD == 0 || this.DepartmentD == undefined) &&
                (this.Manufacturer == 0 || this.Manufacturer == undefined) && (this.ManufacturerID == 0 || this.ManufacturerID == undefined) &&
                (this.UPCID == 0 || this.UPCID == undefined) && (this.ItemPrice == 0 || this.ItemPrice == undefined) &&
                (this.LotID == 0 || this.LotID == undefined) && (this.SerialID == 0 || this.SerialID == undefined) &&
                (this.GTIN == 0 || this.GTIN == undefined) && (this.Location12 == 0 || this.Location12 == undefined)) {
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

    bindModelDataChange(event: any) {
        //this.loading = true;
        try {
            if (this.formname == "Edit") {
                if (this.newItem.VEND_ITEM_ID == null || this.newItem.VEND_ITEM_ID == undefined || this.newItem.VEND_ITEM_ID == "") {
                    this.vendorItemstatus = null;
                }
                else {
                    this.vendorItemstatus = 0;
                }
                if (this.newItem.UOM == null || this.newItem.UOM == undefined || this.newItem.UOM == "") {
                    this.uomstatus = null;
                }
                else {
                    this.uomstatus = 0;
                }
                if ("bUnit" == event.TextBoxID.toString()) {
                    this.vendorIDstatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("VendorItemID" == event.TextBoxID.toString()) {
                    this.vendorItemstatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("UOM" == event.TextBoxID.toString()) {
                    this.uomstatus = event.validationrules.filter(x => x.status == false).length;
                }
                if ("DepartmentD" == event.TextBoxID.toString()) {
                    this.DepartmentD = event.validationrules.filter(x => x.status == false).length;
                }
                if ("Manufacturer" == event.TextBoxID.toString()) {
                    this.Manufacturer = event.validationrules.filter(x => x.status == false).length;
                }
                if ("ManufacturerID" == event.TextBoxID.toString()) {
                    this.ManufacturerID = event.validationrules.filter(x => x.status == false).length;
                }
                if ("UPCID" == event.TextBoxID.toString()) {
                    this.UPCID = event.validationrules.filter(x => x.status == false).length;
                }
                if ("ItemPrice" == event.TextBoxID.toString()) {
                    this.ItemPrice = event.validationrules.filter(x => x.status == false).length;
                }
                if ("LotID" == event.TextBoxID.toString()) {
                    this.LotID = event.validationrules.filter(x => x.status == false).length;
                }
                if ("SerialID" == event.TextBoxID.toString()) {
                    this.SerialID = event.validationrules.filter(x => x.status == false).length;
                }
                if ("Location12" == event.TextBoxID.toString()) {
                    this.Location12 = event.validationrules.filter(x => x.status == false).length;
                }
                if ("GTIN" == event.TextBoxID.toString()) {
                    this.GTIN = event.validationrules.filter(x => x.status == false).length;
                }
                this.Validate();
                if (this.vendorItemstatus == 0 && this.uomstatus == 0 && this.vendorIDstatus == 0) {
                    if ((this.DepartmentD == 0 || this.DepartmentD == undefined) &&
                        (this.Manufacturer == 0 || this.Manufacturer == undefined) && (this.ManufacturerID == 0 || this.ManufacturerID == undefined) &&
                        (this.UPCID == 0 || this.UPCID == undefined) && (this.ItemPrice == 0 || this.ItemPrice == undefined) &&
                        (this.LotID == 0 || this.LotID == undefined) && (this.SerialID == 0 || this.SerialID == undefined) &&
                        (this.GTIN == 0 || this.GTIN == undefined) && (this.Location12 == 0 || this.Location12 == undefined)) {
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

            if (this.formname == "convert") {
                if (this.newConvertItem.Compartment === "" || this.newConvertItem.Compartment == null || this.newConvertItem.Compartment == undefined) {
                    this.Compartment1 = null;
                }
                else {
                    this.Compartment1 = 0;
                }
                if (this.newConvertItem.OPTIMAL_QTY == null || this.newConvertItem.OPTIMAL_QTY == undefined) {
                    this.OptQty = null;
                }
                else {
                    this.OptQty = 0;
                }
                if (this.newConvertItem.UOM_PROCUREMENT === "" || this.newConvertItem.UOM_PROCUREMENT == null || this.newConvertItem.UOM_PROCUREMENT == undefined) {
                    this.UOM = null;
                }
                else {
                    this.UOM = 0;
                }
                if (this.newConvertItem.UOM_ISSUE === "" || this.newConvertItem.UOM_ISSUE == null || this.newConvertItem.UOM_ISSUE == undefined) {
                    this.UntiOfIssue = null;
                }
                else {
                    this.UntiOfIssue = 0;
                }
                if (this.newConvertItem.CONV_FACTOR == null || this.newConvertItem.CONV_FACTOR == undefined) {
                    this.conversionrate = null;
                }
                else {
                    this.conversionrate = 0;
                }
                if ("UntiOFPAR" == event.TextBoxID.toString()) {
                    this.Location = event.validationrules.filter(x => x.status == false).length;
                }
                if ("FoqQty" == event.TextBoxID.toString()) {
                    this.FoqQty = event.validationrules.filter(x => x.status == false).length;
                }
                if ("MaxQty" == event.TextBoxID.toString()) {
                    this.MaxQty = event.validationrules.filter(x => x.status == false).length;
                }
                if ("ChargeCode" == event.TextBoxID.toString()) {
                    this.ChargeCode = event.validationrules.filter(x => x.status == false).length;
                }
                if ("CountOrder" == event.TextBoxID.toString()) {
                    this.CountOrder = event.validationrules.filter(x => x.status == false).length;
                }
                if ("UserField1" == event.TextBoxID.toString()) {
                    this.UserField1 = event.validationrules.filter(x => x.status == false).length;
                }

                if ("Compartment1" == event.TextBoxID.toString()) {
                    this.Compartment1 = event.validationrules.filter(x => x.status == false).length;
                }
                if ("OptQty" == event.TextBoxID.toString()) {
                    this.OptQty = event.validationrules.filter(x => x.status == false).length;
                }
                if ("UOM" == event.TextBoxID.toString()) {
                    this.UOM = event.validationrules.filter(x => x.status == false).length;
                }
                if ("UntiOfIssue" == event.TextBoxID.toString()) {
                    this.UntiOfIssue = event.validationrules.filter(x => x.status == false).length;
                }
                if ("conversionrate" == event.TextBoxID.toString()) {
                    this.conversionrate = event.validationrules.filter(x => x.status == false).length;
                }
                if ("conversionrate1" == event.TextBoxID.toString()) {
                    this.conversionrate1 = event.validationrules.filter(x => x.status == false).length;
                }
                this.ddlBillonlyChanged();
                if (this.Compartment1 == 0 && this.OptQty == 0 && this.UOM == 0 && this.UntiOfIssue == 0 && this.conversionrate == 0 && this.ddldrpStatus == 0) {
                    if ((this.FoqQty == 0 || this.FoqQty == undefined) && (this.MaxQty == 0 || this.MaxQty == undefined) &&
                        (this.ChargeCode == 0 || this.ChargeCode == undefined) && (this.CountOrder == 0 || this.CountOrder == undefined) &&
                        (this.UserField1 == 0 || this.UserField1 == undefined) && (this.Location == 0 || this.Location == undefined) &&
                        (this.conversionrate1 == 0 || this.conversionrate1 == undefined)) {
                        this.Hideloading = false;
                    }
                    else {
                        this.Hideloading = true;
                    }
                }
                else {
                    this.Hideloading = true;
                }


            }

        } catch (ex) {
            //this.clientErrorMsg(ex);
        }

    }


    ddlBillonlyChanged() {
        if (this.newConvertItem.ORDERING_TYPE != "" && this.newConvertItem.REPLENISHMENT_TYPE != "" && this.newConvertItem.COST_CENTER != null && this.newConvertItem.REQUISITION_TYPE != "") {
            this.ddldrpStatus = 0;
        }
        else {
            this.ddldrpStatus = 1;
        }

        if (this.Compartment1 == 0 && this.OptQty == 0 && this.UOM == 0 && this.UntiOfIssue == 0 && this.conversionrate == 0 && this.ddldrpStatus == 0 &&
            (this.newConvertItem.Compartment !== "" && this.newConvertItem.Compartment != null && this.newConvertItem.Compartment != undefined) &&
            (this.newConvertItem.OPTIMAL_QTY != null && this.newConvertItem.OPTIMAL_QTY != undefined) &&
            (this.newConvertItem.UOM_PROCUREMENT !== "" && this.newConvertItem.UOM_PROCUREMENT != null && this.newConvertItem.UOM_PROCUREMENT != undefined) &&
            (this.newConvertItem.UOM_ISSUE !== "" && this.newConvertItem.UOM_ISSUE != null && this.newConvertItem.UOM_ISSUE != undefined) &&
            (this.newConvertItem.CONV_FACTOR != null && this.newConvertItem.CONV_FACTOR != undefined)) {
            if ((this.FoqQty == 0 || this.FoqQty == undefined) && (this.MaxQty == 0 || this.MaxQty == undefined) &&
                (this.ChargeCode == 0 || this.ChargeCode == undefined) && (this.CountOrder == 0 || this.CountOrder == undefined) &&
                (this.UserField1 == 0 || this.UserField1 == undefined) && (this.Location == 0 || this.Location == undefined) && (this.conversionrate1 == 0 || this.conversionrate1 == undefined)) {
                this.Hideloading = false;
            }
            else {
                this.Hideloading = true;
            }
        }
        else {
            this.Hideloading = true;
        }
    }


    async bindOrgDropdown() {
        this.dropdownOrgData = [];
        try {
            await this.atParCommonService.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<string>;
                    this.resType = res;
                    // this.growlMessage = [];
                    this.dropdownOrgData = [];
                    this.OrggroupID = "";
                    this.orggrpID = "All";
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.orgGroups = res.DataList;
                            this.dropdownOrgData.push({ label: 'Select One', value: null });
                            if (this.orggrpID == "All") {

                                if (this.orgGroups.length > 1) {
                                    this.drpstatus = true;
                                    this.lblstatus = false;
                                    for (var i = 0; i < this.orgGroups.length; i++) {
                                        if (this.orgGroups[i].ORG_GROUP_ID != "All") {
                                            this.dropdownOrgData.push({ label: (this.orgGroups[i].ORG_GROUP_ID + ' - ' + this.orgGroups[i].ORG_GROUP_NAME.replace(/\%20/g, ' ')), value: this.orgGroups[i].ORG_GROUP_ID })
                                        }

                                    }
                                }
                                else {
                                    this.lblstatus = true;
                                    this.drpstatus = false;
                                    this.orggrpID1 = this.orgGroups[0].ORG_GROUP_ID + ' - ' + this.orgGroups[0].ORG_GROUP_NAME.replace(/\%20/g, ' ');
                                }
                            }
                            else {
                                this.lblstatus = true;
                                this.orggrpID1 = this.orgGroups[0].ORG_GROUP_ID;
                            }


                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }


                });
        }
        catch (ex) {
            //this.clientErrorMsg(ex);
        }
    }

    async bindItemIDS() {
        this.lstItemIDs = [];
        try {
            this.lstItemIDs = [];
            await this.BillOnlyItemMaintainService.GetAllBillOnlyItems(this._deviceTokenEntry)
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<string>;
                    this.resType = res;
                    // this.growlMessage = [];                 

                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.lstItemIDs = res.DataList;

                            break;
                        }
                        //case StatusType.Warn: {
                        //    this.growlMessage = [];
                        //    this.spinnerService.stop();
                        //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        //    break;
                        //}
                        //case StatusType.Error: {
                        //    this.growlMessage = [];
                        //    this.spinnerService.stop();
                        //    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        //    break;
                        //}
                        //case StatusType.Custom: {
                        //    this.growlMessage = [];
                        //    this.spinnerService.stop();
                        //    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        //    break;
                        //}
                    }


                });
        }
        catch (ex) {
            //this.clientErrorMsg(ex);
        }
    }

    async bindCostCenterDrp() {
        this.ddlCostCenter = [];
        try {
            await this.BillOnlyItemMaintainService.GetCostCenterOrgIds(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry)
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<string>;
                    this.resType = res;
                    // this.growlMessage = [];
                    this.ddlCostCenter = [];
                    /// this.OrggroupID = "";
                    // this.orggrpID = "ALL";
                    switch (res.StatType) {
                        case StatusType.Success: {
                            let datadrp = res.DataList;
                            this.ddlCostCenter.push({ label: 'Select One', value: null });


                            if (datadrp.length > 0) {
                                // this.drpstatus = true;
                                for (var i = 0; i < datadrp.length; i++) {
                                    //if (datadrp[i].COST_CENTER_CODE.toUpperCase() != "ALL") {
                                    this.ddlCostCenter.push({ label: (datadrp[i]), value: datadrp[i] })
                                    //}

                                }
                            }
                            else {
                                //this.lblstatus = true;
                                //this.orggrpID1 = this.orgGroups[0].ORG_GROUP_ID + '-' + this.orgGroups[0].ORG_GROUP_NAME;
                            }



                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }


                });
        }
        catch (ex) {
            //this.clientErrorMsg(ex);
        }
    }

    async bindddlInvBusinessUnit() {
        this.ddlInvBusinessUnit = [];
        try {
            await this.BillOnlyItemMaintainService.GetInventoryBUnits(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry)
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<string>;
                    this.resType = res;
                    // this.growlMessage = [];
                    this.ddlInvBusinessUnit = [];
                    /// this.OrggroupID = "";
                    // this.orggrpID = "ALL";
                    switch (res.StatType) {
                        case StatusType.Success: {
                            let datadrp1 = res.DataList;
                            this.ddlInvBusinessUnit.push({ label: 'Select One', value: null });


                            if (datadrp1.length > 0) {
                                //this.drpstatus = true;
                                for (var i = 0; i < datadrp1.length; i++) {
                                    //if (datadrp[i].COST_CENTER_CODE.toUpperCase() != "ALL") {
                                    this.ddlInvBusinessUnit.push({ label: (datadrp1[i]), value: datadrp1[i] })
                                    //}

                                }
                            }
                            else {
                                //this.lblstatus = true;
                                //this.orggrpID1 = this.orgGroups[0].ORG_GROUP_ID + '-' + this.orgGroups[0].ORG_GROUP_NAME;
                            }



                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }


                });
        }
        catch (ex) {
            //this.clientErrorMsg(ex);
        }
    }

    async go_Click() {
        if (this.editID == false) {
            this.growlMessage = [];
        }
        this.filtereddata = [];
        var dataitem = this.ItemID.split(" - ");
        var itemID1 = dataitem[0];
        let lblId1: string[];
        if (this.drpstatus == true) {
            var lblId = this.OrggroupID;
        }
        else {
            lblId1 = this.orggrpID1.split("-");
            lblId = lblId1[0];
        }
        if (lblId == null || lblId == "" || lblId == undefined) {
            this.grdHide = false;
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Org Group ID" });
            return;
        }
        if (this.ItemID != null || this.ItemID != "" || this.ItemID != undefined) {
            var itemID = this.ItemID;
        }
        else {
            this.ItemID = "";
        }
        if (this.Description != null || this.Description != "" || this.Description != undefined) {
            var itemDesr = this.Description;
        }
        else {
            this.Description = "";
        }
        try {
            this.spinnerService.start();
            this.grdHide = false;
            await this.BillOnlyItemMaintainService.GetBillonlyItemsDtls(itemID1, lblId, this._deviceTokenEntry[TokenEntry_Enum.DeptID].toUpperCase(), this.Description, this._deviceTokenEntry).
                catch(this.httpService.handleError).then((response: Response) => {
                    let data = response.json();


                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                if (this.editID == false) {
                                    this.growlMessage = [];
                                }

                                this.spinnerService.stop();

                                this.BindGrid = [];
                                this.grdHide = true;
                                let griddata = data.DataList;
                                this.BindGrid = griddata;
                                break;
                            }

                        case StatusType.Warn: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (exception) {
            // this.grdHide = false;
            this.spinnerService.stop();
            this.growlMessage = [];
            // this.errorMessage = "General Client Error";
            // this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.errorMessage });

        }


    }

    async Edit_click(ven: any) {
        // this.EditbindModelDataChange(ven);
        this.formname = "Edit";
        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Bill Only Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.form = true;
        this.editform = false;
        this.page = false;
        this.grdHide = false;
        this.newItem = new MT_POU_BILLONLY_ITEMS();
        this.loading = false;
        try {
            this.spinnerService.start();
            this.grdHide = false;
            await this.BillOnlyItemMaintainService.GetVendorsInfo(ven.ORG_GROUP_ID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data1 = res.json();
                    switch (data1.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage = [];

                                this.spinnerService.stop();
                                // var datagrd = this.BindGrid.filter(x => x.ITEM_ID == ven.ITEM_ID && x.ORG_GROUP_ID == ven.ORG_GROUP_ID && x.DEPT_ID == ven.DEPT_ID);
                                var datagrd = this.BindGrid;
                                if (datagrd.length > 0 || datagrd.length != 0) {


                                    //this.BindGrid = [];
                                    //this.Binddata = [];
                                    //this.grdHide = true;
                                    let griddata = data1.DataList;
                                    this.Binddata = griddata;
                                    //this.lstFilteredVendordata = [];
                                    //this.lstFilteredVendordata.push({ label: 'Select VendorID', value: null });
                                    //for (let i = 0; i < this.Binddata.length; i++) {
                                    //    let Bunitvalue = this.Binddata[i].VENDOR_ID + " - " + this.Binddata[i].VENDOR_NAME;

                                    //    this.lstFilteredVendordata.push({ label: (this.Binddata[i].VENDOR_ID + " - " + this.Binddata[i].VENDOR_NAME), value: this.Binddata[i].VENDOR_ID })
                                    //}

                                    if (griddata.length > 0 || griddata.length != 0) {


                                        let data = griddata.filter(x => x.VENDOR_ID == ven.VENDOR_ID);

                                        // this.BindGrid = griddata;
                                        this.newItem.ORG_GROUP_ID = ven.ORG_GROUP_ID;
                                        this.newItem.ITEM_ID = ven.ITEM_ID;
                                        this.newItem.DESCRIPTION = ven.DESCRIPTION;
                                        this.newItem.DEPT_ID = ven.DEPT_ID;
                                        if (data.length > 0) {
                                            if (data.length > 0) {
                                                if (data[0].VENDOR_ID != null || data[0].VENDOR_ID != "") {


                                                    this.newItem.VENDOR_ID = data[0].VENDOR_ID + " - " + data[0].VENDOR_NAME;
                                                }
                                                else {
                                                    this.newItem.VENDOR_ID = data[0].VENDOR_ID;
                                                }
                                            }
                                        }
                                        else {
                                            this.newItem.VENDOR_ID = ven.VENDOR_ID;
                                        }


                                        this.newItem.VEND_ITEM_ID = ven.VEND_ITEM_ID;
                                        // this.newItem.VEND_ITEM_ID = ""

                                        this.newItem.MANUFACTURER = ven.MANUFACTURER;
                                        this.newItem.MFG_ITEM_ID = ven.MFG_ITEM_ID;
                                        this.newItem.UOM = ven.UOM;
                                        // this.newItem.UOM ="E A"
                                        this.newItem.UPC_ID = ven.UPC_ID;
                                        this.newItem.ITEM_PRICE = ven.ITEM_PRICE;

                                        this.newItem.LOT_ID = ven.LOT_ID;
                                        this.newItem.SERIAL_ID = ven.SERIAL_ID;
                                        this.newItem.CATALOG_FLG = ven.CATALOG_FLG;

                                        this.newItem.EXPIRY_DATE = ven.EXPIRY_DATE == null ? "" : ven.EXPIRY_DATE;
                                        if (this.newItem.EXPIRY_DATE != "") {
                                            let changeDate = this.newItem.EXPIRY_DATE;
                                            var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                            var date = new Date(dateStr);
                                            this.newItem.EXPIRY_DATE = date.toLocaleString();
                                            this.newItem.EXPIRY_DATE = this.newItem.EXPIRY_DATE.replace(',', ' ');
                                        }


                                        this.newItem.LAST_UPDATE_USER = this._deviceTokenEntry[TokenEntry_Enum.UserID];
                                        this.newItem.GTIN = ven.GTIN;

                                        //if (this.newItem.VEND_ITEM_ID.match(/\s/g)) {
                                        //    this.loading = true;
                                        //    break;
                                        //}
                                        //if (this.newItem.UOM.match(/\s/g)) {
                                        //    this.loading = true;
                                        //    break;
                                        //}


                                        if (this.newItem.VEND_ITEM_ID === "" || this.newItem.UOM === "") {
                                            this.loading = true;
                                            break;
                                        }
                                        if (this.newItem.VEND_ITEM_ID !== "" || this.newItem.VEND_ITEM_ID != null) {
                                            if (/\s/g.test(this.newItem.VEND_ITEM_ID)) {
                                                // this.lblstatus1 = true;
                                                this.loading = true;
                                                break;
                                            }
                                        }
                                        if (this.newItem.UOM !== "" || this.newItem.UOM != null) {
                                            if (/\s/g.test(this.newItem.UOM)) {
                                                // this.lblstatus2 = true;
                                                this.loading = true;
                                                break;
                                            }
                                        }
                                        break;
                                    }

                                }
                            }

                        case StatusType.Warn: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data1.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data1.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data1.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (exception) {
            //  this.grdHide = false;
            this.spinnerService.stop();
            this.growlMessage = [];
            // this.errorMessage = "General Client Error";
            //  this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.errorMessage });

        }
    }

    async Convert(ven1: any) {

        this.formname = "convert";
        this.breadCrumbMenu.SUB_MENU_NAME = 'Convert Bill Only Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.form = false;
        this.editform = false;
        this.grdHide = false
        this.page = false;
        this.pop = false;
        this.table = true;
        this.Hideloading = false;
        try {
            this.spinnerService.start();
            // this.grdHide = false;
            await this.BillOnlyItemMaintainService.GetLocations(15, ven1.ORG_GROUP_ID, this._deviceTokenEntry[TokenEntry_Enum.UserID], ven1.DEPT_ID, this._deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<VM_ATPAR_POU_LOCATIONS>;
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage = [];
                                this.spinnerService.stop();
                                // this.BindGrid = [];
                                let data2 = this.BindGrid.filter(x => x.ITEM_ID == ven1.ITEM_ID);
                                this.grdHide = false;
                                let griddata = response.DataList;
                                //for (let i = 0; i < griddata.length; i++) {
                                //    griddata[i].STATUS_NAME = "status" + i;
                                //}
                                this.BindConvertGrid = griddata;
                                this.newConvertItem.ITEM_ID = data2[0].ITEM_ID;
                                this.newConvertItem.ORG_GROUP_ID = data2[0].ORG_GROUP_ID;
                                this.newConvertItem.DEPT_ID = data2[0].DEPT_ID;
                                this.newConvertItem.USER_ID = this._deviceTokenEntry[TokenEntry_Enum.UserID];
                                this.newConvertItem.KEYVALUE = "ORG_GROUP_ID=" + data2[0].ORG_GROUP_ID + " AND DEPT_ID= " + ven1.DEPT_ID + " AND ITEM_ID= " + ven1.ITEM_ID;
                                this.newConvertItem.DESCRIPTION = data2[0].DESCRIPTION;
                                this.newConvertItem.VENDOR_ID = data2[0].VENDOR_ID;
                                this.newConvertItem.MANUFACTURER = data2[0].MANUFACTURER;
                                this.newConvertItem.MFG_ITEM_ID = data2[0].MFG_ITEM_ID;
                                this.newConvertItem.VEND_ITEM_ID = data2[0].VEND_ITEM_ID;
                                this.newConvertItem.UOM_ISSUE = data2[0].UOM;
                                this.newConvertItem.UOM_PROCUREMENT = data2[0].UOM;
                                this.newConvertItem.CONV_FACTOR = 1;
                                this.newConvertItem.PRICE = data2[0].ITEM_PRICE;
                                this.newConvertItem.UPC_ID = data2[0].UPC_ID;
                                this.newConvertItem.STATUS = "";
                                this.newConvertItem.LOT_CONTROLLED = null;
                                this.newConvertItem.SERIAL_CONTROLLED = null;
                                this.newConvertItem.CHARGE_CODE = "";
                                this.newConvertItem.GTIN = data2[0].GTIN;
                                this.newConvertItem.REPLENISHMENT_TYPE = "";
                                this.newConvertItem.PAR_LOC_ID = "";
                                this.newConvertItem.BIN = "";
                                this.newConvertItem.OPTIMAL_QTY = null;
                                this.newConvertItem.COUNT_ORDER = null;
                                this.newConvertItem.FILL_KILL_FLAG = "";
                                this.newConvertItem.COUNT_REQUIRED = null;
                                this.newConvertItem.MAX_QTY = null;
                                this.newConvertItem.FOQ_QTY = null;
                                this.newConvertItem.BUSINESS_UNIT = "";
                                this.newConvertItem.COST_CENTER = "";
                                this.newConvertItem.REQUISITION_TYPE = "";
                                this.newConvertItem.ORDERING_TYPE = "";
                                this.newConvertItem.USER_FIELD_1 = "";
                                this.newConvertItem.PAR_UOM = "";
                                this.newConvertItem.CONV_RT_PAR_UOM = null;
                                this.newConvertItem.EXPIRY_DATE = data2[0].EXPIRY_DATE;
                                this.newConvertItem.UOM = data2[0].UOM;
                                this.newConvertItem.PAR_UOM = "";
                                this.newConvertItem.Compartment = "";


                                // this.newConvertItem.CONV_FACTOR = null;
                                // this.newConvertItem.STATUS = "Active";
                                // if (this.newConvertItem.STATUS == "Active") {
                                this.newConvertItem.ACTIVEFLAG = true;
                                this.newConvertItem.INACTIVEFLAG = false;
                                this.newConvertItem.PENDINGFLAG = false;
                                // }
                                this.ddlFillKillFlag = [];
                                this.ddlReplenishment = [];
                                this.ddlOrderingType = [];
                                this.ddlRequisitionType = [];

                                this.bindddlInvBusinessUnit();
                                this.bindCostCenterDrp();
                                this.BindFilKillFlags();
                                this.BindReplenishment();
                                this.BindOrderingType();
                                this.BindRequisitionType();
                                if (this.newConvertItem.Compartment === "" || this.newConvertItem.OPTIMAL_QTY == null || this.newConvertItem.UOM_PROCUREMENT === "" || this.newConvertItem.UOM_ISSUE === "" || this.newConvertItem.CONV_FACTOR == null) {
                                    this.Hideloading = true;
                                    break;

                                }




                                if (this.newConvertItem.Compartment.match(/\s/g) || this.newConvertItem.UOM_PROCUREMENT.match(/\s/g) || this.newConvertItem.PAR_UOM.match(/\s/g) || this.newConvertItem.UOM_ISSUE.match(/\s/g) || this.newConvertItem.CHARGE_CODE.match(/\s/g)) {
                                    this.Hideloading = true;
                                    break;
                                }
                                //if (this.newConvertItem.UOM_PROCUREMENT.match(/\s/g)) {
                                //    this.Hideloading = true;
                                //    return;
                                //}
                                //if (this.newConvertItem.PAR_UOM.match(/\s/g)) {
                                //    this.Hideloading = true;
                                //    return;
                                //}
                                //if (this.newConvertItem.UOM_ISSUE.match(/\s/g)) {
                                //    this.Hideloading = true;
                                //    return;
                                //}

                                //if (this.newConvertItem.CHARGE_CODE.match(/\s/g)) {
                                //    this.Hideloading = true;
                                //    return;
                                //}
                                // this.grdHide = false;
                                break;
                            }

                        case StatusType.Warn: {


                            let data2 = this.BindGrid.filter(x => x.ITEM_ID == ven1.ITEM_ID);
                            this.newConvertItem.ITEM_ID = data2[0].ITEM_ID;
                            this.newConvertItem.DESCRIPTION = data2[0].DESCRIPTION;
                            this.newConvertItem.UOM = data2[0].UOM;
                            this.newConvertItem.UOM_ISSUE = data2[0].UOM;
                            this.newConvertItem.MAX_QTY = null;
                            this.newConvertItem.FOQ_QTY = null;
                            this.newConvertItem.OPTIMAL_QTY = null;
                            this.newConvertItem.CHARGE_CODE = "";
                            this.newConvertItem.COUNT_ORDER = null;
                            this.newConvertItem.USER_FIELD_1 = "";
                            this.newConvertItem.CONV_RT_PAR_UOM = null;
                            this.newConvertItem.Compartment = "";
                            this.newConvertItem.FILL_KILL_FLAG = "";
                            this.newConvertItem.REPLENISHMENT_TYPE = "";
                            this.newConvertItem.COST_CENTER = "";
                            this.newConvertItem.BUSINESS_UNIT = "";
                            this.newConvertItem.REQUISITION_TYPE = "";
                            this.newConvertItem.ORDERING_TYPE = "";
                            this.newConvertItem.COUNT_REQUIRED = null;
                            this.newConvertItem.LOT_CONTROLLED = null;
                            this.newConvertItem.SERIAL_CONTROLLED = null;
                            this.newConvertItem.STATUSVALUE = "";
                            this.newConvertItem.MFG_ITEM_ID = "";
                            this.newConvertItem.CONV_FACTOR = 1;

                            this.ddlFillKillFlag = [];
                            this.ddlReplenishment = [];
                            this.ddlOrderingType = [];
                            this.ddlRequisitionType = [];

                            this.bindddlInvBusinessUnit();
                            this.bindCostCenterDrp();
                            this.BindFilKillFlags();
                            this.BindReplenishment();
                            this.BindOrderingType();
                            this.BindRequisitionType();
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            if (this.newConvertItem.Compartment === "" || this.newConvertItem.OPTIMAL_QTY == null || this.newConvertItem.UOM_PROCUREMENT === "" || this.newConvertItem.UOM_ISSUE === "" || this.newConvertItem.CONV_FACTOR == null) {
                                this.Hideloading = true;
                                break;

                            }
                            if (this.newConvertItem.Compartment.match(/\s/g) || this.newConvertItem.UOM_PROCUREMENT.match(/\s/g) || this.newConvertItem.PAR_UOM.match(/\s/g) || this.newConvertItem.UOM_ISSUE.match(/\s/g) || this.newConvertItem.CHARGE_CODE.match(/\s/g)) {
                                this.Hideloading = true;
                                break;
                            }
                            //if (this.newConvertItem.OPTIMAL_QTY == null) {
                            //    this.Hideloading = true;
                            //    break;

                            //}
                            //if (this.newConvertItem.UOM_PROCUREMENT === "") {
                            //    this.Hideloading = true;
                            //    break;

                            //}
                            //if (this.newConvertItem.UOM_ISSUE === "") {
                            //    this.Hideloading = true;
                            //    break;
                            //}
                            //if (this.newConvertItem.CONV_FACTOR == null) {
                            //    this.Hideloading = true;
                            //    break;
                            //}
                            //  this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.Hideloading = true;
                            break;
                        }
                        case StatusType.Error: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (exception) {
            //this.grdHide = false;
            this.spinnerService.stop();
            this.growlMessage = [];
            //this.errorMessage = "General Client Error";
            //this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.errorMessage });

        }
    }

    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }

    btn_Update() {
        this.growlMessage = [];
        this.updatedata = [];
        this.editform = false;
        let data: string[];

        if (this.newItem != null) {


            if (this.newItem.VEND_ITEM_ID == null || this.newItem.VEND_ITEM_ID === "") {


                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Vendor Item ID"
                });
                return;

            }
            if (this.newItem.UOM == null || this.newItem.UOM === "") {


                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM"
                });
                return;

            }
            if (this.newItem.VENDOR_ID == null || this.newItem.VENDOR_ID === "") {


                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter VendorID"
                });
                return;

            }
            //this.newItem.VEND_ITEM_ID = this.newItem.VEND_ITEM_ID.replace(/\s/g, '');

            //if (this.newItem.VEND_ITEM_ID.replace(/\s/g, ''))


            //if (this.newItem.VEND_ITEM_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Vendor Item ID"
            //    });
            //    return;
            //}
            //if (this.newItem.MFG_ITEM_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Manufacturer Item ID"
            //    });
            //    return;
            //}
            //if (this.newItem.UOM.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid UOM"
            //    });
            //    return;
            //}
            //if (this.newItem.UPC_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid UPC ID"
            //    });
            //    return;
            //}

            //if (this.newItem.LOT_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Lot ID"
            //    });
            //    return;
            //}

            //if (this.newItem.SERIAL_ID.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Serial ID"
            //    });
            //    return;
            //}
            //if (this.newItem.GTIN.match(/\s/g)) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid GTIN"
            //    });
            //    return;
            //}


            if (/\s/g.test(this.newItem.VEND_ITEM_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Vendor Item ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.MFG_ITEM_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Manufacturer Item ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.UOM)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid UOM"
                });
                return;
            }
            if (/\s/g.test(this.newItem.UPC_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid UPC ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.LOT_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Lot ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.SERIAL_ID)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Serial ID"
                });
                return;
            }
            if (/\s/g.test(this.newItem.GTIN)) {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid GTIN"
                });
                return;
            }



            //else if (this.filtereddata.length == 0) {
            //    this.growlMessage = [];
            //    this.growlMessage.push({
            //        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select the Correct VendorID"
            //    });
            //    return;
            //}
            else {
                data = this.newItem.VENDOR_ID.trim().split(" - ");
                this.newItem.VENDOR_ID = data[0];
                //this.newItem.VENDOR_ID = data[0];
                //let dd = this.newItem.VENDOR_ID.trim();
                //this.newItem.VENDOR_ID = dd;

                let data1 = this.newItem;
                this.updatedata.push(data1);
            }

        }

        try {

            this.BillOnlyItemMaintainService.UpdateBillonlyItemsDtls(this.updatedata, this._deviceTokenEntry).subscribe(async (res: Response) => {
                this.growlMessage = [];
                this.spinnerService.stop();
                let data = res.json() as AtParWebApiResponse<any>;
                switch (data.StatType) {
                    case StatusType.Success:
                        {
                            // this.dropdownOrgData = [];
                            this.form = true;
                            this.editform = false;
                            this.page = false;

                            this.lstFilteredVendordata = [];
                            this.lstFilteredVendordata.push({ label: 'Select VendorID', value: null });
                            this.editID = true;
                            //   this.bindOrgDropdown();
                            await this.go_Click();
                            this.grdHide = false;
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Item " + this.newItem.ITEM_ID + " Updated Successfully"
                            });
                            break;
                        }
                    case StatusType.Error:
                        {
                            // to do where do we show error message
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                    case StatusType.Warn:
                        {
                            // to do
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                this.atParConstant.scrollToTop();

            });

        }
        catch (ex) {

        }

    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.editID = false;
        //   this.bindOrgDropdown();
        this.grdHide = false;
        //this.dataservice.getpouBillonlyitem().then(countries => { this.sales = countries; });
    }

    closeConvert() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.editID = false;
        // this.bindOrgDropdown();
        // this.bindOrgDropdown();
        this.grdHide = false;
        //this.dataservice.getpouBillonlyitem().then(countries => { this.sales = countries; });
    }

    grddata(ven3: any) {
        this.growlMessage = [];
        if (ven3 != null || ven3 != undefined) {
            let dd = ven3;
            this.GetconvertGrdItem.push(ven3);
            return;
        }
        else {
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please allocate at least one AtPar Par Location to continue"
            });
            return;
        }


    }

    ConvertSave_clcik() {
        this.growlMessage = [];
        let getconvertdata = this.GetconvertGrdItem;
        var adata112 = this.selectedScreenDisplayId;
        var t1 = this.selectedFlagID;
        var t2 = this.selectedScreenId;
        if (getconvertdata == null || getconvertdata == undefined || getconvertdata.length == 0) {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please allocate at least one AtPar Par Location to continue"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        let parrate: any;
        parrate = this.newConvertItem.CONV_FACTOR;
        this.newConvertItem.CONV_RT_PAR_UOM = parrate;
        let parUom = this.newConvertItem.PAR_UOM;
        if (parUom != null || parUom != "") {
            if (parrate == null || parrate == "") {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Par Conversion Rate"
                });
                this.atParConstant.scrollToTop();
                return;
            }
        }
        else if (parrate != null || parrate != "") {
            if (parUom == null || parUom == "") {
                this.growlMessage = [];
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Par UOM"
                });
                this.atParConstant.scrollToTop();
                return;
            }
        }
        else if (parrate == null || parrate == "") {
            if (parUom == null || parUom == "") {
                this.newConvertItem.CONV_RT_PAR_UOM = 1;
                return;
            }
        }
        let data22 = this.newConvertItem;
        if (data22.Compartment == null || data22.Compartment == "") {
            //  this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Compartment ID"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.OPTIMAL_QTY == null || data22.OPTIMAL_QTY == undefined) {
            //  this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Opt QTY"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.ORDERING_TYPE == null || data22.ORDERING_TYPE == "") {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Ordering Type"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.UOM_PROCUREMENT == null || data22.UOM_PROCUREMENT == "") {
            //  this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Unit Of Procurement"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.UOM_ISSUE == null || data22.UOM_ISSUE == "") {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Unit Of Issue"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.CONV_RT_PAR_UOM == null || data22.CONV_RT_PAR_UOM == undefined) {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Conversion Rate"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.REPLENISHMENT_TYPE == null || data22.REPLENISHMENT_TYPE == "") {
            //this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Replenishment Type"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.COST_CENTER == null || data22.COST_CENTER == "") {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Cost Center"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.REQUISITION_TYPE == null || data22.REQUISITION_TYPE == "") {
            // this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Requisition Type"
            });
            this.atParConstant.scrollToTop();
            return;
        }




        if (data22.Compartment.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Compartment"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.UOM_PROCUREMENT.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid UOM Procurement"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.PAR_UOM.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid UOM(Par)"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        if (data22.UOM_ISSUE.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid UPC Issue"
            });
            this.atParConstant.scrollToTop();
            return;
        }

        if (data22.CHARGE_CODE.match(/\s/g)) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Invalid Charge Code"
            });
            this.atParConstant.scrollToTop();
            return;
        }
        //if (data22.ACTIVEFLAG == true) {
        //    data22.STATUS = "Y";
        //}
        //else if (data22.INACTIVEFLAG == true) {
        //    data22.STATUS = "N";
        //}
        //else {
        //    data22.STATUS = "P";
        //}
        // data22.STATUS = "Y";
        if (data22.CONTROLSTATUS == true) {
            data22.SERIAL_CONTROLLED = "Y";
        }
        else {
            data22.SERIAL_CONTROLLED = "N";
        }
        if (data22.LOTSTATUS == true) {
            data22.LOT_CONTROLLED = "Y";
        }
        else {
            data22.LOT_CONTROLLED = "N";
        }
        if (data22.COUNTSTATUS == true) {
            data22.COUNT_REQUIRED = "Y";
        }
        else {
            data22.COUNT_REQUIRED = "N";
        }
        data22.BUSINESS_UNIT = getconvertdata[0].BUSINESS_UNIT;
        data22.PAR_LOC_ID = getconvertdata[0].LOCATION;
        if (data22 != null) {
            this.updateConvertdata.push(data22);
        }
        //for (let j = 0; j < this.updateConvertdata.length; j++) {
        //    this.updateConvertdata[j].Compartment=
        //}
        try {

            this.BillOnlyItemMaintainService.ConvertBillonlyItem(this.updateConvertdata, this._deviceTokenEntry).subscribe((res: Response) => {
                this.growlMessage = [];
                this.spinnerService.stop();
                let data = res.json();
                switch (data.StatType) {
                    case StatusType.Success:
                        {
                            this.dropdownOrgData = [];
                            this.form = false;
                            this.editform = false;
                            this.page = true;
                            this.grdHide = false;
                            this.table = false;
                            this.editID = true;
                            // this.bindOrgDropdown();
                            this.go_Click();
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Item " + this.newConvertItem.ITEM_ID + " Converted Successfully"
                            });
                            break;
                        }
                    case StatusType.Error:
                        {
                            // to do where do we show error message
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                    case StatusType.Warn:
                        {
                            // to do
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                this.atParConstant.scrollToTop();

            });

        }
        catch (ex) {

        }

    }

    onfocusToCalendar(e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        } else {
            this.minDateValue2 = this.date1;
        }
    }

    onfocusFromCalendar(e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    }

    BindFilKillFlags() {
        this.ddlFillKillFlag.push({ label: 'Select One', value: "" });
        this.ddlFillKillFlag.push({ label: "Fill", value: "F" })
        this.ddlFillKillFlag.push({ label: "Kill", value: "K" })

    }

    async changeStatus(statusType: string) {
        this.spinnerService.start();
        if (statusType == "Active") {
            this.newConvertItem.ACTIVEFLAG = true;
            this.newConvertItem.INACTIVEFLAG = false;
            this.newConvertItem.PENDINGFLAG = false;
            this.newConvertItem.STATUS = "Y";
        }
        else if (statusType == "InActive") {
            this.newConvertItem.ACTIVEFLAG = false;
            this.newConvertItem.INACTIVEFLAG = true;
            this.newConvertItem.PENDINGFLAG = false;
            this.newConvertItem.STATUS = "N";
        }
        else if (statusType == "Pending") {
            this.newConvertItem.ACTIVEFLAG = false;
            this.newConvertItem.INACTIVEFLAG = false;
            this.newConvertItem.PENDINGFLAG = true;
            this.newConvertItem.STATUS = "P";
        }
        this.spinnerService.stop();
    }

    BindReplenishment() {
        this.ddlReplenishment.push({ label: 'Select One', value: "" });
        this.ddlReplenishment.push({ label: "Stock", value: "1" })
        this.ddlReplenishment.push({ label: "Nonstock", value: "2" })
        this.ddlReplenishment.push({ label: "Stockless", value: "3" })
        this.ddlReplenishment.push({ label: "Consignment", value: "4" })

    }

    BindOrderingType() {
        this.ddlOrderingType.push({ label: 'Select One', value: "" });
        this.ddlOrderingType.push({ label: "Par", value: "01" })
        this.ddlOrderingType.push({ label: "Foq", value: "02" })
        this.ddlOrderingType.push({ label: "Min/Max", value: "03" })
        this.ddlOrderingType.push({ label: "Issue", value: "04" })

    }

    BindRequisitionType() {
        this.ddlRequisitionType.push({ label: 'Select One', value: "" });
        this.ddlRequisitionType.push({ label: "Issue", value: "I" })
        this.ddlRequisitionType.push({ label: "Transfer", value: "T" })


    }

    async fillBUnitsAuto(event) {

        this.lstFilteredVendors = [];
        let query = event.query;
        try {

            let data32 = this.Binddata;
            this.lstVendors = data32;
            this.lstFilteredVendors = this.filterBusinessUnits(query, this.lstVendors)

        }
        catch (ex) {
            //  this.clientErrorMsg(ex);
        }
    }

    filterBusinessUnits(query, businessunits: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < businessunits.length; i++) {
                let Bunitvalue = businessunits[i].VENDOR_ID + " - " + businessunits[i].VENDOR_NAME;
                filtered.push(Bunitvalue);
            }
            this.filtereddata = filtered;
        } else {
            if (query.length >= 0) {
                for (let i = 0; i < businessunits.length; i++) {
                    let Bunitvalue = businessunits[i].VENDOR_ID + " - " + businessunits[i].VENDOR_NAME;
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
                this.filtereddata = filtered;
            }
        }

        if (this.filtereddata.length == 0) {
            this.newItem.VENDOR_ID = "";
            this.loading = true;
        }
        else {
            this.loading = false;
        }
        return filtered;
    }


    async fillItemIDsAuto(event) {

        this.lstFilteredItemIds = [];
        let query = event.query;
        try {

            let dataIDs = this.lstItemIDs;
            this.lstItems = dataIDs;
            this.lstFilteredItemIds = this.filterBillonlyItems(query, this.lstItems)

        }
        catch (ex) {
            //  this.clientErrorMsg(ex);
        }
    }
    filterBillonlyItems(query, ItemID: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < ItemID.length; i++) {
                let Bunitvalue = ItemID[i].ITEM_ID + " - " + ItemID[i].DESCRIPTION;
                filtered.push(Bunitvalue);
            }
            this.filtereditemdata = filtered;
        } else {
            if (query.length >= 0) {
                for (let i = 0; i < ItemID.length; i++) {
                    let Bunitvalue = ItemID[i].ITEM_ID + " - " + ItemID[i].DESCRIPTION;
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
                this.filtereditemdata = filtered;
            }
        }

        if (this.filtereditemdata.length == 0) {
            // this.ITEM_ID = "";
            this.loading = true;
        }
        else {
            this.loading = false;
        }
        return filtered;
    }

    //drpchnage() {
    //    var dadat = this.OrggroupID;
    //    alert(dadat);
    //    // fetch remote data from here 
    //    // And reassign the 'remoteData' which is binded to 'searchResults' property. 
    //}

    //check(username) {
    //    if (username.match(/\s/g)) {
    //        alert('There is a space! The username is "' + username + '"');
    //    } else {
    //        alert('No space for ' + username);
    //    }
    //}
}