import {
    NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy,
    Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style,
    transition, animate
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from "@angular/http";
import { PAR_MNGT_COST_CENTER } from "../../app/Entities/PAR_MNGT_COST_CENTER";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { AtParConstants } from "../Shared/AtParConstants";
import { SetupCostCentersServices } from "../../app/Init/atpar-setup-cost-centers.services";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType, ModeEnum, StatusType } from '../Shared/AtParEnums';
import { SelectItem, Message } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-setup-cost-centers-home.html',
    providers: [SetupCostCentersServices, AtParConstants]
})

export class SetupCostCentersHome {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    public newItem = new PAR_MNGT_COST_CENTER();
    costCentersData: PAR_MNGT_COST_CENTER[];
    mainlstGridData: Array<PAR_MNGT_COST_CENTER>;
    statusType: string = "";
    preField: string = "";
    sortedData: PAR_MNGT_COST_CENTER[];
    statusList: any;
    _deviceTokenEntry: string[] = [];
    pCostCenterSearch: string;
    mode: string;
    msgs: Message[] = [];
    isVisible: boolean = false;
    pazeSize: number;
    isUpdate: boolean = false;
    breadCrumbMenu: Menus;
    constructor(
        private setupCostCentersServices: SetupCostCentersServices,
        private router: Router,
        private spinnerService: SpinnerService,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService) {
        this.breadCrumbMenu = new Menus();
    }

    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async ngOnInit() {
        this.statusList = [];
        this.statusList.push({ label: 'All', value: "" });
        this.statusList.push({ label: 'Active', value: true });
        this.statusList.push({ label: 'InActive', value: false });
        try {
            if (this.atParSharedDataService.storage)
                this.mode = this.atParSharedDataService.storage.mode;
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.msgs = [];
            this.mainlstGridData = new Array<PAR_MNGT_COST_CENTER>()

            if (this.mode != undefined && this.mode == (ModeEnum.List).toString()) {
                await this.BindGrid();
            }
            this.pazeSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

            if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage.summary != undefined) {
                this.msgs.push(this.atParSharedDataService.storage);
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async BindGrid() {
        try {
            this.msgs = [];
            this.statusType = "";
            this.mainlstGridData = [];
            this.costCentersData = [];
            this.isVisible = false;

            this.spinnerService.start();
            if (this.pCostCenterSearch != undefined && this.pCostCenterSearch != null && this.pCostCenterSearch.trim().length > 0) {
                await this.setupCostCentersServices
                    .getCostCentersWithSearch(this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.pCostCenterSearch)
                    .forEach(resp => {

                        switch (resp.StatType) {
                            case StatusType.Success:
                                if (this.isUpdate == false) {
                                    this.msgs = [];
                                }
                                this.msgs = [];
                                this.costCentersData = resp.DataList;
                                for (let x = 0; x < this.costCentersData.length; x++) {
                                    let costCentersDataDetails = new PAR_MNGT_COST_CENTER();
                                    costCentersDataDetails.COST_CENTER_CODE = this.costCentersData[x].COST_CENTER_CODE;
                                    costCentersDataDetails.DEPTNAME = this.costCentersData[x].DEPTNAME;
                                    costCentersDataDetails.DEPT_ID = this.costCentersData[x].DEPT_ID;
                                    costCentersDataDetails.DESCRIPTION = this.costCentersData[x].DESCRIPTION;
                                    costCentersDataDetails.ORG_ID = this.costCentersData[x].ORG_ID;

                                    if (this.costCentersData[x].STATUS == false) {
                                        this.costCentersData[x].STATUS = true;
                                    } else {
                                        this.costCentersData[x].STATUS = false;
                                    }
                                    costCentersDataDetails.STATUS = this.costCentersData[x].STATUS;
                                    costCentersDataDetails.UPDATE_DATE = this.costCentersData[x].UPDATE_DATE;
                                    costCentersDataDetails.USERNAME = this.costCentersData[x].USERNAME;
                                    this.mainlstGridData.push(costCentersDataDetails);

                                }


                                this.spinnerService.stop();
                                this.isVisible = true;
                                break;
                            case StatusType.Error:
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                this.isVisible = false;
                                break;
                            case StatusType.Warn:
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                this.isVisible = false;
                                break;
                        }
                    });

            }
            else {
                await this.setupCostCentersServices
                    .getCostCentersWithoutSearch(this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                    .forEach(resp => {

                        switch (resp.StatType) {
                            case StatusType.Success:
                                if (this.isUpdate == false) {
                                    this.msgs = [];
                                }
                                this.costCentersData = resp.DataList;
                                for (let x = 0; x < this.costCentersData.length; x++) {
                                    let costCentersDataDetails = new PAR_MNGT_COST_CENTER();
                                    costCentersDataDetails.COST_CENTER_CODE = this.costCentersData[x].COST_CENTER_CODE;
                                    costCentersDataDetails.DEPTNAME = this.costCentersData[x].DEPTNAME;
                                    costCentersDataDetails.DEPT_ID = this.costCentersData[x].DEPT_ID;
                                    costCentersDataDetails.DESCRIPTION = this.costCentersData[x].DESCRIPTION;
                                    costCentersDataDetails.ORG_ID = this.costCentersData[x].ORG_ID;

                                    if (this.costCentersData[x].STATUS == false) {
                                        this.costCentersData[x].STATUS = true;
                                    } else {
                                        this.costCentersData[x].STATUS = false;
                                    }
                                    costCentersDataDetails.STATUS = this.costCentersData[x].STATUS;
                                    costCentersDataDetails.UPDATE_DATE = this.costCentersData[x].UPDATE_DATE;
                                    costCentersDataDetails.USERNAME = this.costCentersData[x].USERNAME;
                                    this.mainlstGridData.push(costCentersDataDetails);
                                }
                                
                                this.spinnerService.stop();
                                this.isVisible = true;
                                break;
                            case StatusType.Error:
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                this.isVisible = false;
                                break;
                            case StatusType.Warn:
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                this.isVisible = false;
                                break;
                        }
                    });
            }
            this.isUpdate = false;

        } catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }
    }

    //customSort(event) {
    //    var element = event;
    //    this.costCentersData.sort(function (a, b) {
    //        if (a[element.field].toLowerCase() < b[element.field].toLowerCase())
    //            return -1;
    //        if (a[element.field].toLowerCase() > b[element.field].toLowerCase())
    //            return 1;
    //        return 0;
    //    })
    //}

    addCostCenter() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Cost Center';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        // Navigating to Cost Center child route
        //this.atParSharedDataService.storage = { "mode": ModeEnum.Add };
        this.atParSharedDataService.setStorage({ "mode": ModeEnum.Add });
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Add,
            },
            relativeTo: this.route
        };
        this.router.navigate(['addormodify'], navigationExtras);
    }

    editCostCenter(costCenterData) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Cost Center';
            this.breadCrumbMenu.IS_DIV = false;
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            // Navigating to Cost Center child route
            //this.atParSharedDataService.storage = { "costCenterData": costCenterData, "mode": ModeEnum.Edit };
            this.atParSharedDataService.setStorage({ "costCenterData": costCenterData, "mode": ModeEnum.Edit });
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "mode": ModeEnum.Edit,
                },
                relativeTo: this.route
            };
            this.router.navigate(['addormodify'], navigationExtras);
        } catch (ex) {
            this.clientErrorMsg(ex, "editCostCenter");
        }
    }

    async   updateCostCenterStatus(costCenterData) {
        this.msgs = [];
        this.isUpdate = true;
        this.spinnerService.start();
        try {
            await this.setupCostCentersServices.updateCostCenterStatus(costCenterData.STATUS, costCenterData.ORG_ID, costCenterData.COST_CENTER_CODE, costCenterData.DEPT_ID)
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:

                            let filterData: any = [];
                            this.costCentersData = [];
                            let matchedrecord = this.mainlstGridData.filter(x => x.COST_CENTER_CODE == costCenterData.COST_CENTER_CODE)
                            matchedrecord[0].STATUS = costCenterData.STATUS;
                            if (this.statusType.toString() == "true") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == true)
                            } else if (this.statusType.toString() == "false") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == false)
                            } else {
                                filterData = this.mainlstGridData
                            }
                            if (filterData != null) {
                                for (let x = 0; x < filterData.length; x++) {
                                    let lstCostCenterDetails = new PAR_MNGT_COST_CENTER();
                                    lstCostCenterDetails.COST_CENTER_CODE = filterData[x].COST_CENTER_CODE;
                                    lstCostCenterDetails.DESCRIPTION = filterData[x].DESCRIPTION;
                                    lstCostCenterDetails.DEPTNAME = filterData[x].DEPTNAME;
                                    lstCostCenterDetails.DEPT_ID = filterData[x].DEPT_ID;
                                    lstCostCenterDetails.ORG_ID = filterData[x].ORG_ID;
                                    lstCostCenterDetails.UPDATE_USER_ID = filterData[x].UPDATE_USERID;
                                    lstCostCenterDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                                    lstCostCenterDetails.STATUS = filterData[x].STATUS;
                                    this.costCentersData.push(lstCostCenterDetails);
                                }
                            }
                            let statusmesg = AtParConstants.Updated_Msg.replace("1%", "Cost center").replace("2%", costCenterData.COST_CENTER_CODE);
                            this.msgs = [];
                            this.spinnerService.stop();
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmesg });
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            if (resp.StatusCode == 1123307) {
                                //if (costCenterData.STATUS == true) {
                                //    costCenterData.STATUS = false;
                                //}
                                //else if (costCenterData.STATUS == false) {
                                //    costCenterData.STATUS = true
                                //}

                                this.costCentersData.filter(x => x.COST_CENTER_CODE == costCenterData.COST_CENTER_CODE)[0].STATUS = !costCenterData.STATUS;

                            }
                            this.spinnerService.stop();
                            break;
                    }
                });
            //await this.BindGrid();
        } catch (ex) {
            this.clientErrorMsg(ex, "updateCostCenterStatus");
        }
    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        let filterData;
        this.costCentersData.length = 0;

        if (this.statusType.toString() == "true") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == true)
        } else if (this.statusType.toString() == "false") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == false)
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let lstcostCenterDetails = new PAR_MNGT_COST_CENTER();
                lstcostCenterDetails.COST_CENTER_CODE = filterData[x].COST_CENTER_CODE;
                lstcostCenterDetails.DEPTNAME = filterData[x].DEPTNAME;
                lstcostCenterDetails.DEPT_ID = filterData[x].DEPT_ID;
                lstcostCenterDetails.DESCRIPTION = filterData[x].DESCRIPTION;
                lstcostCenterDetails.ORG_ID = filterData[x].ORG_ID;
                lstcostCenterDetails.STATUS = filterData[x].STATUS;
                lstcostCenterDetails.UPDATE_DATE = filterData[x].UPDATE_DATE;
                lstcostCenterDetails.USERNAME = filterData[x].USERNAME;
                this.costCentersData.push(lstcostCenterDetails);
            }

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

        } else {
            element.order = 1;
        }
        this.preField = element.field;

        let result = null;
        let order: boolean;
        let sortCentersData = [];
        try {
            sortCentersData = this.costCentersData.sort(function (a, b) {
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


        this.costCentersData = sortCentersData;

    }

    ngOnDestroy() {
        this.newItem = null;
        this.costCentersData = null;
        this.statusList = null;
        this.msgs = [];
        this.pCostCenterSearch = '';
    }
}