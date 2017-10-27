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
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { ItemExceptionReportService } from './cyct-item-exception-report.service';
import { saveAs } from 'file-saver';
import { VM_GETCYCLEEXCEPTIONREPORTDATA } from '../entities/vm_getcycleexceptionreportdata';



declare var module: {
    id: string;
}

@Component({
    templateUrl: 'cyct-item-exception-report.component.html',
    providers: [AtParCommonService, AtParConstants, ItemExceptionReportService],
})

export class ItemExceptionReportComponent {
    @Input() appId: string;
    intAppId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    breadCrumbMenu: Menus;


    defDuration: number = 0;
    statusCode: number = -1;
    toMailAddr: string;
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    showGrid: boolean = false;
    isMailDialog: boolean = false;


    fromDate: Date;
    toDate: Date = new Date();
    strFromDate: string;
    strToDate: string;
    strUserID: string;
    orgGroupId: string;
    itemID: string;
    eventID: string;
    businessUnit: string;
    showOrgDropdown: boolean;
    selectedOrgGroupID: string;
    statusType: any;

    lstOrgGroupIds: SelectItem[] = [];
    lstBusinessUnits: SelectItem[] = [];
    lstExceptionDetails: VM_GETCYCLEEXCEPTIONREPORTDATA[] = [];
    lstChildExcpDetails: VM_GETCYCLEEXCEPTIONREPORTDATA[] = [];



    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private itemExceptionReportService: ItemExceptionReportService
    ) {
        this.breadCrumbMenu = new Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

    }

    async ngOnInit() {

        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        this.spinnerService.start();
        this.statusType=''
        await this.getMyPreferences();
        if (this.statusType != StatusType.Success) {
            return;
        }
        await this.bindOrgGroups();
        if (!this.showOrgDropdown) {
            await this.populateBUnitDropDown();
        }


        this.spinnerService.stop();
    }

    async getMyPreferences() {
        try {
            await this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then((result: Response) => {
                this.spinnerService.stop();
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.statusType = res.StatType;
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

    async bindOrgGroups() {
        try {
            await this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.lstOrgGroupIds = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            if (res.DataList.length == 1) {
                                this.showOrgDropdown = false;
                                this.orgGroupId = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                this.selectedOrgGroupID = res.DataList[0].ORG_GROUP_ID;
                            } else {
                                this.showOrgDropdown = true;
                                this.lstBusinessUnits = [];
                                this.lstBusinessUnits.push({ label: 'Select BUnit', value: 'Select BUnit' });
                                this.lstOrgGroupIds.push({ label: 'Select One', value: 'Select One' });
                                this.selectedOrgGroupID = 'Select One';
                                for (var i = 0; i < res.DataList.length; i++) {
                                    if (res.DataList[i].ORG_GROUP_ID.toUpperCase() != 'ALL') {
                                        this.lstOrgGroupIds.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID })
                                    }
                                }
                            }

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
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async populateBUnitDropDown() {
        try {
            await this.atParCommonService.getBusinessUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], BusinessType.Inventory.toString())
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.lstBusinessUnits = [];
                    this.lstBusinessUnits.push({ label: 'Select BUnit', value: 'Select BUnit' });
                    switch (res.StatType) {
                        case StatusType.Success: {
                            for (var i in res.DataList) {
                                this.lstBusinessUnits.push({ label: res.DataList[i], value: res.DataList[i] });
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            if (res.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                            } else {
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
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBUnitDropDown");
        }
    }

    async ddlOrgGroup_SelectedIndexChanged() {
        this.selectedOrgGroupID = this.orgGroupId;
        this.lstBusinessUnits = [];
        this.lstBusinessUnits.push({ label: 'Select BUnit', value: 'Select BUnit' });
        this.businessUnit = 'Select BUnit';
        try {
            if (this.orgGroupId != 'Select One') {

                await this.atParCommonService.getOrgGroupBUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedOrgGroupID, BusinessType[BusinessType.Inventory.toString()])
                    .catch(this.httpService.handleError).then((result: Response) => {
                        let res = result.json() as AtParWebApiResponse<any>;
                        this.growlMessage = [];                      
                        switch (res.StatType) {
                            case StatusType.Success: {
                                for (var i in res.DataList) {
                                    this.lstBusinessUnits.push({ label: res.DataList[i], value: res.DataList[i] });
                                }

                                break;
                            }
                            case StatusType.Warn: {
                                this.spinnerService.stop();
                                if (res.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No assigned org business units" });
                                    break;
                                }
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
                    });


            } else {
                this.businessUnit = 'All';
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGroup_SelectedIndexChanged");
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];
            this.showGrid = false;
            if (this.selectedOrgGroupID == 'Select One' || this.selectedOrgGroupID == undefined || this.selectedOrgGroupID == null) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
            }
            else if (this.lstBusinessUnits.length <= 1) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No assigned org business units" });
            }
            else if (this.fromDate > this.toDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To date must be greater than From date" });
            }
            else {

                if (this.businessUnit == 'Select BUnit' || this.businessUnit == undefined) {
                    this.businessUnit = 'All';
                }
                if (this.itemID == undefined) {
                    this.itemID = ''
                }
                if (this.eventID == undefined) {
                    this.eventID = ''
                }
                this.strFromDate = this.getDateString(this.fromDate);
                this.strToDate = this.getDateString(this.toDate);
                this.spinnerService.start();
                await this.itemExceptionReportService.getCycleExceptionReport(this.businessUnit, this.itemID, this.eventID, this.strFromDate, this.strToDate, this.selectedOrgGroupID).catch(this.httpService.handleError).then((result: Response) => {
                    this.spinnerService.stop();
                    let res = result.json() as AtParWebApiResponse<any>;
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.lstExceptionDetails = res.DataDictionary['dsExpRep']['Table1'];
                            if (this.lstExceptionDetails.length == 0) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                break;
                            }
                            this.showGrid = true;
                            this.lstChildExcpDetails = res.DataDictionary['dsExpRep']['Table2'];
                            for (var j = 0; j < this.lstChildExcpDetails.length; j++) {
                                this.lstChildExcpDetails[j].COUNT_DATE1 = this.formatDate(this.lstChildExcpDetails[j].COUNT_DATE.toString());
                            }

                            for (var i = 0; i < this.lstExceptionDetails.length; i++) {
                                var list = this.lstChildExcpDetails.filter(x => x.LOCATION.trim() == this.lstExceptionDetails[i].LOCATION.trim() && x.EVENT_ID.trim() == this.lstExceptionDetails[i].EVENT_ID.trim() && x.ITEM_ID.trim() == this.lstExceptionDetails[i].ITEM_ID.trim());
                                this.lstExceptionDetails[i].SUB_ITEMS = list;
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


            }
        }


        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');
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
                saveAs(blob, "CycleCountItemExceptionReport.xls");
            }
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
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {

                //var mywindow = window.open('', 'PRINT', 'height=600,width=600');
                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Cycle Count Item Exception Report' + '</title>');
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

            this.isMailDialog = false;

            if (html != '' && html != null) {
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Cycle Count Item Exception Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
                    if (data.StatType != StatusType.Success) {
                        htmlBuilder = '';
                        return htmlBuilder;
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



            //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';

            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';


            let title: string = '""' + "AtparVersion2.4.4" + '""';

            htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>"

            if (reqType == 'Print') {

                htmlBuilder += "<TR width='100%'><td  align=left  width='15%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cycle Count Item Exception Report between " + this.strFromDate + " and " + this.strToDate + " </b></span></td><td align=right valign=top>&nbsp;"
                htmlBuilder += "<A  href=" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"

            } else {

                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Cycle Count Item Exception Report between " + this.strFromDate + " and " + this.strToDate + " </b></span></td><td align=right valign=top>&nbsp;"

            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> "
            htmlBuilder += "<table align=center width=100% style=" + "BORDER-COLLAPSE:collapse" + " border=1>"
            htmlBuilder += "<tr bgcolor=#d3d3d3>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>BUnit</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Event ID</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Parent Event ID</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Item ID</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Custom Item NO</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Item Description</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Location</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Count Date</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>System Qty</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Count Qty</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Count %</b></span></td>"
            htmlBuilder += "</tr>"

            for (var i = 0; i < this.lstExceptionDetails.length; i++) {
                if (this.lstExceptionDetails[i].SUB_ITEMS.length != 0) {
                    for (var j = 0; j < this.lstExceptionDetails[i].SUB_ITEMS.length; j++) {
                        htmlBuilder += "<tr>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].BUSINESS_UNIT + "</span></td>"
                        if (this.lstExceptionDetails[i].EVENT_ID == null) {
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].EVENT_ID + "</span></td>"
                        } else {
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstExceptionDetails[i].EVENT_ID + "</span></td>"
                        }
                        if (this.lstExceptionDetails[i].PARENT_EVENT_ID == null) {
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].PARENT_EVENT_ID + "</span></td>"
                        } else {
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstExceptionDetails[i].PARENT_EVENT_ID + "</span></td>"
                        }
                        if (this.lstExceptionDetails[i].ITEM_ID == null) {
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].ITEM_ID + "</span></td>"
                        } else {
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstExceptionDetails[i].ITEM_ID + "</span></td>"
                        }
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].REPORT_DATA_15 + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].ITEM_DESC + "</span></td>"
                        if (this.lstExceptionDetails[i].LOCATION == null) {
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstExceptionDetails[i].LOCATION + "</span></td>"
                        } else {
                            htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstExceptionDetails[i].LOCATION + "</span></td>"
                        }
                        htmlBuilder += "<td align=left nowrap><span class=c3> &nbsp;" + this.lstExceptionDetails[i].SUB_ITEMS[j].COUNT_DATE1 +
                            "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstExceptionDetails[i].SUB_ITEMS[j].SYS_QTY + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstExceptionDetails[i].SUB_ITEMS[j].COUNT_QTY + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstExceptionDetails[i].SUB_ITEMS[j].COUNT_PERCENT +
                            "</span></td>"

                    }
                }
            }

            htmlBuilder += "</table></Table>"

            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            this.clientErrorMsg(ex, 'exportReportDetails');
        }
    }

    getDateString(MyDate: Date) {
        var MyDateString = ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + ('0' + MyDate.getDate()).slice(-2) + '/' + MyDate.getFullYear();
        return MyDateString
    }  

    formatDate(dateVal) {
        var newDate = new Date(dateVal);

        var sMonth = this.padValue(newDate.getMonth() + 1);
        var sDay = this.padValue(newDate.getDate());
        var sYear = newDate.getFullYear();
        var sHour = newDate.getHours();
        var sMinute = this.padValue(newDate.getMinutes());
        var seconds = this.padValue(newDate.getSeconds());
        var sAMPM = "AM";

        var iHourCheck = sHour;

        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
            sHour = 12;
        }

        sHour = this.padValue(sHour);

        return sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + ":" + seconds + " " + sAMPM;
    }

    padValue(value) {
        return (value < 10) ? "0" + value : value;
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
        this.lstBusinessUnits = [];
        this.lstChildExcpDetails = [];
        this.lstExceptionDetails = [];
        this.lstOrgGroupIds = [];
    }

}