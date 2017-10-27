
import {
    Component,
    Input,
    OnDestroy
} from '@angular/core';

import {
    Http,
    Response
} from '@angular/http';

import { Title } from '@angular/platform-browser';

import {
    List,
    Enumerable
} from 'linqts';

import { asEnumerable } from 'linq-es5';

import { Employee } from '../../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../Entities/PAR_MNGT_VENDOR";
import { AtParSharedDataService } from '../../Shared/AtParSharedDataService';
import { TkitHttpService } from '../../Shared/tkitHttpService';

import {
    TokenEntry_Enum,
    StatusType,
    EnumApps,
    YesNo_Enum,
    enum_TKIT_OrderStatus
} from '../../Shared/AtParEnums';

import { AtParTrackITCommonService } from '../../Shared/atpar-trackit-common.service';
import { ConfirmationService } from '../../components/common/api';
import { Message } from '../../components/common/api';
import { AtParWebApiResponse } from '../../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../../Shared/AtParStatusCodes';
import { SpinnerService } from '../../components/spinner/event.spinner.service';
import { AtParConstants } from '../../Shared/AtParConstants';
import { TkitRequestStatusService } from './trackit.request.status.service';
import { VM_TKIT_ORDER_DETAILS } from '../../Entities/VM_TKIT_ORDER_DETAILS';
import { SSL_CONFIG_DETAILS } from '../../Entities/SSL_CONFIG_DETAILS';

/**
*	This class represents the lazy loaded HomeComponent.
*/
declare var module: {
    id: string;
}

@Component({
    templateUrl: 'trackit.request.status.component.html',
    providers: [
        AtParTrackITCommonService,
        TkitRequestStatusService,
        TkitHttpService,
        ConfirmationService,
        AtParSharedDataService
    ]
})

export class RequestStatusComponent {
    pop: boolean = false;
    table: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;

    //Variables
    deviceTokenEntry: string[] = [];
    statusMsgs: Message[] = [];
    lstTkitOrderDetails: VM_TKIT_ORDER_DETAILS[];

    selectedStatus: string = "Select Status";
    selectedRequest: string = "Select RequestID";
    previousRequest: string = "";
    lblOrderComments: string = "";
    lblReqNumber: string = "";
    lblReqDate: string = "";
    searchStatus: string = "";

    ddlSelectStatus: any;
    ddlSelectRequest: any;
    ddlStatusLst: any;

    recordsPerPageSize: number;
    startIndex: number;
    endIndex: number;
    statusCode: number = -1;

    txtFrmDate: any = new Date();
    txtToDate: any = new Date();
    currentDate = new Date();
    currentFromDate = new Date();

    btnUpdateItems: boolean = true;
    blnErDateTime: boolean = true;
    chkRemoveValue: boolean = false;

    imgBasePath: string = "";
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;

    constructor(
        private spnrService: SpinnerService,
        private httpService: TkitHttpService,
        private atParConstant: AtParConstants,
        private commonService: AtParTrackITCommonService,
        private title: Title,
        private tkitReqstStatusService: TkitRequestStatusService,
        private confirmationService: ConfirmationService
    ) {
        this.title.setTitle('TrackIT - Request Status');
        this.lstTkitOrderDetails = [];
        this.ven = new Employee();
    }

    add() {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
    }

    tbl() {
        this.form = false;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.table = true;

    }

    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }

    save() {
        this.editform = false;
    }

    close() {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
    }

    async ngOnInit() {
        try {

            this.deviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.currentFromDate = new Date();
            this.ddlStatusLst = [];
            this.ddlStatusLst.push({ label: "ALL", value: "" });
            this.ddlStatusLst.push({ label: "OPEN", value: "OPEN" });
            this.ddlStatusLst.push({ label: "PICK", value: "PICK" });
            this.ddlStatusLst.push({ label: "LOAD", value: "LOAD" });
            this.ddlStatusLst.push({ label: "UNLOAD", value: "UNLOAD" });
            this.ddlStatusLst.push({ label: "DELIVERED", value: "DELV" });
            this.ddlStatusLst.push({ label: "CANCELLED", value: "CANCELLED" });
            await this.page_Load();
            await this.setImgPath();
        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }
    async setImgPath() {
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
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                //if (data.StatType != StatusType.Success) {
                //    html = '';
                //    return html;
                //}
            });


        await this.commonService.getSSLConfigDetails()
            .catch(this.httpService.handleError)
            .then((res: Response) => {
                this.statusMsgs = [];
                var data = res.json() as AtParWebApiResponse<SSL_CONFIG_DETAILS>;
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.gstrProtocal = data.Data.PROTOCOL.toString();
                        this.gstrServerName = data.Data.SERVER_NAME.toString();
                        this.gstrPortNo = data.Data.PORT_NO.toString();
                        break;
                    }
                    case StatusType.Error: {
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                //if (data.StatType != StatusType.Success) {
                //    html = '';
                //    return html;
                //}

            });

    }

    async page_Load() {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            let defDuration: number = 0;
            this.pop = false;
            this.table = false;
            this.lstTkitOrderDetails = [];
            this.ddlSelectRequest = [];
            this.selectedRequest = "Select RequestID";
            this.ddlSelectStatus = [];
            this.ddlSelectStatus.push({ label: "Select Status", value: "Select Status" });
            this.ddlSelectStatus.push({ label: "All", value: "All" });
            this.ddlSelectStatus.push({ label: "Open", value: "Open" });
            this.ddlSelectStatus.push({ label: "Pick", value: "Pick" });
            this.ddlSelectStatus.push({ label: "Load", value: "Load" });
            this.ddlSelectStatus.push({ label: "Unload", value: "Unload" });
            this.ddlSelectStatus.push({ label: "Delivered", value: "Delivered" });
            this.ddlSelectStatus.push({ label: "Cancelled", value: "Cancelled" });

            await this.tkitReqstStatusService.getTkitMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[TokenEntry_Enum.UserID].toString()).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataVariable != null && data.DataVariable != "") {
                                defDuration = parseInt(data.DataVariable.toString());
                            }
                            this.statusCode = data.StatusCode;
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

            this.currentFromDate = new Date();
            this.currentFromDate.setDate(this.currentFromDate.getDate() - defDuration);
            this.txtFrmDate = (this.currentFromDate.getMonth() + 1) + '/' + (this.currentFromDate.getDate()) + '/' + this.currentFromDate.getFullYear();
            this.txtToDate = (this.currentDate.getMonth() + 1) + '/' + (this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();

        } catch (ex) {
            this.clientErrorMsg(ex, "page_Load");
        }
    }

    async ddlStatus_selectChanged(event) {
        try {
            this.statusMsgs = [];
            if (event != null) {
                this.selectedStatus = event.label;
                await this.page_Load();
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ddlStatus_selectChanged");
        }
    }

    async btnGo_Click() {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            this.pop = false;
            this.table = false;
            this.lstTkitOrderDetails = [];
            this.ddlSelectRequest = [];
            this.selectedRequest = "Select RequestID";
            this.currentFromDate = new Date();
            if (this.selectedStatus == "Select Status" || this.selectedStatus == "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid status" });
                return;
            }
            if (this.txtFrmDate == null || this.txtToDate == null) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select a valid date range" });
                return;
            }
            else if (this.txtToDate != "" && this.txtFrmDate != "") {
                var toDate = new Date(this.txtToDate);
                toDate.setHours(0, 0, 0, 0);
                this.currentDate.setHours(0, 0, 0, 0);
                var fromDate = new Date(this.txtFrmDate);
                fromDate.setHours(0, 0, 0, 0);
                if (toDate > this.currentDate) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date" });
                    return;
                }
                if (fromDate > toDate) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "FromDate must be less than Todate" });
                    return;
                }
            }

            this.txtFrmDate = (fromDate.getMonth() + 1) + '/' + fromDate.getDate() + '/' + fromDate.getFullYear();
            this.txtToDate = (toDate.getMonth() + 1) + '/' + toDate.getDate() + '/' + toDate.getFullYear();
            await this.populateOrderIDs(this.txtFrmDate, this.txtToDate, this.selectedStatus);
            //this.requestDetailsVisibility(false);
        } catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click");
        }

    }

    async ddlRequest_selectChanged(event) {
        try {
            this.statusMsgs = [];
            if (event != null) {
                this.selectedRequest = event.label;
                if (this.selectedRequest != this.previousRequest && this.lstTkitOrderDetails != null && this.lstTkitOrderDetails.length > 0) {
                    this.table = false;
                } else if (this.selectedRequest == this.previousRequest && this.lstTkitOrderDetails != null && this.lstTkitOrderDetails.length > 0) {
                    this.table = true;
                } else if (this.lstTkitOrderDetails == null) {
                    this.table = false;
                }
                this.previousRequest = event.label;

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "ddlRequest_selectChanged");
        }
    }

    async btnShowDetails_Click() {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            this.lstTkitOrderDetails = [];
            this.table = false;
            this.btnUpdateItems = true;
            this.blnErDateTime = true;
            this.imgBasePath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/Web/Uploaded';

            if (this.selectedRequest == "Select RequestID" || this.selectedRequest == "" ||
                this.selectedRequest == undefined) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid RequestID" });
                return;
            }

            await this.tkitReqstStatusService.getOrderDetails(this.deviceTokenEntry[TokenEntry_Enum.UserID].toString(), this.selectedStatus, this.selectedRequest).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_TKIT_ORDER_DETAILS>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstTkitOrderDetails = data.DataList;
                            if (this.lstTkitOrderDetails != null && this.lstTkitOrderDetails.length > 0) {
                                this.table = true;
                                //Code to display Req no:
                                this.lblReqNumber = this.selectedRequest;
                                this.lblOrderComments = this.lstTkitOrderDetails[0].ORDER_COMMENTS;
                                var dateStr = new Date(this.lstTkitOrderDetails[0].ORDER_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                this.lblReqDate = dateStr.replace(',', '');
                                if (this.lstTkitOrderDetails.length == 1 &&
                                    this.lstTkitOrderDetails[0].DELIVER_ITEM_STATUS == enum_TKIT_OrderStatus[enum_TKIT_OrderStatus.Cancelled].toString().toUpperCase()) {
                                    this.btnUpdateItems = false;
                                }
                                //this.requestDetailsVisibility(true);
                                for (let i = 0; i < this.lstTkitOrderDetails.length; i++) {
                                    this.lstTkitOrderDetails[i].blnErDateTime = true;
                                    if (this.lstTkitOrderDetails[i].IMAGE != null && this.lstTkitOrderDetails[i].IMAGE != "") {
                                        this.lstTkitOrderDetails[i].IMAGE = this.imgBasePath + '/' + this.lstTkitOrderDetails[i].IMAGE;
                                        //this.lstTkitOrderDetails[i].IMAGE = this.httpService.BaseUrl + '/Uploaded/' + this.lstTkitOrderDetails[i].IMAGE;
                                    }
                                    if (this.lstTkitOrderDetails[i].ITEM_TYPE_INDICATOR == "F") {
                                        this.lstTkitOrderDetails[i].blnErDateTime = false;
                                    }
                                    if (this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS != null &&
                                        this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS != "") {
                                        if (this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == enum_TKIT_OrderStatus[enum_TKIT_OrderStatus.Cancelled].toString().toUpperCase() ||
                                            this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == enum_TKIT_OrderStatus[enum_TKIT_OrderStatus.Delivered].toString().toUpperCase() ||
                                            this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == "DELV") {
                                            this.lstTkitOrderDetails[i].CHKDisable = true;
                                        } else {
                                            this.lstTkitOrderDetails[i].CHKDisable = false;
                                        }

                                        if (this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == enum_TKIT_OrderStatus[enum_TKIT_OrderStatus.Delivered].toString().toUpperCase() ||
                                            this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == "DELV") {
                                            this.lstTkitOrderDetails[i].blnErDateTime = true;
                                        }
                                    }
                                }

                                if (this.lblOrderComments == "") {
                                    //trOrderComments.Visible = false;
                                }
                            } else {
                                // this.requestDetailsVisibility(false);
                            }

                            this.statusCode = data.StatusCode;
                            this.table = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex, "btnShowDetails_Click");
        }
    }

    chkChanged(rowData, event) {
        try {
            this.statusMsgs = [];
            if (event != null) {
                rowData.CHK_VALUE = event;
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "chkChanged");
        }
    }

    async btnUpdateItems_Click() {
        try {
            this.statusCode = -1;
            this.statusMsgs = [];
            this.confirmationService.confirm({
                message: "Are you sure you want to update the changes?",
                accept: async () => {
                    for (let i = 0; i < this.lstTkitOrderDetails.length; i++) {

                        if (this.lstTkitOrderDetails[i].CHK_VALUE == true) {
                            this.lstTkitOrderDetails[i].CHK_VALUE = "1";
                        } else {
                            this.lstTkitOrderDetails[i].CHK_VALUE = "0";
                        }

                        var dateStr = new Date(this.lstTkitOrderDetails[i].ESTIMATED_RETURN_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        this.lstTkitOrderDetails[i].ESTIMATED_RETURN_DATE = dateStr.replace(',', '');

                        if (this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS != null && this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS != "") {
                            if (this.lstTkitOrderDetails[i].DELIVER_ITEM_STATUS.toUpperCase() == "DELV") {
                                var erDateTime = new Date(this.lstTkitOrderDetails[i].ESTIMATED_RETURN_DATE);
                                erDateTime.setHours(0, 0, 0, 0);
                                this.currentDate = new Date();
                                this.currentDate.setHours(0, 0, 0, 0);

                                if (erDateTime < this.currentDate) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Change Return Date should be greater than Current Date" });
                                    return;
                                }
                            }
                        }

                    }
                    await this.tkitReqstStatusService.updateOrder(this.deviceTokenEntry[TokenEntry_Enum.UserID].toString(), this.selectedStatus, this.lstTkitOrderDetails).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let data = res.json() as AtParWebApiResponse<number>;
                            this.statusCode = data.StatusCode;
                            switch (data.StatType) {
                                case StatusType.Success: {
                                    let msg = AtParConstants.Updated_Msg.replace("1%", "").replace("2%", "");
                                    this.statusMsgs.push({
                                        severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg
                                    });

                                    this.table = false;
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    this.spnrService.stop();
                                    break;
                                }
                            }
                        });
                    this.spnrService.stop();
                },
                reject: () => {

                    this.spnrService.stop();
                    return;
                }
            });
            this.spnrService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex, "btnUpdateItems_Click");
        }
    }

    private async populateOrderIDs(pFromDate, pToDate, pStatus: string) {
        try {
            this.statusMsgs = [];
            this.statusCode = -1;
            this.ddlSelectRequest = [];
            this.ddlSelectRequest.push({ label: "Select RequestID", value: "Select RequestID" });
            let tkitOrderDetails: VM_TKIT_ORDER_DETAILS[] = [];
            await this.tkitReqstStatusService.getOrderIds(pFromDate.toString(), pToDate.toString(), pStatus).//
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_TKIT_ORDER_DETAILS>;
                    this.spnrService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            tkitOrderDetails = data.DataList;
                            if (tkitOrderDetails != null && tkitOrderDetails.length > 0) {
                                for (let i = 0; i < tkitOrderDetails.length; i++) {
                                    this.ddlSelectRequest.push({ label: tkitOrderDetails[i].ORDER_NUMBER.toString(), value: tkitOrderDetails[i].ORDER_NUMBER.toString() });
                                }
                                this.pop = true;
                            }
                            this.statusCode = data.StatusCode;
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusCode = data.StatusCode;
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

        } catch (ex) {
            this.clientErrorMsg(ex, "populateOrderIDs");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.spnrService.stop();
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString, funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.lstTkitOrderDetails = null;
        this.ddlSelectStatus = null;
        this.ddlSelectRequest = null;
        this.ddlStatusLst = null;
    }


    //ddlStatusChanged(statusLst, event) {
    //    this.statusMsgs = [];
    //    try {
    //        if (event != null && event != undefined) {
    //            statusLst.DELIVER_ITEM_STATUS = event.value;
    //        }
    //    } catch (ex) {
    //        this.clientErrorMsg(ex,"ddlStatusChanged");
    //    }
    //}

}


//private async requestDetailsVisibility(flag: boolean) {
    //    try {

    //    } catch (ex) {
    //        this.clientErrorMsg(ex);
    //    }
    //}

     //onfocusToCalendar(e) {
    //    this.date2 = null;
    //    if (this.date1 == null) {
    //        this.minDateValue2 = new Date();
    //    } else {
    //        this.minDateValue2 = this.date1;
    //    }
    //}

    //onfocusFromCalendar(e) {
    //    localStorage.removeItem("FromDate");
    //    this.date1 = null;
    //}

