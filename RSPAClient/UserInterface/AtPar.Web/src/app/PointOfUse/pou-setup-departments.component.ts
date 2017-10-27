import { Component, ViewChild ,Inject} from '@angular/core';
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
import { SetupDepartmentService } from './pou-setup-departments.service';
import { StatusType } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { MT_POU_DEPT } from '../Entities/MT_POU_DEPT';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { SelectItem } from '../components/common/api';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { Menus } from '../AtPar/Menus/routepath';
import { DOCUMENT } from '@angular/platform-browser';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'pou-setup-departments.component.html',
    providers: [HttpService, ConfirmationService, SetupDepartmentService, AtParCommonService]
})

export class SetupDepartmentsComponent {
    pop: boolean = false;
    form: boolean = true;
    isEditMode: boolean = false;
    btnSaveEnableDisable: boolean = true;
    btnUpdateEnableDisable: boolean = true;
    growlMessage: Message[] = [];
    lstDBData: MT_POU_DEPT[];
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    startIndex: number;
    EndIndex: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    lstChecked: Array<MT_POU_DEPT>;
    lstgridfilterData: MT_POU_DEPT[];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    database: any;
    public newItem = new MT_POU_DEPT();
    mainlstGridData: Array<MT_POU_DEPT>;
    orgID: string;
    deptID: string;
    btnMode: string;
    orgGrpId: string = "";
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    lstOrgGroups: SelectItem[] = [];
    selectedOrgGroupId: string;
    orgGroupIDForDBUpdate: string;
    pdeptsearch: string;
    breadCrumbMenu: Menus;
    //variables for textbox validations
    txtDepartmentIDStatus: number;
    txtDeptNameStatus: number;
    txtAttentionToStatus: number;
    txtAddress1Status: number;
    txtAddress2Status: number;
    txtCityStatus: number;
    txtZipStatus: number;
    txtStateStatus: number;
    txtCountryStatus: number;
    txtPhoneStatus: number;
    txtFaxStatus: number;
    txtEmailStatus: number;
    txtEmailAlertStatus: number;
    txtInveCordEmailStatus: number;
    txtExcApprEmailStatus: number;
    txtFreqSendRemStatus: number;
    txtEmailRecalNotificationStatus: number;
    txtDefaultPrinterStatus: number;
    txtDefaultDistributionTypeStatus: number;
    txtDefaultDestinationLocStatus: number;
    txtCategoryCodePOGenStatus: number;
    txtBusinessUnitBillPOStatus: number;
    txtValidLocBillPOStatus: number;
    txtEmailLowStockAlertsStatus: number;
    txtEmailProductExpirationAlertsStatus: number;
    txtLimitNumCaseCartPicksDownloadStatus: number;
    txtDurationTrackingExpirationStatus: number;
    txtPercentageOptimumQuantityStatus: number;
    txtBuyerPOGenerationsStatus: number;
    txtStorageAreaForIssuePickStatus: number;
    orgGPStatus: number;
    statusType: string;
    

    constructor(private httpService: HttpService,
        private spinnerService: SpinnerService,
        private confirmationService: ConfirmationService,
        @Inject(DOCUMENT) private document,
        private atparConstant: AtParConstants,
        private setupDepartmentService: SetupDepartmentService,
        private commonService: AtParCommonService) {
        this.newItem = new MT_POU_DEPT();
        this.breadCrumbMenu = new Menus();
        //this.dataservice.getSetupDepartment().then(countries => { this.sales = countries; });
    }

    ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.database = [];
        this.database.push({ label: 'All', value: '' });
        this.database.push({ label: 'Active', value: true });
        this.database.push({ label: 'InActive', value: false });
        this.orgID = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
        this.deptID = this.deviceTokenEntry[TokenEntry_Enum.DeptID];
        console.log(this.deptID);
        this.bindOrgGroups();
        this.growlMessage = [];
        this.mainlstGridData = new Array<MT_POU_DEPT>()
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
                                //if (this.orgGroupData[0].ORG_GROUP_ID !== "ALL"
                                //{})
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.spinnerService.stop();
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
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    async go() {
        this.statusType = "";
        if (this.pop == true) {
            this.dataTableComponent.reset();
        }
        this.mainlstGridData = [];
        try {
            this.spinnerService.start();
            if (this.pdeptsearch == null || this.pdeptsearch == undefined || this.pdeptsearch === "") {
                this.pdeptsearch = "";
            }
            //this.deviceTokenEntry[TokenEntry_Enum.DeptID]
            await this.setupDepartmentService.getDeptDetails(this.deptID, this.orgID, this.pdeptsearch).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT>;
                    this.spinnerService.stop();

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.pop = true;
                            this.growlMessage = [];
                            this.lstDBData = data.DataList;

                            for (let x = 0; x < this.lstDBData.length; x++) {
                                let setupDepartDetails = new MT_POU_DEPT();
                                setupDepartDetails.ORG_GROUP_ID = this.lstDBData[x].ORG_GROUP_ID;
                                setupDepartDetails.DEPT_ID = this.lstDBData[x].DEPT_ID;
                                setupDepartDetails.DEPT_NAME = this.lstDBData[x].DEPT_NAME;
                                setupDepartDetails.PHONE = this.lstDBData[x].PHONE;                                
                                setupDepartDetails.BILL_ONLY_CONSIGN_IMPLMENTED = this.lstDBData[x].BILL_ONLY_CONSIGN_IMPLMENTED;
                                setupDepartDetails.ATTN_TO = this.lstDBData[x].ATTN_TO;
                                setupDepartDetails.STATUS = !this.lstDBData[x].STATUS;
                                this.lstDBData[x].STATUS = !this.lstDBData[x].STATUS;
                                this.mainlstGridData.push(setupDepartDetails);
                            }

                            if (this.lstDBData.length == 0) {
                                this.pop = false;

                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: "No data for the search criteria entered" });
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.pop = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.pop = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.pop = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    changeStatus(pou_dept: MT_POU_DEPT) {
        this.spinnerService.start();
        var intStatus = pou_dept.STATUS == false ? 0 : 1;
        try {
            this.setupDepartmentService.updateDeptStatus(pou_dept.DEPT_ID, intStatus, pou_dept.ORG_GROUP_ID, 15).forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success: {
                        pou_dept.STATUS = !pou_dept.STATUS;
                        this.lstDBData = [];
                        let filterData: any = [];
                        let matchedrecord = this.mainlstGridData.filter(x => x.DEPT_ID == pou_dept.DEPT_ID && x.ORG_GROUP_ID == pou_dept.ORG_GROUP_ID)
                        matchedrecord[0].STATUS = pou_dept.STATUS;
                        if (this.statusType.toString() == "true") {
                            filterData = this.mainlstGridData.filter(x => x.STATUS == true)
                        } else if (this.statusType.toString() == "false") {
                            filterData = this.mainlstGridData.filter(x => x.STATUS == false)
                        } else {
                            filterData = this.mainlstGridData
                        }
                        if (filterData != null) {
                            for (let x = 0; x < filterData.length; x++) {
                                let setupDepartDetails = new MT_POU_DEPT();
                                setupDepartDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                setupDepartDetails.DEPT_ID = filterData[x].DEPT_ID;
                                setupDepartDetails.DEPT_NAME = filterData[x].DEPT_NAME;
                                setupDepartDetails.PHONE = filterData[x].PHONE;
                                setupDepartDetails.STATUS = filterData[x].STATUS;
                                setupDepartDetails.ATTN_TO = filterData[x].ATTN_TO;
                                this.lstDBData.push(setupDepartDetails);
                            }


                        }
                        this.growlMessage = [];
                        let statusmsg = AtParConstants.Updated_Status_Msg.replace("1%", "Department").replace("2%", pou_dept.DEPT_ID)
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg });

                        break;
                    }

                    case StatusType.Warn: {
                        if (resp.StatusCode == AtparStatusCodes.CRCT_S_CANNOTINACTIVATE)
                        {

                            pou_dept.STATUS = true;

                           //this.lstDBData.filter(x => x.DEPT_ID == pou_dept.DEPT_ID)[0].STATUS = !pou_dept.STATUS;
                          
                        }
                        this.growlMessage = [];
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
            this.growlMessage = [];
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: ex.toString() });
        }

    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        let filterData;
        this.lstDBData = [];
        this.growlMessage = [];

        if (this.statusType.toString() == "true") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == true)
        } else if (this.statusType.toString() == "false") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == false)
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let setupDepartDetails = new MT_POU_DEPT();
                setupDepartDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                setupDepartDetails.DEPT_ID = filterData[x].DEPT_ID;
                setupDepartDetails.DEPT_NAME = filterData[x].DEPT_NAME;
                setupDepartDetails.PHONE = filterData[x].PHONE;
                setupDepartDetails.STATUS = filterData[x].STATUS;
                setupDepartDetails.ATTN_TO = filterData[x].ATTN_TO;
                this.lstDBData.push(setupDepartDetails);

            }
        }
    }

    addDept() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.selectedOrgGroupId = "";
        if (this.deviceTokenEntry[TokenEntry_Enum.UserID] == "ADMIN") {
            this.blnShowOrgGroupDD = true;
            this.blnShowOrgGroupLabel = false;
        } else {
            this.blnShowOrgGroupDD = false;
            this.selectedOrgGroupId = this.orgGrpId;
            this.blnShowOrgGroupLabel = true;
        }
        this.form = false;
        this.isEditMode = false;
        this.pop = false;
        this.newItem = new MT_POU_DEPT();
        this.newItem.CASE_PICK_STATUS = "0";
        this.btnSaveEnableDisable = true;
        this.txtDepartmentIDStatus = null;
        this.txtDeptNameStatus = null;
        this.orgGPStatus = null;
        //this.newItem.ORG_GROUP_ID = this.orgID;
        this.btnMode = "Add";

    }

    editDept(pou_dept: MT_POU_DEPT) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Department';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.newItem = pou_dept;
        this.newItem.ALERT_NOTIFY_REQ_STATUS = this.getStatus(this.newItem.ALERT_NOTIFY_REQ);
        this.newItem.EXCP_APPROVAL_REQ_STATUS = this.getStatus(this.newItem.EXCP_APPROVAL_REQ);
        this.newItem.INV_INTERFACE_ENABLE_STATUS = this.getStatus(this.newItem.INV_INTERFACE_ENABLE);
        this.newItem.BILLING_ENABLE_STATUS = this.getStatus(this.newItem.BILLING_ENABLE);
        this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS = this.getStatus(this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS);
        this.newItem.AUTO_PUTAWAY_ENABLED_STATUS = this.getStatus(this.newItem.AUTO_PUTAWAY_ENABLED);
        this.newItem.ALLOW_LOC_SELECT = this.newItem.ALLOW_LOC_SELECT == null ? false : this.newItem.ALLOW_LOC_SELECT;
        this.newItem.AUTO_CASE_PICK_STATUS = this.getStatus(this.newItem.AUTO_CASE_PICK);       
        this.newItem.BILL_ONLY_CONSIGN_IMPLMENTED = this.newItem.BILL_ONLY_CONSIGN_IMPLMENTED;
        this.btnUpdateEnableDisable = false;
        this.isEditMode = true;
        this.form = false;
        this.pop = false;
        this.btnMode = "Update";
        this.blnShowOrgGroupDD = false;
        this.blnShowOrgGroupLabel = true;
        let orggroupid = asEnumerable(this.orgGroupData).Where(x => x.ORG_GROUP_ID.toUpperCase() === pou_dept.ORG_GROUP_ID.toUpperCase().trim()).Select(x => x).ToArray();
        if (orggroupid.length > 0) {
            this.orgGrpId = orggroupid[0].ORG_GROUP_ID + " - " + orggroupid[0].ORG_GROUP_NAME;
        }
    }

    getStatus(input) {
        if (input == null || input == "N")
            return false;
        return true;
    }

    getStatusFromUserFields(input) {
        if (input == true)
            return "Y";
        return "N";
    }

    saveDept() {

        this.spinnerService.start();
        this.updateStatusDetails();
        this.newItem.STATUS = true;
        if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select OrgGrpID." });
            this.spinnerService.stop();
            return;
        }
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }
        this.newItem.ORG_GROUP_ID = this.orgGroupIDForDBUpdate.trim();
        if (this.newItem.ALERT_NOTIFY_REQ_STATUS == true) {
            if (this.newItem.EMAIL_NOTIFY == null || this.newItem.EMAIL_NOTIFY == undefined || this.newItem.EMAIL_NOTIFY == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email alert notification is mandatory" });
                return;
            }
        }
        if (this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS == true) {
            if (this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == null || this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == undefined || this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email ID for Low Stock Alerts is mandatory" });
                return;
            }
        }
        if (this.newItem.SEND_PRODUCT_EXP_EMAIL_ALERTS_STATUS == true) {
            if (this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == null || this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == undefined || this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email for Product Expiration Alerts is mandatory" });
                return;
            }
        }        
        this.setupDepartmentService.createDepartment(this.newItem).forEach(resp => {
            switch (resp.StatType) {
                case StatusType.Success: {
                    this.pop = false;
                    this.growlMessage = [];
                    let statusmsg = AtParConstants.Created_Msg.replace("1%", "Department").replace("2%", this.newItem.DEPT_ID);
                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg });
                    this.newItem.ADDRESS1 = '';
                    this.newItem.ADDRESS2 = '';
                    this.newItem.ALERT_NOTIFY_REQ_STATUS = false;
                    this.newItem.ALLOW_LOC_SELECT = true;
                    this.newItem.ATTN_TO = '';
                    this.newItem.AUTO_PUTAWAY_ENABLED_STATUS = false;
                    this.newItem.BILL_ONLY_CONSIGN_IMPLMENTED = false;
                    this.newItem.DEFAULT_IMPLANT_TYPE = '';
                    this.newItem.DEPT_ID = '';
                    this.newItem.DEPT_NAME = '';
                    this.newItem.CITY = '';
                    this.newItem.STATE = '';
                    this.newItem.ZIP = '';
                    this.newItem.COUNTRY = '';
                    this.newItem.PHONE = '';
                    this.newItem.FAX = '';
                    this.newItem.E_MAIL = '';
                    this.newItem.EMAIL_NOTIFY = '';
                    this.newItem.EXCP_APPROVAL_REQ_STATUS = false;
                    this.newItem.INV_COORD_EMAIL = '';
                    this.newItem.EXCP_APPROVER_EMAIL = '';
                    this.newItem.REMINDER_FREQ = 0;
                    this.newItem.RECALL_NOTIFICATION_EMAIL = '';
                    this.newItem.INV_INTERFACE_ENABLE_STATUS = false;
                    this.newItem.BILLING_ENABLE_STATUS = false;
                    this.newItem.DEFAULT_PRINTER = '';
                    this.newItem.DEFAULT_DISTRIBUTION_TYPE = '';
                    this.newItem.DEFAULT_DESTINATION_LOCATION = '';
                    this.newItem.CATEGORY_CODE = '';
                    this.newItem.BILLONLY_BUSINESS_UNIT = '';
                    this.newItem.BILLONLY_LOCATION = '';
                    this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS = false;
                    this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS = '';
                    this.newItem.SEND_PRODUCT_EXP_EMAIL_ALERTS_STATUS = false;
                    this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS = '';
                    this.newItem.NO_OF_CASES_DOWNLOAD = 1;
                    this.newItem.DURATION_TRACKING_EXP = 0;
                    this.newItem.PERCENTAGE_OPTIMUM_QTY = 0;
                    this.newItem.PREPICK_QA_PROCESS_REQUIRED = false;
                    this.newItem.BUYER_ID = '';
                    this.newItem.CASE_PICK_STATUS = "0";
                    this.newItem.AUTO_CASE_PICK_STATUS = false;
                    this.newItem.STORAGE_AREA = '';
                    this.selectedOrgGroupId = "Select One";
                    this.btnSaveEnableDisable = true;
                    if (this.blnShowOrgGroupDD) {
                        (<HTMLInputElement>document.getElementById('txtddllstOrgGroups')).focus();
                    }
                    else {
                        (<HTMLInputElement>document.getElementById('DepartmentID')).focus();
                    }
                    this.txtDepartmentIDStatus = null;
                    this.txtDeptNameStatus = null;
                    this.orgGPStatus = null;
                    break;
                }

                case StatusType.Warn: {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage.replace("1%", this.newItem.DEPT_ID) });
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
            this.atparConstant.scrollToTop();
            this.spinnerService.stop();
        });
    }

    updateDept() {
        //this.growlMessage = [];
        this.spinnerService.start();
        this.updateStatusDetails();
        // this.orgGrpId = this.newItem.ORG_GROUP_ID;
        if (this.newItem.ALERT_NOTIFY_REQ_STATUS == true) {
            if (this.newItem.EMAIL_NOTIFY == null || this.newItem.EMAIL_NOTIFY == undefined || this.newItem.EMAIL_NOTIFY == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email alert notification is mandatory" });
                return;
            }
        }
        if (this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS == true) {
            if (this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == null || this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == undefined || this.newItem.EMAILID_FOR_LOWSTOCK_ALERTS == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email ID for Low Stock Alerts is mandatory" });
                return;
            }
        }
        if (this.newItem.SEND_PRODUCT_EXP_EMAIL_ALERTS_STATUS == true) {
            if (this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == null || this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == undefined || this.newItem.EMAILID_FOR_PRODUCT_EXP_ALERTS == "") {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email for Product Expiration Alerts is mandatory" });
                return;
            }
        }        
        this.setupDepartmentService.updateDepartment(this.newItem, 15).forEach(resp => {
            switch (resp.StatType) {
                case StatusType.Success: {
                    this.growlMessage = [];
                    let statusmsg = AtParConstants.Updated_Msg.replace("1%", "Department").replace("2%", this.newItem.DEPT_ID);
                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg });
                    (<HTMLInputElement>document.getElementById('DepartmentName')).focus();
                    break;
                }
                case StatusType.Warn: {
                    this.growlMessage = [];
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
            this.atparConstant.scrollToTop();
            this.spinnerService.stop();
        });
    }

    updateStatusDetails() {
        this.newItem.ALERT_NOTIFY_REQ = this.getStatusFromUserFields(this.newItem.ALERT_NOTIFY_REQ_STATUS);
        this.newItem.EXCP_APPROVAL_REQ = this.getStatusFromUserFields(this.newItem.EXCP_APPROVAL_REQ_STATUS);
        this.newItem.INV_INTERFACE_ENABLE = this.getStatusFromUserFields(this.newItem.INV_INTERFACE_ENABLE_STATUS);
        this.newItem.BILLING_ENABLE = this.getStatusFromUserFields(this.newItem.BILLING_ENABLE_STATUS);
        this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS = this.getStatusFromUserFields(this.newItem.SEND_LOWSTOCK_EMAIL_ALERTS_STATUS);
        this.newItem.AUTO_PUTAWAY_ENABLED = this.getStatusFromUserFields(this.newItem.AUTO_PUTAWAY_ENABLED_STATUS);
        this.newItem.AUTO_CASE_PICK = this.getStatusFromUserFields(this.newItem.AUTO_CASE_PICK_STATUS);
    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.growlMessage = [];
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = true;
        this.pop = false;
        this.isEditMode = false;
        this.pdeptsearch = null;

    }

    ddlOrgGroupIdChange() {
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One") {
                this.orgGPStatus = 1;
            }
            else {
                this.orgGPStatus = 0;
            }

        }
        if (this.blnShowOrgGroupLabel) {
            this.orgGPStatus = 0;
        }

        if (this.btnMode == "Update") {
            this.txtDepartmentIDStatus = 0;
            if (this.txtDeptNameStatus >= 1) {
                this.txtDeptNameStatus = 1;
            }
            else {
                this.txtDeptNameStatus = 0;
            }
        }
        if (this.txtDepartmentIDStatus == 0 && this.txtDeptNameStatus == 0 && this.orgGPStatus == 0 && (this.newItem.DEPT_ID != null || this.newItem.DEPT_ID != undefined || this.newItem.DEPT_ID != "") && (this.newItem.DEPT_NAME != null || this.newItem.DEPT_NAME != undefined || this.newItem.DEPT_NAME != "")) {
            if ((this.txtAttentionToStatus == 0 || this.txtAttentionToStatus == undefined) && (this.txtAddress1Status == 0 || this.txtAddress1Status == undefined)
                && (this.txtAddress2Status == 0 || this.txtAddress2Status == undefined) && (this.txtCityStatus == 0 || this.txtCityStatus == undefined) &&
                (this.txtStateStatus == 0 || this.txtStateStatus == undefined) && (this.txtZipStatus == 0 || this.txtZipStatus == undefined) &&
                (this.txtCountryStatus == 0 || this.txtCountryStatus == undefined) && (this.txtPhoneStatus == 0 || this.txtPhoneStatus == undefined)
                && (this.txtFaxStatus == 0 || this.txtFaxStatus == undefined) && (this.txtEmailStatus == 0 || this.txtEmailStatus == undefined) &&
                (this.txtEmailAlertStatus == 0 || this.txtEmailAlertStatus == undefined) && (this.txtInveCordEmailStatus == 0 || this.txtInveCordEmailStatus == undefined) &&
                (this.txtExcApprEmailStatus == 0 || this.txtExcApprEmailStatus == undefined) && (this.txtFreqSendRemStatus == 0 || this.txtFreqSendRemStatus == undefined)
                && (this.txtEmailRecalNotificationStatus == 0 || this.txtEmailRecalNotificationStatus == undefined) &&
                (this.txtDefaultPrinterStatus == 0 || this.txtDefaultPrinterStatus == undefined) &&
                (this.txtDefaultDistributionTypeStatus == 0 || this.txtDefaultDistributionTypeStatus == undefined) &&
                (this.txtDefaultDestinationLocStatus == 0 || this.txtDefaultDestinationLocStatus == undefined) &&
                (this.txtCategoryCodePOGenStatus == 0 || this.txtCategoryCodePOGenStatus == undefined) &&
                (this.txtBusinessUnitBillPOStatus == 0 || this.txtBusinessUnitBillPOStatus == undefined)
                && (this.txtValidLocBillPOStatus == 0 || this.txtValidLocBillPOStatus == undefined) &&
                (this.txtEmailLowStockAlertsStatus == 0 || this.txtEmailLowStockAlertsStatus == undefined) &&
                (this.txtEmailProductExpirationAlertsStatus == 0 || this.txtEmailProductExpirationAlertsStatus == undefined) &&
                (this.txtLimitNumCaseCartPicksDownloadStatus == 0 || this.txtLimitNumCaseCartPicksDownloadStatus == undefined) &&
                (this.txtDurationTrackingExpirationStatus == 0 || this.txtDurationTrackingExpirationStatus == undefined) &&
                (this.txtPercentageOptimumQuantityStatus == 0 || this.txtPercentageOptimumQuantityStatus == undefined)
                && (this.txtBuyerPOGenerationsStatus == 0 || this.txtBuyerPOGenerationsStatus == undefined) &&
                (this.txtStorageAreaForIssuePickStatus == 0 || this.txtStorageAreaForIssuePickStatus == undefined)) {

                this.btnSaveEnableDisable = false;
                this.btnUpdateEnableDisable = false;
            }
            else {
                this.btnSaveEnableDisable = true;
                this.btnUpdateEnableDisable = true;
            }
        }
        else {
            this.btnSaveEnableDisable = true;
            this.btnUpdateEnableDisable = true;
        }

    }

    bindModelDataChange(event: any) {

        if ("DepartmentID" == event.TextBoxID.toString()) {
            this.txtDepartmentIDStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("DepartmentName" == event.TextBoxID.toString()) {
            this.txtDeptNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("AttentionTo" == event.TextBoxID.toString()) {
            this.txtAttentionToStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Address1" == event.TextBoxID.toString()) {
            this.txtAddress1Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Address2" == event.TextBoxID.toString()) {
            this.txtAddress2Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("City" == event.TextBoxID.toString()) {
            this.txtCityStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("State" == event.TextBoxID.toString()) {
            this.txtStateStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Zip" == event.TextBoxID.toString()) {
            this.txtZipStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Country" == event.TextBoxID.toString()) {
            this.txtCountryStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Phone" == event.TextBoxID.toString()) {
            this.txtPhoneStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Fax" == event.TextBoxID.toString()) {
            this.txtFaxStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Email" == event.TextBoxID.toString()) {
            this.txtEmailStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("EmailAlert" == event.TextBoxID.toString()) {
            this.txtEmailAlertStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("InveCordEmail" == event.TextBoxID.toString()) {
            this.txtInveCordEmailStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("ExcApprEmail" == event.TextBoxID.toString()) {
            this.txtExcApprEmailStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("FreqSendRem" == event.TextBoxID.toString()) {
            this.txtFreqSendRemStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("EmailRecalNotification" == event.TextBoxID.toString()) {
            this.txtEmailRecalNotificationStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("DefaultPrinter" == event.TextBoxID.toString()) {
            this.txtDefaultPrinterStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("DefaultDistributionType" == event.TextBoxID.toString()) {
            this.txtDefaultDistributionTypeStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("DefaultDestinationLoc" == event.TextBoxID.toString()) {
            this.txtDefaultDestinationLocStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("CategoryCodePOGen" == event.TextBoxID.toString()) {
            this.txtCategoryCodePOGenStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("BusinessUnitBillPO" == event.TextBoxID.toString()) {
            this.txtBusinessUnitBillPOStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("ValidLocBillPO" == event.TextBoxID.toString()) {
            this.txtValidLocBillPOStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("EmailLowStockAlerts" == event.TextBoxID.toString()) {
            this.txtEmailLowStockAlertsStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("EmailProductExpirationAlerts" == event.TextBoxID.toString()) {
            this.txtEmailProductExpirationAlertsStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("LimitNumCaseCartPicksDownload" == event.TextBoxID.toString()) {
            this.txtLimitNumCaseCartPicksDownloadStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("DurationTrackingExpiration" == event.TextBoxID.toString()) {
            this.txtDurationTrackingExpirationStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("PercentageOptimumQuantity" == event.TextBoxID.toString()) {
            this.txtPercentageOptimumQuantityStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("BuyerPOGenerations" == event.TextBoxID.toString()) {
            this.txtBuyerPOGenerationsStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("StorageAreaForIssuePick" == event.TextBoxID.toString()) {
            this.txtStorageAreaForIssuePickStatus = event.validationrules.filter(x => x.status == false).length;
        }

        if (this.btnMode == "Update") {
            this.txtDepartmentIDStatus = 0;
            if (this.txtDeptNameStatus >= 1) {
                this.txtDeptNameStatus = 1;
            }
            else {
                this.txtDeptNameStatus = 0;
            }
        }
        this.ddlOrgGroupIdChange();
        if (this.txtDepartmentIDStatus == 0 && this.txtDeptNameStatus == 0 && this.orgGPStatus == 0) {
            if ((this.txtAttentionToStatus == 0 || this.txtAttentionToStatus == undefined) && (this.txtAddress1Status == 0 || this.txtAddress1Status == undefined)
                && (this.txtAddress2Status == 0 || this.txtAddress2Status == undefined) && (this.txtCityStatus == 0 || this.txtCityStatus == undefined) &&
                (this.txtStateStatus == 0 || this.txtStateStatus == undefined) && (this.txtZipStatus == 0 || this.txtZipStatus == undefined) &&
                (this.txtCountryStatus == 0 || this.txtCountryStatus == undefined) && (this.txtPhoneStatus == 0 || this.txtPhoneStatus == undefined)
                && (this.txtFaxStatus == 0 || this.txtFaxStatus == undefined) && (this.txtEmailStatus == 0 || this.txtEmailStatus == undefined) &&
                (this.txtEmailAlertStatus == 0 || this.txtEmailAlertStatus == undefined) && (this.txtInveCordEmailStatus == 0 || this.txtInveCordEmailStatus == undefined) &&
                (this.txtExcApprEmailStatus == 0 || this.txtExcApprEmailStatus == undefined) && (this.txtFreqSendRemStatus == 0 || this.txtFreqSendRemStatus == undefined)
                && (this.txtEmailRecalNotificationStatus == 0 || this.txtEmailRecalNotificationStatus == undefined) &&
                (this.txtDefaultPrinterStatus == 0 || this.txtDefaultPrinterStatus == undefined) &&
                (this.txtDefaultDistributionTypeStatus == 0 || this.txtDefaultDistributionTypeStatus == undefined) &&
                (this.txtDefaultDestinationLocStatus == 0 || this.txtDefaultDestinationLocStatus == undefined) &&
                (this.txtCategoryCodePOGenStatus == 0 || this.txtCategoryCodePOGenStatus == undefined) &&
                (this.txtBusinessUnitBillPOStatus == 0 || this.txtBusinessUnitBillPOStatus == undefined)
                && (this.txtValidLocBillPOStatus == 0 || this.txtValidLocBillPOStatus == undefined) &&
                (this.txtEmailLowStockAlertsStatus == 0 || this.txtEmailLowStockAlertsStatus == undefined) &&
                (this.txtEmailProductExpirationAlertsStatus == 0 || this.txtEmailProductExpirationAlertsStatus == undefined) &&
                (this.txtLimitNumCaseCartPicksDownloadStatus == 0 || this.txtLimitNumCaseCartPicksDownloadStatus == undefined) &&
                (this.txtDurationTrackingExpirationStatus == 0 || this.txtDurationTrackingExpirationStatus == undefined) &&
                (this.txtPercentageOptimumQuantityStatus == 0 || this.txtPercentageOptimumQuantityStatus == undefined)
                && (this.txtBuyerPOGenerationsStatus == 0 || this.txtBuyerPOGenerationsStatus == undefined) &&
                (this.txtStorageAreaForIssuePickStatus == 0 || this.txtStorageAreaForIssuePickStatus == undefined)) {

                this.btnSaveEnableDisable = false;
                this.btnUpdateEnableDisable = false;
            }
            else {
                this.btnSaveEnableDisable = true;
                this.btnUpdateEnableDisable = true;
            }
        }
        else {
            this.btnSaveEnableDisable = true;
            this.btnUpdateEnableDisable = true;
        }


    }

}