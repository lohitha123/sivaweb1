import {
    NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy,
    Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style,
    transition, animate
} from '@angular/core';
import { Http, Response } from '@angular/http';

import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { datatableservice } from './../components/datatable/datatableservice';
import { CheckInCheckOutItemsServices } from "../../app/TrackIT/tkit-check-in_check-out-services";
import { ConfirmationService } from '../components/common/api';
import { AtParConstants } from "../Shared/AtParConstants";
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType, ModeEnum, EnumApps, StatusType, enum_TKIT_EQP_TYPE, enum_CHECKINOUT } from '../Shared/AtParEnums';
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
import { VM_TKIT_ITEM_DETAILS } from '../../app/Entities/VM_TKIT_ITEM_DETAILS';
import { VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS } from '../../app/Entities/VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS';
import { RM_SHIP_TO_LOCACTION } from '../../app/Entities/RM_SHIP_TO_LOCACTION';
import { MT_ATPAR_ORG_GROUP_PARAMETERS } from '../../app/Entities/mt_atpar_org_group_parameters';
import { MT_ATPAR_PATIENT_CACHE } from '../../app/Entities/MT_ATPAR_PATIENT_CACHE';
import { VM_TKIT_EQPITEMS } from '../../app/Entities/VM_TKIT_EQPITEMS';
import { TKIT_ITEM_INVENTORY } from '../../app/Entities/TKIT_ITEM_INVENTORY';



declare var module: {
    id: string;
}


@Component({
    templateUrl: 'tkit-check-out.component.html',
    providers: [CheckInCheckOutItemsServices, AtParConstants, ConfirmationService],
})

export class CheckOutComponent {

    checkOutItemsList: VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS[] = [];
    public itemDetails: VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS;
    breadCrumbMenu: Menus;

    msgs: Message[] = [];
    deviceTokenEntry: string[] = [];
    requestorData: SelectItem[] = [];
    requestorDataList: TKIT_REQUESTOR[] = [];
    lstOrgParms: MT_ATPAR_ORG_GROUP_PARAMETERS[];
    lstPatients: MT_ATPAR_PATIENT_CACHE[] = [];
    selectedRow: VM_TKIT_EQPITEMS;
    itemQuantity: number = 0;
    recordsPerPageSize: number = 0;
    selectedAccountNumber: string;

    mainForm: boolean = true;
    hasSerialId: boolean = false;
    pop: boolean = false;
    isAdd: boolean = false;
    isDisabled: boolean = false;
    isPatient: boolean = false;
    isProc: boolean = false;
    isLoc: boolean = false;

    itemIdSearch: string = "";
    statusMesssage: string = "";
    serialIdSearch: string = "";
    itemTypeIndicator: string = "";
    selectedRequestor: string = "Select Requestor";
    checkoutMode: string = "";
    selectedDeliveryLoc: string = "";
    strPatientCharge: string = "";
    cursor: string;
    itemSearchID: string;
    assetID: string = '';

    ddlDeliveryLoc: any;
    mode: any;
    ddlDepartment: any;
    ddlPatientName: any;
    ddlScanning: any;
    ddlAccount: any;
    ddlBedNo: any;
    lstFilterItemIDs: any = [];
    lstFilterSerialIDs: any = [];
    lstItems: TKIT_ITEM_INVENTORY[] = [];
    lstLocations: RM_SHIP_TO_LOCACTION[] = [];
    lstSerialIDs: TKIT_ITEM_INVENTORY[] = [];

    blnShowPatientsPopup: boolean = false;

    constructor(private checkInCheckOutItemsServices: CheckInCheckOutItemsServices,
        private router: Router,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants,
        private atParSharedDataService: AtParSharedDataService,
        private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();
    }

    async ngOnInit() {

        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.msgs = [];
            this.mode = enum_CHECKINOUT[enum_CHECKINOUT.COUT];
            this.checkoutMode = enum_CHECKINOUT[enum_CHECKINOUT.COUT].toString();
            this.recordsPerPageSize = parseInt(this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage].toString());
            await this.loadOrgGroupParams();
            await this.getRequestors();
            await this.getLocations();
            await this.getItems();
            this.spinnerService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    increaseQuantity() {
        try {
            if (this.itemDetails.COUT_QTY != 0 && this.itemDetails.COUT_QTY != null && this.itemDetails.COUT_QTY != undefined) {
                this.itemDetails.COUT_QTY++;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "increaseQuantity");
        }
    }

    decreaseQuantity() {
        try {
            if (this.itemDetails.COUT_QTY != 0 && this.itemDetails.COUT_QTY != null && this.itemDetails.COUT_QTY != undefined)
                this.itemDetails.COUT_QTY--;
        } catch (ex) {
            this.clientErrorMsg(ex, "decreaseQuantity");
        }
    }

    async getTypeIndicator() {
        try {
            this.msgs = [];
            let msg;
            this.spinnerService.start();
            if (this.hasSerialId == true && this.itemIdSearch.toUpperCase() == this.itemSearchID.toUpperCase()) {
                await this.checkSerialId();
                return;
            }
            else {
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
                                    this.spinnerService.stop();
                                    if (this.itemTypeIndicator != undefined && this.itemTypeIndicator != null && this.itemTypeIndicator != "") {
                                        if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
                                            this.checkEqItemAvailability();
                                        } else {
                                            this.hasSerialId = false;
                                            this.checkItemAvailability();
                                        }
                                    }
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
        } catch (ex) {
            this.clientErrorMsg(ex, "getTypeIndicator");
        }
    }

    async getRequestors() {
        try {
            this.spinnerService.start();
            await this.checkInCheckOutItemsServices.getRequestors(false, this.deviceTokenEntry)
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            this.requestorDataList = resp.DataList;
                            this.requestorData = [];
                            this.requestorData.push({ label: "Select Requestor", value: "Select Requestor" });
                            for (var i = 0; i < this.requestorDataList.length; i++) {
                                this.requestorData.push({ label: this.requestorDataList[i].FIRST_NAME + " " + this.requestorDataList[i].LAST_NAME + " (" + this.requestorDataList[i].REQUESTOR_ID + ")", value: this.requestorDataList[i].REQUESTOR_ID });
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
        } catch (ex) {
            this.clientErrorMsg(ex, "getRequestors");
        }
    }

    async getLocations() {
        try {
            this.spinnerService.start();

            await this.checkInCheckOutItemsServices.getLocations(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toString())
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            this.lstLocations = resp.DataList;
                            
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
        } catch (ex) {
            this.clientErrorMsg(ex, "getRequestors");
        }
    }

    async getRequestorDefLoc() {
        try {
            this.spinnerService.start();

            await this.checkInCheckOutItemsServices.getRequestorDefLoc()
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            if (this.lstLocations != null && this.lstLocations.length > 0) {
                                this.ddlDeliveryLoc = [];
                                this.isLoc = true;
                                // this.ddlDeliveryLoc.push({ label: "Select DeliveryLoc", value: "Select DeliveryLoc" });
                                for (var i = 0; i < this.lstLocations.length; i++) {
                                    this.ddlDeliveryLoc.push({ label: this.lstLocations[i].LOCATION_ID, value: this.lstLocations[i].LOCATION_ID });
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
                });
        } catch (ex) {
            this.clientErrorMsg(ex, "getRequestors");
        }
    }

    async checkSerialId() {
        try {
            let msg;
            this.spinnerService.start();
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
                        this.hasSerialId = false;
                        this.spinnerService.stop();
                        return;
                    }
                    else {
                        switch (resp.StatType) {
                            case StatusType.Success:
                                this.msgs = [];
                                var itemAvailability = resp.DataVariable;
                                if (itemAvailability == 0) {
                                    if (this.assetID != null && this.assetID != '' && this.assetID != undefined) {
                                        msg = "Asset " + this.assetID + " is unavailable";
                                    }
                                    else {
                                        msg = "Serial# " + this.serialIdSearch + " is unavailable";
                                    }
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                                    this.itemIdSearch = '';
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
        } catch (ex) {
            this.clientErrorMsg(ex, "checkSerialId");
        }
    }

    serialIdCheck() {
        this.checkSerialId();
        this.getItemDetails();
    }

    async checkEqItemAvailability() {
        try {
            let msg;
            this.spinnerService.start();

            this.checkInCheckOutItemsServices.checkEqItemAvailability(this.itemIdSearch, this.selectedRequestor)
                .forEach(async resp => {
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

                            if (itemAvailability == null) {
                                this.hasSerialId = false;
                                this.pop = false;
                                //blnGetDetailsFlag = false;
                                msg = "Item " + this.itemIdSearch + " is unavailable";
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                                this.itemIdSearch = '';
                                this.serialIdSearch = '';
                                this.spinnerService.stop();
                                return;
                            } else {
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
        } catch (ex) {
            this.clientErrorMsg(ex, "checkEqItemAvailability");
        }
    }

    async checkItemAvailability() {
        try {
            this.spinnerService.start();
            let msg;
            await this.checkInCheckOutItemsServices.checkItemAvailability(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator)
                .forEach(async resp => {
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
                            if (itemAvailability == 0) {
                                this.hasSerialId = false;
                                this.pop = false;
                                //blnGetDetailsFlag = false;
                                msg = "Item " + this.itemIdSearch + " is unavailable";
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                                this.itemIdSearch = '';
                                this.serialIdSearch = '';
                                this.spinnerService.stop();
                                return;
                            } else {
                                await this.getItemDetails();
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
        } catch (ex) {
            this.clientErrorMsg(ex, "checkItemAvailability");
        }
    }

    async getItemDetails() {
        let msg;
        try {
            this.spinnerService.start();
            this.checkInCheckOutItemsServices.getItemDetails(this.itemIdSearch, this.selectedRequestor, this.itemTypeIndicator, this.serialIdSearch)
                .forEach(async resp => {
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
                            let item = resp.DataVariable;
                            if (item != null && item.length > 0) {
                               
                                this.itemDetails = new VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS();
                                this.itemDetails.ITEM_ID = item[0].ITEM_ID;
                                this.itemDetails.SERIAL_NO = item[0].SERIAL_NO;
                                this.itemDetails.ITEM_DESCR = item[0].ITEM_DESCR;
                                this.itemDetails.ITEM_QTY = item[0].ITEM_QTY;
                                this.itemDetails.VENDOR = item[0].VENDOR;
                                this.itemDetails.MANUFACTURER = item[0].MANUFACTURER;
                                this.itemDetails.EQP_INDICATOR = this.itemTypeIndicator;
                                if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
                                    if (item[0].ITEM_QTY == 0) {
                                        this.itemDetails.itemQty = "Unavailable";
                                    }
                                    if (item[0].ITEM_QTY > 0) {
                                        this.itemDetails.itemQty = item[0].ITEM_QTY;
                                        this.itemDetails.COUT_QTY = 1;
                                        this.isProc = true;
                                    }
                                    this.isDisabled = true;
                                    this.cursor = 'none';
                                    this.itemDetails.color = "panel panel-blue no-shadow bdr-1";
                                    if (this.lstLocations != null && this.lstLocations.length > 0) {
                                        this.ddlDeliveryLoc = [];
                                        this.isLoc = true;
                                        // this.ddlDeliveryLoc.push({ label: "Select DeliveryLoc", value: "Select DeliveryLoc" });
                                        for (var i = 0; i < this.lstLocations.length; i++) {
                                            this.ddlDeliveryLoc.push({ label: this.lstLocations[i].LOCATION_ID, value: this.lstLocations[i].LOCATION_ID });
                                        }
                                    }
                                }
                                else if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.B].toString()) {
                                    if (item[0].ITEM_QTY == 0) {
                                        this.itemDetails.itemQty = "Unavailable";
                                    }
                                    if (item[0].ITEM_QTY > 0) {
                                        this.itemDetails.itemQty = item[0].ITEM_QTY;
                                        this.itemDetails.COUT_QTY = 1;
                                    }
                                    this.itemDetails.color = "panel panel-green no-shadow bdr-1";
                                    this.isDisabled = true;
                                    this.cursor = 'none';
                                    if (this.lstLocations != null && this.lstLocations.length > 0) {
                                        this.ddlDeliveryLoc = [];
                                        this.isLoc = true;
                                        // this.ddlDeliveryLoc.push({ label: "Select DeliveryLoc", value: "Select DeliveryLoc" });
                                        for (var i = 0; i < this.lstLocations.length; i++) {
                                            this.ddlDeliveryLoc.push({ label: this.lstLocations[i].LOCATION_ID, value: this.lstLocations[i].LOCATION_ID });
                                        }
                                    }
                                }
                                else if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.F].toString()) {
                                    if (item[0].ITEM_QTY == 0) {
                                        this.itemDetails.itemQty = "Unavailable";
                                    }
                                    else {
                                        this.itemDetails.itemQty = item[0].ITEM_QTY;
                                    }
                                    this.itemDetails.color = "panel panel-pink no-shadow bdr-1";
                                    this.isDisabled = false;
                                    this.cursor = 'pointer';
                                }
                                this.itemDetails.DELIVER_LOCATION = item[0].STORAGE_LOCATION;
                                this.itemDetails.PROCEDURE_CODE = "";
                                this.itemDetails.PATIENT_ID = "";
                                this.itemDetails.PATIENT_LNAME = "";
                                setTimeout(() => {
                                    (<HTMLInputElement>document.getElementById("txtQantity")).focus();

                                }, 500);
                                this.pop = true;
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
        } catch (ex) {
            this.clientErrorMsg(ex, "getItemDetails");
        }
    }

    addItems() {
        try {
            let filterItem = this.checkOutItemsList.filter(item => item.ITEM_ID == this.itemDetails.ITEM_ID);
            if (filterItem.length == 0) {
                this.checkOutItemsList.push(this.itemDetails);
            }
            this.isAdd = true;
        } catch (ex) {
            this.clientErrorMsg(ex, "Add");
        }

    }

    async getItem() {
        try {
            this.msgs = [];
            if (this.mode = enum_CHECKINOUT[enum_CHECKINOUT.COUT]) {
                if (this.itemIdSearch == undefined ||
                    this.itemIdSearch == null ||
                    this.itemIdSearch == "") {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter itemId." });
                    return;
                }

                if (this.selectedRequestor == undefined ||
                    this.selectedRequestor == null ||
                    this.selectedRequestor == "" ||
                    this.selectedRequestor == "Select Requestor") {

                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Requestor." });
                    return;
                }
            }
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

        } catch (ex) {
            this.clientErrorMsg(ex, "getItem");
        }
    }

    async checkOutItems() {
        try {
            this.spinnerService.start();
            await this.checkInCheckOutItemsServices.checkInOutItems(this.checkOutItemsList, this.selectedRequestor, this.checkoutMode)
                .subscribe((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    switch (data.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            this.itemIdSearch = "";
                            this.serialIdSearch = "";
                            this.selectedRequestor = "Select Requestor";
                            this.pop = false;
                            this.isAdd = false;
                            this.blnShowPatientsPopup = false;
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Items checked out successfully." });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "CheckOut failed" });
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
                this.isAdd = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onCloseItemClick");
        }
    }

    async patientClick(item) {
        this.selectedRow = item;
        this.mainForm = false;
        this.pop = false;
        this.selectedAccountNumber = item.PATIENT_ID;
        await this.bindPatients(item.ITEM_ID);
        this.blnShowPatientsPopup = true;;
    }

    patientPopupClose() {
        this.mainForm = true;
        this.pop = true;
        this.blnShowPatientsPopup = false;
        if (this.selectedRow.PATIENT != "" && this.selectedRow.PATIENT != null && this.selectedRow.PATIENT != undefined) {
            this.isPatient = true;
        }
    }

    clearPatientSelection() {
        this.selectedAccountNumber = "";
        this.selectedRow.PATIENT = "";
        this.selectedRow.PATIENT_ID = "";
    }

    async loadOrgGroupParams() {
        try {
            this.lstOrgParms = [];
            this.spinnerService.start();
            this.checkInCheckOutItemsServices.getOrgGroupParamValue(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toString(), EnumApps.TrackIT.toString(), "PATIENT_CHARGE")
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;

                    switch (data.StatType) {
                        case StatusType.Success:
                            this.msgs = [];
                            this.strPatientCharge = (data.DataVariable != null) ? data.DataVariable.toString() : "";
                            this.spinnerService.stop();
                            break;
                        case StatusType.Error:
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex, "getRequestors");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async bindPatients(itemID) {
        try {
            this.spinnerService.start();
            this.msgs = [];
            await this.checkInCheckOutItemsServices.getPatients(itemID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_PATIENT_CACHE>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstPatients = data.DataList;
                            this.spinnerService.stop();
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
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    async grdRdbtnChanged(event) {
        try {
            let selectedPatient: any;
            if (event == undefined || event == null) {
                if (this.lstPatients != null && this.lstPatients.length == 1) {
                    selectedPatient = this.lstPatients[0]
                } else { return; }

            }
            else {
                selectedPatient = this.lstPatients.filter(x => x.PATIENT_MRC == event)[0];
            }

            console.log(event);
            this.selectedRow.PATIENT = selectedPatient.PATIENT_NAME;
            this.selectedRow.PATIENT_ID = selectedPatient.PATIENT_MRC;
        }
        catch (ex) {

            this.clientErrorMsg(ex, "grdRdbtnChanged");
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
            this.clientErrorMsg(ex, "getItems");
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
            this.clientErrorMsg(ex, "getSerialIds");
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
    async deleteRow(item, event) {
        this.msgs = [];
        try {
            await this.confirmationService.confirm({
                message: "Are you sure you want to delete " + item.ITEM_ID + " ?",
                accept: async () => {
                    this.checkOutItemsList = this.checkOutItemsList.filter(fItem => fItem.ITEM_ID != item.ITEM_ID);
                    if (this.checkOutItemsList.length == 0) {
                        this.isAdd = false;
                    }
                }

            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "deleteRow");
        }
    }

}



 //increaseQuantity() {
    //    this.itemQuantity += 1;

    //}

    //decreaseQuantity() {
    //    if (this.itemQuantity != 0)
    //        this.itemQuantity += 1;

    //}

 //async checkOutItems() {
    //    try {
    //        this.spinnerService.start();
    //        await this.checkInCheckOutItemsServices.checkOutItems(this.checkOutItemsList, this.selectedRequestor, this.checkoutMode, this.deviceTokenEntry)
    //            .forEach(resp => {
    //                switch (resp.StatType) {
    //                    case StatusType.Success:
    //                        this.msgs = [];
    //                        console.log(JSON.stringify(resp));
    //                        this.spinnerService.stop();
    //                        break;
    //                    case StatusType.Error:
    //                        this.msgs = [];
    //                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
    //                        this.spinnerService.stop();
    //                        break;
    //                    case StatusType.Warn:
    //                        this.msgs = [];
    //                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
    //                        this.spinnerService.stop();
    //                        break;
    //                }
    //            });
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "checkOutItems");
    //    }
    //}

   //async searchItemIdType(event) {
    //    try {
    //        await this.getItemTypeIndicator();
    //    } catch (ex) {
    //        this.clientErrorMsg(ex, "searchItemIdType");
    //    }
    //}

    //async getItemTypeIndicator() {
    //    try {
    //        this.msgs = [];
    //        let msg;
    //        this.spinnerService.start();
    //        await this.checkInCheckOutItemsServices.getTypeIndicator(this.itemIdSearch)
    //            .forEach(resp => {
    //                if (resp.StatusCode == AtparStatusCodes.TKIT_E_SERIALINACTIVATED) {
    //                    msg = "item " + this.itemIdSearch + " is inactivated";
    //                    this.hasSerialId = false;
    //                    //this.txtSerialIdDisable = true;
    //                    this.msgs = [];
    //                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
    //                    this.itemIdSearch = '';
    //                    this.spinnerService.stop();
    //                    return;
    //                }
    //                else if (resp.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
    //                    msg = "item " + this.itemIdSearch + " does not exist";
    //                    this.hasSerialId = false;
    //                    //this.txtSerialIdDisable = true;
    //                    this.msgs = [];
    //                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
    //                    this.itemIdSearch = '';
    //                    this.spinnerService.stop();
    //                    return;
    //                }
    //                else {
    //                    switch (resp.StatType) {
    //                        case StatusType.Success:
    //                            this.msgs = [];
    //                            this.itemTypeIndicator = resp.DataVariable;
    //                            this.itemIdSearch = resp.Data;
    //                            this.spinnerService.stop();
    //                            if (this.itemTypeIndicator != undefined && this.itemTypeIndicator != null && this.itemTypeIndicator != "") {
    //                                if (this.itemTypeIndicator == enum_TKIT_EQP_TYPE[enum_TKIT_EQP_TYPE.E].toString()) {
    //                                   // this.txtSerialIdDisable = false;
    //                                } else {
    //                                  //  this.txtSerialIdDisable = true;
    //                                    this.hasSerialId = false;
    //                                }
    //                            }
    //                            break;
    //                        case StatusType.Error:
    //                            this.msgs = [];
    //                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
    //                            this.spinnerService.stop();
    //                            break;
    //                        case StatusType.Warn:                               
    //                            this.msgs = [];
    //                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
    //                            this.spinnerService.stop();
    //                            break;
    //                    }
    //                }
    //            });
    //    } catch (ex) {
    //        this.clientErrorMsg(ex, "getItemTypeIndicator");
    //    }
    //}

