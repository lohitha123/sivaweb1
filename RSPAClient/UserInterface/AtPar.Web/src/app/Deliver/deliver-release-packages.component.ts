import { Component, OnDestroy, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { Message } from '../components/common/api';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { ReleasePackagesServiceComponent } from './deliver-release-packages.service.component'
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParConstants } from '../Shared/AtParConstants';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { MT_ATPAR_TRANSACTION } from '../../app/Entities/MT_ATPAR_TRANSACTION';
import { MT_POU_CASE_CART_HEADER } from '../../app/Entities/MT_POU_CASE_CART_HEADER';
import { StatusType } from '../Shared/AtParEnums';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { EnumApps } from '../Shared/AtParEnums';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_DETAIL_TRANSACTION } from '../../app/Entities/mt_atpar_detail_transaction';
import { SelectItem } from '../components/common/api';
import { BusinessType, AppTransactionStatus, YesNo_Enum } from '../Shared/AtParEnums';
import { ConfirmationService } from '../components/common/api';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'deliver-release-packages.component.html',
    providers: [datatableservice, AtParCommonService, ReleasePackagesServiceComponent, AtParConstants, AtParSharedDataService, ConfirmationService],
})

export class ReleasePackagesComponent {
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    selectedOrgGroupId: string;
    selectedBunit: string = "";
    orgGrpId: string = "";
    blnShowOrgGroupDD: boolean = false;
    lstDBData: MT_ATPAR_DETAIL_TRANSACTION[];
    lstgridfilterData: any[];
    lstOrgGroups: SelectItem[] = [];
    lstFilteredBUnits: SelectItem[] = [];
    orgGroupIDForDBUpdate: string;
    showGrid: boolean = false;
    selectedParLocation: string = "";
    transactionIdlist: string = "";
    UserIdlist: string = "";
    tranId: number;
    tranBoolean: boolean;
    startIndex: number;
    EndIndex: number;
    Lflag: string;
    pTransId: string;
    pUserId: string;
    appId: number;
    selectedFlag: boolean = false;

    constructor(private httpService: HttpService, private _http: Http, public dataservice: datatableservice,
        private commonService: AtParCommonService,
        private releasePackagesService: ReleasePackagesServiceComponent,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private router: Router,
        private route: ActivatedRoute,
        private atParSharedDataService: AtParSharedDataService,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.appId = EnumApps.Deliver;
            this.bindOrgGroups();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;


                            if (this.orgGroupData.length == 1) {

                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;

                                this.populateBusinessUnits();

                                this.spinnerService.stop();
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;

                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                this.lstFilteredBUnits = [];
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async populateBusinessUnits() {
        this.spinnerService.start();
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    this.lstFilteredBUnits = [];
                    this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" })
                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstFilteredBUnits.push({
                                    label: data.DataList[i].toString(),
                                    value: data.DataList[i].toString()
                                })
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBusinessUnits");
        }
    }

    async ddlOrgGrpIdChanged() {
        this.showGrid = false;
        this.growlMessage = [];

        if (this.selectedOrgGroupId == "Select One") {
            this.lstFilteredBUnits = [];
            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
            return;
        }
        this.spinnerService.start();
        try {
            this.selectedBunit = "";
            this.populateBusinessUnits();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    ddlBUnitChanged() {


        this.growlMessage = [];
        this.showGrid = false;
    }

    go_Click() {
        try {
            this.showGrid = false;
            if (this.blnShowOrgGroupLabel == true) {
                this.selectedOrgGroupId = this.orgGrpId.split("-")[0].trim();
                this.BindDataGrid();
            }
            else if (this.blnShowOrgGroupDD) {
                if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                }
                else {
                    this.BindDataGrid();
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "go_Click");
        }
    }

    BindDataGrid() {
        try {
            if (this.selectedBunit === "") {
                this.selectedBunit = "All";
            }
            this.GetPackageDetails("", "", "", YesNo_Enum.N.toString());
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    async GetPackageDetails(Lflag, pTransId, pUserId, isFromUnlock) {
        this.spinnerService.start();
        try {
            await this.releasePackagesService.GetReleasePackages(this.appId, pUserId, this.selectedOrgGroupId, this.selectedBunit, this.selectedParLocation, Lflag, pTransId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_DETAIL_TRANSACTION>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = true;
                            this.lstDBData = data.DataList;
                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                let changeDate = this.lstDBData[i].DOWNLOAD_DT_TIME;
                                var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                var date = new Date(dateStr);
                                this.lstDBData[i].DOWNLOAD_DT_TIME = date.toLocaleString();
                                this.lstDBData[i].DOWNLOAD_DT_TIME = this.lstDBData[i].DOWNLOAD_DT_TIME.replace(',', ' ');
                                if (this.lstDBData[i].CURRENT_EVENT == AppTransactionStatus.Downloaded.toString()) {
                                    this.lstDBData[i].CURRENT_EVENT = "DownLoad";
                                }
                                else if (this.lstDBData[i].CURRENT_EVENT == AppTransactionStatus.statLoad.toString()) {
                                    this.lstDBData[i].CURRENT_EVENT = "Load";
                                }
                                else if (this.lstDBData[i].CURRENT_EVENT == AppTransactionStatus.statPickup.toString()) {
                                    this.lstDBData[i].CURRENT_EVENT = "Pickup";
                                }
                                else if (this.lstDBData[i].CURRENT_EVENT == AppTransactionStatus.statUnload.toString()) {
                                    this.lstDBData[i].CURRENT_EVENT = "Unload";
                                }
                            }

                            if (isFromUnlock == YesNo_Enum.Y.toString()) {
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Package(s) released Successfully.' });
                            }

                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            if (isFromUnlock == YesNo_Enum.N.toString()) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            else if (isFromUnlock == YesNo_Enum.Y.toString()) {
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Package(s) released Successfully.' });
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetPackageDetails");
            this.showGrid = false;
        }
    }

    unlockRow(event, data: MT_ATPAR_DETAIL_TRANSACTION) {
        try {
            this.growlMessage = [];
            if (event == true) {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].TRANSACTION_ID == data.TRANSACTION_ID) {
                        this.lstDBData[i].Status = true;
                        this.lstDBData[i].CHK_VALUE = "1";
                    }
                }
            }
            else {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].TRANSACTION_ID == data.TRANSACTION_ID) {
                        this.lstDBData[i].Status = false;
                        this.lstDBData[i].CHK_VALUE = "0";
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unlockRow");
        }
    }

    UnlockSelectedRecords() {
        try {
            this.transactionIdlist = '';
            this.UserIdlist = '';
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_VALUE === "1") {
                    this.transactionIdlist = this.transactionIdlist.concat(this.lstDBData[i].TRANSACTION_ID + ",");
                    this.UserIdlist = this.UserIdlist.concat(this.lstDBData[i].UID + ",");
                }
            }
            if (this.transactionIdlist != '' || this.transactionIdlist != undefined) {
                this.transactionIdlist = this.transactionIdlist.replace(/,\s*$/, "");//this removes last unwanted comma
            }
            if (this.UserIdlist != '' || this.UserIdlist != undefined) {
                this.UserIdlist = this.UserIdlist.replace(/,\s*$/, "");//this removes last unwanted comma
            }
            if (this.transactionIdlist === "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Order(s) to unlock" });
                return;
            }
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: "Are you sure you want to unlock the Order(s) ?",
                accept: () => {
                    this.GetPackageDetails('Y', this.transactionIdlist, this.UserIdlist, YesNo_Enum.Y.toString());
                },
                reject: () => {
                }
            })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "UnlockSelectedRecords");
        }
    }

    checkAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].Status = true;
                    this.lstgridfilterData[i].CHK_VALUE = "1";
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].Status = true;
                    this.lstDBData[i].CHK_VALUE = "1";
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    uncheckAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].Status = false;
                    this.lstgridfilterData[i].CHK_VALUE = '0';
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].Status = false;
                    this.lstDBData[i].CHK_VALUE = '0';
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "uncheckAll");
        }
    }

    /**
     * removing values in string  contains comma separated values
     * @param list
     * @param value
     * @param separator
     */
    removeTransactionId(list, value, separator) {
        try {
            separator = separator || ",";
            var values = list.split(separator);
            for (var i = 0; i < values.length; i++) {
                if (values[i] == value) {
                    values.splice(i, 1);
                    return values.join(separator);
                }
            }
            return list;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "removeTransactionId");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
}