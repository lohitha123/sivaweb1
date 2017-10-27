import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { CartScheduleComplianceReportServices } from './cart-schedule-compliance-report.service';
import { Http, Response } from "@angular/http";
import { StatusType, TokenEntry_Enum, YesNo_Enum, DataSet_Type, BusinessType, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message, SelectItem } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_ATPAR_USER } from '../Entities/MT_ATPAR_USER';
import { VM_CART_COMPLIANCE_DETAILS } from '../Entities/VM_CART_COMPLIANCE_DETAILS';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Menus } from '../AtPar/Menus/routepath';
import { saveAs } from 'file-saver';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var module: {
    id: string;
}

@Component({

    templateUrl: 'cart-schedule-compliance-report.component.html',
    providers: [AtParCommonService, AtParConstants, CartScheduleComplianceReportServices]
})

export class ScheduleComplianceReportComponent {

    breadCrumbMenu: Menus;
    growlMessage: Message[] = [];
    devicetokenentry: string[] = [];
    userId: string = "";
    orgGrpId: string = "";
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupIdDropDown: boolean = false;
    blnShowOrgGroupIdLabel: boolean = false;
    orgGrpIdData: string = "";
    statusCode: number = -1;
    lstOrgGroups: SelectItem[] = [];
    lstUsers: SelectItem[] = [];
    lstScheduleDetails: Array<VM_CART_COMPLIANCE_DETAILS>;
    lstMulUsers: VM_CART_COMPLIANCE_DETAILS[]=[]
    lstUserDetails: MT_ATPAR_USER[];
    //orgGroupIDForUserUpdate: string = "";
    selectedOrgGroupId: string = "";
    orgGroupID: string = "";
    ondate: Date;
    onDate: string = "";
    orgGrp: string = "";
   // serverUser: string = "";
    isLblVisible: boolean = false;
    showGrid: boolean = false;
    selectedDropDownUserId: string = "";
    usersID: string = "";
    blnTotal: boolean = false;
    lstOutputSchedule: any[] = [];
    gstrProtocal: string = "";
    gstrServerName; string = "";
    gstrPortNo: string = "";
    ipAddress: string = "";
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    tdExports: boolean = false;
    queryOrgGrpId: string = '';
    queryUserId: string = '';
    queryFirstname: string = '';
    queryLastname: string = '';
    queryMiddleInitial: string = '';
    queryDate: any;
    fullUserId: string = '';
    constructor(
        private httpService: HttpService,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private scheduleComplianceServices: CartScheduleComplianceReportServices,
        private route: ActivatedRoute

    ) {

        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new Menus();

        } catch (ex) {
            this.clientErrorMsg(ex, "constr");
        }
        this.spinnerService.stop();
    }

    async ngOnInit() {
        
        this.devicetokenentry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.userId = this.devicetokenentry[TokenEntry_Enum.UserID.toString()];
        this.orgGrpId = this.devicetokenentry[TokenEntry_Enum.OrgGrpID.toString()];
        this.ondate = new Date();
        try {
            this.bindOrgGroups();
            this.route.queryParams.subscribe(params => {
                this.queryUserId = decodeURI(params["p2value"]).replace(/%20/g, ' ');
                this.queryOrgGrpId = decodeURI(params["p3value"]).replace(/%20/g, ' ');
                this.queryDate = decodeURI(params["p4value"]).replace(/%20/g, ' ');
                this.queryFirstname = decodeURI(params["p5value"]).replace(/%20/g, ' ');
                this.queryLastname = decodeURI(params["p6value"]).replace(/%20/g, ' ');
                this.queryMiddleInitial = decodeURI(params["p7value"]).replace(/%20/g, ' ');

            });

            if (this.queryOrgGrpId != '' && this.queryOrgGrpId != 'null' && this.queryOrgGrpId != 'undefined' && this.queryUserId != '' && this.queryUserId != 'null' && this.queryUserId != 'undefined') {
                if (this.blnShowOrgGroupIdLabel == true) {
                    this.orgGrpIdData = this.queryOrgGrpId;
                }
                else {
                    this.selectedOrgGroupId = this.queryOrgGrpId;
                }
                this.fullUserId = this.queryFirstname + ' ' + this.queryMiddleInitial + ' ' + this.queryLastname + ' (' + this.queryUserId + ')';
                this.selectedDropDownUserId = this.queryUserId;
                var dateStr = new Date(this.queryDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                this.ondate = new Date(dateStr);
                await this.goClick();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "oninit");
        }
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this.devicetokenentry[TokenEntry_Enum.UserID], this.devicetokenentry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupIdLabel = true;
                                this.orgGrpIdData = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                //this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID;
                                this.bindUsersList();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupIdDropDown = true;
                                this.lstOrgGroups = [];
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                this.lstUsers = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
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
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async bindUsersList() {

        if (this.blnShowOrgGroupIdLabel) {
            this.orgGroupID = this.orgGrpIdData.split("-")[0];
        }
        else {
            this.orgGroupID = this.selectedOrgGroupId;
        }

        //this.lstUsers = [];
        
        //this.lstUsers.push({ label: "All", value: "All" });
        await this.scheduleComplianceServices.getHeirarchyUsersList(this.orgGroupID,EnumApps.CartCount, this.devicetokenentry[TokenEntry_Enum.UserID] ).then((result: Response) => {
            let res = result.json() as AtParWebApiResponse<any>;

            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "" });
            this.lstUsers.push({ label: 'All', value: 'All' });
            //this.userID = 'ALL';
            switch (res.StatType) {
                case StatusType.Success: {
                    for (var i = 0; i < res.DataDictionary["pDSUserList"].Table1.length; i++) {
                        this.lstUsers.push({ label: res.DataDictionary["pDSUserList"].Table1[i].FULLNAME, value: res.DataDictionary["pDSUserList"].Table1[i].USER_ID })
                    }
                    break;
                }
                case StatusType.Warn: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                    break;
                }
                case StatusType.Error: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                    break;
                }
                case StatusType.Custom: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                    break;
                }
            }
        });

    }

    async ddlOrgGroupChanged() {
        try {
            if (this.blnShowOrgGroupIdLabel) {
                this.bindUsersList();
            }

            else if (this.blnShowOrgGroupIdDropDown) {
                if (this.selectedOrgGroupId == "Select One") {
                    this.lstUsers = [];
                    this.lstUsers.push({ label: "Select User", value: "" });
                    return;
                }
                else {
                    this.bindUsersList();
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGroupChanged");
        }
    }

    async goClick() {
        try {

            this.showGrid = false;
            this.isLblVisible = false;
            this.growlMessage = []
            let result: boolean = false;
            this.blnTotal = false;
            result=this.validateSearchFields();
            if (result) {
                this.usersID = "";
                this.lstScheduleDetails = [];
                this.lstUserDetails = [];
                if (this.selectedDropDownUserId == "All") {

                    for (var i = 0; i < this.lstUsers.length; i++) {
                        if (this.lstUsers[i].value !== "All" && this.lstUsers[i].value !== "") {
                            this.usersID = this.usersID.concat("'", this.lstUsers[i].value, "',");
                        }
                    }
                    this.usersID = this.usersID.substring(0, this.usersID.length - 1);
                }
                else {
                    this.usersID = this.selectedDropDownUserId;
                }
                
                this.onDate = this.convertDateFormate(this.ondate);
                if (this.blnShowOrgGroupIdLabel == true) {
                    this.orgGrp = this.devicetokenentry[TokenEntry_Enum.OrgGrpID];
                }
                else {
                    this.orgGrp = this.selectedOrgGroupId.split("-")[0];
                }

                await this.scheduleComplianceServices.getcomplianceReport(this.userId, this.usersID, this.onDate, this.orgGrp)
                    .catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json();
                        this.statusCode = data.StatusCode;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.lstOutputSchedule=[]
                                this.lstScheduleDetails = data.DataDictionary.dsCompRep["Records"];
                                this.lstUserDetails = data.DataDictionary.dsCompRep["UsersList"];
                                this.lstMulUsers = new Array<VM_CART_COMPLIANCE_DETAILS>();
                                if (this.lstScheduleDetails.length > 0) {

                                    for (let j in this.lstScheduleDetails) {
                                        if (this.lstScheduleDetails[j].STATUS == 0) {
                                            this.lstScheduleDetails[j].COLOR = "green";
                                        }
                                        else if (this.lstScheduleDetails[j].STATUS == 2) {
                                            this.lstScheduleDetails[j].COLOR = "red";
                                        }
                                        else {
                                            this.lstScheduleDetails[j].COLOR = "gray";
                                        }
                                    }

                                    for (let i in this.lstUserDetails) {

                                        let mulUsers = this.lstScheduleDetails.filter(a => a.USER_ID == this.lstUserDetails[i].USER_ID);
                                        let fulluserId = this.lstUserDetails[i].FIRST_NAME + " " + this.lstUserDetails[i].MIDDLE_INITIAL + " " + this.lstUserDetails[i].LAST_NAME + " (" + this.lstUserDetails[i].USER_ID + ")";
                                        this.lstOutputSchedule.push({
                                            USER_ID: fulluserId,
                                            SCHEDULEDETAILS: mulUsers
                                        });

                                    }

                                    if (this.lstScheduleDetails.length > 0) {
                                        this.showGrid = true;
                                        this.isLblVisible = true;
                                        this.blnTotal = true;
                                        this.tdExports = true;
                                    }

                                }
                                else {

                                    this.showGrid = false;
                                    this.isLblVisible = false;
                                    let result: boolean = false;
                                    this.blnTotal = false;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });

                                }
                                break;
                                
                            }
                            case StatusType.Warn: {
                                this.showGrid = false;
                                this.isLblVisible = false;
                                let result: boolean = false;
                                this.blnTotal = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.showGrid = false;
                                this.isLblVisible = false;
                                let result: boolean = false;
                                this.blnTotal = false;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.showGrid = false;
                                this.isLblVisible = false;
                                let result: boolean = false;
                                this.blnTotal = false;
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                                
                        }
                    });

            }
            

        }
        catch (ex) {
            this.clientErrorMsg(ex, "goClick");
        }
       
    }

    setbackGroundColor(x, opt: VM_CART_COMPLIANCE_DETAILS) {
        try {
            if (opt.STATUS != null)
                {
            if (opt.STATUS ==0) {
                x.parentNode.parentNode.style.background = "green";
            }
            else if (opt.STATUS == 1) {
                x.parentNode.parentNode.style.background = "grey";
            }
            else if (opt.STATUS == 2) {
                x.parentNode.parentNode.style.background = "red";
            }
            }
        }
        catch (ex) {
            
        }
    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    validateSearchFields() {
        try {
            this.growlMessage = [];

            if ((this.blnShowOrgGroupIdDropDown == true) && (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "")) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select valid Org Group ID" });
                this.showGrid = false;
                this.isLblVisible = false;
                let result: boolean = false;
                this.blnTotal = false;
                this.tdExports = false;
                return false;
            }
            else if ((this.selectedDropDownUserId == null || this.selectedDropDownUserId == undefined || this.selectedDropDownUserId == "" || this.selectedDropDownUserId == 'Select User')) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select User" });
                this.showGrid = false;
                this.isLblVisible = false;
                let result: boolean = false;
                this.blnTotal = false;
                this.tdExports = false;
                return false;
            }
            else if (this.ondate == null || this.ondate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                this.showGrid = false;
                this.isLblVisible = false;
                let result: boolean = false;
                this.blnTotal = false;
                this.tdExports = false;
                return false;
            }
            else if (Date.parse(this.ondate.toString())) {
                if (Date.parse(this.convertDateFormate(this.ondate)) > Date.parse(this.convertDateFormate(Date.now()))){
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Date must be less than or equal to current date' });
                    this.showGrid = false;
                    this.isLblVisible = false;
                    let result: boolean = false;
                    this.blnTotal = false;
                    this.tdExports = false;
                    return false;
                }
                
            }
            
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex,"validateSearchFields");
            return false;
        }
    }

   async ExportReportReview(reqType: string)
    {
        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.growlMessage = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;
            let _DS: VM_CART_COMPLIANCE_DETAILS[] = [];
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

            let schdate: Date = new Date(this.ondate);
            
            let title: string = '""' + "AtparVersion 2.8" + '""';
            htmlBuilder += "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == 'Print') {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=75% height=63></td></TR>";
                htmlBuilder +="<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td align=left colspan=2><span class=c2>Schedule Compliance Report for " + this.dayOfWeekAsString(schdate.getDay() - 1) + " (" + this.convertDateFormate(this.onDate) + ")" + "</b></span></td>"
                htmlBuilder += "<td align=right><img src=" + imgserverPath + "GreenBox.bmp>&nbsp;&nbsp;&nbsp;<b>Counted in time</b></td>"
                htmlBuilder += "<td align=right><img src=" + imgserverPath + "GrayBox.bmp>&nbsp;&nbsp;&nbsp;<b>Counted after time</b></td>"
                htmlBuilder += "<td align=right><img src=" + imgserverPath + "RedBox.bmp>&nbsp;&nbsp;&nbsp;<b>Not Counted</b></td>"
                htmlBuilder += "<td align=right valign=top>&nbsp;"
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
                
            }
            else if (reqType == 'Excel') {
                htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td align=left colspan=3><span class=c2>Schedule Compliance Report for " + this.dayOfWeekAsString(schdate.getDay() - 1) + " (" + this.convertDateFormate(this.onDate) + ")" + "</b></span></td>"
                htmlBuilder += "<td><img src=" + imgserverPath + "GreenBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted in time&nbsp;&nbsp;</b></span></td>"
                htmlBuilder += "<td><img src=" + imgserverPath + "GrayBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted after time&nbsp;&nbsp;</b></span></td>"
                htmlBuilder += "<td><img src=" + imgserverPath + "RedBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Not Counted</b></span></td>"
                htmlBuilder += "<td align=right valign=top>&nbsp;"
            }
            else {
                htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td align=left colspan=3><span class=c2>Schedule Compliance Report for " + this.dayOfWeekAsString(schdate.getDay() - 1) + " (" + this.convertDateFormate(this.onDate) + ")" + "</b></span></td>"
                htmlBuilder += "<td><img src=" + imgserverPath + "GreenBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted in time&nbsp;&nbsp;</b></span></td>"
                htmlBuilder += "<td><img src=" + imgserverPath + "GrayBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Counted after time&nbsp;&nbsp;</b></span></td>"
                htmlBuilder += "<td><img src=" + imgserverPath + "RedBox.bmp>&nbsp;&nbsp;&nbsp;<span class=c2><b>Not Counted</b></span></td>"
                htmlBuilder += "<td align=right valign=top>&nbsp;"

            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> "

            for (let i = 0; i <= this.lstOutputSchedule.length - 1; i++)
            {
                let scheduledtls: VM_CART_COMPLIANCE_DETAILS[]=[];
                scheduledtls = this.lstOutputSchedule[i].SCHEDULEDETAILS;
                htmlBuilder +="<tr><td><table align=center width=90% style=BORDER-COLLAPSE:collapse border=1>"
                htmlBuilder += "<tr><td align=center colspan=6><span class=c3>" + this.lstOutputSchedule[i].USER_ID+ "</span></td></tr>"
                
                htmlBuilder +="<tr>"
                htmlBuilder +="<td align=center nowrap><span class=c3><b>Status</b></span></td>"
                htmlBuilder +="<td align=center nowrap><span class=c3><b>Business Unit/Company</b></span></td>"
                htmlBuilder +="<td align=center nowrap><span class=c3><b>Cart ID/Par Location</b></span></td>"
                htmlBuilder +="<td align=center nowrap><span class=c3><b>Scheduled to count before</b></span></td>"
                htmlBuilder +="<td align=center nowrap><span class=c3><b>Actual Count time</b></span></td>"
                htmlBuilder +="<td align=center nowrap><span class=c3><b>Deviation (mins)</b></span></td>"
                htmlBuilder +="</tr>"

                for (let j = 0; j <= this.lstOutputSchedule[i].SCHEDULEDETAILS.length - 1; j++)
                {
                    htmlBuilder +="<tr>"
                    if (this.lstOutputSchedule[i].SCHEDULEDETAILS[j].STATUS == 0) {

                        htmlBuilder += "<td style=background-color:Green ></td>";
                    }
                    else if (this.lstOutputSchedule[i].SCHEDULEDETAILS[j].STATUS == 1) {

                        htmlBuilder += "<td style=background-color:Gray ></td>";
                    }
                    else if (this.lstOutputSchedule[i].SCHEDULEDETAILS[j].STATUS == 2) {

                        htmlBuilder += "<td style=background-color:Red ></td>";
                    }

                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].BUSINESS_UNIT + "</span></td>"
                    htmlBuilder += "<td align=left style='mso-number-format:\@;' nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].CART_ID + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].COUNT_BEFORE + "</span></td>"
                    htmlBuilder += "<td align=left ><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].ACTUAL_COUNT_TIME+ "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstOutputSchedule[i].SCHEDULEDETAILS[j].TIME_DIFFERENCE + "</span></td>"
                    htmlBuilder +="</tr>"
                }
                 
                htmlBuilder += "</table></td></tr>"

            }
            htmlBuilder += "</Table>"
            htmlBuilder=  htmlBuilder.replace(/null/gi, '');
            return await htmlBuilder;
        }
        catch (ex)
        {
            this.clientErrorMsg(ex, "ExportReportReview");
        }
    }

    async onSendMailIconClick(event) {
        try {
            this.growlMessage = [];
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex, "onSendMailIconClick");
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
            let html: string = await this.ExportReportReview('Mail');
            let toAddr: string = '';
            html.replace('null', '');
            if (html != '' && html != null) {
                await this.commonService.sendEmail(this.devicetokenentry[TokenEntry_Enum.SystemId], 'Schedule Compliance Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
            this.clientErrorMsg(ex, 'onSendMailClick');
        }
        finally {

            this.spinnerService.stop();
        }
    }


   async onPrintClick(event) {
       try {
           event.stopImmediatePropagation();
           this.spinnerService.start();
           var html = await this.ExportReportReview('Print');

           html.replace('null', '');
           if (html != '' && html != null) {

               var mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
               if (mywindow != null && mywindow != undefined) {

                   mywindow.document.write('<html><head><title>' + 'Cart Count - Schedule Compliance Report' + '</title>');
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
           this.clientErrorMsg(ex, "onPrintClick");
           return false;
       }
       finally {
           this.spinnerService.stop();
       }
   }

   async onExportToExcelClick(event) {
       try {
           event.stopImmediatePropagation();
           this.growlMessage = [];
           this.spinnerService.start();
           let html: string = await this.ExportReportReview('Excel');
           html.replace('null', '');
           if (html != '' && html != null) {
               let blob = new Blob([html], {
                   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
               });
               saveAs(blob, "ScheduleComplianceReport.xls");
           }

       } catch (ex) {
           this.clientErrorMsg(ex, 'onExportToExcelClick');
       }
       finally {
           this.spinnerService.stop();
       }
   }

   validateEmail(email) {
       var ret = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return ret.test(email);
   }

   closeMailPopup() {
       this.growlMessage = [];
   }

   OnDestroy() {

       this.lstUsers = null;
       this.growlMessage = [];
       this.orgGroupData = null;
       this.lstOrgGroups = null;
       this.lstScheduleDetails = null;
       this.lstMulUsers = null;
       this.lstUserDetails = null;
       this.lstOutputSchedule = null;
   }

   dayOfWeekAsString(dayIndex) {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex];
}
} 