import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { ModeEnum } from '../Shared/AtParEnums'
import { StatusType } from './../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_TOKENS } from "../../app/Entities/MT_ATPAR_TOKENS";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { ManageTokensService } from "../../app/Init/atpar-manage-tokens.service";
import { Message } from './../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
import { ConfirmationService } from '../components/common/api';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-manage-tokens.component.html',
    providers: [ManageTokensService, AtParConstants, ConfirmationService]
})

export class ManageTokensComponent {
    //Common variables
    msgs: Message[] = [];
    deviceTokenEntry: string[] = [];
    statusCode: number = 0;

    userId: string = "";
    mode: string;
    statusMesssage: string;
    // pazeSize: any;
    pageSize: number;
    expiredListStatus: boolean = false;
    isVisible: boolean = false;

    preField: string = "";
    blnSortByColumn: boolean = true;

    tokens: MT_ATPAR_TOKENS[];
    originalDataSet: MT_ATPAR_TOKENS[];
    constructor(private manageTokensService: ManageTokensService,
        private route: ActivatedRoute,

        private atParSharedDataService: AtParSharedDataService,
        private spinnerService: SpinnerService,
        public router: Router,
        private atParConstant: AtParConstants,
        private confirmationService: ConfirmationService,
    ) {
    }

    ngOnInit(): void {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.route.queryParams.subscribe(params => {

                let statusMessage = params["statusMessage"];
                this.mode = params["mode"];
                let statusType = params["statusType"];

                if (statusType !== null && statusType != undefined) {
                    if (statusType == "success") {
                        this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                    }
                }
                if (statusType == "warn") {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                }
            });
            this.bindGrid();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }
    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    bindGrid() {
        this.isVisible = false;
        this.spinnerService.start();
        try {
            let checkValue: number;
            if (this.expiredListStatus == false) {
                checkValue = 0;
            }
            else {
                checkValue = 1;
            }

            this.manageTokensService.getLiveTokens(checkValue).forEach(resp => {

                switch (resp.StatType) {
                    case StatusType.Success: {
                        this.isVisible = true;
                        this.originalDataSet = [];
                        this.originalDataSet = resp.DataList;
                        this.spinnerService.stop();
                        for (let i = 0; i < this.originalDataSet.length; i++) {

                            let changeDate = this.originalDataSet[i].REQUEST_TIME;
                            var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');                            
                            this.originalDataSet[i].REQUEST_TIME = dateStr.replace(',','')  
                            let changeDate1 = this.originalDataSet[i].EXPIRY_TIME;
                            var dateStr1 = new Date(changeDate1).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                            var date1 = new Date(dateStr1);
                            let dt = date1.toDateString();
                            this.originalDataSet[i].EXPIRY_TIME = dateStr1.replace(',', '');  
                            if (this.originalDataSet[i].PRODUCTS_ACCESS == "" || this.originalDataSet[i].PRODUCTS_ACCESS == null || this.originalDataSet[i].PRODUCTS_ACCESS == undefined) {
                                this.originalDataSet[i].PRODUCTS_ACCESS = "";
                            }
                            else if (this.originalDataSet[i].PRODUCTS_ACCESS != "" || this.originalDataSet[i].PRODUCTS_ACCESS != null || this.originalDataSet[i].PRODUCTS_ACCESS != undefined) {
                                this.originalDataSet[i].PRODUCTS_ACCESS = this.originalDataSet[i].PRODUCTS_ACCESS.replace(' ', '');
                                this.originalDataSet[i].PRODUCTS_ACCESS = this.originalDataSet[i].PRODUCTS_ACCESS.replace(/,/g, '&nbsp;&nbsp;&nbsp;&nbsp;')

                            }
                            this.originalDataSet[i].EXPIRY_TIMES = this.originalDataSet[i].EXPIRY_TIME;
                            this.originalDataSet[i].REQUEST_TIMES = this.originalDataSet[i].REQUEST_TIME;
                        }

                       // this.originalDataSet = asEnumerable(this.originalDataSet).OrderBy(x => x.USER_ID).ToArray();

                        // this.filterTokensValue(this.expiredListStatus);
                        this.statusCode = resp.StatusCode;
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }

            });
        } catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "bindGrid");
        }
    }

    public showExperiedList(expiredListStatus) {
        this.expiredListStatus = expiredListStatus;
        this.bindGrid();
    }

    confirm(rowData) {
        try {
            this.msgs = [];
            this.confirmationService.confirm({
                message: 'Do you want to delete the token for ' + rowData.USER_ID,
                accept: () => {
                    this.deleteToken(rowData);
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirm");
        }
    }
    async deleteToken(token: MT_ATPAR_TOKENS) {
        try {
            this.msgs = [];
            this.spinnerService.start();
            await this.manageTokensService.deleteTokenEntry(token.ACCESS_TOKEN).forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success: {
                        this.statusMesssage = "Deleted token successfully for " + token.USER_ID;
                        this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                        this.bindGrid();
                        break;
                    }
                    case StatusType.Error: {
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "deleteToken");
        }
    }

    confirmAll(rowData) {
        try {
            this.msgs = [];
            var rowData: any;
            this.confirmationService.confirm({
                message: 'Do you want to delete all Expired Tokens?',
                accept: () => {
                    this.deleteAllExpiredTokens();

                }
            });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirmAll");
        }
    }

    public deleteAllExpiredTokens() {
        try {
            this.msgs = [];
            this.manageTokensService.runTokenGC().forEach(resp => {
                switch (resp.StatType) {
                    case StatusType.Success: {
                        this.statusMesssage = "Deleted all expired tokens successfully";
                        this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                        this.bindGrid();
                        break;
                    }
                    case StatusType.Error: {
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "deleteAllExpiredTokens");
        }
    }

    customSort(event, elementname) {
        var element = event;
        //this.eventDetails = [];
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;

        } else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;


        try {

            this.originalDataSet = this.originalDataSet.sort(function (a, b) {
              let dateA = new Date(a[elementname]).getTime();
                let dateB = new Date(b[elementname]).getTime();
                return dateA > dateB ? 1 : -1;


            });


            if (this.blnSortByColumn == false) {
                this.originalDataSet = this.originalDataSet.reverse();
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }

    }

}