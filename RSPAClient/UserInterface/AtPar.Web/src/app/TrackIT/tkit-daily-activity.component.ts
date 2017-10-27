
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { StatusType, TokenEntry_Enum, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Menus } from '../AtPar/Menus/routepath';
import { MT_TKIT_DAILYACTIVITY_DETAILS } from '../../app/Entities/MT_TKIT_DAILYACTIVITY_DETAILS';
import { saveAs } from 'file-saver';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'tkit-daily-activity.component.html',
    providers: [AtParCommonService, AtParConstants]
})

export class DailyActivityComponent implements OnInit {
    /*Varaible Declaration*/
    breadCrumbMenu: Menus;
    SelectedDate: string;
    lstDailyActivityDetails: MT_TKIT_DAILYACTIVITY_DETAILS[] = [];
    lstFilterData: MT_TKIT_DAILYACTIVITY_DETAILS[] = [];
    rowsPerPage: string = "";
    ipAddress: string = "";
    gstrProtocal: string = "";
    gstrPortNo: string = "";
    gstrServerName; string = "";
    deviceTokenEntry: string[] = [];
    isVisible: boolean = false;
    isMailDialog: boolean = false;
    tdExports: boolean = false;
    growlMessage: Message[] = [];
    toMailAddr: string = "";
    statusCode: number = -1;

    /**
    * Constructor    
    * @param AtParCommonService
    * @param httpService
    * @param spinnerService
    * @param AtParConstants
    */
    constructor(
        private leftBarAnimateService: LeftBarAnimationService,
        private httpService: HttpService,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private router: Router,
        private atParConstant: AtParConstants,
        private route: ActivatedRoute
       
    ) {

        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new Menus();

        } catch (ex) {
            this.clientErrorMsg(ex, 'constructor');
        }
        this.spinnerService.stop();
    }

    /**
    * This finction is for  bind data to the datatable when page loading
    */
    async  ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.rowsPerPage = this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        try {
            this.spinnerService.start();
            var date = new Date;            
            this.SelectedDate = this.convertDateFormate(date);
            await this.btnGo_Click();
           
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'OnInit');
        }
        
    }
       
    /**
    * This method is calling when click on Go button    
    */
    async  btnGo_Click() {
      
            this.growlMessage = [];
            let lstData: MT_TKIT_DAILYACTIVITY_DETAILS[] = []      
            this.growlMessage = [];
            this.spinnerService.start();  
                 
          try
            {    
            await this.httpService.getSync({
                        apiMethod: "/api/DailyActivityReport/GetTKITDailyUserActivityRep",
                        params: {
                            "pToDate": this.convertDateFormate(this.SelectedDate)
                        }
                }).catch(this.httpService.handleError)
                .then((res: Response) => {
                  let res2=  res.json() as AtParWebApiResponse<MT_TKIT_DAILYACTIVITY_DETAILS>;                                                                                                           
                    this.spinnerService.stop();
                    this.statusCode = res2.StatusCode;
                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.isVisible = true;
                    this.tdExports = true;
                    lstData = res2.DataDictionary["pDsDailyActRep"]["Table1"];                    
                    if (lstData.length > 0) {
                        this.lstDailyActivityDetails = lstData;
                    }

                }

                else if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                    this.tdExports = false;
                    this.isVisible = false;
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
                    return;
                }
                else {
                    this.tdExports = false;
                    this.isVisible = false;
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                    return;
                }

            });           

        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click");

        }
        finally {
            this.spinnerService.stop();
        }

    }
    
    /**
    * This method is calling when user click on Details link in the datatable and after clicking navigating to pointOfuse Daily User Activity Report screen
    */
    async onDetailsClick(item: MT_TKIT_DAILYACTIVITY_DETAILS) {               

        try {
            let appId: number = 0;            
            appId = EnumApps.TrackIT;
            let lastName: string = "";
            let userArray: any[] = [];
            userArray = item.USERNAME.split(" ", 3);
            lastName= userArray[2].trim().split("(", 1);
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "p1value": appId,
                    "p2value": item.UID,
                    "p4value": this.convertDateFormate(this.SelectedDate),
                    "p5value": userArray[0],
                    "p6value": lastName,
                    "p7value": userArray[1],
                    "p3value": this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]                         
                }
            };

            this.breadCrumbMenu.MENU_NAME = "Daily Activity";
            this.breadCrumbMenu.ROUTE = 'trackit/dailyactivity';
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.breadCrumbMenu.GROUP_NAME = 'Reports & Dashboards';
            this.breadCrumbMenu.APP_NAME = 'TrackIT';
            this.breadCrumbMenu.IS_DIV = false;
            localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));

            var menuItems = JSON.parse(localStorage.getItem('MenuList'));
            for (var i = 0; i < menuItems.length; i++) {
                if ((menuItems[i] as Menus).ROUTE == 'trackit/dailyactivity') {
                    await this.leftBarAnimateService.emitChangeReportaActiveMenu((menuItems[i] as Menus).MENU_NAME.trim());
                    break;
                }
            }
              await this.router.navigate(['atpar/reports/customreport/166499B2-65E6-436E-A497-313C56731F71'], navigationExtras);           
        }
        catch (ex) {
            this.clientErrorMsg(ex,"onDetailsClick");
        }
    }

    /**
    * This method is used for change date format to mm/dd/yyyy
    */
    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }    

    async onChargesFilterData(data) {
        try {
            this.lstFilterData = data;
        } catch (ex) {
            this.clientErrorMsg(ex,"onChargesFilterData");
        }
    }

    /**
     * This method is calling when user click on Mail Icon 
     * @param event
     */
    async onSendMailIconClick(event) {
        try {
            this.growlMessage = [];
            this.isMailDialog = true;
            this.toMailAddr = "";
        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailIconClick');
        }
    }

    /**
     * This method is calling when user userclick on submit button after enter mailid
     * @param event
     */
    async onSendMailClick(event) {
        try {
            this.growlMessage = [];
            if (this.toMailAddr == "" || this.toMailAddr == undefined) {
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
            let html: string = await this.ExportReportDetails('Mail');
            let toAddr: string = "";

            if (html != "" && html != null) {
                await this.commonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'TrackIT Daily Activity Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), "")
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

            this.toMailAddr = "";

        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailClick');
        }
        finally {

            this.spinnerService.stop();
        }
    }

    /**
    * This method is used for validating Email
    * @param event
    */
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
     * This method is calling when user click on print Icon
     * @param event
     */
    async onPrintClick(event) {
        try {
            this.growlMessage = [];
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.ExportReportDetails('Print');
            if (html != '' && html != null) {

                var mywindow = window.open('', null, 'height=600,width=600,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'TrackIT - Daily Activity Report' + '</title>');
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
            this.clientErrorMsg(ex, 'onPrintClick');
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
     * This method is calling when user click on Excel Icon
     * @param event
     */
    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.growlMessage = [];
            this.spinnerService.start();
            let html: string = await this.ExportReportDetails('Excel');
            if (html != "" && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "mt_tkit_daily_activity_rep");
            }

        } catch (ex) {
            this.clientErrorMsg(ex, 'onExportToExcelClick');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
     * This method is for export  datatable data in different formats
     * @param event
     */
    async ExportReportDetails(reqType: string) {
        let htmlBuilder: string = "";
        try {

            this.statusCode = -1;
            this.growlMessage = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;
            let imgserverPath: string = "";
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
                        htmlBuilder = "";
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
                        htmlBuilder = "";
                        return htmlBuilder;
                    }

                });

            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';

            let title: string = '""' + "AtparVersion 2.8" + '""';

            htmlBuilder += "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";


            if (reqType == 'Print') {
                htmlBuilder += "<tr width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>TrackIT Daily Activity Report for the date :<b>" + this.convertDateFormate(this.SelectedDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }

            else if (reqType == 'Excel') {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>TrackIT Daily Activity Report for the date : <b>" + this.convertDateFormate(this.SelectedDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }

            else {
                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>TrackIT Daily Activity Report for the date :<b>" + this.convertDateFormate(this.SelectedDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"
            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                + "<tr bgcolor=#d3d3d3>"
                + "<td align=center  nowrap><span class=c3><b>User</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>No of Locations Delivered To</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>CompartmenNo of Items Deliveredt</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Avg. time taken for an item (Secs)</b></span></td>"               
                + "</tr>";

            this.lstDailyActivityDetails.forEach(headers => {
                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=center nowrap><span class=c3>" + headers.USERNAME + "</span></td>"
                htmlBuilder += "<td align=center nowrap><span class=c3>" + headers.NO_LOCATIONS_DELIVERED + "</span></td>"
                htmlBuilder += "<td align=center nowrap><span class=c3>" + headers.NO_ITEMS_DELIVERED + "</span></td>"
                htmlBuilder += "<td align=center nowrap><span class=c3>" + headers.AVG_DELIVER_TIME + "</span></td>"             
                htmlBuilder += "</tr>";
            });
                                          
            htmlBuilder += "</table></Table>";
            return htmlBuilder;
        }
        catch (ex) {;
            this.clientErrorMsg(ex, 'ExportReportDetails');

        }
    }

    /**
    * This method is calling when user close mail dailogbox
    * @param event
    */
    closeMailPopup() {
        this.growlMessage = [];
    }


    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    /**
     * This method is for clearing all the variables
     * @param event
     */
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstDailyActivityDetails = null;
        this.lstFilterData = null;       
    }
}