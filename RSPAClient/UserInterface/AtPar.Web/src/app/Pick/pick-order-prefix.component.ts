import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MT_PKPL_ORDER_PREFIX } from '../../app/Entities/MT_PKPL_ORDER_PREFIX';
import { VM_PKPL_ORDER_PREFIX } from '../../app/Entities/VM_PKPL_ORDER_PREFIX';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { ConfirmationService } from '../components/common/api';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { BusinessType } from '../Shared/AtParEnums';
import { StatusType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from '../components/common/api';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pick-order-prefix.component.html',
    providers: [HttpService, ConfirmationService, AtParCommonService, AtParConstants],
})

export class OrderPrefixComponent implements OnInit {
    deviceTokenEntry: string[] = [];
    lstCheckedPrefix: Array<VM_PKPL_ORDER_PREFIX>;
    lstDBData: VM_PKPL_ORDER_PREFIX[];
    lstDBDataSave: MT_PKPL_ORDER_PREFIX[];
    lstgridfilterData: VM_PKPL_ORDER_PREFIX[];
    startIndex: number;
    EndIndex: number;
    growlMessage: Message[] = [];
    blnStatusMsg: boolean = false;
    statusMsg: string = "";
    dataCheckedSorting: VM_PKPL_ORDER_PREFIX[] = [];
    dataUncheckedSorting: Array<VM_PKPL_ORDER_PREFIX>;
    sortedcheckedrec: VM_PKPL_ORDER_PREFIX[];
    sorteduncheckedrec: VM_PKPL_ORDER_PREFIX[];
    blnsortbycolumn: boolean = true;
    recordsPerPageSize: number;
    custom: string = "custom";

    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService) {

    }

    ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedPrefix = new Array<VM_PKPL_ORDER_PREFIX>();
        this.dataCheckedSorting = new Array<VM_PKPL_ORDER_PREFIX>();
        this.dataUncheckedSorting = new Array<VM_PKPL_ORDER_PREFIX>();
        this.lstDBDataSave = new Array<MT_PKPL_ORDER_PREFIX>();
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.getOrderPrefixSetUp();
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstCheckedPrefix = null;
        this.lstDBData = null;
        this.lstDBDataSave = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }

    myfilterdata(event) {
        try {
            this.lstgridfilterData = new Array<VM_PKPL_ORDER_PREFIX>();
            this.lstgridfilterData = event;

        }
        catch (ex) {
            this.clientErrorMsg(ex, "myfilterdata");
        }
    }


    checkAll() {
        try {
            this.lstCheckedPrefix = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedPrefix.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedPrefix.push(this.lstDBData[i]);
                }

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    unCheckAll() {
        try {
            this.lstCheckedPrefix = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedPrefix.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedPrefix.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }

    }

    selectedRow(values: any, event) {
        try {
            this.spinnerService.start();
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }

            for (var i = 0; i < this.lstCheckedPrefix.length; i++) {
                if (this.lstCheckedPrefix[i].BEG_SEQ === values.BEG_SEQ) {
                    var index = this.lstCheckedPrefix.indexOf(this.lstCheckedPrefix[i], 0)
                    this.lstCheckedPrefix.splice(index, 1);
                }
            }
            this.lstCheckedPrefix.push(values);

        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow")
        }
        finally {
            setTimeout(() => {
                this.spinnerService.stop();
            },50)
            
        }

    }

    customSort(event) {
        try {
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
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    }

    async getOrderPrefixSetUp() {
        try {
            this.lstgridfilterData = null;
            this.spinnerService.start();

            this.httpService.get({
                "apiMethod": "/api/OrderPrefix/GetOrderPrefixSetUp",
                params: {}

            }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<VM_PKPL_ORDER_PREFIX>)
                .subscribe((response) => {
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.lstDBData = response.DataList;
                            for (let i = 0; i <= response.DataList.length - 1; i++) {
                                if (response.DataList[i].CHK_VALUE == 1) {
                                    response.DataList[i].checkvalue = true;
                                }
                                else {
                                    response.DataList[i].checkvalue = false;
                                }
                            }
                            this.lstDBData = response.DataList;
                            this.dataCheckedSorting = [];
                            this.dataUncheckedSorting = [];

                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                if (this.lstDBData[i].CHK_VALUE == 1) {
                                    this.dataCheckedSorting.push(this.lstDBData[i]);
                                }
                                else {
                                    this.dataUncheckedSorting.push(this.lstDBData[i]);
                                }
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getOrderPrefixSetUp");
        }
    }

    async saveOrderPrefixSetUp() {
        this.spinnerService.start();
        this.lstDBDataSave = [];
        let prefixObj: any;
        for (let i = 0; i < this.lstDBData.length; i++) {
            prefixObj = new MT_PKPL_ORDER_PREFIX();
            prefixObj.CHK_VALUE = this.lstDBData[i].CHK_VALUE;
            prefixObj.ORDER_PREFIX = this.lstDBData[i].BEG_SEQ;
            prefixObj.PREFIX_DESCR = '';
            this.lstDBDataSave.push(prefixObj);
        }
        try {
            this.httpService.create({
                "apiMethod": "/api/OrderPrefix/SaveOrderPrefixSetUp",
                formData: this.lstDBDataSave,
                params: {}
            }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_PKPL_ORDER_PREFIX>).subscribe(
                (response) => {
                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.getOrderPrefixSetUp();
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex,"saveOrderPrefixSetUp");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    } 

} 
