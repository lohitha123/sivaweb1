import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { SelectItem, Message } from './../components/common/api';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { TokenEntry_Enum, ClientType, StatusType, BusinessType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { PickAllocatePriorityService } from './pick-allocate-priority.service';
import { MT_PKPL_PRIORITY } from '../../app/Entities/MT_PKPL_PRIORITY';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pick-allocate-priority.component.html',
    providers: [datatableservice, AtParCommonService, HttpService, AtParConstants, PickAllocatePriorityService]
})

export class AllocatePriorityComponent {
    pop: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    bunitsData: any = [];
    lstBunit: SelectItem[];
    selectedBunit: string = '';
    priority: MT_PKPL_PRIORITY;
    priorities: MT_PKPL_PRIORITY[];
    filterpriorities: MT_PKPL_PRIORITY[];
    blnddlOrgGrpID: boolean;
    showddlOrgGrpID: boolean;
    orgGroupLst: MT_ATPAR_ORG_GROUPS[];
    ddOrgGroupdata: any;
    selectedOrgGrpName: string;
    selectedOrgGrpId: string = '';
    recordsperpage: any;
    location: string = "";
    assignpriority: string = "";
    disableButton: boolean = true;
    priorityStatus: number = 0;
    startIndex: number = 0;
    endIndex: number;

    constructor(public dataservice: datatableservice, private atParCommonService: AtParCommonService, private httpService: HttpService,
        private spinnerService: SpinnerService, private atParConstant: AtParConstants, private pickAllocatePriorityService: PickAllocatePriorityService) {
    }

    async ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsperpage = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        await this.getUserOrgGroups();
    }

    async go() {
        this.growlMessage = [];
        if (this.selectedOrgGrpId == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
            return;
        }
        if (this.selectedBunit == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit" });
            return;
        }
        this.pop = false;
        this.priorities = [];
        this.filterpriorities = null;
        try {
            this.spinnerService.start();
            await this.pickAllocatePriorityService.getLocationPriorities(this.selectedBunit, (this.location != '') ? this.location.toUpperCase() : this.location).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_PKPL_PRIORITY>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.pop = true;
                            this.priorities = data.DataList;
                            if (this.priorities != null && this.priorities.length > 0) {
                                for (var i = 0; i < this.priorities.length; i++) {
                                    if (this.priorities[i].CHK_VALUE == 0) {
                                        this.priorities[i].ASSIGN = false;
                                    } else {
                                        this.priorities[i].ASSIGN = true;
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
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
        } catch (ex) {
            this.clientErrorMsg(ex, "go");
        }
    }

    async bindModelDataChange(event: any) {
        try {
            this.growlMessage = [];
            this.disableButton = false;
            if (event != null && event.TextBoxID != null && event.validationrules != null) {
                if ("txtPriority" == event.TextBoxID.toString()) {
                    this.priorityStatus = event.validationrules.filter(x => x.status == false).length;
                }
            }
            if (this.priorityStatus == 0) {
                this.disableButton = false;
            } else {
                this.disableButton = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindModelDataChange");
        }
    }

    async getBunits() {
        this.growlMessage = [];
        this.bunitsData = [];
        let isOrgBUnitsExist: boolean = false;
        this.lstBunit = [];
        this.lstBunit.push({ label: "Select BUnit", value: "" })
        try {
            await this.atParCommonService.getOrgBusinessUnits(this.selectedOrgGrpId, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.bunitsData = data.DataList;
                            for (let i = 0; i < this.bunitsData.length; i++) {
                                this.lstBunit.push({
                                    label: this.bunitsData[i], value: this.bunitsData[i]
                                })
                            }
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }
                });
            return Promise.resolve(isOrgBUnitsExist);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getBunits");
        }
    }

    async getUserOrgGroups() {
        try {

           // this.blnddlOrgGrpID = false;
       
            await this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID],
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then(async (res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.orgGroupLst = res.json().DataList;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddOrgGroupdata = [];
                            if (this.orgGroupLst != null && this.orgGroupLst.length > 0) {
                                if (this.orgGroupLst.length == 1) {
                                    this.selectedOrgGrpName = this.orgGroupLst[0].ORG_GROUP_ID + " - " + this.orgGroupLst[0].ORG_GROUP_NAME;
                                    this.selectedOrgGrpId = this.orgGroupLst[0].ORG_GROUP_ID;
                                    this.blnddlOrgGrpID = true;
                                    await this.getBunits();
                                }
                                else if (this.orgGroupLst.length > 1) {
                                    this.showddlOrgGrpID = true;
                                    this.lstBunit = [];
                                    this.lstBunit.push({ label: "Select BUnit", value: "" });
                                    this.ddOrgGroupdata = [];
                                    this.ddOrgGroupdata.push({ label: "Select One", value: "" });
                                    for (var i = 0; i < this.orgGroupLst.length; i++) {
                                        if (this.orgGroupLst[i].ORG_GROUP_ID !== "All") {
                                            this.ddOrgGroupdata.push({
                                                label: this.orgGroupLst[i].ORG_GROUP_ID + " - " + this.orgGroupLst[i].ORG_GROUP_NAME,
                                                value: this.orgGroupLst[i].ORG_GROUP_ID
                                            })
                                        }
                                    }
                                    break;
                                }
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

        }
        catch (ex) {
            this.clientErrorMsg(ex, "getUserOrgGroups");
        }
    }

    async onChange(event) {
        try {
            this.growlMessage = [];
            this.pop = false;
            this.selectedBunit = "";

            if (this.selectedOrgGrpId == "Select One" || this.selectedOrgGrpId == "") {
                this.lstBunit = [];
                this.lstBunit.push({ label: "Select BUnit", value: "" })
                return;
            }
            await this.getBunits();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onChange");
        }
    }

    async onBunitChange(event) {
        try {
            this.pop = false;
            if (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") {
                return;
            }
            await this.getBunits();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onBunitChange");
        }
    }

    async  saveAllocatePriorites() {
        this.growlMessage = [];
        if (this.assignpriority == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Success, detail: "Please assign valid priority" });
        }
        this.spinnerService.start()
        try {
            this.growlMessage = [];
            await this.pickAllocatePriorityService.saveLocationPriorities(this.assignpriority, this.priorities).
                catch(this.httpService.handleError).then((res: any) => {
                    let resp = res.json() as AtParWebApiResponse<MT_PKPL_PRIORITY>;
                    switch (resp.StatType) {
                        case StatusType.Success: {
                            this.selectedBunit = "";
                            this.location = "";
                            this.assignpriority = "";
                            this.loading = true;
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                            this.page = false;
                            this.pop = false;
                            this.disableButton = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            let statusMessage: string = resp.StatusMessage;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                            break;
                        }
                    }
                    this.spinnerService.stop();
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "saveAllocatePriorites");
        }
    }

    checkAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.filterpriorities != null || this.filterpriorities != undefined) {

                if (this.endIndex > this.filterpriorities.length) {
                    this.endIndex = this.filterpriorities.length;
                }

                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.filterpriorities[i].CHK_VALUE = 1;
                }

            }
            else {
                if (this.endIndex > this.priorities.length) {
                    this.endIndex = this.priorities.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.priorities[i].CHK_VALUE = 1;
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

            if (this.filterpriorities != null || this.filterpriorities != undefined) {
                if (this.endIndex > this.filterpriorities.length) {
                    this.endIndex = this.filterpriorities.length;
                }

                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.filterpriorities[i].CHK_VALUE = 0;
                }
            } else {
                if (this.endIndex > this.priorities.length) {
                    this.endIndex = this.priorities.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.priorities[i].CHK_VALUE = 0;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "saveAllocatePriorites");
        }
    }

    changeStatus(obj: any, status: any) {
        try {
            if (status == true) {
                obj.CHK_VALUE = 1;
                obj.ASSIGN = true;
            } else {
                obj.CHK_VALUE = 0;
                obj.ASSIGN = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.disableButton = true;
        this.priorities = [];
    }

    myfilterdata(event) {
        try {
            this.filterpriorities = new Array<MT_PKPL_PRIORITY>();
            this.filterpriorities = event;

        }
        catch (ex) {
            this.clientErrorMsg(ex, "myfilterdata");
        }
    }

}

