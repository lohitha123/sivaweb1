import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, ViewChild, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, ModeEnum, BusinessType, Physicians_Basedn } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { StatusType, EnumApps, MailPriority, LocationType } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { ConfirmationService, Confirmation } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { Http, Response } from "@angular/http";
import { CHART_DATASET } from '../entities/chart_dataset';
import { MT_POU_DEPT } from '../entities/mt_pou_dept';
import { ExpirationTrackingReportService } from './pou-expiration-tracking-report.service';
import { VM_GETEXPIRETRACKREP } from '../entities/vm_getexpiretrackrep';
import { EXPIREDGROUPITEMS } from '../entities/expiredgroupitems';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';



declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pou-expiration-tracking-report.component.home.html',
    providers: [AtParCommonService, AtParConstants, ExpirationTrackingReportService],
})

export class ExpirationTrackingReportHomeComponent {
    @Input() appId: string;
    intAppId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    breadCrumbMenu: Menus;


    fromDate: Date;
    toDate: Date = new Date();
    fromExpDate: Date = new Date();
    toExpDate: Date;
    ParLoc: string;
    ExpParLoc: string;
    Department: string;
    ExpDepartment: string;
    Duration: string;
    activeTab: string;

    lstDept: SelectItem[] = [];
    lstParLoc: SelectItem[] = [];
    lstExpParLoc: SelectItem[] = [];
    lstDuration: SelectItem[] = [];
    ExpiredGroupItem: EXPIREDGROUPITEMS[] = [];
    ExpiringGroupItem: EXPIREDGROUPITEMS[] = [];
    lstExpiredItems: VM_GETEXPIRETRACKREP[] = [];
    lstExpiringItems: VM_GETEXPIRETRACKREP[] = [];
    chartExpiredDataset: CHART_DATASET[] = [];
    chartExpiringDataset: CHART_DATASET[] = [];
    labels: any[] = [];
    labelData: any[] = [];
    chartData: any;
    options: any;



    defDuration: number = 0;
    durationTrackExp: number = 0;
    expiredCnt: number = 0;
    expiringCnt: number = 0;
    showGrid: boolean = false;
    showExpGrid: boolean = false;



    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private expirationTrackingReportService: ExpirationTrackingReportService,
        private route: ActivatedRoute,
        private router: Router,
        private atParSharedDataService: AtParSharedDataService,
        private leftBarAnimateService: LeftBarAnimationService,
    ) {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.breadCrumbMenu = new Menus();

    }

    async ngOnInit() {
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        this.spinnerService.start();

        this.lstDuration.push({ label: 'Select Duration', value: "0" }, { label: '30', value: "30" }, { label: '45', value: "45" },
            { label: '60', value: "60" }, { label: '90', value: "90" }, { label: '180', value: "180" }, { label: '365', value: "365" });
        this.Duration = '0';


        await this.getMyPreferences();

        await this.bindDropDowns();

        await this.getExpItemCnt()

        this.spinnerService.stop();
    }

    enableSelectedTab(option: any) {
        if (option != null) {
            this.activeTab = option.title;
        }
        this.growlMessage = [];
        this.showGrid = false;
        this.showExpGrid = false;
        this.Department = '';
        this.ParLoc = '';
        this.ExpDepartment = '';
        this.ExpParLoc = '';
        this.Duration = '';


    }

    async getMyPreferences() {
        try {

            await this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then((result: Response) => {
               
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
            this.clientErrorMsg(ex, 'getMyPreferences');
        }
    }

    async bindDropDowns() {
        try {
            await this.atParCommonService.getDepartment('', '', this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<MT_POU_DEPT>;
                this.growlMessage = [];
                this.lstDept = [];
                this.lstDept.push({ label: 'Select Dept', value: '' });
                this.lstParLoc.push({ label: 'Select Loc', value: '' });
                this.lstExpParLoc.push({ label: 'Select Loc', value: '' });
                switch (res.StatType) {
                    case StatusType.Success: {
                        for (var i = 0; i < res.DataList.length; i++) {
                            this.lstDept.push({ label: res.DataList[i].DEPT_ID + " - " + res.DataList[i].DEPT_NAME, value: res.DataList[i].DEPT_ID });
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        if (res.StatusCode != AtparStatusCodes.E_NORECORDFOUND) {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        }
                       
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

            });
        } catch (ex) {
            this.clientErrorMsg(ex, 'bindDropDowns');
        }

    }

    async getExpItemCnt() {
        try {
            await this.expirationTrackingReportService.getExpItemCnt(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.PointOfUse).then((result: Response) => {
                this.spinnerService.stop();
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.durationTrackExp = res.DataDictionary['duration'];
                        this.expiredCnt = res.DataDictionary['pIntExpiredCnt'];
                        this.expiringCnt = res.DataDictionary['pIntExpiringCnt'];
                        this.toExpDate = new Date();
                        var d = this.toExpDate.getDate() + this.durationTrackExp;
                        this.toExpDate.setDate(d);
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

            });
        } catch (ex) {
            this.clientErrorMsg(ex, 'getExpItemCnt');
        }
    }

    async ddlDept_SelectedIndexChanged(dept) {
        if (dept != '') {
            await this.getDeptCartAllocations('', dept, EnumApps.PointOfUse, LocationType.P.toString(), 'Expired');
        } else {
            this.lstParLoc = [];
            this.lstParLoc.push({ label: 'Select Loc', value: '' });
            this.ParLoc = '';
        }
    }

    async ddlExpDept_SelectedIndexChanged(dept) {
        if (dept != '') {
            await this.getDeptCartAllocations('', dept, EnumApps.PointOfUse, LocationType.P.toString(), 'Expiring');
        } else {
            this.lstExpParLoc = [];
            this.lstExpParLoc.push({ label: 'Select Loc', value: '' });
            this.ExpParLoc = '';
        }
    }

    async getDeptCartAllocations(bUnit, deptID, appID, locType, deptType) {
        try {
            await this.expirationTrackingReportService.getDeptCartAllocations(bUnit, deptID, appID, locType).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.lstParLoc = [];
                this.lstExpParLoc = [];
                this.lstParLoc.push({ label: 'Select Loc', value: '' });
                this.lstExpParLoc.push({ label: 'Select Loc', value: '' });
                switch (res.StatType) {
                    case StatusType.Success: {
                        if (deptType == 'Expired') {
                            for (var i = 0; i < res.DataList.length; i++) {
                                this.lstParLoc.push({ label: res.DataList[i].CART_ID, value: res.DataList[i].CART_ID });
                            }
                        } else {
                            for (var i = 0; i < res.DataList.length; i++) {
                                this.lstExpParLoc.push({ label: res.DataList[i].CART_ID, value: res.DataList[i].CART_ID });
                            }
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        if (res.StatusCode != AtparStatusCodes.E_NORECORDFOUND) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        }
                        
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

            });
        } catch (ex) {
            this.clientErrorMsg(ex, 'getDeptCartAllocations');
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];
            this.showGrid = false;
            this.showExpGrid = false;
            var todayDate = new Date();
           
             if (this.toDate > todayDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To date must be less than or equal to today's date" });
            }
            else if (this.fromDate > this.toDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
            }
            else {
                var fromDate = this.fromDate.toLocaleDateString();
                var toDate = this.toDate.toLocaleDateString();

                await this.getExpirationTrackingReport(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], 0, fromDate, toDate, this.Department, EnumApps.PointOfUse, this.ParLoc, 'Expired');
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');
        }
    }

    async btnExpGo_Click() {
        try {
            this.growlMessage = [];
            this.showExpGrid = false;
            this.showGrid = false;
            var todayDate = new Date();
            if (this.fromExpDate.getDate() < todayDate.getDate()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be greater than or equal to Today's Date" });
            }
            else if (this.fromExpDate > this.toExpDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
            }
            else {
                var fromDate = this.fromExpDate.toLocaleDateString();
                var toDate = this.toExpDate.toLocaleDateString();
                await this.getExpirationTrackingReport(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], 0, fromDate, toDate, this.ExpDepartment, EnumApps.PointOfUse, this.ExpParLoc, 'Expiring');

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'btnExpGo_Click');
        }
    }

    async getExpirationTrackingReport(orgGrpID, duration, fromDate, toDate, deptID, appID, cartID, type) {
        try {
            this.spinnerService.start();
            if (deptID == undefined) {
                deptID = '';
            }
            if (cartID == undefined) {
                cartID = '';
            }
            await this.expirationTrackingReportService.getExpirationTrackingReport(orgGrpID, duration, fromDate, toDate, deptID, appID, cartID).then((result: Response) => {
                this.spinnerService.stop();
                let res = result.json() as AtParWebApiResponse<VM_GETEXPIRETRACKREP>;
                this.growlMessage = [];
                let _dtdetails: VM_GETEXPIRETRACKREP[] = [];
                let SelRows: VM_GETEXPIRETRACKREP[] = [];
                this.labelData = [];
                this.labels = [];
                this.chartExpiredDataset = [];
                this.chartExpiringDataset = [];
                this.ExpiredGroupItem = [];
                this.ExpiringGroupItem = [];
                let _dblTtlCost;
                switch (res.StatType) {
                    case StatusType.Success: {
                      
                        if (type == 'Expired') {
                            if (res.DataDictionary['pReturnDS'].EXPIRED_ITEMS.length == 0) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                return;
                            }
                            this.lstExpiredItems = res.DataDictionary['pReturnDS'].EXPIRED_ITEMS;

                            _dtdetails = asEnumerable(this.lstExpiredItems).Distinct(a => a.CART_ID).Select(a => a).ToArray()

                            for (let index in _dtdetails) {
                                _dblTtlCost = 0;
                                let strCartId1 = _dtdetails[index].CART_ID;

                                SelRows = this.lstExpiredItems.filter(x => x.CART_ID == strCartId1);

                                for (let j in SelRows) {

                                    _dblTtlCost = parseFloat(_dblTtlCost) + parseFloat(SelRows[j].TOTAL_COST);

                                }
                                _dblTtlCost = _dblTtlCost.toFixed(2);
                                this.labels.push(strCartId1);
                                this.labelData.push(_dblTtlCost);
                                this.ExpiredGroupItem.push({ PAR_LOCATION: strCartId1, ExpiredItems: SelRows, TotalAmount: _dblTtlCost, BUNIT: _dtdetails[index].BUSINESS_UNIT });
                            }
                            this.chartExpiredDataset.push({ label: 'Total Cost', backgroundColor: '#338aeb', borderColor: '#7CB342', data: this.labelData, fill: false })
                            for (let i in this.lstExpiredItems) {
                                this.lstExpiredItems[i].UNIT_COST = parseFloat(this.lstExpiredItems[i].UNIT_COST).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                this.lstExpiredItems[i].QUANTITY_ON_HAND = parseFloat(this.lstExpiredItems[i].QUANTITY_ON_HAND).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                this.lstExpiredItems[i].TOTAL_COST = parseFloat(this.lstExpiredItems[i].TOTAL_COST).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }

                            this.showGrid = true
                            this.getChart('Expired');
                        } else {
                            if (res.DataDictionary['pReturnDS'].EXPIRING_ITEMS.length == 0) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                return;
                            }
                            this.lstExpiringItems = res.DataDictionary['pReturnDS'].EXPIRING_ITEMS;

                            _dtdetails = asEnumerable(this.lstExpiringItems).Distinct(a => a.CART_ID).Select(a => a).ToArray()
                            for (let index in _dtdetails) {
                                _dblTtlCost = 0;
                                let strCartId1 = _dtdetails[index].CART_ID;

                                SelRows = this.lstExpiringItems.filter(x => x.CART_ID == strCartId1);

                                for (let j in SelRows) {
                                    _dblTtlCost = parseFloat(_dblTtlCost) + parseFloat(SelRows[j].TOTAL_COST);
                                }
                                _dblTtlCost = _dblTtlCost.toFixed(2);
                                this.labels.push(strCartId1);
                                this.labelData.push(_dblTtlCost);
                                this.ExpiringGroupItem.push({ PAR_LOCATION: strCartId1, ExpiredItems: SelRows, TotalAmount: _dblTtlCost, BUNIT: _dtdetails[index].BUSINESS_UNIT });
                            }
                            this.chartExpiringDataset.push({ label: 'Total Cost', backgroundColor: '#338aeb', borderColor: '#7CB342', data: this.labelData, fill: false })
                            for (let i in this.lstExpiringItems) {
                                this.lstExpiringItems[i].UNIT_COST = parseFloat(this.lstExpiringItems[i].UNIT_COST).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                this.lstExpiringItems[i].QUANTITY_ON_HAND = parseFloat(this.lstExpiringItems[i].QUANTITY_ON_HAND).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                this.lstExpiringItems[i].TOTAL_COST = parseFloat(this.lstExpiringItems[i].TOTAL_COST).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            this.showExpGrid = true
                            this.getChart('Expiring');
                        }

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

            });
        } catch (ex) {
            this.clientErrorMsg(ex, 'getExpirationTrackingReport');
        }
    }

    getChart(Type) {
        this.chartData = [];
        this.options = [];
        if (Type == 'Expired') {
            this.chartData = {
                labels: this.labels,
                datasets: this.chartExpiredDataset
            }
            this.options = {
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Par Location'
                        },                        
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Total Value in $'
                        },
                        ticks: {
                            beginAtZero: true
                        }

                    }]
                },
                showTooltips: true,
                showAllTooltips: true
            };
        } else {
            this.chartData = {
                labels: this.labels,
                datasets: this.chartExpiringDataset
            }
            this.options = {
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Par Location'
                        },
                        ticks: {
                            beginAtZero: true
                        }

                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Total Value in $'
                        },
                        ticks: {
                            beginAtZero: true
                        }

                    }]
                }
            };
        }
        setTimeout(function () {
            var chartImage = document.getElementById("myChart") as HTMLCanvasElement;

            //chartImage.getSeries().getPointByArg("Second").showTooltip();
        }, 500);
        
      

    }

    async btnUsage_Click(userRow) {
        let navigationExtras: NavigationExtras = {
            relativeTo: this.route,
            queryParams: { "mode": ModeEnum.Add },
        };
        this.breadCrumbMenu.MENU_NAME = "Item Usage Report";
        this.breadCrumbMenu.ROUTE = 'pointofuse/itemusagereport';
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.breadCrumbMenu.APP_NAME = 'Point Of User';
        this.breadCrumbMenu.IS_DIV = false;
        localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        

        var menuItems = JSON.parse(localStorage.getItem('MenuList'));
        for (var i = 0; i < menuItems.length; i++) {
            if ((menuItems[i] as Menus).ROUTE == 'pointofuse/itemusagereport') {
                await this.leftBarAnimateService.emitChangeReportaActiveMenu((menuItems[i] as Menus).MENU_NAME.trim());
                break;
            }
        }
        await this.atParSharedDataService.setStorage({ "editItemInfo": userRow, "mode": ModeEnum.Edit });
        await this.router.navigate(['pointofuse/itemusagereport'], navigationExtras);  
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.lstExpiredItems = null;
        this.lstExpiringItems = null;
        this.lstDept = null;
        this.lstDuration = null;
        this.lstExpParLoc = null;
        this.lstParLoc = null;
        this.Department = '';
        this.expiredCnt = 0;
        this.expiringCnt = 0;

    }

}