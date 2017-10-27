import { Component, Injectable, OnDestroy, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, ModeEnum } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { StatusType, EnumApps } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { MT_ATPAR_UI_FIELDS } from '../entities/mt_atpar_ui_fields';
import { AtParAccessPermissionService } from '../../app/AssetManagement/asmt-access-permission.service';
import { DataTable } from '../components/datatable/datatable';
declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'asmt-access-permission.component.html',
    providers: [AtParCommonService, AtParConstants, AtParAccessPermissionService],
})

export class AccessPermissionComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    _deviceTokenEntry: any;
    growlMessage: Message[] = [];
    pazeSize: number;
    lstOrgGroups: SelectItem[] = [];
    lstUsers: SelectItem[] = [];
    ORG_GROUP_ID: any;
    LBL_ORG_GROUP_ID: any;
    selectedOrgGroupId: any;
    selectedUser: any;
    showOrgDropdown: boolean;
    gAppID: number = 11;
    lstAccessFields: MT_ATPAR_UI_FIELDS[] = [];
    disableSubmitButton: boolean = false;

    constructor(
        private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private atParAccessPermissionService: AtParAccessPermissionService,
        private httpService: HttpService,
        private http: Http,
        private atParConstant: AtParConstants) {
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    async ngOnInit() {

        this.pazeSize = +this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.spinnerService.start();
        await this.bindOrgDropdown();
    }

    async bindOrgDropdown() {
        try {
            await this.atParCommonService.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((result:Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.lstOrgGroups = [];
                    this.lstUsers = [];
                    this.lstOrgGroups.push({ label: 'Select One', value: 'Select One' });
                    this.lstUsers.push({ label: 'Select User', value: 'Select User' });
                    switch (res.StatType) {
                        case StatusType.Success: {
                            if (res.DataList.length == 1) {
                                this.showOrgDropdown = false;
                                this.LBL_ORG_GROUP_ID = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                this.selectedOrgGroupId = res.DataList[0].ORG_GROUP_ID;
                                this.getUsersList(res.DataList[0].ORG_GROUP_ID);
                                this.spinnerService.stop();
                            }
                            else {
                                this.spinnerService.stop();
                                this.showOrgDropdown = true;
                                for (var i = 0; i < res.DataList.length; i++) {
                                    if (res.DataList[i].ORG_GROUP_ID.toUpperCase() != 'ALL') {
                                        this.lstOrgGroups.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID })
                                    }
                                }

                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }


                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async ddlOrgGroup_SelectedIndexChanged(e) {
        this.selectedOrgGroupId = this.ORG_GROUP_ID;
        if (e.value != 'Select One') {
            await this.getUsersList(e.value);
        }
        else {
            this.selectedUser = 'Select User';
        }
        this.lstAccessFields = [];

    }

    ddlUserChange() {
        this.lstAccessFields = [];
    }
  

    async getUsersList(orgGroupID) {
        try {
            await this.atParCommonService.getUsersList(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.gAppID, orgGroupID)
                .catch(this.httpService.handleError).then((result:Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.lstUsers = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.lstUsers.push({ label: 'Select User', value: 'Select User' });
                            for (var i = 0; i < res.DataList.length; i++) {
                                this.lstUsers.push({ label: res.DataList[i].FULLNAME, value: res.DataList[i].USER_ID })
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }

                })
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];

            if (this.showOrgDropdown && (this.ORG_GROUP_ID == 'Select One' || this.ORG_GROUP_ID == '' || this.ORG_GROUP_ID == undefined)) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                return;
            }
            if (!this.showOrgDropdown && (this.LBL_ORG_GROUP_ID == '' || this.LBL_ORG_GROUP_ID == undefined)) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                return;
            }
            if (this.selectedUser == 'Select User' || this.selectedUser == '' || this.selectedUser == undefined) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select User ID' });
                return;
            }
            this.spinnerService.start();
            if (this.dataTableComponent != undefined) {
                this.dataTableComponent.reset();
            }
            

            await this.atParAccessPermissionService.getAccessFields(this.gAppID, this.selectedOrgGroupId, this.selectedUser, 'ASSET ITEMS')
                .catch(this.httpService.handleError).then((result:Response) => {
                    this.spinnerService.stop();
                    let res = result.json() as AtParWebApiResponse<MT_ATPAR_UI_FIELDS>;
                    this.lstAccessFields = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.lstAccessFields = res.DataList;
                            for (var i = 0; i < this.lstAccessFields.length; i++) {
                                this.lstAccessFields[i].SCANORDER_ID = 'txtScanOrderId' + i;
                                if (this.lstAccessFields[i].DISPLAY_FLAG == 'N') {
                                    this.lstAccessFields[i].IS_DISPLAY = false;
                                } else {
                                    this.lstAccessFields[i].IS_DISPLAY = true;
                                }
                                if (this.lstAccessFields[i].EDIT_FLAG == 'N') {
                                    this.lstAccessFields[i].IS_EDIT = false;
                                } else {
                                    this.lstAccessFields[i].IS_EDIT = true;
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async btnSubmit_Click() {
        try {
            this.growlMessage = [];
            if (this.showOrgDropdown && (this.ORG_GROUP_ID == 'Select One' || this.ORG_GROUP_ID == '' || this.ORG_GROUP_ID == undefined)) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                return;
            }
            if (this.selectedUser == 'Select User' || this.selectedUser == '' || this.selectedUser == undefined) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select User ID' });
                return;
            }
            for (var i = 0; i < this.lstAccessFields.length; i++) {
                if (this.lstAccessFields[i].IS_DISPLAY == true) {
                    this.lstAccessFields[i].DISPLAY_FLAG = 'Y';
                } else {
                    this.lstAccessFields[i].DISPLAY_FLAG = 'N';
                }
                if (this.lstAccessFields[i].IS_EDIT == true) {
                    this.lstAccessFields[i].EDIT_FLAG = 'Y';
                } else {
                    this.lstAccessFields[i].EDIT_FLAG = 'N';
                }
            }
            this.spinnerService.start();
            this.atParAccessPermissionService.updateAccessFields(this.lstAccessFields, this.selectedOrgGroupId, this.selectedUser)
                .catch(this.httpService.handleError).then((result:Response) => {
                    this.spinnerService.stop();
                    let res = result.json() as AtParWebApiResponse<any>;
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            this.lstAccessFields = [];
                            this.ORG_GROUP_ID = 'Select One';
                            this.selectedUser = 'Select User';
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }

                })
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    dropDownValidations() {
        if ((this.selectedUser == 'Select User' || this.selectedUser == undefined || this.selectedUser == "")) {
            return true;
        }
        if ((this.ORG_GROUP_ID == 'Select One' || this.ORG_GROUP_ID == undefined || this.ORG_GROUP_ID == "")) {
            return true;
        }
        return false;
    }

    txtScan_Keyup(e, lstPermission) {
        if (e.target.value == '') {
            this.disableSubmitButton = true;
        }
        else {
            for (var i = 0; i < lstPermission.length; i++) {
                if (lstPermission[i].SCAN_ORDER == undefined || lstPermission[i].SCAN_ORDER == null || lstPermission[i].SCAN_ORDER == '') {
                    this.disableSubmitButton = true;
                    break;
                } else {
                    this.disableSubmitButton = false;
                }
            }

        }
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    ngOnDestroy() {
        this._deviceTokenEntry = [];
        this.pazeSize = null;
        this.growlMessage = [];
        this.lstAccessFields = [];
        this.selectedUser = '';
        this.ORG_GROUP_ID = '';
        this.spinnerService.stop();
        this.spinnerService = null;
    }
} 