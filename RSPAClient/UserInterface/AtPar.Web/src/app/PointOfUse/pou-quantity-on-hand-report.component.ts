import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { StatusType, TokenEntry_Enum, YesNo_Enum, DataSet_Type, BusinessType, LocationType, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message, SelectItem } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_POU_DEPT_CART_ALLOCATIONS } from '../Entities/MT_POU_DEPT_CART_ALLOCATIONS';
import { MT_CRCT_USER_ALLOCATION } from '../Entities/MT_CRCT_USER_ALLOCATION';
import { MT_POU_QTY_ONHAND_ITEM_DETAILS } from '../Entities/MT_POU_QTY_ONHAND_ITEM_DETAILS';
import { MT_POU_QTY_ONHAND_ITEM_HEADERS } from '../Entities/MT_POU_QTY_ONHAND_ITEM_HEADERS';
import { VM_CART_DETAILS } from '../Entities/VM_CART_DETAILS';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { Menus } from '../AtPar/Menus/routepath';
import { PouQuantityOnHandReportService } from './pou-quantity-on-hand-report.service';
import { asEnumerable } from 'linq-es5';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';

declare var module: {
    id: string;
}
@Component({

    templateUrl: 'pou-quantity-on-hand-report.component.html',
    providers: [AtParCommonService, AtParConstants, PouQuantityOnHandReportService]
})

export class QuanityOnHandReportComponent implements OnInit {

    /*Variable declaration*/
    selectedBunit: string = '';
    isVisibleLblResult: boolean = false;
    breadCrumbMenu: Menus;
    growlMessage: Message[] = [];
    deviceTokenEntry: string[] = [];
    bunitsData: MT_POU_DEPT_CART_ALLOCATIONS[] = [];
    PalocationData: any[] = [];
    lstBunits: SelectItem[] = [];
    lstParLocation: SelectItem[] = [];
    lstVendorData: PAR_MNGT_VENDOR[];
    ddlVendorData: SelectItem[];
    lstFilteredVendorIds: PAR_MNGT_VENDOR[] = [];
    lstFilteredItemIds: any[] = [];
    lstDeptuserItems: MT_POU_QTY_ONHAND_ITEM_HEADERS[] = [];
    lstQtyOnHandHeaders: MT_POU_QTY_ONHAND_ITEM_HEADERS[] = [];
    lstQtyOnHandDetails: MT_POU_QTY_ONHAND_ITEM_DETAILS[] = [];
    lstDetails: MT_POU_QTY_ONHAND_ITEM_DETAILS[] = [];
    lstFilterData: MT_POU_QTY_ONHAND_ITEM_HEADERS[] = [];
    lstvendorIds: any = [];
    noOfRecords: number = 0;
    NoOfRecords: any;
    statusCode: number = -1;
    appId: number;
    strUserId: string = '';
    blnShowVendorlabel: boolean = false;
    blnShowTxtVendor: boolean = false;
    isVisibleNoOfRecords: boolean = false;
    isVisiblelinkBtn: boolean = true;
    isVisible: boolean = false;
    blnsortbycolumn: boolean = false;
    checkBoxValue: boolean = false;
    lblVendorData: string = '';
    selectedvendorId: string = '';
    selectedItemId: string = '';
    selectedSerialNo: string = '';
    selectedLotNo: string = '';
    selectedParLoc: string = '';
    lastDbData: any[] = [];
    rowsPerPage: number;
    lblResult: any = '';


    /**
   * Constructor
   * @param PouQuantityOnHandReportService
   * @param AtParCommonService
   * @param httpService
   * @param spinnerService
   * @param AtParConstants
   */
    constructor(
        private leftBarAnimateService: LeftBarAnimationService,
        private httpService: HttpService,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private pouQuantityOnHandReportService: PouQuantityOnHandReportService,
        private router: Router,
        private route: ActivatedRoute
    ) {

        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new Menus();

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        this.spinnerService.stop();
    }

     /**
    * Init Function for Populate Bunits to the dropdown  and get vendors,get MyPreferences when page loading.
    */
    async  ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.strUserId = this.deviceTokenEntry[TokenEntry_Enum.UserID];
        this.appId = this.deviceTokenEntry[TokenEntry_Enum.AppName] == 'PointOfUse' ? EnumApps.PointOfUse : EnumApps.Pharmacy;
        try {
            this.spinnerService.start();
            this.statusCode = -1;
            this.statusCode = await this.getMyPreferences();
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                return;
            }

            await this.bindVendors();
          
            this.lstParLocation.push({ label: "Select Loc", value: '' })
            await this.getUserDepartmentsItems();         
            this.lstBunits.push({ label: 'Select BU', value: '' })            
            await this.populateBussinessUnits();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async BindChargeCaptureGrid() {
        this.growlMessage = [];
        let _vendIntPos: any = '';
        let strVendorId: string = '';
        let strItemId: string = '';
        let _blnDisplayNegQoH: boolean = false;
        let _dblOnHandValue = 0;
        this.lblResult = '';
        let _cartId: string = '';

        try {
            if (this.blnShowVendorlabel == true) {
                _vendIntPos = this.lblVendorData.split(" - ")[0];
                if (_vendIntPos != null && _vendIntPos != undefined && _vendIntPos != '') {
                    strVendorId = _vendIntPos;
                }
                else {

                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                    this.isVisible = false;
                    this.isVisibleNoOfRecords = false;
                    this.isVisibleLblResult = false;
                    return;
                }
            }
            else {
                _vendIntPos = this.selectedvendorId.split(" - ")[0];
                if (_vendIntPos != null && _vendIntPos != undefined && _vendIntPos != '') {
                    strVendorId = _vendIntPos;
                }
            }

            if (this.selectedItemId != null && this.selectedItemId != '') {
                strItemId = this.selectedItemId.split(" - ")[0];
            }


            _blnDisplayNegQoH = this.checkBoxValue == true ? true : false;

            this.spinnerService.start();
            await this.pouQuantityOnHandReportService.getQtyOnHandReportData(this.selectedBunit, this.selectedParLoc, strItemId, strVendorId, this.strUserId, this.selectedSerialNo, _blnDisplayNegQoH, this.selectedLotNo, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.appId).
                catch(this.httpService.handleError).
                then((res: Response) => {
                    let data = res.json();
                    this.statusCode = data.StatusCode
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {

                        if (data.DataDictionary["pQtyOnHandReportDS"] != null) {

                            this.lstQtyOnHandHeaders = data.DataDictionary["pQtyOnHandReportDS"]["ITEMS_HEADER"];
                            this.lstQtyOnHandDetails = data.DataDictionary["pQtyOnHandReportDS"]["ITEMS_DETAILS"];

                           
                            if (this.lstQtyOnHandHeaders.length > 0 && this.lstQtyOnHandDetails.length > 0) {

                                this.isVisible = true;
                                this.isVisibleNoOfRecords = true;
                                this.isVisibleLblResult = true;
                                this.NoOfRecords = this.lstQtyOnHandHeaders.length;
                                this.lstQtyOnHandHeaders.forEach(detail => {

                                    detail.ON_HAND_VALUE = parseFloat(detail.ON_HAND_VALUE).toFixed(2);
                                    detail.ITEM_PRICE = (parseFloat(detail.ITEM_PRICE).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    detail.PAR_VALUE = parseFloat(detail.PAR_VALUE).toFixed(2);                                    
                                    detail.ITEM_QUANTITY_PAR = (parseFloat(detail.ITEM_QUANTITY_PAR).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    detail.ACTUAL_QUANTITY = (parseFloat(detail.ACTUAL_QUANTITY).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   
                                });
                                this.lstQtyOnHandDetails.forEach(detail => {
                                    detail.ACTUAL_QUANTITY = (parseFloat(detail.ACTUAL_QUANTITY).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                });

                                this.lstQtyOnHandHeaders.forEach(header => {
                                    let details: MT_POU_QTY_ONHAND_ITEM_DETAILS[] = [];

                                    details = this.lstQtyOnHandDetails.filter(detail =>
                                        (detail.REPORT_KEY == header.REPORT_KEY && detail.BUSINESS_UNIT == header.BUSINESS_UNIT && detail.CART_ID == header.CART_ID));
                                    details.forEach(y => {
                                        y.TODAY_USAGE = parseFloat(header.TODAY_USAGE).toFixed(2);
                                    });

                                    header.DETAILS = details;
                                });
                                for (let i = 0; i <= this.lstQtyOnHandHeaders.length - 1; i++) {
                                    _dblOnHandValue = _dblOnHandValue + parseFloat(this.lstQtyOnHandHeaders[i].ON_HAND_VALUE);
                                }
                                this.lblResult = _dblOnHandValue.toFixed(2);

                                if (this.noOfRecords == 0) {
                                    this.rowsPerPage = this.lstQtyOnHandHeaders.length;
                                }
                                else {
                                    this.rowsPerPage = this.noOfRecords;
                                }
                                if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID] == "VENDOR") {
                                    this.isVisiblelinkBtn = false;
                                }
                            }

                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                                this.isVisible = false;
                                this.isVisibleNoOfRecords = false;
                                this.isVisibleLblResult = false;
                                return;
                            }

                        }
                        else {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                            this.isVisible = false;
                            this.isVisibleNoOfRecords = false;
                            this.isVisibleLblResult = false;
                            return;

                        }
                    }
                    else if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                        this.isVisible = false;
                        this.isVisibleNoOfRecords = false;
                        this.isVisibleLblResult = false;
                        return;
                    }
                    else {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Failed to get Data" });
                        return;
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }


    async onChargesFilterData(data) {
        try {
            this.lstFilterData = data;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }


    async getUserDepartmentsItems() {
        this.growlMessage = [];
        try {
            await this.pouQuantityOnHandReportService.getUserDepartmentsItems(this.strUserId, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], false, this.appId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.statusCode = data.StatusCode;
                    this.lstDeptuserItems = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataDictionary != null) {
                                this.lstDeptuserItems = data.DataDictionary["pUserDeptItemsDS"]["DEPARTMENT_CART_ITEMS"];
                                
                            }
                            break;
                        }
                        case StatusType.Warn: {                                                      
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {                            
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {                                               
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async getMyPreferences() {
        try {
            this.growlMessage = [];
            await this.commonService.getMyPreferences('RECORDS_PER_PAGE', this.deviceTokenEntry)
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.noOfRecords = parseInt(data.DataVariable.toString());
                    }
                });
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return AtparStatusCodes.E_SERVERERROR;
            }
        } catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }
        return AtparStatusCodes.ATPAR_OK;
    }

    async populateBussinessUnits() {
        let strBusinessUnit: string = '';
        this.growlMessage = [];
        try {
            await this.pouQuantityOnHandReportService.getBUnits_Carts(this.strUserId, this.appId, '', '').
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS>;

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.bunitsData = data.DataList;
                            this.lstBunits = [];
                            this.lstBunits.push({ label: 'Select BU', value: '' })
                            for (var i = 0; i <= this.bunitsData.length - 1; i++) {
                                if (strBusinessUnit != this.bunitsData[i].BUSINESS_UNIT) {
                                    this.lstBunits.push({ label: this.bunitsData[i].BUSINESS_UNIT, value: this.bunitsData[i].BUSINESS_UNIT });
                                }
                                strBusinessUnit = this.bunitsData[i].BUSINESS_UNIT;
                            }
                            break;

                        }
                        case StatusType.Warn: {                                                 
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Department/ Carts allocated to the user" });
                            break;
                        }
                        case StatusType.Error: {                            
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {                           
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: "Error while getting User Departments" });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async bindVendors() {
        try {
            this.growlMessage = [];
            await this.pouQuantityOnHandReportService.getVendorsInfo(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<PAR_MNGT_VENDOR>;
                this.growlMessage = [];
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.lstVendorData = data.DataList;

                        if (this.lstVendorData.length >= 1) {
                            if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID] == 'VENDOR') {
                                this.blnShowVendorlabel = true;
                                this.blnShowTxtVendor = false;
                                var drSearch: PAR_MNGT_VENDOR[] = asEnumerable(this.lstVendorData).Where(x => x.VEND_USER_ID == this.deviceTokenEntry[TokenEntry_Enum.UserID]).ToArray();

                                if (drSearch.length > 0) {
                                    this.lblVendorData = drSearch[0].VENDOR_ID + " - " + drSearch[0].VENDOR_NAME;
                                }
                            }
                            else {
                                this.blnShowVendorlabel = false;
                                this.blnShowTxtVendor = true;
                            }
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    /**
    * This method is calling when user enter any value in vendor AutoSearchBox 
    */
    async  fillVendorIdsAuto(event) {
        this.growlMessage = [];
        this.lstFilteredVendorIds = [];
        let query = event.query;

        try {

            this.lstFilteredVendorIds = this.filterVendorIds(query, this.lstVendorData);


        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
     * This method is used for filtering vendors   
     */
    filterVendorIds(query, VendorIds: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < VendorIds.length; i++) {
                let VendorIdValue = VendorIds[i].VENDOR_ID + " - " + VendorIds[i].VENDOR_NAME;
                filtered.push(VendorIdValue);
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < VendorIds.length; i++) {
                    let VendorIdValue = VendorIds[i].VENDOR_ID + " - " + VendorIds[i].VENDOR_NAME;
                    if (VendorIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(VendorIdValue);
                    }
                }
            }
        }


        return filtered;
    }

    /**
     * This method is used for filtering itemids   
     */
    filterItemIds(query, ItemIds: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < ItemIds.length; i++) {

                let ItemIdValue = ItemIds[i].ITEM_ID + " - " + ItemIds[i].ITEM_DESCRIPTION;

                if (filtered != null && filtered != undefined && filtered.length > 0) {

                    var result = filtered.filter(x => x == ItemIdValue)


                    if (result.length <= 0) {

                        filtered.push(ItemIdValue);
                    }
                   
                }
                else {
                    filtered.push(ItemIdValue);
                }
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < ItemIds.length; i++) {
                    let ItemIdValue = ItemIds[i].ITEM_ID + " - " + ItemIds[i].ITEM_DESCRIPTION;

                    if (filtered != null && filtered != undefined && filtered.length > 0) {

                        var result = filtered.filter(x => x == ItemIdValue)


                        if (result.length <= 0) {
                            if (ItemIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                                filtered.push(ItemIdValue);
                            }
                        }
                        
                    }
                    else {
                        if (ItemIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(ItemIdValue);
                        }
                    }                   
                }
            }
        }


        return filtered;
    }

    /**
    * This method is calling when user enter any value in itemid AutoSearchBox 
    */
    async  fillItemIdsAuto(event) {
        this.growlMessage = [];      
        let query = event.query;

        try {

            this.lstFilteredItemIds = this.filterItemIds(query, this.lstDeptuserItems);


        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
    * This method is calling when user change Bunit dropdown
    */

    async  ddlBUnitChanged() {
        this.spinnerService.start();
        this.growlMessage = [];
        let strBunit: string = '';
        let strCartId: string = '';

        if (this.selectedBunit == '' || this.selectedBunit == 'Select BU') {
            this.selectedParLoc = '';
            this.lstParLocation = [];
            this.lstParLocation.push({ label: "Select Loc", value: '' });
            this.spinnerService.stop();
            return;
        }

        try {

            await this.pouQuantityOnHandReportService.getBUnits_Carts(this.strUserId, this.appId, LocationType.P, '').
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS>;

                    switch (data.StatType) {
                        case StatusType.Success: {
                            strBunit = this.selectedBunit;
                            this.PalocationData = data.DataList;
                            this.lstParLocation = [];
                            this.lstParLocation.push({ label: "Select Loc", value: '' })
                            for (var i = 0; i <= this.PalocationData.length - 1; i++) {
                                if (this.PalocationData[i].BUSINESS_UNIT == strBunit && this.PalocationData[i].CART_ID != strCartId) {
                                    this.lstParLocation.push({ label: this.PalocationData[i].CART_ID, value: this.PalocationData[i].CART_ID })
                                }
                                strCartId = this.PalocationData[0].CART_ID;
                            }
                            break;

                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Department/ Carts allocated to the user" });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: "Error while getting User Departments" });
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

    /**
    * This method is calling when user click on Go button
    **/
    async  btnGo_Click() {
        this.spinnerService.start();
        try {
            await this.BindChargeCaptureGrid();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
    * This method is calling when user click on itemid in the datatable and after clicking navigating to pointOfuse Item Usage Report screen
    */
    async onItemIDClick(item: MT_POU_QTY_ONHAND_ITEM_HEADERS) {
        try {               
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "appId": EnumApps.PointOfUse,
                    "mode": 'Go',
                    "bunit": item.BUSINESS_UNIT,
                    "cartId": item.CART_ID,
                    "itemId": item.ITEM_ID,                   
                    "Screen": 'Transaction History'
                }
            };

            this.breadCrumbMenu.MENU_NAME = "Item Usage Report";
            this.breadCrumbMenu.ROUTE = 'pointofuse/itemusagereport';
            this.breadCrumbMenu.SUB_MENU_NAME = '';          
            this.breadCrumbMenu.GROUP_NAME = 'Reports & Dashboards';
            this.breadCrumbMenu.APP_NAME = 'Point Of Use';       
            this.breadCrumbMenu.IS_DIV = false;
            localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));     
        
            var menuItems = JSON.parse(localStorage.getItem('MenuList'));
            for (var i = 0; i < menuItems.length; i++) {
                if ((menuItems[i] as Menus).ROUTE == 'pointofuse/itemusagereport') {
                    await this.leftBarAnimateService.emitChangeReportaActiveMenu((menuItems[i] as Menus).MENU_NAME.trim());
                    break;
                }
            }                  
            await this.router.navigate(['atpar/pointofuse/itemusagereport'], navigationExtras);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }


    /**
    * This method is used for change date format to mm/dd/yyyy
    */
    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    /**
   * This method is used for adding days
   */
    async addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    clientErrorMsg(ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    }

     /**
    * This method is for clearing all the variables
    */
    OnDestroy() {
        this.lstBunits = null;
        this.lstDeptuserItems = null;
        this.lstFilteredItemIds = null;
        this.lblVendorData = null;
        this.lstFilteredVendorIds = null;
        this.lstParLocation = null;
        this.PalocationData = null;
        this.lstQtyOnHandHeaders = null;
        this.lstQtyOnHandDetails = null;
    }

}