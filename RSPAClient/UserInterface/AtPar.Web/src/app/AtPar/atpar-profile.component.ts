import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, StatusType } from '../Shared/AtParEnums';
import { MT_ATPAR_USER_PROFILE_APP_ACL_ORG } from '../Entities/MT_ATPAR_USER_PROFILE_APP_ACL_ORG';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { ATPAR_VALIDATION_RULES } from '../entities/atpar_validation_rules';
import { Message } from './../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
declare var module: {
    id: string;
}
@Component({

    templateUrl: 'atpar-profile.component.html',
    providers: [HttpService, AtParConstants],
})

export class AtparProfile implements OnInit {
    showStyle: boolean = false;
    isNotAdmin: boolean = false;
    isLDAPUser: boolean = false;
    isFormInValid: boolean = true;
    statusCode: number = 0;
    errorMessage: string = '';
    statusMessage: string = "";
    btnEnableDisable: boolean = true;
    model: MT_ATPAR_USER_PROFILE_APP_ACL_ORG;
    _deviceTokenEntry: string[] = [];
    msgs: Message[] = [];
    ddRecordsPerPage: any[] = [];
    txtSessionValidityTimeStatus: number;
    txtIdleTimeStatus: number;
    txtFnameStatus: number;
    txtLnameStatus: number;
    txtMiddleInitialStatus: number;
    txtEmailStatus: number;
    txtPhne1Status: number;
    txtPhne2Status: number;
    txtFaxStatus: number;
    txtPagerStatus: number;
    txtDefaultDurationStatus: number;

    constructor(
        private httpservice: HttpService,
        private leftBarAnimationService: LeftBarAnimationService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private title: Title
    ) {
        try {
            this.title.setTitle('My Profile');
            this.model = new MT_ATPAR_USER_PROFILE_APP_ACL_ORG();
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        } catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }

    getMargin() {
        try {
            this.showStyle = this.leftBarAnimationService.getLeftBarMargin();
            if (this.showStyle) {
                return "";
            } else {
                return "0px";
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "getMargin");
        }
    }

    ngOnInit() {
        try {
            this.getRecordsPerPageddData();
            this.getUserDetails();
            if (this.model.DEFAULT_REPORT_DURATION == 0) {
                this.txtDefaultDurationStatus = 1;
            }
            else {
                this.txtDefaultDurationStatus = 0;
            }
            this.btnEnableDisable = false;
            this.txtFnameStatus = 0;
            this.txtLnameStatus = 0;           
            this.txtSessionValidityTimeStatus = 0;
            this.txtIdleTimeStatus = 0;
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

    async getUserDetails() {
        try {
            this.spinnerService.start();
            await this.httpservice.get({
                "apiMethod": "/api/User/GetUser",
                params: {
                    "userId": this._deviceTokenEntry[TokenEntry_Enum.UserID]
                }
            }).catch(this.httpservice.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL_ORG>).subscribe(
                (res2) => {
                    switch (res2.StatType) {

                        case StatusType.Success: {
                            if (res2.Data != null) {
                                this.model = res2.Data;
                                this.model.ORG_GROUP_ID = this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
                                this.model.PROFILE_ID = this._deviceTokenEntry[TokenEntry_Enum.ProfileID];

                                if (this.model.USER_ID.toUpperCase() == 'ADMIN') {
                                    this.isNotAdmin = false;
                                }
                                else {
                                    this.isNotAdmin = true;
                                }
                                if (this._deviceTokenEntry[TokenEntry_Enum.ProfileID] == 'VENDOR')
                                {
                                    this.isNotAdmin = true;
                                }
                                if (this.model.LDAP_USER == 'Y') {
                                    this.isLDAPUser = true
                                }
                                else {
                                    this.isLDAPUser = false;
                                }
                             
                                if (this.model.USER_ID != null && this.model.USER_ID != '') {
                                    this.model.USER_ID = this.model.USER_ID.toUpperCase();
                                }
                                break;
                            }
                        }
                        case StatusType.Warn: {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex, "getUserDetails");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    updateUserDetails(model) {
        try {
            if (model.DEFAULT_REPORT_DURATION == '0') {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Duration should be between 1 to 9999" });
                return;
            }
            if (model.RECORDS_PER_PAGE == null || model.RECORDS_PER_PAGE == undefined) {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Select Records Per Page" });
            }
            else {
                this.spinnerService.start();
                this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage] = model.RECORDS_PER_PAGE;
                localStorage.setItem('DeviceTokenEntry', JSON.stringify(this._deviceTokenEntry));
                if (model.USER_ID != '' && model.TOKEN_EXPIRY_PERIOD && model.IDLE_TIME && model.FIRST_NAME && model.LAST_NAME && model.RECORDS_PER_PAGE && model.DEFAULT_REPORT_DURATION) {
                    this.httpservice.update({
                        "apiMethod": "/api/User/SaveUserDetails",
                        formData: model
                    }).catch(this.httpservice.handleError)
                        .map((res: Response) => res.json() as AtParWebApiResponse<number>)
                        .subscribe(
                        (res2) => {
                            this.statusCode = res2.StatusCode;
                            switch (res2.StatType) {

                                case StatusType.Success: {
                                    this.statusMessage = "User " + model.USER_ID + " Profile Updated Successfully";
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                                    (<HTMLInputElement>document.getElementById('TOKEN_EXPIRY_PERIOD')).focus();
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
                                    break;
                                }
                                case StatusType.Error: {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                                    break;
                                }
                            }
                            this.atParConstant.scrollToTop();
                        });
                }
                else {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'All * fields are mandatory' });
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "updateUserDetails");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    clientErrorMsg(ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }

    bindModelDataChange(event: any) {
        if ("TOKEN_EXPIRY_PERIOD" == event.TextBoxID.toString()) {
            this.txtSessionValidityTimeStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("IDLE_TIME" == event.TextBoxID.toString()) {
            this.txtIdleTimeStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("FIRST_NAME" == event.TextBoxID.toString()) {
            this.txtFnameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("LAST_NAME" == event.TextBoxID.toString()) {
            this.txtLnameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("MIDDLE_INITIAL" == event.TextBoxID.toString()) {
            this.txtMiddleInitialStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("EMAIL_ID" == event.TextBoxID.toString()) {
            this.txtEmailStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("PHONE1" == event.TextBoxID.toString()) {
            this.txtPhne1Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("PHONE2" == event.TextBoxID.toString()) {
            this.txtPhne2Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("FAX" == event.TextBoxID.toString()) {
            this.txtFaxStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("PAGER" == event.TextBoxID.toString()) {
            this.txtPagerStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("DEFAULT_REPORT_DURATION" == event.TextBoxID.toString()) {
            this.txtDefaultDurationStatus = event.validationrules.filter(x => x.status == false).length;
            if (this.model.DEFAULT_REPORT_DURATION == 0) {
                this.txtDefaultDurationStatus = 1;
            }
        }
        if (this.txtSessionValidityTimeStatus == 0 && this.txtIdleTimeStatus == 0 && this.txtFnameStatus == 0 && this.txtLnameStatus == 0 && this.txtDefaultDurationStatus == 0) {
            if ((this.txtMiddleInitialStatus == 0 || this.txtMiddleInitialStatus == undefined) && (this.txtEmailStatus == 0 || this.txtEmailStatus == undefined)
                && (this.txtPhne1Status == 0 || this.txtPhne1Status == undefined) && (this.txtPhne2Status == 0 || this.txtPhne2Status == undefined) &&
                (this.txtFaxStatus == 0 || this.txtFaxStatus == undefined) && (this.txtPagerStatus == 0 || this.txtPagerStatus == undefined)) {
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

    OnDestroy() {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.model = null;
        this._deviceTokenEntry = null;
        this.statusCode = null;
        this.errorMessage = null;
        this.showStyle = null;
        this.isNotAdmin = null;
        this.isLDAPUser = null;
        this.isFormInValid = null;
        this.txtFnameStatus = null;
        this.txtLnameStatus = null;
        this.txtMiddleInitialStatus = null;
        this.txtEmailStatus = null;
        this.txtPhne1Status = null;
        this.txtPhne2Status = null;
        this.txtFaxStatus = null;
        this.txtPagerStatus = null;
        this.txtDefaultDurationStatus = null;
        this.txtDefaultDurationStatus = null;
        this.txtIdleTimeStatus = null;
        localStorage.removeItem("BreadCrumbMenus");
    }

}