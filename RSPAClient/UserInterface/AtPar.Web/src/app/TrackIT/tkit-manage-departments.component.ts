import { Component, OnDestroy, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { TKIT_DEPT } from "../Entities/TKIT_DEPT";
import { ManageDepartmentsService } from './tkit-manage-departments.service';
import { TokenEntry_Enum, EnumApps, ModeEnum, YesNo_Enum, StatusType, } from '../Shared/AtParEnums'
import { HttpService } from '../Shared/HttpService';
import { AtparStatusCodes, } from '../Shared/AtParStatusCodes';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { SelectItem } from '../components/common/api';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'tkit-manage-departments.component.html',
    providers: [datatableservice, ManageDepartmentsService, HttpService, AtParCommonService, AtParConstants]
})

export class ManageDepartmentsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    departmentIDSearch: string = "";
    showAddButton: boolean = true;
    mode: string;
    pop: boolean = false;
    table: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    ven: any;
    Title: string = "";
    bindSymbal: string = "";
    loading: boolean = true;
    departmentIDStatus: number;
    descStatus: number;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    showTextBox: boolean = false;
    showLable: boolean = false;
    departmentID: string = "";
    public newItem = new TKIT_DEPT();
    growlMessage: Message[] = [];
    _deviceTokenEntry: string[] = [];
    lstDepts: TKIT_DEPT[];
    mainlstGridData: TKIT_DEPT[];
    ddlStatusType: any[] = [];
    pageSize: number;
    menuCode: string;
    appID: string;
    auditSatus: string = "";
    changeDeptStatus: string;
    checkvalue: boolean = false;
    lstOrgGroups: SelectItem[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpId: string = "";
    selectedOrgGroupId: string = "";
    orgGroupIDForDBUpdate: string;
    ddlOrgIDStatus: number;
    statusType: string;
    breadCrumbMenu: Menus;

    constructor(public dataservice: datatableservice,
        private mngDeptService: ManageDepartmentsService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private leftBarAnimationService: LeftBarAnimationService) {
        this.breadCrumbMenu = new Menus();
        this.ven = new Employee();
        this.departmentID = "dept1";
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }


    adddepartment() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = true;
        this.showLable = false;
        this.form = true;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.Title = "Save";
        this.bindSymbal = "floppy-o";
        this.showAddButton = false;
        this.mode = ModeEnum[ModeEnum.Add].toString();
        this.departmentIDStatus = null;
        this.descStatus = null;
        this.ddlOrgIDStatus = null;
        this.newItem = new TKIT_DEPT();
        this.departmentIDSearch = "";
        this.selectedOrgGroupId = "";
        this.bindOrgGroups();
        this.loading = true;
        //this.blnShowOrgGroupLabel = false;
        // this.blnShowOrgGroupDD = true;
    }

    tbl() {
        this.form = false;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.table = true;
    }

    edit(data) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = false;
        this.showLable = true;
        this.form = true;
        this.table = false;
        this.showAddButton = false;
        this.Title = "Update";
        this.bindSymbal = "check";
        this.newItem = data;
        this.mode = ModeEnum[ModeEnum.Edit].toString();
        this.loading = false;
        this.departmentIDSearch = "";
        this.blnShowOrgGroupLabel = true;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = data.ORG_GROUP_ID
    }

    save() {
        this.editform = false;
    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.table = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_DEPT();
        this.departmentIDSearch = "";
        this.growlMessage = [];
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    ngOnInit(): void {
        this.table = false;
        this.showAddButton = true;
        this.ddlStatusType.push({ label: 'All', value: "" });
        this.ddlStatusType.push({ label: 'Active', value: true });
        this.ddlStatusType.push({ label: 'Inactive', value: false });
        this.pageSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_tkit_manage_depts.aspx';
        this.appID = (EnumApps.TrackIT).toString();
        this.mainlstGridData = new Array<TKIT_DEPT>();
        this.checkAuditAllowed();
        this.statusType = null;
        //this.bindOrgGroups();
    }

    ngOnDestroy() {
        this.departmentIDSearch = null;
        this.mode = null;
        this.Title = null;
        this.bindSymbal = null;
        this.departmentIDStatus = null;
        this.descStatus = null;
        this.departmentID = null;
        this.newItem = null;
        this.growlMessage = null;
        this._deviceTokenEntry = null;
        this.lstDepts = null;
        this.ddlStatusType = null;
        this.pageSize = null;
        this.menuCode = null;
        this.appID = null;
        this.auditSatus = null;
        this.changeDeptStatus = null;
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            this.lstOrgGroups = [];
            await this.commonService.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            // this.blnStatusMsg = false;

                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupDD = false;
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + ' - ' + this.orgGroupData[0].ORG_GROUP_NAME;
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.blnShowOrgGroupLabel = false;
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + ' - ' + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
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
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }
    // Add and Update button validations
    bindModelDataChange(event: any) {
        try {

            if ("txtDeptID" == event.TextBoxID.toString()) {
                this.departmentIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtDesc" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.Title == "Update") {
                this.departmentIDStatus = 0;
            }
            this.ddlOrgIDChanged();
            if (this.mode == ModeEnum[ModeEnum.Add].toString()) {
                if (this.departmentIDStatus == 0 && this.descStatus == 0 && this.ddlOrgIDStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }

            if (this.mode == ModeEnum[ModeEnum.Edit].toString()) {
                if (this.descStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }

        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    async BindGrid() {

        //if (this.table == true) {
        //    this.dataTableComponent.reset();
        //    this.statusType = null;
        //}

        this.mainlstGridData = [];
        this.lstDepts = [];
        this.statusType = "";

        try {
            this.table = false;
            if (this.mode == "Edit") {
                this.showAddButton = true;
            }

            this.spinnerService.start();
            if (this.departmentIDSearch == null || this.departmentIDSearch == undefined || this.departmentIDSearch === "") {
                this.departmentIDSearch = "";
            }

            await this.mngDeptService.getDepartments(this.departmentIDSearch, "", this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError)
                .then((resp: Response) => {
                    let webresp = resp.json() as AtParWebApiResponse<TKIT_DEPT>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.mainlstGridData = [];
                            this.lstDepts = [];
                            this.lstDepts = webresp.DataList;
                            for (let i = 0; i <= this.lstDepts.length - 1; i++) {
                                if (this.lstDepts[i].STATUS == "A") {
                                    this.lstDepts[i].checkvalue = true;
                                }
                                else {
                                    this.lstDepts[i].checkvalue = false;
                                }
                                this.mainlstGridData.push(this.lstDepts[i]);
                            }


                            this.table = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.table = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "warn", summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.table = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "info", summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.table = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: "error", summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            break;
                        }
                    }
                });

        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    async changeStatus(dept) {
        let status: any;
        if (dept.checkvalue == true) {
            
            status = "A";
        }
        else {
            status = "I";
            
        }

        this.growlMessage = [];
        this.spinnerService.start();
        try {
            var webresp = new AtParWebApiResponse<TKIT_DEPT>();
            await this.mngDeptService.saveDepartment(dept.DEPT_ID, dept.DESCRIPTION, status, ModeEnum[ModeEnum.Edit].toString(), dept.ORG_GROUP_ID, this._deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then(async (resp: Response) => {
                    webresp = resp.json() as AtParWebApiResponse<TKIT_DEPT>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success:
                            //  await this.BindGrid();
                            this.growlMessage = [];
                            let msg = AtParConstants.Updated_Status_Msg.replace("1%", 'Department').replace("2%", dept.DEPT_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });


                            let filterData: any = [];
                            this.lstDepts = [];
                            let matchedrecord = this.mainlstGridData.filter(x => x.DEPT_ID == dept.DEPT_ID)
                            matchedrecord[0].checkvalue = dept.checkvalue;
                            matchedrecord[0].STATUS = status;
                            
                            if (this.statusType.toString() == "false") {
                                filterData = this.mainlstGridData.filter(x => x.checkvalue == false)
                            } else if (this.statusType.toString() == "true") {
                                filterData = this.mainlstGridData.filter(x => x.checkvalue == true)
                            } else {
                                filterData = this.mainlstGridData
                            }
                            if (filterData != null) {
                                for (let x = 0; x < filterData.length; x++) {
                                    let lstManagedeptDetails = new TKIT_DEPT();
                                    lstManagedeptDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                    lstManagedeptDetails.DESCRIPTION = filterData[x].DESCRIPTION;
                                    lstManagedeptDetails.DEPT_ID = filterData[x].DEPT_ID;

                                    lstManagedeptDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                                    lstManagedeptDetails.UPDATE_USER_ID = filterData[x].UPDATE_USER_ID;
                                    if (filterData[x].STATUS == "A") {
                                        filterData[x].checkvalue = true;

                                    }
                                    else {
                                        filterData[x].checkvalue = false;
                                    }
                                    lstManagedeptDetails.STATUS = filterData[x].STATUS;
                                    lstManagedeptDetails.checkvalue = filterData[x].checkvalue;
                                    this.lstDepts.push(lstManagedeptDetails);
                                }
                            }


                            break;
                        case StatusType.Error:
                            this.BindGrid();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });

                            break;
                        case StatusType.Warn:
                            this.BindGrid();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });

                            break;
                    }

                    this.spinnerService.stop();
                });

        }

        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }

    }

    private async checkAuditAllowed() {

        this.growlMessage = [];
        try {
            this.spinnerService.start();
            let webresp = new AtParWebApiResponse<string>();
            await this.commonService.getAuditAllowed(this.appID, this.menuCode)
                .catch(this.httpService.handleError).then((res: Response) => {
                    webresp = res.json() as AtParWebApiResponse<string>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {

                        case StatusType.Success: {
                            this.auditSatus = webresp.Data;
                            break
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage })
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage })
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage })
                            break;
                        }
                    }

                });
        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    public saveOrUpdateDepartment() {
        this.showAddButton = false;
        this.table = false;
        this.growlMessage = [];

        //this.newItem.STATUS = "A";

        if (this.Title == "Save") {
            this.mode = ModeEnum[ModeEnum.Add].toString();
        }
        else {
            this.mode = ModeEnum[ModeEnum.Edit].toString();
        }

        try {
            let webresp = new AtParWebApiResponse<TKIT_DEPT>();
            this.spinnerService.start();

            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                    this.table = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                    this.spinnerService.stop();
                    return false;
                }
            }
            this.mngDeptService.saveDepartment(this.newItem.DEPT_ID, this.newItem.DESCRIPTION, this.newItem.STATUS, this.mode, this.orgGroupIDForDBUpdate, this._deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((resp: Response) => {
                    webresp = resp.json() as AtParWebApiResponse<TKIT_DEPT>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            if (this.mode == ModeEnum[ModeEnum.Add].toString()) {

                                let msg = AtParConstants.Created_Msg.replace("1%", 'Department').replace("2%", this.newItem.DEPT_ID);
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });

                                this.loading = true;
                                this.newItem = new TKIT_DEPT();
                                this.departmentIDStatus = null;
                                this.descStatus = null;
                                this.ddlOrgIDStatus = null;
                                this.selectedOrgGroupId = null;
                                if (this.blnShowOrgGroupDD) {
                                    (<HTMLInputElement>document.getElementById('txtddllstOrgGroups')).focus();
                                }
                                else {
                                    (<HTMLInputElement>document.getElementById('txtDeptID')).focus();
                                }


                            }
                            else {
                                let msg = AtParConstants.Updated_Msg.replace("1%", 'Department').replace("2%", this.newItem.DEPT_ID);
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                (<HTMLInputElement>document.getElementById('txtDesc')).focus();
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                            break;
                        }
                    }

                });
        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    ddlOrgIDChanged() {
        if (this.newItem.DEPT_ID == undefined || this.newItem.DEPT_ID == null) {
            this.newItem.DEPT_ID = "";
        }
        if (this.newItem.DESCRIPTION == undefined || this.newItem.DESCRIPTION == null) {
            this.newItem.DESCRIPTION = "";
        }
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgIDStatus = 1;
            }
            else {
                this.ddlOrgIDStatus = 0;
            }
        }
        if (this.Title == "Update" || this.blnShowOrgGroupLabel) {
            this.ddlOrgIDStatus = 0;
        }
        if (this.departmentIDStatus == 0 && this.descStatus == 0 && this.ddlOrgIDStatus == 0 && this.newItem.DEPT_ID != "" && this.newItem.DESCRIPTION != "") {
            this.loading = false;
        }
        else {
            this.loading = true;
        }

    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        let filterData;
        this.growlMessage = [];

        this.lstDepts.length = 0;

        if (this.statusType.toString() == "true") {
            filterData = this.mainlstGridData.filter(x => x.checkvalue == true)
        } else if (this.statusType.toString() == "false") {
            filterData = this.mainlstGridData.filter(x => x.checkvalue == false)
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let lstManageDepartment = new TKIT_DEPT();
                lstManageDepartment.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                lstManageDepartment.DEPT_ID = filterData[x].DEPT_ID;
                lstManageDepartment.DESCRIPTION = filterData[x].DESCRIPTION;

                lstManageDepartment.UPDATE_DATE = filterData[x].UPDATE_DATE;
                lstManageDepartment.UPDATE_USER_ID = filterData[x].UPDATE_USER_ID;
                lstManageDepartment.STATUS = filterData[x].STATUS;
                lstManageDepartment.checkvalue = filterData[x].checkvalue;

                this.lstDepts.push(lstManageDepartment);
            }

        }
    }
} 