
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { OptimizationReportService } from './cart-optimization-report.service';
import { Http, Response } from "@angular/http";
import { StatusType, TokenEntry_Enum, YesNo_Enum, DataSet_Type, BusinessType, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message, SelectItem } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_CRCT_USER_ALLOCATION } from '../Entities/MT_CRCT_USER_ALLOCATION';
import { VM_CART_OPTIMIZATION_DETAILS } from '../Entities/VM_CART_OPTIMIZATION_DETAILS';
import { VM_CART_DETAILS } from '../Entities/VM_CART_DETAILS';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Menus } from '../AtPar/Menus/routepath';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { saveAs } from 'file-saver';

declare var module: {
    id: string;
}


@Component({

    templateUrl: 'cart-optimization-report.component.html',
    providers: [AtParCommonService, AtParConstants, OptimizationReportService]
})


export class OptimizationReportComponent implements OnInit {

    /*Varaible Declaration*/
    _strOrgGrpId: string = "";
    gstrProtocal: string = "";
    gstrServerName; string = "";
    gstrPortNo: string = "";
    strParQty: string = "";
    strPrice: string = "";
    strRecomPar: string = "";
    lblBunitCart: string = "";
    gEditParUserParamval: string = "";
    orgGrpIDData: string = "";
    orgGrpId: string = "";
    orgGroupIDForDBUpdate: string = "";
    selectedOrgGroupId: string = "";
    lblCurrentval: string = "";
    strUserId: string = "";
    lblRecommendedVal: string = "";
    lblNetReductionVal: string = "";
    selectedCartId: string = "";
    selectedBunit: string = "";
    toMailAddr: string = '';
    lblFromDate: string = "";
    lblToDate: string = "";
    selectedDeptId: string = "";
    ipAddress: string = "";
    cartIdValue: string = "";
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupsDropdown: boolean = false;
    isVisible: boolean = false;
    isLblBunitVisible: boolean = false;
    tdExports: boolean = false;
    page: boolean = true;
    isMailDialog: boolean = false;
    blnsortbycolumn: boolean = false;
    isVisibleChkBox: boolean = false;
    isVisibletdExports: boolean = false;
    isLblVisible: boolean = false;
    isVisibleEdiTxt: boolean = false;
    isVisibleBtnUpdate: boolean = false;
    isVisibleRowFooter: boolean = false;
    showGrid: boolean = false;
    statusCode: number = -1;
    defDateRange: number = 0;
    startIndex: number;
    EndIndex: number;
    netTotalreduction: number;
    netTotalCurVal: number;
    netTotalrecommendedVal: number;
    selectcountFrequency: number = 0;
    selectedCouontFrequency: number = 0;
    countFrequency: number = 0;
    breadCrumbMenu: Menus;
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    lstPreReqData: string[] = [];
    fromDate: Date;
    toDate: Date;
    currentDate: Date;
    _fromDate: Date;
    _toDate: Date;
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    lstOrgGroups: SelectItem[] = [];
    lstBUnits: any = [];
    lstFilteredBUnits: any = [];
    lstFilteredCartIds: any[];
    lstCartIds: any = [];
    lstDBData: VM_CART_OPTIMIZATION_DETAILS[] = [];
    lstChkItemdetails: Array<VM_CART_OPTIMIZATION_DETAILS>;
    lstFilterData: VM_CART_OPTIMIZATION_DETAILS[] = [];
    sortedcheckedrec: VM_CART_OPTIMIZATION_DETAILS[] = [];
    sorteduncheckedrec: VM_CART_OPTIMIZATION_DETAILS[] = [];
    lstCountFrequency: any[] = [];
    lstCartHeader: MT_CRCT_USER_ALLOCATION[] = [];
    lstCartDetails: VM_CART_OPTIMIZATION_DETAILS[] = [];
    dataCheckedSorting: VM_CART_OPTIMIZATION_DETAILS[] = [];
    dataUncheckedSorting: VM_CART_OPTIMIZATION_DETAILS[] = [];
    bUnit: string='';
    orgGroupId: string='';
    cartId: string='';
    frm_Date: Date;
    to_Date: Date;
    frmAvgRpt: boolean = false;
    field: any = [];
    isItemidSort: boolean = false;

    /**
    * Constructor
    * @param OptimizationReportService
    * @param AtParCommonService
    * @param httpService
    * @param spinnerService
    * @param AtParConstants
    */
    constructor(
        private httpService: HttpService,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private optimizationReportService: OptimizationReportService,
        private atParConstant: AtParConstants,
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
    * Init Function for Populate orgGrpIds, Bunits to the dropdown when page loading and getMyPreferences,getProfileParamValue.
    */
    async  ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.page = true;
        this.lstFilteredCartIds = new Array<MT_CRCT_USER_ALLOCATION>();
        this.lstCartHeader = new Array<MT_CRCT_USER_ALLOCATION>();
        this.lstCartDetails = new Array<VM_CART_OPTIMIZATION_DETAILS>();
        this.lstChkItemdetails = new Array<VM_CART_OPTIMIZATION_DETAILS>();
        this.dataCheckedSorting = new Array<VM_CART_OPTIMIZATION_DETAILS>();
        this.dataUncheckedSorting = new Array<VM_CART_OPTIMIZATION_DETAILS>();
        this.lstFilterData = new Array<VM_CART_OPTIMIZATION_DETAILS>();

        for (var i = 1; i <= 7;) {
            this.lstCountFrequency.push({ label: i.toString(), value: i.toString() });
            i++;
        }

        try {
            this.spinnerService.start();
            this.statusCode = -1;
            this.strUserId = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            this.statusCode = await this.getMyPreferences();
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                return;
            }
            this.statusCode = await this.getProfileParamValue();
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
            this.route.queryParams.subscribe(params => {
                this.bUnit = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                this.cartId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                this.orgGroupId = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                this.frm_Date = params["p5value"];
                this.to_Date = params["p6value"];
            });
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(JSON.parse(localStorage.getItem('bcMenu')) as Menus));
            if (this.bUnit != null && this.bUnit != '' && this.bUnit != "undefined" && this.orgGroupId != null && this.orgGroupId != '' && this.orgGroupId != "undefined" && this.cartId != null && this.cartId != '' && this.cartId != "undefined" && this.frm_Date != null && this.frm_Date.toString() != '' && this.to_Date != null && this.to_Date.toString() != '') {

                this.frmAvgRpt = true;
                this.selectedBunit = this.bUnit;
                this.selectedCartId = this.cartId;
                var dateStr = new Date(this.frm_Date).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                var dateEnd = new Date(this.to_Date).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');              
                this.fromDate = new Date(dateStr);
                this.toDate = new Date(dateEnd);
                await this.bindDataGrid();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }

    }

    /*
    * Storing data for sorting in two different  lists one for checked and another for Unchecked 
    */
    SortGridData() {
        var lstDBDataList;
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];

        for (let i = 0; i <= this.lstDBData.length - 1; i++) {
            if (this.lstDBData[i].CHK_UPDATED == 1) {
                this.dataCheckedSorting.push(this.lstDBData[i]);
            }
            else {
                this.dataUncheckedSorting.push(this.lstDBData[i]);
            }
        }

        this.isVisible = true;
        this.spinnerService.stop();
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
                else {
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
                    if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == ""|| this.selectedBunit == 'Select Bunit') &&
                        (this.selectedCartId == null || this.selectedCartId == undefined || this.selectedCartId == "") &&
                        (this.selectedDeptId == null || this.selectedDeptId == undefined || this.selectedDeptId == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "BUnit and either CartID or DeptID is mandatory" });
                        return false;
                    }
                    else if ((this.selectedCartId == null || this.selectedCartId == undefined || this.selectedCartId == "") &&
                        (this.selectedDeptId == null || this.selectedDeptId == undefined || this.selectedDeptId == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Cart ID/Par Location or Dept ID is Mandatory" });

                        return false;
                    }
                    else if ((this.selectedBunit == null || this.selectedBunit == undefined || this.selectedBunit == "")) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "BUnit is mandatory" });
                        return false;
                    }

                }
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex);
            return false;
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

    async bindOrgGroups() {
        try {
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
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
            this.clientErrorMsg(ex);
        }
    }

    async populateBussinessUnits(): Promise<boolean> {
        this.growlMessage = [];
        let isOrgBUnitsExist: boolean = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            this.lstFilteredBUnits = [];
            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    if (data.StatusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                        this.growlMessage = [];
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
                            this.spinnerService.stop();
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }
                });
            return Promise.resolve(isOrgBUnitsExist);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
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
            this.isLblVisible = false;
            this.selectedDeptId = "";
            this.selectedBunit = "";
            this.isVisible = false;
            this.tdExports = false;
            this.isVisibleBtnUpdate = false;

            if (this.selectedOrgGroupId == "Select One") {
                this.lstFilteredBUnits = [];
                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                this.spinnerService.stop();
                return;
            }
            await this.populateBussinessUnits();
        }
        catch (ex)
        { this.clientErrorMsg(ex); }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
    * This method is calling when user selecting  Bunit in  Bunit dropdown and getting cartIds for selecting Bunit
    */
    async ddl_ChangeBunitChanged() {
        this.growlMessage = [];       
        this.isLblVisible = false;
        this.selectedCartId = "";  
        this.isVisibleBtnUpdate = false;

        if (this.selectedOrgGroupId != "Select One" && this.selectedOrgGroupId != "" && this.selectedBunit == ""&& this.isVisible==true) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
            this.isVisible = false;
            this.tdExports = false;
            return;
        }
        if (this.selectedBunit == "" && this.isVisible==true) {
            this.isVisible = false;
            this.tdExports = false;            
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });           
            return;
        }
        if (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") {
            this.isVisible = false;
            this.tdExports = false;                      
            return;
        }

        try {
            this.spinnerService.start();
            await this.optimizationReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstFilteredCartIds = data.DataList;
                            break;
                        }
                        case StatusType.Warn: {      
                            this.isVisible = false;
                            this.tdExports = false;                    
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.isVisible = false;
                            this.tdExports = false;                           
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.isVisible = false;
                            this.tdExports = false;
                           
                            if (data.StatusCode == AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                this.selectedCartId = "";
                                break;
                            }
                            if (data.StatusCode == AtparStatusCodes.ATPAR_E_REMOTEDBSELECTFAIL) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                this.selectedCartId = "";
                                break;
                            }
                            else {
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
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
   * This method is used for adding days
   */
    async addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    /**
   * This method is calling when click on Go button    
   */
    async btnGo_Click() {
        try {
            this.isVisible = false;
            this.isVisibleBtnUpdate = false;
            this.tdExports = false;
            this.growlMessage = []
            this.spinnerService.start();
            this.netTotalrecommendedVal = 0;
            this.netTotalCurVal = 0;
            this.netTotalreduction = 0;
            let returnValue: boolean = false;
            if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "" || this.selectedBunit == null) {
                this.selectedBunit = "";
            }           

            returnValue = await this.validateSearchFields();

            if (returnValue) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                await this.bindDataGrid();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);

        }
        finally {
            this.spinnerService.stop();
        }

    }

    CountFreqChanged() {
        this.selectcountFrequency = this.selectedCouontFrequency;
    }

    /**
    * This method is calling when "Edit_Par"  profileParameter is checked  
    */
    EditModeEnable() {
        this.isVisibleChkBox = true;
        this.isVisibleEdiTxt = true;
        this.isVisibleBtnUpdate = true;
    }

    async  bindDataGrid() {
        this.strParQty = "";
        this.strPrice = "";
        this.strRecomPar = "";
        this.growlMessage = [];
        this.lblRecommendedVal = "";
        this.lblNetReductionVal = "";
        let currentValue = 0;
        let recommendedVal = 0;
        let netReductionValue = 0;
        let fromDate: string = "";
        let toDate: string = "";

        this.lblCurrentval = "";
        this.cartIdValue = this.selectedCartId.split(" - ")[0];
        let cDate = new Date();              

        if (this.selectedCouontFrequency == undefined || this.selectcountFrequency == 0) {
            this.selectcountFrequency = this.lstCountFrequency[0].value;
        }

        if (this.frmAvgRpt) {
            if (this.blnShowOrgGroupLabel == true) {
                this._strOrgGrpId = this.orgGroupId;
            }
            else {
                this._strOrgGrpId = this.orgGroupId;
            }
            cDate.setDate(this.toDate.getDate() + 1);
            fromDate = await this.convertDateFormate(this.fromDate);
            toDate = await this.convertDateFormate(this.toDate);          
        }
        else {

            cDate.setDate(this.toDate.getDate() + 1);
            fromDate = await this.convertDateFormate(this.fromDate);
            toDate = await this.convertDateFormate(this.toDate);
            if (this.blnShowOrgGroupLabel == true) {
                this._strOrgGrpId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            }
            else {
                this._strOrgGrpId = this.selectedOrgGroupId;
            }
        }
        try {
            await this.optimizationReportService.getCartOptimizationRep(this.selectedBunit, this.selectedDeptId, this.cartIdValue, fromDate, toDate, this._strOrgGrpId, this.deviceTokenEntry[TokenEntry_Enum.ProfileID], this.selectcountFrequency, this.strUserId)
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json();
                    this.statusCode = data.StatusCode;

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstDBData = [];
                            this.lstCartHeader = data.DataDictionary["Carts"];
                            this.lstCartDetails = data.DataDictionary["CartDetails"];
                            if (data.DataDictionary["CartDetails"].length > 0) {
                                this.isLblVisible = true;
                                this.lblFromDate = fromDate;
                                this.isVisibletdExports = true;
                                this.lblToDate = toDate;
                                this.isLblBunitVisible = true;
                                this.tdExports = true;
                                this.lblBunitCart = this.selectedBunit + " - " + this.selectedCartId.replace(" - ", " ");
                                this.isVisible = true;
                                this.isVisibleRowFooter = true;

                                if ((this.selectedDeptId == null || this.selectedDeptId == undefined || this.selectedDeptId == "") && this.gEditParUserParamval == "Y") {
                                    this.EditModeEnable();
                                }

                                for (let i = 0; i <= this.lstCartDetails.length - 1; i++) {
                                    if (this.lstCartDetails[i].PAR_QTY == null || this.lstCartDetails[i].PAR_QTY == "") {
                                        this.strParQty = "0";
                                    }
                                    else {
                                        this.strParQty = this.lstCartDetails[i].PAR_QTY;
                                    }
                                    if (this.lstCartDetails[i].PRICE == null || this.lstCartDetails[i].PRICE == "") {
                                        this.strPrice = "0";
                                    }
                                    else {
                                        this.strPrice = this.lstCartDetails[i].PRICE;
                                    }

                                    if (this.lstCartDetails[i].RECOMMENDED_PAR == null || this.lstCartDetails[i].RECOMMENDED_PAR == "") {
                                        this.strRecomPar = "0";
                                    }
                                    else {
                                        this.strRecomPar = this.lstCartDetails[i].RECOMMENDED_PAR;
                                    }

                                    currentValue = currentValue + (parseFloat(this.strParQty) * parseFloat(this.strPrice));
                                    recommendedVal = recommendedVal + (parseFloat(this.strRecomPar) * parseFloat(this.strPrice));
                                }

                                this.lblCurrentval = currentValue.toFixed(2);
                                this.lblRecommendedVal = recommendedVal.toFixed(2);
                                netReductionValue = currentValue - recommendedVal;
                                this.lblNetReductionVal = netReductionValue.toFixed(2);
                                this.lstDBData = this.lstCartDetails;
                                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                    this.lstDBData[i].Sno = i + 1;
                                    this.lstDBData[i].RECOMMENDED_PAR_QTY = this.lstDBData[i].RECOMMENDED_PAR;
                                }

                                this.SortGridData();

                                this.blnsortbycolumn = false;
                                
                                this.field = { field: "ITEM_ID", order: -1 };
                              
                                this.isItemidSort = false;
                                this.customSort(this.field);
                                this.isItemidSort = true;
                                this.blnsortbycolumn = false;

                              
                                if ((this.selectedDeptId != null && this.selectedDeptId != undefined && this.selectedDeptId=="") && this.gEditParUserParamval == "Y") {
                                    this.isVisible = true;
                                    this.isVisibleRowFooter = true;
                                    this.isVisibleChkBox = true;

                                }
                                else {

                                }
                            }
                            break;
                        }
                        case StatusType.Warn:
                            {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                break;
                            }

                        case StatusType.Custom: {
                            if (this.statusCode == AtparStatusCodes.CRCT_E_CARTDOESNOTEXIST || this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                    break;
                                }

                            }
                        }

                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.frmAvgRpt = false;
        }
    }

    /**
   * This method is calling when user click on Update Button 
   */
    async btnUpdate_Click() {
               
        this.growlMessage = [];
        let _tblCartDetails: VM_CART_OPTIMIZATION_DETAILS[] = [];

        for (let i = 0; i <= this.lstDBData.length - 1; i++) {
            this.lstDBData[i].NEW_OPTIMAL_QUANTITY = this.lstDBData[i].RECOMMENDED_PAR_QTY;
            this.lstDBData[i].OPTIMAL_QUANTITY = this.lstDBData[i].PAR_QTY;

            if ((this.lstDBData[i].CHK_UPDATED == 1)) {

                if ((this.lstDBData[i].NEW_OPTIMAL_QUANTITY != null && this.lstDBData[i].NEW_OPTIMAL_QUANTITY != '' && this.lstDBData[i].NEW_OPTIMAL_QUANTITY != undefined) || this.lstDBData[i].NEW_OPTIMAL_QUANTITY == "0") {
                    _tblCartDetails.push(this.lstDBData[i]);
                }

                else {
                    this.growlMessage = [];                  
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Par Values" });
                    return;
                }
            }

        }

        this.lstCartHeader[0].USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID];

        let dicDataItems = { "HEADER": this.lstCartHeader, "DETAILS": _tblCartDetails, "PREREQDATA": this.lstPreReqData[0] = " " };
        try {
            this.spinnerService.start();

            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
           
            await this.optimizationReportService.updateCartParAuditRep(dicDataItems, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate)
                .catch(this.httpService.handleError).
                then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_CART_DETAILS>;
                    this.statusCode = data.StatusCode;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isLblVisible = false;
                        this.selectedCartId = "";
                        this.selectedDeptId = "";
                        this.isVisibleBtnUpdate = false;
                        this.tdExports = false;
                        this.isVisible = false;
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully..." });
                        return;
                    }

                    else if (this.statusCode == AtparStatusCodes.ATPAR_E_REMOTEDBUPDATEFAIL) {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        return;
                    }

                    else if (this.statusCode == AtparStatusCodes.E_REMOTESUCCESSLOCALFAIL) {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        return;
                    }

                    else {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        return;

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
    * This method is calling when click on CheckAll Button in Datatable
    */
    async checkAll() {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            this.lstChkItemdetails = [];
            if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {

                for (let i = 0; i <= this.lstFilterData.length - 1; i++) {
                    this.lstFilterData[i].checkvalue = true;
                    this.lstFilterData[i].CHK_UPDATED = 1;
                    this.lstChkItemdetails.push(this.lstFilterData[i]);
                }
            }
            else {

                for (let i = 0; i <= this.lstDBData.length - 1; i++) {

                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_UPDATED = 1;
                    this.lstChkItemdetails.push(this.lstDBData[i]);
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
   * This method is calling when click on UnCheckAll Button in Datatable
   */
    async unCheckAll() {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            this.lstChkItemdetails = [];

            if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {

                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    this.lstFilterData[i].checkvalue = false;
                    this.lstFilterData[i].CHK_UPDATED = 0;
                    this.lstChkItemdetails.push(this.lstFilterData[i]);
                }
            }
            else {

                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_UPDATED = 0;
                    this.lstChkItemdetails.push(this.lstDBData[i]);
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }


    async onChargesFilterData(data) {
        try {
            this.lstFilterData = data;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    /*
    * This method is calling when we selecting particular record in DataTable and getting selected record data
    */
    selectedRow(values: any, event) {
        try {
            this.growlMessage = [];

            if (event == true) {
                values.checkvalue = true;
                values.CHK_UPDATED = 1;

            }
            else {
                values.checkvalue = false;
                values.CHK_UPDATED = 0;
            }

            for (var i = 0; i < this.lstChkItemdetails.length; i++) {
                if (this.lstChkItemdetails[i].ITEM_ID === values.ITEM_ID) {
                    var index = this.lstChkItemdetails.indexOf(this.lstChkItemdetails[i], 0)
                    this.lstChkItemdetails.splice(index, 1);
                }
            }
            this.lstChkItemdetails.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async  fillCartIdsAuto(event) {
        this.growlMessage = [];
        this.spinnerService.start();
        this.lstFilteredCartIds = [];

        if ((this.blnShowOrgGroupLabel == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == ""))) {
            this.spinnerService.stop();
            return;
        }
        if ((this.blnShowOrgGroupsDropdown == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == "") || (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == undefined))) {
            this.spinnerService.stop();
            return;
        }
        let query = event.query;

        try {
            await this.optimizationReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstCartIds = data.DataList;
                            this.lstFilteredCartIds = this.filterCartIds(query, this.lstCartIds);
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            this.isVisible = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            if (data.StatusCode == AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                this.selectedCartId = "";
                                break;
                            }
                            if (data.StatusCode == AtparStatusCodes.ATPAR_E_REMOTEDBSELECTFAIL) {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                this.selectedCartId = "";
                                break;
                            }
                            else {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
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

    filterCartIds(query, CartIds: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < CartIds.length; i++) {
                let CartIdValue = CartIds[i].CART_ID + " - " + CartIds[i].DESCR;
                filtered.push(CartIdValue);
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < CartIds.length; i++) {
                    let CartIdValue = CartIds[i].CART_ID + " - " + CartIds[i].DESCR;
                    if (CartIdValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(CartIdValue);
                    }
                }
            }
        }


        return filtered;
    }

    /*
    * This method is for sorting the data  based on seleted column in DataTable    
    */
    async  customSort(event) {

        var element = event;

        this.lstDBData = [];
        if (event.field == "ITEM_ID" && this.isItemidSort == true) {
            this.blnsortbycolumn = false;
            this.isItemidSort = false;
        }   
        else {
            this.blnsortbycolumn = !this.blnsortbycolumn;
        }
       
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {

            if (a[element.field] < b[element.field])
                return -1;
            if (a[element.field] > b[element.field])
                return 1;
            return 0;
        });
        this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
            if (a[element.field] < b[element.field])
                return -1;
            if (a[element.field] > b[element.field])
                return 1;
            return 0;
        });
        if (this.blnsortbycolumn == false) {
            this.lstDBData = [];
            this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
        }
        else {
            this.lstDBData = [];

            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        }
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];       
       
    }

    async getMyPreferences() {
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
        }
        catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }
        return AtparStatusCodes.ATPAR_OK;
    }

    async getProfileParamValue() {
        try {
            await this.commonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.CartCount, 'EDIT_PAR')
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        if (data.DataVariable != null) {
                            this.gEditParUserParamval = data.DataVariable.toString();
                        }                                               
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

    /**
    * This method is calling when user click on Mail Icon.
    * @param event
    */
    async onSendMailIconClick(event) {
        try {
            this.growlMessage = [];
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    /**
    * This method is calling when user userclick on submit button after enter mailid.
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
                await this.commonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Cart Optimization Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
            this.clientErrorMsg(ex);
        }
        finally {

            this.spinnerService.stop();
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
    * This method is calling when user click on print Icon.
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
                    mywindow.document.write('<html><head><title>' + 'CartCount - Cart Optimization Report' + '</title>');
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
            this.clientErrorMsg(ex);
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
     * This method is calling when user click on Excel Icon.
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
                saveAs(blob, "cart_optimization_report.xls");
            }

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
     * This method is for export  datatable data in different formats.
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
            let _DS: VM_CART_OPTIMIZATION_DETAILS[] = [];
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
                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cart Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }
            else if (reqType == 'Excel') {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cart Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }
            else {
                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cart Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"
            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2>"
                + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                + "<tr bgcolor=#d3d3d3>"
                + "<td align=left nowrap colspan= 13> <span class=c3> <b>" + this.lblBunitCart + "</b></span></td>"
                + "</tr>"
                + "<tr bgcolor=#d3d3d3>"
                + "<td align=center  nowrap><span class=c3><b>Item ID</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Custom Item NO</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Description</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Price($)</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Par Qty</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Max Usage</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Min Usage</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Avg Usage</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Total Usage</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Order Quantity</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Reco. par / day * count freq.</b></span></td>"
                + "</tr>";

            await this.lstDBData.forEach(header => {
                htmlBuilder += "<tr>"
                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>"

                if (header.CUST_ITEM_ID != "" && header.CUST_ITEM_ID != null) {
                    htmlBuilder += "<td align= left nowrap> <span class=c2>" + "'" + header.CUST_ITEM_ID + "</span></td>"
                }
                else {
                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>"
                }                   
                    htmlBuilder += "<td bgcolor=#ffffff >&nbsp;" + header.DESCR + "&nbsp;</td>"

                if (header.COMPARTMENT.trim() != "" && header.COMPARTMENT.trim() != null) {
                    htmlBuilder += "<td align= left nowrap> <span class=c2>" + "'" + header.COMPARTMENT + "</span></td>"
                }
                else {
                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>"
                }                  
                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PRICE + "&nbsp;</td>"
                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_QTY + "&nbsp;</td>"
                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>"
                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.MAX_USAGE + "&nbsp;</td>"
                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.MIN_USAGE + "&nbsp;</td>"
                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.AVG_USAGE + "&nbsp;</td>"
                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.TOTAL_USAGE + "&nbsp;</td>"
                    + "<td align=right bgcolor=#ffffff nowrap>&nbsp;" + header.OrderQty + "&nbsp;</td>"
                    + "<td  align=right bgcolor=#ffffff nowrap>&nbsp;" + header.RECOMMENDED_PAR + "&nbsp;</td>"
                    + "</tr>";
            });

            htmlBuilder += "<tr>"
                + "<td align=left nowrap><span class=c3>" + "Current Value($)" + "&nbsp;</td>"
                + "<td align=left nowrap><span class=c3>" + this.lblCurrentval + "&nbsp;</td>"
                + "<td align=left nowrap><span class=c3></span></td>"
                + "<td align=left nowrap><span class=c3>" + "Recommended Value($)" + "</td>"
                + "<td align=left nowrap><span class=c3>" + this.lblRecommendedVal + "&nbsp;</td>"
                + "<td align=left nowrap><span class=c3></span></td>"
                + "<td align=left nowrap><span class=c3></span></td>"
                + "<td align=left nowrap><span class=c3>" + "Net reduction($)" + "&nbsp;</td>"
                + "<td align=left nowrap><span class=c3>" + this.lblNetReductionVal + "&nbsp;</td>"
                + "<td align=left nowrap><span class=c3></span></td>"
                + "<td align=left nowrap><span class=c3></span></td>"
                + "<td align=left nowrap><span class=c3></span></td>"
                + "<td align=left nowrap><span class=c3></span></td>"
                + "</tr>";

            htmlBuilder += "</table></Table>";
            return htmlBuilder;
        }
        catch (ex) {
            this.clientErrorMsg(ex);

        }
    }

    /**
     * This method is calling when user close mail dailogbox.
     * @param event
     */
    closeMailPopup() {
        this.growlMessage = [];
    }


    clientErrorMsg(ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    }

    /**
    * This method is for clearing all the variables
    * @param event
    */
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.lstCartIds = null;
        this.lstFilteredCartIds = null;
        this.cartIdValue = null;
        this.lstCartDetails = null;
        this.lstCartHeader = null;
        this.lblBunitCart = null;
        this.lstChkItemdetails = null;
        this.lstCountFrequency = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.lstPreReqData = [];
        this.field = [];
    }
}



