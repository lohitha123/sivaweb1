import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { TokenEntry_Enum, ClientType, StatusType, BusinessType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { Menus } from '../AtPar/Menus/routepath';
import { SelectItem, Message } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { VM_POU_LOW_STOCK_REPORT } from "../entities/VM_POU_LOW_STOCK_REPORT";
import { LowStockReportService } from './pou-low-stock-report.service';
import { Physicians_Basedn, MailPriority, EnumApps } from '../Shared/AtParEnums';

import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
declare var module: {
    id: string;
}

@Component({

    templateUrl: 'pou-low-stock-report.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, LowStockReportService
    ]
})

export class LowStockReportComponent {


    deviceTokenEntry: string[] = [];
    gstrServerName: string = "";
    isMailDialog: boolean = false;
    gstrProtocal: string = "";
    toMailAddr: string = '';
    gstrPortNo: string = "";
    ipAddress: string = " ";
    startIndex: number;
    EndIndex: number;
    blnsortbycolumn: boolean = true;
    tdExports: boolean = false;
    custom: string = "custom";
    breadCrumbMenu: Menus;
    pazeSize: number;
    appId: any;
    growlMessage: Message[] = [];
    defDateRange: number = 0;
    selectedProcedure: string = "";
    selectedPhysician: string;
    bindLabelData: string = "";
    showGrid: boolean = false;
    showMainGrid: boolean = false;
    statusCode: number = -1;
    strCode: string = "";
    strDescr: string = "";
    
    exCrItemsSymbol: string = "";
    exCrItemsText: string = "";

    exAllItemsBelowParSymbol: string = "";
    exAllItemsBelowParText: string = "";

    exStockOutItemsSymbol: string = "";
    exStockOutItemsText: string = "";


    lbCrItems: string = "";
    lbCrItemsBelowPar: string = "";
    lbAllItemsBelowPar: string = "";
    lbAllItems: string = '';
    lbItems: string = '';
    lbStockOutItems: string = '';

    lstDBData: VM_POU_LOW_STOCK_REPORT[] = [];
    lstCrItems: VM_POU_LOW_STOCK_REPORT[] = [];
    lstCrItemsBelowPar: VM_POU_LOW_STOCK_REPORT[] = [];
    lstAllItemsBelowPar: VM_POU_LOW_STOCK_REPORT[] = [];
    lstAllItems: VM_POU_LOW_STOCK_REPORT[] = [];
    lstItems: VM_POU_LOW_STOCK_REPORT[] = [];
    lstStockOutItems: VM_POU_LOW_STOCK_REPORT[] = [];


    public constructor(

        private spinnerService: SpinnerService,
        public atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        public lowStockReportService: LowStockReportService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.breadCrumbMenu = new Menus();
    }

    async  ngOnInit() {



        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

        // this.statusCode = await this.getDefDateRange();
        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.appId = this.deviceTokenEntry[TokenEntry_Enum.AppName] == 'PointOfUse' ? EnumApps.PointOfUse:EnumApps.Pharmacy;

        
        //if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
        //    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
        //    return;
        //}
        await this.getDataGrid();
        this.spinnerService.stop();


    }


    async getDataGrid() {
        try {
            this.spinnerService.start();
            await this.lowStockReportService.getLowStockRep(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.appId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            //this.bindLabelData = "Critical Items";
                            this.lstCrItems = data.DataDictionary["pReturnDS"]["CRITICAL_ITEMS"];
                            this.lbCrItems = data.DataDictionary["pReturnDS"]["CRITICAL_ITEMS"].length;

                            this.lstCrItemsBelowPar = data.DataDictionary["pReturnDS"]["ITEMS_BELOW_PAR"];
                            this.lbCrItemsBelowPar = data.DataDictionary["pReturnDS"]["ITEMS_BELOW_PAR"].length;

                            this.exCrItemsSymbol = this.lstCrItemsBelowPar.length == 0 ? 'check' : 'exclamation';
                            this.exCrItemsText = this.lstCrItemsBelowPar.length == 0 ? 'info' : 'danger';

                            this.lstAllItemsBelowPar = data.DataDictionary["pReturnDS"]["ALL_ITEMS_BELOW_PAR"];
                            this.lbAllItemsBelowPar = data.DataDictionary["pReturnDS"]["ALL_ITEMS_BELOW_PAR"].length;

                            this.exAllItemsBelowParSymbol = this.lstAllItemsBelowPar.length == 0 ? 'check' : 'exclamation';
                            this.exAllItemsBelowParText = this.lstAllItemsBelowPar.length == 0 ? 'info' : 'danger';
                            
                            this.lstAllItems = data.DataDictionary["pReturnDS"]["ALL_ITEMS"];
                            this.lbAllItems = data.DataDictionary["pReturnDS"]["ALL_ITEMS"].length;

                            this.lstStockOutItems = data.DataDictionary["pReturnDS"]["ALL_STOCKOUT_ITEMS"];
                            this.lbStockOutItems = data.DataDictionary["pReturnDS"]["ALL_STOCKOUT_ITEMS"].length;

                            this.exStockOutItemsSymbol = this.lstStockOutItems.length == 0 ? 'check' : 'exclamation';
                            this.exStockOutItemsText = this.lstStockOutItems.length == 0 ? 'info' : 'danger';

                            this.lstItems = data.DataDictionary["pReturnDS"]["ALL_ITEMS"];
                            this.lbItems = data.DataDictionary["pReturnDS"]["ALL_ITEMS"].length;


                            //this.showGrid = true;
                            //this.lstDBData = null;
                            //this.lstDBData = this.lstCrItems;
                            this.showMainGrid = true;
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.StatusCode == 1102002) {
                                this.lbCrItems = '0';
                                this.lbCrItemsBelowPar = '0';
                                this.lbAllItemsBelowPar = '0';
                                this.lbAllItems = '0';
                                this.lbStockOutItems = '0';
                                this.lbItems = '0';

                                this.exCrItemsSymbol = 'check'
                                this.exCrItemsText = 'info'
                                this.exAllItemsBelowParSymbol = 'check'
                                this.exAllItemsBelowParText = 'info'
                                this.exStockOutItemsSymbol = 'check'
                                this.exStockOutItemsText = 'info'

                                this.growlMessage = [];
                                this.showMainGrid = true;

                                //this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });

                            }
                            
                            else {
                                this.lbCrItems = '0';
                                this.lbCrItemsBelowPar = '0';
                                this.lbAllItemsBelowPar = '0';
                                this.lbAllItems = '0';
                                this.lbStockOutItems = '0';
                                this.lbItems = '0';
                                this.growlMessage = [];
                                this.showMainGrid = true;

                                this.exCrItemsSymbol = 'check'
                                this.exCrItemsText = 'info'
                                this.exAllItemsBelowParSymbol = 'check'
                                this.exAllItemsBelowParText = 'info'
                                this.exStockOutItemsSymbol = 'check'
                                this.exStockOutItemsText = 'info'

                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.lbCrItems = '0';
                            this.lbCrItemsBelowPar = '0';
                            this.lbAllItemsBelowPar = '0';
                            this.lbAllItems = '0';
                            this.lbStockOutItems = '0';
                            this.lbItems = '0';
                            this.growlMessage = [];
                            this.exCrItemsSymbol = 'check'
                            this.exCrItemsText = 'info'
                            this.exAllItemsBelowParSymbol = 'check'
                            this.exAllItemsBelowParText = 'info'
                            this.exStockOutItemsSymbol = 'check'
                            this.exStockOutItemsText = 'info'
                            this.showMainGrid = true;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.lbCrItems = '0';
                            this.lbCrItemsBelowPar = '0';
                            this.lbAllItemsBelowPar = '0';
                            this.lbAllItems = '0';
                            this.lbStockOutItems = '0';
                            this.lbItems = '0';
                            this.growlMessage = [];
                            this.exCrItemsSymbol = 'check'
                            this.exCrItemsText = 'info'
                            this.exAllItemsBelowParSymbol = 'check'
                            this.exAllItemsBelowParText = 'info'
                            this.exStockOutItemsSymbol = 'check'
                            this.exStockOutItemsText = 'info'
                            this.showMainGrid = true;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "getDataGrid");
        }
    }
    //gets the critical items
    async onlbCrItemsclick() {
        //this.lstCrItems = [];
        //this.lbCrItems = '';
        //;
        try {
            this.spinnerService.start();
            if (this.lstCrItems.length > 0) {
                this.spinnerService.stop();
                this.lbCrItems = this.lstCrItems.length.toString();
                this.bindLabelData = "Critical Items";
                this.lstDBData = null;
                this.showGrid = true;
                this.lstCrItems.forEach(x => {
                    x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                    x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                });
                this.lstDBData = this.lstCrItems;
            }
            else {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "onlbCrItemsclick");
        }
    }


    //gets the critical items below par quantity
    async onlbCrItemsBelowParclick() {
        //this.lstCrItems = [];
        //this.lbCrItems = '';
        //;
        try {
            this.spinnerService.start();
            if (this.lstCrItemsBelowPar.length > 0) {
                this.spinnerService.stop();
                this.lbCrItemsBelowPar = this.lstCrItemsBelowPar.length.toString();
                this.bindLabelData = "Critical Items Below Par Quantity";
                this.lstDBData = null;
                this.showGrid = true;
                this.lstCrItemsBelowPar.forEach(x => {
                    x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                    x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                });
                this.lstDBData = this.lstCrItemsBelowPar;
            }

            else {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
            }


        }
        catch (ex) {
            this.clientErrorMsg(ex, "onlbCrItemsBelowParclick");
        }
    }

    async onlbAllItemsBelowParclick() {
        //this.lstAllItemsBelowPar = [];
        //this.lbAllItemsBelowPar = '';
        //;
        try {
            this.spinnerService.start();

            if (this.lstAllItemsBelowPar.length > 0) {
                this.spinnerService.stop();
                this.lbAllItemsBelowPar = this.lstAllItemsBelowPar.length.toString();
                this.bindLabelData = "All Items Below Par Quantity";
                this.lstDBData = null;
                this.showGrid = true;
                this.lstAllItemsBelowPar.forEach(x => {
                    x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                    x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                });
                this.lstDBData = this.lstAllItemsBelowPar;
            }

            else {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
            }


        }
        catch (ex) {
            this.clientErrorMsg(ex, "onlbAllItemsBelowParclick");
        }
    }

    async onlbAllItemsclick() {
        //this.lstAllItems = [];
        //this.lbAllItems = '';
        //;
        try {
            this.spinnerService.start();

            if (this.lstAllItems.length > 0) {
                this.spinnerService.stop();
                this.lbAllItems = this.lstAllItems.length.toString();
                this.bindLabelData = "All Items";
                this.lstDBData = null;
                this.showGrid = true;
                this.lstAllItems.forEach(x => {
                    x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                    x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                });
                this.lstDBData = this.lstAllItems;
            }

            else {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "onlbAllItemsclick");
        }
    }


    async onlbStockOutItemsclick() {
        //this.lstStockOutItems = [];
        //this.lbStockOutItems = '';

        //;
        try {

            this.spinnerService.start();

            if (this.lstStockOutItems.length > 0) {
                this.spinnerService.stop();
                this.lbStockOutItems = this.lstStockOutItems.length.toString();
                this.bindLabelData = "Stock Out Items";
                this.lstDBData = null;
                this.showGrid = true;
                this.lstStockOutItems.forEach(x => {
                    x.ITEM_QUANTITY_ON_HAND = parseFloat(x.ITEM_QUANTITY_ON_HAND).toFixed(2);
                    x.PAR_QUANTITY = parseFloat(x.PAR_QUANTITY).toFixed(2);
                });
                this.lstDBData = this.lstStockOutItems;
            }

            else {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "onlbStockOutItemsclick");
        }
    }

    async onlbItemsclick() {
        //this.lstItems = [];
        //this.lbItems = '';
        //;
        try {
            this.spinnerService.start();

            if (this.lstItems.length > 0) {
                this.spinnerService.stop();
                this.lbItems = this.lstItems.length.toString();
                this.bindLabelData = "All Items";
                this.lstDBData = null;
                this.showGrid = true;
                this.lstDBData = this.lstItems;
            }

            else {
                this.spinnerService.stop();
                this.growlMessage = [];
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data found" });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "onlbItemsclick");
        }
    }

    async getDefDateRange() {
        try {
            await this.atParCommonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[TokenEntry_Enum.UserID]).
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


    async onItemIDClick(item: VM_POU_LOW_STOCK_REPORT) {
        try {
            
            let navigationExtras: NavigationExtras = {
                //relativeTo: this.route
                queryParams: {
                    "appId": EnumApps.PointOfUse,
                    "mode": 'Go',
                    "bunit": item.BUSINESS_UNIT,
                    "ItemId": item.ITEM_ID,
                    "cartID": item.CART_ID,
                    "Screen":'Low Stock'
                }

            };
            this.breadCrumbMenu.MENU_NAME = "Create Orders";
            this.breadCrumbMenu.ROUTE = 'pointofuse/createorders';
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.breadCrumbMenu.APP_NAME = 'Point Of Use';
            this.breadCrumbMenu.IS_DIV = false;
            localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
            this.router.navigate(['atpar/pointofuse/createorders'], navigationExtras);
        } catch (ex) {
            this.clientErrorMsg(ex, "onItemIDClick");
        }
    }



    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

}