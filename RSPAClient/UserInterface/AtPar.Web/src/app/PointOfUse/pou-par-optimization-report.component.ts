
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { StatusType, TokenEntry_Enum, YesNo_Enum, DataSet_Type, BusinessType, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message, SelectItem } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_POU_DEPT_USER_ALLOCATIONS } from '../Entities/MT_POU_DEPT_USER_ALLOCATIONS';
import { MT_CRCT_USER_ALLOCATION } from '../Entities/MT_CRCT_USER_ALLOCATION';
import { VM_PAR_OPTIMIZATION_DETAILS } from '../Entities/VM_PAR_OPTIMIZATION_DETAILS';
import { VM_CART_DETAILS } from '../Entities/VM_CART_DETAILS';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Menus } from '../AtPar/Menus/routepath';
import { ParOptimizationReportService } from './pou-par-optimization-report.service';
import { saveAs } from 'file-saver';

declare var module: {
    id: string;
}


@Component({

    templateUrl: 'pou-par-optimization-report.component.html',
    providers: [AtParCommonService, AtParConstants, ParOptimizationReportService]
})


export class ParOptimizationReportComponent implements OnInit {
    /*Varaible Declaration*/
    bunit: any;
    isVisible: boolean = false;
    selectedPercentage: string = "";
    gEditParUserParamval: string = "";
    selectedCartId: string = "";
    selectedBunit: string = "";
    gstrProtocal: string = "";
    gstrServerName; string = "";
    gstrPortNo: string = "";
    strParQty: string = "";
    strPrice: string = "";
    ipAddress: string = "";
    toMailAddr: string = '';
    selectedDeptId: string = "";
    lblCurrentval: string = "";
    lblRecommendedVal: string = "";
    lblNetReductionVal: string = "";
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
    isLblVisible: boolean = false;
    isVisibleEdiTxt: boolean = false;
    isVisibleBtnUpdate: boolean = false;
    isVisibleRowFooter: boolean = false;
    breadCrumbMenu: Menus;
    fromDate: Date;
    toDate: Date;
    currentDate: Date;
    _fromDate: Date;
    _toDate: Date;
    bunitsData: any[] = [];
    lstBunits: SelectItem[] = [];
    deviceTokenEntry: string[] = [];
    lstCartHeader: VM_PAR_OPTIMIZATION_DETAILS[] = [];
    _tblCartDetails: VM_PAR_OPTIMIZATION_DETAILS[] = [];
    dicDataItems: any[] = [];
    lstPreReqData: string[] = [];
    growlMessage: Message[] = [];
    lstDBData: VM_PAR_OPTIMIZATION_DETAILS[] = [];
    lstCheckdata:VM_PAR_OPTIMIZATION_DETAILS[] = [];
    lstChkItemdetails: Array<VM_PAR_OPTIMIZATION_DETAILS>;
    lstFilterData: VM_PAR_OPTIMIZATION_DETAILS[] = [];
    sortedcheckedrec: VM_PAR_OPTIMIZATION_DETAILS[] = [];
    sorteduncheckedrec: VM_PAR_OPTIMIZATION_DETAILS[] = [];
    lstCartDetails: VM_PAR_OPTIMIZATION_DETAILS[] = [];
    dataCheckedSorting: VM_PAR_OPTIMIZATION_DETAILS[] = [];
    dataUncheckedSorting: VM_PAR_OPTIMIZATION_DETAILS[] = [];
    headers: VM_PAR_OPTIMIZATION_DETAILS;

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
        private parOptimizationReportService: ParOptimizationReportService
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
    * Init Function for Populate Bunits to the dropdown when page loading and getMyPreferences,getProfileParamValue.
    */
    async  ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.strUserId = this.deviceTokenEntry[TokenEntry_Enum.UserID];
        this.page = true;
        this.lstCartDetails = new Array<VM_PAR_OPTIMIZATION_DETAILS>();
        this.lstChkItemdetails = new Array<VM_PAR_OPTIMIZATION_DETAILS>();
        this.dataCheckedSorting = new Array<VM_PAR_OPTIMIZATION_DETAILS>();
        this.dataUncheckedSorting = new Array<VM_PAR_OPTIMIZATION_DETAILS>();
        this.lstFilterData = new Array<VM_PAR_OPTIMIZATION_DETAILS>();
        this.lstCartHeader = new Array<VM_PAR_OPTIMIZATION_DETAILS>();
        this.headers = new VM_PAR_OPTIMIZATION_DETAILS();
                
        try {
            this.spinnerService.start();
            this.statusCode = -1;
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

            this.lstBunits.push({ label: "Select Bunit", value: "" })
            await this.populateBussinessUnits();
            this.currentDate = new Date();
            this.toDate = new Date();
            this.fromDate = new Date();
            if (this.defDateRange.toString() != '' && this.defDateRange != null) {
                this.fromDate = await this.addDays(this.fromDate, -this.defDateRange);
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
    * This method is calling when user selecting  Bunit in  Bunit dropdown
    */
    ddlBUnitChanged() {
        this.growlMessage = [];       
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
                if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                    this.isVisible = false;
                    this.tdExports = false;
                    this.isLblVisible = false;
                    return false;

                }

                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                    return false;
                }               
               
                else {

                    
                    if (this.selectedCartId == "" && this.selectedDeptId == "") {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "DeptID or Par Location is mandatory" });
                        this.isVisible = false;
                        this.tdExports = false;
                        this.isLblVisible = false;
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

    async populateBussinessUnits() {
        this.growlMessage = [];
        this.bunit = BusinessType.Inventory;
        try {
            await this.commonService.getBusinessUnits(this.strUserId, this.bunit).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    if (data.StatusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                        this.isVisible = false;
                        return;
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.bunitsData = data.DataList;
                            this.lstBunits = [];
                            this.lstBunits.push({ label: "Select Bunit", value: "" })
                            for (var i = 0; i <= this.bunitsData.length - 1; i++) {
                                this.lstBunits.push({ label: this.bunitsData[i], value: this.bunitsData[i] })
                            }
                            break;

                        }
                        case StatusType.Warn: {
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units"});
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
            this.clientErrorMsg(ex);
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
            this.growlMessage = [];
            this.isVisibleBtnUpdate = false;
            this.spinnerService.start();
            let currentValue = 0;
            let recommendedVal = 0;
            let netReductionValue = 0;
            let returnValue: boolean = false;
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

    /**
    * This method is calling when "Edit_Par"  profileParameter is checked  
    */
    EditModeEnable() {
        this.isVisibleChkBox = true;
        this.isVisibleEdiTxt = true;
        this.isVisibleBtnUpdate = true;
    }

    async  bindDataGrid() {
        this.growlMessage = [];
        this.strParQty = "";
        this.strPrice = "";
        this.lblRecommendedVal = "";
        this.lblNetReductionVal = "";
        this.lblCurrentval = "";
        let currentValue = 0;
        let recommendedVal = 0;
        let netReductionValue = 0;
        let deptData: any[];
        this.cartIdValue = this.selectedCartId.split(" - ")[0];
        let cDate = new Date();
        cDate.setDate(this.toDate.getDate() + 1);
        let fromDate: string = await this.convertDateFormate(this.fromDate);
        let toDate: string = await this.convertDateFormate(cDate);

        await this.commonService.getUserDepartments(this.strUserId, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry)
            .catch(this.httpService.handleError).
            then((res: Response) => {

                let data = res.json() as AtParWebApiResponse<MT_POU_DEPT_USER_ALLOCATIONS>;
                deptData = data.DataList;
                this.statusCode1 = data.StatusCode;
            });

        if (this.statusCode1 == AtparStatusCodes.ATPAR_OK) {
            if (deptData.length > 0) {
                await this.parOptimizationReportService.getOptimizationReport(this.selectedBunit, this.selectedDeptId, this.cartIdValue, fromDate, toDate, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], EnumApps.PointOfUse)
                    .catch(this.httpService.handleError)
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<VM_PAR_OPTIMIZATION_DETAILS>;
                        this.spinnerService.stop();
                        this.statusCode = data.StatusCode;

                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.lstDBData = [];
                                this.lstCartDetails = data.DataList;
                                if (this.lstCartDetails.length > 0) {
                                    this.tdExports = true;
                                    this.isVisible = true;
                                    this.isVisibleRowFooter = true;
                                    this.isLblVisible = true;
                                    this.lblNoofRecords = this.lstCartDetails.length;
                                    for (let i = 0; i <= data.DataList.length - 1; i++) {
                                        this.lstCartDetails[i].AVGUSAGE = parseFloat(data.DataList[i].AVGUSAGE).toFixed(2);
                                        this.lstCartDetails[i].MINUSAGE = parseFloat(data.DataList[i].MINUSAGE).toFixed(2);
                                        this.lstCartDetails[i].TOTUSAGE = parseFloat(data.DataList[i].TOTUSAGE).toFixed(2);
                                        this.lstCartDetails[i].PAR_VALUE = parseFloat(data.DataList[i].PAR_VALUE).toFixed(2);
                                        this.lstCartDetails[i].MAXUSAGE = parseFloat(data.DataList[i].MAXUSAGE).toFixed(2);
                                    }

                                    if (this.noOfRecords == 0) {
                                        this.recordsPerPage = this.lstCartDetails.length;
                                    }
                                    else {
                                        this.recordsPerPage = this.noOfRecords;
                                    }

                                    if (this.gEditParUserParamval == "Y") {
                                        this.EditModeEnable();
                                    }

                                    for (let i = 0; i <= this.lstCartDetails.length - 1; i++) {

                                        if (this.lstCartDetails[i].PRICE != null || this.lstCartDetails[i].PRICE != "") {
                                            currentValue = currentValue + (parseFloat(this.lstCartDetails[i].PAR_VALUE)) * (parseFloat(this.lstCartDetails[i].PRICE))
                                            recommendedVal = recommendedVal + (parseFloat(this.lstCartDetails[i].RECOMMENDED_PAR)) * (parseFloat(this.lstCartDetails[i].PRICE))
                                        }

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
                                }
                                else {
                                    this.growlMessage = [];
                                    this.isVisible = false;
                                    this.isVisibleBtnUpdate = false;
                                    this.tdExports = false;
                                    this.isLblVisible = false;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Info, detail: "No Data Found" });                                   
                                }

                                break;
                            }
                            case StatusType.Warn:
                                {
                                    this.growlMessage = [];
                                    this.isVisible = false;
                                    this.isVisibleBtnUpdate = false;
                                    this.tdExports = false;
                                    this.isLblVisible = false;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Info, detail: "No records were returned for the search criteria" });
                                    break;
                                }

                            case StatusType.Error: {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                this.isVisible = false;
                                this.tdExports = false;
                                this.isLblVisible = false;
                                break;
                            }
                            case StatusType.Custom: {
                                this.isVisible = false;
                                this.tdExports = false;
                                this.isLblVisible = false;
                                if (this.statusCode == AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL) {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                                else if (this.statusCode == AtparStatusCodes.CRCT_E_CARTDOESNOTEXIST) {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Info, detail: "No records were returned for the search criteria" });
                                    break;
                                }
                                else {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }

                            }

                        }
                    });
            }
            else {
                this.isVisibleBtnUpdate = false;
                this.tdExports = false;
                this.isLblVisible = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Info, detail: 'No department allocated to the user' });
                return;

            }

        }

        else if (this.statusCode1 == AtparStatusCodes.E_NORECORDFOUND) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Departments found" });
            return;
        }
        else {
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Error while getting Departments" });
            return;
        }
    }

    /**
    * This method is calling when user click on Update Button 
    */
    async btnUpdate_Click() {

        let cartId: string;
        this.growlMessage = [];        
        this.strPrevCartID = "";   
        this.lstCheckdata = [];
        this.lstCartHeader = [];
        this._tblCartDetails = [];
        this.lstPreReqData = [];
        this.headers = new VM_PAR_OPTIMIZATION_DETAILS();
        if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });            
            return ;
        }

        let dicDataItems = { "HEADER": this.lstCartHeader, "DETAILS":this. _tblCartDetails, "PREREQDATA": this.lstPreReqData[0] = " " };
        try {
            this.spinnerService.start();

            let lstChkChecked = this.lstDBData.filter(data => (data.CHK_UPDATED == 1));

            if (lstChkChecked.length <= 0)
            {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select atleast one item to update" });
                this.spinnerService.stop();
                return;
            }
           
            let lstChkQty = lstChkChecked.filter(data => data.RECOMMENDED_PAR_QTY === "");          

            if (lstChkQty.length > 0)
            {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter valid par values" });
                this.spinnerService.stop();
                return;
            }


            for (let i = 0; i <= this.lstDBData.length - 1; i++) {

                if (this.lstDBData[i].CHK_UPDATED == 1) {

                    this.lstDBData[i].CART_ID = this.lstCartDetails[i].CART_ID;
                    this.lstDBData[i].LOCATION_TYPE = this.lstCartDetails[i].LOCATION_TYPE;

                    if (this.strPrevCartID != this.lstDBData[i].CART_ID) {
                        if (dicDataItems.HEADER.length > 0) {
                            await this.update_ParQty(dicDataItems);
                            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Info, detail: "Internal Server Error" });
                                this.spinnerService.stop();
                                return;
                            }
                            dicDataItems.HEADER = [];
                            dicDataItems.DETAILS = [];                                                                                   
                        }
                        

                        this.headers.CART_ID = this.lstDBData[i].CART_ID;
                        this.headers.BUSINESS_UNIT = this.selectedBunit;
                        this.headers.USER_ID = this.strUserId;
                        dicDataItems.HEADER.push(this.headers);

                    }
                   
                        this.lstDBData[i].NEW_OPTIMAL_QUANTITY = this.lstDBData[i].RECOMMENDED_PAR_QTY;
                        this.lstDBData[i].OPTIMAL_QUANTITY = this.lstDBData[i].PAR_VALUE;
                        this._tblCartDetails.push(this.lstDBData[i]);               

                        this.strPrevCartID = this.lstDBData[i].CART_ID;
                }
                
            }


            if (dicDataItems != null) {
                if (dicDataItems.DETAILS.length > 0) {

                    await this.update_ParQty(dicDataItems);
                    if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Info, detail: "Internal Server Error" });
                        this.spinnerService.stop();
                        return;
                    }
                }                
            }

            if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                this.isLblVisible = false;
                this.isVisibleBtnUpdate = false;
                this.tdExports = false;
                this.isVisible = false;
                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully..." });
                return;
            }
            else {
                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Info, detail: "Internal server Error"});
                return;
            }
        }

        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async update_ParQty(dicDataItems: any)
    {
      
        try {         
            await this.parOptimizationReportService.UpdateParQty(dicDataItems, EnumApps.PointOfUse)
                .catch(this.httpService.handleError).
                then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_PAR_OPTIMIZATION_DETAILS>;
                    this.statusCode = data.StatusCode;                                      
                });
        }

        catch (ex) {
            this.clientErrorMsg(ex);
        }       
    }

    /**
    * This method is calling when click on CheckAll Button in Datatable
    */
    async checkAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.growlMessage = [];
            this.spinnerService.start();
            this.lstChkItemdetails = [];
            if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {


                if (this.EndIndex > this.lstFilterData.length) {
                    this.EndIndex = this.lstFilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex-1; i++) {
                    this.lstFilterData[i].checkvalue = true;
                    this.lstFilterData[i].CHK_UPDATED = 1;
                    this.lstChkItemdetails.push(this.lstFilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex-1; i++) {

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
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstFilterData != null && this.lstFilterData != undefined && this.lstFilterData.length != 0) {

                if (this.EndIndex > this.lstFilterData.length) {
                    this.EndIndex = this.lstFilterData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstFilterData[i].checkvalue = false;
                    this.lstFilterData[i].CHK_UPDATED = 0;
                    this.lstChkItemdetails.push(this.lstFilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
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
                if (this.lstChkItemdetails[i].ITEM_ID === values.ITEM_ID && this.lstChkItemdetails[i].CART_ID == values.CART_ID) {
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

    /*
    * This method is for sorting the data  based on seleted column in DataTable    
    */
    async  customSort(event) {
        var element = event;
        this.lstDBData = [];
        this.blnsortbycolumn = !this.blnsortbycolumn;
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

    async getProfileParamValue() {
        try {
            await this.commonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.PointOfUse, 'EDIT_PAR')
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.gEditParUserParamval = data.DataVariable.toString();
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
                await this.commonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Pou Par Optimization Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
                    mywindow.document.write('<html><head><title>' + 'PointOfUse - Par Optomization Report' + '</title>');
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
                saveAs(blob, "pou_par_optimization_report.xls");
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
            let _DS: VM_PAR_OPTIMIZATION_DETAILS[] = [];
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
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Item Par Optimization Report between <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }

            else if (reqType == 'Excel') {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Item Par Optimization Report <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"
            }

            else {
                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Item Par Optimization Report <b>" + this.convertDateFormate(this.fromDate) + "</b> and  <b>" + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"
            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"               
                + "<tr bgcolor=#d3d3d3>"
                + "<td align=center  nowrap><span class=c3><b>Par Location</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Item ID</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Item Description</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Price($)</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Par Value</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Max Usage</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Min Usage</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Avg Usage</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Total Usage</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Total Order Quantity</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>% Change</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Recommended Par</b></span></td>"
                + "</tr>";



            if (this.lstDBData != null) {

                if (reqType == 'Excel') {
                    await this.lstDBData.forEach(header => {
                        htmlBuilder += "<tr>"

                        if (header.CART_ID == null && header.CART_ID == "") {
                            htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + + "&nbsp;</td>"
                        }
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CART_ID + "&nbsp;</td>"
                            + "<td align= left nowrap> <span class=c2>" + "'" + header.ITEM_ID + "</span></td>"
                            + "<td bgcolor=#ffffff align= left >&nbsp;" + header.DESCR + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff align= left nowrap>&nbsp;" + header.COMPARTMENT + "&nbsp;</td>"
                            + "<td align= right nowrap> <span class=c2>" + "'" + header.PRICE + "</span></td>"
                            + "<td bgcolor=#ffffff align= left nowrap>&nbsp;" + header.UOM + "&nbsp;</td>"
                            + "<td align= right nowrap> <span class=c2>" + "'" + header.PAR_VALUE + "</span></td>"
                            + "<td align= right nowrap> <span class=c2>" + "'" + header.MAXUSAGE + "</span></td>"
                            + "<td align= right nowrap> <span class=c2>" + "'" + header.MINUSAGE + "</span></td>"
                            + "<td align= right nowrap> <span class=c2>" + "'" + header.AVGUSAGE + "</span></td>"
                            + "<td align= right nowrap> <span class=c2>" + "'" + header.TOTUSAGE + "</span></td>"
                            + "<td bgcolor=#ffffff align= right  nowrap>&nbsp;" + header.ORDER_QTY + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff align= right nowrap>&nbsp;" + header.PAR_VARIATION + "&nbsp;</td>"
                            + "<td align= right nowrap> <span class=c2>" + "'" + header.RECOMMENDED_PAR + "</span></td>"
                            + "</tr>";
                    });
                }
                else {
                    await this.lstDBData.forEach(header => {
                        htmlBuilder += "<tr>"
                        if (header.CART_ID == null && header.CART_ID == "") {
                            htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + + "&nbsp;</td>"
                        }
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CART_ID + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff >&nbsp;" + header.DESCR + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.COMPARTMENT + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PRICE + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_VALUE + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MAXUSAGE + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MINUSAGE + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.AVGUSAGE + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.TOTUSAGE + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ORDER_QTY + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_VARIATION + "&nbsp;</td>"
                            + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECOMMENDED_PAR + "&nbsp;</td>"
                            + "</tr>";
                    });
                }
            }


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
        this.lstBunits = null;
        this.lstDBData = null;
        this.bunitsData = null;
        this.growlMessage = null;
        this.cartIdValue = null;
        this.lstCartDetails = null;
        this.lstCartHeader = null;
        this.lstChkItemdetails = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.lstPreReqData = [];
        this.headers = null;
        this.lstCartHeader = null;
        this.lstCheckdata = null;
        this.lstFilterData = null;
    }
}



