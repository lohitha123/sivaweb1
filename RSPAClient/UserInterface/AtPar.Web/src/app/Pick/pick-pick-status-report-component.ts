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
import { PickStatusReportService } from '../Pick/pick-pick-status-report-component.service';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { saveAs } from 'file-saver';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pick-pick-status-report-component.html',
    providers: [AtParCommonService, AtParConstants, PickStatusReportService],
})

export class PickStatusReportComponent {
    @Input() appId: string;
    intAppId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    breadCrumbMenu: Menus;
    defDateRange: number = 0;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
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
    fromDateforDisplay: any;
    toDateforDisplay: any;
    orgGroupId: string;
    location: string;
    order: string;
    batch: string;
    businessUnit: string;
    showOrgDropdown: boolean;
    lstOrgGroupIds: SelectItem[] = [];
    lstBUnits: any[] = [];
    lstFilterBUnits: any[] = [];
    lstStatus: SelectItem[] = [];
    lstPickStatus: any[] = [];
    status: string;
    lstDBData: any[] = [];


    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private pickStatusReportService: PickStatusReportService

    ) {
        this.breadCrumbMenu = new Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

    }

    async ngOnInit() {

        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        this.lstStatus.push({ label: 'All', value: 'All' }, { label: 'Open', value: 'Open' }, { label: 'Picked(Sent)', value: 'Picked(Sent)' }, { label: 'Downloaded', value: 'Downloaded' });
        this.status = 'All';


        this.spinnerService.start();

        this.statusCode = await this.getDefDateRange();

        await this.getMyPreferences();

        await this.bindOrgGroups();

        // _StatusCode = populateUsersList()

        if (!this.showOrgDropdown) {
            await this.populateBUnitDropDown();
        }

        this.fromDate = new Date();
        this.fromDate = await this.addDays(this.fromDate, this.defDateRange);
        this.toDate = new Date();

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

                            } else {
                                this.showOrgDropdown = true;
                                this.lstOrgGroupIds.push({ label: 'Select One', value: '' });
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
        let orggrpid: string;
        orggrpid = this.orgGroupId.split("-")[0].trim();
        try {
            await this.atParCommonService.getOrgBusinessUnits(orggrpid, BusinessType.Inventory).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstBUnits = res.DataList;
                        console.log(this.lstBUnits);
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
            this.clientErrorMsg(ex, 'populateBUnitDropDown');
        }
    }

    async ddlOrgGroup_SelectedIndexChanged() {
        if (this.orgGroupId != '') {
            await this.populateBUnitDropDown();
        }
    }

    async filterBUnits(event) {
        // await this.populateBUnitDropDown();
        let query = event.query.toUpperCase();
        this.lstFilterBUnits = [];
        var tempList = [];
        try {
            if (this.orgGroupId != 'Select One' && this.orgGroupId != '' && this.orgGroupId != null) {
                if (query == '%') {
                    tempList = this.lstBUnits;
                }
                else {
                    tempList = this.lstBUnits.filter(x => (x.startsWith(query) ||
                        x.endsWith(query) || x == query));
                }
                for (var i = 0; i < tempList.length; i++) {
                    this.lstFilterBUnits.push({ BUnit: tempList[i] });
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'filterProcedures');
        }
    }

    async btnGo_Click() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            this.showGrid = false;
            if (this.showOrgDropdown == true) {
                if (this.orgGroupId == undefined) {
                    this.orgGroupId = "";
                }
                if (this.orgGroupId === "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Grp ID" });
                    this.spinnerService.stop();
                    return;
                }
            }
            if (this.businessUnit == undefined || this.businessUnit == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                this.spinnerService.stop();
                return;
            }
            if (this.businessUnit["BUnit"] == undefined) {
                if (this.businessUnit == undefined || this.businessUnit == '')
                {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                    this.spinnerService.stop();
                    return;
                }
            }
            var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
            var filterBunits: string[] = [];
            if (this.businessUnit["BUnit"] != undefined) {
                for (let i = 0; i < specialChars.length; i++) {
                    if (this.businessUnit["BUnit"].indexOf(specialChars[i]) > -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                        this.spinnerService.stop();
                        return;
                    }
                }
            }
            else if (this.businessUnit["BUnit"] == undefined)
            {
                for (let i = 0; i < specialChars.length; i++) {
                    if (this.businessUnit.indexOf(specialChars[i]) > -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                        this.spinnerService.stop();
                        return;
                    }
                }
                if (!(asEnumerable(this.lstBUnits).Contains(this.businessUnit.toUpperCase()))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                    this.spinnerService.stop();
                    return;
                }
                
            }

            if (this.location != undefined) {
                for (let i = 0; i < specialChars.length; i++) {
                    if (this.location.indexOf(specialChars[i]) > -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Data" });
                        this.spinnerService.stop();
                        return;
                    }
                }
            }
            if (this.order != undefined) {
                for (let i = 0; i < specialChars.length; i++) {
                    if (this.order.indexOf(specialChars[i]) > -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Data" });
                        this.spinnerService.stop();
                        return;
                    }
                }
            }
            if (this.batch != undefined) {
                for (let i = 0; i < specialChars.length; i++) {
                    if (this.batch.indexOf(specialChars[i]) > -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Data" });
                        this.spinnerService.stop();
                        return;
                    }
                }
            }
            
            

            var todayDate = new Date();
            if (this.toDate > todayDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date must be less than or equal to current date" });
                this.spinnerService.stop();
                return;
            }
            else if (this.fromDate > this.toDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                this.spinnerService.stop();
                return;
            }
            else {
            }
            let frmDate = this.convert(this.fromDate);
            let todate = this.convert(this.toDate);
            this.fromDateforDisplay = frmDate;
            this.toDateforDisplay = todate;


            let inXmlsb: string = '';
            inXmlsb += "<ROOT>";
            if (this.businessUnit["BUnit"] == undefined) {
                inXmlsb += "<BUSINESS_UNIT>" + this.businessUnit.trim().toUpperCase() + "</BUSINESS_UNIT>";
            }
            else {
                inXmlsb += "<BUSINESS_UNIT>" + this.businessUnit["BUnit"].trim().toUpperCase() + "</BUSINESS_UNIT>";
            }
            if (this.status == undefined) {
                this.status = "";
            }
            if (this.status != null || this.status !== "") {
                inXmlsb += "<STATUS>" + this.status.trim() + "</STATUS>";
            }

            if (this.batch != undefined) {
                inXmlsb += "<BATCHID>" + this.batch.trim() + "</BATCHID>";
            }

            if (this.order != undefined) {
                inXmlsb += "<ORDER>" + this.order.trim() + "</ORDER>";
            }

            if (this.location != undefined) {
                inXmlsb += "<DELIVERYLOCATION>"
                    + this.location.trim() + "</DELIVERYLOCATION>";
            }

            if (frmDate != null || frmDate !== "") {
                inXmlsb += "<FROMDATE>"
                    + frmDate + "</FROMDATE>";
            }

            if (todate != null || todate !== "") {
                inXmlsb += "<TODATE>"
                    + todate + "</TODATE>";
            }

            if (this.showOrgDropdown == false) {
                inXmlsb += "<ORGGROUPID>"
                    + this.orgGroupId.split("-")[0].trim() + "</ORGGROUPID>";
            }
            else {
                inXmlsb += "<ORGGROUPID>"
                    + this.orgGroupId + "</ORGGROUPID>";
            }

            inXmlsb += "</ROOT>";



            try {
                await this.pickStatusReportService.GetPickstatusReport(inXmlsb).
                    catch(this.httpService.handleError).then((res: Response) => {
                        this.spinnerService.stop();
                        let data = res.json() as AtParWebApiResponse<any>;
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.showGrid = true;
                                this.lstPickStatus = data.DataDictionary["outputParameters"]["Table1"];
                                if (this.status !== "All") {
                                    this.lstPickStatus = this.lstPickStatus.filter(x => x.Status.toUpperCase() === this.status.toUpperCase());
                                }
                                if (this.lstPickStatus.length == 0) {
                                    this.showGrid = false;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Plans Found" });
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                if (data.StatusCode = AtparStatusCodes.E_NORECORDFOUND) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Plans Found" });
                                    break;
                                }
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    })
            }
            catch (ex) {

            }



        }
        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');
        }
    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
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

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');

            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "pick_status_report.xls");
            }

            //if (html != '' && html != null) {
            //    var ua = window.navigator.userAgent;
            //    var msie = ua.indexOf("MSIE ");
            //    // If Internet Explorer
            //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            //        this.statusCode = -1;
            //        let folderName: string = '';
            //        await this.atParCommonService.exportToExcel(html, "Pickplan_StatusReport", "PickplanStatusReport")
            //            .then((res: Response) => {
            //                let data = res.json();
            //                this.statusCode = data.StatusCode;
            //                if (this.statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
            //                    folderName = data.DataVariable.toString();
            //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/PickplanStatusReport.xls';
            //                    var query = '?download';
            //                    window.open(filename + query);
            //                }
            //                else {
            //                    this.growlMessage = [];
            //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
            //                }
            //            });

            //        await this.atParCommonService.deleteExcel(folderName, "PickplanStatusReport")
            //            .then((res: Response) => {
            //            });
            //    } else {

            //        var a = document.createElement('a');
            //        var data_type = 'data:application/vnd.ms-excel';
            //        html = html.replace(/ /g, '%20');
            //        a.href = data_type + ', ' + html;
            //        a.download = 'PickplanStatusReport.xls';
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
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {

                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');

                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Pick - Pick Status Report' + '</title>');
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
                    return;
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
            this.isMailDialog = false;
            let toAddr: string = '';
            this.growlMessage = [];

            if (html != '' && html != null) {
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Pick Plan Status Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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

            // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
            this.isMailDialog = false;
            this.toMailAddr = '';
            //}

        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailClick');
        }
        finally {

            this.spinnerService.stop();
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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



            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';

            var ChartPath = this.httpService.BaseUrl + '/Uploaded/';


            // let title: string = '""' + "AtparVersion 2.8" + '""';

            htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
            if (reqType == "Print") {
                htmlBuilder += "<TR width='100%'><td  align=left  width='8%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pick Plan Status Report from " + this.fromDateforDisplay + " to " + this.toDateforDisplay + " </b></span></td><td align=right valign=top>&nbsp;"
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
            } else {
                htmlBuilder += "<TR width='100%'  height='27px'><td align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pick Plan Status Report from " + this.fromDateforDisplay + " to " + this.toDateforDisplay + " </b></span></td><td align=right valign=top>&nbsp;"
            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2>"
            htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
            htmlBuilder += "<tr bgcolor=#d3d3d3>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Org Group ID</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>B Unit</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Order NO</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Batch ID</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Location</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Order Date</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Picked or Downloaded Date Time</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Status</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>User</b></span></td>"
            htmlBuilder += "</tr>"

            for (var index = 0; index < this.lstPickStatus.length; index++) {
                if (this.lstPickStatus[index].DOWNLOADTIME == null) {
                    this.lstPickStatus[index].DOWNLOADTIME = "";
                }
                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.orgGroupId + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].BUSINESS_UNIT + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].ORDER_NO + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].PICK_BATCH_ID + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].LOCATION + "</span></td>"
                if (this.lstPickStatus[index].UPDATETIME != "")
                {
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.convertDateFormate(this.lstPickStatus[index].UPDATETIME) + "</span></td>"
                }
                else {
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].UPDATETIME+ "</span></td>"
                }
                
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].DOWNLOADTIME + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].Status + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].USER_ID + "</span></td>"
                htmlBuilder += "</tr>"
            }


            htmlBuilder += "</table></td></tr></Table>"

            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            this.clientErrorMsg(ex, 'exportReportDetails');
        }
    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    closeMailPopup() {
        this.growlMessage = [];
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

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {

    }

}