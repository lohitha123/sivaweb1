import {
    NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy,
    Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { datatableservice } from './../components/datatable/datatableservice';
import { ManageRequestorServices } from "../../app/TrackIT/tkit-manage-requestor.services";
import { AtParConstants } from "../Shared/AtParConstants";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType, ModeEnum, StatusType } from '../Shared/AtParEnums';
import { SelectItem, Message } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Http, Response, Jsonp, RequestOptions, Headers, } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { TKIT_REQUESTOR } from "../../app/Entities/TKIT_REQUESTOR";
import { TKIT_DEPT } from "../../app/Entities/TKIT_DEPT";
import { TKIT_REQUESTOR_DEPT } from "../../app/Entities/TKIT_REQUESTOR_DEPT";
import { RM_SHIP_TO_LOCACTION } from "../../app/Entities/RM_SHIP_TO_LOCACTION";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import * as CryptoJS from 'crypto-js';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'tkit-manage-requestor-modify.component.html',
    providers: [ManageRequestorServices, AtParConstants]
})

export class ManageRequestorModifyComponent {
    public newItem = new TKIT_REQUESTOR();
    requestorData: TKIT_REQUESTOR[];
    requestorID: string;
    departmentsData: TKIT_DEPT[];
    lstDepartments: SelectItem[] = [];
    lstSelectedDepartments:any;
    lstLocations: SelectItem[] = [];
    locationData: RM_SHIP_TO_LOCACTION[];
    mainlstGridData: Array<TKIT_REQUESTOR>;
    statusType: string = "";
    sortedData: TKIT_REQUESTOR[];
    statusList: any;
    _deviceTokenEntry: string[] = [];
    requestorIdSearch: string;
    mode: string;
    msgs: Message[] = [];
    isVisible: boolean = false;
    pazeSize: number;
    isUpdate: boolean = false;
    breadCrumbMenu: Menus;
    bindSymbal: string;
    isEditMode: boolean;
    loading: boolean = true;
    showLable: boolean = false;
    showTextBox: boolean = false;
    orgGroupList: MT_ATPAR_ORG_GROUPS[];
    orgGroupData: SelectItem[] = [];
    seletedOrgGroupId: string;
    statusMesssage: string = "";
    Title: string = "";
    requestorStatus: number;
    passwordStatus: number;
    firstNameStatus: number;
    lastNameStatus: number;
    middleNameStatus: number;
    emailStatus: number;
    phoneStatus: number;
    faxStatus: number;
    pagerStatus: number;
    recordsPerPageStatus: number;
    defaultRptDurationStatus: number;
    orgGroupStatus: number;
    departmentStatus: number;
    deliverLocationtatus: number;
    visiblePassword = false;
    activeLblPassword: String;
    trackItUserSelectedFile: string = "";
    showUploadImage: boolean = false;
    ddRecordsPerPage: any[] = [];
    encryptedCurrentPwd: any;

    constructor(private manageRequestorServices: ManageRequestorServices,
        private router: Router,
        private spinnerService: SpinnerService,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService,
        private http: Http,
        private httpService: HttpService) {
        this.breadCrumbMenu = new Menus();
    }

    async ngOnInit() {
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.getTrackITAllDepartments();
        this.getLocations();
        this.getOrgGroupList();
        this.getRecordsPerPageddData();
        try {
            this.mode = this.atParSharedDataService.storage.mode;
            if (this.mode == (ModeEnum.Add).toString()) {
                this.showLable = false;
                this.showTextBox = true;
                this.newItem = new TKIT_REQUESTOR();
                this.Title = "Save";
                this.bindSymbal = "floppy-o"
                this.newItem.checkStatus = true;
                this.newItem.STATUS = 'A';
                this.newItem.RECORDS_PER_PAGE = 10;
            }
            else if (this.mode == (ModeEnum.Edit).toString()) {
                this.showLable = true;
                this.bindSymbal = "check";
                this.isEditMode = true;
                this.loading = false;
                this.showTextBox = false;
                this.Title = "Update Requestor";
                this.requestorID = this.atParSharedDataService.storage.requestorID;
                if (this.requestorID != undefined && this.requestorID != null) {

                    await this.getRequestorDetails();
                }

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }
    

    getRecordsPerPageddData() {
        try {
            for (var i = 10; i <= 100;) {
                this.ddRecordsPerPage.push({ label: i.toString(), value: i.toString() });
                i += 10;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "getRecordsPerPageddData");
        }
    }

    onFocusPassword() {
        try {
            if (this.newItem.PASSWORD == "undefined") {
                this.visiblePassword = !this.visiblePassword;
            }
            else {
                this.visiblePassword = true;
            }
            this.activeLblPassword = this.visiblePassword ? 'input-disturbed' : 'hide-class';
        } catch (ex) {
            this.clientErrorMsg(ex, "onFocusPassword");
        }
    }

    locationChange(): void {
        if (this.newItem.LOCATION_ID != undefined && this.newItem.LOCATION_ID != null && this.newItem.LOCATION_ID != "") {
            this.deliverLocationtatus = 0;
        }
        else {
            this.deliverLocationtatus = 1;
        }
    }

    checkPswdValidation() {
        if (this.newItem.PASSWORD == "") {
            this.loading = true;
        }
        else {
            this.loading = false;
        }
    }

    bindModelDataChange(event) {
        try {
            if (this.Title == "Update Requestor") {
                this.requestorStatus = 0;
                this.firstNameStatus = 0;
                this.lastNameStatus = 0;
                this.recordsPerPageStatus = 0;
                this.defaultRptDurationStatus = 0;
            }

            if ("txtRequetorId" == event.TextBoxID.toString()) {
                this.requestorStatus = event.validationrules.filter(x => x.status == false).length;
            }

            if ("txtFirstName" == event.TextBoxID.toString()) {
                this.firstNameStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtLastName" == event.TextBoxID.toString()) {
                this.lastNameStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtMiddleName" == event.TextBoxID.toString()) {
                this.middleNameStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtEmail" == event.TextBoxID.toString()) {
                this.emailStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtPhone" == event.TextBoxID.toString()) {
                this.phoneStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtFax" == event.TextBoxID.toString()) {
                this.faxStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtPager" == event.TextBoxID.toString()) {
                this.pagerStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("ddlddRecordsPerPage" == event.TextBoxID.toString()) {
                this.recordsPerPageStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtDefaultRptDuration" == event.TextBoxID.toString()) {
                this.defaultRptDurationStatus = event.validationrules.filter(x => x.status == false).length;
            }

            if (this.newItem.PASSWORD == "") {
                this.loading = true;
            }
            else {
                this.loading = false;
            }
            this.btnEnableDisable();
        } catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }

    }

    btnEnableDisable() {
        if (this.Title == "Update Requestor") {
            this.requestorStatus = 0;
            this.firstNameStatus = 0;
            this.lastNameStatus = 0;
            this.recordsPerPageStatus = 0;
            this.defaultRptDurationStatus = 0;
        }
        if (this.requestorStatus == 0 && this.newItem.REQUESTOR_ID != "" && this.newItem.REQUESTOR_ID != null && this.newItem.REQUESTOR_ID != undefined
            && this.newItem.PASSWORD != undefined && this.newItem.PASSWORD != null && this.newItem.PASSWORD != ""
            && this.firstNameStatus == 0 && this.newItem.FIRST_NAME != undefined && this.newItem.FIRST_NAME != null && this.newItem.FIRST_NAME != ""
            && this.lastNameStatus == 0 && this.newItem.LAST_NAME !== undefined && this.newItem.LAST_NAME != null && this.newItem.LAST_NAME !== ""
            && this.defaultRptDurationStatus == 0 && this.newItem.DEFAULT_REPORT_DURATION != undefined && this.newItem.DEFAULT_REPORT_DURATION != null && this.newItem.DEFAULT_REPORT_DURATION != 0
            && this.newItem.ORG_GROUP_ID != undefined && this.newItem.ORG_GROUP_ID != null && this.newItem.ORG_GROUP_ID != "Select One"
            && this.lstSelectedDepartments != undefined && this.lstSelectedDepartments != null && this.lstSelectedDepartments.length > 0) {
            if ((this.middleNameStatus == undefined || this.middleNameStatus == 0) &&
                (this.phoneStatus == undefined || this.phoneStatus == 0) &&
                (this.emailStatus == undefined || this.emailStatus == 0) &&
                (this.faxStatus == undefined || this.faxStatus == 0) &&
                (this.pagerStatus == undefined || this.pagerStatus == 0)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        } else {
            this.loading = true;
        }

    }

    async getTrackITAllDepartments() {
        this.spinnerService.start();
        await this.manageRequestorServices.getTKITAllDepts('', 'A', this._deviceTokenEntry)
            .forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success: {
                        if (this.isUpdate == false) {
                            this.msgs = [];
                        }
                        this.msgs = [];
                        this.departmentsData = resp.DataList;

                        this.lstDepartments = [];
                        for (var i = 0; i < this.departmentsData.length; i++) {
                            this.lstDepartments.push({ label: this.departmentsData[i].DESCRIPTION + " - " + this.departmentsData[i].DEPT_ID, value: this.departmentsData[i].DEPT_ID })
                        }
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Error: {
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                }
            });
    }

    async getLocations() {
        this.spinnerService.start();
        await this.manageRequestorServices.getLocations(this._deviceTokenEntry)
            .forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success: {
                        if (this.isUpdate == false) {
                            this.msgs = [];
                        }
                        this.msgs = [];
                        this.lstLocations = [];
                        this.locationData = resp.DataList;
                        this.lstLocations.push({ label: "Select Deliver Location", value: "" });
                        for (var i = 0; i < this.locationData.length; i++) {
                            this.lstLocations.push({ label: this.locationData[i].LOCATION_NAME + " (" + this.locationData[i].LOCATION_ID + ")", value: this.locationData[i].LOCATION_ID })
                        }
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Error: {
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                }
            });
    }

    async getOrgGroupList() {
        this.spinnerService.start();
        await this.manageRequestorServices.getOrgGroupList(this._deviceTokenEntry[TokenEntry_Enum.UserID])
            .forEach(resp => {
                this.msgs = [];
                this.orgGroupData = [];
                this.orgGroupData.push({ label: 'Select One', value: 'Select One' });
                switch (resp.StatType) {
                    case StatusType.Success: {
                        this.orgGroupList = [];
                        this.orgGroupList = resp.DataList;
                        if (this.orgGroupList.length) {
                            for (let i = 0; i < this.orgGroupList.length; i++) {
                                this.orgGroupData.push({ label: this.orgGroupList[i].ORG_GROUP_ID + '-' + this.orgGroupList[i].ORG_GROUP_NAME, value: this.orgGroupList[i].ORG_GROUP_ID })
                            }
                        }
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs = [];
                        this.statusMesssage = resp.StatusMessage;
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                }
            });
    }

    async getRequestorDetails() {
        this.spinnerService.start();
        await this.manageRequestorServices.getRequestorDetails(this.requestorID, this._deviceTokenEntry)
            .forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success: {
                        if (this.isUpdate == false) {
                            this.msgs = [];
                        }
                        this.msgs = [];

                        this.newItem = resp.DataDictionary.Requestors[0];
                        if (this.newItem.STATUS == 'A') {
                            this.newItem.checkStatus = true;
                        } else {
                            this.newItem.checkStatus = false;
                        }
                        setTimeout(() => {
                        this.lstSelectedDepartments = [];
                            this.lstSelectedDepartments = resp.DataDictionary.Departments;}, 300);
                        
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Error: {
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                }
            });
    }

    async createOrModifyRequestor() {
        try {
            if (this.newItem.checkStatus == false) {
                this.newItem.STATUS = 'I'
            }
            else { this.newItem.STATUS = 'A' }

            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

            this.encryptedCurrentPwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.newItem.PASSWORD), key,
                { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

            if (this.mode == (ModeEnum.Add).toString()) {
                await this.manageRequestorServices.saveRequestorDetails(this.newItem, this.lstSelectedDepartments, this.encryptedCurrentPwd ,this._deviceTokenEntry).forEach(resp => {
                    this.msgs = [];
                    switch (resp.StatType) {
                        case StatusType.Success: {
                            this.statusMesssage = AtParConstants.Created_Msg.replace("1%", "Requestor").replace("2%", this.newItem.REQUESTOR_ID);
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            this.newItem = new TKIT_REQUESTOR();
                            this.seletedOrgGroupId = "";
                            this.lstSelectedDepartments = [];
                            this.newItem.LOCATION_ID = "";
                            this.newItem.RECORDS_PER_PAGE = 10;
                            this.loading = true;
                            this.newItem.STATUS = 'A';
                            this.newItem.checkStatus = true;
                            document.getElementById('txtRequetorId').focus();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMesssage = resp.StatusMessage;
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMesssage = resp.StatusMessage;
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            break;
                        }
                    }
                });
            }
            else if (this.mode == (ModeEnum.Edit).toString()) {
                this.spinnerService.start();
                this.newItem.checkStatus == true ? this.newItem.STATUS = 'A' : this.newItem.STATUS = 'I';
                await this.manageRequestorServices.updateRequestorDetails(this.newItem, this.lstSelectedDepartments, this.encryptedCurrentPwd, this._deviceTokenEntry).forEach(resp => {
                    this.msgs = [];
                    switch (resp.StatType) {
                        case StatusType.Success: {
                            this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "Requestor").replace("2%", this.newItem.REQUESTOR_ID);
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            document.getElementById('txtPassword').focus();
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMesssage = resp.StatusMessage;
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMesssage = resp.StatusMessage;
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    files: any;
    fileUpload(event) {
        try {
            this.spinnerService.start();
            let fileList: FileList = event.target.files;
            this.trackItUserSelectedFile = event.target.files[0].name;
            let formData: FormData = new FormData();
            if (fileList.length > 0) {
                let file: File = fileList[0];
                this.files = file.name;
                var listData = [];
                var obj = { FileName: file.name, File: file };
                listData.push(obj);
                formData.append('uploadFile', file, file.name);
            }
            let headers = new Headers();
            headers.append('Authorization', 'bearer');
            headers.append('enctype', 'multipart/form-data');
            let options = new RequestOptions({ headers: headers });
            let apiUrl = this.httpService.BaseUrl + "/api/CommonTrackIT/SaveTrackItUserProfileImage";

            this.http.post(apiUrl, formData, options).toPromise()
                .then((res: Response) => {
                    this.msgs = [];
                    this.spinnerService.stop();
                    let data = res.json();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.files = '';
                            this.showUploadImage = false;
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.showUploadImage = true;
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.showUploadImage = true;
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                },
                error => console.log(error)
                );
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileUpload");
        }
    }

    navigateToRequestorterHome() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        let navigationExtras: NavigationExtras = {
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    }

    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    /**
  * delete all the values from variables
  */
    ngOnDestroy() {
        this._deviceTokenEntry = [];
        this.msgs = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.requestorData = [];
    }
}