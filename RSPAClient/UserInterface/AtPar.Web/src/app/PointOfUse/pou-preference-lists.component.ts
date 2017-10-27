import { Component, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { PreferenceListsService } from './pou-preference-lists.service';
import { Message } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from '@angular/http';
import { VM_MT_POU_USER_DEPARTMENTS } from '../entities/VM_MT_POU_USER_DEPARTMENTS';
import { MT_POU_PHYSICIAN } from '../entities/MT_POU_PHYSICIAN';
import { VM_POU_REASON_PROC_COST_CASE_SPEC_CODES } from '../entities/VM_POU_REASON_PROC_COST_CASE_SPEC_CODES';
import { MT_POU_PREF_LIST_HEADER } from '../entities/MT_POU_PREF_LIST_HEADER';
import { TokenEntry_Enum, StatusType, EnumApps, YesNo_Enum, Enterprise_Enum, BusinessType, Process_Type, Perform_Action } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_POU_PREF_LIST_ALLOC } from '../entities/MT_POU_PREF_LIST_ALLOC';
import { VM_DEPARTMENT_CART_ITEMS } from '../entities/VM_DEPARTMENT_CART_ITEMS';
import { ConfirmationService } from '../components/common/api';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pou-preference-lists.component.html',
    providers: [AtParConstants, datatableservice, PreferenceListsService, ConfirmationService, AtParCommonService],
})

export class PreferenceListsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    pop: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    gridData: MT_POU_PREF_LIST_HEADER[];
    loading: boolean = true;
    public newItem = new PAR_MNGT_VENDOR();
    selectedDept: string = "";
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    deptLst: VM_MT_POU_USER_DEPARTMENTS[];
    ddlDeptLst: any;
    growlMessage: Message[] = [];
    procedureVal: string = "";
    physicianVal: string = "";
    txtPreference: string = "";
    txtDescription: string = "";
    selectedProcedure: string = "";
    selectedPhysician: string = "";
    procedureCode: string = "procedures";
    setupCodes: string = "";
    descr: string = "";
    ddlPhysician: any;
    ddlProcedure: any;
    checkData: MT_POU_PREF_LIST_HEADER[] = [];
    isDuplicateExists: boolean = false;
    selectedGridPrefListID: any;
    selectedGridProcedureID: any;
    GridPreferenceListDetails: MT_POU_PREF_LIST_ALLOC[];
    selectedItem: any;
    txtItemQty: string = "";
    txtHoldQty: string = "";
    ddlItem: any;
    selectedGridPrefListStatus: any;
    isItemEdit: boolean;
    itemData: string;
    isEditModeButton: boolean;
    addMode: string = "";
    itemArray: string[] = [];
    statusList: any;
    prefListIDStatus: number;
    departmentIDStatus: number;
    prefDetailsDesc: string = "";
    openQtyIDStatus: number;
    holdQtyIDStatus: number;
    loadingPrefDetails: boolean = true;
    maxAllowQty: number;
    breadCrumbMenu: Menus;
    selectedGridDetails: string = "";


    constructor(public dataservice: datatableservice, private spnrService: SpinnerService, public preferenceListsService: PreferenceListsService, private httpService: HttpService, private atParConstant: AtParConstants, private confirmationService: ConfirmationService, public atparCommonService: AtParCommonService) {
        this.breadCrumbMenu = new Menus();
    }

    async go() {
        this.pop == false;
        //if (this.pop == true) {
        //    this.dataTableComponent.reset();
        //}
        if (this.selectedDept === "" || this.selectedDept === "Select Departments") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select a Department" });
        }
        else {
            this.bindPrefList();
        }

    }

    ddl_Change() {
        this.pop = false;
    }

    async bindPrefList() {
        try {
            this.statusList = [];
            this.statusList.push({ label: 'All', value: null });
            this.statusList.push({ label: 'Active', value: false });
            this.statusList.push({ label: 'InActive', value: true });
            this.spnrService.start();

            let a = this.selectedDept.split('-');
            let deptID = a[0];

            await this.preferenceListsService.GetPrefList("", "", deptID, this.procedureVal, this.physicianVal, 1).
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<MT_POU_PREF_LIST_HEADER>;

                    switch (data.StatType) {
                        case StatusType.Success: {                            
                            if (data.DataList.length > 0) {
                                this.growlMessage = [];
                                this.pop = true;
                                this.gridData = data.DataList;

                            }
                            let bindData = this.gridData;
                            for (let i = 0; i <= bindData.length - 1; i++) {

                                if (bindData[i].STATUS == true) {
                                    bindData[i].checkvalue = false;

                                }
                                else {
                                    bindData[i].checkvalue = true;
                                }
                            }
                            this.gridData = bindData;
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.spnrService.stop();
                            this.growlMessage = [];
                            this.gridData = [];
                            if (data.StatusMessage == "No data found" || data.StatusMessage == "No Data Found") {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No preference lists were found for this department :" + this.selectedDept });
                                this.pop = true;
                                this.spnrService.stop();
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async addPrefList() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Preference List';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        if (this.selectedDept === "" || this.selectedDept === "Select Departments") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select a Department" });
        }
        else {
            this.growlMessage = [];
            this.form = true;
            this.editform = false;
            this.page = false;
            this.pop = false;
            await this.populateProcedureDdl();
            await this.populatePhysicianDdl();
            this.txtPreference = "";
            this.txtDescription = "";
            (<HTMLInputElement>document.getElementById("prefListID")).focus();

            this.loading = true;
        }
    }

    tbl() {
        this.form = false;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.table = true;
    }

    save() {
        this.editform = false;
    }

    prefListGoBack() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.growlMessage = [];
        this.bindPrefList();
        this.prefListIDStatus = 1;
        this.departmentIDStatus = 1;
    }

    async populateDepts() {
        try {
            this.spnrService.start();
            await this.preferenceListsService.GetUserDepartments(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlDeptLst = [];
                            this.ddlDeptLst.push({ label: "Select Departments", value: "Select Departments" });

                            if (data.DataList.length > 0) {
                                this.ddlDeptLst.push({ label: "All", value: "All" });
                                for (var i = 0; i <= data.DataList.length - 1; i++) {
                                    this.ddlDeptLst.push({ label: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME, value: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spnrService.stop();
                            this.growlMessage = [];
                            if (data.StatusMessage == "No data found") {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No departments found" });
                                return;
                            }
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);

        }
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spnrService, strExMsg.toString());
    }

    async ngOnInit() {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPageSize = parseInt(this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage]);
            this.ddlDeptLst = [];
            this.ddlDeptLst.push({ label: "Select Departments", value: "Select Departments" });
            this.populateDepts();
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async addPreferenceListHeader() {
        try {
            this.spnrService.start();

            let a = this.selectedDept.split('-');
            let deptID = a[0];

            await this.preferenceListsService.AddPreferenceListHeader(this.txtPreference, this.txtDescription, deptID, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedProcedure, this.selectedPhysician).
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<LongRange>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spnrService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Added/Created successfully" });
                            this.txtPreference = "";
                            this.txtDescription = "";
                            (<HTMLInputElement>document.getElementById("prefListID")).focus();
                            this.loading = true;
                            this.selectedPhysician = '';
                            this.selectedProcedure = '';
                            this.loading = true;
                            this.prefListIDStatus = 1;
                            this.departmentIDStatus = 1;
                            break;
                        }


                        case StatusType.Warn: {
                            this.spnrService.stop();
                            this.growlMessage = [];
                            if (data.StatusCode == AtparStatusCodes.S_PREF_LIST_EXIST) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Preference List " + this.txtPreference + " already exists" });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async savePreferenceListHeader() {

        this.addPreferenceListHeader();


    }

    async populateProcedureDdl() {
        try {
            this.spnrService.start();
            await this.preferenceListsService.GetCodes(this.procedureCode, this.setupCodes, this.descr).
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlProcedure = [];
                            this.ddlProcedure.push({ label: "Select Procedure ID", value: "" });
                            this.selectedProcedure = "";
                            if (data.DataList.length > 0) {

                                for (var i = 0; i <= data.DataList.length - 1; i++) {
                                    this.ddlProcedure.push({ label: data.DataList[i].CODE + "-" + data.DataList[i].DESCRIPTION, value: data.DataList[i].CODE });


                                }

                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spnrService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async populatePhysicianDdl() {
        try {
            this.spnrService.start();
            await this.preferenceListsService.GetPhysicians().
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<MT_POU_PHYSICIAN>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlPhysician = [];
                            this.ddlPhysician.push({ label: "Select Physician", value: "" });
                            this.selectedPhysician = "";
                            if (data.DataList.length > 0) {

                                for (var i = 0; i <= data.DataList.length - 1; i++) {
                                    this.ddlPhysician.push({ label: data.DataList[i].PHYSICIAN_ID + "-" + data.DataList[i].FIRST_NAME + " " + data.DataList[i].MIDDLE_INITIAL + " " + data.DataList[i].LAST_NAME + "(" + data.DataList[i].PHYSICIAN_ID + ")", value: data.DataList[i].PHYSICIAN_ID });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spnrService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async bindPreferenceListDetails() {
        try {
            this.spnrService.start();
            await this.preferenceListsService.GetPrefListDetails(this.selectedGridPrefListID, this.selectedGridProcedureID).
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList.length > 0) {
                                this.growlMessage = [];
                                this.pop = true;
                                this.GridPreferenceListDetails = data.DataList;

                                this.form = false;
                                this.editform = false;
                                this.page = false;
                                this.pop = false;
                                this.table = true;
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0) {
                                this.table = true;
                                this.GridPreferenceListDetails = data.DataList;
                            }

                            this.spnrService.stop();
                            this.growlMessage = [];
                            if (data.StatusMessage == "No data found" || data.StatusMessage == "No Data Found") {
                                this.GridPreferenceListDetails = [];

                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No items added to this preference list" });


                                return;
                            }
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    editPrefList(pref) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Details';

        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.table = false;

        if (pref.checkvalue == true) {

            this.GridPreferenceListDetails = [];
            this.selectedGridPrefListID = pref.PREF_LIST_ID;
            this.selectedGridProcedureID = pref.PROCEDURE_ID;
            this.selectedGridDetails = pref.PREF_LIST_DESCR;
            this.form = false;
            this.editform = false;
            this.page = false;
            this.pop = false;
            this.table = false;

            this.bindPreferenceListDetails();
        }
        else {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Preference list is disabled" });
        }
    }

    editPrefListDetails(prefDetails) {
        this.loadingPrefDetails = false;
        this.breadCrumbMenu.SUB_MENU_NAME = 'Details';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.isItemEdit = true;
        this.isEditModeButton = true;
        this.itemData = prefDetails.ITEM_ID;
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
        this.selectedItem = prefDetails.ITEM_ID;
        this.txtItemQty = prefDetails.QUANTITY;
        this.txtHoldQty = prefDetails.HOLD_QTY;
        this.table = false;
        this.prefDetailsDesc = prefDetails.ITEM_DESCR;

    }

    async addprefDetails() {
        this.loadingPrefDetails = true;
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Preference List-2';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.txtHoldQty = "";
        this.txtItemQty = "";
        this.selectedItem = "";
        this.prefDetailsDesc = '';
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
        this.isItemEdit = false;
        this.table = false;
        this.isEditModeButton = false;
        await this.getDepartmentItemsDdl();



    }

    async updatePreferenceListItem() {
        if (this.pop == true) {
            this.dataTableComponent.reset();
        }

        try {
            this.spnrService.start();
            this.itemArray = this.selectedItem.toString().split('-');
            let itemID = this.itemArray[0];
            await this.preferenceListsService.UpdatePreferenceListItem(this.selectedGridPrefListID, this.selectedGridProcedureID, itemID, this.txtItemQty, this.txtHoldQty).
                catch(this.httpService.handleError).then(async (res: Response) => {
                    var data = res.json() as AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC>;
                    this.spnrService.stop();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully"
                            });
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
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getDepartmentItemsDdl() {
        try {
            this.growlMessage = [];
            this.spnrService.start();

            let a = this.selectedDept.split('-');
            let deptID = a[0];

            await this.preferenceListsService.GetDepartmentItems(deptID, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<VM_DEPARTMENT_CART_ITEMS>;
                    this.spnrService.stop();
                    this.ddlItem = [];
                    this.ddlItem.push({ label: "Select Item", value: "" });
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList.length > 0) {
                                for (var i = 0; i <= data.DataList.length - 1; i++) {
                                    this.ddlItem.push({ label: data.DataList[i].ITEM_ID + "-" + data.DataList[i].ITEM_DESCRIPTION, value: data.DataList[i].ITEM_ID + "-" + data.DataList[i].ITEM_DESCRIPTION });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spnrService.stop();
                            this.growlMessage = [];
                            if (data.StatusCode == "1102002") {
                                this.growlMessage = [];
                                this.editform = false;
                                this.form = false;
                                this.page = false;
                                this.pop = false;
                                this.table = true;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No items found in allocated location" });
                                return;
                            }
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async addPreferenceList() {

        this.addPreferenceListItem();
    }

    async addPreferenceListItem() {
        if (this.pop == true) {
            this.dataTableComponent.reset();
        }


        try {
            this.growlMessage = [];
            this.spnrService.start();
            this.itemArray = this.selectedItem.toString().split('-');
            let description = this.itemArray[1];
            let itemID = this.itemArray[0];
            await this.getProfileParamValue();

            if (this.txtItemQty != "") {
                if (parseInt(this.txtItemQty) > this.maxAllowQty) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                    return;
                }
            }

            if (this.txtHoldQty != "") {
                if (parseInt(this.txtHoldQty) > this.maxAllowQty) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                    return;
                }
            }

            await this.preferenceListsService.AddPreferenceListItem(this.selectedGridPrefListID, this.selectedGridProcedureID, itemID, description, this.txtItemQty, this.txtHoldQty, this.deviceTokenEntry[TokenEntry_Enum.UserID], itemID).
                catch(this.httpService.handleError).then(async (res: Response) => {
                    var data = res.json() as AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC>;
                    this.spnrService.stop();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            await this.bindPreferenceListDetails();
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Added/Created Successfully" });
                            this.ddlItem = [];
                            this.txtItemQty = "";
                            this.txtHoldQty = "";
                            this.editform = false;
                            this.form = false;
                            this.page = false;
                            this.pop = false;
                            this.isItemEdit = false;
                            this.table = true;

                            break;
                        }
                        case StatusType.Warn: {
                            if (data.StatusCode == "1102036") {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Item already exist, add another item"
                                });



                                break;
                            }
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
            this.addMode = "";
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async updatePreferenceList() {
        this.updatePreferenceListItem();
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
        this.isItemEdit = true;
        this.table = false;
    }

    async deletePreferenceListItem() {
        try {
            this.spnrService.start();
            await this.preferenceListsService.DeletePreferenceListItem(this.selectedGridPrefListID, this.selectedGridProcedureID, this.selectedItem).
                catch(this.httpService.handleError).then(async (res: Response) => {
                    this.spnrService.stop();
                    this.growlMessage = [];
                    var data = res.json() as AtParWebApiResponse<string>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            await this.bindPreferenceListDetails();
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
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async deletePrefListDetails(prefDetails) {
        this.selectedItem = prefDetails.ITEM_ID;
        await this.confirmDelete();
    }

    async EnableDisablePrefList() {
        try {
            this.spnrService.start();
            await this.preferenceListsService.DisablePrefList(this.selectedGridPrefListID, this.selectedGridProcedureID, this.selectedGridPrefListStatus).
                catch(this.httpService.handleError).then(async (res: Response) => {
                    var data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            await this.bindPrefList();
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
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ngOnDestroy() {

        this.spnrService.stop();

    }

    async changeStatus(prefList) {
        this.selectedGridPrefListID = prefList.PREF_LIST_ID;
        this.selectedGridProcedureID = prefList.PROCEDURE_ID;
        if (prefList.checkvalue == true)
        {
            prefList.checkvalue = false;
        }
        else
        {
            prefList.checkvalue = true;
        }
        this.selectedGridPrefListStatus = prefList.checkvalue;


        this.confirm();

    }

    async confirm() {
        this.growlMessage = [];
        this.confirmationService.confirm({
            message: 'Are you sure about the change?',
            accept: () => {
                this.EnableDisablePrefList();
            },
            reject: () => {
                this.bindPrefList();
            },

        });

    }

    async confirmDelete() {
        this.growlMessage = [];
        await this.confirmationService.confirm({
            message: 'Are you sure you want to delete this Item?',
            accept: () => {
                this.deletePreferenceListItem();
            }
        });

    }

    async prefDetailsAddEditGoBack() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Details';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.txtHoldQty = "";
        this.txtItemQty = "";
        this.ddlItem = [];
        this.editform = false;
        this.form = false;
        this.page = false;
        this.pop = false;
        this.isItemEdit = false;
        this.table = true;
        await this.bindPreferenceListDetails();
    }

    goBackToPrefListGrid() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.editform = false;
        this.form = false;
        this.page = true;
        this.pop = true;
        this.isItemEdit = false;
        this.table = false;

    }

    bindModelDataChange(event: any) {
        try {
            
            
            if ("prefListID" == event.TextBoxID.toString()) {
                this.prefListIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            
            if ("DepartmentID" == event.TextBoxID.toString()) {
                this.departmentIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
           

            if ("openQtyID" == event.TextBoxID.toString()) {
                this.openQtyIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.prefListIDStatus == 0 && this.departmentIDStatus == 0) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }

            if (this.openQtyIDStatus == 0 && this.selectedItem != "") {
                this.loadingPrefDetails = false;
            }
            else {
                this.loadingPrefDetails = true;
            }

            

        } catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    }

    itemChanged() {
        if (this.openQtyIDStatus == 0 && this.holdQtyIDStatus == 0 && this.selectedItem != "") {
            this.loadingPrefDetails = false;
        }
        else {
            this.loadingPrefDetails = true;
        }
    }

    async getProfileParamValue() {
        try {
            this.spnrService.start();
            await this.atparCommonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.PointOfUse, "MAX_ALLOW_QTY").
                catch(this.httpService.handleError).then((res: Response) => {
                    this.spnrService.stop();
                    var data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.maxAllowQty = parseInt(data.DataVariable.toString());
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
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
}
