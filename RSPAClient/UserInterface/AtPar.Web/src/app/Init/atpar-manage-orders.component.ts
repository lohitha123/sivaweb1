import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { TextboxControl } from '../Common/DynamicControls/TextboxControl';
import { DropDownControl } from '../Common/DynamicControls/DropDownControl';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { StatusType } from '../Shared/AtParEnums';
import { Message } from '../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { BusinessType } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { VM_POU_MNGT_ORDER_DETAILS } from '../entities/vm_pou_mngt_order_details';
import { VM_POU_ORDER_DETAILS } from '../entities/vm_pou_order_details';
import { PAR_MNGT_ORDER_DETAILS } from '../entities/par_mngt_order_details';
import { DataTable } from '../components/datatable/datatable';
import { AtParConstants } from '../Shared/AtParConstants';

declare var module: {
    id: string;
}

@Component({
    selector: 'atpar-manageorders',
    templateUrl: 'atpar-manage-orders.component.html',
    providers: [datatableservice, AtParCommonService],
})

export class ManageOrdersComponent {
    @Input() appId: string;
    intAppId: number;
    pop: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    deviceTokenEntry: string[] = [];
    BindGrid: VM_POU_MNGT_ORDER_DETAILS[];
    ExpandGrid: PAR_MNGT_ORDER_DETAILS[];
    values: VM_POU_MNGT_ORDER_DETAILS;
    lstStatusOrders: SelectItem[] = [];
    lstStatusOrders1: SelectItem[] = [];
    lstPouOrderDetails: VM_POU_ORDER_DETAILS[] = [];
    pouOrderDetails: VM_POU_ORDER_DETAILS;
    Company: string = "";
    ParLocation: string = "";
    RequisitionNum: string = "";
    Department: string = "";
    Vendor: string = "";
    ItemID: string = "";
    selectedStatus: string = "";
    grdHide: boolean = false;
    growlMessage: Message[] = [];
    pageSize: number;
    btnShow: boolean = false;
    strMaxAllowQty: number;
    strAllowEditOrders: string = "";
    Editgrd: boolean = false;
    grd: boolean = false;
    defDateRange: string = "";
    profileParam: string = "MAX_ALLOW_QTY";
    profileParamOrder: string = "ALLOW_EDITING_ORDERS";
    drpsatatus: boolean = false;
    txtRCDqty: number;
    txtqty: number;
    buttonEnableDisable: boolean = true;
    expandedItems: Array<any> = new Array<any>();

    showedit: boolean = false;

    public newItem = new PAR_MNGT_VENDOR();
    styleExpand: string = "right";

    constructor(private httpservice: HttpService, private _http: Http, private spinnerService: SpinnerService, private atParcommonservice: AtParCommonService, private atParConstant: AtParConstants) {
    }

    ngOnInit(): void {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.intAppId = parseInt(this.appId);
            if (this.intAppId == undefined) {
                this.intAppId = 15;
            }
            this.GetMyPreferences();
            this.BindStatusOrders();
            this.GetProfileParamValue();
            this.GetProfileParamValueOrder();
            var nowDate = new Date();
            this.date2 = new Date();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    bindModelDataChange(event: any) {
        if (event.TextBoxID === event.TextBoxID.toString()) {
            this.txtqty = event.validationrules.filter(x => x.status == false).length;
        }
        if (this.txtqty == 0) {
            this.buttonEnableDisable = false;
        }
        else {
            this.buttonEnableDisable = true;
        }
    }

    async GetProfileParamValue() {
        try {
            var profileID = this.deviceTokenEntry[TokenEntry_Enum.ProfileID];
            this.spinnerService.start();
            this.grdHide = false;
            await this.atParcommonservice.GetProfileParamValue(profileID, this.intAppId, "MAX_ALLOW_QTY").
                catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<string>>res.json()).then(async (response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage = [];
                                this.spinnerService.stop();
                                this.strMaxAllowQty = +response.DataVariable;
                                break;
                            }
                        case StatusType.Warn: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }

                });
        }
        catch (exception) {
            this.grdHide = false;
            this.clientErrorMsg(exception, "GetProfileParamValue");
        }
    }

    async GetProfileParamValueOrder() {
        try {
            var profileID = this.deviceTokenEntry[TokenEntry_Enum.ProfileID];
            this.spinnerService.start();
            this.grdHide = false;
            await this.atParcommonservice.GetProfileParamValue(profileID, this.intAppId, "ALLOW_EDITING_ORDERS").
                catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<string>>res.json()).then(async (response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage = [];
                                this.spinnerService.stop();
                                this.strAllowEditOrders = response.DataVariable.toString();
                                break;
                            }
                        case StatusType.Warn: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (exception) {
            this.grdHide = false;
            this.clientErrorMsg(exception, "GetProfileParamValueOrder");
        }
    }

    async GetMyPreferences() {
        try {
            var userID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            this.spinnerService.start();
            this.grdHide = false;
            await this.atParcommonservice.GetMyPreferences("DEFAULT_REPORT_DURATION", userID).
                catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<string>>res.json()).then(async (response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage = [];
                                this.spinnerService.stop();
                                this.defDateRange = response.DataVariable.toString();
                                var d = new Date();
                                var nu = this.defDateRange;
                                var y = +nu;
                                d.setDate(d.getDate() - y);
                                this.date1 = d;
                                break;
                            }
                        case StatusType.Warn: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (exception) {
            this.grdHide = false;
            this.clientErrorMsg(exception, "fileUpload");
        }
    }

    async btngo_Click() {
        this.growlMessage = [];
        if (this.date1 != null || this.date1 != undefined) {
            var fromDate = new Date(this.date1);
        }
        else {
            this.grdHide = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date format should be : mm/dd/yyyy." });
            return;
        }
        if (this.date2 != null || this.date2 != undefined) {
            var toDate1 = this.date2.toLocaleDateString();
        }
        else {
            this.grdHide = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date format should be : mm/dd/yyyy." });

            return;
        }
        var todayDate = new Date();
        var toDate = new Date(this.date2);
        if (toDate > todayDate) {
            this.grdHide = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
            return;
        }
        if (fromDate > toDate) {
            this.grdHide = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
            return;
        }
        var CompID = this.Company;
        var locID = this.ParLocation;
        var strReqNo = this.RequisitionNum;
        var deptID = this.Department;
        var vendorID = this.Vendor;
        var strItemID = this.ItemID;
        var ordStatus = this.selectedStatus;
        var orgGrpID = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
        var frmDate = this.date1.toLocaleDateString();
        try {
            this.spinnerService.start();
            this.grdHide = false;
            await this.atParcommonservice.GetOrderHeaders(frmDate, toDate1, CompID, locID, deptID, vendorID, ordStatus, strReqNo, strItemID, orgGrpID, this.intAppId).
                catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<VM_POU_MNGT_ORDER_DETAILS>>res.json()).then(async (response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage = [];
                                this.spinnerService.stop();
                                this.BindGrid = [];
                                this.grdHide = true;
                                let bindData = response.DataList;
                                this.BindGrid = response.DataList;
                                this.BindGrid.forEach((a, b) => { a.styleExpand = "right" });
                                if (ordStatus == "5" && this.strAllowEditOrders == "N") {
                                    this.btnShow = true;
                                }
                                else {
                                    this.btnShow = false;
                                }
                                if (this.strAllowEditOrders == "Y") {
                                    this.Editgrd = true;
                                    this.grd = false;
                                    this.btnShow = true;
                                }
                                else {
                                    this.grd = true;
                                    this.Editgrd = false;
                                    this.btnShow = false;
                                }
                                //for (let i = 0; i <= this.BindGrid.length - 1; i++) {
                                //    let changeDate = this.BindGrid[i].ORDER_DATE;
                                //    var date = changeDate;
                                //    var dateTime = date;
                                //    var datePart = new Date(dateTime).getDate();
                                //    var yearPart = new Date(dateTime).getFullYear();
                                //    var monthPart = new Date(dateTime).getMonth() + 1;
                                //    var hoursPart = new Date(dateTime).getHours();
                                //    var minutesPart = new Date(dateTime).getMinutes();
                                //    var secondsPart = new Date(dateTime).getSeconds();
                                //    if (monthPart < 10 && datePart < 10) {
                                //        var timePart = "0" + monthPart + "/" + "0" + datePart + "/" + yearPart + " " + hoursPart + ":" + minutesPart + ":" + secondsPart;
                                //    }
                                //    else {
                                //        var timePart = monthPart + 1 + "/" + datePart + "/" + yearPart + " " + hoursPart + ":" + minutesPart + ":" + secondsPart;
                                //    }
                                //    this.BindGrid[i].ORDER_DATE = timePart;

                                //  //  await this.Expand(this.BindGrid[i]);
                                //  //  this.BindGrid[i].DETAILS = this.ExpandGrid;

                                //}
                                if (this.BindGrid.length == 0) {
                                    this.grdHide = false;
                                    this.spinnerService.stop();
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                    break;
                                }
                                break;
                            }

                        case StatusType.Warn: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (exception) {
            this.grdHide = false;
            this.clientErrorMsg(exception, "btngo_Click");
        }
    }

    to24Hour(str) {
        var tokens = /([10]?\d):([0-5]\d):([0-5]\d) ([ap]m)/i.exec(str);
        if (tokens == null) { return null; }
        if (tokens[4].toLowerCase() === 'pm' && tokens[1] !== '12') {
            tokens[1] = '' + (12 + (+tokens[1]));
        } else if (tokens[4].toLowerCase() === 'am' && tokens[1] === '12') {
            tokens[1] = '00';
        }
        return tokens[1] + ':' + tokens[2] + ":" + tokens[3];
    }

    async Expand(col: any, index1: any) {
        var CompID = col.ORDER_NO;
        var orderDate = col.ORDER_DATE;
        var orgID = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
        var parID = col.PAR_LOC_ID;
        var vendorID = col.VENDOR_ID;
        var deptID = col.DEPARTMENT_ID;
        var ItemId = this.ItemID;
        var bunit = col.ORG_ID;
        var ordStatus = this.selectedStatus;
        this.drpsatatus = true;
        try {
            // this.spinnerService.start();
            this.grdHide = true;
            await this.atParcommonservice.GetOrderDetails_ManageOrders(CompID, ordStatus, parID, bunit, orgID, ItemId, this.intAppId).
                catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<PAR_MNGT_ORDER_DETAILS>>res.json()).then((response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage = [];
                               // this.expandedItems = [];
                                //  this.spinnerService.stop();

                                this.ExpandGrid = [];
                                this.grdHide = true;
                                let bindData = response.DataList;
                                for (let eg = 0; eg <= bindData.length - 1; eg++) {
                                    if (this.Editgrd == false) {
                                        response.DataList[eg].QTY = parseFloat(response.DataList[eg].QTY).toFixed(2);
                                        response.DataList[eg].QTY_RCVD = parseFloat(response.DataList[eg].QTY_RCVD).toFixed(2);
                                    }

                                    response.DataList[eg].PRICE = parseFloat(response.DataList[eg].PRICE).toFixed(2);
                                    bindData[eg].txtqty = "qty" + eg;
                                    bindData[eg].txtRCDqty = "RCDqty" + eg;
                                    bindData[eg].txtstatus = "Status" + eg;
                                    var chk = this.grd;
                                    if (chk == true) {
                                        if (bindData[eg].ORDER_STATUS == "5") {
                                            response.DataList[eg].ORDER_STATUS = "Open";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "10") {
                                            response.DataList[eg].ORDER_STATUS = "Sent";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "15") {
                                            response.DataList[eg].ORDER_STATUS = "Received";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "20") {
                                            response.DataList[eg].ORDER_STATUS = "Cancelled";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "25") {
                                            response.DataList[eg].ORDER_STATUS = "Partially Received";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "30") {
                                            response.DataList[eg].ORDER_STATUS = "Closed";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "35") {
                                            response.DataList[eg].ORDER_STATUS = "Error";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "40") {
                                            response.DataList[eg].ORDER_STATUS = "Partially Picked";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "45") {
                                            response.DataList[eg].ORDER_STATUS = "Picked";
                                        }
                                    }
                                }
                                col.styleExpand = "down";
                                this.ExpandGrid = response.DataList;
                                break;
                            }

                        case StatusType.Warn: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.grdHide = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }

                });
        }
        catch (exception) {
            this.grdHide = false;
            this.clientErrorMsg(exception, "Expand");
        }
    }

    async btnSubmit_Click() {
        try {
            this.growlMessage = [];
            if (this.buttonEnableDisable == false) {
                for (let i = 0; i <= this.BindGrid.length - 1; i++) {
                    var lstdat = this.BindGrid[i].DETAILS;
                    if (lstdat != undefined) {

                        for (let ex = 0; ex <= lstdat.length - 1; ex++) {
                            var txtQty = lstdat[ex].QTY;
                            var ReceviedQty = lstdat[ex].QTY_RCVD;
                            if (txtQty == null || txtQty == undefined) {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Order Qty"
                                });
                                return;
                            }
                            if (lstdat[ex].QTY_RCVD === "" || lstdat[ex].QTY_RCVD == null || lstdat[ex].QTY_RCVD == undefined) {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Recevied Qty"

                                });
                                return;
                            }
                            var status = lstdat[ex].ORDER_STATUS;
                            var TransID = lstdat[ex].TRANSACTION_ID;
                            var BinLoc = lstdat[ex].BIN_LOC;
                            var st = this.selectedStatus;
                            ReceviedQty = +ReceviedQty;
                            txtQty = +txtQty;
                            if (status != "Cancel") {
                                if (txtQty != null || txtQty != "") {
                                    if (txtQty > this.strMaxAllowQty) {
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        this.growlMessage.push({
                                            severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity"

                                        });
                                        return;
                                    }

                                }
                                if (ReceviedQty != null || ReceviedQty != "") {
                                    if (ReceviedQty > this.strMaxAllowQty) {
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        this.growlMessage.push({
                                            severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity"

                                        });
                                        return;
                                    }
                                }
                            }
                            if (txtQty != 0 || ReceviedQty != 0) {
                                var data1 = lstdat[ex];
                                data1.ORDER_QTY = txtQty;
                                data1.RCVD_QTY = ReceviedQty;
                                data1.STATUS = status;
                                this.lstPouOrderDetails.push(data1);
                            }
                        }
                    }
                }
                //Update Service call Here

                if (this.lstPouOrderDetails.length > 0) {
                    try {
                        this.spinnerService.start();
                        this.grdHide = true;
                        await this.atParcommonservice.UpdateOrderDetails(this.lstPouOrderDetails).
                            catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<VM_POU_ORDER_DETAILS>>res.json()).then((response) => {
                                switch (response.StatType) {
                                    case StatusType.Success:
                                        {
                                            this.growlMessage = [];
                                            this.spinnerService.stop();
                                            this.lstPouOrderDetails = [];
                                            this.buttonEnableDisable = true;
                                            this.grdHide = true;
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({
                                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Order details were updated successfully"
                                            });
                                            break;
                                        }

                                    case StatusType.Warn: {
                                        this.lstPouOrderDetails = [];
                                        this.grdHide = false;
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case StatusType.Error: {
                                        this.lstPouOrderDetails = [];
                                        this.grdHide = false;
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case StatusType.Custom: {
                                        this.lstPouOrderDetails = [];
                                        this.grdHide = false;
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }

                            });

                    }
                    catch (exception) {
                        this.grdHide = false;
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({
                            severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "General Client Error"
                        });

                    }
                }
                else {
                    this.grdHide = false;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No changes found to update" });
                    //break;
                }
            }
            else {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No changes found to update" });
                return;
            }
        }
        catch (exception) {
            this.clientErrorMsg(exception, "btnSubmit_Click");
        }
    }

    onfocusToCalendar(e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        } else {
            this.minDateValue2 = this.date1;
        }
    }

    onfocusFromCalendar(e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;

    }

    BindStatusOrders() {
        this.lstStatusOrders.push({ label: "All", value: "" })
        this.lstStatusOrders.push({ label: "Open", value: "5" })
        this.lstStatusOrders.push({ label: "Sent", value: "10" })
        this.lstStatusOrders.push({ label: "Received", value: "15" })
        this.lstStatusOrders.push({ label: "Cancel", value: "20" })
        this.lstStatusOrders.push({ label: "Partially Received", value: "25" })
        this.lstStatusOrders.push({ label: "Closed", value: "30" })
        this.lstStatusOrders.push({ label: "Error", value: "35" })
        this.lstStatusOrders.push({ label: "Partially Picked", value: "40" })
        this.lstStatusOrders.push({ label: "Picked", value: "45" })


        this.lstStatusOrders1.push({ label: "Open", value: "5" })
        this.lstStatusOrders1.push({ label: "Sent", value: "10" })
        this.lstStatusOrders1.push({ label: "Received", value: "15" })
        this.lstStatusOrders1.push({ label: "Cancel", value: "20" })
        this.lstStatusOrders1.push({ label: "Partially Received", value: "25" })
        this.lstStatusOrders1.push({ label: "Closed", value: "30" })
        this.lstStatusOrders1.push({ label: "Error", value: "35" })
        this.lstStatusOrders1.push({ label: "Partially Picked", value: "40" })
        this.lstStatusOrders1.push({ label: "Picked", value: "45" })
    }
    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    itemChanged() {
        this.buttonEnableDisable = false;
    }

    async onProcedureItemClick(rowData: any, event: any) {
        let index1 = this.BindGrid.findIndex(x => x.ORDER_NO == rowData.ORDER_NO && x.ORG_ID == rowData.ORG_ID && x.DEPARTMENT_ID == rowData.DEPARTMENT_ID && x.VENDOR_ID == rowData.VENDOR_ID && x.PAR_LOC_ID == rowData.PAR_LOC_ID);
        var exists = false;
        rowData.styleExpand = "right";

        let expandedRowIndex: number = -1;

        try {
            if (rowData != null) {
                this.expandedItems.forEach(m => {
                    //if (m == this.dvPrefOptByProcedure[index1]) exists = true;
                    if (m.ORDER_NO == this.BindGrid[index1].ORDER_NO && m.DEPARTMENT_ID == this.BindGrid[index1].DEPARTMENT_ID
                        && m.ORG_ID == this.BindGrid[index1].ORG_ID && m.PAR_LOC_ID == this.BindGrid[index1].PAR_LOC_ID) {
                        exists = true;
                        expandedRowIndex = this.expandedItems.indexOf(m);
                    }
                });

                if (exists && expandedRowIndex !== -1) {
                    //this.expandedItems.pop(this.dvPrefOptByProcedure[index1]);
                    this.expandedItems.splice(expandedRowIndex, 1);
                    this.showedit = false;
                }
                else {
                    this.showedit = true;
                    //this.expandedItems=[];
                    await this.Expand(rowData, index1);
                    this.BindGrid.forEach((a, b) => { if (a.styleExpand !='down') a.styleExpand = "right" });
                    this.BindGrid[index1].DETAILS = this.ExpandGrid;
                    this.BindGrid[index1].styleExpand = "down";
                    this.expandedItems.push(this.BindGrid[index1]);
                }

            }

        } catch (ex) {
            // this.clientErrorMsg(ex);
        }
    }
    //dataevent() {
    //    alert('test');
    //}
}