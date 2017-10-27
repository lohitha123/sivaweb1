import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate, Inject } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { RM_ORG_UNITS } from "../../app/Entities/RM_ORG_UNITS";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { Message } from './../components/common/api';
import { ManageOrgIdServices } from "../../app/Init/atpar-manage-orgid.services";
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
//import { CustomValidators } from '../common/textbox/custom-validators';
//import { CustomTextBoxModule } from '../common/textbox/CustomTextBoxModule';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Shared/HttpService';
import { ModeEnum } from '../Shared/AtParEnums'
import { SelectItem } from './../components/common/api';
import { ATPAR_VALIDATION_RULES } from '../entities/atpar_validation_rules';
import { StatusType } from './../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { Title } from '@angular/platform-browser';
import { Menus } from '../AtPar/Menus/routepath';
import { DOCUMENT } from '@angular/platform-browser';


declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-manage-orgid-modify.component.html',
    providers: [ManageOrgIdServices],
})
export class ModifyOrgIdComponent {
    public newItem = new RM_ORG_UNITS();
    userData: any;
    orgGroupData: any[] = [];
    statusCode: number;
    orgGrpId: string;
    msgs: Message[] = [];
    trOrgGrpId: boolean = false;
    drpDwnGrpId: boolean = false;
    _deviceTokenEntry: string[] = [];
    editData: any;
    orgTypes: any;
    mode: string = "Add";
    AllOrgGrp: string = "All";
    screenTitle: string;
    isEditMode: boolean;
    submitButtonTitle: string;
    statusMesssage: string;
    btnEnableDisable: boolean = true;
    ddlRequireddata: boolean;
    breadCrumbMenu: Menus;
    bindSymbol: string;
    //textbox variables
    txtOrgIdStatus: number;
    txtOrgNameStatus: number;
    txtAddress1Status: number;
    txtAddress2Status: number;
    txtCityStatus: number;
    txtStateStatus: number;
    txtPhoneStatus: number;
    txtZipStatus: number;
    ddlOrgIDStatus: number;
    ddlMasterOrgIDStatus: number;
    orgType: any;

    constructor(private manageOrgIdServices: ManageOrgIdServices, private spinnerService: SpinnerService, private route: ActivatedRoute,
        private atParSharedDataService: AtParSharedDataService, @Inject(DOCUMENT) private document, private atParConstant: AtParConstants,
        private title: Title,
        public router: Router) {
        this.breadCrumbMenu = new Menus();
    }
    ngOnInit(): void {
        try {
            this.spinnerService.start();
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.orgTypes = [];
            this.orgTypes.push({ label: 'Select Type', value: null });
            this.orgTypes.push({ label: 'Purchasing', value: 'P' });
            this.orgTypes.push({ label: 'Inventory', value: 'I' });

            this.title.setTitle('Setup Org ID');
            this.mode = this.atParSharedDataService.storage.mode;

            if (this.mode == (ModeEnum.Add).toString()) {
                this.screenTitle = "OrgID Creation";
                this.isEditMode = false;
                this.submitButtonTitle = "Save";
                this.bindSymbol ="floppy-o"
                this.ddlRequireddata = true;
            } else if (this.mode == (ModeEnum.Edit).toString()) {
                this.screenTitle = "Modify OrgID";
                this.newItem = this.atParSharedDataService.storage.rmOrgUnits;
                if (this.newItem.ORG_TYPE === "I") {
                    this.ddlRequireddata = true;
                    this.orgType = "Inventory";
                }
                else {
                    this.ddlRequireddata = false;
                    this.orgType = "Purchasing";
                }
                this.btnEnableDisable = false;
                this.submitButtonTitle = "Update";
                this.bindSymbol="check"
                this.isEditMode = true;
            } else {
                this.screenTitle = "OrgID Creation";
                this.submitButtonTitle = "Save";
                this.bindSymbol = "floppy-o"
            }
            this.manageOrgIdServices.getOrgGrpGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID]).forEach(resp => {
                this.spinnerService.stop();
                switch (resp.StatType) {
                    case StatusType.Success: {
                        this.drpDwnGrpId = true;
                        this.orgGroupData.push({ label: "Select one", value: null });
                        if (this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toUpperCase() == this.AllOrgGrp.toUpperCase()) {
                            for (let i = 0; i < resp.DataList.length; i++) {
                                if (resp.DataList[i].ORG_GROUP_ID != this.AllOrgGrp) {
                                    this.orgGroupData.push({ label: resp.DataList[i].ORG_GROUP_ID + " - " + resp.DataList[i].ORG_GROUP_NAME, value: resp.DataList[i].ORG_GROUP_ID })
                                }
                            }
                        } else {
                            for (let i = 0; i < resp.DataList.length; i++) {
                                if (resp.DataList[i].ORG_GROUP_ID.toUpperCase() == this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toUpperCase()) {
                                    this.orgGroupData.push({ label: resp.DataList[i].ORG_GROUP_ID + " - " + resp.DataList[i].ORG_GROUP_NAME, value: resp.DataList[i].ORG_GROUP_ID })
                                }
                            }
                        }
                        break;
                    }
                    case StatusType.Error: {
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    ddlOrgIdChanged() {
        if (this.newItem.ORG_TYPE == "I") {
            this.ddlRequireddata = true;
        }
        else {
            this.ddlRequireddata = false;
        }
        if (this.newItem.ORG_TYPE == "Select Org" || this.newItem.ORG_TYPE == undefined || this.newItem.ORG_TYPE == null || this.newItem.ORG_TYPE == "") {
            this.ddlOrgIDStatus = 1;
        }
        else {
            this.ddlOrgIDStatus = 0;
        }
        if (this.ddlRequireddata) {
            if (this.newItem.MASTER_GROUP_ID == "Select one" || this.newItem.MASTER_GROUP_ID == undefined || this.newItem.MASTER_GROUP_ID == null || this.newItem.MASTER_GROUP_ID == "") {
                this.ddlMasterOrgIDStatus = 1;
            }
            else {
                this.ddlMasterOrgIDStatus = 0;
            }
        }
        else {
            this.ddlMasterOrgIDStatus = 0;
        }
        if (this.submitButtonTitle.toString() === "Update") {
            this.txtOrgIdStatus = 0;
            if (this.txtOrgNameStatus >= 1) {
                this.txtOrgNameStatus = 1;
            }
            else {
                this.txtOrgNameStatus = 0;
            }
        }
        if (this.ddlRequireddata) {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlMasterOrgIDStatus == 0 &&
                (this.newItem.ORG_ID != null && this.newItem.ORG_ID != "" && this.newItem.ORG_ID != undefined) && (this.newItem.ORG_NAME != null && this.newItem.ORG_NAME != "" && this.newItem.ORG_NAME != undefined)) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
        else {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 &&
                (this.newItem.ORG_ID != null && this.newItem.ORG_ID != "" && this.newItem.ORG_ID != undefined) && (this.newItem.ORG_NAME != null && this.newItem.ORG_NAME != "" && this.newItem.ORG_NAME != undefined)) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0) && (this.ddlMasterOrgIDStatus == 0 || this.ddlMasterOrgIDStatus == undefined)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
    }

    ddlMasterGroupIdChanged() {
        if (this.ddlRequireddata) {
            if (this.newItem.MASTER_GROUP_ID == "Select one" || this.newItem.MASTER_GROUP_ID == undefined || this.newItem.MASTER_GROUP_ID == null || this.newItem.MASTER_GROUP_ID == "") {
                this.ddlMasterOrgIDStatus = 1;
            }
            else {
                this.ddlMasterOrgIDStatus = 0;
            }
        }
        else {
            this.ddlMasterOrgIDStatus = 0;
        }
        if (this.newItem.ORG_TYPE == "Select Org" || this.newItem.ORG_TYPE == undefined || this.newItem.ORG_TYPE == null || this.newItem.ORG_TYPE == "") {
            this.ddlOrgIDStatus = 1;
        }
        else {
            this.ddlOrgIDStatus = 0;
        }
        if (this.submitButtonTitle.toString() === "Update") {
            this.txtOrgIdStatus = 0;
            if (this.txtOrgNameStatus >= 1) {
                this.txtOrgNameStatus = 1;
            }
            else {
                this.txtOrgNameStatus = 0;
            }
        }

        if (this.ddlRequireddata) {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlMasterOrgIDStatus == 0 &&
                (this.newItem.ORG_ID != null && this.newItem.ORG_ID != "" && this.newItem.ORG_ID != undefined) && (this.newItem.ORG_NAME != null && this.newItem.ORG_NAME != "" && this.newItem.ORG_NAME != undefined)) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
        else {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 &&
                (this.newItem.ORG_ID != null && this.newItem.ORG_ID != "" && this.newItem.ORG_ID != undefined) && (this.newItem.ORG_NAME != null && this.newItem.ORG_NAME != "" && this.newItem.ORG_NAME != undefined)) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0) && (this.ddlMasterOrgIDStatus == 0 || this.ddlMasterOrgIDStatus == undefined)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }



    }

    //navigatVendorHome
    navigatOrgIdHome(statusMesssage, statusType) {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.title.setTitle('Manage Org ID');
        if (statusMesssage == undefined || statusMesssage == null && statusType == undefined || statusType == null) {
            //this.atParSharedDataService.storage = { "mode": ModeEnum.List };
            let navigationExtras: NavigationExtras = {
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

    async createOrgId() {
        try {

            this.msgs = [];
            if (this.newItem.ORG_TYPE == null || this.newItem.ORG_TYPE == undefined) {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Org Type" });
                return;
            }
            else if (this.ddlRequireddata) {
                if (this.newItem.MASTER_GROUP_ID == null || this.newItem.MASTER_GROUP_ID == undefined) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Master Date Group ID" });
                    return;
                }
                else {
                    this.newItem.MASTER_GROUP_ID = this.newItem.MASTER_GROUP_ID;
                }
            }
            //else {
            if (this.mode == (ModeEnum.Add).toString()) {
                this.newItem.STATUS = true;
                this.newItem.EVENT = null;
            }
            if (this.mode == "0" || this.mode == "Add") {
                this.mode = "Add"
            }
            else {
                this.mode = "Edit"
            }

            this.spinnerService.start();
            await this.manageOrgIdServices.insertUpdateOrgUnits(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.mode, this.newItem).forEach(resp => {
                this.msgs = [];
                //this.spinnerService.stop();
                switch (resp.StatType) {
                    case StatusType.Success: {
                        if (this.mode == "Add") {
                            let statusMessage = AtParConstants.Created_Msg.replace("1%", "Org").replace("2%", this.newItem.ORG_ID)
                            this.btnEnableDisable = true;
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                            this.newItem = new RM_ORG_UNITS();
                            this.newItem.STATUS = true;
                            this.newItem.EVENT = null;
                            this.btnEnableDisable = true;
                            document.getElementById("txtORG_ID").focus();
                        }
                        else if (this.mode == "Edit") {
                            this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "Org").replace("2%", this.newItem.ORG_ID)
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            this.btnEnableDisable = false;
                            document.getElementById("txtORG_NAME").focus();
                        }
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Error: {
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMesssage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.statusMesssage = resp.StatusMessage;
                        var s = this.statusMesssage.includes("(OrgID)");
                        if (s == true) {
                            this.statusMesssage = this.statusMesssage.replace('Org ID', 'Org');
                            this.statusMesssage = this.statusMesssage.replace('(OrgID)', this.newItem.ORG_ID);
                        }
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMesssage });
                        break;
                    }
                }
                this.atParConstant.scrollToTop();
            });
            this.spinnerService.stop();
            // }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "createOrgId");
        }
    }

    bindModelDataChange(event: any) {
        if ("txtORG_ID" == event.TextBoxID.toString()) {
            this.txtOrgIdStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtORG_NAME" == event.TextBoxID.toString()) {
            this.txtOrgNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtADDRESS1" == event.TextBoxID.toString()) {
            this.txtAddress1Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtADDRESS2" == event.TextBoxID.toString()) {
            this.txtAddress2Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtCITY" == event.TextBoxID.toString()) {
            this.txtCityStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtSTATE" == event.TextBoxID.toString()) {
            this.txtStateStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtPHONE_NO" == event.TextBoxID.toString()) {
            this.txtPhoneStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtZIP" == event.TextBoxID.toString()) {
            this.txtZipStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if (this.submitButtonTitle.toString() === "Update") {
            this.txtOrgIdStatus = 0;
            if (this.txtOrgNameStatus >= 1) {
                this.txtOrgNameStatus = 1;
            }
            else {
                this.txtOrgNameStatus = 0;
            }
        }
        this.ddlOrgIdChanged();
        this.ddlMasterGroupIdChanged();
        if (this.ddlRequireddata) {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0 && this.ddlMasterOrgIDStatus == 0) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
        else {
            if (this.txtOrgIdStatus == 0 && this.txtOrgNameStatus == 0 && this.ddlOrgIDStatus == 0) {
                if ((this.txtAddress1Status == undefined || this.txtAddress1Status == 0) && (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                    (this.txtCityStatus == undefined || this.txtCityStatus == 0) && (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                    (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) && (this.txtZipStatus == undefined || this.txtZipStatus == 0) && (this.ddlMasterOrgIDStatus == 0 || this.ddlMasterOrgIDStatus == undefined)) {
                    this.btnEnableDisable = false;
                }
                else {
                    this.btnEnableDisable = true;
                }
            }
            else {
                this.btnEnableDisable = true;
            }
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this._deviceTokenEntry = null;
        this.mode = null;
        this.statusCode = null;
        this.statusMesssage = null;
        this.screenTitle = null;
        this.submitButtonTitle = null;
        this.msgs = null;
        this.statusMesssage = null;
        this.orgGroupData = null;
    }
}
