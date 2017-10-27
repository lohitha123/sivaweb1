import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy,Inject, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { Http, Response } from "@angular/http";
import { PAR_MNGT_ITEM } from "../../app/Entities/PAR_MNGT_ITEM";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { Message } from './../components/common/api';
import { SetupVendorServices } from "../../app/Init/atpar-setup-vendors.services";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Shared/HttpService';
import { SelectItem } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { ModeEnum } from '../Shared/AtParEnums'
import { ATPAR_VALIDATION_RULES } from '../entities/atpar_validation_rules';
import { CustomValidations } from '../common/validations/customvalidation';
import { StatusType } from './../Shared/AtParEnums';
import { SetupItemsServices } from "../../app/Init/atpar-setup-items-service";
import { AtParConstants } from '../Shared/AtParConstants';
import { Menus } from '../AtPar/Menus/routepath';
import { DOCUMENT } from '@angular/platform-browser';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-setup-items-addmodify.component.html',
    providers: [SetupItemsServices]

})
export class SetupModifyItemsComponent {
    _deviceTokenEntry: string[] = [];
    msgs: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnStatusMsg: boolean = false;
    blnShowOrgGroupLabel: boolean = false;
    orgGrpId: string = "";
    blnShowOrgGroupDD: boolean = false;
    lstOrgGroups: SelectItem[] = [];
    vendorSearch: string;
    lstVendordata: SelectItem[] = [];
    lstReplenishment: SelectItem[] = [];
    pharma: boolean;
    submitButtonTitle: string;
    mode: string;
    statusMesssage: string;
    public newItem = new PAR_MNGT_ITEM();
    lblShowItemId: boolean;
    txtShowItemId: boolean;
    appId: number;
    disableButton : boolean;
    buttoniconstatus: boolean;
    breadCrumbMenu: Menus;
    bindSymbol: string;

    //variables for validation
    txtItemIDStatus: number;
    txtLeadTimeStatus: number;
    txtShortDescStatus: number;
    txtLongDescStatus: number;
    txtCustItemIdStatus: number;
    txtManufacturerStatus: number;
    txtMgfItemIdStatus: number;
    txtVendItemIdStatus: number;
    txtUomProcurementStatus: number;
    txtUomStatus: number;
    txtUpcIdstatus: number;
    txtUomIssueStatus: number;
    txtGtinStatus: number;
    txtItemPriceStatus: number;
    txtConvRateProcStatus: number;
    txtParUomStatus: number;
    txtChargeCodeStatus: number;
    txtCustItemDescStatus: number;
    txtItemCtgryStatus: number;
    txtUserField1Status: number;
    txtUserField2Status: number;
    txtStrengthStatus: number;
    txtDosageStatus: number;
    txtCiIndexstatus: number;
    ddlReplTypeStatus: number;
    ddlOrgGpIDStatus: number;
    ddlVenIDStatus: number;
    blnstatus: boolean = false;

    public constructor(

        private setupItemServices: SetupItemsServices,
        private route: ActivatedRoute,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService,
        @Inject(DOCUMENT) private document,
        public router: Router,
    ) {
        this.breadCrumbMenu = new Menus();
    }
    async ngOnInit() {
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.spinnerService.start();
        this.lstVendordata = [];

        this.route.queryParams.subscribe(params => {
            this.mode = params["mode"];
            this.appId = params["appId"];
        });

        if (this.mode == ModeEnum.Edit.toString()) {
            this.blnShowOrgGroupLabel = true;
            this.blnShowOrgGroupDD = false;
            this.blnstatus = true;
            this.submitButtonTitle = "Update";
            this.bindSymbol="check"
            this.newItem = this.atParSharedDataService.storage;
            this.lblShowItemId = true;
            this.disableButton = false;
            this.buttoniconstatus = false;

            this.txtShowItemId = false;
            this.newItem.ITEM_ID.toString();
            this.newItem.LEAD_TIME.toString();
            this.newItem.SHORT_DESCR;
            this.newItem.LONG_DESCR;
            this.newItem.VENDOR_ID = this.newItem.VENDOR_ID;
            this.newItem.ORG_GROUP_ID = this.newItem.ORG_GROUP_ID.trim();
            this.newItem.MANUFACTURER.toString();
            this.newItem.MFG_ITEM_ID.toString();
            this.newItem.VEND_ITEM_ID;
            this.newItem.CUST_ITEM_ID.toString();
            this.newItem.UNIT_OF_PROCUREMENT;
            this.newItem.UNIT_OF_ISSUE.toString();
            this.newItem.UPC_CODE;
            this.newItem.GTIN.toString();
            this.newItem.ITEM_PRICE.toString();
            if (this.newItem.CONV_FACTOR != null) {
                this.newItem.CONV_FACTOR.toString();
            }
            if (this.newItem.PAR_UOM != null) {
                this.newItem.PAR_UOM.toString();
            }
            if (this.newItem.CONV_RATE_PAR_UOM != null) {
                this.newItem.CONV_RATE_PAR_UOM.toString();
            }
            if (this.newItem.LOT_CONTROLLED.toString() == "Y") {
                this.newItem.LOT_CONTROLLED_STATUS = true;
            }
            else {
                this.newItem.LOT_CONTROLLED_STATUS = false;
            }
            if (this.newItem.SERIAL_CONTROLLED.toString() == "Y") {
                this.newItem.SERIAL_CONTROLLED_STATUS = true;
            }
            else {
                this.newItem.SERIAL_CONTROLLED_STATUS = false;
            }
            if (this.newItem.IMPLANT_FLAG.toString() == "Y") {
                this.newItem.IMPLANT_FLAG_STATUS = true;
            }
            else {
                this.newItem.IMPLANT_FLAG_STATUS = false;
            }
            this.newItem.CHARGE_CODE;
            if (this.newItem.LATEX_FREE == 1) {
                this.newItem.LATEX_FREE_STATUS = true;
            }
            else {
                this.newItem.LATEX_FREE_STATUS = false;
            }
            this.newItem.CUST_ITEM_DESCR;
            this.newItem.ITEM_CATEGORY;
            this.newItem.USER_FIELD_1;
            this.newItem.USER_FIELD_2;
            if (this.newItem.PHARMACY_FLG == 1) {
                this.pharma = true;
                this.newItem.PHARMACY_FLG_STATUS = true;
            }
            else {
                this.pharma = false;
                this.newItem.PHARMACY_FLG_STATUS = false;
            }
            if (this.newItem.SUBSTITUTE_ITEM_FLG == 1) {
                this.newItem.SUBSTITUTE_ITEM_FLG_STATUS = true;
            }
            else {
                this.newItem.SUBSTITUTE_ITEM_FLG_STATUS = false;
            }
            if (this.newItem.EVERIFY_FLG == 1) {
                this.newItem.EVERIFY_FLG_STATUS = true;
            }
            else {
                this.newItem.EVERIFY_FLG_STATUS = false;
            }

            if (this.newItem.DOSAGE != null) {
                this.newItem.DOSAGE = this.newItem.DOSAGE.toString();
            }

            if (this.newItem.STRENGTH != null) {
                this.newItem.STRENGTH = this.newItem.STRENGTH.toString();
            }
            this.orgGrpId = this.newItem.ORG_GROUP_ID + " - " + this.newItem.ORG_GROUP_NAME;
        }
        else if (this.mode == ModeEnum.Add.toString()) {
            this.blnstatus = false;
            this.buttoniconstatus = true;
            this.submitButtonTitle = "Save";
            this.bindSymbol = "floppy-o"
            this.lblShowItemId = false;
            this.txtShowItemId = true;
            this.disableButton = true;
            try {
                await this.setupItemServices.getLatestItemId(this.appId)
                    .forEach(resp => {
                        this.spinnerService.getEvent(SpinnerSentEvent).publish(false);
                        switch (resp.StatType) {
                            case StatusType.Success:
                                {
                                    this.newItem.ITEM_ID = resp.DataVariable;
                                    this.spinnerService.stop();
                                    break;
                                }
                            case StatusType.Error:
                                {
                                    this.statusMesssage = resp.StatusMessage;
                                    this.spinnerService.stop();
                                    break;
                                }
                            case StatusType.Warn:
                                {
                                    this.statusMesssage = resp.StatusMessage;
                                    this.spinnerService.stop();
                                    break;
                                }
                            case StatusType.Custom:
                                {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                }
                        }
                    });
            }
            catch (ex) {
                this.clientErrorMsg(ex, "ngOnInit");
            }
        }

        await this.BindOrgGroups();
        this.BindReplenishment();
        if (this.mode == ModeEnum.Add.toString()) {
            if (this.blnShowOrgGroupDD == false && this.blnShowOrgGroupLabel == true) {
                document.getElementById('txtItemId').focus();
            }

        }
        else if (this.mode == ModeEnum.Edit.toString()) {
            if (this.blnShowOrgGroupDD == false && this.blnShowOrgGroupLabel == true && this.lblShowItemId == true) {
                document.getElementById('txtLeadTime').focus();
            }
        }

    }

    async BindOrgGroups() {
        try {
            await this.setupItemServices.getOrgGroupDetails(this._deviceTokenEntry)
                .forEach(resp => {
                    this.spinnerService.start();
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                this.orgGroupData = resp.DataList;
                                this.blnStatusMsg = false;

                                if (this.orgGroupData.length == 1) {

                                    this.blnShowOrgGroupLabel = true;
                                    this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + "   -   " + this.orgGroupData[0].ORG_GROUP_NAME;
                                    this.newItem.ORG_GROUP_ID = this.orgGrpId;
                                    this.SetVendorsFromOrgGrpId();
                                    this.spinnerService.stop();
                                    break;

                                }
                                else if (this.orgGroupData.length > 1) {
                                    if (this.mode == ModeEnum.Add.toString()) {
                                        this.blnShowOrgGroupDD = true;

                                    }
                                    else if (this.mode == ModeEnum.Edit.toString()) {
                                        this.blnShowOrgGroupDD = false;
                                    }

                                    this.lstOrgGroups.push({
                                        label: "Select One",
                                        value: ""
                                    })
                                    this.lstVendordata = [];
                                    this.lstVendordata.push({
                                        label: "Select One",
                                        value: ""
                                    })
                                    if (this.blnstatus == true) {
                                        this.SetVendorsFromOrgGrpIdForEdit();
                                    }

                                    for (var i = 0; i < this.orgGroupData.length; i++) {
                                        if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                            this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                        }
                                    }


                                    this.spinnerService.stop();
                                }
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });

                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });

                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindOrgGroups");
        }
    }

    BindVendors() {
        try {
            this.spinnerService.start();
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], '', this.vendorSearch.trim())
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].STATUS == 0) {
                                        this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + "-" + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();

                                break;
                            }
                        case StatusType.Warn:
                            {
                                if (resp.DataList.length == 0) {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found for Vendors' });
                                }
                                else {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                }
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindVendors");
        }
    }

    SetVendorsFromOrgGrpId() {
        this.lstVendordata = [];
        this.lstVendordata.push({ label: "select one", value: "" })
        try {
            this.spinnerService.start();
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this.orgGrpId.split("-")[0], '', this.vendorSearch.trim())
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].STATUS == 0) {
                                        this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + "-" + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();

                                break;
                            }
                        case StatusType.Warn:
                            {
                                if (resp.DataList.length == 0) {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found for Vendors' });
                                }
                                else {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                }
                                this.spinnerService.stop();
                                break;
                            }

                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "SetVendorsFromOrgGrpId");
        }
    }

    SetVendorsFromOrgGrpIdForEdit() {
        this.lstVendordata = [];
        this.lstVendordata.push({ label: "select one", value: "" })
        try {
            this.spinnerService.start();
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this.newItem.ORG_GROUP_ID, '', this.vendorSearch.trim())
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].STATUS == 0) {
                                        this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + "-" + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Warn:
                            {
                                if (resp.DataList.length == 0) {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found for Vendors' });
                                }
                                else {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                }
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "SetVendorsFromOrgGrpIdForEdit");
        }
    }

    BindReplenishment() {
        this.lstReplenishment.push({ label: "Select One", value: "" })
        this.lstReplenishment.push({ label: "Stock", value: "1" })
        this.lstReplenishment.push({ label: "Nonstock", value: "2" })
        this.lstReplenishment.push({ label: "Stockless", value: "3" })
        this.lstReplenishment.push({ label: "Consignment", value: "4" })
    }

    ddlOrgGrpIdChanged() {
        if (this.newItem.ORG_GROUP_ID === "Select One") {
            return;
        }
        try {
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this.newItem.ORG_GROUP_ID, '', this.vendorSearch.trim())
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                this.lstVendordata = [];
                                this.msgs = [];
                                this.lstVendordata.push({ label: "select one", value: "" })
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    if (resp.DataList[i].STATUS == 0) {
                                        this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + "-" + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID })
                                    }
                                }
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.msgs = [];
                                this.lstVendordata = [];
                                this.lstVendordata.push({ label: "select one", value: "" })
                                resp.StatusMessage = "No Vendor Is Assigned For The selected Org Group ID";
                                this.newItem.VENDOR_ID = "";
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
        if (this.newItem.ORG_GROUP_ID == "Select Org" || this.newItem.ORG_GROUP_ID == undefined || this.newItem.ORG_GROUP_ID == null || this.newItem.ORG_GROUP_ID == "") {
            this.ddlOrgGpIDStatus = 1;
        }
        else {
            this.ddlOrgGpIDStatus = 0;
        }
    }

    ddlChange() {
        if (this.newItem.REPLENISHMENT_TYPE == "" || this.newItem.REPLENISHMENT_TYPE == undefined || this.newItem.REPLENISHMENT_TYPE == null) {
            this.ddlReplTypeStatus = 1;
        }
        else {
            this.ddlReplTypeStatus = 0;
        }
        if (this.newItem.ORG_GROUP_ID == "Select Org" || this.newItem.ORG_GROUP_ID == undefined || this.newItem.ORG_GROUP_ID == null || this.newItem.ORG_GROUP_ID == "") {
            this.ddlOrgGpIDStatus = 1;
        }
        else {
            this.ddlOrgGpIDStatus = 0;
        }
        if (this.newItem.VENDOR_ID == undefined || this.newItem.VENDOR_ID == null || this.newItem.VENDOR_ID == "") {
            this.ddlVenIDStatus = 1;
        }
        else {
            this.ddlVenIDStatus = 0;
        }
        if (this.submitButtonTitle == "Update") {
            this.txtItemIDStatus = 0;

            if (this.txtShortDescStatus >= 1) {
                this.txtShortDescStatus = 1;
            }
            else {
                this.txtShortDescStatus = 0;
            }

            if (this.txtCustItemIdStatus >= 1) {
                this.txtCustItemIdStatus = 1;
            }
            else {
                this.txtCustItemIdStatus = 0;
            }

            if (this.txtVendItemIdStatus >= 1) {
                this.txtVendItemIdStatus = 1;
            }
            else {
                this.txtVendItemIdStatus = 0;
            }

            if (this.txtUomProcurementStatus >= 1) {
                this.txtUomProcurementStatus = 1;
            }
            else {
                this.txtUomProcurementStatus = 0;
            }

            if (this.txtUomIssueStatus >= 1) {
                this.txtUomIssueStatus = 1;
            }
            else {
                this.txtUomIssueStatus = 0;
            }

            if (this.txtConvRateProcStatus >= 1) {
                this.txtConvRateProcStatus = 1;
            }
            else {
                this.txtConvRateProcStatus = 0;
            }

        }
        if (this.txtItemIDStatus == 0 && this.txtShortDescStatus == 0 &&
            this.txtVendItemIdStatus == 0 && this.txtUomProcurementStatus == 0 && this.txtUomIssueStatus == 0
            && this.txtConvRateProcStatus == 0 && this.ddlReplTypeStatus == 0 && this.ddlOrgGpIDStatus == 0 && this.ddlVenIDStatus == 0 && (this.newItem.ITEM_ID != "" && this.newItem.ITEM_ID != undefined && this.newItem.ITEM_ID != null) &&
            (this.newItem.SHORT_DESCR != "" && this.newItem.SHORT_DESCR != undefined && this.newItem.SHORT_DESCR != null) &&
            (this.newItem.VEND_ITEM_ID != "" && this.newItem.VEND_ITEM_ID != undefined && this.newItem.VEND_ITEM_ID != null) &&
            (this.newItem.UNIT_OF_PROCUREMENT != "" && this.newItem.UNIT_OF_PROCUREMENT != undefined && this.newItem.UNIT_OF_PROCUREMENT != null) &&
            (this.newItem.CONV_FACTOR != undefined && this.newItem.CONV_FACTOR != null) && (this.newItem.UNIT_OF_ISSUE != "" && this.newItem.UNIT_OF_ISSUE != undefined && this.newItem.UNIT_OF_ISSUE != null)) {
            if ((this.txtLeadTimeStatus == 0 || this.txtLeadTimeStatus == undefined) &&
                (this.txtLongDescStatus == 0 || this.txtLongDescStatus == undefined) && (this.txtCustItemIdStatus == 0 || this.txtCustItemIdStatus == undefined) &&
                (this.txtManufacturerStatus == 0 || this.txtManufacturerStatus == undefined) &&
                (this.txtMgfItemIdStatus == 0 || this.txtMgfItemIdStatus == undefined) &&
                (this.txtUomStatus == 0 || this.txtUomStatus == undefined) && (this.txtUpcIdstatus == 0 || this.txtUpcIdstatus == undefined)
                && (this.txtGtinStatus == 0 || this.txtGtinStatus == undefined) && (this.txtItemPriceStatus == 0 || this.txtItemPriceStatus == undefined)
                && (this.txtParUomStatus == 0 || this.txtParUomStatus == undefined) && (this.txtChargeCodeStatus == 0 || this.txtChargeCodeStatus == undefined)
                && (this.txtCustItemDescStatus == 0 || this.txtCustItemDescStatus == undefined) && (this.txtItemCtgryStatus == 0 || this.txtItemCtgryStatus == undefined)
                && (this.txtUserField1Status == 0 || this.txtUserField1Status == undefined) && (this.txtUserField2Status == 0 || this.txtUserField2Status == undefined)) {
                if (this.pharma == true) {
                    if ((this.txtStrengthStatus == 0 || this.txtStrengthStatus == undefined) && (this.txtDosageStatus == 0 || this.txtDosageStatus == undefined)
                        && (this.txtCiIndexstatus == 0 || this.txtCiIndexstatus == undefined)) {
                        this.disableButton = false;
                    }
                    else {
                        this.disableButton = true;
                    }
                }
                else {
                    this.disableButton = false;
                }
            }
            else {
                this.disableButton = true;
            }
        }
        else {
            this.disableButton = true;
        }
    }

    addSetupItems() {

        if (this.mode == ModeEnum.Add.toString()) {

            if (this.newItem.ITEM_ID == "" || this.newItem.ITEM_ID == undefined) {

                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Item ID" });
                return 0;
            }

            if (this.newItem.SHORT_DESCR == "" || this.newItem.SHORT_DESCR == undefined) {

                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Short Description" });
                return 0;
            }
            if (this.newItem.ORG_GROUP_ID == "select One" || this.newItem.ORG_GROUP_ID == "" || this.newItem.ORG_GROUP_ID == undefined) {

                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "select Org Group ID" });
                return 0;
            }

            if (this.newItem.VENDOR_ID == "select One" || this.newItem.VENDOR_ID == "" || this.newItem.VENDOR_ID == undefined) {

                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Vendor ID" });
                return 0;
            }
            if (this.newItem.VEND_ITEM_ID == "" || this.newItem.VEND_ITEM_ID == undefined) {

                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "select Vendor Item Id" });
                return 0;
            }
            if (this.newItem.UNIT_OF_PROCUREMENT == "" || this.newItem.UNIT_OF_PROCUREMENT == undefined) {

                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM(Procurement)" });
                return 0;
            }
            if (this.newItem.UNIT_OF_ISSUE == "" || this.newItem.UNIT_OF_ISSUE == undefined) {

                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM(Issue)" });
                return 0;
            }
            if (this.newItem.REPLENISHMENT_TYPE == "select One" || this.newItem.REPLENISHMENT_TYPE == "" || this.newItem.REPLENISHMENT_TYPE == undefined) {

                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Replenishment Type" });
                return 0;
            }


            if (this.blnShowOrgGroupLabel == true) {
                this.newItem.ORG_GROUP_ID = this.orgGrpId.split("-")[0];
            }
            if (this.newItem.SHORT_DESCR !== "" || this.newItem.SHORT_DESCR != undefined || this.newItem.SHORT_DESCR != null) {
                this.newItem.SHORT_DESCR.replace("'", "''");
            }
            if (this.newItem.LONG_DESCR != undefined || this.newItem.LONG_DESCR != null) {
                this.newItem.LONG_DESCR.replace("'", "''");
            }
            if (this.newItem.UNIT_OF_PROCUREMENT != undefined || this.newItem.UNIT_OF_PROCUREMENT != null) {
                this.newItem.UNIT_OF_PROCUREMENT.toUpperCase();
            }
            if (this.newItem.UNIT_OF_ISSUE != undefined || this.newItem.UNIT_OF_ISSUE != null) {
                this.newItem.UNIT_OF_ISSUE.toUpperCase();
            }
            if (this.newItem.CUST_ITEM_DESCR != undefined || this.newItem.CUST_ITEM_DESCR != null) {
                this.newItem.CUST_ITEM_DESCR.trim();
            }
            if (this.newItem.ITEM_CATEGORY != undefined || this.newItem.ITEM_CATEGORY != null) {
                this.newItem.ITEM_CATEGORY.trim();
            }
            if (this.newItem.USER_FIELD_1 != undefined || this.newItem.USER_FIELD_1 != null) {
                this.newItem.USER_FIELD_1.trim();
            }
            if (this.newItem.USER_FIELD_2 != undefined || this.newItem.USER_FIELD_2 != null) {
                this.newItem.USER_FIELD_2.trim();
            }

            this.newItem.LAST_UPDATE_USER = this._deviceTokenEntry[TokenEntry_Enum.UserID].toString().trim();

            if (this.newItem.STRENGTH != undefined || this.newItem.STRENGTH != null) {
                this.newItem.STRENGTH.trim();
            }
            if (this.newItem.DOSAGE != undefined || this.newItem.DOSAGE != null) {
                this.newItem.DOSAGE.trim();
            }
            if (this.newItem.LOT_CONTROLLED == null || this.newItem.LOT_CONTROLLED == undefined) {
                this.newItem.LOT_CONTROLLED = "N";
            }
            if (this.newItem.SERIAL_CONTROLLED == null || this.newItem.SERIAL_CONTROLLED == undefined) {
                this.newItem.SERIAL_CONTROLLED = "N";
            }
            if (this.newItem.IMPLANT_FLAG == null || this.newItem.IMPLANT_FLAG == undefined) {
                this.newItem.IMPLANT_FLAG = "N";
            }
            this.spinnerService.start();
            this.setupItemServices.CreateSetupItem(this.newItem).forEach(resp => {
                this.msgs = [];
                switch (resp.StatType) {
                    case StatusType.Success:
                        {
                            this.statusMesssage = AtParConstants.Created_Msg.replace("1%", "Item").replace("2%", this.newItem.ITEM_ID);
                            this.newItem.ITEM_ID = "";
                            this.newItem.LEAD_TIME = null;
                            this.newItem.SHORT_DESCR = "";
                            this.newItem.LONG_DESCR = "";
                            this.newItem.VENDOR_ID = "";
                            this.newItem.CUST_ITEM_ID = "";
                            this.newItem.MANUFACTURER = "";
                            this.newItem.MFG_ITEM_ID = "";
                            this.newItem.VEND_ITEM_ID = "";
                            this.newItem.UNIT_OF_PROCUREMENT = "";
                            this.newItem.PAR_UOM = "";
                            this.newItem.UNIT_OF_ISSUE = "";
                            this.newItem.UPC_CODE = "";
                            this.newItem.GTIN = "";
                            this.newItem.ITEM_PRICE = null;
                            this.newItem.CONV_FACTOR = null;
                            this.newItem.CONV_RATE_PAR_UOM = null;
                            this.newItem.LOT_CONTROLLED_STATUS = false;
                            this.newItem.SERIAL_CONTROLLED_STATUS = false;
                            this.newItem.IMPLANT_FLAG_STATUS = false;
                            this.newItem.CHARGE_CODE = "";
                            this.newItem.REPLENISHMENT_TYPE = "";
                            this.newItem.LATEX_FREE_STATUS = false;
                            this.newItem.CUST_ITEM_DESCR = "";
                            this.newItem.ITEM_CATEGORY = "";
                            this.newItem.USER_FIELD_1 = "";
                            this.newItem.USER_FIELD_2 = "";
                            this.newItem.PHARMACY_FLG_STATUS = false;
                            this.newItem.SUBSTITUTE_ITEM_FLG_STATUS = false;
                            this.newItem.STRENGTH = "";
                            this.newItem.DOSAGE = "";
                            this.newItem.EVERIFY_FLG_STATUS = false;
                            this.newItem.CINDEX = null;
                            this.pharma = false;
                            if (this.blnShowOrgGroupLabel == false) {
                                this.newItem.ORG_GROUP_ID = "";
                            }
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            if (this.blnShowOrgGroupDD) {
                                document.getElementById("txtddllstOrgGroups").focus();
                            }
                            else {
                                document.getElementById("txtItemId").focus();
                            }
                            this.disableButton = true;                          
                            this.spinnerService.stop();
                            break;

                        }
                    case StatusType.Error:
                        {
                            this.statusMesssage = resp.StatusMessage;
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMesssage });
                            document.getElementById("txtItemId").focus();
                            this.disableButton = true;
                            this.spinnerService.stop();
                            break;
                        }
                    case StatusType.Warn:
                        {
                            this.statusMesssage = resp.StatusMessage;
                            this.statusMesssage = this.statusMesssage.replace("1%", this.newItem.ITEM_ID);
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMesssage });
                            document.getElementById("txtItemId").focus();
                            this.disableButton = true;
                            this.spinnerService.stop();
                            break;
                        }
                }
                this.atParConstant.scrollToTop();
            });
        }
        else if (this.mode == ModeEnum.Edit.toString()) {
            if (this.newItem.ITEM_ID == "" || this.newItem.ITEM_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Item ID" });
                return 0;
            }
            if (this.newItem.SHORT_DESCR == "" || this.newItem.SHORT_DESCR == undefined) {

                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Short Description" });
                return 0;
            }
            if (this.newItem.VENDOR_ID == "select one" || this.newItem.VENDOR_ID == "" || this.newItem.VENDOR_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "select Vendor Id" });
                return 0;
            }
            if (this.newItem.VEND_ITEM_ID == "" || this.newItem.VEND_ITEM_ID == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "select Vendor Item Id" });
                return 0;
            }
            if (this.newItem.UNIT_OF_PROCUREMENT == "" || this.newItem.UNIT_OF_PROCUREMENT == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM(Procurement)" });
                return 0;
            }
            if (this.newItem.UNIT_OF_ISSUE == "" || this.newItem.UNIT_OF_ISSUE == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid UOM(Issue)" });
                return 0;
            }
            if (this.newItem.CONV_FACTOR == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Enter Valid Procurement Conversion Rate" });
                return 0;
            }
            if (this.newItem.REPLENISHMENT_TYPE == "select One" || this.newItem.REPLENISHMENT_TYPE == "" || this.newItem.REPLENISHMENT_TYPE == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "select Replenisment Type" });
                return 0;
            }


            this.spinnerService.start();
            this.newItem.ORG_GROUP_ID = this.newItem.ORG_GROUP_ID.split("-")[0];
            this.setupItemServices.UpdateItem(this.newItem).forEach(resp => {
                this.msgs = [];
                switch (resp.StatType) {
                    case StatusType.Success:
                        {
                            this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "Item").replace("2%", this.newItem.ITEM_ID);
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            if (this.blnShowOrgGroupDD) {
                                document.getElementById("txtddllstOrgGroups").focus();
                            }
                            else {
                                document.getElementById("txtLeadTime").focus();
                            }
                            this.spinnerService.stop();
                            break;
                        }

                    case StatusType.Error:
                        {
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }

                    case StatusType.Warn:
                        {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                }
                this.atParConstant.scrollToTop();

            });

        }
    }

    bindModelDataChange(event: any) {
        try {
            if (this.newItem.ITEM_ID == null || this.newItem.ITEM_ID == "" || this.newItem.ITEM_ID == undefined) {
                 this.txtItemIDStatus = 1;
            }
            else {
                if (this.txtItemIDStatus == 1) {
                    this.txtItemIDStatus = 1;
                }
                else {
                    this.txtItemIDStatus = 0;
                }
            }
            if ("txtItemId" == event.TextBoxID.toString()) {
                this.txtItemIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtLeadTime" == event.TextBoxID.toString()) {
                this.txtLeadTimeStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtShortDesc" == event.TextBoxID.toString()) {
                this.txtShortDescStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtLongDesc" == event.TextBoxID.toString()) {
                this.txtLongDescStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtCustItemId" == event.TextBoxID.toString()) {
                this.txtCustItemIdStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtManufacturer" == event.TextBoxID.toString()) {
                this.txtManufacturerStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtMgfItemId" == event.TextBoxID.toString()) {
                this.txtMgfItemIdStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtVendItemId" == event.TextBoxID.toString()) {
                this.txtVendItemIdStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtUomProcurement" == event.TextBoxID.toString()) {
                this.txtUomProcurementStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtUom" == event.TextBoxID.toString()) {
                this.txtUomStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtUpcId" == event.TextBoxID.toString()) {
                this.txtUpcIdstatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtUomIssue" == event.TextBoxID.toString()) {
                this.txtUomIssueStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtGtin" == event.TextBoxID.toString()) {
                this.txtGtinStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtItemPrice" == event.TextBoxID.toString()) {
                this.txtItemPriceStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtConvRateProc" == event.TextBoxID.toString()) {
                this.txtConvRateProcStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtParUom" == event.TextBoxID.toString()) {
                this.txtParUomStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtChargeCode" == event.TextBoxID.toString()) {
                this.txtChargeCodeStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtCustItemDesc" == event.TextBoxID.toString()) {
                this.txtCustItemDescStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtItemCtgry" == event.TextBoxID.toString()) {
                this.txtItemCtgryStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtUserField1" == event.TextBoxID.toString()) {
                this.txtUserField1Status = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtUserField2" == event.TextBoxID.toString()) {
                this.txtUserField2Status = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtStrength" == event.TextBoxID.toString()) {
                this.txtStrengthStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtDosage" == event.TextBoxID.toString()) {
                this.txtDosageStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtCiIndex" == event.TextBoxID.toString()) {
                this.txtCiIndexstatus = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.submitButtonTitle == "Update") {
                this.txtItemIDStatus = 0;

                if (this.txtShortDescStatus >= 1) {
                    this.txtShortDescStatus = 1;
                }
                else {
                    this.txtShortDescStatus = 0;
                }

                if (this.txtCustItemIdStatus >= 1) {
                    this.txtCustItemIdStatus = 1;
                }
                else {
                    this.txtCustItemIdStatus = 0;
                }

                if (this.txtVendItemIdStatus >= 1) {
                    this.txtVendItemIdStatus = 1;
                }
                else {
                    this.txtVendItemIdStatus = 0;
                }

                if (this.txtUomProcurementStatus >= 1) {
                    this.txtUomProcurementStatus = 1;
                }
                else {
                    this.txtUomProcurementStatus = 0;
                }

                if (this.txtUomIssueStatus >= 1) {
                    this.txtUomIssueStatus = 1;
                }
                else {
                    this.txtUomIssueStatus = 0;
                }

                if (this.txtConvRateProcStatus >= 1) {
                    this.txtConvRateProcStatus = 1;
                }
                else {
                    this.txtConvRateProcStatus = 0;
                }

            }

            this.ddlChange();

            if (this.txtItemIDStatus == 0 && this.txtShortDescStatus == 0 &&
                this.txtVendItemIdStatus == 0 && this.txtUomProcurementStatus == 0 && this.txtUomIssueStatus == 0
                && this.txtConvRateProcStatus == 0 && this.ddlReplTypeStatus == 0 && this.ddlOrgGpIDStatus == 0 && this.ddlVenIDStatus == 0) {
                if ((this.txtLeadTimeStatus == 0 || this.txtLeadTimeStatus == undefined) &&
                    (this.txtLongDescStatus == 0 || this.txtLongDescStatus == undefined) && (this.txtCustItemIdStatus == 0 || this.txtCustItemIdStatus == undefined) &&
                    (this.txtManufacturerStatus == 0 || this.txtManufacturerStatus == undefined) &&
                    (this.txtMgfItemIdStatus == 0 || this.txtMgfItemIdStatus == undefined) &&
                    (this.txtUomStatus == 0 || this.txtUomStatus == undefined) && (this.txtUpcIdstatus == 0 || this.txtUpcIdstatus == undefined)
                    && (this.txtGtinStatus == 0 || this.txtGtinStatus == undefined) && (this.txtItemPriceStatus == 0 || this.txtItemPriceStatus == undefined)
                    && (this.txtParUomStatus == 0 || this.txtParUomStatus == undefined) && (this.txtChargeCodeStatus == 0 || this.txtChargeCodeStatus == undefined)
                    && (this.txtCustItemDescStatus == 0 || this.txtCustItemDescStatus == undefined) && (this.txtItemCtgryStatus == 0 || this.txtItemCtgryStatus == undefined)
                    && (this.txtUserField1Status == 0 || this.txtUserField1Status == undefined) && (this.txtUserField2Status == 0 || this.txtUserField2Status == undefined)) {
                    if (this.pharma == true) {
                        if ((this.txtStrengthStatus == 0 || this.txtStrengthStatus == undefined) && (this.txtDosageStatus == 0 || this.txtDosageStatus == undefined)
                            && (this.txtCiIndexstatus == 0 || this.txtCiIndexstatus == undefined)) {
                            this.disableButton = false;
                        }
                        else {
                            this.disableButton = true;
                        }
                    }
                    else {
                        this.disableButton = false;
                    }
                }
                else {
                    this.disableButton = true;
                }
            }
            else {
                this.disableButton = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    }

    goBack() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        let navigationExtras: NavigationExtras = {
            queryParams: { "mode": (ModeEnum.List).toString() },

            preserveQueryParams: false,
            relativeTo: this.route

        };
        this.router.navigate(['../'], navigationExtras);

    }

    pharmacyChecked(event) {
        if (event == true) {
            this.pharma = true;
            this.newItem.PHARMACY_FLG = 1;
        }
        else {
            this.pharma = false;
            this.newItem.PHARMACY_FLG = 0;
            this.newItem.SUBSTITUTE_ITEM_FLG_STATUS = false;
            this.newItem.EVERIFY_FLG_STATUS = false;
            this.newItem.SUBSTITUTE_ITEM_FLG = 0;
            this.newItem.EVERIFY_FLG = 0;
            this.newItem.DOSAGE = "";
            this.newItem.STRENGTH = "";
            this.newItem.CINDEX = null;
        }
    }

    lotControlledChecked(event) {
        if (event == true) {
            this.newItem.LOT_CONTROLLED = "Y";
        }
        else {
            this.newItem.LOT_CONTROLLED = "N";
        }
    }

    serialControlledChecked(event) {
        if (event == true) {
            this.newItem.SERIAL_CONTROLLED = "Y";
        }
        else {
            this.newItem.SERIAL_CONTROLLED = "N";
        }
    }

    implantItemChecked(event) {
        if (event == true) {
            this.newItem.IMPLANT_FLAG = "Y";
        }
        else {
            this.newItem.IMPLANT_FLAG = "N";
        }
    }

    latexFreeChecked(event) {
        if (event == true) {
            this.newItem.LATEX_FREE = 1;
        }
        else {
            this.newItem.LATEX_FREE = 0;
        }

    }

    substisuteItemChecked(event) {
        if (event == true) {
            this.newItem.SUBSTITUTE_ITEM_FLG = 1;
        }
        else {
            this.newItem.SUBSTITUTE_ITEM_FLG = 0;
        }
    }

    everifyChecked(event) {
        if (event == true) {
            this.newItem.EVERIFY_FLG = 1;
        }
        else {
            this.newItem.EVERIFY_FLG = 0;
        }
    }

    navigatVendorHome(statusMesssage, statusType) {
        if (statusMesssage == undefined || statusMesssage == null && statusType == undefined || statusType == null) {
            let navigationExtras: NavigationExtras = {
                queryParams: { "mode": (ModeEnum.List).toString() },

                preserveQueryParams: false,
                relativeTo: this.route

            };
            this.router.navigate(['../'], navigationExtras);
        }
        else {
            let navigationExtras: NavigationExtras = {
                queryParams: { "mode": (ModeEnum.List).toString(), "statusMessage": this.statusMesssage.toString(), "statusType": statusType.toString() },
                preserveQueryParams: false,
                relativeTo: this.route
            };
            this.router.navigate(['../'], navigationExtras);
        }
    }

    clientErrorMsg(ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }
}
