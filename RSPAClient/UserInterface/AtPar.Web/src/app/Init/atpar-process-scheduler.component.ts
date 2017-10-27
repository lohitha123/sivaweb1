import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProcessSchedulerService } from './atpar-process-scheduler.service';
import { Message } from '../components/common/api';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Router } from '@angular/router';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';
import { TokenEntry_Enum, StatusType, ScheduleType_Enum, DayOfWeek_Enum } from '../Shared/AtParEnums';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { MT_ATPAR_SCHEDULE_HEADER } from '../Entities/MT_ATPAR_SCHEDULE_HEADER';
import { MT_ATPAR_SCHEDULE_DETAIL } from '../entities/mt_atpar_schedule_detail';
import { MT_ATPAR_PROCESS_SCHEDULER } from '../Entities/MT_ATPAR_PROCESS_SCHEDULER';
import { AtParConstants } from '../Shared/AtParConstants';
import { ConfirmationService } from '../components/common/api';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'atpar-process-scheduler.component.html',
    providers: [ProcessSchedulerService, AtParConstants, ConfirmationService],
})

export class ProcessScheduler {
    /** Variable Declaration*/
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    lstSchedule: any = [];
    selectedSchedule: any;
    lstOrgGroupData: any = [];
    orgGroupData: any = [];
    blnShowOrgGroupLabel: boolean = false;
    orgGrpId: string = "";
    blnShowOrgGroupDD: boolean = false;
    schCreRepeat: number;
    timeInterName: string = '';
    stringMode: string = '';
    hideSChedule: boolean = true;
    blnSubmit: boolean = false;
    orgGroupString: string = '';
    strSchedDetails: string
    lstSchedDetails: any = [];
    lstScheduler: any = [];
    strStartTime: string = "";
    strStartTimeedit: string = "";
    strEndTime: string = "";
    strEndTimeedit: string = "";
    intInterval: number;
    intSchedType: number;
    strOrgGrpId: string;
    editTrue: boolean = false;
    createTrue: boolean = false;
    selectedTimeValue: any;
    timeConversion: number;
    timeConversionp: number;
    statusCode: number = -1;
    lstOrgGroupsInfo: any = [];
    strSearchString: string = "";
    public ven = new MT_ATPAR_PROCESS_SCHEDULER();
    loading: boolean = true;
    day1: boolean = false;
    inter1: boolean = false;
    day2: boolean = false;
    inter2: boolean = false;
    public schItem = new MT_ATPAR_SCHEDULE_HEADER();
    public schCreItem = new MT_ATPAR_SCHEDULE_HEADER();
    lstDBData: MT_ATPAR_PROCESS_SCHEDULER[] = [];
    checkedSpecificDays: boolean = false;
    checkedIntervals: boolean = false;
    orgGroup: string = "";
    recordsPerPageSize: number;
    SCHEDULE_ID: string = "";
    DESCRIPTION: string = "";
    ORG_GROUP_ID: string = "";
    breadCrumbMenu: Menus;
    /*for disabling Button*/
    scheduleIDStatus: number;
    scheduleDescStatus: number;
    disableButton: boolean = true;
    intervalStatus: number;
    intervalStatusEdit: number;
    /*variable declaration ending*/

    /**
     * Constructor
     * @param dataservice
     * @param leftBarAnimationservice
     * @param router
     * @param route
     * @param processSchedulerService
     * @param httpService
     * @param spinnerService
     */
    constructor(
        private leftBarAnimationservice: LeftBarAnimationService,
        private router: Router,
        private processSchedulerService: ProcessSchedulerService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    /**
     redirecting to home when click on breadcrumbs
     */
    homeurl() {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    }

    /**
     * Init Function for getting all the schedule data and org group data when page load 
     */
    async ngOnInit() {
        try {
            this.lstSchedule = [];
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.spinnerService.start();
            this.getSchedulesDetails();
        }
        catch (ex) {
            this.displayCatchException(ex, "ngOnInit");
        }
    }

    /**
     * Getiing Schedules form Database
     */
    async getSchedulesDetails() {
        try {
            this.lstSchedule = [];

            //COnvert first letter of word into capital and remaining are small letters
            var OrgGroup = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].charAt(0).toUpperCase() + this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].substr(1).toLowerCase();
            await this.processSchedulerService.getScheduleIDs(OrgGroup)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    let schedules = data.DataList;
                    this.lstSchedule.push({ label: 'Select One', value: '' });
                    for (var i = 0; i < schedules.length; i++) {
                        this.lstSchedule.push({ label: schedules[i].SCHEDULE_ID + '-' + schedules[i].DESCRIPTION, value: schedules[i].SCHEDULE_ID, OrgId: schedules[i].ORG_GROUP_ID })
                    }
                    this.spinnerService.stop();
                    this.bindOrgGroups();
                });
        }
        catch (ex) {
            this.displayCatchException(ex, "getSchedulesDetails");
        }
    }

    /**
     * When we change ScheduleId this event will fire
     * @param event
     */
    ddlSelectChangeScheduleID(event) {
        try {
            this.growlMessage = [];
            this.SCHEDULE_ID = event.value;
            this.DESCRIPTION = event.label.split('-')[1];
            this.ORG_GROUP_ID = event.OrgId
            if (this.lstDBData.length > 0) {
                this.day1 = true;
                this.inter1 = false;
            }
            else {
                this.day1 = false;
            }
            if (this.strStartTime != "") {
                if (this.day1 == true) {
                    this.inter1 = false;
                }
                else {
                    this.inter1 = true;
                    this.day1 = false;
                }
            }
            else {
                this.inter1 = false;
                this.day1 = true;
            }

            this.createTrue = false;
            this.editTrue = false;
        }
        catch (ex) {
            this.displayCatchException(ex, "ddlSelectChangeScheduleID");
        }
    }

    /**
     * When we change orgid this event will fire
     * @param event
     */
    ddlSelectChangeOrgID(event) {
        this.growlMessage = [];
        try {
            if (this.checkedSpecificDays == true) {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false) {
                        this.disableButton = true;
                    }
                    else if ((this.lstDBData[i].CHK_MON == true || this.lstDBData[i].CHK_TUE == true || this.lstDBData[i].CHK_WED == true || this.lstDBData[i].CHK_THR == true || this.lstDBData[i].CHK_FRI == true || this.lstDBData[i].CHK_SAT == true || this.lstDBData[i].CHK_SUN == true)) {
                        if (this.orgGrpId != "") {
                            if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                this.disableButton = false;
                            }
                        }
                        else {
                            if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                if ((this.schCreItem.ORG_GROUP_ID == undefined) || (this.schCreItem.ORG_GROUP_ID == "")) {
                                    this.disableButton = true;
                                }
                                else { this.disableButton = false; }
                            }
                        }
                    }
                }
            }
            else {
                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                    if ((this.schCreItem.ORG_GROUP_ID != undefined || this.schCreItem.ORG_GROUP_ID != "")) {
                        if (this.checkedIntervals == true) {
                            if ((this.schCreItem.ORG_GROUP_ID == 'Select One' || this.schCreItem.ORG_GROUP_ID == "")) { this.disableButton = true; }
                            else if (this.schCreItem.INTERVAL == 0) {
                                this.disableButton = true;
                            }
                            else {
                                this.disableButton = false;
                            }
                        }
                    }
                }
                else { this.disableButton = true; }
            }
        }
        catch (ex) { this.displayCatchException(ex, "ddlSelectChangeOrgID"); }
    }

    /**
     * get schedule details based on selected schedule
     * @param selectedSchedule
     */
    async getSchedules(selectedSchedule) {
        this.growlMessage = [];
        this.stringMode = "UPDATE"
        this.editTrue = false;
        this.createTrue = false;
        this.disableButton = false;
        this.schItem.SCHEDULE_ID = this.SCHEDULE_ID;
        this.schItem.DESCRIPTION = this.DESCRIPTION;
        this.schItem.ORG_GROUP_ID = this.ORG_GROUP_ID;
        try {
            if (selectedSchedule == null || selectedSchedule == '' || selectedSchedule == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a schedule' });
            }
            else {
                this.createTrue = false;
                await this.processSchedulerService.getSheduleDetails(selectedSchedule)
                    .catch(this.httpService.handleError).then((res: Response) => {
                        this.editTrue = true;
                        let data = res.json() as AtParWebApiResponse<any>;
                        this.lstDBData = data.DataVariable["m_Item1"];
                        this.orgGroup = data.DataVariable["m_Item6"];
                        this.schItem.ORG_GROUP_ID = data.DataVariable["m_Item6"];
                        this.intSchedType = data.DataVariable["m_Item5"];
                        this.strStartTime = data.DataVariable["m_Item2"];
                        this.strStartTimeedit = data.DataVariable["m_Item2"];
                        this.strEndTimeedit = data.DataVariable["m_Item3"];
                        this.strEndTime = data.DataVariable["m_Item3"];
                        this.intInterval = data.DataVariable["m_Item4"];
                        this.schCreItem.INTERVAL = data.DataVariable["m_Item4"];
                        if (this.lstDBData.length > 0) {
                            this.day1 = true;
                            this.inter1 = false;
                        }
                        else {
                            this.day1 = false;
                        }
                        if (this.strStartTime != "") {
                            if (this.day1 == true) {
                                this.inter1 = false;
                            }
                            else {
                                this.inter1 = true;
                                this.day1 = false;
                            }
                        }
                        else {
                            this.inter1 = false;
                            this.day1 = true;
                        }
                        if (this.lstDBData.length > 0) {
                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                this.lstDBData[i].SNo = i + 1;
                                var timee = this.lstDBData[i].SCHEDULE_TIME;
                                //if (timee != "") {
                                //    var hours = Number(timee.match(/^(\d+)/)[1]);
                                //    var minutes = Number(timee.match(/:(\d+)/)[1]);
                                //    var AMPM1 = timee[6] + timee[7];
                                //    if (AMPM1 == "PM" && hours < 12) hours = hours + 12;
                                //    if (AMPM1 == "AM" && hours == 12) hours = hours - 12;
                                //    var sHours = hours.toString();
                                //    var sMinutes = minutes.toString();
                                //    if (hours < 10) sHours = "0" + sHours;
                                //    if (minutes < 10) sMinutes = "0" + sMinutes;
                                //    this.lstDBData[i].SCHEDULE_TIME = sHours + ":" + sMinutes;
                                //}
                            }
                        }
                        //if (this.strStartTime != "") {
                        //    var time = this.strStartTime;
                        //    if (time != "") {
                        //        var hours = Number(time.match(/^(\d+)/)[1]);
                        //        var minutes = Number(time.match(/:(\d+)/)[1]);
                        //        var AMPM = time[6] + time[7];
                        //        if (AMPM == "PM" && hours < 12) hours = hours + 12;
                        //        if (AMPM == "AM" && hours == 12) hours = hours - 12;
                        //        var sHours = hours.toString();
                        //        var sMinutes = minutes.toString();
                        //        if (hours < 10) sHours = "0" + sHours;
                        //        if (minutes < 10) sMinutes = "0" + sMinutes;
                        //        this.strStartTime = sHours + ":" + sMinutes;
                        //    }

                        //}
                        //if (this.strEndTime != "") {
                        //    var time = this.strEndTime;
                        //    if (time != "") {
                        //        var hours = Number(time.match(/^(\d+)/)[1]);
                        //        var minutes = Number(time.match(/:(\d+)/)[1]);
                        //        var AMPM = time[6] + time[7];
                        //        if (AMPM == "PM" && hours < 12) hours = hours + 12;
                        //        if (AMPM == "AM" && hours == 12) hours = hours - 12;
                        //        var sHours = hours.toString();
                        //        var sMinutes = minutes.toString();
                        //        if (hours < 10) sHours = "0" + sHours;
                        //        if (minutes < 10) sMinutes = "0" + sMinutes;
                        //        this.strEndTime = sHours + ":" + sMinutes;
                        //    }

                        //}
                        this.spinnerService.stop();
                    });

                await this.processSchedulerService.getOrgGroupIDS()
                    .catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<any>;
                        this.lstOrgGroupsInfo = data.DataList;
                        let v = this.lstOrgGroupsInfo.filter(x => x.ORG_GROUP_ID == this.schItem.ORG_GROUP_ID);
                        this.schItem.ORG_GROUP_ID = this.schItem.ORG_GROUP_ID + ' - ' + v[0].ORG_GROUP_NAME;

                        this.spinnerService.stop();
                    });

                if (this.intSchedType == ScheduleType_Enum.DAYS) {
                    this.checkedSpecificDays = true;
                    this.checkedIntervals = false;
                    this.bindGrid();
                }
                else if (this.intSchedType == ScheduleType_Enum.INTERVALS) {
                    this.inter1 = true;
                    this.day1 = false;
                    this.checkedSpecificDays = false;
                    this.checkedIntervals = true;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "getSchedules");
        }
    }

    /**
     * This is for showing gird when click on specific days check box
     */
    bindGrid() {
        this.day1 = true;
    }

    /**
     * This method is for submitting specific days interval
     * @param ven
     */
    async  btnSubmitSpecificDays(ven: any) {
        this.growlMessage = [];
        try {
            if (this.stringMode == "ADD") {
            }
            if (this.stringMode == "UPDATE" || this.stringMode == "ADD") {
                if (this.lstDBData.length > 0) {
                    await this.updateDataset();
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "btnSubmitSpecificDays");
        }
    }

    /**
     * Updating time  24 hours  to 12 hours format
     */
    async updateDataset() {
        this.growlMessage = [];
        try {
            let stime: any = "";
            let etime: any = "";
            let currentMonth: number;
            let currentYear: number;
            let currentHour: number;
            let currentMinute: number;
            let currentSecond: number;
            let startTime: string = '';
            let endTime: string = '';
            let startTotalTime: any;
            let endTotalTime: any;
            let sttime: string = '';
            let ettime: string = '';
            let timeSplit: any = [];
            if (this.checkedSpecificDays == true) {
                for (let i = 0; i < this.lstDBData.length; i++) {
                    if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Schedule days not selected' })
                        return;
                    }
                    if (this.lstDBData[i].SCHEDULE_TIME == null || this.lstDBData[i].SCHEDULE_TIME == '' || this.lstDBData[i].SCHEDULE_TIME == undefined) {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                        return;
                    }
                    if (this.lstDBData[i].SCHEDULE_TIME != null && this.lstDBData[i].SCHEDULE_TIME != '' && this.lstDBData[i].SCHEDULE_TIME != undefined) {
                        let dt = this.lstDBData[i].SCHEDULE_TIME.toString();
                        if (dt.length > 11) {
                            if (this.lstDBData[i].SCHEDULE_TIME != '') {
                                stime = new Date(this.lstDBData[i].SCHEDULE_TIME).getHours() + ':' + new Date(this.lstDBData[i].SCHEDULE_TIME).getMinutes();
                                timeSplit = stime.split(":");
                                this.timeConversion = +(timeSplit[0]);
                                let timeConverMinutes: any;
                                timeConverMinutes = +(timeSplit[1]);
                                if (this.timeConversion < 12) {
                                    let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                    let amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                    if (amTime == "00") {
                                        amTime = "12";
                                    }
                                    this.lstDBData[i].SCHEDULE_TIME = amTime + ':' + amTimeMinutes + ' AM';
                                }
                                else {
                                    this.timeConversion = this.timeConversion - 12;
                                    let pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                                    let pmTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                                    if (pmTime == "00") {
                                        pmTime = "12";
                                    }
                                    this.lstDBData[i].SCHEDULE_TIME = pmTime + ':' + pmTimeMinutes + ' PM';
                                }
                            }
                            else {
                                this.growlMessage = [];
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                                return;
                            }
                        }
                    }
                    else {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                        return;
                    }
                }
            }

            if (this.stringMode == "ADD") {
                if (this.orgGrpId != "" || this.orgGrpId != null || this.orgGrpId != undefined) {
                    if (this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined) {
                        this.schCreItem.ORG_GROUP_ID = this.orgGrpId;
                    }
                }
                if ((this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined) && (this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined) && (this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                    return;
                }
                else if ((this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined)) {
                    //  if ((this.orgGrpId == null || this.orgGrpId == '' || this.orgGrpId == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Org group ID' });
                    return;
                    // }
                }
                else if ((this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined) && (this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id and Schedule Description' });
                    return;
                }
                else if ((this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id ' });
                    return;
                }
                else if ((this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Description' });
                    return;
                }
                else if (this.lstDBData.length < 0) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM) ' });
                    return;
                }
                else {
                    for (var intCnt = 0; intCnt <= this.lstSchedule.length - 1; intCnt++) {
                        if (this.schCreItem.SCHEDULE_ID.toLowerCase() == this.lstSchedule[intCnt].value.toLowerCase()) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Schedule Id already exists' });
                            return;
                        }
                    }
                }
            }
            else {
                if ((this.schItem.ORG_GROUP_ID == null || this.schItem.ORG_GROUP_ID == '' || this.schItem.ORG_GROUP_ID == undefined) && (this.schItem.SCHEDULE_ID == null || this.schItem.SCHEDULE_ID == '' || this.schItem.SCHEDULE_ID == undefined) && (this.schItem.DESCRIPTION == null || this.schItem.DESCRIPTION == '' || this.schItem.DESCRIPTION == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                    return;
                }
                else if ((this.schItem.ORG_GROUP_ID == null || this.schItem.ORG_GROUP_ID == '' || this.schItem.ORG_GROUP_ID == undefined)) {
                    //  if ((this.orgGrpId == null || this.orgGrpId == '' || this.orgGrpId == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Org group ID' });
                    return;
                    // }
                }
                else if ((this.schItem.SCHEDULE_ID == null || this.schItem.SCHEDULE_ID == '' || this.schItem.SCHEDULE_ID == undefined) && (this.schItem.DESCRIPTION == null || this.schItem.DESCRIPTION == '' || this.schItem.DESCRIPTION == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id and Schedule Description' });
                    return;
                }
                else if ((this.schItem.SCHEDULE_ID == null || this.schItem.SCHEDULE_ID == '' || this.schItem.SCHEDULE_ID == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id ' });
                    return;
                }
                else if ((this.schItem.DESCRIPTION == null || this.schItem.DESCRIPTION == '' || this.schItem.DESCRIPTION == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Description' });
                    return;
                }
                else if (this.lstDBData.length < 0) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                    return;
                }
            }
            await this.createSchedules();
        }
        catch (ex) {
            this.displayCatchException(ex, "updateDataset");
        }
    }

    /**
     * getting Org Group Id Values
     */
    async bindOrgGroups() {
        try {
            await this.processSchedulerService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.lstOrgGroupData = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID;
                                this.orgGroupString = this.orgGroupData[0].ORG_GROUP_ID + ' - ' + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.schCreItem.ORG_GROUP_ID = this.orgGroupString;
                                this.spinnerService.stop();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstOrgGroupData.push({ label: "Select One", value: "" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroupData.push({ label: this.orgGroupData[i].ORG_GROUP_ID + ' - ' + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.displayCatchException(ex, "bindOrgGroups");
        }
    }

    /**
     * This method is for creating a new schedule
     */
    createSchedule() {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Create Process Scheduler';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.editTrue = false;
            this.createTrue = true;
            this.stringMode = "ADD";
            this.blnSubmit = true;
            this.bindOrgGroups();
            this.showDisplayArea();
            this.lstDBData = [];
            this.checkedSpecificDays = false;
            this.checkedIntervals = false;
            this.strStartTime = '';
            this.strEndTime = '';
            this.schCreItem.INTERVAL = 5;
            this.selectedSchedule = '';
            this.day2 = false;
            this.inter2 = false;
            this.day1 = false;
            this.inter1 = false;
            this.hideSChedule = false;
        }
        catch (ex) {
            this.displayCatchException(ex, "createSchedule");
        }
    }

    showDisplayArea() {
        try {
            if (this.checkedIntervals == true) {
                this.schCreItem.INTERVAL = 5;
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "showDisplayArea");
        }
    }

    /**
     * this method is for when we submit button for specific intervals button it will call  this method
     */
    async createSubmitInterval() {
        try {
            this.growlMessage = [];
            this.schCreItem.START_TIME = this.strStartTime;
            this.schCreItem.END_TIME = this.strEndTime;
            if (this.stringMode == "UPDATE") {
            }
            else {
                if (this.orgGrpId != "" || this.orgGrpId != null || this.orgGrpId != undefined) {
                    if (this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined) {
                        this.schCreItem.ORG_GROUP_ID = this.orgGrpId;
                    }
                }
                if ((this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined) && (this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined) && (this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                    return;

                }
                else if ((this.schCreItem.ORG_GROUP_ID == null || this.schCreItem.ORG_GROUP_ID == '' || this.schCreItem.ORG_GROUP_ID == undefined)) {
                    //  if ((this.orgGrpId == null || this.orgGrpId == '' || this.orgGrpId == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Org group ID' });
                    return;
                    // }
                }
                else if ((this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined) && (this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id and Schedule Description' });
                    return;
                }
                else if ((this.schCreItem.SCHEDULE_ID == null || this.schCreItem.SCHEDULE_ID == '' || this.schCreItem.SCHEDULE_ID == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Id ' });
                    return;
                }
                else if ((this.schCreItem.DESCRIPTION == null || this.schCreItem.DESCRIPTION == '' || this.schCreItem.DESCRIPTION == undefined)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Schedule Description' });
                    return;
                }
                else {
                    for (var intCnt = 0; intCnt <= this.lstSchedule.length - 1; intCnt++) {
                        if (this.schCreItem.SCHEDULE_ID.toLowerCase() == this.lstSchedule[intCnt].value.toLowerCase()) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Schedule Id already exists' });
                            return;
                        }
                    }
                }
            }
            await this.createSchedules();
        }
        catch (ex) {
            this.displayCatchException(ex, "createSubmitInterval");
        }
    }

    /*Checking for mandatory fileds is given by data or not*/
    bindModelDataChange(event: any) {
        try {
            if ("txtSID1" == event.TextBoxID.toString()) {
                this.scheduleIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtSD1" == event.TextBoxID.toString()) {
                this.scheduleDescStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtRepeat" == event.TextBoxID.toString()) {
                this.intervalStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtRepeatE" == event.TextBoxID.toString()) {
                this.intervalStatusEdit = event.validationrules.filter(x => x.status == false).length;
            }
            //Add and Edit
            if (this.stringMode == "ADD") {
                if (this.orgGrpId != "") {
                    if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                        if (this.checkedIntervals == true) {
                            if (this.schCreItem.INTERVAL == 0 || this.strStartTime == "" || this.strEndTime == "") {
                                this.disableButton = true;
                            }
                            else {
                                this.disableButton = false;
                            }
                        }
                        else {
                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                if (this.stringMode == "ADD") {
                                    if (this.orgGrpId != "") {
                                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && (this.lstDBData[i].SCHEDULE_TIME != "")) {
                                            this.disableButton = false;
                                        }
                                        else {
                                            this.disableButton = true;
                                        }
                                    }
                                    else {
                                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                            if ((this.schCreItem.ORG_GROUP_ID == undefined || (this.schCreItem.ORG_GROUP_ID == 'Select One') || (this.schCreItem.ORG_GROUP_ID == "")) || this.lstDBData[i].SCHEDULE_TIME == "") {
                                                this.disableButton = true;
                                            }
                                            else {
                                                this.disableButton = false;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (this.lstDBData[i].SCHEDULE_TIME != "" || this.lstDBData[i].SCHEDULE_TIME != null) {
                                        this.disableButton = false;
                                    }
                                    else {
                                        this.disableButton = true;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        this.disableButton = true;
                    }
                }
                else if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                    if ((this.schCreItem.ORG_GROUP_ID != undefined || this.schCreItem.ORG_GROUP_ID != "")) {
                        if (this.checkedIntervals == true) {
                            if (this.schCreItem.ORG_GROUP_ID == 'Select One' || this.schCreItem.ORG_GROUP_ID == "" || this.schCreItem.ORG_GROUP_ID == undefined) { this.disableButton = true; }
                            else if (this.schCreItem.INTERVAL == 0 || this.strStartTime == "" || this.strStartTime == null || this.strEndTime == "" || this.strEndTime == null) {
                                this.disableButton = true;
                            }
                            else {
                                this.disableButton = false;
                            }
                        }
                        else {
                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                if (this.stringMode == "ADD") {
                                    if (this.orgGrpId != "") {
                                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && (this.lstDBData[i].SCHEDULE_TIME != "")) {
                                            this.disableButton = false;
                                        }
                                        else {
                                            this.disableButton = true;
                                        }
                                    }
                                    else {
                                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                            if ((this.schCreItem.ORG_GROUP_ID == undefined || (this.schCreItem.ORG_GROUP_ID == 'Select One') || (this.schCreItem.ORG_GROUP_ID == "")) || this.lstDBData[i].SCHEDULE_TIME == "") {
                                                this.disableButton = true;
                                            }
                                            else {
                                                this.disableButton = false;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (this.lstDBData[i].SCHEDULE_TIME != "" || this.lstDBData[i].SCHEDULE_TIME != null) {
                                        this.disableButton = false;
                                    }
                                    else {
                                        this.disableButton = true;
                                    }
                                }
                            }
                        }
                    }
                }
                else { this.disableButton = true; }

            }
            else {
                if (this.intervalStatusEdit == 0) {
                    if (this.strStartTime == "" || this.strEndTime == "" || this.strStartTime == null || this.strEndTime == null || this.schCreItem.INTERVAL == 0) {
                        this.disableButton = true;
                    }
                    else {
                        this.disableButton = false;
                    }
                }
                else {
                    this.disableButton = true;
                }
            }
            this.TimeChange('');
        }
        catch (ex) {
            this.displayCatchException(ex, "bindModelDataChange");
        }
    }

    /**
     * Method  for updating and creating schedules based on intervals and specific days
     */
    async  createSchedules() {
        this.growlMessage = [];
        let lstdsSchedule: any = [];
        let statusCode: any = -1
        let strSchedId: string = "";
        let strSchedDescr: string = "";
        let strOrgGrpId: string = "";
        let intRCnt: number = 0;
        let dtStartTime = new Date().toLocaleString();
        let dtStartingTime = new Date().toLocaleString('en-us');
        let dtEndTime = new Date().toLocaleString('en-us');
        let dblInterval: any;
        let blnSchedDaySelected: boolean;
        let lstScheduleUpdate: DayTime[] = [];
        try {
            //if (this.stringMode == "UPDATE") {
            if (this.checkedSpecificDays + "" == "true") { this.checkedSpecificDays = true; }
            if (this.checkedSpecificDays == true) {
                if (this.lstDBData.length > 0) {
                    let strTime: string = "";
                    for (var i = 0; i < this.lstDBData.length; i++) {
                        blnSchedDaySelected = false;
                        strTime = this.lstDBData[intRCnt].SCHEDULE_TIME;
                        if (this.lstDBData[intRCnt].CHK_MON == true) {
                            this.strSearchString = "SCHEDULE_DAY = " + DayOfWeek_Enum.MONDAY + " AND SCHEDULE_TIME = '" + strTime + "'";
                            if (lstScheduleUpdate != null) {
                                var day = DayOfWeek_Enum.MONDAY;
                                if (lstScheduleUpdate.filter(report => report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime).length <= 0) {
                                    lstScheduleUpdate.push({ SCHEDULE_DAY: DayOfWeek_Enum.MONDAY, SCHEDULE_TIME: strTime });
                                }
                            }
                            blnSchedDaySelected = true;
                        }
                        if (this.lstDBData[intRCnt].CHK_TUE == true) {
                            if (lstScheduleUpdate != null) {
                                var day = DayOfWeek_Enum.TUESDAY;
                                if (lstScheduleUpdate.filter(report => report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime).length <= 0) {
                                    lstScheduleUpdate.push({ SCHEDULE_DAY: DayOfWeek_Enum.TUESDAY, SCHEDULE_TIME: strTime });
                                }
                            }
                            blnSchedDaySelected = true;
                        }
                        if (this.lstDBData[intRCnt].CHK_WED == true) {
                            if (lstScheduleUpdate != null) {
                                var day = DayOfWeek_Enum.WEDNESDAY;
                                if (lstScheduleUpdate.filter(report => report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime).length <= 0) {
                                    lstScheduleUpdate.push({ SCHEDULE_DAY: DayOfWeek_Enum.WEDNESDAY, SCHEDULE_TIME: strTime });
                                }
                            }
                            blnSchedDaySelected = true;
                        }
                        if (this.lstDBData[intRCnt].CHK_THR == true) {
                            if (lstScheduleUpdate != null) {
                                var day = DayOfWeek_Enum.THURSDAY;
                                if (lstScheduleUpdate.filter(report => report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime).length <= 0) {
                                    lstScheduleUpdate.push({ SCHEDULE_DAY: DayOfWeek_Enum.THURSDAY, SCHEDULE_TIME: strTime });
                                }
                            }

                            blnSchedDaySelected = true;
                        }
                        if (this.lstDBData[intRCnt].CHK_FRI == true) {
                            if (lstScheduleUpdate != null) {
                                var day = DayOfWeek_Enum.FRIDAY;
                                if (lstScheduleUpdate.filter(report => report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime).length <= 0) {
                                    lstScheduleUpdate.push({ SCHEDULE_DAY: DayOfWeek_Enum.FRIDAY, SCHEDULE_TIME: strTime });
                                }
                            }

                            blnSchedDaySelected = true;
                        }
                        if (this.lstDBData[intRCnt].CHK_SAT == true) {
                            if (lstScheduleUpdate != null) {
                                var day = DayOfWeek_Enum.SATURDAY;
                                if (lstScheduleUpdate.filter(report => report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime).length <= 0) {
                                    lstScheduleUpdate.push({ SCHEDULE_DAY: DayOfWeek_Enum.SATURDAY, SCHEDULE_TIME: strTime });
                                }
                            }

                            blnSchedDaySelected = true;
                        }
                        if (this.lstDBData[intRCnt].CHK_SUN == true) {
                            if (lstScheduleUpdate != null) {
                                var day = DayOfWeek_Enum.SUNDAY;
                                if (lstScheduleUpdate.filter(report => report.SCHEDULE_DAY === day && report.SCHEDULE_TIME === strTime).length <= 0) {
                                    lstScheduleUpdate.push({ SCHEDULE_DAY: DayOfWeek_Enum.SUNDAY, SCHEDULE_TIME: strTime });
                                }
                            }
                            blnSchedDaySelected = true;
                        }

                        this.lstDBData[intRCnt].SCHEDULE_TIME = strTime;

                        if (!blnSchedDaySelected) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Schedule days not selected' })
                            return;
                        }

                        intRCnt = intRCnt + 1
                    }

                    lstdsSchedule = lstScheduleUpdate;
                }
            }
            else {
                let strTime: string = "";
                let lstDtScheduler: any = [];
                let strZero: string = "0"
                let startTimePoint: any;
                let endTimePoint: any;
                let timeSplit: any = [];
                let stime: any = "";
                let etime: any = "";
                let currentMonth: number;
                let currentYear: number;
                let currentHour: number;
                let currentMinute: number;
                let currentSecond: number;
                let startTime: string = '';
                let endTime: string = '';
                let startTotalTime: any;
                let endTotalTime: any;
                let sttime: string = '';
                let ettime: string = '';
                startTime = this.schCreItem.START_TIME;
                endTime = this.schCreItem.END_TIME;

                if (this.schCreItem.START_TIME == null || this.schCreItem.START_TIME == '' || this.schCreItem.START_TIME == undefined) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                    return;
                }
                if (this.schCreItem.END_TIME == null || this.schCreItem.END_TIME == '' || this.schCreItem.END_TIME == undefined) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                    return;
                }
                if (this.stringMode == "ADD") {
                    startTotalTime = new Date(this.schCreItem.START_TIME).getTime();
                    endTotalTime = new Date(this.schCreItem.END_TIME).getTime();
                }
                else {
                    let stdate = new Date();
                    let etdate = new Date();
                    currentMonth = stdate.getMonth();
                    currentYear = stdate.getFullYear();
                    currentMinute = 0;
                    currentHour = 0;
                    currentSecond = 0;

                    if (this.schCreItem.START_TIME.length < 11) {
                        if (this.schCreItem.START_TIME != "") {
                            timeSplit = this.schCreItem.START_TIME.split(":");
                            let timesplit1 = timeSplit[1].split(' ');
                            this.timeConversion = +(timeSplit[0]);
                            let timeConverMinutes: any;
                            timeConverMinutes = +(timesplit1[0]);
                            let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            let amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                            this.schCreItem.START_TIME = amTime + ':' + amTimeMinutes + ' ' + timesplit1[1];

                            var hours = Number(this.schCreItem.START_TIME.match(/^(\d+)/)[1]);
                            var minutes = Number(this.schCreItem.START_TIME.match(/:(\d+)/)[1]);
                            var AMPM1 = this.schCreItem.START_TIME[6] + this.schCreItem.START_TIME[7];
                            if (AMPM1 == "PM" && hours < 12) hours = hours + 12;
                            if (AMPM1 == "AM" && hours == 12) hours = hours - 12;
                            var sHours = hours.toString();
                            var sMinutes = minutes.toString();
                            if (hours < 10) sHours = "0" + sHours;
                            if (minutes < 10) sMinutes = "0" + sMinutes;
                            stdate.setHours(parseInt(sHours));
                            stdate.setMinutes(parseInt(sMinutes));
                            stdate.setSeconds(0);
                            this.schCreItem.START_TIME = new Date(stdate).toString();
                            currentMinute = 0;
                            currentHour = 0;
                            currentSecond = 0;
                        }
                    }
                    if (this.schCreItem.END_TIME.length < 11) {
                        if (this.schCreItem.END_TIME != "") {
                            timeSplit = this.schCreItem.END_TIME.split(":");
                            let timesplit1 = timeSplit[1].split(' ');
                            let timeConverMinutes: any;
                            this.timeConversion = null;
                            this.timeConversion = +(timeSplit[0]);
                            timeConverMinutes = +(timesplit1[0]);

                            let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            let amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                            this.schCreItem.END_TIME = amTime + ':' + amTimeMinutes + ' ' + timesplit1[1];

                            var hours = Number(this.schCreItem.END_TIME.match(/^(\d+)/)[1]);
                            var minutes = Number(this.schCreItem.END_TIME.match(/:(\d+)/)[1]);
                            var AMPM1 = this.schCreItem.END_TIME[6] + this.schCreItem.END_TIME[7];
                            if (AMPM1 == "PM" && hours < 12) hours = hours + 12;
                            if (AMPM1 == "AM" && hours == 12) hours = hours - 12;
                            var sHours = hours.toString();
                            var sMinutes = minutes.toString();
                            if (hours < 10) sHours = "0" + sHours;
                            if (minutes < 10) sMinutes = "0" + sMinutes;
                            etdate.setHours(parseInt(sHours));
                            etdate.setMinutes(parseInt(sMinutes));
                            etdate.setSeconds(0);
                            this.schCreItem.END_TIME = new Date(etdate).toString();
                            currentMinute = 0;
                            currentHour = 0;
                            currentSecond = 0;
                        }
                    }
                    startTotalTime = new Date(this.schCreItem.START_TIME).getTime();
                    endTotalTime = new Date(this.schCreItem.END_TIME).getTime();
                }

                if (this.schCreItem.START_TIME != '') {
                    sttime = this.schCreItem.START_TIME;
                    stime = new Date(this.schCreItem.START_TIME).getHours() + ':' + new Date(this.schCreItem.START_TIME).getMinutes();
                    timeSplit = stime.split(":");
                    this.timeConversion = null;
                    this.timeConversion = +(timeSplit[0]);
                    let timeConverMinutes: any;
                    timeConverMinutes = +(timeSplit[1]);
                    if (this.timeConversion < 12) {
                        let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                        let amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                        this.schCreItem.START_TIME = amTime + ':' + amTimeMinutes + ' AM';
                    }
                    else {
                        this.timeConversion = this.timeConversion - 12;
                        let pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                        let pmTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                        this.schCreItem.START_TIME = pmTime + ':' + pmTimeMinutes + ' PM';

                    }
                }

                if (this.schCreItem.END_TIME != '') {
                    ettime = this.schCreItem.END_TIME; //3rd july 2017 10:20:30 ISt
                    etime = new Date(this.schCreItem.END_TIME).getHours() + ':' + new Date(this.schCreItem.END_TIME).getMinutes();
                    timeSplit = etime.split(":");
                    let timeConverMinutes: any;
                    this.timeConversion = null;
                    this.timeConversion = +(timeSplit[0]);
                    timeConverMinutes = +(timeSplit[1]);

                    if (this.timeConversion < 12) {
                        let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                        let amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                        this.schCreItem.END_TIME = amTime + ':' + amTimeMinutes + ' AM';
                    }
                    else {
                        this.timeConversion = this.timeConversion - 12;
                        let pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                        let pmTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                        this.schCreItem.END_TIME = pmTime + ':' + pmTimeMinutes + ' PM';
                    }
                }

                if (this.schCreItem.INTERVAL < 5) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Interval cannot be less than 5' });
                    this.schCreItem.INTERVAL = 5;
                    return;
                }

                if (startTotalTime > endTotalTime) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: ' The start time and end time has to be between 00:00 AM – 11:59 PM' });
                    return;
                }

                lstDtScheduler = [];
                if (startTotalTime < endTotalTime) {
                    while (startTotalTime < endTotalTime) {
                        let interval = parseInt(this.schCreItem.INTERVAL.toString());
                        let ttime = new Date(sttime)
                        let time = stime.split(':');
                        let hour = parseInt(time[0]);
                        let minutes = parseInt(time[1]);
                        let totalminutes = (minutes) + interval;
                        startTotalTime = startTotalTime + (interval * 60000);
                        let mod = parseInt((totalminutes / 60).toString());
                        if (totalminutes == 60) {
                            hour = hour + 1;
                            minutes = 0;
                            totalminutes = parseInt((minutes < 10) ? '0' + minutes.toString() : minutes.toString());
                        }
                        if (totalminutes > 60) {
                            hour = hour + 1;
                            let t = totalminutes % interval
                            totalminutes = t;
                        }
                        if (hour > 24) {
                            hour = 0;
                        }
                        stime = ((hour < 10) ? '0' + hour.toString() : hour.toString()).toString() + ':' + ((totalminutes < 10) ? '0' + totalminutes.toString() : totalminutes.toString()).toString();
                        let timeSplitStart = '';
                        timeSplit = stime.split(":");
                        this.timeConversion = +(timeSplit[0]);
                        this.timeConversionp = +(timeSplit[1]);
                        if (this.timeConversion < 12) {
                            let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            let amTime1 = (this.timeConversionp < 10) ? '0' + this.timeConversionp.toString() : this.timeConversionp.toString();
                            if (amTime == "00") {
                                amTime = "12"
                            }
                            timeSplitStart = amTime + ':' + amTime1 + ' AM';
                        }
                        else {
                            this.timeConversion = this.timeConversion - 12;
                            let pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            let pmTime1 = (this.timeConversionp < 10) ? '0' + this.timeConversionp.toString() : this.timeConversionp.toString();
                            if (pmTime == "00") {
                                pmTime = "12"
                            }
                            timeSplitStart = pmTime + ':' + pmTime1 + ' PM';
                        }

                        for (var intCnt = 1; intCnt <= 7; intCnt++) {
                            lstDtScheduler.push({ SCHEDULE_DAY: intCnt, SCHEDULE_TIME: timeSplitStart })
                        }
                    }
                    lstdsSchedule = lstDtScheduler;
                }
                if (this.schCreItem.END_TIME != '' && this.schCreItem.START_TIME != '') {
                    let splittime = this.schCreItem.END_TIME.split(':');
                    let splittime1 = splittime[0]; //hours
                    let splittime2 = splittime[1].split(' '); //mm with AM/PM
                    let splittime3 = splittime2[0]; //MM
                    let splittime4 = splittime2[1];//AM/PM
                    let splittime5: any;
                    let splittime6: any;

                    splittime5 = dtEndTime.split(' ');

                    if (splittime1 == "00") {
                        splittime1 = "12";
                    }

                    dtEndTime = splittime5[0] + ' ' + splittime1 + ':' + splittime3 + ' ' + splittime4;

                    splittime = this.schCreItem.START_TIME.split(':');
                    splittime1 = splittime[0]; //hours
                    splittime2 = splittime[1].split(' '); //mm with AM/PM
                    splittime3 = splittime2[0]; //MM
                    splittime4 = splittime2[1];//AM/PM
                    splittime5 = dtStartingTime.split(' ');

                    if (splittime1 == "00") {
                        splittime1 = "12";
                    }
                    dtStartingTime = splittime5[0] + ' ' + splittime1 + ':' + splittime3 + ' ' + splittime4;
                }
            }

            if (this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] == "All") {
                if (this.stringMode == "ADD") {
                    strOrgGrpId = this.schCreItem.ORG_GROUP_ID;
                    this.orgGroup = this.schCreItem.ORG_GROUP_ID;
                }
                else {
                    this.orgGroup
                }
            }
            else {
                this.orgGroup = this.orgGrpId;
            }

            if (this.stringMode == "ADD") {
                strSchedId = this.schCreItem.SCHEDULE_ID;
                strSchedDescr = this.schCreItem.DESCRIPTION;
            }
            else {
                strSchedId = this.schItem.SCHEDULE_ID;
                strSchedDescr = this.schItem.DESCRIPTION;
            }

            let intSchedType = 0;
            if (this.checkedSpecificDays == true) {
                intSchedType = ScheduleType_Enum.DAYS;
            }
            else if (this.checkedIntervals == true) {
                intSchedType = ScheduleType_Enum.INTERVALS;
            }

            if (this.schCreItem.INTERVAL == undefined) {
                this.schCreItem.INTERVAL = 0;
            }

            this.spinnerService.start();
            await this.processSchedulerService.createNewSchedule(lstdsSchedule, this.orgGroup, strSchedId, strSchedDescr, this.deviceTokenEntry[TokenEntry_Enum.UserID], intSchedType, dtStartingTime, dtEndTime, this.schCreItem.INTERVAL, this.stringMode)
                .subscribe(res => {
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    switch (res.StatType) {
                        case StatusType.Success: {
                            if (this.stringMode == "ADD") {
                                let statusMessage = AtParConstants.Created_Msg.replace("1%", "Schedule").replace("2%", strSchedId);
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                break;
                            }
                            else {
                                if (this.stringMode == "UPDATE") {
                                    let statusMessage = AtParConstants.Updated_Msg.replace("1%", "Schedule").replace("2%", strSchedId);
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                    break;
                                }
                            }
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

                    this.selectedSchedule = '';
                    lstdsSchedule = [];
                    strSchedId = '';
                    this.lstDBData = [];
                    this.editTrue = false;
                    this.createTrue = false;
                    this.schCreItem.ORG_GROUP_ID = '';
                    this.schCreItem.SCHEDULE_ID = '';
                    this.schCreItem.DESCRIPTION = '';
                    this.checkedSpecificDays = false;
                    this.checkedIntervals = false;
                    this.selectedSchedule = '';
                    this.day2 = false;
                    this.inter2 = false;
                    this.day1 = false;
                    this.inter1 = false;
                    this.spinnerService.start();
                    this.getSchedulesDetails();
                    this.hideSChedule = true;
                });
        }
        catch (ex) {
            this.displayCatchException(ex, "createSchedules");
        }
    }

    /**
     * Adding new row to a grid when we click on submit button
     * @param ven
     */
    createNewScheduleDays(ven) {
        this.growlMessage = [];
        let blnCheckDays = false;
        try {
            let no = this.lstDBData.length + 1
            if (ven.SCHEDULE_TIME == '' || ven.SCHEDULE_TIME == undefined || ven.SCHEDULE_TIME == null) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: ' Please enter valid Time(HH:MM)' })
                return;
            }
            if (ven.CHK_MON == false && ven.CHK_TUE == false && ven.CHK_WED == false && ven.CHK_THR == false && ven.CHK_FRI == false && ven.CHK_SAT == false && ven.CHK_SUN == false) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Schedule days not selected' })
                return;
            }
            this.lstDBData.push({ ORG_GROUP_ID: '', SCHEDULE_ID: '', SCHEDULE_DAY: 0, SCHEDULE_TIME: ven.SCHEDULE_TIME, CHK_MON: false, CHK_TUE: false, CHK_WED: false, CHK_THR: false, CHK_FRI: false, CHK_SAT: false, CHK_SUN: false, SNo: no });
            if (ven.CHK_MON == true) {
                this.lstDBData[no - 1].CHK_MON = true;
                blnCheckDays = true;
            }
            if (ven.CHK_TUE == true) {
                this.lstDBData[no - 1].CHK_TUE = true;
                blnCheckDays = true;
            }
            if (ven.CHK_WED == true) {
                this.lstDBData[no - 1].CHK_WED = true;
                blnCheckDays = true;
            }
            if (ven.CHK_THR == true) {
                this.lstDBData[no - 1].CHK_THR = true;
                blnCheckDays = true;
            }
            if (ven.CHK_FRI == true) {
                this.lstDBData[no - 1].CHK_FRI = true;
                blnCheckDays = true;
            }
            if (ven.CHK_SAT == true) {
                this.lstDBData[no - 1].CHK_SAT = true;
                blnCheckDays = true;
            }
            if (ven.CHK_SUN == true) {
                this.lstDBData[no - 1].CHK_SUN = true;
                blnCheckDays = true;
            }

            if (this.stringMode == "UPDATE") {
                this.editTrue = true;
            }
            else {
                this.createTrue = true;
            }
            this.hideSChedule = false;
        }
        catch (ex) {
            this.displayCatchException(ex, "createNewScheduleDays");
        }
    }

    /**
     * 
     * @param event
     * @param ven
     * @param Day ex: mon,tue
    This method is for when we check and uncheck checkbox from grid row, updating will happen for that particular day
     */
    daySelected(event, ven: any, Day) {
        this.growlMessage = [];
        try {
            if (event.target.checked == true) {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (ven.SNo == this.lstDBData[i].SNo) {
                        ven[Day] = true;
                        if (this.stringMode == "ADD") {
                            if (this.orgGrpId != "") {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && (this.lstDBData[i].SCHEDULE_TIME != "")) {
                                    this.disableButton = false;
                                }
                                else {
                                    this.disableButton = true;
                                }
                            }
                            else {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    if ((this.schCreItem.ORG_GROUP_ID == undefined || (this.schCreItem.ORG_GROUP_ID == 'Select One') || (this.schCreItem.ORG_GROUP_ID == "")) || this.lstDBData[i].SCHEDULE_TIME == "") {
                                        this.disableButton = true;
                                    }
                                    else { this.disableButton = false; }
                                }
                            }
                        }
                        else {
                            if (this.lstDBData[i].SCHEDULE_TIME != "" || this.lstDBData[i].SCHEDULE_TIME != null) {
                                this.disableButton = false;
                            }
                            else {
                                this.disableButton = true;
                            }
                        }
                    }
                }
            }
            else {
                ven[Day] = false;
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false && (this.lstDBData[i].SCHEDULE_TIME == "" || this.lstDBData[i].SCHEDULE_TIME == null)) {
                        this.disableButton = true;
                    }
                    else if ((this.lstDBData[i].CHK_MON == true || this.lstDBData[i].CHK_TUE == true || this.lstDBData[i].CHK_WED == true || this.lstDBData[i].CHK_THR == true || this.lstDBData[i].CHK_FRI == true || this.lstDBData[i].CHK_SAT == true || this.lstDBData[i].CHK_SUN == true) && (this.lstDBData[i].SCHEDULE_TIME != "" || this.lstDBData[i].SCHEDULE_TIME != null)) {
                        if (this.stringMode == "ADD") {
                            if (this.orgGrpId != "") {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    this.disableButton = false;
                                }
                            }
                            else {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    if ((this.schCreItem.ORG_GROUP_ID == undefined) || (this.schCreItem.ORG_GROUP_ID == "")) {
                                        this.disableButton = true;
                                    }
                                    else { this.disableButton = false; }
                                }
                            }
                        }
                        else {
                            this.disableButton = false;
                        }
                    }
                    else {
                        this.disableButton = true;
                        break;
                    }
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "daySelected");
        }
    }

    /**
     * it is for creating a new row in grid
     */
    addSchedule() {
        this.growlMessage = [];
        try {
            this.disableButton = true;
            let newprocessScheduler = new Array<MT_ATPAR_PROCESS_SCHEDULER>({
                ORG_GROUP_ID: "",
                SCHEDULE_ID: "",
                SCHEDULE_DAY: 0,
                SCHEDULE_TIME: "",
                CHK_MON: false,
                CHK_TUE: false,
                CHK_WED: false,
                CHK_THR: false,
                CHK_FRI: false,
                CHK_SAT: false,
                CHK_SUN: false,
                SNo: this.lstDBData.length - 1
            });
            if (this.lstDBData.length > 0) {
                let i = this.lstDBData.length - 1;
                if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Schedule days not selected' })
                    return;
                }
                if (this.lstDBData[i].SCHEDULE_TIME == "" || this.lstDBData[i].SCHEDULE_TIME == null) {
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                    return;
                }
                this.lstDBData.push({
                    ORG_GROUP_ID: "",
                    SCHEDULE_ID: "",
                    SCHEDULE_DAY: 0,
                    SCHEDULE_TIME: "",
                    CHK_MON: false,
                    CHK_TUE: false,
                    CHK_WED: false,
                    CHK_THR: false,
                    CHK_FRI: false,
                    CHK_SAT: false,
                    CHK_SUN: false,
                    SNo: this.lstDBData.length + 1,
                });
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "addSchedule");
        }
    }

    /**
     * @param event,
    data:selected row
    this method will delete a row from a grid
     */
    deleteRow(event, selectedData: any) {
        this.growlMessage = [];
        try {
            this.confirmationService.confirm({
                message: "Are you sure you want to delete ?",
                accept: () => {
                    let index = -1;
                    if (this.lstDBData.length == 1) {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Cannot delete the schedule details' });
                        return;
                    }
                    for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                        if (selectedData.SNo == this.lstDBData[i].SNo) {
                            index = i;
                            break;
                        }
                    }
                    this.lstDBData.splice(index, 1);
                    for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                        if (this.lstDBData[i].SNo > selectedData.SNo) {
                            this.lstDBData[i].SNo = this.lstDBData[i].SNo - 1;
                        }
                        else {
                            this.lstDBData[i].SNo = this.lstDBData[i].SNo;
                        }
                    }

                    for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                        if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false && (this.lstDBData[i].SCHEDULE_TIME == "" || this.lstDBData[i].SCHEDULE_TIME == null)) {
                            this.disableButton = true;
                        }
                        else if ((this.lstDBData[i].CHK_MON == true || this.lstDBData[i].CHK_TUE == true || this.lstDBData[i].CHK_WED == true || this.lstDBData[i].CHK_THR == true || this.lstDBData[i].CHK_FRI == true || this.lstDBData[i].CHK_SAT == true || this.lstDBData[i].CHK_SUN == true) && (this.lstDBData[i].SCHEDULE_TIME != "" || this.lstDBData[i].SCHEDULE_TIME != null)) {
                            if (this.stringMode == "ADD") {
                                if (this.orgGrpId != "") {
                                    if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                        this.disableButton = false;
                                    }
                                }
                                else {
                                    if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                        if ((this.schCreItem.ORG_GROUP_ID == undefined) || (this.schCreItem.ORG_GROUP_ID == "")) {
                                            this.disableButton = true;
                                        }
                                        else {
                                            this.disableButton = false;
                                        }

                                    }
                                }
                            }
                            else {
                                this.disableButton = false;
                            }
                        }
                        else {
                            this.disableButton = true;
                            break;
                        }
                    }
                }
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "deleteRow");
        }
    }


    /**
        this method is for goback function when adding rows to grid
     */
    hideDialog() {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.hideSChedule = true;
            this.editTrue = false;
            this.createTrue = false;
            this.schCreItem.SCHEDULE_ID = '';
            this.schCreItem.DESCRIPTION = '';
        }
        catch (ex) {
            this.displayCatchException(ex, "hideDialog");
        }
    }

    /**
     * 
     *
    this method will show corresponding block and hide remaining block when we check specific days radio button
     */
    days() {
        try {
            this.growlMessage = [];
            this.day2 = true;
            this.inter2 = false;
            this.blnSubmit = true;
            this.lstDBData = [];
            this.disableButton = true;
            this.checkedSpecificDays = true;
            this.checkedIntervals = false;
            if (this.lstDBData.length == 0) {
                this.lstDBData.push({
                    ORG_GROUP_ID: "",
                    SCHEDULE_ID: "",
                    SCHEDULE_DAY: 0,
                    SCHEDULE_TIME: "",
                    CHK_MON: false,
                    CHK_TUE: false,
                    CHK_WED: false,
                    CHK_THR: false,
                    CHK_FRI: false,
                    CHK_SAT: false,
                    CHK_SUN: false,
                    SNo: this.lstDBData.length + 1,
                });
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "days");
        }
    }

    /**
     * 
     * @param e
    this method will show corresponding block and hide remaining block when we check specific interval radio button
     */
    intervals(e) {
        try {
            this.growlMessage = [];
            this.day2 = false;
            this.inter2 = true;
            this.blnSubmit = false;
            this.disableButton = true;
            if (this.orgGrpId != "") {
                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && this.schCreItem.INTERVAL != 0 && (this.strStartTime != "") && (this.strEndTime != "")) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            else {
                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && this.schCreItem.INTERVAL != 0 && (this.strStartTime != "") && (this.strEndTime != "")) {
                    if (this.schCreItem.ORG_GROUP_ID != undefined && this.schCreItem.ORG_GROUP_ID != "") {
                        this.disableButton = false;
                    }
                    else {
                        this.disableButton = true;
                    }
                }
            }
            this.timeInterName = e.currentTarget.innerText;
            this.checkedIntervals = true;
            this.checkedSpecificDays = false;
        }
        catch (ex) {
            this.displayCatchException(ex, "intervals");
        }
    }

    /**
     * 
     * @param event
    Event for enable submit when create time if time is there or not when used in specifc days
     */
    txtTime_Keyup(event) {
        try {
            this.growlMessage = [];
            var AlphaNumericPattern = /^(0?[1-9]|1[012])(:[0-9]\d)[AP][M]$/;
            var patt = new RegExp(AlphaNumericPattern);
            var res = patt.test(event.target.value);

            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false && (this.lstDBData[i].SCHEDULE_TIME == "")) {
                    this.disableButton = true;
                }
                else if ((this.lstDBData[i].CHK_MON == true || this.lstDBData[i].CHK_TUE == true || this.lstDBData[i].CHK_WED == true || this.lstDBData[i].CHK_THR == true || this.lstDBData[i].CHK_FRI == true || this.lstDBData[i].CHK_SAT == true || this.lstDBData[i].CHK_SUN == true) && (this.lstDBData[i].SCHEDULE_TIME != "")) {

                    if (this.stringMode == "ADD") {
                        if (this.orgGrpId != "") {
                            if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                this.disableButton = false;
                            }
                        }
                        else {
                            if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                if ((this.schCreItem.ORG_GROUP_ID == undefined) || (this.schCreItem.ORG_GROUP_ID == "")) {
                                    this.disableButton = true;
                                }
                                else {
                                    this.disableButton = false;
                                }
                            }
                        }
                    }
                    else {
                        this.disableButton = false;
                    }
                }
                else {
                    this.disableButton = true;
                    break;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "txtTime_Keyup");
        }
    }

    /**
     * 
     * @param event
    Event for enable submit when create time if time is there or not when used in specifc days
     */
    txtTime1_Keyup(event) {
        try {
            this.growlMessage = [];
            if (this.strStartTime == "" || this.strEndTime == "" || this.strStartTime == null || this.strEndTime == null || this.schCreItem.INTERVAL == 0) {
                this.disableButton = true;
            }
            else {
                if (this.stringMode == "ADD") {
                    if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && this.schCreItem.INTERVAL != 0 && ((this.strStartTime != "" || this.strStartTime != null) && (this.strEndTime != "" || this.strEndTime != null))) {
                        if (this.schCreItem.ORG_GROUP_ID != undefined && this.schCreItem.ORG_GROUP_ID != "") {
                            this.disableButton = false;
                        }
                        else {
                            this.disableButton = true;
                        }
                    }
                }
                else {
                    if ((this.strStartTime != "" || this.strStartTime != null) && (this.strEndTime != "" || this.strEndTime != null) && this.schCreItem.INTERVAL != 0) {
                        this.disableButton = false;
                    }
                    else {
                        this.disableButton = true;
                    }
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "txtTime1_Keyup");
        }
    }

    TimeChange(event) {
        try {
            if (this.checkedIntervals == true) {
                this.growlMessage = [];
                if (this.schCreItem.SCHEDULE_ID != null || this.schCreItem.SCHEDULE_ID != "" || this.schCreItem.SCHEDULE_ID != undefined) {
                    this.scheduleIDStatus = 0;
                }
                if (this.schCreItem.DESCRIPTION != null || this.schCreItem.DESCRIPTION != "" || this.schCreItem.DESCRIPTION != undefined) {
                    this.scheduleDescStatus = 0;
                }
                if (this.schCreItem.INTERVAL != null  || this.schCreItem.INTERVAL != undefined) {
                   
                }
             
                if (this.strStartTime == "" || this.strEndTime == "" || this.strStartTime == null || this.strEndTime == null || this.schCreItem.INTERVAL == 0){
                    if (this.scheduleIDStatus != 0 || this.scheduleIDStatus != undefined || this.scheduleDescStatus != 0 || this.scheduleDescStatus != undefined) {
                        this.disableButton = true;
                    }
                }
                else {
                    if (this.stringMode == "ADD") {
                        if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0) && this.schCreItem.INTERVAL != 0 && ((this.strStartTime != "" || this.strStartTime != null) && (this.strEndTime != "" || this.strEndTime != null))) {
                            if (this.schCreItem.ORG_GROUP_ID != undefined && this.schCreItem.ORG_GROUP_ID != "") {
                                this.disableButton = false;
                            }
                            else {
                                this.disableButton = true;
                            }
                        }
                    }
                    else {
                        if ((this.strStartTime != "" || this.strStartTime != null) && (this.strEndTime != "" || this.strEndTime != null) && this.schCreItem.INTERVAL != 0) {
                            this.disableButton = false;
                        }
                        else {
                            this.disableButton = true;
                        }
                    }
                }
            }
            else {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].CHK_MON == false && this.lstDBData[i].CHK_TUE == false && this.lstDBData[i].CHK_WED == false && this.lstDBData[i].CHK_THR == false && this.lstDBData[i].CHK_FRI == false && this.lstDBData[i].CHK_SAT == false && this.lstDBData[i].CHK_SUN == false && (this.lstDBData[i].SCHEDULE_TIME == "")) {
                        this.disableButton = true;
                    }
                    else if ((this.lstDBData[i].CHK_MON == true || this.lstDBData[i].CHK_TUE == true || this.lstDBData[i].CHK_WED == true || this.lstDBData[i].CHK_THR == true || this.lstDBData[i].CHK_FRI == true || this.lstDBData[i].CHK_SAT == true || this.lstDBData[i].CHK_SUN == true) && (this.lstDBData[i].SCHEDULE_TIME != "")) {

                        if (this.stringMode == "ADD") {
                            if (this.orgGrpId != "") {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    this.disableButton = false;
                                }
                            }
                            else {
                                if ((this.scheduleIDStatus == 0) && (this.scheduleDescStatus == 0)) {
                                    if ((this.schCreItem.ORG_GROUP_ID == undefined) || (this.schCreItem.ORG_GROUP_ID == "")) {
                                        this.disableButton = true;
                                    }
                                    else {
                                        this.disableButton = false;
                                    }
                                }
                            }
                        }
                        else {
                            this.disableButton = false;
                        }
                    }
                    else {
                        this.disableButton = true;
                        break;
                    }
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "txtTime1_Keyup");
        }
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
     * delete all the values from variables
     */
    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstSchedule = [];
        this.lstOrgGroupData = [];
        this.orgGroupData = [];
        this.editTrue = false;
        this.createTrue = false;
        this.orgGroup = '';
        this.stringMode = '';
        this.checkedSpecificDays = false;
        this.checkedIntervals = false;
        this.lstDBData = [];
        this.selectedSchedule = '';
        this.intInterval = 0;
        this.intSchedType = 0;
        this.timeConversion = 0
        this.timeConversionp = 0;
        this.lstOrgGroupsInfo = [];
        this.hideSChedule = true;
        this.disableButton = true;
    }
}


export class DayTime {
    public SCHEDULE_DAY: number;
    public SCHEDULE_TIME: string;
}