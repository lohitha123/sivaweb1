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
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from "../components/datatable/datatable"
import { Menus } from '../AtPar/Menus/routepath';
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-setup-items-home.component.html',
    providers: [SetupItemsServices],

})

export class SetupItemsHomeComponent implements OnInit {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    msgs: Message[] = [];

    lstVendordata: SelectItem[] = [];
    lstSetupItemsData: PAR_MNGT_ITEM[] = [];
    _deviceTokenEntry: string[] = [];
    vendorSearch: string;
    selectedItemId: string = "";
    selectedDescription: string = "";
    selectedVendor: string = "";
    selectedManufacturer: string = "";
    selectedUpicId: string = "";
    selectedFromItemPrice: string = "";
    selectedToItemPrice: string = "";
    selectedVendorItemId: string = "";
    selectedMfgItemId: string = "";
    selectedCustItemId: string = "";
    selectedSubItems: boolean = false;
    gridShowHide: boolean = false;
    hdnSubItems: string = "";
    STATUS_ACTIVE_INACTIVE: boolean;
    procConvRt: string;
    parConvRt: string;
    parUom: string;
    unitOfProc: string;
    unitOfIssue: string;
    resultConvFact: any;
    packagingString: string;
    recordsPerPage: number;
    mode: string;
    statusList: any;
    breadCrumbMenu: Menus;
    currentStatusList: any;

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

        this.spinnerService.start();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPage = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.route.queryParams.subscribe(params => {

            let statusMessage = params["statusMessage"];
            this.mode = params["mode"];
            let statusType = params["statusType"];

            if (statusType !== null && statusType != undefined) {
                if (statusType == "success") {

                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });

                }

            }
            if (statusType == "warn") {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusMessage });
            }

        });
        this.BindVendors();
        this.statusList = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'Active', value: true });
        this.statusList.push({ label: 'InActive', value: false });
    }

    BindVendors() {
        try {
            this.spinnerService.start();
            if (this.vendorSearch == undefined || this.vendorSearch == null || this.vendorSearch.length == 0) {
                this.vendorSearch = "";
            }
            this.setupItemServices.getVendorDetails(this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], '', this.vendorSearch.trim())
                .forEach(resp => {
                    this.spinnerService.stop();
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                this.lstVendordata.push({ label: "Select One", value: "" })
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                    this.lstVendordata.push({ label: resp.DataList[i].VENDOR_ID + " - " + resp.DataList[i].VENDOR_NAME, value: resp.DataList[i].VENDOR_ID })

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
                                if (resp.DataList.length == 0) {
                                    this.lstVendordata.push({ label: "Select One", value: "" });
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
                                break;
                            }
                    }
                });

            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindVendors");
        }
    }
    async BindGrid() {
        try {
            this.currentStatusList = [];
            this.currentStatusList.push({ label: 'All', value: null });
            this.currentStatusList.push({ label: 'Active', value: 'Active' });
            this.currentStatusList.push({ label: 'InActive', value: 'InActive' });
            this.currentStatusList.push({ label: 'Pending', value: 'Pending' });

            if (this.gridShowHide == true) {
                this.dataTableComponent.reset();
            }
            this.msgs = [];
            this.spinnerService.start();
            this.gridShowHide = false;
            if (this.selectedFromItemPrice !== "" && this.selectedToItemPrice === "" || this.selectedFromItemPrice === "" && this.selectedToItemPrice !== "") {
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: "Please enter both Item Price From and To values." });
                this.spinnerService.stop();
                return false;
            }
            if (this.selectedSubItems == true) {
                this.hdnSubItems = "True";
            }
            else {
                this.hdnSubItems = "False";
            }
            this.setupItemServices.getItemDetails(this.selectedItemId, this.selectedDescription, this.selectedVendor, this.selectedUpicId,
                this.selectedManufacturer, this.selectedFromItemPrice, this.selectedToItemPrice, this.selectedCustItemId, this.selectedVendorItemId, this.selectedMfgItemId,
                "", "", "", false, this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.selectedSubItems)

                .forEach(resp => {

                    switch (resp.StatType) {

                        case StatusType.Success:
                            {
                                this.gridShowHide = true;
                                this.lstSetupItemsData = resp.DataList;
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {

                                    if (resp.DataList[i].STATUS == 0) {
                                        resp.DataList[i].STATUS = "Active";
                                        resp.DataList[i].STATUS_ACTIVE_INACTIVE = true;
                                    }
                                    else if (resp.DataList[i].STATUS == 1) {
                                        resp.DataList[i].STATUS = "Inactive";
                                        resp.DataList[i].isEnabled = true;
                                        resp.DataList[i].STATUS_ACTIVE_INACTIVE = false;
                                    }
                                    else {
                                        resp.DataList[i].STATUS = "Pending";
                                        resp.DataList[i].STATUS_ACTIVE_INACTIVE = false;

                                    }
                                    if (resp.DataList[i].ITEM_PRICE != 0) {
                                        resp.DataList[i].ITEM_PRICE = parseFloat(resp.DataList[i].ITEM_PRICE).toFixed(2);
                                    }
                                    else {
                                        resp.DataList[i].ITEM_PRICE = '';
                                    }

                                    if (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null || resp.DataList[i].PAR_UOM == 'null') {
                                        resp.DataList[i].CONV_RATE_PAR_UOM = '';
                                    }                                   

                                    this.resultConvFact = '';

                                    if (resp.DataList[i].CONV_FACTOR !== "" && resp.DataList[i].CONV_FACTOR != null && resp.DataList[i].CONV_RATE_PAR_UOM !== "" && resp.DataList[i].CONV_RATE_PAR_UOM != null) {

                                        this.resultConvFact = resp.DataList[i].CONV_FACTOR / resp.DataList[i].CONV_RATE_PAR_UOM;
                                    }

                                    let _strFinalConvFact: string = '';
                                    _strFinalConvFact = this.resultConvFact == '0' ? '' : this.resultConvFact + '';


                                    if ((resp.DataList[i].UNIT_OF_PROCUREMENT == '' || resp.DataList[i].UNIT_OF_PROCUREMENT == null || resp.DataList[i].UNIT_OF_PROCUREMENT == 'null') && (_strFinalConvFact == ''
                                        || _strFinalConvFact == null) && (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null ||
                                            resp.DataList[i].PAR_UOM == 'null') && (resp.DataList[i].CONV_FACTOR == "" || resp.DataList[i].CONV_FACTOR == null || resp.DataList[i].CONV_FACTOR == 'null')
                                        && (resp.DataList[i].UNIT_OF_ISSUE == "" || resp.DataList[i].UNIT_OF_ISSUE == null || resp.DataList[i].UNIT_OF_ISSUE == 'null')) {
                                        this.packagingString = '';
                                    }
                                    else {


                                        let proc_V = (resp.DataList[i].UNIT_OF_PROCUREMENT == '' || resp.DataList[i].UNIT_OF_PROCUREMENT == null || resp.DataList[i].UNIT_OF_PROCUREMENT == 'null') ? '_' : resp.DataList[i].UNIT_OF_PROCUREMENT + '';
                                        let finalConv_V = (_strFinalConvFact == '' || _strFinalConvFact == null) ? '_' : _strFinalConvFact + '';
                                        let par_UOM_V = (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null || resp.DataList[i].PAR_UOM == 'null') ? '_' : resp.DataList[i].PAR_UOM + '';
                                        let conv_V = (resp.DataList[i].CONV_FACTOR == '' || resp.DataList[i].CONV_FACTOR == null || resp.DataList[i].CONV_FACTOR == 'null') ? '_' : resp.DataList[i].CONV_FACTOR + '';
                                        let unit_V = (resp.DataList[i].UNIT_OF_ISSUE == '' || resp.DataList[i].UNIT_OF_ISSUE == null || resp.DataList[i].UNIT_OF_ISSUE == 'null') ? '_' : resp.DataList[i].UNIT_OF_ISSUE + '';


                                        this.packagingString = proc_V + ' /' + finalConv_V + ' ' + par_UOM_V + ' /' + conv_V + ' ' + unit_V;
                                    }


                                    resp.DataList[i].PACKAGING_STRING = this.packagingString;

                                    if (resp.DataList[i].PHARMACY_FLG == 1 && resp.DataList[i].SUBSTITUTE_ITEM_FLG == 0) {
                                        resp.DataList[i].SUB_ITEM_FLG_STATUS = true;
                                    }
                                    else {
                                        resp.DataList[i].SUB_ITEM_FLG_STATUS = false;
                                    }
                                }
                                this.lstSetupItemsData = resp.DataList;
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.gridShowHide = false;
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                this.gridShowHide = false;
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                this.gridShowHide = false;
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }
    }

    addSetupItem() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Item';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Add,
                "appId": 2
            },
            relativeTo: this.route
        };
        this.router.navigate(['setupmodifyitems'], navigationExtras);

    }

    UpdateSetupItem(SetupModifyItemsEditData: PAR_MNGT_ITEM) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Item';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        SetupModifyItemsEditData.ITEM_PRICE = + SetupModifyItemsEditData.ITEM_PRICE.toString().split("/")[0];
        this.atParSharedDataService.storage = SetupModifyItemsEditData;
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Edit
            },
            relativeTo: this.route
        };
        this.router.navigate(['setupmodifyitems'], navigationExtras);
    }

    updateItemStatus(ItemId, event) {
        try {
            this.setupItemServices.UpdateItemStatus(ItemId, event).forEach(resp => {

                this.msgs = [];
                this.spinnerService.start();
                switch (resp.StatType) {
                    case StatusType.Success:
                        {
                            this.msgs = [];
                            resp.StatusMessage = AtParConstants.Updated_Msg.replace("1%", "Item").replace("2%", ItemId);
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: resp.StatusMessage });
                            this.loadGridAfterStatusUpdate();
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
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateItemStatus");
        }
    }

    loadGridAfterStatusUpdate() {
        try {
            this.setupItemServices.getItemDetails(this.selectedItemId, this.selectedDescription, this.selectedVendor, this.selectedUpicId,
                this.selectedManufacturer, this.selectedFromItemPrice, this.selectedToItemPrice, this.selectedCustItemId, this.selectedVendorItemId, this.selectedMfgItemId,
                "", "", "", false, this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.selectedSubItems)

                .forEach(resp => {
                    this.spinnerService.start();
                    switch (resp.StatType) {
                        case StatusType.Success:
                            {
                                this.lstSetupItemsData = resp.DataList;
                                for (let i = 0; i <= resp.DataList.length - 1; i++) {

                                    if (resp.DataList[i].STATUS == 0) {
                                        resp.DataList[i].STATUS = "Active";
                                        resp.DataList[i].STATUS_ACTIVE_INACTIVE = true;
                                    }
                                    else if (resp.DataList[i].STATUS == 1) {
                                        resp.DataList[i].STATUS = "Inactive";
                                        resp.DataList[i].isEnabled = true;
                                        resp.DataList[i].STATUS_ACTIVE_INACTIVE = false;
                                    }
                                    else {
                                        resp.DataList[i].STATUS = "Pending";
                                        resp.DataList[i].STATUS_ACTIVE_INACTIVE = false;

                                    }

                                    if (resp.DataList[i].ITEM_PRICE != 0) {
                                        resp.DataList[i].ITEM_PRICE = parseFloat(resp.DataList[i].ITEM_PRICE).toFixed(2);
                                    }
                                    else {
                                        resp.DataList[i].ITEM_PRICE = '';
                                    }

                                    if (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null || resp.DataList[i].PAR_UOM == 'null') {
                                        resp.DataList[i].CONV_RATE_PAR_UOM = '';
                                    }


                                    this.resultConvFact = '';

                                    if (resp.DataList[i].CONV_FACTOR !== "" && resp.DataList[i].CONV_FACTOR != null && resp.DataList[i].CONV_RATE_PAR_UOM !== "" && resp.DataList[i].CONV_RATE_PAR_UOM != null) {

                                        this.resultConvFact = resp.DataList[i].CONV_FACTOR / resp.DataList[i].CONV_RATE_PAR_UOM;
                                    }

                                    let _strFinalConvFact: string = '';
                                    _strFinalConvFact = this.resultConvFact == '0' ? '' : this.resultConvFact + '';


                                    if ((resp.DataList[i].UNIT_OF_PROCUREMENT == '' || resp.DataList[i].UNIT_OF_PROCUREMENT == null || resp.DataList[i].UNIT_OF_PROCUREMENT == 'null') && (_strFinalConvFact == ''
                                        || _strFinalConvFact == null) && (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null ||
                                            resp.DataList[i].PAR_UOM == 'null') && (resp.DataList[i].CONV_FACTOR == "" || resp.DataList[i].CONV_FACTOR == null || resp.DataList[i].CONV_FACTOR == 'null')
                                        && (resp.DataList[i].UNIT_OF_ISSUE == "" || resp.DataList[i].UNIT_OF_ISSUE == null || resp.DataList[i].UNIT_OF_ISSUE == 'null')) {
                                        this.packagingString = '';
                                    }
                                    else {


                                        let proc_V = (resp.DataList[i].UNIT_OF_PROCUREMENT == '' || resp.DataList[i].UNIT_OF_PROCUREMENT == null || resp.DataList[i].UNIT_OF_PROCUREMENT == 'null') ? '_' : resp.DataList[i].UNIT_OF_PROCUREMENT + '';
                                        let finalConv_V = (_strFinalConvFact == '' || _strFinalConvFact == null) ? '_' : _strFinalConvFact + '';
                                        let par_UOM_V = (resp.DataList[i].PAR_UOM == '' || resp.DataList[i].PAR_UOM == null || resp.DataList[i].PAR_UOM == 'null') ? '_' : resp.DataList[i].PAR_UOM + '';
                                        let conv_V = (resp.DataList[i].CONV_FACTOR == '' || resp.DataList[i].CONV_FACTOR == null || resp.DataList[i].CONV_FACTOR == 'null') ? '_' : resp.DataList[i].CONV_FACTOR + '';
                                        let unit_V = (resp.DataList[i].UNIT_OF_ISSUE == '' || resp.DataList[i].UNIT_OF_ISSUE == null || resp.DataList[i].UNIT_OF_ISSUE == 'null') ? '_' : resp.DataList[i].UNIT_OF_ISSUE + '';


                                        this.packagingString = proc_V + ' /' + finalConv_V + ' ' + par_UOM_V + ' /' + conv_V + ' ' + unit_V;
                                    }


                                    resp.DataList[i].PACKAGING_STRING = this.packagingString;

                                    if (resp.DataList[i].PHARMACY_FLG == 1 && resp.DataList[i].SUBSTITUTE_ITEM_FLG == 0) {
                                        resp.DataList[i].SUB_ITEM_FLG_STATUS = true;
                                    }
                                    else {
                                        resp.DataList[i].SUB_ITEM_FLG_STATUS = false;
                                    }
                                }
                                this.lstSetupItemsData = resp.DataList;
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
                                break;
                            }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "loadGridAfterStatusUpdate");
        }
    }

    addSubstituteItem(SetupSubstituteItemsEditData: PAR_MNGT_ITEM) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Substitute Items';
        this.breadCrumbMenu.IS_DIV = false;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.atParSharedDataService.storage = SetupSubstituteItemsEditData;
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "mode": ModeEnum.Add,
                "appId": 2
            },
            relativeTo: this.route
        };
        this.router.navigate(['setupsubstituteitems'], navigationExtras);

    }
    clientErrorMsg(ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }

}

