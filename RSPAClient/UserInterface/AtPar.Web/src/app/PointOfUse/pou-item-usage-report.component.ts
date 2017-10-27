import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, ViewChild, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, ModeEnum, BusinessType } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { StatusType, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { ConfirmationService, Confirmation } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { Http, Response } from "@angular/http";
import { CHART_DATASET } from '../entities/chart_dataset';
import { ItemUsageReportService } from './pou-item-usage-report.service';
import { VM_GETITEMUSAGE } from '../entities/vm_getitemusage';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { ActivatedRoute, Params } from '@angular/router';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5'; 



declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pou-item-usage-report.component.html',
    providers: [AtParCommonService, AtParConstants, ItemUsageReportService],
})

export class ItemUsageReportComponent {
    @Input() appId: string;
    intAppId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    breadCrumbMenu: Menus;


    fromDate: Date;
    toDate: Date = new Date();
    businessUnit: string;
    parLocation: string;
    itemID: string;
    lstBUnits: SelectItem[] = [];
    lstItemUsage = new VM_GETITEMUSAGE();

    products = [{ name: 'product1', price: 100 }, { name: 'product2', price: 200 }, { name: 'product3', price: 300 }]


    defDuration: number = 0;
    showGrid: boolean = false;
    chartData: any;
    options: any;
    chartDataset: CHART_DATASET[] = [];
    editItemInfo: any;
    screenName: string = "";

    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private itemUsageReportService: ItemUsageReportService,
        private atParSharedDataService: AtParSharedDataService,
        private activatedRoute: ActivatedRoute
    ) {
        this.breadCrumbMenu = new Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

    }

    async ngOnInit() {
        var queryMode;
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.spinnerService.start();
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.screenName = params['Screen'];
        });

        if (this.screenName != "" && this.screenName == 'Transaction History') {
            this.defDuration = 5;
            this.fromDate = new Date();
            var d = this.fromDate.getDate() - this.defDuration;
            this.fromDate.setDate(d);
            await this.bindDropdown();
            this.activatedRoute.queryParams.subscribe((params: Params) => {
                queryMode = params['mode'];
                this.intAppId = params['appId'];
                if (queryMode == "Go") {
                    this.businessUnit = params['bunit'];
                    this.itemID = params['itemId'];
                    this.parLocation = params['cartId'];
                    this.btnGo_Click();
                }
            });
        }

        else {
            await this.getMyPreferences();
            await this.bindDropdown();

            this.editItemInfo = '';
            if (this.atParSharedDataService.storage != undefined && this.atParSharedDataService.storage != null) {
                this.editItemInfo = this.atParSharedDataService.storage.editItemInfo;
            }
            if (this.editItemInfo != '') {
                this.businessUnit = this.editItemInfo.BUSINESS_UNIT;
                this.itemID = this.editItemInfo.ITEM_ID;
                this.parLocation = this.editItemInfo.CART_ID;
                await this.btnGo_Click();
            }

        }

        this.spinnerService.stop();

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

    async bindDropdown() {
        try {
            await this.atParCommonService.getBusinessUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], BusinessType.Inventory.toString()).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.lstBUnits.push({ label: 'Select BUnit', value: '' });
                switch (res.StatType) {
                    case StatusType.Success: {
                        for (var i = 0; i < res.DataList.length; i++) {
                            this.lstBUnits.push({ label: res.DataList[i], value: res.DataList[i] });
                        }
                        this.businessUnit = '';
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
            this.clientErrorMsg(ex, 'bindDropdown');
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];
            this.showGrid = false;
            var todayDate = new Date();
            if (this.businessUnit == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Bussiness Unit" });
            }
            else if (this.itemID == '' || this.itemID == undefined) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter Item ID " });
            }
            else if (this.toDate > todayDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
            }
            else if (this.fromDate > this.toDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than ToDate" });
            }
            else {
                await this.getData(this.businessUnit, this.parLocation, this.itemID, this.fromDate, this.toDate);
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');
        }
    }

    async getData(bUnit, parLoc, itemID, fromDate: Date, toDate: Date) {
        try {
            this.spinnerService.start();
            this.showGrid = false;
            await this.atParCommonService.getUserDepartments(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry).then((result: Response) => {

                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.getItemUsageReport(bUnit, parLoc, itemID, fromDate, toDate);
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }

            })


        } catch (ex) {
            this.clientErrorMsg(ex, 'getData');
        }
    }

    async getItemUsageReport(bUnit, parLoc, itemID, fromDate, toDate) {
        try {
            toDate.setDate(toDate.getDate() + 1);
            var fDate = fromDate.toLocaleDateString();
            var tDate = toDate.toLocaleDateString();
            if (parLoc == undefined) {
                parLoc = '';
            }
            if (itemID == undefined) {
                itemID = '';
            }

            await this.itemUsageReportService.getItemUsageReport(bUnit, parLoc, itemID, fDate, tDate, EnumApps.PointOfUse).then((result: Response) => {
                this.spinnerService.stop();
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.toDate.setDate(this.toDate.getDate() - 1);
                this.chartDataset = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        let data = [];
                        let data1 = [];
                        let labelsData = [];
                        this.lstItemUsage = new VM_GETITEMUSAGE();

                        data = res.DataDictionary["pItemUsageDS"]["Table1"];

                        if (data.length == 0) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No records were returned for the search criteria' });
                            break;
                        }
                        this.showGrid = true;
                        data1 = res.DataDictionary["pItemUsageDS"]["Table2"];
                        let qty = 0;
                        let tempParData: any[] = [];
                        let tempUsedData: any[] = [];
                        for (var i in data) {
                            qty += parseFloat(data[i].ITEM_COUNT);
                            tempUsedData.push(data[i].ITEM_COUNT);
                            tempParData.push(data1[0].ITEM_QUANTITY_PAR);
                           labelsData.push(data[i].UPDATE_DATE.split('/')[0] + '/' + data[i].UPDATE_DATE.split('/')[1]);

                        }
                        var maxValues = asEnumerable(data).OrderByDescending(x => x.ITEM_COUNT).First();
                        var minValues = asEnumerable(data).OrderBy(x => x.ITEM_COUNT).First();

                        this.lstItemUsage.MIN_USAGE_QTY = parseFloat(minValues.ITEM_COUNT).toFixed(2);
                        this.lstItemUsage.MIN_DATE = minValues.UPDATE_DATE;
                        this.lstItemUsage.MAX_USAGE_QTY = parseFloat(maxValues.ITEM_COUNT).toFixed(2);
                        this.lstItemUsage.MAX_DATE = maxValues.UPDATE_DATE;



                        this.lstItemUsage.AVG_ITEM_QTY = (qty / data.length).toFixed(2);   
                        this.lstItemUsage.ITEM_ID = data[0].ITEM_ID;
                        this.lstItemUsage.B_UNIT = this.businessUnit;

                        this.chartDataset.push({ label: 'Par Qty', backgroundColor: '#00ff48', borderColor: '#00ff48', data: tempParData, fill: true });
                        this.chartDataset.push({ label: 'Used Qty', backgroundColor: '#0000f8', borderColor: '#0000f8', data: tempUsedData, fill: true });

                        this.chartData = {
                            labels: labelsData,
                            datasets: this.chartDataset
                        }
                        this.options = {
                            scales: {
                                xAxes: [{
                                    scaleLabel: {
                                       
                                    },
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                      
                                    },
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            showTooltips: true,
                            showAllTooltips: true
                        };
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
        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.businessUnit = null;
        this.parLocation = null;
        this.lstBUnits = [];
        this.defDuration = 0;
        this.itemID = null;
        if (this.atParSharedDataService.storage != undefined) {
            this.atParSharedDataService.storage.editItemInfo = null;

        }

    }

}