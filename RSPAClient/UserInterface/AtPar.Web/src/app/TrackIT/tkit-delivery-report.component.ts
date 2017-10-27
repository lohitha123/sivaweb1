
import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { Http, Response, Jsonp, RequestOptions, Headers, } from '@angular/http';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { TokenEntry_Enum, ClientType, BusinessType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { SelectItem, Message } from './../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';

import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';

import { saveAs } from 'file-saver';
import { VM_TKIT_DEPT } from '../../app/Entities/VM_TKIT_DEPT';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';

import { DeliveryReportService } from './tkit-delivery-report.service';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { StatusType, EnumApps, EventType, MailPriority } from '../Shared/AtParEnums';


declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'tkit-delivery-report.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, DeliveryReportService, datatableservice]
    
})

export class DeliveryReportComponent {

    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    order: string = "";
 
   
    showGrid: boolean = false;
    showexport: boolean = false;

   
    lstStatus: SelectItem[] = [];
    lstDeptDetails: SelectItem[];
    tkitDeptDetails: VM_TKIT_DEPT[];
    lstDeliverdBy: any[] = [];
    lstRequestor: any[] = [];
    deliverHeaders: any[] = [];
    deliverDetails: any[] = [];
    


    lstUsers: any[] = [];
    selectedUser: string = "";
    selectedOrgGroupID: string = ""; 
    selectedStatus: string = "";
    selectedRequestor: string = "";   

    statusCode: number = -1;
    noOfRecords: number = 0;
    defDateRange: number = 0;
    deliverDetailRows: number = 0;

    fromDate: Date;
    toDate: Date;
    currentDate: Date;

    tdExports: boolean = true;
    plus: boolean = true;
     pop: boolean = false;

    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;
    txtEventsMail: string;
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    

  
    request: string = "";
    recipient: string = "";
    userId: string = "";
    selectedDeptID: string = "";
    itemId: string = "";
    vendorName: string = "";
    descr: string = "";
    location: string = "";
    
    
    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private deliveryReportService: DeliveryReportService,

    ) {

    }

    async  ngOnInit() {

        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
      

        this.lstStatus.push({ label: "Select One", value: "STATUS" }, { label: "ALL", value: "ALL" }, { label: "Open", value: "0" }, { label: "Cancelled", value: "13" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "Take", value: "55" }, { label: "Return", value: "60" });
        this.selectedStatus = this.lstStatus[0].value;
               
        await this.getMyPreferences();
        await this.getHeirarchyUsersList();
        await this.PopulateDepartments();
        await this.PopulateRequestors();

        this.currentDate = new Date();
        this.toDate = new Date();
        this.fromDate = new Date();
        if (this.defDateRange.toString() != '' && this.defDateRange != null) {
            this.fromDate = await this.addDays(this.fromDate, -this.defDateRange);
        }
    }

    async getMyPreferences() {

        try {
            await this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry)
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.defDateRange = parseInt(data.DataVariable.toString());
                    }
                });
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return AtparStatusCodes.E_SERVERERROR;
            }

        } catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }


        return AtparStatusCodes.ATPAR_OK;
    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    confirm() {
        try {
            this.growlMessage = [];
            // var rowData: any;
            var compareDates = new Date(this.toDate);
            var currentDate = new Date();
            if (compareDates.getTime() > currentDate.getTime()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date " });
                return;
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }


    validateSearchFields() {

        this.pop = false;
        this.showGrid = false;
        this.showexport = false;

        this.growlMessage = [];

        try {
            this.growlMessage = [];

           

            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }

            if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
            }

            if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                return false;
            }


            return true;

        } catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    }



    async  PopulateDepartments() {
        try {

            this.lstDeptDetails = [];
            this.lstDeptDetails.push({ label: "All", value: "ALL" });
            this.selectedDeptID = this.lstDeptDetails[0].value;
            this.spinnerService.start();
            await this.deliveryReportService.getTrackITDetpartments("", "A").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];
                      this.tkitDeptDetails = data.DataList;
                 
                    this.statusCode = data.statusCode;

                   
                        switch (data.StatType) {
                            case StatusType.Success: {
                        this.tkitDeptDetails = [];
                     
                                this.tkitDeptDetails = data.DataDictionary["pDsTkitDepts"].Table1;
                             
                                if (this.tkitDeptDetails != null && this.tkitDeptDetails != undefined) {

                                    for (let i = 0; i < this.tkitDeptDetails.length; i++) {
                                        this.lstDeptDetails.push({

                                            label: this.tkitDeptDetails[i].DESCRIPTION + " (" + this.tkitDeptDetails[i].DEPT_ID + ")",

                                            value: this.tkitDeptDetails[i].DEPT_ID


                                        })

                                       
                                    }

                                }
                                this.spinnerService.stop();


                               
                            }
                            case StatusType.Warn: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                    }
                });
                  

              


        } catch (ex) {

            this.spinnerService.stop();
            this.clientErrorMsg(ex);
        }
    }
    async  PopulateRequestors() {
      
        try {
            await this.deliveryReportService.getRequestors("True").
                catch(this.httpService.handleError).then((res: Response) => {
            //await this.deliveryReportService.getRequestors("True").then((result: Response) => {
                    let data = res.json();
                this.growlMessage = [];
                this.lstRequestor = [];
                this.lstRequestor.push({ label: "Select Requestor", value: "Select Requestor" });
             //   this.selectedRequestor = 'Select Requestor';
                this.selectedRequestor = this.lstRequestor[0].value; 
                switch (data.StatType) {
                    case StatusType.Success: {
                      
                        for (var i = 0; i < data.DataDictionary["pDsTkitRequestors"].Table1.length; i++) {
                            this.lstRequestor.push({ label: data.DataDictionary["pDsTkitRequestors"].Table1[i].FIRST_NAME + data.DataDictionary["pDsTkitRequestors"].Table1[i].LAST_NAME + " (" + data.DataDictionary["pDsTkitRequestors"].Table1[i].REQUESTOR_ID +")" , value: data.DataDictionary["pDsTkitRequestors"].Table1[i].REQUESTOR_ID })
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
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

    async getDeliveryDetails() {
        var Fdate;
        var Tdate;
        this.showGrid = false;
        this.showexport = false;
        try {

            if (this.validateSearchFields() == false) {

                return;
            }
           
                Fdate = this.convertDateFormate(this.fromDate.toDateString());
                Tdate = this.convertDateFormate(this.toDate.toDateString());
            


       
            let DefDateTime: Date;
            let StausDateTime: Date;
           
            this.deliverHeaders = [];
            this.deliverDetails = [];
           
            this.showexport = false;

          

            if (this.userId == null || this.userId == undefined || this.userId=="ALL") {
                this.userId = '';
            }

            if (this.selectedStatus == null || this.selectedStatus == undefined || this.selectedStatus =="STATUS") {
                this.selectedStatus = '';
            }

            if (this.selectedRequestor == null || this.selectedRequestor == undefined || this.selectedRequestor == "Select Requestor") {
                this.selectedRequestor = '';
            }

        
            await this.deliveryReportService.getTkITDeliverReport(Fdate, Tdate, this.request, this.recipient, this.userId, this.selectedDeptID, this.itemId, this.vendorName, this.descr, this.location,
                this.selectedRequestor, this.selectedStatus)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    //console.log(data);
                    //console.log(data.StatType);
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.showGrid = true;
                                this.spinnerService.stop();
                                this.deliverHeaders = [];
                                this.deliverHeaders = data.DataDictionary["pDsDeliverRep"]["EVENTHEADER"];
                                this.deliverDetails = data.DataDictionary["pDsDeliverRep"]["EVENTDETAILS"];
                                                              
                                this.deliverHeaders.forEach(header => {
                                    let details = this.deliverDetails.filter(detail => detail.TRANSACTION_ID == header.TRANS_ID);
                                    this.showexport = true;
                                    header.DETAILS = details;
                                    if (header.STATUS == "0") {
                                        header.STATUS = "Open"
                                    }
                                    else if (header.STATUS == "20") {
                                        header.STATUS = "Pickup"
                                    }
                                    else if (header.STATUS == "30") {
                                        header.STATUS = "Load"
                                    }
                                    else if (header.STATUS == "40") {
                                        header.STATUS = "UnLoad"
                                    }
                                    else if (header.STATUS == "50") {
                                        header.STATUS = "Deliver"
                                    }
                                    else if (header.STATUS == "55") {
                                        header.STATUS = "Take"
                                    }
                                    else if (header.STATUS == "60") {
                                        header.STATUS = "Returns"
                                    }
                                                                     
                                });

                               
                                if (this.recordsPerPageSize == 0) {
                                    this.deliverDetailRows = this.deliverHeaders.length;
                                } else {
                                    this.deliverDetailRows = this.recordsPerPageSize;
                                }

                               
                                break;

                            }
                        case StatusType.Warn:
                            {

                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex);
        }
    }

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');
            
            let blob = new Blob([html], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "DeliveryReport.xls");

        } catch (ex) {
            this.clientErrorMsg(ex);
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

            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';





            let title: string = '""' + "AtparVersion 3.0" + '""';


            if (1 == 1) {


                htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == 'Print') {
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";

                    htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                } else {
                    if (reqType == 'Mail') {
                        htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=cid:logo title=Atpar 3><img src=cid:topbg width=82% height=63></TD></TR>";
                    }
                    else {
                        htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                    }
                    htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=3 align=left><span class=c2><b> Tkit Delivery Report between  " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                }

                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Request# - Desc</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>DepartmentID</td>"
                    + "</tr>";

                let sigimgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';

                await this.deliverHeaders.forEach(header => {
                    htmlBuilder += "<tr bgcolor=#d3d3d3>";
                    htmlBuilder += "<td  nowrap>&nbsp;" + header.ORDER_NO + " - " + header.REPORT_DATA_8 + "&nbsp;</td>";
                    if (header.LOCATION == '' || header.LOCATION == null) {
                        htmlBuilder += "<td  nowrap>&nbsp</td>";
                    }
                    else {
                        htmlBuilder += "<td  nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>";
                    }
                    if (header.VENDOR_NAME == '' || header.VENDOR_NAME == null) {
                        htmlBuilder += "<td  nowrap>&nbsp</td>";
                    }
                    else {
                        htmlBuilder += "<td  nowrap>&nbsp;" + header.VENDOR_NAME + "&nbsp;</td>";
                    }
                    if (header.DELIVERED_TO == '' || header.DELIVERED_TO == null) {
                        htmlBuilder += "<td  nowrap>&nbsp</td>";
                    }
                    else {
                        htmlBuilder += "<td  nowrap>&nbsp;" + header.DELIVERED_TO + "&nbsp;</td>";
                    }
                    if (header.STATUS == '' || header.STATUS == null) {
                        htmlBuilder += "<td  nowrap>&nbsp</td>";
                    }
                    else {
                        htmlBuilder += "<td  nowrap>&nbsp;" + header.STATUS + "&nbsp;</td>";
                    }

                    if (header.REPORT_DATA_25 == '' || header.REPORT_DATA_25 == null) {
                        htmlBuilder += "<td  nowrap>&nbsp</td>";
                    }
                    else {
                        htmlBuilder += "<td  nowrap>&nbsp;" + header.REPORT_DATA_25 + "&nbsp;</td>";
                    }  
                      
                    htmlBuilder += "</tr>";
                      if (header.DETAILS.length > 0) {
                      
                        htmlBuilder += "<tr>"
                            + "<td colspan=7>"
                            + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#E0E0E0>"
                            + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                            + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                            + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Recepient</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                            + "</tr>";
                        header.DETAILS.forEach(detail => {
                            htmlBuilder += "<tr>"
                                + "<td align=left nowrap ><span class=c3>" + detail.EVENT_STATUS_MESSAGE + "</span></td>"
                                + "<td align=left nowrap><span class=c3>" + detail.UPDATE_DATE + "</span></td>";

                            if (detail.USERNAME == '' || detail.USERNAME == null) {
                                htmlBuilder += "<td nowrap>&nbsp</td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.USERNAME + "</span></td>";
                            }  


                            if (detail.RECEPIENT == '' || detail.RECEPIENT == null) {
                                htmlBuilder += "<td nowrap>&nbsp</td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.RECEPIENT + "</span></td>";
                            }  
                               
                               
                              
                            if (detail.STATUS_MESSAGE == "Deliver") {
                                htmlBuilder += "<td align=left nowrap ><img  src=" + sigimgserverPath + header.TRANSACTION_ID + ".jpg ></td>";
                            }
                            else {
                                htmlBuilder += "<td align=right ><span class=c3></span></td>";
                            }



                            htmlBuilder += "</tr>";

                        });



                        htmlBuilder += "</table>";
                       
                    }

                    

                });

                htmlBuilder += "</table></Table>";

            }

            return await htmlBuilder;


        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }

      async onSendMailIconClick(event) {
          try {
              this.isMailDialog = true;
              this.toMailAddr = '';
          } catch (ex) {
              this.clientErrorMsg(ex);
          }
      }

      async onSendMailClick(event) {
          try {
              this.spinnerService.start();
              let html: string = await this.exportReportDetails('Mail');
              let toAddr: string = '';
              this.growlMessage = [];
              this.isMailDialog = false;

              if (html != '' && html != null) {
                  await this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Track IT Deliver Report', JSON.stringify(html), this.toMailAddr, '', 'false', MailPriority.Normal.toString(), '')
                      .catch(this.httpService.handleError)
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
                      this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
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

      async onPrintClick(event) {
        

          try {
              event.stopImmediatePropagation();
              this.spinnerService.start();
              var html = await this.exportReportDetails('Print');
              if (html != '' && html != null) {

                  var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                  if (mywindow != null && mywindow != undefined) {
                      mywindow.document.write('<html><head><title>' + 'TrackIT - Delivery Report' + '</title>');
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
              this.clientErrorMsg(ex);
              return false;
          }
          finally {
              this.spinnerService.stop();
          }
      }

    async getHeirarchyUsersList() {
        try {
            await this.deliveryReportService.getHeirarchyUsersList(EnumApps.TrackIT, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.lstUsers = [];
                this.lstUsers.push({ label: 'ALL', value: 'ALL' });
                this.userId = this.lstUsers[0].value
                switch (res.StatType) {
                    case StatusType.Success: {
                        for (var i = 0; i < res.DataDictionary["pDSUserList"].Table1.length; i++) {
                            this.lstUsers.push({ label: res.DataDictionary["pDSUserList"].Table1[i].FULLNAME, value: res.DataDictionary["pDSUserList"].Table1[i].USER_ID })
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
            this.clientErrorMsg(ex);
        }
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.spinnerService.stop();
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;      
        this.lstUsers = null;        
        this.growlMessage = null;
        this.lstStatus = null;
        this.lstDeptDetails = null;
        this.tkitDeptDetails = null;
        this.lstDeliverdBy = null;
        this.lstRequestor = null;
        this.deliverHeaders = null;
        this.deliverDetails = null;
       
    }


} 