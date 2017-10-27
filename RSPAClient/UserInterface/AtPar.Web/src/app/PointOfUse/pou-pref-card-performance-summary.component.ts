import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, ViewChild, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, ModeEnum, BusinessType, Physicians_Basedn } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { StatusType, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { ConfirmationService, Confirmation } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { Http, Response } from "@angular/http";
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { VM_POU_PHYSICIANS_BY_PREF_OR_PROC } from '../Entities/VM_POU_PHYSICIANS_BY_PREF_OR_PROC';
import { VM_POU_REASON_PROC_COST_CASE_SPEC_CODES } from '../Entities/VM_POU_REASON_PROC_COST_CASE_SPEC_CODES';
import { VM_POU_PREF_CARD_PERFORMANCE_SUMMARY } from '../Entities/VM_POU_PREF_CARD_PERFORMANCE_SUMMARY';
import { PrefCardPerformanceSummaryReportService } from './pou-pref-card-performance-summary.service';
import { CHART_DATASET } from '../entities/chart_dataset';
import { saveAs } from 'file-saver';


declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pou-pref-card-performance-summary.component.html',
    providers: [AtParCommonService, AtParConstants, PrefCardPerformanceSummaryReportService],
})

export class PrefCardPerformanceSummaryComponent {
    @Input() appId: string;
    intAppId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    breadCrumbMenu: Menus;

    selectedProcedure: any;
    selectedPhysician: any;
    fromDate: Date;
    toDate: Date = new Date();
    strFromDate: string;
    strToDate: string;

    lstProcedure: VM_POU_REASON_PROC_COST_CASE_SPEC_CODES[] = [];
    lstPhysicians: VM_POU_PHYSICIANS_BY_PREF_OR_PROC[] = [];
    lstPrefSummary: VM_POU_PREF_CARD_PERFORMANCE_SUMMARY[] = [];
    lstFilterdProcedure: any[] = [];
    lstFilterdPhysician: any[] = [];

    defDuration: number = 0;
    statusCode: number = -1;
    toMailAddr: string;
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    chartName: string;
    showGrid: boolean = false;
    isMailDialog: boolean = false;
    chartData: any;
    options: any;
    chartClusterDataset: CHART_DATASET[] = [];
    chartStackDataset: CHART_DATASET[] = [];
    chartLineDataset: CHART_DATASET[] = [];
    stackChartImag: string;
    lineChartImg: string;
    chart3dImg: string;
    clusterImg: string;
    showCluster: boolean;
    showLine: boolean;
    showStack: boolean;
    show3d: boolean;
    labelData: any[] = [];


    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private prefCardPerformanceSummaryReportService: PrefCardPerformanceSummaryReportService
    ) {
        this.breadCrumbMenu = new Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

    }

    async ngOnInit() {
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        this.spinnerService.start();

        //await this.getPhysiciansByPrefOrProc();

        //await this.getAllProcedureCodes();

        await this.getMyPreferences();



    }

    async getPhysiciansByPrefOrProc() {
        try {
            await this.atParCommonService.getPhysiciansByPrefOrProc(Physicians_Basedn.PROCEDURE).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<VM_POU_PHYSICIANS_BY_PREF_OR_PROC>;
                this.growlMessage = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstPhysicians = res.DataList;
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }

            })
        } catch (ex) {
            this.clientErrorMsg(ex, 'getPhysiciansByPrefOrProc');
        }
    }

    async getAllProcedureCodes() {

        await this.atParCommonService.getCodes('PROCEDURES', '', '').then((result: Response) => {
            let res = result.json() as AtParWebApiResponse<any>;
            this.growlMessage = [];
            switch (res.StatType) {
                case StatusType.Success: {
                    this.lstProcedure = res.DataList;
                    break;
                }
                case StatusType.Warn: {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                    break;
                }
                case StatusType.Error: {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                    break;
                }
                case StatusType.Custom: {
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                    break;
                }
            }

        })
    }

    async getMyPreferences() {
        try {

            await this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then((result: Response) => {
                this.spinnerService.stop();
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.defDuration = parseInt(res.DataVariable.toString());
                        this.fromDate = new Date();
                        var d = this.fromDate.getDate() - this.defDuration;

                        this.fromDate.setDate(d);
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }

            })
        } catch (ex) {
            this.clientErrorMsg(ex, 'getMyPreferences');
        }
    }

    async filterProcedures(event) {
        await this.getAllProcedureCodes();
        let query = event.query.toUpperCase();
        this.lstFilterdProcedure = [];
        try {

            if (query == '%') {
                this.lstFilterdProcedure = this.lstProcedure;
            }
            else {
                this.lstFilterdProcedure = this.lstProcedure.filter(x => (x.CODE.toUpperCase().startsWith(query) ||
                    x.CODE.toUpperCase().endsWith(query) || x.CODE.toUpperCase() == query ||
                    x.DESCRIPTION.toUpperCase().startsWith(query) || x.DESCRIPTION.toUpperCase().endsWith(query) ||
                    x.DESCRIPTION.toUpperCase() == query));
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'filterProcedures');
        }
    }

    async filterPhysicians(event) {
        await this.getPhysiciansByPrefOrProc();
        let query = event.query.toUpperCase();
        this.lstFilterdPhysician = [];
        try {
            if (this.selectedProcedure != null && this.selectedProcedure != undefined) {
                if (query == '%') {
                    this.lstFilterdPhysician = this.lstPhysicians.filter(x => x.PROCEDURE_CODE == this.selectedProcedure.CODE);
                }
                else {
                    this.lstFilterdPhysician = this.lstPhysicians.filter(x => (x.PHYSICIAN_ID.toUpperCase().startsWith(query) ||
                        x.PHYSICIAN_ID.toUpperCase().endsWith(query) || x.PHYSICIAN_ID.toUpperCase() == query ||
                        x.FIRST_NAME.toUpperCase().startsWith(query) || x.FIRST_NAME.toUpperCase().endsWith(query) ||
                        x.FIRST_NAME.toUpperCase() == query || x.LAST_NAME.toUpperCase().endsWith(query) ||
                        x.LAST_NAME.toUpperCase() == query || x.LAST_NAME.toUpperCase().endsWith(query) ||
                        x.MIDDLE_INITIAL.toUpperCase() == query || x.MIDDLE_INITIAL.toUpperCase().endsWith(query) ||
                        x.MIDDLE_INITIAL.toUpperCase() == query) && (x.PROCEDURE_CODE == this.selectedProcedure.CODE))
                }
            }


        } catch (ex) {
            this.clientErrorMsg(ex, 'filterProcedures');
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];
            this.showGrid = false;
            var todayDate = new Date();
            if (this.selectedProcedure == undefined || this.selectedProcedure == null || this.selectedProcedure == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Procedure code is mandatory" });
            }
            else if (this.toDate > todayDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To date must be less than or equal to today's date" });
            }
            else if (this.fromDate > this.toDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
            }
            else {
                await this.getData();

                //await this.getIPSSLConfig();
                //let imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                //this.stackChartImag = imgserverPath + 'StackedBar.GIF';
                //this.chart3dImg = imgserverPath + 'Stacked3d.GIF';
                //this.lineChartImg = imgserverPath + 'LineChart.GIF';
                //this.clusterImg = imgserverPath + 'Clusteredbar.GIF'
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');
        }
    }

    async getData() {
        var strProcID = '';
        var strPhysicianId = '';
        if (this.selectedProcedure == undefined || this.selectedProcedure.CODE == null || this.selectedProcedure.CODE == undefined) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Procedure code is mandatory" });
            return;
        }
        if (this.selectedPhysician != undefined && this.selectedPhysician.PHYSICIAN_ID != null && this.selectedPhysician.PHYSICIAN_ID != undefined) {
            strPhysicianId = this.selectedPhysician.PHYSICIAN_ID;
        }
        strProcID = this.selectedProcedure.CODE;
        var date = this.toDate;
        date.setDate(date.getDate() + 1);
        this.strFromDate = this.getDateString(this.fromDate);
        this.strToDate = this.getDateString(date);
        this.spinnerService.start();
        await this.prefCardPerformanceSummaryReportService.getPrefPerformanceRpt(this.strFromDate, this.strToDate, strProcID, strPhysicianId).then((result: Response) => {
            this.spinnerService.stop();
            let res = result.json() as AtParWebApiResponse<VM_POU_PREF_CARD_PERFORMANCE_SUMMARY>;
            this.growlMessage = [];
            this.chartClusterDataset = [];
            this.chartLineDataset = [];
            this.chartStackDataset = [];

            var dataPrePick = [];
            var dataPicked = [];
            var dataAddPick = [];
            var dataReturned = [];
            var dataWasted = [];
            var dataIssuePick = [];
            this.labelData = [];
            this.toDate = new Date();

            switch (res.StatType) {
                case StatusType.Success: {
                    this.lstPrefSummary = res.DataList;
                    for (var i = 0; i < this.lstPrefSummary.length; i++) {
                        this.lstPrefSummary[i].QAPREPICKADD = parseFloat(this.lstPrefSummary[i].QAPREPICKADD).toFixed(2);
                        this.lstPrefSummary[i].PICKED = parseFloat(this.lstPrefSummary[i].PICKED).toFixed(2);
                        this.lstPrefSummary[i].ADDEDDURINGPICK = parseFloat(this.lstPrefSummary[i].ADDEDDURINGPICK).toFixed(2);
                        this.lstPrefSummary[i].ISSUEDAFTERPICK = parseFloat(this.lstPrefSummary[i].ISSUEDAFTERPICK).toFixed(2);
                        this.lstPrefSummary[i].RETURNED = parseFloat(this.lstPrefSummary[i].RETURNED).toFixed(2);
                        this.lstPrefSummary[i].WASTED = parseFloat(this.lstPrefSummary[i].WASTED).toFixed(2);
                        this.lstPrefSummary[i].TOTALCONSUMED = parseFloat(this.lstPrefSummary[i].TOTALCONSUMED).toFixed(2);

                        this.chartClusterDataset.push({ label: this.lstPrefSummary[i].CASE_ID, backgroundColor: this.getRandomColor(), borderColor: '#7CB342', data: [this.lstPrefSummary[i].WASTED, this.lstPrefSummary[i].RETURNED, this.lstPrefSummary[i].ISSUEDAFTERPICK, this.lstPrefSummary[i].ADDEDDURINGPICK, this.lstPrefSummary[i].PICKED, this.lstPrefSummary[i].QAPREPICKADD], fill: true })

                        this.labelData.push(this.lstPrefSummary[i].CASE_ID);
                        let totalQty = 0

                        totalQty = (parseFloat(this.lstPrefSummary[i].QAPREPICKADD) + parseFloat(this.lstPrefSummary[i].PICKED) + parseFloat(this.lstPrefSummary[i].ADDEDDURINGPICK) + parseFloat(this.lstPrefSummary[i].ISSUEDAFTERPICK) + parseFloat(this.lstPrefSummary[i].RETURNED) + parseFloat(this.lstPrefSummary[i].WASTED))



                        dataPrePick.push((parseFloat(this.lstPrefSummary[i].QAPREPICKADD) * 100 / totalQty).toFixed(2));


                        dataPicked.push((parseFloat(this.lstPrefSummary[i].PICKED) * 100 / totalQty).toFixed(2));


                        dataAddPick.push((parseFloat(this.lstPrefSummary[i].ADDEDDURINGPICK) * 100 / totalQty).toFixed(2));


                        dataIssuePick.push((parseFloat(this.lstPrefSummary[i].ISSUEDAFTERPICK) * 100 / totalQty).toFixed(2));


                        dataReturned.push((parseFloat(this.lstPrefSummary[i].RETURNED) * 100 / totalQty).toFixed(2));


                        dataWasted.push((parseFloat(this.lstPrefSummary[i].WASTED) * 100 / totalQty).toFixed(2));


                        //if (i == 0) {
                        //    this.chartClusterDataset.push({ label: this.lstPrefSummary[i].CASE_ID, backgroundColor: '#338aeb', borderColor: '#7CB342', data: [this.lstPrefSummary[i].QAPREPICKADD, this.lstPrefSummary[i].PICKED, this.lstPrefSummary[i].ADDEDDURINGPICK, this.lstPrefSummary[i].ISSUEDAFTERPICK, this.lstPrefSummary[i].RETURNED, this.lstPrefSummary[i].WASTED] })
                        //}
                        //else {
                        //    this.chartClusterDataset.push({ label: this.lstPrefSummary[i].CASE_ID, backgroundColor: '#ffb552', borderColor: '#7CB342', data: [this.lstPrefSummary[i].QAPREPICKADD, this.lstPrefSummary[i].PICKED, this.lstPrefSummary[i].ADDEDDURINGPICK, this.lstPrefSummary[i].ISSUEDAFTERPICK, this.lstPrefSummary[i].RETURNED, this.lstPrefSummary[i].WASTED] })
                        //}
                    }

                    this.chartLineDataset.push({ label: 'Added PrePick QA ', backgroundColor: '', borderColor: '#2c7cd5', data: dataPrePick, fill: false });
                    this.chartLineDataset.push({ label: 'Added during Pick ', backgroundColor: '', borderColor: '#e84018', data: dataAddPick, fill: false });
                    this.chartLineDataset.push({ label: 'Picked ', backgroundColor: '', borderColor: '#ffb34c', data: dataPicked, fill: false });
                    this.chartLineDataset.push({ label: 'Wasted ', backgroundColor: '', borderColor: '#113865', data: dataWasted, fill: false });
                    this.chartLineDataset.push({ label: 'Returned ', backgroundColor: '', borderColor: '#bfbfbf', data: dataReturned, fill: false });
                    this.chartLineDataset.push({ label: 'Issued after Pick ', backgroundColor: '', borderColor: '#00608c', data: dataIssuePick, fill: false });


                    this.chartStackDataset.push({ label: 'Added PrePick QA ', backgroundColor: '#2c7cd5', borderColor: '#7CB342', data: dataPrePick, fill: false });
                    this.chartStackDataset.push({ label: 'Added during Pick ', backgroundColor: '#e84018', borderColor: '#7CB342', data: dataAddPick, fill: false });
                    this.chartStackDataset.push({ label: 'Picked ', backgroundColor: '#ffb34c', borderColor: '#7CB342', data: dataPicked, fill: true });
                    this.chartStackDataset.push({ label: 'Wasted ', backgroundColor: '#113865', borderColor: '#7CB342', data: dataWasted, fill: true });
                    this.chartStackDataset.push({ label: 'Returned ', backgroundColor: '#bfbfbf', borderColor: '#7CB342', data: dataReturned, fill: true });
                    this.chartStackDataset.push({ label: 'Issued after Pick ', backgroundColor: '#00608c', borderColor: '#7CB342', data: dataIssuePick, fill: true });

                    this.showGrid = true;

                    this.getChart('Stack');

                    this.getIPSSLConfig();
                    break;
                }
                case StatusType.Warn: {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                    break;
                }
                case StatusType.Error: {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                    break;
                }
                case StatusType.Custom: {
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                    break;
                }
            }

        })


    }

    async getChart(type) {
        this.showCluster = false;
        this.showLine = false;
        this.show3d = false;
        this.showStack = false;
        this.chartData = [];
        this.options = [];

        if (type == 'Cluster') {
            this.showCluster = true;
            this.chartData = {
                labels: ['Wasted ', 'Returned ', 'Issued after Pick ', 'Added during Pick ', 'Picked', 'Added PrePick QA'],
                datasets: this.chartClusterDataset
            }

            this.options = {
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Qty used in $'
                        }

                    }]
                }
            };

        }
        else if (type == 'Line') {
            this.showLine = true;
            this.chartData = {
                labels: this.labelData,
                datasets: this.chartLineDataset
            }
            this.options = {
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Case Id'
                        }

                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Qty used in $'
                        }

                    }]
                }
            };
        }
        else if (type == 'Stack' || type == '3D') {
            this.showStack = true;
            this.chartData = {
                labels: this.labelData,
                datasets: this.chartStackDataset
            }
            this.options = {
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: '% of qty uses'
                        },
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 5,
                            max: 100
                        }

                    }],
                    yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Case Id'
                        }

                    }]
                }
            };
        }
        else {

        }
    }

    getRandomColor() {

        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getDateString(MyDate: Date) {
        var MyDateString = ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + ('0' + MyDate.getDate()).slice(-2) + '/' + MyDate.getFullYear();
        return MyDateString
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
                saveAs(blob, "pou_prefcard_perf_summary.xls");
            }
            //if (html != '' && html != null) {
            //    var ua = window.navigator.userAgent;
            //    var msie = ua.indexOf("MSIE ");
            //    // If Internet Explorer
            //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            //        this.statusCode = -1;
            //        let folderName: string = '';
            //        await this.atParCommonService.exportToExcel(html, "POU_Case_Review_", "pou_prefcard_perf_summary")
            //            .then((res: Response) => {
            //                let data = res.json();
            //                this.statusCode = data.StatusCode;
            //                if (this.statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
            //                    folderName = data.DataVariable.toString();
            //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/pou_prefcard_perf_summary.xls';
            //                    var query = '?download';
            //                    window.open(filename + query);
            //                }
            //                else {
            //                    this.growlMessage = [];
            //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
            //                }
            //            });

            //        await this.atParCommonService.deleteExcel(folderName, "pou_prefcard_perf_summary")
            //            .then((res: Response) => {
            //            });
            //    } else {

            //        var a = document.createElement('a');
            //        var data_type = 'data:application/vnd.ms-excel';
            //        html = html.replace(/ /g, '%20');
            //        a.href = data_type + ', ' + html;
            //        a.download = 'pou_prefcard_perf_summary.xls';
            //        a.click();
            //    }
            //}
        } catch (ex) {
            this.clientErrorMsg(ex, 'onExportToExcelClick');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            this.growlMessage = [];
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {

               // var mywindow = window.open('', 'PRINT', 'height=600,width=600');
                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');

                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Point Of Use - Pref Card Performance Summary' + '</title>');
                    mywindow.document.write('</head><body >');
                    mywindow.document.write(html);
                    mywindow.document.write('</body></html>');

                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/

                    return true;
                } else {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'onPrintClick');
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onSendMailIconClick(event) {
        try {
            this.growlMessage = [];
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailIconClick');
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
            let html: string = await this.exportReportDetails('Mail');
            let toAddr: string = '';
            this.growlMessage = [];
            this.isMailDialog = false;

            if (html != '' && html != null) {
                await this.atParCommonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Pref Card Performance Summary', JSON.stringify(html), this.toMailAddr, this.chartName, false, MailPriority.Normal.toString(), '')
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
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Email Server is Not Configured! Please Contact Administrator' });
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
            this.clientErrorMsg(ex, 'onSendMailClick');
        }
        finally {

            this.spinnerService.stop();
        }
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

            var chartImage = document.getElementById("myChart") as HTMLCanvasElement;
            var image = chartImage.toDataURL("image/png");
            image = image.replace(/^data:image\/(png|jpg);base64,/, "");
            await this.atParCommonService.saveImage(image, "prefcard_performance_summary").
                then((res: Response) => {
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
            this.chartName = 'prefcard_performance_summary.png';


            await this.getIPSSLConfig();

           // imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';

            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';

            var ChartPath = this.httpService.BaseUrl + '/Uploaded/';


            // let title: string = '""' + "AtparVersion 2.8" + '""';
            let ProductName = "Pref Card Performance Summary";
            htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == 'Print') {

                htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=3 align=left><span class=c2>" + ProductName + " " + "<b>" + this.strFromDate + "  to  " + this.strToDate + " </b></span></td><td align=right valign=top>&nbsp;"

                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }
            else {
                if (reqType == 'Mail') {
                    htmlBuilder += "<TR height=63><TD align=left bgcolor='#fe9836' colspan=2><IMG height=63  width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3></TD></TR>"//<img src=" + imgserverPath + "topbg.jpg width=82% height=63>

                } else {
                    htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>"
                }
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=3 align=left><span class=c2>" + ProductName + " " + "<b>" + this.strFromDate + "  to  " + this.strToDate + " </b></span></td><td align=right valign=top>&nbsp;"
            }
            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "

            htmlBuilder += "<tr><td colspan=2 align=center>"
            htmlBuilder += "<table align=center  >"
            htmlBuilder += "<tr bgcolor=#ffffff>"
            if (reqType == "Mail") {
                htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src= " + ChartPath + this.chartName + "  width=800 height=250></span></td>"
            } else {
                htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src=" + ChartPath + this.chartName + "  width=800 height=250></span></td>"
            }
            htmlBuilder += "</tr></table><tr><td>"

            htmlBuilder += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
            htmlBuilder += "<tr bgcolor=#d3d3d3>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Case Date</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Case ID</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Case Description</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Added PrePick QA ($)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Picked ($)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Added during Pick ($)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Issued after Pick ($)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Returned ($)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Wasted ($)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Total Consumed ($)</b></span></td>"
            htmlBuilder += "</tr>"


            if (this.lstPrefSummary.length > 0) {
                for (var i = 0; i < this.lstPrefSummary.length; i++) {
                    htmlBuilder += "<tr>"
                    if (reqType == "Excel") {
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].PERFORM_DATE + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].CASE_ID + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].CASE_DESC + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].QAPREPICKADD + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].PICKED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].ADDEDDURINGPICK + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].ISSUEDAFTERPICK + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].RETURNED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].WASTED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + "'" + this.lstPrefSummary[i].TOTALCONSUMED + "</span></td>"
                        htmlBuilder += "</tr>"
                    } else {
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].PERFORM_DATE + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].CASE_ID + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstPrefSummary[i].CASE_DESC + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].QAPREPICKADD + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].PICKED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].ADDEDDURINGPICK + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].ISSUEDAFTERPICK + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].RETURNED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].WASTED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstPrefSummary[i].TOTALCONSUMED + "</span></td>"
                        htmlBuilder += "</tr>"
                    }
                }
            }



            htmlBuilder += "</table></td></tr>"
            htmlBuilder += "</Table>"

            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            this.clientErrorMsg(ex, 'exportReportDetails');
        }
    }

    async getIPSSLConfig() {

        try {
            this.growlMessage = [];
            await this.atParCommonService.getServerIP()
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
                });


            await this.atParCommonService.getSSLConfigDetails()
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    this.growlMessage = [];
                    var data = res.json() as AtParWebApiResponse<SSL_CONFIG_DETAILS>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.gstrProtocal = data.Data.PROTOCOL.toString();
                            this.gstrServerName = data.Data.SERVER_NAME.toString();
                            this.gstrPortNo = data.Data.PORT_NO.toString();

                            let imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                            this.stackChartImag = imgserverPath + 'StackedBar.GIF';
                            this.chart3dImg = imgserverPath + 'Stacked3d.GIF';
                            this.lineChartImg = imgserverPath + 'LineChart.GIF';
                            this.clusterImg = imgserverPath + 'Clusteredbar.GIF'
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

                });
        } catch (ex) {
            this.clientErrorMsg(ex, 'getIPSSLConfig');
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    closeMailPopup() {
        this.growlMessage = [];
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {

    }

}