import {
    NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy,
    Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style,
    transition, animate
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { datatableservice } from './../components/datatable/datatableservice';
import { CheckInCheckOutItemsServices } from "../../app/TrackIT/tkit-check-in_check-out-services";
import { AtParConstants } from "../Shared/AtParConstants";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType, ModeEnum, StatusType, enum_TKIT_EQP_TYPE, enum_CHECKINOUT } from '../Shared/AtParEnums';
import { SelectItem, Message } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { TKIT_REQUESTOR } from "../../app/Entities/TKIT_REQUESTOR";
import { VM_TKIT_ITEM_DETAILS } from "../../app/Entities/VM_TKIT_ITEM_DETAILS";
import { VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS } from "../../app/Entities/VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS";
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { TKIT_ITEM_TYPE } from '../../app/Entities/TKIT_ITEM_TYPE';
import { HttpService } from '../Shared/HttpService';
import { Response } from "@angular/http";
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { TKIT_ITEM_INVENTORY } from '../../app/Entities/TKIT_ITEM_INVENTORY';
import { ConfirmationService } from '../components/common/api';

declare var module: {
    id: string;
}

@Component({

    templateUrl: 'tkit-check-in_check-out.component.html',
    providers: [CheckInCheckOutItemsServices, AtParConstants, datatableservice, ConfirmationService],
})

export class CheckIn_CheckOutComponent {
    pop: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    public newItem = new PAR_MNGT_VENDOR();

    checkOutItemsList: VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS[] = [];
    public itemDetails: VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS;
    breadCrumbMenu: Menus;
    statusMesssage: string = "";
    msgs: Message[] = [];
    deviceTokenEntry: string[] = [];
    tkitDeviceTokenEntry: string[] = [];
    requestorData: SelectItem[] = [];
    requestorDataList: TKIT_REQUESTOR[] = [];
    itemQuantity: number = 0;
    itemIdSearch: string = "";
    hasSerialId: boolean = false;
    serialIdSearch: string = "";
    serialID: string = "";
    itemTypeIndicator: string = "";
    selectedRequestor: string = "";
    checkoutMode: string = enum_CHECKINOUT[enum_CHECKINOUT.CIN].toString();
    mode: any;
    item: any;
    isADD: boolean;
    checkinQty: string;
    isSerial: boolean = false;
    isData: boolean = true;
    isGo: boolean = true;
    itemSearchID: string;
    isDisabled: boolean = false;
    cursor: string;
    lstFilterItemIDs: any = [];
    lstFilterSerialIDs: any = [];
    lstFilteredItems: any = [];
    lstItems: VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS[] = [];
    lstSerialIDs: TKIT_ITEM_INVENTORY[] = [];
    lstEqpTypes: SelectItem[];
    lstEqpTypesTemp: TKIT_ITEM_TYPE[];
    selectedEqpmtType: string;
    createForm: boolean = false;
    assetID: string = '';

    constructor(private checkInCheckOutItemsServices: CheckInCheckOutItemsServices,
        private router: Router,
        private spinnerService: SpinnerService,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService,
        private httpService: HttpService,
        private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();
    }

    async go() {
        try {
            if (this.hasSerialId == true && this.itemIdSearch.toUpperCase() == this.itemSearchID.toUpperCase()) {
                await this.checkSerialId();
                return;
            }
            //this.pop = false;
            let searchItem: string[];
            searchItem = this.itemIdSearch.split('(');
            if (searchItem[1] != null && searchItem[1] != '' && searchItem[1] != undefined) {
                searchItem = searchItem[1].split(')');
                this.itemIdSearch = searchItem[0].trim();
                await this.getTypeIndicator();
                await this.getSerialIds();
            }
            else {
                this.itemIdSearch = searchItem[0].trim();
                await this.getTypeIndicator();
                await this.getSerialIds();
                this.serialIdSearch = this.lstSerialIDs[0].SERIAL_NO;
                this.assetID = searchItem[0].trim();
                await this.checkSerialId();
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "go");
        }
    }

    async ngOnInit() {

        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
            this.msgs = [];
            this.mode = enum_CHECKINOUT[enum_CHECKINOUT.COUT];
            await this.getItems();
            this.spinnerService.stop();


        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    increaseQuantity() {
        try {
            if (this.itemDetails.checkinQty != null && this.itemDetails.checkinQty != undefined) {
                this.itemDetails.checkinQty++;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "increaseQuantity");
        }
    }

    decreaseQuantity() {
        try {
            if (this.itemDetails.checkinQty != 0 && this.itemDetails.checkinQty != null && this.itemDetails.checkinQty != undefined)
                this.itemDetails.checkinQty--;
        } catch (ex) {
            this.clientErrorMsg(ex, "decreaseQuantity");
        }
    }

    async getTypeIndicator() {
        let msg;
        this.spinnerService.start();
        try {


            await this.checkInCheckOutItemsServices.getTypeIndicator(this.itemIdSearch)
                .forEach(resp => {
                    this.itemSearchID = this.itemIdSearch;
                    if (resp.StatusCode == AtparStatusCodes.TKIT_E_SERIALINACTIVATED) {
                        msg = "item " + this.itemIdSearch + " is inactivated";
                        this.hasSerialId = false;
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.spinnerService.stop();
                        return;
                    }
                    else if (resp.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        msg = "item " + this.itemIdSearch + " does not exist";
                        this.hasSerialId = false;
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.spinnerService.stop();
                        return;
                    }
                    else {
                        switch (resp.StatType) {
                            case StatusType.Success:
                                this.msgs = [];
                                this.itemTypeIndicator = resp.DataVariable;
                                this.itemIdSearch = resp.Data;
                                if (this.itemTypeIndicator != undefined && this.itemTypeIndicator != null && this.itemTypeIndicator != "") {
                                    if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
                                        this.checkEqItemAvailability();
                                    } else {
                                        this.hasSerialId = false;
                                        this.checkItemAvailability();
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            case StatusType.Error:
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            case StatusType.Warn:
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                        }
                    }
                });


        }
        catch (ex) {
            this.clientErrorMsg(ex, "getTypeIndicator");
        }
    }

    async checkSerialId() {
        try {
            this.spinnerService.start();
            let msg;
            await this.checkInCheckOutItemsServices.checkSerialId(this.itemIdSearch, this.serialIdSearch)
                .forEach(resp => {
                    if (resp.StatusCode == AtparStatusCodes.TKIT_E_SERIALINACTIVATED) {
                        if (this.assetID != null && this.assetID != '' && this.assetID != undefined) {
                            msg = "Asset " + this.assetID + " is inactivated";
                        }
                        else {
                            msg = "Serial# " + this.serialIdSearch + " is inactivated";
                        }
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.serialIdSearch = '';
                        this.assetID = '';
                        this.hasSerialId = false;
                        this.spinnerService.stop();
                        return;
                    }
                    else if (resp.StatusCode == AtparStatusCodes.TKIT_E_SERIALNOTEXISTS) {
                        if (this.assetID != null && this.assetID != '' && this.assetID != undefined) {
                            msg = "Asset " + this.assetID + " does not exist";
                        }
                        else {
                            msg = "Serial# " + this.serialIdSearch + " does not exist";
                        }
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.serialIdSearch = '';
                        this.assetID = '';
                        this.hasSerialId = false;
                        this.spinnerService.stop();
                        return;
                    }
                    else {
                        switch (resp.StatType) {
                            case StatusType.Success:
                                this.msgs = [];
                                var itemAvailability = resp.DataVariable;
                                if (itemAvailability > 0) {
                                    if (this.assetID != null && this.assetID != '' && this.assetID != undefined) {
                                        msg = "Asset " + this.assetID + " has already been checked in";
                                    }
                                    else {
                                        msg = "Serial# " + this.serialIdSearch + " has already been checked in";
                                    }
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                                    this.itemIdSearch = '';
                                    this.assetID = '';
                                    this.hasSerialId = false;
                                }
                                else {
                                    this.getItemDetails();
                                }
                                this.spinnerService.stop();
                                break;
                            case StatusType.Error:
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            case StatusType.Warn:
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                this.spinnerService.stop();
                                break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkSerialId");
        }
    }

    async serialIdCheck() {
        try {
            await this.checkSerialId();
            await this.getItemDetails();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "serialIdCheck");
        }
    }

    async checkEqItemAvailability() {
        try {
            this.spinnerService.start();
            let msg;
            await this.checkInCheckOutItemsServices.checkEqItemAvailability(this.itemIdSearch, this.selectedRequestor)
                .forEach(resp => {
                    if (resp.StatusCode == AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                        msg = "Item " + this.itemIdSearch + " is not allowed for the selected user";
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.hasSerialId = false;
                        this.spinnerService.stop();
                        return;
                    }
                    else if (resp.StatusCode == AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                        msg = "Item " + this.itemIdSearch + + " does not exist";
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.hasSerialId = false;
                        this.spinnerService.stop();
                        return;
                    }
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            var itemAvailability = resp.DataVariable;
                            if (itemAvailability > 0) {
                                // this.pop = false;
                                msg = "Item " + this.itemIdSearch + " has already been checked in";
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                                this.itemIdSearch = '';
                                this.serialIdSearch = '';
                                return;
                            }
                            else {
                                this.serialIdSearch = '';
                                this.hasSerialId = true;
                            }
                            this.spinnerService.stop();
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                    }
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkEqItemAvailability");
        }
    }

    async checkItemAvailability() {
        let msg;
        try {
            this.spinnerService.start();
            await this.checkInCheckOutItemsServices.checkItemAvailability(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator)
                .forEach(resp => {
                    if (resp.StatusCode == AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                        msg = "Item " + this.itemIdSearch + " is not allowed for the selected user";
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.hasSerialId = false;
                        this.spinnerService.stop();
                        return;
                    }
                    else if (resp.StatusCode == AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                        msg = "Item " + this.itemIdSearch + " is Unavailable";
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.hasSerialId = false;
                        this.spinnerService.stop();
                        return;
                    }
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            var itemAvailability = resp.DataVariable;
                            if (itemAvailability > 0 && this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.B].toString()) {
                                this.hasSerialId = false;
                                //this.pop = false;
                                msg = "Item " + this.itemIdSearch + " has already been checked in";
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                                this.itemIdSearch = '';
                                this.serialIdSearch = '';
                                return;
                            }
                            else {

                                this.getItemDetails();
                            }

                            this.spinnerService.stop();
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkItemAvailability");
        }
    }

    async getItemDetails() {
        try {
            let msg;
            this.spinnerService.start();
            await this.checkInCheckOutItemsServices.getItemDetails(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator, this.serialIdSearch)
                .forEach(resp => {
                    if (resp.StatusCode == AtparStatusCodes.TKIT_E_ITEMNOTALLOWED) {
                        msg = "Item " + this.itemIdSearch + " is not allowed for the selected user";
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.hasSerialId = false;
                        this.spinnerService.stop();
                        return;
                    }
                    else if (resp.StatusCode == AtparStatusCodes.TKIT_E_ITEMNOTAVAILABLE) {
                        msg = "Item " + this.itemIdSearch + + " does not exist";
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                        this.itemIdSearch = '';
                        this.hasSerialId = false;
                        this.spinnerService.stop();
                        return;
                    }
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            this.item = resp.DataVariable;
                            this.itemDetails = new VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS();
                            this.itemDetails.ITEM_ID = this.item[0].ITEM_ID;
                            console.log("itemid : " + this.item[0].ITEM_ID);
                            this.itemDetails.SERIAL_NO = this.item[0].SERIAL_NO;
                            this.itemDetails.ITEM_DESCR = this.item[0].ITEM_DESCR;
                            this.itemDetails.VENDOR = this.item[0].VENDOR;
                            this.itemDetails.MANUFACTURER = this.item[0].MANUFACTURER;
                            this.itemDetails.EQP_INDICATOR = this.itemTypeIndicator;
                            this.itemDetails.serialID = this.serialIdSearch;
                            if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
                                if (this.item[0].ITEM_QTY == 0) {
                                    this.itemDetails.itemQty = "Unavailable";
                                    this.itemDetails.checkinQty = 1;
                                }
                                this.isDisabled = true;
                                this.cursor = 'none';
                                this.itemDetails.color = "panel panel-blue no-shadow bdr-1";
                            }
                            else if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.B].toString()) {
                                if (this.item[0].ITEM_QTY == 0) {
                                    this.itemDetails.itemQty = "Unavailable";
                                    this.itemDetails.checkinQty = 1;
                                }
                                this.itemDetails.color = "panel panel-green no-shadow bdr-1";
                                this.isDisabled = true;
                                this.cursor = 'none';
                            }
                            else if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.F].toString()) {
                                if (this.item[0].ITEM_QTY == 0) {
                                    this.itemDetails.itemQty = "Unavailable";
                                }
                                else {
                                    this.itemDetails.itemQty = this.item[0].ITEM_QTY;
                                }
                                this.itemDetails.color = "panel panel-pink no-shadow bdr-1";
                                this.isDisabled = false;
                                this.cursor = 'pointer';
                            }
                            this.itemDetails.DELIVER_LOCATION = this.item[0].STORAGE_LOCATION;
                            this.itemDetails.PROCEDURE_CODE = "";
                            this.itemDetails.PATIENT_ID = "";
                            this.itemDetails.PATIENT_LNAME = "";
                            this.itemDetails.ASSET_ID = this.item[0].ASSET_ID;
                            this.itemSearchID = '';
                            this.itemIdSearch = '';
                            this.serialIdSearch = '';
                            //this.isADD = false;
                            this.hasSerialId = false;
                            // this.serialIdSearch = '';
                            setTimeout(() => {
                                (<HTMLInputElement>document.getElementById("txtCheckinQty")).focus();

                            }, 500);
                            this.pop = true;
                            this.spinnerService.stop();
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getItemDetails");
        }
    }

    async getItems() {
        try {
            this.spinnerService.start();
            await this.checkInCheckOutItemsServices.getItems(this.itemIdSearch)
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.lstItems = resp.DataList;
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getItemDetails");
        }
    }
    async getSerialIds() {
        try {
            this.spinnerService.start();
            await this.checkInCheckOutItemsServices.getSerialIDs(this.itemIdSearch)
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.lstSerialIDs = resp.DataList;
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getItemDetails");
        }
    }

    Add() {
        try {
            let filterItem = this.checkOutItemsList.filter(item => item.ITEM_ID == this.itemDetails.ITEM_ID);
            if (filterItem.length == 0) {
                if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
                    this.itemDetails.isSerial = true;
                }
                else if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.B].toString() ||
                    this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.F].toString()) {
                    this.itemDetails.isSerial = false;
                }
                this.itemDetails.ITEM_QTY = this.itemDetails.checkinQty;
                this.checkOutItemsList.push(this.itemDetails);
            }

            this.isADD = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "Add");
        }

    }

    async checkInOutItems() {
        try {
            this.spinnerService.start();
            await this.checkInCheckOutItemsServices.checkInOutItems(this.checkOutItemsList, this.selectedRequestor, this.checkoutMode)
                .subscribe((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    switch (data.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Items checked in successfully." });
                            this.spinnerService.stop();
                            // this.pop = false;
                            this.itemIdSearch = '';
                            this.hasSerialId = false;
                            this.checkOutItemsList = [];
                            //this.isADD = false;
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "CheckIn failed" });
                            this.spinnerService.stop();
                            break;
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkInOutItems");
        }

    }

    async onCloseItemClick(item, event) {
        try {
            this.checkOutItemsList = this.checkOutItemsList.filter(fItem => fItem.ITEM_ID != item.ITEM_ID);
            if (this.checkOutItemsList.length == 0) {
                this.isADD = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onCloseItemClick");
        }
    }
    async fillItemIDsAuto(event) {
        try {
            let query: string = event.query;
            let lstItems: any = [];
            this.lstFilterItemIDs = [];
            let lstfilterItems = [];
            lstItems = this.filterItemIDs(query, this.lstItems);
            for (let i = 0; i <= lstItems.length - 1; i++) {
                if (lstItems[i].ASSET_ID != null && lstItems[i].ASSET_ID != "" && lstItems[i].ASSET_ID != undefined && lstItems[i].ASSET_ID.indexOf(query) != -1) {
                    lstfilterItems[i] = lstItems[i].ASSET_ID;
                }
                else {

                    lstfilterItems[i] = lstItems[i].ITEM_DESCR + "(" + lstItems[i].ITEM_ID + ")";
                }
            }
            let filterItems: any = [];
            filterItems = lstfilterItems;
            if (filterItems.length != 1) {
                filterItems.forEach(item => {
                    if (this.lstFilterItemIDs.filter(x => x == item).length == 0) {
                        this.lstFilterItemIDs.push(item);

                    }
                });
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "fillItemIDsAuto");
        }
    }

    filterItemIDs(query: string, lstItemIDs: any[]): any[] {
        try {
            let filtered: any[] = [];
            if (query == "%") {
                for (let i = 0; i < lstItemIDs.length; i++) {
                    filtered.push(lstItemIDs[i]);
                }
            } else {
                if (query.length >= 0) {
                    for (let i = 0; i < lstItemIDs.length; i++) {
                        let item = lstItemIDs[i];
                        if (item.ASSET_ID != null) {
                            if (item.ITEM_ID.toLowerCase().indexOf(query.trim().toLowerCase()) == 0 || item.ASSET_ID.toLowerCase().indexOf(query.trim().toLowerCase()) == 0) {
                                if ((filtered.filter(x => x.ITEM_ID == item.ITEM_ID && x.ASSET_ID == item.ASSET_ID)).length == 0) {
                                    filtered.push(item);
                                }
                            }
                        }
                        else {
                            if (item.ITEM_ID.toLowerCase().indexOf(query.trim().toLowerCase()) == 0 || item.ITEM_DESCR.toLowerCase().indexOf(query.trim().toLowerCase()) == 0) {
                                if ((filtered.filter(x => x.ITEM_ID == item.ITEM_ID || x.ITEM_DESCR == item.ITEM_DESCR)).length == 0) {
                                    filtered.push(item);
                                }
                            }
                        }
                    }
                }
            }
            return filtered;
        } catch (ex) {
            this.clientErrorMsg(ex, "filterItemIDs");
        }
    }
    async fillSerialIDsAuto(event) {
        try {
            let query: string = event.query;
            let lstSerial: any = [];
            this.lstFilterSerialIDs = [];
            lstSerial = this.filterSerialIDs(query, this.lstSerialIDs);
            for (let i = 0; i <= lstSerial.length - 1; i++) {
                this.lstFilterSerialIDs[i] = lstSerial[i].SERIAL_NO;

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "fillSerialIDsAuto");
        }
    }

    filterSerialIDs(query: string, lstItemIDs: any[]): any[] {
        try {
            let filtered: any[] = [];
            if (query == "%") {
                for (let i = 0; i < lstItemIDs.length; i++) {
                    filtered.push(lstItemIDs[i]);
                }
            } else {
                if (query.trim().toLowerCase() != '') {
                    if (query.substring(0, 1) != ' ') {
                        for (let i = 0; i < lstItemIDs.length; i++) {
                            let item = lstItemIDs[i];

                            if (item.SERIAL_NO.toLowerCase().indexOf(query.trim().toLowerCase()) == 0) {
                                if ((filtered.filter(x => x.SERIAL_NO == item.SERIAL_NO)).length == 0) {
                                    filtered.push(item);
                                }
                            }

                        }
                    }
                }
            }
            return filtered;
        } catch (ex) {
            this.clientErrorMsg(ex, "filterSerialIDs");
        }
    }
    async populateEquipmentTypes() {
        this.spinnerService.start();
        try {
            await this.checkInCheckOutItemsServices.getEquipmentType(this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<TKIT_ITEM_TYPE>;
                    this.msgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.lstEqpTypes = [];
                            this.lstEqpTypesTemp = [];
                            this.lstEqpTypes.push({ label: "Select One", value: "Select One" })
                            if (data.DataList != null && data.DataList != undefined) {
                                this.lstEqpTypesTemp = data.DataList;
                                for (var i = 0; i < data.DataList.length; i++) {
                                    this.lstEqpTypes.push({ label: data.DataList[i].ITEM_TYPE_DESCR + ' ( ' + data.DataList[i].ITEM_TYPE + ' ) ', value: data.DataList[i].ITEM_TYPE })
                                }
                            }
                            break;

                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateEquipmentTypes");
        }
    }

    async fillItemsAuto(event) {


        this.lstFilteredItems = [];
        let query = event.query;

        try {
            if (this.selectedEqpmtType != null && this.selectedEqpmtType != undefined && this.selectedEqpmtType != "" && this.selectedEqpmtType != "Select One") {
                let selectedIndicator = asEnumerable(this.lstEqpTypesTemp).Where(x => x.ITEM_TYPE === this.itemIdSearch).Select(x => x.ITEM_TYPE_INDICATOR).ToArray();

                await this.checkInCheckOutItemsServices.getItemsForAutoSearch(this.selectedEqpmtType, selectedIndicator[0].toString()).
                    catch(this.httpService.handleError).then((res: Response) => {
                        this.spinnerService.stop();
                        let data = res.json();
                        this.msgs = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.lstItems = data.DataList;
                                this.lstFilteredItems = this.filterBusinessUnits(query, this.lstItems);
                                break;
                            }
                            case StatusType.Warn: {
                                if (data.StatusCode != AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                }
                                break;
                            }
                            case StatusType.Error: {
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    });
            }
            else {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Equipment Type" });
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "fillItemsAuto");
        }


    }

    filterBusinessUnits(query, businessunits: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < businessunits.length; i++) {
                let Bunitvalue = businessunits[i];

                filtered.push(Bunitvalue.ITEM_ID + " " + "(" + Bunitvalue.ITEM_DESCR + ")");
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < businessunits.length; i++) {
                    let Bunitvalue = businessunits[i];
                    Bunitvalue = Bunitvalue.ITEM_ID + " " + "(" + Bunitvalue.ITEM_DESCR + ")";
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }


        return filtered;
    }
    async deleteRow(item, event) {
        this.msgs = [];
        try {
            await this.confirmationService.confirm({
                message: "Are you sure you want to delete " + item.ITEM_ID + " ?",
                accept: async () => {
                    this.checkOutItemsList = this.checkOutItemsList.filter(fItem => fItem.ITEM_ID != item.ITEM_ID);
                    if (this.checkOutItemsList.length == 0) {
                        this.isADD = false;
                    }
                }

            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "deleteRow");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

} 