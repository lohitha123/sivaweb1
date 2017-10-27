
import { OnInit, Component, OnDestroy, Input } from '@angular/core';
import { Http, Response } from "@angular/http";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AtParReleaseOrdersServices } from "./atpar-release -orders.service";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType, BusinessType, EnumApps, StatusType, YesNo_Enum } from '../Shared/AtParEnums';
import { SelectItem } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Message } from './../components/common/api';
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups'
import { MT_ATPAR_ORG_GROUP_BUNITS } from "../../app/Entities/mt_atpar_org_group_bunits";
import { MT_ATPAR_TRANSACTION } from "../../app/Entities/mt_atpar_transaction";
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { ConfirmationService } from '../components/common/api';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';

declare var module: {
    id: string;
}
@Component({
    selector: 'atpar-release-Orders',
    templateUrl: 'atpar-release-orders.component.html',
    providers: [AtParReleaseOrdersServices, AtParCommonService, HttpService, AtParConstants, ConfirmationService]
})

export class ReleaseOrdersComponent {

    lstBusinessData: MT_ATPAR_ORG_GROUP_BUNITS[];
    hasSingleOrgGroups: boolean = false;
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnStatusMsg: boolean = false;
    orgGrpId: string = "";
    blnShowOrgGroupLabel: boolean = false;
    public ddlOrglst: SelectItem[] = [];
    lstOrgGroups: SelectItem[] = [];

    selectedOrgGroupId: string = "";
    orgGroupIDForDBUpdate: string;
    blnShowOrgGroupDD: boolean = false;
    growlMessage: Message[] = [];
    deviceTokenEntry: string[] = [];
    businessDatangModel: string = "";
    ddlBusinessData: SelectItem[] = [];
    purchaseOrder: string = "";
    showGrid: boolean = false;
    pageSize: number;
    @Input() appId: string;
    intAppId: number;
    startIndex: number = 0;
    endIndex: number = 10;
    strTransId: string;
    lstReleaseOrdersData: MT_ATPAR_TRANSACTION[];
    lstCheckedRelease: Array<MT_ATPAR_TRANSACTION>;
    lstgridfilterData: MT_ATPAR_TRANSACTION[] = null;
    headerName: any;
    lblOrderName: string = "";

    upDateUserID: string;
    statusMesssage: string;
    lstReleaseOrdersData1 = new MT_ATPAR_TRANSACTION();
    previousSelected: string = '';

    public constructor(
        private atParReleaseOrdersServices: AtParReleaseOrdersServices,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private confirmationService: ConfirmationService,
    ) {
    }

    async  ngOnInit() {
        try {
            this.spinnerService.start();
            this.intAppId = parseInt(this.appId);
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            if (this.intAppId == 4) {
                this.lblOrderName = "Purchase Order No"
            }
            else if (this.intAppId == 5) {
                this.lblOrderName = "Order No - Pick Batch ID"
            }
            else if (this.intAppId == 7) {
                this.lblOrderName = "Plan ID"
            }

            sessionStorage.getItem("Recordsstartindex")
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            await this.bindOrgGroups();
           // this.spinnerService.stop();
            this.ddlBusinessData.push({ label: "Select Bunit ", value: "" })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }
    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.spinnerService.stop();
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID],
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            this.blnStatusMsg = false;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.populateBusinessUnits();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;

                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });
            this.spinnerService.stop();

        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async ddlOrgGrpIdChanged(event) {
        try {
            this.showGrid = false;
            this.businessDatangModel = "";
            this.ddlBusinessData = [];
            this.growlMessage = [];
            this.ddlBusinessData.push({ label: "Select Bunit ", value: "" })
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == "") {
                this.ddlBusinessData = [];
                this.ddlBusinessData.push({ label: "Select Bunit ", value: "" })
                return;
            }
            if (this.previousSelected == "" || event.label != this.previousSelected) {
                this.previousSelected = this.selectedOrgGroupId;

                this.spinnerService.start();
                this.populateBusinessUnits();
                this.spinnerService.stop();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    ddl_Changed() {
        this.showGrid = false;
    }

    async populateBusinessUnits(): Promise<boolean> {

        let isOrgBUnitsExist: boolean = false;
        this.showGrid = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0].trim();
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.spinnerService.start();
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.AllBunits).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.spinnerService.stop();
                    this.ddlBusinessData = [];
                    this.ddlBusinessData.push({ label: "Select Bunit ", value: "" })
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.lstBusinessData = data.DataList;
                                if (this.lstBusinessData.length >= 1) {
                                    for (let i = 0; i < this.lstBusinessData.length; i++) {
                                        this.ddlBusinessData.push({ label: this.lstBusinessData[i].toString(), value: this.lstBusinessData[i].toString() })
                                    }
                                }
                                else {
                                    break;
                                }
                                break;
                            }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }

                });
            this.spinnerService.stop();

            return Promise.resolve(isOrgBUnitsExist);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBusinessUnits");
        }
    }

    async btnGo_Click() {
        this.growlMessage = [];
        if (this.orgGrpId == null || this.orgGrpId === "" || this.orgGrpId == undefined) {
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == "") {
                this.ddlBusinessData = [];
                this.ddlBusinessData.push({ label: "Select Bunit ", value: "" })
                this.statusMesssage = " Please Select Org Group ID";
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMesssage });
                return;
            }
        }

        this.spinnerService.start();
        await this.getRelOrderDetails();

    }

    async  getRelOrderDetails() {
        try {

            this.showGrid = false;

            await this.atParReleaseOrdersServices.getRelOrderDetails(this.intAppId, this.deviceTokenEntry[TokenEntry_Enum.UserID],
                this.businessDatangModel, this.purchaseOrder, this.orgGroupIDForDBUpdate, false)
                .then((res: Response) => {
                    let resp = res.json() as AtParWebApiResponse<MT_ATPAR_TRANSACTION>
                    this.spinnerService.stop();
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                this.lstReleaseOrdersData = resp.DataList;
                                if (this.lstReleaseOrdersData.length > 0) {
                                    for (let i = 0; i < this.lstReleaseOrdersData.length; i++) {
                                        this.lstReleaseOrdersData[i].check_value = false;

                                        let changeDate = this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME;
                                        var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                        var date = new Date(dateStr);
                                        this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME = date.toLocaleString();
                                        this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME = this.lstReleaseOrdersData[i].DOWNLOAD_DT_TIME.replace(',', '')
                                        this.upDateUserID = this.lstReleaseOrdersData[i].UID;
                                    }

                                    if (this.intAppId == 4) {
                                        this.headerName = "Purchase Order No"


                                    }
                                    else if (this.intAppId == 5) {
                                        this.headerName = "Order No - Pick Batch ID"
                                    }

                                    else if (this.intAppId == 7) {
                                        this.headerName = "Plan ID"
                                    }
                                    this.showGrid = true;
                                }
                                else {
                                    this.showGrid = false;
                                }
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.showGrid = false;
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                this.showGrid = false;
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.showGrid = false;
                                break;
                            }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "getRelOrderDetails");
        }
    }

    async  updateRelOrderDetails() {
        try {
            this.spinnerService.start();
            await this.atParReleaseOrdersServices.updateRelOrderDetails(this.intAppId, this.upDateUserID,
                this.businessDatangModel, this.purchaseOrder, this.orgGroupIDForDBUpdate, " ", this.strTransId)
                .then((res: Response) => {

                    this.spinnerService.stop();
                    let resp = res.json() as AtParWebApiResponse<MT_ATPAR_TRANSACTION>
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                this.lstReleaseOrdersData = resp.DataList;

                                if (this.lstReleaseOrdersData.length > 0) {
                                    for (let i = 0; i < this.lstReleaseOrdersData.length; i++) {
                                        this.lstReleaseOrdersData[i].check_value = false;
                                    }
                                    this.showGrid = true;
                                    this.purchaseOrder = "";
                                }
                                else {
                                    this.showGrid = false;
                                    this.purchaseOrder = "";
                                }

                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Order(s) Released Successfully" });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.lstReleaseOrdersData = [];
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.showGrid = false;
                                break;
                            }
                        case StatusType.Warn:
                            {
                                if (resp.StatusCode == 1102002) {
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Order(s) Released Successfully" });
                                }
                                else {
                                    this.lstReleaseOrdersData = [];
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                }

                                this.showGrid = false;
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.lstReleaseOrdersData = [];
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.showGrid = false;
                                break;
                            }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "updateRelOrderDetails");
        }
    }

    changeStatus(releaseOrderData) {
        try {
            let releaseOrderDataChecked = releaseOrderData;
            for (let x = 0; x < releaseOrderDataChecked.length; x++) {
                if (releaseOrderDataChecked[x].check_value == true) {
                }
                else {
                    releaseOrderDataChecked[x].check_value = false;
                }
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "changeStatus");
        }

    }

    async  btnUnlockBtm_Click() {
        try {
            this.growlMessage = [];
            this.strTransId = "";
            for (let i = 0; i < this.lstReleaseOrdersData.length; i++) {
                if (this.lstReleaseOrdersData[i].check_value) {
                    this.strTransId += this.lstReleaseOrdersData[i].TRANSACTION_ID + ',';
                }

            }
            if (this.strTransId == "" || this.strTransId == undefined || this.strTransId == null) {
                this.growlMessage = [];
                this.statusMesssage = "Please select Order(s) to unlock";
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMesssage });
            }
            else {
                this.confirm();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnUnlockBtm_Click");
        }
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstCheckedRelease = null;
        this.orgGroupData = null;
        this.lstBusinessData = null;
        this.intAppId = null;
        this.startIndex = null;
        this.endIndex = null;
        this.selectedOrgGroupId = null;
        this.orgGroupIDForDBUpdate = null;
        this.ddlOrglst = null
        this.lstOrgGroups = null;
        this.lstReleaseOrdersData = null
        this.orgGrpId = null;
        this.growlMessage = null;
        this.businessDatangModel = null
        this.purchaseOrder = null;
        this.strTransId = "";
        this.spinnerService.stop();
    }
    confirm() {
        this.growlMessage = [];
        this.confirmationService.confirm({
            message: 'Are you sure you want to unlock the Order(s) ?',
            accept: () => {
                this.updateRelOrderDetails();
            }
        });
    }

    public onSort(event) {
        try {
            if (event.data != null && event.data.length > 0) {
                for (let x = 0; x < event.data.length; x++) {
                    event.data[x].check_value = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onSort");
        }
    }

    checkAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.endIndex > this.lstgridfilterData.length) {
                    this.endIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstgridfilterData[i].check_value = true;
                }
            }
            else {
                if (this.endIndex > this.lstReleaseOrdersData.length) {
                    this.endIndex = this.lstReleaseOrdersData.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstReleaseOrdersData[i].check_value = true;

                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    unCheckAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.endIndex > this.lstgridfilterData.length) {
                    this.endIndex = this.lstgridfilterData.length;
                }

                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].check_value = false;
                }
            } else {
                if (this.endIndex > this.lstReleaseOrdersData.length) {
                    this.endIndex = this.lstReleaseOrdersData.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstReleaseOrdersData[i].check_value = false;

                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    filterdata(event) {
        this.lstgridfilterData = new Array<MT_ATPAR_TRANSACTION>();
        this.lstgridfilterData = event;
    }

}







