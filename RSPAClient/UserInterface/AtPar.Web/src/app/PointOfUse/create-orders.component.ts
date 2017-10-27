
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Response } from "@angular/http";
import { List } from 'linqts';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { CreateOrdersServices } from './pou-create-orders.service';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import {
    StatusType,
    BusinessType,
    TokenEntry_Enum,
    ClientType,
    YesNo_Enum,
    Cart_QtyOption_Enum,
    Cart_File_Type,
    LocationType,
    Par_Locn_Type,
    SENT_FROM,
    DataSet_Type,
    EnumApps, ElementType

} from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message } from '../components/common/api';
import { regExpValidator } from '../components/atpartext/Validators';

import { MT_POU_DEPT_CART_ALLOCATIONS } from '../Entities/mt_pou_dept_cart_allocations';
import { VM_POU_CART_DETAILS } from '../Entities/VM_POU_CART_DETAILS';
import { VM_CART_HEADER } from '../Entities/VM_CART_HEADER';
import { VM_CART_DETAILS } from '../Entities/VM_CART_DETAILS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../Entities/mt_atpar_org_group_bunits';
import { ActivatedRoute, Params } from '@angular/router';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';

declare var module: {
    id: string;
}

@Component({



    selector: 'atpar-create-orders',
    templateUrl: 'create-orders.component.html',
    providers: [
        datatableservice,
        AtParCommonService,
        CreateOrdersServices,
        AtParConstants
    ]

})

export class CreateOrdersComponent {

    REQUEST_QTY: string = "02";
    @Input() appID: string;

    strMaxAllowQty: any;
    selectedBUnit: any;
    selectedLocation: any;
    arrIDAttributes: any;
    itemID: any;

    screenName: string = '';

    showGrid: boolean = false;

    recordsPerPage: number = 0;
    statusCode: number = -1;
    hdPgIndex: number = 0;
    m_intDefNoOfRec: number = 0;
    intAppID: number = 0;
    trTransId: number = 0;
    blnsortbycolumn: boolean = true;

    deviceTokenEntry: string[] = [];
    pdeviceTokenEntry: string[] = [];
    lstItems: any[];
    lstFilterItemIDs: any[] = [];
    lstLocation: any[] = [];
    msgs: Message[] = [];
    lstBUnits: any[] = [];
    bunitData: any[] = [];
    lstItemDetails: VM_POU_CART_DETAILS[];
    preField: string = "";
    dsDepartmentItems: any[] = [];
    pDsCartHeaders: VM_CART_HEADER[] = [];
    pDsCartDetails: VM_CART_DETAILS[] = [];

    constructor(
        public dataservice: datatableservice,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private createOrdersService: CreateOrdersServices,
        private route: ActivatedRoute,
        private atParConstant: AtParConstants
    ) {
        try {

            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPage = parseInt(this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage]);

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async ngOnInit() {

        try {

            // this.spinnerService.start();

            await this.getProfileParamValue();
            await this.getBusinessUnits();

            var queryMode;
            this.route.queryParams.subscribe((params: Params) => {
                queryMode = params['mode'];
                this.intAppID = params['appId'];
                if (queryMode == "Go") {
                    this.selectedBUnit = params['bunit'];
                    this.itemID = params['ItemId'];
                    this.selectedLocation = params['cartID'];
                    this.screenName = params['Screen']
                    this.GetData();
                }
            });
            //await this.getCartItemCounts();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            //   this.spinnerService.stop();
        }
    }

    async getProfileParamValue() {
        try {

            this.msgs = [];
            this.spinnerService.start();

            this.commonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], this.appID, 'MAX_ALLOW_QTY')
                .catch(this.httpService.handleError)
                .then((res: Response) => {

                    let data = res.json() as AtParWebApiResponse<number>;

                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.strMaxAllowQty = data.DataVariable;
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                    }
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async getBusinessUnits() {
        try {

            this.lstBUnits.push({ label: "Select BUnit", value: "Select BUnit" });
            this.lstLocation.push({ label: "Select Loc", value: "Select Loc" });
            this.spinnerService.start();

            await this.commonService.getBusinessUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], BusinessType.Inventory.toString())
                .catch(this.httpService.handleError)
                .then((res: Response) => {

                    let data = res.json() as AtParWebApiResponse<number>;
                    this.msgs = [];

                    if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                        this.spinnerService.stop();
                        return;
                    }

                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.bunitData = data.DataList;
                                for (var i = 0; i < this.bunitData.length; i++) {
                                    this.lstBUnits.push({ label: this.bunitData[i], value: this.bunitData[i] })
                                }

                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                    }
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async GetData() {
        try {
            await this.route.queryParams.subscribe((params: Params) => {
                var queryMode;
                queryMode = params['mode'];
                if (queryMode == "Go") {
                    this.spinnerService.start();
                    this.GetBUnits_Carts();

                    let strItemID: any;
                    if (this.screenName == 'Low Stock') {
                        if (this.itemID != '' && this.itemID != null && this.itemID != undefined) {
                            this.itemID = this.itemID.toString().trim();
                        }
                    }
                    else {
                        if (this.itemID != '' && this.itemID != null && this.itemID != undefined) {

                            if (this.itemID.trim().contains('')) {
                                this.arrIDAttributes = this.itemID.trim().split('');

                                strItemID = this.arrIDAttributes[0];
                            }
                            else {
                                strItemID = this.itemID.toString().trim();
                            }
                        }
                    }
                }
            });
            this.statusCode = await this.getCartItemCounts();

            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return this.statusCode;
            }

        } catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }

        try {
            this.statusCode = await this.bindGrid(this.lstItemDetails);
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return this.statusCode;
            }
        }
        catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }
        finally {
            this.spinnerService.stop();
        }


        return AtparStatusCodes.ATPAR_OK;
    }

    async getCartItemCounts() {
        try {
            this.msgs = [];
            let itemID: string = '';
            //this.spinnerService.start();
            if (this.screenName != 'Low Stock') {
                if (this.itemID != null && this.itemID != undefined && this.itemID != '') {
                    if (this.itemID.code != null && this.itemID.code != undefined && this.itemID.code != '') {
                        itemID = this.itemID.code;
                    }
                    else {
                        itemID = '';
                    }
                }
                else {
                    itemID = '';
                }
            }
            else {
                itemID = this.itemID;
            }
            await this.createOrdersService.GetCartItemCounts(this.selectedBUnit, this.selectedLocation, this.deviceTokenEntry[TokenEntry_Enum.UserID], itemID,
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.appID)
                .catch(this.httpService.handleError)
                .then((res: Response) => {

                    let data = res.json() as AtParWebApiResponse<any>;
                    this.lstItemDetails = [];

                    this.statusCode = data.StatusCode;

                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.showGrid = true;
                                if (data.DataList != null) {
                                    //let items: VM_POU_CART_DETAILS[] = data.DataList;
                                    //for (let x = 0; x < items.length;x++)
                                    //{
                                    //    items[x].PAR_VALUE = parseFloat(parseFloat(items[x].PAR_VALUE.toString()).toFixed(2));
                                    //    items[x].QOH = parseFloat(parseFloat(items[x].QOH.toString()).toFixed(2));
                                    //    items[x].validationRules = 'numeric_dot';
                                    //    this.lstItemDetails.push(items[x]);
                                    //}
                                    data.DataList.forEach(item => {
                                        item.PAR_VALUE = parseFloat(item.PAR_VALUE).toFixed(2);
                                        item.QOH = parseFloat(item.QOH).toFixed(2);
                                        item.validationRules = 'numeric_dot';
                                        this.lstItemDetails.push(item);
                                    });
                                    if (this.lstItemDetails.length == 0) {
                                        this.statusCode = AtparStatusCodes.E_NORECORDFOUND;
                                    }


                                }
                                sessionStorage.setItem('dsCartItems', JSON.stringify(this.lstItemDetails));
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                    }
                });

            return await this.statusCode;

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            //this.spinnerService.stop();
        }
    }

    async bindGrid(lstItemDetails: VM_POU_CART_DETAILS[]) {
        try {
            let dsFilterdItems: VM_POU_CART_DETAILS[] = [];
            let intCnt: number = 0;

            if (this.appID.toString() == EnumApps.Pharmacy.toString()) {
                let _drItems: VM_POU_CART_DETAILS[];
                _drItems = lstItemDetails.filter(x => x.SUBSTITUTE_ITEM_FLG = YesNo_Enum[YesNo_Enum.N.toString()]);
                if (_drItems.length > 0) {
                    _drItems.forEach(item => {
                        dsFilterdItems.push(item);
                    });
                }
            }

            if (dsFilterdItems.length > 0) {
                dsFilterdItems.forEach(item => {
                    item.SEQNO = intCnt;
                    intCnt += 1;
                });
                sessionStorage.setItem('dsCartItems', JSON.stringify(dsFilterdItems));
                this.lstItemDetails = dsFilterdItems;
            }
            else {
                lstItemDetails.forEach(item => {
                    item.SEQNO = intCnt;
                    intCnt += 1;
                });
                sessionStorage.setItem('dsCartItems', JSON.stringify(lstItemDetails));
                this.lstItemDetails = lstItemDetails;
            }
        }
        catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }

        return await AtparStatusCodes.ATPAR_OK;
    }

    async ddlBUnitChanged(e) {
        try {

            this.lstLocation = [];
            this.lstLocation.push({ label: 'Select Loc', value: 'Select Loc' });
            this.selectedLocation = '';
            this.showGrid = false;
            this.spinnerService.start();

            await this.GetBUnits_Carts();

        } catch (ex) {
            this.clientErrorMsg(ex);
        } finally {
            this.spinnerService.stop();
        }
    }

    async GetBUnits_Carts() {
        try {

            let strCartId: string = '';
            let strBUnit: string = '';
            this.statusCode = -1;
            //   this.spinnerService.start();

            if (this.selectedBUnit != null && this.selectedBUnit != undefined && this.selectedBUnit != '' && this.selectedBUnit != 'Select BUnit') {
                await this.createOrdersService.GetBUnits_Carts(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.appID, LocationType[LocationType.P].toString(),
                    Par_Locn_Type[Par_Locn_Type.CrashCart])
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {

                        this.msgs = [];
                        let data = res.json() as AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS>;

                        if (data.StatusCode == AtparStatusCodes.ATPAR_OK) {
                            strBUnit = this.selectedBUnit;
                            data.DataList.forEach(data => {
                                if (data.BUSINESS_UNIT == strBUnit && data.CART_ID != strCartId) {
                                    this.lstLocation.push({ label: data.CART_ID, value: data.CART_ID });
                                }
                                strCartId = data.CART_ID;
                            });
                        }
                        else {
                            if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Par Locations assigned to the selected BU' });
                                return;
                            }
                            else {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed to get Business Units / Par Location' });
                                return;
                            }
                        }

                        //switch (data.StatType) {
                        //    case StatusType.Success:
                        //        {
                        //            strBUnit = this.selectedBUnit;
                        //            data.DataList.forEach(data => {
                        //                if (data.BUSINESS_UNIT == strBUnit && data.CART_ID != strCartId) {
                        //                    this.lstLocation.push({ label: data.CART_ID, value: data.CART_ID });
                        //                }
                        //                strCartId = data.CART_ID;
                        //            });

                        //            break;
                        //        }
                        //    case StatusType.Warn:
                        //        {
                        //            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        //            break;
                        //        }
                        //    case StatusType.Custom:
                        //        {
                        //            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        //            break;
                        //        }
                        //    case StatusType.Error:
                        //        {
                        //            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        //            break;
                        //        }
                        //}
                    });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            // this.spinnerService.stop();
        }
    }

    async ddlLocationChanged(e) {
        try {

            this.itemID = '';
            this.lstItems = [];
            this.showGrid = false;

            await this.GetItemsForSelectedLocation();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async GetItemsForSelectedLocation() {
        try {

            this.spinnerService.start();
            sessionStorage.removeItem('dsDepartmentItems');

            if (this.selectedLocation != null && this.selectedLocation != undefined && this.selectedLocation != '' && this.selectedLocation != 'Select Loc') {
                await this.createOrdersService.GetItemsForSelectedLocation(this.selectedLocation, this.selectedBUnit, this.deviceTokenEntry[TokenEntry_Enum.UserID],
                    this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.appID)
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {

                        let data = res.json() as AtParWebApiResponse<VM_POU_CART_DETAILS>;
                        this.msgs = [];

                        if (data.StatusCode == AtparStatusCodes.ATPAR_OK) {
                            if (data.DataList != null) {
                                data.DataList.forEach(item => {
                                    this.lstItems.push({ value: item.ITEM_DESCR, name: item.INV_ITEM_ID + ' - ' + item.ITEM_DESCR, code: item.INV_ITEM_ID });
                                });
                                sessionStorage.setItem('dsDepartmentItems', JSON.stringify(this.lstItems));
                            }
                        }
                        //else {
                        //    if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        //        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                        //        return;
                        //    }
                        //    else {
                        //        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No carts assigned to the department' });
                        //        return;
                        //    }
                        //}



                        //switch (data.StatType) {
                        //    case StatusType.Success: {

                        //        if (data.DataList != null) {
                        //            data.DataList.forEach(item => {
                        //                this.lstItems.push({ value: item.ITEM_DESCR, name: item.INV_ITEM_ID + ' - ' + item.ITEM_DESCR, code: item.INV_ITEM_ID });
                        //            });
                        //            sessionStorage.setItem('dsDepartmentItems', JSON.stringify(this.lstItems));
                        //        }

                        //        break;
                        //    }
                        //    case StatusType.Warn: {
                        //        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        //        break;
                        //    }
                        //    case StatusType.Error: {
                        //        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        //        break;
                        //    }
                        //    case StatusType.Custom: {
                        //        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        //        break;
                        //    }
                        //}
                    });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async fillItemIDsAuto(event) {
        try {

            let query = event.query;
            if (this.lstItems != null && this.lstItems != undefined) {
                if (this.lstItems.length > 0) {
                    this.lstFilterItemIDs = await this.filterItemIDs(query, this.lstItems);
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    filterItemIDs(query, lstItems: any[]): any[] {
        try {

            let filtered: any[] = [];

            if (query == "%") {
                for (let i = 0; i < lstItems.length; i++) {
                    filtered.push(lstItems[i]);
                }
            } else {
                for (let i = 0; i < lstItems.length; i++) {
                    let item = lstItems[i];
                    if (item.name.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                        filtered.push(item);
                    }
                }
            }

            return filtered;

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async onGoClick() {
        try {
            this.spinnerService.start();
            this.lstItemDetails = [];
            this.showGrid = false;
            if (this.selectedBUnit == '' || this.selectedBUnit == null || this.selectedBUnit == undefined || this.selectedBUnit == 'Select BUnit') {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Business Unit / Company' });
                return;
            }

            if (this.selectedLocation == '' || this.selectedLocation == null || this.selectedLocation == undefined || this.selectedLocation == 'Select Loc') {
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Par Location' });
                return;
            }

            if (this.screenName != 'Low Stock') {

                if (this.itemID != null && this.itemID != undefined && this.itemID != '') {
                    if (this.itemID.code != null && this.itemID.code != undefined && this.itemID.code != '') {
                        let dsDepartmentItems: any[] = JSON.parse(sessionStorage.getItem('dsDepartmentItems'));
                        if (dsDepartmentItems != null) {
                            if (dsDepartmentItems.length > 0) {
                                let filterItems: any[] = dsDepartmentItems.filter(x => x.code == this.itemID.code);
                                if (filterItems.length == 0) {
                                    this.showGrid = false;
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Item ID' });
                                    return;
                                }
                            }
                        }
                    }
                    else {
                        this.showGrid = false;
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Item ID' });
                        return;
                    }
                }
            }

            this.statusCode = await this.GetData();

            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                this.showGrid = false;
                this.trTransId = 0;
                if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                    return;
                }
                this.msgs = [];
                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error' });
                return;
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onSubmitClick() {
        try {

            this.spinnerService.start();
            this.pDsCartHeaders = [];
            this.pDsCartDetails = [];
            let pDsCartItems: VM_POU_CART_DETAILS[];
            pDsCartItems = JSON.parse(sessionStorage.getItem('dsCartItems')) as VM_POU_CART_DETAILS[];

            try {

                this.statusCode = await this.UpdateDataset(pDsCartItems);

                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.msgs = [];
                    if (this.statusCode == AtparStatusCodes.E_NOTANUMBER) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Order quantity is not a valid number' });
                    }
                    //else {
                    //    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                    //}
                    if (this.statusCode == AtparStatusCodes.S_MAXVALUE_MORE) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                    }
                    return;
                }

            } catch (ex) {
                this.clientErrorMsg(ex);
            }

            try {

                this.statusCode = await this.BuildInputDataset();

                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                    return;
                }

            } catch (ex) {
                this.clientErrorMsg(ex);
            }

            try {

                if (this.pDsCartHeaders.length > 0) {
                    if (this.pDsCartHeaders[0].NO_OF_ORDERED_ITEMS == 0 + '') {
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No items have order quantity greater than zero' });
                        return;
                    }
                }
                else {
                    return;
                }

                let dsCartItemCounts = { 'HEADER': this.pDsCartHeaders, 'DETAILS': this.pDsCartDetails };

                await this.createOrdersService.CreateOrder(dsCartItemCounts, this.appID)
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<number>;
                        this.statusCode = data.StatusCode;
                        if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                            this.msgs = [];
                            if (this.statusCode == AtparStatusCodes.CRCT_E_COUNTEXISTS) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            else if (this.statusCode == AtparStatusCodes.E_INVALIDPARAMETER) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            else {
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error' });
                            }
                        }
                    });
                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    return;
                }

            } catch (ex) {
                this.clientErrorMsg(ex);
                return;
            }

            this.showGrid = false;
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Order Sent Successfully' });


        } catch (ex) {
            this.clientErrorMsg(ex);
            return;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async UpdateDataset(pDsCartItems: VM_POU_CART_DETAILS[]) {
        try {

            for (var i = 0; i < this.lstItemDetails.length; i++) {
                let item: VM_POU_CART_DETAILS = this.lstItemDetails[i];
                if (item.ORDER_QTY > this.strMaxAllowQty) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                    return AtparStatusCodes.S_MAXVALUE_MORE;
                }
                pDsCartItems[i].ORDER_QTY = item.ORDER_QTY;
            }

            sessionStorage.setItem('dsCartItems', JSON.stringify(pDsCartItems));

        }
        catch (ex) {
            this.clientErrorMsg(ex);
            return AtparStatusCodes.E_SERVERERROR;
        }
        return AtparStatusCodes.ATPAR_OK;
    }

    async BuildInputDataset() {
        try {

            let _dsCartItems: VM_POU_CART_DETAILS[] = [];
            _dsCartItems = JSON.parse(sessionStorage.getItem('dsCartItems')) as VM_POU_CART_DETAILS[];

            try {
                this.pdeviceTokenEntry = [];
                this.pdeviceTokenEntry[TokenEntry_Enum.UserID] = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                this.pdeviceTokenEntry[TokenEntry_Enum.AccessToken] = SENT_FROM.SENT_FROM_WEB.toString();
                this.pdeviceTokenEntry[TokenEntry_Enum.DeviceID] = '';
                this.pdeviceTokenEntry[TokenEntry_Enum.ProfileID] = this.deviceTokenEntry[TokenEntry_Enum.ProfileID];
                this.pdeviceTokenEntry[TokenEntry_Enum.OrgGrpID] = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
                this.pdeviceTokenEntry[TokenEntry_Enum.DateTime] = new Date().toString();
                this.pdeviceTokenEntry[TokenEntry_Enum.ClientType] = ClientType.WEB.toString();
            } catch (ex) {
                return AtparStatusCodes.E_SERVERERROR;
            }

            try {
                this.statusCode = await this.PopulateHeadertable(_dsCartItems);
                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    AtparStatusCodes.E_SERVERERROR;
                }

            } catch (ex) {
                return AtparStatusCodes.E_SERVERERROR;
            }

            try {
                this.statusCode = await this.PopulateDetailtable(_dsCartItems);
                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    AtparStatusCodes.E_SERVERERROR;
                }

            } catch (ex) {
                return AtparStatusCodes.E_SERVERERROR;
            }

            return AtparStatusCodes.ATPAR_OK;
        } catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }
    }

    async PopulateHeadertable(pDsCartItems: VM_POU_CART_DETAILS[]) {
        try {

            let cartHeader: VM_CART_HEADER = new VM_CART_HEADER();
            let dblNoOfItemsOrdered: number = 0;
            let filterItems: any = [];

            filterItems = pDsCartItems.filter(x => x.ORDER_QTY > 0);
            dblNoOfItemsOrdered = filterItems.length;

            cartHeader.CART_ID = this.selectedLocation;
            cartHeader.BUSINESS_UNIT = this.selectedBUnit;
            cartHeader.USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            cartHeader.START_DATETIME = new Date();
            cartHeader.END_DATETIME = new Date();
            cartHeader.QUANTITY_OPTION = this.REQUEST_QTY;
            cartHeader.TRANSACTION_ID = 0;
            cartHeader.CMTS = '';
            cartHeader.NO_OF_SCANS = '0';
            cartHeader.TOTAL_RECORDS = pDsCartItems.length.toString();
            cartHeader.NO_OF_ORDERED_ITEMS = dblNoOfItemsOrdered.toString();

            this.pDsCartHeaders.push(cartHeader);

            return await AtparStatusCodes.ATPAR_OK;

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        return await AtparStatusCodes.ATPAR_OK;
    }

    async PopulateDetailtable(pDsCartItems: VM_POU_CART_DETAILS[]) {
        try {

            let cartItem: VM_CART_DETAILS;

            await pDsCartItems.forEach(item => {
                cartItem = new VM_CART_DETAILS();
                cartItem.ITEM_ID = item.INV_ITEM_ID;
                cartItem.COMPARTMENT = item.COMPARTMENT.toString().replace("'", "''");
                cartItem.COUNT_QUANTITY = item.ORDER_QTY;
                cartItem.OPTIMAL_QUANTITY = item.PAR_VALUE;
                cartItem.LNCMTS = '';
                cartItem.UOM = item.UOM;
                cartItem.PRICE = item.ITEM_PRICE;
                cartItem.COUNT_REQUIRED = YesNo_Enum[YesNo_Enum.Y.toString()];
                cartItem.INVENTORY_ITEM = item.INVENTORY_ITEM;
                cartItem.ITEM_DESCR = item.ITEM_DESCR;
                cartItem.ACT_QOH = item.QOH.toString();
                switch (item.ORDER_TYPE.toString()) {
                    case "Par":
                        cartItem.CART_REPLEN_CTRL = "01";
                        break;
                    case "FOQ":
                        cartItem.CART_REPLEN_CTRL = "02";
                        break;
                    case "Min/Max":
                        cartItem.CART_REPLEN_CTRL = "03";
                        break;
                    default:
                        cartItem.CART_REPLEN_CTRL = item.ORDER_TYPE.toString();
                        break;
                }
                switch (item.ITEM_TYPE.toString()) {
                    case "Stock":
                        cartItem.CART_REPLEN_OPT = "01";
                        break;
                    case "Non Stock":
                        cartItem.CART_REPLEN_OPT = "02";
                        break;
                    case "Stockless":
                        cartItem.CART_REPLEN_OPT = "03";
                        break;
                    case "Consignment":
                        cartItem.CART_REPLEN_OPT = "04";
                        break;
                    case "Not Replenished":
                        cartItem.CART_REPLEN_OPT = "05";
                        break;
                }
                cartItem.MAX_QTY = item.MAX_QTY;
                cartItem.FOQ = item.FOQ.toString();
                cartItem.CUST_ITEM_NO = item.CUST_ITEM_NO;
                cartItem.VENDOR_ID = item.VENDOR_ID;

                this.pDsCartDetails.push(cartItem);

            });

            return await AtparStatusCodes.ATPAR_OK;
        }
        catch (ex) {
            return await AtparStatusCodes.E_SERVERERROR;
        }
    }

    clientErrorMsg(ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    }

    OnDestroy() {
        //sessionStorage.removeItem('dsLatestCompRep');
        //sessionStorage.removeItem('dsCompRep');
        //this.showGrid = null;
        //this.isShowOrgGroupDD = null;
        //this.orgGrpId = null;
        //this.selectedOrgGroupId = null;
        //this.selectedBUnit = null;
        //this.allDateString = null;
        //this.transID = null;
        //this.recordsPerPage = null;
        //this.cartID = null;
        //this.deviceTokenEntry = null;
        //this.msgs = null;
        //this.lstCartIDs = null;
        //this.lstOrgGroups = null;
        //this.lstFilterCartIDs = null;
        //this.lstBUnits = null;
        //this.orgGroupData = null;
        //this.lstCartItemDetails = null;
    }

    parValueCustomSort(event, elementType: string = "") {

        var element = event;

        let result = null;

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
        if (elementType == ElementType[ElementType.FLOAT].toString()) {
            this.lstItemDetails = this.lstItemDetails.sort(function (a, b) {

                result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                return (element.order * result);
            });
        }
        else {
            this.lstItemDetails = this.lstItemDetails.sort(function (a, b) {

                if (a[element.field] == null && b[element.field] != null) {
                    result = -1;
                }
                else if (a[element.field] != null && b[element.field] == null) {
                    result = 1;
                }
                else if (a[element.field] == null && b[element.field] == null) {
                    result = 0;
                }

                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string') {
                    if (parseFloat(a[element.field]) && parseFloat(b[element.field])) {
                        result = (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
                    }
                    else {
                        result = a[element.field].localeCompare(b[element.field]);
                    }
                }
                else {
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
                }
                return (element.order * result);
            });
        }
    }

    qOHCustomSort(event) {
        var element = event;

        let result = null;
        this.lstItemDetails = this.lstItemDetails.sort(function (a, b) {

            if (a[element.field] == null && b[element.field] != null) {
                result = -1;
            }
            else if (a[element.field] != null && b[element.field] == null) {
                result = 1;
            }
            else if (a[element.field] == null && b[element.field] == null) {
                result = 0;
            }
            else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string') {
                if (parseFloat(a[element.field]) && parseFloat(b[element.field])) {
                    result = (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
                }
                else {
                    result = a[element.field].localeCompare(b[element.field]);
                }
            }
            else {
                result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;
            }


            return (element.order * result);


        });

    }




}
