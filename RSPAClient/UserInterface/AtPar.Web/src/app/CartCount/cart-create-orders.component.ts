
import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { Response } from "@angular/http";
import { List } from 'linqts';

import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { CreateOrdersServices } from './cart-create-orders.service';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';

import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import {
    StatusType,
    BusinessType,
    TokenEntry_Enum,
    ClientType,
    YesNo_Enum,
    Cart_QtyOption_Enum,
    Cart_File_Type
} from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message } from '../components/common/api';
import { MT_CRCT_USER_ALLOCATION } from '../Entities/mt_crct_user_allocation';
import { VM_CART_ITEMINFO_DETAILS } from '../Entities/VM_CART_ITEMINFO_DETAILS'
import { VM_CART_ITEMINFO_HEADER } from '../Entities/VM_CART_ITEMINFO_HEADER';
import { VM_CART_DETAILS } from '../Entities/VM_CART_DETAILS';
import { VM_CART_HEADER } from '../Entities/VM_CART_HEADER';
import { regExpValidator } from '../components/atpartext/Validators';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'cart-create-orders.component.html',
    providers: [
        datatableservice,
        AtParCommonService,
        CreateOrdersServices,
        AtParConstants
    ]
})

export class CreateOrdersComponent {
    orgGrpId: any;
    selectedOrgGroupId: any;
    selectedBUnit: any;
    allDateString: string = '';
    transID: string = '';
    recordsPerPage: number = 0;
    cartID: any;
    hdnCartId: any;
    deviceTokenEntry: string[] = [];
    msgs: Message[] = [];
    lstCartIDs: any = [];
    lstOrgGroups: any[] = [];
    lstFilterCartIDs: any[] = [];
    lstBUnits: any[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    lstCartItemDetails: VM_CART_ITEMINFO_DETAILS[];
    lstCartHdr: VM_CART_ITEMINFO_HEADER[];
    date1Header: string = '';
    date2Header: string = '';
    date3Header: string = '';
    date4Header: string = '';
    date5Header: string = '';
    showGrid: boolean = false;
    preField: string = "";
    isShowOrgGroupDD: boolean = false;
    showDate1Column: boolean = false;
    showDate2Column: boolean = false;
    showDate3Column: boolean = false;
    showDate4Column: boolean = false;
    showDate5Column: boolean = false;
    parLocType: string = '';
    reqNo: string = '';
    _strAllowExcessPar: string;
    creationdate: string = '';
    _strQtyOption: string;
    lstOutPutDetails: VM_CART_DETAILS[];
    lstOutPutHeader: VM_CART_HEADER[];
    outPutDetail: VM_CART_DETAILS;
    outPutHeader: VM_CART_HEADER;
    intCntOrderedItems: number = 0;
    dsCompRep: VM_CART_ITEMINFO_DETAILS[];
    dsLatestCompRep: VM_CART_ITEMINFO_DETAILS[];
    blnSortByColumn: boolean = true;

    constructor(
        public dataservice: datatableservice,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private createOrdersService: CreateOrdersServices,
        private atParConstant: AtParConstants
    ) {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPage = parseInt(this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage]);
        } catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }

    ngOnInit() {
        try {
            this.getOrgGroupIds();
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async getOrgGroupIds() {
        try {
            this.spinnerService.start();
            this.lstOrgGroups = [];
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.msgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.isShowOrgGroupDD = false;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + ' - ' + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.getBusinessUnits();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.isShowOrgGroupDD = true;
                                this.lstBUnits = [];
                                this.lstBUnits.push({ label: "Select Bunit", value: "Select Bunit" });
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
        catch (ex) {
            this.clientErrorMsg(ex, "getOrgGroupIds");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async getBusinessUnits() {
        try {
            this.msgs = [];
            this.spinnerService.start();
            this.lstBUnits = [];
            this.lstBUnits.push({ label: 'Select Bunit', value: 'Select Bunit' });
            this.lstCartIDs = [];
            this.selectedBUnit = '';
            this.cartID = '';
            let orgGroupID = '';

            if (this.isShowOrgGroupDD) {
                orgGroupID = this.selectedOrgGroupId;
            }
            else {
                orgGroupID = (this.orgGrpId.split('-'))[0].trim();
            }
            if (orgGroupID == 'Select One' || orgGroupID == '' || orgGroupID == null) {
                return;
            }

            await this.commonService.getOrgBusinessUnits(orgGroupID, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    this.msgs = [];
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            data.DataList.forEach(data => {
                                this.lstBUnits.push({ label: data, value: data });
                            });
                            break;
                        }
                        case StatusType.Warn: {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
        catch (ex) {
            this.clientErrorMsg(ex, "getBusinessUnits");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async ddlOrgGrpIdChanged(e) {
        try {
            this.lstBUnits = [];
            this.selectedBUnit = '';
            this.lstCartItemDetails = [];
            this.lstCartIDs = [];
            this.cartID = '';
            this.showGrid = false;
            await this.getBusinessUnits();
        } catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    ddlBUnitChanged(e) {
        try {
            this.lstCartItemDetails = [];
            this.lstCartIDs = [];
            this.cartID = '';
            this.showGrid = false;
            this.getCartsForBunit();
        } catch (ex) {
            this.clientErrorMsg(ex, "ddlBUnitChanged");
        }
    }

    async getCartsForBunit() {
        try {
            this.msgs = [];
            let orgGroupID = '';
            if (this.isShowOrgGroupDD) {
                orgGroupID = this.selectedOrgGroupId;
            }
            else {
                orgGroupID = (this.orgGrpId.split('-'))[0].trim();
            }
            if (this.selectedBUnit == 'Select Bunit' || this.selectedBUnit == '' || this.selectedBUnit == null) {
                return;
            }
            this.spinnerService.start();
            await this.createOrdersService.getCartsForBunit(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedBUnit, orgGroupID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.msgs = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList != null) {
                                data.DataList.forEach(cart => {
                                    this.lstCartIDs.push({ value: cart.DESCR, name: cart.CART_ID + ' - ' + cart.DESCR, code: cart.CART_ID });
                                });
                                this.cartID = '';
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
        } catch (ex) {
            this.clientErrorMsg(ex, "getCartsForBunit");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async fillCartIDsAuto(event) {
        try {
            let query: string = event.query;
            this.lstFilterCartIDs = this.filterCartIDs(query, this.lstCartIDs);
        } catch (ex) {
            this.clientErrorMsg(ex, "fillCartIDsAuto");
        }
    }

    filterCartIDs(query: string, lstCartIDs: any[]): any[] {
        try {
            let filtered: any[] = [];
            if (query == "%") {
                for (let i = 0; i < lstCartIDs.length; i++) {
                    filtered.push(lstCartIDs[i]);
                }
            } else {
                if (query.trim().toLowerCase() != '') {
                    if (query.substring(0, 1) != ' ') {
                        for (let i = 0; i < lstCartIDs.length; i++) {
                            let cart = lstCartIDs[i];
                            if (cart.name.toLowerCase().indexOf(query.trim().toLowerCase()) == 0) {
                                filtered.push(cart);
                            }
                        }
                    }
                }
            }
            return filtered;
        } catch (ex) {
            this.clientErrorMsg(ex, "filterCartIDs");
        }
    }

    async onGoClick() {
        try {
            this.spinnerService.start();
            this.lstCartItemDetails = [];
            this.lstCartHdr = [];
            this.msgs = [];
            if (this.isShowOrgGroupDD) {
                if (this.selectedOrgGroupId == '' || this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == 'Select One') {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid Org Group ID' });
                    return;
                }
            }
            else {
            }

            if (this.selectedBUnit == '' || this.selectedBUnit == null || this.selectedBUnit == undefined || this.selectedBUnit == 'Select Bunit') {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid Bunit' });
                return;
            }
            if (this.cartID == null || this.cartID == '' || this.cartID == undefined) {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter CartID/ Par Location' });
                return;
            }
            else {
            }
            await this.getCartPrevCounts();
        } catch (ex) {
            this.clientErrorMsg(ex, "onGoClick");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async getCartPrevCounts() {
        try {
            let orgGroupID = '';
            let cartID = '';
            if (this.isShowOrgGroupDD) {
                orgGroupID = this.selectedOrgGroupId;
            }
            else {
                orgGroupID = (this.orgGrpId.split('-'))[0].trim();
            }

            if (this.cartID.code == null || this.cartID.code == '' || this.cartID.code == undefined) {
                cartID = this.cartID;
            }
            else {
                cartID = this.cartID.code;
            }

            this.showGrid = false;
            this.lstCartItemDetails = [];
            this.lstCartHdr = [];
            this.allDateString = '';
            this.transID = '';
            this.parLocType = '';
            this.creationdate = '';
            this.reqNo = '';
            await this.createOrdersService.getCartPrevCounts(orgGroupID, this.selectedBUnit, cartID,
                this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.ProfileID]).
                then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataDictionary != null && data.DataDictionary != undefined) {
                                if (data.DataDictionary['allDateString'] != null && data.DataDictionary['allDateString'] != '' && data.DataDictionary['allDateString'] != undefined) {
                                    if (data.DataDictionary['lstPrevCnts'] != null && data.DataDictionary['lstPrevCnts'] != '' && data.DataDictionary['lstPrevCnts'] != undefined) {
                                        this.hdnCartId = cartID;
                                        this.lstCartItemDetails = data.DataDictionary['lstPrevCnts'];
                                        this.dsCompRep = [];
                                        sessionStorage.setItem('dsCompRep', JSON.stringify(data.DataDictionary['lstPrevCnts']));
                                        this.showGrid = true;
                                        this.lstCartItemDetails.forEach(cartItem => {
                                            if (cartItem.ChkValue == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                                                cartItem.validationRules = "mandatory,nc_numeric_dot";
                                            }
                                            else if (cartItem.ChkValue == YesNo_Enum[YesNo_Enum.N.toString()]) {
                                                cartItem.validationRules = "nc_numeric_dot";
                                            }
                                        });
                                        if (data.DataDictionary['lstCartHdr'] != null) {
                                            this.lstCartHdr = data.DataDictionary['lstCartHdr'];
                                        }
                                        if (data.DataDictionary['transID'] != null && data.DataDictionary['transID'] != '') {
                                            this.transID = data.DataDictionary['transID'];
                                        }
                                        this.parLocType = data.DataDictionary['parLocType'];
                                        this.creationdate = data.DataDictionary['creationdate'];
                                        this.reqNo = data.DataDictionary['reqNo'];
                                        this.allDateString = data.DataDictionary['allDateString'];
                                        this.showOrHideDateColumns();
                                    }
                                    else {
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                    }
                                }
                                else {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                                }
                            }
                            else {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                            break;
                        }
                        case StatusType.Error: {
                            this.msgs = [];
                            if (this.cartID.code == null || this.cartID.code == '' || this.cartID.code == undefined) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'This Cart is not been Counted Previously.' });
                            }
                            else {
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Custom: {
                            this.msgs = [];
                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex, "getCartPrevCounts");
        }
    }

    showOrHideDateColumns() {
        try {
            let dateStringArray = this.allDateString.split(',');
            if (dateStringArray.length > 0) {
                switch (dateStringArray.length) {
                    case 0: {
                        this.showDate1Column = false;
                        this.showDate2Column = false;
                        this.showDate3Column = false;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = '';
                        this.date2Header = '';
                        this.date3Header = '';
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 1: {
                        this.showDate1Column = true;
                        this.showDate2Column = false;
                        this.showDate3Column = false;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = '';
                        this.date3Header = '';
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 2: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = false;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = '';
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 3: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = true;
                        this.showDate4Column = false;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = dateStringArray[2];
                        this.date4Header = '';
                        this.date5Header = '';
                        break;
                    }
                    case 4: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = true;
                        this.showDate4Column = true;
                        this.showDate5Column = false;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = dateStringArray[2];
                        this.date4Header = dateStringArray[3];
                        this.date5Header = '';
                        break;
                    }
                    case 5: {
                        this.showDate1Column = true;
                        this.showDate2Column = true;
                        this.showDate3Column = true;
                        this.showDate4Column = true;
                        this.showDate5Column = true;
                        this.date1Header = dateStringArray[0];
                        this.date2Header = dateStringArray[1];
                        this.date3Header = dateStringArray[2];
                        this.date4Header = dateStringArray[3];
                        this.date5Header = dateStringArray[4];
                        break;
                    }
                }
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "showOrHideDateColumns");
        }
    }

    async onSubmitClick() {
        try {
            this.spinnerService.start();
            try {
                if (this.cartID != "" && this.cartID != null && this.cartID != undefined) {
                    if (this.cartID.code != null && this.cartID.code != '' && this.cartID.code != undefined) {
                        if (this.hdnCartId.toUpperCase().trim() != this.cartID.code.toUpperCase().trim()) {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Cart ID/Par Location has been changed after the report is run, click on Go to create order for new data selected.' });
                            return;
                        }
                    }
                    else if (this.hdnCartId.toUpperCase().trim() != this.cartID.toUpperCase().trim()) {
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Cart ID/Par Location has been changed after the report is run, click on Go to create order for new data selected.' });
                        return;
                    }
                }
                else {
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter  CartID/Par Location' });
                    return;
                }
            } catch (ex) {
                this.msgs = [];
                this.clientErrorMsg(ex, "onSubmitClick");
                return;
            }

            try {
                this.msgs = [];
                await this.commonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], '2', 'ALLOW_EXCESS_PAR')
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        let data = <AtParWebApiResponse<string>>res.json();
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this._strAllowExcessPar = data.DataVariable.toString();
                                break;
                            }
                            case StatusType.Warn: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                        if (data.StatType != StatusType.Success) {
                            return;
                        }
                    });
            } catch (ex) {
                this.msgs = [];
                this.clientErrorMsg(ex, "onSubmitClick");
                return;
            }

            try {
                this.msgs = [];
                this.dsCompRep = [];
                this.dsCompRep = JSON.parse(sessionStorage.getItem('dsCompRep'));
                this.lstCartItemDetails.forEach(cartItem => {
                    var dataRow = this.dsCompRep.filter(x => x.INV_ITEM_ID == cartItem.INV_ITEM_ID && x.ROWINDEX == cartItem.ROWINDEX);
                    if (cartItem.COUNTQTY.trim() != '' && cartItem.COUNTQTY.toUpperCase().trim() != 'NC') {
                        dataRow[0].COUNTQTY = cartItem.COUNTQTY;
                    }
                    else if ((cartItem.COUNTQTY.toString().trim().length == 0) || (cartItem.COUNTQTY.toUpperCase().toString() == 'NC') || (Number.isInteger(parseInt(cartItem.COUNTQTY.toString())))) {
                        if (dataRow[0].ChkValue == 'Y') {
                            dataRow[0].COUNTQTY = cartItem.COUNTQTY;
                        }
                        else {
                            if (cartItem.COUNTQTY.length == 0) {
                                dataRow[0].COUNTQTY = 'NC';
                            }
                        }
                    }
                    else {
                    }
                });
                sessionStorage.setItem('dsLatestCompRep', JSON.stringify(this.dsCompRep));
                this.dsLatestCompRep = JSON.parse(sessionStorage.getItem('dsLatestCompRep'));
            } catch (ex) {
                this.msgs = [];
                this.clientErrorMsg(ex, "onSubmitClick");
                return;
            }

            try {
                this.msgs = [];
                for (var i = 0; i < this.dsLatestCompRep.length; i++) {
                    var cartItem = this.dsLatestCompRep[i];
                    if (cartItem.COUNTQTY.trim() != '' && cartItem.COUNTQTY.toUpperCase().trim() != 'NC') {
                        if (!isNaN(Number(cartItem.COUNTQTY.toString()))) {
                            if (this._strAllowExcessPar.toString() == 'N') {
                                if (parseFloat(cartItem.OPTIMAL_QTY) < parseFloat(cartItem.COUNTQTY)) {
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Count Quantity should be less than Par Value' });
                                    return;
                                }
                            }
                        }
                        else {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Numeric values to Count Quantity' });
                            return;
                        }
                    }
                    else if ((cartItem.COUNTQTY.toString().trim().length == 0) || (cartItem.COUNTQTY.toUpperCase().toString().trim() == 'NC') || (Number.isInteger(parseInt(cartItem.COUNTQTY.toString())))) {
                        if (cartItem.ChkValue == 'Y') {
                            if (cartItem.COUNTQTY.toUpperCase().trim() == 'NC' || cartItem.COUNTQTY == '') {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Mandatory Counts Required' });
                                return;
                            }
                        }
                    }
                }
            } catch (ex) {
                this.msgs = [];
                this.clientErrorMsg(ex, "onSubmitClick");
                return;
            }

            try {
                this._strQtyOption = await this.outputDataset(this.dsCompRep);
                if (this._strQtyOption == '') {
                    return;
                }
                this.lstOutPutHeader = [];
                this.outPutHeader = new VM_CART_HEADER();
                this.outPutHeader.CART_ID = this.hdnCartId.toUpperCase();
                this.outPutHeader.BUSINESS_UNIT = this.selectedBUnit;
                this.outPutHeader.USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                this.outPutHeader.QUANTITY_OPTION = this._strQtyOption;
                this.outPutHeader.TRANSACTION_ID = parseInt(this.transID);
                this.outPutHeader.START_DATETIME = new Date();
                this.outPutHeader.END_DATETIME = new Date();
                this.outPutHeader.CMTS = '';
                this.outPutHeader.NO_OF_SCANS = 0 + '';
                this.outPutHeader.TOTAL_RECORDS = this.dsCompRep.length.toString();
                this.outPutHeader.NO_OF_ORDERED_ITEMS = this.intCntOrderedItems.toString();
                if (this.cartID.value != null && this.cartID.value != undefined && this.cartID.value != '') {
                    this.outPutHeader.DESCR = this.cartID.value;
                }
                this.lstOutPutHeader.push(this.outPutHeader);
                this.lstOutPutDetails = [];
                if (this._strQtyOption != '') {
                    this.intCntOrderedItems = 0;
                    this.dsLatestCompRep.forEach(cartItem => {
                        if (cartItem.COUNTQTY.trim() != '' && cartItem.COUNTQTY.toUpperCase().trim() != 'NC') {
                            this.outPutDetail = new VM_CART_DETAILS();
                            this.outPutDetail.ITEM_ID = cartItem.INV_ITEM_ID;
                            let _strCompt = '';
                            _strCompt = cartItem.COMPARTMENT.trim();
                            if (_strCompt == ' ') {
                                _strCompt = _strCompt.replace("'", "''");
                            }
                            this.outPutDetail.COMPARTMENT = _strCompt;
                            this.outPutDetail.COUNT_QUANTITY = parseFloat(cartItem.COUNTQTY);
                            this.outPutDetail.OPTIMAL_QUANTITY = parseFloat(cartItem.OPTIMAL_QTY);
                            this.outPutDetail.LNCMTS = '';
                            this.outPutDetail.UOM = cartItem.UOM;
                            this.outPutDetail.PRICE = parseFloat(cartItem.ITEM_PRICE);
                            this.outPutDetail.COUNT_REQUIRED = 'Y';
                            let _strItemType = '';
                            _strItemType = cartItem.INVENTORY_ITEM;
                            if (_strItemType == 'STOCK') {
                                _strItemType = 'Y';
                            }
                            else if (_strItemType == 'NONSTOCK') {
                                _strItemType = 'N';
                            }
                            else if (_strItemType == 'STOCKLESS') {
                                _strItemType = 'STOCKLESS';
                            }
                            else if (_strItemType == 'CONSIGN') {
                                _strItemType = 'CONSIGN';
                            }
                            else if (_strItemType == 'STOCKTRANSFER') {
                                _strItemType = 'STOCKTRANSFER';
                            }
                            this.outPutDetail.INVENTORY_ITEM = _strItemType;
                            this.outPutDetail.ITEM_DESCR = cartItem.ITEM_DESCR;
                            this.outPutDetail.CART_REPLEN_CTRL = cartItem.CART_REPLEN_CTRL;
                            this.outPutDetail.CART_REPLEN_OPT = cartItem.CART_REPLEN_OPT;
                            this.outPutDetail.MAX_QTY = parseFloat(cartItem.MAX_QTY);
                            this.outPutDetail.FOQ = cartItem.FOQ;
                            this.outPutDetail.CUST_ITEM_NO = cartItem.CUST_ITEM_ID;
                            this.outPutDetail.COUNT_ORDER = parseFloat(cartItem.COUNT_ORDER);
                            this.outPutDetail.ITEM_COUNT_ORDER = parseFloat(cartItem.COUNT_ORDER);
                            this.lstOutPutDetails.push(this.outPutDetail);
                            this.ChkCountAndParValue(cartItem.OPTIMAL_QTY.toString(), cartItem.COUNTQTY, this._strQtyOption);
                        }
                    });
                }

                for (var i = 0; i < this.lstOutPutHeader.length; i++) {
                    this.lstOutPutHeader[i].NO_OF_ORDERED_ITEMS = this.intCntOrderedItems.toString();
                    this.lstOutPutHeader[i].REQ_NO = this.reqNo;
                    this.lstOutPutHeader[i].CREATION_DT = this.creationdate;
                }

            } catch (ex) {
                this.clientErrorMsg(ex, "onSubmitClick");
                return;
            }

            try {
                let finalOutPutDictionary = { 'HEADER': this.lstOutPutHeader, 'DETAILS': this.lstOutPutDetails };
                let orgGroupID = '';

                if (this.isShowOrgGroupDD) {
                    orgGroupID = this.selectedOrgGroupId;
                }
                else {
                    orgGroupID = (this.orgGrpId.split('-'))[0].trim();
                }

                await this.createOrdersService.sendCartCounts(finalOutPutDictionary, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedBUnit, this.cartID.code,
                    this.deviceTokenEntry[TokenEntry_Enum.ProfileID], orgGroupID, this.transID)
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<any>;
                        this.selectedBUnit = 'Select Bunit';
                        this.lstCartItemDetails = [];
                        this.lstCartIDs = [];
                        this.cartID = '';
                        this.showGrid = false;
                        this.lstCartItemDetails = [];
                        this.lstCartHdr = [];
                        this.allDateString = '';
                        this.transID = '';
                        this.parLocType = '';
                        this.creationdate = '';
                        this.reqNo = '';
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                break;
                            }
                            case StatusType.Warn: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }

                    });
            } catch (ex) {
                this.clientErrorMsg(ex, "onSubmitClick");
                return;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "onSubmitClick");
            return;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async outputDataset(ds) {
        let _strQtyOption = '';
        try {
            if (this.lstCartItemDetails.length > 0) {
                await this.commonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], '2', 'QTY_OPTION')
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        let data = <AtParWebApiResponse<string>>res.json();
                        switch (data.StatType) {
                            case StatusType.Success: {
                                _strQtyOption = data.DataVariable.toString();
                                if (_strQtyOption.toUpperCase() == 'COUNT') {
                                    _strQtyOption = '01';
                                }
                                else if (_strQtyOption.toUpperCase() == 'REQUEST') {
                                    _strQtyOption = '02';
                                }
                                else {
                                    if (this.parLocType != null && this.parLocType != '') {
                                        _strQtyOption = this.parLocType;
                                    }
                                    else {
                                        _strQtyOption = '03';
                                    }
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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

            return _strQtyOption;
        } catch (ex) {
            _strQtyOption = '';
            this.clientErrorMsg(ex, "outputDataset");
            return _strQtyOption;
        }
    }

    ChkCountAndParValue(pParValue: string, pCountValue: string, pOption: string) {
        try {
            if (pParValue != '' && (parseFloat(pParValue)) && pCountValue != '' && (parseFloat(pCountValue))) {
                if (pOption != '') {
                    if (pOption == '01') {
                        if (parseFloat(pParValue) > parseFloat(pCountValue)) {
                            this.intCntOrderedItems++;
                        }
                    }
                    else if (pOption == '02') {
                        if (parseFloat(pCountValue) > 0) {
                            this.intCntOrderedItems++;
                        }
                    }
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ChkCountAndParValue");
        }
    }

    customSort(event) {
        var element = event;
        let result = null;
        try {
            if (this.preField == element.field) {
                if (element.order == 1) {
                    element.order = 1;
                } else {
                    element.order = -1;
                }
            } else {
                if (element.field != 'INV_ITEM_ID') {
                    element.order = 1;
                } else {
                    if (this.preField == '') {
                        element.order = -1;
                    }
                    else {
                        element.order = 1;
                    }
                }
            }
            this.preField = element.field;

            this.lstCartItemDetails = this.lstCartItemDetails.sort(function (a, b) {
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
                    if (Number(a[element.field]) && Number(b[element.field])) {
                        result = (parseFloat(a[element.field]) == parseFloat(b[element.field])) ? 0 : (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
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
        catch (ex) {
            this.clientErrorMsg(ex, "customSort")
        }
    }


    customSort1(event, elementType: string = "") {
        var element = event;
        let result = null;

        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;

        } else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;

        try {
            this.lstCartItemDetails = this.lstCartItemDetails.sort(function (a, b) {
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
                    if (Number(a[element.field]) && Number(b[element.field])) {
                        result = (parseFloat(a[element.field]) == parseFloat(b[element.field])) ? 0 : (parseFloat(a[element.field]) < parseFloat(b[element.field])) ? -1 : (parseFloat(a[element.field]) > parseFloat(b[element.field])) ? 1 : 0;
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
            if (this.blnSortByColumn == false) {
                element.order = -1;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort1");
        }

    }

    clientErrorMsg(strExMsg, funName) {
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }


    OnDestroy() {
        sessionStorage.removeItem('dsLatestCompRep');
        sessionStorage.removeItem('dsCompRep');
        this.showGrid = null;
        this.isShowOrgGroupDD = null;
        this.orgGrpId = null;
        this.selectedOrgGroupId = null;
        this.selectedBUnit = null;
        this.allDateString = null;
        this.transID = null;
        this.recordsPerPage = null;
        this.cartID = null;
        this.deviceTokenEntry = null;
        this.msgs = null;
        this.lstCartIDs = null;
        this.lstOrgGroups = null;
        this.lstFilterCartIDs = null;
        this.lstBUnits = null;
        this.orgGroupData = null;
        this.lstCartItemDetails = null;
    }

} 