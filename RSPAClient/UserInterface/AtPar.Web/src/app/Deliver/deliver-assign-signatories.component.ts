import { Component, ViewChild } from '@angular/core';
import { Http, Response } from "@angular/http";
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { ConfirmationService } from '../components/common/api';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { TokenEntry_Enum } from '../Shared/AtParEnums';
import { AssignSignatoriesService } from './deliver-assign-signatories.services';
import { StatusType } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { MT_DELV_COST_CENTER_AUTH_PERSON } from '../Entities/MT_DELV_COST_CENTER_AUTH_PERSON';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { SelectItem } from '../components/common/api';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'deliver-assign-signatories.component.html',
    providers: [HttpService, ConfirmationService, AssignSignatoriesService, AtParCommonService, AtParConstants]
})

export class AssignSignatoriesComponent {
    /*Variable Declaration*/
    pop: boolean = false;
    table: boolean = false;
    form: boolean = false;
    form2: boolean = false;
    filter: boolean = true;
    ven: any;
    deleteToken: boolean = false;
    editUser: boolean = false;
    loading: boolean = true;
    growlMessage: Message[] = [];
    lstDBData: MT_DELV_COST_CENTER_AUTH_PERSON[];
    lstDBDataSearch: MT_DELV_COST_CENTER_AUTH_PERSON[];
    lstDBDataTotal: MT_DELV_COST_CENTER_AUTH_PERSON[];
    lstSignDBData: MT_DELV_COST_CENTER_AUTH_PERSON[];
    codes: string;
    newItem: MT_DELV_COST_CENTER_AUTH_PERSON;
    startIndex: number;
    EndIndex: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    existingCostCenterCode: string;
    isEditMode: boolean = false;
    codeStatus: number;
    userIDStatus: number;
    userNameStatus: number;
    middileNameStatus: number;
    lastNameStatus: number;
    disableButton: boolean = true;
    disableButtonUser: boolean = true;
    tableData: boolean = false;
    strData: string = '';
    breadCrumbMenu: Menus;

    constructor(private httpService: HttpService,
        private spinnerService: SpinnerService,
        private confirmationService: ConfirmationService,
        private assignSignatoriesService: AssignSignatoriesService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants) {
        this.breadCrumbMenu = new Menus();
        this.ven = new MT_DELV_COST_CENTER_AUTH_PERSON();
        this.codes = "";
    }


    async ngOnInit() {
        try {
            this.growlMessage = [];
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.newItem = new MT_DELV_COST_CENTER_AUTH_PERSON();
            await this.getCodes();
        }
        catch (ex) {
            this.displayCatchException(ex, "ngOnInit");
        }
    }

    /**
     * Auto Complete event for seraching Cost Center
     * @param event
     */
    async searchAutoCompleteCode(event) {
        try {
            let query = event.query;
            this.lstDBDataSearch = [];
            setTimeout(() => {
                this.lstDBDataSearch = this.filterCostCenter(query, this.lstDBDataTotal);
            }, 50)
        }
        catch (ex) {
            this.displayCatchException(ex, "searchAutoCompleteCode");
        }
    }

    private filterCostCenter(query, lstDBData: any[]): any[] {
        this.growlMessage = [];
        try {
            let filtered : any[] = [];
            if (query.length >= 1) {
                for (let i = 0; i < lstDBData.length; i++) {
                    let lstDBDataValue = lstDBData[i];
                    if (lstDBDataValue.COST_CENTER_CODE.toString().toLowerCase().indexOf(query.toString().toLowerCase()) == 0) {
                        filtered.push(lstDBDataValue.COST_CENTER_CODE);
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.displayCatchException(ex, "filterCostCenter");
        }
    }

    onMenuSearchKeyPress(event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode > 31 && charCode <= 47) || (charCode >= 58 && charCode <= 64) || (charCode >= 91 && charCode <= 96) || (charCode >= 123 && charCode <= 126)) {
            this.codes = "";
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Special Characters are not allowed' });
            return false;
        }
    }

    /**
     * This function is called when we click go button
     */
    async go() {
        this.pop = false;
        this.form = false;
        this.form2 = false;
        this.table = false;
        this.filter = true;
        this.isEditMode = false;
        this.lstDBData = [];
        this.lstSignDBData = [];
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            await this.getCodes();
            this.spinnerService.stop();

            if (this.lstDBData != null && this.lstDBData.length > 0 && this.lstDBData != undefined) {
                this.pop = true;
            }
            if (this.lstDBData.length == 0) {
                if (this.deleteToken == true) {
                    this.deleteToken = false;
                }
                else {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Codes(s) Found' });

                }
                this.pop = false;
            }

        } catch (ex) {
            this.displayCatchException(ex, "go");
        }
    }

    /**
     * Getting Cost Center Codes
     */
    async getCodes() {
        try {
            await this.assignSignatoriesService.getCodes(this.codes).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON>;
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.lstDBData = data.DataList;
                        if (this.codes == '' || this.codes == undefined || this.codes == null) {
                            this.lstDBDataTotal = data.DataList;
                        }
                    }
                }
                if (data.StatType != 4) { this.commonErrorHandling(data); }
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "getCodes");
        }
    }

    /**
     * This function is called when we click on goback
     */
    goBack() {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.form = false;
            this.form2 = false;
            this.table = false;
            this.filter = true;
            this.isEditMode = false;
            this.pop = false;
            this.growlMessage = [];
        }
        catch (ex) {
            this.displayCatchException(ex, "goBack");
        }
    }

    /**
     * This function is called when we click add button
     */
    addCostCenterCode() {
        try {
            // this.filter = false;
            this.growlMessage = [];
            if (this.isEditMode == true) {
                if (this.isEditMode) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please  update or cancel before continuing!!!" });
                    return;
                }
                this.disableButton = false;
            }
            else {
                this.disableButton = true;
            }
            this.codes = '';
            this.form = true;
            this.pop = false;
            this.newItem = new MT_DELV_COST_CENTER_AUTH_PERSON();
            this.newItem.COST_CENTER_CODE = "";
        }
        catch (ex) {
            this.displayCatchException(ex, "addCostCenterCode");
        }
    }

    /**
     * This method is for disable submit button untill all basic info is entered 
     * @param event
     */
    bindModelDataChange(event: any) {
        try {
            if ("Code" == event.TextBoxID.toString()) {
                this.codeStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("userID" == event.TextBoxID.toString()) {
                this.userIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("fName" == event.TextBoxID.toString()) {
                this.userNameStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtLastName" == event.TextBoxID.toString()) {
                this.middileNameStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtMiddleName" == event.TextBoxID.toString()) {
                this.lastNameStatus = event.validationrules.filter(x => x.status == false).length;
            }

            if (this.form2 != true) {
                if ((this.codeStatus == 0)) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            if (this.form2 == true) {
                if ((this.userIDStatus == 0) && (this.userNameStatus == 0)) {
                    if ((this.middileNameStatus == undefined || this.middileNameStatus == 0) && (this.lastNameStatus == undefined || this.lastNameStatus == 0) ) {
                        this.disableButtonUser = false;
                    }
                    else {
                        this.disableButtonUser = true;
                    }
                   // this.disableButtonUser = false;
                }
                else {
                    this.disableButtonUser = true;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "bindModelDataChange");
        }
    }

    /**
     * This function is called when click on edit button 
     * @param costCenterCode
     */
    editCostCenterCode(costCenterCode: MT_DELV_COST_CENTER_AUTH_PERSON) {
        try {
            //this.filter = false;
            this.isEditMode = true;
            this.form = true;
            this.pop = false;
            this.disableButton = false;
            this.newItem = Object.assign({}, costCenterCode);
            this.existingCostCenterCode = costCenterCode.COST_CENTER_CODE;
        }
        catch (ex) {
            this.displayCatchException(ex, "editCostCenterCode");
        }
    }

    /**
     * This function is called when we want to update the Cost Center Code
     */
    private updateSignatoryCode() {
        try {
            this.assignSignatoriesService.updateAuthSign(this.newItem.COST_CENTER_CODE, this.existingCostCenterCode).forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success: {
                        this.growlMessage = [];
                        var msg = AtParConstants.Updated_Msg.replace("1%", 'Cost Center Code').replace("2%", this.newItem.COST_CENTER_CODE);
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                        this.isEditMode = true;
                        this.form = true;
                        break;
                    }
                }
                this.commonErrorHandling(resp);
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "updateSignatoryCode");
        }
    }

    /**
     * This function is called when we click on save button when adding cost code
     */
    saveSignatoryCode() {
        try {
            this.form = false;
            if (this.isEditMode) {
                this.updateSignatoryCode();
            } else {
                this.assignSignatories(this.newItem);
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "saveSignatoryCode");
        }
    }

    /**
     * This function is called when we want to insert user information for particular cost code
     */
    saveAuthSignatoryCode() {
        try {
            this.assignSignatoriesService.addAuthSign(this.newItem.COST_CENTER_CODE, this.newItem.AUTH_USER_ID, this.newItem.FIRST_NAME, this.newItem.LAST_NAME, this.newItem.MIDDLE_NAME).forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success: {
                        this.growlMessage = [];

                        let msg = '';
                        // if (this.newItem.AUTH_USER_ID != null || this.newItem.AUTH_USER_ID !== '') {
                        msg = AtParConstants.Created_Msg.replace("1%", 'Cost Center Code').replace("2%", this.newItem.COST_CENTER_CODE);
                        //}
                        //else {
                        //    msg = AtParConstants.Created_Msg.replace("1%", 'User ID').replace("2%", this.newItem.AUTH_USER_ID);
                        //}
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                        this.newItem.AUTH_USER_ID = '';
                        this.newItem.FIRST_NAME = '';
                        this.newItem.LAST_NAME = '';
                        this.newItem.MIDDLE_NAME = '';
                        this.disableButton = true;
                        this.disableButtonUser = true;
                        document.getElementById('userID').focus();

                        this.userIDStatus = 1;
                        this.userNameStatus = 1; 
                         
                        //  this.assignSignatories(this.newItem);
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        let msg = AtParConstants.AlreadyExist_Msg.replace("1%", 'User ID').replace("2%", this.newItem.AUTH_USER_ID);
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }

            });
        }
        catch (ex) {
            this.displayCatchException(ex, "saveAuthSignatoryCode");
        }
    }


    /**
     * This function is called when  getting data of cost center code
     * @param costCenterAuthPerson
     */
    async assignSignatories(costCenterAuthPerson) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Signatories ';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form2 = false;
        this.form = false;
        this.pop = false;
        this.filter = false;
        this.table = true;
        this.newItem.COST_CENTER_CODE = costCenterAuthPerson.COST_CENTER_CODE;
        this.lstSignDBData = [];
        this.editUser = true;
        if (this.table == true || this.tableData == true) {
            this.strData = 'Cost Center Code : ' + costCenterAuthPerson.COST_CENTER_CODE;
        }

        try {
            this.spinnerService.start();
            if (costCenterAuthPerson == "" || costCenterAuthPerson == null || costCenterAuthPerson == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Enter Cost Center Code...' });
                this.spinnerService.stop();
                return;
            }
            else {
                await this.assignSignatoriesService.getAuthSign(costCenterAuthPerson.COST_CENTER_CODE).catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_DELV_COST_CENTER_AUTH_PERSON>;
                    this.spinnerService.stop();
                    this.lstSignDBData = data.DataList;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.lstSignDBData != null && this.lstSignDBData.length > 0) {
                                this.tableData = true;
                            }
                            else {
                                this.growlMessage = [];
                                this.tableData = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                return;
                            }
                            for (let i = 0; i < this.lstSignDBData.length; i++) {
                                this.lstSignDBData[i].COST_CENTER_CODE = costCenterAuthPerson.COST_CENTER_CODE;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            if (this.lstSignDBData != null && this.lstSignDBData.length > 0) {
                                this.tableData = true;
                            }
                            else {
                                this.growlMessage = [];
                                this.tableData = false;
                            }
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "assignSignatories");
        }
    }

    /**
     * Common Error Handlingh Method
     * @param data
     */
    private commonErrorHandling(data) {
        try {
            switch (data.StatType) {
                case StatusType.Warn: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    break;
                }
                case StatusType.Error: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    break;
                }
                case StatusType.Custom: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                    break;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "commonErrorHandling");
        }
    }



    confirmDelete(costCenterAuthPerson, isCostCenterCode) {
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this?',
                accept: () =>
                { this.deleteSignatories(costCenterAuthPerson, isCostCenterCode); }
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "confirmDelete");
        }

    }


    /**
     * This function is called when we click delete button
     * @param costCenterAuthPerson
     * @param isCostCenterCode
     */
    async deleteSignatories(costCenterAuthPerson, isCostCenterCode) {
        if (this.isEditMode && isCostCenterCode) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please update or cancel before continuing!!!" });
            return;
        }
        if (this.lstDBData.length == 1) {
            this.deleteToken = true;
        }
        try {
            this.spinnerService.start();
            await this.assignSignatoriesService.deleteAuthSign(costCenterAuthPerson.COST_CENTER_CODE, costCenterAuthPerson.AUTH_USER_ID).forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success: {
                        this.growlMessage = [];

                        let msg = '';
                        var message = "Deleted Successfully";
                        if (!isCostCenterCode) {
                            msg = AtParConstants.Deleted_Msg.replace("1%", 'User ID').replace("2%", costCenterAuthPerson.AUTH_USER_ID);
                            //message = " User ID " + costCenterAuthPerson.AUTH_USER_ID + message;
                            this.assignSignatories(costCenterAuthPerson);
                        } else {
                            msg = AtParConstants.Deleted_Msg.replace("1%", 'Cost center code').replace("2%", costCenterAuthPerson.COST_CENTER_CODE);
                            // message = " Cost center code " + costCenterAuthPerson.COST_CENTER_CODE + message;
                            this.go();
                        }
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                        break;
                    }
                }
                this.commonErrorHandling(resp);
            });
        } catch (ex) {
            this.displayCatchException(ex, "deleteSignatories");
        }
    }

    /**
     * This function is called when we click on cancel
     */
    goCancel() {
        this.form = false;
        this.form2 = false;
        this.table = false;
        this.filter = true;
        this.isEditMode = false;
        this.pop = false;
    }

    /**
     * This function is called when we click on add button to add user info
     */
    edit() {
        try {
            this.disableButtonUser = true;
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Signatories ';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.form2 = true;
            this.form = false;
            this.table = false;
            this.pop = false;
            this.newItem.LAST_NAME = '';
            this.newItem.MIDDLE_NAME = '';
            this.growlMessage = [];
            this.userIDStatus = null;
            this.userNameStatus = null;
            setTimeout(function () {
                (<HTMLInputElement>document.getElementById("userID")).focus();
            }, 500);
        }
        catch (ex) {
            this.displayCatchException(ex, "edit");
        }
    }

    /**
     * This function is called when we click on goback
     */
    back() {
        this.form2 = false;
        this.table = false;
        this.pop = false;
        this.filter = true;
    }

    /**
     * This function is called when we click on Close
     */
    close() {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.newItem.AUTH_USER_ID = '';
            this.newItem.FIRST_NAME = '';
            this.newItem.LAST_NAME = '';
            this.newItem.MIDDLE_NAME = '';
            this.disableButton = true;
            this.growlMessage = [];
            this.saveSignatoryCode();
        }
        catch (ex) {
            this.displayCatchException(ex, "close");
        }
    }

    /**
  * This method is for displaying catch block error messages 
  * @param event
  */
    displayCatchException(ex, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }

    /**
   * delete all the values from variables
   */
    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstDBData = [];
        this.lstSignDBData = [];
        this.pop = false;
        this.disableButton = true;
        this.form = false;
        this.form2 = false;
        this.filter = true;
    }
} 
