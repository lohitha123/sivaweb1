/// <reference path="../entities/vm_cartcount_order_details.ts" />
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
import { Message } from '../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { TokenEntry_Enum, EnumApps, StatusType, BusinessType, MailPriority } from '../Shared/AtParEnums';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { VM_POU_MNGT_ORDER_DETAILS } from '../entities/vm_pou_mngt_order_details';
import { VM_POU_ORDER_DETAILS } from '../entities/vm_pou_order_details';
import { PAR_MNGT_ORDER_DETAILS } from '../entities/par_mngt_order_details';
import { DataTable } from '../components/datatable/datatable';
import { AtParConstants } from '../Shared/AtParConstants';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { saveAs } from 'file-saver';
import { VM_CARTCOUNT_ORDER_DETAILS } from '../entities/vm_cartcount_order_details';

declare var module: {
    id: string;
}

@Component({
    //    selector: 'cart-manageorders',
    templateUrl: 'cart-manage-orders.component.html',
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

    toMailAddr: string = '';
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    statusCode: number = -1;
    isMailDialog: boolean = false;

    public newItem = new PAR_MNGT_VENDOR();
    styleExpand: string = "right";

    constructor(private httpservice: HttpService, private _http: Http, private spinnerService: SpinnerService, private atParcommonservice: AtParCommonService, private atParConstant: AtParConstants) {
    }

    ngOnInit(): void {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

            this.intAppId = 2;

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
                                //this.strMaxAllowQty = +response.DataVariable;
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
        var ordStatus = this.selectedStatus;
        var orgGrpID = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
        var frmDate = this.date1.toLocaleDateString();
        try {
            this.spinnerService.start();
            this.grdHide = false;
            await this.atParcommonservice.GetOrders(frmDate, toDate1, CompID, locID, deptID, vendorID, ordStatus, strReqNo, orgGrpID).
                catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<VM_POU_MNGT_ORDER_DETAILS>>res.json()).then(async (response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage = [];
                                this.spinnerService.stop();
                                this.BindGrid = [];
                                this.grdHide = true;
                                let bindData = response.DataDictionary["dsOrders"]["Table1"];
                                this.BindGrid = response.DataDictionary["dsOrders"]["Table1"];
                                this.BindGrid.forEach(async (a, b) => {
                                    a.styleExpand = "right";
                                    await this.Expand(a, '');
                                    a.DETAILS = this.ExpandGrid;
                                });

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
        var ItemId = this.ItemID;
        var bunit = col.ORG_ID;
        var ordStatus = this.selectedStatus;
        this.drpsatatus = true;
        try {
            this.grdHide = true;

            await this.atParcommonservice.GetOrderDetails(CompID, ordStatus).
                catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<PAR_MNGT_ORDER_DETAILS>>res.json()).then((response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage = [];

                                this.ExpandGrid = [];
                                this.grdHide = true;
                                let bindData = response.DataDictionary["dsOrderDetails"]["Table1"];
                                for (let eg = 0; eg <= bindData.length - 1; eg++) {
                                    if (this.Editgrd == false) {
                                        bindData[eg].QTY = parseFloat(bindData[eg].QTY).toFixed(2);
                                        if (bindData[eg].QTY_RCVD != null) {
                                            bindData[eg].QTY_RCVD = parseFloat(bindData[eg].QTY_RCVD).toFixed(2);
                                        }
                                        else {
                                            bindData[eg].QTY_RCVD = "";
                                        }
                                    }
                                    if (bindData[eg].ITEM_PRICE != null) {
                                        bindData[eg].ITEM_PRICE = parseFloat(bindData[eg].ITEM_PRICE).toFixed(2);
                                    }
                                    else { bindData[eg].ITEM_PRICE = ""; }
                                    bindData[eg].txtqty = "qty" + eg;
                                    bindData[eg].txtRCDqty = "RCDqty" + eg;
                                    bindData[eg].txtstatus = "Status" + eg;
                                    bindData[eg].prevTxtQty = bindData[eg].QTY;
                                    bindData[eg].prevTxtRCDQty = bindData[eg].QTY_RCVD;
                                    bindData[eg].prevTxtStatus = bindData[eg].ORDER_STATUS;
                                    var chk = this.grd;

                                    if (chk == true) {
                                        if (bindData[eg].ORDER_STATUS == "5") {
                                            bindData[eg].ORDER_STATUS = "Open";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "10") {
                                            bindData[eg].ORDER_STATUS = "Sent";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "15") {
                                            bindData[eg].ORDER_STATUS = "Received";
                                        }
                                        if (bindData[eg].ORDER_STATUS == "20") {
                                            bindData[eg].ORDER_STATUS = "Cancelled";
                                        }

                                    }
                                }
                                //col.styleExpand = "down";
                                this.ExpandGrid = bindData;
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
                            if (txtQty != 0 || ReceviedQty != 0) {
                                if (txtQty != lstdat[ex].prevTxtQty || ReceviedQty != lstdat[ex].prevTxtRCDQty || status != lstdat[ex].prevTxtStatus) {
                                    var data1 = lstdat[ex];
                                    data1.ORDER_QTY = txtQty;
                                    data1.RCVD_QTY = ReceviedQty;
                                    data1.STATUS = status;
                                    this.lstPouOrderDetails.push(data1);
                                }
                            }
                        }
                    }
                }
                //Update Service call Here
                if (this.lstPouOrderDetails.length > 0) {
                    try {
                        this.spinnerService.start();
                        this.grdHide = true;
                        await this.atParcommonservice.UpdateManageOrderDetails(this.lstPouOrderDetails).
                            catch(this.httpservice.handleError).then((res: Response) => <AtParWebApiResponse<VM_CARTCOUNT_ORDER_DETAILS>>res.json()).then((response) => {
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

        this.lstStatusOrders1.push({ label: "Open", value: "5" })
        this.lstStatusOrders1.push({ label: "Sent", value: "10" })
        this.lstStatusOrders1.push({ label: "Received", value: "15" })
        this.lstStatusOrders1.push({ label: "Cancel", value: "20" })
    }
    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    itemChanged() {
        this.buttonEnableDisable = false;
    }

    async onProcedureItemClick(rowData: any, event: any) {
        let index1 = this.BindGrid.findIndex(x => x.ORDER_NO == rowData.ORDER_NO && x.ORG_ID == rowData.ORG_ID && x.VENDOR_ID == rowData.VENDOR_ID && x.PAR_LOC_ID == rowData.PAR_LOC_ID);
        var exists = false;
        rowData.styleExpand = "right";

        let expandedRowIndex: number = -1;

        try {
            if (rowData != null) {
                this.expandedItems.forEach(m => {
                    //if (m == this.dvPrefOptByProcedure[index1]) exists = true;
                    if (m.ORDER_NO == this.BindGrid[index1].ORDER_NO
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
                    // await this.Expand(rowData, index1);
                    this.BindGrid.forEach((a, b) => { if (a.styleExpand != 'down') a.styleExpand = "right" });
                    //this.BindGrid[index1].DETAILS = this.ExpandGrid;
                    this.BindGrid[index1].styleExpand = "down";
                    this.expandedItems.push(this.BindGrid[index1]);
                }

            }

        } catch (ex) {
            // this.clientErrorMsg(ex);
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

    closeMailPopup() {
        this.growlMessage = [];
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
                await this.atParcommonservice.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Cart Count Manage Orders Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
            this.clientErrorMsg(ex, "onSendMailClick");
        }
        finally {

            this.spinnerService.stop();
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async exportReportDetails(reqType: string) {
        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.growlMessage = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;

            let imgserverPath: string = '';
            let imgPhyUsagePath: string = '';

            await this.atParcommonservice.getServerIP().catch(this.httpservice.handleError)
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


            await this.atParcommonservice.getSSLConfigDetails().catch(this.httpservice.handleError)
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
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';

            let fromdate = new Date(this.date1).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            fromdate = fromdate.replace(',', '');
            let fdate = new Date(fromdate).toLocaleDateString();
            let todate = new Date(this.date2).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            todate = todate.replace(',', '');
            let tdate = new Date(todate).toLocaleDateString();

            htmlBuilder += "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == "Print") {                                                                                                                                         
                htmlBuilder += "<TR width='100%'><td colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt><B>&nbsp;&nbsp;Mobile Supply Chain Execution</B></FONT></TD>";
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Manage Order Details Report From " + fdate + " to " + tdate + " </b></span></td><td align=right valign=top>&nbsp;";
                htmlBuilder += "<A  href=javascript:window.print()><img src=" + imgserverPath + "print.jpg></A>";
            }
            else if (reqType == "Mail") {
                htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt><B>&nbsp;&nbsp;Mobile Supply Chain Execution</B></FONT></TD>";
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=6 align=left><span class=c2>Manage Order Details Report From " + fdate + " to " + tdate + "  </b></span></td><td align=right valign=top&nbsp;";
            }
            else {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt><B>&nbsp;&nbsp;Mobile Supply Chain Execution</B></FONT></TD>";
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=6 align=left><span class=c2>Manage Order Details Report From " + fdate + " to " + tdate + "  </b></span></td><td align=right valign=top&nbsp;";
            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
            htmlBuilder += "<tr><td>";

            htmlBuilder += "<table align=left width=99% style='BORDER-COLLAPSE:collapse;' border=1>";
            htmlBuilder += "<tr bgcolor=#d3d3d3>";
            htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>ORDER_NO</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>VENDOR_ID</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>INV_BUNIT</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>ORDER_DATE</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>CREATE_USER</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>ORG_ID</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>PAR_LOC_ID</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>COST_CENTER_CODE</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>&nbsp;</b></span></td>";
            htmlBuilder += ("</tr>")

            for (var i = 0; i < this.BindGrid.length; i++) {

                htmlBuilder += "<tr>";
                htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].ORDER_NO + "&nbsp;</span></td>";
                htmlBuilder += "<td align=left><span style='font-size:11px;font-style:normal;font-family:monospace;word-wrap:break-word;' class=c3>&nbsp;" + this.BindGrid[i].VENDOR_ID + "&nbsp;</span></td>";
                htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].INV_BUNIT + "&nbsp;</span></td>";
                htmlBuilder += "<td align=left><span style='font-size:11px;font-style:normal;font-family:monospace;word-wrap:break-word;' class=c3>&nbsp;" + this.BindGrid[i].ORDER_DATE + "&nbsp;</span></td>";
                htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].CREATE_USER + "&nbsp;</span></td>";
                htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].ORG_ID + "&nbsp;</span></td>";
                htmlBuilder += "<td align=left><span style='font-size:11px;font-style:normal;font-family:monospace;word-wrap:break-word;' class=c3>&nbsp;" + this.BindGrid[i].PAR_LOC_ID + "&nbsp;</span></td>";
                htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].COST_CENTER_CODE + "&nbsp;</span></td>";


                htmlBuilder += "<td align=left nowrap>";

                if (this.BindGrid[i].DETAILS.length > 0) {

                    htmlBuilder += "<table align=left width=99% style='BORDER-COLLAPSE:collapse;' border=1>";
                    htmlBuilder += "<tr bgcolor=#d3d3d3>";
                    htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>ITEM_ID</b></span></td>";
                    htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>SHORT_DESCR</b></span></td>";
                    htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>UOM</b></span></td>";
                    htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>ITEM_PRICE</b></span></td>";
                    htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>QTY</b></span></td>";
                    htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>ORDER_STATUS</b></span></td>";
                    htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>QTY_RCVD</b></span></td>";
                    htmlBuilder += "<td align=center nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3><b>REQUISITION_NO</b></span></td>";
                    htmlBuilder += "</tr>";


                    for (let item in this.BindGrid[i].DETAILS) {
                        htmlBuilder += "<tr>";
                        htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].DETAILS[item].ITEM_ID + "&nbsp;</span></td>";
                        htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].DETAILS[item].SHORT_DESCR + "&nbsp;</span></td>";
                        htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].DETAILS[item].UOM + "&nbsp;</span></td>";
                        htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].DETAILS[item].ITEM_PRICE + "&nbsp;</span></td>";
                        htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].DETAILS[item].QTY + "&nbsp;</span></td>";
                        if (this.BindGrid[i].DETAILS[item].ORDER_STATUS == '5') {
                            htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + "Open"+ "&nbsp;</span></td>";
                        }
                        if (this.BindGrid[i].DETAILS[item].ORDER_STATUS == '10') {
                            htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + "Sent" + "&nbsp;</span></td>";
                        }
                        if (this.BindGrid[i].DETAILS[item].ORDER_STATUS == '15') {
                            htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + "Received" + "&nbsp;</span></td>";
                        }
                        if (this.BindGrid[i].DETAILS[item].ORDER_STATUS == '20') {
                            htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + "Cancel" + "&nbsp;</span></td>";
                        }
                        //htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c4>&nbsp;" + this.BindGrid[i].DETAILS[item].ORDER_STATUS + "&nbsp;</span></td>";
                        htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].DETAILS[item].QTY_RCVD + "&nbsp;</span></td>";
                        if (this.BindGrid[i].DETAILS[item].REQUISITION_NO == null) {
                            htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3&nbsp;&nbsp;</span></td>";
                        }
                        else {
                            htmlBuilder += "<td align=left nowrap><span style='font-size:11px;font-style:normal;font-family:monospace;' class=c3>&nbsp;" + this.BindGrid[i].DETAILS[item].REQUISITION_NO + "&nbsp;</span></td>";
                        }
                        htmlBuilder += "</tr>";
                    }
                }

                htmlBuilder += "</table>";
            }
            htmlBuilder += "</td>";
            htmlBuilder += "</tr>";
           
            htmlBuilder += "</table></Table>";
            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {

                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');

                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Cart Count - Manage Orders Report' + '</title>');
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
                saveAs(blob, "CartCountManageOrdersReport.xls");
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "onExportToExcelClick");
        }
        finally {
            this.spinnerService.stop();
        }
    }
}


//import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
//import { EnumApps } from '../Shared/AtParEnums';

//declare var module: {
//    id: string;
//}

//@Component({

//    templateUrl: 'cart-manage-orders.component.html'
//})

//export class ManageOrdersComponent {
//    cartCountAppId: number = EnumApps.CartCount;
//} 
