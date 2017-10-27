import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { ModeEnum } from '../Shared/AtParEnums'
import { StatusType } from './../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
//import { CustomValidators } from '../common/textbox/custom-validators';
//import { CustomTextBoxModule } from '../common/textbox/CustomTextBoxModule';
import { RM_ORG_UNITS } from "../../app/Entities/RM_ORG_UNITS";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { ManageOrgIdServices } from "../../app/Init/atpar-manage-orgid.services";
import { Message } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({
    // moduleId: module.id,
    templateUrl: 'atpar-manage-orgid.component.html',
    providers: [ManageOrgIdServices]
})

export class ManageOrgIdComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    msgs: Message[] = [];
    database: any;
    statusCode: number;
    orgStatus: string = "";
    orgId: string = "";
    orgName: string = "";
    details: string = "";
    orgsDatas: RM_ORG_UNITS[];
    deviceTokenEntry: string[] = [];
    userId: string = "";
    orgTypes: any;
    mode: string;
    statusMesssage: string;
    isVisible: boolean = false;
    pazeSize: number;
    pageSize: number;
    statusType: string;
    selectedOgType: string;
    mainlstGridData: Array<RM_ORG_UNITS>;
    breadCrumbMenu: Menus;
    constructor(
        private manageOrgIdServices: ManageOrgIdServices,
        private route: ActivatedRoute,
        private atParSharedDataService: AtParSharedDataService,
        private atParConstant: AtParConstants,
        private spinnerService: SpinnerService, public router: Router
    ) {
        this.breadCrumbMenu = new Menus();
    }

    ngOnInit(): void {
        this.mainlstGridData = new Array<RM_ORG_UNITS>()
        if (this.atParSharedDataService.storage)
            this.mode = this.atParSharedDataService.storage.mode;
        if (this.mode != undefined && this.mode == (ModeEnum.List).toString()) {
            this.bindGrid();
        }
        if (sessionStorage.getItem("RecordsPerPage") == null && sessionStorage.getItem("RecordsPerPage") == undefined) {
            this.pazeSize = 5;
        }
        else {
            this.pazeSize = +sessionStorage.getItem("RecordsPerPage");
        }
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        this.database = [];
        this.database.push({ label: 'ALL', value: '' });
        this.database.push({ label: 'Active', value: true });
        this.database.push({ label: 'InActive', value: false });

        this.orgTypes = [];
        this.orgTypes.push({ label: 'ALL', value: 'ALL' });
        this.orgTypes.push({ label: 'Purchasing', value: 'Purchasing' });
        this.orgTypes.push({ label: 'Inventory', value: 'Inventory' });
        this.userId = this.deviceTokenEntry[TokenEntry_Enum.UserID];
    }

    bindGrid() {
        try {
            this.mainlstGridData = [];
            this.orgsDatas = [];
            this.msgs = [];
            this.statusType = "";
            this.selectedOgType = "";
            this.isVisible = false;
            this.spinnerService.start();
            this.manageOrgIdServices.getOrgIds(this.userId, this.orgId, this.orgName, this.orgStatus).forEach(resp => {
                this.spinnerService.stop();
                switch (resp.StatType) {
                    case StatusType.Success: {
                        let gridData = resp.DataList;
                        if (gridData.length >= 1) {
                            this.orgsDatas = gridData;

                            for (let data of this.orgsDatas) {
                                data.STATUS_VALUE = "";
                                if (data.STATUS)
                                    data.STATUS_VALUE = "Active";
                                else
                                    data.STATUS_VALUE = "InActive";
                                data.STATUS_VALUE
                                if (data.ORG_TYPE == 'P')
                                    data.ORG_TYPE_DISPLAY = "Purchasing";
                                if (data.ORG_TYPE == 'I')
                                    data.ORG_TYPE_DISPLAY = "Inventory";

                            }

                            for (let x = 0; x < this.orgsDatas.length; x++) {
                                let mangeOrgIDDetails = new RM_ORG_UNITS();
                                mangeOrgIDDetails.ORG_ID = this.orgsDatas[x].ORG_ID;
                                mangeOrgIDDetails.ORG_NAME = this.orgsDatas[x].ORG_NAME;
                                mangeOrgIDDetails.ORG_TYPE_DISPLAY = this.orgsDatas[x].ORG_TYPE_DISPLAY;
                                mangeOrgIDDetails.ORG_TYPE = this.orgsDatas[x].ORG_TYPE;
                                mangeOrgIDDetails.STATUS = this.orgsDatas[x].STATUS;
                                mangeOrgIDDetails.STATUS_VALUE = this.orgsDatas[x].STATUS_VALUE;
                                mangeOrgIDDetails.MASTER_GROUP_ID = this.orgsDatas[x].MASTER_GROUP_ID;
                                this.mainlstGridData.push(mangeOrgIDDetails);
                            }
                            this.statusCode = resp.StatusCode;
                            this.isVisible = true;
                        }
                        else {
                            this.isVisible = false;
                            this.msgs = [];
                            this.spinnerService.stop();
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data Found" });
                            break;
                        }
                        break;
                    }
                    case StatusType.Error: {
                        this.msgs = [];
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs = [];
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.msgs = [];
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        } catch (ex) {
            
            this.clientErrorMsg(ex, "bindGrid");
        }
    }

    changeStatus(rmOrgUnits: RM_ORG_UNITS) {
        this.msgs = [];
        this.spinnerService.start();
        rmOrgUnits.STATUS = !rmOrgUnits.STATUS;
        try {
            this.manageOrgIdServices.updateOrgIDStatus(this.userId, rmOrgUnits.ORG_ID, rmOrgUnits.ORG_TYPE, rmOrgUnits.STATUS).forEach(resp => {
                this.msgs = [];
                switch (resp.StatType) {
                    case StatusType.Success:
                        {
                            let msg = AtParConstants.Updated_Msg.replace("1%", "Org").replace("2%", rmOrgUnits.ORG_ID + ' Status');
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                            let filterData: any = [];
                            this.orgsDatas = [];
                            let matchedrecord = this.mainlstGridData.filter(x => x.ORG_ID == rmOrgUnits.ORG_ID && x.ORG_TYPE == rmOrgUnits.ORG_TYPE)
                            matchedrecord[0].STATUS = rmOrgUnits.STATUS;
                            if (this.statusType.toString() == "true") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == true)
                            } else if (this.statusType.toString() == "false") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == false)
                            } else {
                                filterData = this.mainlstGridData
                            }
                            if (filterData != null) {
                                for (let x = 0; x < filterData.length; x++) {
                                    let mangeOrgIDDetails = new RM_ORG_UNITS();
                                    mangeOrgIDDetails.ORG_ID = filterData[x].ORG_ID;
                                    mangeOrgIDDetails.ORG_NAME = filterData[x].ORG_NAME;
                                    mangeOrgIDDetails.ORG_TYPE_DISPLAY = filterData[x].ORG_TYPE_DISPLAY;
                                    mangeOrgIDDetails.ORG_TYPE = filterData[x].ORG_TYPE;
                                    mangeOrgIDDetails.STATUS = filterData[x].STATUS;
                                    mangeOrgIDDetails.STATUS_VALUE = filterData[x].STATUS_VALUE;
                                    mangeOrgIDDetails.MASTER_GROUP_ID = filterData[x].MASTER_GROUP_ID;
                                    this.orgsDatas.push(mangeOrgIDDetails);
                                }


                            }
                            break;
                        }
                    case StatusType.Warn:
                        {
                            this.statusMesssage = resp.StatusMessage;
                            rmOrgUnits.STATUS = !rmOrgUnits.STATUS;
                            var s = this.statusMesssage.includes("(OrgID)");
                            if (s == true) {
                                this.statusMesssage = this.statusMesssage.replace('OrgID', 'Org');
                                this.statusMesssage = this.statusMesssage.replace('(OrgID)', rmOrgUnits.ORG_ID);
                            }
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMesssage });
                            break;
                        }
                    case StatusType.Error:
                        {
                            this.statusMesssage = resp.StatusMessage;
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            break;
                        }
                    case StatusType.Custom:
                        {
                            this.statusMesssage = resp.StatusMessage;
                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                            break;
                        }
                }

                this.spinnerService.stop();
            });

        }
        catch (ex) {
            
            this.clientErrorMsg(ex, "changeStatus");
        }
    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        try {
            let filterData;
            this.orgsDatas = [];
            if (this.statusType.toString() == "true") {
                if (this.selectedOgType.toString() == "Purchasing") {
                    filterData = this.mainlstGridData.filter(x => x.STATUS == true && x.ORG_TYPE_DISPLAY == "Purchasing")
                }
                else if (this.selectedOgType.toString() == "Inventory") {
                    filterData = this.mainlstGridData.filter(x => x.STATUS == true && x.ORG_TYPE_DISPLAY == "Inventory")
                }
                else {
                    filterData = this.mainlstGridData.filter(x => x.STATUS == true)
                }
            } else if (this.statusType.toString() == "false") {
                if (this.selectedOgType.toString() == "Purchasing") {
                    filterData = this.mainlstGridData.filter(x => x.STATUS == false && x.ORG_TYPE_DISPLAY == "Purchasing")
                }
                else if (this.selectedOgType.toString() == "Inventory") {
                    filterData = this.mainlstGridData.filter(x => x.STATUS == false && x.ORG_TYPE_DISPLAY == "Inventory")
                }
                else {
                    filterData = this.mainlstGridData.filter(x => x.STATUS == false)
                }
            } else {
                if (this.selectedOgType.toString() == "Purchasing") {
                    filterData = this.mainlstGridData.filter(x => x.ORG_TYPE_DISPLAY == "Purchasing")
                }
                else if (this.selectedOgType.toString() == "Inventory") {
                    filterData = this.mainlstGridData.filter(x => x.ORG_TYPE_DISPLAY == "Inventory")
                }
                else {
                    filterData = this.mainlstGridData
                }
            }
            if (filterData != null) {
                for (let x = 0; x < filterData.length; x++) {
                    let mangeOrgIDDetails = new RM_ORG_UNITS();
                    mangeOrgIDDetails.ORG_ID = filterData[x].ORG_ID;
                    mangeOrgIDDetails.ORG_NAME = filterData[x].ORG_NAME;
                    mangeOrgIDDetails.ORG_TYPE_DISPLAY = filterData[x].ORG_TYPE_DISPLAY;
                    mangeOrgIDDetails.ORG_TYPE = filterData[x].ORG_TYPE;
                    mangeOrgIDDetails.STATUS = filterData[x].STATUS;
                    mangeOrgIDDetails.STATUS_VALUE = filterData[x].STATUS_VALUE;
                    mangeOrgIDDetails.MASTER_GROUP_ID = filterData[x].MASTER_GROUP_ID;
                    this.orgsDatas.push(mangeOrgIDDetails);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "dataFilter");
        }
    }

    async orgTypeDataFilter(evtdata) {
        let filterData;
        this.orgsDatas = [];


        if (this.selectedOgType.toString() == "Purchasing") {
            if (this.statusType.toString() == "true") {
                filterData = this.mainlstGridData.filter(x => x.ORG_TYPE_DISPLAY == "Purchasing" && x.STATUS == true)
            }
            else if (this.statusType.toString() == "false") {
                filterData = this.mainlstGridData.filter(x => x.ORG_TYPE_DISPLAY == "Purchasing" && x.STATUS == false)
            }
            else {
                filterData = this.mainlstGridData.filter(x => x.ORG_TYPE_DISPLAY == "Purchasing")
            }
        } else if (this.selectedOgType.toString() == "Inventory") {
            if (this.statusType.toString() == "true") {
                filterData = this.mainlstGridData.filter(x => x.ORG_TYPE_DISPLAY == "Inventory" && x.STATUS == true)
            }
            else if (this.statusType.toString() == "false") {
                filterData = this.mainlstGridData.filter(x => x.ORG_TYPE_DISPLAY == "Inventory" && x.STATUS == false)
            }
            else {
                filterData = this.mainlstGridData.filter(x => x.ORG_TYPE_DISPLAY == "Inventory")
            }
        } else if (this.selectedOgType == "ALL") {
            if (this.statusType.toString() == "true") {
                filterData = this.mainlstGridData.filter(x => x.STATUS == true)
            }
            else if (this.statusType.toString() == "false") {
                filterData = this.mainlstGridData.filter(x => x.STATUS == false)
            }
            else {
                filterData = this.mainlstGridData;
            }
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let mangeOrgIDDetails = new RM_ORG_UNITS();
                mangeOrgIDDetails.ORG_ID = filterData[x].ORG_ID;
                mangeOrgIDDetails.ORG_NAME = filterData[x].ORG_NAME;
                mangeOrgIDDetails.ORG_TYPE_DISPLAY = filterData[x].ORG_TYPE_DISPLAY;
                mangeOrgIDDetails.ORG_TYPE = filterData[x].ORG_TYPE;
                mangeOrgIDDetails.STATUS = filterData[x].STATUS;
                mangeOrgIDDetails.STATUS_VALUE = filterData[x].STATUS_VALUE;
                mangeOrgIDDetails.MASTER_GROUP_ID = filterData[x].MASTER_GROUP_ID;
                this.orgsDatas.push(mangeOrgIDDetails);
            }
        }
    }

    createNewOrg() {
        //this.atParSharedDataService.storage = { "mode": ModeEnum.Add };
        this.breadCrumbMenu.SUB_MENU_NAME = 'Setup Org ID';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.atParSharedDataService.setStorage({ "mode": ModeEnum.Add });
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Add,
            },
            relativeTo: this.route
        };
        this.router.navigate(['addOrgId'], navigationExtras);
    }

    editOrgId(rmOrgUnits: RM_ORG_UNITS) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Org ID';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.atParSharedDataService.setStorage({ "rmOrgUnits": rmOrgUnits, "mode": ModeEnum.Edit });
        //this.atParSharedDataService.storage = { "rmOrgUnits": rmOrgUnits, "mode": ModeEnum.Edit };
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Edit,
            },
            relativeTo: this.route
        };
        this.router.navigate(['addOrgId'], navigationExtras);
    }

    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.mode = null;
        this.statusCode = null;
        this.orgId = null;
        this.orgName = null;
        this.details = null;
        this.userId = null;
        this.statusMesssage = null;
    }
}