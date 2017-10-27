/// <reference path="../shared/atparstatuscodes.ts" />
import { Component, Injectable, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, ModeEnum } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { StatusType, EnumApps } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { VM_MT_POU_DEPT_CARTS } from '../entities/vm_mt_pou_dept_carts';
import { VM_MT_POU_DEPT } from '../entities/vm_mt_pou_dept';
import { MT_POU_NONCART_ITEMS } from '../entities/mt_pou_noncart_items';
import { MT_POU_CART_INVENTORY } from '../entities/mt_pou_cart_inventory';
import { VM_CONSIGNMENT_ITEM_TABLE } from '../entities/vm_consignment_item_table';
import { VM_INVENTORY_ITEMS_TABLE } from '../entities/vm_inventory_items_table';
import { VM_INVENTORY_CART_ITEMS } from '../entities/vm_inventory_cart_items';
import { MaintainNonCartItemService } from '../../app/PointOfUse/pou-maintain-non-cart-items.service';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { DOCUMENT } from '@angular/platform-browser';
declare var module: {
    id: string;
}

@Component({

    templateUrl: 'pou-maintain-non-cart-items.component.html',
    providers: [AtParCommonService, MaintainNonCartItemService],
})

export class MaintainNonCartItemsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    _deviceTokenEntry: any;
    pazeSize: number;
    growlMessage: Message[] = [];
    lstDepartmentCarts: VM_MT_POU_DEPT_CARTS[] = [];
    showFirstPage: boolean = true;
    showSecondPage: boolean = false;
    form: boolean = false;
    editform: boolean = false;
    lstConsignmentItems: MT_POU_NONCART_ITEMS[] = [];
    lstAddConsignmentItems: VM_CONSIGNMENT_ITEM_TABLE[] = [];
    conItem = new VM_CONSIGNMENT_ITEM_TABLE();
    isEditMode: boolean = false;
    itemID: string;
    itemDescription: string;
    inventoryItem = new VM_INVENTORY_ITEMS_TABLE;//MT_POU_CART_INVENTORY;
    orgGroupID: string;
    blnGetDetails: boolean = false;
    isDuplicate: boolean = false;
    selectRows: any = [];
    strItemDesc: string = '';
    strLotControlled: string = '';
    strSerialized: string = '';
    strBusinessUnit: string = '';
    strCartId: string = '';
    strOptimumQty: string = "";
    strCompartment: string = '';
    strMode: string = '';

    showGrid: boolean = false;
    enableLotControl: boolean = false;
    enableSerial: boolean = false;
    enableQuantity: boolean = false;
    showtxtItemID: boolean = false;
    showLabelItemID: boolean = false;
    lstCartInventoryItems: SelectItem[] = [];
    lstInventoryCarts: VM_INVENTORY_CART_ITEMS[] = [];
    lstCartInvItemList: VM_INVENTORY_ITEMS_TABLE[] = [];
    statusType: any = '';


    itemIdStatus: number;
    itemDescStatus: number;
    manufactStatus: number;
    manufactItemStatus: number;
    vendorStatus: number;
    customItemStatus: number;
    vendorItemStatus: number;
    countOrdedrStatus: number;
    optimumQtyStatus: number;
    uomStatus: number;
    upcidStatus: number;
    gtinStatus: number;
    itemPriceStatus: number;
    chargeCodeStatus: number;
    compartmentStatus: number;
    lotNumberStatus: number;
    serialNumberStatus: number;
    quantityStatus: number;
    issueUOM: number;
    convRate: number;

    disableFormBtn: boolean;
    disableInvBtn: boolean;
    breadCrumbMenu: Menus;


    constructor(
        private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private maintainNonCartItemService: MaintainNonCartItemService,
        private httpService: HttpService,
        @Inject(DOCUMENT) private document,
        private http: Http,
        private atParConstant: AtParConstants) {
        this.breadCrumbMenu = new Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

        if (this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID] == 'All') {
            this.orgGroupID = 'All'
        }
        else {
            this.orgGroupID = this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
        }
    }

    async ngOnInit() {

        this.pazeSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        this.showGrid = false;
        await this.bindDataGrid();
    }

    async bindDataGrid() {
        try {
            this.spinnerService.start();

            if (this.dataTableComponent != undefined) {
                this.dataTableComponent.reset();
            }
            await this.maintainNonCartItemService.getUserDepartments(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupID)
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<VM_MT_POU_DEPT>;
                    this.growlMessage = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            if (res.DataList.length > 0) {
                                this.getUserDepartmentCarts();
                            }
                            else {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Department(s) allocated to the user' });
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            if (res.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                this.showGrid = true;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Department(s) allocated to the user' });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }

                })
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getUserDepartmentCarts() {
        this.lstDepartmentCarts = [];
        await this.maintainNonCartItemService.getUserdepartmentsCarts(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupID)
            .catch(this.httpService.handleError).then((result: Response) => {
                this.spinnerService.stop();
                this.growlMessage = [];
                let res = result.json() as AtParWebApiResponse<VM_MT_POU_DEPT_CARTS>;
                this.showGrid = true;
                if (res.StatType == StatusType.Success) {
                    this.lstDepartmentCarts = res.DataList;
                }
                else if (res.StatType == StatusType.Warn) {
                    if (res.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Cart(s) allocated to the user' });
                    }
                    else {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                    }
                } else {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                }

            })
    }

    async btnAdd_Click(objCart) {
        this.lstConsignmentItems = [];
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add / Edit Non Cart Items';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        if (objCart != '') {
            sessionStorage.setItem('MainCart', JSON.stringify(objCart));
            this.itemID = '';
            this.itemDescription = '';
        } else {
            objCart = JSON.parse(sessionStorage.getItem('MainCart'));
        }
        sessionStorage.setItem('PreviousPage', 'FirtPage');

        this.showSecondPage = true;
        this.showFirstPage = false;

        if (this.itemID == undefined) {
            this.itemID = '';
        }
        if (this.itemDescription == undefined) {
            this.itemDescription = '';
        }
        this.spinnerService.start();
        await this.getConsignmentItems(objCart.BUSINESS_UNIT, objCart.CART_ID, this.itemID, this.itemDescription, true);
        this.spinnerService.stop();
    }

    async btnGo_Click() {
        if (this.dataTableComponent != undefined) {
            this.dataTableComponent.reset();
        }
        await this.btnAdd_Click('');
    }

    async getConsignmentItems(businessUnit, cartID, itemID, itemDesc, showWarn: boolean) {

        this.lstConsignmentItems = [];
        await this.maintainNonCartItemService.getConsignmentItems(businessUnit, cartID, itemID, itemDesc)
            .catch(this.httpService.handleError).then((result: Response) => {

                let res = result.json() as AtParWebApiResponse<MT_POU_NONCART_ITEMS>;
                this.growlMessage = [];

                switch (res.StatType) {
                    case StatusType.Success: {
                        if (res.DataList.length > 0) {
                            this.lstConsignmentItems = res.DataList;
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        if (res.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                            if (showWarn) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No items added to this cart. Click Add Item to Add' });
                            }
                        }
                        else {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        }

                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }

                }

            });
    }

    async btnAddItem_Click() {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Non Cart Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.disableFormBtn = true;
        sessionStorage.setItem('PreviousPage', 'SecondPage');
        var objMainCart = JSON.parse(sessionStorage.getItem('MainCart'));
        this.conItem = objMainCart;
        this.isEditMode = false;
        this.showFirstPage = false;
        this.showSecondPage = false;
        this.form = true;
        this.conItem.STATUSVALUE = 'Active';
        this.showLabelItemID = false;
    }

    async btnEditItem_Click(objItem) {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Non Cart Item';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        sessionStorage.setItem('PreviousPage', 'SecondPage');
        this.growlMessage = [];
        this.disableFormBtn = false;
        this.isEditMode = true;
        this.showFirstPage = false;
        this.showSecondPage = false;
        this.form = true;
        this.showLabelItemID = true;
        this.conItem = objItem;
        this.itemIdStatus = 0;
        this.itemDescStatus = 0;
        this.uomStatus = 0;

        if (objItem.STATUS == 'Y') {
            this.conItem.STATUSVALUE = 'Active';
        }
        else if (objItem.STATUS == 'N') {
            this.conItem.STATUSVALUE = 'InActive';
        }
        else {
            this.conItem.STATUSVALUE = 'Pending';
        }
        if (objItem.PATIENT_CHARGEABLE == 'Y') {
            this.conItem.ISPATIENTCHARGEABLE = true;
            this.itemPriceStatus = 0;
            this.chargeCodeStatus = 0;
        } else {
            this.conItem.ISPATIENTCHARGEABLE = false;
        }
        if (objItem.LOT_CONTROLLED == "Y") {
            this.conItem.ISLOTCONTROLLED = true;
        }
        else {
            this.conItem.ISLOTCONTROLLED = false;
        }
        if (objItem.SERIALIZED == "Y") {
            this.conItem.ISSERIALIZED = true
        }
        else {
            this.conItem.ISSERIALIZED = false;
        }
        if (objItem.SAMPLE == "Y") {
            this.conItem.ISSAMPLE = true
        }
        else {
            this.conItem.ISSAMPLE = false;
        }
        setTimeout(function () {
            let txtItemDescr = <HTMLInputElement>document.getElementById("txtItemDescr");
            txtItemDescr.focus();
        }, 300);
        this.blnGetDetails = false;
        await this.getItemDetails(this.conItem.BUSINESS_UNIT, this.conItem.CART_ID, this.conItem.ITEM_ID);

    }

    async getItemDetails(businessUnit, cartID, itemID) {

        this.selectRows = this.lstConsignmentItems.filter(x => x.BUSINESS_UNIT == businessUnit && x.CART_ID == cartID && x.ITEM_ID == itemID);

        if (this.blnGetDetails) {
            await this.getConsignmentItems(businessUnit, cartID, itemID, "", false);
            this.selectRows = this.lstConsignmentItems.filter(x => x.BUSINESS_UNIT == businessUnit && x.ITEM_ID == itemID);
        }
        if (!this.isEditMode && this.selectRows.length > 0) {
            this.showLabelItemID = true;
        }
        if (this.selectRows.length > 0) {
            this.conItem = this.selectRows[0];

            if (this.selectRows[0].LOT_CONTROLLED == 'Y') {
                this.conItem.ISLOTCONTROLLED = true;
            } else {
                this.conItem.ISLOTCONTROLLED = false;
            }

            if (this.selectRows[0].SERIALIZED == 'Y') {
                this.conItem.ISSERIALIZED = true;
            } else {
                this.conItem.ISSERIALIZED = false;
            }
            if (this.selectRows[0].PATIENT_CHARGEABLE == 'Y') {
                this.conItem.ISPATIENTCHARGEABLE = true;
            }
            else {
                this.conItem.ISPATIENTCHARGEABLE = false;
            }
            if (this.selectRows[0].SAMPLE == 'Y') {
                this.conItem.ISSAMPLE = true;
            }
            else {
                this.conItem.ISSAMPLE = false;
            }
            if (this.selectRows[0].STATUS == 'Y') {
                this.conItem.STATUSVALUE = 'Active';
            } else if (this.selectRows[0].STATUS == 'N') {
                this.conItem.STATUSVALUE = 'InActive';
            } else {
                this.conItem.STATUSVALUE = 'Pending';

            }
            this.disableFormBtn = false;

            sessionStorage.setItem("Old_Cmpt", this.selectRows[0].COMPARTMENT);
            sessionStorage.setItem("Old_Status", this.selectRows[0].STATUS);
        }
        else {

            //this.conItem.ITEM_DESCRIPTION = "";
            //this.conItem.MANUFACTURE_ITEM_ID = "";
            //this.conItem.CUST_ITEM_ID = "";
            //this.conItem.VENDOR_ITEM_ID = "";
            //this.conItem.UOM = "";
            //this.conItem.ITEM_PRICE = "";
            //this.conItem.CHARGE_CODE = "";
            //this.conItem.COUNT_ORDER = "";
            //this.conItem.OPTIMUM_QTY = "";
            //this.conItem.UPC_ID = "";
            //this.conItem.GTIN = "";
            //this.conItem.ISLOTCONTROLLED = false;
            //this.conItem.ISSERIALIZED = false;
            //this.conItem.COMPARTMENT = "";
            //this.conItem.MANUFACTURER = "";
            //this.conItem.VENDOR = "";
            //this.conItem.ISPATIENTCHARGEABLE = false;
            //this.conItem.ISSAMPLE = false;

            (<HTMLInputElement>document.getElementById("ItemDescr")).focus();


        }
    }

    async txtItemID_TextChanged() {
        if (this.conItem.ITEM_ID != undefined && this.conItem.ITEM_ID != '') {
            this.blnGetDetails = true
            this.clearFields();
            await this.getItemDetails(this.conItem.BUSINESS_UNIT, this.conItem.CART_ID, this.conItem.ITEM_ID)
        }

    }

    clearFields() {
        this.conItem.ITEM_DESCRIPTION = "";
        this.conItem.MANUFACTURE_ITEM_ID = "";
        this.conItem.CUST_ITEM_ID = "";
        this.conItem.VENDOR_ITEM_ID = "";
        this.conItem.UOM = "";
        this.conItem.ITEM_PRICE = "";
        this.conItem.CHARGE_CODE = "";
        this.conItem.COUNT_ORDER = "";
        this.conItem.OPTIMUM_QTY = "";
        this.conItem.UPC_ID = "";
        this.conItem.GTIN = "";
        this.conItem.ISLOTCONTROLLED = false;
        this.conItem.ISSERIALIZED = false;
        this.conItem.COMPARTMENT = "";
        this.conItem.MANUFACTURER = "";
        this.conItem.VENDOR = "";
        this.conItem.ISPATIENTCHARGEABLE = false;
        this.conItem.ISSAMPLE = false;
    }

    async btnAdjustQty_Click(mode, objInv: MT_POU_NONCART_ITEMS) {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Adjust Item Quantity';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        this.growlMessage = [];
        this.editform = true;
        this.form = false;
        this.showFirstPage = false;
        this.showSecondPage = false;
        this.strMode = mode;
        this.disableInvBtn = true;
        this.inventoryItem = new VM_INVENTORY_ITEMS_TABLE();
        if (mode == 'addInventory') {
            sessionStorage.setItem('PreviousPage', 'Form');
            this.inventoryItem.BUSINESS_UNIT = this.conItem.BUSINESS_UNIT;
            this.inventoryItem.CART_ID = this.conItem.CART_ID;
            this.inventoryItem.ITEM_ID = this.conItem.ITEM_ID;
            this.inventoryItem.ITEM_DESCRIPTION = this.conItem.ITEM_DESCRIPTION;
            this.inventoryItem.COMPARTMENT = this.conItem.COMPARTMENT;
        }

        else {
            sessionStorage.setItem('PreviousPage', 'SecondPage');
            this.inventoryItem.BUSINESS_UNIT = objInv.BUSINESS_UNIT;
            this.inventoryItem.CART_ID = objInv.CART_ID;
            this.inventoryItem.ITEM_ID = objInv.ITEM_ID;
            this.inventoryItem.ITEM_DESCRIPTION = objInv.ITEM_DESCRIPTION;
            this.inventoryItem.COMPARTMENT = objInv.COMPARTMENT;
        }

        if (mode == 'direct?appId=15') {//direct?appId=15
            this.showtxtItemID = true;
            ///TO DO
        }
        else {
            this.showtxtItemID = false;
            this.spinnerService.start();
            await this.atParCommonService.getProfileParamValue(this._deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.PointOfUse, 'MAX_ALLOW_QTY')
                .catch(this.httpService.handleError).then((result: Response) => {

                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            sessionStorage.setItem("strMaxAllowQty", res.DataVariable.toString());
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }

                    }
                });
            await this.getConsignmentItems(this.inventoryItem.BUSINESS_UNIT, this.inventoryItem.CART_ID, this.inventoryItem.ITEM_ID, '', false);

            if (this.lstConsignmentItems.length > 0) {
                var filterItem = this.lstConsignmentItems.filter(x => x.ITEM_ID = this.inventoryItem.ITEM_ID)
                if (filterItem.length > 0) {
                    this.strItemDesc = filterItem[0].ITEM_DESCRIPTION;
                    if (filterItem[0].LOT_CONTROLLED != undefined && filterItem[0].LOT_CONTROLLED != '') {
                        this.strLotControlled = filterItem[0].LOT_CONTROLLED;
                    }
                    if (filterItem[0].SERIALIZED != undefined && filterItem[0].SERIALIZED != '') {
                        this.strSerialized = filterItem[0].SERIALIZED;
                    }
                }
            }
            var LotCtrl = (<HTMLInputElement>document.getElementById("LotNum"));
            var SerialCtrl = (<HTMLInputElement>document.getElementById("SerialNum"));

            if (this.strLotControlled == "Y" && this.strSerialized == "Y") {
                this.enableSerial = true;
                this.enableLotControl = true;
                this.inventoryItem.QUANTITY = "1";
                this.enableQuantity = false;
                LotCtrl.style.backgroundColor = "#FAFAD2";
                SerialCtrl.style.backgroundColor = "#FAFAD2";

                setTimeout(function () {
                    (<HTMLInputElement>document.getElementById("LotNum")).focus();
                }, 100);

            }
            else if (this.strLotControlled == "Y") {
                this.enableLotControl = true;
                this.enableSerial = false;
                this.inventoryItem.QUANTITY = "";
                this.enableQuantity = true;
                LotCtrl.style.backgroundColor = "#FAFAD2";

                setTimeout(function () {
                    (<HTMLInputElement>document.getElementById("LotNum")).focus();
                }, 100);

            }

            else if (this.strSerialized == "Y") {
                this.enableLotControl = false;
                this.enableSerial = true;
                this.inventoryItem.QUANTITY = "1";
                this.enableQuantity = false;
                SerialCtrl.style.backgroundColor = "#FAFAD2";

                setTimeout(function () {
                    (<HTMLInputElement>document.getElementById("SerialNum")).focus();
                }, 100);

            }
            else {
                this.enableQuantity = true;
                this.enableLotControl = false;
                this.enableSerial = false;
                this.inventoryItem.QUANTITY = "";
                (<HTMLInputElement>document.getElementById("Quantity")).style.backgroundColor = "white";
                setTimeout(function () {
                    (<HTMLInputElement>document.getElementById("Quantity")).focus();
                }, 100);


            }
            this.spinnerService.stop();
        }

    }

    focusControl() {
        if (this.enableSerial && this.enableLotControl) {
            (<HTMLInputElement>document.getElementById("LotNum")).focus();
            this.inventoryItem.QUANTITY = "1";
        }
        else if (this.enableLotControl){
            (<HTMLInputElement>document.getElementById("LotNum")).focus();
        }
        else if (this.enableSerial) {
            this.inventoryItem.QUANTITY = "1";
            (<HTMLInputElement>document.getElementById("SerialNum")).focus();
        }
        else {
            (<HTMLInputElement>document.getElementById("Quantity")).focus();
        }
    }

    async btnSave_Click() {
        this.growlMessage = [];
        this.lstAddConsignmentItems = [];
        try {

            if (this.conItem.ITEM_ID.trim() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter ItemID' });
                return;
            }
            if (this.conItem.ITEM_DESCRIPTION.trim() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Item Description' });
                return;
            }
            if (this.conItem.UOM.trim() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter UOM' });
                return;
            }


            if (this.conItem.ISPATIENTCHARGEABLE) {
                if (this.conItem.ITEM_PRICE == undefined) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Item Price' });
                    return;
                }
                if (this.conItem.ITEM_PRICE.toString().trim() == '') {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Item Price' });
                    return;
                }
                if (this.conItem.CHARGE_CODE == undefined) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Charge Code' });
                    return;
                }
                if (this.conItem.CHARGE_CODE == '') {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Charge Code' });
                    return;
                }
                this.conItem.PAT_CHARGEABLE = 'Y';
            } else {
                this.conItem.PAT_CHARGEABLE = 'N';
            }

            if (this.conItem.ISLOTCONTROLLED) {
                this.conItem.LOT_CONTROLLED = 'Y';
            }
            else {
                this.conItem.LOT_CONTROLLED = 'N';
            }
            if (this.conItem.ISSERIALIZED) {
                this.conItem.SERIALIZED = 'Y';
            } else {
                this.conItem.SERIALIZED = 'N';
            }
            if (this.conItem.ISSAMPLE) {
                this.conItem.SAMPLE = 'Y';
            } else {
                this.conItem.SAMPLE = 'N';
            }
            if (this.conItem.STATUSVALUE == "Active") {
                this.conItem.STATUS = 'Y';
            }
            else if (this.conItem.STATUSVALUE == "InActive") {
                this.conItem.STATUS = 'N';
            }
            else {
                this.conItem.STATUS = 'P';
            }
            if (this.conItem.ISSUE_UOM == undefined) {
                this.conItem.ISSUE_UOM = '';
            }
            if (this.conItem.UOM == undefined) {
                this.conItem.UOM = '';
            }
            if (this.conItem.CONV_RATE_PAR_TO_ISSUE == undefined || this.conItem.CONV_RATE_PAR_TO_ISSUE == "" || this.conItem.CONV_RATE_PAR_TO_ISSUE == null) {
                this.conItem.CONV_RATE_PAR_TO_ISSUE = '1';
            }
            if (this.conItem.ITEM_PRICE == undefined) {
                this.conItem.ITEM_PRICE = '';
            }
            this.conItem.COMPARTMENT = this.conItem.COMPARTMENT.trim();
            this.conItem.ITEM_DESCRIPTION = (this.conItem.ITEM_DESCRIPTION).trim();
            this.conItem.ITEM_DESCRIPTION = this.conItem.ITEM_DESCRIPTION.replace(/'/g, "''");
            this.conItem.ITEM_DESCRIPTION = this.conItem.ITEM_DESCRIPTION.trim();
            this.conItem.MANUFACTURE_ITEM_ID = this.conItem.MANUFACTURE_ITEM_ID.trim();
            this.conItem.CUST_ITEM_ID = this.conItem.CUST_ITEM_ID.toString().trim();
            this.conItem.VENDOR_ITEM_ID = this.conItem.VENDOR_ITEM_ID.toString().trim();
            this.conItem.COUNT_ORDER = this.conItem.COUNT_ORDER.toString().trim();
            this.conItem.OPTIMUM_QTY = this.conItem.OPTIMUM_QTY.toString().trim();
            this.conItem.UOM = this.conItem.UOM.toString().trim();
            this.conItem.ISSUE_UOM = this.conItem.ISSUE_UOM.toString().trim();
            this.conItem.CONV_RATE_PAR_TO_ISSUE = this.conItem.CONV_RATE_PAR_TO_ISSUE.toString().trim();
            this.conItem.ITEM_PRICE = this.conItem.ITEM_PRICE.toString().trim();
            this.conItem.UPC_ID = this.conItem.UPC_ID.toString().trim();
            this.conItem.GTIN = this.conItem.GTIN.toString().trim();
            this.conItem.CHARGE_CODE = this.conItem.CHARGE_CODE.toString().trim();
            this.conItem.VENDOR = this.conItem.VENDOR.toString().trim();


            var old_Compart = sessionStorage.getItem("Old_Cmpt");
            if (old_Compart == undefined || old_Compart == null) {
                old_Compart = '';
            }
            this.conItem.OLD_COMPARTMENT = old_Compart;

            //If updating the Item status from Pending to Active we need to update the Bin Loc in Inventory table
            var old_Status = sessionStorage.getItem("Old_Status");
            if (old_Status != '' && old_Status != null) {
                if (old_Status == 'P' && this.conItem.STATUSVALUE == "Active") {
                    this.conItem.UPDATE_BIN_IN_INVENTORY = true;
                }
                else {
                    this.conItem.UPDATE_BIN_IN_INVENTORY = false;
                }
            }
            else {
                this.conItem.UPDATE_BIN_IN_INVENTORY = false
            }

            this.lstAddConsignmentItems.push(this.conItem);


            if (!this.isEditMode) {//IF ADD MODE
                this.checkForDuplicates();
                if (this.isDuplicate) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: ' Item already exists' });
                    return;
                }
                else {
                    this.spinnerService.start();
                    this.maintainNonCartItemService.addConsignmentItem(this.lstAddConsignmentItems)
                        .catch(this.httpService.handleError).then((result: Response) => {
                            this.spinnerService.stop();
                            let res = result.json() as AtParWebApiResponse<MT_POU_NONCART_ITEMS>;
                            this.growlMessage = [];
                            switch (res.StatType) {
                                case StatusType.Success: {
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Added Item successfully' });
                                    this.btnAdjustQty_Click('addInventory', null);
                                    this.conItem = new VM_CONSIGNMENT_ITEM_TABLE();
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                    break;
                                }
                                case StatusType.Error: {
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                    break;
                                }

                            }
                            this.atParConstant.scrollToTop();
                        })
                }


            }
            else { //ELSE EDIT MODE
                this.spinnerService.start();
                this.maintainNonCartItemService.updateConsignmentItem(this.lstAddConsignmentItems)
                    .catch(this.httpService.handleError).then((result: Response) => {
                        this.spinnerService.stop();
                        let res = result.json() as AtParWebApiResponse<any>;
                        this.growlMessage = [];
                        (<HTMLInputElement>document.getElementById("txtItemDescr")).focus();
                        switch (res.StatType) {
                            case StatusType.Success: {
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Update to item successfully' });
                                this.showFirstPage = false;
                                this.showSecondPage = false;
                                this.form = true;
                                this.editform = false;
                                break;
                            }
                            case StatusType.Warn: {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                break;
                            }

                        }
                        this.atParConstant.scrollToTop();
                    })
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    checkForDuplicates() {
        var selectRows = [];
        selectRows = this.lstConsignmentItems.filter(x => x.BUSINESS_UNIT == this.conItem.BUSINESS_UNIT && x.CART_ID == this.conItem.CART_ID && x.ITEM_ID == this.conItem.ITEM_ID);
        if (selectRows.length > 0) {
            this.isDuplicate = true;
        }
    }

    async btnSaveItemQuantity_Click() {
        this.growlMessage = [];
        try {
            if (this.inventoryItem.QUANTITY == '' || this.inventoryItem.QUANTITY == undefined || this.inventoryItem.QUANTITY == "0") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Quantity' });
                return;
            }
            if (parseInt(this.inventoryItem.QUANTITY) > parseInt(sessionStorage.getItem("strMaxAllowQty"))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                (<HTMLInputElement>document.getElementById("Quantity")).focus();
                this.atParConstant.scrollToTop();
                return;
            }
            this.spinnerService.start()
            await this.getItemsAdjustQty(this.inventoryItem.BUSINESS_UNIT, this.inventoryItem.CART_ID, this.inventoryItem.ITEM_ID, this.inventoryItem.COMPARTMENT, this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this._deviceTokenEntry[TokenEntry_Enum.SystemId]);
            this.spinnerService.stop()
            if (this.statusType != StatusType.Success) {
                return;
            }
            var drItems = this.lstInventoryCarts.filter(x => x.BUSINESS_UNIT == this.inventoryItem.BUSINESS_UNIT && x.CART_ID == this.inventoryItem.CART_ID);
            if (drItems.length > 0) {
                this.strLotControlled = drItems[0].LOT_C0NTROLLED.trim();
                this.strSerialized = drItems[0].SERIAL_CONTROLLED.trim();
                this.strBusinessUnit = drItems[0].BUSINESS_UNIT;
                this.strCartId = drItems[0].CART_ID;
                this.itemDescription = drItems[0].ITEM_DESCRIPTION;
                this.strCompartment = drItems[0].COMPARTMENT;
            }
            if (this.strLotControlled == "Y" && (this.inventoryItem.LOTNUMBER == '' || this.inventoryItem.LOTNUMBER == undefined)
                && this.strSerialized == "Y" && (this.inventoryItem.SERIALNUMBER == '' || this.inventoryItem.SERIALNUMBER == undefined)) {

                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Lot Number/Serial Number' });
                return;
            }

            if (this.strLotControlled == "Y" && (this.inventoryItem.LOTNUMBER == '' || this.inventoryItem.LOTNUMBER == undefined)) {

                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Lot Control Number' });
                return;
            }
            if (this.strSerialized == "Y" && (this.inventoryItem.SERIALNUMBER == '' || this.inventoryItem.SERIALNUMBER == undefined)) {

                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Serial Number' });
                return;
            }
            try {
                var todayDate = new Date(); //Today Date
                var expDate = new Date(this.inventoryItem.EXPIRYDATE);
                if (todayDate > expDate) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Expiry Date should be greater than today's date" });
                    return;
                }

            } catch (ex) {
                this.clientErrorMsg(ex);
            }
            this.lstCartInvItemList = [];
            this.lstCartInvItemList.push(this.inventoryItem);
            this.spinnerService.start();
            await this.maintainNonCartItemService.updateCartInventory(this.lstCartInvItemList)
                .catch(this.httpService.handleError).then((result: Response) => {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    let res = result.json() as AtParWebApiResponse<any>;
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Adding Item ' + this.inventoryItem.ITEM_ID + ' to Cart Inventory Successful' });
                            sessionStorage.setItem('PreviousPage', 'SecondPage');
                            this.clearValues();
                            this.focusControl();
                            this.disableInvBtn = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }

                    }
                    this.atParConstant.scrollToTop();
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async getItemsAdjustQty(bUnit, cartID, itemID, compartment, userID, orgGrpID, systemID) {
        this.statusType = '';
        await this.maintainNonCartItemService.getItemsAdjustQty(bUnit, cartID, itemID, compartment, userID, orgGrpID, systemID)
            .catch(this.httpService.handleError).then((result: Response) => {
                this.spinnerService.stop();
                let res = result.json() as AtParWebApiResponse<VM_INVENTORY_CART_ITEMS>;
                this.statusType = res.StatType;
                this.growlMessage = [];
                this.lstInventoryCarts = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstInventoryCarts = res.DataList;

                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }

                }
            });

    }


    async  btnGoBack_Click() {
        this.lstConsignmentItems = [];
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        var previousPage = sessionStorage.getItem("PreviousPage");
        this.showFirstPage = false;
        this.showSecondPage = false;
        this.editform = false;
        this.form = false;
        this.itemID = '';
        this.itemDescription = '';
        if (previousPage == 'FirtPage') {
            // await this.ngOnInit()
            this.showFirstPage = true;
        }
        else if (previousPage == 'SecondPage') {
            await this.btnAdd_Click('');
            this.showSecondPage = true;

        }
        else if (previousPage == 'Form') {
            await this.btnAddItem_Click();
            this.form = true;
        }

    }

    clearValues() {
        if (this.strMode == 'direct?appId=15') {
            this.inventoryItem.ITEM_ID = '';
        }
        this.inventoryItem.LOTNUMBER = '';
        this.inventoryItem.SERIALNUMBER = '';
        this.inventoryItem.QUANTITY = '';
        this.inventoryItem.EXPIRYDATE = '';

    }

    swtPatient_Click() {
        if (this.conItem.ISPATIENTCHARGEABLE) {
            if (this.conItem.ITEM_PRICE == undefined || this.conItem.ITEM_PRICE == '' || this.conItem.CHARGE_CODE == undefined || this.conItem.CHARGE_CODE == '') {
                this.disableFormBtn = true;
            } else {
                this.disableFormBtn = false;
            }
        }
        else {
            if (this.itemDescStatus == 0 && this.itemDescStatus == 0 && this.uomStatus == 0) {
                if ((this.manufactStatus == 0 || this.manufactStatus == undefined) && (this.manufactItemStatus == 0 || this.manufactItemStatus == undefined) &&
                    (this.vendorStatus == 0 || this.vendorStatus == undefined) && (this.vendorItemStatus == 0 || this.vendorItemStatus == undefined) &&
                    (this.countOrdedrStatus == 0 || this.countOrdedrStatus == undefined) && (this.optimumQtyStatus == 0 || this.optimumQtyStatus == undefined) &&
                    (this.upcidStatus == 0 || this.upcidStatus == undefined) && (this.gtinStatus == 0 || this.gtinStatus == undefined) &&
                    (this.compartmentStatus == 0 || this.compartmentStatus == undefined) && (this.itemPriceStatus == 0 || this.itemPriceStatus == undefined) &&
                    (this.chargeCodeStatus == 0 || this.chargeCodeStatus == undefined)) {
                    this.disableFormBtn = false;
                }

                else {
                    this.disableFormBtn = true;
                }
            }
        }
    }


    bindModelDataChange(event: any) {

        if ("txtItemID" == event.TextBoxID.toString()) {
            this.itemIdStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtItemDescr" == event.TextBoxID.toString()) {
            this.itemDescStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Manufacturer" == event.TextBoxID.toString()) {
            this.manufactStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("ManufactureItemID" == event.TextBoxID.toString()) {
            this.manufactItemStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Vendor" == event.TextBoxID.toString()) {
            this.vendorStatus = event.validationrules.filter(x => x.status == false).length;
        }

        if ("CustomItemID" == event.TextBoxID.toString()) {
            this.customItemStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("VendorItemID" == event.TextBoxID.toString()) {
            this.vendorItemStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("CountOrder" == event.TextBoxID.toString()) {
            this.countOrdedrStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("OptimumQuantity" == event.TextBoxID.toString()) {
            this.optimumQtyStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("UOM" == event.TextBoxID.toString()) {
            this.uomStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtIssueUOM" == event.TextBoxID.toString()) {
            this.issueUOM = event.validationrules.filter(x => x.status == false).length;
        }
        if ("CRate" == event.TextBoxID.toString()) {
            this.convRate = event.validationrules.filter(x => x.status == false).length;
        }
        if ("UPCID" == event.TextBoxID.toString()) {
            this.upcidStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("GTIN" == event.TextBoxID.toString()) {
            this.gtinStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("ItemPrice" == event.TextBoxID.toString()) {
            this.itemPriceStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("ChargeCode" == event.TextBoxID.toString()) {
            this.chargeCodeStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Compartment" == event.TextBoxID.toString()) {
            this.compartmentStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if (this.conItem.ISPATIENTCHARGEABLE) {
            if (this.itemIdStatus == 0 && this.itemDescStatus == 0 && this.uomStatus == 0 && this.itemPriceStatus == 0 && this.chargeCodeStatus == 0) {
                if ((this.manufactStatus == 0 || this.manufactStatus == undefined) && (this.manufactItemStatus == 0 || this.manufactItemStatus == undefined) &&
                    (this.vendorStatus == 0 || this.vendorStatus == undefined) && (this.vendorItemStatus == 0 || this.vendorItemStatus == undefined) &&
                    (this.countOrdedrStatus == 0 || this.countOrdedrStatus == undefined) && (this.optimumQtyStatus == 0 || this.optimumQtyStatus == undefined) &&
                    (this.upcidStatus == 0 || this.upcidStatus == undefined) && (this.gtinStatus == 0 || this.gtinStatus == undefined) &&
                    (this.issueUOM == 0 || this.issueUOM == undefined) && (this.convRate == 0 || this.convRate == undefined) &&
                    (this.compartmentStatus == 0 || this.compartmentStatus == undefined)) {
                    this.disableFormBtn = false;
                }

                else {
                    this.disableFormBtn = true;
                }
            }
            else {
                this.disableFormBtn = true;
            }

        }
        else {
            if (this.itemIdStatus == 0 && this.itemDescStatus == 0 && this.uomStatus == 0) {
                if ((this.manufactStatus == 0 || this.manufactStatus == undefined) && (this.manufactItemStatus == 0 || this.manufactItemStatus == undefined) &&
                    (this.vendorStatus == 0 || this.vendorStatus == undefined) && (this.vendorItemStatus == 0 || this.vendorItemStatus == undefined) &&
                    (this.countOrdedrStatus == 0 || this.countOrdedrStatus == undefined) && (this.optimumQtyStatus == 0 || this.optimumQtyStatus == undefined) &&
                    (this.upcidStatus == 0 || this.upcidStatus == undefined) && (this.gtinStatus == 0 || this.gtinStatus == undefined) &&
                    (this.compartmentStatus == 0 || this.compartmentStatus == undefined) && (this.itemPriceStatus == 0 || this.itemPriceStatus == undefined) &&
                    (this.issueUOM == 0 || this.issueUOM == undefined) && (this.convRate == 0 || this.convRate == undefined) &&
                    (this.chargeCodeStatus == 0 || this.chargeCodeStatus == undefined)) {
                    this.disableFormBtn = false;
                }

                else {
                    this.disableFormBtn = true;
                }
            }
            else {
                this.disableFormBtn = true;
            }
        }


    }

    bindModelDataChange1(event: any) {
        if ("LotNum" == event.TextBoxID.toString()) {
            this.lotNumberStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("SerialNum" == event.TextBoxID.toString()) {
            this.serialNumberStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Quantity" == event.TextBoxID.toString()) {
            this.quantityStatus = event.validationrules.filter(x => x.status == false).length;
        }
        this.disableInvSaveButton();

    }

    disableInvSaveButton() {
        this.disableInvBtn = true;
        if (this.enableLotControl && this.enableSerial) {
            if (this.inventoryItem.SERIALNUMBER == '' || this.inventoryItem.LOTNUMBER == '') {
                this.disableInvBtn = true;
                return;
            }

            if (this.enableQuantity) {
                if (this.lotNumberStatus == 0 && this.serialNumberStatus == 0 && this.quantityStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    this.disableInvBtn = false;
                }
            } else {
                if (this.lotNumberStatus == 0 && this.serialNumberStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    this.disableInvBtn = false;
                }
            }

        }
        else if (this.enableLotControl && !this.enableSerial) {
            if (this.inventoryItem.LOTNUMBER == '') {
                this.disableInvBtn = true;
                return;
            }
            if (this.enableQuantity) {
                if (this.lotNumberStatus == 0 && this.quantityStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.serialNumberStatus == 0 || this.serialNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            } else {
                if (this.lotNumberStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.serialNumberStatus == 0 || this.serialNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            }

        }
        else if (!this.enableLotControl && this.enableSerial) {
            if (this.inventoryItem.SERIALNUMBER == '') {
                this.disableInvBtn = true;
                return;
            }
            if (this.enableQuantity) {
                if (this.serialNumberStatus == 0 && this.quantityStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.lotNumberStatus == 0 || this.lotNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            } else {
                if (this.serialNumberStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.lotNumberStatus == 0 || this.lotNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            }
        }
        else {
            if (this.enableQuantity) {
                if (this.quantityStatus == 0 && this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.lotNumberStatus == 0 || this.lotNumberStatus == undefined || this.serialNumberStatus == 0 || this.serialNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            } else {
                if (this.inventoryItem.EXPIRYDATE != '' && this.inventoryItem.EXPIRYDATE != undefined) {
                    if (this.lotNumberStatus == 0 || this.lotNumberStatus == undefined || this.serialNumberStatus == 0 || this.serialNumberStatus == undefined) {
                        this.disableInvBtn = false;
                    }
                }
            }
        }
    }

    selectDate(e) {
        this.disableInvSaveButton();
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    ngOnDestroy() {
        this._deviceTokenEntry = [];
        this.lstDepartmentCarts = [];
        this.lstConsignmentItems = [];
        this.conItem = null;
        this.pazeSize = null;
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
    }
}