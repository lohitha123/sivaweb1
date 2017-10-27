/// <reference path="../Shared/AtParEnums.ts" />
import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit } from '@angular/core';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';
import { Message } from '../components/common/api';
import { PrintScreenService } from './atpar-stationary-print-design.service';
import { TokenEntry_Enum, StatusType } from '../Shared/AtParEnums';
import { Http, Response, Jsonp, RequestOptions, Headers, } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { VM_MT_ATPAR_DYNAMIC_REPORT } from './../entities/vm_mt_atpar_dynamic_report';
import { EnumApps } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';

declare var module: {
    id: string;
}
@Component({

    templateUrl: 'atpar-stationary-print-design.component.html',
    providers: [PrintScreenService, HttpService, AtParConstants]
})

export class StationaryPrintDesign implements OnInit {

    //#region Declaration
    lstProduct: any = [];
    lstPrinterType: any = [];
    lstReportType: any = [];
    lstHeaderRows: any = [];
    lstHeaderColumns: any = [];
    lstDetailsColumns: any = [];

    _deviceTokenEntry: string[] = [];
    headerFontName: string = "";
    valueFontName: string = "";
    intHdrColumns: number = 0;
    intHdrRows: number = 0;
    intDetColumns: number = 0;
    blnLayout: boolean = false;
    strMsg1: string;
    strMsg2: string;
    strMsg3: string;
    product: any;
    productValue: any;
    printer: any;
    printerValue: any;
    report: any;
    reportValue: any;
    headerRows: any = "6";
    headerColumns: any = "5";
    detailColumns: any = "6";
    growlMessage: Message[] = [];
    lstPrintRepHeaderColumnsMain: Array<any> = [];//lstPrintRepdetailslist1
    lstPrintRepDetailColumnsMain: Array<any> = [];//lstPrintRepdetailslist2
    lstPrintRepHeaderColumnsRight: Array<any> = [];//lstPrintRepdetailslist3
    lstPrintRepDetailColumnsRight: Array<any> = [];//lstPrintRepdetailslist4
    lstPrintRepdetailslist7: Array<any> = [];
    lstPrintRepHeaderFont: Array<any> = [];//lstPrintRepdetailslist5
    lstPrintRepValueFont: Array<any> = [];//lstPrintRepdetailslist6
    lstPrintRepHeaderColumnsLeft: Array<any> = [];//lstPrintRepdetailslist8
    lstPrintSavedRepdetails: Array<any> = [];//savingList to database
    lstHeaderFont: any = [];
    lstColumnsFont: any = [];
    headerFont: any;
    columnFont: any;
    HdrRows: number = 0;
    HdrCells: number;
    DetailCells: number;
    list: any[];
    selectedItem: any;
    newIndexValue: any = [];
    showDiv: boolean = false;
    lstReportDtls: any = [];
    lstTest: any = [];
    headerColumnsList: any = [];
    headdetailcolumns: any = [];
    detailColumnsheader: any = [];
    isDraggable: boolean = true;
    lstHeaderRowsCount: any = [];
    lstHeaderColCount: any = [];
    //#endregion


    /**
     redirecting to home when click on breadcrumbs
     */
    homeurl() {
        this.leftBarAnimationsewrvice.isHomeClicked = false;
        this.leftBarAnimationsewrvice.isHide();
        this.router.navigate(['atpar']);
    }

    constructor(
        private leftBarAnimationsewrvice: LeftBarAnimationService,
        private router: Router,
        private route: ActivatedRoute,
        private printScreenService: PrintScreenService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants
    ) {
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        var allFonts = [];
    }


    /**
     OnInit method for getting data when page load
     */
    async ngOnInit() {
        try {
            this.spinnerService.start();
            this.lstProduct = [];
            this.lstProduct.push({ label: "Select Product", value: '' });
            await this.getProductDetails();

            this.lstReportType = [];
            this.lstReportType.push({ label: "Select One", value: '' })
            this.lstPrinterType = [{ label: 'Select Printer Type', value: '' }, { label: 'Stationary', value: '1' }];
            this.lstHeaderRows = [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }];
            this.lstHeaderColumns = [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }];
            this.lstDetailsColumns = [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }
                , { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '10', value: '10' }, { label: '11', value: '11' }];

            this.lstPrintRepdetailslist7 = new Array<any>();
            this.lstPrintRepValueFont = [];
            this.lstPrintRepHeaderFont = [];
            this.lstPrintRepHeaderColumnsRight = [];
            this.lstPrintRepDetailColumnsRight = [];
            this.lstPrintRepDetailColumnsMain = [];
            this.lstPrintRepHeaderColumnsMain = [];
        }
        catch (ex) {
            this.displayCatchException(ex, "ngOnInit");
        }
    }

    ngAfterViewInit() {

    }

    ngAfterContentInit() {
    }

    /**
     getting Products details when page Load from database
     */
    async getProductDetails() {
        try {
            await this.printScreenService.getDynamicPrintProducts(this._deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    let products = data.DataList;
                    for (var i = 0; i < products.length; i++) {
                        this.lstProduct.push({ label: products[i].APP_NAME, value: products[i].APP_ID })
                    }
                    this.spinnerService.stop();
                });
        }
        catch (ex) {
            this.displayCatchException(ex, "getProductDetails");
        }
    }

    /**
     * Change Event for dropdown report type
     */
    ddlSelectChangeReport(event) {
        this.growlMessage = [];
        this.report = event.value;
        this.reportValue = event.label;
    }

    /**
    * Change Event for dropdown Product and based on product getting report types
    */
    ddlSelectChangeProduct(event) {
        this.showDiv = false;
        this.report = '';
        this.growlMessage = [];
        this.productValue = event.label;
        this.product = event.value;
        this.lstReportType = [];
        this.lstReportType.push({ label: "Select One", value: '' });
        try {
            if (this.product != "") {
                this.printScreenService.getDynamicPrintReportTypes(this.product)
                    .catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<any>;
                        let products = data.DataList;
                        for (var i = 0; i < products.length; i++) {
                            this.lstReportType.push({ label: products[i], value: products[i] })
                        }
                    });
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "ddlSelectChangeProduct");
        }
    }

    /**
    * Change Event for dropdown printer type
    */
    ddlSelectChangePrinter(event) {
        this.growlMessage = [];
        this.printer = event.value;
        this.printerValue = event.label;
    }

    /**
     * Event for getting data from database based on selection of product,printer,Report when GetReports button Click event
     */
    async getReports() {
        this.growlMessage = [];
        try {
            this.blnLayout = false;
            if (this.product == null || this.product == "" || this.product == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Product' });
                return;
            }
            if (this.printer == null || this.printer == "" || this.printer == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Printer Type' });
                return;
            }
            if (this.report == null || this.report == "" || this.report == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Report Type' });
                return;
            }

            if ((this.product != null || this.product != "" || this.product != undefined) && (this.printer != null || this.printer != "" || this.printer != undefined) && (this.report != null || this.report != "" || this.report != undefined)) {
                await this.bindData();
                this.strMsg1 = "";
                this.strMsg2 = "";
                this.strMsg3 = "";

                if (this.lstPrintRepHeaderColumnsMain.length > 0) {
                    if (this.lstPrintRepHeaderColumnsRight.length > 0) {
                        this.intHdrRows = asEnumerable(this.lstPrintRepHeaderColumnsRight).Select(a => a.ROW_POSITION).Max();
                        this.intHdrColumns = asEnumerable(this.lstPrintRepHeaderColumnsRight).Select(a => a.COLUMN_POSITION).Max();
                    }
                    if (this.lstPrintRepDetailColumnsRight.length > 0) {
                        this.intDetColumns = asEnumerable(this.lstPrintRepDetailColumnsRight).Select(a => a.COLUMN_POSITION).Max();
                    }

                    if (this.intHdrRows > parseInt(this.headerRows)) {
                        this.strMsg1 = "No.of Header Rows";
                        this.blnLayout = true;
                        var s = this.lstHeaderRows.filter(report => report.label === this.intHdrRows);
                        if (s != undefined && s != null) {
                            if (s.length < 0) { }
                            else { this.headerRows = this.intHdrRows; }
                        }
                    }

                    if (this.intHdrColumns > parseInt(this.headerColumns)) {
                        this.blnLayout = true;
                        this.strMsg2 = (this.strMsg1.length > 0 ? ",No.of Header Columns" : "No.of Header Columns");
                        var s = this.lstHeaderColumns.filter(report => (report.label) === this.intHdrColumns.toString());
                        if (s != undefined && s != null && s.length > 0) {
                            let val = parseInt(s[0].value);
                            if (val < 0) { }
                            else { this.headerColumns = this.intHdrColumns; }
                        }
                        //else {
                        //    this.headerColumns = this.intHdrColumns;
                        //}
                    }

                    if (this.intDetColumns > parseInt(this.detailColumns)) {
                        this.blnLayout = true;
                        this.strMsg3 = "No.of Details Columns";
                        this.strMsg3 = ((this.strMsg1.length > 0 || this.strMsg2.length > 0) ? ",No.of Details Columns" : "No.of Details Columns");
                        var s = this.lstDetailsColumns.filter(report => report.label === this.intDetColumns)
                        if (s != undefined && s != null) {
                            if (s.length < 0) { }
                            else { this.detailColumns = this.intDetColumns; }
                        }
                    }
                    this.reBindData();
                    if (this.blnLayout == true) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Selected ' + this.strMsg1 + this.strMsg2 + this.strMsg3 + ' values  are less than Saved Design Format Rows/Columns. Report Design is binded with default Saved Values.  ' });
                    }

                    await this.bindSavedDataToHtmlTables();

                }
                else {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Present' });
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "getReports");
        }
    }

    /**
     * Binding data to tables
     */
    async  bindData() {
        try {
            this.spinnerService.start();
            await this.printScreenService.getDynamicReport(this.product, this.reportValue, this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.printer)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.lstPrintRepHeaderColumnsMain = [];
                    this.lstPrintRepDetailColumnsMain = [];
                    this.lstPrintRepHeaderColumnsRight = [];
                    this.lstPrintRepDetailColumnsRight = [];
                    this.lstPrintRepHeaderFont = [];
                    this.lstPrintRepValueFont = [];
                    this.lstPrintRepHeaderColumnsMain = data.DataDictionary["list1"];
                    this.lstPrintRepDetailColumnsMain = data.DataDictionary["list2"];
                    this.lstPrintRepHeaderColumnsRight = data.DataDictionary["list3"];
                    this.lstPrintRepDetailColumnsRight = data.DataDictionary["list4"];
                    this.lstPrintRepHeaderFont = data.DataDictionary["list5"];
                    this.lstPrintRepValueFont = data.DataDictionary["list6"];
                    this.lstPrintRepdetailslist7 = this.lstPrintRepHeaderColumnsMain;
                    this.spinnerService.stop();
                });
        }
        catch (ex) {
            this.displayCatchException(ex, "bindData");
        }
    }

    async  reBindData() {
        try {
            let Hcolumn: any = '';
            if (this.lstPrintRepHeaderFont.length > 0) {
                this.headerFontName = this.lstPrintRepHeaderFont[0].HEADERFONT;
                this.valueFontName = this.lstPrintRepHeaderFont[0].VALUEFONT;
            }
            if (this.headerFontName == null || this.headerFontName == '' || this.headerFontName == undefined) {
                if (this.lstPrintRepValueFont.length > 0) {
                    this.headerFontName = this.lstPrintRepValueFont[0].HEADERFONT;
                }
            }
            if (this.valueFontName == null || this.valueFontName == '' || this.valueFontName == undefined) {
                if (this.lstPrintRepValueFont.length > 0) {
                    this.valueFontName = this.lstPrintRepValueFont[0].VALUEFONT;
                }
            }
            if (this.headerFontName != null || this.headerFontName != '' || this.headerFontName != undefined) {
                this.headerFont = this.headerFontName;
            }
            else {
                this.headerFont = '';
            }
            if (this.valueFontName != null || this.valueFontName != '' || this.valueFontName != undefined) {
                this.columnFont = this.valueFontName;
            }
            else {
                this.columnFont = '';
            }

            this.showDiv = true;
            this.headdetailcolumns = [];
            for (var x = 0; x < (this.lstPrintRepDetailColumnsMain.length); x++) {
                this.headdetailcolumns.push(x);
            }

            this.detailColumnsheader = [];
            for (var x = 1; x <= parseInt(this.detailColumns); x++) {
                this.detailColumnsheader.push(x);
                if (this.lstPrintRepDetailColumnsRight.length < x) {
                    this.lstPrintRepDetailColumnsRight.push({
                        APP_ID: "",
                        OBJECT_ID: "",
                        LINE_NO: lineNo,
                        FIELD_NAME: "",
                        FIELD_TYPE: "",
                        TEXT_VALUE: "",
                        FIELD_GROUP: "",
                        ROW_POSITION: 1,
                        COLUMN_POSITION: x,
                        DISPLAY_NAME: "",
                        VISIBLE: "",
                        HColumn: "",
                        FIELD_SIZE: "",
                        ALIGNMENT: "",
                        HEADERFONT: "",
                        VALUEFONT: "",
                        SECTION: ""
                    });
                    this.lstPrintRepDetailColumnsMain.push({
                        APP_ID: "",
                        OBJECT_ID: "",
                        LINE_NO: lineNo,
                        FIELD_NAME: "",
                        FIELD_TYPE: "",
                        TEXT_VALUE: "",
                        FIELD_GROUP: "",
                        ROW_POSITION: x,
                        COLUMN_POSITION: 1,
                        DISPLAY_NAME: "",
                        VISIBLE: "",
                        HColumn: "",
                        FIELD_SIZE: "",
                        ALIGNMENT: "",
                        HEADERFONT: "",
                        VALUEFONT: "",
                        SECTION: ""
                    });

                }
            }
            this.lstHeaderRowsCount = [];
            this.lstHeaderColCount = [];
            for (var x = 1; x <= parseInt(this.headerRows); x++) {
                this.lstHeaderRowsCount.push(x)
            }
            for (var x = 1; x <= parseInt(this.headerColumns); x++) {
                this.lstHeaderColCount.push(x)
            }

            this.headerColumnsList = [];
            this.lstPrintRepHeaderColumnsLeft = [];
            let listcount: number = this.lstPrintRepHeaderColumnsMain.length * 2;

            for (var x = 0; x < listcount; x++) {
                this.headerColumnsList.push(x);
                let item = parseInt((x / 2).toString());
                let y = x % 2;
                var fieldName = this.lstPrintRepHeaderColumnsMain[item].FIELD_NAME;
                var lineNo = this.lstPrintRepHeaderColumnsMain[item].LINE_NO;
                var displayName = this.lstPrintRepHeaderColumnsMain[item].DISPLAY_NAME;
                var TextValue: any;
                if (y.toString() == "0") {
                    this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE = "TEXT";
                    TextValue = this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE;
                } else {
                    this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE = "VALUE";
                    TextValue = this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE;
                }

                if (this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE == "VALUE") {
                    Hcolumn = '{Value}'
                    this.lstPrintRepHeaderColumnsMain[item].HColumn = Hcolumn;
                }
                else {
                    Hcolumn = '{Header}';
                    this.lstPrintRepHeaderColumnsMain[item].HColumn = Hcolumn;
                }

                this.lstPrintRepHeaderColumnsLeft.push({
                    APP_ID: "",
                    OBJECT_ID: "",
                    LINE_NO: lineNo,
                    FIELD_NAME: fieldName,
                    FIELD_TYPE: "",
                    TEXT_VALUE: TextValue,
                    FIELD_GROUP: "",
                    ROW_POSITION: x,
                    COLUMN_POSITION: 1,
                    DISPLAY_NAME: displayName,
                    VISIBLE: "",
                    HColumn: Hcolumn,
                    FIELD_SIZE: "",
                    ALIGNMENT: "",
                    HEADERFONT: "",
                    VALUEFONT: "",
                    SECTION: ""
                });
            }

            if (this.lstPrintRepHeaderColumnsRight.length > 0) {
                for (var i = 0; i < this.lstPrintRepHeaderColumnsRight.length; i++) {
                    if (this.lstPrintRepHeaderColumnsRight[i].TEXT_VALUE == "VALUE") {
                        Hcolumn = '{Value}'
                        this.lstPrintRepHeaderColumnsRight[i].HColumn = Hcolumn;
                    }
                    else {
                        Hcolumn = '{Header}';
                        this.lstPrintRepHeaderColumnsRight[i].HColumn = Hcolumn;
                    }
                }
            }

            this.lstHeaderFont = [];

            await this.printScreenService.getDynamicFonts()
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data1 = res.json() as AtParWebApiResponse<any>;
                    var lstdata = [];
                    lstdata = data1.DataList;
                    this.lstHeaderFont.push({ label: 'Select Font', value: '' });
                    for (var i = 0; i < lstdata.length; i++) {
                        this.lstHeaderFont.push({ label: lstdata[i], value: lstdata[i] });
                    }
                });
        }
        catch (ex) {
            this.displayCatchException(ex,"reBindData");
        }
    }

    /**
    * Drag Start event
    */
    dragStart(event, row, col, list: any) {
        this.selectedItem = list.filter(x => (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col))[0];
        if (this.selectedItem.DISPLAY_NAME == "") {
            return;
        }
    }

    /**
    * Drop Event: drag from right Header Columns table and drop into left side header Columns and drop within the left side header columns 
    */
    onDropHeaderLeft(event, row, col) {
        try {
            var newindex: any;
            if (this.selectedItem.DISPLAY_NAME == "") {
                return;
            }
            if (this.selectedItem) {
                var draggedItem = this.lstPrintRepHeaderColumnsLeft.filter(x => (x.DISPLAY_NAME + '-' + x.HColumn) == (this.selectedItem.DISPLAY_NAME + '-' + this.selectedItem.HColumn));
                if (draggedItem.length == 0) {

                    let droppedItem: any;

                    droppedItem = this.lstPrintRepHeaderColumnsLeft.filter(x => (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col));

                    var index = this.findIndex(this.selectedItem, this.lstPrintRepHeaderColumnsRight, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepHeaderColumnsLeft, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepHeaderColumnsRight[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepHeaderColumnsLeft[index] = "";
                    }

                    this.lstPrintRepHeaderColumnsRight[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepHeaderColumnsRight[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepHeaderColumnsLeft[newindex] = this.selectedItem;
                    this.lstPrintRepHeaderColumnsLeft[newindex].ROW_POSITION = row;
                    this.lstPrintRepHeaderColumnsLeft[newindex].COLUMN_POSITION = col;
                }
                else {
                    var droppedItem = this.lstPrintRepHeaderColumnsLeft.filter(x => (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col));
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepHeaderColumnsLeft, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepHeaderColumnsLeft, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepHeaderColumnsLeft[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepHeaderColumnsLeft[index] = "";
                    }
                    this.lstPrintRepHeaderColumnsLeft[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepHeaderColumnsLeft[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepHeaderColumnsLeft[newindex] = this.selectedItem;
                    this.lstPrintRepHeaderColumnsLeft[newindex].ROW_POSITION = row;
                    this.lstPrintRepHeaderColumnsLeft[newindex].COLUMN_POSITION = col;
                }
                this.selectedItem = null;
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"onDropHeaderLeft");
        }
    }

    /**
    * Drop Event: drag from left Header Columns table and drop into right side header Columns and drop within the right side header columns 
    */
    onDropHeaderRight(event, row, col) {
        try {
            if (this.selectedItem.DISPLAY_NAME == "") {
                return;
            }
            var newindex: any;
            if (this.selectedItem) {
                var draggedItem = this.lstPrintRepHeaderColumnsLeft.filter(x => (x.DISPLAY_NAME + '-' + x.HColumn) == (this.selectedItem.DISPLAY_NAME + '-' + this.selectedItem.HColumn)) && (this.lstPrintRepHeaderColumnsRight.filter(x => (x.DISPLAY_NAME + '-' + x.HColumn) == (this.selectedItem.DISPLAY_NAME + '-' + this.selectedItem.HColumn)));
                if (draggedItem.length == 0) {
                    if (draggedItem.length == 0) {
                        let droppedItem: any;
                        droppedItem = this.lstPrintRepHeaderColumnsRight.filter(x => (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col));
                        var index = this.findIndex(this.selectedItem, this.lstPrintRepHeaderColumnsLeft, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                        if (droppedItem.length > 0) {
                            newindex = this.findIndex((droppedItem), this.lstPrintRepHeaderColumnsRight, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                            this.lstPrintRepHeaderColumnsLeft[index] = droppedItem[0];
                        }
                        else {
                            this.lstPrintRepHeaderColumnsLeft[index] = "";
                        }

                        this.lstPrintRepHeaderColumnsLeft[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                        this.lstPrintRepHeaderColumnsLeft[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                        this.lstPrintRepHeaderColumnsRight[newindex] = this.selectedItem;
                        this.lstPrintRepHeaderColumnsRight[newindex].ROW_POSITION = row;
                        this.lstPrintRepHeaderColumnsRight[newindex].COLUMN_POSITION = col;
                    }
                }
                else {
                    var droppedItem = this.lstPrintRepHeaderColumnsRight.filter(x => (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col));
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepHeaderColumnsRight, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepHeaderColumnsRight, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepHeaderColumnsRight[index] = droppedItem[0];
                    }
                    else {

                        this.lstPrintRepHeaderColumnsLeft[index] = "";
                    }

                    this.lstPrintRepHeaderColumnsRight[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepHeaderColumnsRight[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepHeaderColumnsRight[newindex] = this.selectedItem;
                    this.lstPrintRepHeaderColumnsRight[newindex].ROW_POSITION = row;
                    this.lstPrintRepHeaderColumnsRight[newindex].COLUMN_POSITION = col;
                }
                this.selectedItem = null;
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"onDropHeaderRight");
        }
    }

    /**
    * Drop Event: drag from right Details Columns table and drop into left side Details Columns and drop within the left side details columns 
    */
    onDropDetailsLeft(event, row, col) {
        try {
            if (this.selectedItem.DISPLAY_NAME == "") {
                return;
            }
            var newindex: any;
            if (this.selectedItem) {
                var draggedItem = this.lstPrintRepDetailColumnsMain.filter(x => (x.DISPLAY_NAME) == (this.selectedItem.DISPLAY_NAME));
                if (draggedItem.length == 0) {
                    var droppedItem = this.lstPrintRepDetailColumnsMain.filter(x => (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col));
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepDetailColumnsRight, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepDetailColumnsMain, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepDetailColumnsRight[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepDetailColumnsMain[index] = "";
                    }

                    this.lstPrintRepDetailColumnsRight[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepDetailColumnsRight[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepDetailColumnsMain[newindex] = this.selectedItem;
                    this.lstPrintRepDetailColumnsMain[newindex].ROW_POSITION = row;
                    this.lstPrintRepDetailColumnsMain[newindex].COLUMN_POSITION = col;


                }
                else {
                    var droppedItem = this.lstPrintRepDetailColumnsMain.filter(x => (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col));
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepDetailColumnsMain, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepDetailColumnsMain, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepDetailColumnsMain[index] = droppedItem[0];
                    }
                    else {

                        this.lstPrintRepDetailColumnsMain[index] = "";
                    }

                    this.lstPrintRepDetailColumnsMain[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepDetailColumnsMain[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepDetailColumnsMain[newindex] = this.selectedItem;
                    this.lstPrintRepDetailColumnsMain[newindex].ROW_POSITION = row;
                    this.lstPrintRepDetailColumnsMain[newindex].COLUMN_POSITION = col;
                }
                this.selectedItem = null;
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"onDropDetailsLeft");
        }
    }

    /**
    * Drop Event: drag from left Details Columns table and drop into right side details Columns and drop within the right side Details columns 
    */
    onDropDetailsRight(event, row, col) {
        try {
            if (this.selectedItem.DISPLAY_NAME == "") {
                return;
            }
            var newindex: any;
            if (this.selectedItem) {
                var draggedItem = this.lstPrintRepDetailColumnsMain.filter(x => (x.DISPLAY_NAME) == (this.selectedItem.DISPLAY_NAME)) && (this.lstPrintRepDetailColumnsRight.filter(x => (x.DISPLAY_NAME) == (this.selectedItem.DISPLAY_NAME)));
                var draggedItem1 = this.lstPrintRepDetailColumnsRight.filter(x => (x.DISPLAY_NAME) == (this.selectedItem.DISPLAY_NAME));
                if (draggedItem.length == 0) {
                    var droppedItem = this.lstPrintRepDetailColumnsRight.filter(x => (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col));
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepDetailColumnsMain, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepDetailColumnsRight, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepDetailColumnsMain[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepDetailColumnsRight[index] = "";
                    }

                    this.lstPrintRepDetailColumnsMain[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepDetailColumnsMain[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepDetailColumnsRight[newindex] = this.selectedItem;
                    this.lstPrintRepDetailColumnsRight[newindex].ROW_POSITION = row;
                    this.lstPrintRepDetailColumnsRight[newindex].COLUMN_POSITION = col;

                } else {
                    var droppedItem = this.lstPrintRepDetailColumnsRight.filter(x => (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col));
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepDetailColumnsRight, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepDetailColumnsRight, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepDetailColumnsRight[index] = droppedItem[0];
                    }
                    else {

                        this.lstPrintRepDetailColumnsRight[index] = "";
                    }

                    this.lstPrintRepDetailColumnsRight[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepDetailColumnsRight[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepDetailColumnsRight[newindex] = this.selectedItem;
                    this.lstPrintRepDetailColumnsRight[newindex].ROW_POSITION = row;
                    this.lstPrintRepDetailColumnsRight[newindex].COLUMN_POSITION = col;
                }
                this.selectedItem = null;
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"onDropDetailsRight");
        }
    }

    /**
     * Drag end event
     */
    dragEnd(event) {
        this.selectedItem = null;
    }

    /**
     * Finding index of a list item based on row, col position
     */
    findIndex(list: any, list1: any, row, col) {
        try {
            let index = -1;
            let name: string;
            for (let i = 0; i < list1.length; i++) {
                if ((list1[i].ROW_POSITION == row) && (list1[i].COLUMN_POSITION == col)) {
                    this.newIndexValue = list1[i];
                    index = i;
                    break;
                }
            }
            return index;
        }
        catch (ex) {
            this.displayCatchException(ex,"findIndex");
        }
    }

    /**
    Function for binding data to right side Header Columns table
    */
    getRowCalHeader(row, col) {
        try {
            var listrowcol = this.lstPrintRepHeaderColumnsRight.filter(x => x.ROW_POSITION == row && x.COLUMN_POSITION == col);
            if (listrowcol != null && listrowcol.length > 0) {
                if (listrowcol[0].DISPLAY_NAME == null || listrowcol[0].DISPLAY_NAME == "" || listrowcol[0].DISPLAY_NAME == undefined) {
                    return '';
                }
                if (listrowcol[0].DISPLAY_NAME != null || listrowcol[0].DISPLAY_NAME != "" || listrowcol[0].DISPLAY_NAME != undefined) {
                    return listrowcol[0].DISPLAY_NAME + '-' + listrowcol[0].HColumn;
                }
            }
            else {
                this.lstPrintRepHeaderColumnsRight.push({
                    APP_ID: "",
                    OBJECT_ID: "",
                    LINE_NO: "",
                    FIELD_NAME: "",
                    FIELD_TYPE: "",
                    TEXT_VALUE: "",
                    FIELD_GROUP: "",
                    ROW_POSITION: row,
                    COLUMN_POSITION: col,
                    DISPLAY_NAME: "",
                    VISIBLE: "",
                    FIELD_SIZE: "",
                    ALIGNMENT: "",
                    HColumn: "",
                    HEADERFONT: "",
                    VALUEFONT: "",
                    SECTION: ""
                });
                return '';
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"getRowCalHeader");
        }
    }


    /**
   Function for returning true or false value for checking if product is point of use
    */
    isDraggableCheck(row, col, list) {
        try {
            let item = list.filter(x => x.ROW_POSITION == row && x.COLUMN_POSITION == col);
            if (this.product == EnumApps.PointOfUse) {
                if (item != undefined && item.length > 0) {
                    let fieldName = item[0].FIELD_NAME;
                    if (fieldName == "PHYSICIAN_NAME" || fieldName == "PROCEDURE_CODE" || fieldName == "PREF_LIST_ID") {
                        return false;
                    }
                    else {
                        if (item.length > 0) {
                            if (item[0].DISPLAY_NAME == null || item[0].DISPLAY_NAME == "" || item[0].DISPLAY_NAME == undefined) {
                                return false;
                            }
                            if (item[0].DISPLAY_NAME != null || item[0].DISPLAY_NAME != "" || item[0].DISPLAY_NAME != undefined) {
                                return true;
                            }
                        }
                    }
                }
                else {
                    return true;
                }
            }
            else {
                if (item.length > 0) {
                    if (item[0].DISPLAY_NAME == null || item[0].DISPLAY_NAME == "" || item[0].DISPLAY_NAME == undefined) {
                        return false;
                    }
                    if (item[0].DISPLAY_NAME != null || item[0].DISPLAY_NAME != "" || item[0].DISPLAY_NAME != undefined) {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"isDraggableCheck");
        }
    }

    /**
    Function for binding data to right side Details Columns table
     */
    getRowCalDetails(row, col) {
        try {
            var listrowcol = this.lstPrintRepDetailColumnsRight.filter(x => x.ROW_POSITION == row && x.COLUMN_POSITION == col);
            if (listrowcol != null && listrowcol.length > 0) {
                return listrowcol[0].DISPLAY_NAME;
            }
            else {
                this.lstPrintRepDetailColumnsRight.push({
                    APP_ID: "",
                    OBJECT_ID: "",
                    LINE_NO: "",
                    FIELD_NAME: "",
                    FIELD_TYPE: "",
                    TEXT_VALUE: "",
                    FIELD_GROUP: "",
                    ROW_POSITION: row,
                    COLUMN_POSITION: col,
                    DISPLAY_NAME: "",
                    VISIBLE: "",
                    FIELD_SIZE: "",
                    ALIGNMENT: "",
                    Hcolumn: "",
                    HEADERFONT: "",
                    VALUEFONT: "",
                    SECTION: ""
                });
                return '';
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"getRowCalDetails");
        }
    }

    /**
    Function for binding data to left side Header Columns table
     */
    bindHeaderRows(item: number, col) {
        try {
            var fieldName = this.lstPrintRepHeaderColumnsLeft[item].FIELD_NAME;
            var lineNo = this.lstPrintRepHeaderColumnsLeft[item].LINE_NO;
            var displayName = this.lstPrintRepHeaderColumnsLeft[item].DISPLAY_NAME;
            var HColumn = this.lstPrintRepHeaderColumnsLeft[item].HColumn;// "{Header}";
            var txtValue = this.lstPrintRepHeaderColumnsLeft[item].TEXT_VALUE;
            var section = this.lstPrintRepHeaderColumnsLeft[item].SECTION;
            let hColumnExsists = this.repColumnBinded(fieldName, lineNo, txtValue, "HEADER");
            if (hColumnExsists) {
                this.lstPrintRepHeaderColumnsLeft[item].ROW_POSITION = item;
                this.lstPrintRepHeaderColumnsLeft[item].COLUMN_POSITION = col;
                this.lstPrintRepHeaderColumnsLeft[item].HColumn = "";
                this.lstPrintRepHeaderColumnsLeft[item].OBJECT_ID = "";
                this.lstPrintRepHeaderColumnsLeft[item].LINE_NO = lineNo;
                this.lstPrintRepHeaderColumnsLeft[item].APP_ID = "";
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_NAME = fieldName;
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_TYPE = "";
                this.lstPrintRepHeaderColumnsLeft[item].TEXT_VALUE = txtValue;
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_GROUP = "";
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_SIZE = "";
                this.lstPrintRepHeaderColumnsLeft[item].VISIBLE = "";
                this.lstPrintRepHeaderColumnsLeft[item].DISPLAY_NAME = "";
                this.lstPrintRepHeaderColumnsLeft[item].ALIGNMENT = "";
                this.lstPrintRepHeaderColumnsLeft[item].HEADERFONT = "";
                this.lstPrintRepHeaderColumnsLeft[item].VALUEFONT = "";
                this.lstPrintRepHeaderColumnsLeft[item].SECTION = section;
                return '';
            }
            else {
                this.lstPrintRepHeaderColumnsLeft[item].ROW_POSITION = item;
                this.lstPrintRepHeaderColumnsLeft[item].COLUMN_POSITION = col;
                this.lstPrintRepHeaderColumnsLeft[item].HColumn = HColumn;
                this.lstPrintRepHeaderColumnsLeft[item].OBJECT_ID = "";
                this.lstPrintRepHeaderColumnsLeft[item].LINE_NO = lineNo;
                this.lstPrintRepHeaderColumnsLeft[item].APP_ID = "";
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_NAME = fieldName;
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_TYPE = "";
                this.lstPrintRepHeaderColumnsLeft[item].TEXT_VALUE = txtValue;
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_GROUP = "";
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_SIZE = "";
                this.lstPrintRepHeaderColumnsLeft[item].VISIBLE = "";
                this.lstPrintRepHeaderColumnsLeft[item].DISPLAY_NAME = displayName;
                this.lstPrintRepHeaderColumnsLeft[item].ALIGNMENT = "";
                this.lstPrintRepHeaderColumnsLeft[item].HEADERFONT = "";
                this.lstPrintRepHeaderColumnsLeft[item].VALUEFONT = "";
                this.lstPrintRepHeaderColumnsLeft[item].SECTION = section;

                if (displayName == "") { return ''; }
                else {
                    return displayName + "-" + HColumn;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"bindHeaderRows");
        }
    }

    /**
    Function for binding data to left side Details Columns table
     */
    bindDetailsRows(item: number, col) {
        try {
            let x = item;
            var fieldName = this.lstPrintRepDetailColumnsMain[x].FIELD_NAME;
            var lineNo = this.lstPrintRepDetailColumnsMain[x].LINE_NO;
            var displayName = this.lstPrintRepDetailColumnsMain[x].DISPLAY_NAME;
            let hColumnExsists = this.repColumnDeatilsBinded(fieldName, lineNo, "VALUE", "DETAILS");
            if (hColumnExsists) {
                this.lstPrintRepDetailColumnsMain[x].ROW_POSITION = item + 1;
                this.lstPrintRepDetailColumnsMain[x].COLUMN_POSITION = col;
                this.lstPrintRepDetailColumnsMain[x].OBJECT_ID = "";
                this.lstPrintRepDetailColumnsMain[x].LINE_NO = "";
                this.lstPrintRepDetailColumnsMain[x].APP_ID = "";
                this.lstPrintRepDetailColumnsMain[x].FIELD_NAME = "";
                this.lstPrintRepDetailColumnsMain[x].FIELD_TYPE = "";
                this.lstPrintRepDetailColumnsMain[x].TEXT_VALUE = "";
                this.lstPrintRepDetailColumnsMain[x].FIELD_GROUP = "";
                this.lstPrintRepDetailColumnsMain[x].FIELD_SIZE = "";
                this.lstPrintRepDetailColumnsMain[x].VISIBLE = "";
                this.lstPrintRepDetailColumnsMain[x].DISPLAY_NAME = "";
                this.lstPrintRepDetailColumnsMain[x].ALIGNMENT = "";
                this.lstPrintRepDetailColumnsMain[x].HEADERFONT = "";
                this.lstPrintRepDetailColumnsMain[x].VALUEFONT = "";
                this.lstPrintRepDetailColumnsMain[x].SECTION = "";
                this.lstPrintRepDetailColumnsMain[x].HColumn = "";
                return '';
            }
            else {
                this.lstPrintRepDetailColumnsMain[x].ROW_POSITION = item + 1;
                this.lstPrintRepDetailColumnsMain[x].COLUMN_POSITION = col;
                this.lstPrintRepDetailColumnsMain[x].HEADERFONT = "";
                this.lstPrintRepDetailColumnsMain[x].VALUEFONT = "";
                return displayName;
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"bindDetailsRows");
        }
    }

    /**
    Function for filtering data from  right side header Columns table based on fieldname,lineno,textvalue,section
    section:'HEADER'
    TextValue:'TEXT'or 'VALUE'
    lineNo:21
    filedName:END_DT_TIME
     */
    repColumnBinded(fieldName, lineNo, TextValue, Section) {
        try {
            var listrowcol = this.lstPrintRepHeaderColumnsRight.filter(x => x.FIELD_NAME == fieldName && x.TEXT_VALUE == TextValue && x.LINE_NO == lineNo && x.SECTION == Section);
            if (listrowcol != null && listrowcol.length > 0) {
                return true;
            } else {
                return false;
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"repColumnBinded");
        }
    }

    /**
    Function for filtering data from  right side Details Columns table based on fieldname,lineno,textvalue,section
    section:'DEATILS'
    TextValue:'TEXT'or 'VALUE'
    lineNo:21
    filedName:OpenQuantity
    */
    repColumnDeatilsBinded(fieldName, lineNo, TextValue, Section) {
        try {
            var listrowcol = this.lstPrintRepDetailColumnsRight.filter(x => x.FIELD_NAME == fieldName && x.TEXT_VALUE == TextValue && x.LINE_NO == lineNo && x.SECTION == Section);
            if (listrowcol != null && listrowcol.length > 0) {
                return true;
            } else {
                return false;
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"repColumnDeatilsBinded");
        }
    }

    /**
    Function for Save Print details to database
     */
    async saveDesign() {
        try {
            this.spinnerService.start();
            if (this.headerFont == null || this.headerFont == "" || this.headerFont == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Header Font' });
                this.spinnerService.stop();
                return;
            }
            if (this.columnFont == null || this.columnFont == "" || this.columnFont == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Value Font' });
                this.spinnerService.stop();
                return;
            }
            this.lstPrintSavedRepdetails = [];
            //list3 and list4 need to save

            //inserting Header column data to Main List
            for (let x = 0; x < this.lstPrintRepHeaderColumnsRight.length; x++) {
                if (this.lstPrintRepHeaderColumnsRight[x].DISPLAY_NAME != "" && this.lstPrintRepHeaderColumnsRight[x].DISPLAY_NAME != null && this.lstPrintRepHeaderColumnsRight[x].DISPLAY_NAME != "-") {
                    this.lstPrintSavedRepdetails.push(this.lstPrintRepHeaderColumnsRight[x]);
                    var index = this.findIndexSave((this.lstPrintRepHeaderColumnsRight[x]), this.lstPrintRepHeaderColumnsRight[x].DISPLAY_NAME + '-' + this.lstPrintRepHeaderColumnsRight[x].HColumn, this.lstPrintSavedRepdetails);
                    this.lstPrintRepHeaderColumnsRight[index].HEADERFONT = this.headerFont;
                    this.lstPrintRepHeaderColumnsRight[index].VALUEFONT = this.columnFont;
                }
            }
            //inserting detals Column data to Main List
            for (let x = 0; x < this.lstPrintRepDetailColumnsRight.length; x++) {
                if (this.lstPrintRepDetailColumnsRight[x].DISPLAY_NAME != "" && this.lstPrintRepDetailColumnsRight[x].DISPLAY_NAME != null && this.lstPrintRepDetailColumnsRight[x].DISPLAY_NAME != "-") {
                    this.lstPrintSavedRepdetails.push(this.lstPrintRepDetailColumnsRight[x]);
                    var index = this.findIndexSave((this.lstPrintRepDetailColumnsRight[x]), this.lstPrintRepDetailColumnsRight[x].DISPLAY_NAME + '-' + this.lstPrintRepDetailColumnsRight[x].HColumn, this.lstPrintSavedRepdetails);
                    this.lstPrintSavedRepdetails[index].HEADERFONT = this.headerFont;
                    this.lstPrintSavedRepdetails[index].VALUEFONT = this.columnFont;
                    this.lstPrintSavedRepdetails[index].TEXT_VALUE = "VALUE";
                }
            }
            // MainList Contains both header data and Column data

            //Saving data to database

            if ((this.headerFontName != null || this.headerFontName != '' || this.headerFontName != undefined) && (this.valueFontName != null || this.valueFontName != '' || this.valueFontName != undefined)) {
                await this.printScreenService.saveDynamicPrintReport(this.product, this.report, this.printerValue, this.report, this.lstPrintSavedRepdetails).subscribe(res => {
                    this.growlMessage = [];
                    switch (res.StatType) {
                        case StatusType.Success:
                            {
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                    this.showDiv = false;
                    this.lstPrintRepValueFont = [];
                    this.lstPrintRepHeaderFont = [];
                    this.lstPrintRepHeaderColumnsRight = [];
                    this.lstPrintRepDetailColumnsRight = [];
                    this.lstPrintRepDetailColumnsMain = [];
                    this.lstPrintRepHeaderColumnsMain = [];
                    this.lstPrintRepHeaderColumnsLeft = [];
                    this.lstPrintSavedRepdetails = [];
                    this.spinnerService.stop();
                });

            }
        }
        catch (ex) {
            this.displayCatchException(ex,"saveDesign");
        }
    }

    /**
     * Finding index of a list item based on list when saving updating headerfont and value font )
     */
    findIndexSave(list: any, name: string, list1: any) {
        try {
            let index = -1;
            let name1: string;
            for (let i = 0; i < list1.length; i++) {
                let namelist = list1[i].DISPLAY_NAME + '-' + list1[i].HColumn;
                if (name === namelist) {
                    index = i;
                    break;
                }
            }
            return index;
        }
        catch (ex) {
            this.displayCatchException(ex,"findIndexSave");
        }
    }

    /**
    Function for Clear Data When Reset Button Click
    */
    reset() {
        try {
            this.product = '';
            this.printer = '';
            this.report = '';
            this.showDiv = false;
            this.lstPrintRepValueFont = [];
            this.lstPrintRepHeaderFont = [];
            this.lstPrintRepHeaderColumnsRight = [];
            this.lstPrintRepDetailColumnsRight = [];
            this.lstPrintRepDetailColumnsMain = [];
            this.lstPrintRepHeaderColumnsMain = [];
            this.lstPrintRepHeaderColumnsLeft = [];
            this.lstPrintSavedRepdetails = [];
            this.headerFont = '';
            this.columnFont = '';
        }
        catch (ex) {
            this.displayCatchException(ex,"reset");
        }
    }

    bindValueRows(item) {
        try {
            var fieldName = item.FIELD_NAME;
            var lineNo = item.LINE_NO;
            var displayName = item.DISPLAY_NAME;

            let hColumnExsists = this.repColumnBinded(fieldName, lineNo, "VALUE", "HEADER");
            if (hColumnExsists) {
                return '-';
            } else {
                return displayName + "-" + "{Value}";
            }
        }
        catch (ex) {
            this.displayCatchException(ex,"bindValueRows");
        }
    }

    nOfColumns: number;
    nOfRows: number;
    row: any;
    async bindSavedDataToHtmlTables() {
        this.HdrRows = parseInt(this.headerRows);
        this.HdrCells = parseInt(this.headerColumns);
        this.DetailCells = parseInt(this.detailColumns);


        this.nOfColumns = (this.HdrCells, 10);
        this.nOfRows = (this.HdrRows, 10);
    }


    /**
     * This method is for displaying catch block error messages 
     * @param event
     */
    displayCatchException(ex, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }

    /**
     * Destroy all data in this page when redirect
     */
    ngOnDestroy() {
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.product = '';
        this.printer = '';
        this.report = '';
        this.showDiv = false;
        this.lstPrintRepValueFont = [];
        this.lstPrintRepHeaderFont = [];
        this.lstPrintRepHeaderColumnsRight = [];
        this.lstPrintRepDetailColumnsRight = [];
        this.lstPrintRepDetailColumnsMain = [];
        this.lstPrintRepHeaderColumnsMain = [];
        this.lstPrintRepHeaderColumnsLeft = [];
        this.lstPrintSavedRepdetails = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.headerFont = '';
        this.columnFont = '';
    }
}

