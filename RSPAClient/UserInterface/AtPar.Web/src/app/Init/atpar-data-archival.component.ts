import { Component, OnDestroy } from '@angular/core';
import { Http, Response } from "@angular/http";
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { Message, SelectItem } from './../components/common/api';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { StatusType, EnumApps, YesNo_Enum, TokenEntry_Enum } from './../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { DataArchivalService } from './atpar-data-archival.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { MT_ATPAR_APP } from '../Entities/MT_ATPAR_APP';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from '../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-data-archival.component.html',
    providers: [AtParCommonService, HttpService, datatableservice, DataArchivalService, AtParConstants, ConfirmationService]
})

export class DataArchival {
    table: boolean = false;
    form: boolean = false;
    _deviceTokenEntry: string[] = [];
    appID: string;
    menuCode: string;
    ddlProductType: SelectItem[] = [];
    growlMessage: Message[] = [];
    lstproducts: MT_ATPAR_APP[] = [];
    selectedProduct: string;
    archiveDate: string;

    constructor(private dataservice: datatableservice,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private httpService: HttpService,
        private dataArchivalService: DataArchivalService,
        private confirmationService: ConfirmationService) {
    }
    async  btnGo_Click() {
        try {
          
            this.spinnerService.start();
            await this.dataArchivalService.doArchivalData(this.selectedProduct, this.formateDate(this.archiveDate))
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let atweb = res.json() as AtParWebApiResponse<MT_ATPAR_APP>
                    this.spinnerService.stop();
                    switch (atweb.StatType) {
                        case StatusType.Success: {
                            this.bindProducts();
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Data Purge is Successful" });
                            break;
                        }
                        case StatusType.Warn: {
                            if (atweb.StatusCode == AtparStatusCodes.E_NO_ARCHIVE_DATABASE) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set archive database details in Configuration Manager Screen'
                                });
                            }
                            else if (atweb.StatusCode == AtparStatusCodes.E_INVALID_ARCHIVE_DATABASE) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set valid database details in Configuration Manager Screen'
                                });
                            }
                            else if (atweb.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data found to Purge"
                                });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Error occured while data purging " });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Error occured while data purging " });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex) {
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Error occured while data purging " });            
            this.spinnerService.stop();
            //this.clientErrorMsg(ex,"btnGo_Click");
        }
    }
    close() {
        this.table = true;
        this.form = false;
    }
    async  ngOnInit() {
        try {
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.appID = (EnumApps.Auth).toString();
            this.menuCode = 'mt_atpar_data_archival.aspx';
            this.spinnerService.start();
            await this.bindProducts();
            this.spinnerService.stop();
        } catch (exMsg) {
            this.clientErrorMsg(exMsg,"ngOnInit");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    }
    async bindProducts() {
        try {

            this.ddlProductType = [];
            this.ddlProductType.push({ label: "Select One", value: "Select One" });
            await this.dataArchivalService.getPurgeAppIDs()
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let atweb = res.json() as AtParWebApiResponse<MT_ATPAR_APP>
                    switch (atweb.StatType) {
                        case StatusType.Success: {
                            this.lstproducts = atweb.DataList;
                            
                            for (var i = 0; i < this.lstproducts.length; i++) {
                                this.ddlProductType.push({ label: this.lstproducts[i].APP_NAME, value: this.lstproducts[i].APP_ID });
                            }
                            //var currentDate = new Date().getMonth().toString() + "/" + new Date().getDay().toString() + "/" + new Date().getFullYear();
                            this.archiveDate = this.formateDate(new Date().toDateString());

                            this.selectedProduct = this.ddlProductType[0].value;
                            break;
                        }
                        case StatusType.Warn: {
                            if (atweb.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Products found for data purging " });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex,"bindProducts");
        }
    }

    formateDate(date: string): string {

        //var customDate = new Date(date).getMonth().toString() + "/" + new Date(date).getDay().toString() + "/" + new Date(date).getFullYear();
        var today: any = new Date(date);
        var dd: any = today.getDate();
        var mm: any = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        return today;

        //return this.archiveDate;
    }

    confirm() {
        try {
            this.growlMessage = [];
            if (this.selectedProduct == "Select One") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Product' });
                return;
            }
            // var rowData: any;
            var compareDates = new Date(this.archiveDate);
            var currentDate = new Date();
            if (compareDates.getTime() > currentDate.getTime()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date " });
                return;
            }
            this.confirmationService.confirm({
                message: 'Are you sure you want to archive the data ? ',
                accept: () => {
                    this.btnGo_Click();

                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex,"confirm");
        }
    }
    ngOnDestroy() {
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.ddlProductType = [];
        this.lstproducts = [];
        this.spinnerService.stop();
        this.archiveDate = null;
    }

}