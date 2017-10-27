import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_SECURITY_AUDIT } from '../../app/Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { ConfirmationService } from '../components/common/api';
import { TokenEntry_Enum } from '../Shared/AtParEnums';
import { BusinessType } from '../Shared/AtParEnums';
import { StatusType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Message } from '../components/common/api';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { MT_DELV_BU_ALLOCATION } from '../../app/Entities/MT_DELV_BU_ALLOCATION';
import { VM_ATPAR_IBU_ALLOCATION } from '../../app/Entities/VM_ATPAR_IBU_ALLOCATION';
import { EnumApps } from '../Shared/AtParEnums';
import { DeliverAllocateBunitServices } from '../Deliver/deliver-allocate-business-units.component.services';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'deliver-allocate-business-units.component.html',
    providers: [HttpService, ConfirmationService, AtParConstants, AtParCommonService, DeliverAllocateBunitServices],
})

export class AllocateBusinessUnitsComponent implements OnInit {
    /*Varaible Declaration*/
    intAppId: number;
    startIndex: number;
    EndIndex: number;
    recordsPerPageSize: number;
    orgGrpId: string = "";
    orgGrpIDData: string = "";
    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string = "";
    selectedBunit: string = "";
    selectedDescription: string = "";
    orgGroupIDForDBUpdate: string = "";
    custom: string = "custom";
    isAuditRequired: string = "";
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    blnsortbycolumn: boolean = true;
    preField: string = "";
    isVisible: boolean = false;
    showAllocGroup: boolean = false;
    showGrid: boolean = false;
    deviceTokenEntry: string[] = [];
    public lstUsers: SelectItem[] = [];
    userDataList: MT_ATPAR_USER[];
    lstOrgGroups: SelectItem[] = [];
    dataCheckedSorting: VM_ATPAR_IBU_ALLOCATION[] = [];
    dataUncheckedSorting: Array<VM_ATPAR_IBU_ALLOCATION>;
    sortedcheckedrec: VM_ATPAR_IBU_ALLOCATION[];
    sorteduncheckedrec: VM_ATPAR_IBU_ALLOCATION[];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    lstCheckedBUnits: Array<VM_ATPAR_IBU_ALLOCATION>;
    lstDBData: VM_ATPAR_IBU_ALLOCATION[];
    lstgridfilterData: VM_ATPAR_IBU_ALLOCATION[];
    growlMessage: Message[] = [];
    lstBUnits: any = [];
    lstFilteredBUnits: any = [];
    lblSearched: string;

    /**
   * Constructor
   * @param DeliverAllocateBunitServices
   * @param ConfirmationService
   * @param httpService
   * @param spinnerService
   * @param atParConstant
   */
    constructor(private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private confirmationService: ConfirmationService,
        private atParConstant: AtParConstants,
        private deliverAllocateBunitServices: DeliverAllocateBunitServices) { }

    /**
    * Init Function  for binding OrgGroupIds to the dropdown when page loading 
    */
    async ngOnInit() {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.intAppId = EnumApps.Deliver;
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.lstCheckedBUnits = new Array<VM_ATPAR_IBU_ALLOCATION>();
            this.dataCheckedSorting = new Array<VM_ATPAR_IBU_ALLOCATION>();
            this.dataUncheckedSorting = new Array<VM_ATPAR_IBU_ALLOCATION>();
            this.lstFilteredBUnits = new Array<VM_ATPAR_IBU_ALLOCATION>();
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.checkAuditAllowed();
            await this.bindOrgGroups();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    /**
    * Getting OrgGroupIds,Bunits,users data from database when page loading
    */
    async bindOrgGroups() {
        this.spinnerService.start();
        try {
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            this.spinnerService.stop();
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpIDData = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID;
                                this.populateBunitsDdlst();
                                this.bindUsersList();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstUsers = [];
                                this.lstUsers.push({ label: "Select User", value: "Select User" })
                                this.lstOrgGroups = [];
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
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    /**
    * Getting  Users data from database 
    */
    async bindUsersList() {
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }
        this.lstUsers = [];
        this.lstUsers.push({ label: "Select User", value: "Select User" });
        try {
            this.spinnerService.start();
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.intAppId, this.orgGroupIDForDBUpdate)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.userDataList = data.DataList;
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstUsers.push({
                                    label: data.DataList[i].FULLNAME,
                                    value: data.DataList[i].USER_ID
                                })
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
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
            this.clientErrorMsg(ex, "bindUsersList");
        }
    }

    /**
    * This method is calling when user selecting  OrgGrpId in dropdown and using for getting users,bunits data from database
    */
    async  ddlOrgGrpIdChanged() {
        this.isVisible = false;
        this.growlMessage = [];

        if (this.selectedOrgGroupId == "Select One") {
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            return;
        }
        this.selectedDropDownUserId = "";
        this.lstDBData = new Array<VM_ATPAR_IBU_ALLOCATION>();
        this.spinnerService.start();
        try {
            await this.bindUsersList();
            await this.populateBunitsDdlst();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    /**
    * This method is calling when user selecting UserId in dropdown
    */
    ddlUserChanged() {
        this.growlMessage = [];
        this.isVisible = false;
    }

    /**
     * checking audition for this page
     */
    async checkAuditAllowed() {
        try {
            await this.commonService.getAuditAllowed(this.intAppId, "mt_delv_bunit_alloc.aspx").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.isAuditRequired = data.Data;
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
            this.clientErrorMsg(ex, "checkAuditAllowed");
        }
    }

    /**
     * Insert AuditData for this page
     */
    async insertAuditData() {
        try {
            let auditSecurity: MT_ATPAR_SECURITY_AUDIT;
            let auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>;
            auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();

            for (let intCnount = 0; intCnount <= this.lstCheckedBUnits.length - 1; intCnount++) {
                if (this.lstCheckedBUnits[intCnount].CHK_VALUE == 1) {
                    auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                    auditSecurity.FIELD_NAME = "CHK_VALUE";
                    auditSecurity.OLD_VALUE = "0";
                    auditSecurity.NEW_VALUE = "1";
                    auditSecurity.KEY_1 = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                    auditSecurity.KEY_2 = this.intAppId.toString();
                    auditSecurity.KEY_3 = this.lstCheckedBUnits[intCnount].BUSINESS_UNIT;
                    auditSecurity.KEY_4 = "";
                    auditSecurity.KEY_5 = "";
                    auditSecurityLst.push(auditSecurity);
                }
            }
            let strScreenName = "mt_delv_bunit_alloc.aspx";
            await this.commonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[TokenEntry_Enum.UserID], strScreenName).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.lstDBData = [];
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "insertAuditData");
        }
    }

    /** 
     * Getting Bunits  
     */
    async fillBUnitsAuto(event) {
        this.lstFilteredBUnits = [];
        let query = event.query;
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }

        if (this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "Select One") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
            return;
        }
        try {
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.AllBunits).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstBUnits = data.DataList;
                            this.lstFilteredBUnits = this.filterBusinessUnits(query, this.lstBUnits)
                            this.spinnerService.stop();
                            break;
                        }
                        //case StatusType.Warn: {
                        //    this.spinnerService.stop();
                        //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        //    break;
                        //}
                        //case StatusType.Error: {
                        //    this.spinnerService.stop();
                        //    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        //    break;
                        //}
                        //case StatusType.Custom: {
                        //    this.spinnerService.stop();
                        //    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        //    break;
                        //}
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fillBUnitsAuto");
        }
    }

    /** 
     * Filtering Bunits  
     */
    filterBusinessUnits(query, businessunits: any[]): any[] {
        try {
            let filtered : any[] = [];

            if (query == "%") {
                for (let i = 0; i < businessunits.length; i++) {
                    let Bunitvalue = businessunits[i];
                    filtered.push(Bunitvalue);
                }
            }
            else {
                if (query.length >= 1) {
                    for (let i = 0; i < businessunits.length; i++) {
                        let Bunitvalue = businessunits[i];
                        if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(Bunitvalue);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterBusinessUnits");
        }
    }

    /**
    * This method is calling when click on CheckAll Button in Datatable
    */
    

    /**
    * This method is calling when click on UnCheckAll Button in Datatable
    */
   

    checkAll() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    unCheckAll() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                   
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }
    /*
    * This method is calling when we selecting particular record in DataTable and getting selected record data
    */
    selectedRow(values: any, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }

            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                    var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0)
                    this.lstCheckedBUnits.splice(index, 1);
                }
            }
            this.lstCheckedBUnits.push(values);
        } catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    }

    /*
   * Storing data for sorting in two different  lists one for allocated and another for Unallocated 
   */
    BindDataGrid() {
        try {
            var lstDBDataList;
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];

            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.dataCheckedSorting.push(this.lstDBData[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.lstDBData[i]);
                }
            }
            this.showGrid = true;
            this.isVisible = true;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    /*
    * This method is for sorting the data  based on seleted column in DataTable
    */
    customSort1(event) {
        try {
            var element = event;
            this.lstDBData = [];
            this.blnsortbycolumn = !this.blnsortbycolumn;
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (this.blnsortbycolumn == false) {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            }
            else {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    }


    customSort(event, field) {
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            } else {
                element.order = 1;
            }
            // element.order = !element.order;

        } else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        let result = null;
        let order: boolean;

        try {
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;

                return (element.order * result);
            });

            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;

                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }

        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }

    filterdata(event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array<VM_ATPAR_IBU_ALLOCATION>();
        this.lstgridfilterData = event;
    }

    /*
    * Getting OrgBunits from database
    */
    async populateBunitsDdlst(): Promise<boolean> {
        let isOrgBUnitsExist: boolean = false;

        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }

        this.spinnerService.start();
        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
            this.growlMessage = [];
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
            return;
        }
        try {
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.AllBunits).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.lstFilteredBUnits = data.DataList;
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
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
            this.clientErrorMsg(ex, "populateBunitsDdlst");
        }
    }

    /**
    * This method is calling when click on Go button
    */
    async getAllBUnits() {
        this.growlMessage = [];
        this.isVisible = false;
        this.lstgridfilterData = null;

        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {

                this.growlMessage = [];
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                return;
            }
            if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });

                this.showGrid = false;
                return false;
            }
            if ((this.selectedBunit != null && this.selectedBunit != undefined && this.selectedBunit != '') || (this.selectedDescription != null && this.selectedDescription != undefined && this.selectedDescription != '')) {
                this.lblSearched ="0";
            }
            this.lstDBData = new Array<VM_ATPAR_IBU_ALLOCATION>();
            let isBUnitsExists = await this.populateBunitsDdlst();
            if (isBUnitsExists == true) {
                this.spinnerService.start();
                await this.deliverAllocateBunitServices.getBUnits(this.lstFilteredBUnits, this.selectedDropDownUserId, this.selectedBunit, this.selectedDescription, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                    .forEach((response) => {
                        switch (response.StatType) {
                            case StatusType.Success: {
                                this.spinnerService.stop();
                                this.lstDBData = [];
                                this.lstDBData = response.DataList;

                                for (let i = 0; i <= response.DataList.length - 1; i++) {
                                    if (response.DataList[i].CHK_ALLOCATED == 1) {
                                        response.DataList[i].checkvalue = true;
                                    }
                                    else {
                                        response.DataList[i].checkvalue = false;
                                    }
                                }
                                this.lstDBData = response.DataList;
                                this.BindDataGrid();
                                break;
                            }
                            case StatusType.Warn: {
                                this.isVisible = false;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.isVisible = false;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.isVisible = false;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getAllBUnits");
        }
    }

    /**
    * This method is calling when user click on Submit Button 
    */
    async allocateBUnits() {
        let strsearched: boolean;
        if (this.lblSearched != null && this.lblSearched != '' && this.lblSearched != undefined) {
            strsearched = true;
        }
        else {
            strsearched = false;
        }
        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
            return;
        }
        try {
            this.spinnerService.start();
            await this.deliverAllocateBunitServices.allocateBUnits(this.selectedDropDownUserId, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.lstFilteredBUnits, strsearched, this.lstDBData)
                .subscribe((response) => {
                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.selectedDropDownUserId = "";
                            this.selectedDescription = "";
                            this.selectedBunit = "";
                            this.isVisible = false;
                            if (this.isAuditRequired == "Y") {
                                this.insertAuditData();
                                this.spinnerService.stop();
                            } else {
                                this.spinnerService.stop();
                            }
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            this.lstDBData = [];
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            this.showGrid = false;
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateBUnits");
        }
    }

    /**
    * This method is for display error message
    */
    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    /**
    * This method is for clearing all the variables
    */
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.intAppId = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.orgGrpIDData = null;
        this.orgGrpId = null;
    }
}
