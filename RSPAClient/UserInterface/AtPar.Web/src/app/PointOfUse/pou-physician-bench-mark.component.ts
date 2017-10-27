import { Component, ContentChildren, QueryList, AfterContentInit, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Router } from '@angular/router';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { DataTable } from '../components/datatable/datatable';
import { TokenEntry_Enum, StatusType, EnumApps, BusinessType, YesNo_Enum, MailPriority } from '../Shared/AtParEnums';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Tab } from '../../app/components/tabcomponent/tab';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SelectItem, Message } from '../components/common/api';
import { POUPhysicianBenchmarkingService } from './pou-physician-bench-mark.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Response } from '@angular/http';
import { VM_POU_PHY_RANK_DATA } from '../../app/Entities/VM_POU_PHY_RANK_DATA';
import { Observable } from 'rxjs/Rx';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { VM_POU_PHY_SUMMARY_BY_SPECIALTY } from '../../app/Entities/VM_POU_PHY_SUMMARY_BY_SPECIALTY';
import { VM_POU_PHY_SCORE_CARD_DATA } from '../../app/Entities/VM_POU_PHY_SCORE_CARD_DATA';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { yearviewcalender } from '../components/calendar/yearview-calender';
import { MinusSignToParens } from '../components/custompipes/minus-sign-to-parens.pipe';

@Component({
    templateUrl: 'pou-physician-bench-mark.html',
    providers: [AtParConstants, AtParCommonService, POUPhysicianBenchmarkingService, yearviewcalender]
})


export class PhysicianBenchMarkingComponent{

    /*Varaiable declaration*/
    deviceTokenEntry: string[] = [];
    private years: number[] = [];
    msgs: Message[] = [];
    recordsPerPageSize: number;
    ddltyear: number =0 ;       
    strHalfyear: string;
    strQuarter: string;
    strMonth: string;
    showGrid: boolean = false;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    lstSltRnge: any = [];
    lstSltHQM: any = [];
    private yy: number;
    pop: boolean = false;
    tdExports: boolean = false;
    selectedSltHQM: string;
    SltVariancDiagRnge: string;
    SltVariancDiagHQM: string;
    selectedSltRnge: string = 'Y1';
    selectedSltRngeLbl: string = '';
    growlMessage: Message[] = [];
    VarnceSpecialityCode: string;
    VarnceSpecialityDescription: string;
    lstPhyBnchMrkRnkData: VM_POU_PHY_RANK_DATA[] = [];
    lstPhyScrCrdData: VM_POU_PHY_SCORE_CARD_DATA[] = [];
    gvPhyRanking: boolean = false;
    gvPhyScoreCard: boolean = false;
    lstLength: string = "";
    activeTab: string;
    PhysicianScoreCardTab: boolean = false;
    PhysicianRankingTab: boolean = false;
    SummaryBySpecialtyTab: boolean = false;
    lstSummaryBySpecialty: VM_POU_PHY_SUMMARY_BY_SPECIALTY[] = [];
    gvSummaryBySpecialty: boolean = false;
    SummaryBySpecialtySpecialityCode: string;    
    statusCode: number = -1;
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    MaxPhyRnk: number = 0;
    count: number = 0;
    lstPhyScrCrdLngth: number = 0;                   
    tabs: any;    
    lstYear: any[] = [];
    Phyname: string;   
    showHalfyrlbl: boolean = false;
    Hlfqtrmnthlbl: string = '';
    Hlfqtrmnthlbltxt: string = '';

    constructor(private leftBarAnimationservice: LeftBarAnimationService,
        private router: Router,
        private httpservice: HttpService,
        private spinnerservice: SpinnerService,
        private atParConstant: AtParConstants,
        private atparcommonservice: AtParCommonService, private PouPhyBnchMrkngService: POUPhysicianBenchmarkingService, private yearviewcalender: yearviewcalender) {

    }

    async ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.getYear();
        this.SummaryBySpecialtyTab = true;
        this.lstYear = [];
        this.lstYear.push({ label: "Select Year", value: "Select Year" });
        for (var year = 1990; year <= 2030; year++) {
            this.lstYear.push({
                label: '' + year + '',
                value: '' + year + ''
            });
        }
        this.lstSltRnge.push({ label: 'Select Value', value: 'Y1' }, { label: 'Yearly', value: 'Y' }, { label: 'Half Yearly', value: 'HY' }, { label: 'Quarterly', value: 'Q' }, { label: 'Monthly', value: 'M' });
        this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });
        sessionStorage.removeItem('SpltyCode');
        sessionStorage.removeItem('Phyid')
    }       

    /**
        redirecting to home when click on breadcrumbs
    */
    homeurl() {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    }

    async getYear() {
        var today = new Date();
        this.yy = today.getFullYear();        
        for (var i = (this.yy - 120); i <= this.yy; i++) {
            this.years.push(i);
        }
    }
    async Yearsbind() {
        this.lstSltHQM = [];
        this.pop = false;
        this.tdExports = false;
        this.selectedSltHQM = "";     
        this.lstSummaryBySpecialty = [];
        this.gvSummaryBySpecialty = false;
        this.lstSummaryBySpecialty.length = 0;  
        if (this.selectedSltRnge == "HY" || this.SltVariancDiagRnge == "HY") {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'First Half(Jan-Jun)', value: '1' }, { label: 'Second Half(July-Dec)', value: '2' });
        }
        else if (this.selectedSltRnge == "Q" || this.SltVariancDiagRnge == "Q") {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Q1(Jan-March)', value: '1' }, { label: 'Q2(Apr-Jun)', value: '2' }, { label: 'Q3(July-Sep)', value: '3' }, { label: 'Q4(Oct-Dec)', value: '4' });
        }
        else if (this.selectedSltRnge == "M" || this.SltVariancDiagRnge == "M") {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Jan', value: '1' }, { label: 'Feb', value: '2' }, { label: 'Mar', value: '3' }, { label: 'Apr', value: '4' },
                { label: 'May', value: '5' }, { label: 'June', value: '6' }, { label: 'July', value: '7' }, { label: 'Aug', value: '8' },
                { label: 'Sep', value: '9' }, { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' });
        }
        else {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });
        }
    }
    async Yearsbindphyrnk() {
        this.lstSltHQM = [];
        this.pop = false;
        this.tdExports = false;
        this.selectedSltHQM = "";
        this.lstPhyBnchMrkRnkData = [];
        this.gvPhyRanking = false;

        if (this.selectedSltRnge == "HY" || this.SltVariancDiagRnge == "HY") {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'First Half(Jan-Jun)', value: '1' }, { label: 'Second Half(July-Dec)', value: '2' });
        }
        else if (this.selectedSltRnge == "Q" || this.SltVariancDiagRnge == "Q") {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Q1(Jan-March)', value: '1' }, { label: 'Q2(Apr-Jun)', value: '2' }, { label: 'Q3(July-Sep)', value: '3' }, { label: 'Q4(Oct-Dec)', value: '4' });
        }
        else if (this.selectedSltRnge == "M" || this.SltVariancDiagRnge == "M") {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Jan', value: '1' }, { label: 'Feb', value: '2' }, { label: 'Mar', value: '3' }, { label: 'Apr', value: '4' },
                { label: 'May', value: '5' }, { label: 'June', value: '6' }, { label: 'July', value: '7' }, { label: 'Aug', value: '8' },
                { label: 'Sep', value: '9' }, { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' });
        }
        else {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });
        }
    }
    async Yearsbindphyscrcrd() {
        this.lstSltHQM = [];
        this.pop = false;
        this.tdExports = false;
        this.selectedSltHQM = "";
        this.lstPhyScrCrdData = [];
        this.gvPhyScoreCard = false;

        if (this.selectedSltRnge == "HY" || this.SltVariancDiagRnge == "HY") {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'First Half(Jan-Jun)', value: '1' }, { label: 'Second Half(July-Dec)', value: '2' });
        }
        else if (this.selectedSltRnge == "Q" || this.SltVariancDiagRnge == "Q") {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Q1(Jan-March)', value: '1' }, { label: 'Q2(Apr-Jun)', value: '2' }, { label: 'Q3(July-Sep)', value: '3' }, { label: 'Q4(Oct-Dec)', value: '4' });
        }
        else if (this.selectedSltRnge == "M" || this.SltVariancDiagRnge == "M") {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Jan', value: '1' }, { label: 'Feb', value: '2' }, { label: 'Mar', value: '3' }, { label: 'Apr', value: '4' },
                { label: 'May', value: '5' }, { label: 'June', value: '6' }, { label: 'July', value: '7' }, { label: 'Aug', value: '8' },
                { label: 'Sep', value: '9' }, { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' });
        }
        else {
            this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });
        }
    }
    async btn_SummaryBySpecialty() {        
        this.spinnerservice.start();
        this.growlMessage = [];
        this.pop = false;
        this.tdExports = false;
        sessionStorage.removeItem('SpltyCode');
        sessionStorage.removeItem('Phyid');
        this.lstPhyBnchMrkRnkData.length = 0;
        this.lstPhyScrCrdData.length = 0;
        this.lstPhyScrCrdLngth = 0;
        
        try {
            if (this.selectedSltRnge == "HY" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                this.growlMessage = [];
                this.spinnerservice.stop();
                this.pop = false;
                this.tdExports = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
                return;
            } else if (this.selectedSltRnge == "Q" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
                this.spinnerservice.stop();
                this.pop = false;
                this.tdExports = false;
                return;
            } else if (this.selectedSltRnge == "M" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
                this.spinnerservice.stop();
                this.pop = false;
                return;
            } else if (this.selectedSltRnge == "Y1" || this.selectedSltRnge == undefined || this.selectedSltRnge == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
                this.spinnerservice.stop();
                this.pop = false;
                return;
            } else if (this.ddltyear == undefined || this.ddltyear == 0) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
                this.spinnerservice.stop();
                this.pop = false;
                return;
            } else {
                this.strHalfyear = "0";
                this.strQuarter = "0";
                this.strMonth = "0";
                switch (this.selectedSltRnge) {
                    case "HY": {
                        this.strHalfyear = this.selectedSltHQM;
                        this.selectedSltRngeLbl = "Half Yearly";
                        this.showHalfyrlbl = true;
                        this.Hlfqtrmnthlbltxt = "Half Year:";
                        if (this.selectedSltHQM == "1") {
                            this.Hlfqtrmnthlbl = "First Half(Jan-Jun)";
                        }
                        else {
                            this.Hlfqtrmnthlbl = "Second Half(July-Dec)";
                        }
                        break;                        
                    }
                    case "Q": {
                        this.strQuarter = this.selectedSltHQM;
                        this.selectedSltRngeLbl = "Quarterly";
                        this.showHalfyrlbl = true;
                        this.Hlfqtrmnthlbltxt = "Quarter:";
                        if (this.selectedSltHQM == "1") {
                            this.Hlfqtrmnthlbl = "Q1(Jan-March)";
                        }
                        else if (this.selectedSltHQM == "2"){
                            this.Hlfqtrmnthlbl = "Q2(Apr-Jun)";
                        }
                        else if (this.selectedSltHQM == "3") {
                            this.Hlfqtrmnthlbl = "Q3(July-Sep)";
                        }
                        else if (this.selectedSltHQM == "4") {
                            this.Hlfqtrmnthlbl = "Q4(Oct-Dec)";
                        }                         
                        break;
                    }
                    case "M": {
                        this.strMonth = this.selectedSltHQM;
                        this.selectedSltRngeLbl = "Monthly";
                        this.showHalfyrlbl = true;
                        this.Hlfqtrmnthlbltxt = "Month:";
                        if (this.selectedSltHQM == "1") {
                            this.Hlfqtrmnthlbl = "January";
                        }
                        else if (this.selectedSltHQM == "2") {
                            this.Hlfqtrmnthlbl = "February";
                        }
                        else if (this.selectedSltHQM == "3") {
                            this.Hlfqtrmnthlbl = "March";
                        }
                        else if (this.selectedSltHQM == "4") {
                            this.Hlfqtrmnthlbl = "April";
                        } 
                        else if (this.selectedSltHQM == "5") {
                            this.Hlfqtrmnthlbl = "May";
                        }
                        else if (this.selectedSltHQM == "6") {
                            this.Hlfqtrmnthlbl = "June";
                        }
                        else if (this.selectedSltHQM == "7") {
                            this.Hlfqtrmnthlbl = "July";
                        } 
                        else if (this.selectedSltHQM == "8") {
                            this.Hlfqtrmnthlbl = "August";
                        }
                        else if (this.selectedSltHQM == "9") {
                            this.Hlfqtrmnthlbl = "September";
                        }
                        else if (this.selectedSltHQM == "10") {
                            this.Hlfqtrmnthlbl = "October";
                        }
                        else if (this.selectedSltHQM == "11") {
                            this.Hlfqtrmnthlbl = "November";
                        }
                        else if (this.selectedSltHQM == "12") {
                            this.Hlfqtrmnthlbl = "December";
                        }       
                        break;
                    }
                    default: { 
                        this.selectedSltRngeLbl = "Yearly"; 
                        this.showHalfyrlbl = false;                     
                        break;
                    }
                }                
                await this.PouPhyBnchMrkngService.Getphysiciansummarybyspeciality(this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth)
                    .catch(this.httpservice.handleError)
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<VM_POU_PHY_SUMMARY_BY_SPECIALTY>;                       
                        if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                            this.spinnerservice.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                            this.pop = false;
                            this.gvSummaryBySpecialty = false;
                            return;
                        }
                        if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                            this.spinnerservice.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                            this.pop = false;
                            this.gvSummaryBySpecialty = false;
                            return;
                        }
                        if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                            this.spinnerservice.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                            this.pop = false;
                            this.gvSummaryBySpecialty = false;
                            return;
                        }

                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.lstSummaryBySpecialty = data.DataList;
                                if (this.lstSummaryBySpecialty != null && this.lstSummaryBySpecialty.length > 0) {
                                    this.gvSummaryBySpecialty = true;
                                    this.showGrid = true;
                                    this.tdExports = true;
                                    this.spinnerservice.stop();
                                    this.lstLength = this.lstSummaryBySpecialty.length + " Record(s) found";
                                    this.activeTab = "Summary by Specialty";
                                    sessionStorage.setItem('_DS', JSON.stringify(data.DataList));                                    
                                }
                                else {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                    this.pop = false;
                                }
                                if (this.lstSummaryBySpecialty.length <= 0) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                    this.pop = false;
                                }
                                this.spinnerservice.stop();
                                break;
                            }
                            case StatusType.Warn: {
                                this.selectedSltRnge = "";
                                this.spinnerservice.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.selectedSltRnge = "";
                                this.spinnerservice.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.selectedSltRnge = "";
                                this.spinnerservice.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }

                    })
            }
        }
        catch (ex) {
            this.displayCatchException(ex);
        }

    }    
    async btn_PhysicianRanking() {              
        sessionStorage.removeItem('Phyid');
        this.lstPhyScrCrdData.length = 0;
        this.spinnerservice.start();                
        try {
        if (this.selectedSltRnge == "HY" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
            this.growlMessage = [];
            this.spinnerservice.stop();
            this.pop = false;
            this.tdExports = false;
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
            return;
        }
        else if (this.selectedSltRnge == "Q" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
            this.spinnerservice.stop();
            this.pop = false;
            this.tdExports = false;
            return;
        }
        else if (this.selectedSltRnge == "M" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
            this.spinnerservice.stop();
            this.pop = false;
            this.tdExports = false;
            return;
        }
        else if (this.selectedSltRnge == "Y1" || this.selectedSltRnge == undefined || this.selectedSltRnge == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
            this.spinnerservice.stop();
            this.pop = false;
            this.tdExports = false;
            return;
        }
        else if (this.ddltyear == undefined || this.ddltyear == 0) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
            this.spinnerservice.stop();
            this.pop = false;
            this.tdExports = false;
            return;
        }
        else {
            this.strHalfyear = "0";
            this.strMonth = "0"
            this.strQuarter = "0";
            switch (this.selectedSltRnge) {
                case "HY": {
                    this.strHalfyear = this.selectedSltHQM;
                    break;
                }
                case "Q": {
                    this.strQuarter = this.selectedSltHQM;
                    break;
                }
                case "M": {
                    this.strMonth = this.selectedSltHQM;
                    break;
                }
                default: {                    
                    break;
                }
            }

            }        
        await this.PouPhyBnchMrkngService.Getphysicianbenchmarkrankingdata(sessionStorage.getItem('SpltyCode'), this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpservice.handleError).then((res: Response) =>
        {
            let data = res.json() as AtParWebApiResponse<VM_POU_PHY_RANK_DATA>;
            this.spinnerservice.stop();
            if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                this.spinnerservice.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                this.pop = false;
                this.gvPhyRanking = false;
                this.tdExports = false;
                return;
            }
            if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                this.spinnerservice.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                this.pop = false;
                this.gvPhyRanking = false;
                this.tdExports = false;
                return;
            }
            if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                this.spinnerservice.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                this.pop = false;
                this.gvPhyRanking = false;
                this.tdExports = false;
                return;
            }
            switch (data.StatType) {
                case StatusType.Success: {
                    this.lstPhyBnchMrkRnkData = data.DataList;
                    if (this.lstPhyBnchMrkRnkData != null && this.lstPhyBnchMrkRnkData.length > 0) {                        
                        this.gvPhyRanking = true;
                        this.showGrid = true;
                        this.tdExports = true;
                        this.spinnerservice.stop();
                        this.lstLength = this.lstPhyBnchMrkRnkData.length + " Record(s) found";
                        this.activeTab = "Physician Ranking";
                        sessionStorage.setItem('_DSPhyRnk', JSON.stringify(data.DataList));                       
                    }
                    else {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                        this.pop = false;
                        this.tdExports = false;
                    }

                    if (this.lstPhyBnchMrkRnkData.length <= 0) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                        this.pop = false;
                        this.tdExports = false;
                    }
                    this.spinnerservice.stop();
                    break;
                }
                case StatusType.Warn: {
                    this.selectedSltRnge = "";
                    this.spinnerservice.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    this.tdExports = false;
                    break;
                }
                case StatusType.Error: {
                    this.selectedSltRnge = "";
                    this.spinnerservice.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    this.tdExports = false;
                    break;
                }
                case StatusType.Custom: {
                    this.selectedSltRnge = "";
                    this.spinnerservice.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                    this.tdExports = false;
                    break;
                }
            }
        })
        }
        catch (ex) {
            this.displayCatchException(ex);            
        }
    }
    async btn_PhysicianScoreCardTab()
    {
        this.lstPhyScrCrdData=[];
        this.PhysicianRankingTab = false;
        this.gvPhyRanking = false;        
        try {
            if (this.selectedSltRnge == "HY" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                this.growlMessage = [];
                this.spinnerservice.stop();
                this.pop = false;
                this.tdExports = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
                return;
            } else if (this.selectedSltRnge == "Q" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
                this.spinnerservice.stop();
                this.pop = false;
                this.tdExports = false;
                return;
            }
            else if (this.selectedSltRnge == "M" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
                this.spinnerservice.stop();
                this.pop = false;
                this.tdExports = false;
                return;
            }
            else if (this.selectedSltRnge == "Y1" || this.selectedSltRnge == undefined || this.selectedSltRnge == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
                this.spinnerservice.stop();
                this.pop = false;
                this.tdExports = false;
                return;
            }
            else if (this.ddltyear == undefined || this.ddltyear == 0) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
                this.spinnerservice.stop();
                this.pop = false;
                this.tdExports = false;
                return;
            }
            else {
                this.strHalfyear = "0";
                this.strQuarter = "0";
                this.strMonth = "0";
                switch (this.selectedSltRnge) {
                    case "HY": {
                        this.strHalfyear = this.selectedSltHQM;
                        break;
                    }
                    case "Q": {
                        this.strQuarter = this.selectedSltHQM;
                        break;
                    }
                    case "M": {
                        this.strMonth = this.selectedSltHQM;
                        break;
                    }
                    default: {                        
                        break;
                    }
                }
            }

        await this.PouPhyBnchMrkngService.GetPhysicianScoreCardData(sessionStorage.getItem('SpltyCode'), sessionStorage.getItem('Phyid'), this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpservice.handleError).then((res: Response) => {
            let data = res.json() as AtParWebApiResponse<VM_POU_PHY_SCORE_CARD_DATA>;
            this.spinnerservice.stop();
            if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                this.spinnerservice.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                this.pop = false;
                this.tdExports = false;
                return;
            }
            if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                this.spinnerservice.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                this.pop = false;
                this.tdExports = false;
                return;
            }
            if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                this.spinnerservice.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                this.pop = false;
                this.tdExports = false;
                return;
            }
            switch (data.StatType) {
                case StatusType.Success: {
                    this.lstPhyScrCrdData = data.DataList;
                    if (this.lstPhyScrCrdData != null && this.lstPhyScrCrdData.length > 0) {                       
                        this.PhysicianScoreCardTab = true;
                        this.gvPhyScoreCard = true;
                        this.showGrid = true;
                        this.tdExports = true;
                        this.spinnerservice.stop();
                        this.lstLength = this.lstPhyScrCrdData.length + " Record(s) found";
                        this.lstPhyScrCrdLngth = this.lstPhyScrCrdData.length;
                        this.activeTab = "Physician Score Card";
                        sessionStorage.setItem('_DSPhyScrCrd', JSON.stringify(data.DataList));
                    }
                    else {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                        this.pop = false;
                        this.tdExports = false;
                    }

                    if (this.lstPhyScrCrdData.length <= 0) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                        this.pop = false;
                        this.tdExports = false;
                    }
                    this.spinnerservice.stop();                    
                    for (let entry of this.lstPhyScrCrdData) {
                        if (entry.PHYSICIAN_RANK >= this.MaxPhyRnk) {
                            this.MaxPhyRnk = entry.PHYSICIAN_RANK;
                        }
                    }
                    break;
                }
                case StatusType.Warn: {
                    this.selectedSltRnge = "";
                    this.spinnerservice.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    this.tdExports = false;
                    break;
                }
                case StatusType.Error: {
                    this.selectedSltRnge = "";
                    this.spinnerservice.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    this.tdExports = false;
                    break;
                }
                case StatusType.Custom: {
                    this.selectedSltRnge = "";
                    this.spinnerservice.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                    this.tdExports = false;
                    break;
                }
            }
            }) 
        }
        catch (ex) {
            console.log(ex);
            this.displayCatchException(ex);
        }   
    }
    async onPhyNameClick(Navdd: VM_POU_PHY_RANK_DATA, event) {
        this.activeTab = "Physician Score Card";
        this.ctabs.filter(tab => tab.title == 'Summary by Specialty')[0].active = false;
        this.ctabs.filter(tab => tab.title == 'Physician Ranking')[0].active = false;
        this.ctabs.filter(tab => tab.title == 'Physician Score Card')[0].active = true;          
        sessionStorage.setItem('Phyid', Navdd.PHYSICIAN_ID);
        this.Phyname = Navdd.PHYSICIAN_NAME;
        try {
        await this.PouPhyBnchMrkngService.GetPhysicianScoreCardData(sessionStorage.getItem('SpltyCode'), Navdd.PHYSICIAN_ID,this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth ).catch(this.httpservice.handleError).then((res: Response) => {
            let data = res.json() as AtParWebApiResponse<VM_POU_PHY_SCORE_CARD_DATA>;
            this.spinnerservice.stop();
            if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                this.spinnerservice.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                this.pop = false;
                this.lstPhyScrCrdData.length = 0;
                this.PhysicianScoreCardTab = true; 
                this.tdExports = false;
                return;
            }
            if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                this.spinnerservice.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                this.pop = false;
                this.lstPhyScrCrdData.length = 0;
                this.PhysicianScoreCardTab = true; 
                this.tdExports = false;
                return;
            }
            if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                this.spinnerservice.stop();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                this.pop = false;
                this.lstPhyScrCrdData.length = 0;
                this.PhysicianScoreCardTab = true; 
                this.tdExports = false;
                return;
            }
            switch (data.StatType) {
                case StatusType.Success: {
                    this.lstPhyScrCrdData = data.DataList;
                    if (this.lstPhyScrCrdData != null && this.lstPhyScrCrdData.length > 0) {                          
                        this.gvPhyScoreCard = true;
                        this.showGrid = true;
                        this.tdExports = true;
                        this.spinnerservice.stop();
                        this.lstLength = this.lstPhyScrCrdData.length + " Record(s) found";
                        this.lstPhyScrCrdLngth = this.lstPhyScrCrdData.length;                       
                        this.MaxPhyRnk = 0;
                        for (let entry of this.lstPhyScrCrdData) {
                            if (entry.PHYSICIAN_RANK >= this.MaxPhyRnk) {
                                this.MaxPhyRnk = entry.PHYSICIAN_RANK;
                            }
                        }  
                        sessionStorage.setItem('_DSPhyScrCrd', JSON.stringify(data.DataList));       
                    }
                    else {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                        this.pop = false;
                        this.lstPhyScrCrdData.length = 0;
                        this.PhysicianScoreCardTab = true; 
                        this.tdExports = false;
                    }

                    if (this.lstPhyScrCrdData.length <= 0) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                        this.pop = false;
                        this.lstPhyScrCrdData.length = 0;
                        this.PhysicianScoreCardTab = true; 
                        this.tdExports = false;
                    }
                    this.spinnerservice.stop();                              
                    break;                    
                }
                case StatusType.Warn: {
                    this.selectedSltRnge = "";
                    this.spinnerservice.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    this.lstPhyScrCrdData.length = 0;
                    this.PhysicianScoreCardTab = true; 
                    this.tdExports = false;
                    break;
                }
                case StatusType.Error: {
                    this.selectedSltRnge = "";
                    this.spinnerservice.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    this.lstPhyScrCrdData.length = 0;
                    this.PhysicianScoreCardTab = true; 
                    this.tdExports = false;
                    break;
                }
                case StatusType.Custom: {
                    this.selectedSltRnge = "";
                    this.spinnerservice.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                    this.lstPhyScrCrdData.length = 0;
                    this.PhysicianScoreCardTab = true; 
                    this.tdExports = false;
                    break;
                }
            }
        })    
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }        
    /**
* This method is for displaying catch block error messages 
* @param event
*/
    displayCatchException(ex) {
        this.growlMessage = [];       
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerservice, ex.toString());
    }  
   
    SetPhyRnkGrnColor(x) {                 
        try {
            x.parentNode.parentNode.style.background = "green"; 
        }
        catch (ex) {
            this.displayCatchException(ex);
        }            
    }   
    SetPhyRnkRdColor(x)
    {
        try {
        x.parentNode.parentNode.style.background = "red";
        }
        catch (ex) {
            this.displayCatchException(ex);
        } 
    } 
    SetPhyRnkWhtColor(x) {
        try {
        x.parentNode.parentNode.style.background = "white";
        }
        catch (ex) {
            this.displayCatchException(ex);
        } 
    } 
    
    onSpltyClick(Navdd: VM_POU_PHY_SUMMARY_BY_SPECIALTY, event) {
        this.activeTab = "Physician Ranking";               
        this.ctabs.filter(tab => tab.title == 'Summary by Specialty')[0].active = false;
        this.ctabs.filter(tab => tab.title == 'Physician Ranking')[0].active = true;
        this.ctabs.filter(tab => tab.title == 'Physician Score Card')[0].active = false;
        this.growlMessage = [];        
        this.spinnerservice.start();
        this.lstPhyBnchMrkRnkData.length = 0;
        sessionStorage.setItem('SpltyCode', Navdd.SPECIALTY_CODE);
        this.VarnceSpecialityCode = Navdd.SPECIALTY_DESCRIPTION;
        this.VarnceSpecialityDescription = Navdd.SPECIALTY_DESCRIPTION;
        this.btn_PhysicianRanking();
    }  
    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerservice.start();
            let html: string = await this.exportReportDetails('Excel');            
            let blob = new Blob([html], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "POUPhysicianBenchmarking.xls");
        } catch (ex) {
            this.displayCatchException(ex);
        }
        finally {
            this.spinnerservice.stop();
        }
    }
    async exportReportDetails(reqType: string) {
        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.msgs = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;


            let imgserverPath: string = '';

            await this.atparcommonservice.getServerIP()
                .catch(this.httpservice.handleError)
                .then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<string>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ipAddress = data.DataVariable.toString();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    if (data.StatType != StatusType.Success) {
                        htmlBuilder = '';
                        return htmlBuilder;
                    }
                });

            await this.atparcommonservice.getSSLConfigDetails()
                .catch(this.httpservice.handleError)
                .then((res: Response) => {
                    this.msgs = [];
                    var data = res.json() as AtParWebApiResponse<SSL_CONFIG_DETAILS>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.gstrProtocal = data.Data.PROTOCOL.toString();
                            this.gstrServerName = data.Data.SERVER_NAME.toString();
                            this.gstrPortNo = data.Data.PORT_NO.toString();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
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

            let title: string = '""' + "AtparVersion 2.8" + '""';



            htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == 'Print') {
                htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                    + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    + "<tr><td colspan=5 align=left><span class=c2><b> Physician Benchmarking Report </b></span></td><td align=right valign=top>&nbsp;";

                htmlBuilder += "<A  href=" + "" + "javascript:printWindow()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
            } else {
                if (reqType == 'Mail') {
                    htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=cid:logo title=Atpar 3><img src=cid:topbg width=82% height=63></TD></TR>";
                }
                else {
                    htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                }
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    + "<tr><td colspan=3 align=left><span class=c2><b> Physician Benchmarking Report </b></span></td><td align=right valign=top>&nbsp;";
            }

            if (this.activeTab == "Summary by Specialty") {
                if (this.selectedSltRngeLbl == "Yearly") {
                    this.Hlfqtrmnthlbltxt = "";
                    this.Hlfqtrmnthlbl = "";
                }
                let _DS: VM_POU_PHY_SUMMARY_BY_SPECIALTY[] = [];
                _DS = await JSON.parse(sessionStorage.getItem('_DS')) as VM_POU_PHY_SUMMARY_BY_SPECIALTY[];
                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align= center width= 10 % nowrap> <span class=c3><b>Range:</b></span>"
                    + "<span class=c3>" + this.selectedSltRngeLbl + "</span></td> "
                    + "<td align= center width= 10 % nowrap><span class=c3><b>Year:</b></span>"
                    + "<span class=c3>" + this.ddltyear + "</span></td> "                   
                    + "<td align= center width= 10 % nowrap><span class=c3><b>" + this.Hlfqtrmnthlbltxt + "</b></span>"
                    + "<span class=c3>" + this.Hlfqtrmnthlbl + "</span></td> "
                    + "</tr></table><tr></tr><tr><td colspan=2><br/>"
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center width=20% nowrap><span class=c3><b>Specialty</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b># Procedures</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b># Physicians</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>Total Spend</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Extended Variance</b></span></td>"
                    + "</tr>";

                await _DS.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c3>" + header.SPECIALTY_DESCRIPTION + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PHYSICIANS.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_SPEND.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_VARIANCE.toLocaleString('en-US')) + "</span></td>"
                        + "</tr>";
                });
            }
            else if (this.activeTab == "Physician Ranking") {
                if (this.selectedSltRngeLbl == "Yearly") {
                    this.Hlfqtrmnthlbltxt = "";
                    this.Hlfqtrmnthlbl = "";
                }
                let _DS: VM_POU_PHY_RANK_DATA[] = [];                
                _DS = await JSON.parse(sessionStorage.getItem('_DSPhyRnk')) as VM_POU_PHY_RANK_DATA[];
                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align= center width= 10 % nowrap> <span class=c3><b>Range:</b></span>"
                    + "<span class=c3>" + this.selectedSltRngeLbl + "</span></td> "
                    + "<td align= center width= 10 % nowrap><span class=c3><b>Year:</b></span>"
                    + "<span class=c3>" + this.ddltyear + "</span></td> "
                    +"<td align= center width= 10 % nowrap><span class=c3><b>Specialty:</b></span>"
                    + "<span class=c3>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</span></td> "
                    + "<td align= center width= 10 % nowrap><span class=c3><b>" + this.Hlfqtrmnthlbltxt+"</b></span>"
                    + "<span class=c3>" + this.Hlfqtrmnthlbl + "</span></td> "
                    + "</tr></table><tr></tr><tr><td colspan=2><br/>"                    
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"                   
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center width=20% nowrap><span class=c3><b>Rank</b></span></td>"
                    + "<td align=center width=20% nowrap><span class=c3><b>Physician</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b># Procedures</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>Total Spend</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Extended Variance</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>% Variance over Total Spend</b></span></td>"
                    + "</tr>";

                await _DS.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=center nowrap><span class=c3>" + header.PHYSICIAN_RANK + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.PHYSICIAN_NAME + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_SPEND.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.TOTAL_VARIANCE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.PER_VAR_TOTAL_SPEND.toFixed(1) + "%" + "</span></td>"
                        + "</tr>";
                });
            }
            else if (this.activeTab == "Physician Score Card") { 
                if (this.selectedSltRngeLbl == "Yearly") {
                    this.Hlfqtrmnthlbltxt = "";
                    this.Hlfqtrmnthlbl = "";
                }               
                let _DS: VM_POU_PHY_SCORE_CARD_DATA[] = [];
                _DS = await JSON.parse(sessionStorage.getItem('_DSPhyScrCrd')) as VM_POU_PHY_SCORE_CARD_DATA[];
                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align= center width= 10 % nowrap> <span class=c3><b>Range:</b></span>"
                    + "<span class=c3>" + this.selectedSltRngeLbl + "</span></td> "
                    + "<td align= center width= 10 % nowrap><span class=c3><b>Year:</b></span>"
                    + "<span class=c3>" + this.ddltyear + "</span></td> "
                    + "<td align= center width= 10 % nowrap><span class=c3><b>" + this.Hlfqtrmnthlbltxt + "</b></span>"
                    + "<span class=c3>" + this.Hlfqtrmnthlbl + "</span></td> "                    
                    + "<td align= center width= 10 % nowrap>"
                    + "<span class=c3><b>Specialty:</b></span>"
                    + this.VarnceSpecialityCode  
                    + "</td>"                 
                    + "<td align= center width= 10 % nowrap>"
                    + "<span class=c3><b>Physician Name:</b></span>"
                    + this.Phyname
                    + "</td>"
                    + "</tr>"
                    +"</table>"
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center colspan=8 nowrap></td>"
                    + "<td align=center colspan=4 nowrap><span class=c3><b>Department Totals</b></span></td>"                    
                    + "</tr>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td align=center width=20% nowrap><span class=c3><b>Procedure Code</b></span></td>"
                    + "<td align=center width=20% nowrap><span class=c3><b>Procedure Description</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b># Procedures</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>% Procedures Performed</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>Average Cost</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>Variance from Low Average Cost</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>Extended Variance</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>Rank</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b>&nbsp;</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b># Physicians</b></span></td>"
                    + "<td align=center width=10% nowrap><span class=c3><b># Procedures</b></span></td>"
                    + "<td align=center width=15% nowrap><span class=c3><b>Low Cost Average</b></span></td>"
                    + "</tr>";
                await _DS.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c3>" + header.PROCEDURE_CODE + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.PROCEDURE_DESCRIPTION + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.PER_PROC_PERFORMED.toFixed(1) + "%" + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.AVG_PROC_COST.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.VAR_FROM_LOW_AVG.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.EXTENDED_VARIANCE.toLocaleString('en-US')) + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.PHYSICIAN_RANK.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PHY_DEPT.toLocaleString('en-US') + "</span></td>"
                        + "<td align=center nowrap><span class=c3>" + header.NO_OF_PROCS_DEPT.toLocaleString('en-US') + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + this.transform(header.LOW_COST_AVG_DEPT.toLocaleString('en-US')) + "</span></td>"
                        + "</tr>";
                });
            }        
            htmlBuilder += "</table></Table>";            
            return htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }
    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerservice.start();
            var html = await this.exportReportDetails('Print');            
            if (html != '' && html != null) {

                var newwindow = window.open('', 'PRINT', 'height=600,width=600');
                newwindow.document.write('<html><head><title>' + 'Point Of Use - Physician Benchmarking Report' + '</title>');
                newwindow.document.write('</head><body >');
                newwindow.document.write(html);
                newwindow.document.write('</body></html>');
                newwindow.document.close(); // necessary for IE >= 10
                newwindow.focus(); // necessary for IE >= 10*/

                newwindow.print();
                newwindow.close();

                return true;
            }
        } catch (ex) {
            this.displayCatchException(ex);
            return false;
        }
        finally {
            this.spinnerservice.stop();
        }
    }
    async onSendMailIconClick(event) {
        try {
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.displayCatchException(ex);
        }
    }

    async onSendMailClick(event) {
        try {
            this.spinnerservice.start();
            let html: string = await this.exportReportDetails('Mail');
            let toAddr: string = '';
            this.msgs = [];

            if (html != '' && html != null) {                                
                await this.atparcommonservice.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Physician Benchmarking Report',JSON.stringify(html), this.toMailAddr, '', 'false', MailPriority.Normal.toString(), '')
                    .catch(this.httpservice.handleError)
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<number>;
                        this.statusCode = data.StatusCode;
                    });

                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_BODY) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Mail Server is Not Configured! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SEND_FAILED) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                }
                else {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                }
            }

            this.isMailDialog = false;
            this.toMailAddr = '';

        } catch (ex) {
            this.displayCatchException(ex);
        }
        finally {

            this.spinnerservice.stop();
        }
    }
    ctab: any;
    ctabs: any;    
    enableSelectedTab(option: any) {          
          this.ctab = option.tab;          
          this.ctabs = option.tabs;
          if (option.tab.title == 'Summary by Specialty')
          {
              this.activeTab = "Summary by Specialty";
              if (this.selectedSltRnge != "Y1") {                 
                  this.gvSummaryBySpecialty = true;
                  this.showGrid = true;
                  this.tdExports = true;
              }                       
              if (this.lstSummaryBySpecialty != null && this.lstSummaryBySpecialty.length > 0)
              {                   
                this.lstLength = this.lstSummaryBySpecialty.length + " Record(s) found";
                sessionStorage.setItem('_DS', JSON.stringify(this.lstSummaryBySpecialty)); 
                this.tdExports = true;              
              }
              else
              {
                  this.gvSummaryBySpecialty = false;
                  this.showGrid = false;
                  this.tdExports = false;                             
              }
          }
          else if (option.tab.title == 'Physician Ranking')
          {                                
              if (this.lstPhyBnchMrkRnkData != null && this.lstPhyBnchMrkRnkData.length > 0)
              {                  
                this.lstLength = this.lstPhyBnchMrkRnkData.length + " Record(s) found";
                this.activeTab = "Physician Ranking";               
                this.gvPhyRanking = true;
                this.showGrid = true;
                this.tdExports = true; 
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(tab => tab.title == 'Physician Ranking')[0];
                }    
                option.tabs.filter(tab => tab.title == 'Summary by Specialty')[0].active = false;   
                option.tabs.filter(tab => tab.title == 'Physician Score Card')[0].active = false;        
              }
              else
              {                
                  if (this.lstSummaryBySpecialty != null && this.lstSummaryBySpecialty.length > 0)
                  {
                    this.lstLength = this.lstSummaryBySpecialty.length + " Record(s) found";                   
                    this.tdExports = true;                   
                  }
                  else
                  {                    
                    this.tdExports = false;                   
                  }
                  this.activeTab = "Summary by Specialty";
                  if (option.tabs != null) {
                      this.ctab = option.tabs.filter(tab => tab.title == 'Summary by Specialty')[0];
                  }
                  option.tabs.filter(tab => tab.title == 'Physician Ranking')[0].active = false;
                  option.tabs.filter(tab => tab.title == 'Physician Score Card')[0].active = false;
            }
        }
          else if (option.tab.title == 'Physician Score Card')
          {                               
              if (this.lstPhyScrCrdData != null && this.lstPhyScrCrdData.length > 0)
              {
                  this.lstLength = this.lstPhyScrCrdData.length + " Record(s) found";
                  this.activeTab = "Physician Score Card";
                  this.gvPhyScoreCard = true;
                  this.showGrid = true;
                  this.tdExports = true;
                  if (option.tabs != null) {
                      this.ctab = option.tabs.filter(tab => tab.title == 'Physician Score Card')[0];
                  }
                  option.tabs.filter(tab => tab.title == 'Summary by Specialty')[0].active = false;
                  option.tabs.filter(tab => tab.title == 'Physician Ranking')[0].active = false;
              }            
              else if (this.activeTab == "Summary by Specialty" && this.lstPhyScrCrdData.length == 0)
              {
                  if (this.lstSummaryBySpecialty != null && this.lstSummaryBySpecialty.length > 0)
                  {      
                      this.lstLength = this.lstSummaryBySpecialty.length + " Record(s) found";               
                      this.tdExports = true;                      
                  }
                  else                     
                  {                     
                      this.tdExports = false;                     
                  }
                  this.activeTab = "Summary by Specialty";
                  if (option.tabs != null) {
                      this.ctab = option.tabs.filter(tab => tab.title == 'Summary by Specialty')[0];
                  }
                  option.tabs.filter(tab => tab.title == 'Physician Ranking')[0].active = false;
                  option.tabs.filter(tab => tab.title == 'Physician Score Card')[0].active = false;
              }
              else if (this.activeTab == "Physician Ranking" && this.lstPhyScrCrdData.length == 0)
              {
                  if (this.lstPhyBnchMrkRnkData != null && this.lstPhyBnchMrkRnkData.length > 0)
                  {
                      this.lstLength = this.lstPhyBnchMrkRnkData.length + " Record(s) found";                     
                      this.tdExports = true;                      
                  }
                  else
                  {                      
                      this.tdExports = false;                     
                  }
                  this.activeTab = "Physician Ranking";
                  if (option.tabs != null) {
                      this.ctab = option.tabs.filter(tab => tab.title == 'Physician Ranking')[0];
                  }
                  option.tabs.filter(tab => tab.title == 'Summary by Specialty')[0].active = false;
                  option.tabs.filter(tab => tab.title == 'Physician Score Card')[0].active = false;
              }               
         }
        if (option != null) {           
            this.ctab.active=true;
            if (option.tabs != null && this.tabs == null) {
                this.tabs = option.tabs;
            }
          }
                   
    }

    transform(value: any): any {
        return value.charAt(0) == '-' ?
            '($' + value.substring(1, value.length) + ')' :
            '$' + value;
    }   
}


