import { Component } from '@angular/core';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { VM_MT_POU_CONSIGNEDBILLONLY_ITEMS } from "../../app/Entities/VM_MT_POU_CONSIGNEDBILLONLY_ITEMS";
import { VM_MT_POU_CONSIGNEDBILLONLY_HEADERS } from "../../app/Entities/VM_MT_POU_CONSIGNEDBILLONLY_HEADERS";
import { VM_SEARCHITEM_DETAILS } from "../../app/Entities/VM_SEARCHITEM_DETAILS";
import { AtParCommonService } from '../Shared/atpar-common.service';
import { ManageConsignedItemOrderReportServices } from './pou-manage-cosigned-item-order-report.service';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, StatusType, EnumApps, YesNo_Enum, WF_ITEM_STATUS, LocationType, Item_POU_Workflow_Review_Status, Enterprise_Enum } from '../Shared/AtParEnums';
import { SelectItem, Message } from './../components/common/api';
import { Response } from "@angular/http";
import { asEnumerable } from 'linq-es5';
import { ConfirmDialogModule } from '../components/confirmdialog/confirmdialog';
import { ConfirmationService, Confirmation } from '../components/common/api';
import { Menus } from '../AtPar/Menus/routepath';

@Component({
   
    templateUrl: 'pou-manage-cosigned-item-order-report.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, ManageConsignedItemOrderReportServices, ConfirmationService],
})

export class ManageConsignedItemOrderReportComponent {

   

    pazeSize: number;
   

    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    lstVendorData: PAR_MNGT_VENDOR[];
    lstGridHdrData: VM_MT_POU_CONSIGNEDBILLONLY_HEADERS[];
    lstGridFilterHdrData: VM_MT_POU_CONSIGNEDBILLONLY_HEADERS[];
    lstGridDtlsData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS[];
    lstLookUpData: VM_SEARCHITEM_DETAILS[];
    lookUpData: VM_SEARCHITEM_DETAILS;
    rowData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS;
    ddlVendorData: SelectItem[];
    blnShowVendorlabel: boolean = true;
    lblVendorData: string;
    vndrReviewReq: string = '';
    txtItemIDdata: string = '';
    txtDeptIDdata: string = '';
    txtCompanydata: string = '';
    txtParLocdata: string = '';
    
    fromDate: Date;
    
    toDate: Date;
    txtPONOdata: string = '';
    selectedVendor: string = '';
    litUpdateFlag: string = YesNo_Enum[YesNo_Enum.N].toString();
    page: boolean = false;
    mainGrid: boolean = false;
    lookUpPopUp: boolean = false;
    lookUpGrid: boolean = false;
    itemId: string = '';
    vendorID: string = '';
    transID: number;
    erpName: string = '';
    defDateRange: number;
    btnLookUpSaveVisble: boolean = false;
    btnLookUpSaveDisble: boolean = true;    
    blnSuccessFlag: boolean = false;
    mainDiv: boolean = false;
    breadCrumbMenu: Menus;
    expandedItems: any[] = [];
    expandedItem: VM_MT_POU_CONSIGNEDBILLONLY_HEADERS;



    constructor(private atParCommonService: AtParCommonService, private manageConsignedItemOrderReportServices: ManageConsignedItemOrderReportServices, private atParConstant: AtParConstants,
        private httpService: HttpService, private spinnerService: SpinnerService, private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();
    }

    async ngOnInit() {
        this.growlMessage = [];
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pazeSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        await this.getERPName();
        await this.getMyPreferences()
        this.fromDate = new Date();
        this.fromDate.setDate(this.fromDate.getDate() - this.defDateRange);
        this.toDate = new Date();
        await this.bindVendors();
        await this.getOrgParamValue();
        this.mainGrid = false;
        this.mainDiv = true;        
        this.page = true;
    }

    btnGo_Click() {
        try {
            this.lstGridHdrData = [];
            this.lstGridDtlsData = [];
            this.lstGridFilterHdrData = [];
            this.growlMessage = [];
            this.litUpdateFlag = YesNo_Enum[YesNo_Enum.N].toString()
            this.expandedItems = [];
            var todayDate = new Date();
            if (this.toDate > todayDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });

                return;
            }
            if (this.fromDate > this.toDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });

                return;
            }   
            this.getItemData();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getERPName() {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            await this.manageConsignedItemOrderReportServices.GetERPName().catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<string>;
                this.growlMessage = [];
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.erpName = data.DataVariable.toString();
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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getMyPreferences() {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            await this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION',this.deviceTokenEntry).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<string>;
                this.growlMessage = [];
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.defDateRange = parseInt(data.DataVariable.toString());
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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async bindVendors() {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            await this.manageConsignedItemOrderReportServices.GetVendorsInfo(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<PAR_MNGT_VENDOR>;
                this.growlMessage = [];
                switch (data.StatType) {
                    case StatusType.Success: {                        
                        this.lstVendorData = data.DataList;

                        if (this.lstVendorData.length >= 1) {
                            if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID] == 'VENDOR') {
                                this.blnShowVendorlabel = true;
                                var drSearch: PAR_MNGT_VENDOR[] = asEnumerable(this.lstVendorData).Where(x => x.VEND_USER_ID == this.deviceTokenEntry[TokenEntry_Enum.UserID]).ToArray();

                                if (drSearch.length > 0) {
                                    this.lblVendorData = drSearch[0].VENDOR_ID + " - " + drSearch[0].VENDOR_NAME;
                                }
                            }
                            else {
                                this.blnShowVendorlabel = false;
                                this.ddlVendorData = [];
                                this.ddlVendorData.push({ label: "Select Vendor", value: "Select Vendor" });
                                for (var i = 0; i < this.lstVendorData.length; i++) {
                                    this.ddlVendorData.push({ label: this.lstVendorData[i].VENDOR_ID + " - " + this.lstVendorData[i].VENDOR_NAME, value: this.lstVendorData[i].VENDOR_ID });
                                }
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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getOrgParamValue() {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            await this.atParCommonService.getOrgGroupParamValue("VENDOR_REVIEW_REQ", EnumApps.PointOfUse, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<string>;
                this.growlMessage = [];
                switch (data.StatType) {
                    case StatusType.Success: {
                        if (!this.StringNullOrEmpty(data.DataVariable)) {
                            this.vndrReviewReq = data.DataVariable.toString();
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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async getItemData() {
        try {
            this.growlMessage = [];            
            this.mainGrid = false; 
            var vendIntPos: number;
            var vendorID: string='';
            if (this.blnShowVendorlabel == true) {
                if (!this.StringNullOrEmpty(this.lblVendorData)){
                    vendIntPos = this.lblVendorData.indexOf('-');
                }
                
                if (vendIntPos > 0) {
                    vendorID = this.lblVendorData.substring(0, vendIntPos).trim();
                }
                else {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                    return;
                }
            }
            else {
                if (this.selectedVendor.trim() != 'Select Vendor') {
                    vendorID = this.selectedVendor.trim();
                }
                else {
                    vendorID = '';
                }
                
            }

            this.spinnerService.start();
            var fromDate = this.fromDate.toLocaleDateString();
            var toDate = this.toDate.toLocaleDateString();
            await this.manageConsignedItemOrderReportServices.GetConsignmentItemOrderReports(this.txtItemIDdata, vendorID, this.txtDeptIDdata, this.txtCompanydata, this.txtParLocdata, fromDate, toDate, this.txtPONOdata).then((res:Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                switch (data.StatType) {
                    case StatusType.Success: {
                        if (data.DataDictionary != null || data.DataDictionary != undefined) {
                            this.lstGridHdrData = [];
                            this.lstGridDtlsData = [];
                            this.lstGridFilterHdrData = [];
                            this.lstGridHdrData = data.DataDictionary['lstheader'];
                            this.lstGridDtlsData = data.DataDictionary['lstdetails'];
                            for (let i = 0; i < this.lstGridDtlsData.length; i++) {
                                let hdrData = new VM_MT_POU_CONSIGNEDBILLONLY_HEADERS;
                                hdrData = asEnumerable(this.lstGridHdrData).Where(x => x.VENDOR_ID == this.lstGridDtlsData[i].VENDOR_ID && x.TRANSACTION_ID == this.lstGridDtlsData[i].TRANSACTION_ID && x.DEPARTMENT_ID == this.lstGridDtlsData[i].DEPARTMENT_ID).FirstOrDefault();
                                this.lstGridFilterHdrData.push(hdrData);
                            }
                            this.lstGridFilterHdrData = asEnumerable(this.lstGridFilterHdrData).Distinct().ToArray();
                            if (this.lstGridFilterHdrData.length <= 0){
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                return;
                            }
                            for (let i = 0; i < this.lstGridFilterHdrData.length; i++) {                               
                                this.lstGridFilterHdrData[i].DETAILS = asEnumerable(this.lstGridDtlsData).Where(x => x.VENDOR_ID == this.lstGridFilterHdrData[i].VENDOR_ID && x.TRANSACTION_ID == this.lstGridFilterHdrData[i].TRANSACTION_ID).ToArray();

                                let changeDate = this.lstGridFilterHdrData[i].TRANSACTION_DATE;
                                var dateStr = new Date(changeDate);
                                
                                this.lstGridFilterHdrData[i].TRANSACTION_DATE = this.getDateFormat(dateStr)
                                this.reviewStatus(this.lstGridFilterHdrData[i].DETAILS, i)
                            }
                            this.mainGrid = true;

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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    reviewStatus(gridItem: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS[], parentRowIndex: number) {
        try {
            for (let i = 0; i < gridItem.length; i++) {
                gridItem[i].parentRIndex = parentRowIndex;
                gridItem[i].childRIndex = i;
                this.resetData(gridItem[i]);              
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    resetData(gridItem: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS) {

        try {
            gridItem.ACTUAL_ITEM_ID = gridItem.ITEM_ID;
            gridItem.OLD_ISSUE_PRICE = gridItem.ISSUE_PRICE;
            gridItem.OLD_LINE_COMMENTS = gridItem.LINE_COMMENTS;
            gridItem.OLD_UOM = gridItem.UOM;
            gridItem.blnCancel = true;
            gridItem.blnCancelDisable = false;
            gridItem.blnEdit = true;
            gridItem.blnEditDisable = false;
            gridItem.blnSave = false;
            gridItem.blnAbandon = false;
            gridItem.blnHoldUnhold = true;
            gridItem.blnHoldUnholdDiable = false;
            gridItem.blnUpdate = false;
            gridItem.isReviewStatusVisible = false;
            gridItem.isReviewStatusDisable = false;
            gridItem.isVerndorCBDisable = true;
            gridItem.isDeptCBDisable = false;
            gridItem.isExceptionCBDisable = true;
            if (!this.StringNullOrEmpty(gridItem.LINE_COMMENTS)) {
                gridItem.LINE_COMMENTS = gridItem.LINE_COMMENTS.replace("%20", " ");
            }


            if (gridItem.STATUS == WF_ITEM_STATUS.HOLD) {
                gridItem.holdBGColor = 'success';
                gridItem.titleHoldUnhold='Unhold'
            }
            else {
                gridItem.holdBGColor = 'danger';
                gridItem.titleHoldUnhold = 'Hold'
            }


            //Grid buttons visibles/enables functionality

            var bDeptReview: boolean = gridItem.DEPT_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;
            var bExceptionReview: boolean = gridItem.EXCEPTION_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;
            var bExcpAppReq: boolean = gridItem.EXCP_APPROVAL_REQ == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;

            if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID.toString()] == "VENDOR") {
                gridItem.blnEdit = false;
                gridItem.blnCancel = false;
                gridItem.blnHoldUnhold = false;
            }
            else if (gridItem.CATALOG_FLG == 'No') {
                if (gridItem.STATUS == WF_ITEM_STATUS.CANCEL) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnCancelDisable = true;
                    gridItem.blnHoldUnholdDiable = true;
                    gridItem.blnUpdate = false;
                }
                else if (gridItem.STATUS == WF_ITEM_STATUS.HOLD) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnUpdate = false;
                }
                else if (gridItem.STATUS == WF_ITEM_STATUS.REVIEWED) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnCancelDisable = true;
                    gridItem.blnHoldUnholdDiable = true;
                    gridItem.blnUpdate = false;
                }
                else {
                    if (!bExcpAppReq && !bDeptReview) {
                        gridItem.blnEditDisable = false;
                    }
                    else if (bExcpAppReq && !bExceptionReview) {
                        gridItem.blnEditDisable = false;
                    }
                    else {
                        gridItem.blnEditDisable = true;
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                    }
                }
            }
            else {
                if (gridItem.STATUS == WF_ITEM_STATUS.CANCEL) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnCancelDisable = true;
                    gridItem.blnHoldUnholdDiable = true;
                    gridItem.blnUpdate = false;
                }
                else if (gridItem.STATUS == WF_ITEM_STATUS.HOLD) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnUpdate = false;
                }
                else if (gridItem.STATUS == WF_ITEM_STATUS.REVIEWED) {
                    gridItem.blnEditDisable = true;
                    gridItem.blnCancelDisable = true;
                    gridItem.blnHoldUnholdDiable = true;
                    gridItem.blnUpdate = false;
                }
                else {
                    if (!bExcpAppReq && bDeptReview) {
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                    }
                    else if (bExcpAppReq && bExceptionReview) {
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                    }
                    else {
                        gridItem.blnCancelDisable = false;
                        gridItem.blnHoldUnholdDiable = false;
                    }
                }
                gridItem.blnEditDisable = true;
            }

            if (!this.StringNullOrEmpty(this.erpName)) {
                if (this.erpName.toUpperCase() == Enterprise_Enum[Enterprise_Enum.Meditech_XML].toString().toUpperCase()) {
                    gridItem.blnEdit = false;
                    gridItem.blnCancel = false;
                    gridItem.blnHoldUnhold = false;
                }
            }

            //ReviewStatus logic

            if (this.vndrReviewReq == YesNo_Enum[YesNo_Enum.Y].toString()) {
                if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID.toString()] == 'VENDOR') {

                    if (gridItem.STATUS != WF_ITEM_STATUS.ACTIVE) {
                        gridItem.isReviewStatusVisible = false;
                        gridItem.blnUpdate = false;
                        gridItem.isReviewStatusDisable = true;
                        gridItem.blnEditDisable = true;
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                    }
                    else {
                        if (gridItem.DEPT_REVIEW_STATUS != YesNo_Enum[YesNo_Enum.Y].toString()) {
                            if (gridItem.VENDOR_REVIEW_STATUS != YesNo_Enum[YesNo_Enum.Y].toString() && gridItem.VENDOR_REVIEW_STATUS != LocationType[LocationType.I].toString()) {
                                gridItem.isReviewStatusVisible = true;
                                gridItem.blnUpdate = true;
                            }
                        }
                    }

                }
                else {
                    if (gridItem.STATUS != WF_ITEM_STATUS.ACTIVE) {
                        gridItem.isReviewStatusVisible = false;
                        gridItem.blnUpdate = false;
                    }
                    else if (gridItem.VENDOR_REVIEW_STATUS != YesNo_Enum[YesNo_Enum.Y].toString() && gridItem.VENDOR_REVIEW_STATUS != LocationType[LocationType.I].toString()) {
                        gridItem.isReviewStatusVisible = false;
                        gridItem.blnUpdate = false;
                    }
                    else {
                        if (gridItem.EXCP_APPROVAL_REQ != YesNo_Enum[YesNo_Enum.Y].toString()) {
                            if (gridItem.DEPT_REVIEW_STATUS != YesNo_Enum[YesNo_Enum.Y].toString()) {
                                gridItem.isReviewStatusVisible = true;
                                gridItem.blnUpdate = true;
                            }
                        }
                        else if ((gridItem.EXCEPTION_REVIEW_STATUS != YesNo_Enum[YesNo_Enum.Y].toString()) && this.StringNullOrEmpty(gridItem.PO_NO)) {
                            gridItem.isReviewStatusVisible = true;
                            gridItem.blnUpdate = true;
                        }
                    }
                }
            }
            else {
                if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID.toString()] == 'VENDOR') {
                    if (gridItem.STATUS != WF_ITEM_STATUS.ACTIVE) {
                        gridItem.isReviewStatusDisable = true;
                        gridItem.blnEditDisable = true;
                        gridItem.blnCancelDisable = true;
                        gridItem.blnHoldUnholdDiable = true;
                        gridItem.blnUpdate = false;
                    }
                    gridItem.isReviewStatusVisible = false;
                    gridItem.blnUpdate = false;
                }
                else {
                    if (gridItem.STATUS != WF_ITEM_STATUS.ACTIVE) {
                        gridItem.isReviewStatusVisible = false;
                        gridItem.blnUpdate = false;
                    }
                    else if (gridItem.EXCP_APPROVAL_REQ != YesNo_Enum[YesNo_Enum.Y].toString()) {
                        if (gridItem.DEPT_REVIEW_STATUS != YesNo_Enum[YesNo_Enum.Y].toString()) {
                            gridItem.isReviewStatusVisible = true;
                            gridItem.blnUpdate = true;
                        }
                    }
                    else if (gridItem.EXCEPTION_REVIEW_STATUS != YesNo_Enum[YesNo_Enum.Y].toString() && this.StringNullOrEmpty(gridItem.PO_NO)) {
                        gridItem.isReviewStatusVisible = true;
                        gridItem.blnUpdate = true;
                    }
                }

            }

            //GetVendorApprovalStatus
            gridItem.isVerndorChecked = gridItem.VENDOR_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;

            //GetDeptApprovalStatus
            gridItem.isDeptChecked = gridItem.DEPT_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;

            //GetExecptionApprovalStatus
            gridItem.isExceptionChecked = gridItem.EXCEPTION_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;


            //Common code for check box's enable/disable,
            var bHasVendorApproved = false;
            var bHasApproverApproved = gridItem.DEPT_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;

            if (gridItem.VENDOR_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() || gridItem.VENDOR_REVIEW_STATUS == LocationType[LocationType.I].toString()) {
                bHasVendorApproved = true;
            }
            else {
                bHasVendorApproved = false;
            }

            var intItemStatus = gridItem.STATUS;

            //IsVendorApprovalCheckBoxEnabled
            if (!bHasApproverApproved) {
                if (this.vndrReviewReq == YesNo_Enum[YesNo_Enum.Y].toString()) {
                    if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID.toString()] == 'VENDOR' && (!bHasVendorApproved)) {
                        gridItem.isVerndorCBDisable = false;
                    }
                    else if (bHasVendorApproved) {
                        gridItem.isVerndorCBDisable = true;
                    }
                }
            }

            //IsDepartmentApprovalCheckBoxEnabled
            if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID.toString()] == 'VENDOR') {
                gridItem.isDeptCBDisable = true;
            }
            else {
                if (intItemStatus != WF_ITEM_STATUS.ACTIVE) {
                    gridItem.isDeptCBDisable = true;
                }
                else {
                    if (this.vndrReviewReq == YesNo_Enum[YesNo_Enum.Y].toString()) {
                        if (!bHasVendorApproved || bHasApproverApproved) {
                            gridItem.isDeptCBDisable = true;
                        }
                    }
                    else {
                        if (bHasApproverApproved) {
                            gridItem.isDeptCBDisable = true;
                        }
                    }

                }
            }

            //IsExceptionApprovalCheckBoxEnabled
            var bHasReviewerApproved: boolean = gridItem.EXCEPTION_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;
            var bExcpAppReq: boolean = gridItem.EXCP_APPROVAL_REQ == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;

            if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID.toString()] != "VENDOR") {
                if (intItemStatus != WF_ITEM_STATUS.ACTIVE) {
                    gridItem.isExceptionCBDisable = true;
                }
                else {
                    if (bExcpAppReq) {
                        if (bHasApproverApproved && !bHasReviewerApproved && this.StringNullOrEmpty(gridItem.PO_NO)) {
                            gridItem.isExceptionCBDisable = false;
                        }
                    }
                }
            }

            gridItem.isOldDeptCBDisable = gridItem.isDeptCBDisable;
            gridItem.isOldExceptionCBDisable = gridItem.isExceptionCBDisable;
            gridItem.isOldVerndorCBDisable = gridItem.isVerndorCBDisable;
        }
        catch (ex) {

        }
    }
    
    async cancelItem_click(rowData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS) {
        try {
            this.growlMessage = [];
            if (this.litUpdateFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please save/cancel before continuing' });
                return;
            }
            this.confirmationService.confirm({
                message: 'Are you sure you want to cancel the item?',
                accept: async () => {
                    this.spinnerService.start();
                   await this.manageConsignedItemOrderReportServices.UpdateItemStatus(rowData.TRANSACTION_ID, rowData.ITEM_ID, WF_ITEM_STATUS.CANCEL).then(async res => {
                        let data = res.json() as AtParWebApiResponse<any>;
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.expandedItems = [];
                                await this.getItemData();
                                this.expandedItem = asEnumerable(this.lstGridFilterHdrData).Where(x => x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID).FirstOrDefault();
                                this.expandedItems.push(this.expandedItem);
                                
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

                    this.spinnerService.stop();
                }
            });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    editItem_click(rowData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS) {
        try {
            this.growlMessage = [];
            if (this.litUpdateFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please save/cancel before continuing' });
                return;
            }
            rowData.isExceptionCBDisable = true;
            rowData.isVerndorCBDisable = true;
            rowData.isDeptCBDisable = true;
            this.litUpdateFlag = YesNo_Enum[YesNo_Enum.N].toString();
            rowData.istxtItemIdVisible = true;
            rowData.blnCancel = false;
            rowData.blnEdit = false;
            rowData.blnHoldUnhold = false;
            rowData.blnUpdate = false;
            rowData.blnSave = true;
            rowData.blnAbandon = true;
            this.litUpdateFlag = YesNo_Enum[YesNo_Enum.Y].toString();
            this.expandedItems = [];
            this.expandedItem = asEnumerable(this.lstGridFilterHdrData).Where(x => x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID).FirstOrDefault();
            this.expandedItems.push(this.expandedItem);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async save_click(rowData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS) {
        try {
            this.growlMessage = [];
             this.litUpdateFlag = YesNo_Enum[YesNo_Enum.N].toString();
          
            if (this.lookUpData != null || this.lookUpData != undefined) {
                this.lookUpData.ACTUAL_ITEM_ID = rowData.ACTUAL_ITEM_ID;
                this.lookUpData.ITEM_PRICE = this.StringNullOrEmpty(rowData.ISSUE_PRICE.toString()) ? 0 : rowData.ISSUE_PRICE;
                this.lookUpData.UOM = rowData.UOM;
                this.lookUpData.ITEM_DESCR = rowData.SHORT_DESCR;
                if (rowData.isExceptionCBDisable != undefined) {
                    if (rowData.isExceptionCBDisable != true) {
                        this.lookUpData.REVEIWER_TYPE = 'Exception Review';
                    }
                }

                this.spinnerService.start();
                await this.manageConsignedItemOrderReportServices.UpdateNonCatalogItemDtls(this.lookUpData).then(async res => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lookUpData = null;
                            this.expandedItems = [];
                            await this.getItemData();                         

                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Saved successfully.' });
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

                this.spinnerService.stop();

            }
            else {
                rowData.blnCancel = true;
                rowData.blnEdit = true;
                rowData.blnHoldUnhold = true;
                rowData.blnUpdate = true;
                rowData.blnSave = false;
                rowData.blnAbandon = false;
                rowData.ITEM_ID = rowData.ACTUAL_ITEM_ID;
                rowData.ISSUE_PRICE = rowData.OLD_ISSUE_PRICE;
                rowData.LINE_COMMENTS = rowData.OLD_LINE_COMMENTS;
                rowData.UOM = rowData.OLD_UOM;
                rowData.isExceptionCBDisable = rowData.isOldExceptionCBDisable
                rowData.isVerndorCBDisable = rowData.isOldVerndorCBDisable
                rowData.isDeptCBDisable = rowData.isOldDeptCBDisable
                rowData.istxtItemIdVisible = false;
                this.page = true;
                this.mainGrid = true;
                this.lookUpPopUp = false;
                this.lookUpGrid = false;
                this.litUpdateFlag = YesNo_Enum[YesNo_Enum.N].toString()
                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Saved successfully.' });
             }
            this.expandedItems = [];
            this.expandedItem = asEnumerable(this.lstGridFilterHdrData).Where(x => x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID).FirstOrDefault();
            this.expandedItems.push(this.expandedItem);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    cancel_click(rowData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS) {
        try {
            this.growlMessage = [];           
            rowData.isExceptionCBDisable =  rowData.isOldExceptionCBDisable
            rowData.isVerndorCBDisable = rowData.isOldVerndorCBDisable
            rowData.isDeptCBDisable = rowData.isOldDeptCBDisable            
            rowData.istxtItemIdVisible = false;
            rowData.ITEM_ID = rowData.ACTUAL_ITEM_ID;
            rowData.ISSUE_PRICE = rowData.OLD_ISSUE_PRICE;
            rowData.UOM = rowData.OLD_UOM;
            rowData.LINE_COMMENTS = rowData.OLD_LINE_COMMENTS;
            this.resetData(rowData);
            this.page = true;
            this.mainGrid = true;
            this.lookUpPopUp = false;
            this.lookUpGrid = false;
            this.litUpdateFlag = YesNo_Enum[YesNo_Enum.N].toString()
            this.expandedItems = [];
            this.expandedItem = asEnumerable(this.lstGridFilterHdrData).Where(x => x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID).FirstOrDefault();
            this.expandedItems.push(this.expandedItem);
        }
        catch (ex) {
        }
    }

    async holdItem_click(rowData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS) {
        try {
            this.growlMessage = [];
            if (this.litUpdateFlag == YesNo_Enum[YesNo_Enum.Y].toString()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please save/cancel before continuing' });
                return;
            }
            var status = rowData.STATUS;
            var itemStatus;
            if (status == WF_ITEM_STATUS.HOLD) {
                itemStatus = WF_ITEM_STATUS.ACTIVE;
            }
            else {
                itemStatus = WF_ITEM_STATUS.HOLD;
            }

           await this.confirmationService.confirm({
                message: 'Are you sure you want to continue?',
                 accept: async () => {
                    this.spinnerService.start();
                    await this.manageConsignedItemOrderReportServices.UpdateItemStatus(rowData.TRANSACTION_ID, rowData.ITEM_ID, itemStatus).then(async res => {
                        let data = res.json() as AtParWebApiResponse<any>;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                rowData.STATUS = itemStatus;  
                                this.expandedItems = [];
                                await this.getItemData();
                                this.expandedItem = asEnumerable(this.lstGridFilterHdrData).Where(x => x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID).FirstOrDefault();
                                this.expandedItems.push(this.expandedItem);
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

                    this.spinnerService.stop();
                }
            });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async update_click(rowData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS) {
        try {
            this.growlMessage = [];
            if (!this.StringNullOrEmpty(rowData.WORKFLOW_INSTANCE_ID)) {
                var transID = rowData.TRANSACTION_ID;
                var itemID = rowData.ITEM_ID;
                var bVendorValueFromDB = rowData.VENDOR_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;
                var bApproverValueFromDB = rowData.DEPT_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;
                var bReviewerValueFromDB = rowData.EXCEPTION_REVIEW_STATUS == YesNo_Enum[YesNo_Enum.Y].toString() ? true : false;
                var deptID = rowData.DEPARTMENT_ID;
                var lotID = '';
                var serialID = '';
                var lineNO = 0;
                if (!this.StringNullOrEmpty(rowData.ITEM_LOTNUMBER)) {
                    lotID = rowData.ITEM_LOTNUMBER;
                }
                if ((!this.StringNullOrEmpty(rowData.ITEM_SRNUMBER))) {
                    serialID = rowData.ITEM_SRNUMBER;
                }
                if ((!this.StringNullOrEmpty(rowData.LINE_NO))) {
                    lineNO = Number(rowData.LINE_NO);
                }

                var itemPrice: string = '';

                if (rowData.ISSUE_PRICE != null && rowData.ISSUE_PRICE != undefined) {
                   itemPrice = rowData.ISSUE_PRICE.toString();
                }
                
                var uom = rowData.UOM;
                var comments = rowData.LINE_COMMENTS;
                var vendorID = rowData.VENDOR_ID;
                var transID = rowData.TRANSACTION_ID;

               
                if (this.StringNullOrEmpty(itemPrice.trim())) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Price should not be empty.' });
                    return;
                }
                else if (itemPrice == '0') {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Price should be greater than zero.' });
                    return;
                }

                if (itemPrice.lastIndexOf('.') != itemPrice.indexOf('.')) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Invalid Price.' });
                    return;
                }


                if (this.StringNullOrEmpty(uom.trim())) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'UOM should not be empty.' });
                    return;
                }

                if (!rowData.isVerndorCBDisable && !rowData.isVerndorChecked) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please check the review option.' });
                    return;
                }
                else if (!rowData.isDeptCBDisable && !rowData.isDeptChecked) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please check the review option.' });
                    return;
                }
                else if (!rowData.isExceptionCBDisable && !rowData.isExceptionChecked) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please check the review option.' });
                    return;
                }

                this.confirmationService.confirm({
                    message: 'Once saved cannot be edited, are you sure you want to continue?',
                    accept: async () => {
                        if (bVendorValueFromDB != rowData.isVerndorChecked) {


                            this.spinnerService.start();

                            await this.UpdateConsignmentItemOrderReports(transID, itemID, rowData.isVerndorChecked, false, false, Number(itemPrice), rowData.WORKFLOW_INSTANCE_ID, Item_POU_Workflow_Review_Status[Item_POU_Workflow_Review_Status.VENDOR_REVIEW_STATUS].toString(), uom, deptID, lotID, serialID, lineNO, comments, rowData);

                            this.spinnerService.stop();



                        }
                        else if (bApproverValueFromDB != rowData.isDeptChecked) {
                            this.spinnerService.start();

                            await this.UpdateConsignmentItemOrderReports(transID, itemID, rowData.isVerndorChecked, rowData.isDeptChecked, false, Number(itemPrice), rowData.WORKFLOW_INSTANCE_ID, Item_POU_Workflow_Review_Status[Item_POU_Workflow_Review_Status.DEPT_REVIEW_STATUS].toString(), uom, deptID, lotID, serialID, lineNO, comments, rowData);

                            this.spinnerService.stop();
                        }
                        else if (bReviewerValueFromDB != rowData.isExceptionChecked) {
                            this.spinnerService.start();

                            await this.UpdateConsignmentItemOrderReports(transID, itemID, rowData.isVerndorChecked, true, rowData.isExceptionChecked, Number(itemPrice), rowData.WORKFLOW_INSTANCE_ID, Item_POU_Workflow_Review_Status[Item_POU_Workflow_Review_Status.EXCEPTION_REVIEW_STATUS].toString(), uom, deptID, lotID, serialID, lineNO, comments, rowData);
                            this.spinnerService.stop();
                        }
                    }
                });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async UpdateConsignmentItemOrderReports(transID, itemID, vendorResponse, approverResponse, reviewerResponse, itemPrice, workflowInstanceID, responseFrom, uom, deptID, lotID, serialID, lineNO, comments, rowData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS) {
        try {
            this.growlMessage = [];

            if (this.StringNullOrEmpty(comments)){
                comments = "";
            }
            await this.manageConsignedItemOrderReportServices.UpdateConsignmentItemOrderReports(transID, itemID, vendorResponse, approverResponse, reviewerResponse, Number(itemPrice), workflowInstanceID, responseFrom, uom, deptID, lotID, serialID, lineNO, comments).then(async res => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.spinnerService.stop();
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                        this.expandedItems = [];
                        await this.getItemData();
                        this.expandedItem = asEnumerable(this.lstGridFilterHdrData).Where(x => x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID).FirstOrDefault();
                        this.expandedItems.push(this.expandedItem);
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
            this.clientErrorMsg(ex)
        }

    }

    async search_click(rowData: VM_MT_POU_CONSIGNEDBILLONLY_ITEMS) {
        try {
            this.growlMessage = [];
            this.vendorID = rowData.VENDOR_ID;
            this.transID = rowData.TRANSACTION_ID;            
            if (!this.StringNullOrEmpty(rowData.ITEM_ID)) {
                this.spinnerService.start();
                await this.manageConsignedItemOrderReportServices.SearchInERPItemMaster(rowData.ITEM_ID).then((res:Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList != null || data.DataList != undefined) {
                                if (data.DataList.length == 1) {
                                    this.lookUpData = data.DataList[0];
                                    this.lookUpData.ACTUAL_ITEM_ID = '';
                                    this.lookUpData.TRANSACTION_ID = rowData.TRANSACTION_ID;
                                    this.lookUpData.VENDOR_ID = rowData.VENDOR_ID;
                                    this.lookUpData.REVEIWER_TYPE = 'Department Review';
                                    rowData.ITEM_ID = this.lookUpData.ITEMID;
                                    rowData.ISSUE_PRICE = this.lookUpData.ITEM_PRICE;
                                    rowData.UOM = this.lookUpData.UOM;
                                    rowData.SHORT_DESCR = this.lookUpData.ITEM_DESCR;
                                }
                                else if (data.DataList.length > 1) {
                                    this.breadCrumbMenu.SUB_MENU_NAME = 'LookUp Items';
                                    this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                                    this.rowData = rowData;
                                    this.page = false;
                                    this.mainGrid = false;
                                    this.lookUpPopUp = true;
                                    this.lookUpGrid = true;
                                    this.lstLookUpData = data.DataList;
                                    this.btnLookUpSaveVisble = true;
                                    this.btnLookUpSaveDisble = true;
                                    this.itemId = '';
                                }
                            }


                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            setTimeout(function () {
                                let lookUpItem = <HTMLInputElement>document.getElementById(rowData.TRANSACTION_ID.toString());
                                lookUpItem.focus();
                            }, 500);
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
                this.spinnerService.stop();
            }
            else {
                this.breadCrumbMenu.SUB_MENU_NAME = 'LookUp Items';
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.rowData = rowData;
                this.lstLookUpData = [];
                this.lookUpData = null;
                this.lookUpPopUp = true;
                this.lookUpGrid = false;
                this.page = false;
                this.mainGrid = false;
            }
            this.expandedItems = [];
            this.expandedItem = asEnumerable(this.lstGridFilterHdrData).Where(x => x.VENDOR_ID == rowData.VENDOR_ID && x.TRANSACTION_ID == rowData.TRANSACTION_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID).FirstOrDefault();
            this.expandedItems.push(this.expandedItem);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    async btnLookUp_Click() {
        try {
            this.growlMessage = [];
            this.lookUpGrid = false;
            this.btnLookUpSaveVisble = false;
            this.btnLookUpSaveDisble = true;
            if (this.StringNullOrEmpty(this.itemId)) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter search text' });
                return;
            }
            if (!this.StringNullOrEmpty(this.itemId)) {
                this.spinnerService.start();
                await this.manageConsignedItemOrderReportServices.SearchInERPItemMaster(this.itemId).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList != null || data.DataList != undefined) {
                                if (data.DataList.length > 0) {
                                    this.lookUpGrid = true;
                                    this.btnLookUpSaveVisble = true;
                                    this.btnLookUpSaveDisble = true;
                                    this.lstLookUpData = data.DataList;
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
                this.spinnerService.stop();
            }

        }
        catch (ex) {

        }
    }

    rdBtnItem_Click(rowData: VM_SEARCHITEM_DETAILS) {
        try {
            this.growlMessage = [];
            this.lookUpData = null;
            this.lookUpData = rowData;
            this.lookUpData.ACTUAL_ITEM_ID = '';
            this.lookUpData.ITEMID = this.lookUpData.ITEMID == '&nbsp;' ? '' : this.lookUpData.ITEMID;
            this.lookUpData.CUST_ITEM_ID = this.lookUpData.CUST_ITEM_ID == '&nbsp;' ? '' : this.lookUpData.CUST_ITEM_ID;
            this.lookUpData.ITEM_DESCR = this.lookUpData.ITEM_DESCR == '&nbsp;' ? '' : this.lookUpData.ITEM_DESCR;
            this.lookUpData.MFG_ITEM_ID = this.lookUpData.MFG_ITEM_ID == '&nbsp;' ? '' : this.lookUpData.MFG_ITEM_ID;
            this.lookUpData.VENDOR_ITEM_ID = this.lookUpData.VENDOR_ITEM_ID == '&nbsp;' ? '' : this.lookUpData.VENDOR_ITEM_ID;
            this.lookUpData.UPCID = this.lookUpData.UPCID == '&nbsp;' ? '' : this.lookUpData.UPCID;
            this.lookUpData.GTIN = this.lookUpData.GTIN == '&nbsp;' ? '' : this.lookUpData.GTIN;
            this.lookUpData.TRANSACTION_ID = this.transID;
            this.lookUpData.VENDOR_ID = this.vendorID;
            this.lookUpData.REVEIWER_TYPE = 'Department Review';
            this.btnLookUpSaveDisble = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    btnLookUpSave_Click() {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu)); 
            this.growlMessage = [];

            this.lookUpPopUp = false;
            this.lookUpGrid = false;
            this.page = true;
            this.mainGrid = true;
            if (this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].TRANSACTION_ID == this.rowData.TRANSACTION_ID) {

                this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].ITEM_ID = this.lookUpData.ITEMID;
                this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].ISSUE_PRICE = this.lookUpData.ITEM_PRICE;
                this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].UOM = this.lookUpData.UOM;
                this.lstGridFilterHdrData[this.rowData.parentRIndex].DETAILS[this.rowData.childRIndex].SHORT_DESCR = this.lookUpData.ITEM_DESCR;
            }
            this.btnLookUpSaveVisble = false;
            this.btnLookUpSaveDisble = true;
            this.itemId = '';
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    btnLookUpCancel_Click() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.lookUpPopUp = false;
        this.lookUpGrid = false;
        this.btnLookUpSaveDisble = true;
        this.btnLookUpSaveVisble = true;
        this.page = true;
        this.mainGrid = true;
        this.lookUpData = null;
        this.itemId = '';
    }

    txtbox_KeyPress(e) {
        this.growlMessage = []
        var charCode = (e.which) ? e.which : e.keyCode;
        if (charCode < 65 || charCode > 90) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Use only letters (A-Z) and no spaces' });
            return false;
        }
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    StringNullOrEmpty(inputString: Object): boolean {
        if (inputString == null || inputString == '' || inputString == undefined) {
            return true;
        } else {
            return false;
        }
    }

    getDateFormat(date) {
       
            var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();     
            var mm = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var yyyy = date.getFullYear();
            var  hours  =  date.getHours()  <  10  ?  "0"  +  date.getHours()  :  date.getHours();
            var  minutes  =  date.getMinutes()  <  10  ?  "0"  +  date.getMinutes()  :  date.getMinutes();
            var  seconds  =  date.getSeconds()  <  10  ?  "0"  +  date.getSeconds()  :  date.getSeconds();
            var time = hours + ":" + minutes + ":" + seconds;
            var dateFormat = mm + "/" + dd + "/" + yyyy + ' ' + time;
            return dateFormat;
    };
    
   
}