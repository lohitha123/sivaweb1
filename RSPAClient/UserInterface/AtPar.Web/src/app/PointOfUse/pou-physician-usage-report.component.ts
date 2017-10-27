import { Component, OnDestroy, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { Message } from '../components/common/api';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParConstants } from '../Shared/AtParConstants';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { StatusType } from '../Shared/AtParEnums';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { EnumApps, MailPriority } from '../Shared/AtParEnums';
import { Menus } from '../AtPar/Menus/routepath';
import { MT_POU_PHYSICIAN } from "../entities/mt_pou_physician";
import { VM_POU_REASON_PROC_COST_CASE_SPEC_CODES } from "../Entities/VM_POU_REASON_PROC_COST_CASE_SPEC_CODES";
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { PhysicianUsageReportServiceComponent } from './pou-physician-usage-report.component.service';
import { VM_POU_PHYSICIAN_USAGE_HEADER } from '../../app/Entities/VM_POU_PHYSICIAN_USAGE_HEADER';
import { MT_ATPAR_CHART } from '../../app/Entities/MT_ATPAR_CHART';
import { VM_POU_PHYSICIAN_USAGE_DETAILS } from '../../app/Entities/VM_POU_PHYSICIAN_USAGE_DETAILS';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { saveAs } from 'file-saver';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pou-physician-usage-report.component.html',
    providers: [datatableservice, AtParCommonService, PhysicianUsageReportServiceComponent, AtParConstants]
})

export class PhysicianUsageReportComponent {
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    breadCrumbMenu: Menus;
    selectedPhysician: string = "";
    selectedPhysicianValue: string = ""
    selectedProcedure: string = "";
    selectedProcedureValue: string = "";
    lstPhysiciansItems: any = [];
    lstPhysiciansItemsList: any = [];
    lstPhysicians: MT_POU_PHYSICIAN[];
    lstProcedureCodes: VM_POU_REASON_PROC_COST_CASE_SPEC_CODES[];
    lstProcedureCodesItems: VM_POU_REASON_PROC_COST_CASE_SPEC_CODES[];
    lstDBData: VM_POU_PHYSICIAN_USAGE_HEADER[] = [];
    lstgridfilterData: VM_POU_PHYSICIAN_USAGE_HEADER[];
    lstFormData: VM_POU_PHYSICIAN_USAGE_HEADER[] = [];
    lstCompareDetailsData: VM_POU_PHYSICIAN_USAGE_HEADER[] = [];
    lstCompareHeadersData: VM_POU_PHYSICIAN_USAGE_HEADER[] = [];
    lstDBDetailsData: VM_POU_PHYSICIAN_USAGE_DETAILS[] = [];
    lstcompareData1: VM_POU_PHYSICIAN_USAGE_DETAILS[] = [];
    lstcompareData2: VM_POU_PHYSICIAN_USAGE_DETAILS[] = [];
    lstcompareData3: VM_POU_PHYSICIAN_USAGE_DETAILS[] = [];
    lstcompareData4: VM_POU_PHYSICIAN_USAGE_DETAILS[] = [];
    lstFinalComparedate: VM_POU_PHYSICIAN_USAGE_DETAILS[] = [];
    strCode: string = "";
    strDescr: string = "";
    strProcedureCode: string = "procedures";
    defDateRange: number = 0;
    statusCode: number = -1;
    fromDate: Date;
    toDate: Date;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    showGrid: boolean = false;
    Chartdata: any = [];
    data: any = [];
    detailsChartData: any = [];
    label: string[] = [];
    dataSetlabel: string[] = [];
    dataSetbgcolor: string[] = [];
    dataSetbordercolor: string[] = [];
    dataSetdata: number[] = [];
    showControls: boolean = true;
    showGridForDetails: boolean = false;
    tdExports: boolean = false;
    lblProcedureCode: string = "";
    option: any;
    showDetailsGridForSingleRow: boolean = false;
    startIndex: number;
    EndIndex: number;
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    totalRetCost: any = 0;
    totalUsedCost: any = 0;
    totalWastageCost: any = 0;
    noOfrecordsMsg: string = "";
    phyName: string = "";
    constructor(private httpService: HttpService, private _http: Http, public dataservice: datatableservice,
        private commonService: AtParCommonService,
        private physicianUsageService: PhysicianUsageReportServiceComponent,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private router: Router,
        private route: ActivatedRoute,
        private atParSharedDataService: AtParSharedDataService) {
        this.breadCrumbMenu = new Menus();
    }

    async ngOnInit() {
        this.spinnerService.start();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.statusCode = await this.getDefDateRange();
        if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
            this.spinnerService.stop();
            return;
        }

        this.fromDate = new Date();
        this.fromDate = await this.addDays(this.fromDate, this.defDateRange);
        this.toDate = new Date();
        this.spinnerService.stop();

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

    async fillPhysiciansAuto(event) {

        this.lstPhysiciansItems = [];
        this.lstPhysiciansItemsList = [];
        let query = event.query;
        try {

            await this.commonService.getPhysicians().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_PHYSICIAN>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstPhysicians = data.DataList;
                            this.lstPhysiciansItemsList = this.filterPhysicianItems(query, this.lstPhysicians)
                            this.lstPhysiciansItems = [];
                            for (let i = 0; i <= this.lstPhysiciansItemsList.length - 1; i++) {
                                this.lstPhysiciansItems[i] = this.lstPhysiciansItemsList[i].FIRST_NAME + " " + this.lstPhysiciansItemsList[i].MIDDLE_INITIAL + " " + this.lstPhysiciansItemsList[i].LAST_NAME + "(" + this.lstPhysiciansItemsList[i].PHYSICIAN_ID + ")";
                            }
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
            this.clientErrorMsg(ex);
        }
    }

    filterPhysicianItems(query, items: any[]) {
        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if ((filtered.filter(x => x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID)).length == 0) {
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.PHYSICIAN_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.FIRST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.MIDDLE_INITIAL.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.LAST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(x => x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID ||
                            x.FIRST_NAME == itemValue.FIRST_NAME ||
                            x.MIDDLE_INITIAL == itemValue.MIDDLE_INITIAL ||
                            x.LAST_NAME == itemValue.LAST_NAME)).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    }

    async fillProceduresAuto(event) {
        this.lstProcedureCodesItems = [];
        this.lstProcedureCodes = [];
        let query = event.query;
        try {
            await this.commonService.getCodes(this.strProcedureCode, this.strCode, this.strDescr).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstProcedureCodesItems = data.DataList;
                            this.lstProcedureCodes = this.filterProcedureCodesItems(query, this.lstProcedureCodesItems);
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
            this.clientErrorMsg(ex);
        }
    }

    filterProcedureCodesItems(query, items: any[]) {
        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if (items[i].CODE !== "") {
                    let itemValue = items[i].CODE + " - " + items[i].DESCRIPTION;
                    filtered.push(itemValue);
                }
                //else if (items[i].CODE !== "" && items[i].DESCRIPTION === "") {
                //    let itemValue = items[i].CODE;
                //    filtered.push(itemValue);
                //}
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
                        //else if (items[i].CODE !== "" && items[i].DESCRIPTION === "") {
                        //    let itemValue = items[i].CODE;
                        //    filtered.push(itemValue);
                        //}

                    }
                }
            }
        }
        return filtered;
    }

    async bindGrid() {
        this.growlMessage = [];
        if (this.selectedProcedure == undefined || this.selectedProcedure === "") {

            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select procedure" });
            return;
        }
        if (this.fromDate > this.toDate) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
            return;
        }
        var presentDate = new Date();
        if (this.toDate > presentDate) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should not be greater than Present Date" });
            return;
        }
        if (this.fromDate > presentDate) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should not be greater than Present Date" });
            return;
        }
        this.showDetailsGridForSingleRow = false;
        this.showGridForDetails = false;
        this.showGrid = false;
        this.tdExports = false;
        this.spinnerService.start();
        let cDate = new Date();
        cDate.setDate(this.toDate.getDate() + 1);

        let frmDate = this.convert(this.fromDate);
        let todate = this.convert(cDate);
        if (this.selectedPhysician !== "") {
            this.selectedPhysicianValue = this.selectedPhysician.split("(")[1].replace(")", "").trim();
        }
        this.selectedProcedureValue = this.selectedProcedure.split("-")[0].trim();
        this.lblProcedureCode = this.selectedProcedure;
        try {
            await this.physicianUsageService.GetPhysicianUsage(this.selectedPhysicianValue, this.selectedProcedureValue, frmDate, todate, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]
            ).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_HEADER>;
                this.growlMessage = [];

                switch (data.StatType) {
                    case StatusType.Success: {
                        this.showGrid = true;
                        this.tdExports = true;
                        let bgcolor = "#3391CE";
                        let borderColor = "#1E88E5";
                        let label = "data";

                        this.label = [];
                        this.dataSetbgcolor = [];
                        this.dataSetdata = [];
                        this.dataSetbordercolor = [];
                        this.lstDBData = data.DataList;

                        for (let i = 0; i <= data.DataList.length - 1; i++) {

                            this.lstDBData[i].TOTALCOST = parseFloat(this.lstDBData[i].TOTALCOST).toFixed(2);
                            this.lstDBData[i].UNUSEDCOST = parseFloat(this.lstDBData[i].UNUSEDCOST).toFixed(2);
                            this.lstDBData[i].RETURNCOST = parseFloat(this.lstDBData[i].RETURNCOST).toFixed(2);
                            var perFormDate = [];
                            if (data.DataList[i].PERFORM_DATE != '' && data.DataList[i].PERFORM_DATE != null) {
                                perFormDate = data.DataList[i].PERFORM_DATE.split(':');
                                this.lstDBData[i].STRPERFORM_DATE = perFormDate[0] + ":" + perFormDate[1];
                            }

                            let labelName = data.DataList[i].STRPERFORM_DATE + " " + data.DataList[i].PHYSICIAN_NAME
                           // labelName = labelName.replace("'", "\n");
                            this.label.push(labelName);
                            this.dataSetdata.push(data.DataList[i].TOTALCOST);
                            this.dataSetbgcolor.push(bgcolor);
                            this.dataSetbordercolor.push(borderColor);
                        }

                        this.option = {
                            scales: {
                                
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Total Cost'

                                    }
                                }],
                                xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Physician'

                                    }
                                }]
                            }
                            , title: {
                                display: true,
                                text: "Physician Usage"
                            },
                            legend: {
                                display: false
                            }
                            ,
                            animation: {
                                onComplete: function () {
                                    var chartInstance = this.chart,
                                        ctx = chartInstance.ctx;
                                    ctx.textAlign = 'center';
                                    ctx.fillStyle = "#34251B";
                                    ctx.textBaseline = 'bottom';
                                    this.data.datasets.forEach(function (dataset, i) {
                                        var meta = chartInstance.controller.getDatasetMeta(i);
                                        meta.data.forEach(function (bar, index) {
                                            var data = dataset.data[index];
                                            let convString = "$"+data.toString()
                                            if (data == 0) {
                                                var value = bar._model.y;
                                            }
                                            else if (data > 0 && data < 1) {
                                                var value = bar._model.y;
                                            }
                                            else {
                                                var value = bar._model.y + 30;
                                            }
                                            ctx.fillText(convString, bar._model.x, value);
                                        });
                                    });
                                }
                            }
                        };

                        this.data = {
                            labels: this.label,
                            datasets: [
                                {
                                    label: '',
                                    backgroundColor: this.dataSetbgcolor,
                                    borderColor: this.dataSetbordercolor,
                                    data: this.dataSetdata,

                                }
                            ],
                            options: this.option

                        }

                        this.noOfrecordsMsg = data.DataList.length + " Record(s) Found";
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        this.showGrid = false;
                        this.tdExports = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Error: {
                        this.showGrid = false;
                        this.tdExports = false;
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Custom: {
                        this.showGrid = false;
                        this.tdExports = false;
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                }

            });

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    async selectedDetailsRow(ven: VM_POU_PHYSICIAN_USAGE_HEADER) {
        this.spinnerService.start();
        this.showGrid = false;
        this.showControls = false;
        this.showGridForDetails = false;
        this.showDetailsGridForSingleRow = false;
        this.tdExports = false;
        this.lstFormData = [];
        this.lstFormData.push(ven);
        try {
            await this.physicianUsageService.GetPhysicianCompareDetails(this.lstFormData).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_DETAILS>;
                this.growlMessage = [];

                switch (data.StatType) {
                    case StatusType.Success: {
                        this.showDetailsGridForSingleRow = true;
                        let bgcolor = "#3391CE";
                        let borderColor = "#1E88E5";
                        let label = "data";

                        this.label = [];
                        this.dataSetbgcolor = [];
                        this.dataSetdata = [];
                        this.dataSetbordercolor = [];


                        for (let i = 0; i <= this.lstFormData.length - 1; i++) {
                            let labelName = this.lstFormData[i].PERFORM_DATE + " Dr." + this.lstFormData[i].PHYSICIAN_NAME
                            this.label.push(labelName);
                            this.dataSetdata.push(this.lstFormData[i].TOTALCOST);
                            this.dataSetbgcolor.push(bgcolor);
                            this.dataSetbordercolor.push(borderColor);

                        }

                        this.option = {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Total Cost'

                                    }
                                }],
                                xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Physician'

                                    }
                                }]
                            },
                            
                            title: {
                                display: true,
                                text: "Physician Usage"
                            },
                            legend: {
                                display: false
                            },
                            animation: {
                            onComplete: function () {
                                var chartInstance = this.chart,
                                    ctx = chartInstance.ctx;
                                ctx.textAlign = 'center';
                                ctx.fillStyle = "#34251B";
                                ctx.textBaseline = 'bottom';
                                this.data.datasets.forEach(function (dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        let convString = "$" + data.toString()
                                        if (data == 0) {
                                            var value = bar._model.y;
                                        }
                                        else if (data > 0 && data < 1) {
                                            var value = bar._model.y;
                                        }
                                        else {
                                            var value = bar._model.y + 30;
                                        }
                                        ctx.fillText(convString, bar._model.x, value);
                                    });
                                });
                            }
                        }

                        };

                        this.detailsChartData = {
                            labels: this.label,
                            datasets: [
                                {
                                    label: '',
                                    backgroundColor: this.dataSetbgcolor,
                                    borderColor: this.dataSetbordercolor,
                                    data: this.dataSetdata,
                                    barwidth: '30px'

                                }

                            ],
                            options: this.option
                        }
                        this.lstDBDetailsData = data.DataList;
                        this.totalRetCost = 0;
                        this.totalUsedCost = 0;
                        this.totalWastageCost = 0;
                        for (let j = 0; j <= this.lstDBDetailsData.length - 1; j++) {
                            let returnQty = this.lstDBDetailsData[j].ITEM_COUNT - this.lstDBDetailsData[j].USED_QTY;
                            this.lstDBDetailsData[j].ITEM_COUNT = parseFloat(this.lstDBDetailsData[j].ITEM_COUNT).toFixed(2);
                            this.lstDBDetailsData[j].WASTAGE_QTY = parseFloat(this.lstDBDetailsData[j].WASTAGE_QTY).toFixed(2);
                            this.lstDBDetailsData[j].USED_QTY = parseFloat(this.lstDBDetailsData[j].USED_QTY).toFixed(2);
                            this.lstDBDetailsData[j].SUMRETURN = parseFloat(this.lstDBDetailsData[j].SUMRETURN).toFixed(2);
                            this.lstDBDetailsData[j].RETURNQTY = parseFloat(returnQty.toString()).toFixed(2);
                            this.lstDBDetailsData[j].SUMUSED = parseFloat(this.lstDBDetailsData[j].SUMUSED).toFixed(2);
                            this.lstDBDetailsData[j].SUMWASTAGE = parseFloat(this.lstDBDetailsData[j].SUMWASTAGE).toFixed(2);
                            this.lstDBDetailsData[j].ISSUE_PRICE = + parseFloat(this.lstDBDetailsData[j].ISSUE_PRICE.toString()).toFixed(2);
                            this.totalRetCost = parseFloat(this.totalRetCost) + parseFloat(this.lstDBDetailsData[j].SUMRETURN.toString());
                            this.totalWastageCost = parseFloat(this.totalWastageCost) + parseFloat(this.lstDBDetailsData[j].SUMWASTAGE.toString());
                            this.totalUsedCost = parseFloat(this.totalUsedCost) + parseFloat(this.lstDBDetailsData[j].SUMUSED);
                        }
                        this.totalRetCost = parseFloat(this.totalRetCost).toFixed(2);
                        this.totalWastageCost = parseFloat(this.totalWastageCost).toFixed(2);
                        this.totalUsedCost = parseFloat(this.totalUsedCost).toFixed(2);
                        this.phyName = "Dr. " + ven.PHYSICIAN_NAME + " " + ven.PERFORM_DATE;
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        this.showDetailsGridForSingleRow = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        this.showDetailsGridForSingleRow = false;
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        this.showDetailsGridForSingleRow = false;
                        this.spinnerService.stop();
                        break;
                    }
                }

            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }


    }

    filterdata(event) {
        this.lstgridfilterData = new Array<VM_POU_PHYSICIAN_USAGE_HEADER>();
        this.lstgridfilterData = event;
    }

    selectedRow(event, ven) {
        if (event == true) {
            this.lstCompareDetailsData.push(ven);
        }

    }

    checkAll() {

        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCompareDetailsData = [];
        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].Status = true;
                    this.lstCompareDetailsData.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].Status = true;
                    this.lstCompareDetailsData.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    uncheckAll() {
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].Status = false;
                    var index = this.lstCompareDetailsData.indexOf(this.lstgridfilterData[i], 0);
                    if (index > -1) {
                        this.lstCompareDetailsData.splice(index, 1);
                    }
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].Status = false;
                    var index = this.lstCompareDetailsData.indexOf(this.lstDBData[i], 0);
                    if (index > -1) {
                        this.lstCompareDetailsData.splice(index, 1);
                    }

                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async compareDetails() {
        this.spinnerService.start();
        this.lstCompareHeadersData = this.lstCompareDetailsData;
        if (this.lstCompareHeadersData.length <= 1) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select 2,3 or 4 Physicians to compare" });
            this.spinnerService.stop();
            return;
        }
        this.showGrid = false;
        this.showControls = false;
        this.showDetailsGridForSingleRow = false;
        this.showGridForDetails = true;
        this.tdExports = false;

        try {
            await this.physicianUsageService.GetPhysicianCompareDetails(this.lstCompareHeadersData).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<VM_POU_PHYSICIAN_USAGE_DETAILS>;
                this.growlMessage = [];

                switch (data.StatType) {
                    case StatusType.Success: {
                        let bgcolor = "#3391CE";
                        let borderColor = "#1E88E5";
                        let label = "data";
                        this.label = [];
                        this.dataSetbgcolor = [];
                        this.dataSetdata = [];
                        this.dataSetbordercolor = [];
                        for (let i = 0; i <= this.lstCompareHeadersData.length - 1; i++) {
                            let labelName = this.lstCompareHeadersData[i].PERFORM_DATE + " Dr." + this.lstCompareHeadersData[i].PHYSICIAN_NAME
                            this.label.push(labelName);
                            this.dataSetdata.push(this.lstCompareHeadersData[i].TOTALCOST);
                            this.dataSetbgcolor.push(bgcolor);
                            this.dataSetbordercolor.push(borderColor);
                        }
                        this.option = {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Total Cost'

                                    }
                                }],
                                xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Physician'

                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: "Physician Usage"
                            },
                            
                            legend: {
                                display: false
                            },
                            
                            animation: {
                            onComplete: function () {
                                var chartInstance = this.chart,
                                    ctx = chartInstance.ctx;
                                ctx.textAlign = 'center';
                                ctx.fillStyle = "#34251B";
                                ctx.textBaseline = 'bottom';
                                this.data.datasets.forEach(function (dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        let convString = "$" + data.toString()
                                        if (data == 0) {
                                            var value = bar._model.y;
                                        }
                                        else if (data > 0 && data < 1) {
                                            var value = bar._model.y;
                                        }
                                        else {
                                            var value = bar._model.y + 30;
                                        }
                                        ctx.fillText(convString, bar._model.x, value);
                                    });
                                });
                            }
                        }
                        };
                        this.detailsChartData = {
                            labels: this.label,
                            datasets: [
                                {
                                    label: '',
                                    backgroundColor: this.dataSetbgcolor,
                                    borderColor: this.dataSetbordercolor,
                                    data: this.dataSetdata,
                                    barwidth: '30px'
                                }
                            ],
                            options: this.option

                        }
                        this.lstcompareData2 = [];

                        this.lstDBDetailsData = data.DataList;
                        this.lstcompareData1 = asEnumerable(this.lstDBDetailsData).Distinct(x => x.ITEM_ID).ToArray();
                        let Physcian;
                        let Procedure;
                        let Caseid;
                        let ItemId;

                        var lstItem: VM_POU_PHYSICIAN_USAGE_DETAILS;
                        this.lstFinalComparedate = [];

                        for (let i = 0; i <= this.lstCompareHeadersData.length - 1; i++) {
                            Physcian = this.lstCompareHeadersData[i].PHYSICIAN_ID;
                            Procedure = this.lstCompareHeadersData[i].PROCEDURE_CODE.split("-")[0];
                            Caseid = this.lstCompareHeadersData[i].CASE_ID;
                            this.lstCompareHeadersData[i].PHYNAMEDATE = "Dr. " + this.lstCompareHeadersData[i].PHYSICIAN_NAME + " " + this.lstCompareHeadersData[i].PERFORM_DATE;
                            console.log(this.lstCompareHeadersData);
                            for (let j = 0; j <= this.lstcompareData1.length - 1; j++) {
                                if (this.lstcompareData1[j].Details == null) {
                                    this.lstcompareData1[j].Details = [];
                                }
                                lstItem = new VM_POU_PHYSICIAN_USAGE_DETAILS();
                                lstItem.CASE_ID = Caseid;
                                lstItem.EXAM_ID = Procedure;
                                lstItem.PHYSICIAN_ID = Physcian;
                                ItemId = this.lstcompareData1[j].ITEM_ID;
                                console.log(ItemId);
                                let Itmdetls = this.lstDBDetailsData.filter(d => d.ITEM_ID == ItemId && d.CASE_ID == Caseid && d.EXAM_ID == Procedure && d.PHYSICIAN_ID == Physcian)
                                if (Itmdetls.length > 0) {
                                    lstItem.ITEM_ID = ItemId;
                                    lstItem.ISSUE_PRICE = Itmdetls[0].ISSUE_PRICE;
                                    lstItem.ISSUE_UOM = Itmdetls[0].ISSUE_UOM;
                                    lstItem.ITEM_COUNT = Itmdetls[0].ITEM_COUNT;
                                    lstItem.ITEM_DESCRIPTION = Itmdetls[0].ITEM_DESCRIPTION;
                                    lstItem.WASTAGE_QTY = Itmdetls[0].WASTAGE_QTY;
                                    lstItem.USED_QTY = Itmdetls[0].USED_QTY;
                                    lstItem.SUMRETURN = Itmdetls[0].SUMRETURN;
                                    lstItem.SUMWASTAGE = Itmdetls[0].SUMWASTAGE;
                                    lstItem.SUMUSED = Itmdetls[0].SUMUSED;

                                }
                                else {
                                    lstItem.ITEM_ID = ItemId;
                                    lstItem.ISSUE_PRICE = 0;
                                    lstItem.ISSUE_UOM = this.lstcompareData1[j].ISSUE_UOM;
                                    lstItem.ITEM_COUNT = 0;
                                    lstItem.ITEM_DESCRIPTION = this.lstcompareData1[j].ITEM_DESCRIPTION;
                                    lstItem.WASTAGE_QTY = 0;
                                    lstItem.USED_QTY = 0;
                                    lstItem.SUMRETURN = 0;
                                    lstItem.SUMWASTAGE = 0;
                                    lstItem.SUMUSED = 0;

                                }
                                this.lstcompareData1[j].Details.push(lstItem);
                                this.lstFinalComparedate.push(lstItem);
                            }


                        }

                        this.totalRetCost = 0;
                        this.totalUsedCost = 0;

                        for (let j = 0; j <= this.lstcompareData1.length - 1; j++) {
                            this.lstcompareData1[j].DetailsTotals = [];
                            for (let k = 0; k <= this.lstcompareData1[j].Details.length - 1; k++) {
                                this.totalRetCost = this.totalRetCost + this.lstcompareData1[j].Details[k].SUMRETURN;
                                this.totalUsedCost = this.totalUsedCost + this.lstcompareData1[j].Details[k].SUMUSED;
                            }
                            this.totalRetCost = parseFloat(this.totalRetCost).toFixed(2);
                            this.totalUsedCost = parseFloat(this.totalUsedCost).toFixed(2);
                            this.lstcompareData1[j].DetailsTotals.ReturnCost = this.totalRetCost;
                            this.lstcompareData1[j].DetailsTotals.UsedCost = this.totalUsedCost;
                        }

                        //for (let j = 0; j <= this.lstcompareData1.length - 1; j++)
                        //{
                        //    for (let k = 0; k <= this.lstcompareData1[j].Details.length - 1; k++) {
                        //        this.totalRetCost = this.totalRetCost + this.lstcompareData1[j].Details[k].SUMRETURN;
                        //        this.totalUsedCost = this.totalUsedCost + this.lstcompareData1[j].Details[k].SUMUSED;
                        //        j = j + 1;
                        //    }
                        //}

                        this.lstFinalComparedate = asEnumerable(this.lstFinalComparedate).OrderBy(x => x.ITEM_ID).ToArray();
                        console.log(this.lstcompareData1);
                        this.spinnerService.stop();
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

                this.lstCompareDetailsData = [];

            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async onSendMailIconClick(event) {
        try {
            this.growlMessage = [];
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex);
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
                await this.commonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Physician Usage Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {

                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');

                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Point OF Use - Physician Usage Report' + '</title>');
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

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');
            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "PhysicianUsageReport.xls");
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }


    async exportReportDetails(reqType: string) {

        var chartImage = document.getElementById("ChartId") as HTMLCanvasElement;
        var image = chartImage.toDataURL("image/png");
        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
        await this.commonService.saveImage(image, "physician").
            catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<MT_POU_PHYSICIAN>;
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

            //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/PROJ/new/RSPAClient/WebApi/AtParWebApi/Uploaded/';
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
            imgPhyUsagePath = this.httpService.BaseUrl + '/Uploaded/';
            //imgPhyUsagePath = this.gstrProtocal + '://' + this.ipAddress + '/RSPAClient/WebApi/AtParWebApi/Uploaded/';
            //imgserverPath = "E:/PROJ/new/RSPAClient/WebApi/AtPar.WebApi/Uploaded/";


            let title: string = '""' + "AtparVersion 2.8" + '""';

            htmlBuilder = "<Table align=center width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == 'Excel') {

                htmlBuilder += "<TR width='100%'><td align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR></table>";

                htmlBuilder += "<table width=90% align=center>";
            }
            else if (reqType == "Mail") {

                htmlBuilder += "<TR height=63><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>"

            }
            else {
                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>"

            }


            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"

            if (reqType == 'Print') {
                htmlBuilder += "<tr><td colspan=3 align=left><span class=c3><b>Physician Usage Report From &nbsp;&nbsp;" + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</span></td>"
                htmlBuilder += "<td><A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A></td></tr>"
                htmlBuilder += "<tr><td align=right valign=top>&nbsp;"
            }
            else {
                htmlBuilder += "<tr><td colspan=3 align=left><span class=c3><b>Physician Usage Report From &nbsp;&nbsp;" + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</span></td></tr><tr><td align=right valign=top>&nbsp;"
            }
            if (reqType == 'Print') {
                htmlBuilder += "<img src=" + imgPhyUsagePath + "Physician.png  width=1000 height=400>"
            }
            else if (reqType == 'Mail') {
                htmlBuilder += "</td></tr><tr><td><font><B>Procedure Code : <B></FONT>" + this.selectedProcedure + "</td></tr><tr><td align=center colspan=9 align=left nowrap width=1000 height=400><span class=c3><img src=" + imgPhyUsagePath + "Physician.png  width=1000 height=400></span></td></tr></table></td></tr></table>"
            }
            else {
                htmlBuilder += "</td></tr><tr><td><font><B>Procedure Code : <B></FONT>" + this.selectedProcedure + "</td></tr><tr><td align=center colspan=9 align=left nowrap width=1000 height=400><span class=c3><img src=" + imgPhyUsagePath + "Physician.png  width=1000 height=400></span></td></tr></table></td></tr></table>"
            }
            htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1><tr bgcolor=#d3d3d3>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Physician</b></span></td>";
            htmlBuilder += "<td align=center  nowrap><span class=c3><b>Case Date (MM/DD/YYYY HH24:MI)</b></span></td>"
            htmlBuilder += "<td align=center  nowrap><span class=c3><b>Total Cost / Procedure ($)</b></span></td>"
            htmlBuilder += "<td align=center  nowrap><span class=c3><b>Total Returns Cost / Procedure ($)</b></span></td>"
            htmlBuilder += "<td align=center  nowrap><span class=c3><b>Total Opened & Unused Cost / Procedure ($)</b></span></td>"
            htmlBuilder += "</tr>"

            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                htmlBuilder += "<tr>"

                if (reqType == 'Mail' || reqType == 'Print') {

                    htmlBuilder += "<td align=left><span class=c3>" + this.lstDBData[i].PHYSICIAN_NAME + " </span></td>"
                    htmlBuilder += "<td align=left><span class=c3>" + this.lstDBData[i].PERFORM_DATE + " </span></td>"
                    htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].TOTALCOST + " </span></td>"
                    htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].RETURNCOST + " </span></td>"
                    htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].UNUSEDCOST + " </span></td>"
                    htmlBuilder += "</tr>"
                }
                else {

                    htmlBuilder += "<td align=left><span class=c3>" + this.lstDBData[i].PHYSICIAN_NAME + " </span></td>"
                    htmlBuilder += "<td align=left><span class=c3>" + this.lstDBData[i].PERFORM_DATE + " </span></td>"
                    htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].TOTALCOST + " </span></td>"
                    htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].RETURNCOST + " </span></td>"
                    htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].UNUSEDCOST + " </span></td>"
                    htmlBuilder += "</tr>"
                }
            }

            htmlBuilder += "</table>"
            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }

    closeMailPopup() {
        this.growlMessage = [];
    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    async exportChart() {

        var chartImage = document.getElementById("myChart") as HTMLCanvasElement;
        var image = chartImage.toDataURL("image/png");
        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
        console.log(image);
        await this.commonService.saveImage(image, "physician").
            catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<MT_POU_PHYSICIAN>;
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




        //var value = <HTMLElement>document.getElementById("myChart");
        //value = value
        //var val = document.getElementById('myChart') as HTMLImageElement,
        //    src = val.baseURI + '.png',
        //    img = document.createElement('img');

        //img.src = src;
        ////document.body.appendChild(img);
        //var link = document.createElement('a');
        //link.href = img.src;
        //link.download = 'Download.jpg';
        //document.body.appendChild(link);
        //link.click();



        //var link = document.createElement('a');
        //link.href = image;
        //link.download = 'physician.jpg';
        //document.body.appendChild(link);
        //link.click();

        //let saveAs = require('file-saver');
        //let file = new Blob([image], { type: 'text/csv;charset=utf-8' });
        //saveAs(file, 'physician.jpg');

        //var blob = new Blob([image], { type: "image/jpeg" });
        //FileSaver.saveAs(blob, "physician,jpg");



        //saveAs.put('images', '/path/temp/file.jpg', 'photo.jpg', function (err, data) {
        //    console.log(data);
        //    // -> 
        //    // filename: 'photo.jpg', 
        //    // filepath: './images/photo.jpg' 
        //});


        //var Filesaver = require('filesaver');

        //var folders = {
        //    images: './images'
        //}


        //var filesaver = new Filesaver({ folders: folders, safenames: true });

        //filesaver.('images', 'http://192.168.177.100/atpar/web/images/', 'physician.jpg', function (err, link.hre) {
        //    console.log(data);
        //    // => {filename: 'photo_2.jpg', filepath: './images/photo_2.jpg'} 
        //})

        //var canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
        //    ctx = canvas.getContext("2d");
        //// draw to canvas... 
        //    canvas.toBlob(function (blob) {
        //        var filesaver = new filesaver
        //    saveAs(blob, "pretty image.png");
        //});


    }

    onBackClick() {
        this.spinnerService.start();
        this.showGrid = false;
        this.showControls = true;
        this.showGridForDetails = false;
        this.showDetailsGridForSingleRow = false;
        this.selectedProcedure = "";
        this.selectedPhysician = "";
        this.spinnerService.stop();
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }
}