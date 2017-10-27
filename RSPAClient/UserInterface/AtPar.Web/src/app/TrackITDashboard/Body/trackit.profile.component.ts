import {
    Component,
    OnInit,
    OnDestroy, AfterViewInit
} from '@angular/core';

import { Title } from '@angular/platform-browser';
import { SpinnerService } from '../../components/spinner/event.spinner.service';
import { HttpService } from '../../Shared/HttpService';
import { AtParWebApiResponse } from '../../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, StatusType } from '../../Shared/AtParEnums';
import { MT_ATPAR_USER_PROFILE_APP_ACL_ORG } from '../../Entities/MT_ATPAR_USER_PROFILE_APP_ACL_ORG';
import { ATPAR_VALIDATION_RULES } from '../../entities/atpar_validation_rules';
import { AtParConstants } from '../../Shared/AtParConstants';
import { TrackITUserProfileService } from './trackit-profile.service';
import { TKIT_REQUESTOR } from '../../Entities/TKIT_REQUESTOR';
import { RM_SHIP_TO_LOCACTION } from '../../Entities/RM_SHIP_TO_LOCACTION';
import { SelectItem, Message } from '../../components/common/api';
import * as CryptoJS from 'crypto-js';
import { Http, Response, Jsonp, RequestOptions, Headers, } from '@angular/http';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'trackit.profile.component.html',
    providers: [
        HttpService,
        AtParConstants,
        TrackITUserProfileService
    ],

})

export class TrackITProfileComponent implements AfterViewInit {

    ddRecordsPerPage: any[] = [];
    growlMessage: Message[] = [];
    tkitDeviceTokenEntry: string[] = [];
    model: TKIT_REQUESTOR;
    lstLocations: SelectItem[] = [];
    selectedLocation: string = "";
    selectedPage: number;
    txtCurrentPwdStatus: number;
    txtNewPwdStatus: number;
    txtCnfrmPwdStatus: number;
    txtFirstNameStatus: number;
    txtLastNameStatus: number;
    txtMiddleNameStatus: number;
    txtEmailIDStatus: number;
    txtPhoneStatus: number;
    txtFaxStatus: number;
    txtPagesStatus: number;
    txtDurationStatus: number;
    txtRequestStatus: number;
    btnEnableDisable: boolean = true;
    encryptedCurrentPwd: any;
    encryptedNewCurrentPwd: any;
    password: any = "";
    newPassword: any = "";
    trackItUserSelectedFile: string = "";
    showUploadImage: boolean = false;

    constructor(
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private service: TrackITUserProfileService,
        private title: Title,
        private http: Http
    ) {
        try {
            this.title.setTitle('TrackIT - Requestor Profile');
        } catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }

    ngOnInit() {
        try {
            this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
            this.getRecordsPerPageddData();
            this.model = new TKIT_REQUESTOR();
            this.bindLocations();
            this.getUserDetails();

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

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async getUserDetails() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            await this.service.getUserDetails(this.tkitDeviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<TKIT_REQUESTOR>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.model = data.Data;
                            this.selectedLocation = data.Data.LOCATION_ID;
                            this.selectedPage = data.Data.RECORDS_PER_PAGE;
                            //this.model.PASSWORD = "";
                            if (this.model.FIRST_NAME == null || this.model.FIRST_NAME == undefined || this.model.FIRST_NAME === "") {
                                this.txtFirstNameStatus = null;
                            }
                            else {
                                this.txtFirstNameStatus = 0;
                            }
                            if (this.model.LAST_NAME == null || this.model.LAST_NAME == undefined || this.model.LAST_NAME === "") {
                                this.txtLastNameStatus = null;
                            }
                            else {
                                this.txtLastNameStatus = 0;
                            }
                            if (this.model.DEFAULT_REPORT_DURATION == null || this.model.DEFAULT_REPORT_DURATION == undefined) {
                                this.txtDurationStatus = null;
                            }
                            else {
                                this.txtDurationStatus = 0;
                            }
                            if (this.model.NO_OF_REQUESTS_FOR_SAME_EQ_ITM == null || this.model.NO_OF_REQUESTS_FOR_SAME_EQ_ITM == undefined) {
                                this.txtRequestStatus = null;
                            }
                            else {
                                this.txtRequestStatus = 0;
                            }
                            if (this.txtFirstNameStatus == 0 && this.txtLastNameStatus == 0 && this.txtDurationStatus == 0 && this.txtRequestStatus == 0) {
                                this.btnEnableDisable = false;
                            }
                            else {
                                this.btnEnableDisable = true;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });



        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    async bindLocations() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            await this.service.getLocations().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<RM_SHIP_TO_LOCACTION>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {

                            this.lstLocations.push({ label: "Select One", value: "Select One" })
                            for (var i = 0; i < data.DataList.length; i++) {
                                this.lstLocations.push({ label: data.DataList[i].LOCATION_ID + ' - ' + data.DataList[i].LOCATION_NAME, value: data.DataList[i].LOCATION_ID })
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    async encryptPwd() {
        var key = CryptoJS.enc.Utf8.parse('8080808080808080');
        var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

        this.encryptedCurrentPwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.model.PASSWORD), key,
            { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

        this.encryptedNewCurrentPwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.model.NEWPASSWORD), key,
            { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    }

    async updateUserDetails() {
        try {
            if (this.model.PASSWORD == null || this.model.PASSWORD == undefined || this.model.PASSWORD === "") {
                this.model.PASSWORD = "";
            }
            if (this.model.NEWPASSWORD == null || this.model.NEWPASSWORD == undefined || this.model.NEWPASSWORD === "") {
                this.model.NEWPASSWORD = "";
            }
            if (this.model.CNFRMPASSWORD == null || this.model.CNFRMPASSWORD == undefined || this.model.CNFRMPASSWORD === "") {
                this.model.CNFRMPASSWORD = "";
            }

            await this.encryptPwd();
            if (this.model.PASSWORD != "") {
                if (this.model.NEWPASSWORD == "" && this.model.CNFRMPASSWORD == "") {
                    (<HTMLInputElement>document.getElementById('txtNewPwd')).focus();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'please enter new password and confirm password' });
                    return;
                }
                else if (this.model.NEWPASSWORD == "") {
                    (<HTMLInputElement>document.getElementById('txtNewPwd')).focus();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'please enter new password' });
                    return;
                }
                else {
                    this.password = this.encryptedCurrentPwd;
                }

            }
            if (this.model.NEWPASSWORD != "") {
                if (this.model.PASSWORD == "") {
                    (<HTMLInputElement>document.getElementById('txtCurrentPwd')).focus();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'please enter current password' });
                    return;
                }
                else if (this.model.CNFRMPASSWORD == "") {
                    (<HTMLInputElement>document.getElementById('txtCnfrmPwd')).focus();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'please enter confirm password' });
                    return;
                }
                else if (this.model.NEWPASSWORD != this.model.CNFRMPASSWORD) {
                    (<HTMLInputElement>document.getElementById('txtCnfrmPwd')).focus();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'New Password and Confirm Password are different' });
                    return;
                }
                else {
                    this.newPassword = this.encryptedNewCurrentPwd;
                }
            }

            //this.model.PASSWORD = "";
            //this.model.NEWPASSWORD = "";


            this.spinnerService.start();
            this.model.LOCATION_ID = this.selectedLocation;
            this.model.RECORDS_PER_PAGE = this.selectedPage;
            this.growlMessage = [];
            await this.service.saveRequestorDetails(this.model, this.password, this.newPassword).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            let msg = AtParConstants.Updated_Msg.replace("1%", 'User').replace("2%", this.model.REQUESTOR_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                            (<HTMLInputElement>document.getElementById('txtCurrentPwd')).focus();
                            this.model.CNFRMPASSWORD = "";
                            this.model.NEWPASSWORD = "";
                            this.model.PASSWORD = "";
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            if (data.StatusCode == 1112444) {
                                (<HTMLInputElement>document.getElementById('txtCurrentPwd')).focus();
                            }
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    bindModelDataChange(event: any) {
        //if ("txtCurrentPwd" == event.TextBoxID.toString()) {
        //    this.txtCurrentPwdStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        //if ("txtNewPwd" == event.TextBoxID.toString()) {
        //    this.txtNewPwdStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        //(this.txtCurrentPwdStatus == 0 || this.txtCurrentPwdStatus == undefined) && (this.txtNewPwdStatus == 0 || this.txtNewPwdStatus == undefined) && (this.txtCnfrmPwdStatus == 0 || this.txtCnfrmPwdStatus == undefined)
        //if ("txtCnfrmPwd" == event.TextBoxID.toString()) {
        //    this.txtCnfrmPwdStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        if ("txtFirstName" == event.TextBoxID.toString()) {
            this.txtFirstNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtLastName" == event.TextBoxID.toString()) {
            this.txtLastNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtMiddleName" == event.TextBoxID.toString()) {
            this.txtMiddleNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtEmailID" == event.TextBoxID.toString()) {
            this.txtEmailIDStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtPhone" == event.TextBoxID.toString()) {
            this.txtPhoneStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtFax" == event.TextBoxID.toString()) {
            this.txtFaxStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtPager" == event.TextBoxID.toString()) {
            this.txtPagesStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtDuration" == event.TextBoxID.toString()) {
            this.txtDurationStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtRequests" == event.TextBoxID.toString()) {
            this.txtRequestStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if (this.txtFirstNameStatus == 0 && this.txtLastNameStatus == 0 && this.txtDurationStatus == 0 && this.txtRequestStatus == 0) {
            if ((this.txtMiddleNameStatus == 0 || this.txtMiddleNameStatus == undefined) && (this.txtPhoneStatus == 0 || this.txtPhoneStatus == undefined) &&
                (this.txtFaxStatus == 0 || this.txtFaxStatus == undefined) && (this.txtEmailIDStatus == 0 || this.txtEmailIDStatus == undefined) && (this.txtPagesStatus == 0 || this.txtPagesStatus == undefined)) {
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



    ngAfterViewInit() {
        (<HTMLInputElement>document.getElementById('txtCurrentPwd')).focus();
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

            this.http.post(apiUrl, formData, options)
                .toPromise()
                .then((res: Response) => {
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    let data = res.json();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.files = '';
                            this.showUploadImage = false;
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.showUploadImage = true;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.showUploadImage = true;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
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



    ngOnDestroy() {
        this.ddRecordsPerPage = null;
        this.growlMessage = null;
        this.tkitDeviceTokenEntry = null;
        this.model = null;
        this.lstLocations = null;
        this.selectedLocation = null;
        this.selectedPage = null;
        this.txtCurrentPwdStatus = null;
        this.txtNewPwdStatus = null;
        this.txtCnfrmPwdStatus = null;
        this.txtFirstNameStatus = null;
        this.txtLastNameStatus = null;
        this.txtMiddleNameStatus = null;
        this.txtEmailIDStatus = null;
        this.txtPhoneStatus = null;
        this.txtFaxStatus = null;
        this.txtPagesStatus = null;
        this.txtDurationStatus = null;
        this.txtRequestStatus = null;
        this.encryptedCurrentPwd = null;
        this.encryptedNewCurrentPwd = null;
        this.password = null;
        this.newPassword = null;
    }
}
