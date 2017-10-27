
import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate, Inject } from '@angular/core';
import { Http, Response } from "@angular/http";
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { Message } from './../components/common/api';
import { SetupVendorServices } from "../../app/Init/atpar-setup-vendors.services";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
//import { CustomValidators } from '../common/textbox/custom-validators';
//import { CustomTextBoxModule } from '../common/textbox/CustomTextBoxModule';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Shared/HttpService';
import { SelectItem } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { ModeEnum } from '../Shared/AtParEnums'
import { ATPAR_VALIDATION_RULES } from '../entities/atpar_validation_rules';
import { CustomValidations } from '../common/validations/customvalidation';
import { StatusType } from './../Shared/AtParEnums';
import { SharedDataService, COUNTRY, STATE } from '../Shared/sharedData';
import { AtParConstants } from '../Shared/AtParConstants';
import { Menus } from '../AtPar/Menus/routepath';
import { DOCUMENT, Title } from '@angular/platform-browser';


declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'atpar-setup-modify-vendors.component.html',
    providers: [SetupVendorServices, CustomValidations, SharedDataService],
})
export class SetupModifyVendorsComponent {

    userData: AtParKeyValuePair[];
    ddlorgGroupData: SelectItem[] = [];
    ddldispatchType: any;
    msgs: Message[] = [];
    _deviceTokenEntry: string[] = [];
    editData: any;
    screenTitle: string;
    mode: string;
    isEditMode: boolean = false;

    statusMesssage: string;
    submitButtonTitle: string;
    hasMultipleOrgGroups = false;
    loading: boolean = true;

    public newItem = new PAR_MNGT_VENDOR();
    lblOrgGroupId: string;
    allowvendorAccess: boolean = false;
    allowVendorAccessValidation: boolean = false;
    Validatorsmessages: any;
    ddlUserIdData: SelectItem[] = [];
    orgGroupList: MT_ATPAR_ORG_GROUPS[];
    breadCrumbMenu: Menus;
    //selectedDropDownUserId: string = "";
    bindSymbal: string;


    //textbox changes
    vendorIDStatus: number;
    vendorNameStatus: number;
    address1Status: number;
    address2Status: number;
    cityStatus: number;
    zipStatus: number;
    contactNamestatus: number;
    phoneStatus: number;
    faxStatus: number;
    elmnt: any;
    emailStatus: number;
    billOnlyEmailStatus: number;
    frequencyReminderStatus: number;
    ddlStates: STATE[] = [];
    ddlcountry: COUNTRY[] = [];

    public constructor(
        private setupVendorServices: SetupVendorServices,
        private spinnerService: SpinnerService,
        private route: ActivatedRoute,
        private atParSharedDataService: AtParSharedDataService,
        public router: Router,
        private atParConstant: AtParConstants,
        @Inject(DOCUMENT) private document,
        private validate: CustomValidations, private sharedData: SharedDataService) {

        this.breadCrumbMenu = new Menus();
    }

    async ngOnInit() {

        this.mode = this.atParSharedDataService.storage.mode;
        if (this.mode == (ModeEnum.Add).toString()) {
            this.screenTitle = "Vendor Creation";
            this.isEditMode = false;
            this.submitButtonTitle = "Save";
            this.bindSymbal = "floppy-o";
            this.newItem = new PAR_MNGT_VENDOR();
        }
        else if (this.mode == (ModeEnum.Edit).toString()) {
            this.screenTitle = "Modify Vendor";
            this.newItem = this.atParSharedDataService.storage.SetupModifyVendorsEditData;
            //this.selectedDropDownUserId  =  this.newItem.VEND_USER_ID;
            if (this.newItem.ALLOW_VEND_ACCESS == "Y") {
                this.newItem.ALLOW_VEND_ACCESS = true;
                this.allowVendorAccessValidation = true
            }

            else {
                this.newItem.ALLOW_VEND_ACCESS = false;
                this.allowVendorAccessValidation = false

            }
            this.submitButtonTitle = "Update";
            this.bindSymbal = "check";
            this.loading = false;
            this.isEditMode = true;
        }
        else {
            this.screenTitle = "Vendor Creation";
            this.submitButtonTitle = "Save";
            this.loading = true;
        }

        this.BindToDisPathTypeDD();
        this.BindToCountryDD();

        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

        this.spinnerService.start();

        await this.setupVendorServices.GetOrgGroup(this._deviceTokenEntry[TokenEntry_Enum.UserID]).forEach(resp => {
            this.spinnerService.stop();
            switch (resp.StatType) {
                case StatusType.Success:
                    {
                        this.orgGroupList = resp.DataList;
                        if (this.orgGroupList.length > 1) {
                            this.hasMultipleOrgGroups = true;
                            this.ddlorgGroupData.push({ label: "Select One", value: null });
                            for (let i = 0; i < this.orgGroupList.length; i++) {
                                if (this.orgGroupList[i].ORG_GROUP_ID != "All") {
                                    this.ddlorgGroupData.push({ label: this.orgGroupList[i].ORG_GROUP_ID + " - " + this.orgGroupList[i].ORG_GROUP_NAME, value: this.orgGroupList[i].ORG_GROUP_ID })

                                }
                            }

                        }
                        else {
                            this.lblOrgGroupId = this.orgGroupList[0].ORG_GROUP_ID + " - " + this.orgGroupList[0].ORG_GROUP_NAME;
                            this.newItem.ORG_GROUP_ID = this.orgGroupList[0].ORG_GROUP_ID;
                        }

                        break;
                    }

                case StatusType.Error:
                    {
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                case StatusType.Warn:
                    {
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                case StatusType.Custom:
                    {
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }

            }

        });

        await this.setupVendorServices.GetVendorUsers(this.newItem.VENDOR_ID, this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).forEach(resp => {
            this.spinnerService.stop();
            this.ddlUserIdData.push({ label: "Select User", value: "Select User" });
            switch (resp.StatType) {
                case StatusType.Success:
                    {
                        this.userData = resp.DataList;

                        for (let i = 0; i < this.userData.length; i++) {
                            this.ddlUserIdData.push({ label: this.userData[i].Value, value: this.userData[i].ID })
                        }

                        break;
                    }


            }


        })

        if (this.mode == (ModeEnum.Add).toString()) {

            this.newItem.LAST_UPDATE_USER = this._deviceTokenEntry[TokenEntry_Enum.UserID];
        }
        else if (this.mode == (ModeEnum.Edit).toString()) {
            //this.newItem = this.atParSharedDataService.storage;
            this.onChangeddlCountry();
            if (this.newItem.ALLOW_VEND_ACCESS == "Y") {
                this.newItem.ALLOW_VEND_ACCESS = true;
            }

            else {
                this.newItem.ALLOW_VEND_ACCESS = false;

            }

            this.newItem.LAST_UPDATE_USER = this._deviceTokenEntry[TokenEntry_Enum.UserID];

        } else {
            this.newItem = new PAR_MNGT_VENDOR();

        }
        if (this.mode == (ModeEnum.Add).toString()) {
            if (this.hasMultipleOrgGroups == false) {
                document.getElementById('txtVendorId').focus();
            }
        }
        else if (this.mode == (ModeEnum.Edit).toString()) {
            if (this.hasMultipleOrgGroups == false) {
                document.getElementById('txtVendorName').focus();
            }
        }
        this.spinnerService.stop();
    }

    //Navigate to Previous Screen
    navigatVendorHome(statusMesssage, statusType) {

        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        if (statusMesssage == undefined || statusMesssage == null && statusType == undefined || statusType == null) {
            let navigationExtras: NavigationExtras = {
                queryParams: {},

                preserveQueryParams: false,
                relativeTo: this.route

            };
            this.router.navigate(['../'], navigationExtras);

        }

        else {
            let navigationExtras: NavigationExtras = {
                queryParams: {},
                preserveQueryParams: false,
                relativeTo: this.route

            };
            this.router.navigate(['../'], navigationExtras);
        }

    }
 

    onChangeddlCountry() {
        this.newItem.STATE = "";
        if (this.newItem.COUNTRY != null && this.newItem.COUNTRY != 'Select Country' && this.newItem.COUNTRY != undefined) {
            this.onChangeddlStates();

            if (this.newItem.COUNTRY == 'CANADA') {
                this.ddlStates = [];
                this.ddlStates.push({ countryid: 1, label: "Select State", value: "Select State" });
                var details = this.sharedData.getStates().filter((item) => item.countryid == 1)
                for (let i = 0; i < details.length; i++) {
                    this.ddlStates.push({ countryid: 1, label: details[i].label, value: details[i].value });
                }
            }
            else if (this.newItem.COUNTRY == 'USA') {
                this.ddlStates = [];
                this.ddlStates.push({ countryid: 2, label: "Select State", value: "Select State" });
                var detailslist = this.sharedData.getStates().filter((item) => item.countryid == 2)

                for (let j = 0; j < detailslist.length; j++) {
                    this.ddlStates.push({ countryid: 2, label: detailslist[j].label, value: detailslist[j].value });
                }
            }
        }
        else {
            this.ddlStates = this.sharedData.getStates().filter((item) => item.countryid == 0)
        }
    }

    onChangeddlStates() {
        if (this.newItem.COUNTRY == null || this.newItem.COUNTRY == 'Select Country' || this.newItem.COUNTRY == undefined) {

            this.ddlStates = [];
            this.ddlStates.push({ countryid: 0, label: "Select State", value: "Select State" });

            this.ddlStates = this.sharedData.getStates().filter((item) => item.countryid == 0)
        }



    }

    BindToDisPathTypeDD() {

        this.ddldispatchType = [];
        this.ddldispatchType.push({ label: "Select Dispatch Type", value: null });
        this.ddldispatchType.push({ label: 'FILE ', value: 'FILE' });
        this.ddldispatchType.push({ label: 'PHONE', value: 'PHONE' });
        this.ddldispatchType.push({ label: 'EMAIL', value: 'EMAIL' });
        this.ddldispatchType.push({ label: 'FAX', value: 'FAX' });
    }

    BindToCountryDD() {

        this.ddlcountry = this.sharedData.getCountries();

        this.ddlStates = this.sharedData.getStates().filter((item) => item.countryid == 0)
    }

    ddlOrgGrpIdChanged($event) {
        this.btnEnableDisable();
    }

    bindModelDataChange(event: any) {

        if ("txtVendorId" == event.TextBoxID.toString()) {
            this.vendorIDStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtVendorName" == event.TextBoxID.toString()) {
            this.vendorNameStatus = event.validationrules.filter(x => x.status == false).length;
        }

        if ("txtAddress1" == event.TextBoxID.toString()) {
            this.address1Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtAddress2" == event.TextBoxID.toString()) {
            this.address2Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtCity" == event.TextBoxID.toString()) {
            this.cityStatus = event.validationrules.filter(x => x.status == false).length;
        }

        if ("txtZip" == event.TextBoxID.toString()) {
            this.zipStatus = event.validationrules.filter(x => x.status == false).length;
        }

        if ("txtContactName" == event.TextBoxID.toString()) {
            this.contactNamestatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtPhone" == event.TextBoxID.toString()) {
            this.phoneStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtFax" == event.TextBoxID.toString()) {
            this.faxStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtContactEmail" == event.TextBoxID.toString()) {
            this.emailStatus = event.validationrules.filter(x => x.status == false).length;
        }


        if ("txtBillOnlyEmail" == event.TextBoxID.toString()) {
            this.billOnlyEmailStatus = event.validationrules.filter(x => x.status == false).length;
        }

        if ("txtRemainder" == event.TextBoxID.toString()) {
            this.frequencyReminderStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if (this.submitButtonTitle == "Update") {
            this.vendorIDStatus = 0;
            if (this.vendorNameStatus >= 1) {
                this.vendorNameStatus = 1;
            }
            else {
                this.vendorNameStatus = 0;
            }
        }

        this.btnEnableDisable();
    }

    /**
    * Enable and Disable Add/Update button 
    */
    btnEnableDisable() {
        if (this.submitButtonTitle == "Update") {
            this.vendorIDStatus = 0;
            if (this.vendorNameStatus >= 1) {
                this.vendorNameStatus = 1;
            }
            else {
                this.vendorNameStatus = 0;
            }
        }
        if (this.vendorIDStatus == 0 && this.newItem.VENDOR_ID !== "" && this.newItem.VENDOR_ID !== null && this.newItem.VENDOR_ID !== undefined && this.newItem.VENDOR_NAME !== "" && this.newItem.VENDOR_ID !== undefined && this.newItem.VENDOR_NAME !== null && this.newItem.VENDOR_NAME !== undefined && this.vendorNameStatus == 0 && this.newItem.ORG_GROUP_ID !== undefined && this.newItem.ORG_GROUP_ID != null) {
            if ((this.address1Status == undefined || this.address1Status == 0) && (this.address2Status == undefined || this.address2Status == 0) &&
                (this.cityStatus == undefined || this.cityStatus == 0) &&
                (this.zipStatus == undefined || this.zipStatus == 0) &&
                (this.contactNamestatus == undefined || this.contactNamestatus == 0) && (this.phoneStatus == undefined || this.phoneStatus == 0) &&
                (this.faxStatus == undefined || this.faxStatus == 0) && (this.emailStatus == undefined || this.emailStatus == 0) &&
                (this.billOnlyEmailStatus == undefined || this.billOnlyEmailStatus == 0) && (this.frequencyReminderStatus == undefined || this.frequencyReminderStatus == 0)) {
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

    //  this is create
    async createNewVendor() {
        this.msgs = [];
        try {

            //if (this.hasMultipleOrgGroups==false)
            //{
            //    this.newItem.ORG_GROUP_ID = this.lblOrgGroupId;
            //}
            if (this.newItem.VENDOR_ID == "" || this.newItem.VENDOR_ID == undefined || this.newItem.VENDOR_NAME == "" || this.newItem.VENDOR_NAME == undefined) {
                this.Validatorsmessages = "Please  enter  all mandatory fileds"
                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: this.Validatorsmessages });
            }
            else if (this.newItem.ORG_GROUP_ID == null || this.newItem.ORG_GROUP_ID == undefined) {
                this.Validatorsmessages = "Please select Org Group ID";
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.Validatorsmessages });
            }

            else {
                if (this.newItem.STATE == "Select State" || this.newItem.COUNTRY == "Select Country") {
                    this.newItem.STATE = "";
                    this.newItem.COUNTRY = "";
                }
                this.newItem.ALLOW_VEND_ACCESS = this.allowVendorAccessValidation;
                if (this.newItem.ALLOW_VEND_ACCESS == true) {
                    this.newItem.ALLOW_VEND_ACCESS = "Y";
                }
                else {
                    this.newItem.ALLOW_VEND_ACCESS = "N";
                }

                if (this.mode == (ModeEnum.Add).toString()) {


                    this.spinnerService.start();
                    await this.setupVendorServices.CreateVendor(this.newItem).forEach(resp => {
                        this.msgs = [];
                        this.spinnerService.stop();  
                        switch (resp.StatType) {
                            case StatusType.Success:
                                {
                                    this.statusMesssage = AtParConstants.Created_Msg.replace("1%", "Vendor").replace("2%", this.newItem.VENDOR_ID);
                                    // this.statusMesssage = "Vendor " + this.newItem.VENDOR_ID + " Created Successfully";
                                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                                   
                                    let tempOrgGpID = this.newItem.ORG_GROUP_ID;
                                    this.newItem = new PAR_MNGT_VENDOR();
                                    this.allowVendorAccessValidation = false;
                                    this.onChangeddlStates();                                    

                                    if (!this.hasMultipleOrgGroups) {
                                        //this.newItem.ORG_GROUP_ID = lblOrgGroupId
                                        this.newItem.ORG_GROUP_ID = tempOrgGpID;
                                    }
                                    this.loading = true;

                                    if (this.hasMultipleOrgGroups) {
                                        document.getElementById('txtddlorgGroupData').focus();
                                    }
                                    else {
                                        document.getElementById('txtVendorId').focus();
                                    }

                                    break;

                                }
                            case StatusType.Error:
                                {
                                    this.statusMesssage = resp.StatusMessage;
                                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMesssage });
                                    break;
                                }
                            case StatusType.Warn:
                                {
                                    this.statusMesssage = resp.StatusMessage;
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMesssage });
                                    break;
                                }

                            case StatusType.Custom:
                                {
                                    this.statusMesssage = resp.StatusMessage;
                                    this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMesssage });
                                    break;
                                }


                        }
                        this.atParConstant.scrollToTop();

                    });


                    this.spinnerService.stop();

                }
                else if (this.mode == (ModeEnum.Edit).toString()) {

                    //this is for update

                    this.spinnerService.start();
                    await this.setupVendorServices.UpdateVendor(this.newItem).forEach(resp => {
                        this.msgs = [];
                        this.spinnerService.stop();
                        switch (resp.StatType) {
                            case StatusType.Success:
                                {
                                    this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "Vendor").replace("2%", this.newItem.VENDOR_ID);
                                    //this.statusMesssage = "Vendor " + this.newItem.VENDOR_ID + "  Updated Successfully";
                                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                                    let tempVendID = this.newItem.VENDOR_ID;
                                    this.newItem.VENDOR_ID = tempVendID;
                                    this.onChangeddlStates();
                                    if (this.hasMultipleOrgGroups) {
                                        document.getElementById('txtddlorgGroupData').focus();
                                    }
                                    else {
                                        document.getElementById('txtVendorName').focus();
                                    }
                                    break;
                                }

                            case StatusType.Error:
                                {
                                    this.statusMesssage = resp.StatusMessage;
                                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMesssage });
                              
                                    break;
                                }

                            case StatusType.Warn:
                                {
                                    this.statusMesssage = resp.StatusMessage;
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMesssage });
                                 
                                    break;
                                }

                            case StatusType.Custom:
                                {
                                    this.statusMesssage = resp.StatusMessage;
                                    this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMesssage });
                             
                                    break;
                                }

                        }

                        this.spinnerService.stop();
                        this.atParConstant.scrollToTop();
                    });
                }
                else {
                    this.newItem = new PAR_MNGT_VENDOR();
                }

            }


        }

        catch (ex) {
            this.spinnerService.stop();
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: ex.toString() });

        }

    }

    clearAllFields() {
        this.newItem = null;
    }

    ngOnDestroy() {

        this._deviceTokenEntry = null;
        this.mode = null;
        this.orgGroupList = null;
        this.lblOrgGroupId = null;
        this.loading = null;
        this.statusMesssage = null;
        this.hasMultipleOrgGroups = null;
        this.ddldispatchType = null;
        this.ddlUserIdData = null;
        this.screenTitle = null;
        this.submitButtonTitle = null;
        this.isEditMode = null;
        this.newItem = null;
    }

}
