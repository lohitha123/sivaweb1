
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { StatusType, TokenEntry_Enum, DataSet_Type, BusinessType, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message, SelectItem } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_CRCT_USER_ALLOCATION } from '../Entities/MT_CRCT_USER_ALLOCATION';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { saveAs } from 'file-saver';
import { Menus } from '../AtPar/Menus/routepath';
import { CartOrderHistoryReportService } from './cart-order-history-report.service';
import { VM_CART_ORDER_HISTORY_DETAILS } from '../Entities/VM_CART_ORDER_HISTORY_DETAILS';

declare var module: {
    id: string;
}

@Component({

    templateUrl: 'cart-order-history-report.component.html',
    providers: [AtParCommonService, AtParConstants, CartOrderHistoryReportService]
})

export class OrderHistoryReportComponent implements OnInit {

    /*Variable Declaration*/
    strOrgGrpId: string = "";
    orgGroupIDForDBUpdate: string = "";
    selectedOrgGroupId: string = "";
    showGrid: boolean = false;
    selectedCartId: string = "";
    strUserId: string = "";
    ipAddress: string = "";
    selectedBunit: string = "";
    cartIdValue: string = "";
    gstrProtocal: string = "";
    gstrServerName; string = "";
    gstrPortNo: string = "";
    toMailAddr: string = '';
    orgGrpIDData: string = "";
    isLblVisible: boolean = false;
    orgGrpId: string = "";
    showColumn1: boolean = false;
    showColumn2: boolean = false;
    showColumn3: boolean = false;
    showColumn4: boolean = false;
    showColumn5: boolean = false;
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupsDropdown: boolean = false;
    isVisible: boolean = false;
    isMailDialog: boolean = false;
    tdExports: boolean = false;
    itemCount: number = 0;
    breadCrumbMenu: Menus;
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    statusCode: number = -1;
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    lstOrgGroups: SelectItem[] = [];
    lstBUnits: any = [];
    lstFilteredBUnits: any = [];
    lstFilteredCartIds: any[];
    lstCartIds: any = [];
    lstDBData: Array<VM_CART_ORDER_HISTORY_DETAILS> = [];
    dynamicColumns: string[] = [];

    /**
     * Constructor
     * @param CartOrderHistoryReportService
     * @param AtParCommonService
     * @param httpService
     * @param spinnerService
     * @param AtParConstants
     */
    constructor(
        private httpService: HttpService,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private cartOrderHistoryReportService: CartOrderHistoryReportService,
        private atParConstant: AtParConstants
    ) {
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new Menus();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        } catch (ex) {
            this.clientErrorMsg(ex, 'constructor');
        }
        this.spinnerService.stop();
    }

    /**
   * Init Function for Populate Bunits to the dropdown when page loading 
   */
    async  ngOnInit() {
        this.lstFilteredCartIds = new Array<MT_CRCT_USER_ALLOCATION>();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

        try {
            this.spinnerService.start();
            await this.bindOrgGroups();
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'ngOnInit');
        }
        finally {
            this.spinnerService.stop();
        }

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
            this.clientErrorMsg(ex, 'bindOrgGroups');
        }
    }

    /**
    * This method is calling when click on Go button    
    */
    async btnGo_Click() {
        try {
            this.isVisible = false;
            this.tdExports = false;
            this.isLblVisible = false;
            this.growlMessage = []
            this.spinnerService.start();
            if ((this.blnShowOrgGroupsDropdown == true) && (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One")) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID " });                
                return;
            }
            if (this.selectedBunit == "Select Bunit" || this.selectedBunit == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });              
                return;
            }

            if (this.selectedCartId == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter CartID/Par Location" });                
                return;

            }
            await this.bindDataGrid();
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');

        }
        finally {
            this.spinnerService.stop();
        }

    }

    async  bindDataGrid() {

        this.growlMessage = [];
        this.cartIdValue = this.selectedCartId.split(" - ")[0].toUpperCase();

        if (this.blnShowOrgGroupLabel == true) {
            this.strOrgGrpId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
        }
        else {
            this.strOrgGrpId = this.selectedOrgGroupId;
        }
        try {
            await this.cartOrderHistoryReportService.getOrderHistoryRep(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedBunit, this.cartIdValue, this.strOrgGrpId, this.deviceTokenEntry[TokenEntry_Enum.ProfileID])
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.statusCode = data.StatusCode;
                    this.itemCount = <number><Number>data.DataVariable;
                    this.lstDBData = [];
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        switch (data.StatType) {
                            case StatusType.Success: {
                                if (this.itemCount > 0) {
                                    this.isLblVisible = true;
                                    this.tdExports = true;
                                    this.isVisible = true;
                                    this.lstDBData = data.DataDictionary["dtFillValues"];
                                    this.dynamicColumns = data.DataList;

                                    if (this.itemCount == 1) {
                                        this.showColumn1 = true;
                                        this.showColumn2 = false;
                                        this.showColumn3 = false;
                                        this.showColumn4 = false;
                                        this.showColumn5 = false;
                                    }
                                    else if (this.itemCount == 2) {
                                        this.showColumn1 = true;
                                        this.showColumn2 = true;
                                        this.showColumn3 = false;
                                        this.showColumn4 = false;
                                        this.showColumn5 = false;
                                    }
                                    else if (this.itemCount == 3) {
                                        this.showColumn1 = true;
                                        this.showColumn2 = true;
                                        this.showColumn3 = true;
                                        this.showColumn4 = false;
                                        this.showColumn5 = false;
                                    }
                                    else if (this.itemCount == 4) {
                                        this.showColumn1 = true;
                                        this.showColumn2 = true;
                                        this.showColumn3 = true;
                                        this.showColumn4 = true;
                                        this.showColumn5 = false;
                                    }
                                    else if (this.itemCount == 5) {
                                        this.showColumn1 = true;
                                        this.showColumn2 = true;
                                        this.showColumn3 = true;
                                        this.showColumn4 = true;
                                        this.showColumn5 = true;
                                    }
                                }
                                else {
                                    this.showColumn1 = false;
                                    this.showColumn2 = false;
                                    this.showColumn3 = false;
                                    this.showColumn4 = false;
                                    this.showColumn5 = false;
                                    this.growlMessage = [];
                                    this.isVisible = false;
                                    this.tdExports = false;
                                    this.isLblVisible = false;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                    return;
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
                                if (this.statusCode = AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                    break;
                                }

                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    }
                    else {
                        this.isVisible = false;
                        this.tdExports = false;
                        this.isLblVisible = false;

                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                        return;
                    }
                    
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'bindDataGrid');

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
            this.isLblVisible = false;
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
    * This method is calling when user selecting  Bunit in  Bunit dropdown and getting cartIds for selecting Bunit
    */
    async  ddl_ChangeBunitChanged() {
        this.growlMessage = [];
        this.selectedCartId = "";
      
        if (this.selectedOrgGroupId != "Select One" && this.selectedOrgGroupId != "" && this.selectedBunit == "" && this.isVisible == true) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
            this.isVisible = false;
            this.tdExports = false;  
            this.isLblVisible = false;
            return;
        }
        if (this.isVisible == true && this.selectedBunit == "") {
            this.isVisible = false;
            this.tdExports = false;
            this.isLblVisible = false;
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
            return;
        }
        if (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") {
            this.isVisible = false;     
            this.tdExports = false;  
            this.isLblVisible = false;     
            return;
        }
        


        try {
            this.spinnerService.start();
            await this.cartOrderHistoryReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstFilteredCartIds = data.DataList;
                            break;
                        }
                        case StatusType.Warn: {
                            this.isVisible = false;
                            this.tdExports = false;
                            this.isLblVisible = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.isVisible = false;
                            this.tdExports = false;
                            this.isLblVisible = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.isVisible = false;
                            this.tdExports = false;
                            this.isLblVisible = false;
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
            this.clientErrorMsg(ex, 'ddl_ChangeBunitChanged');
        }
        finally {
            this.spinnerService.stop();
        }

    }
    async  fillCartIdsAuto(event) {
        this.growlMessage = [];
        this.lstFilteredCartIds = [];

        if ((this.blnShowOrgGroupLabel == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == ""))) {
            return;
        }
        if ((this.blnShowOrgGroupsDropdown == true) && ((this.selectedBunit == 'Select Bunit' || this.selectedBunit == undefined || this.selectedBunit == "") || (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == "" || this.selectedOrgGroupId == undefined))) {
            return;
        }
        let query = event.query;

        try {
            this.spinnerService.start();
            await this.cartOrderHistoryReportService.getCartsForBunit(this.strUserId, this.selectedBunit, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
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
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.isVisible = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            if (data.StatusCode == AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
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
            this.clientErrorMsg(ex, 'fillCartIdsAuto');
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
    * This method is calling when user click on Mail Icon.
    * @param event
    */
    async onSendMailIconClick($event) {
        try {
            this.growlMessage= [];
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailIconClick');
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
                await this.commonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Cart Order History Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
            this.clientErrorMsg(ex,'onSendMailClick');
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
                    mywindow.document.write('<html><head><title>' + 'CartCount - Order History Report' + '</title>');
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
            this.clientErrorMsg(ex,'onPrintClick');
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
                saveAs(blob, "cart_order_history_report.xls");
            }

        } catch (ex) {
            this.clientErrorMsg(ex,'onExportToExcelClick');
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
        this.statusCode = -1;
        this.growlMessage = [];
        let sbMailText: string;
        let _strFrmDt: string;
        let _strToDt: string;
        let _DS: VM_CART_ORDER_HISTORY_DETAILS[] = [];
        let imgserverPath: string = '';
        try {

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

            imgserverPath =this.gstrProtocal + '://' +this.ipAddress + '/atpar/AtParWebApi/assets/images/';

            let title: string = '""' + "AtparVersion 2.8" + '""';

            htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == 'Print') {

                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=8 align=left><span class=c2><b> Order History Report for Business Unit/Company <b>" + this.selectedBunit + "</b>and Cart ID/Par Location <b>" + this.selectedCartId + "</b></span></td><td align=right valign=top>&nbsp;"
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }
            else if (reqType == 'Excel') {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=7 align=left><span class=c2>Order History Report for Business Unit/Company <b>" + this.selectedBunit + "</b> and Cart ID/Par Location <b>" + this.selectedCartId + " </b></span></td><td align=right valign=top>&nbsp;"

            }
            else {

                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=7 align=left><span class=c2>Order History Report for Business Unit/Company <b>" + this.selectedBunit + "</b> and Cart ID/Par Location <b>" + this.selectedCartId + " </b></span></td><td align=right valign=top>&nbsp;"
            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                + "<tr bgcolor=#d3d3d3>"
                + "<td align=center  nowrap><span class=c3><b>Item ID</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Custom Item NO</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Compartment</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Description</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Price($)</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Par Value</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>ItemType</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>UOM</b></span></td>"
            for (let i = 0; i < this.itemCount; i++) {
                htmlBuilder += "<td align=center width=6% ><span  class=c3><b>" + this.dynamicColumns[i] + "</b></span></td>"
            }
            htmlBuilder += "</tr>";

            await this.lstDBData.forEach(header => {
                htmlBuilder += "<tr>"
                    + "<td align= left nowrap> <span class=c2>" + "'" + header.ITEM_ID + "</span></td>"

                if (header.CUST_ITEM_ID != "" && header.CUST_ITEM_ID != null) {
                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CUST_ITEM_ID + "&nbsp;</td>"
                }
                else {
                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>"
                }

                if (header.COMPARTMENT != "" && header.COMPARTMENT!=" " && header.COMPARTMENT != null) {
                    htmlBuilder += "<td align= left nowrap> <span class=c2>" + "'" + header.COMPARTMENT + "</span></td>"
                }
                else {
                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + "" + "&nbsp;</td>"
                }
               
                htmlBuilder += "<td bgcolor=#ffffff >&nbsp;" + header.DESCR + "&nbsp;</td>"
                    + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.PRICE + "&nbsp;</td>"
                    + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.PAR_QTY + "&nbsp;</td>"
                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_TYPE + "&nbsp;</td>"
                    + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>"

                if (this.itemCount > 0) {
                    if (this.itemCount == 1) {
                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                    }
                    else if (this.itemCount == 2) {
                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                    }
                    else if (this.itemCount == 3) {
                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_3 + "&nbsp;</td>"
                    }
                    else if (this.itemCount == 4) {
                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_3 + "&nbsp;</td>"
                            + "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_4 + "&nbsp;</td>"
                    }
                    else if (this.itemCount == 5) {
                        htmlBuilder += "<td align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_1 + "&nbsp;</td>"
                            + "<td  align= right  bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_2 + "&nbsp;</td>"
                            + "<td  align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_3 + "&nbsp;</td>"
                            + "<td  align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_4 + "&nbsp;</td>"
                            + "<td  align= right bgcolor=#ffffff nowrap>&nbsp;" + header.DATE_5 + "&nbsp;</td>"
                    }
                }
                htmlBuilder +="</tr>";

            });
            htmlBuilder += "</table></Table>";

            return htmlBuilder;
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'ExportReportDetails');
        }
    }

    /**
    * This method is calling when user close mail dailogbox.
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
        this.dynamicColumns = null;
        this.orgGroupData = null;
    }
} 