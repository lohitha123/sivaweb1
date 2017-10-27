
import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { MT_POU_DEPT_USER_ALLOCATIONS } from '../Entities/MT_POU_DEPT_USER_ALLOCATIONS';
import { MT_CRCT_USER_ALLOCATION } from '../Entities/MT_CRCT_USER_ALLOCATION';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Menus } from '../AtPar/Menus/routepath';
import { PouTransactionHistoryReportService } from './pou-transaction-history-report.service';
import { MT_POU_DEPT_CART_ALLOCATIONS } from '../../app/Entities/MT_POU_DEPT_CART_ALLOCATIONS';
import { MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS } from '../../app/Entities/MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS';
import { MT_POU_TRANSACTION_HISTORY_HEADERS } from '../Entities/MT_POU_TRANSACTION_HISTORY_HEADERS';
import { MT_POU_TRANSACTION_HISTORY_DETAILS } from '../Entities/MT_POU_TRANSACTION_HISTORY_DETAILS';
import { MT_POU_QTY_ONHAND_ITEM_HEADERS } from '../Entities/MT_POU_QTY_ONHAND_ITEM_HEADERS';
import { saveAs } from 'file-saver';


declare var module: {
    id: string;
}
@Component({

    templateUrl: 'pou-transaction-history-report.component.html',
    providers: [AtParCommonService, AtParConstants, PouTransactionHistoryReportService]
})

export class TransactionHistoryReportComponent implements OnInit {
    /*Varaible Declaration*/

    bunit: any;
    isVisible: boolean = false;
    selectedPercentage: string = "";
    gEditParUserParamval: string = "";
    strOrgGrpId: string = "";
    orgGroupIDForDBUpdate: string = "";
    selectedOrgGroupId: string = "";
    orgGrpId: string = "";
    selectedCartId: string = "";
    selectedBunit: string = "";
    gstrProtocal: string = "";
    selectedItemId: string = "";
    gstrServerName; string = "";
    orgGrpIDData: string = "";
    gstrPortNo: string = "";
    strParQty: string = "";
    strPrice: string = "";
    ipAddress: string = "";
    toMailAddr: string = '';
    selectedDeptId: string = "";
    strUserId: string = "";
    cartIdValue: string = "";
    noOfRecords: number = 0;
    lblNoofRecords: number;
    recordsPerPage: number = 0;
    statusCode: number = -1;
    statusCode1: number = -1;
    defDateRange: number = 0;
    startIndex: number;
    EndIndex: number;
    strPrevCartID: string = "";
    page: boolean = true;
    isMailDialog: boolean = false;
    tdExports: boolean = false;
    blnsortbycolumn: boolean = false;
    showGrid: boolean = false;
    isVisibleChkBox: boolean = false;
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupsDropdown: boolean = false;
    checkBoxValue: boolean = false;
    breadCrumbMenu: Menus;
    fromDate: Date;
    toDate: Date;
    currentDate: Date;
    _fromDate: Date;
    _toDate: Date;
    bunitsData: any[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    lstOrgGroups: SelectItem[] = [];
    lstBUnits: any = [];
    lstFilteredBUnits: any = [];
    lstFilteredCartIds: MT_POU_DEPT_CART_ALLOCATIONS[] = [];
    lstCartIds: MT_POU_DEPT_CART_ALLOCATIONS[] = [];
    deviceTokenEntry: string[] = [];    
    growlMessage: Message[] = [];
    lstDeptuserItems: MT_POU_QTY_ONHAND_ITEM_HEADERS[] = [];
    lstTransHistoryHeaders: MT_POU_TRANSACTION_HISTORY_HEADERS[] = []
    lstTransHistoryDetails: MT_POU_TRANSACTION_HISTORY_DETAILS[] = [];
    rowsPerPage: number;
    lstFilteredItemIds: any[] = [];
    appId = EnumApps.PointOfUse;    

    /**
    * Constructor
    * @param ParOptimizationReportService
    * @param AtParCommonService
    * @param httpService
    * @param spinnerService
    * @param AtParConstants
    */
    constructor(
        private httpService: HttpService,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private pouTransactionHistoryReportService: PouTransactionHistoryReportService
    ) {

        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new Menus();

        } catch (ex) {
            this.clientErrorMsg(ex, 'constructor');
        }
        this.spinnerService.stop();
    }

    /**
    * Init Function for Populate Bunits to the dropdown when page loading and getMyPreferences.
    */
    async  ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.strUserId = this.deviceTokenEntry[TokenEntry_Enum.UserID];       

        try {
            this.spinnerService.start();
            this.statusCode = -1;
            this.statusCode = await this.getMyPreferences();
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                return;
            }

            await this.bindOrgGroups();
            this.currentDate = new Date();
            this.toDate = new Date();
            this.fromDate = new Date();
            if (this.defDateRange.toString() != '' && this.defDateRange != null) {
                this.fromDate = await this.addDays(this.fromDate, -this.defDateRange);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'OnInit');
        }
        finally {
            this.spinnerService.stop();
        }

    }

    async bindOrgGroups() {

        try {
            await this.commonService.getUserOrgGroups(this.strUserId, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpIDData = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID;
                                this.populateBussinessUnits();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupsDropdown = true;
                                this.lstFilteredBUnits = [];
                                this.isVisible = false;
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });

                                this.lstOrgGroups = [];
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
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
            this.clientErrorMsg(ex, 'bindOrgGroups');
        }
    }

    /**
    * This method is calling when user selecting  Ogrgrpid in  OrgGrpid dropdown and populate bunits for selecting OrggrpId
    */
    async ddlOrgGrpIdChanged() {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            this.isVisible = false;
            this.tdExports = false;
            this.selectedBunit = "";
            this.selectedCartId = "";
            if (this.selectedOrgGroupId == "Select One") {
                this.lstFilteredBUnits = [];
                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                this.spinnerService.stop();
                return;
            }
            await this.populateBussinessUnits();
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'ddlOrgGrpIdChanged');
        }
        finally {
            this.spinnerService.stop();
        }
    }


    /**
    * This method is calling when user selecting  Bunit in  Bunit dropdown
    */
    async  ddlBUnitChanged() {
       
        this.growlMessage = [];
        this.selectedCartId = "";
        this.selectedItemId = "";
        this.isVisible = false;
        this.tdExports = false;
        if (this.lstFilteredBUnits.length > 1 && (this.selectedBunit == "Select BUnit" || this.selectedBunit == "")) {
            this.lstCartIds = null;
            this.lstDeptuserItems = null;
            this.isVisible = false;
            this.tdExports = false;
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });           
            return;
        }

        if (this.selectedBunit == "" || this.selectedBunit == "Select BUnit")
        {            
            return;
        }
        try {
            this.spinnerService.start();
            await this.GetDeptAllocCarts();
          
        }   

        catch (ex) {
            this.clientErrorMsg(ex, 'ddlBUnitChanged');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async GetDeptAllocCarts() {
        let strBunit: string = "";

        try {
            await this.pouTransactionHistoryReportService.GetDeptAllocCarts(this.selectedBunit, "", 1, LocationType.P.toString(), this.appId, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS>;
                 
                    switch (data.StatType) {
                        case StatusType.Success: {
                            strBunit = this.selectedBunit;

                            if (data.DataList.length > 0) {

                                this.lstCartIds = data.DataList;
                                this.getUserDepartmentsItems();
                            }                            
                            break;
                        }
                        case StatusType.Warn: {
                            this.lstCartIds = null;
                            this.lstDeptuserItems = null;
                            this.isVisible = false;
                            this.tdExports = false;     
                            this.spinnerService.stop();                    
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Par Locations(s) are not allocated to the Department" });
                            break;
                        }
                        case StatusType.Error: { 
                            this.spinnerService.stop();                          
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: "Failed to get Business Units / Par Location" });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'GetDeptAllocCarts');
        }
    }

    async getUserDepartmentsItems() {
        this.growlMessage = [];
        try {
            await this.pouTransactionHistoryReportService.getUserDepartmentsItems(this.strUserId, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], false, this.appId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.statusCode = data.StatusCode;
                    this.spinnerService.stop();
                    this.lstDeptuserItems = [];
                    switch (data.StatType) {
                        case StatusType.Success: {         
                            if (data.DataDictionary != null) {                                
                                this.lstDeptuserItems = data.DataDictionary["pUserDeptItemsDS"]["DEPARTMENT_CART_ITEMS"];                               
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.isVisible = false;
                            this.tdExports = false;                              
                            //this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
            this.clientErrorMsg(ex, 'getUserDepartmentsItems');
        }

    }

    /**
    * This method is calling when user enter any value in itemid AutoSearchBox 
    */
    async  fillItemIdsAuto(event) {
        this.growlMessage = [];
        let query = event.query;

        try {
            if (this.lstDeptuserItems!=null)
            {
                this.lstFilteredItemIds = this.filterItemIds(query, this.lstDeptuserItems);
            }         
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'fillItemIdsAuto');
        }       
    }

    /**
     * This method is used for filtering itemids   
     */
    filterItemIds(query, ItemIds: any[]): any[] {

        let filtered : any[] = [];
        let strtCartId: string = this.selectedCartId.split(" - ")[0];

        if (query == "%") {
            for (let i = 0; i < ItemIds.length; i++) {
                let ItemIdValue = ItemIds[i].ITEM_ID + " - " + ItemIds[i].ITEM_DESCRIPTION;
                let cartID = ItemIds[i].CART_ID;
                if (filtered != null && filtered != undefined && filtered.length > 0) {

                    var result = filtered.filter(x => x == ItemIdValue)

                    if (result.length <= 0) {
                        if (cartID == strtCartId) {
                            filtered.push(ItemIdValue);
                        }
                    }

                }
                else {

                    if (cartID == strtCartId) {
                        filtered.push(ItemIdValue);
                    }
                }
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < ItemIds.length; i++) {

                    let ItemIdValue = ItemIds[i].ITEM_ID + " - " + ItemIds[i].ITEM_DESCRIPTION;
                    let cartID = ItemIds[i].CART_ID;

                    if (filtered != null && filtered != undefined && filtered.length > 0) {
                        var result = filtered.filter(x => x == ItemIdValue)
                        if (result.length <= 0) {
                            if ((ItemIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) && cartID == strtCartId) {
                                filtered.push(ItemIdValue);
                            }
                        }
                    }
                    else {
                        if ((ItemIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) && cartID == strtCartId) {
                            filtered.push(ItemIdValue);
                        }
                    }
                }
            }
        }

        return filtered;
    }


    /**
    * This method is calling when user enter any value in cartid AutoSearchBox 
    */
    async  fillCartIdsAuto(event) {

        this.growlMessage = [];
        let query = event.query;

        try {
            if (this.lstCartIds!=null)
            {
                this.lstFilteredCartIds = this.filterCartIds(query, this.lstCartIds);
            }
            
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'fillItemIdsAuto');
        }
        
    }

    /**
     * This method is used for filtering cartids   
     */
    filterCartIds(query, CartIds: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < CartIds.length; i++) {
                let CartIdValue = CartIds[i].LOCATION + " - " + CartIds[i].LOCATION_DESCR;
                filtered.push(CartIdValue);
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < CartIds.length; i++) {
                    let CartIdValue = CartIds[i].LOCATION + " - " + CartIds[i].LOCATION_DESCR;
                    if (CartIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(CartIdValue);
                    }
                }
            }
        }


        return filtered;
    }

    /**
    * This method is used for validating fields
    */
    validateSearchFields() {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                    return false;
                }    
               
                if ((this.blnShowOrgGroupsDropdown == true) && (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "")) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select valid Org Group ID" });
                    return false;
                }
                if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "" || this.selectedBunit == 'Select Bunit')
                    && (this.blnShowOrgGroupLabel == true)) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                        return false;
                    }
                if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "" || this.selectedBunit == 'Select Bunit')
                    && (this.blnShowOrgGroupsDropdown == true)) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                        return false;
                    }
              
                if ((this.selectedCartId == null || this.selectedCartId == undefined || this.selectedCartId == "") &&
                    (this.selectedItemId == null || this.selectedItemId == undefined || this.selectedItemId == "")) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Par Location or Item ID is mandatory" });
               
                    return false;
                }
                if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "")) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "BUnit is mandatory" });
                    return false;
                }
                
            }
           
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex, 'validateSearchFields');
            return false;
        }
    }

    /**
    * This method is calling when click on Go button    
    */

    async  btnGo_Click() {
        try {
            this.growlMessage = [];
            let returnValue: boolean = false;
            returnValue = await this.validateSearchFields();

            if (returnValue) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                await this.bindDataGrid();
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, '');

        }
        finally {
            this.spinnerService.stop();
        }

    }

    async  bindDataGrid() {
        let strBUnit: string = "";
        let orgGrpId: string = "";
        let strItemId: string = '';
        let strtCartId: string = "";
        let _blnDisplayNegQoH: boolean = false;
        let cartIds: MT_POU_DEPT_CART_ALLOCATIONS[] = [];
        let fromDate: string = await this.convertDateFormate(this.fromDate);
        let toDate: string = await this.convertDateFormate(this.toDate);

        strBUnit = (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") ? "All" : this.selectedBunit;
        if (this.lstFilteredBUnits.length <= 1) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No assigned org business units" });
            this.spinnerService.stop();
            return;

        }

        if (this.blnShowOrgGroupLabel == true) {
            orgGrpId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
        }
        else {
            orgGrpId = this.selectedOrgGroupId;
        }
        if (this.selectedItemId != null && this.selectedItemId != "") {
            strItemId = this.selectedItemId.split(" - ")[0];
        }
        if (this.selectedCartId != null && this.selectedCartId != "") {
            strtCartId = this.selectedCartId.split(" - ")[0];
        }        

        _blnDisplayNegQoH = this.checkBoxValue == true ? true : false;
        this.spinnerService.start();
        await this.pouTransactionHistoryReportService.getInventoryTrackHistoryReport(fromDate, toDate, strBUnit, strtCartId.toUpperCase(), strItemId, orgGrpId, _blnDisplayNegQoH, this.appId).catch(this.httpService.handleError).
            then((res: Response) => {
                let data = res.json()  as AtParWebApiResponse<string>;
                this.growlMessage = [];
                this.statusCode = data.StatusCode;
                this.spinnerService.stop();    
                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {

                    if (data.DataDictionary["pTransDS"] != null) {

                        this.lstTransHistoryHeaders = data.DataDictionary["pTransDS"]["Headers"];
                        this.lstTransHistoryDetails = data.DataDictionary["pTransDS"]["Details"];

                        if (this.lstTransHistoryHeaders.length > 0 && this.lstTransHistoryDetails.length > 0) {
                            this.isVisible = true;
                            this.tdExports = true;
                            this.lstTransHistoryDetails.forEach(x => {
                                x.DATE = this.convertDateFormate(x.UPDATE_DATE);
                                x.TIME = this.convertTimeFormat(x.UPDATE_DATE);
                            })

                            this.lstTransHistoryDetails.forEach(detail => {
                                if ((detail.ISSUE_UOM == null) || (detail.ISSUE_UOM == "NAN")) {
                                    detail.ISSUE_UOM = "";
                                }


                                if (detail.QTY_ISSUED == null) {
                                    detail.QTY_ISSUED = 0;
                                    detail.QTY_ISSUED = parseFloat(detail.QTY_ISSUED).toFixed(2);
                                }
                                else {
                                    detail.QTY_ISSUED = parseFloat(detail.QTY_ISSUED).toFixed(2);
                                }
                                if (detail.QTY_RETPUTAWAY == null) {
                                    detail.QTY_RETPUTAWAY = 0;
                                    detail.QTY_RETPUTAWAY = parseFloat(detail.QTY_RETPUTAWAY).toFixed(2);
                                }
                                else {
                                    detail.QTY_RETPUTAWAY = parseFloat(detail.QTY_RETPUTAWAY).toFixed(2);
                                }
                                if (detail.QTY_ADJUSTED == null) {
                                    detail.QTY_ADJUSTED = 0;
                                    detail.QTY_ADJUSTED = parseFloat(detail.QTY_ADJUSTED).toFixed(2);
                                }
                                else {
                                    detail.QTY_ADJUSTED = parseFloat(detail.QTY_ADJUSTED).toFixed(2);
                                }

                                if (detail.ON_HAND_QTY == null) {
                                    detail.ON_HAND_QTY = 0;
                                    detail.ON_HAND_QTY = parseFloat(detail.ON_HAND_QTY).toFixed(2);
                                }
                                else {
                                    detail.ON_HAND_QTY = parseFloat(detail.ON_HAND_QTY).toFixed(2);
                                }

                            });

                            this.lstTransHistoryHeaders.forEach(header => {
                                let details: MT_POU_TRANSACTION_HISTORY_DETAILS[] = [];

                                details = this.lstTransHistoryDetails.filter(detail =>
                                    (detail.CART_ID == header.CART_ID && detail.ITEM_ID == header.ITEM_ID && detail.COMPARTMENT == header.COMPARTMENT));
                                header.DETAILS = details;                                
                            });
                           

                            for (let i = 0; i <= this.lstTransHistoryHeaders.length - 1; i++) {
                                this.lstTransHistoryHeaders[i].QOH = parseFloat(this.lstTransHistoryHeaders[i].QOH).toFixed(2);
                                this.lstTransHistoryHeaders[i].ITEM_ID = this.lstTransHistoryHeaders[i].ITEM_ID + " - " + this.lstTransHistoryHeaders[i].ITEM_DESCR;
                                cartIds = this.lstCartIds.filter(x => x.LOCATION == this.lstTransHistoryHeaders[i].CART_ID);
                                this.lstTransHistoryHeaders[i].CART_ID = cartIds[0].LOCATION + " - " + cartIds[0].LOCATION_DESCR;

                            }
                          
                            if (this.noOfRecords == 0) {
                                this.rowsPerPage = this.lstTransHistoryHeaders.length;
                            }
                            else {
                                this.rowsPerPage = this.noOfRecords;
                            }
                        }
                        else {

                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                            this.isVisible = false;
                            this.tdExports = false;
                            return;
                        }
                    }
                }
                else if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                    this.isVisible = false;
                    this.tdExports = false;
                    return;
                }
                else {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Internal Server Error" });
                    this.isVisible = false;
                    this.tdExports = false;
                    return;
                }

            });
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
    * This method is used for change time format to HH:MM(Hours:Minuts)
    */
    convertTimeFormat(strDate) {
        var date = new Date(strDate),
            hours = date.getHours(),
            minuts = date.getMinutes();
        return [hours, minuts].join(":");
    }
   

    async populateBussinessUnits() {
        this.growlMessage = [];
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }

        this.lstFilteredBUnits = [];
        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });

        try {

            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    if (data.StatusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                        this.isVisible = false;
                        return;
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            let lstFilteredBUnitsTest = data.DataList;
                            if (lstFilteredBUnitsTest != null) {
                                if (lstFilteredBUnitsTest.length > 0) {
                                    for (var i = 0; i < lstFilteredBUnitsTest.length; i++) {
                                        this.lstFilteredBUnits.push({ label: lstFilteredBUnitsTest[i], value: lstFilteredBUnitsTest[i] })
                                    }
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'populateBussinessUnits');
        }
    }

    /**
    * This method is used for adding days
    */
    async addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    async getMyPreferences() {
        try {
            try {
                await this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry)
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<number>;
                        this.statusCode = data.StatusCode;
                        if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                            this.defDateRange = parseInt(data.DataVariable.toString());
                        }
                    });
                if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                    return AtparStatusCodes.E_SERVERERROR;
                }

            } catch (ex) {
                return AtparStatusCodes.E_SERVERERROR;
            }
            try {
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

        } catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }
        return AtparStatusCodes.ATPAR_OK;
    }

    /**
     * This method is calling when user click on Mail Icon 
     * @param event
     */
    async onSendMailIconClick(event) {
        try {
            this.growlMessage = [];
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailIconClick');
        }
    }

    /**
     * This method is calling when user userclick on submit button after enter mailid
     * @param event
     */
    async onSendMailClick(event) {
        try {
            this.growlMessage = [];
            if (this.toMailAddr == '' || this.toMailAddr == undefined) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Email Address to Send' });
                return;
            }
            var val = this.validateEmail(this.toMailAddr);
            if (!val) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Email Address to Send' });
                return;
            }
            this.spinnerService.start();
            this.isMailDialog = false;
            let html: string = await this.ExportReportDetails('Mail');
            let toAddr: string = '';

            if (html != '' && html != null) {
                await this.commonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Pou Transaction History Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<number>;
                        this.statusCode = data.StatusCode;
                    });

                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_BODY) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SEND_FAILED) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                }
                else {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                }
            }

            this.toMailAddr = '';

        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailClick');
        }
        finally {

            this.spinnerService.stop();
        }
    }

     /**
     * This method is used for validating Email
     * @param event
     */
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
     * This method is calling when user click on print Icon
     * @param event
     */
    async onPrintClick(event) {
        try {
            this.growlMessage = [];
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.ExportReportDetails('Print');
            if (html != '' && html != null) {

                var mywindow = window.open('', null, 'height=600,width=600,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'PointOfUse - Transaction History Report' + '</title>');
                    mywindow.document.write('</head><body >');
                    mywindow.document.write(html);
                    mywindow.document.write('</body></html>');

                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/

                    //mywindow.print();
                    //mywindow.close();
                    return true;
                } else {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'onPrintClick');
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
     * This method is calling when user click on Excel Icon
     * @param event
     */
    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.growlMessage = [];
            this.spinnerService.start();
            let html: string = await this.ExportReportDetails('Excel');
            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "pou_transaction_history_report.xls");
            }

        } catch (ex) {
            this.clientErrorMsg(ex, 'onExportToExcelClick');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
     * This method is for export  datatable data in different formats
     * @param event
     */
    async ExportReportDetails(reqType: string) {
        let htmlBuilder: string = '';
        try {

            this.statusCode = -1;
            this.growlMessage = [];           
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;
            let imgserverPath: string = '';
            await this.commonService.getServerIP()
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<string>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ipAddress = data.DataVariable.toString();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    if (data.StatType != StatusType.Success) {
                        htmlBuilder = '';
                        return htmlBuilder;
                    }
                });

            await this.commonService.getSSLConfigDetails()
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    this.growlMessage = [];
                    var data = res.json() as AtParWebApiResponse<SSL_CONFIG_DETAILS>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.gstrProtocal = data.Data.PROTOCOL.toString();
                            this.gstrServerName = data.Data.SERVER_NAME.toString();
                            this.gstrPortNo = data.Data.PORT_NO.toString();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    if (data.StatType != StatusType.Success) {
                        htmlBuilder = '';
                        return htmlBuilder;
                    }

                });

            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';

            let title: string = '""' + "AtparVersion 2.8" + '""';

            htmlBuilder += "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";


            if (reqType == 'Print') {
                htmlBuilder += "<tr width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Point Of Use Transaction History Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }

            else if (reqType == 'Excel') {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Point Of Use Transaction History Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";               
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }

            else {
                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Point Of Use Transaction History Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
               htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"
            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"            
                + "<tr bgcolor=#d3d3d3>"
                + "<td align=center  nowrap><span class=c3><b>Item ID - Description</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Cart ID - Description</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Custom Item ID</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>UPC ID</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Vendor Item ID</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Mfg ItemID</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Quantity On Hand</b></span></td>"
                + "</tr>";

            this.lstTransHistoryHeaders.forEach(headers => {
                htmlBuilder += "<tr>"
                if (reqType == "Print" || reqType == "Mail") {

                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.ITEM_ID + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.CART_ID + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.COMPARTMENT + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.CUST_ITEM_ID + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.UPC_ID + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.VNDR_ITEM_ID + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.MFG_ITEM_ID + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.PAR_UOM + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.QOH + "</span></td>"
                    htmlBuilder += "</tr>";
                }

                else {

                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.ITEM_ID + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.CART_ID + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.COMPARTMENT + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.CUST_ITEM_ID + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.UPC_ID + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.VNDR_ITEM_ID + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + headers.MFG_ITEM_ID + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.PAR_UOM + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + headers.QOH + "</span></td>"
                    htmlBuilder += "</tr>";
                }

                if (headers.DETAILS != null) {
                    htmlBuilder += "<tr>"
                    htmlBuilder += "<td colspan=8>"
                    htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    htmlBuilder += "<tr bgcolor=#d3d3d3>"
                    htmlBuilder += "<td align=center nowrap colspan=3><span class=c3><b>Transaction</b></span></td>"
                    htmlBuilder += "<td align=center nowrap colspan=6><span class=c3></span></td>"
                    htmlBuilder += "</tr>"
                    htmlBuilder += "<tr bgcolor=#d3d3d3>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Date</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Time</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Type</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Issue Uom</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Qty Issued</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Qty Putaway /Returned</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Qty Adjusted</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Quantity On Hand</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>User</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Reason Code</b></span></td>"
                    htmlBuilder += "</tr>";




                    if (reqType == "Print" || reqType == "Mail") {

                        headers.DETAILS.forEach(details => {
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.DATE + "</span></td>"
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.TIME + "</span></td>"
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.EVENT_TYPE_DATA + "</span></td>"
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.ISSUE_UOM + "</span></td>"
                            htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_ISSUED + "</span></td>"
                            htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_RETPUTAWAY + "</span></td>"
                            htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_ADJUSTED + "</span></td>"
                            htmlBuilder += "<td align=right nowrap><span class=c3>" + details.ON_HAND_QTY + "</span></td>"
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.DOWNLOAD_USERID + "</span></td>"
                            if (details.REASON_CODE != null) {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + details.REASON_CODE + "</span></td>"
                            }
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + "" + "</span></td>"
                            
                            htmlBuilder += "</tr>";
                        });

                    }

                    else {
                        headers.DETAILS.forEach(details => {
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.DATE + "</span></td>"
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.TIME + "</span></td>"
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.EVENT_TYPE_DATA + "</span></td>"
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.ISSUE_UOM + "</span></td>"
                            htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_ISSUED + "</span></td>"
                            htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_RETPUTAWAY + "</span></td>"
                            htmlBuilder += "<td align=right nowrap><span class=c3>" + details.QTY_ADJUSTED + "</span></td>"
                            htmlBuilder += "<td align=right nowrap><span class=c3>" + details.ON_HAND_QTY + "</span></td>"
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + details.DOWNLOAD_USERID + "</span></td>"
                            if (details.REASON_CODE != null) {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + details.REASON_CODE + "</span></td>"
                            }
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + "" + "</span></td>"
                            htmlBuilder += "</tr>";
                        });

                    }
                    htmlBuilder += "</table>"
                    htmlBuilder += "</td>"
                    htmlBuilder += "</tr>";

                }
            });
       
            htmlBuilder += "</table></Table>";
            return htmlBuilder;
        }                                
        catch (ex) {
            this.clientErrorMsg(ex, 'ExportReportDetails');

        }
    }

    /**
    * This method is calling when user close mail dailogbox
    * @param event
    */
    closeMailPopup() {
        this.growlMessage = [];
    }

    
    clientErrorMsg(strExMsg, funName) {
    this.growlMessage = [];
    this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
}
    
    /**
     * This method is for clearing all the variables
     * @param event
     */
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstTransHistoryDetails = null;
        this.lstTransHistoryHeaders = null;
        this.lstCartIds = null;
        this.lstBUnits = null;
        this.lstDeptuserItems = null;
        this.lstFilteredCartIds = null;
        this.lstFilteredItemIds = null;
        this.lstOrgGroups = null;         

    }
}
    