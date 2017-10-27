import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { ConfirmationService } from '../components/common/api';
import { TokenEntry_Enum, StatusType, EnumApps, YesNo_Enum, Enterprise_Enum, BusinessType, Process_Type, Perform_Action } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';
import { ProcessParametersService } from './pou-process-parameters.service';
import { VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS } from '../entities/vm_pou_dept_cart_workstation_allocations';
import { MT_POU_REPLEN_SOURCE_LOCATION } from '../entities/mt_pou_replen_source_location';
import { MT_POU_PAR_LOC_PROCESS_SCHEDULE } from '../entities/mt_pou_par_loc_process_schedule';
import { MT_ATPAR_SCHEDULE_HEADER } from '../entities/MT_ATPAR_SCHEDULE_HEADER';
import { VM_MT_POU_ASSIGN_LOCATIONS } from '../entities/vm_mt_pou_assign_locations';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({
    selector: 'pou-process-parameters',
    templateUrl: 'pou-process-parameters.component.html',
    providers: [AtParConstants, AtParCommonService, ProcessParametersService, ConfirmationService]
})

export class ProcessParametersComponent {
    //Variables
    pop: boolean = false;
    tab: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    @Input() appId: string;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    deviceTokenEntry: string[] = [];
    statusMsgs: Message[] = [];
    orgIdLstData: string[];
    assignLocationOrgIdLst: string[];
    deptCartLst: Array<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>;
    deptLst: VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS[];
    deptAlertLst: VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS[];
    replenSourecLocationLst: MT_POU_REPLEN_SOURCE_LOCATION[];
    parLocationSearchLst: VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS[];
    parLocationSearchLst1: VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS[];
    parLocProcessScheduleLst: MT_POU_PAR_LOC_PROCESS_SCHEDULE[];
    parBillProcessScheduleLst: MT_POU_PAR_LOC_PROCESS_SCHEDULE[];
    hdnParLocProcessScheduleLst: MT_POU_PAR_LOC_PROCESS_SCHEDULE[];
    parRepProcessScheduleLst: MT_POU_PAR_LOC_PROCESS_SCHEDULE[];
    schdAlerts: MT_POU_PAR_LOC_PROCESS_SCHEDULE[];
    scheduleHeader: MT_ATPAR_SCHEDULE_HEADER[];
    assignLocationLst: VM_MT_POU_ASSIGN_LOCATIONS[];
    assignLocationLsttest: VM_MT_POU_ASSIGN_LOCATIONS[];
    srcLocationsOnLoad: VM_MT_POU_ASSIGN_LOCATIONS[];
    lstgridfilterData: MT_POU_PAR_LOC_PROCESS_SCHEDULE[];
    lstschdalertsgridfilterData: MT_POU_PAR_LOC_PROCESS_SCHEDULE[];
    lstAssignLocfilterData: VM_MT_POU_ASSIGN_LOCATIONS[];
    dtAllocTable: VM_MT_POU_ASSIGN_LOCATIONS[];
    dtUnAllocTable: VM_MT_POU_ASSIGN_LOCATIONS[];
    dsTemp: VM_MT_POU_ASSIGN_LOCATIONS[];
    dsLocDetailsDeleted: VM_MT_POU_ASSIGN_LOCATIONS[];
    assingnLocations: VM_MT_POU_ASSIGN_LOCATIONS[];
    selectedRowReplenishment: MT_POU_PAR_LOC_PROCESS_SCHEDULE;
    txtCartId: string = "";
    activeTab: string;
    lblOrgGrpId: string = "";
    lblLocGrpId: string = "";
    txtLocation: string = "";
    ddlDisplaySelectValue = "";
    ddlSelectedAsgnLocOrgId = "";
    strLocation: string = "";
    sourceLocs: string = "";
    tabReplenishment: boolean = true;
    tabBilling: boolean = true;
    tabAlert: boolean = true;
    isEditMode: boolean = true;
    //reviewChargesValue: boolean = false;
    //blnBillScheduleId: boolean = true;
    //chkBillOption: boolean = true;
    tabEvent: boolean = false;
    blnEnable: boolean = false;
    selectedOrgId: any = "Select One";
    selectedDept: any = "Select One";
    ddlOrgIdLst: any;
    ddlDeptLst: any;
    ddlBillOnlySchedId: any;
    ddlRecallSchedId: any;
    ddlExpSchedId: any;
    ddlLowStockSchedId: any;
    selectedLowStockSchedId: any = "Select One";
    selectedExpSchedId: any = "Select One";
    selectedRecallSchedId: any = "Select One";
    selectedBillOnlySchedId: any = "Select One";
    selectedInvSchedule: any = "Select One";
    ddlSchedIdLst: any;
    ddlBillingSchedIdLst: any;
    selectedReplenish: any = "Select One";
    ddlReplenishLst: any;
    ddlAssignLocationOrgIdLst: any = "Select Org ID";
    ddlDisplaySelectAllLst: any;
    recordsPerPageSize: number;
    intAppId: number;
    statusCode: number = -1;
    intValue: number;
    startIndex: number;
    EndIndex: number;
    breadCrumbMenu: Menus;
    blnAssignLoc: boolean = false;
    repStatusCode: number = -1;
    cartStatus: number = -1;
    billStatus: number = -1;
    alertStatus: number = -1;
    lstRepSorceData: any = [];
    lstBillingData: any = [];
    lstAlertsData: any = [];
    lstAssignLocData: any = [];

    constructor(private spnrService: SpinnerService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService,
        private processParmService: ProcessParametersService, private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();
    }

    go() {
        this.table = !this.table;
        this.tab = true;
        this.page = false;
    }

    add() {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.tab = false;
    }

    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.dsTemp = this.dsTemp.filter(x => x.CHK_VALUE == 1);
        this.form = false;
        this.table = false;
        this.page = true;
        this.tab = true;
    }

    async ngOnInit() {
        try {
            // this.intAppId = EnumApps.PointOfUse;
            this.deptCartLst = new Array<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>();
            this.intAppId = parseInt(this.appId);

            if (isNaN(this.intAppId)) {
                this.intAppId = EnumApps.PointOfUse;
            }
            else {
                if (this.intAppId != EnumApps.PointOfUse) {
                    this.intAppId = EnumApps.Pharmacy;
                }
                else {
                    this.intAppId = EnumApps.PointOfUse;
                }
            }

            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPageSize = parseInt(this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage]);
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.ddlDeptLst = [];
            this.ddlDeptLst.push({ label: "Select One", value: "Select One" });
            await this.page_Load();
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async page_Load() {
        try {
            this.statusMsgs = [];
            if (this.intAppId != EnumApps.PointOfUse) {
                this.tabBilling = false;
            }
            this.statusCode = await this.populateOrgIds();

            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                if (this.statusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "No Assigned Org Business Units" });
                }
                this.spnrService.stop();
                return;
            }

            //await this.PopulateCarts();
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async ddlOrgId_SelectChanged(option, event) {
        try {
            this.statusMsgs = [];
            this.selectedDept = '';
            this.parLocProcessScheduleLst = [];
            this.parBillProcessScheduleLst = [];
            this.parRepProcessScheduleLst = [];
            this.deptCartLst = [];
            this.deptLst = [];
            this.schdAlerts = [];
            this.tab = false;
            this.spnrService.start();
            if (this.selectedOrgId == "" || this.selectedOrgId == 'Select One' || this.selectedOrgId == null) {
                //this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Org Id "  });
                this.spnrService.stop();
                return;
            }
            else {
                await this.populateDepts();
                // await this.populateCarts();
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async ddlDept_SelectChanged(option, event) {
        try {
            this.statusMsgs = [];
            this.tab = false;
            this.parLocProcessScheduleLst = [];
            this.parBillProcessScheduleLst = [];
            this.parRepProcessScheduleLst = [];
            this.schdAlerts = [];
            this.deptLst = [];
            this.deptAlertLst = [];
            this.deptCartLst = [];
            let statusCode: number = -1;
            statusCode = await this.populateCarts();
            this.cartStatus = statusCode;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async searchAutoCompleteParLocation(event) {
        try {

            this.statusMsgs = [];
            let query = event.query;
            this.parLocationSearchLst = []
            //this.parLocationSearchLst = this.deptCartLst;
            this.parLocationSearchLst1 = this.deptCartLst;
            this.parLocationSearchLst = this.filterParLocation(query, this.parLocationSearchLst1);
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async btnGo_Click() {
        try {
            this.spnrService.start();
            let statusCode: number = -1;
            this.statusMsgs = [];
            this.tab = false;
            this.tabBilling = false;
            this.tabReplenishment = false;
            let strBunit: string = "";
            let statusRep: number = -1;
            let _strCartId: string = "";
            this.parLocProcessScheduleLst = [];
            this.parBillProcessScheduleLst = [];
            this.parRepProcessScheduleLst = [];
            this.lstRepSorceData = [];
            this.lstBillingData = [];
            this.lstAlertsData = [];
            this.lstAssignLocData = [];
            this.schdAlerts = [];
            this.deptLst = [];
            localStorage.removeItem("tempBillData");
            localStorage.removeItem("tempAlertsData");
            localStorage.removeItem("tempRepData");
            localStorage.removeItem("tempLocationData");
            this.deptAlertLst = [];
            if (this.selectedOrgId == '' || this.selectedOrgId == null || this.selectedOrgId == undefined || this.selectedOrgId == 'Select One') {
                this.statusMsgs = [];
                this.spnrService.stop();
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Org ID " });
                return;
            }
            statusRep = await this.populateData(Process_Type[Process_Type.Replenishment].toString());


            this.spnrService.stop();
            if (this.parRepProcessScheduleLst != null && this.parRepProcessScheduleLst.length > 0) {
                this.tabReplenishment = true;
                this.repStatusCode = statusRep;
                localStorage.setItem("tempRepData", JSON.stringify(this.parRepProcessScheduleLst));
                //setTimeout(() => {
                //    this.tab = true;
                //}, 10);
                //return;
            }
            if (statusRep == AtparStatusCodes.E_NORECORDFOUND) {
                //this.tabBilling = true;
                //this.tab = true;
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                //for billing tab if inventory locations allocated

                return;
            } else if (statusRep == AtparStatusCodes.INV_NOT_MNGD_IN_ATPAR) {
                //  this.tabBilling = true;
                this.tab = true;
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Inventory is not managed in @Par for the department(s)" });
                this.spnrService.stop();
                return;
            } else if (statusRep != AtparStatusCodes.ATPAR_OK) {
                // this.tabBilling = false;
                // this.tab = false;
                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
                this.spnrService.stop();
                return;
            }
            if (this.ddlDeptLst.length > 1) {
                this.tabBilling = true;
                //this.tab = true;
            }
            await this.getBillingData();
            await this.getAlertsData();




        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getBillingData() {
        let billStatusCode: number = -1;
        // if (this.parBillProcessScheduleLst == undefined || this.parBillProcessScheduleLst.length == 0) {
        billStatusCode = await this.populateData(Process_Type[Process_Type.Billing].toString());
        this.billStatus = billStatusCode;
        // }

        if (this.parBillProcessScheduleLst != null && this.parBillProcessScheduleLst.length > 0) {
            this.tabBilling = true;
            localStorage.setItem("tempBillData", JSON.stringify(this.parBillProcessScheduleLst));
            this.lstBillingData = this.parBillProcessScheduleLst;
        }
        if (billStatusCode == AtparStatusCodes.E_NORECORDFOUND) {
            this.tab = false;
            this.tabReplenishment = false
            this.tabBilling = false;
            this.statusMsgs = [];
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
            return;
        }
        else if (billStatusCode == AtparStatusCodes.BILNG_NOT_MNGD_IN_ATPAR) {
            this.tab = true;
            this.tabBilling = false;
            this.tabReplenishment = false;
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing is not managed in @Par for the department(s)" });
            return;
        }
        else if (billStatusCode != AtparStatusCodes.ATPAR_OK) {
            this.tab = false;
            this.tabBilling = false;
            this.tabReplenishment = false;
            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
            return;
        }
    }

    async getAlertsData() {
        let alertStatusCode: number = -1;
        // if (this.schdAlerts == undefined || this.schdAlerts.length == 0) {
        alertStatusCode = await this.populateData(Process_Type[Process_Type.Alerts].toString());
        this.alertStatus = alertStatusCode;
        //}
        if (this.schdAlerts != null && this.schdAlerts.length > 0) {
            this.tabAlert = true;
            localStorage.setItem("tempAlertsData", JSON.stringify(this.schdAlerts));
            //this.lstAlertsData = this.schdAlerts;
        }
        if (alertStatusCode == AtparStatusCodes.E_NORECORDFOUND) {
            this.tabAlert = true
            this.statusMsgs = [];
            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
            return;
        }
    }

    async  btnReplenishmentSubmit_Click() {
        this.statusMsgs = [];
        let statusCode: number = -1;
        try {
            let strBunit: string = "";
            for (let i = 0; i < this.parRepProcessScheduleLst.length; i++) {
                if (this.parRepProcessScheduleLst[i].CHK_VALUE == true) {
                    if (this.parRepProcessScheduleLst[i].SCHEDULE_ID == "" || this.parRepProcessScheduleLst[i].SCHEDULE_ID == "Select One") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Inventory Schedule" });
                        if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() != "1") {
                            // _dgItem.Cells(5).Text = string.Empty;
                        }
                        return;
                    }
                    if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() == "" || this.parRepProcessScheduleLst[i].REPLENISH_FROM == "-1") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Replenish From" });
                        if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() != "1") {
                            // _dgItem.Cells(5).Text = string.Empty;
                        }
                        return;
                    }
                } else {
                    if (this.parRepProcessScheduleLst[i].SCHEDULE_ID != "" && this.parRepProcessScheduleLst[i].SCHEDULE_ID != "Select One") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Replenishment Location" });
                        if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() != "1") {
                            // _dgItem.Cells(5).Text = string.Empty;
                        }
                        return;
                    }
                }
                if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() == "1") {
                    //' If log.IsDebugEnabled Then log.Debug("SOURCE LOCATIONS:" & _dgItem.Cells(5).Text)
                    //  _dgItem.Cells(5).Text = _dgItem.Cells(5).Text.Replace("&nbsp;", "");                 
                    if (this.parRepProcessScheduleLst[i].SOURCELOCATIONS == "") {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Source Locations are mandatory when Replenish From is Par Locations" });
                        return;
                    }
                }
            }
            statusCode = await this.updateDataset();
            if (statusCode != AtparStatusCodes.ATPAR_OK) {
                if (statusCode == AtparStatusCodes.E_INVALIDPARAMETER) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Invenorty Management/Materials Schedule" });
                } else {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Internal Server Error" });
                }

                return;
            }

            strBunit = this.selectedOrgId;

            if (this.replenSourecLocationLst != null && this.replenSourecLocationLst.length > 0) {
                //Check Once
                for (let i = 0; i < this.parRepProcessScheduleLst.length; i++) {
                    let _ddlReplenishFrom = this.parRepProcessScheduleLst[i].REPLENISH_FROM;
                    let _intSelectedValue: number = -1;
                    if (_ddlReplenishFrom == 0) {
                        _intSelectedValue = -1;
                    } else {
                        _intSelectedValue = _ddlReplenishFrom;
                    }

                    //if (_intSelectedValue != 1) {
                    //    for (dRow = 0; dRow <= dRows.Length - 1; dRow++) {
                    //        dsSourceLocDetails.Tables(0).Rows.Remove(dRows(dRow));
                    //    }
                    //    dsSourceLocDetails.AcceptChanges();
                    //}

                }
            }
            var dicAssignSchedule = { 'lstParLocProcessSchedules': this.parRepProcessScheduleLst, 'lstPouReplanLocation': this.replenSourecLocationLst };
            this.spnrService.start();
            await this.processParmService.assignScheduleToCarts(dicAssignSchedule, strBunit, this.intAppId, this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<number>;
                    this.spnrService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully." });
                            this.clearFields();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });

            this.spnrService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    selectAllReplenishmentLst() {
        try {
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.lstgridfilterData[i].INV_INTERFACE_ENABLE == YesNo_Enum[YesNo_Enum.Y].toString() || this.lstgridfilterData[i].INV_INTERFACE_ENABLE == "" || this.lstgridfilterData[i].INV_INTERFACE_ENABLE == undefined) {
                        this.lstgridfilterData[i].CHK_VALUE = true;
                    }
                }

            }
            else {
                if (this.EndIndex > this.parRepProcessScheduleLst.length) {
                    this.EndIndex = this.parRepProcessScheduleLst.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == YesNo_Enum[YesNo_Enum.Y].toString() || this.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == "" || this.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == undefined) {
                        this.parRepProcessScheduleLst[i].CHK_VALUE = true;
                    }
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    unSelectAllReplenishmentLst() {
        try {
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    if (this.lstgridfilterData[i].INV_INTERFACE_ENABLE == YesNo_Enum[YesNo_Enum.Y].toString() || this.lstgridfilterData[i].INV_INTERFACE_ENABLE == "" || this.lstgridfilterData[i].INV_INTERFACE_ENABLE == undefined) {
                        this.lstgridfilterData[i].CHK_VALUE = false;
                    }
                }
            }
            else {
                if (this.EndIndex > this.parRepProcessScheduleLst.length) {
                    this.EndIndex = this.parRepProcessScheduleLst.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    if (this.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == YesNo_Enum[YesNo_Enum.Y].toString() || this.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == "" || this.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == undefined) {
                        if (this.parRepProcessScheduleLst[i].REPLENISH_FROM == '1') {
                            this.parRepProcessScheduleLst[i].SOURCELOCATIONS = "";
                            this.parRepProcessScheduleLst[i].OLDSOURCELOCATIONS = "";
                        }
                        this.parRepProcessScheduleLst[i].SCHEDULE_ID = '';
                        this.parRepProcessScheduleLst[i].REPLENISH_FROM = '';
                        if (this.replenSourecLocationLst != null && this.replenSourecLocationLst.length > 0) {
                            let drCartSourceLocations = asEnumerable(this.replenSourecLocationLst).Where(x => (x.PAR_LOC_ID == this.parRepProcessScheduleLst[i].ID) && (x.ORG_ID == this.parRepProcessScheduleLst[i].ORG_ID)).ToArray();
                            if (drCartSourceLocations != null && drCartSourceLocations.length > 0) {
                                for (let j = 0; j < drCartSourceLocations.length; j++) {
                                    drCartSourceLocations[j].SOURCE_LOCATION = "";
                                }
                            }
                        }
                        this.parRepProcessScheduleLst[i].CHK_VALUE = false;
                    }
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    filterReplenishmentdata(event) {
        this.statusMsgs = [];
        this.lstgridfilterData = new Array<MT_POU_PAR_LOC_PROCESS_SCHEDULE>();
        this.lstgridfilterData = event;
    }

    inventoryScheduleChanged(inventoryScheduleLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                inventoryScheduleLst.SCHEDULE_ID = event.value;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    replenishmentFromChanged(replenishmentFromLst, event) {
        this.statusMsgs = [];
        try {
            if (event.value == "1") {
                replenishmentFromLst.SOURCELOCATIONS = replenishmentFromLst.OLDSOURCELOCATIONS;
                replenishmentFromLst.REPLENISH_FROM = event.value;
                replenishmentFromLst.OLDREPLENISH_FROM = replenishmentFromLst.REPLENISH_FROM;
            }
            else {
                if (replenishmentFromLst.SOURCELOCATIONS == "" || replenishmentFromLst.SOURCELOCATIONS == null || replenishmentFromLst.SOURCELOCATIONS == undefined) {
                }
                else {
                    this.confirmationService.confirm({
                        message: "Source Locations are going to invisible.",
                        accept: async () => {
                            replenishmentFromLst.OLDSOURCELOCATIONS = replenishmentFromLst.SOURCELOCATIONS;
                            replenishmentFromLst.SOURCELOCATIONS = '';
                            replenishmentFromLst.REPLENISH_FROM = event.value;
                            replenishmentFromLst.OLDREPLENISH_FROM = replenishmentFromLst.REPLENISH_FROM;

                        },
                        reject: () => {
                            replenishmentFromLst.REPLENISH_FROM = replenishmentFromLst.OLDREPLENISH_FROM;
                        }
                    });
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async parScheduleLstChkboxChanged(lstData, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                lstData.CHK_VALUE = event;
            }
            if (event == false) {
                lstData.SCHEDULE_ID = '';
                lstData.REPLENISH_FROM = '';
                lstData.SOURCELOCATIONS = '';
                lstData.OLDSOURCELOCATIONS = '';

                if (this.replenSourecLocationLst != null && this.replenSourecLocationLst.length > 0) {
                    let drCartSourceLocations = asEnumerable(this.replenSourecLocationLst).Where(x => (x.PAR_LOC_ID == lstData.ID) && (x.ORG_ID == lstData.ORG_ID)).ToArray();
                    if (drCartSourceLocations != null && drCartSourceLocations.length > 0) {
                        for (let i = 0; i < drCartSourceLocations.length; i++) {
                            drCartSourceLocations[i].SOURCE_LOCATION = "";
                        }
                    }
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async tabContainer_ActiveTabChanged(option: any) {
        if (option != null) {
            this.activeTab = option.title;
        }
        this.statusMsgs = [];
        let statusCode: number = -1;
        this.tabBilling = false;
        try {
            if (this.activeTab.toString() == Process_Type[Process_Type.Replenishment].toString()) {
                //if (this.tabEvent) {
                //    this.parLocProcessScheduleLst = [];
                //}
                this.lstAlertsData = JSON.parse(localStorage.getItem("tempAlertsData"));
                if (this.lstAlertsData != null && this.lstAlertsData != undefined && this.lstAlertsData.length > 0) {
                    this.schdAlerts = [];
                    this.schdAlerts = this.lstAlertsData;
                }

                this.lstBillingData = JSON.parse(localStorage.getItem("tempBillData"));
                if (this.lstBillingData != null && this.lstBillingData != undefined && this.lstBillingData.length > 0) {
                    this.parBillProcessScheduleLst = [];
                    this.parBillProcessScheduleLst = this.lstBillingData;
                }
                this.tabReplenishment = false;
                this.tabBilling = false;
                this.statusMsgs = [];
                this.blnEnable = false;
                //txtCartId.Enabled = true; 
                //if (this.parRepProcessScheduleLst == undefined || this.parRepProcessScheduleLst.length == 0) {
                statusCode = await this.populateData(Process_Type[Process_Type.Replenishment].toString());
                //}
                if (this.parRepProcessScheduleLst != null && this.parRepProcessScheduleLst.length > 0) {
                    this.tabReplenishment = true;
                    setTimeout(() => {
                        //this.tab = true;
                    }, 10);
                    this.lstRepSorceData = this.parRepProcessScheduleLst;
                    // if (this.repStatusCode != null && this.repStatusCode !== 0 && this.repStatusCode != undefined) {
                    statusCode = this.repStatusCode;
                    // }

                }
                if (statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.tab = false;
                    this.tabReplenishment = false
                    this.tabBilling = false;
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                    //for billing tab if inventory locations allocated
                    if (this.ddlDeptLst.length > 1) {
                        this.tabBilling = true;
                        //this.tab = true;
                    }
                    return;
                }
                else if (statusCode == AtparStatusCodes.INV_NOT_MNGD_IN_ATPAR) {
                    this.tab = true;
                    this.tabBilling = true;
                    this.tabReplenishment = false;
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Inventory is not managed in @Par for the department(s)" });
                    return;
                } else if (statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.tab = false;
                    this.tabBilling = false;
                    this.tabReplenishment = false;
                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
                    return;
                }
            }
            else if (this.activeTab.toString() == Process_Type[Process_Type.Billing].toString()) {
                this.lstAlertsData = JSON.parse(localStorage.getItem("tempAlertsData"));
                if (this.lstAlertsData != null && this.lstAlertsData != undefined && this.lstAlertsData.length > 0) {
                    this.schdAlerts = [];
                    this.schdAlerts = this.lstAlertsData;
                }
                this.lstRepSorceData = JSON.parse(localStorage.getItem("tempRepData"));
                if (this.lstRepSorceData != null && this.lstRepSorceData != undefined && this.lstRepSorceData.length > 0) {
                    this.parRepProcessScheduleLst = [];
                    this.parRepProcessScheduleLst = this.lstRepSorceData;
                }

                this.lstAssignLocData = JSON.parse(localStorage.getItem("tempLocationData"));
                if (this.lstAssignLocData != null && this.lstAssignLocData != undefined && this.lstAssignLocData.length > 0) {
                    this.assignLocationLst = [];
                    this.assignLocationLst = this.lstAssignLocData;
                }
                this.tabEvent = true;
                this.txtCartId = "";
                //this.isEditMode = false;
                this.blnEnable = true;
                //this.tabBilling = true;
                this.tabReplenishment = false;
                statusCode = await this.populateData(Process_Type[Process_Type.Billing].toString());
                if (this.parBillProcessScheduleLst != null && this.parBillProcessScheduleLst.length > 0) {
                    this.tabBilling = true;
                }
                if (statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.tab = false;
                    this.tabReplenishment = false
                    this.tabBilling = false;
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                    return;
                } else if (statusCode == AtparStatusCodes.BILNG_NOT_MNGD_IN_ATPAR) {
                    this.tab = true;
                    this.tabBilling = false;
                    this.tabReplenishment = false;
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing is not managed in @Par for the department(s)" });
                    return;
                } else if (statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.tab = false;
                    this.tabBilling = false;
                    this.tabReplenishment = false;
                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
                    return;
                }
            }
            else if (this.activeTab.toString() == Process_Type[Process_Type.Alerts].toString()) {
                
                this.tabEvent = true;
                this.txtCartId = "";
                this.blnEnable = true;
                // this.isEditMode = false;
                this.tabBilling = false;
                this.tabReplenishment = false;
                this.tabAlert = false;
                this.lstBillingData = JSON.parse(localStorage.getItem("tempBillData"));
                if (this.lstBillingData != null && this.lstBillingData != undefined && this.lstBillingData.length > 0) {
                    this.parBillProcessScheduleLst = [];
                    this.parBillProcessScheduleLst = this.lstBillingData;
                }
                this.lstRepSorceData = JSON.parse(localStorage.getItem("tempRepData"));
                if (this.lstRepSorceData != null && this.lstRepSorceData != undefined && this.lstRepSorceData.length > 0) {
                    this.parRepProcessScheduleLst = [];
                    this.parRepProcessScheduleLst = this.lstRepSorceData;
                }
                this.lstAssignLocData = JSON.parse(localStorage.getItem("tempLocationData"));
                if (this.lstAssignLocData != null && this.lstAssignLocData != undefined && this.lstAssignLocData.length > 0) {
                    this.assignLocationLst = [];
                    this.assignLocationLst = this.lstAssignLocData;
                }
                statusCode = await this.populateData(Process_Type[Process_Type.Alerts].toString());
                if (this.schdAlerts != null && this.schdAlerts.length > 0) {
                    this.tabAlert = true;
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    rdbtnBillingOptionChanged(parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                if (event == 1) {
                    parameterLst.blnBillScheduleId = false;
                    parameterLst.chkBillOption = false;
                    parameterLst.BILLING_OPTION = 1;
                } else if (event == 2) {
                    parameterLst.blnBillScheduleId = true;
                    parameterLst.chkBillOption = true;
                    parameterLst.BILLING_OPTION = 2;
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    chkBoxReviewChargeChanged(parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                if (event) {
                    parameterLst.REVIEW_CHARGES = "Y";
                    parameterLst.BlnReviewChargeValue = event;
                } else {
                    parameterLst.REVIEW_CHARGES = "N";
                    parameterLst.BlnReviewChargeValue = event;
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ddlBillScheduleIdChanged(parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                parameterLst.SCHEDULE_ID = event.value;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    billingChkboxChanged(lstData, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                if (event) {
                    lstData.CHK_VALUE = event;
                } else {
                    lstData.CHK_VALUE = event;
                    lstData.SCHEDULE_ID = "";
                    lstData.REVIEW_CHARGES = "N";
                    lstData.BILLING_OPTION = 0;
                    lstData.BlnReviewChargeValue = false;
                    //this.reviewChargesValue = false;
                }

            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    selectAllBillingLst() {
        this.statusMsgs = [];
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.lstgridfilterData[i].BILLING_ENABLE == YesNo_Enum[YesNo_Enum.Y].toString() || this.lstgridfilterData[i].BILLING_ENABLE == "" || this.lstgridfilterData[i].BILLING_ENABLE == undefined) {
                        this.lstgridfilterData[i].CHK_VALUE = true;
                    }
                }
            }
            else {
                if (this.EndIndex > this.parBillProcessScheduleLst.length) {
                    this.EndIndex = this.parBillProcessScheduleLst.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.parBillProcessScheduleLst[i].BILLING_ENABLE == YesNo_Enum[YesNo_Enum.Y].toString() || this.parBillProcessScheduleLst[i].BILLING_ENABLE == "" || this.parBillProcessScheduleLst[i].BILLING_ENABLE == undefined) {
                        this.parBillProcessScheduleLst[i].CHK_VALUE = true;
                    }
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    unSelectAllBillingLst() {
        try {
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {

                    if (this.lstgridfilterData[i].BILLING_ENABLE == YesNo_Enum[YesNo_Enum.Y].toString() || this.lstgridfilterData[i].BILLING_ENABLE == "" || this.lstgridfilterData[i].BILLING_ENABLE == undefined) {
                        this.lstgridfilterData[i].CHK_VALUE = false;
                    }
                }
            }
            else {
                if (this.EndIndex > this.parBillProcessScheduleLst.length) {
                    this.EndIndex = this.parBillProcessScheduleLst.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    if (this.parBillProcessScheduleLst[i].BILLING_ENABLE == YesNo_Enum[YesNo_Enum.Y].toString() || this.parBillProcessScheduleLst[i].BILLING_ENABLE == "" || this.parBillProcessScheduleLst[i].BILLING_ENABLE == undefined) {
                        this.parBillProcessScheduleLst[i].CHK_VALUE = false;
                        this.parBillProcessScheduleLst[i].SCHEDULE_ID = 'Select One';
                        this.parBillProcessScheduleLst[i].BILLING_OPTION = null;
                        this.parBillProcessScheduleLst[i].BlnReviewChargeValue = false;
                    }
                }

            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    filterBillData(event) {
        this.statusMsgs = [];
        this.lstgridfilterData = new Array<MT_POU_PAR_LOC_PROCESS_SCHEDULE>();
        this.lstgridfilterData = event;
    }

    async btnBillSubmit_Click() {
        this.statusMsgs = [];
        let statusCode: number = -1;
        let strBunit: string = "";
        let intReplenishFrom: number = 0;
        try {
            // txtCartId.Enabled = true;
            this.blnEnable = false;
            for (let i = 0; i < this.parBillProcessScheduleLst.length; i++) {
                if (this.parBillProcessScheduleLst[i].CHK_VALUE == true) {
                    if ((this.parBillProcessScheduleLst[i].SCHEDULE_ID == "Select One" || this.parBillProcessScheduleLst[i].SCHEDULE_ID == "" ||
                        this.parBillProcessScheduleLst[i].SCHEDULE_ID == null) && this.parBillProcessScheduleLst[i].blnBillScheduleId == true) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Schedule" });
                        return;
                    } else if (this.parBillProcessScheduleLst[i].BILLING_OPTION != 2 && this.parBillProcessScheduleLst[i].BILLING_OPTION != 1) {//& rdbBatch.Checked == false                       
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Option" });
                        return;
                    }
                } else {
                    if (this.parBillProcessScheduleLst[i].CHK_VALUE != true) {
                        if ((this.parBillProcessScheduleLst[i].SCHEDULE_ID != "Select One" &&
                            this.parBillProcessScheduleLst[i].SCHEDULE_ID != null && this.parBillProcessScheduleLst[i].SCHEDULE_ID != "") &&
                            this.parBillProcessScheduleLst[i].blnBillScheduleId == true) {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Department" });
                            return;
                        } else if (this.parBillProcessScheduleLst[i].BILLING_OPTION == 2 || this.parBillProcessScheduleLst[i].BILLING_OPTION == 1 ||
                            this.parBillProcessScheduleLst[i].BlnReviewChargeValue == true) {//this.reviewChargesValue == true
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Department" });
                            return;
                        }
                    }
                }
            }
            statusCode = await this.billing_UpdatedLst();
            if (statusCode != AtparStatusCodes.ATPAR_OK) {
                if (statusCode == AtparStatusCodes.E_INVALIDPARAMETER) {
                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Please Select Invenorty Management/Materials Schedule" });
                } else {
                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
                }
                return;
            }
            var dicAssignSchedule = { 'lstParLocProcessSchedules': this.parBillProcessScheduleLst, 'lstPouReplanLocation': null };   //this.replenSourecLocationLst         
            this.spnrService.start();
            await this.processParmService.assignScheduleToCarts(dicAssignSchedule, this.selectedOrgId, this.intAppId, this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<number>;
                    this.spnrService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully." });
                            this.clearFields();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ddlLowStockSchedIdChanged(parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                parameterLst.LOW_STK_SCHEDULE_ID = event.value;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ddlExpSchedIdChanged(parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                parameterLst.EXP_SCHEDULE_ID = event.value;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ddlRecallSchedIdChanged(parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                parameterLst.RECALL_SCHEDULE_ID = event.value;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ddlBillOnlySchedIdChanged(parameterLst, event) {
        try {
            this.statusMsgs = [];
            if (event != null && event != undefined) {
                parameterLst.BILLONLY_SCHEDULE_ID = event.value;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    selectAllAlertLst() {
        try {
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstschdalertsgridfilterData != null && this.lstschdalertsgridfilterData != undefined) {

                if (this.EndIndex > this.lstschdalertsgridfilterData.length) {
                    this.EndIndex = this.lstschdalertsgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstschdalertsgridfilterData[i].CHK_VALUE = true;
                }
            }
            else {
                if (this.EndIndex > this.schdAlerts.length) {
                    this.EndIndex = this.schdAlerts.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.schdAlerts[i].CHK_VALUE = true;
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    unSelectAllAlertLst() {
        try {
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstschdalertsgridfilterData != null && this.lstschdalertsgridfilterData != undefined) {

                if (this.EndIndex > this.lstschdalertsgridfilterData.length) {
                    this.EndIndex = this.lstschdalertsgridfilterData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstschdalertsgridfilterData[i].CHK_VALUE = false;
                    this.lstschdalertsgridfilterData[i].LOW_STK_SCHEDULE_ID = "";
                    this.lstschdalertsgridfilterData[i].RECALL_SCHEDULE_ID = "";
                    this.lstschdalertsgridfilterData[i].EXP_SCHEDULE_ID = "";
                    this.lstschdalertsgridfilterData[i].BILLONLY_SCHEDULE_ID = "";
                }
            }
            else {
                if (this.EndIndex > this.schdAlerts.length) {
                    this.EndIndex = this.schdAlerts.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.schdAlerts[i].CHK_VALUE = false;
                    this.schdAlerts[i].LOW_STK_SCHEDULE_ID = "";
                    this.schdAlerts[i].RECALL_SCHEDULE_ID = "";
                    this.schdAlerts[i].EXP_SCHEDULE_ID = "";
                    this.schdAlerts[i].BILLONLY_SCHEDULE_ID = "";
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    filterAlertsData(event) {
        this.statusMsgs = [];
        this.lstschdalertsgridfilterData = new Array<MT_POU_PAR_LOC_PROCESS_SCHEDULE>();
        this.lstschdalertsgridfilterData = event;
    }

    alertChkboxChanged(lstData, event) {
        try {
            this.statusMsgs = [];
            if (event != null && event != undefined) {
                if (event) {
                    lstData.CHK_VALUE = event;
                } else {
                    lstData.CHK_VALUE = event;
                    lstData.LOW_STK_SCHEDULE_ID = "";
                    lstData.RECALL_SCHEDULE_ID = "";
                    lstData.EXP_SCHEDULE_ID = "";
                    lstData.BILLONLY_SCHEDULE_ID = "";
                }

            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async btnAlertSubmit_Click() {
        this.statusMsgs = [];
        let statusCode: number = -1;
        let strBunit: string = "";
        try {//txtCartId.Enabled = true;
            for (let i = 0; i < this.schdAlerts.length; i++) {
                if (this.schdAlerts[i].CHK_VALUE == true) {
                    if ((this.schdAlerts[i].LOW_STK_SCHEDULE_ID == null || this.schdAlerts[i].LOW_STK_SCHEDULE_ID == "" ||
                        this.schdAlerts[i].LOW_STK_SCHEDULE_ID == "Select One") &&
                        (this.schdAlerts[i].EXP_SCHEDULE_ID == null || this.schdAlerts[i].EXP_SCHEDULE_ID == "" ||
                            this.schdAlerts[i].EXP_SCHEDULE_ID == "Select One") &&
                        (this.schdAlerts[i].RECALL_SCHEDULE_ID == null || this.schdAlerts[i].RECALL_SCHEDULE_ID == "" ||
                            this.schdAlerts[i].RECALL_SCHEDULE_ID == "Select One") &&
                        (this.schdAlerts[i].BILLONLY_SCHEDULE_ID == null || this.schdAlerts[i].BILLONLY_SCHEDULE_ID == "" ||
                            this.schdAlerts[i].BILLONLY_SCHEDULE_ID == "Select One")) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Schedule" });
                        return;
                    }
                }
                else {
                    if ((this.schdAlerts[i].LOW_STK_SCHEDULE_ID != null && this.schdAlerts[i].LOW_STK_SCHEDULE_ID != "" &&
                        this.schdAlerts[i].LOW_STK_SCHEDULE_ID != "Select One") ||
                        (this.schdAlerts[i].EXP_SCHEDULE_ID != null && this.schdAlerts[i].EXP_SCHEDULE_ID != "" &&
                            this.schdAlerts[i].EXP_SCHEDULE_ID != "Select One") ||
                        (this.schdAlerts[i].RECALL_SCHEDULE_ID != null && this.schdAlerts[i].RECALL_SCHEDULE_ID != "" &&
                            this.schdAlerts[i].RECALL_SCHEDULE_ID != "Select One") ||
                        (this.schdAlerts[i].BILLONLY_SCHEDULE_ID != null && this.schdAlerts[i].BILLONLY_SCHEDULE_ID != "" &&
                            this.schdAlerts[i].BILLONLY_SCHEDULE_ID != "Select One")) {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Department" });
                        return;
                    }
                }

            }

            this.spnrService.start();
            await this.processParmService.assignAlertSchedules(this.schdAlerts, this.intAppId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<number>;
                    this.spnrService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully." });
                            this.clearFields();
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async onClickLnkbtnAssignLoc(selectedRowData: MT_POU_PAR_LOC_PROCESS_SCHEDULE) {
        this.statusMsgs = [];
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Locations';
            this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.selectedRowReplenishment = selectedRowData;
            if (selectedRowData.REPLENISH_FROM.toString() == "1") {
                this.form = true;
                this.editform = false;
                this.page = false;
                this.tab = false;
                this.lblOrgGrpId = "";
                this.lblLocGrpId = "";
                this.txtLocation = "";

                this.ddlDisplaySelectAllLst = [];
                this.ddlDisplaySelectAllLst.push({ label: "All", value: "ALL" });
                this.ddlDisplaySelectAllLst.push({ label: "Allocated", value: "ALLOC" });
                this.ddlDisplaySelectAllLst.push({ label: "Unallocated", value: "UA" });

                this.lblOrgGrpId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toString();
                this.lblLocGrpId = selectedRowData.ID;
                this.intValue = selectedRowData.ROW_INDEX;
                this.blnAssignLoc = true;
                this.spnrService.start();
                //  if (this.assignLocationOrgIdLst == null && this.assignLocationOrgIdLst.length <= 0) {
                await this.commonService.getOrgGroupBUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.lblOrgGrpId, BusinessType[BusinessType.AllBunits].toString()).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<string>;
                        this.assignLocationOrgIdLst = res.json().DataList;
                        this.spnrService.stop();
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.ddlAssignLocationOrgIdLst = [];
                                this.ddlAssignLocationOrgIdLst.push({ label: "Select Org ID", value: "Select Org ID" });
                                if (this.assignLocationOrgIdLst.length > 0) {
                                    for (var i = 0; i <= this.assignLocationOrgIdLst.length - 1; i++) {
                                        this.ddlAssignLocationOrgIdLst.push({ label: this.assignLocationOrgIdLst[i].toString(), value: this.assignLocationOrgIdLst[i].toString() });
                                    }
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    });
                this.spnrService.stop();

                // this.txtLocation = selectedRowData.ID;
                if (selectedRowData.SOURCELOCATIONS == null || selectedRowData.SOURCELOCATIONS == undefined) {
                    this.ddlDisplaySelectValue = "ALL";
                }

                else if (selectedRowData.SOURCELOCATIONS != "" && selectedRowData.SOURCELOCATIONS != null && selectedRowData.SOURCELOCATIONS.length > 0 && selectedRowData.SOURCELOCATIONS != undefined) {
                    this.ddlDisplaySelectValue = "ALLOC";
                    await this.btnAssignLocationGo();
                    if (this.dtAllocTable == null || this.dtAllocTable.length == 0) {
                        this.ddlDisplaySelectValue = "ALL";
                    }
                }
                //}
                //else { this.assignLocationOrgIdLst;}
            }
            else {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Source Locations can be allocated when Replenish From is Par Locations." });
                return;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async btnAssignLocationGo() {
        try {
            this.statusMsgs = [];

            let ddlSelectedOrgId: string = "";
            if (this.ddlSelectedAsgnLocOrgId == "Select Org Id" || this.ddlSelectedAsgnLocOrgId == "") {
                ddlSelectedOrgId = "";
            } else {
                ddlSelectedOrgId = this.ddlSelectedAsgnLocOrgId.toUpperCase();
            }

            let strLoc: string = "";
            if (this.txtLocation != "") {
                strLoc = this.txtLocation.toUpperCase();
                this.strLocation = this.txtLocation.trim();
            } else {
                strLoc = "";
            }
            let data = null;
            let statusCode: number;
            this.spnrService.start();
            await this.processParmService.getAssignedLocationDetails(ddlSelectedOrgId, strLoc, this.selectedOrgId, this.lblLocGrpId, this.lblOrgGrpId).
                catch(this.httpService.handleError).then((res: Response) => {
                    data = res.json() as AtParWebApiResponse<VM_MT_POU_ASSIGN_LOCATIONS>;
                    this.assignLocationLst = data.DataList;
                    localStorage.setItem("tempLocationData", JSON.stringify(this.assignLocationLst));
                    this.assignLocationLsttest = data.DataList;
                    statusCode = data.StatusCode;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            break;
                        }
                        case StatusType.Warn: {
                            this.setValues();
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.setValues();
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.setValues();
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

            //if (this.selectedRowReplenishment != null && this.selectedRowReplenishment.SOURCELOCATIONS != null && this.selectedRowReplenishment.SOURCELOCATIONS != "") {
            //    this.dsTemp = [];
            //    let sourceLocsplit = this.selectedRowReplenishment.SOURCELOCATIONS.split(', ');
            //    if (sourceLocsplit != null && sourceLocsplit.length > 0) {
            //        for (let x = 0; x < sourceLocsplit.length; x++) {
            //            if (sourceLocsplit[x].toString() != "") {
            //                let sourcelocation = this.assignLocationLst.filter(s => s.LOCATION == sourceLocsplit[x].toString() && s.PAR_LOC_ID == this.lblLocGrpId);//&& s.BUSINESS_UNIT == this.selectedOrgId);
            //                if (sourcelocation != null && sourcelocation.length > 0) {
            //                    for (let y = 0; y < sourcelocation.length; y++) {
            //                        sourcelocation[y].CHK_VALUE = 1;
            //                        this.dsTemp.push(sourcelocation[y]);
            //                    }

            //                }
            //            }

            //        }
            //    }

            //}

            if (this.dsTemp != null && this.dsTemp.length > 0) {
                let rows: VM_MT_POU_ASSIGN_LOCATIONS[];
                rows = this.dsTemp.filter(x => x.M_LOCATION == this.lblLocGrpId && x.M_BUSINESS_UNIT == this.selectedOrgId);
                if (rows != null && rows.length > 0 && this.assignLocationLst.length > 0) {
                    for (let intCnt = 0; intCnt < this.assignLocationLst.length; intCnt++) {
                        this.assignLocationLst[intCnt].CHK_ALLOCATED = 0;
                        this.assignLocationLst[intCnt].CHK_VALUE = 0;
                        this.assignLocationLst[intCnt].PERFORM_ACTION = 0;
                        this.assignLocationLst[intCnt].M_BUSINESS_UNIT = this.selectedOrgId;
                        this.assignLocationLst[intCnt].M_LOCATION = this.lblLocGrpId;
                    }
                    for (let i = 0; i < rows.length; i++) {
                        if (this.assignLocationLst != null) {
                            //for (let intCnt = 0; intCnt < this.assignLocationLst.length; intCnt++) {
                            let testList = this.assignLocationLst.filter(x => x.BUSINESS_UNIT.toUpperCase() == rows[i].BUSINESS_UNIT.toUpperCase() && x.LOCATION.toUpperCase() == rows[i].LOCATION.toUpperCase());
                            if (testList != undefined && testList.length > 0) {
                                // if (this.assignLocationLst[intCnt].BUSINESS_UNIT.toUpperCase() == rows[i].BUSINESS_UNIT.toUpperCase() &&
                                //  this.assignLocationLst[intCnt].LOCATION.toUpperCase() == rows[i].LOCATION.toUpperCase()) {
                                for (let z = 0; z < testList.length; z++) {
                                    if (rows[i].PERFORM_ACTION == 2) {
                                        testList[z].CHK_ALLOCATED = 0;
                                        testList[z].CHK_VALUE = 0;
                                        testList[z].PERFORM_ACTION = 2;
                                        //this.assignLocationLst[intCnt].CHK_ALLOCATED = 0;
                                        //this.assignLocationLst[intCnt].CHK_VALUE = 0;
                                        //this.assignLocationLst[intCnt].PERFORM_ACTION = 2;
                                    }
                                    else {
                                        //this.assignLocationLst[intCnt].CHK_ALLOCATED = 1;
                                        //this.assignLocationLst[intCnt].CHK_VALUE = 1;
                                        //this.assignLocationLst[intCnt].PERFORM_ACTION = 0;
                                        testList[z].CHK_ALLOCATED = 1;
                                        testList[z].CHK_VALUE = 1;
                                        testList[z].PERFORM_ACTION = 0;
                                    }
                                }
                                //}
                            }
                            //}
                        }
                    }
                }
                else {
                    if (this.dsLocDetailsDeleted != null) {
                        rows = this.dsLocDetailsDeleted.filter(x => x.M_LOCATION == this.lblLocGrpId && x.M_BUSINESS_UNIT == this.selectedOrgId);
                        if (rows.length > 0) {
                            for (let intCnt = 0; intCnt < this.assignLocationLst.length; intCnt++) {
                                this.assignLocationLst[intCnt].CHK_ALLOCATED = 0;
                                this.assignLocationLst[intCnt].CHK_VALUE = 0;
                                this.assignLocationLst[intCnt].PERFORM_ACTION = 0;
                            }

                            for (let i = 0; i < rows.length; i++) {

                                if (this.assignLocationLst != null) {
                                    for (let intCnt = 0; intCnt < this.assignLocationLst.length; intCnt++) {
                                        if (this.assignLocationLst[intCnt].BUSINESS_UNIT.toUpperCase() == rows[i].BUSINESS_UNIT.toUpperCase() &&
                                            this.assignLocationLst[intCnt].LOCATION.toUpperCase() == rows[i].LOCATION.toUpperCase()) {
                                            this.assignLocationLst[intCnt].CHK_ALLOCATED = 1;
                                            this.assignLocationLst[intCnt].CHK_VALUE = 0;
                                            this.assignLocationLst[intCnt].PERFORM_ACTION = 2;
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }

            if (statusCode == AtparStatusCodes.ATPAR_OK) {
                if (this.assignLocationLst != null) {
                    if (this.assignLocationLst.length > 0) {
                        this.dtAllocTable = [];
                        this.dtUnAllocTable = [];
                        for (let intCntrows = 0; intCntrows < this.assignLocationLst.length; intCntrows++) {
                            let mt_pouAssign_Location = new VM_MT_POU_ASSIGN_LOCATIONS();
                            this.assignLocationLst[intCntrows].M_BUSINESS_UNIT = this.selectedOrgId;
                            this.assignLocationLst[intCntrows].M_LOCATION = this.lblLocGrpId;
                            mt_pouAssign_Location.BUSINESS_UNIT = this.assignLocationLst[intCntrows].BUSINESS_UNIT;
                            mt_pouAssign_Location.CHK_ALLOCATED = this.assignLocationLst[intCntrows].CHK_ALLOCATED;
                            mt_pouAssign_Location.CHK_VALUE = this.assignLocationLst[intCntrows].CHK_VALUE;
                            mt_pouAssign_Location.LOCATION = this.assignLocationLst[intCntrows].LOCATION;
                            mt_pouAssign_Location.LOCATION_DESCR = this.assignLocationLst[intCntrows].LOCATION_DESCR;
                            mt_pouAssign_Location.PERFORM_ACTION = this.assignLocationLst[intCntrows].PERFORM_ACTION;
                            mt_pouAssign_Location.ROWINDEX = this.assignLocationLst[intCntrows].ROWINDEX;
                            mt_pouAssign_Location.TYPE = this.assignLocationLst[intCntrows].TYPE;
                            mt_pouAssign_Location.M_BUSINESS_UNIT = this.selectedOrgId;
                            mt_pouAssign_Location.M_LOCATION = this.lblLocGrpId;

                            if (this.assignLocationLst[intCntrows].CHK_VALUE == 1) {
                                this.dtAllocTable.push(mt_pouAssign_Location);

                                if (this.dsTemp != null) {
                                    var drows = this.dsTemp.filter(x => x.M_LOCATION == this.lblLocGrpId && x.M_BUSINESS_UNIT == this.selectedOrgId && x.LOCATION == mt_pouAssign_Location.LOCATION);
                                    if (drows != null && drows.length == 0) {
                                        this.dsTemp.push(mt_pouAssign_Location);
                                    }
                                }
                                // this.dsTemp = this.dtAllocTable;
                            } else if (this.assignLocationLst[intCntrows].CHK_VALUE == 0) {
                                this.dtUnAllocTable.push(mt_pouAssign_Location);
                            }
                        }
                        if ((this.dtAllocTable != null) && (this.dsTemp == null || this.dsTemp == undefined || this.dsTemp.length == 0)) {
                            this.srcLocationsOnLoad = this.dtAllocTable;
                            for (let index = 0; index < this.srcLocationsOnLoad.length; index++) {
                                this.srcLocationsOnLoad[index].ROW_INDEX = this.intValue;
                                this.srcLocationsOnLoad[index].M_BUSINESS_UNIT = this.selectedOrgId;
                                this.srcLocationsOnLoad[index].M_LOCATION = this.lblLocGrpId;
                                this.srcLocationsOnLoad[index].ORG_GROUP_ID = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toString();
                            }
                            this.dsTemp = this.srcLocationsOnLoad;
                        }
                    }
                }

                //Session["UnAllocDS"] = dtUnAllocTable;
                if (this.ddlDisplaySelectValue == "ALLOC") {
                    if (this.dtAllocTable.length > 0) {
                        this.table = true;
                        // Session["AllocDS"] = dtAllocTable;
                        this.bindDataGrid();

                    }
                    else {
                        this.table = false;
                        if (this.blnAssignLoc == false) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                        }
                        this.blnAssignLoc = true;
                    }
                }
                if (this.ddlDisplaySelectValue == "UA") {
                    if (this.dtUnAllocTable.length > 0) {
                        this.table = true;
                        //Session["UnAllocDS"] = dtUnAllocTable;

                        this.bindDataGrid();
                    }
                    else {
                        this.table = false;
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    }
                }

                //For Sorting Begins ENDS
                if (this.ddlDisplaySelectValue == "ALL") {
                    if (this.assignLocationLst != null) {
                        if (this.assignLocationLst.length > 0) {
                            this.table = true;

                            //Session["AllocDS"] = dtAllocTable;
                            //Session["UnAllocDS"] = dtUnAllocTable;
                            this.bindDataGrid();
                        }
                    }
                }


            }

            this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex.toString());
        }
    }

    async btnAssignLocs_Click() {
        this.statusMsgs = [];
        try {

            //if (this.assignLocationLsttest.length > 0) {
            //    for (let i = 0; i < this.assignLocationLsttest.length; i++) {
            //        this.assignLocationLsttest[i].M_LOCATION = this.assignLocationLsttest[i].LOCATION;
            //        this.assignLocationLsttest[i].M_BUSINESS_UNIT = this.assignLocationLsttest[i].BUSINESS_UNIT;
            //        if (this.assignLocationLsttest[i].CHK_VALUE == 1 && this.assignLocationLsttest[i].CHK_ALLOCATED == 0) {
            //            this.assignLocationLsttest[i].PERFORM_ACTION = 1;
            //        }
            //        else if (this.assignLocationLsttest[i].CHK_VALUE == 0 && this.assignLocationLsttest[i].CHK_ALLOCATED == 1) {
            //            this.assignLocationLsttest[i].PERFORM_ACTION = 2;
            //        }
            //        else {
            //            this.assignLocationLsttest[i].PERFORM_ACTION = 0;
            //        }
            //    }
            //}

            //if (this.assignLocationLst.length > 0) {
            //    for (let i = 0; i < this.assignLocationLst.length; i++) {
            //        this.assignLocationLst[i].M_LOCATION = this.assignLocationLst[i].LOCATION;
            //        this.assignLocationLst[i].M_BUSINESS_UNIT = this.assignLocationLst[i].BUSINESS_UNIT;
            //        if (this.assignLocationLst[i].CHK_VALUE == 1 && this.assignLocationLst[i].CHK_ALLOCATED == 0) {
            //            this.assignLocationLst[i].PERFORM_ACTION = 1;
            //        }
            //        else if (this.assignLocationLst[i].CHK_VALUE == 0 && this.assignLocationLst[i].CHK_ALLOCATED == 1) {
            //            this.assignLocationLst[i].PERFORM_ACTION = 2;
            //        }
            //        else {
            //            this.assignLocationLst[i].PERFORM_ACTION = 0;
            //        }
            //    }
            //}

            this.table = false;
            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully." });

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    assignLocChkboxChanged(lstData, event) {
        try {
            this.statusMsgs = [];
            if (event != null && event != undefined) {

                if (event == true) {
                    lstData.CHK_VALUE = 1;
                } else {
                    lstData.CHK_VALUE = 0;
                }

                let tempList = asEnumerable(this.dsTemp).Where(x => x.BUSINESS_UNIT == lstData.BUSINESS_UNIT && x.LOCATION == lstData.LOCATION && x.M_LOCATION == lstData.M_LOCATION && x.M_BUSINESS_UNIT == lstData.M_BUSINESS_UNIT).ToArray();
                if (tempList != null && tempList.length > 0) {

                    for (let k = 0; k < tempList.length; k++) {
                        if (event == false) {
                            tempList[k].CHK_VALUE = 0;
                        }
                        else { tempList[k].CHK_VALUE = 1; }
                    }

                    if (lstData.CHK_VALUE == 1 && lstData.CHK_ALLOCATED == 0) {
                        tempList[0].PERFORM_ACTION = 1;
                    }
                    else if (lstData.CHK_VALUE == 0 && lstData.CHK_ALLOCATED == 1) {
                        for (let k = 0; k < tempList.length; k++) {
                            if (tempList[k].CHK_VALUE == 0) {
                                tempList[k].PERFORM_ACTION = 2;
                                tempList[k].M_BUSINESS_UNIT = this.selectedOrgId;
                                tempList[k].M_LOCATION = this.lblLocGrpId;
                            }
                        }

                    }
                    else {
                        tempList[0].PERFORM_ACTION = 0;
                    }
                } else {

                    lstData.PERFORM_ACTION = 0;
                    lstData.M_BUSINESS_UNIT = this.selectedOrgId;
                    lstData.M_LOCATION = this.lblLocGrpId;
                    this.dsTemp.push(lstData);
                }
                //  this.dsTemp = this.dsTemp.filter(x => x.CHK_VALUE==1);
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    selectAllAssignLocLst() {
        try {
            this.statusMsgs = [];

            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstAssignLocfilterData != null && this.lstAssignLocfilterData != undefined) {

                if (this.EndIndex > this.lstAssignLocfilterData.length) {
                    this.EndIndex = this.lstAssignLocfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.selectedRowReplenishment != null) {
                        if (this.selectedRowReplenishment.ID == this.lstAssignLocfilterData[i].LOCATION) {
                        } else {
                            this.lstAssignLocfilterData[i].CHK_VALUE = true;
                        }
                    } else {
                        this.lstAssignLocfilterData[i].CHK_VALUE = true;
                    }
                    this.lstAssignLocfilterData[i].M_LOCATION = this.lblLocGrpId;
                    this.lstAssignLocfilterData[i].M_BUSINESS_UNIT = this.selectedOrgId;
                    this.lstAssignLocfilterData[i].CHK_ALLOCATED = 1;
                    this.dsTemp.push(this.lstAssignLocfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.assignLocationLst.length) {
                    this.EndIndex = this.assignLocationLst.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.selectedRowReplenishment != null) {
                        if (this.selectedRowReplenishment.ID == this.assignLocationLst[i].LOCATION) {
                            continue;
                        } else {
                            this.assignLocationLst[i].CHK_VALUE = 1;
                        }
                    } else {
                        this.assignLocationLst[i].CHK_VALUE = 1;
                    }
                    this.assignLocationLst[i].M_LOCATION = this.lblLocGrpId;
                    this.assignLocationLst[i].M_BUSINESS_UNIT = this.selectedOrgId;
                    this.assignLocationLst[i].CHK_ALLOCATED = 1;
                    this.dsTemp.push(this.assignLocationLst[i]);
                }

            }
            //  this.dsTemp = this.dsTemp.filter(x => x.CHK_VALUE == 1);

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    unSelectAllAssignLocLst() {
        try {
            this.statusMsgs = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstAssignLocfilterData != null && this.lstAssignLocfilterData != undefined) {

                if (this.EndIndex > this.lstAssignLocfilterData.length) {
                    this.EndIndex = this.lstAssignLocfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstAssignLocfilterData[i].CHK_VALUE = 0;
                    this.lstAssignLocfilterData[i].M_LOCATION = this.lblLocGrpId;
                    this.lstAssignLocfilterData[i].M_BUSINESS_UNIT = this.selectedOrgId;
                    this.lstAssignLocfilterData[i].CHK_ALLOCATED = 1;

                    let tempList = asEnumerable(this.dsTemp).Where(x => x.BUSINESS_UNIT == this.lstAssignLocfilterData[i].BUSINESS_UNIT && x.LOCATION == this.lstAssignLocfilterData[i].LOCATION && x.M_LOCATION == this.lstAssignLocfilterData[i].M_LOCATION && x.M_BUSINESS_UNIT == this.lstAssignLocfilterData[i].M_BUSINESS_UNIT).ToArray();
                    if (tempList != null && tempList.length > 0) {

                        for (let k = 0; k < tempList.length; k++) {
                            tempList[k].CHK_VALUE = 0;
                        }

                        if (this.lstAssignLocfilterData[i].CHK_VALUE == 1 && this.lstAssignLocfilterData[i].CHK_ALLOCATED == 0) {
                            tempList[0].PERFORM_ACTION = 1;
                        }
                        else if (this.lstAssignLocfilterData[i].CHK_VALUE == 0 && this.lstAssignLocfilterData[i].CHK_ALLOCATED == 1) {
                            for (let k = 0; k < tempList.length; k++) {
                                if (tempList[k].CHK_VALUE == 0) {
                                    tempList[k].PERFORM_ACTION = 2;
                                    tempList[k].M_BUSINESS_UNIT = this.selectedOrgId;
                                    tempList[k].M_LOCATION = this.lblLocGrpId;
                                }
                            }
                        }
                        else {
                            tempList[0].PERFORM_ACTION = 0;
                        }
                    } else {
                        this.lstAssignLocfilterData[i].PERFORM_ACTION = 0;
                        this.lstAssignLocfilterData[i].M_BUSINESS_UNIT = this.selectedOrgId;
                        this.lstAssignLocfilterData[i].M_LOCATION = this.lblLocGrpId;
                        this.dsTemp.push(this.lstAssignLocfilterData[i]);
                    }
                    this.dsTemp.push(this.lstAssignLocfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.assignLocationLst.length) {
                    this.EndIndex = this.assignLocationLst.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.assignLocationLst[i].CHK_VALUE = 0;
                    this.assignLocationLst[i].M_LOCATION = this.lblLocGrpId;
                    this.assignLocationLst[i].M_BUSINESS_UNIT = this.selectedOrgId;
                    this.assignLocationLst[i].CHK_ALLOCATED = 1;


                    let tempList = asEnumerable(this.dsTemp).Where(x => x.BUSINESS_UNIT == this.assignLocationLst[i].BUSINESS_UNIT && x.LOCATION == this.assignLocationLst[i].LOCATION && x.M_LOCATION == this.assignLocationLst[i].M_LOCATION && x.M_BUSINESS_UNIT == this.assignLocationLst[i].M_BUSINESS_UNIT).ToArray();
                    if (tempList != null && tempList.length > 0) {

                        for (let k = 0; k < tempList.length; k++) {

                            tempList[k].CHK_VALUE = 0;

                        }

                        if (this.assignLocationLst[i].CHK_VALUE == 1 && this.assignLocationLst[i].CHK_ALLOCATED == 0) {
                            tempList[0].PERFORM_ACTION = 1;
                        }
                        else if (this.assignLocationLst[i].CHK_VALUE == 0 && this.assignLocationLst[i].CHK_ALLOCATED == 1) {
                            for (let k = 0; k < tempList.length; k++) {
                                if (tempList[k].CHK_VALUE == 0) {
                                    tempList[k].PERFORM_ACTION = 2;
                                    tempList[k].M_BUSINESS_UNIT = this.selectedOrgId;
                                    tempList[k].M_LOCATION = this.lblLocGrpId;
                                }
                            }

                        }
                        else {
                            tempList[0].PERFORM_ACTION = 0;
                        }
                    } else {

                        this.assignLocationLst[i].PERFORM_ACTION = 0;
                        this.assignLocationLst[i].M_BUSINESS_UNIT = this.selectedOrgId;
                        this.assignLocationLst[i].M_LOCATION = this.lblLocGrpId;
                        this.dsTemp.push(this.assignLocationLst[i]);
                    }
                }
                //for (let v = 0; v < this.dsTemp.length; v++) {
                //    let testList = this.assignLocationLst.filter(x => x.BUSINESS_UNIT.toUpperCase() == this.dsTemp[v].BUSINESS_UNIT.toUpperCase() && x.LOCATION.toUpperCase() == this.dsTemp[v].LOCATION.toUpperCase());
                //    if (testList != undefined && testList.length > 0) {
                //        if (testList[v].CHK_VALUE == 0) {
                //            this.dsTemp[v].CHK_VALUE = 0;
                //        }
                //    }
                //}
                //   this.dsTemp = this.dsTemp.filter(x => x.CHK_VALUE == 1);
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    filterAssignLocData(event) {
        this.statusMsgs = [];
        this.lstAssignLocfilterData = new Array<VM_MT_POU_ASSIGN_LOCATIONS>();
        this.lstAssignLocfilterData = event;
    }

    ddlAssignLocationOrgIdChanged(data: any) {
        try {
            this.ddlSelectedAsgnLocOrgId = data.value;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    ddlDisplayChanged(data: any) {
        try {
            this.ddlDisplaySelectValue = data.value;
            if (this.ddlDisplaySelectValue == 'ALLOC') {
                this.blnAssignLoc = false;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }


    //Private Methods
    private async populateOrgIds(): Promise<number> {
        try {
            this.statusMsgs = [];
            let data: any;
            data = [];
            //this.spnrService.start();
            await this.commonService.getBusinessUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], BusinessType[BusinessType.Inventory].toString()).
                catch(this.httpService.handleError).then((res: Response) => {
                    data = res.json() as AtParWebApiResponse<string>;
                    this.orgIdLstData = res.json().DataList;
                    this.spnrService.stop();
                    this.ddlOrgIdLst = [];
                    this.ddlOrgIdLst.push({ label: "Select One", value: "Select One" });
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.orgIdLstData.length > 0) {
                                for (var i = 0; i <= this.orgIdLstData.length - 1; i++) {
                                    this.ddlOrgIdLst.push({ label: this.orgIdLstData[i].toString(), value: this.orgIdLstData[i].toString() });
                                }
                            } else {
                                data.StatusCode = AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS;
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spnrService.stop();
            return data.StatusCode;

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private async populateCarts(): Promise<number> {
        try {
            this.statusMsgs = [];
            let _strDept: string = "";
            let strBunit: string = "";

            if (this.selectedDept != "Select One") {
                _strDept = this.selectedDept;
            }
            if (this.selectedOrgId != "Select One") {
                strBunit = this.selectedOrgId;
            }
            let data: any;
            data = [];
            this.deptCartLst = new Array<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>();
            this.deptCartLst = [];
            this.replenSourecLocationLst = [];
            //this.spnrService.start();
            await this.processParmService.getDeptAllocatedCarts(_strDept, this.deviceTokenEntry[TokenEntry_Enum.UserID], strBunit,
                this.txtCartId, this.intAppId).
                catch(this.httpService.handleError).then((res: Response) => {
                    data = res.json() as AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>;
                    this.deptCartLst = res.json().DataDictionary.pouCartWorkAllocationList;
                    this.replenSourecLocationLst = res.json().DataDictionary.pouReplenSourceLocationList;

                    switch (data.StatType) {
                        case StatusType.Success: {
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spnrService.stop();
                            break;
                        }
                    }
                });
            //this.spnrService.stop();
            return data.StatusCode;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private filterParLocation(query, parLocationsLst: any[]): any[] {
        this.statusMsgs = [];
        try {
            let filtered : any[] = [];

            if (query == "%") {
                for (let i = 0; i < parLocationsLst.length; i++) {
                    let parLocationsValue = parLocationsLst[i];
                    filtered.push(parLocationsValue.CART_ID);
                }

            } else {
                if (query.length >= 1) {
                    for (let i = 0; i < parLocationsLst.length; i++) {
                        let parLocationsValue = parLocationsLst[i];
                        if (parLocationsValue.CART_ID.toString().toLowerCase().indexOf(query.toString().toLowerCase()) == 0) {
                            filtered.push(parLocationsValue.CART_ID);
                        }
                    }
                }
            }
            return filtered;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private async populateDepts() {
        try {
            this.statusMsgs = [];
            let _strDept: string = "";
            let strBunit: string = "";

            if (this.selectedDept != "Select One") {
                _strDept = this.selectedDept;
            }
            if (this.selectedOrgId != "Select One") {
                strBunit = this.selectedOrgId;
            }

            //this.spnrService.start();
            await this.processParmService.getAllocDepartment(_strDept, strBunit, this.intAppId).
                catch(this.httpService.handleError).then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>;
                    this.spnrService.stop();
                    this.ddlDeptLst = [];
                    this.ddlDeptLst.push({ label: "Select One", value: "Select One" });
                    if (data.StatusCode == AtparStatusCodes.BILNG_NOT_MNGD_IN_ATPAR) {
                        if (data.DataList.length > 0) {
                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                this.ddlDeptLst.push({ label: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME, value: data.DataList[i].DEPARTMENT_ID });
                            }
                        }
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList.length > 0) {
                                for (var i = 0; i <= data.DataList.length - 1; i++) {
                                    this.ddlDeptLst.push({ label: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME, value: data.DataList[i].DEPARTMENT_ID });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spnrService.stop();
                            // this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            // this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private async populateData(pTabName: string): Promise<number> {
        this.statusMsgs = [];
        let statusCode: number = -1;
        //this.schdAlerts = [];
        //this.parLocProcessScheduleLst = [];

        try {

            let strBunit: string = "";
            let _strCartID: string = "";

            if (pTabName == Process_Type[Process_Type.Replenishment].toString()) {
                // this.spnrService.start();
                if (this.deptCartLst == undefined || this.deptCartLst.length == 0) {
                    statusCode = await this.populateCarts();
                    this.cartStatus = statusCode;
                    if (statusCode != AtparStatusCodes.ATPAR_OK) {
                        return statusCode;
                    }
                }
                else if (this.cartStatus != 0) {
                    if (this.cartStatus != AtparStatusCodes.ATPAR_OK) {
                        return this.cartStatus;
                    }
                }
                if (this.deptCartLst.length > 0) {
                    //grdTable.Visible = true;
                    //TabContainer.Visible = true;
                    strBunit = this.selectedOrgId;
                    _strCartID = this.txtCartId;
                    if (this.parRepProcessScheduleLst == null || this.parRepProcessScheduleLst.length == 0 || this.parRepProcessScheduleLst == undefined) {
                        statusCode = await this.getCartSchedulesData(strBunit, _strCartID, Process_Type.Replenishment.toString(), this.intAppId, this.deviceTokenEntry);
                        if (statusCode != AtparStatusCodes.ATPAR_OK) {
                            return statusCode;
                        }

                        for (let i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                            let _drCartIds: any[] = [];
                            this.parLocProcessScheduleLst[i].OLDREPLENISH_FROM = this.parLocProcessScheduleLst[i].REPLENISH_FROM;
                            this.parLocProcessScheduleLst[i].OLDSOURCELOCATIONS = this.parLocProcessScheduleLst[i].SOURCELOCATIONS;
                            _drCartIds = asEnumerable(this.deptCartLst).Where(x => x.CART_ID == this.parLocProcessScheduleLst[i].ID).ToArray();
                            if (_drCartIds.length == 0) {
                                this.parLocProcessScheduleLst[i].blnSplice = false;
                                //this.parLocProcessScheduleLst.splice(i, 1);
                            }
                        }
                        this.parLocProcessScheduleLst = this.parLocProcessScheduleLst.filter(x => x.blnSplice != false);
                        for (let i = 0; i < this.deptCartLst.length; i++) {
                            let _drCartSourceLocations: any[] = [];

                            _drCartSourceLocations = asEnumerable(this.replenSourecLocationLst).Where(x => (x.PAR_LOC_ID == this.deptCartLst[i].CART_ID) && (x.ORG_ID == this.deptCartLst[i].BUSINESS_UNIT)).ToArray();

                            if (_drCartSourceLocations != null && _drCartSourceLocations.length > 0) {
                                this.deptCartLst[i].SOURCELOCATIONS = "";
                                this.deptCartLst[i].OLDSOURCELOCATIONS = "";
                                for (let j = 0; j < _drCartSourceLocations.length; j++) {
                                    if (_drCartSourceLocations.length - 1 != j) {
                                        this.deptCartLst[i].SOURCELOCATIONS += _drCartSourceLocations[j].SOURCE_LOCATION.toString() + ", ";
                                    } else {
                                        this.deptCartLst[i].SOURCELOCATIONS += _drCartSourceLocations[j].SOURCE_LOCATION.toString();
                                    }
                                }
                                this.deptCartLst[i].OLDSOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS;
                            } else {
                                this.deptCartLst[i].SOURCELOCATIONS = "";
                                this.deptCartLst[i].OLDSOURCELOCATIONS = "";
                            }

                            //if (this.deptCartLst[i].SOURCELOCATIONS != null && this.deptCartLst[i].SOURCELOCATIONS.toString().length > 0) {
                            //    this.deptCartLst[i].SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS.slice(0, this.deptCartLst[i].SOURCELOCATIONS.length - 1);//.toString().trim().replace(",", "").trim();
                            //}

                            if (this.parLocProcessScheduleLst != null && this.parLocProcessScheduleLst.length > 0) {
                                let _drCartSchedules: MT_POU_PAR_LOC_PROCESS_SCHEDULE[] = [];
                                _drCartSchedules = asEnumerable(this.parLocProcessScheduleLst).Where(x => x.ID == this.deptCartLst[i].CART_ID).ToArray();
                                if (_drCartSchedules.length > 0) {
                                    _drCartSchedules[0].ROW_INDEX = i;
                                    _drCartSchedules[0].CHK_VALUE = true;
                                    _drCartSchedules[0].DESCRIPTION = "";
                                    //if (this.deptCartLst[i].SOURCELOCATIONS != "") {
                                    //    this.deptCartLst[i].SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS.substring(0, this.deptCartLst[i].SOURCELOCATIONS.length - 1);
                                    //}
                                    if (this.deptCartLst[i].SOURCELOCATIONS == "" && this.deptCartLst[i].SOURCELOCATIONS == null && this.deptCartLst[i].SOURCELOCATIONS == undefined && this.deptCartLst[i].SOURCELOCATIONS.length == 0) {
                                        
                                    }
                                    else if (this.deptCartLst[i].SOURCELOCATIONS != "" && this.deptCartLst[i].SOURCELOCATIONS != null && this.deptCartLst[i].SOURCELOCATIONS != undefined && this.deptCartLst[i].SOURCELOCATIONS.length > 0) {
                                        this.deptCartLst[i].SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS.replace(/^,/, '');
                                    }
                                    _drCartSchedules[0].SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS;
                                    _drCartSchedules[0].OLDSOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS;
                                } else if (_drCartSchedules.length == 0) {
                                    let parLocProcessSchdEntity: MT_POU_PAR_LOC_PROCESS_SCHEDULE;
                                    parLocProcessSchdEntity = new MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                    parLocProcessSchdEntity.ROW_INDEX = i;
                                    parLocProcessSchdEntity.ORG_ID = this.selectedOrgId;
                                    parLocProcessSchdEntity.ID = this.deptCartLst[i].CART_ID;
                                    parLocProcessSchdEntity.SCHEDULE_ID = "";
                                    parLocProcessSchdEntity.REVIEW_CHARGES = "";
                                    parLocProcessSchdEntity.DESCRIPTION = "";
                                    parLocProcessSchdEntity.CHK_VALUE = false;
                                    parLocProcessSchdEntity.BILLING_OPTION = 5;
                                    parLocProcessSchdEntity.REPLENISH_FROM = "";
                                    parLocProcessSchdEntity.OLDREPLENISH_FROM = "";
                                    parLocProcessSchdEntity.PROCESS_TYPE = Process_Type.Replenishment;
                                    if (this.deptCartLst[i].SOURCELOCATIONS == "" &&this.deptCartLst[i].SOURCELOCATIONS == null && this.deptCartLst[i].SOURCELOCATIONS == undefined && this.deptCartLst[i].SOURCELOCATIONS.length == 0) {

                                    }
                                    else if (this.deptCartLst[i].SOURCELOCATIONS != "" && this.deptCartLst[i].SOURCELOCATIONS != null && this.deptCartLst[i].SOURCELOCATIONS != undefined && this.deptCartLst[i].SOURCELOCATIONS.length > 0) {
                                        this.deptCartLst[i].SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS.replace(/^,/, '');
                                    }
                                    parLocProcessSchdEntity.SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS;
                                    parLocProcessSchdEntity.OLDSOURCELOCATIONS = parLocProcessSchdEntity.SOURCELOCATIONS;
                                    parLocProcessSchdEntity.INV_INTERFACE_ENABLE = this.deptCartLst[i].INV_INTERFACE_ENABLE;
                                    //  parLocProcessSchdEntity.BILLING_ENABLE = this.deptCartLst[i].BILLING_ENABLE;
                                    this.parLocProcessScheduleLst.push(parLocProcessSchdEntity);
                                }
                            } else {
                                let parLocProcessSchdEntity: MT_POU_PAR_LOC_PROCESS_SCHEDULE;
                                parLocProcessSchdEntity = new MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                parLocProcessSchdEntity.ROW_INDEX = i;
                                parLocProcessSchdEntity.ORG_ID = this.selectedOrgId;
                                parLocProcessSchdEntity.ID = this.deptCartLst[i].CART_ID.toString();
                                parLocProcessSchdEntity.SCHEDULE_ID = "";
                                parLocProcessSchdEntity.REVIEW_CHARGES = "";
                                parLocProcessSchdEntity.DESCRIPTION = "";
                                parLocProcessSchdEntity.CHK_VALUE = false;
                                parLocProcessSchdEntity.BILLING_OPTION = 5;
                                parLocProcessSchdEntity.REPLENISH_FROM = "";
                                parLocProcessSchdEntity.OLDREPLENISH_FROM = "";
                                parLocProcessSchdEntity.PROCESS_TYPE = Process_Type.Replenishment;
                                if (this.deptCartLst[i].SOURCELOCATIONS == "" && this.deptCartLst[i].SOURCELOCATIONS == null && this.deptCartLst[i].SOURCELOCATIONS == undefined && this.deptCartLst[i].SOURCELOCATIONS.length == 0) {

                                }
                                else if (this.deptCartLst[i].SOURCELOCATIONS != "" && this.deptCartLst[i].SOURCELOCATIONS != null && this.deptCartLst[i].SOURCELOCATIONS != undefined && this.deptCartLst[i].SOURCELOCATIONS.length > 0 ) {
                                    this.deptCartLst[i].SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS.replace(/^,/, '');
                                }
                                parLocProcessSchdEntity.SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS;
                                parLocProcessSchdEntity.OLDSOURCELOCATIONS = parLocProcessSchdEntity.SOURCELOCATIONS;
                                parLocProcessSchdEntity.INV_INTERFACE_ENABLE = this.deptCartLst[i].INV_INTERFACE_ENABLE;
                                //parLocProcessSchdEntity.BILLING_ENABLE = this.deptCartLst[i].BILLING_ENABLE;
                                this.parLocProcessScheduleLst.push(parLocProcessSchdEntity);
                            }

                        }
                        // Session["_dsCartSchedules"] = _dsCartSchedules;
                        statusCode = await this.getSheduleIdsData();
                        if (statusCode != AtparStatusCodes.ATPAR_OK) {
                            return statusCode;
                        }
                        this.bindGrid(this.parLocProcessScheduleLst);
                    }
                    else {
                        if (this.assignLocationLst != null && this.assignLocationLst.length > 0) {

                            if (this.ddlDisplaySelectValue == "UA") {
                                let lst = this.assignLocationLsttest.filter(x => x.CHK_VALUE == 1);
                                if (lst != null && lst.length > 0) {
                                    this.assignLocationLst = [];
                                    for (let i = 0; i < lst.length; i++) {
                                        this.assignLocationLst.push(lst[i]);
                                    }
                                }
                            }
                            for (let x = 0; x < this.assignLocationLst.length; x++) {
                                let lstReplenlst = asEnumerable(this.replenSourecLocationLst).Where(a => a.PAR_LOC_ID == this.lblLocGrpId && a.SOURCE_LOCATION == this.assignLocationLst[x].LOCATION && (this.assignLocationLst[x].CHK_VALUE == 0)).ToArray();//this.assignLocationLst[x].CHK_VALUE == false || 
                                if (lstReplenlst != null && lstReplenlst.length > 0) {
                                    lstReplenlst[0].CHK_VALUE = false;
                                }
                            }
                            this.sourceLocs = "";
                            let assinglocations = this.assignLocationLst.filter(x => x.CHK_VALUE == 1);// x.CHK_VALUE == true ||
                            if (assinglocations != null && assinglocations.length > 0) {

                                for (let x = 0; x < assinglocations.length; x++) {
                                    let replenSourecLocDataEntity: MT_POU_REPLEN_SOURCE_LOCATION;
                                    replenSourecLocDataEntity = new MT_POU_REPLEN_SOURCE_LOCATION();
                                    if (assinglocations.length - 1 != x) {
                                        this.sourceLocs += assinglocations[x].LOCATION + ", ";
                                    } else {
                                        this.sourceLocs += assinglocations[x].LOCATION
                                    }
                                    //if (this.sourceLocs != ""){
                                    //    this.sourceLocs = this.sourceLocs.substring(0, this.sourceLocs.length - 1);
                                    //}
                                    replenSourecLocDataEntity.BUSINESS_UNIT = assinglocations[x].BUSINESS_UNIT;
                                    //if (assinglocations[x].LOCATION != "") {
                                    //    assinglocations[x].LOCATION = assinglocations[x].LOCATION.substring(0, this.sourceLocs.length - 1);
                                    //}
                                    replenSourecLocDataEntity.SOURCE_LOCATION = assinglocations[x].LOCATION
                                    replenSourecLocDataEntity.SOURCE_ORG_ID = assinglocations[x].BUSINESS_UNIT
                                    replenSourecLocDataEntity.ORG_GROUP_ID = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toString();
                                    replenSourecLocDataEntity.ORG_ID = this.selectedOrgId.toString();
                                    replenSourecLocDataEntity.PAR_LOC_ID = this.lblLocGrpId;
                                    replenSourecLocDataEntity.M_BUSINESS_UNIT = assinglocations[x].M_BUSINESS_UNIT;
                                    replenSourecLocDataEntity.M_LOCATION = assinglocations[x].M_LOCATION;
                                    replenSourecLocDataEntity.BUSINESS_UNIT = assinglocations[x].BUSINESS_UNIT;
                                    replenSourecLocDataEntity.LOCATION = assinglocations[x].LOCATION;
                                    replenSourecLocDataEntity.CHK_VALUE = assinglocations[x].CHK_VALUE;

                                    this.replenSourecLocationLst.push(replenSourecLocDataEntity);
                                }
                            }

                            let lst = asEnumerable(this.parRepProcessScheduleLst).Where(x => x.ID == this.selectedRowReplenishment.ID).ToArray();

                            if (this.sourceLocs != "" && this.sourceLocs != undefined && this.sourceLocs != null && this.sourceLocs.length > 0) {
                                lst[0].SOURCELOCATIONS = this.sourceLocs;
                                lst[0].SOURCELOCATIONS = lst[0].SOURCELOCATIONS.replace(/^,/, '');

                                //lst[0].SOURCELOCATIONS = this.sourceLocs.slice(0, this.sourceLocs.length - 1);

                            } else {
                                lst[0].SOURCELOCATIONS = "";
                                lst[0].OLDSOURCELOCATIONS = "";
                            }

                            //for (let i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                            //    if (this.parLocProcessScheduleLst[i].SOURCELOCATIONS != "") {
                            //        this.parLocProcessScheduleLst[i].SOURCELOCATIONS = this.parLocProcessScheduleLst[i].SOURCELOCATIONS.slice(0, this.parLocProcessScheduleLst[i].SOURCELOCATIONS.length - 1);


                            //    }
                            //}
                            //for (let i = 0; i < this.replenSourecLocationLst.length; i++) {
                            //    if (this.replenSourecLocationLst[i].SOURCE_LOCATION != "") {
                            //        this.replenSourecLocationLst[i].SOURCE_LOCATION = this.replenSourecLocationLst[i].SOURCE_LOCATION.slice(0, this.replenSourecLocationLst[i].SOURCE_LOCATION.length - 1);

                            //    }
                            //}
                        }
                    }
                    //Session["_dsSchedules"] = _dsSchedules;
                    this.hdnParLocProcessScheduleLst = this.parRepProcessScheduleLst;

                } else {
                    //grdTable.Visible = false;
                    //trStatusMessage.Visible = true;
                    //TabContainer.Visible = false;
                    //tblBilling.Visible = false;                   
                    return AtparStatusCodes.E_NORECORDFOUND;
                }


                for (let i = 0; i < this.parRepProcessScheduleLst.length; i++) {
                    if (this.parRepProcessScheduleLst[i].SOURCELOCATIONS != "" && this.parRepProcessScheduleLst[i].SOURCELOCATIONS != undefined &&
                        this.parRepProcessScheduleLst[i].SOURCELOCATIONS != null && this.parRepProcessScheduleLst[i].SOURCELOCATIONS.length > 0) {
                        this.parRepProcessScheduleLst[i].SOURCELOCATIONS = this.parRepProcessScheduleLst[i].SOURCELOCATIONS.replace(/,\s$/, "");
                    }
                }
                //billing
            }
            else if (pTabName == Process_Type[Process_Type.Billing].toString()) {
                if (this.deptLst == undefined || this.deptLst.length == 0) {
                    statusCode = await this.populateBillingDept(Process_Type[Process_Type.Billing].toString());
                    this.billStatus = statusCode;
                }

                statusCode = this.billStatus;

                if (statusCode != AtparStatusCodes.ATPAR_OK) {
                    return statusCode;
                }
                if (this.deptLst.length > 0) {
                    strBunit = this.selectedOrgId.toString();
                    _strCartID = "";
                    if (this.parBillProcessScheduleLst == null || this.parBillProcessScheduleLst.length == 0 || this.parBillProcessScheduleLst == undefined) {
                        statusCode = await this.getCartSchedulesData(strBunit, _strCartID, Process_Type.Billing.toString(), this.intAppId, this.deviceTokenEntry);
                        if (statusCode != AtparStatusCodes.ATPAR_OK) {
                            return statusCode;
                        }

                        if (this.parBillProcessScheduleLst != null && this.parBillProcessScheduleLst.length > 0) {
                            this.parBillProcessScheduleLst = this.parBillProcessScheduleLst;
                        }

                        for (let i = 0; i < this.parBillProcessScheduleLst.length; i++) {
                            let _drDeptIds: any[] = [];
                            _drDeptIds = asEnumerable(this.deptLst).Where(x => x.DEPARTMENT_ID == this.parBillProcessScheduleLst[i].ID).ToArray();
                            if (_drDeptIds.length == 0) {
                                this.parBillProcessScheduleLst.splice(i, 1);
                            }
                        }

                        for (let i = 0; i < this.deptLst.length; i++) {
                            if (this.parBillProcessScheduleLst.length > 0) {
                                let _drDeptSchedules: any[] = [];
                                _drDeptSchedules = asEnumerable(this.parBillProcessScheduleLst).Where(x => x.ID == this.deptLst[i].DEPARTMENT_ID).ToArray();
                                if (_drDeptSchedules.length > 0) {
                                    _drDeptSchedules[0].ROW_INDEX = i;
                                    _drDeptSchedules[0].CHK_VALUE = true;
                                    _drDeptSchedules[0].DESCRIPTION = "";
                                    _drDeptSchedules[0].DEPT_NAME = this.deptLst[i].DEPT_NAME;
                                    if (_drDeptSchedules[0].REVIEW_CHARGES == "Y") {
                                        _drDeptSchedules[0].BlnReviewChargeValue = true;
                                    }
                                    else if (_drDeptSchedules[0].REVIEW_CHARGES == "N") {
                                        _drDeptSchedules[0].BlnReviewChargeValue = false;
                                    }
                                } else if (_drDeptSchedules.length == 0) {
                                    let parLocProcessSchdEntity: MT_POU_PAR_LOC_PROCESS_SCHEDULE;
                                    parLocProcessSchdEntity = new MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                    parLocProcessSchdEntity.ROW_INDEX = i;
                                    parLocProcessSchdEntity.ORG_ID = this.selectedOrgId;
                                    parLocProcessSchdEntity.ID = this.deptLst[i].DEPARTMENT_ID;
                                    parLocProcessSchdEntity.SCHEDULE_ID = "";
                                    parLocProcessSchdEntity.REVIEW_CHARGES = "N";
                                    parLocProcessSchdEntity.DESCRIPTION = "";
                                    parLocProcessSchdEntity.CHK_VALUE = false;
                                    parLocProcessSchdEntity.BILLING_OPTION = 5;
                                    parLocProcessSchdEntity.REPLENISH_FROM = "";
                                    parLocProcessSchdEntity.DEPT_NAME = this.deptLst[i].DEPT_NAME;
                                    parLocProcessSchdEntity.PROCESS_TYPE = Process_Type.Billing;
                                    parLocProcessSchdEntity.BILLING_ENABLE = this.deptLst[i].BILLING_ENABLE;
                                    this.parBillProcessScheduleLst.push(parLocProcessSchdEntity);
                                }

                            } else {
                                let parLocProcessSchdEntity: MT_POU_PAR_LOC_PROCESS_SCHEDULE;
                                parLocProcessSchdEntity = new MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                parLocProcessSchdEntity.ROW_INDEX = i;
                                parLocProcessSchdEntity.ORG_ID = this.selectedOrgId;
                                parLocProcessSchdEntity.ID = this.deptLst[i].DEPARTMENT_ID;
                                parLocProcessSchdEntity.SCHEDULE_ID = "";
                                parLocProcessSchdEntity.REVIEW_CHARGES = "N";
                                parLocProcessSchdEntity.DESCRIPTION = "";
                                parLocProcessSchdEntity.CHK_VALUE = false;
                                parLocProcessSchdEntity.BILLING_OPTION = 5;
                                parLocProcessSchdEntity.REPLENISH_FROM = "";
                                parLocProcessSchdEntity.DEPT_NAME = this.deptLst[i].DEPT_NAME;
                                parLocProcessSchdEntity.PROCESS_TYPE = Process_Type.Billing;
                                parLocProcessSchdEntity.BILLING_ENABLE = this.deptLst[i].BILLING_ENABLE;
                                this.parBillProcessScheduleLst.push(parLocProcessSchdEntity);
                            }

                        }
                        statusCode = await this.getSheduleIdsData();
                        if (statusCode != AtparStatusCodes.ATPAR_OK) {
                            return statusCode;
                        }

                        if (this.parBillProcessScheduleLst != null && this.parBillProcessScheduleLst.length > 0) {
                            this.parBillProcessScheduleLst = this.parBillProcessScheduleLst;
                        }
                    }
                    this.billing_BindGrid(this.parBillProcessScheduleLst);
                } else {
                    return AtparStatusCodes.E_NORECORDFOUND;
                }
            }
            else if (pTabName == Process_Type[Process_Type.Alerts].toString()) {
                if (this.deptAlertLst == undefined || this.deptAlertLst.length == 0) {
                    statusCode = await this.populateBillingDept(Process_Type[Process_Type.Alerts].toString());
                    this.alertStatus = statusCode;
                }
                this.alertStatus = 0;
                statusCode = this.alertStatus;
                if (statusCode != AtparStatusCodes.ATPAR_OK) {
                    return statusCode;
                }

                if (this.deptAlertLst.length > 0) {
                    strBunit = this.selectedOrgId.toString();
                    _strCartID = "";
                    //this.parLocProcessScheduleLst = [];
                    //this.replenSourecLocationLst = [];
                    if (this.schdAlerts == undefined || this.schdAlerts.length == 0) {
                        statusCode = await this.getCartSchedulesData(strBunit, _strCartID, Process_Type.Alerts.toString(), this.intAppId, this.deviceTokenEntry);
                        if (statusCode != AtparStatusCodes.ATPAR_OK) {
                            return statusCode;
                        }
                        for (let i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                            let _drDeptIds: any[] = [];
                            _drDeptIds = asEnumerable(this.deptAlertLst).Where(x => x.DEPARTMENT_ID == this.parLocProcessScheduleLst[i].ID).ToArray();

                            if (_drDeptIds.length == 0) {
                                this.parLocProcessScheduleLst.splice(i, 1);
                            }
                        }
                        this.schdAlerts = [];
                        // this.schdAlerts = this.parLocProcessScheduleLst;

                        for (let i = 0; i < this.deptAlertLst.length; i++) {
                            if (this.parLocProcessScheduleLst.length > 0) {
                                let _drDeptSchedules: any[] = [];
                                _drDeptSchedules = asEnumerable(this.parLocProcessScheduleLst).Where(x => x.ID == this.deptAlertLst[i].DEPARTMENT_ID).ToArray();
                                if (_drDeptSchedules.length > 0) {
                                    let schdAlertsEntity: MT_POU_PAR_LOC_PROCESS_SCHEDULE;
                                    schdAlertsEntity = new MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                    schdAlertsEntity.ROW_INDEX = i;
                                    schdAlertsEntity.ORG_ID = this.selectedOrgId;
                                    schdAlertsEntity.ID = this.deptAlertLst[i].DEPARTMENT_ID;
                                    schdAlertsEntity.SCHEDULE_ID = "";
                                    schdAlertsEntity.REVIEW_CHARGES = YesNo_Enum[YesNo_Enum.N].toString();
                                    schdAlertsEntity.DESCRIPTION = "";
                                    //schdAlertsEntity.CHK_VALUE = false;
                                    schdAlertsEntity.CHK_VALUE = true;
                                    schdAlertsEntity.BILLING_OPTION = 5;
                                    schdAlertsEntity.DEPT_NAME = this.deptAlertLst[i].DEPT_NAME;
                                    let _drSchAlerts: any[] = [];
                                    _drSchAlerts = asEnumerable(this.parLocProcessScheduleLst).Where(x => (x.ID == this.deptAlertLst[i].DEPARTMENT_ID) && (x.PROCESS_TYPE == Process_Type.LowStock)).ToArray();

                                    if (_drSchAlerts.length > 0) {
                                        schdAlertsEntity.LOW_STK_SCHEDULE_ID = _drSchAlerts[0].SCHEDULE_ID.toString();
                                    } else {
                                        schdAlertsEntity.LOW_STK_SCHEDULE_ID = "";
                                    }

                                    _drSchAlerts = asEnumerable(this.parLocProcessScheduleLst).Where(x => (x.ID == this.deptAlertLst[i].DEPARTMENT_ID) && (x.PROCESS_TYPE == Process_Type.Expiration)).ToArray();

                                    if (_drSchAlerts.length > 0) {
                                        schdAlertsEntity.EXP_SCHEDULE_ID = _drSchAlerts[0].SCHEDULE_ID.toString();
                                    } else {
                                        schdAlertsEntity.EXP_SCHEDULE_ID = "";
                                    }

                                    _drSchAlerts = asEnumerable(this.parLocProcessScheduleLst).Where(x => (x.ID == this.deptAlertLst[i].DEPARTMENT_ID) && (x.PROCESS_TYPE == Process_Type.Recall)).ToArray();

                                    if (_drSchAlerts.length > 0) {
                                        schdAlertsEntity.RECALL_SCHEDULE_ID = _drSchAlerts[0].SCHEDULE_ID.toString();
                                    } else {
                                        schdAlertsEntity.RECALL_SCHEDULE_ID = "";
                                    }

                                    _drSchAlerts = asEnumerable(this.parLocProcessScheduleLst).Where(x => (x.ID == this.deptAlertLst[i].DEPARTMENT_ID) && (x.PROCESS_TYPE == Process_Type.BillOnly)).ToArray();
                                    if (_drSchAlerts.length > 0) {
                                        schdAlertsEntity.BILLONLY_SCHEDULE_ID = _drSchAlerts[0].SCHEDULE_ID.toString();
                                    } else {
                                        schdAlertsEntity.BILLONLY_SCHEDULE_ID = "";
                                    }

                                    this.schdAlerts.push(schdAlertsEntity);
                                } else if (_drDeptSchedules.length == 0) {
                                    let schdAlertsEntity: MT_POU_PAR_LOC_PROCESS_SCHEDULE;
                                    schdAlertsEntity = new MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                    schdAlertsEntity.ROW_INDEX = i;
                                    schdAlertsEntity.ORG_ID = this.selectedOrgId;
                                    schdAlertsEntity.ID = this.deptAlertLst[i].DEPARTMENT_ID;
                                    schdAlertsEntity.SCHEDULE_ID = "";
                                    schdAlertsEntity.REVIEW_CHARGES = YesNo_Enum[YesNo_Enum.N].toString();
                                    schdAlertsEntity.DESCRIPTION = "";
                                    schdAlertsEntity.CHK_VALUE = false;
                                    schdAlertsEntity.BILLING_OPTION = 5;
                                    schdAlertsEntity.DEPT_NAME = this.deptAlertLst[i].DEPT_NAME;
                                    schdAlertsEntity.LOW_STK_SCHEDULE_ID = "";
                                    schdAlertsEntity.EXP_SCHEDULE_ID = "";
                                    schdAlertsEntity.RECALL_SCHEDULE_ID = "";
                                    schdAlertsEntity.BILLONLY_SCHEDULE_ID = "";
                                    schdAlertsEntity.PROCESS_TYPE = Process_Type.Alerts;
                                    this.schdAlerts.push(schdAlertsEntity);
                                }
                            } else {
                                let schdAlertsEntity: MT_POU_PAR_LOC_PROCESS_SCHEDULE;
                                schdAlertsEntity = new MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                schdAlertsEntity.ROW_INDEX = i;
                                schdAlertsEntity.ORG_ID = this.selectedOrgId;
                                schdAlertsEntity.ID = this.deptAlertLst[i].DEPARTMENT_ID;
                                schdAlertsEntity.SCHEDULE_ID = "";
                                schdAlertsEntity.REVIEW_CHARGES = YesNo_Enum[YesNo_Enum.N].toString();
                                schdAlertsEntity.DESCRIPTION = "";
                                schdAlertsEntity.CHK_VALUE = false;
                                schdAlertsEntity.BILLING_OPTION = 5;
                                schdAlertsEntity.DEPT_NAME = this.deptAlertLst[i].DEPT_NAME;
                                schdAlertsEntity.LOW_STK_SCHEDULE_ID = "";
                                schdAlertsEntity.EXP_SCHEDULE_ID = "";
                                schdAlertsEntity.RECALL_SCHEDULE_ID = "";
                                schdAlertsEntity.BILLONLY_SCHEDULE_ID = "";
                                schdAlertsEntity.PROCESS_TYPE = Process_Type.Alerts;
                                this.schdAlerts.push(schdAlertsEntity);
                            }
                        }
                        statusCode = await this.getSheduleIdsData();
                        if (statusCode != AtparStatusCodes.ATPAR_OK) {
                            return statusCode;
                        }
                        if (this.parLocProcessScheduleLst != null && this.parLocProcessScheduleLst != undefined && this.parLocProcessScheduleLst.length > 0) {
                            this.schdAlerts = this.schdAlerts;
                        }
                    }

                    this.alerts_BindGrid(this.schdAlerts);
                } else {

                    return AtparStatusCodes.E_NORECORDFOUND;
                }
            }
            //this.spnrService.stop();
            return statusCode;

        } catch (ex) {
            this.clientErrorMsg(ex);
            return statusCode;
        }
    }

    private async getCartSchedulesData(bUnit: string, cartID: string, procType: string, appId, deviceTokenEntry): Promise<number> {
        this.statusMsgs = [];
        try {
            let data: any;
            data = [];
            //this.spnrService.start();
            //this.parLocProcessScheduleLst = [];
            //this.replenSourecLocationLst = [];
            await this.processParmService.getCartSchedules(bUnit, cartID, procType, appId, this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    data = res.json() as AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>;
                    if (procType == "1") {
                        this.parBillProcessScheduleLst = res.json().DataDictionary.pouParLocationProcessScheduleList;
                    }
                    else {
                        this.parLocProcessScheduleLst = res.json().DataDictionary.pouParLocationProcessScheduleList;
                        this.replenSourecLocationLst = res.json().DataDictionary.pouReplenSourceLocationList;
                    }

                    switch (data.StatType) {
                        case StatusType.Success: {
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            //this.spnrService.stop();
            return data.StatusCode;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private async getSheduleIdsData(): Promise<number> {
        this.statusMsgs = [];
        let data: any;
        data = [];
        try {
            this.scheduleHeader = [];
            //  this.spnrService.start();
            await this.processParmService.getSheduleIDs(this.deviceTokenEntry).
                catch(this.httpService.handleError).then((res: Response) => {
                    data = res.json() as AtParWebApiResponse<MT_ATPAR_SCHEDULE_HEADER>;
                    this.scheduleHeader = data.DataList;
                    //this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            // this.spnrService.stop();
            return data.StatusCode;
        } catch (ex) {
            this.clientErrorMsg(ex);
            return data.StatusCode;
        }
    }

    private bindGrid(cartSchedules: MT_POU_PAR_LOC_PROCESS_SCHEDULE[]) {
        this.statusMsgs = [];
        try {
            this.selectedInvSchedule = "Select One";
            this.selectedReplenish = "Select One";

            let deplItems: any;
            deplItems = asEnumerable(this.deptCartLst).Where(x => (x.BUSINESS_UNIT == this.parLocProcessScheduleLst[0].ORG_ID) &&
                (x.CART_ID == this.parLocProcessScheduleLst[0].ID));

            if (deplItems.length > 0) {
                if (deplItems[0].INV_INTERFACE_ENABLE == "N") {
                }
            }

            this.ddlSchedIdLst = [];
            this.ddlSchedIdLst.push({ label: "Select One", value: "Select One" });
            for (let i = 0; i < this.scheduleHeader.length; i++) {
                this.ddlSchedIdLst.push({ label: this.scheduleHeader[i].SCHEDULE_ID, value: this.scheduleHeader[i].SCHEDULE_ID });
                //this.parLocProcessScheduleLst[i].SCHEDULE_ID=this.scheduleHeader[i].SCHEDULE_ID;
            }
            if (this.parLocProcessScheduleLst.length > 0) {
                if (this.parLocProcessScheduleLst[0].SCHEDULE_ID != null || this.parLocProcessScheduleLst[0].SCHEDULE_ID != "") {
                    this.selectedInvSchedule = this.parLocProcessScheduleLst[0].SCHEDULE_ID;
                }
            }
            this.ddlReplenishLst = [];
            this.ddlReplenishLst.push({ label: "Select One", value: "-1" });
            this.ddlReplenishLst.push({ label: "POU Inventory", value: "0" });
            this.ddlReplenishLst.push({ label: "Par Locations", value: "1" });
            this.ddlReplenishLst.push({ label: "MMIS", value: "2" });
            this.tab = true;
            this.tabReplenishment = true;
            for (var i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                if (this.parLocProcessScheduleLst[i].SOURCELOCATIONS != undefined && this.parLocProcessScheduleLst[i].SOURCELOCATIONS != null
                    && this.parLocProcessScheduleLst[i].SOURCELOCATIONS != "" && this.parLocProcessScheduleLst[i].SOURCELOCATIONS.length > 0) {
                    this.parLocProcessScheduleLst[i].SOURCELOCATIONS = this.parLocProcessScheduleLst[i].SOURCELOCATIONS.replace(/^,/, '');
                }
            }
            this.parRepProcessScheduleLst = this.parLocProcessScheduleLst;

            //this.spnrService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private billing_BindGrid(deptSchedules: MT_POU_PAR_LOC_PROCESS_SCHEDULE[]) {
        this.statusMsgs = [];
        try {
            let drBilling: any[] = [];
            drBilling = asEnumerable(this.deptLst).Where(x => x.BUSINESS_UNIT == this.parBillProcessScheduleLst[0].ORG_ID &&
                x.DEPARTMENT_ID == this.parBillProcessScheduleLst[0].ID).ToArray();
            let _dr = this.deptLst.filter(x => x.BUSINESS_UNIT == this.parBillProcessScheduleLst[0].ORG_ID && x.DEPARTMENT_ID == this.parBillProcessScheduleLst[0].ID);
            if (_dr.length > 0) {
                if (_dr[0].BILLING_ENABLE == "N") {// YesNo_Enum[YesNo_Enum.N]                       

                }
            }
            if (this.parBillProcessScheduleLst[0].REVIEW_CHARGES == YesNo_Enum[YesNo_Enum.Y].toString()) {
                // this.reviewChargesValue = true;
                this.parBillProcessScheduleLst[0].BlnReviewChargeValue = true;

            } else {
                // this.reviewChargesValue = false;
                this.parBillProcessScheduleLst[0].BlnReviewChargeValue = false;
            }
            this.ddlBillingSchedIdLst = [];
            this.ddlBillingSchedIdLst.push({ label: "Select One", value: "Select One" });
            for (let i = 0; i < this.scheduleHeader.length; i++) {
                this.ddlBillingSchedIdLst.push({ label: this.scheduleHeader[i].SCHEDULE_ID, value: this.scheduleHeader[i].SCHEDULE_ID });
            }
            if (this.parBillProcessScheduleLst.length > 0) {
                if (this.parBillProcessScheduleLst[0].SCHEDULE_ID != null || this.parBillProcessScheduleLst[0].SCHEDULE_ID != "") {
                    this.selectedInvSchedule = this.parBillProcessScheduleLst[0].SCHEDULE_ID;
                }
            }
            if (this.parBillProcessScheduleLst[0].BILLING_OPTION == 1) {
                this.parBillProcessScheduleLst[0].BILLING_OPTION = 1;
                this.parBillProcessScheduleLst[0].blnBillScheduleId = false;
                this.parBillProcessScheduleLst[0].chkBillOption = false;
            } else if (this.parBillProcessScheduleLst[0].BILLING_OPTION == 2) {
                this.parBillProcessScheduleLst[0].BILLING_OPTION = 2;
                this.parBillProcessScheduleLst[0].blnBillScheduleId = true;
                this.parBillProcessScheduleLst[0].chkBillOption = true;
            }

            if (this.parBillProcessScheduleLst[0].CHK_VALUE == true) {
                if ((this.parBillProcessScheduleLst[0].SCHEDULE_ID == null &&
                    this.parBillProcessScheduleLst[0].SCHEDULE_ID == "" &&
                    this.parBillProcessScheduleLst[0].SCHEDULE_ID == "Select One") &&
                    this.parBillProcessScheduleLst[0].blnBillScheduleId == true) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Schedule" });
                    return;
                } else if (this.parBillProcessScheduleLst[0].BILLING_OPTION != 1 &&
                    this.parBillProcessScheduleLst[0].BILLING_OPTION != 2) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Option" });
                    return;
                }
            } else if (this.parBillProcessScheduleLst[0].CHK_VALUE == false) {
                if ((this.parBillProcessScheduleLst[0].SCHEDULE_ID != null &&
                    this.parBillProcessScheduleLst[0].SCHEDULE_ID != "" &&
                    this.parBillProcessScheduleLst[0].SCHEDULE_ID != "Select One") &&
                    this.parBillProcessScheduleLst[0].blnBillScheduleId == true) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Department" });
                    return;
                } else if (this.parBillProcessScheduleLst[0].BILLING_OPTION == 1 ||
                    this.parBillProcessScheduleLst[0].BILLING_OPTION == 2 ||
                    this.parBillProcessScheduleLst[0].BlnReviewChargeValue == true) {// this.reviewChargesValue == true
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Department" });
                    return;
                }
            }
            // this.parBillProcessScheduleLst = this.parLocProcessScheduleLst;
            //}

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private alerts_BindGrid(deptSchedules: MT_POU_PAR_LOC_PROCESS_SCHEDULE[]) {
        this.statusMsgs = [];
        try {
            if (this.intAppId == EnumApps.Pharmacy) {

            }

            this.ddlBillOnlySchedId = [];
            this.ddlRecallSchedId = [];
            this.ddlExpSchedId = [];
            this.ddlLowStockSchedId = [];

            this.ddlBillOnlySchedId.push({ label: "Select One", value: "Select One" });
            this.ddlRecallSchedId.push({ label: "Select One", value: "Select One" });
            this.ddlExpSchedId.push({ label: "Select One", value: "Select One" });
            this.ddlLowStockSchedId.push({ label: "Select One", value: "Select One" });

            for (let intCnt = 0; intCnt <= this.scheduleHeader.length - 1; intCnt++) {
                this.ddlBillOnlySchedId.push({ label: this.scheduleHeader[intCnt].SCHEDULE_ID, value: this.scheduleHeader[intCnt].SCHEDULE_ID });
                this.ddlRecallSchedId.push({ label: this.scheduleHeader[intCnt].SCHEDULE_ID, value: this.scheduleHeader[intCnt].SCHEDULE_ID });
                this.ddlExpSchedId.push({ label: this.scheduleHeader[intCnt].SCHEDULE_ID, value: this.scheduleHeader[intCnt].SCHEDULE_ID });
                this.ddlLowStockSchedId.push({ label: this.scheduleHeader[intCnt].SCHEDULE_ID, value: this.scheduleHeader[intCnt].SCHEDULE_ID });
            }

            if (this.schdAlerts.length > 0) {
                if (this.schdAlerts[0].LOW_STK_SCHEDULE_ID != null || this.schdAlerts[0].LOW_STK_SCHEDULE_ID != "") {
                    this.selectedLowStockSchedId = this.schdAlerts[0].LOW_STK_SCHEDULE_ID;
                }
            }
            if (this.schdAlerts.length > 0) {
                if (this.schdAlerts[0].EXP_SCHEDULE_ID != null || this.schdAlerts[0].EXP_SCHEDULE_ID != "") {
                    this.selectedExpSchedId = this.schdAlerts[0].EXP_SCHEDULE_ID;
                }
            }
            if (this.schdAlerts.length > 0) {
                if (this.schdAlerts[0].RECALL_SCHEDULE_ID != null || this.schdAlerts[0].RECALL_SCHEDULE_ID != "") {
                    this.selectedRecallSchedId = this.schdAlerts[0].RECALL_SCHEDULE_ID;
                }
            }
            if (this.schdAlerts.length > 0) {
                if (this.schdAlerts[0].BILLONLY_SCHEDULE_ID != null || this.schdAlerts[0].BILLONLY_SCHEDULE_ID != "") {
                    this.selectedBillOnlySchedId = this.schdAlerts[0].BILLONLY_SCHEDULE_ID;
                }
            }
            if (this.schdAlerts.length > 0) {
                this.tabAlert = true;
            }
            this.schdAlerts
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private async populateBillingDept(tabName: string): Promise<number> {
        this.statusMsgs = [];
        let data: any;
        data = [];
        try {

            let _strDeptId: string = "";
            let strBunit: string = "";
            if (this.selectedDept.toString().trim() != "Select One") {
                _strDeptId = this.selectedDept.toString().trim();
            }
            if (this.selectedOrgId.toString().trim() != "Select One") {
                strBunit = this.selectedOrgId.toString().trim();
            }
            if (this.deptLst != undefined && this.deptLst.length > 0) {
                this.deptLst;
            }
            if (tabName == "Alerts") {
                this.deptAlertLst = [];
            }
            else if (tabName == "Billing") { this.deptLst = []; }


            // this.spnrService.start();
            await this.processParmService.getAllocDepartment(_strDeptId, strBunit, this.intAppId).
                catch(this.httpService.handleError).then((res: Response) => {
                    data = res.json() as AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>;
                    if (tabName == "Alerts") {
                        this.deptAlertLst = data.DataList;
                        //this.spnrService.stop();
                    }
                    else {
                        this.deptLst = data.DataList;
                    }

                    switch (data.StatType) {
                        case StatusType.Success: {

                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

            if (tabName == Process_Type[Process_Type.Alerts].toString()) {
                //In Alerts tab there in no impact of "Billing is enabled in @Par" dept parameter, so ignoring the statuscode
                if (data.StatusCode == AtparStatusCodes.BILNG_NOT_MNGD_IN_ATPAR ||
                    data.StatusCode == AtparStatusCodes.ATPAR_OK) {
                } else if (data.StatusCode != AtparStatusCodes.ATPAR_OK) {
                    return data.StatusCode;
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            else if (tabName == Process_Type[Process_Type.Billing].toString()) {
                if (data.StatusCode != AtparStatusCodes.ATPAR_OK) {
                    return data.StatusCode;
                }
            }

            return AtparStatusCodes.ATPAR_OK;
        } catch (ex) {
            this.clientErrorMsg(ex);
            //this.spnrService.stop();
            return data.StatusCode;

        }
    }

    private async updateDataset(): Promise<number> {
        this.statusMsgs = [];
        let statusCode: number = 0;
        try {
            for (let i = 0; i < this.parRepProcessScheduleLst.length; i++) {
                // _intCnt = Convert.ToInt32(_dgItem.Cells(0).Text);
                //if (this.selectedInvSchedule == "Select One") {
                //    this.parLocProcessScheduleLst[i].SCHEDULE_ID = "";
                //} else {
                //    this.parLocProcessScheduleLst[i].SCHEDULE_ID = this.selectedInvSchedule;
                //}

                //if (this.selectedReplenish == "Select One") {
                //    this.parLocProcessScheduleLst[i].REPLENISH_FROM = -1;
                //} else {
                //    this.parLocProcessScheduleLst[i].REPLENISH_FROM = this.selectedReplenish;
                //}

                //if (this.parLocProcessScheduleLst[i].CHK_VALUE == true) {
                //    this.parLocProcessScheduleLst[i].CHK_VALUE = true;
                //} else {
                //    this.parLocProcessScheduleLst[i].CHK_VALUE = false;
                //}

                this.parRepProcessScheduleLst[i].REVIEW_CHARGES = "";
                this.parRepProcessScheduleLst[i].PROCESS_TYPE = Process_Type.Replenishment;
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
            return AtparStatusCodes.E_SERVERERROR;
        }
        return statusCode;
    }

    private async billing_UpdatedLst(): Promise<number> {
        let statusCode: number = 0;
        this.statusMsgs = [];
        try {
            let intCnt: number = 0;
            for (let i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                if (this.parLocProcessScheduleLst[i].BlnReviewChargeValue == true) {//this.reviewChargesValue
                    this.parLocProcessScheduleLst[i].REVIEW_CHARGES = YesNo_Enum[YesNo_Enum.Y].toString();
                } else {
                    this.parLocProcessScheduleLst[i].REVIEW_CHARGES = YesNo_Enum[YesNo_Enum.N].toString();
                }

                if ((this.parLocProcessScheduleLst[i].SCHEDULE_ID == "Select One" ||
                    this.parLocProcessScheduleLst[i].SCHEDULE_ID == "") || this.parLocProcessScheduleLst[i].BILLING_OPTION != 2) {
                    this.parLocProcessScheduleLst[i].SCHEDULE_ID = "";
                } else {
                    this.parLocProcessScheduleLst[i].SCHEDULE_ID = this.parLocProcessScheduleLst[i].SCHEDULE_ID;
                }

                if (this.parLocProcessScheduleLst[i].BILLING_OPTION != 1 &&
                    this.parLocProcessScheduleLst[i].BILLING_OPTION != 2) {
                    this.parLocProcessScheduleLst[i].BILLING_OPTION = 5;
                }
                this.parLocProcessScheduleLst[i].PROCESS_TYPE = Process_Type.Billing;
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
            return AtparStatusCodes.E_SERVERERROR;
        }
        return statusCode;
    }

    private async updateAlertDataset() {
        this.statusMsgs = [];
        try {

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private clearFields() {

        try {
            this.selectedOrgId = "";
            //this.selectedDept = "";
            this.selectedDept = "";
            this.txtCartId = "";
            this.tab = false;
            this.blnEnable = false;
            this.tabReplenishment = false;
            this.tabBilling = false;
            this.tabAlert = false;
            this.ddlDeptLst = [];
            this.ddlDeptLst.push({ label: "Select One", value: "Select One" });
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private updateLocations() {
        try {
            this.statusMsgs = [];
            for (let i = 0; i < this.assignLocationLst.length; i++) {
                if (this.assignLocationLst[i].CHK_VALUE == "true") {
                    this.assignLocationLst[i].CHK_VALUE = 1;
                } else {
                    this.assignLocationLst[i].CHK_VALUE = 0;
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private bindDataGrid() {
        this.statusMsgs = [];
        try {
            if (this.ddlDisplaySelectValue == "ALLOC") {
                this.assignLocationLst = asEnumerable(this.assignLocationLst).Where(a => a.CHK_VALUE == 1).Select(a => a).ToArray();
            } else if (this.ddlDisplaySelectValue == "UA") {
                this.assignLocationLst = asEnumerable(this.assignLocationLst).Where(a => a.CHK_VALUE == 0).Select(a => a).ToArray();
            } else {
                this.assignLocationLst = asEnumerable(this.assignLocationLst).OrderBy(a => a.CHK_VALUE == 1).ToArray().reverse();
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    private setValues() {
        this.statusMsgs = [];
        this.table = false;
        this.ddlDisplaySelectValue = "ALL";
        this.ddlSelectedAsgnLocOrgId = "Select Org Id";
        this.txtLocation = "";
    }

    clientErrorMsg(strExMsg) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString());
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.orgIdLstData = null;
        this.assignLocationOrgIdLst = null;
        this.deptCartLst = null;
        this.deptLst = null;
        this.replenSourecLocationLst = null;
        this.parLocationSearchLst = null;
        this.parLocProcessScheduleLst = null;
        this.schdAlerts = null;
        this.scheduleHeader = null;
        this.assignLocationLst = null;
        this.srcLocationsOnLoad = null;
        this.lstgridfilterData = null;
        this.lstschdalertsgridfilterData = null;
        this.lstAssignLocfilterData = null;
        this.dtAllocTable = null;
        this.dtUnAllocTable = null;
        this.dsTemp = null;
        this.dsLocDetailsDeleted = null;
        this.assingnLocations = null;
        this.parBillProcessScheduleLst = [];
    }

}