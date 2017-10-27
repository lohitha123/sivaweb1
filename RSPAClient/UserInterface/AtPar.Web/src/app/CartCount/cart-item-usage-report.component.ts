import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Http, Response } from '@angular/http';
import { HttpServiceUtility } from '../shared/atparhttputilityservice';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { CHART_DATASET } from '../../app/Entities/CHART_DATASET';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { BusinessType } from '../Shared/AtParEnums';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { TokenEntry_Enum, ClientType, MailPriority } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { StatusType } from '../Shared/AtParEnums';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { CartItemUsageService } from '../CartCount/cart-item-usage-report.component.service';
import { Message } from '../components/common/api';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { saveAs } from 'file-saver';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'cart-item-usage-report.component.html',
    providers: [AtParCommonService, AtParConstants, CartItemUsageService]
})

export class ItemUsageReportComponent {
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    selectedOrgGroupId: string = "";
    selectedBunit: string = "";
    selectedBunitItems: string = "";
    selectedParlocation: string = "";
    orgGrpId: string = "";
    lstOrgGroups: SelectItem[] = [];
    showGrid: boolean = false;
    lstFilteredBUnits: SelectItem[] = [];
    startIndex: number;
    EndIndex: number;
    blnShowOrgGroupDD: boolean = false;
    orgGroupIDForDBUpdate: string;
    fromDate: Date;
    toDate: Date;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    defDateRange: number = 0;
    statusCode: number = -1;
    lstItemIds: any = [];
    selectedItemId: string = "";
    lstItemIdsData: any = [];
    lstDBData: any = [];
    lstDBTableData: any = [];
    data: any = [];
    dataSetlabel: string[] = [];
    dataSetbgcolor: string[] = [];
    dataSetbordercolor: string[] = [];
    dataSetdata: number[] = [];
    lineColors: string[] = [];
    label: string[] = [];
    chartDataSet: CHART_DATASET[] = [];
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    tdExports: boolean = false;
    bunitFlag: boolean = false;
    item: string='';
    bUnit: string='';
    cartId: string='';
    updateDateTime: any;
    orgGroupId: string='';
    CustItemId: string;

    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private cartItemUsageService: CartItemUsageService,
        private route: ActivatedRoute
    ) {
    }
    async ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.bindOrgGroups();
        this.statusCode = await this.getDefDateRange();
        if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
            return;
        }
        this.fromDate = new Date();
        this.fromDate = await this.addDays(this.fromDate, this.defDateRange);
        this.toDate = new Date();

        
        this.route.queryParams.subscribe(params => {
            this.item = decodeURI(params["p2value"]).replace(/%20/g, ' ');
            this.orgGroupId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
            this.updateDateTime = decodeURI(params["p4value"]).replace(/%20/g, ' ');
            this.cartId = decodeURI(params["p5value"]).replace(/%20/g, ' ');
            this.bUnit = decodeURI(params["p6value"]).replace(/%20/g, ' ');
        });
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(JSON.parse(localStorage.getItem('bcMenu')) as Menus));
        if (this.bUnit != null && this.bUnit != '' && this.bUnit != "undefined" && this.item != null && this.item != '' && this.item != "undefined" && this.cartId != null && this.cartId != '' && this.cartId != "undefined" && this.updateDateTime != null && this.updateDateTime.toString() != '' && this.orgGroupId != null && this.orgGroupId != '' && this.orgGroupId != "undefined") {
            this.selectedOrgGroupId = this.orgGroupId;
            this.selectedBunit = this.bUnit;
            this.selectedParlocation = this.cartId;
            //this.updateDateTime = new Date(this.updateDateTime).toLocaleDateString();
            
            var dateStr = new Date(this.updateDateTime).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            this.fromDate = new Date(dateStr);
            this.selectedItemId = this.item;
            await this.bindGrid();
        }
    }
    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.populateBusinessUnits();
                                this.spinnerService.stop();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                this.lstFilteredBUnits = [];
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async populateBusinessUnits(): Promise<boolean> {
        this.spinnerService.start();
        let isOrgBUnitsExist: boolean = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    this.lstFilteredBUnits = [];
                    this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" })
                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstFilteredBUnits.push({
                                    label: data.DataList[i].toString(),
                                    value: data.DataList[i].toString()
                                })
                            }
                            isOrgBUnitsExist = true;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
            return Promise.resolve(isOrgBUnitsExist);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBusinessUnits");
        }
    }

    async ddlOrgGrpIdChanged() {
        this.growlMessage = [];
        this.showGrid = false;
        if (this.selectedOrgGroupId == "Select One") {
            this.lstFilteredBUnits = [];
            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
            return;
        }
        this.spinnerService.start();
        try {
            this.selectedBunit = "";
            this.populateBusinessUnits();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    async getDefDateRange() {
        try {
            await this.commonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    if (data.StatType == StatusType.Success) {
                        this.defDateRange = parseInt(data.DataVariable.toString());
                    }
                    this.statusCode = data.StatusCode;
                    if (data.StatType == StatusType.Error) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                        return;
                    }
                });
            return await this.statusCode;

        }
        catch (ex) {
            return await AtparStatusCodes.E_SERVERERROR;
        }
    }

    addDays(theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    }

    onfocusFromCalendar(e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    }

    onfocusToCalendar(e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        } else {
            this.minDateValue2 = this.date1;
        }
    }

    async onGoClick() {
        let isValidate: boolean;
        try {
            this.showGrid = false;
            //this.lstCaseInfo = [];
            isValidate = await this.validateSearchFields();
            this.spinnerService.start();
            if (isValidate) {
                //await this.BindGrid();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onGoClick");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    validateSearchFields() {
        try {

            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convert(this.fromDate)) > Date.parse(this.convert(this.toDate))) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be greater than From Date" });
                    return false;
                }
            }
            else {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex, "validateSearchFields");
            return false;
        }
    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    async fillItemIdsAuto(event) {
        this.lstItemIdsData = [];
        this.lstItemIds = [];
        let query = event.query;
        try {
            await this.cartItemUsageService.GetCartItemInfo(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.selectedBunit, this.selectedParlocation, this.deviceTokenEntry[TokenEntry_Enum.UserID].toString(), this.deviceTokenEntry[TokenEntry_Enum.ProfileID].toString()).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstItemIdsData = data.DataList;
                            this.lstItemIds = this.filterItemIds(query, this.lstItemIdsData);
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.growlMessage = [];
                            }
                            else {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "fillItemIdsAuto");
        }
    }

    filterItemIds(query, items: any[]) {
        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if (items[i].CODE !== "") {
                    let itemValue = items[i].CODE + " - " + items[i].DESCRIPTION;
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].CODE.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if (items[i].CODE !== "") {
                            let itemValue = items[i].CODE + " - " + items[i].DESCRIPTION;
                            filtered.push(itemValue);
                        }

                    }
                }
            }
        }
        return filtered;
    }

    async bindGrid() {
        //this.selectedItemId = "000000000000030026";
        if (this.blnShowOrgGroupDD == true)
        {
            if (this.selectedOrgGroupId === "Select One")
            {
                this.selectedOrgGroupId = "";
            }
            if (this.selectedOrgGroupId === "" || this.selectedOrgGroupId == undefined)
            {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                return;
            }
        }
        if (this.selectedItemId == undefined || this.selectedItemId === "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Item ID" });
            return;
        }

        if (this.selectedBunit==="") {
            //  Generating comma separated BUs list to send to the SP so as to get the respective data
            this.selectedBunitItems = "";
            if ((this.lstFilteredBUnits.length > 1)) {
                for (let i: number = 1; (i
                    <= (this.lstFilteredBUnits.length - 1)); i++) {
                    if ((this.selectedBunitItems === "")) {
                        this.selectedBunitItems = ("'" + this.lstFilteredBUnits[i].value);
                    }
                    else {
                        this.selectedBunitItems = (this.selectedBunitItems + ("','" + this.lstFilteredBUnits[i].value));
                    }

                }

                this.selectedBunitItems = (this.selectedBunitItems + "'");
            }
            

        }
        else {
            this.selectedBunitItems = "";
            this.selectedBunitItems = ("'"
                + (this.selectedBunit + "'"));
        }


        this.showGrid = false;
        this.spinnerService.start();
        let frmDate = this.convert(this.fromDate);
        let todate = this.convert(this.toDate);
        try {
            await this.cartItemUsageService.GetItemUsageDetails(this.selectedItemId, frmDate, todate, this.selectedBunitItems, this.selectedParlocation, this.deviceTokenEntry[TokenEntry_Enum.UserID]
            ).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];

                switch (data.StatType) {
                    case StatusType.Success: {
                        this.showGrid = true;
                        this.tdExports = true;
                        this.lstDBData = [];
                        this.lstDBData = data.DataDictionary["pdsCartDetails"]["Table1"];
                        this.lstDBTableData = data.DataDictionary["pdsCartDetails"]["Table2"];
                        this.CustItemId = this.lstDBData[0].CUST_ITEM_NO;
                        this.lineColors = ["#00FF00", "#0000FF"];
                        this.dataSetbgcolor = [];
                        this.dataSetdata = [];
                        this.dataSetbordercolor = [];
                        var dataParQty = [];
                        var dataUsedQty = [];
                        var dataForInsideTable = [];
                        this.label = [];
                        console.log(data);
                        for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                            var dateObj = new Date(this.lstDBData[i].COUNTDATE);
                            var month = dateObj.getMonth() + 1; //months from 1-12
                            var day = dateObj.getDate();
                            var sDay = day.toString();
                            var Hours = dateObj.getHours();
                            var ampm = "";
                            if (Hours <= 12) {
                                ampm = "am";
                            }
                            else {
                                ampm = "mm";
                            }
                            if (day < 10) {
                                sDay = "0" + sDay;
                            }
                            var dayName = days[dateObj.getDay()];
                            this.lstDBData[i].COUNTDATE = month + "/" + sDay;
                            this.lstDBData[i].COUNTDATEFORINSIDETABLE = month + "/" + sDay + "(" + dayName.substring(0, 3) + " " + ampm + ")";
                            this.label.push(this.lstDBData[i].COUNTDATE);
                            dataParQty.push(this.lstDBData[i].PAR_QTY);
                            dataUsedQty.push(this.lstDBData[i].ORDER_QTY);

                        }
                        this.chartDataSet = [];
                        this.chartDataSet.push({ label: 'Par Qty', backgroundColor: '', borderColor: '#00FF00', data: dataParQty, fill: false });
                        this.chartDataSet.push({ label: 'Used Qty', backgroundColor: '', borderColor: '#0000FF', data: dataUsedQty, fill: false });

                        this.data = [];
                        this.data = {
                            labels: this.label,
                            datasets: this.chartDataSet
                        }
                        //this.selectedBunit = this.selectedBunit.replace("'", "");
                        console.log(this.data);
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        this.selectedItemId = "";
                        this.selectedOrgGroupId = "";
                        this.selectedParlocation = "";
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Error: {
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        this.selectedItemId = "";
                        this.selectedOrgGroupId = "";
                        this.selectedParlocation = "";
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Custom: {
                        this.showGrid = false;
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        this.selectedItemId = "";
                        this.selectedOrgGroupId = "";
                        this.selectedParlocation = "";
                        this.spinnerService.stop();
                        break;
                    }
                }

            });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindGrid");
        }
    }

    async onSendMailIconClick(event) {
        try {
            this.growlMessage = [];
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex, "onSendMailIconClick");
        }
    }

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
            let html: string = await this.exportReportDetails('Mail');
            let toAddr: string = '';

            if (html != '' && html != null) {
                await this.commonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Cart Count Item Usage Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
            this.clientErrorMsg(ex,"onSendMailClick");
        }
        finally {

            this.spinnerService.stop();
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {

                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');

               if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Car Count - Item Usage Report' + '</title>');
                    mywindow.document.write('</head><body >');
                    mywindow.document.write(html);
                    mywindow.document.write('</body></html>');

                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/

                    mywindow.print();
                    mywindow.close();

                    return true;
                } else {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "onPrintClick");
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');
            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "CartCountItemUsageReport.xls");
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "onExportToExcelClick");
        }
        finally {
            this.spinnerService.stop();
        }
    }


    async exportReportDetails(reqType: string) {

        var chartImage = document.getElementById("ChartId") as HTMLCanvasElement;
        var image = chartImage.toDataURL("image/png");
        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
        await this.commonService.saveImage(image, "ItemUsage").
            catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                switch (data.StatType) {
                    case StatusType.Success: {

                        break;
                    }
                    case StatusType.Warn: {

                        break;
                    }
                    case StatusType.Error: {

                        break;
                    }
                    case StatusType.Custom: {

                        break;
                    }
                }

            });

        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.growlMessage = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;

            let imgserverPath: string = '';
            let imgPhyUsagePath: string = '';

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

            let phyname;
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
            imgPhyUsagePath = this.httpService.BaseUrl + '/Uploaded/'; 

            let strTitle: string = "\"" + "AtparVersion2.4.4" + "\"";
            let title: string = '""' + "AtparVersion 2.8" + '""';

            htmlBuilder += "<table width='100%'>";        


            htmlBuilder += "<tbody><tr><td align='left'> <table width='100%'><tbody><tr><td width='100%' align='left' height='63'><table align='left' width='100%' cellpadding='0' cellspacing='0' valign='top'><tbody><TR height=63><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR><tr><td height='27' valign='bottom' width='100%' align='left' colspan='2'><font size='1' style='COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt'><b>&nbsp;&nbsp;Mobile Supply Chain Execution<b></b></b></font></td></tr><tr><td colspan='2'>&nbsp;</td></tr><tr><td colspan='2'><table align='left' width='90%' border='0'><tbody><tr><td></td></tr><tr><td colspan='5' align='left'><span class='c2'><span class='c2'>Cart Count Item Usage Report of  <b>" + this.selectedBunit + "</b> From   <b>" + this.convertDateFormate(this.fromDate) + "</b> to <b>" + this.convertDateFormate(this.toDate) + " </b></span></span></td><td align='right' valign='top'>&nbsp;"

            htmlBuilder += "</td></tr > <tr height='20' > </tr></tbody> </table></td> </tr>"
            htmlBuilder += "<tr><td colspan='2' height= '20' > <table width='99%' > <tbody><tr><td><table align='left' width= '99%' > <tbody><tr><td align='left' colspan= '3'> <span class='c2'> Item ID &nbsp; &nbsp; " + this.lstDBTableData[0].ITEM_ID + " </span> </td> <td align='left' > <span class='c2' > Custom Item NO &nbsp; &nbsp;" + this.lstDBTableData[0].ITEM_ID + " </span> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> "
            htmlBuilder += "<tr> <td colspan='2' > <table align='left' width= '99%' style='BORDER-COLLAPSE:collapse' border= '1' > <tbody>"
            htmlBuilder += "<tr width= '100%' bgcolor= '#ffffff'>"

            htmlBuilder += "<td align=center nowrap= '' width= '100%' > <span class='c3'> <table cellspacing='0' cellpadding= '2' style= 'border-color:#D3D3D3;width:100%;border-collapse:collapse;'>"
           
            htmlBuilder += "<tbody><tr style='width:100%;'>";
            htmlBuilder += "<td class='' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Business Unit/Company </td><td class='' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].BUSINESS_UNIT + "</td><td class='' colspan='2' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Cart ID/Par Location </td><td class='' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].CART_ID + "</td>";
            htmlBuilder += "</tr><tr style='width:100%;'>";
            htmlBuilder += "<td class='' colspan='4' style='border-color:#BFBFBF;border-width:1px;border-style:solid;' align='center'><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgPhyUsagePath + "ItemUsage.png></div></td><td class='' valign='top' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:25%;'><table cellspacing='0' cellpadding='2' style='border-color:#D3D3D3;border-collapse:collapse;'>";
            htmlBuilder += "<tbody><tr style='width:100%;'>";
            htmlBuilder += "<td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>Date</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:25%;'>Par Qty</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:28%;'>Used Qty</td>"
            htmlBuilder += "</tr>";
            for (let i = 0; i <= this.lstDBData.length - 1; i++)
            {
                htmlBuilder += "<tr style='width:100%;'>";
                htmlBuilder += "<td class='Remarks' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>" + this.lstDBData[i].COUNTDATEFORINSIDETABLE +"</td>";
                htmlBuilder += "<td class='Remarks' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>" + this.lstDBData[i].PAR_QTY + "</td>";
                htmlBuilder += "<td class='Remarks' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:47%;white-space:nowrap;'>" + this.lstDBData[i].ORDER_QTY + "</td></tr>";
            }

            
            htmlBuilder += "</tbody></table></td></tr>";
            htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> </td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Qty</td> <td class='' align= 'left' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;' > Item Description</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'>Date</td > <td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:25%;' ></td></tr>";
            htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> Min Item Usage</td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].MIN_USAGE + "</td > <td class='SearchLabel' align= 'left' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'> " + this.lstDBTableData[0].ITEM_DESC + "</td><td class='SearchLabel' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].UPDATE_DATE +" </td><td class='SearchLabel' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'></td ></tr>";
            htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> Max  Item Usage </td><td class='' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].MAX_USAGE + "</td > <td class='SearchLabel' align= 'left' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'> " + this.lstDBTableData[0].ITEM_DESC + "</td><td class='SearchLabel' align='left' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].UPDATE_DATE +" </td><td class='SearchLabel' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'></td ></tr>";
            htmlBuilder += "<tr style='width:100%;'><td class='' style= 'border-color:#BFBFBF;border-width:1px;border-style:solid;width:20%;'> Average Item Usage </td><td class='' align='left' colspan='4' style='border-color:#BFBFBF;border-width:1px;border-style:solid;font-weight:bold;width:20%;'>" + this.lstDBTableData[0].AVG_USAGE + " Per Day"+ "</td ></tr>";
            htmlBuilder += "</tbody></table></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table >";

            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    closeMailPopup() {
        this.growlMessage = [];
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
} 