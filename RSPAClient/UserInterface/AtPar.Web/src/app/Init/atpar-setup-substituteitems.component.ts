import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SetupItemsServices } from "../../app/Init/atpar-setup-items-service";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Shared/HttpService';
import { SelectItem } from './../components/common/api';
import { NavigationExtras } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { ModeEnum } from '../Shared/AtParEnums'
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Message } from './../components/common/api';
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { StatusType } from './../Shared/AtParEnums';
import { PAR_MNGT_ITEM } from '../../app/Entities/PAR_MNGT_ITEM';
import { PAR_MNGT_ITEM_SUBSTITUTE } from '../../app/Entities/PAR_MNGT_ITEM_SUBSTITUTE';
import { PAR_MNGT_PAR_LOC_DETAILS } from '../../app/Entities/PAR_MNGT_PAR_LOC_DETAILS';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { AtParConstants } from '../Shared/AtParConstants';
import { Menus } from '../AtPar/Menus/routepath';
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-setup-substituteitems.component.html',
    providers: [SetupItemsServices],

})
export class SetupItemsSubstituteItemsComponent {

    msgs: Message[] = [];

    lstVendordata: SelectItem[] = [];
    lstSetupItemsData: PAR_MNGT_ITEM[] = [];
    lstSubItemData: PAR_MNGT_ITEM[] = [];
    lstSubstituteItemsData: PAR_MNGT_ITEM_SUBSTITUTE[] = [];
    lstParLocDetails: PAR_MNGT_PAR_LOC_DETAILS[] = [];
    _deviceTokenEntry: string[] = [];
    public newItem = new PAR_MNGT_ITEM();
    public subItem = new PAR_MNGT_ITEM_SUBSTITUTE();
    OrgGrpId: string;
    ItemId: string;
    mode: string;
    lookupitem: boolean;
    blnPharmItemAllocated: boolean = false;
    statusForSubItemUpdate: number;
    statusMesssage: string;
    recordsPerPage: number;
    statusList: any;
    showHide: boolean = false;
    breadCrumbMenu: Menus;
    constructor(
        private setupItemServices: SetupItemsServices,
        public router: Router,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService,
        private spinnerService: SpinnerService) {

        this.breadCrumbMenu = new Menus();
    }
    ngOnInit(): void {
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPage = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.newItem = this.atParSharedDataService.storage;
        this.BindGrid();
    }

    BindGrid() {
        this.OrgGrpId = this.newItem.ORG_GROUP_ID;
        this.ItemId = this.newItem.ITEM_ID + "-" + this.newItem.SHORT_DESCR;
        this.statusList = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'Active', value: true });
        this.statusList.push({ label: 'InActive', value: false });
        try {
            this.spinnerService.start();
            this.setupItemServices.GetPharmacyItemLocations(this.newItem.ITEM_ID)
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                this.lstParLocDetails = resp.DataList;
                                if (this.lstParLocDetails.length > 0) {
                                    this.blnPharmItemAllocated = true;
                                }

                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }

        try {
            this.spinnerService.start();
            this.setupItemServices.GetSubstituteItemDetails(this.newItem.ITEM_ID, this.newItem.ORG_GROUP_ID)
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                this.showHide = true;
                                this.lstSubstituteItemsData = resp.DataList;
                                for (let i = 0; i <= this.lstSubstituteItemsData.length - 1; i++) {
                                    if (this.lstSubstituteItemsData[i].STATUS == true) {
                                        this.lstSubstituteItemsData[i].STATUS_ACTION = true;
                                    }
                                    else {
                                        this.lstSubstituteItemsData[i].STATUS_ACTION = false;
                                    }

                                }
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Warn:
                            {
                                if (resp.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                    this.msgs = [];
                                }
                                else {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                }
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }
    }

    lookup() {
        if (this.subItem.ITEM_ID == undefined) {
            this.subItem.ITEM_ID = "";
        }
        try {
            this.spinnerService.start();
            this.setupItemServices.getItemDetails(this.subItem.ITEM_ID, "", "", "", "", "", "", "", "", "", "", "", "", false, this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], true)
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                if (resp.DataList.length == 1) {
                                    this.lookupitem = false;
                                    this.subItem.ITEM_ID = resp.DataList[0].ITEM_ID;
                                    this.subItem.ITEM_DESCR = resp.DataList[0].SHORT_DESCR;
                                }
                                else {
                                    this.lookupitem = true;
                                    this.lstSubItemData = resp.DataList;
                                }
                                this.msgs = [];
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });

                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });

                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "lookup");
        }
    }

    updateSubItems(subItemData: PAR_MNGT_ITEM_SUBSTITUTE, event) {
        try {
            if (event == true) {
                this.statusForSubItemUpdate = 1;
            }
            else {
                this.statusForSubItemUpdate = 0;
            }
            this.setupItemServices.UpdateSubstituteItem(this.newItem.ORG_GROUP_ID, this.newItem.ITEM_ID, subItemData.SUBSTITUTE_ITEM_ID, this.statusForSubItemUpdate, true).forEach(resp => {
                this.msgs = [];
                this.spinnerService.start();
                switch (resp.StatType) {
                    case StatusType.Success:
                        {
                            this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "Item").replace("2%", subItemData.SUBSTITUTE_ITEM_ID);
                            this.msgs = [];
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            this.BindGrid();
                            this.spinnerService.stop();
                            break;
                        }
                    case StatusType.Warn:
                        {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    case StatusType.Error:
                        {
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });

                            this.spinnerService.stop();
                            break;
                        }
                }
            });
        } catch (ex) {
            this.clientErrorMsg(ex, "updateSubItems");
        }
    }

    insertSubItems() {
        try {
            if (this.subItem.ITEM_ID == undefined || this.subItem.ITEM_ID == null || this.subItem.ITEM_ID =="") {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter the valid substitute item" });
                return;
            }
            if (this.subItem.ITEM_DESCR == undefined || this.subItem.ITEM_DESCR == null || this.subItem.ITEM_DESCR == "") {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter the valid substitute item" });
                return;
            }
            this.setupItemServices.InsertSubstituteItem(this.newItem.ORG_GROUP_ID, this.newItem.ITEM_ID, this.subItem.ITEM_ID, this.subItem.PRIORITY, this.subItem.ITEM_DESCR, 1, this.blnPharmItemAllocated, this.lstParLocDetails).forEach(resp => {
                this.msgs = [];
                this.spinnerService.start();
                switch (resp.StatType) {
                    case StatusType.Success:
                        {
                            this.statusMesssage = "Item ID  " + this.subItem.ITEM_ID + "  Inserted Successfully";
                            this.msgs = [];
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            this.subItem.ITEM_ID = "";
                            this.subItem.ITEM_DESCR = "";
                            this.subItem.ITEM_ID = "";
                            this.subItem.PRIORITY = null;
                            this.BindGrid();
                            this.lookupitem = false;
                            this.spinnerService.stop();
                            break;
                        }

                    case StatusType.Error:
                        {
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.subItem.ITEM_ID = "";
                            this.subItem.ITEM_DESCR = "";
                            this.subItem.PRIORITY = null;
                            this.spinnerService.stop();
                            break;
                        }

                    case StatusType.Warn:
                        {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.subItem.ITEM_ID = "";
                            this.subItem.ITEM_DESCR = "";
                            this.subItem.PRIORITY = null;
                            this.spinnerService.stop();
                            break;
                        }
                }
            });

        } catch (ex) {
            this.clientErrorMsg(ex, "insertSubItems");
        }
    }

    selectedRow(selectedRowData: PAR_MNGT_ITEM) {
        this.msgs = [];
        this.subItem.ITEM_ID = selectedRowData.ITEM_ID;
        this.subItem.ITEM_DESCR = selectedRowData.SHORT_DESCR;
        this.subItem.PRIORITY = null;
    }

    goBack() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        let navigationExtras: NavigationExtras = {
            queryParams: { "mode": (ModeEnum.List).toString() },
            preserveQueryParams: false,
            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    }
    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
}