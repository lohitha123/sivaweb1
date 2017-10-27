import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserUploadAutomationService } from '../Init/atpar-user-upload-automation.component.service'
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';
import {
    StatusType,
    BusinessType,
    TokenEntry_Enum,
    ClientType,
    YesNo_Enum,
    Cart_QtyOption_Enum,
    Cart_File_Type,
    DataSet_Type,
    Enum_UserData,
    Enum_ProfileData,
    Enum_OrgGroupData,
    Enum_Upload_Summary
} from '../Shared/AtParEnums';

import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message, ConfirmationService } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { saveAs } from 'file-saver';
//import { saveAs } from 'file-saver';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-user-upload-automation.component.html',
    providers: [
        UserUploadAutomationService,
        AtParCommonService,
        AtParConstants,
        ConfirmationService
    ]
})

export class UserUploadAutomationComponent implements OnInit {

    _deviceTokenEntry: string[] = [];
    _statusCode: string;
    strUserPath: string = '';
    strProfilePath: string = '';
    strOrgPath: string = '';
    strERPvalue: string = '';
    _strErr: string = '';
    strPrintAction: string = '';
    qryPrint: string = '';
    qryExcel: string = '';

    userSelectedFile: string = '';
    profileSelectedFile: string = '';
    orgGroupSelectedFile: string = '';
    HdnProfileUplaoded: string = '';

    strUserPathExist: boolean = false;
    strProfilePathExist: boolean = false;
    strOrgPathExist: boolean = false;
    chkUser: boolean = false;
    chkOrgGroup: boolean = false;
    chkProfile: boolean = false;

    userPostedFiles: FileList;
    profilePostedFiles: FileList;
    orgGroupPostedFiles: FileList;

    msgs: Message[] = [];

    dsUserdata: any;
    dsProfiledata: any;
    dsOrgGroupdata: any;
    dsUploadData: any;

    _strUserUploadPath: string;
    _strProfileUploadPath: string;
    _strOrgGroupUploadPath: string;

    lblTotalNoOfRec: number = 0;
    lblSuccessCnt: number = 0;
    lblFailureCnt: number = 0;
    lblAddedNoOfRec: number = 0;
    lblUpdatedNoOfRec: number = 0;
    _blnUserDataExists: boolean = false;

    lblOrgTotalNoOfRec: number = 0;
    lblOrgSuccessCnt: number = 0;
    lblOrgFailureCnt: number = 0;
    lblOrgWarningCnt: number = 0;
    lblOrgAddedNoOfRec: number = 0;
    lblOrgUpdatedNoOfRec: number = 0;
    _blnOrgDataExists: boolean = false;

    lblProfileTotalNoOfRec: number = 0;
    lblProfileSuccessCnt: number = 0;
    lblProfileFailureCnt: number = 0;
    lblProfileAddedNoOfRec: number = 0;
    lblprofileUpdatedNoOfRec: number = 0;
    _blnProfileDataExists: boolean = false;

    tblGrd: boolean = false;
    tblOrgGrd: boolean = false;
    tblProfileGrd: boolean = false;
    trInputFields: boolean = false;
    tdOptions: boolean = false;
    dgridErrorDtls: boolean = false;
    dgridOrgErrorDtls: boolean = false;
    tdMenuError: boolean = false;
    tdScreenDisplay: boolean = false;
    tdParameters: boolean = false;
    tdEmptyRowMenu: boolean = false;
    tdEmptyRowScreen: boolean = false;
    tdEmptyRowParams: boolean = false;
    dgridProfileErrorDtls: boolean = false;
    dgridProfileMenuErrorDtls: boolean = false;
    dgridProfileScreenDisplayErrorDtls: boolean = false;
    dgridProfileParametersErrorDtls: boolean = false;

    lstUserErrData: any = [];
    lstOrgGroupErrData: any = [];
    lstProfileMenusErrData: any = [];
    lstprofileParametersErrData: any = [];
    lstprofileScreendisplayErrData: any = [];
    lstprofileTemplateRefErrData: any = [];

    recordsPerPage: number = 0;

    lstUserErrDataColumnHeaders: any = [];
    lstOrgGroupErrDataColumnHeaders: any = [];
    lstProfileMenusErrDataColumnHeaders: any = [];
    lstprofileParametersErrDataColumnHeaders: any = [];
    lstprofileScreendisplayErrDataColumnHeaders: any = [];
    lstprofileTemplateRefErrDataColumnHeaders: any = [];

    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;

    userErrDataHeaders: any = [];
    userErrDataFields: any = [];
    orgGrpErrDataHeaders: any = [];
    orgGrprErrDataFields: any = [];
    profileTemprefErrDataHeaders: any = [];
    profileTempRefErrDataFields: any = [];
    profileMenusErrDataHeaders: any = [];
    profileMenusErrDataFields: any = [];
    profileParamErrDataHeaders: any = [];
    profileParamErrDataFields: any = [];
    profileScrErrDataHeaders: any = [];
    profileScrErrDataFields: any = [];

    userErrDataTableWidth: string = '100%';
    orgGroupErrDataTableWidth: string = '100%';
    profileErrDataTableWidth: string = '100%';

    constructor(
        private userUploadAutoService: UserUploadAutomationService,
        private commenService: AtParCommonService,
        private spinnerService: SpinnerService,
        private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private atParConstant: AtParConstants,
        private http: Http,
        private confirmationService: ConfirmationService
    ) {
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPage = parseInt(this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage]);
    }

    ngOnInit() {
        try {
            this.bindData();
            this.getFilePaths();
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    bindData() {
        try {
            this.activatedRoute.queryParams.subscribe((params: Params) => {
                this.qryPrint = params['print'];
                this.qryExcel = params['excel'];
                if (this.qryPrint == '1' || this.qryExcel == '1') {
                    if (this.qryPrint == '1' || this.qryExcel == '1') {
                        if (this.qryPrint == '1') {
                            this.strPrintAction = 'somethisng<a> element';
                        }
                        else {
                            this.strPrintAction = '';
                        }
                    }
                    if (sessionStorage.getItem('dsUserdata') != null && sessionStorage.getItem('binddatagrid') != '') {
                        this.bindUserDataGrid();
                    }
                    if (sessionStorage.getItem('_dsOrgGroupdata') != null && sessionStorage.getItem('_dsOrgGroupdata') != '') {
                        this.bindOrgDataGrid();
                    }
                    if (sessionStorage.getItem('_dsProfiledata') != null && sessionStorage.getItem('_dsProfiledata') != '') {
                        this.bindProfileDataGrid();
                    }
                }
            });



        } catch (ex) {
            this.clientErrorMsg(ex, "bindData");
        }
    }

    getFilePaths() {
        try {
            this.commenService.getEnterpriseSystem().catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.msgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            let _strErr = '';
                            if (data.Data != null) {
                                this.strERPvalue = data.Data.toString();
                                this.strUserPath = '../redist/Upload_templates/User/UserData_Template_' + this.strERPvalue + '.xls';
                                this.strProfilePath = '../redist/Upload_templates/Profile/ProfileData_Template_' + this.strERPvalue + '.xls';
                                this.strOrgPath = '../redist/Upload_templates/Org/OrgGroupData_Template_' + this.strERPvalue + '.xls';

                                if (this.UrlExists(this.strUserPath)) {
                                    this.strUserPathExist = true;
                                }
                                else {
                                    _strErr = 'User';
                                }

                                if (this.UrlExists(this.strProfilePath)) {
                                    this.strProfilePathExist = true;
                                }
                                else {
                                    if (_strErr != '') {
                                        _strErr = _strErr + '/Profile';
                                    }
                                    else {
                                        _strErr = 'Profile';
                                    }
                                }

                                if (this.UrlExists(this.strOrgPath)) {
                                    this.strOrgPathExist = true;
                                }
                                else {
                                    if (_strErr != '') {
                                        _strErr = _strErr + '/Org';
                                    }
                                    else {
                                        _strErr = 'Org';
                                    }
                                }

                                if (_strErr != '') {
                                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: _strErr + ' template(s) does not exist' });
                                }

                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                })
        } catch (ex) {
            this.clientErrorMsg(ex, "getFilePaths");
        }
    }

    bindUserDataGrid() {
        try {

            this.dsUserdata = [];
            this.dsUserdata = JSON.parse(sessionStorage.getItem('dsUserdata'));

            if (this.dsUserdata.length == 0) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'No Data Found' });
                return;
            }

            this.tblGrd = true;
            this.dgridErrorDtls = true;
            this.trInputFields = false;
            try {
                if (this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]] != null && this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]] != undefined) {
                    this.lblTotalNoOfRec = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.TOTAL_REC_CNT]];
                    this.lblSuccessCnt = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.SUCCESS_CNT]];
                    this.lblFailureCnt = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.FAILURE_CNT]]
                    this.lblAddedNoOfRec = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.ADDED_CNT]];
                    this.lblUpdatedNoOfRec = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.UPDATED_CNT]];
                }

                if (this.dsUserdata['userErrDataFields'] != null && this.dsUserdata['userErrDataHeaders'] != null) {
                    this.lstUserErrDataColumnHeaders = [];
                    let userErrDataColumnHeader: any = [];
                    let userErrDataHeaders: any = [];
                    let userErrDataFields: any = [];
                    userErrDataHeaders = this.dsUserdata['userErrDataHeaders'];
                    userErrDataFields = this.dsUserdata['userErrDataFields'];

                    if (userErrDataColumnHeader.length != null) {
                        for (var i = 0; i < userErrDataHeaders.length; i++) {
                            userErrDataColumnHeader = [];
                            userErrDataColumnHeader.push(userErrDataFields[i]);
                            userErrDataColumnHeader.push(userErrDataHeaders[i]);
                            this.lstUserErrDataColumnHeaders.push(userErrDataColumnHeader);
                        }
                        this.lstUserErrData = [];
                        this.lstUserErrData = this.dsUserdata[Enum_UserData[Enum_UserData.UserErrorData.toString()]];
                    }
                }

            } catch (ex) {
                this.clientErrorMsg(ex, "bindUserDataGrid");
                return;
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "bindUserDataGrid");
            return;
        }
    }

    bindOrgDataGrid() {
        try {
            this.dsOrgGroupdata = [];
            this.dsOrgGroupdata = JSON.parse(sessionStorage.getItem('dsOrgGroupdata'));

            if (this.dsOrgGroupdata.length == 0) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'No Data Found' });
                return;
            }
            this.tblOrgGrd = true;
            this.dgridOrgErrorDtls = true;
            this.trInputFields = false;

            try {
                if (this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]] != null && this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]] != undefined) {
                    this.lblOrgTotalNoOfRec = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.TOTAL_REC_CNT]];
                    this.lblOrgSuccessCnt = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.SUCCESS_CNT]];
                    this.lblOrgFailureCnt = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.FAILURE_CNT]]
                    this.lblOrgAddedNoOfRec = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.ADDED_CNT]];
                    this.lblOrgUpdatedNoOfRec = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.UPDATED_CNT]];
                    this.lblOrgWarningCnt = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.WARNING_CNT]];
                }

                if (this.dsOrgGroupdata['orgGroupErrDataFields'] != null && this.dsOrgGroupdata['orgGroupErrDataHeaders'] != null) {
                    this.lstOrgGroupErrDataColumnHeaders = [];
                    let orgGrpErrDataColumnHeader: any = [];
                    let orgGrpErrDataHeaders: any = [];
                    let orgGrprErrDataFields: any = [];
                    orgGrpErrDataHeaders = this.dsOrgGroupdata['orgGroupErrDataHeaders'];
                    orgGrprErrDataFields = this.dsOrgGroupdata['orgGroupErrDataFields'];

                    if (orgGrpErrDataHeaders.length != null) {
                        for (var i = 0; i < orgGrpErrDataHeaders.length; i++) {
                            orgGrpErrDataColumnHeader = [];
                            orgGrpErrDataColumnHeader.push(orgGrprErrDataFields[i]);
                            orgGrpErrDataColumnHeader.push(orgGrpErrDataHeaders[i]);
                            this.lstOrgGroupErrDataColumnHeaders.push(orgGrpErrDataColumnHeader);
                        }
                        this.lstOrgGroupErrData = [];
                        this.lstOrgGroupErrData = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.OrgGroupErrorData.toString()]];
                    }
                }


            } catch (ex) {
                this.clientErrorMsg(ex, "bindOrgDataGrid");
                return;
            }


        } catch (ex) {
            this.clientErrorMsg(ex, "bindOrgDataGrid");
            return;
        }
    }

    bindProfileDataGrid() {
        try {
            this.dsProfiledata = [];
            this.dsProfiledata = JSON.parse(sessionStorage.getItem('dsProfiledata'));

            if (this.dsProfiledata.length == 0) {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'No Data Found' });
                return;
            }
            this.tblProfileGrd = true;
            this.dgridProfileErrorDtls = true;
            this.dgridProfileMenuErrorDtls = true;
            this.dgridProfileScreenDisplayErrorDtls = true;
            this.dgridProfileParametersErrorDtls = true;
            this.trInputFields = false;

            try {
                if (this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]] != null && this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]] != undefined) {
                    this.lblProfileTotalNoOfRec = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.TOTAL_REC_CNT]];
                    this.lblProfileSuccessCnt = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.SUCCESS_CNT]];
                    this.lblProfileFailureCnt = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.FAILURE_CNT]]
                    this.lblProfileAddedNoOfRec = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.ADDED_CNT]];
                    this.lblprofileUpdatedNoOfRec = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.UPDATED_CNT]];
                }

                if (this.dsProfiledata['profileMenusErrDataFields'] != null && this.dsProfiledata['profileMenusErrDataHeaders'] != null) {
                    this.lstProfileMenusErrDataColumnHeaders = [];
                    let profileMenusErrDataColumnHeader: any = [];
                    let profileMenusErrDataHeaders: any = [];
                    let profileMenusErrDataFields: any = [];
                    profileMenusErrDataHeaders = this.dsProfiledata['profileMenusErrDataHeaders'];
                    profileMenusErrDataFields = this.dsProfiledata['profileMenusErrDataFields'];

                    if (profileMenusErrDataHeaders.length != null) {
                        for (var i = 0; i < profileMenusErrDataHeaders.length; i++) {
                            profileMenusErrDataColumnHeader = [];
                            profileMenusErrDataColumnHeader.push(profileMenusErrDataFields[i]);
                            profileMenusErrDataColumnHeader.push(profileMenusErrDataHeaders[i]);
                            this.lstProfileMenusErrDataColumnHeaders.push(profileMenusErrDataColumnHeader);
                        }
                        this.lstProfileMenusErrData = [];
                        this.lstProfileMenusErrData = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileMenusErrorData.toString()]];
                    }
                }

                if (this.dsProfiledata['profileParametersErrDataFields'] != null && this.dsProfiledata['profileParametersErrDataHeaders'] != null) {
                    this.lstprofileParametersErrDataColumnHeaders = [];
                    let profileParamErrDataColumnHeader: any = [];
                    let profileParamErrDataHeaders: any = [];
                    let profileParamErrDataFields: any = [];
                    profileParamErrDataHeaders = this.dsProfiledata['profileParametersErrDataHeaders'];
                    profileParamErrDataFields = this.dsProfiledata['profileParametersErrDataFields'];

                    if (profileParamErrDataHeaders.length != null) {
                        for (var i = 0; i < profileParamErrDataHeaders.length; i++) {
                            profileParamErrDataColumnHeader = [];
                            profileParamErrDataColumnHeader.push(profileParamErrDataFields[i]);
                            profileParamErrDataColumnHeader.push(profileParamErrDataHeaders[i]);
                            this.lstprofileParametersErrDataColumnHeaders.push(profileParamErrDataColumnHeader);
                        }
                        this.lstprofileParametersErrData = [];
                        this.lstprofileParametersErrData = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileParametersErrorData.toString()]];
                    }
                }

                if (this.dsProfiledata['profileScreendisplayErrDataFields'] != null && this.dsProfiledata['profileScreendisplayErrDataHeaders'] != null) {
                    this.lstprofileScreendisplayErrDataColumnHeaders = [];
                    let profileScrErrDataColumnHeader: any = [];
                    let profileScrErrDataHeaders: any = [];
                    let profileScrErrDataFields: any = [];
                    profileScrErrDataHeaders = this.dsProfiledata['profileScreendisplayErrDataHeaders'];
                    profileScrErrDataFields = this.dsProfiledata['profileScreendisplayErrDataFields'];

                    if (profileScrErrDataHeaders.length != null) {
                        for (var i = 0; i < profileScrErrDataHeaders.length; i++) {
                            profileScrErrDataColumnHeader = [];
                            profileScrErrDataColumnHeader.push(profileScrErrDataFields[i]);
                            profileScrErrDataColumnHeader.push(profileScrErrDataHeaders[i]);
                            this.lstprofileScreendisplayErrDataColumnHeaders.push(profileScrErrDataColumnHeader);
                        }
                        this.lstprofileScreendisplayErrData = [];
                        this.lstprofileScreendisplayErrData = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileScreendisplayErrorData.toString()]];
                    }
                }

                if (this.dsProfiledata['profileTemplateRefErrDataFields'] != null && this.dsProfiledata['profileTemplateRefErrDataHeaders'] != null) {
                    this.lstprofileTemplateRefErrDataColumnHeaders = [];
                    let profileTempRefErrDataColumnHeader: any = [];
                    let profileTemprefErrDataHeaders: any = [];
                    let profileTempRefErrDataFields: any = [];
                    profileTemprefErrDataHeaders = this.dsProfiledata['profileTemplateRefErrDataHeaders'];
                    profileTempRefErrDataFields = this.dsProfiledata['profileTemplateRefErrDataFields'];

                    if (profileTemprefErrDataHeaders.length != null) {
                        for (var i = 0; i < profileTemprefErrDataHeaders.length; i++) {
                            profileTempRefErrDataColumnHeader = [];
                            profileTempRefErrDataColumnHeader.push(profileTempRefErrDataFields[i]);
                            profileTempRefErrDataColumnHeader.push(profileTemprefErrDataHeaders[i]);
                            this.lstprofileTemplateRefErrDataColumnHeaders.push(profileTempRefErrDataColumnHeader);
                        }
                        this.lstprofileTemplateRefErrData = [];
                        this.lstprofileTemplateRefErrData = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileTemplateRefErrorData.toString()]];
                    }
                }


            } catch (ex) {
                this.clientErrorMsg(ex, "bindProfileDataGrid");
                return;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "bindProfileDataGrid");
            return;
        }
    }

    UrlExists(url) {
        try {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            return http.status != 404;
        } catch (ex) {
            this.clientErrorMsg(ex, "UrlExists");
            return false;
        }
    }

    onUserTemplateClick() {
        try {
            this.confirmationService.confirm({
                message: 'Do you want to open or save UserData_Template_' + this.strERPvalue + '.xls?',
                accept: () => {
                    if (this.strUserPathExist) {
                        var query = '?download';
                        window.open(this.strUserPath + query, "_self");
                    }
                }
            });
        } catch (ex) {
            this.clientErrorMsg(ex, "onUserTemplateClick");
        }
    }

    onProfileTemplateClick() {
        try {
            this.confirmationService.confirm({
                message: 'Do you want to open or save ProfileData_Template_' + this.strERPvalue + '.xls?',
                accept: () => {
                    if (this.strProfilePathExist) {
                        var query = '?download';
                        window.open(this.strProfilePath + query, "_self");
                    }
                }
            });
        } catch (ex) {
            this.clientErrorMsg(ex, "onProfileTemplateClick");
        }
    }

    onOrgGroupTemplateClick() {
        try {
            this.confirmationService.confirm({
                message: 'Do you want to open or save OrgGroupData_Template_' + this.strERPvalue + '.xls?',
                accept: () => {
                    if (this.strOrgPathExist) {
                        var query = '?download';
                        window.open(this.strOrgPath + query, "_self");
                    }
                }
            });
        } catch (ex) {
            this.clientErrorMsg(ex, "onOrgGroupTemplateClick");
        }
    }

    changeChkOrgGroup() {

    }

    changeChkProfile() {

    }

    changeChkUser() {

    }

    onBrowseClick(fileType) {
        try {
            if (fileType == DataSet_Type[DataSet_Type.USER]) {
                this.userPostedFiles = null;
                this.userSelectedFile = '';
            }
            else if (fileType == DataSet_Type[DataSet_Type.PROFILE]) {
                this.profilePostedFiles = null;
                this.profileSelectedFile = '';
            } else if (fileType == DataSet_Type[DataSet_Type.ORG]) {
                this.orgGroupPostedFiles = null;
                this.orgGroupSelectedFile = '';
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "onBrowseClick");
        }
    }


    fileUserChange(event) {
        try {
            //event.stopPropagation();
            this.msgs = [];
            if (event.target.files.length > 0) {
                this.userPostedFiles = event.target.files;
                this.userSelectedFile = event.target.files[0].name;
            }
            else {
                this.userPostedFiles = null;
                this.userSelectedFile = '';
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "fileUserChange");
        }

    }

    fileProfileChange(event) {
        try {
            this.msgs = [];
            if (event.target.files.length > 0) {
                this.profilePostedFiles = event.target.files;
                this.profileSelectedFile = event.target.files[0].name;
            }
            else {
                this.profilePostedFiles = null;
                this.profileSelectedFile = '';

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "fileProfileChange");
        }
    }

    fileOrgGroupChange(event) {

        try {
            this.msgs = [];
            if (event.target.files.length > 0) {
                this.orgGroupPostedFiles = event.target.files;
                this.orgGroupSelectedFile = event.target.files[0].name;
            }
            else {
                this.orgGroupPostedFiles = null;
                this.orgGroupSelectedFile = '';
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "fileOrgGroupChange");
        }
    }

    async onLoadNowClick(event) {
        try {

            this.spinnerService.start();
            let strUserFile: string;
            let strOrgGroupFile: string;
            let strProfileFile: string;
            let count: number;
            let strEnterpriseSystem: string = '';
            this.trInputFields = true;
            await this.clearData();

            if (this.chkUser || this.chkProfile || this.chkOrgGroup) {

                try {
                    await this.commenService.getEnterpriseSystem().catch(this.httpService.handleError)
                        .then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<number>;
                            this._statusCode = data.StatType.toString();
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    strEnterpriseSystem = data.Data.toString();
                                    break;
                                }
                                case StatusType.Error: {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                        });
                    if (strEnterpriseSystem == '' || strEnterpriseSystem == null) {
                        this.trInputFields = false;
                        return;
                    }

                } catch (ex) {
                    this.trInputFields = false;
                    this.clientErrorMsg(ex, "onLoadNowClick");
                    return;
                }

                if (this.chkUser) {
                    this.HdnProfileUplaoded = 'U';
                    if (!this.validateFileName(this.userSelectedFile)) {
                        this.trInputFields = false;
                        this.chkUser = false;
                        this.profileSelectedFile = '';
                        this.userSelectedFile = '';
                        this.orgGroupSelectedFile = '';
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Not a Valid File Name' });
                        return;
                    }
                    else {
                        try {

                            let formData: FormData = new FormData();
                            formData.append('uploadFile', this.userPostedFiles[0]);
                            formData.append('fileName', 'User_Upload' + this.getISODateTime());
                            let headers: Headers = new Headers();
                            headers.append('Authorization', 'bearer');
                            headers.append('enctype', 'multipart/form-data');
                            let options = new RequestOptions({ headers: headers });
                            let apiUrl = this.httpService.BaseUrl + '/api/UserUploadAutomation/UploadPostedFile';

                            await this.http.post(apiUrl, formData, options)
                                .catch(this.httpService.handleError).toPromise()
                                .then((res: Response) => {
                                    let data: AtParWebApiResponse<number> = res.json() as AtParWebApiResponse<number>;
                                    this._statusCode = data.StatusCode;
                                    switch (data.StatType) {
                                        case StatusType.Success: {
                                            this._strUserUploadPath = data.DataVariable.toString();
                                            break;
                                        }
                                        case StatusType.Error: {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case StatusType.Warn: {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;

                                        }
                                        case StatusType.Custom: {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }

                                    if (data.StatType != StatusType.Success) {
                                        this.trInputFields = false;
                                        return;
                                    }

                                });
                        } catch (ex) {
                            this.trInputFields = false;
                            this.clientErrorMsg(ex, "onLoadNowClick");
                            return;
                        }
                    }
                }

                if (this.chkOrgGroup) {
                    this.HdnProfileUplaoded = 'O';
                    if (!this.validateFileName(this.orgGroupSelectedFile)) {
                        this.trInputFields = false;
                        this.chkOrgGroup = false;
                        this.profileSelectedFile = '';
                        this.userSelectedFile = '';
                        this.orgGroupSelectedFile = '';
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Not a Valid File Name' });
                        return;
                    }
                    else {

                        try {
                            let formData: FormData = new FormData();
                            formData.append('uploadFile', this.orgGroupPostedFiles[0]);
                            formData.append('fileName', 'Org_Upload' + this.getISODateTime());
                            let headers: Headers = new Headers();
                            headers.append('Authorization', 'bearer');
                            headers.append('enctype', 'multipart/form-data');
                            let options = new RequestOptions({ headers: headers });
                            let apiUrl = this.httpService.BaseUrl + '/api/UserUploadAutomation/UploadPostedFile';

                            await this.http.post(apiUrl, formData, options)
                                .catch(this.httpService.handleError).toPromise()
                                .then((res: Response) => {
                                    let data: AtParWebApiResponse<number> = res.json() as AtParWebApiResponse<number>;
                                    this._statusCode = data.StatusCode;
                                    switch (data.StatType) {
                                        case StatusType.Success: {
                                            this._strOrgGroupUploadPath = data.DataVariable.toString();
                                            break;
                                        }
                                        case StatusType.Error: {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case StatusType.Warn: {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;

                                        }
                                        case StatusType.Custom: {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }

                                    if (data.StatType != StatusType.Success) {
                                        this.trInputFields = false;
                                        return;
                                    }

                                });
                        } catch (ex) {
                            this.trInputFields = false;
                            this.clientErrorMsg(ex, "onLoadNowClick");
                            return;
                        }

                    }
                }

                if (this.chkProfile) {
                    this.HdnProfileUplaoded = 'P';
                    if (!this.validateFileName(this.profileSelectedFile)) {
                        this.trInputFields = false;
                        this.chkProfile = false;
                        this.profileSelectedFile = '';
                        this.userSelectedFile = '';
                        this.orgGroupSelectedFile = '';
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Not a Valid File Name' });
                        return;
                    }
                    else {

                        try {
                            let formData: FormData = new FormData();
                            formData.append('uploadFile', this.profilePostedFiles[0]);
                            formData.append('fileName', 'Profile_Upload' + this.getISODateTime());
                            let headers: Headers = new Headers();
                            headers.append('Authorization', 'bearer');
                            headers.append('enctype', 'multipart/form-data');
                            let options = new RequestOptions({ headers: headers });
                            let apiUrl = this.httpService.BaseUrl + '/api/UserUploadAutomation/UploadPostedFile';

                            await this.http.post(apiUrl, formData, options)
                                .catch(this.httpService.handleError).toPromise()
                                .then((res: Response) => {
                                    let data: AtParWebApiResponse<number> = res.json() as AtParWebApiResponse<number>;
                                    this._statusCode = data.StatusCode;
                                    switch (data.StatType) {
                                        case StatusType.Success: {
                                            this._strProfileUploadPath = data.DataVariable.toString();
                                            break;
                                        }
                                        case StatusType.Error: {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case StatusType.Warn: {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;

                                        }
                                        case StatusType.Custom: {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }

                                    if (data.StatType != StatusType.Success) {
                                        this.trInputFields = false;
                                        return;
                                    }

                                });


                        } catch (ex) {
                            this.trInputFields = false;
                            this.clientErrorMsg(ex, "onLoadNowClick");
                            return;
                        }
                    }
                }

                try {
                    await this.userUploadAutoService.doUploadData(this.chkUser, this.chkProfile, this.chkOrgGroup, this._strUserUploadPath,
                        this._strProfileUploadPath, this._strOrgGroupUploadPath, strEnterpriseSystem, this._deviceTokenEntry[TokenEntry_Enum.UserID])
                        .catch(this.httpService.handleError)
                        .then((res: Response) => {

                            this.chkUser = false;
                            this.chkProfile = false;
                            this.chkOrgGroup = false;
                            this.userSelectedFile = '';
                            this.profileSelectedFile = '';
                            this.orgGroupSelectedFile = '';
                            let data = res.json();
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    try {
                                        if (data.DataDictionary != null) {
                                            this.dsUploadData = data.DataDictionary;
                                            this.dsUserdata = data.DataDictionary[DataSet_Type[DataSet_Type.USER]];
                                            this.dsProfiledata = data.DataDictionary[DataSet_Type[DataSet_Type.PROFILE]];
                                            this.dsOrgGroupdata = data.DataDictionary[DataSet_Type[DataSet_Type.ORG]];
                                        }
                                        else {
                                            this.trInputFields = false;
                                            return;
                                        }
                                    } catch (ex) {
                                        this.trInputFields = false;
                                        this.clientErrorMsg(ex, "onLoadNowClick");
                                        return;
                                    }
                                    break;
                                }
                            }

                            if (data.StatType == StatusType.Success) {

                                if (this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]] != null && this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]] != undefined) {
                                    this.lblTotalNoOfRec = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.TOTAL_REC_CNT]];
                                    this.lblSuccessCnt = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.SUCCESS_CNT]];
                                    this.lblFailureCnt = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.FAILURE_CNT]]
                                    this.lblAddedNoOfRec = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.ADDED_CNT]];
                                    this.lblUpdatedNoOfRec = this.dsUserdata[Enum_UserData[Enum_UserData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.UPDATED_CNT]];
                                    this._blnUserDataExists = true;
                                }

                                if (this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]] != null && this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]] != undefined) {
                                    this.lblProfileTotalNoOfRec = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.TOTAL_REC_CNT]];
                                    this.lblProfileSuccessCnt = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.SUCCESS_CNT]];
                                    this.lblProfileFailureCnt = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.FAILURE_CNT]]
                                    this.lblProfileAddedNoOfRec = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.ADDED_CNT]];
                                    this.lblprofileUpdatedNoOfRec = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.UPDATED_CNT]];
                                    this._blnProfileDataExists = true;
                                }

                                if (this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]] != null && this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]] != undefined) {
                                    this.lblOrgTotalNoOfRec = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.TOTAL_REC_CNT]];
                                    this.lblOrgSuccessCnt = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.SUCCESS_CNT]];
                                    this.lblOrgFailureCnt = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.FAILURE_CNT]]
                                    this.lblOrgAddedNoOfRec = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.ADDED_CNT]];
                                    this.lblOrgUpdatedNoOfRec = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.UPDATED_CNT]];
                                    this.lblOrgWarningCnt = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.SUMMARY]][0][Enum_Upload_Summary[Enum_Upload_Summary.WARNING_CNT]];
                                    this._blnOrgDataExists = true;
                                }

                                if (this.dsUserdata[Enum_UserData[Enum_UserData.UserErrorDataFields.toString()]] != null && this.dsUserdata[Enum_UserData[Enum_UserData.UserErrorDataHeaders.toString()]] != null) {
                                    let userErrDataColumnHeader: any = [];
                                    this.userErrDataHeaders = this.dsUserdata[Enum_UserData[Enum_UserData.UserErrorDataHeaders.toString()]];
                                    this.userErrDataFields = this.dsUserdata[Enum_UserData[Enum_UserData.UserErrorDataFields.toString()]];
                                    if (this.userErrDataHeaders.length != null) {
                                        this.userErrDataTableWidth = (180 * this.userErrDataHeaders.length) + 5 + 'px';
                                        for (var i = 0; i < this.userErrDataHeaders.length; i++) {
                                            userErrDataColumnHeader = [];
                                            userErrDataColumnHeader.push(this.userErrDataFields[i]);
                                            userErrDataColumnHeader.push(this.userErrDataHeaders[i]);
                                            this.lstUserErrDataColumnHeaders.push(userErrDataColumnHeader);
                                        }
                                        this.lstUserErrData = this.dsUserdata[Enum_UserData[Enum_UserData.UserErrorData.toString()]];
                                    }
                                }

                                if (this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.OrgGroupErrorDataFields.toString()]] != null && this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.OrgGroupErrorDataHeaders.toString()]] != null) {
                                    let orgGrpErrDataColumnHeader: any = [];
                                    this.orgGrpErrDataHeaders = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.OrgGroupErrorDataHeaders.toString()]];
                                    this.orgGrprErrDataFields = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.OrgGroupErrorDataFields.toString()]];
                                    if (this.orgGrpErrDataHeaders.length != null) {
                                        if (this.orgGrpErrDataHeaders.filter(x => x == 'ERROR_TYPE').length > 0) {

                                            let header = this.orgGrpErrDataHeaders.filter(x => x == 'ERROR_TYPE');
                                            let index: number = this.orgGrpErrDataHeaders.indexOf(this.orgGrpErrDataHeaders.filter(x => x == 'ERROR_TYPE')[0]);
                                            if (index !== -1) {
                                                this.orgGrpErrDataHeaders.splice(index, 1);
                                            }
                                        }
                                        if (this.orgGrprErrDataFields.filter(x => x == 'ERROR_TYPE').length > 0) {
                                            let index: number = this.orgGrprErrDataFields.indexOf(this.orgGrprErrDataFields.filter(x => x == 'ERROR_TYPE')[0]);
                                            if (index !== -1) {
                                                this.orgGrprErrDataFields.splice(index, 1);
                                            }
                                        }

                                        this.orgGroupErrDataTableWidth = (180 * this.orgGrpErrDataHeaders.length) + 5 + 'px';

                                        for (var i = 0; i < this.orgGrpErrDataHeaders.length; i++) {

                                            orgGrpErrDataColumnHeader = [];
                                            orgGrpErrDataColumnHeader.push(this.orgGrprErrDataFields[i]);
                                            orgGrpErrDataColumnHeader.push(this.orgGrpErrDataHeaders[i]);
                                            this.lstOrgGroupErrDataColumnHeaders.push(orgGrpErrDataColumnHeader);
                                        }
                                        this.lstOrgGroupErrData = this.dsOrgGroupdata[Enum_OrgGroupData[Enum_OrgGroupData.OrgGroupErrorData.toString()]];
                                    }
                                }

                                if (this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileMenusErrorDataFields.toString()]] != null && this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileMenusErrorDataHeaders.toString()]] != null) {
                                    let profileMenusErrDataColumnHeader: any = [];

                                    this.profileMenusErrDataHeaders = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileMenusErrorDataHeaders.toString()]];
                                    this.profileMenusErrDataFields = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileMenusErrorDataFields.toString()]];

                                    if (this.profileMenusErrDataHeaders.length != null) {
                                        for (var i = 0; i < this.profileMenusErrDataHeaders.length; i++) {
                                            profileMenusErrDataColumnHeader = [];
                                            profileMenusErrDataColumnHeader.push(this.profileMenusErrDataFields[i]);
                                            profileMenusErrDataColumnHeader.push(this.profileMenusErrDataHeaders[i]);
                                            this.lstProfileMenusErrDataColumnHeaders.push(profileMenusErrDataColumnHeader);
                                        }
                                        this.lstProfileMenusErrData = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileMenusErrorData.toString()]];
                                    }
                                }

                                if (this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileParametersErrorDataFields.toString()]] != null && this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileParametersErrorDataHeaders.toString()]] != null) {
                                    let profileParamErrDataColumnHeader: any = [];

                                    this.profileParamErrDataHeaders = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileParametersErrorDataHeaders.toString()]];
                                    this.profileParamErrDataFields = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileParametersErrorDataFields.toString()]];

                                    if (this.profileParamErrDataHeaders.length != null) {
                                        for (var i = 0; i < this.profileParamErrDataHeaders.length; i++) {
                                            profileParamErrDataColumnHeader = [];
                                            profileParamErrDataColumnHeader.push(this.profileParamErrDataFields[i]);
                                            profileParamErrDataColumnHeader.push(this.profileParamErrDataHeaders[i]);
                                            this.lstprofileParametersErrDataColumnHeaders.push(profileParamErrDataColumnHeader);
                                        }
                                        this.lstprofileParametersErrData = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileParametersErrorData.toString()]];
                                    }
                                }

                                if (this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileScreendisplayErrorDataFields.toString()]] != null && this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileScreendisplayErrorDataHeaders.toString()]] != null) {
                                    let profileScrErrDataColumnHeader: any = [];

                                    this.profileScrErrDataHeaders = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileScreendisplayErrorDataHeaders.toString()]];
                                    this.profileScrErrDataFields = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileScreendisplayErrorDataFields.toString()]];

                                    if (this.profileScrErrDataHeaders.length != null) {
                                        for (var i = 0; i < this.profileScrErrDataHeaders.length; i++) {
                                            profileScrErrDataColumnHeader = [];
                                            profileScrErrDataColumnHeader.push(this.profileScrErrDataFields[i]);
                                            profileScrErrDataColumnHeader.push(this.profileScrErrDataHeaders[i]);
                                            this.lstprofileScreendisplayErrDataColumnHeaders.push(profileScrErrDataColumnHeader);
                                        }
                                        this.lstprofileScreendisplayErrData = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileScreendisplayErrorData.toString()]];
                                    }
                                }

                                if (this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileTemplateRefErrorDataFields.toString()]] != null && this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileTemplateRefErrorDataHeaders.toString()]] != null) {
                                    let profileTempRefErrDataColumnHeader: any = [];

                                    this.profileTemprefErrDataHeaders = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileTemplateRefErrorDataHeaders.toString()]];
                                    this.profileTempRefErrDataFields = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileTemplateRefErrorDataFields.toString()]];

                                    if (this.profileTemprefErrDataHeaders.length != null) {

                                        if (this.profileTemprefErrDataHeaders.filter(x => x == 'STATUS_CODE').length > 0) {
                                            let index: number = this.profileTemprefErrDataHeaders.indexOf(this.profileTemprefErrDataHeaders.filter(x => x == 'STATUS_CODE')[0]);
                                            if (index !== -1) {
                                                this.profileTemprefErrDataHeaders.splice(index, 1);
                                            }
                                        }
                                        if (this.profileTempRefErrDataFields.filter(x => x == 'STATUS_CODE').length > 0) {
                                            let index: number = this.profileTempRefErrDataFields.indexOf(this.profileTempRefErrDataFields.filter(x => x == 'STATUS_CODE')[0]);
                                            if (index !== -1) {
                                                this.profileTempRefErrDataFields.splice(index, 1);
                                            }
                                        }

                                        this.profileErrDataTableWidth = (180 * this.profileTemprefErrDataHeaders.length) + 5 + 'px';

                                        for (var i = 0; i < this.profileTemprefErrDataHeaders.length; i++) {
                                            profileTempRefErrDataColumnHeader = [];
                                            profileTempRefErrDataColumnHeader.push(this.profileTempRefErrDataFields[i]);
                                            profileTempRefErrDataColumnHeader.push(this.profileTemprefErrDataHeaders[i]);
                                            this.lstprofileTemplateRefErrDataColumnHeaders.push(profileTempRefErrDataColumnHeader);
                                        }
                                        this.lstprofileTemplateRefErrData = this.dsProfiledata[Enum_ProfileData[Enum_ProfileData.ProfileTemplateRefErrorData.toString()]];
                                    }
                                }

                                if (this._blnUserDataExists && this._blnProfileDataExists && this._blnOrgDataExists) {
                                    if ((this.lblFailureCnt > 0) &&
                                        ((this.lblOrgFailureCnt > 0) || (this.lblOrgWarningCnt > 0)) &&
                                        ((this.lblProfileFailureCnt > 0))
                                    ) {
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error\/Warnings in Uploading User,Org Group and profile. Please check the table below for error message' });
                                        this.tblGrd = true;
                                        this.tblOrgGrd = true;
                                        this.tblProfileGrd = true;

                                        this.dgridErrorDtls = true;
                                        this.dgridOrgErrorDtls = true;
                                        this.dgridProfileErrorDtls = true;

                                        if (this.lstProfileMenusErrData.length > 0) {
                                            this.dgridProfileMenuErrorDtls = true;
                                        }
                                        if (this.lstprofileScreendisplayErrData.length > 0) {
                                            this.dgridProfileScreenDisplayErrorDtls = true;
                                        }
                                        if (this.lstprofileParametersErrData.length > 0) {
                                            this.dgridProfileParametersErrorDtls = true;
                                        }
                                        this.tdOptions = true;

                                        sessionStorage.setItem('dsUserdata', JSON.stringify(this.dsUserdata));
                                        sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(this.dsOrgGroupdata));
                                        sessionStorage.setItem('dsProfiledata', JSON.stringify(this.dsProfiledata));
                                        return;
                                    }
                                }

                                if (this._blnUserDataExists) {
                                    if (this.lblFailureCnt > 0) {
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error in Uploading User data. Please check the table below for error message' });
                                        this.tblGrd = true;
                                        if (this._blnOrgDataExists) {
                                            this.tblOrgGrd = true;
                                        }
                                        this.dgridErrorDtls = true;
                                        this.tdOptions = true;
                                        sessionStorage.setItem('dsUserdata', JSON.stringify(this.dsUserdata));
                                        sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(this.dsOrgGroupdata));
                                        return;
                                    }
                                }

                                if (this._blnOrgDataExists) {
                                    if (this.lblOrgFailureCnt > 0 || this.lblOrgWarningCnt > 0) {
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error\/Warnings in Uploading Org Group. Please check the table below for error message' });
                                        this.tblOrgGrd = true;
                                        if (this._blnUserDataExists) {
                                            this.tblGrd = true;
                                        }
                                        this.dgridOrgErrorDtls = true;
                                        this.tdOptions = true;
                                        sessionStorage.setItem('dsUserdata', JSON.stringify(this.dsUserdata));
                                        sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(this.dsOrgGroupdata));
                                        return;
                                    }
                                }

                                if (this._blnProfileDataExists) {
                                    try {
                                        if (this.lblProfileFailureCnt > 0) {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error in Uploading Profile. Please check the table below for error message' });
                                            this.tblProfileGrd = true;
                                            if (this._blnOrgDataExists && this._blnUserDataExists) {
                                                this.tblGrd = true;
                                                this.tblOrgGrd = true;
                                            }
                                            this.dgridProfileErrorDtls = true;
                                            if (this.lstProfileMenusErrData.length > 0) {
                                                this.tdMenuError = true;
                                                this.tdEmptyRowMenu = true;
                                                this.dgridProfileMenuErrorDtls = true;
                                            }
                                            if (this.lstprofileScreendisplayErrData.length > 0) {
                                                this.tdScreenDisplay = true;
                                                this.tdEmptyRowScreen = true;
                                                this.dgridProfileScreenDisplayErrorDtls = true;
                                            }
                                            if (this.lstprofileParametersErrData.length > 0) {
                                                this.tdParameters = true;
                                                this.tdEmptyRowParams = true;
                                                this.dgridProfileParametersErrorDtls = true;
                                            }

                                            this.tdOptions = true;
                                            sessionStorage.setItem('dsUserdata', JSON.stringify(this.dsUserdata));
                                            sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(this.dsOrgGroupdata));
                                            sessionStorage.setItem('dsProfiledata', JSON.stringify(this.dsProfiledata));

                                            return;
                                        }
                                    } catch (ex) {
                                        this.clientErrorMsg(ex, "onLoadNowClick");
                                    }
                                }

                                try {

                                    if (this._blnUserDataExists && this._blnProfileDataExists && this._blnOrgDataExists) {
                                        if (this.lstUserErrData.length > 0 && this.lstOrgGroupErrData.length > 0 && this.lstprofileTemplateRefErrData.length > 0) {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'User, Profile and Org Group Data Uploaded Successfully' });
                                            this.tblGrd = true;
                                            this.tblOrgGrd = true;
                                            this.tblProfileGrd = true;
                                            return;
                                        }
                                    }

                                    if (this._blnUserDataExists) {
                                        if (this.lstUserErrData.length > 0) {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'User Data Uploaded Successfully' });
                                            this.tblGrd = true;
                                            return;
                                        }

                                    }

                                    if (this._blnOrgDataExists) {
                                        if (this.lstOrgGroupErrData.length > 0) {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Org Group Data Uploaded Successfully' });
                                            this.tblOrgGrd = true;
                                            return;
                                        }
                                    }

                                    if (this._blnProfileDataExists) {
                                        if (this.lstprofileTemplateRefErrData.length > 0) {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Profile Data Uploaded Successfully' });
                                            this.tblProfileGrd = true;
                                            this.dgridProfileErrorDtls = false;
                                            this.dgridProfileMenuErrorDtls = false;
                                            this.dgridProfileParametersErrorDtls = false;
                                            this.dgridProfileScreenDisplayErrorDtls = false;
                                            this.tdMenuError = false;
                                            this.tdScreenDisplay = false;
                                            this.tdParameters = false;
                                            this.tdEmptyRowMenu = false;
                                            this.tdEmptyRowScreen = false;
                                            this.tdEmptyRowParams = false;
                                            return;
                                        }
                                    }


                                } catch (ex) {
                                    this.clientErrorMsg(ex, "onLoadNowClick");
                                }

                            }
                            else {
                                if (data.StatusCode == AtparStatusCodes.E_INVALIDFILE) {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    return;
                                }
                                else if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Failed To Load Data' });
                                    return;
                                }
                                else {
                                    if (this.lstUserErrData.length > 0 && this.lstprofileTemplateRefErrData.length > 0 && this.lstOrgGroupErrData.length > 0) {
                                        if ((this.lstUserErrData[0]['STATUS_CODE'] == AtparStatusCodes.E_NORECORDFOUND)
                                            && (this.lstOrgGroupErrData[0]['STATUS_CODE'] == AtparStatusCodes.E_NORECORDFOUND)
                                            && (this.lstprofileTemplateRefErrData[0]['STATUS_CODE'] == AtparStatusCodes.E_NORECORDFOUND)
                                        ) {
                                            this.msgs = [];
                                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'No Data Found to User Profile and Org Group Upload' });
                                            return;
                                        }
                                    }
                                    else {
                                        if (this.lstUserErrData.length > 0) {
                                            if (this.lstUserErrData[0]['STATUS_CODE'] == AtparStatusCodes.E_NORECORDFOUND) {
                                                this.msgs = [];
                                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'No Data Found to User Upload' });
                                                return;
                                            }
                                        }

                                        if (this.lstOrgGroupErrData.length > 0) {
                                            if (this.lstOrgGroupErrData[0]['STATUS_CODE'] == AtparStatusCodes.E_NORECORDFOUND) {
                                                this.msgs = [];
                                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'No Data Found to Org Group Upload' });
                                                return;
                                            }
                                        }

                                        if (this.lstprofileTemplateRefErrData.length > 0) {
                                            if (this.lstprofileTemplateRefErrData[0]['STATUS_CODE'] == AtparStatusCodes.E_NORECORDFOUND) {
                                                this.msgs = [];
                                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'No Data Found to Profile Upload' });
                                                return;
                                            }
                                        }

                                    }

                                    if (data.StatType.toString() != StatusType.Success.toString()) {
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error' });
                                        this.tblGrd = true;
                                        this.tblOrgGrd = true;
                                        this.tblProfileGrd = true;
                                        this.dgridErrorDtls = true;
                                        this.dgridOrgErrorDtls = true;
                                        this.dgridProfileErrorDtls = true;
                                        if (this.lstProfileMenusErrData.length > 0) {
                                            this.dgridProfileMenuErrorDtls = true;
                                        }
                                        if (this.lstprofileParametersErrData.length > 0) {
                                            this.dgridProfileParametersErrorDtls = true;
                                        }
                                        if (this.lstprofileScreendisplayErrData.length > 0) {
                                            this.dgridProfileScreenDisplayErrorDtls = true;
                                        }
                                        this.tdOptions = true;
                                        sessionStorage.setItem('dsUserdata', JSON.stringify(this.dsUserdata));
                                        sessionStorage.setItem('dsOrgGroupdata', JSON.stringify(this.dsOrgGroupdata));
                                        sessionStorage.setItem('dsProfiledata', JSON.stringify(this.dsProfiledata));
                                        return;
                                    }
                                }
                            }
                        });

                } catch (ex) {
                    this.chkUser = false;
                    this.chkOrgGroup = false;
                    this.chkProfile = false;
                    this.trInputFields = false;
                    this.clientErrorMsg(ex, "onLoadNowClick");
                    return;
                }
            } else {
                this.trInputFields = false;
                this.chkUser = false;
                this.chkOrgGroup = false;
                this.chkProfile = false;
                this.userSelectedFile = '';
                this.profileSelectedFile = '';
                this.orgGroupSelectedFile = '';
                this.userPostedFiles = null;
                this.orgGroupPostedFiles = null;
                this.profilePostedFiles = null;
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select the respective switch for the file to upload' });
                return;
            }

        } catch (ex) {
            this.trInputFields = false;
            this.chkUser = false;
            this.chkOrgGroup = false;
            this.chkProfile = false;
            this.clientErrorMsg(ex, "onLoadNowClick");
            return;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onExportToExcelClick(e) {
        try {
            this.spinnerService.start();
            var html = await this.prepareExcelSheet();
            if (html != '' && html != null && html != undefined) {

                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "UserUploadAutomationDetails.xls");

                //var ua = window.navigator.userAgent;
                //var msie = ua.indexOf("MSIE ");
                ////If Internet Explorer
                //if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                //    this._statusCode = "-1";
                //    let folderName: string = '';
                //    await this.commenService.exportToExcel(html, "User_Upload_Automation_", "UserUploadAutomationDetails")
                //        .then((res: Response) => {
                //            let data = res.json();
                //            this._statusCode = data.StatusCode;
                //            if (this._statusCode == AtparStatusCodes.ATPAR_OK.toString()) {
                //                folderName = data.DataVariable.toString();
                //                var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/UserUploadAutomationDetails.xls';
                //                var query = '?download';
                //                window.open(filename + query, "_self");
                //            }
                //            else {
                //                this.msgs = [];
                //                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                //            }
                //        });

                //    await this.commenService.deleteExcel(folderName, "UserUploadAutomationDetails")
                //        .then((res: Response) => {
                //        });
                //}

                //else {
                //    var a = document.createElement('a');
                //    var data_type = 'data:application/vnd.ms-excel';
                //    html = html.replace(/ /g, '%20');
                //    a.href = data_type + ', ' + html;
                //    a.download = 'UserUploadAutomationDetails.xls';
                //    a.setAttribute('target', '_self');
                //    a.click();
                //    e.preventDefault();
                //    //window.open('data:application/vnd.ms-excel;filename:excelexport,' + encodeURIComponent(html));
                //}
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "onExportToExcelClick");
            return;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async prepareExcelSheet() {

        var html = '';
        try {
            //this.commenService.get
            var imgserverPath = '';

            await this.commenService.getServerIP()
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<string>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ipAddress = data.DataVariable.toString();
                            break;
                        }
                        case StatusType.Error: {
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    if (data.StatType != StatusType.Success) {
                        html = '';
                        return html;
                    }
                });


            await this.commenService.getSSLConfigDetails()
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    this.msgs = [];
                    var data = res.json() as AtParWebApiResponse<SSL_CONFIG_DETAILS>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.gstrProtocal = data.Data.PROTOCOL.toString();
                            this.gstrServerName = data.Data.SERVER_NAME.toString();
                            this.gstrPortNo = data.Data.PORT_NO.toString();
                            break;
                        }
                        case StatusType.Error: {
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    if (data.StatType != StatusType.Success) {
                        html = '';
                        return html;
                    }

                });

            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';

            html = "<table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>" +
                "<tr width='100%'><td align=left  width='100%' height=63 nowrap style='background-color:#ff9834' ><img  height=63 src=" + imgserverPath + "logo.jpg title=AtPar Version 2.8><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></tr>" +
                "<tr><td height=27  vAlign=bottom width=100% align=left ><font size=1 style='" + "" + "'COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt'" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></td>" +
                "</tr><tr><td width=100%><table cellpadding=3 cellspacing = 1 align=left width=99% border=0><tr><td colspan=2></td></tr>" +
                "<tr><td colspan=2 align=left><span class=c2>User Upload Automation Details </b></span></td></tr>" +
                "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                "<tr><td colspan=2 align=left>&nbsp;</td></tr>";

            if (this.HdnProfileUplaoded == 'U') {
                html += "<tr><td align=left nowrap width='50%'><span class=c2>The number of records present in the input file </span></td><td align=left width='50%'><span class=c2>" + this.lblTotalNoOfRec + "</span></td></tr>" +
                    "<tr><td align=left  nowrap width='50%'><span class=c2>The number of records loaded successfully  </span></td><td width='50%' align=left><span class=c2>" + this.lblSuccessCnt + "</span></td></tr>" +
                    "<tr><td align=left nowrap width='50%'><span class=c2>The number of records written to error file  </span></td><td width='50%' align=left><span class=c2>" + this.lblFailureCnt + "</span></td></tr>" +
                    "<tr><td align=left  nowrap width='50%'><span class=c2>The number of Users added </span></td><td width='50%' align=left><span class=c2>" + this.lblAddedNoOfRec + "</span></td></tr>" +
                    "<tr><td align=left nowrap width='50%'><span class=c2>The number of Users updated </span></td><td width='50%' align=left><span class=c2>" + this.lblUpdatedNoOfRec + "</span></td></tr>" +
                    "<tr><td colspan=2 nowrap width='100%' align=left>&nbsp;</td></tr>" +
                    "<tr><td colspan=2 nowrap width='100%' align=left>&nbsp;</td></tr>" +
                    "</table></td></tr> " +
                    "<tr><td>" +
                    "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                    //'sbHtmlString.Append("<tr bgcolor=white><td colspan=7 align=left><b></b></td></tr>")
                    "<tr bgcolor=#d3d3d3>";

                for (var i = 0; i < this.lstUserErrDataColumnHeaders.length; i++) {
                    html += "<td align=left nowrap><span class=c3><b>" + this.lstUserErrDataColumnHeaders[i][1] + "</b></span></td>";
                }
                html += "</tr>";

                for (var i = 0; i < this.lstUserErrData.length; i++) {
                    html += "<tr>";
                    for (var j = 0; j < this.lstUserErrDataColumnHeaders.length; j++) {
                        html += "<td align=left ><span class=c3>" + this.lstUserErrData[i][this.lstUserErrDataColumnHeaders[j][0]] + "</span></td>";
                    }
                    html += "</tr>";
                }
                html += "</table>";
            }

            if (this.HdnProfileUplaoded == 'O') {
                html += "<tr><td align=left nowrap><span class=c2>The number of records present in the input file </span></td><td align=left><span class=c2>" + this.lblOrgTotalNoOfRec + "</span></td></tr>" +
                    "<tr><td align=left nowrap><span class=c2>The number of records loaded successfully  </span></td><td align=left><span class=c2>" + this.lblOrgSuccessCnt + "</span></td></tr>" +
                    "<tr><td align=left nowrap><span class=c2>The number of records written to error file  </span></td><td align=left><span class=c2>" + this.lblOrgFailureCnt + "</span></td></tr>" +
                    "<tr><td align=left nowrap><span class=c2>The number of warnings written to error file  </span></td><td align=left><span class=c2>" + this.lblOrgWarningCnt + "</span></td></tr>" +
                    "<tr><td align=left nowrap><span class=c2>The number of Org Groups added  </span></td><td align=left><span class=c2>" + this.lblOrgAddedNoOfRec + "</span></td></tr>" +
                    "<tr><td align=left nowrap><span class=c2>The number of Org Groups updated </span></td><td align=left><span class=c2>" + this.lblOrgUpdatedNoOfRec + "</span></td></tr>" +
                    "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                    "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                    "</table></td></tr> " +
                    "<tr><td>" +
                    "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                    //'sbHtmlString.Append("<tr bgcolor=white><td colspan=7 align=left><b></b></td></tr>")
                    "<tr bgcolor=#d3d3d3>";

                for (var i = 0; i < this.lstOrgGroupErrDataColumnHeaders.length; i++) {
                    html += "<td align=left nowrap><span class=c3><b>" + this.lstOrgGroupErrDataColumnHeaders[i][1] + "</b></span></td>";
                }
                html += "</tr>";

                for (var i = 0; i < this.lstOrgGroupErrData.length; i++) {
                    html += "<tr>";
                    for (var j = 0; j < this.lstOrgGroupErrDataColumnHeaders.length; j++) {
                        html += "<td align=left ><span class=c3>" + this.lstOrgGroupErrData[i][this.lstOrgGroupErrDataColumnHeaders[j][1]] + "</span></td>";
                    }
                    html += "</tr>";
                }
                html += "</table>";

            }

            if (this.HdnProfileUplaoded == 'P') {
                html += "<tr><td align=left nowrap><span class=c2>The number of records present in the input file </span></td><td align=left><span class=c2>" + this.lblProfileTotalNoOfRec + "</span></td></tr>" +
                    "<tr><td align=left nowrap><span class=c2>The number of records loaded successfully  </span></td><td align=left><span class=c2>" + this.lblProfileSuccessCnt + "</span></td></tr>" +
                    "<tr><td align=left nowrap><span class=c2>The number of records written to error file  </span></td><td align=left><span class=c2>" + this.lblProfileFailureCnt + "</span></td></tr>" +
                    "<tr><td align=left nowrap><span class=c2>The number of Profiles added </span></td><td align=left><span class=c2>" + this.lblProfileAddedNoOfRec + "</span></td></tr>" +
                    "<tr><td align=left nowrap><span class=c2>The number of Profiles updated </span></td><td align=left><span class=c2>" + this.lblprofileUpdatedNoOfRec + "</span></td></tr>" +
                    "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                    "<tr><td colspan=2 align=left>&nbsp;</td></tr>" +
                    "</table></td></tr> " +
                    "<tr><td>";

                if (this.lstprofileTemplateRefErrData.length > 0) {
                    html += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                        "<tr bgcolor=#d3d3d3>";

                    for (var i = 0; i < this.lstprofileTemplateRefErrDataColumnHeaders.length; i++) {
                        html += "<td align=left nowrap><span class=c3><b>" + this.lstprofileTemplateRefErrDataColumnHeaders[i][1] + "</b></span></td>";
                    }
                    html += "</tr>";

                    for (var i = 0; i < this.lstprofileTemplateRefErrData.length; i++) {
                        html += "<tr>";
                        for (var j = 0; j < this.lstprofileTemplateRefErrDataColumnHeaders.length; j++) {
                            html += "<td align=left ><span class=c3>" + this.lstprofileTemplateRefErrData[i][this.lstprofileTemplateRefErrDataColumnHeaders[j][0]] + "</span></td>";
                        }
                        html += "</tr>";
                    }
                    html += "</table>";
                }

                html += "&nbsp;</td></tr>" +
                    "<tr><td>";

                if (this.lstProfileMenusErrData.length > 0) {
                    html += "&nbsp;</td></tr>" +
                        "<tr><td  align=left>MenuTemplate Error table</td></tr>" +
                        "<tr><td align=left>&nbsp;</td></tr>" +
                        "<tr><td>" +
                        "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                        "<tr bgcolor=#d3d3d3>";

                    for (var i = 0; i < this.lstProfileMenusErrDataColumnHeaders.length; i++) {
                        html += "<td align=left nowrap><span class=c3><b>" + this.lstProfileMenusErrDataColumnHeaders[i][1] + "</b></span></td>";
                    }
                    html += "</tr>";

                    for (var i = 0; i < this.lstProfileMenusErrData.length; i++) {
                        html += "<tr>";
                        for (var j = 0; j < this.lstProfileMenusErrDataColumnHeaders.length; j++) {
                            html += "<td align=left ><span class=c3>" + this.lstProfileMenusErrData[i][this.lstProfileMenusErrDataColumnHeaders[j][0]] + "</span></td>";
                        }
                        html += "</tr>";
                    }
                    html += "</table>";

                }

                html += "&nbsp;</td></tr>" +
                    "<tr><td>";

                if (this.lstprofileScreendisplayErrData.length > 0) {
                    html += "&nbsp;</td></tr>" +
                        "<tr><td  align=left>ScreenDisplayTemplate Error table</td></tr>" +
                        "<tr><td align=left>&nbsp;</td></tr>" +
                        "<tr><td>" +
                        "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                        "<tr bgcolor=#d3d3d3>";

                    for (var i = 0; i < this.lstprofileScreendisplayErrDataColumnHeaders.length; i++) {
                        html += "<td align=left nowrap><span class=c3><b>" + this.lstprofileScreendisplayErrDataColumnHeaders[i][1] + "</b></span></td>";
                    }
                    html += "</tr>";

                    for (var i = 0; i < this.lstprofileScreendisplayErrData.length; i++) {
                        html += "<tr>";
                        for (var j = 0; j < this.lstprofileScreendisplayErrDataColumnHeaders.length; j++) {
                            html += "<td align=left ><span class=c3>" + this.lstprofileScreendisplayErrData[i][this.lstprofileScreendisplayErrDataColumnHeaders[j][0]] + "</span></td>";
                        }
                        html += "</tr>";
                    }
                    html += "</table>";

                }

                if (this.lstprofileParametersErrData.length > 0) {
                    html += "&nbsp;</td></tr>" +
                        "<tr><td  align=left>ParameterTemplate Error table</td></tr>" +
                        "<tr><td align=left>&nbsp;</td></tr>" +
                        "<tr><td>" +
                        "<table cellpadding=3 cellspacing = 1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>" +
                        "<tr bgcolor=#d3d3d3>";

                    for (var i = 0; i < this.lstprofileParametersErrDataColumnHeaders.length; i++) {
                        html += "<td align=left nowrap><span class=c3><b>" + this.lstprofileParametersErrDataColumnHeaders[i][1] + "</b></span></td>";
                    }
                    html += "</tr>";

                    for (var i = 0; i < this.lstprofileParametersErrData.length; i++) {
                        html += "<tr>";
                        for (var j = 0; j < this.lstprofileParametersErrDataColumnHeaders.length; j++) {
                            html += "<td align=left ><span class=c3>" + this.lstprofileParametersErrData[i][this.lstprofileParametersErrDataColumnHeaders[j][0]] + "</span></td>";
                        }
                        html += "</tr>";
                    }
                    html += "</table>";

                }


            }

            html += "</td></tr></table>";

            return html;

        } catch (ex) {
            this.clientErrorMsg(ex, "prepareExcelSheet");
            html = '';
            return html;
        }

    }

    validateFileName(pstrFilename: string) {
        try {
            if (pstrFilename != '') {
                if (pstrFilename.indexOf('.') != -1) {
                    if (pstrFilename.split('.')[1].toUpperCase() == 'xls'.toUpperCase()) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "validateFileName");
            return false;
        }
    }

    getISODateTime() {
        var s = function (p) {
            return ('' + p).length < 2 ? '0' + p : '' + p;
        };
        var d = new Date();
        return s(d.getMonth() + 1) + s(d.getDate()) + d.getFullYear() + '_' + s(d.getHours()) + s(d.getMinutes()) + s(d.getSeconds());
    }

    clientErrorMsg(ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }

    clearData() {
        this.dgridErrorDtls = false;
        this.dgridOrgErrorDtls = false;
        sessionStorage.removeItem('dsUserdata');
        sessionStorage.removeItem('dsOrgGroupdata');
        sessionStorage.removeItem('dsProfiledata');
        this.tblGrd = false;
        this.tblOrgGrd = false;
        this.tblProfileGrd = false;
        this.tdOptions = false;
        this.lblTotalNoOfRec = 0;
        this.lblSuccessCnt = 0;
        this.lblFailureCnt = 0;
        this.lblAddedNoOfRec = 0;
        this.lblUpdatedNoOfRec = 0;

        this.lblOrgTotalNoOfRec = 0;
        this.lblOrgSuccessCnt = 0;
        this.lblOrgFailureCnt = 0;
        this.lblOrgWarningCnt = 0;
        this.lblOrgAddedNoOfRec = 0;
        this.lblOrgUpdatedNoOfRec = 0;

        this.lblProfileTotalNoOfRec = 0;
        this.lblProfileSuccessCnt = 0;
        this.lblProfileFailureCnt = 0;
        this.lblProfileAddedNoOfRec = 0;
        this.lblprofileUpdatedNoOfRec = 0;

        this._statusCode = '';
        this.dsUserdata = [];
        this.dsOrgGroupdata = [];
        this.dsProfiledata = [];
        this.dsUploadData = [];
        this.msgs = [];
        this._blnUserDataExists = false;
        this._blnOrgDataExists = false;
        this._blnProfileDataExists = false;


        this.tdMenuError = false;
        this.tdScreenDisplay = false;
        this.tdParameters = false;
        this.tdEmptyRowMenu = false;
        this.tdEmptyRowScreen = false;
        this.tdEmptyRowParams = false;
        this.dgridProfileErrorDtls = false;
        this.dgridProfileMenuErrorDtls = false;
        this.dgridProfileScreenDisplayErrorDtls = false;
        this.dgridProfileParametersErrorDtls = false;

        this.strERPvalue = '';
        this._strUserUploadPath = '';
        this._strOrgGroupUploadPath = '';
        this._strProfileUploadPath = '';


        this.lstUserErrDataColumnHeaders = [];
        this.lstUserErrData = [];
        this.lstOrgGroupErrDataColumnHeaders = [];
        this.lstOrgGroupErrData = [];
        this.lstProfileMenusErrDataColumnHeaders = [];
        this.lstProfileMenusErrData = [];
        this.lstprofileParametersErrDataColumnHeaders = [];
        this.lstprofileParametersErrData = [];
        this.lstprofileScreendisplayErrDataColumnHeaders = [];
        this.lstprofileScreendisplayErrData = [];
        this.lstprofileTemplateRefErrDataColumnHeaders = [];
        this.lstprofileTemplateRefErrData = [];

        this.userErrDataHeaders = [];
        this.userErrDataFields = [];
        this.orgGrpErrDataHeaders = [];
        this.orgGrprErrDataFields = [];
        this.profileMenusErrDataHeaders = [];
        this.profileMenusErrDataFields = [];
        this.profileParamErrDataHeaders = [];
        this.profileParamErrDataFields = [];
        this.profileScrErrDataHeaders = [];
        this.profileScrErrDataFields = [];
        this.profileTemprefErrDataHeaders = [];
        this.profileTempRefErrDataFields = [];
        this.userErrDataTableWidth = '100%';
        this.orgGroupErrDataTableWidth = '100%';
        this.profileErrDataTableWidth = '100%';
    }

    OnDestroy() {
        this.dgridErrorDtls = null;
        this.dgridOrgErrorDtls = null;
        sessionStorage.removeItem('dsUserdata');
        sessionStorage.removeItem('dsOrgGroupdata');
        sessionStorage.removeItem('dsProfiledata');
        this.tblGrd = null;
        this.tblOrgGrd = null;
        this.tblProfileGrd = null;
        this.tdOptions = null;
        this.lblTotalNoOfRec = null;
        this.lblSuccessCnt = null;
        this.lblFailureCnt = null;
        this.lblAddedNoOfRec = null;
        this.lblUpdatedNoOfRec = null;

        this.lblOrgTotalNoOfRec = null;
        this.lblOrgSuccessCnt = null;
        this.lblOrgFailureCnt = null;
        this.lblOrgWarningCnt = null;
        this.lblOrgAddedNoOfRec = null;
        this.lblOrgUpdatedNoOfRec = null;

        this.lblProfileTotalNoOfRec = null;
        this.lblProfileSuccessCnt = null;
        this.lblProfileFailureCnt = null;
        this.lblProfileAddedNoOfRec = null;
        this.lblprofileUpdatedNoOfRec = null;

        this._statusCode = '';
        this.dsUserdata = null;
        this.dsOrgGroupdata = null;
        this.dsProfiledata = null;
        this.dsUploadData = null;
        this.msgs = null;
        this._blnUserDataExists = null;
        this._blnOrgDataExists = null;
        this._blnProfileDataExists = null;


        this.tdMenuError = null;
        this.tdScreenDisplay = null;
        this.tdParameters = null;
        this.tdEmptyRowMenu = null;
        this.tdEmptyRowScreen = null;
        this.tdEmptyRowParams = null;
        this.dgridProfileErrorDtls = null;
        this.dgridProfileMenuErrorDtls = null;
        this.dgridProfileScreenDisplayErrorDtls = null;
        this.dgridProfileParametersErrorDtls = null;
        this.trInputFields = null;
        this.strERPvalue = null;
        this._strUserUploadPath = null;
        this._strOrgGroupUploadPath = null;
        this._strProfileUploadPath = null;


        this.lstUserErrDataColumnHeaders = null;
        this.lstUserErrData = null;
        this.lstOrgGroupErrDataColumnHeaders = null;
        this.lstOrgGroupErrData = null;
        this.lstProfileMenusErrDataColumnHeaders = null;
        this.lstProfileMenusErrData = null;
        this.lstprofileParametersErrDataColumnHeaders = null;
        this.lstprofileParametersErrData = null;
        this.lstprofileScreendisplayErrDataColumnHeaders = null;
        this.lstprofileScreendisplayErrData = null;
        this.lstprofileTemplateRefErrDataColumnHeaders = null;
        this.lstprofileTemplateRefErrData = null;

        this.userErrDataHeaders = null;
        this.userErrDataFields = null;
        this.orgGrpErrDataHeaders = null;
        this.orgGrprErrDataFields = null;
        this.profileMenusErrDataHeaders = null;
        this.profileMenusErrDataFields = null;
        this.profileParamErrDataHeaders = null;
        this.profileParamErrDataFields = null;
        this.profileScrErrDataHeaders = null;
        this.profileScrErrDataFields = null;
        this.profileTemprefErrDataHeaders = null;
        this.profileTempRefErrDataFields = null;

        this.userErrDataTableWidth = null;
        this.orgGroupErrDataTableWidth = null;
        this.profileErrDataTableWidth = null;
    }

}